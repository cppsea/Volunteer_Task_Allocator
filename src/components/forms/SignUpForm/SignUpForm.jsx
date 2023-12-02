import "./SignUpForm.css";
import TextFieldContainer from "../../InputContainers/TextFieldContainer/TextFieldContainer";
import { useState } from "react";
export default function SignUpForm() {
  //user info state
  const [userInfo, setUserInfo] = useState({
    first_name: "",
    last_name: "",
    username: "",
    password: "",
    confirm_password: "",
  });

  //change handler depending on name of input
  const onChange = (e) => {
    //get name
    let name = e.target.getAttribute("name");

    //if name is in userInfo, update the user info with value
    if (userInfo.hasOwnProperty(name)) {
      let value = e.target.value;
      userInfo[name] = value;
      setUserInfo(userInfo);
    }


    console.log(userInfo)
  };


  //onSubmitHandler

  const onSubmit = (e) =>{
    e.preventDefault();

    //do error validation
    const errValidations = [EmptyFields, PasswordLength, MatchingPassword]
    for (let errFunc of errValidations){

        //validate info
        let result = errFunc(userInfo)
        //if it did not return true, use the message it returned
        if (result !== true){
            alert(result);
            return;
        }
    }

    //at this point none of the error validation functions returned an error
    //format userInfo just for readability in alert
    let userInfoFormat = Object.entries(userInfo).map( ([name,val]) => `${name} : ${val}`).join("\n")
    alert(userInfoFormat)
  }

  


  return (
    <form className="sign-up-form" onSubmit={onSubmit}>
      <div className="input-row">
        <FirstName state={userInfo} onChange={onChange} />
        <LastName state={userInfo} onChange={onChange} />
      </div>

      <Username state={userInfo} onChange={onChange} />
      <div className="input-row">
        <Password state={userInfo} onChange={onChange} />
        <ConfirmPassword state={userInfo} onChange={onChange} />
      </div>
      <div className="button-container">
            <button type="submit">Submit</button>
      </div>
    </form>
  );
}


//use TextFieldContainer to create each of these inputs

const FirstName = ({ state, onChange }) => {
  return (
    <TextFieldContainer
      label={"First Name"}
      id={"first_name"}
      textState={state}
      onChange={onChange}
      placeholder={"Enter your first name"}
      name={"first_name"}
    />
  );
};

const LastName = ({ state, onChange }) => {
  return (
    <TextFieldContainer
      label={"Last Name"}
      id={"last_name"}
      textState={state}
      onChange={onChange}
      placeholder={"Enter your last name"}
      name={"last_name"}
    />
  );
};

const Username = ({ state, onChange }) => {
  return (
    <TextFieldContainer
      label={"User Name"}
      id={"username"}
      textState={state}
      onChange={onChange}
      placeholder={"Enter a username"}
      name={"username"}
    />
  );
};

const Password = ({ state, onChange }) => {
  return (
    <TextFieldContainer
      label={"Password"}
      id={"password"}
      textState={state}
      onChange={onChange}
      placeholder={"Enter a password"}
      name={"password"}
    />
  );
};

const ConfirmPassword = ({ state, onChange }) => {
  return (
    <TextFieldContainer
      label={"Confirm Password"}
      id={"confirm_password"}
      textState={state}
      onChange={onChange}
      placeholder={"Reenter your password"}
      name={"confirm_password"}
    />
  );
};

//functions for error validation, take in userinfo object, return true if valid or error message otherwise


const EmptyFields = (userInfo) =>{
    let entries = Object.entries(userInfo)

    return entries.every(([name, value]) => value.length > 0) || "You need to fill in every input."
}
const PasswordLength =(userInfo)=> {

    return userInfo.password.length >= 8 || "Password should have length of 8 or longer";
}

const MatchingPassword = (userInfo) =>{
    return (userInfo.password === userInfo.confirm_password) || "Password and Confirm Password must match."
}