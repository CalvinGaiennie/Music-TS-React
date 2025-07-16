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
    rudimentToStartOn: number;
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
      <div className="mb-3">
        <label className="form-label">Rudiment To Start On:</label>
        {/* <select
          className="form-select"
          onChange={(e) =>
            dispatch({
              type: "SET_RUDIMENT_TO_START_ON",
              payload: parseInt(e.target.value),
            })
          }
          value={state.rudimentToStartOn}
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
          <option value="11">11</option>
          <option value="12">12</option>
          <option value="13">13</option>
          <option value="14">14</option>
          <option value="15">15</option>
          <option value="16">16</option>
          <option value="17">17</option>
          <option value="18">18</option>
          <option value="19">19</option>
          <option value="20">20</option>
        </select> */}
      </div>
    </div>
  );
}

export default MetronomeSettings;
