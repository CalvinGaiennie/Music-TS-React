import { useReducer, useEffect } from "react";
import {
  realSongListRealDifficultyFlatArray,
  instrumentDifficulties,
} from "../assets/resources";
import {
  type State,
  type Action,
  type Instrument,
  type AudioTrack,
  type TrackType,
} from "../assets/earTrainerTypesAndInterfaces";
import { getAudioTracksList } from "../services/api";

const initialState: State = {
  instrument: "guitar",
  difficulty: "simple-melody",
  selectedSong: {
    audioTrackId: 0,
    userId: 0,
    songName: "",
    songTip: "",
    songKey: "",
    songChords: "",
    songInstrument: "",
    songDifficulty: "",
    songData: "",
    songListHiddenStatus: false,
  } as AudioTrack,
  showSong: false,
  showTip: false,
  availableSongsNumber: 0,
  availableTracks: [] as AudioTrack[],
  trackType: "all" as TrackType,
  songListHiddenStatus: false,
};

function reducer(state: State, action: Action) {
  switch (action.type) {
    case "SET_SONG":
      return {
        ...state,
        selectedSong: action.payload,
      };
    case "SET_INSTRUMENT":
      return {
        ...state,
        instrument: action.payload,
        difficulty: instrumentDifficulties[action.payload][0], // Set to first available difficulty
      };
    case "SHOW_SONG":
      return { ...state, showSong: action.payload };
    case "SHOW_TIP":
      return { ...state, showTip: action.payload };
    case "SET_DIFFICULTY":
      return { ...state, difficulty: action.payload };
    case "SET_AVAILABLE_SONGS_NUMBER":
      return {
        ...state,
        availableSongsNumber: action.payload,
      };
    case "SET_AVAILABLE_TRACKS":
      return {
        ...state,
        availableTracks: action.payload,
      };
    case "SET_TRACK_TYPE":
      return {
        ...state,
        trackType: action.payload,
      };
    case "SET_SONG_LIST_HIDDEN_STATUS":
      return {
        ...state,
        songListHiddenStatus: action.payload,
      };
    default:
      return state;
  }
}

