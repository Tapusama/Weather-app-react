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
import {
  fetchAirPollutionDetails,
  fetchUvDetails,
  fetchWeatherData,
  fetchWeatherDetails,
  fetchWeatherDetailsByDate,
  getCurrentLocation,
} from "./Services/WeatherApi";
import { findDayForCards } from "./Utils/Functions";

function App() {
  let codeWeeklyData = [
    {
      day: "SUN",
      image: require("./weatherImages/clouds-37009_640.png"),
      temp: "25\u00B0",
      low: "2\u00B0",
    },
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
  ];

  const [weather, setWeather] = useState([]);
  const [weatherInfo, setWeatherInfo] = useState({});
  const [weatherDetails, setWeatherDetails] = useState({});
  const [weatherDetailsOther, setWeatherDetailsOther] = useState({});
  const [airPollution, setAirPollution] = useState({});

  const currentTime = new Date().toLocaleTimeString().split("AM")[0];
  const currentDate = new Date().toISOString().split("T")[0];
  const currentTimeInMs = new Date().getTime();
  const currentHours = new Date().getHours();

  const filterDataAsPerDateAndTime = (dataArray) => {
    //first filter data as per date
    const filterdDates = dataArray.filter(
      (e, i) => (e?.dt_txt).split(" ")[0] == currentDate
    );

    //find time Case
    const findTime = (time) => {
      let foundIndex;
      for (let i = 0; i < filterdDates.length; i++) {
        if (filterdDates[i]?.dt <= time < filterdDates[i + 1]?.dt) {
          foundIndex = i;
        }
      }
      return filterdDates[foundIndex];
    };
    const found = findTime(currentTimeInMs);
    return found;
  };

  const InsertImagesToWeeklyData = (data1, data2) => {
    let copy = [...data2];

    data2 &&
      data2.length > 0 &&
      data2.map((e, i) => {
        let x =
          data1 &&
          data1.length > 0 &&
          data1.filter((el, j) => (el?.dt_txt).split(" ")[0] == e?.date);
        copy[i].image = x;
        copy[i].FoundIcon = require("./weatherImages/clouds-37009_640.png");
      });
    let foundIndex;
    copy.map((ele, k) => {
      let subArr = ele.image;
      subArr.filter((item, index) => {
        if (
          currentHours -
            copy[k].image[index]?.dt_txt.split(" ")[1].split(":")[0] <
            3 ||
          currentHours -
            copy[k].image[index]?.dt_txt.split(" ")[1].split(":")[0] ==
            3
        ) {
          foundIndex = index;
        }
      });
      copy[k].FoundIcon = subArr[foundIndex]?.weather[0]?.icon
        ? `http://openweathermap.org/img/wn/${subArr[foundIndex]?.weather[0]?.icon}@2x.png`
        : require("./weatherImages/clouds-37009_640.png");
      // console.log("foundIcon in MainArray", copy[k].FoundIcon);
    });
    return copy;
  };

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

          //This Response is for Weekly report 1st section
          const weatherData = await fetchWeatherData(lat, lng);
          const weatherDetail = await fetchWeatherDetails(lat, lng);
          try {
            if (weatherData) {
              let res = codeWeeklyData.map((mainEle, index) => {
                mainEle.day =
                  Object.keys(weatherData?.daily).length > 0
                    ? findDayForCards(weatherData.daily?.time[index])
                    : findDayForCards();
                mainEle.temp =
                  Object.keys(weatherData?.daily).length > 0
                    ? weatherData.daily?.temperature_2m_max[index]
                    : 0;

                mainEle.low =
                  Object.keys(weatherData?.daily).length > 0
                    ? weatherData.daily?.temperature_2m_min[index]
                    : 0;
                mainEle.date =
                  Object.keys(weatherData?.daily).length > 0
                    ? weatherData.daily?.time[index]
                    : 0;
                return mainEle;
              });

              let smallCardsData = InsertImagesToWeeklyData(
                weatherDetail?.list,
                res
              );
              setWeather(smallCardsData);
              setWeatherInfo(weatherData);
            } else {
              setWeather([]);
              setWeatherInfo({});
            }
          } catch (error) {
            console.log(error);
          }

          //2nd api call This Response is for Highlights report 2nd section
          try {
            if (weatherDetail) {
              let data = filterDataAsPerDateAndTime(weatherDetail.list);
              setWeatherDetails(data);
              setWeatherDetailsOther(weatherDetail);
            } else {
              setWeatherDetails({});
              setWeatherDetailsOther({});
            }
          } catch (err) {
            console.log(err);
          }

          //3rd api call
          const airPolutionData = await fetchAirPollutionDetails(lat, lng);
          try {
            if (airPolutionData) {
              console.log(airPolutionData);
              setAirPollution(airPolutionData);
            } else {
              console.log("Error");
              setAirPollution({});
            }
          } catch (err) {
            console.log(err);
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

  const covertToTime = (time) => {
    let d = new Date(time);
    return d.toLocaleTimeString();
  };

  const getWindDirection = (d) => {
    let WIND_DIRECTION;
    switch (true) {
      case 0:
      case 360:
        WIND_DIRECTION = "N";
        break;
      case 90:
        WIND_DIRECTION = "E";
        break;
      case 180:
        WIND_DIRECTION = "S";
        break;
      case 270:
        WIND_DIRECTION = "W";
        break;
      case d > 0 && d < 90:
        WIND_DIRECTION = "NE";
        break;
      case d > 90 && d < 180:
        WIND_DIRECTION = "SE";
        break;
      case d > 180 && d < 270:
        WIND_DIRECTION = "SW";
        break;
      case d > 270 && d < 360:
        WIND_DIRECTION = "NW";
        break;
      default:
        WIND_DIRECTION = "-";
        break;
    }

    return WIND_DIRECTION;
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
            {weatherDetails?.weather && weatherDetails?.weather.length > 0 ? (
              <img
                className="imageWrapper"
                src={`http://openweathermap.org/img/wn/${weatherDetails?.weather[0]?.icon}@2x.png`}
              />
            ) : (
              <img
                className="imageWrapper"
                src={require("./weatherImages/clouds-37009_640.png")}
              />
            )}

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
              <span className="watchDay">
                {weatherDetails?.weather &&
                  weatherDetails?.weather.length > 0 &&
                  (weatherDetails?.weather[0]?.description).toUpperCase()}
              </span>
              <span className="watchTime">
                {weatherDetails?.weather &&
                  weatherDetails?.weather.length > 0 &&
                  weatherDetails?.weather[0]?.main}
              </span>
            </div>
            <ImageCards location={weatherDetailsOther?.city?.name} />
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
                value={weatherDetails?.wind?.speed}
                unit={"Km/h"}
                footer={getWindDirection(weatherDetails?.wind?.deg)}
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
                      <span>5.47 AM</span>
                    </div>
                    <div style={{ flexDirection: "row", paddingTop: "15px" }}>
                      {<HiOutlineArrowCircleDown size={20} color="yellow" />}
                      &nbsp; &nbsp;
                      <span>6.07 PM</span>
                    </div>
                  </div>
                }
              />
              <Highlights
                title="Humidity"
                className={"highlightCard"}
                value={weatherDetails?.main?.humidity}
                unit={"%"}
                footer={"Normal"}
                icon={<RiEmotionNormalFill size={20} color="yellow" />}
              />
              <Highlights
                title="Visibility"
                className={"highlightCard"}
                value={weatherDetails?.visibility / 1000}
                unit={"Km"}
                footer={"Normal"}
                icon={<RiEmotionNormalFill size={20} color="yellow" />}
              />
              <Highlights
                title="Air Quality Index"
                className={"highlightCard"}
                value={
                  Object.keys(airPollution).length > 0
                    ? airPollution?.list[0]?.main?.aqi
                    : 0
                }
                // unit={"Km/h"}
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
