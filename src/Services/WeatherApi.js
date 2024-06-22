import axios from "axios";
const API_URL = "https://api.open-meteo.com/v1/forecast";

export const getCurrentLocation = async () => {
  const response = await axios.get("http://ip-api.com/json");
  console.log(response.data);
  return response.data;
};

export const fetchWeatherData = async (lat, lon) => {
  const url = `${API_URL}?latitude=${lat}&longitude=${lon}&daily=temperature_2m_max,temperature_2m_min,precipitation_sum&current_weather=true&timezone=auto`;

  const response = await axios.get(url);
  console.log(response.data);
  return response.data;
};
