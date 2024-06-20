import {
  DeleteFilled,
  EditOutlined,
  PlusCircleOutlined,
  PlusOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { ModalDefault } from "@/components/modal/ModalDefault";
import {
  Button,
  Input,
  InputRef,
  Popconfirm,
  Radio,
  Tag,
  Tooltip,
  notification,
  theme,
} from "antd";
import { useCookies } from "react-cookie";
import { authToken } from "@/config/authToken";
import { IModeloRelatorioPia } from "../Interface/IModeloRelatorioPia";
import { useFetch } from "@/utils/hooks/useFetch";
import { InputForm } from "@/components/input";
import { IErrorState, useMutation } from "@/utils/hooks/useMutation";
import { api } from "@/utils/service/api";
import { IModeloRelatorioPiaRespostaOpcao } from "../Interface/IModeloRelatorioPiaRespostaOpcao";
import { IModeloRelatorioPiaResposta } from "../Interface/IModeloRelatorioPiaResposta";
import { IModeloRelatorioPiaPergunta } from "../Interface/IModeloRelatorioPiaPergunta";
import { AxiosError } from "axios";

export const AtualizarModeloPiaModal = ({
  uid,
  refetchList,
}: {
  uid: string;
  refetchList: () => void;
}) => {
  const [cookies] = useCookies([authToken.nome]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [open, setOpen] = useState(false);
  const [perguntas, setPerguntas] = useState<
    IModeloRelatorioPia["modelo_relatorio_pia_pergunta"]
  >([]);

  const { handleSubmit, control, setValue } =
    useForm<Partial<IModeloRelatorioPia>>();

  console.log(perguntas);

  const { data: modeloPia } = useFetch<IModeloRelatorioPia>(
    "/modelo-relatorio-pia/" + uid,
    [uid],
    {
      enable: open,
      resNotInData: true,
      onSuccess: (data) => {
        setValue("nome", data.data.nome);

        if (data.data.modelo_relatorio_pia_pergunta)
          setPerguntas(data.data.modelo_relatorio_pia_pergunta);
      },
    }
  );

  const { mutate: updateModeloPia, isFetching: isFetchingData } = useMutation<
    Partial<IModeloRelatorioPia>,
    { id: bigint }
  >("/modelo-relatorio-pia/" + uid, {
    method: "patch",
    messageSucess: null,
    resNotInData: true,
    onSuccess: (data) => {
      setIsLoading(true);
      try {
        if (perguntas) {
          Promise.all(
            perguntas.map((item) => {
              if (item.uid) {
                api
                  .patch<{ id: bigint }>(
                    "/modelo-relatorio-pia-pergunta/" + item.uid,
                    {
                      pergunta: item.pergunta,
                    } as IModeloRelatorioPiaPergunta,
                    {
                      headers: {
                        Authorization: "Bearer " + cookies[authToken.nome],
                      },
                    }
                  )
                  .then((data) => {
                    if (item.modelo_relatorio_pia_resposta) {
                      Promise.all(
                        item.modelo_relatorio_pia_resposta.map(
                          (itemResposta) => {
                            if (itemResposta.uid) {
                              api
                                .patch<{ id: bigint }>(
                                  "/modelo-relatorio-pia-resposta/" +
                                    itemResposta.uid,
                                  {
                                    tipo: itemResposta.tipo,
                                    titulo: itemResposta.titulo,
                                  } as IModeloRelatorioPiaResposta,
                                  {
                                    headers: {
                                      Authorization:
                                        "Bearer " + cookies[authToken.nome],
                                    },
                                  }
                                )
                                .then((data) => {
                                  if (
                                    itemResposta.modelo_relatorio_pia_resposta_opcao
                                  ) {
                                    Promise.all(
                                      itemResposta.modelo_relatorio_pia_resposta_opcao.map(
                                        (itemOpcao) => {
                                          if (itemOpcao.uid) {
                                            api.patch<{ id: bigint }>(
                                              "/modelo-relatorio-pia-resposta-opcao/" +
                                                itemOpcao.uid,
                                              {
                                                opcao: itemOpcao.opcao,
                                              } as IModeloRelatorioPiaRespostaOpcao,
                                              {
                                                headers: {
                                                  Authorization:
                                                    "Bearer " +
                                                    cookies[authToken.nome],
                                                },
                                              }
                                            );
                                          } else {
                                            api.post<{ id: bigint }>(
                                              "/modelo-relatorio-pia-resposta-opcao",
                                              {
                                                id_modelo_relatorio_pia_resposta:
                                                  data.data.id,
                                                opcao: itemOpcao.opcao,
                                              } as IModeloRelatorioPiaRespostaOpcao,
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
                                      )
                                    );
                                  }
                                });
                            } else {
                              api
                                .post<{ id: bigint }>(
                                  "/modelo-relatorio-pia-resposta",
                                  {
                                    id_modelo_relatorio_pia_pergunta:
                                      data.data.id,
                                    tipo: itemResposta.tipo,
                                    titulo: itemResposta.titulo,
                                  } as IModeloRelatorioPiaResposta,
                                  {
                                    headers: {
                                      Authorization:
                                        "Bearer " + cookies[authToken.nome],
                                    },
                                  }
                                )
                                .then((data) => {
                                  if (
                                    itemResposta.modelo_relatorio_pia_resposta_opcao
                                  ) {
                                    Promise.all(
                                      itemResposta.modelo_relatorio_pia_resposta_opcao.map(
                                        (itemOpcao) =>
                                          api.post<{ id: bigint }>(
                                            "/modelo-relatorio-pia-resposta-opcao",
                                            {
                                              id_modelo_relatorio_pia_resposta:
                                                data.data.id,
                                              opcao: itemOpcao.opcao,
                                            } as IModeloRelatorioPiaRespostaOpcao,
                                            {
                                              headers: {
                                                Authorization:
                                                  "Bearer " +
                                                  cookies[authToken.nome],
                                              },
                                            }
                                          )
                                      )
                                    );
                                  }
                                });
                            }
                          }
                        )
                      );
                    }
                  });
              } else {
                api
                  .post<{ id: bigint }>(
                    "/modelo-relatorio-pia-pergunta",
                    {
                      pergunta: item.pergunta,
                      id_modelo_relatorio_pia: data.data.id,
                    } as IModeloRelatorioPiaPergunta,
                    {
                      headers: {
                        Authorization: "Bearer " + cookies[authToken.nome],
                      },
                    }
                  )
                  .then((data) => {
                    if (item.modelo_relatorio_pia_resposta) {
                      Promise.all(
                        item.modelo_relatorio_pia_resposta.map((itemResposta) =>
                          api
                            .post<{ id: bigint }>(
                              "/modelo-relatorio-pia-resposta",
                              {
                                id_modelo_relatorio_pia_pergunta: data.data.id,
                                tipo: itemResposta.tipo,
                                titulo: itemResposta.titulo,
                              } as IModeloRelatorioPiaResposta,
                              {
                                headers: {
                                  Authorization:
                                    "Bearer " + cookies[authToken.nome],
                                },
                              }
                            )
                            .then((data) => {
                              if (
                                itemResposta.modelo_relatorio_pia_resposta_opcao
                              ) {
                                Promise.all(
                                  itemResposta.modelo_relatorio_pia_resposta_opcao.map(
                                    (itemOpcao) =>
                                      api.post<{ id: bigint }>(
                                        "/modelo-relatorio-pia-resposta-opcao",
                                        {
                                          id_modelo_relatorio_pia_resposta:
                                            data.data.id,
                                          opcao: itemOpcao.opcao,
                                        } as IModeloRelatorioPiaRespostaOpcao,
                                        {
                                          headers: {
                                            Authorization:
                                              "Bearer " +
                                              cookies[authToken.nome],
                                          },
                                        }
                                      )
                                  )
                                );
                              }
                            })
                        )
                      );
                    }
                  });
              }
            })
          );
        }
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
          description: "Modelo PIA atualizado com sucesso!",
          type: "success",
        });
        setIsLoading(false);
        refetchList();
        setOpen(false);
      }
    },
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
      titleModal={"Editando modelo relatório PIA"}
      okText="Concluído"
      onSubmit={handleSubmit(updateModeloPia)}
      isFetching={isFetchingData || isLoading}
      width="950px"
      setOpenModal={setOpen}
      openModal={open}
      created_item={modeloPia?.criado_em}
      updated_item={modeloPia?.atualizado_em}
    >
      <form className="w-full flex flex-col gap-[15px]">
        <Controller
          name="nome"
          control={control}
          defaultValue=""
          rules={{
            required: "Insira o nome do modelo",
          }}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <InputForm
              label="Nome do Modelo"
              required
              error={error?.message}
              onChange={onChange}
              value={value}
              placeholder="PIA de Enfermagem"
            />
          )}
        />
        <p>Questionário do Relatório</p>
        {perguntas &&
          perguntas.map((pergunta, indexPergunta) => (
            <div
              key={indexPergunta + pergunta.pergunta}
              className="p-[20px] bg-primaria/10 rounded-[5px] flex gap-[10px] flex-col"
            >
              <div className="flex justify-between">
                <p className="text-primaria font-semibold">
                  Pergunta #{indexPergunta + 1}
                </p>
                <div>
                  <Popconfirm
                    overlayStyle={{ maxWidth: 350 }}
                    placement="rightBottom"
                    title={"Remover Pergunta #" + (indexPergunta + 1)}
                    description={
                      "Você tem certeza que deseja remover a pergunta?"
                    }
                    onConfirm={() =>
                      setPerguntas((old) =>
                        old?.filter(
                          (_perguntaOld, perguntaOldIndex) =>
                            perguntaOldIndex !== indexPergunta
                        )
                      )
                    }
                    okType={"danger"}
                    okText={"Confirmar"}
                    cancelText={"Cancelar"}
                    icon={<QuestionCircleOutlined style={{ color: "red" }} />}
                  >
                    <Tooltip title={"Remover Pergunta"}>
                      <button
                        type="button"
                        className="text-red-500 w-[20px] h-full flex justify-center items-center hover:text-red-700"
                      >
                        <DeleteFilled className="text-[16px]" />
                      </button>
                    </Tooltip>
                  </Popconfirm>
                </div>
              </div>

              <InputForm
                label="Qual a pergunta?"
                required
                onBlur={(e) =>
                  setPerguntas((old) =>
                    old?.map((perguntaOld, indexPerguntaOld) => {
                      if (indexPerguntaOld === indexPergunta) {
                        return { ...perguntaOld, pergunta: e.target.value };
                      } else {
                        return perguntaOld;
                      }
                    })
                  )
                }
                defaultValue={pergunta.pergunta}
                placeholder="Toma algum remédio controlado?"
              />
              {pergunta.modelo_relatorio_pia_resposta?.map(
                (resposta, indexResposta) => (
                  <div
                    key={resposta.titulo + indexResposta}
                    className="flex flex-col bg-white p-[15px] rounded-[5px] gap-[10px]"
                  >
                    <div className="flex justify-between">
                      <p className="text-black/50 font-semibold">
                        Resposta #{indexResposta + 1}
                      </p>
                      <div>
                        <Popconfirm
                          overlayStyle={{ maxWidth: 350 }}
                          placement="rightBottom"
                          title={"Remover Resposta #" + (indexResposta + 1)}
                          description={
                            "Você tem certeza que deseja remover a resposta?"
                          }
                          onConfirm={() =>
                            setPerguntas((old) =>
                              old?.map((perguntaOld, perguntaOldIndex) => {
                                if (perguntaOldIndex === indexPergunta) {
                                  return {
                                    ...perguntaOld,
                                    modelo_relatorio_pia_resposta:
                                      perguntaOld.modelo_relatorio_pia_resposta?.filter(
                                        (_respostaOld, respostaOldIndex) =>
                                          respostaOldIndex !== indexResposta
                                      ),
                                  };
                                } else {
                                  return perguntaOld;
                                }
                              })
                            )
                          }
                          okType={"danger"}
                          okText={"Confirmar"}
                          cancelText={"Cancelar"}
                          icon={
                            <QuestionCircleOutlined style={{ color: "red" }} />
                          }
                        >
                          <Tooltip title={"Remover Pergunta"}>
                            <button
                              type="button"
                              className="text-red-500 w-[20px] h-full flex justify-center items-center hover:text-red-700"
                            >
                              <DeleteFilled className="text-[16px]" />
                            </button>
                          </Tooltip>
                        </Popconfirm>
                      </div>
                    </div>

                    <div className="flex gap-[10px] w-full">
                      <InputForm
                        label="Título da Resposta"
                        required
                        onBlur={(e) =>
                          setPerguntas((old) =>
                            old?.map((perguntaOld) => {
                              return {
                                ...perguntaOld,
                                modelo_relatorio_pia_resposta:
                                  perguntaOld.modelo_relatorio_pia_resposta?.map(
                                    (respostaOld, indexRespostaOld) => {
                                      if (indexRespostaOld === indexResposta) {
                                        return {
                                          ...respostaOld,
                                          titulo: e.target.value,
                                        };
                                      } else {
                                        return respostaOld;
                                      }
                                    }
                                  ),
                              };
                            })
                          )
                        }
                        defaultValue={resposta.titulo}
                        placeholder="Descrição"
                      />
                      <div className="flex flex-col gap-1 whitespace-nowrap">
                        <p>Tipo da Resposta</p>
                        <Radio.Group
                          defaultValue={resposta.tipo}
                          size="large"
                          onChange={(e) =>
                            setPerguntas((old) =>
                              old?.map((perguntaOld) => {
                                return {
                                  ...perguntaOld,
                                  modelo_relatorio_pia_resposta:
                                    perguntaOld.modelo_relatorio_pia_resposta?.map(
                                      (respostaOld, indexRespostaOld) => {
                                        if (
                                          indexRespostaOld === indexResposta
                                        ) {
                                          return {
                                            ...respostaOld,
                                            tipo: e.target.value,
                                            ...(e.target.value === "TEXT" && {
                                              opcoes: [],
                                            }),
                                          };
                                        } else {
                                          return respostaOld;
                                        }
                                      }
                                    ),
                                };
                              })
                            )
                          }
                        >
                          <Radio.Button value="TEXT">Texto</Radio.Button>
                          <Radio.Button value="RADIO">Seleção</Radio.Button>
                          <Radio.Button value="CHECKBOX">
                            Multi-Seleção
                          </Radio.Button>
                        </Radio.Group>
                      </div>
                      {resposta.tipo === "RADIO" ||
                      resposta.tipo === "CHECKBOX" ? (
                        <InputTag
                          value={resposta.modelo_relatorio_pia_resposta_opcao?.map(
                            (v) => {
                              return v.opcao;
                            }
                          )}
                          onChange={(e) =>
                            setPerguntas((old) =>
                              old?.map((perguntaOld) => {
                                return {
                                  ...perguntaOld,
                                  modelo_relatorio_pia_resposta:
                                    perguntaOld.modelo_relatorio_pia_resposta?.map(
                                      (respostaOld, indexRespostaOld) => {
                                        if (
                                          indexRespostaOld === indexResposta
                                        ) {
                                          return {
                                            ...respostaOld,
                                            ...(respostaOld.tipo === "TEXT"
                                              ? {
                                                  modelo_relatorio_pia_resposta_opcao:
                                                    [],
                                                }
                                              : {
                                                  modelo_relatorio_pia_resposta_opcao:
                                                    e.map((opcao) => {
                                                      return { opcao: opcao };
                                                    }),
                                                }),
                                          };
                                        } else {
                                          return respostaOld;
                                        }
                                      }
                                    ),
                                };
                              })
                            )
                          }
                        />
                      ) : null}
                    </div>
                  </div>
                )
              )}
              <Button
                type="dashed"
                size="large"
                htmlType="button"
                onClick={() =>
                  setPerguntas((old) =>
                    old?.map((perguntaOld, perguntaOldIndex) => {
                      if (perguntaOldIndex === indexPergunta) {
                        return {
                          ...perguntaOld,
                          modelo_relatorio_pia_resposta:
                            perguntaOld.modelo_relatorio_pia_resposta?.concat([
                              {
                                tipo: "TEXT",
                                titulo: "",
                                id_modelo_relatorio_pia_pergunta: pergunta.id,
                              },
                            ]),
                        };
                      } else {
                        return perguntaOld;
                      }
                    })
                  )
                }
                icon={<PlusCircleOutlined />}
              >
                Adicionar resposta
              </Button>
            </div>
          ))}

        {
          <Button
            type="primary"
            size="large"
            htmlType="button"
            onClick={() => setPerguntas((old) => [])}
            icon={<PlusCircleOutlined />}
          >
            Adicionar pergunta
          </Button>
        }
      </form>
    </ModalDefault>
  );
};

const InputTag = ({
  value,
  onChange,
}: {
  value?: string[];
  onChange: (value: string[]) => void;
}) => {
  const { token } = theme.useToken();
  const [tags, setTags] = useState<string[]>(value || []);
  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [editInputIndex, setEditInputIndex] = useState(-1);
  const [editInputValue, setEditInputValue] = useState("");
  const inputRef = useRef<InputRef>(null);
  const editInputRef = useRef<InputRef>(null);

  useEffect(() => {
    onChange(tags);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tags]);

  useEffect(() => {
    if (inputVisible) {
      inputRef.current?.focus();
    }
  }, [inputVisible]);

  useEffect(() => {
    editInputRef.current?.focus();
  }, [editInputValue]);

  const handleClose = (removedTag: string) => {
    const newTags = tags.filter((tag) => tag !== removedTag);
    console.log(newTags);
    setTags(newTags);
  };

  const showInput = () => {
    setInputVisible(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputConfirm = () => {
    if (inputValue && !tags.includes(inputValue)) {
      setTags([...tags, inputValue]);
    }
    setInputVisible(false);
    setInputValue("");
  };

  const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditInputValue(e.target.value);
  };

  const handleEditInputConfirm = () => {
    const newTags = [...tags];
    newTags[editInputIndex] = editInputValue;
    setTags(newTags);
    setEditInputIndex(-1);
    setEditInputValue("");
  };

  return (
    <div className="flex flex-col gap-1">
      <p>Opções</p>
      <div className="flex w-[250px] flex-wrap gap-1">
        {tags.map<React.ReactNode>((tag, index) => {
          if (editInputIndex === index) {
            return (
              <Input
                ref={editInputRef}
                key={tag}
                size="small"
                style={{
                  width: 64,
                  height: 22,
                  marginInlineEnd: 8,
                  verticalAlign: "top",
                }}
                value={editInputValue}
                onChange={handleEditInputChange}
                onBlur={handleEditInputConfirm}
                onPressEnter={handleEditInputConfirm}
              />
            );
          }
          const isLongTag = tag.length > 20;
          const tagElem = (
            <Tag
              key={tag}
              closable
              style={{ userSelect: "none" }}
              onClose={() => handleClose(tag)}
            >
              <span
                onDoubleClick={(e) => {
                  if (index !== 0) {
                    setEditInputIndex(index);
                    setEditInputValue(tag);
                    e.preventDefault();
                  }
                }}
              >
                {isLongTag ? `${tag.slice(0, 20)}...` : tag}
              </span>
            </Tag>
          );
          return isLongTag ? (
            <Tooltip title={tag} key={tag}>
              {tagElem}
            </Tooltip>
          ) : (
            tagElem
          );
        })}
        {inputVisible ? (
          <Input
            ref={inputRef}
            type="text"
            size="small"
            style={{
              width: 64,
              height: 22,
              marginInlineEnd: 8,
              verticalAlign: "top",
            }}
            value={inputValue}
            onChange={handleInputChange}
            onBlur={handleInputConfirm}
            onPressEnter={handleInputConfirm}
          />
        ) : (
          <Tag
            style={{
              height: 22,
              background: token.colorBgContainer,
              borderStyle: "dashed",
            }}
            icon={<PlusOutlined />}
            onClick={showInput}
          >
            Adicionar
          </Tag>
        )}
      </div>
    </div>
  );
};
