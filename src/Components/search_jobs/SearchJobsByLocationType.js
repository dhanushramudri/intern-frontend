import React from "react";
import styles from "./styles.module.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

export default function SearchJobsByLocationType() {
  const locationType = {
    Remote: "🏠",
    "In-Person": "💼",
    Hybrid: "💻",
  };

  return (
    <div className={styles.search_by_container}>
      <Header />
      <h1 className={`heading-title ${styles.title}`}>
        <span className="unsuckify">Browse</span> Jobs by Location Type
      </h1>
      <div className={styles.search_by_items_container}>
        {Object.entries(locationType).map(([type, emoji], idx) => {
          return (
            <a
              key={idx}
              href={`/location-type/${type}`}
              className={styles.search_by_item}
            >
              <div className={styles.emoji}>{emoji}</div>
              <div className={styles.value}>{type}</div>
            </a>
          );
        })}
      </div>
      <Footer />
    </div>
  );
}
