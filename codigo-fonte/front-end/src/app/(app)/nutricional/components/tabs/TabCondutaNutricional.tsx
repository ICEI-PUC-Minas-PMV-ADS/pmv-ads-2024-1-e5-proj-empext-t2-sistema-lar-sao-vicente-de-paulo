import { CriarRegistroNutriconalModal } from "../CriarRegistroNutrionalModal";
import { TableDefault } from "@/components/table/TableDefault";
import { ColumnsType } from "antd/es/table";
import { ICondutaNutricional } from "../../interface/ICondutaNutricional";
import { IFormNutricional } from "../../interface/IFormNutricional";
import { useFormContext } from "react-hook-form";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { QuestionCircleOutlined, DeleteFilled } from "@ant-design/icons";
import { Popconfirm, Tooltip } from "antd";
import { AtualizarRegistroNutrionalModal } from "../AtualizarRegistroNutrionalModal";

export const TabCondutaNutricional = () => {
  const [list, setList] = useState<ICondutaNutricional[]>([]);
  const { setValue } = useFormContext<IFormNutricional>();
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
    {
      key: "atualizar",
      width: 50,
      render(_: any, record: ICondutaNutricional, index) {
        return (
          <div className="flex justify-end w-full">
            <AtualizarRegistroNutrionalModal
              data={record}
              setData={(value) => {
                setList(
                  list.map((v, i) => {
                    if (i === index) {
                      return { ...value };
                    }
                    return v;
                  })
                );
              }}
            />
          </div>
        );
      },
    },
    {
      key: "deletar",
      width: 50,
      render(_: any, _record, index) {
        return (
          <div className="flex justify-end w-full">
            <Popconfirm
              overlayStyle={{ maxWidth: 350 }}
              placement="rightBottom"
              title={"Excluir"}
              description={"Você tem certeza que deseja excluir?"}
              onConfirm={() => setList(list.filter((e, i) => i !== index))}
              okType={"danger"}
              okText={"Confirmar"}
              cancelText={"Cancelar"}
              icon={<QuestionCircleOutlined style={{ color: "red" }} />}
            >
              <Tooltip title={"Excluir"}>
                <button
                  type="button"
                  className="text-red-500 w-[50px] h-full flex justify-center items-center hover:text-red-700"
                >
                  <DeleteFilled className="text-[16px]" />
                </button>
              </Tooltip>
            </Popconfirm>
          </div>
        );
      },
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
