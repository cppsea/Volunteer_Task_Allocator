/* eslint-disable react/prop-types */
import "./TextField.css";

//Custom TextField Input, takes in a state, onChange handler, placeholder, id, name

export default function TextField({
  textState,
  onChange,
  placeholder,
  id,
  name,
}) {
  return (
    <input
      id={id}
      className="textfield"
      name={name}
      type="text"
      defaultValue={textState}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
}
