import "./TextInput.css";

export default function TextInput({
  type,
  placeholder,
  inputName,
  value,
  onChange,
  error,
  id,
}) {
  return (
    <div className="TextInput-container">
      <input
        className={`TextInput ${error ? "error" : ""}`}
        type={type}
        placeholder={placeholder}
        name={inputName}
        value={value}
        onChange={onChange}
        id={id}
      />
      <span className="TextInput-error">{error && error}</span>
    </div>
  );
}
