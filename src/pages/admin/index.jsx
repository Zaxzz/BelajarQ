import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Eye, TrendingDown, TrendingUp, Users } from "lucide-react";
import Layout from "@/components/layout/adminLayout";

const StatBox = ({ icon: Icon, title, value, percentage, trend }) => (
  <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow flex items-center justify-between">
    <div className="flex items-center">
      <div className="bg-blue-50 p-3 rounded-full mr-4">
        <Icon size={32} className="text-blue-600" />
      </div>
      <div>
        <p className="text-gray-500 text-sm">{title}</p>
        <h3 className="text-2xl font-bold text-gray-800">{value}</h3>
      </div>
    </div>
    <div
      className={`flex items-center ${
        trend === "up" ? "text-green-600" : "text-red-600"
      }`}
    >
      {trend === "up" ? <TrendingUp size={20} /> : <TrendingDown size={20} />}
      <span className="ml-1 text-sm">{percentage}</span>
    </div>
  </div>
);

const chartData = [
  { name: "Jan", users: 4000, views: 2400 },
  { name: "Feb", users: 3000, views: 1398 },
  { name: "Mar", users: 2000, views: 9800 },
  { name: "Apr", users: 2780, views: 3908 },
  { name: "May", users: 1890, views: 4800 },
  { name: "Jun", users: 2390, views: 3800 },
  { name: "Jul", users: 3490, views: 4300 },
  { name: "Aug", users: 3490, views: 4300 },
  { name: "Sep", users: 3490, views: 4300 },
  { name: "Oct", users: 3490, views: 4300 },
  { name: "Nov", users: 3490, views: 4300 },
  { name: "Dec", users: 3490, views: 4300 },
];

export default function Dashboard() {
  return (
    <Layout>
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-6">
          <StatBox
            icon={Users}
            title="Total Users"
            value="12,345"
            percentage="+15.3%"
            trend="up"
          />
          <StatBox
            icon={Eye}
            title="Total Views"
            value="54,321"
            percentage="-5.2%"
            trend="down"
          />
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-gray-800">
              User & Views Statistics
            </h3>
            <div className="flex space-x-2">
              <button className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm">
                Monthly
              </button>
              <button className="px-3 py-1 text-gray-600 rounded-full text-sm hover:bg-gray-100">
                Yearly
              </button>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
              <XAxis dataKey="name" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip
                contentStyle={{ backgroundColor: "#fff", borderRadius: "10px" }}
                labelStyle={{ fontWeight: "bold" }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="users"
                stroke="#3b82f6"
                strokeWidth={3}
                dot={{ r: 6, fill: "#3b82f6", strokeWidth: 2, stroke: "white" }}
              />
              <Line
                type="monotone"
                dataKey="views"
                stroke="#10b981"
                strokeWidth={3}
                dot={{ r: 6, fill: "#10b981", strokeWidth: 2, stroke: "white" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </Layout>
  );
}
