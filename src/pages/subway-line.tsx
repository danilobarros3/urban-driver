import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CloudDownload, Search, X } from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
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

export function SubwayLine() {
  return (
    <>
      <div className="flex flex-col gap-10 bg-gray-100 min-h-screen bg-gradient-to-r from-[#1A1F37] to-blue-800 p-10 md:mt-0 mt-12">
        <div className="md:flex items-center gap-2 w-full md:w-[1200px]">
          <span className="text-sm font-semibold text-white">Filtros:</span>
          <Input
            placeholder="Linhas de mêtro"
            className="h-10 md:w-[320px] w-full"
          />
          <Select defaultValue="all">
            <SelectTrigger className="h-10 w-full mt-2 md:mt-0">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos status</SelectItem>
              <SelectItem value="1">Operação Normal</SelectItem>
              <SelectItem value="2">Atrasos Moderados</SelectItem>
              <SelectItem value="3">Interrupção de Serviço</SelectItem>
              <SelectItem value="4">Manutenção Preventiva</SelectItem>
            </SelectContent>
          </Select>
          <Button className="submit w-full mt-2 md:mt-0" variant="secondary">
            <Search className="h-4 w-4 mr-2" />
            Filtrar resultados
          </Button>
          <Button className="button w-full mt-2 md:mt-0" variant="outline">
            <X className="h-4 w-4 mr-2" />
            Remover filtros
          </Button>
          <Button className="button w-full mt-2 md:mt-0" variant="outline">
            <CloudDownload className="h-4 w-4 mr-2" />
            Exportar tabela
          </Button>
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
    </>
  );
}
