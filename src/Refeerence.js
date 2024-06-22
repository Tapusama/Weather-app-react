document.addEventListener("DOMContentLoaded", () => {
    const API_URL = 'https://api.open-meteo.com/v1/forecast';
    const GEOCODING_API_URL = 'https://api.opencagedata.com/geocode/v1/json';
    const GEOCODING_API_KEY = '27ece9aa0d614feb878b467f8b4151c3';
    const GEOLOCATION_API_URL = 'http://ip-api.com/json/';
 
    const locationInput = document.getElementById('location-input');
    const searchButton = document.getElementById('search-button');
    const suggestionsBox = document.getElementById('suggestions');
 
    let debounceTimeout;
 
    locationInput.addEventListener('input', () => {
        clearTimeout(debounceTimeout);
        const query = locationInput.value;
        if (query) {
            debounceTimeout = setTimeout(() => fetchSuggestions(query), 300);
        } else {
            suggestionsBox.innerHTML = '';
        }
    });
 
    searchButton.addEventListener('click', () => {
        const location = locationInput.value;
        if (location) {
            fetchGeocodingData(location);
        }
    });
 
    suggestionsBox.addEventListener('click', (event) => {
        if (event.target.classList.contains('suggestion-item')) {
            const location = event.target.textContent;
            locationInput.value = location;
            suggestionsBox.innerHTML = '';
            fetchGeocodingData(location);
        }
    });
 
    function fetchWeatherData(lat, lon) {
        const url = `${API_URL}?latitude=${lat}&longitude=${lon}&daily=temperature_2m_max,temperature_2m_min,precipitation_sum&current_weather=true&timezone=auto`;
 
        fetch(url)
            .then(response => response.json())
            .then(data => {
                displayCurrentWeather(data.current_weather);
                displayForecast(data.daily);
                updateBackground(data.current_weather);
            })
            .catch(error => console.error('Error fetching weather data:', error));
    }
 
    function fetchGeocodingData(location) {
        const url = `${GEOCODING_API_URL}?q=${encodeURIComponent(location)}&key=${GEOCODING_API_KEY}`;
 
        fetch(url)
            .then(response => response.json())
            .then(data => {
                if (data.results && data.results.length > 0) {
                    const { lat, lng } = data.results[0].geometry;
                    fetchWeatherData(lat, lng);
                } else {
                    alert('Location not found');
                }
            })
            .catch(error => console.error('Error fetching geocoding data:', error));
    }
 
    function fetchSuggestions(query) {
        const url = `${GEOCODING_API_URL}?q=${encodeURIComponent(query)}&key=${GEOCODING_API_KEY}&limit=5`;
 
        fetch(url)
            .then(response => response.json())
            .then(data => {
                suggestionsBox.innerHTML = '';
                if (data.results && data.results.length > 0) {
                    data.results.forEach(result => {
                        const suggestionItem = document.createElement('div');
                        suggestionItem.className = 'suggestion-item';
                        suggestionItem.textContent = result.formatted;
                        suggestionsBox.appendChild(suggestionItem);
                    });
                }
            })
            .catch(error => console.error('Error fetching suggestions:', error));
    }
 
    function fetchCurrentLocation() {
        fetch(GEOLOCATION_API_URL)
            .then(response => response.json())
            .then(data => {
                const { lat, lon } = data;
                fetchWeatherData(lat, lon);
            })
            .catch(error => console.error('Error fetching geolocation data:', error));
    }
 
    function displayCurrentWeather(current) {
        const currentWeatherInfo = document.getElementById('current-weather-info');
        currentWeatherInfo.innerHTML = `
            <p>Temperature: ${current.temperature} °C</p>
            <p>Weather: ${current.weathercode}</p>
        `;
    }
 
    function displayForecast(daily) {
        const forecastInfo = document.getElementById('forecast-info');
        forecastInfo.innerHTML = '';
 
        daily.time.forEach((time, index) => {
            const weatherDay = document.createElement('div');
            weatherDay.className = 'weather-day';
            weatherDay.innerHTML = `
                <p>${time}</p>
                <p>Max: ${daily.temperature_2m_max[index]} °C</p>
                <p>Min: ${daily.temperature_2m_min[index]} °C</p>
                <p>Precipitation: ${daily.precipitation_sum[index]} mm</p>
            `;
            forecastInfo.appendChild(weatherDay);
        });
    }
 
    function updateBackground(current) {
        const weatherCode = current.weathercode;
        let backgroundImage = '';
 
        switch(weatherCode) {
            case 'clear':
                backgroundImage = 'url(clear.jpg)';
                break;
            case 'cloudy':
                backgroundImage = 'url(cloudy.jpg)';
                break;
            case 'rainy':
                backgroundImage = 'url(rainy.jpg)';
                break;
            // Add more cases for other weather codes
            default:
                backgroundImage = 'url(default.jpg)';
        }
 
        document.body.style.backgroundImage = backgroundImage;
    }
 
    // Fetch current location weather data on load
    fetchCurrentLocation();
});