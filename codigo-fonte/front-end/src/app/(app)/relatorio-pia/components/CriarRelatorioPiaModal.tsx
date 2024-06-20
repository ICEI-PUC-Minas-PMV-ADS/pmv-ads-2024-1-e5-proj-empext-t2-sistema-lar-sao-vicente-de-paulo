import { IErrorState, useMutation } from "@/utils/hooks/useMutation";
import { InboxOutlined, UserAddOutlined } from "@ant-design/icons";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { InputSelect } from "@/components/input";
import { ModalDefault } from "@/components/modal/ModalDefault";
import { authToken } from "@/config/authToken";
import { useCookies } from "react-cookie";
import { Checkbox, Radio, Select, notification } from "antd";
import { InputDatePicker } from "@/components/input/InputDatePicker";
import dayjs from "dayjs";
import { useFetch } from "@/utils/hooks/useFetch";
import { queryBuilder } from "@/utils/functions/query-builder";
import { IIdoso } from "../../idoso/Interface/IIdoso";
import { IOperationRelatorioPia } from "../Interface/IRelatorioPia";
import TextArea from "antd/es/input/TextArea";
import { IModeloRelatorioPia } from "../../modelo-pia/Interface/IModeloRelatorioPia";
import { api } from "@/utils/service/api";
import { IRelatorioPiaPergunta } from "../Interface/IRelatorioPiaPergunta";
import { IRelatorioPiaResposta } from "../Interface/IRelatorioPiaResposta";
import { IRelatorioPiaRespostaOpcao } from "../Interface/IRelatorioPiaRespostaOpcao";
import { AxiosError } from "axios";
import { IRelatorioPiaRespostaDefinida } from "../Interface/IRelatorioPiaRespostaDefinida";
import { useAppSelector } from "@/utils/hooks/useRedux";

interface ICreateRelatorioPia {
  nome: string;
  perguntas: {
    pergunta: string;
    respostas?: {
      titulo: string;
      tipo: "TEXT" | "RADIO" | "CHECKBOX";
      value?: { text?: string; opcao_uid?: string[] };
      opcoes?: { opcao: string; uid: string }[];
    }[];
  }[];
}
[];

