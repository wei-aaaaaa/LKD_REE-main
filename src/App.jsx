import { BrowserRouter as Router, Route, Routes,Navigate} from "react-router-dom";
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
import Member from "./pages/Member"
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";


const App = () => {
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    const _token = localStorage.getItem("token")?.slice(7);
    const token = _token ? jwtDecode(_token) : "";
    // const loginUsername = localStorage.getItem("name");
    // const now = Date.now();
    // const name_google = token?.name;
    // const name =
    //   token?.["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"];
    // console.log("name", name, token.exp);
    token.exp > Date.now() / 1000 ? setIsLogin(true) : setIsLogin(false);
    // console.log("loginExpireloginExpire", loginExpire, loginUsername);
  }, []);
  console.log("isLoginisLoginisLogin", isLogin);
  const a = 1;
  return (
    <Router>
      <Routes>
        {/* <Route element={<RootLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/favorite" element={<Favorite />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/search" element={<Search />} />
          <Route path="/productpage/:id" element={<ProductPage />} />
          <Route path="/customerservice/" element={<CustomerService />} />
          <Route path="/member" element={<Member />} />
        </Route> */}

        <Route element={<RootLayout />}>
          <Route path="/" element={<Home />} />
          <Route
            path="/contact"
            element={!isLogin ? <Navigate to="/" replace /> : <Contact />}
          />
          <Route
            path="/favorite"
            element={!isLogin ? <Navigate to="/" replace /> : <Favorite />}
          />
          <Route
            path="/cart"
            element={!isLogin ? <Navigate to="/" replace /> : <Cart />}
          />
          <Route
            path="/register"
            element={!isLogin ? <Navigate to="/" replace /> : <Register />}
          />
          <Route
            path="/login"
            element={!isLogin ? <Navigate to="/" replace /> : <LoginForm />}
          />
          <Route
            path="/search"
            element={!isLogin ? <Navigate to="/" replace /> : <Search />}
          />
          <Route path="/productpage/:id" element={<ProductPage />} />
          <Route
            path="/member"
            element={!isLogin ? <Navigate to="/" replace /> : <Member />}
          />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
