import React, { useRef, useState } from "react";
import "../style.css";
import RightContent from "../RightContent";
import flat_color from "../../static/img/flat-color-icons-google.svg";
import Header from "../../../Header/Header";
import Footer from "../../../Footer/Footer";
import { useNavigate } from "react-router";
import { Oval } from "react-loader-spinner";

export default function SignUp() {
  const navigate = useNavigate();
  const email_ref = useRef();
  const password_ref = useRef();
  const confirmPassword_ref = useRef();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirnPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  async function loginWithGoogle() {
    setGoogleLoading(true);
    window.location = `${process.env.REACT_APP_API_ENDPOINT}/auth/google`;
  }

  function signup(e) {
    if (loading) return;
    e.preventDefault();
    var emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (email.trim() === "" || password.trim() === "") {
      setMessage("Please fill out all the feilds");
      setTimeout(() => {
        setMessage("");
      }, 5000);
    } else if (password.length < 6) {
      setMessage("Password length must be atleast 6 characters");
      setTimeout(() => {
        setMessage("");
      }, 5000);
    } else if (password !== confirmPassword) {
      setPassword("");
      setConfirnPassword("");
      setMessage("Password and confirm password must match");
      setTimeout(() => {
        setMessage("");
      }, 5000);
    } else if (!emailPattern.test(email)) {
      setEmail("");
      setMessage("Invalid email");
      setTimeout(() => {
        setMessage("");
      }, 5000);
    } else {
      const remember = document.getElementById("remember").checked;
      setLoading(true);
      fetch(`${process.env.REACT_APP_API_ENDPOINT}/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
          remember: remember,
        }),
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          setMessage(data.message);
          setLoading(false);
          setTimeout(() => {
            setMessage("");
          }, 5000);
        });
    }
  }
  return (
    <React.Fragment>
      {message !== "" ? (
        <div
          style={{
            height: "70px",
            width: "100%",
            position: "fixed",
            top: "0%",
            zIndex: "999",
          }}
        >
          <div className="animate_loading" id="animate_loading-signup">
            {message}
          </div>
        </div>
      ) : (
        <></>
      )}
      <Header />
      <div className="log-in">
        <form onSubmit={(e) => signup(e)} className="form">
          <div className="content">
            <div className="text-input">
              <div className="text">
                <div className="text-wrapper-10">Sign Up</div>
                <p className="text-wrapper-11">
                  Enter your credentials to access your account.
                </p>
              </div>
              <div className="div-3">
                <div className="div-4">
                  <label for="email" className="email-address">
                    Email address
                  </label>
                  <input
                    value={email}
                    ref={email_ref}
                    onChange={() => setEmail(email_ref.current.value)}
                    className="input"
                    id="email"
                    placeholder="name@domain.com"
                    type="email"
                    required
                  />
                </div>
                <div className="div-4">
                  <label for="password" className="email-address">
                    Password
                  </label>
                  <input
                    value={password}
                    ref={password_ref}
                    onChange={() => setPassword(password_ref.current.value)}
                    className="input"
                    id="password"
                    placeholder="********"
                    type="password"
                    required
                  />
                </div>
                <div className="div-4">
                  <label for="password" className="email-address">
                    Confirm Password
                  </label>
                  <input
                    value={confirmPassword}
                    ref={confirmPassword_ref}
                    onChange={() =>
                      setConfirnPassword(confirmPassword_ref.current.value)
                    }
                    className="input"
                    id="confirm-password"
                    placeholder="********"
                    type="password"
                    required
                  />
                </div>
              </div>
            </div>
            <div className="div-3">
              <div className="content-2">
                <div className="frame">
                  <input className="rectangle" type="checkbox" id="remember" />
                  <label className="text-wrapper-14" for="remember">
                    Remember me
                  </label>
                </div>
              </div>
              <div className="div-4">
                <button className="button-2">
                  <div onClick={(e) => signup(e)} className="text-wrapper-16">
                    {loading ? (
                      <Oval
                        height={20}
                        width={20}
                        color="#fff"
                        wrapperStyle={{ marginRight: "20px" }}
                        wrapperClass=""
                        visible={true}
                        ariaLabel="oval-loading"
                        secondaryColor="#ffcd70"
                        strokeWidth={2}
                        strokeWidthSecondary={2}
                      />
                    ) : (
                      <></>
                    )}
                    Create Account
                  </div>
                </button>
                <div className="button-3" onClick={() => loginWithGoogle()}>
                  {googleLoading ? (
                    <Oval
                      height={20}
                      width={20}
                      color="#fff"
                      wrapperStyle={{ marginRight: "20px" }}
                      wrapperClass=""
                      visible={true}
                      ariaLabel="oval-loading"
                      secondaryColor="#ffcd70"
                      strokeWidth={2}
                      strokeWidthSecondary={2}
                    />
                  ) : (
                    <></>
                  )}
                  <img
                    className="flat-color-icons"
                    alt="Flat color icons"
                    src={flat_color}
                  />
                  <div className="text-wrapper-17">Log in with Google</div>
                </div>
              </div>
            </div>
          </div>
          <div className="content-3">
            <div className="text-wrapper-18">Have an account?</div>
            <div
              className="text-wrapper-19 a"
              onClick={() => navigate("/login")}
            >
              Log In
            </div>
          </div>
        </form>
        <RightContent />
      </div>
      <Footer />
    </React.Fragment>
  );
}
