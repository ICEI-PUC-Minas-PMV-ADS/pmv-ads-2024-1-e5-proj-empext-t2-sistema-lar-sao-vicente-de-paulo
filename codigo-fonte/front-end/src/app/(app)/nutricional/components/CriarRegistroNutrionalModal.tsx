import { useState } from "react";
import { ModalDefault } from "@/components/modal/ModalDefault";
import { PlusOutlined } from "@ant-design/icons";
import { InputDatePicker } from "@/components/input/InputDatePicker";
import { InputForm } from "@/components/input";
import { ICondutaNutricional } from "../interface/ICondutaNutricional";
import { Controller, useForm } from "react-hook-form";

export const CriarRegistroNutriconalModal = ({
  setData,
}: {
  setData: (value: ICondutaNutricional) => void;
}) => {
  const [open, setOpen] = useState(false);
  const { control, handleSubmit, reset } = useForm<ICondutaNutricional>();

  const adicionarRegistroNutricional = async (data: ICondutaNutricional) => {
    if (setData) await setData(data);

    await reset();
    await setOpen(false);
  };

  return (
    <ModalDefault
      onSubmit={handleSubmit(adicionarRegistroNutricional)}
      showFooter
      nameButtonOpenModal="Adcionar"
      iconButtonOpenModal={<PlusOutlined />}
      titleModal="Adicionando registro Nutricional"
      okText="Adicionar"
      width="800px"
      setOpenModal={setOpen}
      openModal={open}
    >
      <form className="w-full flex flex-col gap-[15px]">
        <div className="flex gap-4">
          <Controller
            name="data"
            control={control}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <InputDatePicker
                label="Data"
                error={error?.message}
                onChange={onChange}
                placeholder="Selicione data"
              />
            )}
          />
          <Controller
            name="dieta"
            control={control}
            rules={{}}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <InputForm
                label="Data Indicada"
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
            name="volume"
            control={control}
            rules={{}}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <InputForm
                label="Volume"
                error={error?.message}
                onChange={onChange}
                value={value}
                placeholder=""
              />
            )}
          />
          <Controller
            name="fracionamento"
            control={control}
            rules={{}}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <InputForm
                label="Fracionamento"
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
            name="kcal_dia"
            control={control}
            rules={{}}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <InputForm
                label="Kcal/Dia"
                error={error?.message}
                onChange={onChange}
                value={value}
                placeholder=""
              />
            )}
          />
          <Controller
            name="ptn_dia"
            control={control}
            rules={{}}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <InputForm
                label="PTN/Dia"
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
            name="agua_ml"
            control={control}
            rules={{}}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <InputForm
                label="Água p/Hidratação"
                error={error?.message}
                onChange={onChange}
                value={value}
                placeholder=""
              />
            )}
          />
        </div>
      </form>
    </ModalDefault>
  );
};
