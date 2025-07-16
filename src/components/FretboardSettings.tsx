import { notes } from "../assets/resources";

type State = {
  currentKey: string;
  currentScale: string;
};

type Action =
  | { type: "setCurrentKey"; payload: string }
  | { type: "setCurrentScale"; payload: string }
  | { type: "setCurrentShape"; payload: string }
  | { type: "setIsScaleActive"; payload: boolean }
  | { type: "setHoveredFret"; payload: string | null };

function FretboardSettings({
  state,
  dispatch,
}: {
  state: State;
  dispatch: (action: Action) => void;
}) {
  return (
    <div style={{ width: "100%", maxWidth: "400px" }} className="mb-2">
      {/* Scale Selector */}
      <div className="mb-3 mt-4">
        <label className="form-label">Scale:</label>
        <select
          className="form-select"
          value={state.currentScale}
          onChange={(e) =>
            dispatch({ type: "setCurrentScale", payload: e.target.value })
          }
        >
          <option value="empty">Select Scale</option>
          <option value="allnotes">All Notes</option>
          <option value="octaves">Octaves</option>
          <option value="major">Major</option>
          <option value="minor">Minor</option>
          <option value="majorPentatonic">Major Pentatonic</option>
          <option value="minorPentatonic">Minor Pentatonic</option>
          <option value="majorArpeggio">Major Arpeggio</option>
          <option value="minorArpeggio">Minor Arpeggio</option>
        </select>
      </div>

      {/* Key Selector */}
      <div className="mb-3">
        <label className="form-label">Key:</label>
        <select
          className="form-select"
          value={state.currentKey}
          onChange={(e) =>
            dispatch({ type: "setCurrentKey", payload: e.target.value })
          }
        >
          <option value="empty">Empty</option>
          {notes.map((note) => (
            <option key={note.value} value={note.value}>
              {note.display}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default FretboardSettings;
