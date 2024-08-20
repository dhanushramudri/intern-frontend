import React, { useEffect } from "react";
import styles from "./styles.module.css";
import { useSearchParams } from "react-router-dom";
import { currencies } from "../filterProps/filterOptions";

export default function AdvancedSearchDropdowns(props) {
  const [query, setQuery] = useSearchParams();
  function open() {
    if (props.id === "apply") return;
    if (props.id === "hide_seen_jobs" || props.id === "visa_sponsored") return;
    if (props.id === "hide_seen_jobs-1" || props.id === "visa_sponsored-1")
      return;
    setTimeout(() => {
      const dropdown = document.getElementById(`options-${props.id}`);
      dropdown.classList.add("open");
    }, 100);
  }

  useEffect(() => {
    if (props.id === "experience" || props.id === "experience-1") {
      if (query.get("experience") || query.get("include_yoe") === "true") {
        document
          .getElementById(`indicator-${props.id}`)
          .classList.add(styles.advanced_search_filter_indicator_active);
      } else {
        document
          .getElementById(`indicator-${props.id}`)
          .classList.remove(styles.advanced_search_filter_indicator_active);
      }
    }
    if (props.id === "date_posted" || props.id === "date_posted-1") {
      if (query.get("datePosted")) {
        document
          .getElementById(`indicator-${props.id}`)
          .classList.add(styles.advanced_search_filter_indicator_active);
      } else {
        document
          .getElementById(`indicator-${props.id}`)
          .classList.remove(styles.advanced_search_filter_indicator_active);
      }
    }
    if (props.id === "salary" || props.id === "salary-1") {
      if (
        query.get("salary") ||
        query.get("include_no_salary") === "true" ||
        query.get("currency")
      ) {
        document
          .getElementById(`indicator-${props.id}`)
          .classList.add(styles.advanced_search_filter_indicator_active);
      } else {
        document
          .getElementById(`indicator-${props.id}`)
          .classList.remove(styles.advanced_search_filter_indicator_active);
      }
    }
  }, [query]);

  useEffect(() => {
    const dropdown = document.getElementById(`dropdown-${props.id}`);
    document.addEventListener("click", (event) => {
      if (document.getElementById(`options-${props.id}`)) {
        if (
          !document.getElementById(`options-${props.id}`).contains(event.target)
        ) {
          document
            .getElementById(`options-${props.id}`)
            .classList.remove("open");
        }
      }
    });
  });

  return (
    <div className="dropdown" id={`dropdown-${props.id}`}>
      <div className="dropdown-main" onClick={() => open()}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            width: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              padding: "10px",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            {props.id !== "hide_seen_jobs" &&
              props.id !== "visa_sponsored" &&
              props.id !== "hide_seen_jobs-1" &&
              props.id !== "visa_sponsored-1" && (
                <div
                  id={`indicator-${props.id}`}
                  className={styles.advanced_search_filter_indicator}
                ></div>
              )}
            <div className={styles.option_main} id={`option-main-${props.id}`}>
              {props.title}{" "}
              <span style={{ marginLeft: "20px" }}>{props.button}</span>
            </div>
            {props.button ? (
              ""
            ) : (
              <div id="advanced_search_down_arrow">
                <svg
                  height="20"
                  width="20"
                  viewBox="0 0 20 20"
                  aria-hidden="true"
                  focusable="false"
                  className="css-8mmkcg"
                >
                  <path d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path>
                </svg>
              </div>
            )}
          </div>
        </div>
      </div>
      <div
        className={`currency-options curr-options-container ${styles.advanced_search_dropdown_options}`}
        id={`options-${props.id}`}
      >
        <div style={{ width: "100%" }}>{props.children}</div>
        {(props.id === "salary" || props.id === "salary-1") && (
          <div
            id="currency-options-container"
            className={styles.currency_options_container}
          >
            {Object.keys(currencies).map((key, idx) => {
              return (
                <div
                  key={idx}
                  className="option"
                  onClick={() => props.onCurrencyChange(key)}
                >
                  {currencies[key].emoji} {currencies[key].name}{" "}
                  {`(${currencies[key].symbol})`}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
