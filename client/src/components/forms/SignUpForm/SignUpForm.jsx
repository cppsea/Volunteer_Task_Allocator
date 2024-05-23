import React, { useState } from "react";
import "../forms.css";
import "./SignUpForm.css";
import TextInput from "../inputs/TextInputs/TextInput.jsx";
import PasswordTextInput from "../inputs/TextInputs/PasswordTextInput.jsx";
import { Link } from "react-router-dom";
import { useSignup } from "../../../api/hooks/useSignup.jsx";

//Err validation functions
const isRequired = (input) => input.length > 0 || "This is required.";

const isEmail = (input) =>
  /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(input) || "Invalid email format";

const isValidPassword = (input) =>
  input.length >= 8 || "This needs to be at least 8 characters long";
function SignUpForm() {
  //form data
  const [state, setState] = React.useState({
    first_name: "",
    last_name: "",
    email: "",
    username: "",
    password: "",
    confirm_password: "",
  });

  const { signup, errors, isLoading } = useSignup();

  //error messages; input name : message
  const [errMessages, setErrMessages] = useState({});

  //error validation functions
  const errFunctions = {
    first_name: [isRequired],
    last_name: [isRequired],
    email: [isRequired, isEmail],
    username: [isRequired],
    password: [
      isRequired,
      isValidPassword,
      (input) =>
        input === state.confirm_password ||
        "Needs to match password confirmation",
    ],
    confirm_password: [
      isRequired,
      isValidPassword,
      (input) => input === state.password || "Needs to match password",
    ],
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

    //extract form data
    const { first_name, last_name, email, password, confirm_password } = state;

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

    //if no errors on client side, send call to backend to sign up
    if (Object.keys(currErrMessages).length === 0) {
      await signup(state);

      //if errors
      if (errors && errors.length > 0) {
        //for now at least the errors are one array with one error
        setErrMessages(errors[0]);
      } else {
        //navigate to login page
        alert("go login");
      }
    }
  };

  return (
    <form onSubmit={handleOnSubmit} className="form signup-container">
      <h1>Sign Up</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2,1fr)",
          columnGap: "20px",
        }}
      >
        <FirstNameInput
          state={state}
          onChange={handleChange}
          error={errMessages.first_name}
        />
        <LastNameInput
          state={state}
          onChange={handleChange}
          error={errMessages.last_name}
        />
      </div>

      <EmailInput
        state={state}
        onChange={handleChange}
        error={errMessages.email}
      />
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
      <ConfirmPasswordInput
        state={state}
        onChange={handleChange}
        error={errMessages.confirm_password}
      />
      <button className="signin-btn">Sign In</button>
      <span style={{ marginTop: "20px" }}>
        Already signed up? Login <Link to={"/login"}>here</Link>
      </span>
    </form>
  );
}

const FirstNameInput = ({ state, onChange, error }) => (
  <TextInput
    type="text"
    placeholder={"First Name"}
    inputName={"first_name"}
    value={state.first_name}
    onChange={onChange}
    error={error}
    id={"first-name-input"}
  />
);
const LastNameInput = ({ state, onChange, error }) => (
  <TextInput
    type="text"
    placeholder={"Last Name"}
    inputName={"last_name"}
    value={state.last_name}
    onChange={onChange}
    error={error}
    id={"last-name-input"}
  />
);
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
const EmailInput = ({ state, onChange, error }) => (
  <TextInput
    type="email"
    placeholder={"Email Address"}
    inputName={"email"}
    value={state.email}
    onChange={onChange}
    error={error}
    id={"email-input"}
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
const ConfirmPasswordInput = ({ state, onChange, error }) => (
  <PasswordTextInput
    type="password"
    placeholder={"Confirm Password"}
    inputName={"confirm_password"}
    value={state.confirm_password}
    onChange={onChange}
    error={error}
    id={"confirm-password-input"}
  />
);
export default SignUpForm;
