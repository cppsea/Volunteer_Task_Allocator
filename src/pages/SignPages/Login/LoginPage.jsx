import LoginForm from "../../../components/forms/LoginForm/LoginForm";
import "../SignPage.css";
function LoginPage() {

  return (
    <div className="SignPage LoginPage">
      <div className="form-container">
        <div className="column">
          <div className="form-intro-container">
            <div className="form-intro">
              <h2 className="form-intro-title">Hello, Volunteer!</h2>
              <p className="form-intro-message">
                Enter your personal details and get your task!
              </p>
            </div>
          </div>
        </div>
        <div className="column">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
export default LoginPage;
