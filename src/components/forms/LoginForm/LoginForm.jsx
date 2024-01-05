import React from "react";
import "../forms.css"
import "./LoginForm.css";
import TextInput from "../inputs/TextInputs/TextInput.jsx";

function LoginForm() {
  const [state, setState] = React.useState({
    name: "",
    password: "",
  });
  const handleChange = (evt) => {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value,
    });
  };

  const handleOnSubmit = (evt) => {
    evt.preventDefault();

    const { name, password } = state;
    alert(`You are logged in with name: ${name} and password: ${password}`);
    console.log(name, password);
    for (const key in state) {
      setState({
        ...state,
        [key]: "",
      });
    }
  };

  return (
      <form onSubmit={handleOnSubmit} className="form login-container">
        <h1>Get Your Task</h1>

        <NameInput state={state} onChange={handleChange} />

        <PasswordInput state={state} onChange={handleChange} />

        <button className="login-btn">Log In</button>
      </form>
  );
}

const NameInput = ({ state, onChange }) => (
  <TextInput
    type="text"
    placeholder={"Full Name"}
    inputName={"name"}
    value={state.name}
    onChange={onChange}
  />
);

const PasswordInput = ({ state, onChange }) => (
  <TextInput
    type="password"
    placeholder={"Password"}
    inputName={"password"}
    value={state.password}
    onChange={onChange}
  />
);
export default LoginForm;
