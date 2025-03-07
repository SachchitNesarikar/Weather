import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

const CityWeather = ({ city }) => {
  const allData = city.history || [];

  const history = allData.filter((entry) => new Date(entry.timestamp) <= new Date());
  const forecast = allData.filter((entry) => new Date(entry.timestamp) > new Date());

  const graphData = history.map((entry) => ({
    timestamp: new Date(entry.timestamp).toLocaleTimeString(),
    temperature: entry.temperature,
  }));

  const latestTemperature = history.length > 0 ? history[0].temperature : "N/A";

  return (
    <div className="city-card">
      <h2>{city.city}</h2>
      <p>🌡️ Current Temperature: {latestTemperature}°C</p>

      <LineChart width={300} height={200} data={graphData}>
        <XAxis dataKey="timestamp" />
        <YAxis />
        <Tooltip />
        <CartesianGrid stroke="#ccc" />
        <Line type="monotone" dataKey="temperature" stroke="#ff7300" />
      </LineChart>

      {forecast.length > 0 && (
        <div className="forecast">
          <h3>📅 Forecast</h3>
          <ul>
            {forecast.map((entry, index) => (
              <li key={index}>
                {new Date(entry.timestamp).toLocaleString()} - {entry.temperature}°C
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CityWeather;
