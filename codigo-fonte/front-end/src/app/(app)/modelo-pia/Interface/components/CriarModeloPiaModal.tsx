import { useMutation } from "@/utils/hooks/useMutation";
import { UserAddOutlined } from "@ant-design/icons";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { InputForm } from "@/components/input";
import { ModalDefault } from "@/components/modal/ModalDefault";
import { isNome } from "@/utils/validator/isName";
import { isText } from "@/utils/validator/isText";
import { IOperationModeloRelatorioPia } from "../IModeloRelatorioPia";

export const CriarModeloPiaModal = ({
  refetchList,
}: {
  refetchList: () => void;
}) => {
  const [open, setOpen] = useState(false);

  const { handleSubmit, control, reset, watch } =
    useForm<IOperationModeloRelatorioPia>();

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
      width="550px"
      setOpenModal={setOpen}
      openModal={open}
    >
      <form className="w-full flex flex-col gap-[15px]">
        <Controller
          name="nome"
          control={control}
          defaultValue=""
          rules={{
            required: "Insira o nome do usuário",
            validate: (value) => {
              if (isNome(value)) return "Preencher o nome completo";
              if (isText(value))
                return "Nome não pode conter números nem caractéres especiais";
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
      </form>
    </ModalDefault>
  );
};
