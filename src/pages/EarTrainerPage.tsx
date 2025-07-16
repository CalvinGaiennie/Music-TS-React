import { useReducer } from "react";

type Difficulty = "easy" | "medium" | "hard";

interface State {
  songList: {
    easy: {
      tip: string;
      song: string;
      songName: string;
    }[];
    medium: {
      tip: string;
      song: string;
      songName: string;
    }[];
    hard: {
      tip: string;
      song: string;
      songName: string;
    }[];
  };
  difficulty: Difficulty;
  selectedSong: {
    tip: string;
    song: string;
    songName: string;
  };
  showSong: boolean;
  showTip: boolean;
}

const initialState: State = {
  songList: {
    easy: [
      {
        tip: "This is a tip 1",
        song: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
        songName: "Song 1",
      },
      {
        tip: "This is a tip 2",
        song: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
        songName: "Song 2",
      },
      {
        tip: "This is a tip 3",
        song: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
        songName: "Song 3",
      },
    ],
    medium: [
      {
        tip: "This is a tip 4",
        song: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
        songName: "Song 4",
      },
      {
        tip: "This is a tip 5",
        song: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
        songName: "Song 5",
      },
      {
        tip: "This is a tip 6",
        song: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
        songName: "Song 6",
      },
    ],
    hard: [
      {
        tip: "This is a tip 7",
        song: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3",
        songName: "Song 7",
      },
      {
        tip: "This is a tip 8",
        song: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3",
        songName: "Song 8",
      },
      {
        tip: "This is a tip 9",
        song: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3",
        songName: "Song 9",
      },
    ],
  },
  difficulty: "hard" as Difficulty,
  selectedSong: {
    tip: "",
    song: "",
    songName: "",
  },
  showSong: false,
  showTip: false,
};

function reducer(
  state: State,
  action: {
    type: string;
    payload:
      | { tip: string; song: string; songName: string }
      | Difficulty
      | boolean;
  }
) {
  switch (action.type) {
    case "SET_SONG":
      return {
        ...state,
        selectedSong: action.payload as {
          tip: string;
          song: string;
          songName: string;
        },
      };
    case "SHOW_SONG":
      return { ...state, showSong: action.payload as boolean };
    case "SHOW_TIP":
      return { ...state, showTip: action.payload as boolean };
    case "SET_DIFFICULTY":
      return { ...state, difficulty: action.payload as Difficulty };
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
