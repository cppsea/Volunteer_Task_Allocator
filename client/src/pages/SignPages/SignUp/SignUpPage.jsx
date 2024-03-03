import SignUpForm from "../../../components/forms/SignUpForm/SignUpForm";
import "../SignPage.css";
export default function SignUpPage() {

  return (
    <div className="SignPage SignUpPage">
      <h1 className="page-title">Sign Up</h1>
      <div className="form-container">
        <div className="column">
          <div className="form-intro-container">
            <div className="form-intro">
              <h2 className="form-intro-title">Welcome!</h2>
              <p className="form-intro-message">
                Sign up today to become a volunteer!
              </p>
            </div>
          </div>
        </div>
        <div className="column">
          <SignUpForm/>
        </div>
      </div>
    </div>
  );
  }
