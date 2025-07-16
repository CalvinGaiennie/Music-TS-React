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
    <div style={{ width: "100%", maxWidth: "400px" }}>
      {/* BPM Selector */}
      <div className="mb-3">
        <label className="form-label">BPM:</label>
        <select
          className="form-select"
          onChange={(e) =>
            dispatch({ type: "SET_BPM", payload: parseInt(e.target.value) })
          }
          value={state.bpm}
        >
          {Array.from({ length: 161 }, (_, i) => (
            <option key={i} value={i + 40}>
              {i + 40}
            </option>
          ))}
        </select>
      </div>

      {/* Note Type Selector */}
      <div className="mb-3">
        <label className="form-label">Note Type:</label>
        <select
          className="form-select"
          onChange={(e) =>
            dispatch({
              type: "SET_NOTE_TYPE",
              payload: parseInt(e.target.value),
            })
          }
          value={state.noteType}
        >
          <option value="4">Quarter</option>
          <option value="8">Eighth</option>
          <option value="16">Sixteenth</option>
        </select>
      </div>

      {/* Measures Per Rudiment Selector */}
      <div className="mb-3">
        <label className="form-label">Measures Per Rudiment:</label>
        <select
          className="form-select"
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
