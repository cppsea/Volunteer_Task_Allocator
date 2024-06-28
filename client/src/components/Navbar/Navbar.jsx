import { useAuthContext } from "../../api/hooks/useAuthContext";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import useLogout from "../../api/hooks/useLogout";
import { useNavigate } from "react-router-dom";
import { route_paths } from "../../routing/route-paths";
export default function Navbar() {
  const { user } = useAuthContext();
  const { logout } = useLogout();
  const navigate = useNavigate();

  const [isToggled, setIsToggled] = useState(false);
  const toggleHamburger = () => {
    setIsToggled((prev) => !prev);
  };

  const logoutClickHandler = () => {
    logout();
    navigate(route_paths.login);
  };

  const logged_out_links = [
    { label: "Sign Up", link: route_paths.signup },
    { label: "Login", link: route_paths.login },
  ];

  const logged_in_links = [{ label: "Task", link: route_paths.task }];
  return (
    <header className="header">
      <FontAwesomeIcon icon={faBars} onClick={toggleHamburger} />

      <nav className={`navbar navbar-${isToggled ? "open" : "hidden"}`}>
        {user
          ? logged_in_links.map((navlink) => (
              <Link to={navlink.link}>{navlink.label}</Link>
            ))
          : logged_out_links.map((navlink) => (
              <Link to={navlink.link}>{navlink.label}</Link>
            ))}
      </nav>

      <div className="inner-header">
        <h3>VTA</h3>
        <span>
          {user ? `Welcome ${user.username}` : "Please sign up or log in"}
        </span>

        {user && (
          <button className="logout-button" onClick={logoutClickHandler}>
            Logout
          </button>
        )}
      </div>
    </header>
  );
}
