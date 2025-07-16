type Action = { type: string; payload: number };

function MetronomeSettings({
  dispatch,
  state,
}: {
  dispatch: (action: Action) => void;
  state: {
    numOfMeasures: number;
    bpm: number;
    noteType: number;
  };
}) {
  return (
    <div className="d-flex flex-column mt-4 mb-4 gap-4">
      <div>
        <h3>BPM</h3>
        <select
          onChange={(e) =>
            dispatch({ type: "SET_BPM", payload: parseInt(e.target.value) })
          }
          value={state.bpm}
        >
          {Array.from({ length: 161 }, (_, i) => (
            <option key={i} value={i + 40} selected={i === 80}>
              {i + 40}
            </option>
          ))}
        </select>
      </div>
      <div>
        <h3>Note Type</h3>
        <select
          onChange={(e) =>
            dispatch({
              type: "SET_NOTE_TYPE",
              payload: parseInt(e.target.value),
            })
          }
          value={state.noteType}
        >
          <option value="4">Quarter</option>
          <option value="8" selected>
            Eighth
          </option>
          <option value="16">Sixteenth</option>
        </select>
      </div>
      <div>
        <h3>Measures Per Rudiment</h3>
        <select
          onChange={(e) =>
            dispatch({
              type: "SET_NUM_OF_MEASURES",
              payload: parseInt(e.target.value),
            })
          }
          value={state.numOfMeasures}
        >
          {Array.from({ length: 25 }, (_, i) => (
            <option key={i} value={(i + 1) * 2}>
              {(i + 1) * 2}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default MetronomeSettings;
