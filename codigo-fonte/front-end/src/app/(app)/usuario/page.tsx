"use client";

import { Button, Input, Select, Table } from "antd";
import {
  EditOutlined,
  SearchOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import { useFetch } from "@/utils/hooks/useFetch";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { IUsuario } from "./Interface/IUsuario";
import { queryBuilder } from "@/utils/functions/query-builder";
import { Situacao } from "@/interface/ISituacao";
import { UsuarioModal } from "@/components/modal/UsuarioModal";

const columns = [
  {
    title: "Nome",
    dataIndex: "nome",
    key: "nome",
  },
  {
    title: "E-mail",
    dataIndex: "email",
    key: "email",
  },
  {
    key: "ação",
    render: () => (
      <div className="flex justify-end opacity-70 cursor-pointer">
        <a className="text-black">
          <EditOutlined style={{ fontSize: 18 }} />
        </a>
      </div>
    ),
  },
];

interface IFiltro {
  pesquisa?: string;
  situacao: Situacao;
}

export default function Usuario() {
  const filterMethods = useForm<IFiltro>({
    defaultValues: {
      situacao: Situacao.ATIVO,
    },
  });

  const [filtro, setFiltro] = useState<any[]>([]);
  const [pageLimit, setPageLimit] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const { data, totalCount } = useFetch<IUsuario[]>(
    "/usuarios",
    [filtro, pageLimit, currentPage],
    {
      params: queryBuilder({
        page_limit: pageLimit,
        page_number: currentPage,
        filter: filtro,
      }),
    }
  );

  return (
    <>
      <div className="flex mt-7 gap-5">
        <UsuarioModal />
        <Input
          placeholder="Buscar"
          suffix={<SearchOutlined className="cursor-pointer opacity-50" />}
        />
        <Select
          defaultValue="Ativos"
          className="w-[105px]"
          size="large"
          options={[
            { value: "ativos", label: "Ativos" },
            { value: "inativos", label: "Inativos" },
          ]}
        />
      </div>
      <div className="mt-[15px]">
        <Table dataSource={data} columns={columns} size="middle" />
      </div>
    </>
  );
}
