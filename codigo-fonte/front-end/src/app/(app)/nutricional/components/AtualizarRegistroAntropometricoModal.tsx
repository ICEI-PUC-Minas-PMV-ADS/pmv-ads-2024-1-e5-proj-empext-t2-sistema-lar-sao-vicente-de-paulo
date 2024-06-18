import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { IRegistroAntropometrico } from "../interface/IRegistroAntropometrico";
import dayjs from "dayjs";
import { InputForm } from "@/components/input";
import { InputDatePicker } from "@/components/input/InputDatePicker";
import { InputTextArea } from "@/components/input/InputTextArea";
import { ModalDefault } from "@/components/modal/ModalDefault";
import { EditOutlined, UserAddOutlined } from "@ant-design/icons";

import { Tooltip } from "antd";
import { useMutation } from "@/utils/hooks/useMutation";
import { useFetch } from "@/utils/hooks/useFetch";

export const AtualizarRegistroAntropometricoModal = ({
  setData,
  data,
  uid,
  refetch,
}: {
  setData?: (value: IRegistroAntropometrico) => void;
  data?: IRegistroAntropometrico;
  uid?: string;
  refetch?: () => void;
}) => {
  const [open, setOpen] = useState(false);
  const { control, handleSubmit, setValue } = useForm<IRegistroAntropometrico>({
    defaultValues: data,
  });

  useFetch<IRegistroAntropometrico>("/registro-antropometrico/" + uid, [uid], {
    enable: open && !!uid,
    onSuccess: (data) => {
      const registro = data.data;
      if (registro) {
        setValue("ascite", registro.ascite);
        setValue("cb", registro.cb);
        setValue("cp", registro.cp);
        setValue("data", registro.data);
        setValue("edema", registro.edema);
        setValue("imc", registro.imc);
        setValue("imc_classificacao", registro.imc_classificacao);
        setValue("observacao", registro.observacao);
        setValue("peso", registro.peso);
      }
    },
  });

  const adicionarRegistroAntropometrico = async (
    data: IRegistroAntropometrico
  ) => {
    if (setData) await setData(data);
    if (refetch && uid) await updateRegistroAntropometrico(data);
    await setOpen(false);
  };

  const { mutate: updateRegistroAntropometrico } = useMutation<
    Partial<IRegistroAntropometrico>
  >("/registro-antropometrico/" + uid, {
    method: "patch",
    messageSucess: "Registro Antropométrico atualizado com sucesso!",
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
      titleModal={"Atualizando registro Antropométrico"}
      okText="Salvar"
      onSubmit={handleSubmit(adicionarRegistroAntropometrico)}
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
