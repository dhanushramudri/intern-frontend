import "./jobs.css";
import { useEffect, useState } from "react";
import SortBy from "../Dropdowns/SortBy_menu";
import JobItem from "./JobItem";
import { useParams, useSearchParams } from "react-router-dom";
import info from "./info.svg";
import slugify from "slugify";

export default function Jobs(props) {
  const [query, setQuery] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [n, setN] = useState();
  const [sortby, setSortBy] = useState(["🔥 Relevance & Date"]);
  const [sortByOptions, setSortByOptions] = useState([
    "🔥 Relevance & Date",
    "🆕 Date Added",
    "📈 Experience (Low to High)",
    "📉 Experience (High to Low)",
    "💵 Highest Salary",
  ]);
  const [compnayCount, setCompanyCount] = useState();

  useEffect(() => {
    if (!query.get("sort")) {
      setQuery((prev) => {
        prev.set("sort", "Relevance-and-Date");
        return prev;
      });
    } else {
      if (query.get("sort") === "Relevance-and-Date")
        setSortBy(["🔥 Relevance & Date"]);
      if (query.get("sort") === "Date-Added") setSortBy(["🆕 Date Added"]);
      if (query.get("sort") === "Experience-(Low-to-High)")
        setSortBy(["📈 Experience (Low to High)"]);
      if (query.get("sort") === "Experience-(High-to-Low)")
        setSortBy(["📉 Experience (High to Low)"]);
      if (query.get("sort") === "Highest-Salary")
        setSortBy(["💵 Highest Salary"]);
    }
    if (!query.get("page")) {
      setQuery((prev) => {
        prev.set("page", 1);
        return prev;
      });
    }
    setExternalQueries();
  }, []);

  const { country } = useParams();
  const { city } = useParams();
  const { category } = useParams();
  const { locationType } = useParams();

  async function setExternalQueries() {
    const existingLocations = query.get("locations")
      ? query.get("locations")
      : "";
    if (country && existingLocations.split(",").indexOf(country) === -1) {
      await setQuery((prev) => {
        prev.set(
          "locations",
          existingLocations ? existingLocations + "," + country : country
        );
        return prev;
      });
    }
    if (city) {
      await setQuery((prev) => {
        prev.set(
          "locations",
          existingLocations ? existingLocations + "," + city : city
        );
        return prev;
      });
    }
    if (category) {
      await setQuery((prev) => {
        prev.set("jobCategory", category);
        return prev;
      });
    }
    if (locationType) {
      await setQuery((prev) => {
        prev.set("locationType", locationType);
        return prev;
      });
    }
  }

  function setAlert(msg) {
    setMessage(msg);
    setTimeout(() => {
      setMessage("");
    }, 5000);
  }

  useEffect(() => {
    if (
      query.get("datePosted") ||
      query.get("experience") ||
      query.get("salary") ||
      query.get("jobCategory") ||
      query.get("visa") ||
      query.get("hide_seen_jobs") ||
      query.get("employmentType") ||
      query.get("industry") ||
      query.get("include_yoe") ||
      query.get("include_no_salary") ||
      query.get("currency")
    )
      toogleAdvancedSearchContainer();
  }, []);

  function delete_query_parameters() {
    setQuery((prev) => {
      prev.delete("datePosted");
      prev.delete("experience");
      prev.delete("salary");
      prev.delete("jobCategory");
      prev.delete("visa");
      prev.delete("hide_seen_jobs");
      prev.delete("employmentType");
      prev.delete("industry");
      prev.delete("include_yoe");
      prev.delete("include_no_salary");
      prev.delete("currency");
      return prev;
    });
  }

  function toogleAdvancedSearchContainer() {
    let dropdown = document.getElementById("advanced-dropdown-main");
    for (let i = 1; i <= 8; i++) {
      let ele = document.getElementById(`advanced_filter_${i}`);
      if (ele.style.opacity === "" || ele.style.opacity === "0") {
        dropdown.classList.add("dropdown-main-active");
        document
          .querySelectorAll("#advanced_search_down_arrow")
          .forEach((ele) => {
            ele.style.display = "block";
          });
        ele.style.opacity = "1";
        ele.style.height = "auto";
        ele.style.width = "fit-content";
        ele.style.visibility = "visible";
      } else {
        dropdown.classList.remove("dropdown-main-active");
        document
          .querySelectorAll("#advanced_search_down_arrow")
          .forEach((ele) => {
            ele.style.display = "none";
          });
        ele.style.opacity = "0";
        ele.style.height = "0";
        ele.style.width = "0";
        ele.style.visibility = "hidden";
        delete_query_parameters();
      }
    }
  }

  const [advancedFiltersCount, setAdvancedFiltersCount] = useState(0);

  useEffect(() => {
    function getFilters() {
      let count = 0;
      if (query.get("employmentType"))
        if (query.get("employmentType").split(",").length > 0) count++;
      if (query.get("include_yoe") || query.get("experience")) count++;
      if (
        query.get("include_no_salary") ||
        query.get("salary") ||
        query.get("currency")
      )
        count++;
      if (query.get("industry"))
        if (query.get("industry").split(",").length > 0) count++;
      if (query.get("jobCategory"))
        if (query.get("jobCategory").split(",").length > 0) count++;
      if (query.get("visa")) count++;
      if (query.get("hide_seen_jobs")) count++;
      if (query.get("datePosted")) count++;
      if (query.get("include_remote")) count++;
      setAdvancedFiltersCount(count);
    }
    getFilters();
  }, [query]);

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
      }}
    >
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
            id="animate_loading_jobs"
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
      <div className="jobs-container">
        <div className="job-options">
          <div className="job-options-2">
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div className="dropdown-sortby">
                <div
                  id="advanced-dropdown-main"
                  onClick={() => toogleAdvancedSearchContainer()}
                  className="dropdown-main dropdown-input-sortby"
                >
                  <div className="advanced-search-count">
                    {advancedFiltersCount}
                  </div>
                  <span className="sort-dropdown-item">⚡ Advanced Search</span>
                </div>
              </div>
              <div className="tooltip-container">
                <img
                  style={{
                    width: "24px",
                    height: "24px",
                    marginLeft: "20px",
                    cursor: "pointer",
                  }}
                  alt="info"
                  src={info}
                />
                <div className="tooltip">
                  <div className="tooltip-title">How Search Works</div>
                  <div>
                    You can search by Job Title, Requirements, and more. Results
                    are sorted by default in relevance and date. Click on
                    “Advanced Search” for more filters.
                  </div>
                  <div className="tooltip-title">Exact Keywords</div>
                  <div>
                    You can search for exact keywords by wrapping double quotes
                    ("") around keywords. Ex: "HRIS" (with double quotes) will
                    search for jobs with the exact phrase "HRIS".
                  </div>
                  <div className="tooltip-title">Exclude Keywords</div>
                  <div>
                    You can exclude keywords by adding a dash (-) before the
                    keyword. Ex: "Engineering Manager -Civil" will search for
                    any engineering manager jobs but exclude Civil Engineering
                    jobs.
                  </div>
                  <div className="tooltip-title">Advanced Example</div>
                  <div>
                    Suppose you're looking for a Software Engineering job and
                    are only interested in jobs that use React, but not React
                    Native. Simply type: Software Engineer in title filter, and
                    "React" -Native in the keywords filter.{" "}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="job-options-1">
            {loading ? (
              "loading..."
            ) : (
              <span>
                <span className="unsuckify">{`${n.toLocaleString(
                  "en-US"
                )}`}</span>{" "}
                Jobs found at{" "}
                <span className="company-count">
                  {compnayCount < 1000
                    ? `${compnayCount.toLocaleString("en-US")}`
                    : n < 4500
                    ? `1K+`
                    : `${Math.floor(n / 4500)}K+`}
                </span>{" "}
                companies
              </span>
            )}
          </div>
          <div className="job-options-2">
            <div className="sortby-dropdown">
              <SortBy
                changeSortByOption={(val) => {
                  setQuery(
                    (prev) => {
                      prev.set("sort", slugify(val));
                      return prev;
                    },
                    { replace: true }
                  );
                  setSortBy([val]);
                }}
                items={sortby}
                options={sortByOptions}
                id="sort-by"
              />
            </div>
          </div>
        </div>
        <JobItem
          setMessage={(msg) => {
            setAlert(msg);
          }}
          setCompanyCount={(count) => setCompanyCount(count)}
          sort={sortby}
          setNoOfJobs={(n) => setN(n)}
          setLoadingState={(state) => setLoading(state)}
        />
      </div>
    </div>
  );
}
