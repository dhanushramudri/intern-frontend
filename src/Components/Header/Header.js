import React from "react";
import "./header.css";
import logo from "../../logo.svg";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";

export default function Header(props) {
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  function sidebar_operation() {
    if (document.getElementById("sidebar-container").style.display === "none") {
      document.getElementById("sidebar-container").style.display = "block";
      document.getElementById("menu-bar").style.position = "fixed";
    } else {
      document.getElementById("sidebar-container").style.display = "none";
      document.getElementById("menu-bar").style.position = "absolute";
    }
    document.getElementById("menu_bar-1").classList.toggle("open-1");
    document.getElementById("menu_bar-2").classList.toggle("open-2");
    document.getElementById("menu_bar-3").classList.toggle("open-3");
  }

  const set_token = (data) => ({
    type: "token",
    payload: data,
  });

  function logout() {
    function deleteCookie() {
      document.cookie = `token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
      dispatch(set_token("No token found!"));
      navigate("/");
    }
    deleteCookie();
  }

  return (
    <div>
      {!auth.isLoggedIn ? (
        <div className="header-container">
          <div className="header">
            <div className="logo">
              Intern <span>.ai</span>
              <div className="beta">beta</div>
            </div>
            <div className="header-items">
              <div
                onClick={() => navigate("/generate")}
                className="header-item"
              >
                Interview's by AI
              </div>
              <div
                className="header-item"
                onClick={() =>
                  // window.open("https://forms.gle/Guq4Zoam5hcetsDW8")
                  navigate("/promote-job")
                }
              >
                ✍️ Promote Job
              </div>
              <div className="header-item" onClick={() => navigate("/login")}>
                Log In
              </div>
              <div className="header-item" onClick={() => navigate("/signup")}>
                Sign Up
              </div>
            </div>
            <div
              className="menu-bar"
              id="menu-bar"
              onClick={() => sidebar_operation()}
            >
              <div id="menu_bar-1" className="menu-bar-1"></div>
              <div id="menu_bar-2" className="menu-bar-2"></div>
              <div id="menu_bar-3" className="menu-bar-3"></div>
            </div>
          </div>
        </div>
      ) : (
        <div className="header-container">
          <div className="header">
            <img
              alt="logo"
              style={{ cursor: "pointer" }}
              src={logo}
              className="logo"
              onClick={() => navigate("/")}
            ></img>
            <div className="header-items">
              {/* <div className="header-item">
                      CoPilot <span className="copilot-ai">AI</span>
                    </div> */}
              <div
                onClick={() => navigate("/generate")}
                className="header-item"
              >
                Interviews By AI
              </div>
              <div
                className="header-item"
                onClick={() =>
                  // window.open("https://forms.gle/Guq4Zoam5hcetsDW8")
                  navigate("/promote-job")
                }
              >
                ✍️ Promote Job
              </div>
              <div className="header-item" onClick={() => navigate("/account")}>
                Account
              </div>
              <div className="header-item" onClick={() => logout()}>
                Log Out
              </div>
            </div>
            <div
              className="menu-bar"
              id="menu-bar"
              onClick={() => sidebar_operation()}
            >
              <div id="menu_bar-1" className="menu-bar-1"></div>
              <div id="menu_bar-2" className="menu-bar-2"></div>
              <div id="menu_bar-3" className="menu-bar-3"></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
