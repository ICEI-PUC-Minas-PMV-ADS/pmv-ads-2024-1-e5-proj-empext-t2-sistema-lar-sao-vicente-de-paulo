"use client";
import { useFetch } from "@/utils/hooks/useFetch";
import { useParams } from "next/navigation";
import { IIdoso } from "../Interface/IIdoso";
import dayjs from "dayjs";

export default function PerfilIdoso() {
  const uid = useParams<{ uid: string }>().uid;
  const { data: idoso } = useFetch<IIdoso>("/idosos/" + uid, [uid], {
    enable: !!uid,
  });
  const dadosidoso: { field: string; value: string | undefined }[] = [
    { field: "Apelido", value: idoso?.apelido },
    { field: "Idade", value: idoso?.apelido },
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
      <div>{idoso?.nome_completo}</div>
      <div className="flex gap-[30px] w-full h-full">
        <div className="flex p-[20px] w-[280px] h-full border border-[#CFE8FF] rounded-[10px] flex-col gap-[15px] justify-between">
          {dadosidoso.map((dados) => {
            return (
              <div className="flex gap-1 justify-between text-sm items-center">
                <p className="text-black/40">{dados.field}</p>
                <p className="text-right">{dados.value || "-"}</p>
              </div>
            );
          })}
        </div>
        <div></div>
      </div>
    </div>
  );
}
