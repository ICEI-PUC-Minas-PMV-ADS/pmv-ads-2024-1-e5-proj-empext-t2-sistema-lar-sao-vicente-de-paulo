import { IErrorState, useMutation } from "@/utils/hooks/useMutation";
import {
  DeleteFilled,
  PlusCircleOutlined,
  PlusOutlined,
  QuestionCircleOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { InputForm } from "@/components/input";
import { ModalDefault } from "@/components/modal/ModalDefault";
import { IOperationModeloRelatorioPia } from "../Interface/IModeloRelatorioPia";
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
import { api } from "@/utils/service/api";
import { useCookies } from "react-cookie";
import { authToken } from "@/config/authToken";
import { IOperationModeloRelatorioPiaPergunta } from "../Interface/IModeloRelatorioPiaPergunta";
import { IOperationModeloRelatorioPiaResposta } from "../Interface/IModeloRelatorioPiaResposta";
import { IOperationModeloRelatorioPiaRespostaOpcao } from "../Interface/IModeloRelatorioPiaRespostaOpcao";
import { AxiosError } from "axios";

interface ICreateRelatorioPia {
  nome: string;
  perguntas: {
    pergunta: string;
    respostas: {
      titulo: string;
      tipo: "TEXT" | "RADIO" | "CHECKBOX";
      opcoes?: { opcao: string }[];
    }[];
  }[];
}
[];

export const CriarModeloPiaModal = ({
  refetchList,
}: {
  refetchList: () => void;
}) => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [cookies] = useCookies([authToken.nome]);
  const [perguntas, setPerguntas] = useState<ICreateRelatorioPia["perguntas"]>([
    {
      pergunta: "",
      respostas: [{ tipo: "TEXT", titulo: "" }],
    },
  ]);

  const { handleSubmit, control, reset } = useForm<{ nome: string }>();

  const { mutate: createModeloPia, isFetching: isFetchingData } = useMutation<
    IOperationModeloRelatorioPia,
    { id: bigint }
  >("/modelo-relatorio-pia", {
    method: "post",
    messageSucess: null,
    resNotInData: true,
    onSuccess: (data) => {
      setIsLoading(true);
      try {
        Promise.all(
          perguntas.map((item) =>
            api
              .post<{ id: bigint }>(
                "/modelo-relatorio-pia-pergunta",
                {
                  pergunta: item.pergunta,
                  id_modelo_relatorio_pia: data.data.id,
                } as IOperationModeloRelatorioPiaPergunta,
                {
                  headers: {
                    Authorization: "Bearer " + cookies[authToken.nome],
                  },
                }
              )
              .then((data) => {
                Promise.all(
                  item.respostas.map((itemResposta) =>
                    api
                      .post<{ id: bigint }>(
                        "/modelo-relatorio-pia-resposta",
                        {
                          id_modelo_relatorio_pia_pergunta: data.data.id,
                          tipo: itemResposta.tipo,
                          titulo: itemResposta.titulo,
                        } as IOperationModeloRelatorioPiaResposta,
                        {
                          headers: {
                            Authorization: "Bearer " + cookies[authToken.nome],
                          },
                        }
                      )
                      .then((data) => {
                        if (itemResposta.opcoes) {
                          Promise.all(
                            itemResposta.opcoes.map((itemOpcao) =>
                              api.post<{ id: bigint }>(
                                "/modelo-relatorio-pia-resposta-opcao",
                                {
                                  id_modelo_relatorio_pia_resposta:
                                    data.data.id,
                                  opcao: itemOpcao.opcao,
                                } as IOperationModeloRelatorioPiaRespostaOpcao,
                                {
                                  headers: {
                                    Authorization:
                                      "Bearer " + cookies[authToken.nome],
                                  },
                                }
                              )
                            )
                          );
                        }
                      })
                  )
                );
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
    },
  });
  return (
    <ModalDefault
      showFooter
      nameButtonOpenModal={"Cadastrar Modelo Relatório PIA"}
      iconButtonOpenModal={<UserAddOutlined />}
      titleModal={"Adicionando modelo de relatório PIA"}
      okText="Cadastrar"
      onSubmit={handleSubmit(createModeloPia)}
      isFetching={isFetchingData || isLoading}
      width="900px"
      setOpenModal={setOpen}
      openModal={open}
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
        {perguntas.map((pergunta, indexPergunta) => (
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
                      old.filter(
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
                  old.map((perguntaOld, indexPerguntaOld) => {
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
            {pergunta.respostas.map((resposta, indexResposta) => (
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
                          old.map((perguntaOld, perguntaOldIndex) => {
                            if (perguntaOldIndex === indexPergunta) {
                              return {
                                ...perguntaOld,
                                respostas: perguntaOld.respostas.filter(
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

                <div className="flex gap-[10px] w-full">
                  <InputForm
                    label="Título da Resposta"
                    required
                    onBlur={(e) =>
                      setPerguntas((old) =>
                        old.map((perguntaOld, perguntaOldIndex) => {
                          if (perguntaOldIndex === indexPergunta) {
                            return {
                              ...perguntaOld,
                              respostas: perguntaOld.respostas.map(
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
                          } else {
                            return perguntaOld;
                          }
                        })
                      )
                    }
                    defaultValue={resposta.titulo}
                    placeholder="Descrição"
                  />
                  <div className="flex flex-col gap-1 whitespace-nowrap">
                    <p>Tipo da Resposta</p>
                    <Radio.Group
                      size="large"
                      value={resposta.tipo}
                      onChange={(e) =>
                        setPerguntas((old) =>
                          old.map((perguntaOld, perguntaOldIndex) => {
                            if (perguntaOldIndex === indexPergunta) {
                              return {
                                ...perguntaOld,
                                respostas: perguntaOld.respostas.map(
                                  (respostaOld, indexRespostaOld) => {
                                    if (indexRespostaOld === indexResposta) {
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
                            } else {
                              return perguntaOld;
                            }
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
                  {resposta.tipo === "RADIO" || resposta.tipo === "CHECKBOX" ? (
                    <InputTag
                      onChange={(e) =>
                        setPerguntas((old) =>
                          old.map((perguntaOld, perguntaOldIndex) => {
                            if (perguntaOldIndex === indexPergunta) {
                              return {
                                ...perguntaOld,
                                respostas: perguntaOld.respostas.map(
                                  (respostaOld, indexRespostaOld) => {
                                    if (indexRespostaOld === indexResposta) {
                                      return {
                                        ...respostaOld,
                                        ...(respostaOld.tipo === "TEXT"
                                          ? { opcoes: [] }
                                          : {
                                              opcoes: e.map((opcao) => {
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
                            } else {
                              return perguntaOld;
                            }
                          })
                        )
                      }
                    />
                  ) : null}
                </div>
              </div>
            ))}
            <Button
              type="dashed"
              size="large"
              htmlType="button"
              onClick={() =>
                setPerguntas((old) =>
                  old.map((perguntaOld, perguntaOldIndex) => {
                    if (perguntaOldIndex === indexPergunta) {
                      return {
                        ...perguntaOld,
                        respostas: perguntaOld.respostas.concat([
                          { tipo: "TEXT", titulo: "" },
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
        <Button
          type="primary"
          size="large"
          htmlType="button"
          onClick={() =>
            setPerguntas((old) => [
              ...old,
              {
                pergunta: "",
                respostas: [{ tipo: "TEXT", titulo: "" }],
              },
            ])
          }
          icon={<PlusCircleOutlined />}
        >
          Adicionar pergunta
        </Button>
      </form>
    </ModalDefault>
  );
};

const InputTag = ({ onChange }: { onChange: (value: string[]) => void }) => {
  const { token } = theme.useToken();
  const [tags, setTags] = useState<string[]>([]);
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
