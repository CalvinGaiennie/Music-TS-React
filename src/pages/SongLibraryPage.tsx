import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  realSongListRealDifficultyFlatArray,
  instrumentDifficulties,
} from "../assets/resources";
import { getAudioTracks } from "../services/api";
import type {
  AudioTrack,
  Instrument,
} from "../assets/earTrainerTypesAndInterfaces";

function SongLibraryPage() {
  const [loading, setLoading] = useState(true);
  const [allTracks, setAllTracks] = useState<AudioTrack[]>([]);

  useEffect(() => {
    const fetchAllTracks = async () => {
      try {
        setLoading(true);
        // Get user tracks
        const userTracks = await getAudioTracks();
        // Combine with hardcoded tracks
        const allTracks = [
          ...userTracks,
          ...realSongListRealDifficultyFlatArray,
        ];
        setAllTracks(allTracks);
      } catch (error) {
        console.error("Error fetching tracks:", error);
        // Fallback to just hardcoded tracks
        setAllTracks(realSongListRealDifficultyFlatArray as AudioTrack[]);
      } finally {
        setLoading(false);
      }
    };

    fetchAllTracks();
  }, []);

  if (loading) {
    return (
      <div
        className="container d-flex flex-column align-items-center justify-content-center"
        style={{ minHeight: "60vh" }}
      >
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3">Loading song library...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container d-flex flex-column align-items-center">
      {/* Header */}
      <h1 className="mb-4">Song Library</h1>
      <p className="lead text-center mb-4">
        Browse all available songs by instrument and difficulty
      </p>

      <div style={{ maxWidth: "900px", width: "100%" }}>
        {Object.keys(instrumentDifficulties).map((instrument) => {
          return (
            <div key={instrument} className="mb-5">
              <h2 className="text-center mb-4">
                {instrument
                  .replace(/-/g, " ")
                  .replace(/\b\w/g, (l) => l.toUpperCase())}
              </h2>
              <div className="row">
                {instrumentDifficulties[instrument as Instrument].map(
                  (difficulty) => {
                    return (
                      <div className="col-12 col-lg-6 mb-4" key={difficulty}>
                        <div className="card">
                          <div className="card-body">
                            <h4 className="card-title mb-3">
                              {difficulty
                                .replace(/-/g, " ")
                                .replace(/\b\w/g, (l) => l.toUpperCase())}
                            </h4>
                            <div className="row">
                              {allTracks.map((track) => {
                                if (
                                  track.songInstrument === instrument &&
                                  track.songDifficulty === difficulty
                                ) {
                                  return (
                                    <div
                                      key={track.audioTrackId}
                                      className="col-6 col-md-4 col-lg-4 mb-2"
                                    >
                                      <p className="mb-0 fs-6">
                                        {track.songName}
                                      </p>
                                    </div>
                                  );
                                }
                                return null;
                              })}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  }
                )}
              </div>
            </div>
          );
        })}

        {/* Back to Ear Trainer */}
        <div className="text-center mt-5 mb-5">
          <Link to="/ear-trainer" className="btn btn-outline-secondary">
            <i className="fas fa-arrow-left me-2"></i>
            Back to Ear Trainer
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SongLibraryPage;
