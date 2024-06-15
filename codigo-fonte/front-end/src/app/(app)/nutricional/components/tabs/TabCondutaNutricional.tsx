import { CriarRegistroNutriconalModal } from "../CriarRegistroNutrionalModal";
import { TableDefault } from "@/components/table/TableDefault";
import { ColumnsType } from "antd/es/table";
import { ICondutaNutricional } from "../../interface/ICondutaNutricional";
import { IFormNutricional } from "../../interface/IFormNutricional";
import { useFormContext } from "react-hook-form";
import { useEffect, useState } from "react";
import dayjs from "dayjs";

export const TabCondutaNutricional = () => {
  const [list, setList] = useState<ICondutaNutricional[]>([]);
  const { control, setValue } = useFormContext<IFormNutricional>();
  useEffect(() => {
    setValue("conduta_nutricional", list);
  }, [list, setValue]);

  const columnsDadosRegistroNutricional: ColumnsType<ICondutaNutricional> = [
    {
      title: "Data",
      dataIndex: "data",
      render(value) {
        return <p>{dayjs(value).format("DD/MM/YYYY")}</p>;
      },
    },
    {
      title: "Dieta Indicada",
      dataIndex: "dieta",
    },
    {
      title: "Volume",
      dataIndex: "volume",
    },
    {
      title: "Fracionamento",
      dataIndex: "fracionamento",
    },
    {
      title: "Kcal/Dia",
      dataIndex: "kcal_dia",
    },
    {
      title: "PTN/Dia",
      dataIndex: "ptn_dia",
    },
    {
      title: "Água p/Hidratação",
      dataIndex: "agua_ml",
    },
  ];

  return (
    <div className="w-full flex flex-col gap-[15px]">
      <div className="">
        <CriarRegistroNutriconalModal
          setData={(v) => {
            if (v) {
              setList([...list, v]);
            }
          }}
        />
        <div className="mt-2">
          <TableDefault
            dataSource={list}
            columns={columnsDadosRegistroNutricional}
          />
        </div>
      </div>
    </div>
  );
};
