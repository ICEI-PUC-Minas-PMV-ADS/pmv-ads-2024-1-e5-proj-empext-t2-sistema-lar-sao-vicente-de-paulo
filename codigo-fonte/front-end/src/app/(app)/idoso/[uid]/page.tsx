"use client";
import { useFetch } from "@/utils/hooks/useFetch";
import { useParams } from "next/navigation";
import { IIdoso } from "../Interface/IIdoso";
import dayjs from "dayjs";
import { UserOutlined } from "@ant-design/icons";
import { AtualizarIdosoModal } from "../components/AtualizarIdosoModal";
import { VisualizarResponsaveis } from "../components/VisualizarResponsaveisModal";
import { useState } from "react";
import { set } from "react-hook-form";

export default function PerfilIdoso() {
  const [tab, setTab] = useState<"pia" | "nutricional">("pia");
  const uid = useParams<{ uid: string }>().uid;
  const { data: idoso, refetch } = useFetch<IIdoso>("/idosos/" + uid, [uid], {
    enable: !!uid,
  });
  const dadosidoso: { field: string; value: string | undefined }[] = [
    { field: "Apelido", value: idoso?.apelido },
    {
      field: "Idade",
      value:
        idoso?.data_nascimento &&
        (~~(
          (Date.now() - +new Date(idoso?.data_nascimento)) /
          31557600000
        )).toString() + " anos",
    },
    { field: "Mãe", value: idoso?.nome_mae },
    { field: "Pai", value: idoso?.nome_pai },
    {
      field: "Nascimento",
      value: dayjs(idoso?.data_nascimento).format("DD/MM/YY"),
    },
    {
      field: "Ingressão",
      value: dayjs(idoso?.data_ingresso).format("DD/MM/YY"),
    },
    { field: "Naturalidade", value: idoso?.naturalidade },
    { field: "Estado", value: idoso?.estado },
    { field: "Cidade", value: idoso?.cidade },
    { field: "Gênero", value: idoso?.genero },
    { field: "Estado Civil", value: idoso?.estado_civil },
    { field: "Escolaridade", value: idoso?.escolaridade },
    { field: "Religião", value: idoso?.religiao },
    { field: "RG", value: idoso?.rg },
    { field: "CPF", value: idoso?.cpf },
    { field: "Cartão do SUS", value: idoso?.cartao_sus },
  ];
  console.log(idoso);
  return (
    <div className="flex flex-col gap-[20px] w-full h-full">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <div
            style={{
              backgroundImage: idoso?.foto && `url(${idoso?.foto})`,
            }}
            className="w-[80px] h-[80px] bg-azul2 rounded-full bg-cover flex justify-center items-center text-black/90"
          >
            {!idoso?.foto && <UserOutlined className="text-[45px]" />}
          </div>
          <div className="flex items-center pl-[20px] ">
            <p className="text-xl font-bold text-primaria">
              {idoso?.nome_completo}
            </p>
            {idoso && (
              <AtualizarIdosoModal
                id={idoso?.id}
                uid={idoso?.uid}
                refetchList={refetch}
              />
            )}
          </div>
        </div>
        <div className="flex gap-[8px] items-center">
          {idoso && (
            <>
              <VisualizarResponsaveis
                idIdoso={idoso?.id}
                nomeIdoso={idoso?.nome_completo}
              />
              <p className="text-sm text-black/60">Responsáveis</p>
            </>
          )}
        </div>
      </div>

      <div className="flex gap-[30px] w-full h-full">
        <div className="flex p-[20px] w-[280px] h-full border border-[#CFE8FF] rounded-[10px] flex-col gap-[15px] justify-between">
          {dadosidoso.map((dados) => {
            return (
              <div
                key={dados.field}
                className="flex gap-1 justify-between text-sm items-center"
              >
                <p className="text-black/40">{dados.field}</p>
                <p className="text-right">{dados.value || "-"}</p>
              </div>
            );
          })}
          {idoso && (
            <p className="text-center text-xs text-black/40">
              Idoso cadastrado por José em{" "}
              {dayjs(idoso?.criado_em).format("DD/MM/YY, H:mm")}
            </p>
          )}
        </div>
        <div className="flex flex-col w-full h-full">
          <div className="w-full flex bg-primaria rounded-t-[10px]">
            <button
              type="button"
              onClick={() => setTab("pia")}
              className={`flex justify-center items-center rounded-tl-[10px] px-[30px] py-[12px] text-white text-sm hover:bg-azul2 ${
                tab === "pia" && "bg-azul2"
              }`}
            >
              Relatório PIA
            </button>
            <button
              type="button"
              onClick={() => setTab("nutricional")}
              className={`flex justify-center items-center px-[30px] py-[12px] text-white text-sm hover:bg-azul2 ${
                tab === "nutricional" && "bg-azul2"
              }`}
            >
              Relatório Nutricional
            </button>
          </div>
          <div className="w-full h-[500px] bg-primaria/5 rounded-b-[10px] flex justify-center items-center text-primaria/20">
            {tab} Conteúdo
          </div>
        </div>
      </div>
    </div>
  );
}
