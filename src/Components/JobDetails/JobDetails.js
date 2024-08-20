import React, { useEffect, useState } from "react";
import "./Jobdetails.css";
import { useNavigate, useParams } from "react-router";
import Footer from "../Footer/Footer";
import { Oval } from "react-loader-spinner";
import Header from "../Header/Header";
import { job_category_map } from "../filterProps/filterOptions";
import hiring from "../Jobs/hiring.svg";
import logout from "../Auth/logout";
import { useSelector } from "react-redux";
import { Helmet } from "react-helmet-async";
import { industryMap } from "../filterProps/filterOptions";

export default function JobDetails() {
  function unslugify(slug) {
    return slug.replace("-", " ");
  }

  const [job, setJob] = useState();
  let { company_name, job_title } = useParams();
  const navigate = useNavigate();
  const [description, setDescription] = useState("");
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    async function getJobData() {
      const token = auth.token;
      if (!token) return;
      try {
        fetch(`${process.env.REACT_APP_API_ENDPOINT}/search_job`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ company_name, job_title }),
        }).then((data) => {
          if (!data.ok) return;
          return data.json().then((res) => {
            if (res["message"] === "No data found") {
              navigate("/login");
              return;
            }
            setJob(res);
            let d = res["description"].toString();
            let des = d[0] + d[1];
            let prev = "";
            for (let i = 1; i < d.length; i++) {
              prev = d[i - 1] + d[i];
              if (prev === "\\n") {
                des = des.slice(0, -2);
              }
              des += d[i];
            }
            let descr = des[0] + des[1] + des[2] + des[3];
            prev = "";
            for (let i = 4; i < des.length; i++) {
              prev = des[i - 4] + des[i - 3] + des[i - 2] + des[i - 1] + des[i];
              if (prev === "<br/>") {
                descr = descr.slice(0, -5);
              }
              descr += des[i];
            }
            descr = descr.replace(/<h1>/g, "<h2>");
            descr = descr.replace(/<\/h1>/g, "</h2>");
            setDescription(descr);
          });
        });
      } catch (e) {
        alert(e);
      }
    }
    getJobData();
  }, [auth]);

  function getDateAfterThreeMonths() {
    const currentDate = new Date();
    const date = new Date(currentDate.setMonth(currentDate.getMonth() + 3));
    return date.toISOString().split("T")[0];
  }

  useEffect(() => {
    if (job) setGoogleJobsScript();
  }, [job]);

  function setGoogleJobsScript() {
    const jobPosting = {
      "@context": "http://schema.org",
      "@type": "JobPosting",
      title: `${job["job_title"]}`,
      description: `${
        job["company_data"] ? job["company_name"]["description_summary"] : ""
      }`,
      identifier: {
        "@type": "PropertyValue",
        name: `${job["company_name"]}`,
        value: `${job["job_title"]}`,
      },
      datePosted: `${job["date_posted"]}`,
      validThrough: getDateAfterThreeMonths(),
      employmentType: `${job["job_type"]}`,
      hiringOrganization: {
        "@type": "Organization",
        name: `${job["company_name"] ? job["company_name"] : ""}`,
        sameAs: `${job["company_link"] ? job["company_link"] : ""}`,
      },
      jobLocation: {
        "@type": "Place",
        address: {
          "@type": "PostalAddress",
          addressLocality: `${job["city"] ? job["city"] : ""}`,
          addressCountry: `${job["company"] ? job["company"]["country"] : ""}`,
        },
      },
      baseSalary: {
        "@type": "MonetaryAmount",
        currency: "USD",
        value: {
          "@type": "QuantitativeValue",
          minValue: `${job["salary"] ? job["salary"].value : ""}`,
          unitText: "YEAR",
        },
      },
    };

    // Convert the job posting data to JSON-LD format
    const jsonLdScript = document.createElement("script");
    let found = false;
    document.querySelectorAll("script").forEach((e) => {
      if (e.type === "application/ld+json") {
        found = true;
      }
    });
    if (!found) {
      jsonLdScript.type = "application/ld+json";
      jsonLdScript.textContent = JSON.stringify(jobPosting);
      document.head.appendChild(jsonLdScript);
    }
  }

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

  async function applyJob(id, link) {
    await fetch(`${process.env.REACT_APP_API_ENDPOINT}/apply_job`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        job_id: id,
      }),
    }).then((data) => {
      if (!data.ok) {
        logout();
        return;
      }
      return data.json().then((res) => {
        if (res.message === "success") {
          window.open(link, "_blank");
        }
      });
    });
  }

  function getLink(link) {
    let companyLink = link;
    if (!companyLink.includes("http://") && !companyLink.includes("https://")) {
      companyLink = "http://" + companyLink;
    }
    return companyLink;
  }

  return (
    <div>
      <Helmet>
        <title>
          {job_title} at {company_name}
        </title>
        <meta
          name="description"
          content={`${company_name}, apply now. Find more great hidden jobs like this one directly from company career pages on Joby.ai. The best job search engine on the internet.`}
        />
        <link ref="icon" href="../../public/logo.png" />
      </Helmet>
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        {job ? (
          <>
            <Header />
            <div className="job-details-container">
              <div className="company-details-container">
                <img
                  src={`${job["company_logo"]}`}
                  alt={job["Company Name"]}
                ></img>
                <div>
                  <div className="jeil-sd">
                    <h2 className="job-details-job-title">
                      {job["company_name"]}
                    </h2>
                    <div className="company-details-2">
                      <a
                        href={`/country/${job.country[0]}`}
                        style={{ marginTop: "10px" }}
                        className="company-name item"
                      >
                        {job.country}
                      </a>
                      <a
                        href={`/city/${job.city}`}
                        style={{ marginTop: "10px" }}
                        className="company-name item"
                      >
                        {job.city}
                      </a>
                    </div>

                    <div className="more-details-2">
                      <a
                        href={getLink(`${job["company_link"]}`)}
                        className="item"
                        target="_blank"
                      >
                        Website
                      </a>
                      {job["company_data"] &&
                      job["company_data"]["linkedin_link"] ? (
                        <a
                          className="item"
                          href={getLink(
                            `${job["company_data"]["linkedin_link"]}`
                          )}
                          target="_blank"
                        >
                          LinkedIn
                        </a>
                      ) : (
                        ""
                      )}
                      <a
                        href={`/company/${job["company_name"]}`}
                        className="item"
                      >
                        All Jobs
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="job-container">
                <div>
                  <h1 className="job-title-company">{job["job_title"]} </h1>
                  <div
                    style={{
                      marginTop: "20px",
                      color: "grey",
                      fontSize: "18px",
                      fontWeight: "600",
                      textTransform: "capitalize",
                      display: "flex",
                    }}
                  >
                    {getDate(job["date_posted"])}
                    <div className="hiring-badge">
                      {job["promoted"] ? (
                        <>
                          <img
                            title="Actively hiring"
                            src={hiring}
                            alt="promoted"
                          />{" "}
                          <span>Actively hiring</span>
                        </>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                  <div className="job-details">
                    {job["salary"] ? (
                      <div className="item">
                        💰 {job["salary"].value.toLocaleString()}{" "}
                        {job["salary"].currency}
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
                    <a
                      href={`/location-type/${job["location_type"]}`}
                      className="item"
                    >
                      {job["location_type"] === "Remote"
                        ? "🏠"
                        : job["location_type"] === "In-Person"
                        ? "💼"
                        : "💻"}{" "}
                      {job["location_type"]}
                    </a>
                    {job["yoe_range"] !== null &&
                    typeof job["yoe_range"] === "object" ? (
                      <div className="item">
                        {Math.max(
                          job["yoe_range"]["max"],
                          job["yoe_range"]["min"]
                        ) <= 2
                          ? "🟢 Entry level ("
                          : Math.max(
                              job["yoe_range"]["max"],
                              job["yoe_range"]["min"]
                            ) <= 5
                          ? "🟡 Junior ("
                          : Math.max(
                              job["yoe_range"]["max"],
                              job["yoe_range"]["min"]
                            ) < 10
                          ? "🟠 Senior ("
                          : "🔴 Expert ("}
                        <>
                          {job["yoe_range"]["min"] === null ||
                          job["yoe_range"]["min"] ===
                            job["yoe_range"]["max"] ? (
                            <>{job["yoe_range"]["max"]} </>
                          ) : (
                            <>
                              {job["yoe_range"]["min"]} -{" "}
                              {job["yoe_range"]["max"]}
                            </>
                          )}
                        </>
                        <>Years)</>
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
                  </div>
                  <button
                    onClick={() => {
                      applyJob(job["_id"], job["application_link"]);
                    }}
                    style={{ marginTop: "20px" }}
                    className="apply-now-btn"
                  >
                    Apply Now
                  </button>
                  <div
                    className="job-details-description"
                    dangerouslySetInnerHTML={{ __html: description }}
                  ></div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      marginTop: "20px",
                      flexWrap: "wrap",
                    }}
                  >
                    <a
                      href={`/company/${job["company_name"]}`}
                      className="apply-now-btn"
                    >
                      All Jobs by {job["company_name"]}
                    </a>
                    <button
                      className="apply-now-btn"
                      onClick={() => {
                        applyJob(job["_id"], job["application_link"]);
                      }}
                    >
                      Apply Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <Footer />
          </>
        ) : (
          <>
            <div className="header-container">
              <Header />
            </div>
            <div
              style={{
                height: "calc(100vh - 120px)",
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
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
          </>
        )}
      </div>
    </div>
  );
}
