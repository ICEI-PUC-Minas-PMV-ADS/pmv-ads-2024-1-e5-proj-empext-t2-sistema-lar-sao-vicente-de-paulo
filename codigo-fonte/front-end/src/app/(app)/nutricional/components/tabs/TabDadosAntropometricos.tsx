import { useForm } from "react-hook-form";
import { CriarRegistroAntropometricoModal } from "../CriarRegistroAntropometricoModal";
import { TableDefault } from "@/components/table/TableDefault";
import { ColumnsType } from "antd/es/table";
import { IRegistroAntropometrico } from "../../interface/IRegistroAntropometrico";

export const TabDadosAntropometricos = () => {
  const columnsDadosAntropometricos: ColumnsType<IRegistroAntropometrico> = [
    {
      title: "Data",
    },
    {
      title: "Peso (kg)",
    },
    {
      title: "Ascite",
    },
    {
      title: "Edema",
    },
    {
      title: "IMC (kg/m²)",
    },
    {
      title: "Classificação",
    },
    {
      title: "CB (cm)",
    },
    {
      title: "CP (cm)",
    },
    {
      title: "Observações",
    },
  ];

  return (
    <div className="w-full flex flex-col gap-[15px]">
      <div className="">
        <CriarRegistroAntropometricoModal />
        <div className="mt-2">
          <TableDefault dataSource={[]} columns={columnsDadosAntropometricos} />
        </div>
      </div>
    </div>
  );
};
