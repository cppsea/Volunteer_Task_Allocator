import "../SignPage.css";
import AdminLoginForm from "../../../components/forms/Admin/AdminLoginForm/AdminLoginForm";
export default function AdminLoginPage() {
  return (
    <div className="SignPage AdminLoginPage">
      <h1 className="page-title">Admin Login Panel</h1>
      <div className="form-container">
        <div className="column">
          <div className="form-intro-container">
            <div className="form-intro">
              <h2 className="form-intro-title">Admin Login</h2>
              <p className="form-intro-message">
                If you're an admin, enter the admin password here
              </p>
            </div>
          </div>
        </div>
        <div className="column">
          <AdminLoginForm />
        </div>
      </div>
    </div>
  );
}
