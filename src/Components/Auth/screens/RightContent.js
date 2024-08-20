import pen from "../static/img/pen-1.png";
import notebook from "../static/img/notebook-1.png";
import vector from "../static/img/vector.svg";

export default function RightContent() {
  return (
    <div className="overlap-wrapper">
      <div className="overlap">
        <img className="vector" alt="Vector" src={vector} />
        <div className="illustration">
          <div className="overlap-group">
            <img className="notebook" alt="Notebook" src={notebook} />
            <img className="pen" alt="Pen" src={pen} />
          </div>
        </div>
      </div>
    </div>
  );
}
