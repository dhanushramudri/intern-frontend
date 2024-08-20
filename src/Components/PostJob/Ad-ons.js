import React, { useEffect } from "react";
import { useState } from "react";
import "./Adons.css";
import { useNavigate } from "react-router";
import logout from "../Auth/logout";
import { useSelector } from "react-redux";

export default function Adons(props) {
  const [amount, setAmount] = useState(0);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    select_duration(49);
  });

  function calculate_amount(price) {
    let no_of_jobs = props.jobs.length;
    setAmount(price * no_of_jobs);
  }
  function select_duration() {
    let options = document.getElementsByName("duration-option");
    let price;
    for (const option of options) {
      if (option.checked) {
        price = option.value;
        break;
      }
      price = 0;
    }
    calculate_amount(price);
  }

  function promote() {
    const token = auth.token;

    const name = localStorage.getItem("promote_job_name");
    const company_email = localStorage.getItem("promote_job_company_email");
    const industry = localStorage.getItem("promote_job_industry");
    const total_employees = localStorage.getItem("promote_job_total_employees");
    const position = localStorage.getItem("promote_job_position");

    if (!name || !company_email || !industry || !total_employees || !position) {
      setMessage("Please fill all the details in the previous page");
      setTimeout(() => {
        setMessage("");
      }, 5000);
      return;
    }
    if (amount <= 0) {
      setMessage("Please select atleast one job and a duration to promote");
      setTimeout(() => {
        setMessage("");
      }, 5000);
      return;
    }
    if (!token) {
      navigate("/login/");
      return;
    }
    let options = document.getElementsByName("duration-option");
    let duration;
    let i = 1;
    for (const option of options) {
      if (option.checked) {
        duration = option.value;
        break;
      }
      i++;
    }
    fetch(`${process.env.REACT_APP_API_ENDPOINT}/promote_job_checkout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify([
        props.jobs,
        i,
        { name, company_email, industry, total_employees, position },
      ]),
    }).then((res) => {
      if (!res.ok) {
        logout();
        return;
      }
      return res.json().then((data) => {
        if (data.message) {
          setMessage(data.message);
        } else {
          window.location = data.url;
        }
      });
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
      <div className="promote_job_adons_container">
        {/* <div className="adons_title">Add-Ons</div> */}
        <ul className="promote_jobs_list">
          {props.jobs.map((job, idx) => {
            return (
              <li key={idx} className="job-title">
                {job["title"]}
              </li>
            );
          })}
        </ul>
        {/* <div className="pricing-card-advantages">
            <div className="pricing-card-advantage">
              <img
                alt="tick"
                src={greentick}
                className="pricing-card-advantage-img"
              />{" "}
              Adipiscing varius id cras
            </div>
            <div className="pricing-card-advantage">
              <img
                alt="tick"
                src={greentick}
                className="pricing-card-advantage-img"
              />{" "}
              Sem sed id egestas
            </div>
            <div className="pricing-card-advantage">
              <img
                alt="tick"
                src={greentick}
                className="pricing-card-advantage-img"
              />{" "}
              Enim consectetur
            </div>
          </div> */}
        <div className="adons_label">Select Duration</div>
        <div className="duration_container">
          <div className="duration">
            <input
              onClick={() => select_duration()}
              value={0.5}
              name="duration-option"
              type="radio"
            ></input>
            <div className="duration-date">📅 1 day promotion</div>
          </div>
          <div className="duration">
            <input
              onClick={() => select_duration()}
              value={5}
              name="duration-option"
              type="radio"
            ></input>
            <div className="duration-date">🗒 1 week promotion</div>
          </div>
          <div className="duration">
            <input
              onClick={() => select_duration()}
              value={9}
              name="duration-option"
              type="radio"
            ></input>
            <div className="duration-date">🗓 1 month promotion</div>
          </div>
        </div>
        <div className="adons_amount">${amount}</div>
        <button onClick={() => promote()} className="email-alert-btn">
          Promote
        </button>
      </div>
    </div>
  );
}
