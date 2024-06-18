import { InputDatePicker } from "@/components/input/InputDatePicker";
import { ModalDefault } from "@/components/modal/ModalDefault";
import { PlusOutlined } from "@ant-design/icons";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { InputForm } from "@/components/input";
import { InputTextArea } from "@/components/input/InputTextArea";
import { IRegistroAntropometrico } from "../interface/IRegistroAntropometrico";
import dayjs from "dayjs";
import { useMutation } from "@/utils/hooks/useMutation";

export const CriarRegistroAntropometricoModal = ({
  setData,
  refetch,
  idRelatorio,
}: {
  setData: (value: IRegistroAntropometrico) => void;
  refetch?: () => void;
  idRelatorio?: bigint;
}) => {
  const [open, setOpen] = useState(false);
  const { control, handleSubmit, reset } = useForm<IRegistroAntropometrico>();

  const adicionarRegistroAntropometrico = async (
    data: IRegistroAntropometrico
  ) => {
    if (setData) await setData(data);
    if (refetch && idRelatorio)
      await createRegistroAntropometrico({
        ...data,
        id_ficha_nutricional: idRelatorio,
      });
    await reset();
    await setOpen(false);
  };

  const { mutate: createRegistroAntropometrico } =
    useMutation<IRegistroAntropometrico>("/registro-antropometrico", {
      method: "post",
      messageSucess: "Registro Antropométrico cadastrado com sucesso!",
      onSuccess: () => {
        refetch && refetch();
      },
    });

  return (
    <ModalDefault
      onSubmit={handleSubmit(adicionarRegistroAntropometrico)}
      showFooter
      nameButtonOpenModal="Adicionar"
      iconButtonOpenModal={<PlusOutlined />}
      titleModal="Adicionando registro Antropométrico"
      okText="Adicionar"
      width="550px"
      setOpenModal={setOpen}
      openModal={open}
    >
      <form className="w-full flex flex-col gap-[15px]">
        <div className="flex gap-4">
          <Controller
            name="data"
            control={control}
            rules={{ required: "Campo obrigatório." }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <InputDatePicker
                required
                label="Data"
                error={error?.message}
                value={value && dayjs(value)}
                onChange={onChange}
                placeholder="Selecione data"
              />
            )}
          />
          <Controller
            name="peso"
            control={control}
            rules={{ required: "Campo obrigatório." }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <InputForm
                required
                label="Peso"
                error={error?.message}
                onChange={onChange}
                value={value}
                placeholder=""
                suffix="kg"
              />
            )}
          />
        </div>
        <div className="flex gap-4">
          <Controller
            name="edema"
            control={control}
            rules={{ required: "Campo obrigatório." }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <InputForm
                required
                label="Edema"
                error={error?.message}
                onChange={onChange}
                value={value}
                placeholder=""
              />
            )}
          />
          <Controller
            name="ascite"
            control={control}
            rules={{ required: "Campo obrigatório." }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <InputForm
                required
                label="Ascite"
                error={error?.message}
                onChange={onChange}
                value={value}
                placeholder=""
              />
            )}
          />
        </div>
        <div className="flex gap-4">
          <Controller
            name="imc"
            control={control}
            rules={{ required: "Campo obrigatório." }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <InputForm
                required
                label="IMC"
                error={error?.message}
                onChange={onChange}
                value={value}
                placeholder=""
                suffix="kg/m²"
              />
            )}
          />
          <Controller
            name="imc_classificacao"
            control={control}
            rules={{ required: "Campo obrigatório." }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <InputForm
                required
                label="Classificação"
                error={error?.message}
                onChange={onChange}
                value={value}
                placeholder=""
              />
            )}
          />
        </div>
        <div className="flex gap-4">
          <Controller
            name="cb"
            control={control}
            rules={{ required: "Campo obrigatório." }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <InputForm
                required
                label="CB"
                error={error?.message}
                onChange={onChange}
                value={value}
                placeholder=""
                suffix="cm"
              />
            )}
          />
          <Controller
            name="cp"
            control={control}
            rules={{ required: "Campo obrigatório." }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <InputForm
                required
                label="CP"
                error={error?.message}
                onChange={onChange}
                value={value}
                placeholder=""
                suffix="cm"
              />
            )}
          />
        </div>
        <div className="">
          <Controller
            name="observacao"
            control={control}
            defaultValue=""
            rules={{ required: "Campo obrigatório." }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <InputTextArea
                required
                label="Observações"
                error={error?.message}
                onChange={onChange}
                value={value}
                placeholder=""
                rows={4}
              />
            )}
          />
        </div>
      </form>
    </ModalDefault>
  );
};
