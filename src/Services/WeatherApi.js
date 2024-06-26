import axios from "axios";
import { API_Key, API_URL } from "../Utils/KeyUrls";

export const getCurrentLocation = async () => {
  const response = await axios.get("http://ip-api.com/json");
  return response.data;
};

export const fetchWeatherData = async (lat, lon) => {
  const url = `${API_URL}?latitude=${lat}&longitude=${lon}&daily=temperature_2m_max,temperature_2m_min,precipitation_sum&current_weather=true&timezone=auto`;

  const response = await axios.get(url);
  return response.data;
};

export const fetchWeatherDetails = async (lat, lon) => {
  const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_Key}`;
  const response = await axios.get(url);
  return response.data;
};

export const fetchAirPollutionDetails = async (lat, lon) => {
  const url = `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_Key}`;
  const response = await axios.get(url);
  return response.data;
};




