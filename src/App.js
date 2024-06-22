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
import { useEffect, useState } from "react";
import { fetchWeatherData, getCurrentLocation } from "./Services/WeatherApi";

function App() {
  let codeWeeklyData = [
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

  const [geoLocation, setGeoLocation] = useState({});
  const [weather, setWeather] = useState([]);
  const [weatherInfo, setWeatherInfo] = useState({});

  const getLocationOnPageLoad = async () => {
    if ("geolocation" in navigator) {
      // Prompt user for permission to access their location
      navigator.geolocation.getCurrentPosition(
        // Success callback function
        async (position) => {
          // Get the user's latitude and longitude coordinates
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;

          // Do something with the location data, e.g. display on a map
          // console.log(`Latitude: ${lat}, longitude: ${lng}`);
          const weatherData = await fetchWeatherData(lat, lng);

          try {
            if (weatherData) {
              let res = codeWeeklyData.map((mainEle, index) => {
                mainEle.temp =
                  Object.keys(weatherData?.daily).length > 0
                    ? weatherData.daily?.temperature_2m_max[index]
                    : 0;

                mainEle.low =
                  Object.keys(weatherData?.daily).length > 0
                    ? weatherData.daily?.temperature_2m_min[index]
                    : 0;
                return mainEle;
              });

              let highlightsData = {};
              setWeather(res);
              setWeatherInfo(weatherData);
            } else {
              setWeather([]);
              setWeatherInfo({});
            }
          } catch (error) {
            console.log(error);
          }
        },
        // Error callback function
        (error) => {
          // Handle errors, e.g. user denied location sharing permissions
          console.error("Error getting user location:", error);
        }
      );
    } else {
      // Geolocation is not supported by the browser
      console.error("Geolocation is not supported by this browser.");
    }
  };

  useEffect(() => {
    getLocationOnPageLoad();
  }, []);

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
            <Temperature
              temp={weatherInfo?.current_weather?.temperature}
              tempUnit={weatherInfo?.current_weather_units?.temperature}
            />
            <Watch />

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginTop: "20px",
              }}
            >
              <span className="watchDay">Mostly Cloudy</span>
              <span className="watchTime">Rain-2%</span>
            </div>
            <ImageCards location={weatherInfo?.timezone} />
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
              {weather &&
                weather.length > 0 &&
                weather.map((e, i) => {
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
                value={weatherInfo?.current_weather?.windspeed}
                unit={weatherInfo?.current_weather_units?.windspeed}
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
