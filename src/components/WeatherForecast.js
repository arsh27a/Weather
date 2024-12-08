import React, { useRef, useState } from "react";
import icon from "../images/search-icon.png";
import wind from "../images/50d.png";
import humidity from "../images/humidity.png";

const WeatherForecast = () => {
  const userInput = useRef();
  const [weatherData, setWeatherData] = useState(false);

  // Construct the OpenWeatherMap icon URL
  const iconUrl = `http://openweathermap.org/img/wn/${weatherData.images}.png`;
  const temp = weatherData?.temperature?.toString().slice(0, 2);

  const api = process.env.REACT_APP_API_KEY;
  const search = async (city) => {
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api}`;
      const res = await fetch(url);
      const jsonData = await res.json();
      setWeatherData({
        humidity: jsonData.main.humidity,
        wind: jsonData.wind.speed,
        location: jsonData.name,
        temperature: Math.floor(jsonData.main.temp),
        images: jsonData.weather[0].icon,
      });

      console.log("Weather Icon:", icon);

      console.log(jsonData, "data got");
    } catch (error) {
      alert("Error: City not found. Please check the name and try again.");
    }
  };

  const handleKeyDown = (event) => {
    const isEnterKey = event.key === "Enter";
    const isClickEvent = event.type === "click";

    if (isEnterKey || isClickEvent) {
      const city = userInput.current.value;
      if (!city) {
        alert("Kindly enter the city name to proceed.");
        return;
      }
      search(city);
    }
  };

  return (
    <div className="inner-container">
      <h1>Weather App</h1>
      <div className="search-container">
        <input
          ref={userInput}
          type="text"
          placeholder="search..."
          onKeyDown={handleKeyDown} // Event listener for keydown
        />
        <i
          class="fa-solid fa-magnifying-glass fa-lg"
          onClick={() => handleKeyDown({ key: "Enter" })}
        ></i>{" "}
      </div>

      {weatherData ? (
        <>
          {" "}
          <img src={iconUrl} className="weather-icon"></img>
          <p className="temperature">{temp} °C</p>
          <p className="location">{weatherData.location}</p>
          <div className="weather-data">
            <div className="col">
              <img src={humidity} className="weather-icon" alt="logo" />
              <div>
                <p>{weatherData.humidity} %</p>
                <span>Humidity</span>
              </div>
            </div>
            <div className="col">
              <img src={wind} className="weather-icon" alt="logo" />
              <div>
                <p>{weatherData.wind}km/h</p>
                <span>Wind Speed</span>
              </div>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default WeatherForecast;
