import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

const getAQIDescription = (aqi) => {
  const aqiMap = {
    1: "Very Good",
    2: "Good",
    3: "Moderate",
    4: "Poor",
    5: "Very Poor",
  };
  return aqiMap[aqi] || "Unknown";
};

const CityWeather = ({ city }) => {
  if (!city) return <p>Loading...</p>;

  const history = (city.history || []).filter(
    (entry) => entry.timestamp && new Date(entry.timestamp) <= new Date()
  );

  const graphData = history.map((entry) => ({
    timestamp: entry.timestamp
      ? new Date(entry.timestamp).toLocaleString([], { hour: "2-digit", minute: "2-digit" })
      : "N/A",
    temperature: entry.temperature || 0,
  }));

  const latestTemperature = history.length > 0 ? history[history.length - 1].temperature : "N/A";

  return (
    <div className="city-card">
      <h2>{city.city}</h2>
      <p>🌡️ Current Temperature: {latestTemperature}°C</p>
      <p>🌫️ {getAQIDescription(city.aqi)} air quality</p>

      <LineChart width={300} height={200} data={graphData}>
        <XAxis dataKey="timestamp" />
        <YAxis />
        <Tooltip />
        <CartesianGrid stroke="#ccc" />
        <Line type="monotone" dataKey="temperature" stroke="#ff7300" />
      </LineChart>
    </div>
  );
};

export default CityWeather;
