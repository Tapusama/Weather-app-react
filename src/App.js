import logo from "./logo.svg";
import "./App.css";
import SearchBar from "./Components/SearchBar";
import Watch from "./Components/Watch";
import Temperature from "./Components/TempBar";
import SmallCards from "./Components/smallCards";
import ImageCards from "./Components/ImageCards";
import Highlights from "./Components/HighlightCards";
import { RiEmotionNormalFill } from "react-icons/ri";
import Graph from "./Components/Graph";
import { HiOutlineArrowCircleDown } from "react-icons/hi";
import { HiOutlineArrowCircleUp } from "react-icons/hi";

function App() {
  const codeWeeklyData = [
    {
      day: "MON",
      image: require("./weatherImages/clouds-37009_640.png"),
      temp: "25\u00B0",
      low: "2\u00B0",
    },
    {
      day: "TUE",
      image: require("./weatherImages/clouds-37009_640.png"),
      temp: "25\u00B0",
      low: "2\u00B0",
    },
    {
      day: "WED",
      image: require("./weatherImages/clouds-37009_640.png"),
      temp: "25\u00B0",
      low: "2\u00B0",
    },
    {
      day: "THU",
      image: require("./weatherImages/clouds-37009_640.png"),
      temp: "25\u00B0",
      low: "2\u00B0",
    },
    {
      day: "FRI",
      image: require("./weatherImages/clouds-37009_640.png"),
      temp: "25\u00B0",
      low: "2\u00B0",
    },
    {
      day: "SAT",
      image: require("./weatherImages/clouds-37009_640.png"),
      temp: "25\u00B0",
      low: "2\u00B0",
    },
    {
      day: "SUN",
      image: require("./weatherImages/clouds-37009_640.png"),
      temp: "25\u00B0",
      low: "2\u00B0",
    },
  ];

  return (
    <div className="App">
      <div className="mainPage">
        <div className="mainSubpage">
          <div className="inner1stDiv">
            <SearchBar />
            <img
              className="imageWrapper"
              src={require("./weatherImages/clouds-37009_640.png")}
            />
            <Temperature />
            <Watch />

            <div style={{ display: "flex", flexDirection: "column", marginTop:"20px" }}>
              <span className="watchDay">Mostly Cloudy</span>
              <span className="watchTime">Rain-2%</span>
            </div>

            <ImageCards />
          </div>
          <div className="inner2ndDiv">
            <p
              className="watchDay"
              style={{
                cursor: "pointer",
                display: "flex",
                alignSelf: "flex-start",
                textDecorationLine: "underline",
              }}
            >
              Weekly
            </p>
            <div className="WeekReportDiv">
              {codeWeeklyData.map((e, i) => {
                return <SmallCards data={e} />;
              })}
            </div>

            <span
              style={{
                display: "flex",
                alignSelf: "flex-start",
                paddingBottom: "10px",
              }}
            >
              Today's Highlights
            </span>

            <div className="higlightsWrapperDiv">
              <Highlights
                title="UV Index"
                className={"highlightCard"}
                jsx={<Graph />}
              />
              <Highlights
                title="Wind Status"
                className={"highlightCard"}
                value={"7.7" + "\u00B0"}
                unit={"Km/h"}
                footer={"Normal"}
                icon={<RiEmotionNormalFill size={20} color="yellow" />}
              />
              <Highlights
                title="Sunrise & Sunset"
                className={"highlightCard"}
                jsx={
                  <div style={{ flexDirection: "column", marginTop: "20px" }}>
                    <div style={{ flexDirection: "row" }}>
                      {<HiOutlineArrowCircleUp size={20} color="yellow" />}
                      &nbsp; &nbsp;
                      <span>5.37AM</span>
                    </div>
                    <div style={{ flexDirection: "row", paddingTop: "15px" }}>
                      {<HiOutlineArrowCircleDown size={20} color="yellow" />}
                      &nbsp; &nbsp;
                      <span>5.37AM</span>
                    </div>
                  </div>
                }
                // icon={<HiOutlineArrowCircleDown size={20} color="yellow" />}
              />
              <Highlights
                title="Humidity"
                className={"highlightCard"}
                value={"30"}
                unit={"%"}
                footer={"Normal"}
                icon={<RiEmotionNormalFill size={20} color="yellow" />}
              />
              <Highlights
                title="Visibility"
                className={"highlightCard"}
                value={"67"}
                unit={"Km"}
                footer={"Normal"}
                icon={<RiEmotionNormalFill size={20} color="yellow" />}
              />
              <Highlights
                title="Air Quality"
                className={"highlightCard"}
                value={"27.7"}
                footer={"Normal"}
                icon={<RiEmotionNormalFill size={20} color="yellow" />}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
