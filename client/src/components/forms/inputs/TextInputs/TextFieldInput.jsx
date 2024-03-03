import "./TextInput.css";

export default function TextFieldInput({
  placeholder,
  inputName,
  value,
  onChange,
  error,
  id,
}) {
  return (
    <div className="TextInput-container">
      <textarea
        className={`TextInput textarea ${error ? "error" : ""}`}
        placeholder={placeholder}
        name={inputName}
        value={value}
        onChange={onChange}
        rows={3}
        id={id}
      />
      <span className="TextInput-error">{error && error}</span>
    </div>
  );
}
