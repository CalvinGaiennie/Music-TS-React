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
  options: (string | { name: string; definition: string })[];
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
        {options.map((option) => {
          const optionValue = typeof option === "string" ? option : option.name;
          const optionDisplay =
            typeof option === "string" ? option : option.definition;

          return (
            <option key={optionValue} value={optionValue}>
              {optionDisplay}
            </option>
          );
        })}
      </select>
      <div className="form-text">{formText}</div>
    </div>
  );
}

export default FormSelect;
