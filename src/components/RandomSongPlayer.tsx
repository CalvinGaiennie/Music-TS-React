import type { State, Action } from "../assets/earTrainerTypesAndInterfaces";
import { getAudioTracks } from "../services/api";

function RandomSongPlayer({
  state,
  dispatch,
  initialState,
}: {
  state: State;
  dispatch: (action: Action) => void;
  initialState: State;
}) {
  async function newSong() {
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
    const selectedSong = songs[randomIndex];

    // If it's a user track (has audioTrackId), fetch the full track data
    if (selectedSong.audioTrackId && selectedSong.audioTrackId > 0) {
      try {
        const audioTrack = await getAudioTracks(selectedSong.audioTrackId);
        if (audioTrack && audioTrack.length > 0) {
          const track = audioTrack[0]; // Get the first element from the array
          return track; // Return the single track
        }
      } catch (error) {
        console.error("Error fetching audio track:", error);
      }
    }

    return selectedSong;
  }
  async function handleNewSong() {
    const newestSong = await newSong();
    dispatch({ type: "SET_SONG", payload: newestSong });
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
  return (
    <div style={{ width: "100%", maxWidth: "400px" }}>
      <h2 className="mb-4 mt-4 text-center">Random Song Player</h2>
      <audio
        src={state.selectedSong.songBlobUrl || undefined}
        id="audioPlayer"
        controls
        style={{ width: "100%" }}
      >
        Your browser does not support the audio tag.
      </audio>
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
          <div className="mt-2">Song Title: {state.selectedSong.songName}</div>
        )}
      </div>
    </div>
  );
}

export default RandomSongPlayer;
