"use client";

import { EyeOutlined, SearchOutlined } from "@ant-design/icons";
import { Input, Tooltip } from "antd";
import { useState } from "react";
import { CriarRelatorioNutricionalModal } from "./components/CriarRelatorioNutricionalModal";
import { useFetch } from "@/utils/hooks/useFetch";
import { queryBuilder } from "@/utils/functions/query-builder";
import { Filter } from "@/interface/IQuery";
import { TableDefault } from "@/components/table/TableDefault";
import { ColumnsType } from "antd/es/table";
import { AtualizarRelatorioNutricionalModal } from "./components/AtualizarRelatorioNutricionalModal";
import Link from "next/link";
import { IFichaNutricional } from "./interface/IFichaNutricional";
import dayjs from "dayjs";

export default function RelatorioNutricional() {
  const [pesquisa, setPesquisa] = useState<string>("");
  const [pageLimit, setPageLimit] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);

  let filtros: Filter | undefined = new Array();

  if (pesquisa !== "")
    filtros.push({
      path: "id_idoso",
      operator: "contains",
      value: pesquisa,
      insensitive: true,
    });

  const { data, totalCount, refetch } = useFetch<IFichaNutricional[]>(
    "/ficha-nutricional",
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

  const columns: ColumnsType<IFichaNutricional> = [
    {
      title: "Idoso",
      key: "idoso",
      render(_value, record, _index) {
        return <p>{record.idoso?.nome_completo}</p>;
      },
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
      key: "atualizar_nutricional",
      render(_: any, record: IFichaNutricional) {
        return (
          <div className="flex justify-end">
            {record.id && record.uid ? (
              <AtualizarRelatorioNutricionalModal
                id={record.id}
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
        <CriarRelatorioNutricionalModal refetchList={refetch} />
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
