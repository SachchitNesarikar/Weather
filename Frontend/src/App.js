import React, { useState, useEffect } from "react";
import axios from "axios";
import CityList from "./components/CityList";
import SearchBar from "./components/SearchBar";
import "./styles.css";

const API_BASE_URL = "http://localhost:5000";

const App = () => {
  const [cities, setCities] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const backgroundStyle = {
    backgroundcolor: "BLUE",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundAttachment: "fixed",
    minHeight: "100vh",
    width: "100%",
    padding: "20px",
    color: "white",
    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.7)",
  };

  const fetchWeatherData = async () => {
    try {
      const weatherResponse = await axios.get(`${API_BASE_URL}/all`);
      const aqiResponse = await axios.get(`${API_BASE_URL}/aqi`);

      const mergedData = weatherResponse.data.map((city) => ({
        ...city,
        aqi: aqiResponse.data[city.city] || "N/A",
      }));

      setCities(mergedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchWeatherData();
  }, []);

  return (
    <div style={backgroundStyle}>
      <div className="container">
        <h1>🌍 Real-Time Weather App</h1>
        <SearchBar setSearchQuery={setSearchQuery} />
        <CityList cities={cities} searchQuery={searchQuery} />
      </div>
    </div>
  );
};

export default App;