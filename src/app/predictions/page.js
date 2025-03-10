// "use client";
// import { useEffect, useState } from "react";
// import Layout from "../../app/layout";
// import {
//   FiSun,
//   FiWind,
//   FiThermometer,
//   FiCloud,
//   FiDroplet,
//   FiTrendingUp,
// } from "react-icons/fi";

// // OpenWeather API Key (Replace with your actual API key)
// const API_KEY = "f3b737260d578514bb4c57bc28e96e33";
// const CITY = "Riyadh"; // Change to the desired city

// export default function Predictions() {
//   const [weather, setWeather] = useState(null);
//   const [aiPrediction, setAiPrediction] = useState("Loading...");
//   const [recommendation, setRecommendation] = useState(
//     "Fetching recommendation..."
//   );
//   const [loading, setLoading] = useState(true);

//   // Fetch Weather Data
//   useEffect(() => {
//     fetchWeatherData();
//   }, []);

//   const fetchWeatherData = async () => {
//     try {
//       const res = await fetch(
//         `https://api.openweathermap.org/data/2.5/weather?q=${CITY}&appid=${API_KEY}&units=metric`
//       );
//       const data = await res.json();

//       if (!data || !data.main) {
//         console.error("Invalid API response:", data);
//         setWeather(null);
//         setLoading(false);
//         return;
//       }

//       setWeather(data);
//       setLoading(false);

//       // ✅ AI-driven prediction logic
//       const temp = data.main.temp || 0;
//       const windSpeed = data.wind.speed || 0;
//       const cloudiness = data.clouds.all || 0;

//       let prediction = "Stable conditions expected.";
//       let panelRecommendation = "No major adjustments needed.";

//       if (temp > 35) {
//         prediction = "High temperatures expected, energy output may be high.";
//         panelRecommendation =
//           "Ensure panels are well-ventilated to prevent overheating.";
//       } else if (temp < 15) {
//         prediction =
//           "Low temperatures expected, performance may be slightly reduced.";
//         panelRecommendation = "Angle panels to capture maximum sunlight.";
//       }

//       if (windSpeed > 10) {
//         prediction = "Strong winds detected, potential dust accumulation.";
//         panelRecommendation =
//           "Check panels for dust buildup after windy conditions.";
//       }

//       if (cloudiness > 70) {
//         prediction =
//           "Heavy cloud cover detected, solar efficiency may decrease.";
//         panelRecommendation =
//           "Use energy storage to compensate for reduced sunlight.";
//       }

//       setAiPrediction(prediction);
//       setRecommendation(panelRecommendation);
//     } catch (error) {
//       console.error("Error fetching weather data:", error);
//       setWeather(null);
//       setLoading(false);
//     }
//   };

//   return (
//     <Layout>
//       <h1 className="text-3xl font-bold">AI Weather Prediction</h1>
//       <p className="text-gray-600">
//         AI-driven insights to optimize your solar panel efficiency.
//       </p>

//       {/* ✅ Weather Data Section */}
//       <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
//         <h2 className="text-xl font-semibold flex items-center space-x-2">
//           <FiSun /> <span>Current Weather in {CITY}</span>
//         </h2>

//         {loading ? (
//           <p>Loading weather data...</p>
//         ) : weather ? (
//           <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-4">
//             <div className="flex items-center space-x-2">
//               <FiThermometer className="text-red-500" />
//               <span>
//                 Temperature: <strong>{weather.main.temp}°C</strong>
//               </span>
//             </div>
//             <div className="flex items-center space-x-2">
//               <FiWind className="text-blue-500" />
//               <span>
//                 Wind Speed: <strong>{weather.wind.speed} m/s</strong>
//               </span>
//             </div>
//             <div className="flex items-center space-x-2">
//               <FiCloud className="text-gray-500" />
//               <span>
//                 Cloudiness: <strong>{weather.clouds.all}%</strong>
//               </span>
//             </div>
//             <div className="flex items-center space-x-2">
//               <FiDroplet className="text-blue-300" />
//               <span>
//                 Humidity: <strong>{weather.main.humidity}%</strong>
//               </span>
//             </div>
//           </div>
//         ) : (
//           <p className="text-red-500">Failed to load weather data.</p>
//         )}
//       </div>

//       {/* ✅ AI Predictions Section */}
//       <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
//         <h2 className="text-xl font-semibold flex items-center space-x-2">
//           <FiTrendingUp /> <span>AI Prediction</span>
//         </h2>
//         <p className="mt-3">🔮 {aiPrediction}</p>
//       </div>

