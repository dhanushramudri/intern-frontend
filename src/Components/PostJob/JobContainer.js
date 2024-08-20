import React, { useEffect, useState, useRef } from "react";
import JobSkeleton from "../JobSkeleton/JobSkeleton";
import JobFooter from "../JobFooter/JobFooter";
import logout from "../Auth/logout";

export default function JobContainer(props) {
  const [loading, setLoading] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [n, setN] = useState();
  const [page, setPage] = useState(1);
  const prevProp1 = useRef("");
  const prevProp2 = useRef("");
  const prevPage = useRef(1);
  const [selected, setSelected] = useState([]);

  // useEffect(() => {
  //   const selected_jobs = JSON.parse(
  //     localStorage.getItem("promote_job_selected_jobs")
  //   );
  //   if (selected_jobs) {
  //     let selected_job_id = [];
  //     selected_jobs.map((job, id) => {
  //       selected_job_id.push(job["_id"]);
  //     });
  //     setSelected(selected_job_id);
  //   }
  // }, []);

  useEffect(() => {
    if (props.title === "" && props.compnay === "") return;
    if (
      prevProp1.current === props.title &&
      prevProp2.current === props.compnay &&
      page === prevPage.current
    ) {
      return;
    }
    async function getJobsData() {
      setLoading(true);
      await fetch(`${process.env.REACT_APP_API_ENDPOINT}/get_jobs_to_promote`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify([props.title, props.compnay, page]),
      }).then((res) => {
        if (!res.ok) {
          logout();
          return;
        }
        return res.json().then((data) => {
          setJobs(data[0]);
          setLoading(false);
          setN(data[1]);
        });
      });
    }
    getJobsData();
    prevPage.current = page;
    prevProp1.current = props.title;
    prevProp2.current = props.compnay;
  }, [props.title, props.compnay, page]);

  function select_job(id) {
    let new_array = [...selected];
    if (new_array.includes(id)) {
      new_array = new_array.filter((idx) => idx !== id);
    } else {
      new_array.push(id);
    }
    setSelected(new_array);
  }

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div className="job-container">
        {loading ? (
          <JobSkeleton />
        ) : jobs.length <= 0 ? (
          <></>
        ) : (
          // Job item section
          <div>
            {jobs.map((job, idx) => {
              return (
                <div
                  onClick={() => {
                    props.add_job(job, idx);
                    select_job(job["_id"]);
                  }}
                  id={`job-${job["_id"]}`}
                  className="job-item"
                  key={idx}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    {selected.includes(job["_id"]) ? (
                      <input
                        checked={true}
                        onClick={() => {
                          props.add_job(job, idx);
                          select_job(job["_id"]);
                        }}
                        type="radio"
                        id={`select-to-promote-${idx}`}
                        style={{ marginRight: "8px" }}
                      />
                    ) : (
                      <input
                        checked={false}
                        onClick={() => {
                          props.add_job(job, idx);
                          select_job(job["_id"]);
                        }}
                        type="radio"
                        id={`select-to-promote-${idx}`}
                        style={{ marginRight: "8px" }}
                      />
                    )}
                    <div className="company-logo-container">
                      <img
                        src={`${job["company_logo"]}`}
                        alt={job["company_name"]}
                        className="company-logo"
                      ></img>
                    </div>
                  </div>
                  <div className="content-container">
                    <div className="promote-job-title">{job["job_title"]}</div>
                    <div className="company-details">
                      <div className="company-name item">
                        {job["company_name"]}
                      </div>
                    </div>
                    <div className="job-details">
                      {job["salary"] ? (
                        <div className="item">
                          💰 {job["salary"].value} {job["salary"].currency}
                        </div>
                      ) : (
                        ""
                      )}
                      <div className="item">🛢️ {job["job_board"]}</div>
                      <div className="item">
                        {job["job_type"] === "Full-Time"
                          ? "⏰"
                          : job["job_type"] === "Part-Time"
                          ? "⏱"
                          : job["job_type"] === "Internship"
                          ? "👨‍🎓"
                          : "👨‍🎓"}{" "}
                        {job["job_type"]}
                      </div>
                      {job["location_type"].map((type, idx) => {
                        return (
                          <div key={idx} className="item">
                            {type === "Remote"
                              ? "🏠"
                              : type === "In-Person"
                              ? "💼"
                              : "💻"}{" "}
                            {type}
                          </div>
                        );
                      })}
                      {job["years_of_experience"] !== null ? (
                        <div className="item">
                          {job["years_of_experience"] <= 2
                            ? "🟢 Entry level"
                            : job["years_of_experience"] <= 5
                            ? "🟡 Junior"
                            : job["years_of_experience"] <= 10
                            ? "🟠 Senior"
                            : "🔴 Expert"}
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                    <div className="category">
                      {job["job_category"].map((category, key) => {
                        return (
                          <div key={key} className="item">
                            {category}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })}
            <JobFooter
              page={page}
              n={Math.ceil(n / 10)}
              pageChanged={(no) => setPage(no)}
            />
          </div>
        )}
      </div>
    </div>
  );
}
