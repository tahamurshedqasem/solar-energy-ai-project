// "use client"; // For Next.js App Router (if applicable)
// import { useEffect, useState } from "react";
// import Navbar from "../components/Navbar";
// import Sidebar from "../components/Sidebar";
// import { Line } from "react-chartjs-2";
// import {
//   FiSun,
//   FiWind,
//   FiThermometer,
//   FiCheckCircle,
//   FiBarChart2,
// } from "react-icons/fi";

// // ✅ Fix: Register necessary Chart.js components
// import {
//   Chart as ChartJS,
//   LineElement,
//   PointElement,
//   LinearScale,
//   CategoryScale,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";
// ChartJS.register(
//   LineElement,
//   PointElement,
//   LinearScale,
//   CategoryScale,
//   Title,
//   Tooltip,
//   Legend
// );

// export default function Dashboard() {
//   const [weather, setWeather] = useState(null);
//   const [aiPrediction, setAiPrediction] = useState("Loading...");
//   const [solarEfficiency, setSolarEfficiency] = useState("Calculating...");

//   // Mock Data for Historical Energy Output
//   const historicalData = {
//     labels: ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5"],
//     datasets: [
//       {
//         label: "Solar Energy Output (kWh)",
//         data: [80, 85, 90, 95, 100],
//         borderColor: "rgb(34, 197, 94)",
//         backgroundColor: "rgba(34, 197, 94, 0.2)",
//       },
//     ],
//   };

//   // ✅ Fetch Real-time Weather Data
//   useEffect(() => {
//     fetchWeatherData();
//   }, []);

//   const fetchWeatherData = async () => {
//     try {
//       const res = await fetch(
//         `https://api.openweathermap.org/data/2.5/weather?q=Riyadh&appid=f3b737260d578514bb4c57bc28e96e33&units=metric`
//       );
//       const data = await res.json();

//       if (!data || !data.main) {
//         console.error("Invalid API response:", data);
//         setWeather(null);
//         return;
//       }

//       setWeather(data);

//       // ✅ Ensure `data.main.temp` exists before using it
//       const temp = data.main.temp || 0;
//       const prediction = temp > 30 ? "High Efficiency" : "Moderate Efficiency";
//       setAiPrediction(prediction);

//       // ✅ Ensure valid recommendations
//       const recommendation =
//         temp > 30
//           ? "Keep panels clean and slightly tilted for maximum sunlight absorption."
//           : "Maintain normal positioning, no major adjustments needed.";
//       setSolarEfficiency(recommendation);
//     } catch (error) {
//       console.error("Error fetching weather data:", error);
//       setWeather(null); // Set weather to null to prevent UI crashes
//     }
//   };

//   return (
//     <div className="flex">
//       {/* <Sidebar /> */}
//       <div className="flex-1 p-6">
//         {/* <Navbar /> */}

//         <h1 className="text-3xl font-bold mt-5">AI-Driven Solar Dashboard</h1>
//         <p className="text-gray-600">
//           Monitor and optimize your solar panel efficiency.
//         </p>

//         {/* ✅ Weather Data Section */}
//         <div className="mt-5 bg-white p-6 rounded-lg shadow-md">
//           <h2 className="text-xl font-semibold flex items-center space-x-2">
//             <FiSun /> <span>Current Weather</span>
//           </h2>
//           {weather ? (
//             <div className="mt-3">
//               <p className="flex items-center space-x-2">
//                 <FiThermometer />{" "}
//                 <span>
//                   Temperature: <strong>{weather.main.temp}°C</strong>
//                 </span>
//               </p>
//               <p className="flex items-center space-x-2">
//                 <FiWind />{" "}
//                 <span>
//                   Wind Speed: <strong>{weather.wind.speed} m/s</strong>
//                 </span>
//               </p>
//               <p className="flex items-center space-x-2">
//                 <FiSun />{" "}
//                 <span>
//                   Sunlight Intensity:{" "}
//                   <strong>
//                     {weather.main.temp > 30 ? "High" : "Moderate"}
//                   </strong>
//                 </span>
//               </p>
//             </div>
//           ) : (
//             <p>Loading weather data...</p>
//           )}
//         </div>

