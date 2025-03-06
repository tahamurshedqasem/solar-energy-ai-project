// "use client";
// import { useEffect, useState } from "react";
// import Layout from "../../app/layout";
// import { Line } from "react-chartjs-2";
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
// import { FiBarChart2, FiTrendingUp, FiZap, FiClock } from "react-icons/fi";

// // ✅ Register Chart.js Components
// ChartJS.register(
//   LineElement,
//   PointElement,
//   LinearScale,
//   CategoryScale,
//   Title,
//   Tooltip,
//   Legend
// );

// export default function Reports() {
//   const [loading, setLoading] = useState(true);
//   const [energyData, setEnergyData] = useState([]);
//   const [efficiencyTrends, setEfficiencyTrends] = useState([]);
//   const [summary, setSummary] = useState({
//     avgOutput: 0,
//     peakTime: "",
//     lowestTime: "",
//   });

//   useEffect(() => {
//     fetchReportData();
//   }, []);

//   const fetchReportData = async () => {
//     try {
//       // Simulated historical solar energy data
//       const mockData = [
//         { day: "Day 1", output: 80 },
//         { day: "Day 2", output: 85 },
//         { day: "Day 3", output: 90 },
//         { day: "Day 4", output: 75 },
//         { day: "Day 5", output: 95 },
//         { day: "Day 6", output: 88 },
//         { day: "Day 7", output: 92 },
//       ];

//       const mockEfficiency = [78, 82, 87, 70, 91, 85, 90];

//       setEnergyData(mockData);
//       setEfficiencyTrends(mockEfficiency);

//       // Calculate summary insights
//       const avgOutput = (
//         mockData.reduce((sum, d) => sum + d.output, 0) / mockData.length
//       ).toFixed(2);
//       const peakTime = mockData.reduce((max, d) =>
//         d.output > max.output ? d : max
//       ).day;
//       const lowestTime = mockData.reduce((min, d) =>
//         d.output < min.output ? d : min
//       ).day;

//       setSummary({ avgOutput, peakTime, lowestTime });
//       setLoading(false);
//     } catch (error) {
//       console.error("Error fetching report data:", error);
//       setLoading(false);
//     }
//   };

//   // Chart Data
//   const energyChartData = {
//     labels: energyData.map((d) => d.day),
//     datasets: [
//       {
//         label: "Solar Energy Output (kWh)",
//         data: energyData.map((d) => d.output),
//         borderColor: "rgb(34, 197, 94)",
//         backgroundColor: "rgba(34, 197, 94, 0.2)",
//       },
//     ],
//   };

//   const efficiencyChartData = {
//     labels: energyData.map((d) => d.day),
//     datasets: [
//       {
//         label: "Predicted Efficiency (%)",
//         data: efficiencyTrends,
//         borderColor: "rgb(255, 159, 64)",
//         backgroundColor: "rgba(255, 159, 64, 0.2)",
//       },
//     ],
//   };

//   return (
//     <Layout>
//       <h1 className="text-3xl font-bold">Solar Energy Reports</h1>
//       <p className="text-gray-600">
//         Historical performance and AI predictions.
//       </p>

//       {/* Summary Section */}
//       <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
//         <div className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-3">
//           <FiZap className="text-yellow-500 text-3xl" />
//           <div>
//             <h2 className="text-lg font-semibold">Avg Energy Output</h2>
//             <p className="text-gray-600">{summary.avgOutput} kWh</p>
//           </div>
//         </div>

//         <div className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-3">
//           <FiTrendingUp className="text-green-500 text-3xl" />
//           <div>
//             <h2 className="text-lg font-semibold">Peak Production</h2>
//             <p className="text-gray-600">{summary.peakTime}</p>
//           </div>
//         </div>

//         <div className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-3">
//           <FiClock className="text-red-500 text-3xl" />
//           <div>
//             <h2 className="text-lg font-semibold">Lowest Production</h2>
//             <p className="text-gray-600">{summary.lowestTime}</p>
//           </div>
//         </div>
//       </div>

//       {/* Energy Output Chart */}
//       <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
//         <h2 className="text-xl font-semibold flex items-center space-x-2">
//           <FiBarChart2 /> <span>Solar Energy Output Over Time</span>
//         </h2>
//         {loading ? <p>Loading data...</p> : <Line data={energyChartData} />}
//       </div>

