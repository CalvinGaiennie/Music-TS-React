import { useEffect, useState } from "react";
import { getMyAudioTracks, upsertAudioTrack } from "../services/api";
import type { AudioTrack } from "../assets/earTrainerTypesAndInterfaces";
import FormInput from "./FormInput";
import TrackList from "./TrackList";
import { instrumentDifficulties } from "../assets/resources";
import FormSelect from "./FormSelect";

const instruments = Object.keys(instrumentDifficulties);
interface TrackFormState {
  songName: string;
  songTip: string;
  songKey: string;
  songChords: string;
  songInstrument: string;
  songDifficulty: string;
  tracks: AudioTrack[];
}

function TrackContributionForm({
  state,
  dispatch,
}: {
  state: TrackFormState;
  dispatch: (action: { type: string; payload: string | AudioTrack[] }) => void;
}) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setFileName(file.name);
    }
  };

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

      // Convert file to base64 for upload
      const base64Data = await fileToBase64(selectedFile);

      const audioTrack: AudioTrack = {
        songName: state.songName,
        songTip: state.songTip,
        songKey: state.songKey,
        songChords: state.songChords,
        songInstrument: state.songInstrument,
        songDifficulty: state.songDifficulty,
        songBlobUrl: base64Data,
      };

      await upsertAudioTrack(audioTrack);
      setMessage("File uploaded successfully!");

      // Clear form
      setSelectedFile(null);
      setFileName("");
      if (document.getElementById("fileInput") as HTMLInputElement) {
        (document.getElementById("fileInput") as HTMLInputElement).value = "";
      }

      // Clear form fields
      dispatch({ type: "setSongName", payload: "" });
      dispatch({ type: "setSongTip", payload: "" });
      dispatch({ type: "setSongKey", payload: "" });
      dispatch({ type: "setSongChords", payload: "" });
      dispatch({ type: "setSongInstrument", payload: instruments[0] });
      dispatch({
        type: "setSongDifficulty",
        payload:
          instrumentDifficulties[
            instruments[0] as keyof typeof instrumentDifficulties
          ][0],
      });

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

  useEffect(() => {
    dispatch({ type: "setSongInstrument", payload: instruments[0] });
    dispatch({
      type: "setSongDifficulty",
      payload:
        instrumentDifficulties[
          instruments[0] as keyof typeof instrumentDifficulties
        ][0],
    });
  }, [dispatch]);

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
            value="SongName"
            placeholder="Enter a descriptive name for your audio file"
            formText=""
            state={state.songName}
            dispatch={dispatch}
          />

          {/* Song Tip */}
          <FormInput
            label="Song Tip"
            value="SongTip"
            placeholder="Enter a tip for this track"
            formText=""
            state={state.songTip}
            dispatch={dispatch}
          />
          {/* Song Key */}
          <FormSelect
            label="Song Key"
            value="SongKey"
            formText=""
            state={state.songKey}
            dispatch={dispatch}
            options={[
              "C",
              "C#",
              "D",
              "D#",
              "E",
              "F",
              "F#",
              "G",
              "G#",
              "A",
              "A#",
              "B",
              "N/A",
            ]}
          />
          {/* Song Chords */}
          <FormInput
            label="Song Chords"
            value="SongChords"
            placeholder="Enter the chords of the song"
            formText=""
            state={state.songChords}
            dispatch={dispatch}
          />
          {/* Song Instrument*/}
          <FormSelect
            label="Song Instrument"
            value="SongInstrument"
            formText=""
            state={state.songInstrument}
            dispatch={dispatch}
            options={instruments}
          />
          {/* Song Difficulty*/}
          {state.songInstrument && (
            <FormSelect
              label="Song Difficulty"
              value="SongDifficulty"
              formText=""
              state={state.songDifficulty}
              dispatch={dispatch}
              options={
                instrumentDifficulties[
                  state.songInstrument as keyof typeof instrumentDifficulties
                ]
              }
            />
          )}

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
      <TrackList tracks={state.tracks} dispatch={dispatch} />
    </div>
  );
}

export default TrackContributionForm;
