import { useState } from "react";
import "./TextInput.css";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export default function PasswordTextInput({
  placeholder,
  inputName,
  value,
  onChange,
  error,
  id,
}) {
  //controls whether password is visible
  const [isVisible, setVisibility] = useState(false);

  const toggleVisible = () => setVisibility(!isVisible);

  return (
    <div className="TextInput-container">
      <div style={{ width: "100%", position: "relative" }}>
        <input
          className={`TextInput password ${error ? "error" : ""}`}
          type={isVisible ? "text" : "password"}
          placeholder={placeholder}
          name={inputName}
          value={value}
          onChange={onChange}
          id={id}
        />
        <FontAwesomeIcon
          icon={isVisible ? faEyeSlash : faEye}
          onClick={toggleVisible}
          className="password-visible-icon"
        />
      </div>

      <span className="TextInput-error">{error && error}</span>
    </div>
  );
}
