import "./Select.css";
//Select component, accepts array of options, which have a label and value prop
export default function Select({
  inputName,
  value,
  onChange,
  options,
  error,
  placeholder,
  id
}) {
  return (
    <div className="Select-container">
      <select
        className={`Select ${error ? "error" : ""}`}
        placeholder={placeholder}
        name={inputName}
        value={value}
        onChange={onChange}
        id={id}
      >
        <option value={null}>{placeholder}</option>
        {options.map(({ label, value }) => (
          <option key={label} value={value}>{label}</option>
        ))}
      </select>
      <span className="Select-error">{error && error}</span>
    </div>
  );
}
