import { jwtDecode } from "jwt-decode";

// src/AuthService.js
class AuthService {
  login(token) {
    const decoded = jwtDecode(token);
    // console.log(token);
    localStorage.setItem("token", token);
    // localStorage.setItem("name", decoded.name);
    // localStorage.setItem("expire",decoded.exp);
  }
  registerAndLogin(data) {
    localStorage.setItem("token", data);
    // localStorage.setItem("name", data.name);
    // localStorage.setItem("expire", data.exp);
  }

  logout() {
    localStorage.removeItem("jwt_token");
  }

  isLoggedIn() {
    const token = localStorage.getItem("jwt_token");
    // 這裡可以添加更多的 token 驗證邏輯，比如 token 是否過期
    return !!token;
  }

  getToken() {
    return localStorage.getItem("jwt_token");
  }
}

export default new AuthService();
