import React, { useEffect } from "react";
import { FaBeer } from "react-icons/fa";

const Temperature = (props) => {
  const { temp, id, location, tempUnit } = props;

  const currentDate = new Date().toLocaleDateString();

  useEffect(() => {}, []);
  return (
    <React.Fragment>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          padding: "10px",
          justifyContent: "center",
        }}
      >
        <span className="temp">{temp ?? 12}</span> &nbsp;{" "}
        <span className="temp">
          {tempUnit ?? "\u00B0"}
          <span className="tempUnit">C</span>
        </span>
      </div>
    </React.Fragment>
  );
};

export default Temperature;
