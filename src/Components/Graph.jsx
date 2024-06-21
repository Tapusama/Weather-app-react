import React from "react";
import GaugeChart from "react-gauge-chart";

const Graph = () => {
  return (
    <div style={{width:"150px",marginTop:"20px",paddingRight:"20px"}}>
      <GaugeChart
        id="gauge-chart1"
        nrOfLevels={4}
        colors={["green", "orange", "red"]}
        arcWidth={0.1}
        percent={0.37}
        textColor={"black"}
        // hideText={true} // If you want to hide the text
      />
    </div>
  );
};

export default Graph;
