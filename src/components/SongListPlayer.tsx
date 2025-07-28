import type { State, Action } from "../assets/earTrainerTypesAndInterfaces";
import { useState } from "react";
function SongListPlayer({
  state,
  dispatch,
}: {
  state: State;
  dispatch: (action: Action) => void;
}) {
  const [selectedSong, setSelectedSong] = useState<number | null>(null);

  function playSong() {
    if (!selectedSong) {
      return;
    }
    const song = state.availableTracks.find(
      (track) => track.audioTrackId === selectedSong
    );
    if (!song) {
      return;
    }
    dispatch({ type: "SET_SONG", payload: song });
    dispatch({ type: "SHOW_TIP", payload: false });
    dispatch({ type: "SHOW_SONG", payload: false });
  }
  return (
    <div className="d-flex flex-column align-items-center justify-content-center gap-2">
      {/* <h2 className="mb-2 text-center">Song List</h2> */}
      {/* <h4 className="mb-2 text-center">
        {state.instrument.charAt(0).toUpperCase() + state.instrument.slice(1)}{" "}
        {state.difficulty}
      </h4> */}
      <h2 className="mb-2 text-center">Select a Song</h2>
      <select
        className="form-select mb-2"
        onChange={(e) => setSelectedSong(parseInt(e.target.value))}
        value={selectedSong || ""}
      >
        {state.availableTracks
          .filter(
            (track) =>
              track.songInstrument === state.instrument &&
              track.songDifficulty === state.difficulty
          )
          .map((track) => (
            <option key={track.audioTrackId} value={track.audioTrackId}>
              {track.songName}
            </option>
          ))}
      </select>
      <audio src={state.selectedSong.songData} id="audioPlayer" controls />
      {/* Buttons */}
      <div className="d-flex flex-row align-items-center justify-content-center gap-2">
        <button className="btn btn-primary mt-3" onClick={() => playSong()}>
          Play Song
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
          <div className="mt-2">Song Title: {state.selectedSong.songName}</div>
        )}
      </div>
    </div>
  );
}

export default SongListPlayer;
