# 🎵 Frontend Integration Guide - Blob Storage Migration

## 📋 Overview

The backend has been migrated from storing audio files as binary data in the database to using Azure Blob Storage. This significantly improves performance and reduces database size.

---

## 🔄 API Changes Summary

### **Updated Endpoints:**

- `PUT /AudioTrack/UpsertAudioTrack` - New request format
- `DELETE /AudioTrack/DeleteAudioTrack/{audioTrackId}` - Structured responses
- `GET /AudioTrack/GetAudioTracks` - Returns blob URLs instead of binary data

---

## 📝 Request/Response Formats

### **1. Upload Audio Track (PUT /AudioTrack/UpsertAudioTrack)**

#### **Request Body:**

```json
{
  "audioTrackId": 0, // 0 for new track, >0 for update
  "songName": "My Song Name",
  "songTip": "Helpful tip for playing",
  "songKey": "C",
  "songChords": "C G Am F",
  "songInstrument": "Guitar",
  "songDifficulty": "Beginner",
  "songData": "base64EncodedAudioString" // Base64 encoded audio file
}
```

#### **Success Response:**

```json
{
  "message": "Audio track saved successfully",
  "blobUrl": "https://cgmusicblobs.blob.core.windows.net/cgmusicblobs/guid_filename.mp3"
}
```

#### **Error Response:**

```json
{
  "message": "Failed to save audio track",
  "error": "Specific error details"
}
```

### **2. Delete Audio Track (DELETE /AudioTrack/DeleteAudioTrack/{audioTrackId})**

#### **Success Response:**

```json
{
  "message": "Audio track deleted successfully"
}
```

#### **Error Response:**

```json
{
  "message": "Failed to delete audio track",
  "error": "Specific error details"
}
```

### **3. Get Audio Tracks (GET /AudioTrack/GetAudioTracks)**

#### **Response Format:**

```json
[
  {
    "audioTrackId": 1,
    "userId": 1003,
    "songName": "My Song",
    "songTip": "Song tip",
    "songKey": "C",
    "songChords": "C G Am F",
    "songInstrument": "Guitar",
    "songDifficulty": "Beginner",
    "songBlobUrl": "https://cgmusicblobs.blob.core.windows.net/cgmusicblobs/guid_filename.mp3",
    "createdAt": "2024-01-15T10:30:00Z",
    "updatedAt": "2024-01-15T10:30:00Z"
  }
]
```

---

## 🔧 Frontend Implementation Guide

### **1. File Upload Handler**

```javascript
const handleFileUpload = (file) => {
  // Validate file type
  const allowedTypes = [".mp3", ".wav", ".m4a", ".aac", ".ogg"];
  const fileExtension = "." + file.name.split(".").pop().toLowerCase();

  if (!allowedTypes.includes(fileExtension)) {
    alert("Invalid file type. Please upload an audio file.");
    return;
  }

  // Validate file size (50MB limit)
  const maxSize = 50 * 1024 * 1024; // 50MB in bytes
  if (file.size > maxSize) {
    alert("File too large. Maximum size is 50MB.");
    return;
  }

  const reader = new FileReader();
  reader.onload = (e) => {
    // Remove the data URL prefix to get just the base64 string
    const base64 = e.target.result.split(",")[1];

    const audioTrackRequest = {
      audioTrackId: 0, // 0 for new track
      songName: file.name.replace(/\.[^/.]+$/, ""), // Remove file extension
      songTip: "",
      songKey: "",
      songChords: "",
      songInstrument: "",
      songDifficulty: "",
      songData: base64,
    };

    uploadTrack(audioTrackRequest);
  };

  reader.readAsDataURL(file);
};
```

### **2. Upload Function**

