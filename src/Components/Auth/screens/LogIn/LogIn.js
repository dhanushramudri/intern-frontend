import React, { useContext, useEffect, useRef, useState } from "react";
import "../style.css";
import RightContent from "../RightContent";
import Header from "../../../Header/Header";
import Footer from "../../../Footer/Footer";
import flat_color from "../../static/img/flat-color-icons-google.svg";
import { useNavigate, useParams } from "react-router";
import { Oval } from "react-loader-spinner";
import { Context } from "../../../../App";
import { useDispatch } from "react-redux";

export default function LogIn() {
  const navigate = useNavigate();
  const email_ref = useRef(null);
  const password_ref = useRef(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const { error } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      setMessage(error);
      setTimeout(() => {
        setMessage("");
      }, 5000);
    }
  }, []);

  const setToken = (token) => ({
    type: "token",
    payload: token,
  });

  async function loginWithGoogle() {
    setGoogleLoading(true);
    window.location = `${process.env.REACT_APP_API_ENDPOINT}/auth/google`;
  }

  function forget_password() {
    var emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (email.trim() === "") {
      setMessage("Please fill out all the feilds");
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
      fetch(`${process.env.REACT_APP_API_ENDPOINT}/forget_password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
        }),
        credentials: "omit",
      })
        .then((res) => {
          if (!res.ok) {
            return res.json().then((data) => {
              setLoading(false);
              setMessage(data.message);
              setTimeout(() => {
                setMessage("");
              }, 5000);
            });
          }
          return res.json();
        })
        .then((data) => {
          setLoading(false);
          setMessage(data.message);
          setTimeout(() => {
            setMessage("");
          }, 5000);
        });
    }
  }

  function login(e) {
    e.preventDefault();
    if (loading) return;
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
    } else if (!emailPattern.test(email)) {
      setEmail("");
      setMessage("Invalid email");
      setTimeout(() => {
        setMessage("");
      }, 5000);
    } else {
      const remember = document.getElementById("remember").checked;
      setLoading(true);
      fetch(`${process.env.REACT_APP_API_ENDPOINT}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
          remember: remember,
        }),
        credentials: "omit",
      }).then((res) => {
        if (!res.ok) {
          return res.json().then((data) => {
            setLoading(false);
            setMessage(`Error: ${res.status} - ${data.message}`);
            setTimeout(() => {
              setMessage("");
            }, 5000);
          });
        } else {
          return res.json().then((data) => {
            if (!data) return;
            if (data.message === "success") {
              const ThreeDaysFromNow = new Date();
              ThreeDaysFromNow.setDate(ThreeDaysFromNow.getDate() + 3);
              document.cookie = `token=${encodeURIComponent(
                data.token
              )}; path=/;`;
              dispatch(setToken(data.token));
              navigate("/");
            }
          });
        }
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
          <div
            className="animate_loading"
            id="animate_loading"
            style={{
              fontSize: "18px",
              fontWeight: "500",
              position: "relative",
              padding: "15px",
              height: "100%",
              width: "100%",
              background: "#FFC439",
              color: "white",
              display: "flex",
              alignItems: "center",
            }}
          >
            {message}
          </div>
        </div>
      ) : (
        <></>
      )}
      <Header />
      <div className="log-in">
        <form className="form" onSubmit={(e) => login(e)}>
          <div className="content">
            <div className="text-input">
              <div className="text">
                <div className="text-wrapper-10">Log In</div>
              </div>
              <div className="div-4">
                <label for="email" className="email-address">
                  Email address
                </label>
                <input
                  value={email}
                  ref={email_ref}
                  onChange={() => setEmail(email_ref.current.value)}
                  required
                  className="input"
                  id="email"
                  placeholder="name@domain.com"
                  type="email"
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
                />
              </div>
            </div>
            <div className="content-2">
              <div className="frame">
                <input className="rectangle" type="checkbox" id="remember" />
                <label className="text-wrapper-14" for="remember">
                  Remember me
                </label>
              </div>
              <div
                className="text-wrapper-15 a"
                onClick={() => forget_password()}
              >
                Forgot password?
              </div>
            </div>
            <div className="div-4">
              <button className="button-2">
                <div className="text-wrapper-16">
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
                  Log In
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
            <div className="content-3">
              <div className="text-wrapper-18">Not a member?</div>
              <div
                className="text-wrapper-19 a"
                onClick={() => navigate("/signup")}
              >
                Sign up here
              </div>
            </div>
          </div>
        </form>
        <RightContent />
      </div>
      <Footer />
    </React.Fragment>
  );
}
