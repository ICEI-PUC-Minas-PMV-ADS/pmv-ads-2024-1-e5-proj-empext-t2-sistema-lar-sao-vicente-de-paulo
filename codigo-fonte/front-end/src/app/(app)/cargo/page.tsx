"use client";

import { Input, Select } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useFetch } from "@/utils/hooks/useFetch";
import { useState } from "react";
import { queryBuilder } from "@/utils/functions/query-builder";
import { Filter } from "@/interface/IQuery";
import { ColumnsType } from "antd/es/table";
import { TableDefault } from "@/components/table/TableDefault";
import { ICargo } from "./Interface/ICargo";
import { AtualizarCargoModal, CriarCargoModal } from "./components";
import { Situacao } from "@/interface/ISituacao";

export default function Cargo() {
  const [pageLimit, setPageLimit] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pesquisa, setPesquisa] = useState<string>("");
  const [situacao, setSituacao] = useState<Situacao>(Situacao.ATIVO);

  let filtros: Filter | undefined = new Array();

  if (pesquisa !== "")
    filtros.push({
      path: "nome",
      operator: "contains",
      value: pesquisa,
      insensitive: true,
    });

  if (situacao)
    filtros.push({
      path: "situacao",
      operator: "equals",
      value: situacao,
    });

  const { data, totalCount, refetch } = useFetch<ICargo[]>(
    "/cargos",
    [pesquisa, situacao, pageLimit, currentPage],
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
            <AtualizarCargoModal uid={record.uid} refetchList={refetch} />
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
        <Select
          className="w-[105px]"
          size="large"
          onChange={(e) => setSituacao(e as Situacao)}
          defaultValue="ATIVO"
          options={[
            { value: "ATIVO", label: "Ativos" },
            { value: "INATIVO", label: "Inativos" },
            { value: "", label: "Todos" },
          ]}
        />
      </div>
      <TableDefault
        dataSource={data}
        columns={columns}
        pagination
        totalCount={totalCount}
        setPageLimit={setPageLimit}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}
