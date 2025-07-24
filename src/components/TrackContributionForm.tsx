import { useState, useEffect, useReducer } from "react";
import { getMyAudioTracks, upsertAudioTrack } from "../services/api";
import type { AudioTrack } from "../assets/earTrainerTypesAndInterfaces";
import FormInput from "./FormInput";

const initialState = {
  songTip: "",
  songKey: "",
  songChords: "",
  songInstrument: "",
  songDifficulty: "",
  tracks: [] as AudioTrack[],
};

const reducer = (state: typeof initialState, action: any) => {
  switch (action.type) {
    case "setSongTip":
      return { ...state, songTip: action.payload };
    case "setSongKey":
      return { ...state, songKey: action.payload };
    case "setSongChords":
      return { ...state, songChords: action.payload };
    case "setSongInstrument":
      return { ...state, songInstrument: action.payload };
    case "setSongDifficulty":
      return { ...state, songDifficulty: action.payload };
    case "setTracks":
      return { ...state, tracks: action.payload };
  }
  return { ...state, ...action };
};

function TrackContributionForm() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setFileName(file.name);
    }
  };

  useEffect(() => {
    const fetchFiles = async () => {
      const data = await getMyAudioTracks();
      dispatch({ type: "setTracks", payload: data });
    };
    fetchFiles();
  }, []);

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const result = reader.result as string;
        const base64 = result.split(",")[1];
        resolve(base64);
      };
      reader.onerror = (error) => reject(error);
    });
  };

  const handleUpload = async () => {
    if (!selectedFile || !fileName.trim()) {
      setMessage("Please select a file and enter a name");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      // Convert file to base64
      const base64Data = await fileToBase64(selectedFile);

      const audioTrack: AudioTrack = {
        songName: fileName,
        songTip: state.songTip,
        songKey: state.songKey,
        songChords: state.songChords,
        songInstrument: state.songInstrument,
        songDifficulty: state.songDifficulty,
        songData: base64Data,
      };

      await upsertAudioTrack(audioTrack);
      setMessage("File uploaded successfully!");

      // Clear form
      setSelectedFile(null);
      setFileName("");
      if (document.getElementById("fileInput") as HTMLInputElement) {
        (document.getElementById("fileInput") as HTMLInputElement).value = "";
      }

      // Reload files
      const updatedTracks = await getMyAudioTracks();
      dispatch({ type: "setTracks", payload: updatedTracks });
    } catch (error) {
      console.error("Error uploading file:", error);
      setMessage(
        `Error uploading file: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex flex-column align-items-center">
      <h1 className="mb-4">TrackContributionForm</h1>
      {/* Upload Section */}
      <div className="card mb-4" style={{ width: "100%", maxWidth: "600px" }}>
        <div className="card-header">
          <h5 className="mb-0">
            <i className="fas fa-upload me-2"></i>
            Upload Audio File
          </h5>
        </div>
        <div className="card-body">
          {/* File Selection */}
          <div className="mb-3">
            <label className="form-label fw-bold">Select Audio File</label>
            <div className="input-group">
              <input
                type="file"
                id="fileInput"
                className="form-control"
                accept="audio/*,.mp3,.wav,.m4a,.aac,.ogg"
                onChange={handleFileSelect}
                disabled={loading}
              />
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={() => document.getElementById("fileInput")?.click()}
                disabled={loading}
              >
                Browse
              </button>
            </div>
            <div className="form-text">
              Supported formats: MP3, WAV, M4A, AAC, OGG (Max 50MB)
            </div>
          </div>

          {/* File Preview */}
          {selectedFile && (
            <div className="mb-3 p-3 border rounded bg-light">
              <div className="d-flex align-items-center">
                <i className="fas fa-music text-primary me-3 fs-4"></i>
                <div className="flex-grow-1">
                  <h6 className="mb-1">{selectedFile.name}</h6>
                  <small className="text-muted">
                    Size: {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                  </small>
                </div>
                <button
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => {
                    setSelectedFile(null);
                    setFileName("");
                    if (
                      document.getElementById("fileInput") as HTMLInputElement
                    ) {
                      (
                        document.getElementById("fileInput") as HTMLInputElement
                      ).value = "";
                    }
                  }}
                >
                  Remove
                </button>
              </div>
            </div>
          )}

          {/* File Name */}
          <FormInput
            label="File Name"
            value="fileName"
            placeholder="Enter a descriptive name for your audio file"
            disabled={loading}
            formText=""
            state={state}
            dispatch={dispatch}
          />

          {/* Song Tip */}
          <FormInput
            label="Song Tip"
            value="songTip"
            placeholder="Enter a tip for this track"
            disabled={loading}
            formText=""
            state={state}
            dispatch={dispatch}
          />
          {/* Song Key */}
          <FormInput
            label="Song Key"
            value="songKey"
            placeholder="Enter the key of the song"
            disabled={loading}
            formText=""
            state={state}
            dispatch={dispatch}
          />
          {/* Song Chords */}
          <FormInput
            label="Song Chords"
            value="songChords"
            placeholder="Enter the chords of the song"
            disabled={loading}
            formText=""
            state={state}
            dispatch={dispatch}
          />
          {/* Song Instrument*/}
          <FormInput
            label="Song Instrument"
            value="songInstrument"
            placeholder="Enter the instrument of the song"
            disabled={loading}
            formText=""
            state={state}
            dispatch={dispatch}
          />
          {/* Song Difficulty*/}
          <FormInput
            label="Song Difficulty"
            value="songDifficulty"
            placeholder="Enter the difficulty of the song"
            disabled={loading}
            formText=""
            state={state}
            dispatch={dispatch}
          />

          {/* Upload Progress */}
          {loading && (
            <div className="mb-3">
              <div className="progress">
                <div
                  className="progress-bar progress-bar-striped progress-bar-animated"
                  role="progressbar"
                  style={{ width: "100%" }}
                >
                  Uploading...
                </div>
              </div>
            </div>
          )}

          {/* Upload Button */}
          <div className="d-grid">
            <button
              className="btn btn-primary btn-lg"
              onClick={handleUpload}
              disabled={loading || !selectedFile || !fileName.trim()}
            >
              {loading ? (
                <>
                  <i className="fas fa-spinner fa-spin me-2"></i>
                  Uploading...
                </>
              ) : (
                <>
                  <i className="fas fa-cloud-upload-alt me-2"></i>
                  Upload Audio File
                </>
              )}
            </button>
          </div>

          {/* Validation Messages */}
          {!selectedFile && fileName && (
            <div className="alert alert-warning mt-2">
              <i className="fas fa-exclamation-triangle me-2"></i>
              Please select an audio file to upload.
            </div>
          )}
          {selectedFile && !fileName.trim() && (
            <div className="alert alert-warning mt-2">
              <i className="fas fa-exclamation-triangle me-2"></i>
              Please enter a name for your file.
            </div>
          )}
        </div>
      </div>
      {/* Message Display */}
      {message && (
        <div
          className={`alert ${
            message.includes("Error") ? "alert-danger" : "alert-success"
          } mb-3`}
          style={{ width: "100%", maxWidth: "600px" }}
        >
          {message}
        </div>
      )}

      {/* Files Display Section */}
      <div className="card" style={{ width: "100%", maxWidth: "600px" }}>
        <div className="card-header">
          <h5 className="mb-0">
            <i className="fas fa-music me-2"></i>
            Your Audio Files
          </h5>
        </div>
        <div className="card-body">
          {state.tracks.length > 0 ? (
            <div className="list-group">
              {state.tracks.map((track, i) => (
                <div
                  key={`${track.songName}-${i}`}
                  className="list-group-item d-flex justify-content-between align-items-center"
                >
                  <div>
                    <h6 className="mb-1">{track.songName}</h6>
                    {track.userId && (
                      <small className="text-muted">
                        User ID: {track.userId}
                      </small>
                    )}
                    <span> </span>
                    {track.songTip && (
                      <small className="text-muted">
                        Song Tip: {track.songTip}
                      </small>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-muted py-4">
              <i className="fas fa-music fa-3x mb-3"></i>
              <p>No audio files found</p>
              <small>Upload your first audio file to get started!</small>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default TrackContributionForm;