//       {/* Efficiency Prediction Chart */}
//       <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
//         <h2 className="text-xl font-semibold flex items-center space-x-2">
//           <FiTrendingUp /> <span>AI-Predicted Efficiency Trends</span>
//         </h2>
//         {loading ? <p>Loading data...</p> : <Line data={efficiencyChartData} />}
//       </div>
//     </Layout>
//   );
// }
"use client";
import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
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
import {
  FiBarChart2,
  FiTrendingUp,
  FiZap,
  FiClock,
  FiSun,
  FiWind,
  FiCloud,
  FiThermometer,
} from "react-icons/fi";

// ✅ Register Chart.js Components
ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Title,
  Tooltip,
  Legend
);

export default function Reports() {
  const [loading, setLoading] = useState(true);
  const [weather, setWeather] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState(null);
  const [energyData, setEnergyData] = useState([]);
  const [efficiencyTrends, setEfficiencyTrends] = useState([]);

  const OPENWEATHER_API_KEY = "5bc44ba6c1c813e7d0827b18485dfa94"; // Replace with your API Key
  const CITY = "Riyadh";
  const FLASK_API_URL = "http://127.0.0.1:5000/predict"; // Flask API URL

  useEffect(() => {
    fetchWeatherAndPrediction();
  }, []);

  const fetchWeatherAndPrediction = async () => {
    setLoading(true);
    setError(null);

    try {
      // ✅ Fetch Weather Data from OpenWeather API
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${CITY}&appid=${OPENWEATHER_API_KEY}&units=metric`
      );

      if (!res.ok) {
        throw new Error("Failed to fetch weather data");
      }

      const data = await res.json();
      console.log("Weather API Response:", data);

      const weatherData = {
        temperature: data.main.temp,
        humidity: data.main.humidity,
        wind_speed: data.wind.speed,
        cloud_cover: data.clouds.all,
        solar_radiation: Math.max(0, 1000 - data.clouds.all * 10), // Estimate solar radiation
        sunlight_hours: Math.max(0, 12 - data.clouds.all / 10), // Estimate sunlight hours
      };

      setWeather(weatherData);

      // ✅ Send Data to Flask API for AI Prediction
      const aiResponse = await fetch(FLASK_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(weatherData),
      });

      if (!aiResponse.ok) {
        throw new Error("Failed to fetch AI predictions from Flask API");
      }

      const aiData = await aiResponse.json();
      console.log("Flask API Response:", aiData);
      setPrediction(aiData);

      // ✅ Store dynamic efficiency trends
      setEnergyData((prevData) => [
        ...prevData,
        {
          day: `Day ${prevData.length + 1}`,
          output: aiData.predicted_efficiency,
        },
      ]);
      setEfficiencyTrends((prevTrends) => [
        ...prevTrends,
        aiData.predicted_efficiency,
      ]);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Chart Data (Generated Dynamically)
  const energyChartData = {
    labels: energyData.map((d) => d.day),
    datasets: [
      {
        label: "Solar Energy Output (kWh)",
        data: energyData.map((d) => d.output),
        borderColor: "rgb(34, 197, 94)",
        backgroundColor: "rgba(34, 197, 94, 0.2)",
      },
    ],
  };

  const efficiencyChartData = {
    labels: energyData.map((d) => d.day),
    datasets: [
      {
        label: "Predicted Efficiency (%)",
        data: efficiencyTrends,
        borderColor: "rgb(255, 159, 64)",
        backgroundColor: "rgba(255, 159, 64, 0.2)",
      },
    ],
  };

  return (
    <>
      <h1 className="text-3xl font-bold">Solar Energy Reports</h1>
      <p className="text-gray-600">
        Real-time weather, AI predictions, and performance trends.
      </p>

      {/* Weather & AI Prediction Section */}
      <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
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
                <FiCloud />{" "}
                <span>
                  Cloud Cover: <strong>{weather.cloud_cover}%</strong>
                </span>
              </p>
            </div>
          )
        )}
      </div>

      {/* AI Predictions Section */}
      <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold flex items-center space-x-2">
          <FiTrendingUp /> <span>AI Predictions</span>
        </h2>
        {loading ? (
          <p>Loading AI Prediction...</p>
        ) : prediction ? (
          <p>
            🔮 Efficiency: <strong>{prediction.predicted_efficiency}%</strong>
          </p>
        ) : (
          <p className="text-red-500">⚠️ Failed to fetch AI predictions</p>
        )}
      </div>

      {/* Energy Output Chart */}
      <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold flex items-center space-x-2">
          <FiBarChart2 /> <span>Solar Energy Output Over Time</span>
        </h2>
        <Line data={energyChartData} />
      </div>

      {/* Efficiency Prediction Chart */}
      <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold flex items-center space-x-2">
          <FiTrendingUp /> <span>AI-Predicted Efficiency Trends</span>
        </h2>
        <Line data={efficiencyChartData} />
      </div>
    </>
  );
}
