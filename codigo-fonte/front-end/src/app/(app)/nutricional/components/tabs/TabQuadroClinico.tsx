import { useFormContext } from "react-hook-form";
import { CriarRegistroClinicoModal } from "../CriarRegistroClinicoModal";
import { TableDefault } from "@/components/table/TableDefault";
import { ColumnsType } from "antd/es/table";
import { IQuadroClinico } from "../../interface/IQuadroClinico";

export const TabQuadroClinico = () => {
  const columnsDadosRegistroClinico: ColumnsType<IQuadroClinico> = [
    {
      title: "Data",
    },
    {
      title: "Aceitação Dieta Vo",
    },
    {
      title: "Sumplementação Oral",
    },
    {
      title: "Apetite",
    },
    {
      title: "Disfagia",
    },
    {
      title: "Náuse/Vômito",
    },
    {
      title: "Dor Abdominal",
    },
    {
      title: "Evacuação",
    },
    {
      title: "Diurese",
    },
    {
      title: "Observação",
    },
  ];

  return (
    <div className="w-full flex flex-col gap-[15px]">
      <div className="">
        <CriarRegistroClinicoModal />
        <div className="mt-2">
          <TableDefault dataSource={[]} columns={columnsDadosRegistroClinico} />
        </div>
      </div>
    </div>
  );
};
