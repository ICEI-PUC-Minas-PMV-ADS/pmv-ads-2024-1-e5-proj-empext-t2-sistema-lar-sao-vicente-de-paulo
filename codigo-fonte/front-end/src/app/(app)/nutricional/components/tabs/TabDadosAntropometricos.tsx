import { useFormContext } from "react-hook-form";
import { CriarRegistroAntropometricoModal } from "../CriarRegistroAntropometricoModal";
import { TableDefault } from "@/components/table/TableDefault";
import { ColumnsType } from "antd/es/table";
import { IRegistroAntropometrico } from "../../interface/IRegistroAntropometrico";
import { useEffect, useState } from "react";
import { IFormNutricional } from "../../interface/IFormNutricional";
import dayjs from "dayjs";

export const TabDadosAntropometricos = () => {
  const [list, setList] = useState<IRegistroAntropometrico[]>([]);
  const { control, setValue } = useFormContext<IFormNutricional>();
  useEffect(() => {
    setValue("registro_antrometrico", list);
  }, [list, setValue]);

  const columnsDadosAntropometricos: ColumnsType<IRegistroAntropometrico> = [
    {
      title: "Data",
      dataIndex: "data",
      render(value) {
        return <p>{dayjs(value).format("DD/MM/YYYY")}</p>;
      },
    },
    {
      title: "Peso (kg)",
      dataIndex: "peso",
    },
    {
      title: "Ascite",
      dataIndex: "ascite",
    },
    {
      title: "Edema",
      dataIndex: "edema",
    },
    {
      title: "IMC (kg/m²)",
      dataIndex: "imc",
    },
    {
      title: "Classificação",
      dataIndex: "imc_classificacao",
    },
    {
      title: "CB (cm)",
      dataIndex: "cb",
    },
    {
      title: "CP (cm)",
      dataIndex: "cp",
    },
    {
      title: "Observações",
      dataIndex: "observacao",
    },
  ];

  return (
    <div className="w-full flex flex-col gap-[15px]">
      <div className="">
        <CriarRegistroAntropometricoModal
          setData={(v) => {
            if (v) {
              setList([...list, v]);
            }
          }}
        />
        <div className="mt-2">
          <TableDefault
            dataSource={list}
            columns={columnsDadosAntropometricos}
          />
        </div>
      </div>
    </div>
  );
};
