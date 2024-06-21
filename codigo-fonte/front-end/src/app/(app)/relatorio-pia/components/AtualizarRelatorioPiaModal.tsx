import { IErrorState, useMutation } from "@/utils/hooks/useMutation";
import { EditOutlined, InboxOutlined } from "@ant-design/icons";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { InputSelect } from "@/components/input";
import { ModalDefault } from "@/components/modal/ModalDefault";
import { authToken } from "@/config/authToken";
import { useCookies } from "react-cookie";
import { Checkbox, Radio, Select, Tooltip, notification } from "antd";
import { InputDatePicker } from "@/components/input/InputDatePicker";
import dayjs from "dayjs";
import { useFetch } from "@/utils/hooks/useFetch";
import { queryBuilder } from "@/utils/functions/query-builder";
import { IIdoso } from "../../idoso/Interface/IIdoso";
import { IRelatorioPia } from "../Interface/IRelatorioPia";
import TextArea from "antd/es/input/TextArea";
import { api } from "@/utils/service/api";
import { IRelatorioPiaRespostaDefinida } from "../Interface/IRelatorioPiaRespostaDefinida";

export const AtualizarRelatorioPiaModal = ({
  uid,
  refetchList,
}: {
  uid: string;
  refetchList: () => void;
}) => {
  const [cookies] = useCookies([authToken.nome]);
  const [open, setOpen] = useState(false);
  const [perguntas, setPerguntas] =
    useState<IRelatorioPia["relatorio_pia_pergunta"]>();

  const { handleSubmit, control, setValue } = useForm<Partial<IRelatorioPia>>();

  const { data: relatorioPia, refetch } = useFetch<IRelatorioPia>(
    "/relatorio-pia/" + uid,
    [uid],
    {
      enable: open,
      resNotInData: true,
      onSuccess: (data) => {
        setValue("nome", data.data.nome);
        setValue("id_idoso", data.data.id_idoso);
        setValue("data_vencimento", data.data.data_vencimento);
        setValue("id_modelo_relatorio_pia", data.data.id_modelo_relatorio_pia);

        if (data.data.relatorio_pia_pergunta)
          setPerguntas(data.data.relatorio_pia_pergunta);
      },
    }
  );

  const { mutate: updateRelatorioPia, isFetching: isFetchingData } =
    useMutation<Partial<IRelatorioPia>, { id: bigint }>(
      "/relatorio-pia/" + uid,
      {
        enable: !!perguntas,
        method: "patch",
        messageSucess: "Relatório PIA atualizado com sucesso!",
        resNotInData: true,
        onSuccess: () => {
          refetchList();
          setOpen(false);
        },
      }
    );

  const { data: idosos } = useFetch<IIdoso[]>("/idosos", ["idosos-pia"], {
    enable: open,
    params: queryBuilder({
      page_limit: 9999,
      filter: [
        {
          path: "situacao",
          operator: "equals",
          value: "ATIVO",
        },
      ],
      sort: [{ field: "criado_em", criteria: "desc" }],
    }),
  });

  const { data: modelosPia } = useFetch<
    { uid: string; id: bigint; nome: string }[]
  >("/modelo-relatorio-pia", ["modelos-relatorio-pia"], {
    enable: open,

    params: queryBuilder({
      page_limit: 9999,
      sort: [{ field: "criado_em", criteria: "desc" }],
    }),
  });

  return (
    <ModalDefault
      showFooter
      customButtonOpenModal={
        <Tooltip title={"Editar"}>
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="text-black/30 hover:text-primaria h-full w-[50px] flex justify-center items-center"
          >
            <EditOutlined className={"text-[18px]"} />
          </button>
        </Tooltip>
      }
      titleModal={"Editando Relatório PIA"}
      okText="Concluído"
      onSubmit={handleSubmit((e) =>
        updateRelatorioPia({ ...e, id_modelo_relatorio_pia: undefined })
      )}
      isFetching={isFetchingData}
      width="900px"
      setOpenModal={setOpen}
      openModal={open}
      created_item={relatorioPia?.criado_em}
      updated_item={relatorioPia?.atualizado_em}
    >
      <form className="w-full flex flex-col gap-[15px]">
        <div className="flex items-center gap-[15px]">
          <Controller
            name="id_idoso"
            disabled
            control={control}
            rules={{ required: "Selecione um idoso" }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <InputSelect
                label="Idoso"
                disabled
                onChange={onChange}
                error={error?.message}
                required
                placeholder="Selecionar"
                value={value}
              >
                {idosos?.map((idoso) => (
                  <Select.Option key={idoso.uid} value={idoso.id}>
                    {idoso.nome_completo}
                  </Select.Option>
                ))}
              </InputSelect>
            )}
          />

          <Controller
            name="id_modelo_relatorio_pia"
            control={control}
            rules={{ required: "Selecione um modelo de relatório" }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <InputSelect
                label="Modelo"
                disabled
                onChange={onChange}
                error={error?.message}
                required
                placeholder="Selecionar"
                value={value}
              >
                {modelosPia?.map((modelo) => (
                  <Select.Option key={modelo.uid} value={modelo.id}>
                    {modelo.nome}
                  </Select.Option>
                ))}
              </InputSelect>
            )}
          />

          <Controller
            name="data_vencimento"
            control={control}
            rules={{
              required: "Selecionar data de vencimento",
            }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <InputDatePicker
                label="Data de Vencimento"
                required
                error={error?.message}
                onChange={onChange}
                value={value && dayjs(value)}
                placeholder="Selecionar data"
              />
            )}
          />
        </div>
        <p>Questionário do Relatório</p>
        {perguntas ? (
          perguntas.map((pergunta, indexPergunta) => (
            <div
              key={pergunta.pergunta + indexPergunta}
              className="py-[10px] px-[15px] flex gap-[20px] w-full bg-[#f9f9f9] rounded-md"
            >
              <p className="w-full text-left min-w-[300px]">
                {pergunta.pergunta}
              </p>
              {pergunta.relatorio_pia_resposta?.map(
                (resposta, indexResposta) => (
                  <>
                    {resposta.tipo === "RADIO" && (
                      <div className="w-full flex flex-col gap-1">
                        <p>{resposta.titulo}</p>
                        <Radio.Group
                          onChange={async (e) => {
                            if (
                              e.target.value !==
                              resposta.relatorio_pia_resposta_definida?.[0]
                                .uid_relatorio_pia_resposta_opcao
                            )
                              await api.delete<{ id: bigint }>(
                                "/relatorio-pia-resposta-definida/" +
                                  resposta.relatorio_pia_resposta_definida?.[0]
                                    .uid,
                                {
                                  headers: {
                                    Authorization:
                                      "Bearer " + cookies[authToken.nome],
                                  },
                                }
                              );
                            await api.post<{ id: bigint }>(
                              "/relatorio-pia-resposta-definida",
                              {
                                uid_relatorio_pia_resposta_opcao:
                                  e.target.value,
                                id_relatorio_pia_resposta: resposta.id,
                              } as IRelatorioPiaRespostaDefinida,
                              {
                                headers: {
                                  Authorization:
                                    "Bearer " + cookies[authToken.nome],
                                },
                              }
                            );
                            refetch();
                          }}
                          value={
                            resposta.relatorio_pia_resposta_definida?.[0]
                              .uid_relatorio_pia_resposta_opcao
                          }
                        >
                          {resposta.relatorio_pia_resposta_opcao?.map(
                            (opcao) => (
                              <Radio key={opcao.uid} value={opcao.uid}>
                                {opcao.opcao}
                              </Radio>
                            )
                          )}
                        </Radio.Group>
                      </div>
                    )}
                    {resposta.tipo === "CHECKBOX" && (
                      <div className="w-full flex flex-col gap-1">
                        <p>{resposta.titulo}</p>
                        <Checkbox.Group
                          onChange={(e) => {
                            e.map((opcaoSelecionado) => {
                              if (
                                !resposta.relatorio_pia_resposta_definida?.find(
                                  (opcao) =>
                                    opcao.uid_relatorio_pia_resposta_opcao ===
                                    opcaoSelecionado
                                )
                              ) {
                                api
                                  .post<{ id: bigint }>(
                                    "/relatorio-pia-resposta-definida",
                                    {
                                      uid_relatorio_pia_resposta_opcao:
                                        opcaoSelecionado,
                                      id_relatorio_pia_resposta: resposta.id,
                                    } as IRelatorioPiaRespostaDefinida,
                                    {
                                      headers: {
                                        Authorization:
                                          "Bearer " + cookies[authToken.nome],
                                      },
                                    }
                                  )
                                  .then(() => refetch());
                              }
                            });
                            resposta.relatorio_pia_resposta_definida?.map(
                              (opcao) => {
                                if (
                                  !e.find(
                                    (v) =>
                                      v ===
                                      opcao.uid_relatorio_pia_resposta_opcao
                                  )
                                ) {
                                  api
                                    .delete<{ id: bigint }>(
                                      "/relatorio-pia-resposta-definida/" +
                                        opcao.uid,
                                      {
                                        headers: {
                                          Authorization:
                                            "Bearer " + cookies[authToken.nome],
                                        },
                                      }
                                    )
                                    .then(() => refetch());
                                }
                              }
                            );
                          }}
                          value={resposta.relatorio_pia_resposta_definida?.map(
                            (e) => {
                              if (e.uid_relatorio_pia_resposta_opcao) {
                                return e.uid_relatorio_pia_resposta_opcao;
                              } else {
                                return "";
                              }
                            }
                          )}
                        >
                          {resposta.relatorio_pia_resposta_opcao?.map(
                            (opcao) => (
                              <Checkbox key={opcao.uid} value={opcao.uid}>
                                {opcao.opcao}
                              </Checkbox>
                            )
                          )}
                        </Checkbox.Group>
                      </div>
                    )}
                    {resposta.tipo === "TEXT" && (
                      <div className="flex flex-col gap-1 w-full">
                        <p>{resposta.titulo}</p>
                        <TextArea
                          defaultValue={
                            resposta.relatorio_pia_resposta_definida?.[0].valor
                          }
                          rows={2}
                          onBlur={(e) => {
                            api
                              .patch<{ id: bigint }>(
                                "/relatorio-pia-resposta-definida/" +
                                  resposta.relatorio_pia_resposta_definida?.[0]
                                    .uid,
                                {
                                  valor: e.target.value,
                                } as IRelatorioPiaRespostaDefinida,
                                {
                                  headers: {
                                    Authorization:
                                      "Bearer " + cookies[authToken.nome],
                                  },
                                }
                              )
                              .then(() => refetch());
                          }}
                        />
                      </div>
                    )}
                  </>
                )
              )}
            </div>
          ))
        ) : (
          <div className="text-black/40 flex w-full justify-center items-center gap-2">
            <InboxOutlined className="text-xl" /> Nenhum modelo selecionado.
          </div>
        )}
      </form>
    </ModalDefault>
  );
};
