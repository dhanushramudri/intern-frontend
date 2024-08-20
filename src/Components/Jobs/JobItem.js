import React, { useEffect, useState } from "react";
import "./jobitem.css";
import JobSkeleton from "../JobSkeleton/JobSkeleton";
import JobFooter from "../JobFooter/JobFooter";
import bookmark from "./bookmark.svg";
import bookmarked from "./bookmarked.svg";
import Blocker from "../Blocker/Blocker";
import { Oval } from "react-loader-spinner";
import { useParams, useSearchParams } from "react-router-dom";
import { job_category_map } from "../filterProps/filterOptions";
import hiring from "./hiring.svg";
import logout from "../Auth/logout";
import { useDispatch, useSelector } from "react-redux";
import { industryMap } from "../filterProps/filterOptions";

export default function JobItem(props) {
  const [query, setQuery] = useSearchParams();

  const [loading, setLoading] = useState(true);
  const [bookmarked_jobs, setBookmarked_jobs] = useState([]);
  const [n, setN] = useState();
  const [page, setPage] = useState(
    query.get("page") ? JSON.parse(query.get("page")) : 1
  );
  const [jobs, setJobs] = useState([]);
  const auth = useSelector((state) => state.auth);
  const [appliedJobs, setAppliedJobs] = useState([]);
  const dispatch = useDispatch();

  const { name } = useParams();
  const company_name = name ? name : "";

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

  useEffect(() => {
    if (query.get("page")) {
      setPage(JSON.parse(query.get("page")));
    } else {
      setPage(1);
    }
  }, [query]);

  useEffect(() => {
    if (auth.isLoggedIn) {
      fetch(`${process.env.REACT_APP_API_ENDPOINT}/get_bookmarked_jobs`, {
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
          const bookmarked_jobs_ids = data[0].map((id) => id.toString());
          const applied_jobs = data[1].map((id) => id.toString());
          setBookmarked_jobs(bookmarked_jobs_ids);
          setAppliedJobs(applied_jobs);
        });
      });
    } else {
      setBookmarked_jobs([]);
    }
  }, [auth.isLoggedIn]);

  function getDate(date) {
    const currentDate = new Date();

    const compareDate = new Date(date);

    const diffInMs = currentDate - compareDate;

    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInDays === 0) {
      return "today";
    } else if (diffInDays === 1) {
      return "yesterday";
    } else if (diffInDays < 7) {
      return `${diffInDays} days ago`;
    } else if (diffInDays < 30) {
      return Math.floor(diffInDays / 7) > 1
        ? `${Math.floor(diffInDays / 7)} weeks ago`
        : `${Math.floor(diffInDays / 7)} week ago`;
    } else {
      return Math.floor(diffInDays / 30) > 1
        ? `${Math.floor(diffInDays / 30)} months ago`
        : `${Math.floor(diffInDays / 30)} month ago`;
    }
  }

  const setToken = (token) => ({
    type: "token",
    payload: token,
  });

  const no_of_jobs_data = (data) => ({
    type: "no_of_jobs",
    payload: data,
  });

  async function getJobsData() {
    let token = auth.token;
    if (!token) return;
    if (JSON.parse(query.get("page")) > 1 && !token) return;
    setLoading(true);
    props.setLoadingState(true);
    await fetch(`${process.env.REACT_APP_API_ENDPOINT}/api`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify([
        getFilters(),
        query.get("page") ? JSON.parse(query.get("page")) : 1,
        query.get("sort") ? query.get("sort") : "Relevance & Date",
        company_name,
      ]),
    })
      .then((data) => {
        if (!data.ok) {
          dispatch(setToken(""));
          return;
        }
        return data
          .json()
          .then((res) => {
            if (res[3] === "No Access") {
              document.getElementById("authOverlay").style.display = "flex";
              return;
            }
            setJobs(res[0]);
            props.setNoOfJobs(res[1]);
            setN(res[1]);
            dispatch(no_of_jobs_data(res[1]));
            props.setCompanyCount(res[2]);
            props.setLoadingState(false);
            setLoading(false);
          })
          .catch((e) => {
            alert(e);
            props.setLoadingState(false);
            setJobs([]);
            props.setNoOfJobs(0);
            setLoading(false);
            setN(0);
            props.setMessage(e);
          });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  useEffect(() => {
    if (query.size >= 1) getJobsData();
  }, [query, auth.token]);

  function bookmark_job(id, idx) {
    if (!auth.token) return;
    if (auth.token && !auth.isLoggedIn) {
      props.setMessage("Please Login or Signup to bookmark the Jobs!");
      setTimeout(() => {
        props.setMessage("");
      }, 5000);
      return;
    }
    document.getElementById(`bookmark-loading-${idx}`).style.display = "block";
    try {
      fetch(`${process.env.REACT_APP_API_ENDPOINT}/bookmark_jobs`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify([id]),
      }).then((data) => {
        if (!data.ok) {
          logout();
          return;
        }
        return data.json().then((res) => {
          if (res.message === "success") {
            document.getElementById(`bookmark-loading-${idx}`).style.display =
              "none";
          } else {
            document.getElementById(`bookmark-loading-${idx}`).style.display =
              "none";
            return;
          }
        });
      });
    } catch (e) {
      document.getElementById(`bookmark-loading-${idx}`).style.display = "none";
      return;
    }
    if (bookmarked_jobs.includes(id)) {
      let newBookmarkJobs = [...bookmarked_jobs];
      newBookmarkJobs = newBookmarkJobs.filter((job_id) => job_id !== id);
      setBookmarked_jobs(newBookmarkJobs);
    } else {
      let newBookmarkJobs = [...bookmarked_jobs];
      newBookmarkJobs.push(id);
      setBookmarked_jobs(newBookmarkJobs);
    }
  }

  function openJob(event, idx, link) {
    const bookmark_ele = document.getElementById(`bookmark-${idx}`);
    if (bookmark_ele) if (bookmark_ele.contains(event.target)) return;
    const locations_ele = document.getElementById(
      `location-details-container-${idx}`
    );
    if (locations_ele) if (locations_ele.contains(event.target)) return;
    const links_section = document.getElementById(`more-details-${idx}`);
    if (links_section) if (links_section.contains(event.target)) return;
    const job_details = document.getElementById(`job-details-${idx}`);
    if (job_details) if (job_details.contains(event.target)) return;
    window.open(link);
  }

  function getLink(link) {
    let companyLink = link;
    if (!companyLink.includes("http://") && !companyLink.includes("https://")) {
      companyLink = "http://" + companyLink;
    }
    return companyLink;
  }

  return (
    <div className="job-item-container">
      {loading ? (
        <JobSkeleton />
      ) : (
        <div>
          {jobs.map((job, idx) => {
            return (
              <div
                id={`job-${job["_id"]}`}
                className={`job-item ${
                  appliedJobs.includes(job["_id"]) && "applied-job"
                }`}
                onClick={(e) =>
                  openJob(
                    e,
                    idx,
                    `/company/${job["company_name"]}/jobs/${job["job_title"]}/`
                  )
                }
                target="_blank"
                key={idx}
                style={{
                  textDecoration: "none",
                }}
              >
                <div
                  className="location-details-container"
                  id={`location-details-container-${idx}`}
                >
                  <a
                    href={`/country/${job["country"]}`}
                    style={{
                      display: "flex",
                      maxWidth: "200px",
                      textOverflow: "ellipsis",
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                      flexDirection: "column",
                      marginRight: "15px",
                    }}
                  >
                    {job["country"] ? (
                      <div style={{ color: "black" }}>📍 {job["country"]}</div>
                    ) : (
                      ""
                    )}
                    <div
                      style={{
                        marginTop: "6px",
                        maxWidth: "200px",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        color: "black",
                      }}
                    >
                      {job["city"]}
                    </div>
                    <div id={`job-date-${idx}`} className="date-posted">
                      {getDate(job["date_posted"])}
                    </div>
                  </a>
                  <div
                    style={{
                      width: "40px",
                      height: "40px",
                      position: "relative",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        zIndex: "99",
                        display: "none",
                      }}
                      id={`bookmark-loading-${idx}`}
                    >
                      <Oval
                        height={35}
                        width={35}
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
                    {bookmarked_jobs.includes(job["_id"]) ? (
                      <img
                        id={`bookmark-${idx}`}
                        src={bookmarked}
                        onClick={() => bookmark_job(job["_id"], idx)}
                        alt="bookmarked"
                      />
                    ) : (
                      <img
                        id={`bookmark-${idx}`}
                        src={bookmark}
                        onClick={() => bookmark_job(job["_id"], idx)}
                        alt="bookmark"
                      />
                    )}
                  </div>
                </div>
                <div className="company-logo-container">
                  <img
                    loading="lazy"
                    src={`${job["company_logo"]}`}
                    alt={job["company_name"]}
                    className="company-logo"
                  ></img>
                </div>
                <div className="content-container">
                  <h3 className="job-title" id={`job-title-${idx}`}>
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href={`/company/${job["company_name"]}/jobs/${job["job_title"]}/`}
                    >
                      {job["job_title"]}
                    </a>{" "}
                  </h3>
                  <div className="company-details-1">
                    <h4
                      style={{ display: "flex" }}
                      className="company-name item"
                    >
                      {job["company_name"]}
                      <div className="hiring-badge">
                        {job["promoted"] ? (
                          <>
                            <img
                              title="Actively hiring"
                              src={hiring}
                              alt="promoted"
                            />{" "}
                            <span style={{ color: "black" }}>
                              Actively hiring
                            </span>
                          </>
                        ) : (
                          ""
                        )}
                      </div>
                    </h4>
                  </div>
                  {job["requirements_summary"] ? (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        marginTop: "1rem",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                        }}
                      ></div>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        {job["company_data"] &&
                        job["company_data"]["description_summary"] ? (
                          <>
                            <div
                              style={{
                                fontSize: "18px",
                                maxWidth: "100%",
                                width: "100%",
                                color: "black",
                                display: "flex",
                                alignItems: "center",
                              }}
                            >
                              🏢 About
                            </div>
                            <p
                              className="requirements_text"
                              style={{
                                fontSize: "18px",
                                fontWeight: "500",
                                lineHeight: "1.5",
                                color: "#aaa",
                              }}
                            >
                              {job["company_data"]["description_summary"]}
                            </p>
                          </>
                        ) : (
                          <></>
                        )}
                        <div
                          style={{
                            fontSize: "18px",
                            maxWidth: "100%",
                            width: "100%",
                            color: "black",
                            display: "flex",
                            alignItems: "center",
                            marginRight: "10px",
                          }}
                        >
                          🎯 Requirements
                        </div>
                        <p
                          className="requirements_text"
                          style={{
                            fontSize: "18px",
                            fontWeight: "500",
                            lineHeight: "1.5",
                            color: "#aaa",
                          }}
                        >
                          {job["requirements_summary"]}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <></>
                  )}
                  <div className="more-details-1" id={`more-details-${idx}`}>
                    {/* <div
                      id={`more-details-1-${idx}`}
                      className="item"
                      onClick={() =>
                        applyJob(job["_id"], job["application_link"])
                      }
                    >
                      Apply
                    </div> */}
                    {job["company_link"] && (
                      <a
                        className="item"
                        target="_blank"
                        href={getLink(job["company_link"])}
                      >
                        Website
                      </a>
                    )}
                    {job["company_data"] &&
                      job["company_data"]["linkedin_link"] && (
                        <a
                          className="item"
                          target="_blank"
                          href={getLink(job["company_data"]["linkedin_link"])}
                        >
                          LinkedIn
                        </a>
                      )}
                    <a
                      target="_blank"
                      href={`/company/${job["company_name"]}`}
                      className="item"
                    >
                      All Job Openings
                    </a>
                    <a
                      href={`/resume-tailor/${job["company_name"]}/${job["job_title"]}`}
                      className="item"
                    >
                      AI Resume Tailor
                    </a>
                  </div>
                  <div className="job-details" id={`job-details-${idx}`}>
                    {job["salary"] !== null && job["salary"] !== undefined ? (
                      <div className="item">
                        💰 {job["salary"].value.toLocaleString()}{" "}
                        {job["salary"].currency}
                      </div>
                    ) : (
                      ""
                    )}
                    <div className="item">🛢️ {job["job_board"]}</div>
                    {job["job_type"] ? (
                      <>
                        {job["job_type"].length ? (
                          <>
                            {job["job_type"].map((job_type, idx) => {
                              return (
                                <div className="item" key={idx}>
                                  {job_type === "Full Time"
                                    ? "⏰"
                                    : job_type === "Part Time"
                                    ? "⏰"
                                    : job_type === "Internship"
                                    ? "👨‍🎓"
                                    : "📃"}{" "}
                                  {job_type}
                                </div>
                              );
                            })}
                          </>
                        ) : (
                          <></>
                        )}
                      </>
                    ) : (
                      <>
                        {job["job_type"] === "Full Time"
                          ? "⏰"
                          : job["job_type"] === "Part Time"
                          ? "⏱"
                          : job["job_type"] === "Internship"
                          ? "👨‍🎓"
                          : ""}{" "}
                      </>
                    )}
                    {job["location_type"] ? (
                      <>
                        {job["location_type"].map((type, idx) => {
                          return (
                            <a
                              href={`/location-type/${type}`}
                              key={idx}
                              className="item"
                            >
                              {type === "Remote"
                                ? "🏠"
                                : type === "In-Person"
                                ? "💼"
                                : "💻"}{" "}
                              {type}
                            </a>
                          );
                        })}
                      </>
                    ) : (
                      <></>
                    )}
                    {job["yoe_range"] !== null &&
                    typeof job["yoe_range"] === "object" ? (
                      <div className="item">
                        {Math.max(
                          job["yoe_range"]["max"],
                          job["yoe_range"]["min"]
                        ) <= 2
                          ? "🟢 Entry level "
                          : Math.max(
                              job["yoe_range"]["max"],
                              job["yoe_range"]["min"]
                            ) <= 5
                          ? "🟡 Junior "
                          : Math.max(
                              job["yoe_range"]["max"],
                              job["yoe_range"]["min"]
                            ) < 10
                          ? "🟠 Senior "
                          : "🔴 Expert "}
                        <>
                          {job["yoe_range"]["min"] !== null ||
                          job["yoe_range"]["min"] ===
                            job["yoe_range"]["max"] ? (
                            <>
                              {job["yoe_range"]["max"] !== 0
                                ? job["yoe_range"]["max"]
                                  ? "(" + job["yoe_range"]["max"] + " Years)"
                                  : "(" + job["yoe_range"]["min"] + " Years)"
                                : ""}
                            </>
                          ) : (
                            <>
                              ({job["yoe_range"]["min"]} -{" "}
                              {job["yoe_range"]["max"]} Years)
                            </>
                          )}
                        </>
                      </div>
                    ) : (
                      ""
                    )}
                    {job["visa_sponsored"] ? (
                      <>
                        {job["visa_sponsored"] === true ? (
                          <div className="item">🪪 Visa sponsored</div>
                        ) : (
                          <></>
                        )}
                      </>
                    ) : (
                      <></>
                    )}
                    {/* <span className="category" id={`category-${idx}`}> */}
                    {job["job_category"] ? (
                      <>
                        {job["job_category"].map((category, key) => {
                          return (
                            <a
                              href={`/category/${category}`}
                              key={key}
                              className="item"
                            >
                              {job_category_map[category]
                                ? job_category_map[category] + " "
                                : ""}
                              {category}
                            </a>
                          );
                        })}
                      </>
                    ) : (
                      <></>
                    )}

                    {job["company_data"] &&
                    job["company_data"]["industries"] ? (
                      <>
                        {job["company_data"]["industries"].map(
                          (industry, key) => {
                            return (
                              <div key={key} className="item">
                                {industryMap[industry]
                                  ? industryMap[industry] + " "
                                  : ""}
                                {industry}
                              </div>
                            );
                          }
                        )}
                      </>
                    ) : (
                      <></>
                    )}
                    {/* </span> */}
                  </div>
                </div>
              </div>
            );
          })}
          <JobFooter
            page={page}
            n={Math.ceil(n / 10)}
            pageChanged={(no) => {
              setQuery((prev) => {
                prev.set("page", no);
                return prev;
              });
              setPage(no);
            }}
          />
        </div>
      )}
      <Blocker n={n} />
    </div>
  );
}
