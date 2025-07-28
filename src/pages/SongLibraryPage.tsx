import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  realSongListRealDifficultyFlatArray,
  instrumentDifficulties,
} from "../assets/resources";
import { getAudioTracks } from "../services/api";
import type { AudioTrack } from "../assets/earTrainerTypesAndInterfaces";

function SongLibraryPage() {
  const [allTracks, setAllTracks] = useState<AudioTrack[]>([]);
  const [filteredTracks, setFilteredTracks] = useState<AudioTrack[]>([]);
  const [selectedInstrument, setSelectedInstrument] = useState<string>("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [loading, setLoading] = useState(true);

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
        setFilteredTracks(allTracks);
      } catch (error) {
        console.error("Error fetching tracks:", error);
        // Fallback to just hardcoded tracks
        setAllTracks(realSongListRealDifficultyFlatArray);
        setFilteredTracks(realSongListRealDifficultyFlatArray);
      } finally {
        setLoading(false);
      }
    };

    fetchAllTracks();
  }, []);

  useEffect(() => {
    let filtered = allTracks;

    // Filter by instrument
    if (selectedInstrument !== "all") {
      filtered = filtered.filter(
        (track) => track.songInstrument === selectedInstrument
      );
    }

    // Filter by difficulty
    if (selectedDifficulty !== "all") {
      filtered = filtered.filter(
        (track) => track.songDifficulty === selectedDifficulty
      );
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (track) =>
          track.songName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          track.songTip.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredTracks(filtered);
  }, [allTracks, selectedInstrument, selectedDifficulty, searchTerm]);

  const getInstrumentIcon = (instrument: string) => {
    switch (instrument) {
      case "guitar":
        return "fas fa-guitar";
      case "piano":
        return "fas fa-piano";
      case "bass":
        return "fas fa-music";
      case "guitar-bass":
        return "fas fa-guitar";
      case "guitar-bass-piano":
        return "fas fa-music";
      default:
        return "fas fa-music";
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "simple-melody":
        return "success";
      case "intervals":
        return "info";
      case "one-string-melodies":
        return "warning";
      case "key-of-g-diatonic-chords-easy":
        return "primary";
      case "key-of-g-diatonic-chords":
        return "secondary";
      case "no-restrictions":
        return "dark";
      default:
        return "light";
    }
  };

  // Get all available difficulties for the selected instrument
  const getAvailableDifficulties = () => {
    if (selectedInstrument === "all") {
      // Get all difficulties from all instruments
      const allDifficulties = new Set<string>();
      Object.values(instrumentDifficulties).forEach((difficulties) => {
        difficulties.forEach((difficulty) => allDifficulties.add(difficulty));
      });
      return Array.from(allDifficulties).sort();
    } else {
      return (
        instrumentDifficulties[
          selectedInstrument as keyof typeof instrumentDifficulties
        ] || []
      );
    }
  };

  // Count songs for a specific difficulty
  const getSongCountForDifficulty = (difficulty: string) => {
    let tracks = allTracks;
    if (selectedInstrument !== "all") {
      tracks = tracks.filter(
        (track) => track.songInstrument === selectedInstrument
      );
    }
    return tracks.filter((track) => track.songDifficulty === difficulty).length;
  };

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
        <h1 className="display-4 mb-3">📚 Song Library</h1>
        <p className="lead">
          Browse our complete collection of songs for ear training
        </p>
        <p className="text-muted">
          {filteredTracks.length} of {allTracks.length} songs
        </p>
      </div>

      {/* Filters */}
      <div className="row mb-4">
        <div className="col-md-4 mb-3">
          <label className="form-label fw-bold">Search:</label>
          <input
            type="text"
            className="form-control"
            placeholder="Search songs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="col-md-4 mb-3">
          <label className="form-label fw-bold">Instrument:</label>
          <select
            className="form-select"
            value={selectedInstrument}
            onChange={(e) => setSelectedInstrument(e.target.value)}
          >
            <option value="all">All Instruments</option>
            <option value="guitar">Guitar</option>
            <option value="piano">Piano</option>
            <option value="bass">Bass</option>
            <option value="guitar-bass">Guitar & Bass</option>
            <option value="guitar-bass-piano">Guitar, Bass & Piano</option>
          </select>
        </div>
        <div className="col-md-4 mb-3">
          <label className="form-label fw-bold">Difficulty:</label>
          <select
            className="form-select"
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
          >
            <option value="all">All Difficulties</option>
            {getAvailableDifficulties().map((difficulty) => {
              const songCount = getSongCountForDifficulty(difficulty);
              return (
                <option
                  key={difficulty}
                  value={difficulty}
                  style={{ color: songCount > 0 ? "inherit" : "#dc3545" }}
                >
                  {difficulty
                    .replace(/-/g, " ")
                    .replace(/\b\w/g, (l) => l.toUpperCase())}
                  {songCount > 0 ? ` (${songCount})` : " (No songs)"}
                </option>
              );
            })}
          </select>
        </div>
      </div>

      {/* Song Grid */}
      <div className="row">
        {filteredTracks.map((track, index) => (
          <div
            key={`${track.songName}-${index}`}
            className="col-md-6 col-lg-4 mb-4"
          >
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-start mb-2">
                  <h5 className="card-title mb-0">{track.songName}</h5>
                  <i
                    className={`${getInstrumentIcon(
                      track.songInstrument
                    )} text-primary`}
                  ></i>
                </div>

                {track.songTip && (
                  <p className="card-text text-muted small mb-2">
                    {track.songTip}
                  </p>
                )}

                <div className="d-flex flex-wrap gap-1 mb-3">
                  <span
                    className={`badge bg-${getDifficultyColor(
                      track.songDifficulty
                    )}`}
                  >
                    {track.songDifficulty
                      .replace(/-/g, " ")
                      .replace(/\b\w/g, (l) => l.toUpperCase())}
                  </span>
                  <span className="badge bg-secondary">
                    {track.songInstrument
                      .replace(/-/g, " ")
                      .replace(/\b\w/g, (l) => l.toUpperCase())}
                  </span>
                  {track.audioTrackId && track.audioTrackId > 0 && (
                    <span className="badge bg-info">User Submitted</span>
                  )}
                </div>

                {track.songChords && (
                  <p className="card-text small">
                    <strong>Chords:</strong> {track.songChords}
                  </p>
                )}

                {track.songKey && (
                  <p className="card-text small">
                    <strong>Key:</strong> {track.songKey}
                  </p>
                )}
              </div>

              <div className="card-footer bg-transparent">
                <Link
                  to="/ear-trainer"
                  className="btn btn-primary btn-sm w-100"
                  state={{
                    instrument: track.songInstrument,
                    difficulty: track.songDifficulty,
                    songName: track.songName,
                  }}
                >
                  <i className="fas fa-play me-2"></i>
                  Practice This Song
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredTracks.length === 0 && (
        <div className="text-center py-5">
          <i className="fas fa-search fa-3x text-muted mb-3"></i>
          <h4>No songs found</h4>
          <p className="text-muted">
            {selectedDifficulty !== "all" && selectedInstrument !== "all"
              ? `No songs available for ${selectedInstrument} at ${selectedDifficulty.replace(
                  /-/g,
                  " "
                )} difficulty.`
              : "Try adjusting your filters or search terms to find more songs."}
          </p>
          <button
            className="btn btn-outline-primary"
            onClick={() => {
              setSelectedInstrument("all");
              setSelectedDifficulty("all");
              setSearchTerm("");
            }}
          >
            Clear All Filters
          </button>
        </div>
      )}

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
