import React, { useState } from "react";
import "./blocker.css";
import main_svg from "./main_svg.svg";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { Oval } from "react-loader-spinner";
import Feature_items from "./Feature_items";

export default function Blocker(props) {
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);
  const jobs_data = useSelector((state) => state.jobs_data);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  function purchase(duration) {
    setLoading(true);
    fetch(`${process.env.REACT_APP_API_ENDPOINT}/purchase`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ duration: duration }),
    }).then((res) => {
      if (!res.ok) {
        navigate("/login");
        return;
      }
      return res.json().then((data) => {
        if (data.message) {
          setMessage(data.message);
          setTimeout(() => {
            setMessage("");
          }, 5000);
        } else {
          window.open(data.url);
        }
        setLoading(false);
      });
    });
  }

  return (
    <div>
      {message !== "" ? (
        <div
          style={{
            left: "0",
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
      {loading ? (
        <div
          style={{
            position: "fixed",
            left: "0%",
            top: "0%",
            height: "calc(100vh)",
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: "2",
            backgroundColor: "hsla(0, 0%, 0%, 0.5)",
          }}
        >
          <Oval
            height={180}
            width={180}
            color="#FFB223"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
            ariaLabel="oval-loading"
            secondaryColor="#ffcd70"
            strokeWidth={2}
            strokeWidthSecondary={2}
          />
        </div>
      ) : (
        <></>
      )}
      {!auth.isSubscribed && props.n > 10 ? (
        <div className="blocker-container">
          <div className="blocker">
            <img src={main_svg} alt="svg" />
            <div className="blocker-title">
              <span className="unsuckify">
                +
                {jobs_data.no_of_jobs > 10
                  ? (jobs_data.no_of_jobs - 10).toLocaleString("en-US")
                  : "4 579"}{" "}
                More
              </span>{" "}
              Jobs Available!
            </div>
            <div className="blocker-title">
              <p>Subscribe now to unlock all job opportunities.</p>
            </div>
            <div className="blocker-items-container">
              <Feature_items />
            </div>
            {localStorage.getItem("joby_subscribed_email") ? (
              <div className="blocker-subscribed-email">
                You are subscribed with{" "}
                <strong>{localStorage.getItem("joby_subscribed_email")}</strong>
                <button
                  className="pricing-button"
                  onClick={() => navigate("/login")}
                  style={{ marginTop: "20px" }}
                >
                  Login
                </button>
              </div>
            ) : (
              <>
                <div className="pricing-card-subtitle">
                  Choose your membership
                </div>
                <div className="pricing-card-cancel-anytime-text">
                  Cancel Anytime
                </div>
                <div className="pricing-buttons-blocker">
                  <button
                    onClick={() => purchase("week")}
                    className="pricing-button"
                  >
                    🥳 $5 / week
                  </button>
                  <button
                    onClick={() => purchase("month")}
                    className="pricing-button"
                  >
                    🎉 $18 / month
                  </button>
                  <button
                    onClick={() => purchase("year")}
                    className="pricing-button"
                  >
                    🚀 $60 / year
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
