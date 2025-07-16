import { notes } from "../assets/resources";

function FretboardSettings({ state, dispatch }: { state: any; dispatch: any }) {
  return (
    <div className="container d-flex flex-column align-items-center">
      <h1 className="mb-4">Fretboard Settings</h1>
      <div>
        <div className="d-flex flex-row align-items-center justify-content-center mb-2">
          <p className="me-2 mb-0">Scale:</p>
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
        <div className="d-flex flex-row align-items-center justify-content-center mb-2">
          <p className="me-2 mb-0">Key:</p>
          <select
            className="form-select"
            value={state.currentKey}
            onChange={(e) =>
              dispatch({ type: "setCurrentKey", payload: e.target.value })
            }
          >
            <option value="empty">Empty</option>
            {notes.map((note) => (
              <option value={note.value}>{note.display}</option>
            ))}
          </select>
        </div>
        {/* <div className="d-flex flex-row align-items-center justify-content-center mb-2">
          <p className="me-2 mb-0">Shape:</p>
          <select
            className="form-select"
            value={state.currentShape}
            onChange={(e) =>
              dispatch({ type: "setCurrentShape", payload: e.target.value })
            }
          >
            <option value="empty">Empty</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </div> */}
      </div>
      <p>This is the fretboard settings page.</p>
    </div>
  );
}

export default FretboardSettings;
