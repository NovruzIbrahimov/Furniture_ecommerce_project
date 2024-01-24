import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Products from "./pages/Products/Products";
import Rooms from "./pages/Rooms/Rooms";
import About from "./pages/About/About";
import Contact from "./pages/Contact/Contact";
import Login from "./pages/SignIn/Login";
import Register from "./pages/Register/Register";
import Detail from "./pages/Detail/Detail";
import Cart from "./pages/Cart/Cart";
import Layout from "./pages/Layout";
import DashboardHome from "./admin_page/DashboardHome";
import DashboardProducts from "./admin_page/DashboardProducts";
import DashboardCategories from "./admin_page/DashboardCategories";
import DashboardAdmins from "./admin_page/DashboardAdmins";
import DashboardOrders from "./admin_page/DashboardOrders";
import DashboardMenu from "./pages/DashboardMenu";
import Checkout from "./pages/checkout/Checkout";
import AdminLogin from "./pages/admin/AdminLogin";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="" element={<Layout><Home /></Layout>} />
        <Route exact path="products" element={<Layout><Products /></Layout>} />
        <Route exact path="rooms" element={<Layout><Rooms /></Layout>} />
        <Route exact path="about" element={<Layout><About /></Layout>} />
        <Route exact path="contact" element={<Layout><Contact /></Layout>} />
        <Route exact path="login" element={<Layout><Login /></Layout>} />
        <Route exact path="register" element={<Layout><Register /></Layout>} />
        <Route exact path="cart" element={<Layout><Cart /></Layout>} />
        <Route path="/detail/:_id" element={<Layout><Detail /></Layout>} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/adminLogin" element={<AdminLogin />} />
        <Route path="dashboard" element={<DashboardMenu><DashboardHome /></DashboardMenu>} />
        <Route path="dashboard/dashboardProducts" element={<DashboardMenu><DashboardProducts /></DashboardMenu>} />
        <Route path="dashboard/dashboardCategories" element={<DashboardMenu><DashboardCategories /></DashboardMenu>} />
        <Route path="dashboard/dashboardAdmins" element={<DashboardMenu><DashboardAdmins /></DashboardMenu>} />
        <Route path="dashboard/dashboardOrders" element={<DashboardMenu><DashboardOrders /></DashboardMenu>} />
      </Routes>
    </div>
  );
}

export default App;
