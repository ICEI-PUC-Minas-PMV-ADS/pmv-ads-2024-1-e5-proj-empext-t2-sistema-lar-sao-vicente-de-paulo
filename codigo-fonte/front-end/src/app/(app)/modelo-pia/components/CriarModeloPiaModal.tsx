import { useMutation } from "@/utils/hooks/useMutation";
import { PlusOutlined, UserAddOutlined } from "@ant-design/icons";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { InputForm } from "@/components/input";
import { ModalDefault } from "@/components/modal/ModalDefault";
import { IOperationModeloRelatorioPia } from "../Interface/IModeloRelatorioPia";
import { Input, InputRef, Radio, Tag, Tooltip, theme } from "antd";

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

  const [perguntas, setPerguntas] = useState<ICreateRelatorioPia["perguntas"]>([
    {
      pergunta: "",
      respostas: [{ tipo: "TEXT", titulo: "" }],
    },
  ]);

  console.log(perguntas);

  const { handleSubmit, control } = useForm<ICreateRelatorioPia>();

  const { mutate: createUsuario, isFetching: isFetchingData } = useMutation<
    IOperationModeloRelatorioPia,
    { uid: string }
  >("/usuarios", {
    method: "post",
    messageSucess: null,
  });

  return (
    <ModalDefault
      showFooter
      nameButtonOpenModal={"Cadastrar Modelo Relatório PIA"}
      iconButtonOpenModal={<UserAddOutlined />}
      titleModal={"Adicionando modelo de relatório PIA"}
      okText="Cadastrar"
      onSubmit={handleSubmit(createUsuario)}
      isFetching={isFetchingData}
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
            <p className="text-primaria font-semibold">
              Pergunta #{indexPergunta + 1}
            </p>
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
                <p className="text-black/50 font-semibold">
                  Resposta #{indexResposta + 1}
                </p>
                <div className="flex gap-[10px] w-full">
                  <InputForm
                    label="Título da Resposta"
                    required
                    onBlur={(e) =>
                      setPerguntas((old) =>
                        old.map((perguntaOld) => {
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
                          old.map((perguntaOld) => {
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
                          old.map((perguntaOld) => {
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
                          })
                        )
                      }
                    />
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        ))}
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
