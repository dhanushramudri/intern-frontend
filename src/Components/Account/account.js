import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import "./account.css";
import Wishlist from "../Wishlist/Wishlist";
import logout from "../Auth/logout";
import { Oval } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";

export default function Account() {
  const navigate = useNavigate();
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [tab, setTab] = useState("profile");
  const [current_period_end, setCurrent_period_end] = useState(null);
  const auth = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    if (auth.token && auth.token === "No token found!") {
      navigate("/login");
    }
  }, [auth.token]);

  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    timeZoneName: "short",
  };

  function cancelSubscription() {
    setLoading(true);
    const token = auth.token;
    if (token) {
      fetch(`${process.env.REACT_APP_API_ENDPOINT}/cancel_subscription`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      })
        .then((res) => {
          if (!res.ok) {
            logout();
            return res.json().then((data) => {
              setLoading(false);
              setMessage(data.message);
              setTimeout(() => {
                setMessage("");
              }, 5000);
            });
          }
          return res.json().then((data) => {
            setLoading(false);
            setMessage(data.message);
            setTimeout(() => {
              setMessage("");
            }, 5000);
          });
        })
        .catch((e) => {
          setLoading(false);
          setMessage(e.message);
          setTimeout(() => {
            setMessage("");
          }, 5000);
        });
    }
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
            height: "calc(100vh)",
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "hsla(0, 0%, 0%, 0.5)",
            zIndex: "2",
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
      {auth.isLoggedIn ? (
        <div className="account-main-container">
          <Header />
          <div className="account-container">
            <div className="account-left-container">
              <div className="account-container-title">My Account</div>
              <div className="account-settings">
                <div
                  className="account-setting"
                  onClick={() => setTab("profile")}
                >
                  My Profile
                </div>
                <div
                  className="account-setting"
                  onClick={() => setTab("subscription")}
                >
                  My Subscription
                </div>
                <div
                  className="account-setting"
                  onClick={() => setTab("wishlist")}
                >
                  My Wishlist
                </div>
                <div
                  className="account-setting"
                  onClick={() => setTab("notifications")}
                >
                  My Notifications
                </div>
              </div>
            </div>
            <div className="account-right-container">
              {tab === "wishlist" ? (
                <Wishlist />
              ) : tab === "notifications" ? (
                <div className="account-message-box">
                  You can unsubscribe from specific notifications via the
                  unsubscribe footer in each email
                </div>
              ) : tab === "profile" ? (
                <div className="account-message-box">
                  <div style={{ marginBottom: "10px" }}>
                    <strong>Email : </strong>
                    {auth.email}
                  </div>
                  <div>
                    Please contact us via email if you need to change this.
                  </div>
                </div>
              ) : tab === "subscription" ? (
                <>
                  {auth.isSubscribed ? (
                    <div className="account-message-box">
                      <div style={{ marginBottom: "10px" }}>
                        <strong>Active : You have Subscribed</strong>
                      </div>
                      {auth.isSubscriptionCanceled ? (
                        <>
                          <div style={{ marginBottom: "10px" }}>
                            <strong>Subscription Canceled</strong>
                          </div>
                          <button
                            className="cancel-subscription"
                            onClick={() => navigate("/pricing")}
                          >
                            ReNew Here
                          </button>
                        </>
                      ) : (
                        <>
                          <div>
                            {" "}
                            <div style={{ marginBottom: "10px" }}>
                              Next Billing Date :
                            </div>
                            <span style={{ color: "#aaa" }}>
                              {new Date(
                                auth.subscription_ends_at
                              ).toLocaleString("en-US", options)}
                            </span>
                          </div>
                          <button
                            style={{
                              backgroundColor: "#0077b6",
                              color: "white",
                            }}
                            className="cancel-subscription"
                            onClick={() => cancelSubscription()}
                          >
                            Cancel Subscription
                          </button>
                        </>
                      )}
                    </div>
                  ) : (
                    <div className="account-message-box">
                      <div style={{ marginBottom: "10px" }}>
                        <strong>Subscribe </strong>
                        {email}
                      </div>
                      <div>to use the full power of our platform.</div>
                      <button
                        className="cancel-subscription"
                        onClick={() => navigate("/pricing")}
                      >
                        Pricing
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <></>
              )}
            </div>
          </div>
          <Footer />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
