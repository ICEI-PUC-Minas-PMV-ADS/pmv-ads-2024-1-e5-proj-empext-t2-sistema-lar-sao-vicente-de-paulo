"use client";
import { useFetch } from "@/utils/hooks/useFetch";
import { useAppSelector } from "@/utils/hooks/useRedux";
import {
  CalendarOutlined,
  ManOutlined,
  UserOutlined,
  WomanOutlined,
} from "@ant-design/icons";
import { IIdoso } from "./idoso/Interface/IIdoso";
import { queryBuilder } from "@/utils/functions/query-builder";
import { IUsuario } from "./usuario/Interface/IUsuario";

export default function Home() {
  const usuario = useAppSelector((r) => r.auth.usuario.nome);

  const { data: idosos, totalCount: totalIdosos } = useFetch<IIdoso[]>(
    "/idosos",
    [],
    {
      params: queryBuilder({
        page_limit: 9999,
        filter: [{ path: "situacao", operator: "equals", value: "ATIVO" }],
      }),
    }
  );

  const { totalCount: totalFuncionarios } = useFetch<IUsuario[]>(
    "/usuarios",
    [],
    {
      params: queryBuilder({
        page_limit: 9999,
        filter: [{ path: "situacao", operator: "equals", value: "ATIVO" }],
      }),
    }
  );

  const idososMasculino = idosos?.filter(
    (idoso) => idoso.genero === "Masculino"
  ).length;
  const idosasFemininas = idosos?.filter(
    (idoso) => idoso.genero === "Feminino"
  ).length;

  const aniversariantes = idosos?.filter(
    (idoso) =>
      idoso.data_nascimento.getDay === new Date().getDay &&
      idoso.data_nascimento.getMonth === new Date().getMonth
  ).length;

  return (
    <div className="flex justify-between w-full bg-[url('/home.jpg')] h-[80vh] bg-cover rounded-[20px] p-[50px] flex-col">
      <h1 className=" text-white text-2xl">
        Olá, <strong>{usuario} </strong>
      </h1>
      <div className="w-full flex items-center gap-4 justify-center">
        <div className="bg-white flex-col gap-2 max-w-[220px] w-full p-[15px] rounded-[10px] text-black/50 text-sm">
          <p>Idosos Ativos</p>
          <div className=" flex gap-2 items-center">
            <UserOutlined /> <span className="text-black">{totalIdosos}</span>
          </div>
        </div>
        <div className="bg-white flex-col gap-2 max-w-[220px] w-full p-[15px] rounded-[10px] text-black/50 text-sm">
          <p>Funcionários Ativos</p>
          <div className=" flex gap-2 items-center">
            <UserOutlined />{" "}
            <span className="text-black"> {totalFuncionarios} </span>
          </div>
        </div>
        <div className="bg-white flex-col gap-2 max-w-[220px] w-full p-[15px] rounded-[10px] text-black/50 text-sm">
          <p>Idosos por Sexo</p>
          <div className="w-full flex gap-2">
            <div className=" flex gap-2 items-center w-full text-primaria">
              <ManOutlined />
              <span className="text-black">{idososMasculino}</span>
            </div>
            <div className=" flex gap-2 items-center w-full text-[#DC006A]">
              <WomanOutlined />
              <span className="text-black">{idosasFemininas}</span>
            </div>
          </div>
        </div>
        <div className="bg-white flex-col gap-2 max-w-[220px] w-full p-[15px] rounded-[10px] text-black/50 text-sm">
          <p>Aniversariantes Hoje</p>
          <div className=" flex gap-2 items-center">
            <CalendarOutlined />{" "}
            <span className="text-black">{aniversariantes}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
