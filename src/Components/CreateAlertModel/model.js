import React, { useEffect, useRef, useState } from "react";
import "./model.css";
import Create_alert_menu from "../Dropdowns/create_alert_menu";
import { useSearchParams } from "react-router-dom";
import notification_bell from "./notification_bell.png";
import SortBy from "../Dropdowns/SortBy_menu";
import { useSelector } from "react-redux";

export default function Lgoin() {
  function close() {
    document.getElementById("model-container").style.display = "none";
  }
  const auth = useSelector((state) => state.auth);

  const [query, setQuery] = useSearchParams();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const nameRef = useRef();
  const email_ref = useRef();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const [emailFrequency, setEmailFrequency] = useState(["Daily"]);
  const [emailFrequencyOptions, setEmailFrequencyOptions] = useState([
    "Weekly",
  ]);

  useEffect(() => {
    if (auth.email) {
      setEmail(auth.email);
    }
    if (auth.token && !auth.isSubscribed) {
      setEmailFrequency(["Weekly"]);
      setEmailFrequencyOptions([]);
    } else {
      setEmailFrequency(["Daily"]);
      setEmailFrequencyOptions(["Weekly"]);
    }
  }, [auth]);

  function getFilters() {
    return {
      KeywordsData: query.get("keywords")
        ? query.get("keywords").split(",")
        : [],
      experienceData: query.get("experience")
        ? [...JSON.parse(query.get("experience"))]
        : [],
      locationData: query.get("locations")
        ? query.get("locations").split(",")
        : [],
      locationTypeData: query.get("locationType")
        ? query.get("locationType").split(",")
        : [],
      salaryData: query.get("salary")
        ? [...JSON.parse(query.get("salary"))]
        : [],
      titleData: query.get("jobTitle") ? query.get("jobTitle").split(",") : [],
      EmploymentTypeData: query.get("employmentType")
        ? query.get("employmentType").split(",")
        : [],
      include_yoe: query.get("include_yoe") ? query.get("include_yoe") : [],
      include_no_salary: query.get("include_no_salary")
        ? query.get("include_no_salary")
        : [],
      industry: query.get("industry") ? query.get("industry").split(",") : [],
      jobCategory: query.get("jobCategory")
        ? query.get("jobCategory").split(",")
        : [],
      visa: query.get("visa") ? query.get("visa") : [],
      hideSeenJobs: query.get("hide_seen_jobs")
        ? query.get("hide_seen_jobs")
        : [],
      datePosted: query.get("datePosted")
        ? [JSON.parse(query.get("datePosted"))]
        : [],
      include_remote: query.get("include_remote")
        ? query.get("include_remote")
        : [],
      currency: query.get("currency") ? query.get("currency") : "",
    };
  }

  async function submitForm() {
    const token = auth.token;
    if (!token) return;
    if (nameRef.current.value === "") {
      setMessage("Please Fill in all the feilds!");
      setTimeout(() => {
        setMessage("");
      }, 5000);
      return;
    }
    const body = {
      name: nameRef.current.value,
      email: email_ref.current.value,
    };
    setLoading(true);
    await fetch(`${process.env.REACT_APP_API_ENDPOINT}/create_alert`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify([body, getFilters(), emailFrequency]),
    })
      .then((data) => {
        return data.json();
      })
      .then((res) => {
        if (res.message === "success") {
          setMessage("Subscribed! you will start recieving updates sortly 🎉");
          setLoading(false);
          setTimeout(() => {
            setMessage("");
            document.getElementById("model-container").style.display = "none";
          }, 5000);
        } else if (res.message === "updated") {
          setMessage("Updated your preferences successfully! 🎉");
          setLoading(false);
          setTimeout(() => {
            setMessage("");
            document.getElementById("model-container").style.display = "none";
          }, 5000);
        } else {
          setMessage("Could not subscribe, please try again!");
          setLoading(false);
          setTimeout(() => {
            setMessage("");
          }, 5000);
        }
      })
      .catch((e) => {
        setMessage(e.message);
        setLoading(false);
        setTimeout(() => {
          setMessage("");
        }, 5000);
      });
  }
  return (
    <div
      id="model-container"
      style={{
        position: "fixed",
        width: "100%",
        top: "0%",
        bottom: "0%",
        height: "100vh",
        display: "none",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 10,
      }}
    >
      {message !== "" ? (
        <div
          style={{
            height: "70px",
            width: "100%",
            position: "fixed",
            top: "0%",
            zIndex: "99999",
          }}
        >
          <div
            id="animate_loading"
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
      <div className="model-container" onClick={() => close()}></div>
      <div className="model-card">
        <div className="model-header">
          <div className="model-header-title">Create Alert for New Jobs</div>
          <div className="close-btn-header" onClick={() => close()}>
            &times;
          </div>
        </div>
        <div className="model-title">
          Receive emails whenever new job openings matching your criteria are
          posted.
        </div>
        <form onSubmit={() => submitForm()}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              height: "100%",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column" }}>
              <label className="model-label">Your Name</label>
              <input
                required
                name="name"
                className="model-input"
                ref={nameRef}
                value={name}
                placeholder="Name"
                onChange={() => setName(nameRef.current.value)}
              ></input>
              <label className="model-label">Email</label>
              <input
                ref={email_ref}
                placeholder="Email"
                value={email}
                onChange={() => setEmail(email_ref.current.val)}
                className="model-input"
              ></input>
            </div>
          </div>
          <div className="create-alert-img">
            <img alt="alert img" src={notification_bell} />
          </div>
        </form>
        <div className="model-filter-title">
          Filters <span style={{ fontStyle: "italic" }}>(Optional)</span>
        </div>
        <div className="model-filters">
          <Create_alert_menu />
        </div>
        <div className="email-frequency-container model-filter-title">
          <div style={{ marginBottom: "20px" }}>Email Frequency</div>
          <SortBy
            changeSortByOption={(val) => {
              setEmailFrequency([val]);
              if (val === "Weekly") setEmailFrequencyOptions(["Daily"]);
              else setEmailFrequencyOptions(["Weekly"]);
            }}
            items={emailFrequency}
            options={emailFrequencyOptions}
            id="email-frequency"
          />
        </div>

        <div className="model-footer">
          <button className="model-close-btn" onClick={() => close()}>
            Cancel
          </button>
          <button className="create-alert-btn" onClick={() => submitForm()}>
            {loading ? "Creating..." : "Create Alert"}
          </button>
        </div>
      </div>
    </div>
  );
}
