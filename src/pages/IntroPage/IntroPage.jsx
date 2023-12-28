import { useState} from 'react';
import NameForm from "../../components/forms/LoginForm/LoginForm";
import "./body.css";
function IntroPage() {

  
  
  const [type, setType] = useState("signIn");
  const handleOnClick = text => {
    if (text !== type) {
      setType(text);
      return;
    }
  };
  const containerClass =
    "container " + (type === "signUp" ? "right-panel-active" : "");
  
  
  
return (
  <div className="IntroPage">
      <h2>VTA CONCEPT</h2>
      <div className={containerClass} id="container">
        <NameForm />
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Welcome Back!</h1>
              <p>
                To login, please enter the listed information.
              </p>
              <button
                className="ghost"
                id="signIn"
                onClick={() => handleOnClick("signIn")}
              >
                Log In
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>Hello, Volunteer!</h1>
              <p>Enter your personal details and get your task!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
      
   
  );
  }
export default IntroPage;
