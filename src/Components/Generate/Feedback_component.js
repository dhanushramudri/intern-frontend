// PerformanceTips.js
import React, { useEffect, useState } from "react";
import "./styles.css"; // Import your CSS file
import star_svg from "./star_given.svg";
import unstar_svg from "./star_ungiven.svg";

const Feedback_component = ({ rating, feed }) => {
  const [stars, setStars] = useState([]);
  const [unStar, setUnStar] = useState([]);
  const ratingEmojis = ["😕", "😐", "🙂", "😊", "😍"];
  const ratingPrompts = [
    "Best of luck next time",
    "You can do better",
    "Not bad, keep improving",
    "Good job!",
    "Excellent! Well done!",
  ];
  useEffect(() => {
    let new_stars = [];
    for (let i = 0; i < rating; i++) {
      new_stars.push("");
    }
    setStars(new_stars);
    new_stars = [];
    for (let i = 0; i < 5 - rating; i++) {
      new_stars.push("");
    }
    setUnStar(new_stars);
  }, [rating]);
  return (
    <div className="performance-tips-container">
      <h2>Performance Tips and Tricks:</h2>
      {feed.length > 0 ? (
        <ul>
          {feed.map((point, idx) => {
            return <div key={idx}>{point}</div>;
          })}
        </ul>
      ) : (
        <p>No specific feedback provided.</p>
      )}
      <>
        <p
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <strong>Overall Rating:</strong>
          <div>
            {stars.map((star, index) => {
              return <img src={star_svg} />;
            })}
            {unStar.map((star, index) => {
              return <img src={unstar_svg} />;
            })}
          </div>
        </p>
        {rating && (
          <div style={{ textAlign: "center" }}>
            {ratingEmojis[rating - 1]} {ratingPrompts[rating - 1]}
          </div>
        )}
      </>
    </div>
  );
};

export default Feedback_component;
