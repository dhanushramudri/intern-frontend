import React, { useState } from "react";
import { useNavigate, useParams } from "react-router";
import Header from "../Header/Header";

export default function Unsubscribe() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const [message, setMessage] = useState("");

  async function unsubscribe() {
    setLoading(true);
    fetch(`${process.env.REACT_APP_API_ENDPOINT}/unsubscribe`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id }),
    })
      .then((data) => {
        return data.json();
      })
      .then((res) => {
        if (res.message === "success") {
          setMessage("Successfully unsubscribe!");
        } else if (res.message === "No user") {
          setMessage("No data found!");
        }
        setLoading(false);
        setTimeout(() => {
          setMessage("");
          navigate("/");
        }, 5000);
      });
  }

  return (
    <div style={{ height: "100vh" }}>
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
      <div
        style={{
          height: "calc(100vh - 110px)",
          padding: "15px",
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h1 style={{ marginTop: "-110px", marginBottom: "20px" }}>
          Want to Unsubscribe?
        </h1>
        <h2
          style={{
            fontFamily: "sans-serif",
            fontWeight: "200",
            marginBottom: "20px",
          }}
        >
          You will no longer receive emails for new job postings{" "}
        </h2>
        <button onClick={() => unsubscribe()} className="email-alert-btn">
          {loading ? "Unsubscribing" : "Unsubscribe"}
        </button>
      </div>
    </div>
  );
}
