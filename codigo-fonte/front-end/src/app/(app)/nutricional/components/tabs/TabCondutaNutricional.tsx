import { CriarRegistroNutriconalModal } from "../CriarRegistroNutrionalModal";
import { TableDefault } from "@/components/table/TableDefault";
import { ColumnsType } from "antd/es/table";
import { ICondutaNutricional } from "../../interface/ICondutaNutricional";
import { IFormNutricional } from "../../interface/IFormNutricional";
import { useFormContext } from "react-hook-form";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { QuestionCircleOutlined, DeleteFilled } from "@ant-design/icons";
import { Popconfirm, Tooltip, notification } from "antd";
import { AtualizarRegistroNutrionalModal } from "../AtualizarRegistroNutrionalModal";
import { useCookies } from "react-cookie";
import { authToken } from "@/config/authToken";
import { api } from "@/utils/service/api";
import { useFetch } from "@/utils/hooks/useFetch";
import { queryBuilder } from "@/utils/functions/query-builder";

export const TabCondutaNutricional = ({ id }: { id?: bigint }) => {
  const [cookies] = useCookies([authToken.nome]);
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
            {id ? (
              <AtualizarRegistroNutrionalModal
                refetch={refetch}
                uid={record.uid}
              />
            ) : (
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
            )}
          </div>
        );
      },
    },
    {
      key: "deletar",
      width: 50,
      render(_: any, record, index) {
        return (
          <div className="flex justify-end w-full">
            <Popconfirm
              overlayStyle={{ maxWidth: 350 }}
              placement="rightBottom"
              title={"Excluir"}
              description={"Você tem certeza que deseja excluir?"}
              onConfirm={() => {
                if (id) {
                  api
                    .delete("/conduta-nutricional/" + record.uid, {
                      headers: {
                        Authorization: "Bearer " + cookies[authToken.nome],
                      },
                    })
                    .then(() => {
                      notification.open({
                        message: "Operação realizada",
                        description: "Registro excluído com sucesso!",
                        type: "success",
                      });

                      refetch();
                    });
                } else {
                  setList(list.filter((e, i) => i !== index));
                }
              }}
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

  const { refetch } = useFetch<ICondutaNutricional[]>(
    "/conduta-nutricional",
    ["conduta-nutricional", id],
    {
      enable: !!id,
      params: queryBuilder({
        page_limit: 99999,
        filter: [
          { path: "id_ficha_nutricional", operator: "equals", value: id },
        ],
        sort: [{ field: "criado_em", criteria: "desc" }],
      }),
      onSuccess: (res) => {
        setList(res.data);
      },
    }
  );

  return (
    <div className="w-full flex flex-col gap-[15px]">
      <div className="">
        {id ? (
          <CriarRegistroNutriconalModal refetch={refetch} idRelatorio={id} />
        ) : (
          <CriarRegistroNutriconalModal
            setData={(v) => {
              if (v) {
                setList([...list, v]);
              }
            }}
          />
        )}

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
