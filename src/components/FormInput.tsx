function FormInput({
  label,
  value,
  placeholder,
  formText,
  state,
  dispatch,
}: {
  label: string;
  value: string;
  placeholder: string;
  formText: string;
  state: string;
  dispatch: (action: { type: string; payload: string }) => void;
}) {
  return (
    <div className="mb-3">
      <label className="form-label fw-bold">{label}</label>
      <input
        type="text"
        className="form-control"
        value={state}
        onChange={(e) =>
          dispatch({ type: "set" + value, payload: e.target.value })
        }
        placeholder={placeholder}
      />
      <div className="form-text">{formText}</div>
    </div>
  );
}

export default FormInput;
