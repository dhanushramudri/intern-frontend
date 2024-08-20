import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import "./pricing.css";
import { useNavigate } from "react-router-dom";
import greentick from "./greentick.svg";
import HowItWorks from "../HowItWorks/HowItWorks";
import { Oval } from "react-loader-spinner";
import Testimonials from "../Testimonials/Testimonials";
import logout from "../Auth/logout";
import { useSelector } from "react-redux";

export default function Pricing() {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const auth = useSelector((state) => state.auth);
  const jobs_data = useSelector((state) => state.jobs_data);
  const [no_of_jobs, setNo_of_jobs] = useState(0);

  function getFilters() {
    return {
      KeywordsData: [],
      experienceData: [],
      locationData: [],
      locationTypeData: [],
      salaryData: [],
      titleData: [],
      EmploymentTypeData: [],
      include_yoe: [],
      include_no_salary: [],
      industry: [],
      jobCategory: [],
      visa: [],
      hideSeenJobs: [],
      datePosted: [],
      include_remote: [],
      currency: "",
    };
  }

  async function getJobsData() {
    await fetch(`${process.env.REACT_APP_API_ENDPOINT}/api`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify([getFilters(), 1, "Relevance & Date", ""]),
    }).then((data) => {
      if (!data.ok) {
        return;
      }
      return data
        .json()
        .then((res) => {
          setNo_of_jobs(res[1]);
        })
        .catch((e) => {
          setNo_of_jobs(236912);
        });
    });
  }

  useEffect(() => {
    getJobsData();
  }, []);

  function purchase(duration) {
    setLoading(true);
    const token = auth.token;
    fetch(`${process.env.REACT_APP_API_ENDPOINT}/purchase`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ duration: duration }),
    }).then((res) => {
      if (!res.ok) {
        logout();
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
    <div style={{ width: "100%", height: "fit-content" }}>
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
      <Header />
      <div className="pricing-title-card">
        <h1 className="pricing-title">
          💼 ‍Ready to Find a <span className="unsuckify">Job?</span>
        </h1>
        <div className="pricing-subtitle">
          The job search process is broken. Un-suckify the job search forever,
          access the hidden job market, and get hired faster.
        </div>
      </div>
      <HowItWorks />
      <div className="pricing-card-container">
        <div className="pricing-card-title">
          Subscribe now to unlock all job opportunities.
        </div>
        <div className="pricing-card-subtitle">
          {" "}
          <span className="unsuckify">
            +
            {no_of_jobs > 10
              ? (no_of_jobs - 10).toLocaleString("en-US")
              : "Loading..."}{" "}
            More
          </span>{" "}
          Jobs Available Now!
        </div>
        <div className="pricing-card-advantages">
          <div className="pricing-card-hr"></div>
          <div className="pricing-card-advantage">
            <img
              alt="tick"
              src={greentick}
              className="pricing-card-advantage-img"
            />{" "}
            Unlimited search results of all tech jobs on the internet
          </div>
          <div className="pricing-card-advantage">
            <img
              alt="tick"
              src={greentick}
              className="pricing-card-advantage-img"
            />{" "}
            Be the first to know with daily job notifications
          </div>
          <div className="pricing-card-advantage">
            <img
              alt="tick"
              src={greentick}
              className="pricing-card-advantage-img"
            />{" "}
            More advanced search filters
          </div>
        </div>
        <div className="pricing-card-subtitle">Choose your membership</div>
        <div className="pricing-card-cancel-anytime-text">Cancel Anytime</div>
        <div className="pricing-buttons">
          <button className="pricing-button" onClick={() => purchase("week")}>
            🥳 $5 / week
          </button>
          <button className="pricing-button" onClick={() => purchase("month")}>
            🎉 $18 / month
          </button>
          <button className="pricing-button" onClick={() => purchase("year")}>
            🚀 $60 / year
          </button>
        </div>
      </div>

      <div className="pricing-alert">
        <Testimonials />
        <a href="/" className="landing-page-join-wishlist-btn-2">
          🔎 Search Jobs
        </a>
      </div>
      <Footer />
    </div>
  );
}
