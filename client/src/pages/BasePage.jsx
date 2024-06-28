import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";

export default function BasePage() {
  return (
    <div className="base-page">
      <Navbar />
      <Outlet />
    </div>
  );
}
