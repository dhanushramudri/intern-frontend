import React from "react";
import styles from "./styles.module.css";
import { useNavigate } from "react-router";
import Feature_items from "../Blocker/Feature_items";

export default function AuthOverlay() {
  const navigate = useNavigate();
  function closeModel() {
    document.getElementById("authOverlay").style.display = "none";
  }
  return (
    <div
      id="authOverlay"
      className={styles.authOverlay}
      onClick={() => closeModel()}
    >
      <div className={styles.overlay_container}>
        <div onClick={() => closeModel()} className={styles.overlay_cancel}>
          &times;
        </div>
        <div className={styles.overlay_title}>
          Unlock the complete <span className="unsuckify">Intern</span> platform
        </div>
        <div className={styles.overlay_sub_title}>It's quick and easy.</div>
        <div className={styles.overlay_buttons}>
          <div className={styles.overlay_row}>
            <button
              className={styles.overlay_button}
              onClick={() => navigate("/signup")}
            >
              Create a free account
            </button>
            <button
              className={styles.overlay_button}
              onClick={() => navigate("/login")}
            >
              or Sign in
            </button>
          </div>
          <Feature_items />
        </div>
      </div>
    </div>
  );
}
