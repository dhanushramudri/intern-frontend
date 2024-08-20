import React from "react";
import "./skeleton.css";

export default function JobSkeleton() {
  const skeleton = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  return (
    <div>
      {skeleton.map((skele, idx) => {
        return (
          <div className="skeleton-container" key={idx}>
            <div className="company-logo-skeleton"></div>
            <div className="content-container-skeleton">
              <div className="company-title-skeleton"></div>
              <div className="items1-skeleton">
                <div className="item"></div>
                <div className="item"></div>
              </div>
              <div className="about-skeleton"></div>
              <div className="about-line1-skeleton"></div>
              <div className="about-line2-skeleton"></div>
              <div className="requirement-skeleton"></div>
              <div className="requirement-line1-skeleton"></div>
              <div className="requirement-line1-skeleton"></div>
              <div className="requirement-line2-skeleton"></div>
              <div className="items1-skeleton">
                <div className="item"></div>
                <div className="item"></div>
                <div className="item"></div>
                <div className="item"></div>
                <div className="item"></div>
              </div>
              <div className="items2-skeleton">
                <div className="item"></div>
                <div className="item"></div>
                <div className="item"></div>
                <div className="item"></div>
                <div className="item"></div>
              </div>
              <div className="items1-skeleton">
                <div className="item"></div>
                <div className="item"></div>
                <div className="item"></div>
                <div className="item"></div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
