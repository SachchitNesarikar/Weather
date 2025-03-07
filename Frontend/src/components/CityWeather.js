import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

const CityWeather = ({ city }) => {
  // ✅ Ensure history exists before mapping
  const data = city.history
    ? city.history.map((entry) => ({
        timestamp: new Date(entry.timestamp).toLocaleTimeString(),
        temperature: entry.temperature,
      }))
    : []; // Default to empty array if history is undefined

  return (
    <div className="city-card">
      <h2>{city.city}</h2>
      <p>Current Temperature: {city.temperature}°C</p>
      <LineChart width={300} height={200} data={data}>
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
