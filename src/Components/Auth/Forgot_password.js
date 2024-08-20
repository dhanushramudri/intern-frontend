import React, { useRef, useState } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { useNavigate, useParams } from "react-router";
import "./Forgot_password.css";

export default function Forgot_password() {
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [confirm_password, setConfirm_password] = useState("");
  const password_ref = useRef();
  const confirm_password_ref = useRef();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  async function reset(e) {
    e.preventDefault();
    setLoading(true);
    if (password.trim() === "" || confirm_password.trim() === "") {
      setMessage("Password fill out all the feilds");
      setTimeout(() => {
        setMessage("");
      }, 5000);
      return;
    }
    if (password.length < 6 || confirm_password.length < 6) {
      setMessage("Password length must be atleast 6 characters");
      setTimeout(() => {
        setMessage("");
      }, 5000);
      return;
    }
    if (password !== confirm_password) {
      setPassword("");
      setConfirm_password("");
      setMessage("Password and confirm password must match");
      setTimeout(() => {
        setMessage("");
      }, 5000);
      return;
    }
    fetch(`${process.env.REACT_APP_API_ENDPOINT}/reset_password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        password: password,
        confirm_password: confirm_password,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setLoading(false);
        setMessage(data.message);
        setTimeout(() => {
          setMessage("");
          if (data.message === "Password successfully updated") {
            navigate("/login");
          }
        }, 2000);
      })
      .catch((e) => {
        setMessage(e);
        setLoading(false);
        setTimeout(() => {
          setMessage("");
          navigate("/login");
        }, 2000);
      });
  }
  return (
    <div>
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
      <div className="forgot_password_container">
        <form onSubmit={(e) => reset(e)}>
          <label>Password : </label>
          <input
            value={password}
            ref={password_ref}
            onChange={() => setPassword(password_ref.current.value)}
            placeholder="******"
            type="password"
          />
          <label>Confirm Password : </label>
          <input
            value={confirm_password}
            ref={confirm_password_ref}
            onChange={() =>
              setConfirm_password(confirm_password_ref.current.value)
            }
            placeholder="******"
            type="password"
          />
          <input
            onClick={(e) => reset(e)}
            className="forgot_password_reset_btn"
            type="submit"
            value="Reset"
          />
        </form>
      </div>
      <Footer />
    </div>
  );
}
