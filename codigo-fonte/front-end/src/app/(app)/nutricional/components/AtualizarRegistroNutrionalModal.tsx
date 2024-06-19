import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { InputForm } from "@/components/input";
import { InputDatePicker } from "@/components/input/InputDatePicker";
import { InputTextArea } from "@/components/input/InputTextArea";
import { ModalDefault } from "@/components/modal/ModalDefault";
import { EditOutlined, UserAddOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";
import { useMutation } from "@/utils/hooks/useMutation";
import { useFetch } from "@/utils/hooks/useFetch";
import dayjs from "dayjs";
import { ICondutaNutricional } from "../interface/ICondutaNutricional";

export const AtualizarRegistroNutrionalModal = ({
  setData,
  data,
  uid,
  refetch,
}: {
  setData?: (value: ICondutaNutricional) => void;
  data?: ICondutaNutricional;
  uid?: string;
  refetch?: () => void;
}) => {
  const [open, setOpen] = useState(false);
  const { control, handleSubmit, setValue } = useForm<ICondutaNutricional>({
    defaultValues: data,
  });

  useFetch<ICondutaNutricional>("conduta-nutricional" + uid, [uid], {
    enable: open && !!uid,
    onSuccess: (data) => {
      const registro = data.data;
      if (registro) {
        setValue("agua_ml", registro.agua_ml);
        setValue("data", registro.data);
        setValue("dieta", registro.dieta);
        setValue("fracionamento", registro.fracionamento);
        setValue("kcal_dia", registro.kcal_dia);
        setValue("ptn_dia", registro.ptn_dia);
        setValue("volume", registro.volume);
      }
    },
  });

  const adicionarCondutaNutricional = async (data: ICondutaNutricional) => {
    if (setData) await setData(data);
    if (refetch && uid) await updateQuadroClinico(data);
    await setOpen(false);
  };

  const { mutate: updateQuadroClinico } = useMutation<
    Partial<ICondutaNutricional>
  >("/quadro-clinico/" + uid, {
    method: "patch",
    messageSucess: "Registro Nutricional atualizado com sucesso!",
    onSuccess: () => {
      refetch && refetch();
    },
  });

  return (
    <ModalDefault
      showFooter
      customButtonOpenModal={
        <Tooltip title={"Editar"}>
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="text-black/30 hover:text-primaria h-full w-[50px] flex justify-center items-center"
          >
            <EditOutlined className={"text-[18px]"} />
          </button>
        </Tooltip>
      }
      iconButtonOpenModal={<UserAddOutlined />}
      titleModal={"Atualizando registro Nutricional"}
      okText="Salvar"
      onSubmit={handleSubmit(adicionarCondutaNutricional)}
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
