import type {
  State,
  Action,
  AudioTrack,
} from "../assets/earTrainerTypesAndInterfaces";
import { useEffect } from "react";
import { getAudioTracks } from "../services/api";
function SongListPlayer({
  state,
  dispatch,
}: {
  state: State;
  dispatch: (action: Action) => void;
}) {
  function playSong() {
    const audioPlayer = document.getElementById(
      "audioPlayer"
    ) as HTMLAudioElement;
    if (!audioPlayer) {
      return;
    }
    audioPlayer.play();
  }
  useEffect(() => {
    dispatch({ type: "SHOW_CHORDS", payload: false });
    dispatch({ type: "SHOW_TIP", payload: false });
    dispatch({ type: "SHOW_SONG", payload: false });
  }, [state.selectedSong]);
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
        onChange={async (e) => {
          const selectedTrack = state.availableTracks.find(
            (track) => track.songName === e.target.value
          ) as AudioTrack;

          // If it's a user track (has audioTrackId), fetch the full track data
          if (selectedTrack.audioTrackId && selectedTrack.audioTrackId > 0) {
            try {
              const audioTracks = await getAudioTracks(
                selectedTrack.audioTrackId
              );
              if (audioTracks && audioTracks.length > 0) {
                const trackWithAudio = audioTracks[0];
                dispatch({
                  type: "SET_SONG",
                  payload: trackWithAudio,
                });
                return;
              }
            } catch (error) {
              console.error("Error fetching track:", error);
            }
          }

          // For hardcoded tracks or if fetch fails, use the original track
          dispatch({
            type: "SET_SONG",
            payload: selectedTrack,
          });
        }}
        value={state.selectedSong.songName}
      >
        {state.availableTracks
          .filter(
            (track) =>
              track.songInstrument === state.instrument &&
              track.songDifficulty === state.difficulty
          )
          .map((track) => (
            <option key={track.audioTrackId} value={track.songName}>
              {track.songName}
            </option>
          ))}
      </select>
      <audio src={state.selectedSong.songBlobUrl} id="audioPlayer" controls />
      {/* Buttons */}
      <div className="d-flex flex-row align-items-center justify-content-center gap-2">
        <button
          className="btn btn-primary mt-3"
          onClick={() => {
            playSong();
          }}
        >
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
              type: "SHOW_CHORDS",
              payload: true,
            })
          }
        >
          Show Chords
        </button>
      </div>
      {/* Tip and Song Title */}
      <div className="d-flex flex-column align-items-center justify-content-center gap-2">
        {state.showTip && (
          <div className="mt-2">Tip: {state.selectedSong.songTip}</div>
        )}
        {state.showChords && (
          <div className="mt-2">
            Song Chords: {state.selectedSong.songChords}
          </div>
        )}
      </div>
    </div>
  );
}

export default SongListPlayer;
