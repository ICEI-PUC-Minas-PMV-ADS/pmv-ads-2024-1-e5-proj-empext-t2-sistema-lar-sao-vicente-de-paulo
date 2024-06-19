import { useFormContext } from "react-hook-form";
import { CriarRegistroAntropometricoModal } from "../CriarRegistroAntropometricoModal";
import { TableDefault } from "@/components/table/TableDefault";
import { ColumnsType } from "antd/es/table";
import { IRegistroAntropometrico } from "../../interface/IRegistroAntropometrico";
import { useEffect, useState } from "react";
import { IFormNutricional } from "../../interface/IFormNutricional";
import dayjs from "dayjs";
import { Popconfirm, Tooltip, notification } from "antd";
import { DeleteFilled, QuestionCircleOutlined } from "@ant-design/icons";
import { AtualizarRegistroAntropometricoModal } from "../AtualizarRegistroAntropometricoModal";
import { useFetch } from "@/utils/hooks/useFetch";
import { queryBuilder } from "@/utils/functions/query-builder";
import { api } from "@/utils/service/api";
import { useCookies } from "react-cookie";
import { authToken } from "@/config/authToken";

export const TabDadosAntropometricos = ({ id }: { id?: bigint }) => {
  const [cookies] = useCookies([authToken.nome]);
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
            {id ? (
              <AtualizarRegistroAntropometricoModal
                refetch={refetch}
                uid={record.uid}
              />
            ) : (
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
                    .delete("/registro-antropometrico/" + record.uid, {
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

  const { refetch } = useFetch<IRegistroAntropometrico[]>(
    "/registro-antropometrico",
    ["registro-antropometrico", id],
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
      <div>
        {id ? (
          <CriarRegistroAntropometricoModal
            refetch={refetch}
            idRelatorio={id}
          />
        ) : (
          <CriarRegistroAntropometricoModal
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
            columns={columnsDadosAntropometricos}
          />
        </div>
      </div>
    </div>
  );
};
