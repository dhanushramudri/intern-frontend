import React from "react";
import item1 from "./item1.svg";
import item2 from "./item2.svg";
import item3 from "./item3.svg";

export default function Feature_items() {
  return (
    <div className="feature_items">
      <div className="feature_item">
        <img src={item1} alt="Search Jobs SVG" />
        <div className="feature_item_content">
          <div className="feature_item_title">Find jobs that other’s can’t</div>
          <div className="feature_item_description">
            Our powerful tech finds hidden jobs you’ll never find on LinkedIn,
            Indeed, or any other job search tool 🤫
          </div>
        </div>
      </div>
      <div className="feature_item">
        <img src={item2} alt="Search Jobs SVG" />
        <div className="feature_item_content">
          <div className="feature_item_title">No expired jobs... ever.</div>
          <div className="feature_item_description">
            Intern.ai constantly scans companies directly and ONLY has listings
            that are hiring now, guaranteed.
          </div>
        </div>
      </div>
      <div className="feature_item">
        <img src={item3} alt="Search Jobs SVG" />
        <div className="feature_item_content">
          <div className="feature_item_title">Get hired faster</div>
          <div className="feature_item_description">
            Be the first to know with daily emails, spend less time searching
            and more time applying.
          </div>
        </div>
      </div>
    </div>
  );
}
