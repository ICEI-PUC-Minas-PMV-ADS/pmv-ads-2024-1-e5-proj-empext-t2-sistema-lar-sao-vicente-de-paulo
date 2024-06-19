import { Controller, useForm, useFormContext } from "react-hook-form";
import { InputTextArea } from "@/components/input/InputTextArea";
import { InputSelect } from "@/components/input";
import { Select } from "antd";

import { IFormNutricional } from "../../interface/IFormNutricional";

export const TabSemiologiaNutricional = () => {
  const { control } = useFormContext<IFormNutricional>();

  return (
    <div className="w-full flex flex-col gap-[15px]">
      <div className="">
        <Controller
          name="semiologia_nutricional.perda_aparente"
          control={control}
          defaultValue=""
          rules={{ required: "Campo obrigatório." }}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <InputTextArea
              required
              label="Perda aparente de:"
              error={error?.message}
              onChange={onChange}
              value={value}
              placeholder=""
              rows={4}
            />
          )}
        />
      </div>
      <div className="flex gap-4">
        <Controller
          name="semiologia_nutricional.gordura_subcutanea"
          control={control}
          rules={{ required: "Campo obrigatório." }}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <InputSelect
              label="Gordura Subcutânea"
              required
              onChange={onChange}
              error={error?.message}
              placeholder="Selecionar"
              value={value}
              showSearch
            >
              <Select.Option value={"A"}>Ausente</Select.Option>
              <Select.Option value={"L"}>Leve</Select.Option>
              <Select.Option value={"M"}>Moderada</Select.Option>
              <Select.Option value={"G"}>Grave</Select.Option>
            </InputSelect>
          )}
        />
        <Controller
          name="semiologia_nutricional.edema"
          control={control}
          rules={{ required: "Campo obrigatório." }}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <InputSelect
              label="Edema"
              required
              onChange={onChange}
              error={error?.message}
              placeholder="Selecionar"
              value={value}
              showSearch
            >
              <Select.Option value={"E0"}>Sem edema</Select.Option>
              <Select.Option value={"E1"}>Recuperação imediata</Select.Option>
              <Select.Option value={"E3"}>
                Alguns segundos para recuperar
              </Select.Option>
              <Select.Option value={"E3"}>
                10 a 12 segundos para recuperar
              </Select.Option>
              <Select.Option value={"E4"}>
                +20 segundos para recuperar
              </Select.Option>
            </InputSelect>
          )}
        />
      </div>
      <div className="flex gap-4">
        <Controller
          name="semiologia_nutricional.local_edema"
          control={control}
          rules={{ required: "Campo obrigatório." }}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <InputSelect
              label="Local do Edema"
              required
              onChange={onChange}
              error={error?.message}
              placeholder="Selecionar"
              value={value}
              showSearch
            >
              <Select.Option value={"Tornozelo"}>Tornozelo</Select.Option>
              <Select.Option value={"Joelho"}>Joelho</Select.Option>
              <Select.Option value={"Coxa"}>Coxa</Select.Option>
              <Select.Option value={"Anasarca"}>Anasarca</Select.Option>
            </InputSelect>
          )}
        />
        <Controller
          name="semiologia_nutricional.ascite"
          control={control}
          rules={{ required: "Campo obrigatório." }}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <InputSelect
              label="Ascite"
              required
              onChange={onChange}
              error={error?.message}
              placeholder="Selecionar"
              value={value}
              showSearch
            >
              <Select.Option value={"A"}>A</Select.Option>
              <Select.Option value={"L"}>L</Select.Option>
              <Select.Option value={"M"}>M</Select.Option>
              <Select.Option value={"G"}>G</Select.Option>
            </InputSelect>
          )}
        />
      </div>
    </div>
  );
};
