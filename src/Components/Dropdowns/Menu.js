import React, { useState, useEffect } from "react";
import { Context } from "../../App";
import Dropdown from "./Dropdown";
import "./dropdown.css";
import { useSearchParams } from "react-router-dom";

// Filter options - hard coded values.
import {
  mainLocationOptions,
  mainLocationTypeOptions,
  mainSalaryOptions,
  mainCategoryOptions,
} from "../filterProps/filterOptions";
import AdvancedSearch from "../AdvancedSearch/AdvancedSearch";

export default function Menu() {
  const [title, setTitle] = useState([]);
  const [Keywords, setKeywords] = useState([]);
  const [location, setLocation] = useState([]);
  const [type, setType] = useState([]);
  const [locationType, setLocationType] = useState([]);
  const [query, setQuery] = useSearchParams();

  useEffect(() => {
    if (query.get("jobTitle")) {
      setTitle(convertToKeywords(query.get("jobTitle").split(","), ""));
    }
    if (query.get("keywords")) {
      setKeywords(convertToKeywords(query.get("keywords").split(","), ""));
    }
    if (query.get("locations")) {
      setLocation(
        getOriginalArray(
          query.get("locations").split(","),
          mainLocationOptions
        ),
        mainLocationOptions
      );
    }
    if (query.get("locationType")) {
      setLocationType(
        getOriginalArray(
          query.get("locationType").split(","),
          mainLocationTypeOptions
        )
      );
    }
  }, [query]);

  // Options
  const [titleOptions, setTitleOptions] = useState(mainCategoryOptions);
  const [locationOptions, setLocationOptions] = useState(mainLocationOptions);
  const [locationTypeOptions, setLocationTypeOptions] = useState(
    mainLocationTypeOptions
  );
  const [salaryOptions, setSalaryOptions] = useState(mainSalaryOptions);

  // LocalStorage

  useEffect(() => {
    setLocationOptions(
      getOptions(
        mainLocationOptions,
        query.get("locations")
          ? getOriginalArray(
              query.get("locations").split(","),
              mainLocationOptions
            )
          : []
      )
    );
    setLocationTypeOptions(
      getOptions(
        mainLocationTypeOptions,
        query.get("locationType")
          ? getOriginalArray(
              query.get("locationType").split(","),
              mainLocationTypeOptions
            )
          : []
      )
    );
    setSalaryOptions(
      getOptions(
        mainSalaryOptions,
        query.get("salary") ? [...JSON.parse(query.get("salary"))] : []
      )
    );
  }, [query]);

  function convertToKeywords(array, emoji) {
    let newArray = [];
    for (let i = 0; i < array.length; i++) {
      newArray.push({ value: array[i], emoji: emoji });
    }
    return newArray;
  }

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

  return (
    <Context.Consumer>
      {([]) => {
        return (
          <div className="dropdown-container" id="dropdown-container">
            <div className="dropdowns">
              <Dropdown
                deleteItem={(key, idx) => {
                  let newArray = [...title];
                  newArray.splice(key, 1);
                  setTitle(newArray);
                  let values = retriveValue(newArray);
                  setQuery(
                    (prev) => {
                      prev.set("jobTitle", values);
                      prev.set("page", "1");
                      return prev;
                    },
                    { replace: true }
                  );
                  if (!values) {
                    setQuery(
                      (prev) => {
                        prev.delete("jobTitle");
                        prev.set("page", "1");
                        return prev;
                      },
                      { replace: true }
                    );
                  }
                  let newOptions = getOptions(mainCategoryOptions, newArray);
                  setTitleOptions(newOptions);
                }}
                onPush={(item, idx) => {
                  let newArray = [...title];
                  newArray.push(item);
                  setTitle(newArray);
                  let values = retriveValue(newArray);
                  setQuery(
                    (prev) => {
                      prev.set("jobTitle", values);
                      prev.set("page", "1");
                      return prev;
                    },
                    { replace: true }
                  );
                  let newOptions = getOptions(mainCategoryOptions, newArray);
                  setTitleOptions(newOptions);
                }}
                items={title}
                title="💼 Job Title..."
                id="job-title"
                options={[]}
              />

              <Dropdown
                options={[]}
                deleteItem={(key) => {
                  let newArray = [...Keywords];
                  newArray.splice(key, 1);
                  setKeywords(newArray);
                  let values = retriveValue(newArray);
                  setQuery(
                    (prev) => {
                      prev.set("keywords", values);
                      prev.set("page", "1");
                      return prev;
                    },
                    { replace: true }
                  );
                  if (!values) {
                    setQuery(
                      (prev) => {
                        prev.delete("keywords");
                        prev.set("page", "1");
                        return prev;
                      },
                      { replace: true }
                    );
                  }
                }}
                onPush={(item, idx) => {
                  let newArray = [...Keywords];
                  newArray.push(item);
                  setKeywords(newArray);
                  let values = retriveValue(newArray);
                  setQuery(
                    (prev) => {
                      prev.set("keywords", values);
                      prev.set("page", "1");
                      return prev;
                    },
                    { replace: true }
                  );
                }}
                items={Keywords}
                title="🔍 Keywords..."
                id="keywords"
              />

              <Dropdown
                options={locationTypeOptions}
                deleteItem={(key, idx) => {
                  let newArray = [...locationType];
                  let ele = newArray[key];
                  newArray.splice(key, 1);
                  setLocationType(newArray);
                  let values = retriveValue(newArray);
                  setQuery(
                    (prev) => {
                      prev.set("locationType", values);
                      prev.set("page", "1");
                      return prev;
                    },
                    { replace: true }
                  );
                  let newOptions = getOptions(
                    mainLocationTypeOptions,
                    newArray
                  );
                  setLocationTypeOptions(newOptions);
                }}
                onPush={(item, idx) => {
                  let newArray = [...locationType];
                  newArray.push(item);
                  setLocationType(newArray);
                  let values = retriveValue(newArray);
                  setQuery(
                    (prev) => {
                      prev.set("locationType", values);
                      prev.set("page", "1");
                      return prev;
                    },
                    { replace: true }
                  );
                  let newOptions = getOptions(
                    mainLocationTypeOptions,
                    newArray
                  );
                  setLocationTypeOptions(newOptions);
                }}
                filter={(val) => {
                  let options = getOptions(mainLocationTypeOptions, type);
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
                  setLocationTypeOptions(newArray);
                }}
                items={locationType}
                title="📍 Location Type"
                id="location-type"
              />

              <Dropdown
                options={locationOptions}
                deleteItem={(key, idx) => {
                  let newArray = [...location];
                  let ele = newArray[key][0];
                  newArray.splice(key, 1);
                  setLocation(newArray);
                  let values = retriveValue(newArray);
                  setQuery(
                    (prev) => {
                      prev.set("locations", values);
                      prev.set("page", "1");
                      return prev;
                    },
                    { replace: true }
                  );
                  if (!values) {
                    setQuery(
                      (prev) => {
                        prev.delete("locations");
                        prev.set("page", "1");
                        return prev;
                      },
                      { replace: true }
                    );
                  }
                  setLocationOptions(getOptions(mainLocationOptions, newArray));
                }}
                onPush={(item, idx) => {
                  let newArray = [...location];
                  newArray.push(item);
                  setLocation(newArray);
                  let values = retriveValue(newArray);
                  setQuery(
                    (prev) => {
                      prev.set("locations", values);
                      prev.set("page", "1");
                      return prev;
                    },
                    { replace: true }
                  );
                  let newOptions = getOptions(mainLocationOptions, newArray);
                  setLocationOptions(newOptions);
                }}
                setRadius={(val) => {
                  let newArray = [...location];
                  newArray[newArray.length - 1].radius = val;
                  setLocation(newArray);
                  let values = retriveValue(newArray);

                  setQuery(
                    (prev) => {
                      prev.set("locations", values);
                      prev.set("page", "1");
                      return prev;
                    },
                    { replace: true }
                  );
                }}
                filter={(val) => {
                  let options = getOptions(mainLocationOptions, location);
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
                  setLocationOptions(newArray);
                }}
                items={location}
                title="🌏 Location"
                id="location"
              />

              <AdvancedSearch />
            </div>
          </div>
        );
      }}
    </Context.Consumer>
  );
}
