require("dotenv").config();
const express = require("express");
const mysql = require("mysql2");
const axios = require("axios");
const cron = require("node-cron");

const app = express();
const port = 5000;

const cors = require("cors");
app.use(cors({origin: "http://localhost:3000"}));

// ✅ Connect to MySQL
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err);
  } else {
    console.log("Connected to MySQL");
  }
});

// ✅ Fetch Weather Data Correctly

const fetchWeatherData = async () => {
    try {
      const cities = ["London", "New York", "Tokyo", "Sydney", "Pune", "Berlin", "Cairo", "Rio de Janeiro", "Toronto", "Dubai"];

      for (const city of cities) {
        console.log(`🌍 Fetching weather data for ${city}...`);
  
        const response = await axios.get(
          `${process.env.WEATHER_API_URL}?q=${city}&appid=${process.env.WEATHER_API_KEY}&units=metric`
        );
  
        if (!response.data || !response.data.main) {
          console.error(`❌ No weather data for ${city}`);
          continue;
        }
  
        const name = response.data.name; // City name
        const temperature = response.data.main.temp; // Temperature
        const timestamp = new Date(); // Current timestamp
  
        console.log(`✅ API Response for ${name}: ${temperature}°C`);
  
        // ✅ Insert data into MySQL
        const query = "INSERT INTO weather_data (city, temperature, timestamp) VALUES (?, ?, ?)";
        db.query(query, [name, temperature, timestamp], (err, result) => {
          if (err) {
            console.error("❌ Error inserting data into DB:", err);
          } else {
            console.log(`📌 Inserted into DB: ${name} - ${temperature}°C`);
          }
        });
      }
    } catch (error) {
      console.error("❌ Error fetching weather data:", error);
    }
  };

// ✅ Schedule Cron Job Every 3 Hours
cron.schedule("0 * * * *", () => {
  console.log("Fetching weather data...");
  fetchWeatherData();
});

app.get("/all", (req, res) => {
  const query = `
    SELECT city, temperature, timestamp 
    FROM weather_data 
    ORDER BY city, timestamp ASC`;  // ✅ Ensure correct time order
    
  db.query(query, (err, results) => {
    if (err) {
      res.status(500).json({ error: err });
    } else {
      const cityData = {};
      results.forEach((row) => {
        if (!cityData[row.city]) {
          cityData[row.city] = { city: row.city, history: [] };
        }
        cityData[row.city].history.push({
          timestamp: row.timestamp,
          temperature: row.temperature,
        });
      });

      res.json(Object.values(cityData));
    }
  });
});

app.get("/:city", (req, res) => {
  const city = req.params.city;
  console.log(`🔍 Received request for city: ${city}`);
  db.query("SELECT * FROM weather_data WHERE city = ? ORDER BY timestamp DESC", [city], (err, results) => {
    if (err) res.status(500).json({ error: err });
    else res.json(results);
  });
});

app.get("/", (req, res) => {
  res.send("Server is working! 🚀");
});

// ✅ Start Server
app.listen(port, () => console.log(`Server running on port ${port}`));
// ✅ Call function once when server starts
fetchWeatherData();
