import React, { useState, useEffect } from "react";
import axios from "axios";
import CityList from "./components/CityList";
import SearchBar from "./components/SearchBar";
import "./styles.css";

const API_BASE_URL = "http://localhost:5000";

const App = () => {
  const [cities, setCities] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchWeatherData();
  }, []);

  const fetchWeatherData = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/all`);
      console.log("Fetched cities from API:", response.data);
      setCities(response.data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  return (
    <div className="container">
      <h1>🌍 Real-Time Weather App</h1>
      <SearchBar setSearchQuery={setSearchQuery} />
      <CityList cities={cities} searchQuery={searchQuery} />
    </div>
  );
};

export default App;
