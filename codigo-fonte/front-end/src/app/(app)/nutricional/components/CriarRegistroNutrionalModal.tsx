import { useState } from "react";
import { ModalDefault } from "@/components/modal/ModalDefault";
import { PlusOutlined } from "@ant-design/icons";
import { InputDatePicker } from "@/components/input/InputDatePicker";
import { InputForm } from "@/components/input";
import { ICondutaNutricional } from "../interface/ICondutaNutricional";
import { Controller, useForm } from "react-hook-form";
import dayjs from "dayjs";
import { useMutation } from "@/utils/hooks/useMutation";

export const CriarRegistroNutriconalModal = ({
  setData,
  refetch,
  idRelatorio,
}: {
  setData?: (value: ICondutaNutricional) => void;
  refetch?: () => void;
  idRelatorio?: bigint;
}) => {
  const [open, setOpen] = useState(false);
  const { control, handleSubmit, reset } = useForm<ICondutaNutricional>();

  const adicionarRegistroNutriconal = async (data: ICondutaNutricional) => {
    if (setData) await setData(data);
    if (refetch && idRelatorio)
      await createRegistroNutriconal({
        ...data,
        id_ficha_nutricional: idRelatorio,
      });
    await reset();
    await setOpen(false);
  };

  const { mutate: createRegistroNutriconal } = useMutation<ICondutaNutricional>(
    "/conduta-nutricional",
    {
      method: "post",
      messageSucess: "Registro Nutricional cadastrado com sucesso!",
      onSuccess: () => {
        refetch && refetch();
      },
    }
  );
  return (
    <ModalDefault
      onSubmit={handleSubmit(adicionarRegistroNutriconal)}
      showFooter
      nameButtonOpenModal="Adicionar"
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
            rules={{ required: "Campo obrigatório." }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <InputDatePicker
                required
                label="Data"
                error={error?.message}
                value={value && dayjs(value)}
                onChange={onChange}
                placeholder="Selicione data"
              />
            )}
          />
          <Controller
            name="dieta"
            control={control}
            rules={{ required: "Campo obrigatório." }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <InputForm
                required
                label="Dieta Indicada"
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
            rules={{ required: "Campo obrigatório." }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <InputForm
                required
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
            rules={{ required: "Campo obrigatório." }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <InputForm
                required
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
            rules={{ required: "Campo obrigatório." }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <InputForm
                required
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
            rules={{ required: "Campo obrigatório." }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <InputForm
                required
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
            rules={{ required: "Campo obrigatório." }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <InputForm
                required
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
