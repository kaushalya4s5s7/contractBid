import { Activity, Users, DollarSign, Building2 } from "lucide-react";
import { MetricCard } from "../components/overview/MetricCard";
import { TenderList } from "../components/tenders/TenderList";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const pieData = [
  { name: "Open", value: 40 },
  { name: "Pending", value: 30 },
  { name: "Closed", value: 30 },
];

const barData = [
  { name: "Jan", Tenders: 10 },
  { name: "Feb", Tenders: 15 },
  { name: "Mar", Tenders: 20 },
  { name: "Apr", Tenders: 8 },
  { name: "May", Tenders: 12 },
];

const COLORS = ["#9333EA", "#7C3AED", "#6366F1"];

export function Dashboard() {
  return (
    <div className="min-h-screen w-full flex flex-col bg-black p-6">
      {/* Dashboard Title */}
      <h1 className="mb-8 text-4xl font-bold text-white text-center">
        🚀 Admin Dashboard
      </h1>

      {/* Metrics Section */}
      <div className="mb-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 w-full">
        <MetricCard
          title="Active Tenders"
          value="12"
          icon={<Activity />}
          status="success"
        />
        <MetricCard
          title="Pending Approvals"
          value="5"
          icon={<Users />}
          status="warning"
        />
        <MetricCard
          title="Total Budget"
          value="$2.5M"
          icon={<DollarSign />}
          status="success"
        />
        <MetricCard
          title="Contractors"
          value="28"
          icon={<Building2 />}
          status="success"
        />
      </div>

      {/* Data Visualization Section */}
      <div className="mb-10 grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Pie Chart */}
        <div className="rounded-lg bg-gray-800 p-6 shadow-xl">
          <h2 className="mb-4 text-2xl font-semibold text-white">
            Tender Status Breakdown
          </h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#82ca9d"
                label
              >
                {pieData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart */}
        <div className="rounded-lg bg-gray-800 p-6 shadow-xl">
          <h2 className="mb-4 text-2xl font-semibold text-white">
            Monthly Tenders Overview
          </h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={barData}>
              <XAxis dataKey="name" stroke="#ddd" />
              <YAxis stroke="#ddd" />
              <Tooltip />
              <Bar dataKey="Tenders" fill="#9333EA" barSize={30} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Tenders Section */}
      <div className="flex-1 w-full rounded-lg bg-gray-800 p-6">
        <h2 className="mb-6 text-2xl font-semibold text-white">
          Recent Tenders
        </h2>
        <TenderList />
      </div>
    </div>
  );
}
