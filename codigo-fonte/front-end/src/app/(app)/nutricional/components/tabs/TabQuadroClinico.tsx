import { useFormContext } from "react-hook-form";
import { CriarRegistroClinicoModal } from "../CriarRegistroClinicoModal";
import { TableDefault } from "@/components/table/TableDefault";
import { ColumnsType } from "antd/es/table";
import { IQuadroClinico } from "../../interface/IQuadroClinico";
import { useEffect, useState } from "react";
import { IFormNutricional } from "../../interface/IFormNutricional";
import dayjs from "dayjs";
import { QuestionCircleOutlined, DeleteFilled } from "@ant-design/icons";
import { Popconfirm, Tooltip } from "antd";
import { AtualizarRegistroClinicoModal } from "../AtualizarRegistroClinicoModal";

export const TabQuadroClinico = () => {
  const [list, setList] = useState<IQuadroClinico[]>([]);
  const { setValue } = useFormContext<IFormNutricional>();
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
    {
      key: "atualizar",
      width: 50,
      render(_: any, record: IQuadroClinico, index) {
        return (
          <div className="flex justify-end w-full">
            <AtualizarRegistroClinicoModal
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
