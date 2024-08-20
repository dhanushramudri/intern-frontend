/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import React from "react";
import "./style.css";

export const Logo = ({ className, tagsClassName }) => {
  return (
    <div className={`logo ${className}`}>
      <p className="p">
        <span className="text-wrapper-6">Intern</span>
        <span className="text-wrapper-7">.ai</span>
      </p>
      <div className={`div-wrapper ${tagsClassName}`}>
        <div className="text-wrapper-8">beta</div>
      </div>
    </div>
  );
};
