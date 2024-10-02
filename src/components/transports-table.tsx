import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useMediaQuery } from 'react-responsive';

const transportLines = [
  {
    last_updated: "2024-10-01 20:31:02.480387",
    name_line: "Linha 3 - Vermelha",
    status_line: {
      code: 1,
      status_color: "Verde",
      description: "Operação Normal",
    },
  },
  {
    last_updated: "2024-10-01 20:35:45.112345",
    name_line: "Linha 4 - Amarela",
    status_line: {
      code: 2,
      status_color: "Amarelo",
      description: "Atrasos Moderados",
    },
  },
  {
    last_updated: "2024-10-01 20:40:12.678910",
    name_line: "Linha 1 - Azul",
    status_line: {
      code: 3,
      status_color: "Vermelho",
      description: "Interrupção de Serviço",
    },
  },
  {
    last_updated: "2024-10-01 21:00:00.123456",
    name_line: "Linha 2 - Verde",
    status_line: {
      code: 1,
      status_color: "Verde",
      description: "Operação Normal",
    },
  },
  {
    last_updated: "2024-10-01 21:10:22.780987",
    name_line: "Linha 5 - Laranja",
    status_line: {
      code: 4,
      status_color: "Laranja",
      description: "Manutenção Preventiva",
    },
  },
  {
    last_updated: "2024-10-01 21:20:15.902384",
    name_line: "Linha 6 - Rosa",
    status_line: {
      code: 1,
      status_color: "Verde",
      description: "Operação Normal",
    },
  },
  {
    last_updated: "2024-10-01 21:30:50.173849",
    name_line: "Linha 7 - Lilás",
    status_line: {
      code: 2,
      status_color: "Amarelo",
      description: "Atrasos Moderados",
    },
  },
  {
    last_updated: "2024-10-01 21:40:33.987654",
    name_line: "Linha 8 - Azul Claro",
    status_line: {
      code: 3,
      status_color: "Vermelho",
      description: "Interrupção de Serviço",
    },
  },
  {
    last_updated: "2024-10-01 21:50:27.560789",
    name_line: "Linha 9 - Verde Escuro",
    status_line: {
      code: 1,
      status_color: "Verde",
      description: "Operação Normal",
    },
  },
  {
    last_updated: "2024-10-01 22:00:12.647891",
    name_line: "Linha 10 - Marrom",
    status_line: {
      code: 4,
      status_color: "Laranja",
      description: "Manutenção Preventiva",
    },
  },
  {
    last_updated: "2024-10-01 22:10:33.910294",
    name_line: "Linha 11 - Branca",
    status_line: {
      code: 1,
      status_color: "Verde",
      description: "Operação Normal",
    },
  },
  {
    last_updated: "2024-10-01 22:20:45.780192",
    name_line: "Linha 12 - Prata",
    status_line: {
      code: 2,
      status_color: "Amarelo",
      description: "Atrasos Moderados",
    },
  },
  {
    last_updated: "2024-10-01 22:30:50.173849",
    name_line: "Linha 13 - Dourada",
    status_line: {
      code: 1,
      status_color: "Verde",
      description: "Operação Normal",
    },
  },
  {
    last_updated: "2024-10-01 22:40:33.987654",
    name_line: "Linha 14 - Ciano",
    status_line: {
      code: 3,
      status_color: "Vermelho",
      description: "Interrupção de Serviço",
    },
  },
  {
    last_updated: "2024-10-01 22:50:27.560789",
    name_line: "Linha 15 - Cinza",
    status_line: {
      code: 4,
      status_color: "Laranja",
      description: "Manutenção Preventiva",
    },
  },
];

export function TransportLinesTable() {
  const isMobile = useMediaQuery({ maxWidth: 768 });

  if (isMobile) {
    return (
      <div className="grid grid-cols-1 gap-4">
        {transportLines.map((line, index) => (
          <div key={index} className="bg-white rounded-xl shadow-lg p-4">
            <h3 className="text-lg font-semibold">{line.name_line}</h3>
            <p className="text-gray-500">Última Atualização: {line.last_updated}</p>
            <p>
              Status: <span className={`${
                line.status_line.status_color === "Verde" ? "text-green-500" :
                line.status_line.status_color === "Amarelo" ? "text-yellow-500" :
                line.status_line.status_color === "Vermelho" ? "text-red-500" :
                "text-orange-500"
              }`}>
                {line.status_line.status_color}
              </span>
            </p>
            <p className="text-gray-600">{line.status_line.description}</p>
          </div>
        ))}
        <div className="bg-white rounded-xl shadow-lg p-4">
          Total de Linhas Monitoradas: {transportLines.length}
        </div>
      </div>
    );
  }

  return (
    <Table className="bg-white rounded-xl shadow-2xl">
      <TableHeader>
        <TableRow>
          <TableHead>Última Atualização</TableHead>
          <TableHead>Nome da Linha</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Descrição</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {transportLines.map((line, index) => (
          <TableRow key={index}>
            <TableCell className="font-medium">{line.last_updated}</TableCell>
            <TableCell>{line.name_line}</TableCell>
            <TableCell>
              <span
                className={`${
                  line.status_line.status_color === "Verde"
                    ? "text-green-500"
                    : line.status_line.status_color === "Amarelo"
                    ? "text-yellow-500"
                    : line.status_line.status_color === "Vermelho"
                    ? "text-red-500"
                    : "text-orange-500"
                }`}
              >
                {line.status_line.status_color}
              </span>
            </TableCell>
            <TableCell className="text-right">
              {line.status_line.description}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={4}>
            Total de Linhas Monitoradas: {transportLines.length}
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
