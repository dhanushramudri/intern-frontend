import React, { useRef, useState } from "react";
import Header from "../Header/Header";
import main_svg from "./main_svg.svg";
import "./postjob.css";
import Footer from "../Footer/Footer";
import JobContainer from "./JobContainer";
import Adons from "./Ad-ons";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";

export default function Landing_page() {
  const [jobs, setJobs] = useState([]);
  const [title, setTitle] = useState("");
  const titleRef = useRef();
  const companyRef = useRef();
  const [compnay, setCompany] = useState("");
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);

  const [name, setName] = useState("");
  const [company_email, setCompany_email] = useState("");
  const [industry, setIndustry] = useState("");
  const [total_employees, setTotal_employees] = useState("");
  const [position, setPosition] = useState("");

  useEffect(() => {
    const name = localStorage.getItem("promote_job_name");
    const company_email = localStorage.getItem("promote_job_company_email");
    const industry = localStorage.getItem("promote_job_industry");
    const total_employees = localStorage.getItem("promote_job_total_employees");
    const position = localStorage.getItem("promote_job_position");
    if (name) setName(name);
    if (company_email) setCompany_email(company_email);
    if (industry) setIndustry(industry);
    if (total_employees) setTotal_employees(total_employees);
    if (position) setPosition(position);
  }, []);

  function add_job(job, id) {
    if (document.getElementById(`select-to-promote-${id}`).checked) {
      document.getElementById(`select-to-promote-${id}`).checked = false;
    } else {
      document.getElementById(`select-to-promote-${id}`).checked = true;
    }
    let newJobs = [...jobs];
    for (let i = 0; i < newJobs.length; i++) {
      if (newJobs[i].id === job._id) {
        newJobs.splice(i, 1);
        setJobs(newJobs);
        return;
      }
    }
    newJobs.push({ id: job._id, title: job["job_title"] });
    setJobs(newJobs);
  }

  function setStep() {
    let step1 = document.getElementById("post-job-step1");
    let step2 = document.getElementById("post-job-step2");
    if (page === 1) {
      setPage(2);
      step1.classList.remove("post-job-step-active");
      step2.classList.add("post-job-step-active");
    } else if (page === 2) {
      setPage(1);
      // update_inputs();
      step1.classList.add("post-job-step-active");
      step2.classList.remove("post-job-step-active");
    }
  }

  function saveData() {
    const token = auth.token;
    console.log("Here");
    if (!token) {
      navigate("/login");
      return;
    }
    if (!name || !company_email || !industry || !total_employees || !position) {
      alert("Please fill all the fields");
      return;
    }
    localStorage.setItem("promote_job_name", name);
    localStorage.setItem("promote_job_company_email", company_email);
    localStorage.setItem("promote_job_industry", industry);
    localStorage.setItem("promote_job_total_employees", total_employees);
    localStorage.setItem("promote_job_position", position);
    setStep();
  }

  return (
    <div style={{ position: "relative" }}>
      <Header />
      <div className="landing_page_main_container">
        <div className="landing_page_wishlist_container">
          <div className="landing-page-wishlist-container">
            <div className="landing-page-heading-title">
              <span className="unsuckify">Promote</span> Your Job
            </div>
            <div className="landing-page-heading-description">
              Hire your dream candidate faster - from engineers to marketers,
              designers, and product managers - with backgrounds in SaaS,
              HealthTech, AI, Fintech, and beyond.
            </div>
            <div className="post-job-details">
              <div
                style={{
                  marginBottom: "8px",
                  fontSize: "18px",
                  fontWeight: "600",
                  color: "#2B2B2B",
                  fontFamily: "Cera Round Pro DEMO MEDIUM",
                }}
              >
                Complete this first to promote your job!
              </div>
              <div className="post-job-steps">
                <div
                  onClick={() => setStep(1)}
                  id="post-job-step1"
                  className="post-job-step post-job-step-active"
                ></div>
                <div id="post-job-step2" className="post-job-step"></div>
              </div>
            </div>
            {page === 1 ? (
              <div className="post-job-requirements">
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    marginTop: "20px",
                    flexWrap: "wrap",
                    gap: "20px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      marginTop: "10px",
                    }}
                  >
                    <label
                      style={{
                        marginBottom: "8px",
                        fontSize: "18px",
                        fontWeight: "600",
                        color: "#2B2B2B",
                        fontFamily: "Cera Round Pro DEMO MEDIUM",
                      }}
                    >
                      Your name
                    </label>
                    <input
                      onChange={(e) => setName(e.target.value)}
                      className="postjob-page-wishlist-input"
                      type="text"
                      placeholder="IE. John"
                      value={name}
                    ></input>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      marginTop: "10px",
                    }}
                  >
                    <label
                      style={{
                        marginBottom: "8px",
                        fontSize: "18px",
                        fontWeight: "600",
                        color: "#2B2B2B",
                        fontFamily: "Cera Round Pro DEMO MEDIUM",
                      }}
                    >
                      Work email
                    </label>
                    <input
                      onChange={(e) => setCompany_email(e.target.value)}
                      className="postjob-page-wishlist-input"
                      type="text"
                      placeholder="Example@google.com"
                      value={company_email}
                    ></input>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      marginTop: "10px",
                    }}
                  >
                    <label
                      style={{
                        marginBottom: "8px",
                        fontSize: "18px",
                        fontWeight: "600",
                        color: "#2B2B2B",
                        fontFamily: "Cera Round Pro DEMO MEDIUM",
                      }}
                    >
                      Work Position
                    </label>
                    <input
                      onChange={(e) => setPosition(e.target.value)}
                      className="postjob-page-wishlist-input"
                      type="text"
                      placeholder="UX/UI"
                      value={position}
                    ></input>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      marginTop: "10px",
                    }}
                  >
                    <label
                      style={{
                        marginBottom: "8px",
                        fontSize: "18px",
                        fontWeight: "600",
                        color: "#2B2B2B",
                        fontFamily: "Cera Round Pro DEMO MEDIUM",
                      }}
                    >
                      Total # of employees
                    </label>
                    <input
                      onChange={(e) => setTotal_employees(e.target.value)}
                      className="postjob-page-wishlist-input"
                      type="text"
                      placeholder="Enter a number"
                      value={total_employees}
                    ></input>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      marginTop: "10px",
                    }}
                  >
                    <label
                      style={{
                        marginBottom: "8px",
                        fontSize: "18px",
                        fontWeight: "600",
                        color: "#2B2B2B",
                        fontFamily: "Cera Round Pro DEMO MEDIUM",
                      }}
                    >
                      Industry
                    </label>
                    <input
                      onChange={(e) => setIndustry(e.target.value)}
                      className="postjob-page-wishlist-input"
                      type="text"
                      placeholder="IE. Medicine, Sales"
                      value={industry}
                    ></input>
                  </div>
                </div>
                <button
                  onClick={() => saveData()}
                  className="landing-page-join-wishlist-btn"
                >
                  Continue
                </button>
              </div>
            ) : (
              <div className="post-job-requirements">
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    marginTop: "20px",
                    flexWrap: "wrap",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      marginRight: "30px",
                      marginTop: "10px",
                    }}
                  >
                    <label
                      style={{
                        marginBottom: "8px",
                        fontSize: "18px",
                        fontWeight: "600",
                        color: "#2B2B2B",
                        fontFamily: "Cera Round Pro DEMO MEDIUM",
                      }}
                    >
                      💼 Job Title
                    </label>
                    <input
                      ref={titleRef}
                      className="postjob-page-wishlist-input"
                      type="text"
                      placeholder="Enter Job Title"
                      key="title"
                    ></input>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      marginTop: "10px",
                    }}
                  >
                    <label
                      style={{
                        marginBottom: "8px",
                        fontSize: "18px",
                        fontWeight: "600",
                        color: "#2B2B2B",
                        fontFamily: "Cera Round Pro DEMO MEDIUM",
                      }}
                    >
                      🏢 Company
                    </label>
                    <input
                      ref={companyRef}
                      className="postjob-page-wishlist-input"
                      type="text"
                      placeholder="Enter Company"
                      key="company"
                    ></input>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setTitle(titleRef.current.value);
                    setCompany(companyRef.current.value);
                  }}
                  className="landing-page-join-wishlist-btn"
                >
                  Search
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="landing_page_svg">
          <img className="landing-page-svg" src={main_svg} alt="svg" />
        </div>
      </div>
      {page === 2 && (
        <>
          <JobContainer
            add_job={(job, id) => add_job(job, id)}
            title={title}
            compnay={compnay}
          />
          <Adons title={title} company={compnay} jobs={jobs} />
        </>
      )}
      <Footer />
    </div>
  );
}
