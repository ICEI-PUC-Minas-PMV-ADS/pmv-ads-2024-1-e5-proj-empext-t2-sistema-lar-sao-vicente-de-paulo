import { IErrorState, useMutation } from "@/utils/hooks/useMutation";
import {
  AlertOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import { Dispatch, SetStateAction, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { IOperationUsuario } from "../Interface/IUsuario";
import { useFetch } from "@/utils/hooks/useFetch";
import { queryBuilder } from "@/utils/functions/query-builder";
import { invertCPF, regexCPF } from "@/utils/regex/regexCPF";
import {
  InputForm,
  InputPassword,
  InputSelect,
  UploudAvatar,
} from "@/components/input";
import { isCPF } from "@/utils/validator/isCPF";
import { ModalDefault } from "@/components/modal/ModalDefault";
import { Select, UploadFile, notification } from "antd";
import { api } from "@/utils/service/api";
import { authToken } from "@/config/authToken";
import { useCookies } from "react-cookie";
import { isNome } from "@/utils/validator/isName";
import { withoutNumber } from "@/utils/validator/withoutNumber";
import { isEmail } from "@/utils/validator/isEmail";
import { CheckPassword } from "@/components/CheckPassword";
import { AxiosError } from "axios";
import { IDefinirSenha } from "@/app/(auth)/definir-senha/Interface/IDefinirSenha";

export const CriarUsuarioModal = ({
  refetchList,
}: {
  refetchList: () => void;
}) => {
  const [cookies] = useCookies([authToken.nome]);
  const [open, setOpen] = useState(false);
  const [checkSenha, setCheckSenha] = useState(false);
  const [isFetchingFoto, setIsFetchingFoto] = useState(false);
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const { handleSubmit, control, reset, watch } = useForm<IOperationUsuario>();

  const { mutate: createUsuario, isFetching: isFetchingData } = useMutation<
    IOperationUsuario,
    { uid: string }
  >("/usuarios", {
    method: "post",
    messageSucess: null,
    onSuccess: async (data) => {
      const formData = new FormData();

      if (fileList.length > 0 && fileList[0] && fileList[0].originFileObj) {
        setIsFetchingFoto(true);
        await formData.append("foto", fileList[0]?.originFileObj);
        await api
          .post("/usuarios/" + data.data.uid + "/upload-foto", formData, {
            headers: {
              Authorization: "Bearer " + cookies[authToken.nome],
              "content-type": "multipart/form-data",
            },
          })
          .then(() => {
            notification.open({
              message: "Operação realizada",
              description: "Usuário cadastrado com sucesso!",
              type: "success",
            });
            mutateDefinirSenha({ uid: data.data.uid });
            setIsFetchingFoto(false);
            reset();
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
          description: "Usuário cadastrado com sucesso!",
          type: "success",
        });
        mutateDefinirSenha({ uid: data.data.uid });
        reset();
        refetchList();
        setOpen(false);
      }
    },
  });

  const { mutate: mutateDefinirSenha, isFetching: isFetchingDefinirSenha } =
    useMutation<IDefinirSenha>("/auth/definir-senha", {
      method: "post",
      messageSucess:
        "E-mail enviado para usuário caso ele deseje alterar a senha!",
    });

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
      nameButtonOpenModal={"Cadastrar"}
      iconButtonOpenModal={<UserAddOutlined />}
      titleModal={"Adicionando usuário"}
      okText="Cadastrar"
      onSubmit={handleSubmit(createUsuario)}
      isFetching={isFetchingData || isFetchingFoto || isFetchingDefinirSenha}
      width="550px"
      setOpenModal={setOpen}
      openModal={open}
    >
      <form className="w-full flex flex-col gap-[15px]">
        <div className="flex items-center gap-[15px]">
          <div className="w-[140px] h-[100px] flex items-center">
            <Controller
              name="foto"
              control={control}
              render={() => (
                <UploudAvatar setFileList={setFileList} fileList={fileList} />
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
                if (isNome(value)) return "Preencher o nome completo";
                if (withoutNumber(value)) return "Nome não pode conter números";
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
                if (!isCPF(value)) return "Formato inválido do CPF";
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
              if (!isEmail(value)) return "Formato inválido do E-mail";
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
        <Controller
          name="senha"
          control={control}
          rules={{
            required: "Insira a senha do usuário",
            validate: (value) => {
              if (!checkSenha)
                return "Critérios mínimos da senha não foram atendidos";
              return true;
            },
          }}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <>
              <InputPassword
                label="Senha"
                required
                placeholder="********"
                error={error?.message}
                onChange={onChange}
                value={value}
              />
              <CheckPassword password={value} check={(v) => setCheckSenha(v)} />
            </>
          )}
        />
      </form>
    </ModalDefault>
  );
};
