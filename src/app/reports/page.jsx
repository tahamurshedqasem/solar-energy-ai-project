"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // ✅ Import for redirection
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
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [statistics, setStatistics] = useState({});
  const [efficiencyTrends, setEfficiencyTrends] = useState([]);
  const [environment, setEnvironment] = useState({});
  const [recentData, setRecentData] = useState([]);

  const API_BASE_URL = "http://127.0.0.1:8000/api/report";

  // ✅ Retrieve token from local storage
  const authToken =
    typeof window !== "undefined" ? localStorage.getItem("authToken") : null;

  // ✅ Redirect to login if user is not authenticated
  useEffect(() => {
    if (!authToken) {
      router.push("/login"); // Redirect to login page
    } else {
      fetchReportsData();
    }
  }, [authToken]);

  const fetchReportsData = async () => {
    setLoading(true);
    try {
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      };

      const [statsRes, trendsRes, envRes, recentRes] = await Promise.all([
        fetch(`${API_BASE_URL}/statistics`, { headers }),
        fetch(`${API_BASE_URL}/trends`, { headers }),
        fetch(`${API_BASE_URL}/environment`, { headers }),
        fetch(`${API_BASE_URL}/recent`, { headers }),
      ]);

      if (!statsRes.ok || !trendsRes.ok || !envRes.ok || !recentRes.ok) {
        throw new Error("Failed to fetch report data. Check authentication.");
      }

      const [statsData, trendsData, envData, recentData] = await Promise.all([
        statsRes.json(),
        trendsRes.json(),
        envRes.json(),
        recentRes.json(),
      ]);

      setStatistics(statsData);
      setEfficiencyTrends(trendsData.efficiency_trends || []);
      setEnvironment(envData.average_weather_conditions || {});

      // ✅ Ensure recentData is always an array
      setRecentData(recentData?.recent_weather_records || []);
    } catch (err) {
      console.error("Error fetching report data:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Data for Efficiency Trends Chart
  const efficiencyChartData = {
    labels: efficiencyTrends.map((d) => d.date || "N/A"),
    datasets: [
      {
        label: "Sunshine Duration (hrs)",
        data: efficiencyTrends.map((d) => d.avg_sunshine_duration || 0),
        borderColor: "rgb(255, 159, 64)",
        backgroundColor: "rgba(255, 159, 64, 0.2)",
      },
    ],
  };

  // ✅ Data for Recent Weather Records Chart
 const recentWeatherChartData = {
   labels: recentData.map((d) => d?.recorded_at || "N/A"), // Use correct field from API
   datasets: [
     {
       label: "Solar Radiation (W/m²)",
       data: recentData.map((d) => d?.solar_radiation || 0), // Pull real data dynamically
       borderColor: "rgb(34, 197, 94)",
       backgroundColor: "rgba(34, 197, 94, 0.2)",
     },
   ],
 };



  
  return (
    <>
      <h1 className="text-3xl font-bold">Weather Data Reports</h1>
      <p className="text-gray-600">
        Real-time analytics and efficiency trends based on collected weather
        data.
      </p>

      {error && (
        <p className="text-red-500 mt-3 flex items-center">⚠️ {error}</p>
      )}

      {/* ✅ Overall Weather Statistics */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-3">
          <FiZap className="text-yellow-500 text-3xl" />
          <div>
            <h2 className="text-lg font-semibold">Total Records</h2>
            <p className="text-gray-600">
              {statistics.total_records || "Loading..."}
            </p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-3">
          <FiTrendingUp className="text-green-500 text-3xl" />
          <div>
            <h2 className="text-lg font-semibold">Avg Temperature</h2>
            <p className="text-gray-600">
              {statistics.average_temperature
                ? `${statistics.average_temperature}°C`
                : "Loading..."}
            </p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-3">
          <FiClock className="text-red-500 text-3xl" />
          <div>
            <h2 className="text-lg font-semibold">Avg Humidity</h2>
            <p className="text-gray-600">
              {statistics.average_humidity
                ? `${statistics.average_humidity}%`
                : "Loading..."}
            </p>
          </div>
        </div>
      </div>

      {/* ✅ Sunshine Duration Trends Chart */}
      <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold flex items-center space-x-2">
          <FiTrendingUp /> <span>Sunshine Duration Trends</span>
        </h2>
        {loading ? <p>Loading data...</p> : <Line data={efficiencyChartData} />}
      </div>

      {recentData.length > 0 ? (
        <div className="w-full h-96 flex items-center justify-center">
          <Line data={recentWeatherChartData} />
        </div>
      ) : (
        <p className="text-gray-500 text-center">
          No recent solar data available.
        </p>
      )}
    </>
  );
}
