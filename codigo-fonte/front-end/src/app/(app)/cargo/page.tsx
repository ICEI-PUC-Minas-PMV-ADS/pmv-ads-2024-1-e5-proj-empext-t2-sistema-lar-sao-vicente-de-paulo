"use client";

import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useFetch } from "@/utils/hooks/useFetch";
import { useState } from "react";
import { queryBuilder } from "@/utils/functions/query-builder";
import { Filter } from "@/interface/IQuery";
import { ColumnsType } from "antd/es/table";
import { TableDefault } from "@/components/table/TableDefault";
import { ICargo } from "./Interface/ICargo";
import { AtualizarCargoModal, CriarCargoModal } from "./components";

export default function Cargo() {
  const [pageLimit, setPageLimit] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pesquisa, setPesquisa] = useState<string>("");

  let filtros: Filter | undefined = new Array();

  if (pesquisa !== "")
    filtros.push({
      path: "nome",
      operator: "contains",
      value: pesquisa,
      insensitive: true,
    });

  const { data, totalCount, refetch } = useFetch<ICargo[]>(
    "/cargos",
    [pesquisa, pageLimit, currentPage],
    {
      params: queryBuilder({
        page_limit: pageLimit,
        page_number: currentPage,
        filter: filtros,
        sort: [{ field: "criado_em", criteria: "desc" }],
      }),
    }
  );

  const columns: ColumnsType<ICargo> = [
    {
      title: "Nome",
      dataIndex: "nome",
      key: "nome",
    },
    {
      title: "Vínculo com usuário",
      key: "vinculo_usuario",
      render(_: any, record: ICargo) {
        if (record._count?.usuario === 1) {
          return record._count?.usuario + " vínculo";
        } else {
          return record._count?.usuario + " vínculos";
        }
      },
    },
    {
      key: "atualizar_cargo",
      render(_: any, record: ICargo) {
        return (
          <div className="flex justify-end">
            <AtualizarCargoModal item={record} refetchList={refetch} />
          </div>
        );
      },
    },
  ];

  return (
    <div className="flex flex-col gap-[15px] mt-8">
      <div className="flex gap-5">
        <CriarCargoModal refetchList={refetch} />
        <Input
          placeholder="Buscar"
          size="large"
          onChange={(e) => setPesquisa(e.target.value)}
          suffix={<SearchOutlined className="cursor-pointer opacity-50" />}
        />
      </div>
      <TableDefault
        dataSource={data}
        columns={columns}
        totalCount={totalCount}
        setPageLimit={setPageLimit}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}
