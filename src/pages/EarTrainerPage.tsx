import { useReducer, useEffect, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  realSongListRealDifficultyFlatArray,
  instrumentDifficulties,
} from "../assets/resources";
import {
  type State,
  type Action,
  type AudioTrack,
  type TrackType,
  type SongPlayerType,
  type Instrument,
} from "../assets/earTrainerTypesAndInterfaces";
import { getAudioTracks } from "../services/api";
import { AuthContext, type AuthContextType } from "../context/AuthContextDef";
// import RandomSongPlayer from "../components/RandomSongPlayer";
import SongListPlayer from "../components/SongListPlayer";
import SongPlayerSettings from "../components/SongPlayerSettings";
import RandomSongPlayer from "../components/RandomSongPlayer";

const initialState: State = {
  instrument: "guitar",
  difficulty: "",
  selectedSong: {
    audioTrackId: 0,
    userId: 0,
    songName: "",
    songTip: "",
    songKey: "",
    songChords: "",
    songInstrument: "",
    songDifficulty: "",
    songBlobUrl: "",
  } as AudioTrack,
  showSong: false,
  showTip: false,
  showChords: false,
  availableSongsNumber: 0,
  availableTracks: [] as AudioTrack[],
  trackType: "all" as TrackType,
  songPlayerType: "choosen" as SongPlayerType,
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
    case "SHOW_CHORDS":
      return { ...state, showChords: action.payload };
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
    case "SET_SONG_PLAYER_TYPE":
      return {
        ...state,
        songPlayerType: action.payload,
      };
    default:
      return state;
  }
}

