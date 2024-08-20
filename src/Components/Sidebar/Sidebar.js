import React from "react";
import "./Sidebar.css";
import { useNavigate } from "react-router";
import logo from "../../logo.svg";
import { Context } from "../../App";
import { useDispatch, useSelector } from "react-redux";

export default function Sidebar() {
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

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

  function close() {
    if (document.getElementById("sidebar-container").style.display === "none") {
      document.getElementById("sidebar-container").style.display = "block";
    } else {
      document.getElementById("sidebar-container").style.display = "none";
    }
    document.getElementById("menu_bar-1").classList.toggle("open-1");
    document.getElementById("menu_bar-2").classList.toggle("open-2");
    document.getElementById("menu_bar-3").classList.toggle("open-3");
    document.getElementById("sidebar-container").style.display = "none";
  }
  return (
    <Context.Consumer>
      {() => {
        return (
          <div
            id="sidebar-container"
            style={{
              position: "fixed",
              width: "100%",
              top: "0%",
              bottom: "0%",
              height: "100vh",
              display: "none",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 5,
            }}
          >
            <div className="model-container-1" onClick={() => close()}></div>
            <div className="sidebar-container">
              <div className="sidebar-items">
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <div className="sidebar-header">
                    <img alt="logo" src={logo} className="logo" />
                  </div>
                </div>
                <div
                  className="sidebar-item"
                  onClick={() => {
                    close();
                    navigate("/");
                  }}
                >
                  Search Jobs
                </div>
                <div
                  className="sidebar-item"
                  onClick={() => {
                    close();
                    navigate("/account");
                  }}
                >
                  Account
                </div>
                <div
                  className="sidebar-item"
                  onClick={() => {
                    close();
                    window.location = "https://blog.joby.ai/";
                  }}
                >
                  Blog
                </div>
                <div
                  className="sidebar-item"
                  onClick={() => {
                    close();
                  }}
                >
                  Promote Job
                </div>
                <div
                  className="sidebar-item"
                  onClick={() => {
                    close();
                    navigate("/wishlist");
                  }}
                >
                  Wishlist
                </div>
                {!auth.isLoggedIn ? (
                  <div
                    className="sidebar-item"
                    onClick={() => {
                      close();
                      navigate("/login");
                    }}
                  >
                    Log In
                  </div>
                ) : (
                  <div
                    className="sidebar-item"
                    onClick={async () => {
                      logout();
                      close();
                    }}
                  >
                    Log Out
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      }}
    </Context.Consumer>
  );
}