//         {/* ✅ AI Predictions Section */}
//         <div className="mt-5 bg-white p-6 rounded-lg shadow-md">
//           <h2 className="text-xl font-semibold flex items-center space-x-2">
//             <FiCheckCircle /> <span>AI Predictions</span>
//           </h2>
//           <p className="mt-3">
//             🔮 Solar Panel Efficiency: <strong>{aiPrediction}</strong>
//           </p>
//         </div>

//         {/* ✅ Recommendations Section */}
//         <div className="mt-5 bg-white p-6 rounded-lg shadow-md">
//           <h2 className="text-xl font-semibold flex items-center space-x-2">
//             <FiCheckCircle /> <span>Recommended Actions</span>
//           </h2>
//           <p className="mt-3">✅ {solarEfficiency}</p>
//         </div>

//         {/* ✅ Historical Energy Data Graph */}
//         <div className="mt-5 bg-white p-6 rounded-lg shadow-md">
//           <h2 className="text-xl font-semibold flex items-center space-x-2">
//             <FiBarChart2 /> <span>Historical Solar Energy Output</span>
//           </h2>
//           <Line data={historicalData} />
//         </div>
//       </div>
//     </div>
//   );
// }
"use client";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
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
  const [weather, setWeather] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const OPENWEATHER_API_KEY = "5bc44ba6c1c813e7d0827b18485dfa94";
  const CITY = "Riyadh"; // Change to your desired city
  const FLASK_API_URL = "http://127.0.0.1:5000/predict"; // Flask API Endpoint

  useEffect(() => {
    fetchWeatherData();
  }, []);

  const fetchWeatherData = async () => {
    setLoading(true);
    setError(null);

    try {
      // ✅ Fetch Real-time Weather Data from OpenWeather API
      const res = await fetch(
        "http://api.openweathermap.org/data/2.5/weather?q=Riyadh&appid=f3b737260d578514bb4c57bc28e96e33&units=metric"
      );
      const data = await res.json();

      if (!data || !data.main) {
        throw new Error("Invalid response from OpenWeather API");
      }

      // ✅ Extract Required Attributes
      const weatherData = {
        temperature: data.main.temp,
        humidity: data.main.humidity,
        wind_speed: data.wind.speed,
        cloud_cover: data.clouds.all,
        solar_radiation: Math.max(0, 1000 - data.clouds.all * 10), // Estimated solar radiation
        sunlight_hours: Math.max(0, 12 - data.clouds.all / 10), // Estimated sunlight hours
      };

      setWeather(weatherData);

      // ✅ Send Data to Flask AI API for Prediction
      fetchPrediction(weatherData);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const fetchPrediction = async (weatherData) => {
    try {
      const response = await fetch(FLASK_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(weatherData),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Error fetching prediction");
      }

      setPrediction(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex">
    
      <div className="flex-1 p-6">
       

        <h1 className="text-3xl font-bold mt-5">AI-Driven Solar Dashboard</h1>
        <p className="text-gray-600">
          Monitor and optimize your solar panel efficiency.
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
                    Sunlight Hours:{" "}
                    <strong>{weather.sunlight_hours.toFixed(1)}</strong>
                  </span>
                </p>
              </div>
            )
          )}
        </div>

        {/* ✅ AI Predictions Section */}
        <div className="mt-5 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold flex items-center space-x-2">
            <FiCheckCircle /> <span>AI Predictions</span>
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
            <FiCheckCircle /> <span>Recommended Actions</span>
          </h2>
          {loading ? (
            <p>Loading recommendations...</p>
          ) : error ? (
            <p className="text-red-500">⚠️ {error}</p>
          ) : (
            prediction && <p className="mt-3">✅ {prediction.recommendation}</p>
          )}
        </div>

        {/* ✅ Historical Energy Data Graph */}
        <div className="mt-5 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold flex items-center space-x-2">
            <FiBarChart2 /> <span>Historical Solar Energy Output</span>
          </h2>
          <Line
            data={{
              labels: ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5"],
              datasets: [
                {
                  label: "Solar Energy Output (kWh)",
                  data: [80, 85, 90, 95, 100],
                  borderColor: "rgb(34, 197, 94)",
                  backgroundColor: "rgba(34, 197, 94, 0.2)",
                },
              ],
            }}
          />
        </div>
      </div>
    </div>
  );
}
