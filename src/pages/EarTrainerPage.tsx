import { useReducer, useEffect } from "react";
import {
  realSongListRealDifficulty,
  instrumentDifficulties,
} from "../assets/resources";
import {
  type State,
  type Action,
  type Song,
  type Instrument,
} from "../assets/earTrainerTypesAndInterfaces";

const initialState: State = {
  instrument: "guitar",
  difficulty: "simple-melody",
  selectedSong: {
    Path: "",
    Title: "",
    Tip: "",
    Key: "",
    Chords: "",
  } as Song,
  showSong: false,
  showTip: false,
  availableSongsNumber: 0,
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
    default:
      return state;
  }
}

function EarTrainerPage() {
  const [state, dispatch] = useReducer(reducer, initialState);

  function getAvailableSongsNumber() {
    const songs =
      realSongListRealDifficulty[state.instrument][
        state.difficulty as keyof (typeof realSongListRealDifficulty)[typeof state.instrument]
      ];
    return songs.length;
  }

  // Update available songs number when instrument or difficulty changes

  function newSong() {
    const songs =
      realSongListRealDifficulty[state.instrument][
        state.difficulty as keyof (typeof realSongListRealDifficulty)[typeof state.instrument]
      ];
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

  useEffect(() => {
    dispatch({
      type: "SET_AVAILABLE_SONGS_NUMBER",
      payload: getAvailableSongsNumber(),
    });
  }, [state.instrument, state.difficulty]);

  return (
    <div className="container d-flex flex-column align-items-center">
      <h1 className="mb-4">Ear Trainer</h1>
      <p>
        Here are banks of songs with very stripped down arrangements organized
        by instrument and difficulty, making it easy to find songs that are
        appropriate for your skill level.
      </p>

      <div style={{ width: "100%", maxWidth: "400px" }}>
        <audio
          src={state.selectedSong.Path}
          id="audioPlayer"
          controls
          style={{ width: "100%" }}
        >
          Your browser does not support the audio tag.
        </audio>

        {/* Instrument Selector */}
        <div className="mb-3 mt-4">
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
                  const songs =
                    realSongListRealDifficulty[instrument][
                      difficulty as keyof (typeof realSongListRealDifficulty)[typeof instrument]
                    ];
                  return songs && songs.length > 0;
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
              const songs =
                realSongListRealDifficulty[state.instrument][
                  difficulty as keyof (typeof realSongListRealDifficulty)[typeof state.instrument]
                ];
              const hasSongs = songs && songs.length > 0;
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
      </div>
      <div className="d-flex flex-column align-items-center justify-content-center gap-2">
        {state.showTip && (
          <div className="mt-2">Tip: {state.selectedSong.Tip}</div>
        )}
        {state.showSong && (
          <div className="mt-2">Song Title: {state.selectedSong.Title}</div>
        )}
      </div>
    </div>
  );
}

export default EarTrainerPage;
