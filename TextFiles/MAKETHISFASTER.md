# 🚀 Performance Optimization Guide - Make Your Music App Faster

## Current Performance Issues Identified

Your music app is experiencing slow loading times due to several performance bottlenecks:

### 1. **Multiple Unnecessary API Calls**

- `EarTrainerPage` and `SongLibraryPage` fetch user tracks on every page load
- No caching strategy - data is fetched fresh every time
- API calls happen even when data hasn't changed

### 2. **Large Hardcoded Data Loading**

- 31 hardcoded songs in `realSongListRealDifficultyFlatArray` loaded on every page
- No lazy loading or code splitting for large data arrays
- Data processing happens synchronously on main thread

### 3. **Inefficient Data Processing**

- Entire song array filtered multiple times in different components
- No memoization of expensive operations
- Redundant data transformations

### 4. **Network Performance**

- Azure backend response time: ~372ms (acceptable but can be optimized)
- No request deduplication
- No background prefetching

## 🛠️ Solutions to Implement

### Phase 1: Add React Query for Caching (High Impact)

1. **Install React Query:**

   ```bash
   npm install @tanstack/react-query
   ```

2. **Create Query Client Configuration** (`src/services/queryClient.ts`):

   ```typescript
   import { QueryClient } from "@tanstack/react-query";

   export const queryClient = new QueryClient({
     defaultOptions: {
       queries: {
         staleTime: 5 * 60 * 1000, // 5 minutes
         cacheTime: 10 * 60 * 1000, // 10 minutes
         retry: 2,
         refetchOnWindowFocus: false,
       },
     },
   });
   ```

3. **Wrap App with QueryClientProvider** (`src/main.tsx`):

   ```typescript
   import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

   const queryClient = new QueryClient({
     defaultOptions: {
       queries: {
         staleTime: 5 * 60 * 1000,
         cacheTime: 10 * 60 * 1000,
         retry: 2,
         refetchOnWindowFocus: false,
       },
     },
   });

   createRoot(document.getElementById("root")!).render(
     <StrictMode>
       <QueryClientProvider client={queryClient}>
         <App />
       </QueryClientProvider>
     </StrictMode>
   );
   ```

4. **Create Custom Hooks** (`src/hooks/useAudioTracks.ts`):

   ```typescript
   import { useQuery } from "@tanstack/react-query";
   import { getAudioTracks } from "../services/api";

   export const useAudioTracks = (
     fileId: number = 0,
     userId: number = 0,
     searchParam: string = "None"
   ) => {
     return useQuery({
       queryKey: ["audioTracks", fileId, userId, searchParam],
       queryFn: () => getAudioTracks(fileId, userId, searchParam),
       staleTime: 5 * 60 * 1000,
       cacheTime: 10 * 60 * 1000,
       retry: 2,
       refetchOnWindowFocus: false,
     });
   };
   ```

### Phase 2: Optimize Data Loading (High Impact)

1. **Lazy Load Hardcoded Songs** (`src/assets/resources.ts`):

   ```typescript
   // Instead of importing the entire array
   export const getHardcodedSongs = () => {
     return import("./songData").then(
       (module) => module.realSongListRealDifficultyFlatArray
     );
   };
   ```

2. **Implement Virtual Scrolling** for large song lists:

   ```bash
   npm install react-window
   ```

3. **Add Loading States and Error Boundaries:**

   ```typescript
   const { data: tracks, isLoading, error } = useAudioTracks();

   if (isLoading) return <LoadingSpinner />;
   if (error) return <ErrorMessage error={error} />;
   ```

### Phase 3: Optimize Components (Medium Impact)

1. **Memoize Expensive Operations** (`src/pages/SongLibraryPage.tsx`):

   ```typescript
   const allTracks = useMemo(() => {
     return [...userTracks, ...realSongListRealDifficultyFlatArray];
   }, [userTracks]);
   ```

2. **Use React.memo for Components:**

   ```typescript
   const SongCard = React.memo(({ song }) => {
     // component logic
   });
   ```

