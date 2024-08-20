/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import React from "react";
import "./style.css";

export const Button = ({ state, className }) => {
  return (
    <div className={`button ${state} ${className}`}>
      <div className="log-in-2">
        {state === "faded" && <>Log In</>}

        {state === "primary" && <>Sign Up</>}

        {state === "stroke" && <>✍️ Pomote Job</>}
      </div>
    </div>
  );
};

Button.propTypes = {
  state: PropTypes.oneOf(["primary", "stroke", "faded"]),
};
