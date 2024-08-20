import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { useSearchParams } from "react-router-dom";
import FormControlLabel from "@mui/material/FormControlLabel";
import { IOSSwitch } from "./IOSSwitch";
import AdvancedSearchDropdowns from "./AdvancedSearchDropdowns";
import {
  mainCategoryOptions,
  mainTypeOptions,
  mainIndustryOptions,
} from "../filterProps/filterOptions";
import Dropdown from "../Dropdowns/Dropdown";
import { industry_sub_options } from "../filterProps/filterOptions";
import arrow from "./right_arrow.svg";
import { currencies } from "../filterProps/filterOptions";

function valuetext(value) {
  return `${value}°C`;
}

export default function AdvancedSearch(props) {
  const [query, setQeury] = useSearchParams();
  const [type, setType] = useState([]);
  const [category, setCategory] = useState([]);
  const [industry, setIndustry] = useState([]);
  const [currency, setCurrency] = useState("Any");

  useEffect(() => {
    if (query.get("industry")) {
      setIndustry(
        getOrigialsubArray(
          query.get("industry").split(","),
          industry_sub_options
        ),
        industry_sub_options
      );
    }
    if (query.get("jobCategory")) {
      setCategory(
        getOriginalArray(
          query.get("jobCategory").split(","),
          mainCategoryOptions
        ),
        mainCategoryOptions
      );
    }
    if (query.get("employmentType")) {
      setType(
        getOriginalArray(
          query.get("employmentType").split(","),
          mainTypeOptions
        ),
        mainTypeOptions
      );
    }
    if (query.get("currency")) {
      setCurrency(query.get("currency"));
    } else {
      setCurrency("Any");
    }
    if (query.get("include_yoe") === "false") {
      setQeury((prev) => {
        prev.delete("include_yoe");
        return prev;
      });
    }
    if (query.get("include_no_salary") === "false") {
      setQeury((prev) => {
        prev.delete("include_no_salary");
        return prev;
      });
    }
    if (query.get("include_remote") === "false") {
      setQeury((prev) => {
        prev.delete("include_remote");
        return prev;
      });
    }
    if (query.get("experience")) {
      setExperience(JSON.parse(query.get("experience")));
    } else {
      setExperience([2, 5]);
    }
    if (query.get("salary")) {
      setSalary(JSON.parse(query.get("salary")));
    } else {
      setSalary([80, 1200]);
    }
    if (query.get("datePosted")) {
      setDatePosted([JSON.parse(query.get("datePosted"))]);
    } else {
      setDatePosted([7]);
    }
  }, [query]);

  const [typeOptions, setTypeOptions] = useState(mainTypeOptions);
  const [categoryOptions, setCategoryOptions] = useState(mainCategoryOptions);
  const [industryOptions, setIndustryOptions] = useState(mainIndustryOptions);
  const [industrySubOptions, setIndustrySubOptions] =
    useState(industry_sub_options);

  useEffect(() => {
    setIndustrySubOptions(
      getSubOptions(
        industry_sub_options,
        query.get("industry")
          ? getOrigialsubArray(
              query.get("industry").split(","),
              industry_sub_options
            )
          : []
      )
    );
    setCategoryOptions(
      getOptions(
        mainCategoryOptions,
        query.get("jobCategory")
          ? getOriginalArray(
              query.get("jobCategory").split(","),
              mainCategoryOptions
            )
          : []
      )
    );
    setTypeOptions(
      getOptions(
        mainTypeOptions,
        query.get("employmentType")
          ? getOriginalArray(
              query.get("employmentType").split(","),
              mainTypeOptions
            )
          : []
      )
    );
  }, [query]);

  function getOptions(options, list) {
    let items = [...list];
    let newOptions = [...options];
    for (let i = 0; i < items.length; i++) {
      let index = newOptions.findIndex(
        (option) => option.value === items[i].value
      );

      if (index !== -1) {
        newOptions.splice(index, 1);
      }
    }
    return newOptions;
  }

  const experienceCustomSliderStyles = {
    "& .MuiSlider-thumb": {
      color: "black",
    },
    "& .MuiSlider-track": {
      color: "hsl(38, 89%, 62%)",
      height: "8px",
    },
    "& .MuiSlider-rail": {
      color: "hsl(214, 51%, 78%)",
      height: "8px",
    },
  };

  const salaryCustomSliderStyles = {
    "& .MuiSlider-thumb": {
      color: "black",
    },
    "& .MuiSlider-track": {
      color: "hsl(38, 89%, 62%)",
      height: "8px",
    },
    "& .MuiSlider-rail": {
      color: "hsl(214, 51%, 78%)",
      height: "8px",
    },
  };

  const customSingleSliderStyles = {
    "& .MuiSlider-thumb": {
      color: "black",
    },
    "& .MuiSlider-track": {
      color: "#0077b6",
      opacity: "1",
      height: "8px",
    },
    "& .MuiSlider-rail": {
      color: "#acc4e4",
      height: "8px",
    },
  };

  const [experience, setExperience] = React.useState([2, 5]);
  const [salary, setSalary] = React.useState([80, 1200]);

  const [datePosted, setDatePosted] = useState([7]);
  const [yoe, setYoe] = useState(false);

  const handleExperienceChange = (event, newValue) => {
    setExperience(newValue);
    setTimeout(() => {
      setQeury(
        (prev) => {
          prev.set("experience", JSON.stringify(newValue));
          return prev;
        },
        { replace: true }
      );
    }, 500);
  };

  const handleSalaryChange = (event, newValue) => {
    setSalary(newValue);
    setTimeout(() => {
      setQeury(
        (prev) => {
          prev.set("salary", JSON.stringify(newValue));
          return prev;
        },
        { replace: true }
      );
    }, 500);
  };

  const handleDatePostedChange = (event, newValue) => {
    setDatePosted([newValue]);
    setTimeout(() => {
      setQeury(
        (prev) => {
          prev.set("datePosted", JSON.stringify(newValue));
          return prev;
        },
        { replace: true }
      );
    }, 500);
  };

  function getOptions(options, list) {
    let items = [...list];
    let newOptions = [...options];
    for (let i = 0; i < items.length; i++) {
      for (let j = 0; j < newOptions.length; j++) {
        if (
          items[i].emoji === newOptions[j].emoji &&
          items[i].value === newOptions[j].value
        ) {
          newOptions.splice(j, 1);
          break;
        }
      }
    }
    return newOptions;
  }

  function retriveValue(array) {
    let values = [];
    for (let i = 0; i < array.length; i++) {
      if (array[i].radius) {
        values.push(`${array[i].value}*${array[i].radius}`);
        continue;
      }
      values.push(array[i].value);
    }
    return values.join(",");
  }

  function getOriginalArray(array, options) {
    let newArray = [];
    for (let i = 0; i < array.length; i++) {
      let index = options.findIndex((option) => option.value === array[i]);
      if (index !== -1) {
        newArray.push(options[index]);
      } else {
        let [value, radius] = array[i].split("*");
        let index = options.findIndex((option) => option.value === value);
        if (index !== -1) {
          newArray.push({ ...options[index], radius: radius });
        }
      }
    }
    return newArray;
  }

  function getOrigialsubArray(array, options) {
    let newArray = [];
    for (let i = 0; i < array.length; i++) {
      for (let key in options) {
        for (let k = 0; k < options[key].length; k++) {
          if (options[key][k].value === array[i]) {
            newArray.push(options[key][k]);
          }
        }
      }
    }
    return newArray;
  }

  function getSubOptions(options, list) {
    let subOptions = JSON.parse(JSON.stringify(options));
    for (let i = 0; i < list.length; i++) {
      for (let key in subOptions) {
        for (let k = 0; k < subOptions[key].length; k++) {
          if (subOptions[key][k].value === list[i].value) {
            subOptions[key].splice(k, 1);
            break;
          }
        }
      }
    }
    return subOptions;
  }

  return (
    <React.Fragment>
      <div id="advanced_filter_1" className={styles.advanced_search_container}>
        <AdvancedSearchDropdowns
          button=""
          id="experience"
          title="💪 Experience"
        >
          <Box>
            <div style={{ marginBottom: "10px", fontSize: "16px" }}>
              Filter Experience{" "}
              <strong
                className={styles.strong_detail}
                style={{ float: "right" }}
              >
                {experience[0]} - {experience[1]} Years
              </strong>
            </div>
            <Slider
              sx={experienceCustomSliderStyles}
              getAriaLabel={() => "Temperature range"}
              value={experience}
              max={10}
              min={0}
              onChange={handleExperienceChange}
              valueLabelDisplay="auto"
              getAriaValueText={valuetext}
            />

            <div className={styles.advanced_search_button}>
              Include No YOE info
              <div style={{ float: "right" }}>
                <FormControlLabel
                  onChange={(e) => {
                    setQeury((prev) => {
                      prev.set("include_yoe", JSON.stringify(e.target.checked));
                      return prev;
                    });
                    setYoe((prev) => !prev);
                  }}
                  control={
                    <IOSSwitch
                      sx={{ m: 1 }}
                      defaultChecked={JSON.parse(query.get("include_yoe"))}
                    />
                  }
                />
              </div>
            </div>
          </Box>
        </AdvancedSearchDropdowns>
      </div>

      <div id="advanced_filter_2" className={styles.advanced_search_container}>
        <AdvancedSearchDropdowns
          button=""
          title="🕧 Date Posted"
          id="date_posted"
        >
          {/* <Box> */}
          <div style={{ marginBottom: "10px", fontSize: "16px" }}>
            Date Posted{" "}
            <strong className={styles.strong_detail} style={{ float: "right" }}>
              {datePosted[0] === 0
                ? "Today"
                : datePosted[0] === 1
                ? datePosted[0] + " day ago"
                : datePosted[0] + " days ago"}
            </strong>
          </div>
          <Slider
            sx={customSingleSliderStyles}
            min={0}
            max={90}
            value={datePosted[0]}
            valueLabelDisplay="auto"
            onChange={handleDatePostedChange}
          />
        </AdvancedSearchDropdowns>
      </div>

      <div
        id="advanced_filter_3"
        onMouseLeave={() =>
          (document.getElementById("currency-options-container").style.display =
            "none")
        }
        className={styles.advanced_search_container}
      >
        <AdvancedSearchDropdowns
          onCurrencyChange={(val) => {
            setCurrency(val);
            setQeury(
              (prev) => {
                // handleSalaryChange(salary);
                prev.set("salary", JSON.stringify(salary));
                prev.set("currency", val);
                return prev;
              },
              { replace: true }
            );
          }}
          button=""
          title=" 💵 Salary Range"
          id="salary"
        >
          <Box>
            <div style={{ marginBottom: "10px", fontSize: "16px" }}>
              Salary{" "}
              <strong
                className={styles.strong_detail}
                style={{ float: "right" }}
              >
                {salary[0] === 0 && salary[1] === 1200 ? (
                  <>All - All {currency}</>
                ) : (
                  <>
                    {salary[0] >= 1000
                      ? `1.${Math.floor(salary[0] / 10)}M `
                      : `${salary[0]}K `}
                    -{" "}
                    {salary[1] >= 1000
                      ? `${(salary[1] * 1000) / 1000000}M `
                      : `${salary[1]}K `}
                    {currency}
                  </>
                )}
              </strong>
            </div>
            <Slider
              sx={salaryCustomSliderStyles}
              getAriaLabel={() => "Temperature range"}
              value={salary}
              min={0}
              max={1200}
              step={10}
              onChange={handleSalaryChange}
              valueLabelDisplay="auto"
              getAriaValueText={valuetext}
            />
          </Box>
          <div className={styles.advanced_search_button}>
            Include No Salary Info
            <div style={{ float: "right" }}>
              <FormControlLabel
                onChange={(e) => {
                  setQeury((prev) => {
                    prev.set(
                      "include_no_salary",
                      JSON.stringify(e.target.checked)
                    );
                    return prev;
                  });
                  setYoe((prev) => !prev);
                }}
                control={
                  <IOSSwitch
                    sx={{ m: 1 }}
                    defaultChecked={JSON.parse(query.get("include_no_salary"))}
                  />
                }
              />
            </div>
          </div>
          <div
            onMouseOver={() =>
              (document.getElementById(
                "currency-options-container"
              ).style.display = "block")
            }
            className={styles.advanced_search_button_2}
          >
            Currency
            <div
              style={{
                float: "right",
                marginRight: "15px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span style={{ marginRight: "15px" }}>
                {currencies[currency].emoji} {currency}
              </span>{" "}
              <img src={arrow} />
            </div>
          </div>
        </AdvancedSearchDropdowns>
      </div>

      <div id="advanced_filter_8" className={styles.advanced_search_container}>
        <Dropdown
          deleteItem={(key, idx) => {
            let newArray = [...category];
            newArray.splice(key, 1);
            setCategory(newArray);
            let values = retriveValue(newArray);
            setQeury(
              (prev) => {
                prev.set("jobCategory", values);
                prev.set("page", "1");
                return prev;
              },
              { replace: true }
            );
            if (!values) {
              setQeury(
                (prev) => {
                  prev.delete("jobCategory");
                  prev.set("page", "1");
                  return prev;
                },
                { replace: true }
              );
            }
            let newOptions = getOptions(mainCategoryOptions, newArray);
            setCategoryOptions(newOptions);
          }}
          onPush={(item, idx) => {
            let newArray = [...category];
            newArray.push(item);
            setCategory(newArray);
            let values = retriveValue(newArray);
            setQeury(
              (prev) => {
                prev.set("jobCategory", values);
                prev.set("page", "1");
                return prev;
              },
              { replace: true }
            );
            let newOptions = getOptions(mainCategoryOptions, newArray);
            setCategoryOptions(newOptions);
          }}
          filter={(val) => {
            let newArray = [];
            let options = getOptions(mainCategoryOptions, category);
            for (let i = 0; i < options.length; i++) {
              if (
                options[i].value
                  .toLocaleLowerCase()
                  .includes(val.toLocaleLowerCase())
              ) {
                newArray.push(options[i]);
              }
            }
            setCategoryOptions(newArray);
          }}
          items={category}
          title="🛠 Job Category"
          id="job-category"
          options={categoryOptions}
        />
      </div>

      <div id="advanced_filter_6" className={styles.advanced_search_container}>
        <Dropdown
          options={typeOptions}
          deleteItem={(key, idx) => {
            let newArray = [...type];
            newArray.splice(key, 1);
            setType(newArray);
            let values = retriveValue(newArray);
            setQeury(
              (prev) => {
                prev.set("employmentType", values);
                prev.set("page", "1");
                return prev;
              },
              { replace: true }
            );
            if (!values) {
              setQeury(
                (prev) => {
                  prev.delete("employmentType");
                  prev.set("page", "1");
                  return prev;
                },
                { replace: true }
              );
            }
            let newOptions = getOptions(mainTypeOptions, newArray);
            setTypeOptions(newOptions);
          }}
          onPush={(item, idx) => {
            let newArray = [...type];
            newArray.push(item);
            setType(newArray);
            let values = retriveValue(newArray);
            setQeury(
              (prev) => {
                prev.set("employmentType", values);
                prev.set("page", "1");
                return prev;
              },
              { replace: true }
            );
            let newOptions = getOptions(mainTypeOptions, newArray);
            setTypeOptions(newOptions);
          }}
          filter={(val) => {
            let options = getOptions(mainTypeOptions, type);
            let newArray = [];
            for (let i = 0; i < options.length; i++) {
              if (
                options[i].value
                  .toLocaleLowerCase()
                  .includes(val.toLocaleLowerCase())
              ) {
                newArray.push(options[i]);
              }
            }
            setTypeOptions(newArray);
          }}
          items={type}
          title="📝 Employment Type"
          id="employment-type"
        />
      </div>

      <div id="advanced_filter_7" className={styles.advanced_search_container}>
        <Dropdown
          deleteItem={(key, idx) => {
            let newArray = [...industry];
            newArray.splice(key, 1);
            setIndustry(newArray);
            let values = retriveValue(newArray);
            setQeury(
              (prev) => {
                prev.set("industry", values);
                prev.set("page", "1");
                return prev;
              },
              { replace: true }
            );
            if (!values) {
              setQeury(
                (prev) => {
                  prev.delete("industry");
                  prev.set("page", "1");
                  return prev;
                },
                { replace: true }
              );
            }
            let newOptions = getSubOptions(industry_sub_options, newArray);
            setIndustrySubOptions(newOptions);
          }}
          onPush={(item, idx) => {
            let newArray = [...industry];
            newArray.push(item);
            setIndustry(newArray);
            let values = retriveValue(newArray);
            setQeury(
              (prev) => {
                prev.set("industry", values);
                prev.set("page", "1");
                return prev;
              },
              { replace: true }
            );
            let newOptions = getSubOptions(industry_sub_options, newArray);
            setIndustrySubOptions(newOptions);
          }}
          filter={(val) => {
            let newArray = [];
            let options = getOptions(mainIndustryOptions, industry);
            for (let i = 0; i < options.length; i++) {
              if (
                options[i].value
                  .toLocaleLowerCase()
                  .includes(val.toLocaleLowerCase())
              ) {
                newArray.push(options[i]);
              }
            }
            setIndustryOptions(newArray);
          }}
          industrySubOptions={industrySubOptions}
          items={industry}
          title="🏦  Industry"
          id="industry"
          options={industryOptions}
        />
      </div>

      <div id="advanced_filter_4" className={styles.advanced_search_container}>
        <AdvancedSearchDropdowns
          title="🪪 Visa sponsored"
          button={
            <div>
              <FormControlLabel
                onChange={(e) => {
                  setQeury((prev) => {
                    prev.set("visa", JSON.stringify(e.target.checked));
                    return prev;
                  });
                  setYoe((prev) => !prev);
                }}
                control={
                  <IOSSwitch
                    sx={{ m: 1 }}
                    defaultChecked={JSON.parse(query.get("visa"))}
                  />
                }
              />
            </div>
          }
          id="visa_sponsored"
        ></AdvancedSearchDropdowns>
      </div>

      <div id="advanced_filter_5" className={styles.advanced_search_container}>
        <AdvancedSearchDropdowns
          title="🚫 Hide Applied Jobs"
          button={
            <div>
              <FormControlLabel
                onChange={(e) => {
                  setQeury((prev) => {
                    prev.set("hide_seen_jobs", e.target.checked);
                    return prev;
                  });
                  setYoe((prev) => !prev);
                }}
                control={
                  <IOSSwitch
                    sx={{ m: 1 }}
                    defaultChecked={JSON.parse(query.get("hide_seen_jobs"))}
                  />
                }
              />
            </div>
          }
          id="hide_seen_jobs"
        ></AdvancedSearchDropdowns>
      </div>
    </React.Fragment>
  );
}
