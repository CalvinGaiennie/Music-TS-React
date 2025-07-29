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
        className="container d-flex justify-content-center align-items-center"
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
    <div className="container">
      {/* Header */}
      <div className="text-center mb-5">
        <h1 className="display-4 mb-3">Song Library</h1>
        <p className=" fs-5">
          Browse all available songs by instrument and difficulty
        </p>
      </div>

      {Object.keys(instrumentDifficulties).map((instrument) => {
        return (
          <div key={instrument} className="mb-5">
            <h2 className="border-bottom pb-3 mb-4">
              {instrument
                .replace(/-/g, " ")
                .replace(/\b\w/g, (l) => l.toUpperCase())}
            </h2>
            <div className="row">
              {instrumentDifficulties[instrument as Instrument].map(
                (difficulty) => {
                  return (
                    <div className="col-12 mb-4" key={difficulty}>
                      <h4 className=" mb-3 fw-normal">
                        {difficulty
                          .replace(/-/g, " ")
                          .replace(/\b\w/g, (l) => l.toUpperCase())}
                      </h4>
                      <div className="row" style={{ marginLeft: "0.1rem" }}>
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
                                <p className="mb-0 fs-6">{track.songName}</p>
                              </div>
                            );
                          }
                        })}
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
  );
}

export default SongLibraryPage;
