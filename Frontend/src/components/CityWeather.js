import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

const CityWeather = ({ city }) => {
  if (!city) return <p>Loading...</p>;

  const allData = city.history || [];
  const history = allData.filter((entry) => entry.timestamp && new Date(entry.timestamp) <= new Date());

  const graphData = history.map((entry) => ({
    timestamp: entry.timestamp ? new Date(entry.timestamp).toLocaleTimeString() : "N/A",
    temperature: entry.temperature || 0,
  }));

  const latestTemperature = history.length > 0 ? history[history.length - 1].temperature : "N/A";

  return (
    <div className="city-card">
      <h2>{city.city}</h2>
      <p>🌡️ Current Temperature: {latestTemperature}°C</p>
      <p>🌫️ AQI Level: {city.aqi}</p>

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
