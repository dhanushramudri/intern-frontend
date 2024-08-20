import React from "react";
import styles from "./styles.module.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

export default function SearchJobsByCountry() {
  const countries = {
    Worldwide: "🌍",
    Europe: "🇪🇺",
    "North America": "🏈",
    "Latin America": "💃",
    Asia: "⛩",
    Africa: "🦁",
    Oceania: "🌊",
    "Middle East": "🕌",
    "United States": "🇺🇸",
    "United Kingdom": "🇬🇧",
    Albania: "🇦🇱",
    Argentina: "🇦🇷",
    Australia: "🇦🇺",
    Austria: "🇦🇹",
    Bangladesh: "🇧🇩",
    Belgium: "🇧🇪",
    "Bosnia and Herzegovina": "🇧🇦",
    Brazil: "🇧🇷",
    Bulgaria: "🇧🇬",
    Canada: "🇨🇦",
    Croatia: "🇭🇷",
    Cyprus: "🇨🇾",
    "Czech Republic": "🇨🇿",
    Denmark: "🇩🇰",
    Estonia: "🇪🇪",
    Finland: "🇫🇮",
    France: "🇫🇷",
    Georgia: "🇬🇪",
    Germany: "🇩🇪",
    Greece: "🇬🇷",
    "Hong Kong": "🇭🇰",
    Hungary: "🇭🇺",
    Iceland: "🇮🇸",
    India: "🇮🇳",
    Indonesia: "🇮🇩",
    Ireland: "🇮🇪",
    Israel: "🇮🇱",
    Italy: "🇮🇹",
    Jamaica: "🇯🇲",
    Japan: "🇯🇵",
    Kenya: "🇰🇪",
    Latvia: "🇱🇻",
    Liechtenstein: "🇱🇮",
    Lithuania: "🇱🇹",
    Luxembourg: "🇱🇺",
    Macedonia: "🇲🇰",
    Malaysia: "🇲🇾",
    Mauritius: "🇲🇺",
    Mexico: "🇲🇽",
    Moldova: "🇲🇩",
    Monaco: "🇲🇨",
    Netherlands: "🇳🇱",
    "New Zealand": "🇳🇿",
    Norway: "🇳🇴",
    Pakistan: "🇵🇰",
    Philippines: "🇵🇭",
    Poland: "🇵🇱",
    Portugal: "🇵🇹",
    Romania: "🇷🇴",
    Serbia: "🇷🇸",
    Singapore: "🇸🇬",
    Slovakia: "🇸🇰",
    "South Korea": "🇰🇷",
    Spain: "🇪🇸",
    "Sri Lanka": "🇱🇰",
    Sweden: "🇸🇪",
    Switzerland: "🇨🇭",
    Taiwan: "🇹🇼",
    Thailand: "🇹🇭",
    Turkey: "🇹🇷",
    Ukraine: "🇺🇦",
    Uruguay: "🇺🇾",
  };

  return (
    <div className={styles.search_by_container}>
      <Header />
      <h1 className={`heading-title ${styles.title}`}>
        <span className="unsuckify">Browse</span> Jobs by Country
      </h1>
      <div className={styles.search_by_items_container}>
        {Object.entries(countries).map(([country, emoji], idx) => {
          return (
            <a
              key={idx}
              href={`/country/${country}`}
              className={styles.search_by_item}
            >
              <div className={styles.emoji}>{emoji}</div>
              <div className={styles.value}>{country}</div>
            </a>
          );
        })}
      </div>
      <Footer />
    </div>
  );
}
