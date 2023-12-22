import React from "react";


function NameForm() {
  const [state, setState] = React.useState({
    name: "",
    password: ""
  });
  const handleChange = evt => {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value
    });
  };

  const handleOnSubmit = evt => {
    evt.preventDefault();

    const { name, password } = state;
    alert(`You are logged in with name: ${name} and password: ${password}`);
    console.log(name,password)
    for (const key in state) {
      setState({
        ...state,
        [key]: ""
      });
    }
  };

  return (
    <div className="form-container sign-in-container">
      <form onSubmit={handleOnSubmit}>
        <h1>Get Your Task</h1>
       <div></div>
        
        <input
          type="name"
          placeholder="Full Name"
          name="name"
          value={state.name}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={state.password}
          onChange={handleChange}
        />
       
        <button >Log In</button>
      </form>

    </div>



  );
}

export default NameForm;
