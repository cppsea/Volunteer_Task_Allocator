import React from "react";
import "../forms.css";
import "./SignUpForm.css";
import TextInput from "../inputs/TextInputs/TextInput.jsx";

function SignUpForm() {
  const [state, setState] = React.useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirm_password: "",
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

    const { first_name, last_name, email, password, confirm_password} = state;
    alert(`You signed up with \nFirst Name: ${first_name} \nLast Name: ${last_name} \nEmail: ${email} \nPassword: ${password} \nConfirm Password: ${confirm_password}`);
    console.log(first_name, last_name, email, password, confirm_password);
    for (const key in state) {
      setState({
        ...state,
        [key]: "",
      });
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
        <FirstNameInput state={state} onChange={handleChange} />
        <LastNameInput state={state} onChange={handleChange} />
      </div>

      <EmailInput state={state} onChange={handleChange} />
      <PasswordInput state={state} onChange={handleChange} />
      <ConfirmPasswordInput state={state} onChange={handleChange} />
      <button className="signin-btn">Sign In</button>
    </form>
  );
}

const FirstNameInput = ({ state, onChange }) => (
  <TextInput
    type="text"
    placeholder={"First Name"}
    inputName={"first_name"}
    value={state.first_name}
    onChange={onChange}
  />
);
const LastNameInput = ({ state, onChange }) => (
  <TextInput
    type="text"
    placeholder={"Last Name"}
    inputName={"last_name"}
    value={state.last_name}
    onChange={onChange}
  />
);

const EmailInput = ({ state, onChange }) => (
  <TextInput
    type="email"
    placeholder={"Email Address"}
    inputName={"email"}
    value={state.email}
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
const ConfirmPasswordInput = ({ state, onChange }) => (
  <TextInput
    type="password"
    placeholder={"Confirm Password"}
    inputName={"confirm_password"}
    value={state.confirm_password}
    onChange={onChange}
  />
);
export default SignUpForm;
