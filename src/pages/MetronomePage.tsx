import { useEffect, useReducer } from "react";
import Metronome from "../components/Metronome.tsx";
import MetronomeSettings from "../components/MetronomeSettings.tsx";

const initialState = {
  bpm: 100,
  numOfBeats: 4,
  lengthOfBeat: 60 / 100,
  noteType: 8,
  numOfMeasures: 2,
};

type Action = { type: string; payload: number };

function reducer(state: typeof initialState, action: Action) {
  switch (action.type) {
    case "SET_BPM":
      return { ...state, bpm: action.payload };
    case "SET_NOTE_TYPE":
      return { ...state, noteType: action.payload };
    case "SET_NUM_OF_BEATS":
      return { ...state, numOfBeats: action.payload };
    case "SET_LENGTH_OF_BEAT":
      return { ...state, lengthOfBeat: action.payload };
    case "SET_NUM_OF_MEASURES":
      return { ...state, numOfMeasures: action.payload };
    default:
      return state;
  }
}

function MetronomePage() {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Calculate beat duration from BPM
  const beatDuration = 60 / state.bpm; // seconds per beat

  useEffect(() => {
    dispatch({ type: "SET_LENGTH_OF_BEAT", payload: beatDuration });
  }, [
    state.bpm,
    state.noteType,
    state.numOfMeasures,
    state.numOfBeats,
    dispatch,
  ]);

  return (
    <div className="container d-flex flex-column align-items-center">
      <h1>Metronome</h1>
      <div className="d-flex flex-row align-items-center justify-content-center gap-4">
        <MetronomeSettings dispatch={dispatch} state={state} />
        <Metronome {...state} />
      </div>
    </div>
  );
}

export default MetronomePage;
