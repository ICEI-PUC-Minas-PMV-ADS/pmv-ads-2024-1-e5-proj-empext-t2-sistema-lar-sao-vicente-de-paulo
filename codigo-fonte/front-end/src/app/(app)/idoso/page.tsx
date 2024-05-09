"use client";

import { Input, Select } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useFetch } from "@/utils/hooks/useFetch";
import { useState } from "react";
import { queryBuilder } from "@/utils/functions/query-builder";
import { Situacao } from "@/interface/ISituacao";
import { Filter } from "@/interface/IQuery";
import { ColumnsType } from "antd/es/table";
import { TableDefault } from "@/components/table/TableDefault";
import { IIdoso } from "./Interface/IIdoso";
import { CriarIdosoModal } from "./components";
import dayjs from "dayjs";
import { AtualizarIdosoModal } from "./components/AtualizarIdosoModal";
import { VisualizarResponsaveis } from "./components/VisualizarResponsaveisModal";

export default function Idoso() {
  const [pageLimit, setPageLimit] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pesquisa, setPesquisa] = useState<string>("");
  const [situacao, setSituacao] = useState<Situacao>(Situacao.ATIVO);

  let filtros: Filter | undefined = new Array();

  if (pesquisa !== "")
    filtros.push({
      path: "nome_completo",
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

  const { data, totalCount, refetch } = useFetch<IIdoso[]>(
    "/idosos",
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

  const columns: ColumnsType<IIdoso> = [
    {
      title: "Nome",
      dataIndex: "nome_completo",
      key: "nome_completo",
    },
    {
      title: "Apelido",
      dataIndex: "apelido",
      key: "apelido",
    },
    {
      title: "Responsáveis",
      key: "responsaveis",
      render(_: any, record: IIdoso) {
        return (
          <div className="flex gap-[8px] items-center">
            <VisualizarResponsaveis
              idIdoso={record.id}
              nomeIdoso={record.nome_completo}
            />
            <p>{record._count?.responsavel_idoso} Responsáveis</p>
          </div>
        );
      },
    },
    {
      title: "Data de Nascimento",
      key: "data_nascimento",
      render(_: any, record: IIdoso) {
        return (
          <div>
            <p>{dayjs(record.data_nascimento).format("DD/MM/YYYY")}</p>
          </div>
        );
      },
    },
    {
      title: "Data da Ingressão",
      key: "data_ingresso",
      render(_: any, record: IIdoso) {
        return (
          <div>
            <p>{dayjs(record.data_ingresso).format("DD/MM/YYYY")}</p>
          </div>
        );
      },
    },
    {
      key: "atualizar_idoso",
      render(_: any, record: IIdoso) {
        return (
          <div className="flex justify-end">
            <AtualizarIdosoModal
              id={record.id}
              uid={record.uid}
              refetchList={refetch}
            />
          </div>
        );
      },
    },
  ];

  return (
    <div className="flex flex-col gap-[15px] mt-8">
      <div className="flex gap-5">
        <CriarIdosoModal refetchList={refetch} />
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
