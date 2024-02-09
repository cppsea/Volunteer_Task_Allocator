import React from "react";
import "../forms.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import PasswordTextInput from "../inputs/TextInputs/PasswordTextInput.jsx";

//Err validation functions
const isRequired = (input) => input.length > 0 || "This is required.";

export default function AdminLoginForm() {
  //form data
  const [state, setState] = React.useState({
    password: "",
  });

  //error messages; input name : message
  const [errMessages, setErrMessages] = useState({});

  //error validation functions
  const errFunctions = {
    password: [isRequired],
  };

  //input handler
  const handleChange = (evt) => {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value,
    });
  };

  //submit handler
  const handleOnSubmit = (evt) => {
    evt.preventDefault();

    const { name, password } = state;

    //loop through error validation functions for each input
    //if the current input has an error, then we just display that error and move on to next input
    //if there are no errors for all inputs, alert info

    const currErrMessages = {};

    for (const input_name in errFunctions) {
      const currErrFuncs = errFunctions[input_name];
      for (let errFunc of currErrFuncs) {
        let currErrResult = errFunc(state[input_name]);
        if (typeof currErrResult === "string") {
          currErrMessages[input_name] = currErrResult;
          break;
        }
      }
    }

    setErrMessages(currErrMessages);

    if (Object.keys(currErrMessages).length === 0) {
      alert(`You are logged in with password: ${password}`);
      navigate("/admin-tasks");
    }
  };

  const navigate = useNavigate();
  return (
    <form onSubmit={handleOnSubmit} className="form">

      <PasswordInput
        state={state}
        onChange={handleChange}
        error={errMessages.password}
      />

      <button className="login-btn">Log In</button>
      <span style={{ marginTop: "20px", lineHeight: "30px" }}>
        Not an admin? Go sign up <Link to={"/signup"}>here</Link> or login as a
        volunteer <Link to={"/login"}>here</Link>
      </span>
    </form>
  );
}

const PasswordInput = ({ state, onChange, error }) => (
  <PasswordTextInput
    type="password"
    placeholder={"Password"}
    inputName={"password"}
    value={state.password}
    onChange={onChange}
    error={error}
  />
);
