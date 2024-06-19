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
import { IQuadroClinico } from "../interface/IQuadroClinico";
import dayjs from "dayjs";

export const AtualizarRegistroClinicoModal = ({
  setData,
  data,
  uid,
  refetch,
}: {
  setData?: (value: IQuadroClinico) => void;
  data?: IQuadroClinico;
  uid?: string;
  refetch?: () => void;
}) => {
  const [open, setOpen] = useState(false);
  const { control, handleSubmit, setValue } = useForm<IQuadroClinico>({
    defaultValues: data,
  });

  useFetch<IQuadroClinico>("/quadro-clinico/" + uid, [uid], {
    enable: open && !!uid,
    onSuccess: (data) => {
      const registro = data.data;
      if (registro) {
        setValue("aceitacao_alimentar", registro.aceitacao_alimentar);
        setValue("apetite", registro.apetite);
        setValue("data", registro.data);
        setValue("disfagia", registro.disfagia);
        setValue("diurese", registro.diurese);
        setValue("dor_abdominal", registro.dor_abdominal);
        setValue("evacuacao", registro.evacuacao);
        setValue("nausea_vomito", registro.nausea_vomito);
        setValue("observacao", registro.observacao);
        setValue("suplemento_oral", registro.suplemento_oral);
      }
    },
  });

  const adicionarQuadroClinico = async (data: IQuadroClinico) => {
    if (setData) await setData(data);
    if (refetch && uid) await updateQuadroClinico(data);
    await setOpen(false);
  };

  const { mutate: updateQuadroClinico } = useMutation<Partial<IQuadroClinico>>(
    "/quadro-clinico/" + uid,
    {
      method: "patch",
      messageSucess: "Quadro Clínico atualizado com sucesso!",
      onSuccess: () => {
        refetch && refetch();
      },
    }
  );

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
      titleModal={"Atualizando registro Clínico"}
      okText="Salvar"
      onSubmit={handleSubmit(adicionarQuadroClinico)}
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
            name="aceitacao_alimentar"
            control={control}
            rules={{ required: "Campo obrigatório." }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <InputForm
                required
                label="Aceitação Dieta Vo"
                error={error?.message}
                onChange={onChange}
                value={value}
                placeholder=""
              />
            )}
          />
          <Controller
            name="suplemento_oral"
            control={control}
            rules={{ required: "Campo obrigatório." }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <InputForm
                required
                label="Suplemento Oral"
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
            name="apetite"
            control={control}
            rules={{ required: "Campo obrigatório." }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <InputForm
                required
                label="Apetite"
                error={error?.message}
                onChange={onChange}
                value={value}
                placeholder=""
              />
            )}
          />
          <Controller
            name="disfagia"
            control={control}
            rules={{ required: "Campo obrigatório." }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <InputForm
                required
                label="Disfagia"
                error={error?.message}
                onChange={onChange}
                value={value}
                placeholder=""
              />
            )}
          />
          <Controller
            name="nausea_vomito"
            control={control}
            rules={{ required: "Campo obrigatório." }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <InputForm
                required
                label="Náusea/Vômito"
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
            name="dor_abdominal"
            control={control}
            rules={{ required: "Campo obrigatório." }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <InputForm
                required
                label="Dor Abdominal"
                error={error?.message}
                onChange={onChange}
                value={value}
                placeholder=""
              />
            )}
          />
          <Controller
            name="evacuacao"
            control={control}
            rules={{ required: "Campo obrigatório." }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <InputForm
                required
                label="Evacuação"
                error={error?.message}
                onChange={onChange}
                value={value}
                placeholder=""
              />
            )}
          />
          <Controller
            name="diurese"
            control={control}
            rules={{ required: "Campo obrigatório." }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <InputForm
                required
                label="Diurese"
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
            name="observacao"
            control={control}
            defaultValue=""
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <InputTextArea
                label="Observação"
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
