import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Register from "./pages/Register";
import Login from "./pages/Login";
import LoginForm from "./componentsJSX/LoginForm";
import RootLayout from "./componentsJSX/RootLayout";
import Search from "./pages/Search";
import Favorite from "./pages/Favorite";
import Cart from "./pages/Cart";
import ProductPage from "./pages/ProductPage";
import CustomerService from "./pages/CustomerService";
import Member from "./pages/Member";
import { UserDataProvider } from "./componentsJSX/UserDataContext";

const App = () => {
  return (
    <Router>
      <UserDataProvider>
        <Routes>
          <Route path="/" element={<RootLayout />}>
            <Route index element={<Home />} />
            <Route path="contact" element={<Contact />} />
            <Route path="favorite" element={<Favorite />} />
            <Route path="cart" element={<Cart />} />
            <Route path="register" element={<Register />} />
            <Route path="login" element={<Login />} />
            <Route path="search" element={<Search />} />
            <Route path="productpage/:id" element={<ProductPage />} />
            <Route path="customerservice" element={<CustomerService />} />
            <Route path="member" element={<Member />} />
          </Route>
        </Routes>
      </UserDataProvider>
    </Router>
  );
};

export default App;
