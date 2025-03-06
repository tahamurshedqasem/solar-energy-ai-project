"use client";
import { useEffect, useState } from "react";
// import Layout from "../../app/layout";
import {
  FiSun,
  FiCloudRain,
  FiWind,
  FiThermometer,
  FiCloud,
  FiDroplet,
} from "react-icons/fi";

// OpenWeather API Key (Replace with your actual API key)
const API_KEY = "f3b737260d578514bb4c57bc28e96e33";
const CITY = "Riyadh"; // Change to the desired city

export default function Weather() {
  const [weather, setWeather] = useState(null);
  const [aiPrediction, setAiPrediction] = useState("Loading...");
  const [loading, setLoading] = useState(true);

  // Fetch Weather Data
  useEffect(() => {
    fetchWeatherData();
  }, []);

  const fetchWeatherData = async () => {
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${CITY}&appid=${API_KEY}&units=metric`
      );
      const data = await res.json();

      if (!data || !data.main) {
        console.error("Invalid API response:", data);
        setWeather(null);
        setLoading(false);
        return;
      }

      setWeather(data);
      setLoading(false);

      // AI-driven prediction logic (example)
      const temp = data.main.temp || 0;
      const prediction =
        temp > 30
          ? "Expect a hot day, consider cooling strategies."
          : temp < 15
          ? "Expect cold weather, adjust solar panel angles accordingly."
          : "Moderate weather, optimal solar energy output expected.";
      setAiPrediction(prediction);
    } catch (error) {
      console.error("Error fetching weather data:", error);
      setWeather(null);
      setLoading(false);
    }
  };

  return (
    <>
      <h1 className="text-3xl font-bold">Weather Information</h1>
      <p className="text-gray-600">
        Live weather conditions and AI predictions.
      </p>

      {/* Weather Data Section */}
      <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold flex items-center space-x-2">
          <FiSun /> <span>Current Weather in {CITY}</span>
        </h2>

        {loading ? (
          <p>Loading weather data...</p>
        ) : weather ? (
          <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="flex items-center space-x-2">
              <FiThermometer className="text-red-500" />
              <span>
                Temperature: <strong>{weather.main.temp}°C</strong>
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <FiWind className="text-blue-500" />
              <span>
                Wind Speed: <strong>{weather.wind.speed} m/s</strong>
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <FiCloud className="text-gray-500" />
              <span>
                Weather: <strong>{weather.weather[0].description}</strong>
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <FiDroplet className="text-blue-300" />
              <span>
                Humidity: <strong>{weather.main.humidity}%</strong>
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <FiCloudRain className="text-gray-700" />
              <span>
                Cloudiness: <strong>{weather.clouds.all}%</strong>
              </span>
            </div>
          </div>
        ) : (
          <p className="text-red-500">Failed to load weather data.</p>
        )}
      </div>

      {/* AI Prediction Section */}
      <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold flex items-center space-x-2">
          <FiSun /> <span>AI Weather Prediction</span>
        </h2>
        <p className="mt-3">🔮 {aiPrediction}</p>
      </div>
    </>
  );
}
