import { createBrowserRouter, Navigate } from "react-router-dom/dist";
import Login from "../Layout/Login/Login";
import App from "../App";
import Dashboard from "../page/dashboard/Dashboard";
import Products from "../page/product/Products";
import Orders from "../page/orders/Orders";
import Coupons from "../page/coupons/Coupons";
import Reviews from "../page/Reviews/Reviews";
import Customers from "../page/customers/Customers";
import UserApp from "../UserApp";
import api from "../services/api";
import Home from "../Pages/Home/Home";
import { Pages } from "../Pages/Home/HomeSectionTwo/Mainpages.jsx/Pages";
import { Myaccounts } from "../Pages/Home/HomeSectionTwo/Mainpages.jsx/Myaccounts";
import { Cartpage } from "../Pages/Home/HomeSectionTwo/Mainpages.jsx/Cartpage";
import { SelectedItem } from "../Pages/Home/HomeSectionTwo/Mainpages.jsx/SelectedItem";
import { Contact } from "../Pages/Home/HomeSectionTwo/Mainpages.jsx/Contact";

async function verify() {
  try {
    const res = await api.get("/users/verify");
    return res?.data || null;
  } catch (e) {
    return e?.data || null;
  }
}

const router = createBrowserRouter([
  {
    path: "/user",
    element: <UserApp />,
    loader: verify,
    children: [
      {
        path: "",
        element: <Navigate to="home" replace />,
      },
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "homesectiontwo",
        element: <Pages />,
      },
      {
        path: "myaccount",
        element: <Myaccounts />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "contactpage",
        element: <Contact />,
      },

      {
        path: "cartpage",
        element: <Cartpage />,
      },
      {
        path: "select",
        element: <SelectedItem />,
      },
    ],
  },
  {
    path: "/admin",
    element: <App />,
    children: [
      {
        path: "",
        element: <Navigate to="dashboard" replace />,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "products",
        element: <Products />,
      },
      {
        path: "orders",
        element: <Orders />,
      },
      {
        path: "coupons",
        element: <Coupons />,
      },
      {
        path: "reviews",
        element: <Reviews />,
      },
      {
        path: "customers",
        element: <Customers />,
      },
    ],
  },
  {
    path: "/admin/sign-in",
    element: <Login />,
  },
]);

export default router;
