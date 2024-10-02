import { TransportLinesTable } from "@/components/transports-table";
import { User, Wallet } from "lucide-react";
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";

const data = [
  { name: "Jan", sales: 4000, profit: 2400 },
  { name: "Feb", sales: 3000, profit: 1398 },
  { name: "Mar", sales: 2000, profit: 9800 },
  { name: "Apr", sales: 2780, profit: 3908 },
  { name: "May", sales: 1890, profit: 4800 },
  { name: "Jun", sales: 2390, profit: 3800 },
  { name: "Jul", sales: 3490, profit: 4300 },
];

const pieData = [
  { name: "Group A", value: 400 },
  { name: "Group B", value: 300 },
  { name: "Group C", value: 300 },
  { name: "Group D", value: 200 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const Dashboard: React.FC = () => {
  return (
    <>
      <div className="flex flex-col gap-10 min-h-screen bg-gradient-to-r from-[#1A1F37] to-blue-800 md:p-10 p-5 mt-20 md:mt-0">
        <h1 className="text-3xl font-bold text-center mb-10 text-white hidden md:block">
          Viabilização dos metros em SP
        </h1>
        <div className="flex gap-10">
          <div className="w-full md:h-20 h-30 bg-white rounded p-5 md:flex md:justify-between shadow-2xl">
            <div className="grid justify-center text-center md:block md:text-start">
              <p>Todas pesquisas</p>
              <p className="text-sm font-medium text-gray-500 mb-3">
                $2,500,000
              </p>
            </div>
            <div className="flex md:justify-end items-center justify-center">
              <Wallet />
            </div>
          </div>

          <div className="w-full md:h-20 h-30 bg-white rounded p-5 md:flex md:justify-between shadow-2xl">
            <div className="grid justify-center text-center md:block md:text-start">
              <p>Todos usuários</p>
              <p className="text-sm font-medium text-gray-500 mb-3">
                10.000
              </p>
            </div>
            <div className="flex md:justify-end items-center justify-center">
              <User />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
          <div className="bg-gradient-to-t from-purple-300 to-blue-400 p-5 shadow-lg rounded-lg">
            <h2 className="text-xl font-semibold mb-5">Sales Line Chart</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="sales"
                  stroke="#8884d8"
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white p-5 shadow-lg rounded-lg">
            <h2 className="text-xl font-semibold mb-5">Profit Bar Chart</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="profit" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white p-5 shadow-lg rounded-lg">
            <h2 className="text-xl font-semibold mb-5">
              Distribution Pie Chart
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  label
                >
                  {pieData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white p-5 shadow-lg rounded-lg lg:col-span-3">
            <h2 className="text-xl font-semibold mb-5">
              Sales Area Chart (Wave)
            </h2>
            <ResponsiveContainer width="100%" height={400}>
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorWave" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3498db" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#3498db" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="sales"
                  stroke="#3498db"
                  fillOpacity={1}
                  fill="url(#colorWave)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div>
          <TransportLinesTable />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