function EarTrainerPage() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { isLoggedIn } = useContext(AuthContext) as AuthContextType;
  const navigate = useNavigate();

  const handleContributeClick = () => {
    if (isLoggedIn) {
      navigate("/contribute");
    } else {
      navigate("/create-account");
    }
  };

  function getAvailableSongsNumber() {
    const songs = state.availableTracks.filter(
      (song) =>
        song.songInstrument === state.instrument &&
        song.songDifficulty === state.difficulty
    );
    return songs.length;
  }

  async function getUserTrackList() {
    const getTracksList = async () => {
      try {
        // console.log("Fetching user tracks...");
        // const startTime = performance.now();
        const availableTracks = await getAudioTracks();
        // const endTime = performance.now();
        // const duration = endTime - startTime;
        // console.log("duration", duration);

        return availableTracks;
      } catch (error) {
        console.error("Failed to fetch available tracks:", error);
        return [];
      }
    };
    return getTracksList();
  }

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
      } else if (state.trackType === "official") {
        dispatch({
          type: "SET_AVAILABLE_TRACKS",
          payload: realSongListRealDifficultyFlatArray as AudioTrack[],
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

  // Auto-switch to first available instrument/difficulty when track type changes
  useEffect(() => {
    const currentSongs = state.availableTracks.filter(
      (song) =>
        song.songInstrument === state.instrument &&
        song.songDifficulty === state.difficulty
    );

    if (currentSongs.length === 0 && state.availableTracks.length > 0) {
      // Find first instrument with songs
      for (const instrument of [
        "guitar",
        "piano",
        "bass",
        "guitar-bass",
        "guitar-bass-piano",
      ]) {
        const instrumentSongs = state.availableTracks.filter(
          (song) => song.songInstrument === instrument
        );

        if (instrumentSongs.length > 0) {
          // Find first difficulty with songs for this instrument
          const difficulties =
            instrumentDifficulties[
              instrument as keyof typeof instrumentDifficulties
            ];
          for (const difficulty of difficulties) {
            const difficultySongs = instrumentSongs.filter(
              (song) => song.songDifficulty === difficulty
            );

            if (difficultySongs.length > 0) {
              dispatch({
                type: "SET_INSTRUMENT",
                payload: instrument as Instrument,
              });
              dispatch({ type: "SET_DIFFICULTY", payload: difficulty });
              break;
            }
          }
          break;
        }
      }
    }
  }, [state.availableTracks]);

  // Auto-switch to first available difficulty when instrument changes
  useEffect(() => {
    const currentSongs = state.availableTracks.filter(
      (song) =>
        song.songInstrument === state.instrument &&
        song.songDifficulty === state.difficulty
    );

    if (currentSongs.length === 0 && state.availableTracks.length > 0) {
      // Find first difficulty with songs for current instrument
      const difficulties = instrumentDifficulties[state.instrument];
      for (const difficulty of difficulties) {
        const difficultySongs = state.availableTracks.filter(
          (song) =>
            song.songInstrument === state.instrument &&
            song.songDifficulty === difficulty
        );

        if (difficultySongs.length > 0) {
          dispatch({ type: "SET_DIFFICULTY", payload: difficulty });
          break;
        }
      }
    }
  }, [state.instrument, state.availableTracks]);

  // Auto-select first available song when tracks change
  useEffect(() => {
    dispatch({ type: "SHOW_CHORDS", payload: false });
    dispatch({ type: "SHOW_TIP", payload: false });
    dispatch({ type: "SHOW_SONG", payload: false });
    const filteredTracks = state.availableTracks.filter(
      (track) =>
        track.songInstrument === state.instrument &&
        track.songDifficulty === state.difficulty
    );

    // Check if current selected song is valid for current instrument/difficulty
    const isCurrentSongValid = filteredTracks.some(
      (track) => track.songName === state.selectedSong.songName
    );

    if (
      filteredTracks.length > 0 &&
      (!state.selectedSong.songName || !isCurrentSongValid)
    ) {
      dispatch({
        type: "SET_SONG",
        payload: filteredTracks[0],
      });
    }
  }, [state.availableTracks, state.instrument, state.difficulty]);

  return (
    <div className="container d-flex flex-column align-items-center mb-5">
      <div className="position-relative text-center w-100 mb-5">
        <h1 className="text-center mb-3">Ear Trainer</h1>
        <div className="position-absolute top-0 end-0 d-flex flex-row align-items-center gap-2">
          <select
            className="form-select"
            value={state.songPlayerType}
            onChange={(e) =>
              dispatch({
                type: "SET_SONG_PLAYER_TYPE",
                payload: e.target.value as SongPlayerType,
              })
            }
          >
            <option value="choosen">Choosen</option>
            <option value="random">Random</option>
          </select>
        </div>
        <p className="text-center mb-2 fs-5">
          Select a song of your desired difficulty and see if you can figure out
          how to play it.
        </p>
        <p className="text-muted">
          (See the <a href="/help">Help Page</a> for more information on how
          this tool works and what the different difficulty levels mean.)
        </p>
      </div>

      {/* Main Content */}
      <div className="w-100 d-flex flex-column align-items-center">
        {state.songPlayerType === "random" ? (
          <RandomSongPlayer
            state={state}
            dispatch={dispatch}
            initialState={initialState}
          />
        ) : (
          <SongListPlayer state={state} dispatch={dispatch} />
        )}
        <SongPlayerSettings state={state} dispatch={dispatch} />

        {/* Quick Access to Song Library */}
        <div className="text-center mt-4">
          <Link to="/song-library" className="btn btn-outline-secondary">
            <i className="fas fa-list me-2"></i>
            View Complete Song Library
          </Link>
        </div>
      </div>

      {/* Call to action */}
      <div className="mt-5 text-center">
        <div className="bg-light p-4 rounded-3 border">
          <h5 className="text-muted mb-3">
            <i className="fas fa-users me-2"></i>
            Join the community and contribute your own tracks!
          </h5>
          <button
            onClick={handleContributeClick}
            className="btn btn-primary btn-lg"
          >
            <i className="fas fa-plus me-2"></i>
            Start Contributing
          </button>
        </div>
      </div>
    </div>
  );
}

export default EarTrainerPage;

//add a basic normal metronome
