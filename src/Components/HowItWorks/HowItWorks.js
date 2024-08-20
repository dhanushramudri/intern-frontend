import React from "react";
import styles from "./styles.module.css";
import item1 from "./item1.svg";
import item2 from "./item2.svg";
import item3 from "./item3.svg";

export default function HowItWorks() {
  return (
    <div className={styles.HowItWorks_container}>
      <div className={styles.HowItWorks_items}>
        <div className={styles.HowItWorks_item}>
          <img loading="lazy" src={item1} alt="img" />
          <h2 className={styles.how_it_works_item_title}>
            Access the hidden job market
          </h2>
          <div className={styles.HowItWorks_text}>
            Our powerful tech finds hidden jobs you’ll never find on LinkedIn,
            Indeed, or any other job search tool 🤫
          </div>
        </div>
        <div className={styles.HowItWorks_item}>
          <img loading="lazy" src={item2} alt="img" />
          <h2 className={styles.how_it_works_item_title}>
            No expired jobs... ever.
          </h2>
          <div className={styles.HowItWorks_text}>
            Intern.ai constantly scans companies directly and ONLY has listings
            that are hiring now, guaranteed.
          </div>
        </div>
        <div className={styles.HowItWorks_item}>
          <img loading="lazy" src={item3} alt="img" />
          <h2 className={styles.how_it_works_item_title}>Get Hired Faster</h2>
          <div className={styles.HowItWorks_text}>
            Be the first to know with daily emails, spend less time searching
            and more time applying.
          </div>
        </div>
      </div>
    </div>
  );
}
