import React from "react";

const CityCard = ({ city }) => {
  return (
    <div className="city-card">
      <h2 className="city-name">{city.city}</h2>
      <div className="weather-info">
        <div className="temperature">{city.temperature}°C</div>
        <div className="aqi">AQI: {city.aqi}</div>
      </div>
      <button className="forecast-btn">See Full Forecast</button>
    </div>
  );
};

export default CityCard;
