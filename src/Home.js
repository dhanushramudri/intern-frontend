import React, { useEffect, useState } from "react";
import Header from "./Components/Header/Header";
import Menu from "./Components/Dropdowns/Menu";
import CreateAlertModel from "./Components/CreateAlertModel/model";
import Jobs from "./Components/Jobs/Jobs";
import Footer from "./Components/Footer/Footer";
import CountUp from "react-countup";
import bell from "./mdi_bell.svg";
import { useSelector } from "react-redux";
import { Helmet } from "react-helmet";
import backgroundPng from "./images/background.png";

export default function Home() {
  const [no_of_jobs, setNoOfJobs] = useState(100000);
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_ENDPOINT}/no_of_jobs`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((data) => {
        return data.json();
      })
      .then((res) => {
        setNoOfJobs(res[0]);
      });
  }, []);

  function openCreateAlertModel() {
    const token = auth.token;
    if (!token || token === "null" || token === "undefined") {
      document.getElementById("authOverlay").style.display = "flex";
      return;
    }
    document.getElementById("model-container").style.display = "flex";
  }

  useEffect(() => {
    setTimeout(() => {
      if (!JSON.parse(localStorage.getItem("joby.ai-loaded"))) {
        localStorage.setItem("joby.ai-loaded", true);
      }
    }, 500);
  }, []);
  return (
    <div>
      <Helmet>
        <title>Intern.ai - Job Search Engine | Direct from Career Pages</title>
        <meta
          name="description"
          content="Search 500k+ jobs scanned directly from company career pages. No expired roles, find hidden jobs and land your dream job faster. Browse by salary, industry, title, location, years of experience and more. "
        />
        <link rel="canonical" href="https://www.joby.ai" />
      </Helmet>
      <Header createAlert={() => openCreateAlertModel()} />
      <div className="background-svg">
        <img src={backgroundPng} />
      </div>
      <div className="header-content">
        <h1 className="heading-title">
          <span className="unsuckify">Unsuckify</span> the job search
        </h1>
        <h2 className="heading-description">
          We use AI to scan{" "}
          <span className="unsuckify">
            <CountUp start={100000} end={no_of_jobs} />
          </span>{" "}
          jobs in real-time directly from company pages. Every company, every
          job, actually hiring on the internet.{" "}
        </h2>
        <div className="heading-btn">
          <button
            className="email-alert-btn"
            onClick={() => openCreateAlertModel()}
          >
            <img src={bell} alt="bell" />
            Receive E-mail for New Jobs
          </button>
        </div>
      </div>
      <Menu />
      <Jobs createAlert={() => openCreateAlertModel()} />
      <CreateAlertModel />
      <Footer />
    </div>
  );
}
