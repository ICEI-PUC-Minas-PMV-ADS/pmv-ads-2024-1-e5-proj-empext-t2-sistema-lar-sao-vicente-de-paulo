"use client";

import { Breadcrumb, Button, Input, Select, Table } from "antd";
import {
  EditOutlined,
  SearchOutlined,
  UserAddOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Header } from "@/components/template/Header";
import { Footer } from "@/components/template/Footer";

const dataSource = [
  {
    key: "1",
    nome: "José da Silva",
    cargo: "Gerente",
    email: "jose@gmail.com",
  },
  {
    key: "2",
    nome: "Lucas",
    cargo: "Admin",
    email: "lucas@gmail.com",
  },
  {
    key: "3",
    nome: "Ricardo",
    cargo: "Operador",
    email: "jose@gmail.com",
  },
  {
    key: "4",
    nome: "Maria",
    cargo: "RH",
    email: "maria@gmail.com",
  },
  {
    key: "5",
    nome: "Pedro",
    cargo: "Gerente",
    email: "pedro@gmail.com",
  },
];

const columns = [
  {
    title: "Nome",
    dataIndex: "nome",
    key: "nome",
  },
  {
    title: "Cargo",
    dataIndex: "cargo",
    key: "cargo",
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

export default function Usuario() {
  return (
    <>
      <div className="flex mt-7 gap-5">
        <Button type="primary" size="large" icon={<UserAddOutlined />}>
          Cadastrar
        </Button>
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
        <Table dataSource={dataSource} columns={columns} size="middle" />
      </div>
    </>
  );
}
