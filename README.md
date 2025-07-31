# Music-TS-React

A comprehensive music learning web application built with React 19, TypeScript, and Vite. This application provides interactive tools for musicians to practice, learn, and improve their skills through ear training exercises, with plans to expand to additional features like fretboard simulation, metronome practice, and a song library.

## 🎵 Features

### 🎸 Interactive Learning Tools

<!-- - **Fretboard Simulator**: Interactive guitar fretboard with customizable settings -->

- **Ear Trainer**: Develop musical recognition skills with interval and chord training
<!-- - **Metronome**: Customizable metronome with rudiments and practice tracking
- **Song Library**: Browse and play audio tracks with metadata -->

### 👤 User Management

- **Authentication**: Secure login and registration system
- **User Profiles**: Personalized experience with saved preferences
- **Contribution System**: Upload and share your own audio tracks
<!-- and lessons -->

### 📚 Educational Content

- **Lesson Library**: Structured learning materials for different skill levels
- **Individual Lessons**: Detailed lesson pages with interactive elements
- **Practice Tips**: Helpful guidance for each song and exercise

## 🏗️ Technology Stack

- **Frontend Framework**: React 19 with TypeScript
- **Build Tool**: Vite for fast development and building
- **Routing**: React Router DOM for navigation
- **Styling**: Bootstrap 5 for responsive design
- **State Management**: React Context API
- **Backend Integration**: RESTful API with C# backend
- **File Storage**: Azure Blob Storage for audio files

## 📋 Prerequisites

- Node.js 18+
- npm or yarn package manager
- Modern web browser
- Backend API running (Music-Backend-C#)

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd Music-TS-React
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Configuration

Create a `.env` file in the root directory:

```env
VITE_API_BASE_URL=http://localhost:7000
VITE_APP_NAME=Music Learning App
```

### 4. Start Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### 5. Build for Production

```bash
npm run build
```

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Fretboard.tsx   # Interactive guitar fretboard
│   ├── Metronome.tsx   # Metronome component
│   ├── NavBar.tsx      # Navigation component
│   └── ...
├── pages/              # Page components
│   ├── HomePage.tsx    # Landing page
│   ├── EarTrainerPage.tsx # Ear training interface
│   ├── FretboardSimulatorPage.tsx # Fretboard practice
│   └── ...
├── services/           # API service functions
├── context/            # React context providers
├── assets/             # Static assets
└── App.tsx             # Main application component
```

## 🎯 Core Components

<!-- ### Fretboard Simulator

Interactive guitar fretboard with:

- Customizable tuning
- Note highlighting
- Scale visualization
- Responsive design -->

### Ear Trainer

Musical recognition training featuring:

- Interval identification
- Chord recognition
- Progressive difficulty levels
- Performance tracking

<!-- ### Metronome

Advanced metronome with:

- Adjustable tempo (BPM)
- Time signature selection
- Rudiment patterns
- Practice session tracking -->

## 🔧 Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

### Code Style

The project uses ESLint with TypeScript configuration. Run linting before committing:

```bash
npm run lint
```

### Adding New Features

1. Create components in the `src/components/` directory
2. Add pages in the `src/pages/` directory
3. Update routing in `App.tsx`
4. Add API services in `src/services/`
5. Update types as needed

### State Management

The application uses React Context for global state management:

- `AuthContext`: User authentication state
- Additional contexts can be added for specific features

## 🎨 Styling

The application uses Bootstrap 5 for styling with custom CSS modules for component-specific styles. Key styling considerations:

- Responsive design for mobile and desktop
- Accessible color schemes
- Consistent spacing and typography
- Interactive hover and focus states

## 🔌 API Integration

The frontend communicates with the Music-Backend-C# API for:

- User authentication
- Audio track management
- Lesson content
- User data persistence

### API Service Structure

```typescript
// Example API service
export const audioTrackService = {
  getTracks: async (): Promise<AudioTrack[]> => {
    const response = await fetch(`${API_BASE_URL}/AudioTrack/GetAudioTracks`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    return response.json();
  },
};
```

## 🚀 Deployment

### Netlify Deployment

1. Connect your repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Configure environment variables
5. Deploy

### Environment Variables for Production

```env
VITE_API_BASE_URL=https://your-api-domain.com
VITE_APP_NAME=Music Learning App
```

## 🧪 Testing

The project includes ESLint configuration for code quality. To add testing:

1. Install testing libraries (Jest, React Testing Library)
2. Create test files in `__tests__/` directories
3. Add test scripts to package.json

## 📱 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 🔒 Security

- JWT token authentication
- Secure API communication
- Input validation
- XSS protection through React's built-in escaping

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow TypeScript best practices
- Use functional components with hooks
- Maintain consistent code formatting
- Add comments for complex logic
- Test your changes thoroughly

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:

- Check the [TODO.md](./TODO.md) for known issues and planned features
- Review the [FRONTEND_INTEGRATION_GUIDE.md](./FRONTEND_INTEGRATION_GUIDE.md) for API integration details
- Open an issue in the repository
- Contact the development team

## 🎵 Roadmap

See [TODO.md](./TODO.md) for current development priorities and planned features including:

- Enhanced metronome features
- Additional ear training exercises
- Improved responsive design
- Performance optimizations
- New lesson content
