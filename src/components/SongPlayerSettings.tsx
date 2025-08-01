import type {
  State,
  Action,
  TrackType,
  Instrument,
} from "../assets/earTrainerTypesAndInterfaces";
import { instrumentDifficulties } from "../assets/earTrainerTypesAndInterfaces";

function SongPlayerSettings({
  state,
  dispatch,
}: {
  state: State;
  dispatch: (action: Action) => void;
}) {
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

  return (
    <div className="mt-4">
      <style>
        {`
          select option.text-muted {
            color: #6c757d !important;
          }
        `}
      </style>
      <h2 className="mb-4 text-center">Select A Song Bank</h2>
      {/* Track Type Selector */}
      <div className="row g-3">
        <div className="col-md-4">
          <label className="form-label fw-bold">Track Type:</label>
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
            <option value="user">User Submitted Tracks</option>
            <option value="official">Built-in Tracks</option>
          </select>
        </div>
        {/* Instrument Selector */}
        <div className="col-md-4">
          <label className="form-label fw-bold">Instrument:</label>
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
                  disabled={!hasAnySongs}
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
        <div className="col-md-4">
          <label className="form-label fw-bold">Difficulty:</label>
          <select
            className="form-select"
            value={state.difficulty}
            onChange={(e) => handleDifficultyChange(e.target.value)}
          >
            {instrumentDifficulties[state.instrument].map((difficulty) => {
              const difficultyName = difficulty;
              const difficultyDisplay = difficulty
                .replace(/-/g, " ")
                .replace(/\b\w/g, (l) => l.toUpperCase());

              const songs = state.availableTracks.filter(
                (song) =>
                  song.songInstrument === state.instrument &&
                  song.songDifficulty === difficultyName
              );
              const hasSongs = songs.length > 0;
              return (
                <option
                  key={difficultyName}
                  value={difficultyName}
                  disabled={!hasSongs}
                >
                  {difficultyDisplay}
                  {hasSongs ? ` (${songs.length})` : " (No songs)"}
                </option>
              );
            })}
          </select>
        </div>
      </div>
    </div>
  );
}

export default SongPlayerSettings;
