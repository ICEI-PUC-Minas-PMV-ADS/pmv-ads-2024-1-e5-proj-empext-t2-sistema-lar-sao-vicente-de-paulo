import { CriarRegistroNutriconalModal } from "../CriarRegistroNutrionalModal";
import { TableDefault } from "@/components/table/TableDefault";
import { ColumnsType } from "antd/es/table";
import { ICondutaNutricional } from "../../interface/ICondutaNutricional";

export const TabCondutaNutricional = () => {
  const columnsDadosRegistroNutricional: ColumnsType<ICondutaNutricional> = [
    {
      title: "Data",
    },
    {
      title: "Dieta Indicada",
    },
    {
      title: "Volume",
    },
    {
      title: "Fracionamento",
    },
    {
      title: "Kcal/Dia",
    },
    {
      title: "PTN/Dia",
    },
    {
      title: "Água p/Hidratação",
    },
  ];

  return (
    <div className="w-full flex flex-col gap-[15px]">
      <div className="">
        <CriarRegistroNutriconalModal />
        <div className="mt-2">
          <TableDefault
            dataSource={[]}
            columns={columnsDadosRegistroNutricional}
          />
        </div>
      </div>
    </div>
  );
};
