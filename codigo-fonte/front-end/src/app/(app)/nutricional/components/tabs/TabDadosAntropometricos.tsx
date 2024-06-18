import { useFormContext } from "react-hook-form";
import { CriarRegistroAntropometricoModal } from "../CriarRegistroAntropometricoModal";
import { TableDefault } from "@/components/table/TableDefault";
import { ColumnsType } from "antd/es/table";
import { IRegistroAntropometrico } from "../../interface/IRegistroAntropometrico";
import { useEffect, useState } from "react";
import { IFormNutricional } from "../../interface/IFormNutricional";
import dayjs from "dayjs";
import { Popconfirm, Tooltip } from "antd";
import { DeleteFilled, QuestionCircleOutlined } from "@ant-design/icons";
import { AtualizarRegistroAntropometricoModal } from "../AtualizarRegistroAntropometricoModal";

export const TabDadosAntropometricos = () => {
  const [list, setList] = useState<IRegistroAntropometrico[]>([]);
  const { setValue } = useFormContext<IFormNutricional>();
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
    {
      key: "atualizar",
      width: 50,
      render(_: any, record: IRegistroAntropometrico, index) {
        return (
          <div className="flex justify-end w-full">
            <AtualizarRegistroAntropometricoModal
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