3. **Implement Pagination** for large datasets:
   ```typescript
   const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({
     queryKey: ["audioTracks"],
     queryFn: ({ pageParam = 0 }) => getAudioTracks(pageParam, 20),
     getNextPageParam: (lastPage, pages) => lastPage.nextCursor,
   });
   ```

### Phase 4: Backend Optimizations (High Impact)

1. **Add Database Indexing:**

   ```sql
   CREATE INDEX idx_audiotrack_user_instrument_difficulty
   ON AudioTracks (userId, songInstrument, songDifficulty);
   ```

2. **Implement Response Caching:**

   ```csharp
   [ResponseCache(Duration = 300)] // 5 minutes
   public async Task<IActionResult> GetAudioTracks(...)
   ```

3. **Add Compression:**
   ```csharp
   services.AddResponseCompression(options =>
   {
       options.EnableForHttps = true;
       options.Providers.Add<BrotliCompressionProvider>();
       options.Providers.Add<GzipCompressionProvider>();
   });
   ```

### Phase 5: Frontend Bundle Optimization (Medium Impact)

1. **Code Splitting:**

   ```typescript
   const SongLibraryPage = lazy(() => import("./pages/SongLibraryPage"));
   const EarTrainerPage = lazy(() => import("./pages/EarTrainerPage"));
   ```

2. **Tree Shaking:**

   ```typescript
   // Import only what you need
   import { useQuery } from "@tanstack/react-query";
   // Instead of
   import * as ReactQuery from "@tanstack/react-query";
   ```

3. **Optimize Images and Assets:**
   - Compress audio files
   - Use WebP format for images
   - Implement lazy loading for images

## 📊 Expected Performance Improvements

| Optimization        | Expected Improvement           | Implementation Time |
| ------------------- | ------------------------------ | ------------------- |
| React Query Caching | 70-80% faster subsequent loads | 2-3 hours           |
| Lazy Loading        | 50-60% faster initial load     | 1-2 hours           |
| Virtual Scrolling   | 90% faster for large lists     | 3-4 hours           |
| Backend Caching     | 60-70% faster API responses    | 1-2 hours           |
| Code Splitting      | 30-40% faster initial bundle   | 1 hour              |

## 🎯 Priority Order

1. **HIGH PRIORITY** (Do First):

   - Add React Query for caching
   - Implement lazy loading for hardcoded songs
   - Add proper loading states

2. **MEDIUM PRIORITY** (Do Second):

   - Optimize component rendering with memoization
   - Implement virtual scrolling for large lists
   - Add backend caching

3. **LOW PRIORITY** (Do Last):
   - Code splitting
   - Image optimization
   - Advanced caching strategies

## 🔧 Quick Wins (30 minutes each)

1. **Add Loading Spinner:**

   ```typescript
   if (isLoading) {
     return <div className="spinner-border" />;
   }
   ```

2. **Disable Refetch on Window Focus:**

   ```typescript
   refetchOnWindowFocus: false;
   ```

3. **Add Error Boundaries:**

   ```typescript
   if (error) {
     return <div>Error: {error.message}</div>;
   }
   ```

4. **Optimize Bundle Size:**
   ```bash
   npm run build -- --analyze
   ```

## 📈 Monitoring Performance

1. **Use React DevTools Profiler** to identify slow components
2. **Monitor Network Tab** in browser dev tools
3. **Add Performance Monitoring:**
   ```typescript
   const startTime = performance.now();
   // ... your code
   const endTime = performance.now();
   console.log(`Operation took ${endTime - startTime} milliseconds`);
   ```

## 🚨 Common Pitfalls to Avoid

1. **Don't fetch data in useEffect without dependencies**
2. **Don't process large arrays on every render**
3. **Don't make API calls without proper error handling**
4. **Don't forget to clean up subscriptions and timers**

## 📞 Next Steps

1. Start with Phase 1 (React Query) - this will give you the biggest performance boost
2. Test each optimization individually
3. Measure performance before and after each change
4. Consider implementing a performance monitoring solution

Remember: **Measure first, optimize second!** Use the browser's Performance tab to identify the actual bottlenecks before implementing optimizations.
