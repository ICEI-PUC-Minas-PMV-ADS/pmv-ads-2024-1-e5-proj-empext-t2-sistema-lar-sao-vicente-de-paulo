import { useMutation } from "@/utils/hooks/useMutation";
import { UserAddOutlined } from "@ant-design/icons";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { InputForm } from "@/components/input";
import { ModalDefault } from "@/components/modal/ModalDefault";
import { IOperationCargo } from "../Interface/ICargo";

export const CriarCargoModal = ({
  refetchList,
}: {
  refetchList: () => void;
}) => {
  const [open, setOpen] = useState(false);

  const { handleSubmit, control, reset } = useForm<IOperationCargo>();

  const { mutate: createCargo, isFetching } = useMutation<IOperationCargo>(
    "/cargos",
    {
      method: "post",
      messageSucess: "Cargo cadastrado com sucesso!",
      onSuccess: () => {
        reset();
        refetchList();
        setOpen(false);
      },
    }
  );

  return (
    <ModalDefault
      nameButtonOpenModal={"Cadastrar"}
      iconButtonOpenModal={<UserAddOutlined />}
      titleModal={"Adicionando cargo"}
      okText="Cadastrar"
      onSubmit={handleSubmit(createCargo)}
      isFetching={isFetching}
      width="700px"
      setOpenModal={setOpen}
      openModal={open}
    >
      <form className="w-full flex flex-col gap-[15px]">
        <div className="flex items-center gap-[15px]">
          <Controller
            name="nome"
            control={control}
            defaultValue=""
            rules={{ required: "Insira o nome do cargo" }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <InputForm
                label="Nome"
                required
                error={error?.message}
                onChange={onChange}
                value={value}
                placeholder="Enfermeiro(a)"
              />
            )}
          />
        </div>
      </form>
    </ModalDefault>
  );
};
