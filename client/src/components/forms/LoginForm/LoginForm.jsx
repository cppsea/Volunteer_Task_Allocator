import React from "react";
import "../forms.css";
import "./LoginForm.css";
import TextInput from "../inputs/TextInputs/TextInput.jsx";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import PasswordTextInput from "../inputs/TextInputs/PasswordTextInput.jsx";
import useLogin from "../../../api/hooks/useLogin.jsx";

//Err validation functions
const isRequired = (input) => input.length > 0 || "This is required.";

export default function LoginForm() {
  //form data
  const [state, setState] = React.useState({
    username: "",
    password: "",
  });

  const { login, isLoading, error } = useLogin();

  //error messages; input name : message
  const [errMessages, setErrMessages] = useState({});

  //error validation functions
  const errFunctions = {
    username: [isRequired],
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
  const handleOnSubmit = async (evt) => {
    evt.preventDefault();

    const { username, password } = state;

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

    //if no errors from clientside validation
    if (Object.keys(currErrMessages).length === 0) {
      await login(state);

      //if errors
      if (error) {
        //display error
        //in this case, the only error would be if the username and password aren't valid combo
        //so we will display the error for both these inputs
        setErrMessages({
          username: error,
          password: error,
        });
      } else {
        //do navigation to home page here
        alert("Login Successful");
      }
    }
  };

  const navigate = useNavigate();
  return (
    <form onSubmit={handleOnSubmit} className="form login-container">
      <h1>Get Your Task</h1>

      <UsernameInput
        state={state}
        onChange={handleChange}
        error={errMessages.username}
      />

      <PasswordInput
        state={state}
        onChange={handleChange}
        error={errMessages.password}
      />

      <button className="login-btn">Log In</button>
      <span style={{ marginTop: "20px" }}>
        Don't have an account? Sign up <Link to={"/signup"}>here</Link>
      </span>
      <span style={{ marginTop: "20px" }}>
        Are you an admin? Login <Link to={"/admin-login"}>here</Link>
      </span>
    </form>
  );
}

const UsernameInput = ({ state, onChange, error }) => (
  <TextInput
    type="text"
    placeholder={"Username"}
    inputName={"username"}
    value={state.username}
    onChange={onChange}
    error={error}
    id={"username-input"}
  />
);

const PasswordInput = ({ state, onChange, error }) => (
  <PasswordTextInput
    type="password"
    placeholder={"Password"}
    inputName={"password"}
    value={state.password}
    onChange={onChange}
    error={error}
    id={"password-input"}
  />
);