function EarTrainerPage() {
  const [state, dispatch] = useReducer(reducer, initialState);

  function getAvailableSongsNumber() {
    const songs = state.availableTracks.filter(
      (song) =>
        song.songInstrument === state.instrument &&
        song.songDifficulty === state.difficulty
    );
    return songs.length;
  }

  // Update available songs number when instrument or difficulty changes

  function newSong() {
    const songs = state.availableTracks.filter(
      (song) =>
        song.songInstrument === state.instrument &&
        song.songDifficulty === state.difficulty
    );
    if (!songs || songs.length === 0) {
      return initialState.selectedSong;
    }
    const randomIndex = Math.floor(Math.random() * songs.length);
    dispatch({ type: "SET_AVAILABLE_SONGS_NUMBER", payload: songs.length });
    return songs[randomIndex];
  }

  function handleNewSong() {
    dispatch({ type: "SET_SONG", payload: newSong() });
    dispatch({ type: "SHOW_TIP", payload: false });
    dispatch({ type: "SHOW_SONG", payload: false });

    // Force the audio element to reload and play the new song
    const audioElement = document.getElementById(
      "audioPlayer"
    ) as HTMLAudioElement;
    if (audioElement) {
      audioElement.load();
      audioElement.play();
    }
  }

  function handleDifficultyChange(difficulty: string) {
    dispatch({ type: "SET_DIFFICULTY", payload: difficulty });
    dispatch({ type: "SHOW_TIP", payload: false });
    dispatch({ type: "SHOW_SONG", payload: false });
  }

  function handleInstrumentChange(instrument: Instrument) {
    dispatch({ type: "SET_INSTRUMENT", payload: instrument });
    dispatch({ type: "SHOW_TIP", payload: false });
    dispatch({ type: "SHOW_SONG", payload: false });
  }

  async function getUserTrackList() {
    const getTracksList = async () => {
      try {
        console.log("Fetching user tracks...");
        const startTime = performance.now();
        const availableTracks = await getAudioTracksList();
        const endTime = performance.now();
        const duration = endTime - startTime;

        // Add blank songData to tracks that don't have it
        const tracksWithSongData = availableTracks.map((track: AudioTrack) => ({
          ...track,
          songData: track.songData || "",
        }));
        console.log(
          `User tracks received in ${duration.toFixed(2)}ms:`,
          tracksWithSongData
        );
        console.log(
          "Number of available tracks:",
          tracksWithSongData?.length || 0
        );
        return tracksWithSongData;
      } catch (error) {
        console.error("Failed to fetch available tracks:", error);
        return [];
      }
    };
    return getTracksList();
  }

  // function mergeTracks(tracks: AudioTrack[]) {}

  useEffect(() => {
    dispatch({
      type: "SET_AVAILABLE_SONGS_NUMBER",
      payload: getAvailableSongsNumber(),
    });
  }, [state.instrument, state.difficulty]);

  useEffect(() => {
    const fetchTracks = async () => {
      if (state.trackType === "user") {
        const userTracks = (await getUserTrackList()) as AudioTrack[];
        dispatch({ type: "SET_AVAILABLE_TRACKS", payload: userTracks });
      } else if (state.trackType === "standard") {
        dispatch({
          type: "SET_AVAILABLE_TRACKS",
          payload: realSongListRealDifficultyFlatArray,
        });
      } else if (state.trackType === "all") {
        const userTracks = await getUserTrackList();
        const standardTracks = realSongListRealDifficultyFlatArray;
        const allTracks = [...userTracks, ...standardTracks];
        dispatch({ type: "SET_AVAILABLE_TRACKS", payload: allTracks });
      }
    };
    fetchTracks();
  }, [state.trackType]);

  // Debug logging
  console.log("Current state availableTracks:", state.availableTracks);
  console.log("Available tracks length:", state.availableTracks?.length || 0);

  return (
    <div className="container d-flex flex-column align-items-center">
      <h1 className="mb-4">Ear Trainer</h1>
      <p
        style={{ maxWidth: "600px", width: "100%" }}
        className="text-center mb-4"
      >
        Here are banks of songs with very stripped down arrangements organized
        by instrument and difficulty, making it easy to find songs that are
        appropriate for your skill level.
      </p>

      {/* Random Song Player */}
      <div style={{ width: "100%", maxWidth: "400px" }}>
        <h2 className="mb-4 text-center">Random Song Player</h2>
        {state.selectedSong.songData && (
          <audio
            src={state.selectedSong.songData}
            id="audioPlayer"
            controls
            style={{ width: "100%" }}
          >
            Your browser does not support the audio tag.
          </audio>
        )}
        {/* Selectors */}
        <div className="mt-4">
          {/* Track Type Selector */}
          <div className="mb-3">
            <label className="form-label">Track Type:</label>
            <select
              className="form-select"
              value={state.trackType}
              onChange={(e) =>
                dispatch({
                  type: "SET_TRACK_TYPE",
                  payload: e.target.value as TrackType,
                })
              }
            >
              <option value="all">All</option>
              <option value="user">User</option>
              <option value="standard">Standard</option>
            </select>
          </div>
          {/* Instrument Selector */}
          <div className="mb-3">
            <label className="form-label">Instrument:</label>
            <select
              className="form-select"
              value={state.instrument}
              onChange={(e) =>
                handleInstrumentChange(e.target.value as Instrument)
              }
            >
              {(
                [
                  "guitar",
                  "piano",
                  "bass",
                  "guitar-bass",
                  "guitar-bass-piano",
                ] as Instrument[]
              ).map((instrument) => {
                const hasAnySongs = instrumentDifficulties[instrument].some(
                  (difficulty) => {
                    const songs = state.availableTracks.filter(
                      (song) =>
                        song.songInstrument === instrument &&
                        song.songDifficulty === difficulty
                    );
                    return songs.length > 0;
                  }
                );
                return (
                  <option
                    key={instrument}
                    value={instrument}
                    style={{ color: hasAnySongs ? "inherit" : "red" }}
                  >
                    {instrument
                      .replace(/-/g, " ")
                      .replace(/\b\w/g, (l) => l.toUpperCase())}
                    {!hasAnySongs && " (No songs)"}
                  </option>
                );
              })}
            </select>
          </div>
          {/* Difficulty Selector */}
          <div className="mb-3">
            <label className="form-label">Difficulty:</label>
            <select
              className="form-select"
              value={state.difficulty}
              onChange={(e) => handleDifficultyChange(e.target.value)}
            >
              {instrumentDifficulties[state.instrument].map((difficulty) => {
                const songs = state.availableTracks.filter(
                  (song) =>
                    song.songInstrument === state.instrument &&
                    song.songDifficulty === difficulty
                );
                const hasSongs = songs.length > 0;
                return (
                  <option
                    key={difficulty}
                    value={difficulty}
                    style={{ color: hasSongs ? "inherit" : "red" }}
                  >
                    {difficulty
                      .replace(/-/g, " ")
                      .replace(/\b\w/g, (l) => l.toUpperCase())}
                    {hasSongs ? ` (${songs.length})` : " (No songs)"}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
        {/* Buttons */}
        <div className="d-flex flex-row align-items-center justify-content-center gap-2">
          <button
            className="btn btn-primary mt-3"
            onClick={() => handleNewSong()}
          >
            New Song
          </button>

          <button
            className="btn btn-primary mt-3"
            onClick={() =>
              dispatch({
                type: "SHOW_TIP",
                payload: true,
              })
            }
          >
            Show Tip
          </button>

          <button
            className="btn btn-primary mt-3"
            onClick={() =>
              dispatch({
                type: "SHOW_SONG",
                payload: true,
              })
            }
          >
            Show Song
          </button>
        </div>
        {/* Tip and Song Title */}
        <div className="d-flex flex-column align-items-center justify-content-center gap-2">
          {state.showTip && (
            <div className="mt-2">Tip: {state.selectedSong.songTip}</div>
          )}
          {state.showSong && (
            <div className="mt-2">
              Song Title: {state.selectedSong.songName}
            </div>
          )}
        </div>
      </div>
      {/* MAKE THIS POSSIBLE TO HIDE */}
      {/* Song List */}
      {!state.songListHiddenStatus && (
        <div className="d-flex flex-column align-items-center justify-content-center gap-2 mt-5">
          <h2 className="mb-4 text-center">Song List</h2>
          <h4 className="mb-4 text-center">
            {state.instrument.charAt(0).toUpperCase() +
              state.instrument.slice(1)}{" "}
            {state.difficulty}
          </h4>

          {state.availableTracks.map((track) => (
            <div key={track.audioTrackId}>
              <p>{track.songName}</p>
            </div>
          ))}
        </div>
      )}
      {/* Call to action */}
      <div className="mt-5">
        <p>Create an account to contribute your own tracks.</p>
      </div>
    </div>
  );
}

export default EarTrainerPage;
