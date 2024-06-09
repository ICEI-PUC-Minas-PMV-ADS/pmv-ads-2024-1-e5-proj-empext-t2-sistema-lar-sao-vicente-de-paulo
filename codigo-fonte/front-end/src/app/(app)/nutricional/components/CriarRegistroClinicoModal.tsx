import { InputDatePicker } from "@/components/input/InputDatePicker";
import { ModalDefault } from "@/components/modal/ModalDefault";
import { authToken } from "@/config/authToken";
import { PlusOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { Controller, useForm } from "react-hook-form";
import { InputForm } from "@/components/input";
import { InputTextArea } from "@/components/input/InputTextArea";
import { IQuadroClinico } from "../interface/IQuadroClinico";

export const CriarRegistroClinicoModal = ({}: {}) => {
  const [cookies] = useCookies([authToken.nome]);
  const [open, setOpen] = useState(false);
  const { control } = useForm<IQuadroClinico>();

  return (
    <ModalDefault
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
            name="aceitacao_alimentar"
            control={control}
            rules={{}}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <InputForm
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
            rules={{}}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <InputForm
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
            rules={{}}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <InputForm
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
            rules={{}}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <InputForm
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
            rules={{}}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <InputForm
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
            rules={{}}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <InputForm
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
            rules={{}}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <InputForm
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
            rules={{}}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <InputForm
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
            rules={{}}
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