```javascript
const uploadTrack = async (audioTrackRequest) => {
  try {
    const response = await fetch("/AudioTrack/UpsertAudioTrack", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getAuthToken()}`, // Your auth token
      },
      body: JSON.stringify(audioTrackRequest),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Upload failed");
    }

    const result = await response.json();
    console.log("Upload successful:", result.message);
    console.log("Blob URL:", result.blobUrl);

    // Refresh your tracks list or update UI
    refreshTracksList();
  } catch (error) {
    console.error("Upload error:", error);
    alert(`Upload failed: ${error.message}`);
  }
};
```

### **3. Delete Function**

```javascript
const deleteTrack = async (audioTrackId) => {
  try {
    const response = await fetch(
      `/AudioTrack/DeleteAudioTrack/${audioTrackId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${getAuthToken()}`, // Your auth token
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Delete failed");
    }

    const result = await response.json();
    console.log("Delete successful:", result.message);

    // Refresh your tracks list or update UI
    refreshTracksList();
  } catch (error) {
    console.error("Delete error:", error);
    alert(`Delete failed: ${error.message}`);
  }
};
```

### **4. Audio Playback**

```javascript
const playAudio = (audioTrack) => {
  if (!audioTrack.songBlobUrl) {
    alert("No audio file available");
    return;
  }

  try {
    // Option 1: Direct playback (if blob is public)
    const audio = new Audio(audioTrack.songBlobUrl);
    audio.play().catch((error) => {
      console.error("Direct playback failed, trying download method:", error);
      playAudioWithDownload(audioTrack.songBlobUrl);
    });
  } catch (error) {
    console.error("Audio playback error:", error);
    alert("Failed to play audio");
  }
};

const playAudioWithDownload = async (blobUrl) => {
  try {
    const response = await fetch(blobUrl);
    if (!response.ok) throw new Error("Failed to download audio");

    const blob = await response.blob();
    const url = URL.createObjectURL(blob);

    const audio = new Audio(url);
    audio.play().catch((error) => {
      console.error("Downloaded audio playback failed:", error);
      alert("Failed to play audio");
    });

    // Clean up the object URL when done
    audio.onended = () => URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Audio download error:", error);
    alert("Failed to download audio");
  }
};
```

### **5. Fetch Tracks List**

```javascript
const fetchTracks = async () => {
  try {
    const response = await fetch("/AudioTrack/GetMyAudioTracks", {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`, // Your auth token
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch tracks");
    }

    const tracks = await response.json();
    console.log("Tracks loaded:", tracks.length);

    // Update your UI with the tracks
    updateTracksList(tracks);
  } catch (error) {
    console.error("Fetch tracks error:", error);
    alert("Failed to load tracks");
  }
};
```

---

## 🚀 Performance Benefits

- **Faster API responses** - No more 40-60 second delays
- **Reduced memory usage** - No large binary data in memory
- **Better scalability** - Blob storage handles large files efficiently
- **CDN ready** - Can easily add Azure CDN for global distribution

---

## ⚠️ Important Notes

### **File Requirements:**

- **Supported formats:** `.mp3`, `.wav`, `.m4a`, `.aac`, `.ogg`
- **Maximum size:** 50MB per file
- **Encoding:** Must be Base64 encoded in requests

### **Security:**

- **Authentication required** for all endpoints
- **Blob URLs** may be private (require authentication)
- **Error handling** is now more detailed

### **Testing:**

1. Test with small audio files first (< 1MB)
2. Verify blob URLs are accessible
3. Test error handling with invalid files
4. Check authentication flow

---

## 🔗 Example Integration

```javascript
// Complete example of uploading and playing audio
class AudioManager {
  constructor() {
    this.tracks = [];
  }

  async uploadAudioFile(file) {
    const audioTrackRequest = await this.prepareAudioRequest(file);
    await this.uploadTrack(audioTrackRequest);
  }

  async prepareAudioRequest(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const base64 = e.target.result.split(",")[1];
        resolve({
          audioTrackId: 0,
          songName: file.name.replace(/\.[^/.]+$/, ""),
          songTip: "",
          songKey: "",
          songChords: "",
          songInstrument: "",
          songDifficulty: "",
          songData: base64,
        });
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  async uploadTrack(request) {
    // Implementation from above
  }

  playTrack(track) {
    // Implementation from above
  }
}
```

---

## 📞 Support

If you encounter any issues:

1. Check the browser console for detailed error messages
2. Verify your authentication token is valid
3. Ensure file formats and sizes are within limits
4. Test with the provided example code

**Backend Team Contact:** [Your contact info]
