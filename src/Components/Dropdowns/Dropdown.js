import React, { useEffect, useRef, useState } from "react";
import "./dropdown.css";
import { FormControlLabel } from "@mui/material";
import { IOSSwitch } from "../AdvancedSearch/IOSSwitch";
import { useSearchParams } from "react-router-dom";
import { us_cities } from "../filterProps/filterOptions";

export default function Dropdown(props) {
  const [query, setQuery] = useSearchParams({});
  const [radius, setRadius] = useState([50]);
  const [industryOption, setIndustryOption] = useState("");

  const inputRef = useRef();
  useEffect(() => {
    if (
      props.items.length === 0 &&
      document.activeElement !==
        document.getElementById(`input-box-${props.id}`)
    ) {
      document.getElementById(`option-main-${props.id}`).style.display =
        "block";
      document.getElementById(`input-${props.id}`).style.display = "none";
    } else {
      document.getElementById(`option-main-${props.id}`).style.display = "none";
      document.getElementById(`input-${props.id}`).style.display = "flex";
    }
  }, [props]);

  document.addEventListener("click", (event) => {
    if (
      document.getElementById(`input-${props.id}`)?.childElementCount === 1 &&
      !document.getElementById(`input-box-${props.id}`).focus()
    ) {
      document.getElementById(`option-main-${props.id}`).style.display =
        "block";
      document.getElementById(`input-${props.id}`).style.display = "none";
    }
    if (
      document.getElementById(`${props.id}-options-container`) &&
      !document
        .getElementById(`${props.id}-options-container`)
        .contains(event.target)
    ) {
      setIndustryOption("");
      document.getElementById(`options-${props.id}`).classList.remove("open");
    }
  });

  function open() {
    setTimeout(() => {
      // document.getElementById("radius-option").style.display = "none";
      document.getElementById(`option-main-${props.id}`).style.display = "none";
      const dropdown = document.getElementById(`options-${props.id}`);
      dropdown.classList.add("open");
      document.getElementById(`input-${props.id}`).style.display = "flex";
      document.getElementById(`input-${props.id}`).classList.add("open-main");
      document.getElementById(`input-box-${props.id}`).focus();
    }, 10);
  }

  const [keyword, setKeyword] = useState("");
  const [jobTitle, setJobTitle] = useState("");

  function filter() {
    if (props.id === "keywords" || props.id === "keywords-1") {
      setKeyword(inputRef.current.value);
    } else if (props.id === "job-title" || props.id === "job-title-1") {
      setJobTitle(inputRef.current.value);
    } else {
      setTimeout(() => {
        props.filter(inputRef.current.value);
      }, 50);
    }
  }

  let cities = us_cities;

  function push(val, idx) {
    if (props.id === "industry" || props.id === "industry-1") {
      props.onPush(val, idx, industryOption.value);
      return;
    }
    if (props.id === "location") {
      if (cities.includes(val.value)) {
        setRadius([50]);
        setTimeout(() => {
          document
            .getElementById(`options-${props.id}`)
            .classList.remove("open");
          // document.getElementById("radius-option").style.display = "block";
        }, 100);
      }
    } else if (
      props.id === "job-title" ||
      props.id === "job-title-1" ||
      props.id === "keywords" ||
      props.id === "keywords-1"
    ) {
      if (!inputRef.current.value) return;
      if (props.id === "job-title" || props.id === "job-title-1")
        setJobTitle("");
      else if (props.id === "keywords" || props.id === "keywords-1")
        setKeyword("");
    }
    props.onPush(val, idx);
    inputRef.current.value = "";
  }

  function pushKeyword(e) {
    if (
      (props.id === "keywords" || props.id === "keywords-1") &&
      e.key === "Enter"
    ) {
      if (inputRef.current.value) {
        props.onPush({ value: inputRef.current.value, emoji: "🔍" }, 0);
        inputRef.current.value = "";
        setKeyword("");
      }
    } else if (
      (props.id === "job-title" || props.id === "job-title-1") &&
      e.key === "Enter"
    ) {
      if (inputRef.current.value) {
        props.onPush({ value: inputRef.current.value, emoji: "🔍" }, 0);
        inputRef.current.value = "";
        setJobTitle("");
      }
    }
  }

  function openSubOptions(option) {
    setIndustryOption((prev) => (option === prev ? "" : option));
  }

  function closeSubOptions(e) {
    setIndustryOption("");
  }

  return (
    <div className="dropdown" id={`dropdown-${props.id}`}>
      <div className="dropdown-main" onClick={() => open()}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              position: "relative",
              display: "flex",
              flexDirection: "row",
              width: "100%",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div className="dropdown-input" id={`input-${props.id}`}>
              {props.items.map((item, key) => {
                if (
                  props.id === "location" ||
                  props.id === "location-1" ||
                  props.id === "location-2"
                ) {
                  return (
                    <div className="dropdown-item" key={key}>
                      <div style={{ marginRight: "5px" }}>
                        <span>{item.emoji} </span>
                        {item.value}{" "}
                        <span>
                          {item.radius && <span>{item.radius} Mi</span>}
                        </span>
                      </div>
                      <div
                        onClick={() => props.deleteItem(key, item.value)}
                        className="close-btn"
                      >
                        &times;
                      </div>
                    </div>
                  );
                } else {
                  return (
                    <div className="dropdown-item" key={key}>
                      <div style={{ marginRight: "5px" }}>
                        {item.emoji} {item.value}
                      </div>
                      <div
                        onClick={() => props.deleteItem(key, item.value)}
                        className="close-btn"
                      >
                        &times;
                      </div>
                    </div>
                  );
                }
              })}
              <input
                onKeyDown={(e) => pushKeyword(e)}
                placeholder="Type..."
                id={`input-box-${props.id}`}
                ref={inputRef}
                onChange={() => filter()}
              />
            </div>
            <div style={{ padding: "10px" }} id={`option-main-${props.id}`}>
              {props.title}
            </div>
            <div style={{ float: "right", marginRight: "10px" }}>
              {props.id === "job-title" ||
              props.id === "job-title-1" ||
              props.id === "keywords" ||
              props.id === "keywords-1" ||
              props.id === "location" ||
              props.id === "location-1" ? (
                ""
              ) : (
                <>
                  {props.id === "industry" ||
                  props.id === "employment-type" ||
                  props.id === "job-category" ? (
                    <svg
                      id="advanced_search_down_arrow"
                      height="20"
                      width="20"
                      viewBox="0 0 20 20"
                      aria-hidden="true"
                      focusable="false"
                      className="css-8mmkcg"
                    >
                      <path d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path>
                    </svg>
                  ) : (
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
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* raius */}
      {/* {props.id === "location" ? (
        <div id="radius-option" className="radius-options">
          <div style={{ marginBottom: "10px", fontSize: "16px" }}>
            Maximum Radius{" "}
            <strong className={styles.strong_detail} style={{ float: "right" }}>
              {radius[0]} mi
            </strong>
          </div>
          <Slider
            sx={customSingleSliderStyles}
            min={0}
            max={280}
            value={radius[0]}
            valueLabelDisplay="auto"
            onChange={handleRaiusChange}
          />
        </div>
      ) : (
        <></>
      )} */}
      <div className="options-container" id={`${props.id}-options-container`}>
        {(props.id === "industry" || props.id === "industry-1") &&
        industryOption ? (
          <div
            className="sub-options-1"
            onMouseLeave={() => closeSubOptions()}
            id={`${props.id}-sub-options`}
          >
            {props.industrySubOptions[industryOption.value].map(
              (option, idx) => {
                return (
                  <div
                    onClick={() => push(option, idx)}
                    key={idx}
                    className="option"
                  >
                    <span className="country-code">{option.emoji}</span>
                    {option.value} {option.selectAll ? "(Select All)" : ""}
                  </div>
                );
              }
            )}
          </div>
        ) : (
          <></>
        )}
        <div className="options" id={`options-${props.id}`}>
          {props.id === "keywords" ||
          props.id === "keywords-1" ||
          props.id === "hidekeywords" ||
          props.id === "hidekeywords-1" ? (
            <div
              className="option"
              onClick={() =>
                push({ value: inputRef.current.value, emoji: "🔍" }, 0)
              }
            >
              {keyword ? `${keyword}` : "Search..."}
            </div>
          ) : (
            ""
          )}
          {props.id === "job-title" || props.id === "job-title-1" ? (
            <div
              className="option"
              onClick={() =>
                push({ value: inputRef.current.value, emoji: "🔍" }, -1)
              }
            >
              🔍 {jobTitle ? `${jobTitle}` : "Search..."}
            </div>
          ) : (
            <>
              {props.id === "location" || props.id === "location-1" ? (
                <div className="checkbox-option">
                  Include Remote
                  <div style={{ float: "right" }}>
                    <FormControlLabel
                      value={true}
                      onChange={(e) => {
                        setQuery(
                          (prev) => {
                            prev.set(
                              "include_remote",
                              JSON.stringify(e.target.checked)
                            );
                            prev.set("page", "1");
                            return prev;
                          },
                          { replace: true }
                        );
                      }}
                      control={
                        <IOSSwitch
                          sx={{ m: 1 }}
                          defaultChecked={JSON.parse(
                            query.get("include_remote")
                          )}
                        />
                      }
                    />
                  </div>
                </div>
              ) : (
                <></>
              )}
              {props.options.map((option, idx) => {
                if (props.id === "location" || props.id === "location-1") {
                  return (
                    <div
                      key={idx}
                      className="option"
                      onClick={() => push(option, idx)}
                    >
                      <span className="country-code">{option.emoji}</span>
                      {option.value}
                    </div>
                  );
                } else if (
                  props.id === "industry" ||
                  props.id === "industry-1"
                ) {
                  return (
                    <div
                      key={idx}
                      onMouseOver={() => openSubOptions(option)}
                      className="option-industry"
                    >
                      {option.emoji} {option.value}
                      {(props.id === "industry" || props.id === "industry-1") &&
                      option.value === industryOption.value &&
                      industryOption ? (
                        <div
                          className="sub-options"
                          id={`${props.id}-sub-options`}
                        >
                          {props.industrySubOptions[industryOption.value].map(
                            (option, idx) => {
                              return (
                                <div
                                  onClick={() => push(option, idx)}
                                  key={idx}
                                  className="option"
                                >
                                  <span className="country-code">
                                    {option.emoji}
                                  </span>
                                  {option.value}{" "}
                                  {option.selectAll ? "(Select All)" : ""}
                                </div>
                              );
                            }
                          )}
                        </div>
                      ) : (
                        <></>
                      )}
                    </div>
                  );
                } else {
                  return (
                    <div
                      key={idx}
                      className="option"
                      onClick={() => push(option, idx)}
                    >
                      {option.emoji} {option.value}
                    </div>
                  );
                }
              })}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
