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
      dataIndex: "id_idoso",
      key: "idoso",
    },
    {
      title: "Criado por",
      dataIndex: "id_usuario",
      key: "modelo",
    },
    {
      title: "Data de Vencimento",
      dataIndex: "data_vencimento",
      key: "dataCriacao",
    },
    {
      title: "Data de Criação",
      dataIndex: "criado_em",
      key: "dataCriacao",
    },
    {
      key: "atualizar_nutricional",
      render(_: any, record: IFichaNutricional) {
        return (
          <div className="flex justify-end">
            <AtualizarRelatorioNutricionalModal
              uid={record.uid}
              refetchList={refetch}
            />
          </div>
        );
      },
    },
    {
      key: "perfil_idoso",
      render(_: any, record: IFichaNutricional) {
        return (
          <div className="flex justify-end">
            <Tooltip title={"Visualizar"}>
              <Link
                href={"/idoso/" + record.uid}
                className="text-black/30 hover:text-primaria h-full w-[50px] flex justify-center items-center"
              >
                <EyeOutlined className={"text-[18px]"} />
              </Link>
            </Tooltip>
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
