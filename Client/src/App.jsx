import { Outlet } from "react-router";
import Sidebar from "./Layout/Sidebar/Sidebar";
// import "./../css/style.css";

function App() {
  return (
    <div className="admin-container">
      <Sidebar />
      <Outlet />
    </div>
  );
}

export default App;