export const CriarRelatorioPiaModal = ({
  refetchList,
}: {
  refetchList: () => void;
}) => {
  const [cookies] = useCookies([authToken.nome]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const usuario = useAppSelector((v) => v.auth.usuario.id);
  const [open, setOpen] = useState(false);
  const [perguntas, setPerguntas] =
    useState<ICreateRelatorioPia["perguntas"]>();

  const { handleSubmit, control, reset, getValues, setValue } =
    useForm<IOperationRelatorioPia>();

  const { mutate: createRelatorioPia, isFetching: isFetchingData } =
    useMutation<IOperationRelatorioPia, { id: bigint }>("/relatorio-pia", {
      enable: !!perguntas,
      method: "post",
      messageSucess: null,
      resNotInData: true,
      onSuccess: (data) => {
        setIsLoading(true);
        if (perguntas) {
          try {
            Promise.all(
              perguntas.map((item) =>
                api
                  .post<{ id: bigint }>(
                    "/relatorio-pia-pergunta",
                    {
                      pergunta: item.pergunta,
                      id_relatorio_pia: data.data.id,
                    } as IRelatorioPiaPergunta,
                    {
                      headers: {
                        Authorization: "Bearer " + cookies[authToken.nome],
                      },
                    }
                  )
                  .then((data) => {
                    if (item.respostas) {
                      Promise.all(
                        item.respostas.map((itemResposta) =>
                          api
                            .post<{ id: bigint }>(
                              "/relatorio-pia-resposta",
                              {
                                id_relatorio_pia_pergunta: data.data.id,
                                tipo: itemResposta.tipo,
                                titulo: itemResposta.titulo,
                              } as IRelatorioPiaResposta,
                              {
                                headers: {
                                  Authorization:
                                    "Bearer " + cookies[authToken.nome],
                                },
                              }
                            )
                            .then((data_resposta) => {
                              if (itemResposta.opcoes) {
                                Promise.all(
                                  itemResposta.opcoes.map((itemOpcao) =>
                                    api
                                      .post<{ uid: bigint }>(
                                        "/relatorio-pia-resposta-opcao",
                                        {
                                          id_relatorio_pia_resposta:
                                            data_resposta.data.id,
                                          opcao: itemOpcao.opcao,
                                        } as IRelatorioPiaRespostaOpcao,
                                        {
                                          headers: {
                                            Authorization:
                                              "Bearer " +
                                              cookies[authToken.nome],
                                          },
                                        }
                                      )
                                      .then((data) => {
                                        if (itemResposta.value?.opcao_uid) {
                                          itemResposta.value?.opcao_uid.map(
                                            (opcao) => {
                                              if (opcao === itemOpcao.uid) {
                                                api.post<{ id: bigint }>(
                                                  "/relatorio-pia-resposta-definida",
                                                  {
                                                    uid_relatorio_pia_resposta_opcao:
                                                      data.data.uid,
                                                    id_relatorio_pia_resposta:
                                                      data_resposta.data.id,
                                                  } as IRelatorioPiaRespostaDefinida,
                                                  {
                                                    headers: {
                                                      Authorization:
                                                        "Bearer " +
                                                        cookies[authToken.nome],
                                                    },
                                                  }
                                                );
                                              }
                                            }
                                          );
                                        }
                                      })
                                  )
                                );
                                if (itemResposta.value?.text) {
                                  api.post<{ id: bigint }>(
                                    "/relatorio-pia-resposta-definida",
                                    {
                                      valor: itemResposta.value.text,
                                      id_relatorio_pia_resposta:
                                        data_resposta.data.id,
                                      uid_relatorio_pia_resposta_opcao:
                                        undefined,
                                    } as IRelatorioPiaRespostaDefinida,
                                    {
                                      headers: {
                                        Authorization:
                                          "Bearer " + cookies[authToken.nome],
                                      },
                                    }
                                  );
                                }
                              }
                            })
                        )
                      );
                    }
                  })
              )
            );
          } catch (err) {
            const error = err as AxiosError<{ error: IErrorState }>;

            notification.open({
              message: "Ocorreu um erro",
              description: error.response?.data?.error.message,
              type: "error",
            });
            setIsLoading(false);
          } finally {
            notification.open({
              message: "Operação realizada",
              description: "Modelo PIA cadastrado com sucesso!",
              type: "success",
            });
            setIsLoading(false);
            setPerguntas([
              {
                pergunta: "",
                respostas: [{ tipo: "TEXT", titulo: "" }],
              },
            ]);
            reset();
            refetchList();
            setOpen(false);
          }
        }
      },
    });

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

  const modeloUid = modelosPia?.find(
    (v) => v.id === getValues("id_modelo_relatorio_pia")
  )?.uid;

  const { data: findModeloPiaSelect, refetch: refetchModelo } =
    useFetch<IModeloRelatorioPia>(
      "/modelo-relatorio-pia/" + modeloUid,
      [modeloUid],
      {
        enable: open && !!modeloUid && (modeloUid === undefined ? false : true),
        resNotInData: true,
        messageError: null,
        onSuccess: (data) => {
          setPerguntas(
            data.data.modelo_relatorio_pia_pergunta?.map((pergunta) => {
              return {
                pergunta: pergunta.pergunta,
                respostas: pergunta.modelo_relatorio_pia_resposta?.map(
                  (resposta) => {
                    return {
                      titulo: resposta.titulo,
                      tipo: resposta.tipo,
                      opcoes: resposta.modelo_relatorio_pia_resposta_opcao?.map(
                        (opcao) => {
                          return { opcao: opcao.opcao, uid: opcao.uid || "" };
                        }
                      ),
                    };
                  }
                ),
              };
            })
          );
          setValue("nome", data.data.nome);
          setValue("id_modelo_relatorio_pia", data.data.id);
          setValue("id_usuario", usuario);
        },
      }
    );

  return (
    <ModalDefault
      showFooter
      nameButtonOpenModal={"Cadastrar Relatório PIA"}
      iconButtonOpenModal={<UserAddOutlined />}
      titleModal={"Adicionando Relatório PIA"}
      okText="Cadastrar"
      onSubmit={handleSubmit(createRelatorioPia)}
      isFetching={isFetchingData || isLoading}
      width="900px"
      setOpenModal={setOpen}
      openModal={open}
    >
      <form className="w-full flex flex-col gap-[15px]">
        <div className="flex items-center gap-[15px]">
          <Controller
            name="id_idoso"
            control={control}
            rules={{ required: "Selecione um idoso" }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <InputSelect
                label="Idoso"
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
                onChange={(e) => {
                  onChange(e);
                  if (e) refetchModelo();
                }}
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
        {findModeloPiaSelect ? (
          perguntas?.map((pergunta, indexPergunta) => (
            <div
              key={pergunta.pergunta + indexPergunta}
              className="py-[10px] px-[15px] flex gap-[20px] w-full bg-[#f9f9f9] rounded-md"
            >
              <p className="w-full text-left min-w-[300px]">
                {pergunta.pergunta}
              </p>
              {pergunta.respostas?.map((resposta, indexResposta) => (
                <>
                  {resposta.tipo === "RADIO" && (
                    <div className="w-full flex flex-col gap-1">
                      <p>{resposta.titulo}</p>
                      <Radio.Group
                        onChange={(e) =>
                          setPerguntas((old) =>
                            old?.map((perguntaOld, perguntaOldIndex) => {
                              if (perguntaOldIndex === indexPergunta) {
                                return {
                                  ...perguntaOld,
                                  respostas: perguntaOld.respostas?.map(
                                    (respostaOld, indexRespostaOld) => {
                                      if (indexRespostaOld === indexResposta) {
                                        return {
                                          ...respostaOld,
                                          value: {
                                            opcao_uid: [e.target.value],
                                          },
                                        };
                                      } else {
                                        return respostaOld;
                                      }
                                    }
                                  ),
                                };
                              } else {
                                return perguntaOld;
                              }
                            })
                          )
                        }
                        value={resposta.value?.opcao_uid?.[0]}
                      >
                        {resposta.opcoes?.map((opcao) => (
                          <Radio key={opcao.uid} value={opcao.uid}>
                            {opcao.opcao}
                          </Radio>
                        ))}
                      </Radio.Group>
                    </div>
                  )}
                  {resposta.tipo === "CHECKBOX" && (
                    <div className="w-full flex flex-col gap-1">
                      <p>{resposta.titulo}</p>
                      <Checkbox.Group
                        onChange={(e) =>
                          setPerguntas((old) =>
                            old?.map((perguntaOld, perguntaOldIndex) => {
                              if (perguntaOldIndex === indexPergunta) {
                                return {
                                  ...perguntaOld,
                                  respostas: perguntaOld.respostas?.map(
                                    (respostaOld, indexRespostaOld) => {
                                      if (indexRespostaOld === indexResposta) {
                                        return {
                                          ...respostaOld,
                                          value: {
                                            opcao_uid: e,
                                          },
                                        };
                                      } else {
                                        return respostaOld;
                                      }
                                    }
                                  ),
                                };
                              } else {
                                return perguntaOld;
                              }
                            })
                          )
                        }
                        value={resposta.value?.opcao_uid}
                      >
                        {resposta.opcoes?.map((opcao) => (
                          <Checkbox key={opcao.uid} value={opcao.uid}>
                            {opcao.opcao}
                          </Checkbox>
                        ))}
                      </Checkbox.Group>
                    </div>
                  )}
                  {resposta.tipo === "TEXT" && (
                    <div className="flex flex-col gap-1 w-full">
                      <p>{resposta.titulo}</p>
                      <TextArea
                        value={resposta.value?.text}
                        rows={2}
                        onChange={(e) =>
                          setPerguntas((old) =>
                            old?.map((perguntaOld, perguntaOldIndex) => {
                              if (perguntaOldIndex === indexPergunta) {
                                return {
                                  ...perguntaOld,
                                  respostas: perguntaOld.respostas?.map(
                                    (respostaOld, indexRespostaOld) => {
                                      if (indexRespostaOld === indexResposta) {
                                        return {
                                          ...respostaOld,
                                          value: {
                                            text: e.target.value,
                                          },
                                        };
                                      } else {
                                        return respostaOld;
                                      }
                                    }
                                  ),
                                };
                              } else {
                                return perguntaOld;
                              }
                            })
                          )
                        }
                      />
                    </div>
                  )}
                </>
              ))}
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
