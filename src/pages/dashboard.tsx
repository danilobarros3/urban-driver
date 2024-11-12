import { TrainFront, TrainTrack } from "lucide-react";
import { useEffect, useState } from "react";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";
import { TransportLinesTable } from "@/components/transports-table";
import api from "@/services";

export function Dashboard() {
  const [totalLines, setTotalLines] = useState(0);
  const [_, setLinesInOperation] = useState(0);
  const [operationLines, setOperationLines] = useState([]);
  const [chartData, setChartData] = useState([]);

  const getLinesData = async () => {
    try {
      const { data } = await api.get("api/lines");
      setTotalLines(data.length);

      const filteredLines = data.filter(
        (line: any) => line.classLine === "operacao normal"
      );
      setLinesInOperation(filteredLines.length);
    } catch (error) {
      console.error(error);
    }
  };

  const getOperations = async () => {
    try {
      const { data } = await api.get("api/operations");
      setOperationLines(data);

      const processedData = data.map((entry: any) => ({
        timestamp: new Date(entry.lastUpdated).getTime(),
        descriptionStatusLine: entry.descriptionStatusLine,
      }));

      setChartData(processedData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getLinesData();
    getOperations();
  }, []);

  return (
    <div className="flex flex-col gap-10 min-h-screen bg-gradient-to-r from-[#1A1F37] to-blue-800 md:p-10 p-5 mt-20 md:mt-0">
      <h1 className="text-3xl font-bold text-center mb-10 text-white hidden md:block">
        Viabilização dos mêtros em SP
      </h1>

      <div className="flex gap-10">
        <div className="w-full md:h-20 h-30 bg-white rounded p-5 md:flex md:justify-between shadow-2xl">
          <div className="grid justify-center text-center md:block md:text-start">
            <p>Total de linhas</p>
            <p className="text-sm font-medium text-gray-500 mb-3">
              {totalLines}
            </p>
          </div>
          <div className="flex md:justify-end items-center justify-center">
            <TrainTrack />
          </div>
        </div>

        <div className="w-full md:h-20 h-30 bg-white rounded p-5 md:flex md:justify-between shadow-2xl">
          <div className="grid justify-center text-center md:block md:text-start">
            <p>Todas as linhas em operações</p>
            <p className="text-sm font-medium text-gray-500 mb-3">
              {operationLines.length}
            </p>
          </div>
          <div className="flex md:justify-end items-center justify-center">
            <TrainFront />
          </div>
        </div>
      </div>

      <div className="grid gap-8 w-full">
        <div className="bg-white p-5 shadow-lg rounded-lg lg:col-span-3">
          <h2 className="text-xl font-semibold mb-5">Operações</h2>
          <ResponsiveContainer width="100%" height={400}>
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="colorWave" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3498db" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#3498db" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="timestamp"
                tickFormatter={(time) =>
                  new Date(time).toLocaleDateString("pt-BR")
                }
                tick={{ fontSize: 12 }}
              />
              <YAxis
                type="category"
                dataKey="descriptionStatusLine"
                width={150}
                tickFormatter={(value) => `${value}`}
                tick={{ fontSize: 12 }}
              />
              <Tooltip
                labelFormatter={(time) =>
                  new Date(time).toLocaleDateString("pt-BR")
                }
              />
              <Area
                type="monotone"
                dataKey="descriptionStatusLine"
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
  );
}
