import { ModalDefault } from "@/components/modal/ModalDefault";
import { SearchOutlined } from "@ant-design/icons";
import { ColumnsType } from "antd/es/table";
import { useState } from "react";
import { IResponsavelIdoso } from "../Interface/IResponsavelIdoso";
import { useFetch } from "@/utils/hooks/useFetch";
import { queryBuilder } from "@/utils/functions/query-builder";
import { TableDefault } from "@/components/table/TableDefault";
import { Tooltip } from "antd";

export const VisualizarResponsaveis = ({
  idIdoso,
  nomeIdoso,
}: {
  idIdoso: bigint;
  nomeIdoso: string;
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const columns: ColumnsType<IResponsavelIdoso> = [
    {
      title: "Nome",
      dataIndex: "nome_completo",
      key: "nome_completo",
    },
    {
      title: "Parentesco",
      dataIndex: "parentesco",
      key: "parentesco",
    },
    {
      title: "Contatos",
      key: "telefones",
      render(_: any, record: IResponsavelIdoso) {
        return (
          <div className="flex flex-col">
            <p>{record.telefone_1}</p>
            <p>{record?.telefone_2}</p>
          </div>
        );
      },
    },
  ];

  const { data } = useFetch<IResponsavelIdoso[]>(
    "/responsaveis",
    ["responsaveis", idIdoso],

    {
      enable: open,
      params: queryBuilder({
        page_limit: 99999,
        filter: [{ path: "id_idoso", operator: "equals", value: idIdoso }],
        sort: [{ field: "criado_em", criteria: "desc" }],
      }),
    }
  );

  return (
    <ModalDefault
      customButtonOpenModal={
        <Tooltip title={"Visualizar"}>
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="text-black/30 hover:text-primaria h-full flex justify-center items-center"
          >
            <SearchOutlined className={"text-[18px]"} />
          </button>
        </Tooltip>
      }
      titleModal={"Responsáveis"}
      subtitleModal={nomeIdoso}
      width="800px"
      setOpenModal={setOpen}
      openModal={open}
      showFooter={false}
    >
      <TableDefault dataSource={data} columns={columns} />
    </ModalDefault>
  );
};
