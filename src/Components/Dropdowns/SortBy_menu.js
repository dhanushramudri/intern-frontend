import { useEffect } from "react";
import "./dropdown.css";

export default function SortBy(props) {
  useEffect(() => {
    const dropdown = document.getElementById(`dropdown-${props.id}`);
    document.addEventListener("click", (event) => {
      if (
        !dropdown.contains(event.target) &&
        document.getElementById(`options-${props.id}`)
      ) {
        document.getElementById(`options-${props.id}`).classList.remove("open");
      }
    });
  }, [props]);
  function open() {
    setTimeout(() => {
      const dropdown = document.getElementById(`options-${props.id}`);
      dropdown.classList.add("open");
    }, 100);
  }

  return (
    <div>
      <div className="dropdown-sortby" id={`dropdown-${props.id}`}>
        <div className="dropdown-main" onClick={() => open()}>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <div className="dropdown-input-sortby" id={`input-${props.id}`}>
              {props.items.map((item, key) => {
                return (
                  <div className="sort-dropdown-item" key={key}>
                    <div style={{ marginRight: "5px" }}>{item}</div>
                  </div>
                );
              })}
            </div>
          </div>
          <div
            style={{ display: "flex", flexDirection: "row", padding: "10px" }}
          >
            <svg
              height="20"
              width="20"
              viewBox="0 0 20 20"
              aria-hidden="true"
              focusable="false"
              className="css-8mmkcg-sort"
            >
              <path d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path>
            </svg>
          </div>
        </div>
        <div className="options-container">
          <div className="options" id={`options-${props.id}`}>
            {props.options.map((option, idx) => {
              return (
                <div
                  key={idx}
                  className="option"
                  onClick={() => {
                    document
                      .getElementById(`options-${props.id}`)
                      .classList.remove("open");
                    props.changeSortByOption(`${option}`);
                  }}
                >
                  {option}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
