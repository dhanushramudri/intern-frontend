import React, { useState } from "react";
import left_arrow from "./left_arrow.svg";
import right_arrow from "./right_arrow.svg";

export default function CurrencyCarousel(props) {
  const [currencies, setCurrencies] = useState(["USD", "EUR", "GBP"]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentCurrency, setCurrentCurrency] = useState(currencies[0]);

  function moveLeft() {
    if (currentIndex === 0) {
      setCurrentIndex(currencies.length - 1);
      setCurrentCurrency(currencies[currencies.length - 1]);
      props.setCurrency(currencies[currencies.length - 1]);
    } else {
      setCurrentIndex(currentIndex - 1);
      setCurrentCurrency(currencies[currentIndex - 1]);
      props.setCurrency(currencies[currentIndex - 1]);
    }
  }
  function moveRight() {
    setCurrentIndex(0);
    if (currentIndex === currencies.length - 1) {
      setCurrentCurrency(currencies[0]);
      props.setCurrency(currencies[0]);
    } else {
      setCurrentIndex(currentIndex + 1);
      setCurrentCurrency(currencies[currentIndex + 1]);
      props.setCurrency(currencies[currentIndex + 1]);
    }
  }
  return (
    <div
      style={{
        marginRight: "15px",
        display: "flex",

        right: "-20%",
        backgroundColor: "red",
        zIndex: "3",
      }}
    >
      <div style={{ padding: "1px 10px" }} onClick={() => moveLeft()}>
        <img src={left_arrow} alt="left_arrow" />
      </div>
      <div style={{ marginLeft: "10px", marginRight: "10px" }}>
        {currentCurrency}
      </div>
      <div style={{ padding: "1px 10px" }} onClick={() => moveRight()}>
        <img src={right_arrow} alt="right_arrow" />
      </div>
    </div>
  );
}
