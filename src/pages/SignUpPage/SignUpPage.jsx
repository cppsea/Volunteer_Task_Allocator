import SignUpForm from "../../components/forms/SignUpForm/SignUpForm";
import "./SignUpPage.css";

export default function SignUpPage({}) {
  return (
    <div className="page">
      <h1 className="page-title">Sign Up to Volunteer Today!</h1>
      <div className="form-container">
        <SignUpForm />
      </div>
    </div>
  );
}
