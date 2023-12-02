//contains textfield and label

import TextField from "../../inputs/TextField/TextField";
import "./TextFieldContainer.css";
//takes in label, textstate, onChange handler, and placeholder, id of input, input name
// eslint-disable-next-line react/prop-types
export default function TextFieldContainer({
  label,
  textState,
  onChange,
  placeholder,
  id,
  name,
}) {
  return (
    <div className="text-field-container">
      <label htmlFor={id} className="textfield-label">
        {label}
      </label>
      <TextField
        id={id}
        name={name}
        textState={textState[name]}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );
}
