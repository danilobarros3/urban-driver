import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import api from "@/services";
import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";

export function TransportLinesTable() {
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const [transportLines, setTransportLines] = useState<any[]>([]);

  const getOperations = async () => {
    try {
      const { data } = await api.get("api/operations");
      setTransportLines(data);
    } catch (error) {
      console.error("Erro ao buscar dados:");
    }
  };

  useEffect(() => {
    getOperations();
  }, []);

  if (isMobile) {
    return (
      <div className="grid grid-cols-1 gap-5">
        <Accordion type="single" collapsible>
          {transportLines.map((line: any, index: any) => (
            <AccordionItem
              key={index}
              value={`line-${index}`}
              className="mb-5 border border-gray-300 rounded-lg"
            >
              <AccordionTrigger className="flex justify-between items-center bg-white p-5 text-lg font-medium text-gray-800 hover:bg-gray-100 rounded-t-lg transition-all ease-in-out">
                <span>{line?.lineTrain?.nameLine}</span>
                <span className="text-sm text-gray-500">
                  Última Atualização: {line?.lastUpdated}
                </span>
              </AccordionTrigger>
              <AccordionContent className="p-4 bg-gray-50 rounded-b-lg transition-all ease-in-out">
                <div>
                  <p>
                    Status:{" "}
                    <span
                      className={`${
                        line?.status?.statusName === "status_verde"
                          ? "text-green-500"
                          : line?.status?.statusName === "status_amarelo"
                          ? "text-yellow-500"
                          : line?.status?.statusName === "status_vermelho"
                          ? "text-red-500"
                          : "text-orange-500"
                      }`}
                    >
                      {line?.status?.statusName}
                    </span>
                  </p>
                  <p className="text-gray-600">{line?.descriptionStatusLine}</p>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
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
        {transportLines?.map((line: any, index: any) => (
          <TableRow key={index}>
            <TableCell className="font-medium">{line.lastUpdated}</TableCell>
            <TableCell>{line?.lineTrain?.nameLine}</TableCell>
            <TableCell>
              <span
                className={`${
                  line?.status?.statusName === "status_verde"
                    ? "text-green-500"
                    : line?.status?.statusName === "status_amarelo"
                    ? "text-yellow-500"
                    : line?.status?.statusName === "status_vermelho"
                    ? "text-red-500"
                    : "text-orange-500"
                }`}
              >
                {line?.status?.statusName}
              </span>
            </TableCell>
            <TableCell className="text-right text-bold">
              {line?.descriptionStatusLine}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={4}>
            Total de Linhas Monitoradas: {transportLines?.length}
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
