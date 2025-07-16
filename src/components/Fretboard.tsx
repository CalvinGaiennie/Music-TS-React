import styles from "./Fretboard.module.css";

type State = {
  currentKey: string;
  currentScale: string;
  isScaleActive: boolean;
  hoveredFret: string | null;
};

type Action =
  | { type: "setCurrentKey"; payload: string }
  | { type: "setCurrentScale"; payload: string }
  | { type: "setCurrentShape"; payload: string }
  | { type: "setIsScaleActive"; payload: boolean }
  | { type: "setHoveredFret"; payload: string | null };

function Fretboard({
  dispatch,
  state,
}: {
  dispatch: (action: Action) => void;
  state: State;
}) {
  const stringNames = ["E", "B", "G", "D", "A", "E"];

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

  function getNoteAtFret(stringNote: string, fretNumber: number) {
    const startIndex = notes.findIndex((note) => note === stringNote);
    return notes[(startIndex + fretNumber) % 12];
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

  function isNoteInScale(noteName: string) {
    if (state.currentScale === "empty") return false;
    if (state.currentScale === "allnotes") return true; // Show all notes regardless of key
    if (state.currentKey === "empty") return false;
    const scaleNotes = buildScale(state.currentKey, state.currentScale);
    return scaleNotes.includes(noteName);
  }

  function buildScale(startNote: string, scaleName: string) {
    if (scaleName === "empty") return [];
    const startIndex = notes.findIndex((note) => note === startNote);
    return scales[scaleName].map(
      (interval: number) => notes[(interval + startIndex) % 12]
    );
  }

  return (
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
  );
}

export default Fretboard;
