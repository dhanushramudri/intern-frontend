import React from "react";
import "./resume_tailor.css";
const Opener = ({ setshow }) => {
  return (
    <div className="sidewrapper" id="sidewrappers">
      <div className="sideupper1">Resume Tailor GPT 👇 - Description</div>
      <div className="sideupper2">
        This resume tailor tool tailors your uploaded PDF resume to any job
        description.
      </div>
      <button
        className="closebutton"
        onClick={() => {
          setshow(false);
          let resumebox = document.getElementById("changecolor");
          if (resumebox) {
            resumebox.style.filter = "grayscale(0%)";
          }
        }}
      >
        Close
      </button>
    </div>
  );
};

export default Opener;
