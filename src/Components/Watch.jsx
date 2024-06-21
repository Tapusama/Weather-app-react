import React, { useEffect } from "react";
import { FaBeer } from "react-icons/fa";

const Watch = (props) => {
  const { name, id, location } = props;

  const currentTime = new Date().toLocaleTimeString();
  const currentDate = new Date().toLocaleDateString();
  const findDay = () => {
    let d = new Date().getDay();
    switch (d) {
      case 1:
        return "MONDAY";
        break;
      case 2:
        return "TUESDAY";
        break;
      case 3:
        return "WEDNESDAY";
        break;
      case 4:
        return "THURSDAY";
        break;
      case 5:
        return "FRIDAY";
        break;
      case 6:
        return "SATURDAY";
        break;
      case 7:
        return "SUNDAY";
        break;
    }
  };

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
