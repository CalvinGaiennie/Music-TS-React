function FormSelect({
  label,
  value,
  formText,
  state,
  dispatch,
  options,
}: {
  label: string;
  value: string;
  formText: string;
  state: string;
  dispatch: (action: { type: string; payload: string }) => void;
  options: string[];
}) {
  return (
    <div className="mb-3">
      <label className="form-label fw-bold">{label}</label>
      <select
        className="form-select"
        value={state}
        onChange={(e) =>
          dispatch({ type: "set" + value, payload: e.target.value })
        }
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <div className="form-text">{formText}</div>
    </div>
  );
}

export default FormSelect;
