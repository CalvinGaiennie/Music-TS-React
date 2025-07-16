import { useEffect, useReducer } from "react";
import FretboardSettings from "../components/FretboardSettings";
import Fretboard from "../components/Fretboard";

type State = {
  currentKey: string;
  currentScale: string;
  currentShape: string;
  isScaleActive: boolean;
  hoveredFret: string | null;
};

type Action =
  | { type: "setCurrentKey"; payload: string }
  | { type: "setCurrentScale"; payload: string }
  | { type: "setCurrentShape"; payload: string }
  | { type: "setIsScaleActive"; payload: boolean }
  | { type: "setHoveredFret"; payload: string | null };

const initialState: State = {
  currentKey: "empty",
  currentScale: "empty",
  currentShape: "empty",
  isScaleActive: false,
  hoveredFret: null,
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "setCurrentKey":
      return { ...state, currentKey: action.payload };
    case "setCurrentScale":
      return { ...state, currentScale: action.payload };
    case "setCurrentShape":
      return { ...state, currentShape: action.payload };
    case "setIsScaleActive":
      return { ...state, isScaleActive: action.payload };
    case "setHoveredFret":
      return { ...state, hoveredFret: action.payload };
    default:
      return state;
  }
}

function FretboardSimulatorPage() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (
      state.currentScale === "allnotes" ||
      (state.currentKey !== "empty" && state.currentScale !== "empty")
    ) {
      dispatch({ type: "setIsScaleActive", payload: true });
    } else {
      dispatch({ type: "setIsScaleActive", payload: false });
    }
  }, [state.currentKey, state.currentScale]);

  return (
    <div className="container d-flex flex-column align-items-center">
      <h1 className="mb-4">Fretboard Simulator</h1>
      <Fretboard dispatch={dispatch} state={state} />
      <FretboardSettings state={state} dispatch={dispatch} />
    </div>
  );
}

export default FretboardSimulatorPage;
