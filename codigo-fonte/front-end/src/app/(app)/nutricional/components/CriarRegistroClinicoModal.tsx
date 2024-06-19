import { InputDatePicker } from "@/components/input/InputDatePicker";
import { ModalDefault } from "@/components/modal/ModalDefault";
import { PlusOutlined } from "@ant-design/icons";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { InputForm } from "@/components/input";
import { InputTextArea } from "@/components/input/InputTextArea";
import { IQuadroClinico } from "../interface/IQuadroClinico";
import { useMutation } from "@/utils/hooks/useMutation";

export const CriarRegistroClinicoModal = ({
  setData,
  refetch,
  idRelatorio,
}: {
  setData?: (value: IQuadroClinico) => void;
  refetch?: () => void;
  idRelatorio?: bigint;
}) => {
  const [open, setOpen] = useState(false);
  const { control, handleSubmit, reset } = useForm<IQuadroClinico>();

  const adicionarQuadroClinico = async (data: IQuadroClinico) => {
    if (setData) await setData(data);
    if (refetch && idRelatorio)
      await createQuadroClinico({
        ...data,
        id_ficha_nutricional: idRelatorio,
      });
    await reset();
    await setOpen(false);
  };

  const { mutate: createQuadroClinico } = useMutation<IQuadroClinico>(
    "/quadro-clinico",
    {
      method: "post",
      messageSucess: "Quadro Clínico cadastrado com sucesso!",
      onSuccess: () => {
        refetch && refetch();
      },
    }
  );

  return (
    <ModalDefault
      onSubmit={handleSubmit(adicionarQuadroClinico)}
      showFooter
      nameButtonOpenModal="Adicionar"
      iconButtonOpenModal={<PlusOutlined />}
      titleModal="Adicionando registro Clínico"
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
