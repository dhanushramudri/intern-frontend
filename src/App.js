import React from "react";
import "./App.css";
import { createContext, useState, useEffect } from "react";
import { Route, Routes } from "react-router";
import Unsubscribe from "./Components/unsubscribe/unsubscribe";
import Sidebar from "./Components/Sidebar/Sidebar";
import LandingPage from "./Components/Landing_page/Landing_page";
import Wishlist from "./Components/Wishlist/Wishlist";
import AuthOverlay from "./Components/AuthOverlay/AuthOverlay";
import LogIn from "./Components/Auth/screens/LogIn/LogIn";
import SignUp from "./Components/Auth/screens/Signup/SignUp";
import JobDetails from "./Components/JobDetails/JobDetails";
import PostJob from "./Components/PostJob/PostJob";
import Home from "./Home";
import Pricing from "./Components/pricing/pricing";
import Account from "./Components/Account/account";
import Forgot_password from "./Components/Auth/Forgot_password";
import Verify from "./Components/Account/verify";
import { useDispatch, useSelector } from "react-redux";
import SearchJobsByCountry from "./Components/search_jobs/SearchJobsByCountry";
import SearchJobsByCity from "./Components/search_jobs/SearchJobsByCity";
import JobAt from "./Components/JobAt/JobAt";
import SearchJobsByCategory from "./Components/search_jobs/SearchJobsByCategory";
import SearchJobsByLocationType from "./Components/search_jobs/SearchJobsByLocationType";
import { HelmetProvider } from "react-helmet-async";
import Resume_tailor from "./Components/Resume-tailor/Resume_tailor";
import Generate from "./Components/Generate/Generate";

export const Context = createContext();

const isLoggedInData = (userData) => ({
  type: "isLoggedIn",
  payload: userData,
});

const tokenData = (token) => ({
  type: "token",
  payload: token,
});

const isSubscribedData = (subscriptionData) => ({
  type: "isSubscribed",
  payload: subscriptionData,
});

const setEmail = (email) => ({
  type: "email",
  payload: email,
});

const setSubscription_ends_at = (date) => ({
  type: "subscription_ends_at",
  payload: date,
});

const isSubscriptionCanceled = (isCanceled) => ({
  type: "isSubscriptionCanceled",
  payload: isCanceled,
});

function App() {
  const dispatch = useDispatch();

  const auth = useSelector((state) => state.auth);
  const [uid, setUid] = useState(auth.token);

  useEffect(() => {
    function getCookie(cookieName) {
      const name = `${cookieName}=`;
      const decodedCookies = decodeURIComponent(document.cookie);
      const cookieArray = decodedCookies.split(";");

      for (let i = 0; i < cookieArray.length; i++) {
        let cookie = cookieArray[i].trim();
        if (cookie.indexOf(name) === 0) {
          return cookie.substring(name.length, cookie.length);
        }
      }
      return "No token found!";
    }

    dispatch(tokenData(getCookie("token")));
  }, []);

  useEffect(() => {
    async function getEmailId() {
      if (!auth.token) return;
      const token = auth.token;
      await fetch(`${process.env.REACT_APP_API_ENDPOINT}/get_email_id`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      })
        .then((res) => {
          if (!res.ok) {
            return;
          }
          return res.json();
        })
        .then((data) => {
          if (data) dispatch(setEmail(data.email));
        });
    }

    if (auth.token) getEmailId();

    async function isLoggedIn() {
      if (!auth.token) return;
      await fetch(`${process.env.REACT_APP_API_ENDPOINT}/isLoggedIn`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }).then((res) => {
        if (!res.ok) {
          dispatch(isLoggedInData(false));
        }
        return res
          .json()
          .then((data) => {
            dispatch(isLoggedInData(data.isLoggedIn));
          })
          .catch((e) => {
            dispatch(isLoggedInData(false));
          });
      });
    }

    isLoggedIn();

    async function isSubscribed() {
      if (!auth.token) return;
      if (auth.token === "No token found!") {
        dispatch(isSubscribedData(false));
        return;
      }
      fetch(`${process.env.REACT_APP_API_ENDPOINT}/isSubscribed`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }).then((res) => {
        if (!res.ok) {
          return;
        }
        return res.json().then((data) => {
          if (data["email"])
            localStorage.setItem("joby_subscribed_email", data["email"]);
          else localStorage.removeItem("joby_subscribed_email");
          dispatch(setSubscription_ends_at(data["subscription_ends_at"]));
          dispatch(isSubscribedData(data["isSubscribed"]));
          dispatch(isSubscriptionCanceled(data["isSubscriptionCanceled"]));
        });
      });
    }

    if (auth.token) {
      isSubscribed();
    }
  }, [auth.token]);

  return (
    <Context.Provider value={[{}, {}, uid]}>
      <div className="App">
        <HelmetProvider>
          <Sidebar />
          <AuthOverlay />
          <Routes>
            <Route path="/resume-tailor/" element={<Resume_tailor />} />
            <Route path="/" element={<Home />} />
            <Route path="/generate" element={<Generate />} />
            <Route
              path="/company/:company_name/jobs/:job_title/"
              element={<JobDetails />}
            />
            <Route path="country/:country" element={<JobAt text="Jobs in" />} />
            <Route path="country" element={<SearchJobsByCountry />} />
            <Route path="city" element={<SearchJobsByCity />} />
            <Route path="category" element={<SearchJobsByCategory />} />
            <Route
              path="location-type"
              element={<SearchJobsByLocationType />}
            />
            <Route path="city/:city" element={<JobAt text="Jobs in" />} />
            <Route
              path="location-type/:locationType"
              element={<JobAt text="Jobs by" />}
            />
            <Route path="category/:category" element={<JobAt text="" />} />
            <Route path="/verify/:token" element={<Verify />} />
            <Route path="/landing" element={<LandingPage />} />
            <Route path="/login" element={<LogIn />} />
            <Route
              path="/forgot-password/:token"
              element={<Forgot_password />}
            />
            <Route path="/login/:error" element={<LogIn />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/search/:uid" element={<Home />} />
            <Route path="/account" element={<Account />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/promote-job" element={<PostJob />} />
            <Route
              path="/company/:name"
              element={<JobAt text="Job Openings At" />}
            />
            <Route path="/unsubscribe/:id" element={<Unsubscribe />} />
          </Routes>
        </HelmetProvider>
      </div>
    </Context.Provider>
  );
}

export default App;
