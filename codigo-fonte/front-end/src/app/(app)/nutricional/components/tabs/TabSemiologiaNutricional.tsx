import { Controller, useForm, useFormContext } from "react-hook-form";
import { InputTextArea } from "@/components/input/InputTextArea";
import { InputSelect } from "@/components/input";
import { Select } from "antd";
import { ISemiologiaNutricional } from "../../interface/ISemiologiaNutricional";

export const TabSemiologiaNutricional = () => {
  const { control } = useFormContext<ISemiologiaNutricional>();

  return (
    <div className="w-full flex flex-col gap-[15px]">
      <div className="">
        <Controller
          name="perda_aparente"
          control={control}
          defaultValue=""
          rules={{}}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <InputTextArea
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
          name="gordura_subcutanea"
          control={control}
          rules={{}}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <InputSelect
              label="Gordura Subcutânea"
              required={false}
              onChange={onChange}
              error={error?.message}
              placeholder="Selecionar"
              value={value}
              showSearch
            >
              <Select.Option>Teste</Select.Option>
            </InputSelect>
          )}
        />
        <Controller
          name="edema"
          control={control}
          rules={{}}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <InputSelect
              label="Edema"
              required={false}
              onChange={onChange}
              error={error?.message}
              placeholder="Selecionar"
              value={value}
              showSearch
            >
              <Select.Option value={"E0"}>E0</Select.Option>
              <Select.Option value={"E1"}>E1</Select.Option>
              <Select.Option value={"E3"}>E2</Select.Option>
              <Select.Option value={"E3"}>E3</Select.Option>
              <Select.Option value={"E4"}>E4</Select.Option>
            </InputSelect>
          )}
        />
      </div>
      <div className="flex gap-4">
        <Controller
          name="local_edema"
          control={control}
          rules={{}}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <InputSelect
              label="Local do Edema"
              required={false}
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
          name="ascite"
          control={control}
          rules={{}}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <InputSelect
              label="Ascite"
              required={false}
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
