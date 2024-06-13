import { useFormContext } from "react-hook-form";
import { CriarRegistroClinicoModal } from "../CriarRegistroClinicoModal";
import { TableDefault } from "@/components/table/TableDefault";
import { ColumnsType } from "antd/es/table";
import { IQuadroClinico } from "../../interface/IQuadroClinico";
import { useEffect, useState } from "react";
import { IFormNutricional } from "../../interface/IFormNutricional";
import dayjs from "dayjs";

export const TabQuadroClinico = () => {
  const [list, setList] = useState<IQuadroClinico[]>([]);
  const { control, setValue } = useFormContext<IFormNutricional>();
  useEffect(() => {
    setValue("quadro_clinico", list);
  }, [list, setValue]);

  const columnsDadosRegistroClinico: ColumnsType<IQuadroClinico> = [
    {
      title: "Data",
      dataIndex: "data",
      render(value) {
        return <p>{dayjs(value).format("DD/MM/YYYY")}</p>;
      },
    },
    {
      title: "Aceitação Dieta Vo",
      dataIndex: "aceitacao_alimentar",
    },
    {
      title: "Sumplementação Oral",
      dataIndex: "suplemento_oral",
    },
    {
      title: "Apetite",
      dataIndex: "apetite",
    },
    {
      title: "Disfagia",
      dataIndex: "disfagia",
    },
    {
      title: "Náuse/Vômito",
      dataIndex: "nausea_vomito",
    },
    {
      title: "Dor Abdominal",
      dataIndex: "dor_abdominal",
    },
    {
      title: "Evacuação",
      dataIndex: "evacuacao",
    },
    {
      title: "Diurese",
      dataIndex: "diurese",
    },
    {
      title: "Observação",
      dataIndex: "observacao",
    },
  ];

  return (
    <div className="w-full flex flex-col gap-[15px]">
      <div className="">
        <CriarRegistroClinicoModal
          setData={(v) => {
            if (v) {
              setList([...list, v]);
            }
          }}
        />
        <div className="mt-2">
          <TableDefault
            dataSource={list}
            columns={columnsDadosRegistroClinico}
          />
        </div>
      </div>
    </div>
  );
};
