"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Line } from "react-chartjs-2";
import {
  FiSun,
  FiWind,
  FiThermometer,
  FiCheckCircle,
  FiBarChart2,
} from "react-icons/fi";

// ✅ Fix: Register necessary Chart.js components
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Title,
  Tooltip,
  Legend
);

export default function Dashboard() {
  const router = useRouter();
  const [weather, setWeather] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [historicalData, setHistoricalData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_BASE_URL = "http://127.0.0.1:8000/api";
  const token =
    typeof window !== "undefined" ? localStorage.getItem("authToken") : null;

  useEffect(() => {
    if (!token) {
      router.replace("/login");
    } else {
      fetchWeatherData();
    }
  }, [token]);

  // ✅ Fetch Weather Data
  const fetchWeatherData = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${API_BASE_URL}/weather`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error("Failed to fetch weather data.");
      }

      const result = await res.json();

      if (!result.data) {
        throw new Error("Invalid API response format");
      }

      setWeather(result.data);
      fetchPrediction(result.data);
      fetchHistoricalData();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Fetch AI Prediction
  const fetchPrediction = async (weatherData) => {
    try {
      const res = await fetch(`${API_BASE_URL}/predict`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(weatherData),
      });

      if (!res.ok) {
        throw new Error("Failed to fetch AI prediction.");
      }

      const data = await res.json();
      setPrediction(data.data);
    } catch (err) {
      setError(err.message);
    }
  };

  // ✅ Fetch Historical Data
  // ✅ Fetch Historical Data
  const fetchHistoricalData = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/report/trends`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Failed to fetch historical data");

      const data = await res.json();

      // ✅ Fix: Use correct field from database (avg_sunshine_duration)
      setHistoricalData({
        labels: data.efficiency_trends.map((item) => item.date), // Dates
        datasets: [
          {
            label: "Average Sunshine Duration (hrs)", // Chart Label
            data: data.efficiency_trends.map(
              (item) => item.avg_sunshine_duration
            ), // Correct Field
            borderColor: "rgb(34, 197, 94)", // Line Color
            backgroundColor: "rgba(34, 197, 94, 0.2)",
          },
        ],
      });
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className=" bg-gray-100 p-6 max-w-6xl mx-auto  min-h-screen  ">
      <h1 className="text-3xl font-bold">AI-Driven Solar Dashboard</h1>
      <p className="text-gray-600 mb-6">
        Monitor and optimize your solar panel efficiency.
      </p>

      {/* ✅ Responsive Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* ✅ Weather Data Card */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold flex items-center space-x-2">
            <FiSun /> <span>Current Weather</span>
          </h2>
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p className="text-red-500">⚠️ {error}</p>
          ) : (
            weather && (
              <div className="mt-3">
                <p className="flex items-center space-x-2">
                  <FiThermometer />{" "}
                  <span>
                    Temperature: <strong>{weather.temperature}°C</strong>
                  </span>
                </p>
                <p className="flex items-center space-x-2">
                  <FiWind />{" "}
                  <span>
                    Wind Speed: <strong>{weather.wind_speed} km/h</strong>
                  </span>
                </p>
                <p className="flex items-center space-x-2">
                  <FiSun />{" "}
                  <span>
                    Sunlight Hours: <strong>{weather.sunshine_duration}</strong>
                  </span>
                </p>
              </div>
            )
          )}
        </div>

        {/* ✅ AI Predictions Card */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold flex items-center space-x-2">
            <FiCheckCircle /> <span>AI Predictions</span>
          </h2>
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p className="text-red-500">⚠️ {error}</p>
          ) : (
            prediction && (
              <p className="mt-3">
                🔮 Solar Panel Efficiency:{" "}
                <strong>{prediction.predicted_efficiency}%</strong>
              </p>
            )
          )}
        </div>

        {/* ✅ Recommendations Card */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold flex items-center space-x-2">
            <FiCheckCircle /> <span>Recommended Actions</span>
          </h2>
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p className="text-red-500">⚠️ {error}</p>
          ) : (
            prediction && <p className="mt-3">✅ {prediction.recommendation}</p>
          )}
        </div>
      </div>

{/* ✅ Dynamically Render Chart */}
{historicalData ? (
  <div className="w-full h-96 flex items-center justify-center">
    <Line data={historicalData} />
  </div>
) : (
  <p className="text-gray-500 text-center">Loading historical data...</p>
)}

      
    </div>
  );
}