//       {/* ✅ AI Recommendations Section */}
//       <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
//         <h2 className="text-xl font-semibold flex items-center space-x-2">
//           <FiSun /> <span>Solar Panel Adjustment Advice</span>
//         </h2>
//         <p className="mt-3">✅ {recommendation}</p>
//       </div>
//     </Layout>
//   );
// }
"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Line } from "react-chartjs-2";
import {
  FiSun,
  FiWind,
  FiThermometer,
  FiCloud,
  FiDroplet,
  FiTrendingUp,
  FiBarChart2, // ✅ Fix: Added missing import
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

export default function Predictions() {
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
      router.replace("/login"); // ✅ Redirect if not authenticated
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

      if (!res.ok) throw new Error("Failed to fetch weather data.");

      const result = await res.json();
      if (!result.data) throw new Error("Invalid API response format");

      // ✅ Ensure all fields exist and use default values if missing
      const weatherData = {
        temperature: result.data.temperature ?? 25,
        humidity: result.data.humidity ?? 50,
        cloud_coverage: result.data.cloud_coverage ?? 0,
        wind_speed: result.data.wind_speed ?? 5,
        solar_radiation: result.data.solar_radiation ?? 500,
        sunlight_hours: result.data.sunlight_hours ?? 8,
      };

      setWeather(weatherData);
      fetchPrediction(weatherData);
      fetchHistoricalData();
    } catch (err) {
      console.error("Weather Fetch Error:", err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Fetch AI Prediction from Laravel API
  const fetchPrediction = async (weatherData) => {
    try {
      const predictionInput = {
        temperature: weatherData.temperature,
        humidity: weatherData.humidity,
        cloud_coverage: weatherData.cloud_coverage,
        wind_speed: weatherData.wind_speed,
        solar_radiation: weatherData.solar_radiation,
        sunlight_hours: weatherData.sunlight_hours,
      };

      console.log("Sending Prediction Request with:", predictionInput);

      const res = await fetch(`${API_BASE_URL}/predict`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(predictionInput),
      });

      if (!res.ok) throw new Error("Failed to fetch AI prediction.");

      const data = await res.json();
      console.log("Prediction Response:", data);

      setPrediction(data.data);
    } catch (err) {
      console.error("Prediction Fetch Error:", err.message);
      setError(err.message);
    }
  };

  // ✅ Fetch Historical Solar Efficiency Data
  const fetchHistoricalData = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/report/trends`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Failed to fetch historical data.");

      const data = await res.json();
      setHistoricalData({
        labels: data.efficiency_trends.map((item) => item.date),
        datasets: [
          {
            label: "Solar Panel Efficiency (%)",
            data: data.efficiency_trends.map((item) => item.avg_efficiency),
            borderColor: "rgb(34, 197, 94)",
            backgroundColor: "rgba(34, 197, 94, 0.2)",
          },
        ],
      });
    } catch (err) {
      console.error("Historical Data Fetch Error:", err.message);
      setError(err.message);
    }
  };

  return (
    <div className="flex">
      <div className="flex-1 p-6">
        <h1 className="text-3xl font-bold mt-5">AI Weather Prediction</h1>
        <p className="text-gray-600">
          AI-driven insights to optimize your solar panel efficiency.
        </p>

        {/* ✅ Weather Data Section */}
        <div className="mt-5 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold flex items-center space-x-2">
            <FiSun /> <span>Current Weather</span>
          </h2>
          {loading ? (
            <p>Loading weather data...</p>
          ) : error ? (
            <p className="text-red-500">⚠️ {error}</p>
          ) : (
            weather && (
              <div className="mt-3 grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="flex items-center space-x-2">
                  <FiThermometer className="text-red-500" />
                  <span>
                    Temperature: <strong>{weather.temperature}°C</strong>
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <FiWind className="text-blue-500" />
                  <span>
                    Wind Speed:{" "}
                    <strong>{weather.wind_speed.toFixed(1)} km/h</strong>
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <FiCloud className="text-gray-500" />
                  <span>
                    Cloudiness:{" "}
                    <strong>{weather.cloud_coverage.toFixed(1)}%</strong>
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <FiDroplet className="text-blue-300" />
                  <span>
                    Humidity: <strong>{weather.humidity}%</strong>
                  </span>
                </div>
              </div>
            )
          )}
        </div>

        {/* ✅ AI Predictions Section */}
        <div className="mt-5 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold flex items-center space-x-2">
            <FiTrendingUp /> <span>AI Prediction</span>
          </h2>
          {loading ? (
            <p>Loading AI Prediction...</p>
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

        {/* ✅ Recommendations Section */}
        <div className="mt-5 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold flex items-center space-x-2">
            <FiSun /> <span>Solar Panel Adjustment Advice</span>
          </h2>
          {loading ? (
            <p>Loading recommendations...</p>
          ) : error ? (
            <p className="text-red-500">⚠️ {error}</p>
          ) : (
            prediction && <p className="mt-3">✅ {prediction.recommendation}</p>
          )}
        </div>

        {/* ✅ Historical Solar Efficiency Graph */}
        <div className="mt-5 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold flex items-center space-x-2">
            <FiBarChart2 /> <span>Historical Solar Efficiency</span>
          </h2>
          {historicalData && <Line data={historicalData} />}
        </div>
      </div>
    </div>
  );
}
