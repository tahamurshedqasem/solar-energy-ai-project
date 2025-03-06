import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

export default function Dashboard() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6">
        <Navbar />
        <h1 className="text-2xl font-bold mt-5">
          Welcome to AI Solar Dashboard
        </h1>
        <p className="text-gray-600">
          Monitor and optimize your solar panel efficiency.
        </p>
      </div>
    </div>
  );
}
