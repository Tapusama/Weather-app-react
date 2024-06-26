import React, { useEffect } from "react";
import { FaBeer } from "react-icons/fa";
import { findDay } from "../Utils/Functions";

const Watch = (props) => {
  const { name, id, location } = props;

  const currentTime = new Date().toLocaleTimeString();
  const currentDate = new Date().toLocaleDateString();
  

  useEffect(() => {}, []);
  return (
    <React.Fragment>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          padding: "10px",
        }}
      >
        <span className="watchDay">{findDay()}</span>, &nbsp;
        <div style={{ display: "flex", flexDirection: "row" }}>
          <span className="watchDate">{currentDate}</span>,&nbsp;
          <span className="watchTime">{currentTime}</span>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Watch;
