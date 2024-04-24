import { IErrorState, useMutation } from "@/utils/hooks/useMutation";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
  LockOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { IOperationUsuario, IUsuario } from "../Interface/IUsuario";
import { useFetch } from "@/utils/hooks/useFetch";
import { queryBuilder } from "@/utils/functions/query-builder";
import { invertCPF, regexCPF } from "@/utils/regex/regexCPF";
import { InputForm, InputSelect, UploudAvatar } from "@/components/input";
import { isCPF } from "@/utils/validator/isCPF";
import { ModalDefault } from "@/components/modal/ModalDefault";
import { Select, Tooltip, UploadFile, notification } from "antd";
import { api } from "@/utils/service/api";
import { useCookies } from "react-cookie";
import { authToken } from "@/config/authToken";
import { isNome } from "@/utils/validator/isName";
import { withoutNumber } from "@/utils/validator/withoutNumber";
import { isEmail } from "@/utils/validator/isEmail";
import { AxiosError } from "axios";
import { IDefinirSenha } from "@/app/(auth)/definir-senha/Interface/IDefinirSenha";

export const AtualizarUsuarioModal = ({
  uid,
  refetchList,
}: {
  uid: string;
  refetchList: () => void;
}) => {
  const [cookies] = useCookies([authToken.nome]);
  const [open, setOpen] = useState(false);
  const [isFetchingFoto, setIsFetchingFoto] = useState(false);
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const { handleSubmit, control, setValue } =
    useForm<Partial<IOperationUsuario>>();

  const { data: usuario } = useFetch<IUsuario>("/usuarios/" + uid, [uid], {
    enable: open,
    onSuccess: (data) => {
      const usuario = data.data;
      if (usuario) {
        if (usuario.foto) {
          setFileList([
            {
              url: usuario.foto,
              uid: usuario.uid,
              name: usuario.nome,
            },
          ]);
        }

        setValue("nome", usuario.nome);
        setValue("id_cargo", usuario.id_cargo);
        setValue("email", usuario.email);
        setValue("cpf_cnh", usuario.cpf_cnh);
      }
    },
  });

  const { mutate: updateUsuario, isFetching: isUpdatingUsuario } = useMutation<
    Partial<IOperationUsuario>
  >("/usuarios/" + uid, {
    method: "patch",
    messageSucess: null,
    onSuccess: async () => {
      const formData = new FormData();

      if (fileList.length > 0 && fileList[0] && fileList[0].originFileObj) {
        setIsFetchingFoto(true);
        await formData.append("foto", fileList[0]?.originFileObj);
        await api
          .post("/usuarios/" + uid + "/upload-foto", formData, {
            headers: {
              Authorization: "Bearer " + cookies[authToken.nome],
              "content-type": "multipart/form-data",
            },
          })
          .then(() => {
            notification.open({
              message: "Operação realizada",
              description: "Usuário atualizado com sucesso!",
              type: "success",
            });
            setIsFetchingFoto(false);
            refetchList();
            setOpen(false);
          })
          .catch((err: AxiosError<{ error: IErrorState }>) => {
            notification.open({
              message: "Ocorreu um erro",
              description: err.response?.data?.error.message,
              type: "error",
            });
            setIsFetchingFoto(false);
          });
      } else {
        notification.open({
          message: "Operação realizada",
          description: "Usuário atualizado com sucesso!",
          type: "success",
        });
        refetchList();
        setOpen(false);
      }
    },
  });

  const { mutate: mutateDefinirSenha } = useMutation<IDefinirSenha>(
    "/auth/definir-senha",
    {
      method: "post",
      messageSucess: "E-mail de redefinição de senha enviado para o usuário!",
      onSuccess: () => {
        setOpen(false);
      },
    }
  );

  const { data: cargos } = useFetch<
    { id: number; uid: string; nome: string }[]
  >("/cargos", ["cargos_lista"], {
    enable: open,
    params: queryBuilder({
      filter: [{ path: "situacao", value: "ATIVO" }],
      page_limit: 999999,
    }),
  });

  return (
    <ModalDefault
      customButtonOpenModal={
        <Tooltip title={"Editar"}>
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="text-black/30 hover:text-primaria h-full w-[50px]"
          >
            <EditOutlined className={"text-[18px]"} />
          </button>
        </Tooltip>
      }
      titleModal={"Editando usuário"}
      okText="Salvar"
      onSubmit={handleSubmit(updateUsuario)}
      isFetching={isUpdatingUsuario || isFetchingFoto}
      width="550px"
      setOpenModal={setOpen}
      openModal={open}
      listOptions={[
        {
          popconfirm: true,
          popconfirmOkText: "Enviar",
          popconfirmType: "primary",
          popconfirmTitle: "Redefinição da senha",
          popconfirmDescrition:
            "O usuário irá receber um e-mail com instruções para atualizar sua senha.",
          popconfirmIcon: (
            <ExclamationCircleOutlined
              style={{
                color: "blue",
              }}
            />
          ),
          icon: <LockOutlined />,
          label: "Redefinir senha",

          onClick: () => {
            if (usuario?.email) {
              mutateDefinirSenha({ uid: usuario.uid });
            }
          },
        },
        {
          popconfirm: true,
          popconfirmType: usuario?.situacao === "ATIVO" ? "danger" : "primary",
          popconfirmTitle:
            (usuario?.situacao === "ATIVO" ? "Inativar" : "Reativar") +
            " Usuário",
          popconfirmDescrition:
            usuario?.situacao === "ATIVO"
              ? "Ao inativar o usuário, ele não terá acesso ao sistema. Você tem certeza?"
              : "Ao reativar o usuário, ele terá acesso ao sistema. Você tem certeza?",
          popconfirmIcon: (
            <QuestionCircleOutlined
              style={{
                color: usuario?.situacao === "ATIVO" ? "red" : "blue",
              }}
            />
          ),
          label: usuario?.situacao === "ATIVO" ? "Inativar" : "Reativar",
          onClick: () =>
            updateUsuario({
              situacao: usuario?.situacao === "ATIVO" ? "INATIVO" : "ATIVO",
            }),
          icon:
            usuario?.situacao === "ATIVO" ? (
              <CloseCircleOutlined />
            ) : (
              <CheckCircleOutlined />
            ),
        },
      ]}
      situation={usuario?.situacao}
      created_item={usuario?.criado_em}
      updated_item={usuario?.atualizado_em}
    >
      <form className="w-full flex flex-col gap-[15px]">
        <div className="flex items-center gap-[15px]">
          <div className="w-[140px] h-[100px] flex items-center">
            <Controller
              name="foto"
              control={control}
              render={() => (
                <UploudAvatar fileList={fileList} setFileList={setFileList} />
              )}
            />
          </div>
          <Controller
            name="nome"
            control={control}
            defaultValue=""
            rules={{
              required: "Insira o nome do usuário",
              validate: (value) => {
                if (value && isNome(value)) return "Preencher o nome completo";
                if (value && withoutNumber(value))
                  return "Nome não pode conter números";
                return true;
              },
            }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <InputForm
                label="Nome"
                required
                error={error?.message}
                onChange={onChange}
                value={value}
                placeholder="Maria da Silva"
              />
            )}
          />
        </div>
        <div className="flex justify-between gap-4">
          <Controller
            name="cpf_cnh"
            control={control}
            rules={{
              required: "Insira o CPF do usuário",
              validate: (value) => {
                if (value && !isCPF(value)) return "Formato inválido do CPF";
                return true;
              },
            }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <InputForm
                label="CPF"
                required
                error={error?.message}
                onChange={(e) => {
                  onChange(invertCPF(e.target.value));
                }}
                value={value && regexCPF(value)}
                placeholder="000.000.000-00"
              />
            )}
          />
          <Controller
            name="id_cargo"
            control={control}
            rules={{ required: "Insira um cargo para o usuário" }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <InputSelect
                tooltip="O cargo irá definir as permissões que o usuário terá no sistema."
                label="Cargo"
                onChange={onChange}
                error={error?.message}
                required
                placeholder="Selecionar"
                value={value}
              >
                {cargos?.map((cargo) => (
                  <Select.Option key={cargo.uid} value={cargo.id}>
                    {cargo.nome}
                  </Select.Option>
                ))}
              </InputSelect>
            )}
          />
        </div>

        <Controller
          name="email"
          control={control}
          rules={{
            required: "Insira o e-mail do usuário",
            validate: (value) => {
              if (value && !isEmail(value)) return "Formato inválido do E-mail";
              return true;
            },
          }}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <InputForm
              label="E-mail"
              type="email"
              required
              error={error?.message}
              onChange={onChange}
              value={value}
              placeholder="maria@mail.com"
            />
          )}
        />
      </form>
    </ModalDefault>
  );
};
