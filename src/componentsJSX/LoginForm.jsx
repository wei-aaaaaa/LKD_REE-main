import React, { useState, useRef } from "react";
import "./LoginForm.css";
import axios from "axios";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

import Auth_JWT from "../../Auth_JWT";
import fb from "../assets/images/icons/fb.png";
import github from "../assets/images/icons/github.png";
import ReCAPTCHA from "react-google-recaptcha";
import eye from "../assets/images/icons/eye.png";

const LoginForm = ({ show, onClose }) => {
  const [errorMsg, setErrorMsg] = useState("");
  const [recapcha, setRecapcha] = useState("");
  const [form, setForm] = useState({
    reg: {
      Name: "",
      Email: "",
      Password: "",
    },
    sign: {
      Email: "",
      Password: "",
    },
  });
  const [loading, setLoading] = useState(false);
  const [passwordType, setPasswordType_] = useState("password");
  const _ReCAPTCHA = useRef();
  const handleChangeForm = (e, regOrSign) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [regOrSign]: {
        ...prevForm[regOrSign],
        [name]: value,
      },
    }));
  };

  const containerRef = useRef(null);

  const handleRegisterClick = () => {
    containerRef.current.classList.add("active");
    setPasswordType_("password");
    setErrorMsg("");
  };

  const handleLoginClick = () => {
    containerRef.current.classList.remove("active");
    setPasswordType_("password");
    setErrorMsg("");
  };

  if (!show) {
    return null;
  }

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    const params = {
      username: form.sign.Email,
      password: form.sign.Password,
    };
    axios
      .post(`https://localhost:7148/api/LoginJWT/Log-in-Hash`, params)
      .then((response) => {
        Auth_JWT.login(response.data.token);
        setLoading(false);
        onClose();
        window.location.reload();
      })
      .catch((error) => {
        setErrorMsg(error.response.data);
        console.error("發送請求時發生錯誤：", error);
      });
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    const params = {
      username: form.reg.Name,
      email: form.reg.Email,
      password: form.reg.Password,
    };
    axios
      .post(`https://localhost:7148/api/LoginJWT/sign-up`, params)
      .then(() => {
        return axios.post(
          `https://localhost:7148/api/LoginJWT/Log-in-Hash`,
          params
        );
      })
      .then((response) => {
        Auth_JWT.login(response.data.token);
        setLoading(false);
        onClose();
        window.location.reload();
        console.log("9999999999999999999999999999");
      })
      .catch((error) => {
        setErrorMsg(error.response.data);
        console.error("發送請求時發生錯誤：", error);
        setRecapcha("");
      })
      .finally(() => {
        _ReCAPTCHA.current.reset();
        // setRecapcha("");
      });
  };

  const handleNotCapchaSuccess = (e) => {
    e.preventDefault();
    setErrorMsg("想驗證你是否為機器人");
  };

  const handleSignUp_WithGoogle = (data) => {
    const params = {
      username: data.name + "lookday",
      email: data.email,
      password: "A12345678a",
    };
    axios
      .post(`https://localhost:7148/api/LoginJWT/sign-up`, params)
      .then(() => {
        axios.post(`https://localhost:7148/api/LoginJWT/Log-in-Hash`, params);
      })
      .then((response) => {
        Auth_JWT.login(response.data.token);
        setLoading(false);
        onClose();
        window.location.reload();
      })
      .catch((error) => {
        setErrorMsg(error.response.data);
        this.captcha.reset();
        console.error("發送請求時發生錯誤9999：", error);
      });
  };

  const setPasswordType = () => {
    setPasswordType_(passwordType === "password" ? "text" : "password");
  };

  const onChange_recapcha = (value) => {
    setRecapcha(value);
  };
  console.log(
    "_ReCAPTCHA_ReCAPTCHA_ReCAPTCHA_ReCAPTCHA_ReCAPTCHA_ReCAPTCHA_ReCAPTCHA",
    _ReCAPTCHA
  );
  return (
    <div className="login-form">
      <div className="modal-overlay" onClick={onClose}></div>
      <div className="container" id="container" ref={containerRef}>
        <div className="form-container sign-up">
          <form
            onSubmit={(e) => {
              recapcha ? handleSignUp(e) : handleNotCapchaSuccess(e);
            }}
          >
            <h1>建立帳號</h1>
            <div className="social-icons">
              <GoogleOAuthProvider clientId="191234775662-mda3goonrsk2g68bu3dknkpkgrh34431.apps.googleusercontent.com">
                <GoogleLogin
                  onSuccess={(credentialResponse) => {
                    Auth_JWT.login("Bearer " + credentialResponse.credential);
                    handleSignUp_WithGoogle(
                      jwtDecode(credentialResponse.credential)
                    );
                    // onClose();
                    // window.location.reload();
                  }}
                  onError={() => {
                    console.log("Login Failed");
                  }}
                  cookiePolicy={"single_host_origin"}
                  type="icon"
                  shape="circle"
                />
              </GoogleOAuthProvider>
              <a href="#" className="icon" style={{ border: "none" }}>
                <img
                  src={fb}
                  style={{ width: "95%", height: "95%" }}
                  alt="fb"
                ></img>
              </a>
              <a href="#" className="icon" style={{ border: "none" }}>
                <img
                  src={github}
                  style={{ width: "160%", height: "160%" }}
                  alt="github"
                ></img>
              </a>
            </div>
            <span>或使用電子郵件註冊</span>
            <input
              type="text"
              placeholder="使用者名稱"
              value={form.reg.Name}
              name="Name"
              required
              onChange={(e) => handleChangeForm(e, "reg")}
            />
            <input
              type="email"
              placeholder="電子郵件"
              value={form.reg.Email}
              name="Email"
              required
              onChange={(e) => handleChangeForm(e, "reg")}
            />
            <input
              type={passwordType}
              placeholder="密碼"
              value={form.reg.Password}
              name="Password"
              required
              pattern="[a-zA-Z0-9]{8,}"
              title="密碼長度必須在8至24之間,且必須包含大小寫英文字母及數字"
              onChange={(e) => handleChangeForm(e, "reg")}
              style={{ position: "relative" }}
            />
            <img
              src={eye}
              style={{
                position: "absolute",
                top: "300px",
                left: "370px",
                cursor: "pointer",
                width: "5%",
                height: "5%",
              }}
              alt="eye"
              onClick={setPasswordType}
            ></img>
            <p style={{ color: "red" }}>{errorMsg}</p>
            <ReCAPTCHA
              ref={_ReCAPTCHA}
              sitekey="6LccXv4pAAAAAL4FitpaQadeDDOWQF5IHxpr-MjP"
              onChange={onChange_recapcha}
            />
            <button>註冊</button>
          </form>
        </div>
        <div className="form-container sign-in">
          <form>
            <h1>登入 </h1>
            <div className="social-icons">
              <GoogleOAuthProvider clientId="191234775662-mda3goonrsk2g68bu3dknkpkgrh34431.apps.googleusercontent.com">
                <GoogleLogin
                  onSuccess={(credentialResponse) => {
                    Auth_JWT.login("Bearer " + credentialResponse.credential);
                    handleSignUp_WithGoogle(
                      jwtDecode(credentialResponse.credential)
                    );
                    onClose();
                    window.location.reload();
                  }}
                  onError={() => {
                    console.log("Login Failed");
                  }}
                  cookiePolicy={"single_host_origin"}
                  type="icon"
                  shape="circle"
                />
              </GoogleOAuthProvider>
              <a href="#" className="icon" style={{ border: "none" }}>
                <img
                  src={fb}
                  style={{ width: "95%", height: "95%" }}
                  alt="fb"
                ></img>
              </a>
              <a href="#" className="icon" style={{ border: "none" }}>
                <img
                  src={github}
                  style={{ width: "160%", height: "160%" }}
                  alt="github"
                ></img>
              </a>
            </div>
            <span>或使用其他方式登入</span>
            <input
              type="email"
              placeholder="使用者名稱"
              value={form.sign.Email}
              name="Email"
              onChange={(e) => handleChangeForm(e, "sign")}
            />
            <input
              type={passwordType}
              placeholder="密碼"
              value={form.sign.Password}
              name="Password"
              onChange={(e) => handleChangeForm(e, "sign")}
            />
            <img
              src={eye}
              style={{
                position: "absolute",
                top: "290px",
                left: "370px",
                cursor: "pointer",
                width: "5%",
                height: "5%",
              }}
              alt="eye"
              onClick={setPasswordType}
            ></img>
            <p style={{ color: "red" }}>{errorMsg}</p>
            <a href="#">忘記密碼?</a>
            <button onClick={(e) => handleLogin(e)}>
              {loading ? "登入中" : "登入"}
            </button>
          </form>
        </div>
        <div className="toggle-container">
          <div className="toggle">
            <div className="toggle-panel toggle-left">
              <h1>歡迎回來!</h1>
              <p>輸入您的個人詳細信息以使用網站的所有功能</p>
              <button className="hidden" id="login" onClick={handleLoginClick}>
                登入
              </button>
            </div>
            <div className="toggle-panel toggle-right">
              <h1>歡迎回來!</h1>
              <p>填寫您的個人詳細信息註冊以使用本網站的所有內容</p>
              <button
                className="hidden"
                id="register"
                onClick={handleRegisterClick}
              >
                註冊
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
