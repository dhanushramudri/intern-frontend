import React from "react";
import styles from "./styles.module.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

export default function SearchJobsByCategory() {
  const categories = {
    "Accounting Payroll & Financial Planning": "💲",
    Administration: "🖊",
    "Arts and Design": "🎨",
    "Business Development": "💼",
    "Business Operations & Strategy": "♟",
    "Chief of Staff": "👩🏽‍✈️",
    "Community and Social Services": "🤝",
    "Content Design": "✍️",
    "Content Marketing": "✍️",
    Consulting: "🤔",
    Copywriter: "📝",
    "Customer Success & Support": "💝",
    "Data Analyst": "📉",
    "Data Engineer": "🚰",
    "Data Scientist": "📊",
    "DevOps & Production Engineering": "⛑",
    Education: "🎓",
    "Engineering Manager": "👮‍♀️",
    Engineering: "🔧",
    Entrepreneurship: "💡",
    "Executive Assistant": "👨‍💼",
    Finance: "💹",
    "Growth Marketing": "📈",
    "Hardware Engineer": "🛠",
    "Healthcare Services": "🩺",
    "Human Resources": "👩‍👩‍👧‍👦",
    "Infrastructure Engineer": "👷",
    "Information Technology": "💻",
    "IT Support": "💻",
    Legal: "💼",
    "Machine Learning Engineer": "🤖",
    Marketing: "📈",
    "Media and Communication": "📰",
    "Military and Protective Services": "🛡️",
    Operations: "⚙️",
    "Product Analyst": "🔍",
    "Performance Marketing": "📈",
    "Product Designer": "🎨",
    "Product Manager": "✅",
    "Project & Program Management": "👷‍♀️",
    "Product Marketing": "🎁",
    Purchasing: "🛒",
    "Marketing (General)": "🎡",
    "QA Engineer (Quality Assurance)": "🔧",
    "Quality Assurance": "✔️",
    "Real Estate": "🏠",
    Research: "🔍",
    Recruitment: "🎯",
    "Risk & Compliance": "🎲",
    "SEO Marketing": "📈",
    Sales: "🤑",
    "Security Engineer": "👮‍♂️",
    "Social Media & Community": "💕",
    "Software Engineer": "🖥",
    "Solutions Engineer": "💻",
    "Support Engineer": "📞",
    Support: "🤝",
    "Technical Writer": "🔏",
    "Technical Product Manager": "⚒️",
    "UX Researcher": "🔬",
  };

  return (
    <div className={styles.search_by_container}>
      <Header />
      <h1 className={`heading-title ${styles.title}`}>
        <span className="unsuckify">Browse</span> Jobs by Category
      </h1>
      <div className={styles.search_by_items_container}>
        {Object.entries(categories).map(([category, emoji], idx) => {
          return (
            <a
              key={idx}
              href={`/category/${category}`}
              className={styles.search_by_item}
            >
              <div className={styles.emoji}>{emoji}</div>
              <div className={styles.value}>{category}</div>
            </a>
          );
        })}
      </div>
      <Footer />
    </div>
  );
}
