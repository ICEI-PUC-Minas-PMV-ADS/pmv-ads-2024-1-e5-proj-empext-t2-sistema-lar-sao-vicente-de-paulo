import { useMutation } from "@/utils/hooks/useMutation";
import { EditOutlined } from "@ant-design/icons";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { IOperationUsuario, IUsuario } from "../Interface/IUsuario";
import { useFetch } from "@/utils/hooks/useFetch";
import { queryBuilder } from "@/utils/functions/query-builder";
import { invertCPF, regexCPF } from "@/utils/regex/regexCPF";
import { InputForm, InputSelect, UploudAvatar } from "@/components/input";
import { isCPF } from "@/utils/validator/isCPF";
import { ModalDefault } from "@/components/modal/ModalDefault";
import { Tooltip } from "antd";

export const AtualizarUsuarioModal = ({
  item,
  refetchList,
}: {
  item: IUsuario;
  refetchList: () => void;
}) => {
  const [open, setOpen] = useState(false);

  const { handleSubmit, control, reset } = useForm<Partial<IOperationUsuario>>({
    defaultValues: {
      nome: item.nome,
      email: item.email,
      cpf_cnh: item.cpf_cnh,
      foto: item.foto,
      id_cargo: item.id_cargo,
    },
  });

  const { mutate: updateUsuario, isFetching: isUpdatingUsuario } = useMutation<
    Partial<IOperationUsuario>
  >("/usuarios/" + item.uid, {
    method: "patch",
    messageSucess: "Usuário atualizado com sucesso!",
    onSuccess: () => {
      refetchList();
      setOpen(false);
    },
  });

  const { mutate: redefirSenha } = useMutation<{ email: string }>(
    "/auth/redefinir-senha",
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
    params: queryBuilder({
      page_limit: 999999,
    }),
  });

  return (
    <ModalDefault
      customButtonOpenModal={
        <Tooltip title={"Editar"}>
          <button
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
      isFetching={isUpdatingUsuario}
      width="700px"
      setOpenModal={setOpen}
      openModal={open}
      onClose={() => reset()}
      listOptions={[
        {
          label: "Redefinir senha",
          onClick: () => redefirSenha({ email: item.email }),
        },
        {
          label: item.situacao === "ATIVO" ? "Inativar" : "Reativar",
          onClick: () =>
            updateUsuario({
              situacao: item.situacao === "ATIVO" ? "INATIVO" : "ATIVO",
            }),
        },
      ]}
      situation={item.situacao}
      created_item={item.criado_em}
      updated_item={item.atualizado_em}
    >
      <form className="w-full flex flex-col gap-[15px]">
        <div className="flex items-center gap-[15px]">
          <div className="w-[140px] h-[100px] flex items-center">
            <Controller
              name="foto"
              control={control}
              render={() => <UploudAvatar />}
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
                value={item.id_cargo}
              >
                {cargos?.map((cargo) => (
                  <option key={cargo.uid} value={cargo.id}>
                    {cargo.nome}
                  </option>
                ))}
              </InputSelect>
            )}
          />
        </div>

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
      </form>
    </ModalDefault>
  );
};
