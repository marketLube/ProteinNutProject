import { NavLink } from "react-router-dom/dist";
import Logo from "../../Utils/Logo";

function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar__logo-container">
        <Logo />
      </div>
      <nav>
        <ul className="sidbar__ul">
          <NavLink to="dashboard" className="nav-link">
            <li>Dashboard</li>
          </NavLink>
          <NavLink to="products" className="nav-link">
            <li>Products</li>
          </NavLink>
          <NavLink to="orders" className="nav-link">
            <li>Orders</li>
          </NavLink>
          <NavLink to="coupons" className="nav-link">
            <li>Coupons</li>
          </NavLink>
          <NavLink to="reviews" className="nav-link">
            <li>Reveiws</li>
          </NavLink>
          <NavLink to="customers" className="nav-link">
            <li>Customers</li>
          </NavLink>
        </ul>
        <NavLink to="sign-in">
          <li>Logout</li>
        </NavLink>
      </nav>
    </div>
  );
}

export default Sidebar;
