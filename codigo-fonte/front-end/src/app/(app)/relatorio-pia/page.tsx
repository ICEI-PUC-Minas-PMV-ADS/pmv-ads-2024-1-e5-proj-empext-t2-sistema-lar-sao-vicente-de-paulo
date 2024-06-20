"use client";

import { useFetch } from "@/utils/hooks/useFetch";
import { useState } from "react";
import { queryBuilder } from "@/utils/functions/query-builder";
import { Filter } from "@/interface/IQuery";
import { TableDefault } from "@/components/table/TableDefault";
import { IRelatorioPia } from "./Interface/IRelatorioPia";
import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { ColumnsType } from "antd/es/table";
import { CriarRelatorioPiaModal } from "./components/CriarRelatorioPiaModal";
import dayjs from "dayjs";
import { AtualizarRelatorioPiaModal } from "./components/AtualizarRelatorioPiaModal";

export default function RelatorioPia() {
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

  const { data, totalCount, refetch } = useFetch<IRelatorioPia[]>(
    "/relatorio-pia",
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

  const columns: ColumnsType<IRelatorioPia> = [
    {
      title: "Idoso",
      key: "idoso",
      render(_value, record, _index) {
        return <p>{record.idoso?.nome_completo}</p>;
      },
    },
    {
      title: "Modelo",
      dataIndex: "nome",
      key: "nome",
    },

    {
      title: "Criado por",
      key: "modelo",
      render(_value, record, _index) {
        return <p>{record.usuario?.nome}</p>;
      },
    },
    {
      title: "Data de Vencimento",
      key: "data_vencimento",
      render(_value, record, _index) {
        return <p>{dayjs(record.data_vencimento).format("DD/MM/YYYY")}</p>;
      },
    },
    {
      title: "Data de Criação",
      key: "criado_em",
      render(_value, record, _index) {
        return <p>{dayjs(record.criado_em).format("DD/MM/YYYY, H:mm")}</p>;
      },
    },
    {
      key: "atualizar_dados",
      render(_: any, record) {
        return (
          <div className="flex justify-end">
            {record.id && record.uid ? (
              <AtualizarRelatorioPiaModal
                uid={record.uid}
                refetchList={refetch}
              />
            ) : undefined}
          </div>
        );
      },
    },
  ];

  return (
    <div className="flex flex-col gap-[15px] mt-8">
      <div className="flex gap-5">
        <CriarRelatorioPiaModal refetchList={refetch} />
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
        pagination
        totalCount={totalCount}
        setPageLimit={setPageLimit}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}
