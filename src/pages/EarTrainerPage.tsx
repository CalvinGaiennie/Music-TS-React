import { useReducer } from "react";
import { songList } from "../assets/resources";

type Difficulty = "easy" | "medium" | "hard";

interface Song {
  tip: string;
  song: string;
  songName: string;
}

interface State {
  songList: {
    easy: Song[];
    medium: Song[];
    hard: Song[];
  };
  difficulty: Difficulty;
  selectedSong: Song;
  showSong: boolean;
  showTip: boolean;
}

type Action =
  | { type: "SET_SONG"; payload: Song }
  | { type: "SHOW_SONG"; payload: boolean }
  | { type: "SHOW_TIP"; payload: boolean }
  | { type: "SET_DIFFICULTY"; payload: Difficulty };

const initialState: State = {
  songList: {
    easy: songList.easy,
    medium: songList.medium,
    hard: songList.hard,
  },
  difficulty: "hard",
  selectedSong: {
    tip: "",
    song: "",
    songName: "",
  } as Song,
  showSong: false,
  showTip: false,
};

function reducer(state: State, action: Action) {
  switch (action.type) {
    case "SET_SONG":
      return {
        ...state,
        selectedSong: action.payload,
      };
    case "SHOW_SONG":
      return { ...state, showSong: action.payload };
    case "SHOW_TIP":
      return { ...state, showTip: action.payload };
    case "SET_DIFFICULTY":
      return { ...state, difficulty: action.payload };
    default:
      return state;
  }
}

function EarTrainerPage() {
  const [state, dispatch] = useReducer(reducer, initialState);

  function newSong() {
    const randomIndex = Math.floor(
      Math.random() * state.songList[state.difficulty].length
    );
    return state.songList[state.difficulty][randomIndex];
  }

  function handleNewSong() {
    dispatch({ type: "SET_SONG", payload: newSong() });
    dispatch({ type: "SHOW_TIP", payload: false });
    dispatch({ type: "SHOW_SONG", payload: false });
  }

  function handleDifficultyChange(difficulty: Difficulty) {
    dispatch({ type: "SET_DIFFICULTY", payload: difficulty });
    dispatch({ type: "SHOW_TIP", payload: false });
    dispatch({ type: "SHOW_SONG", payload: false });
  }

  return (
    <div className="container d-flex flex-column align-items-center">
      <h1 className="mb-4">Ear Trainer</h1>
      <audio src={state.selectedSong.song} id="audioPlayer" controls>
        Your browser does not support the audio tag.
      </audio>
      <select
        value={state.difficulty}
        onChange={(e) => handleDifficultyChange(e.target.value as Difficulty)}
      >
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>
      <button className="btn btn-primary mt-3" onClick={() => handleNewSong()}>
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
      {state.showTip && <div>{state.selectedSong.tip}</div>}
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
      {state.showSong && <div>{state.selectedSong.song}</div>}
    </div>
  );
}

export default EarTrainerPage;
