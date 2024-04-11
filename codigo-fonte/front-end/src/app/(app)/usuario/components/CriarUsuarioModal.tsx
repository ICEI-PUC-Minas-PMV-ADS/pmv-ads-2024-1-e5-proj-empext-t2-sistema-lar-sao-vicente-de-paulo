import { useMutation } from "@/utils/hooks/useMutation";
import { UserAddOutlined } from "@ant-design/icons";
import { useState } from "react";
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
import { Select, UploadFile } from "antd";
import { api } from "@/utils/service/api";
import { authToken } from "@/config/authToken";
import { useCookies } from "react-cookie";

export const CriarUsuarioModal = ({
  refetchList,
}: {
  refetchList: () => void;
}) => {
  const [cookies] = useCookies([authToken.nome]);
  const [open, setOpen] = useState(false);
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const { handleSubmit, control, reset } = useForm<IOperationUsuario>();

  const { mutate: createUsuario, isFetching } = useMutation<
    IOperationUsuario,
    { uid: string }
  >("/usuarios", {
    method: "post",
    messageSucess: "Usuário cadastrado com sucesso!",
    resNotInData: true,
    onSuccess: async (data) => {
      const formData = new FormData();

      if (fileList.length > 0 && fileList[0] && fileList[0].originFileObj) {
        await formData.append("foto", fileList[0]?.originFileObj);
        await api
          .post("/usuarios/" + data.data.uid + "/upload-foto", formData, {
            headers: {
              Authorization: "Bearer " + cookies[authToken.nome],
              "content-type": "multipart/form-data",
            },
          })
          .then(() => {
            reset();
            refetchList();
            setOpen(false);
          });
      } else {
        reset();
        refetchList();
        setOpen(false);
      }
    },
  });

  const { data: cargos } = useFetch<
    { id: number; uid: string; nome: string }[]
  >("/cargos", ["cargos_lista"], {
    params: queryBuilder({
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
      isFetching={isFetching}
      width="700px"
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
            rules={{ required: "Insira o nome do usuário" }}
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
            defaultValue=""
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
                value={regexCPF(value)}
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
        <div className="flex justify-between gap-4">
          <Controller
            name="email"
            control={control}
            rules={{ required: "Insira o e-mail do usuário" }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <InputForm
                label="E-mail"
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
            rules={{ required: "Insira a senha do usuário" }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <InputPassword
                label="Senha"
                required
                placeholder="********"
                error={error?.message}
                onChange={onChange}
                value={value}
              />
            )}
          />
        </div>
      </form>
    </ModalDefault>
  );
};
