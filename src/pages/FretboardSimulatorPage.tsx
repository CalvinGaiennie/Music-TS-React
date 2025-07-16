import { useEffect, useReducer } from "react";
import styles from "./Fretboard.module.css";
import FretboardSettings from "../components/FretboardSettings";

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

  const scales: Record<string, number[]> = {
    allnotes: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], // Just the root note
    octaves: [0, 12], // Root note and its octave
    major: [0, 2, 4, 5, 7, 9, 11],
    minor: [0, 2, 3, 5, 7, 8, 10],
    majorPentatonic: [0, 2, 4, 7, 9],
    minorPentatonic: [0, 3, 5, 7, 10],
    majorArpeggio: [0, 4, 7],
    minorArpeggio: [0, 3, 7],
  };

  const notes = [
    "A",
    "A#",
    "B",
    "C",
    "C#",
    "D",
    "D#",
    "E",
    "F",
    "F#",
    "G",
    "G#",
  ];
  const stringNames = ["E", "B", "G", "D", "A", "E"];

  function getNoteAtFret(stringNote: string, fretNumber: number) {
    const startIndex = notes.findIndex((note) => note === stringNote);
    return notes[(startIndex + fretNumber) % 12];
  }

  function buildScale(startNote: string, scaleName: string) {
    if (scaleName === "empty") return [];
    const startIndex = notes.findIndex((note) => note === startNote);
    return scales[scaleName].map(
      (interval: number) => notes[(interval + startIndex) % 12]
    );
  }

  function isNoteInScale(noteName: string) {
    if (state.currentScale === "empty") return false;
    if (state.currentScale === "allnotes") return true; // Show all notes regardless of key
    if (state.currentKey === "empty") return false;
    const scaleNotes = buildScale(state.currentKey, state.currentScale);
    return scaleNotes.includes(noteName);
  }

  function getFretClassName(
    fretId: string,
    noteName: string,
    fretNumber: number
  ) {
    const baseClass = `${styles.fret} ${
      fretNumber === 0 ? styles.fretnut : ""
    }`;
    const isActive = state.isScaleActive && isNoteInScale(noteName);
    const isHovered = !state.isScaleActive && state.hoveredFret === fretId;

    return `${baseClass} ${isActive || isHovered ? styles.active : ""}`;
  }

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
      <div className={styles.fretboard}>
        <div style={{ marginLeft: "50px" }}>
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={`string-${i + 1}`} className={styles.string}>
              {Array.from({ length: 12 }).map((_, j) => {
                const fretId = `fret-${j}-string-${i + 1}`;
                const noteName = getNoteAtFret(stringNames[i], j);

                return (
                  <div
                    key={fretId}
                    id={fretId}
                    className={getFretClassName(fretId, noteName, j)}
                    onMouseEnter={() =>
                      dispatch({ type: "setHoveredFret", payload: fretId })
                    }
                    onMouseLeave={() =>
                      dispatch({ type: "setHoveredFret", payload: null })
                    }
                    data-noteName={noteName}
                    data-stringNoteName={stringNames[i]}
                  >
                    {j !== 0 && (
                      <div
                        id={`innerFret-${j}-string-${i + 1}`}
                        style={
                          {
                            "--fret-number": j,
                            "--string-number": i + 1,
                          } as React.CSSProperties
                        }
                        className={`${styles.innerFret} ${
                          styles[`string${i + 1}`]
                        }`}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      <FretboardSettings state={state} dispatch={dispatch} />
    </div>
  );
}

export default FretboardSimulatorPage;
