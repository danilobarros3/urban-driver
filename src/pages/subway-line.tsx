import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import api from "@/services";
import { Search, X } from "lucide-react";
import { useEffect, useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export function SubwayLine() {
  const [_, setOperationLines] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const getOperations = async () => {
    try {
      const payload =
        startDate && endDate ? { start: startDate, end: endDate } : {};

      const { data } = await api.post("api/operations/period", payload);
      setOperationLines(data);

      const processedData = data.map((entry: any) => ({
        timestamp: new Date(entry.lastUpdated).getTime(),
        descriptionStatusLine: entry.descriptionStatusLine,
      }));
      console.log("Processed Chart Data:", processedData);

      setChartData(processedData);
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    }
  };

  useEffect(() => {
    getOperations();
  }, []);

  return (
    <>
      <div className="flex flex-col gap-10 bg-gray-100 min-h-screen bg-gradient-to-r from-[#1A1F37] to-blue-800 p-10 md:mt-0 mt-12">
        <div className="xl:flex items-center gap-2 w-full xl:w-[1200px]">
          <span className="text-sm font-semibold text-white">Filtros:</span>
          <Input
            type="date"
            className="h-10 w-full mt-2"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <Input
            type="date"
            className="h-10 w-full mt-2 "
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />

          <Button
            className="submit w-full mt-2"
            variant="secondary"
            onClick={getOperations}
          >
            <Search className="h-4 w-4 mr-2" />
            Filtrar resultados
          </Button>
          <Button
            className="button w-full mt-2"
            variant="outline"
            onClick={() => {
              setStartDate("");
              setEndDate("");
              setChartData([]);
              getOperations();
            }}
          >
            <X className="h-4 w-4 mr-2" />
            Remover filtros
          </Button>
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
      </div>
    </>
  );
}
