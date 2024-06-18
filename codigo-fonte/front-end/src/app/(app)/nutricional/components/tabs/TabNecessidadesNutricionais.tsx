import { Controller, useFormContext } from "react-hook-form";
import { InputForm } from "@/components/input";
import { InputRadioButton } from "@/components/input/InputRadioButton";
import { Divider } from "antd";
import { IFormNutricional } from "../../interface/IFormNutricional";

export const TabNecessidadesNutricionais = () => {
  const { control } = useFormContext<IFormNutricional>();

  return (
    <div className="w-full flex flex-col gap-[15px]">
      <div className="flex gap-4">
        <Controller
          name="necessidade_nutricional.peso"
          control={control}
          rules={{ required: "Campo obrigatório." }}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <InputForm
              required
              label="Peso(kg)"
              error={error?.message}
              onChange={onChange}
              value={value}
              placeholder=""
              suffix="kg"
            />
          )}
        />
        <Controller
          name="necessidade_nutricional.peso_tipo"
          control={control}
          rules={{ required: "Campo obrigatório." }}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <InputRadioButton
              required
              label="Tipo"
              error={error?.message}
              value={value}
              onChange={onChange}
              options={[
                { label: "Atual", value: "Atual" },
                { label: "Estimado", value: "Estimado" },
                { label: "Seco", value: "Seco" },
              ]}
            />
          )}
        />
        <Controller
          name="necessidade_nutricional.peso_obs"
          control={control}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <InputForm
              label="Observação"
              error={error?.message}
              onChange={onChange}
              value={value}
              placeholder=""
            />
          )}
        />
      </div>
      <Divider
        style={{
          margin: 0,
        }}
      />
      <div className="flex gap-4">
        <Controller
          name="necessidade_nutricional.caloria"
          control={control}
          rules={{ required: "Campo obrigatório." }}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <InputForm
              required
              label="Calorias(kcal)"
              error={error?.message}
              onChange={onChange}
              value={value}
              placeholder=""
              suffix="kcal"
            />
          )}
        />
        <Controller
          name="necessidade_nutricional.caloria_metodo"
          control={control}
          rules={{ required: "Campo obrigatório." }}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <InputRadioButton
              required
              label="Método"
              error={error?.message}
              value={value}
              onChange={onChange}
              options={[
                { label: "FDB", value: "FDB" },
                { label: "Outro", value: "Outro" },
              ]}
            />
          )}
        />
        <Controller
          name="necessidade_nutricional.caloria_observacao"
          control={control}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <InputForm
              label="Observação"
              error={error?.message}
              onChange={onChange}
              value={value}
              placeholder=""
            />
          )}
        />
      </div>
      <Divider
        style={{
          margin: 0,
        }}
      />
      <div className="flex gap-4">
        <Controller
          name="necessidade_nutricional.proteina"
          control={control}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <InputForm
              label="Proteína(g)"
              error={error?.message}
              onChange={onChange}
              value={value}
              placeholder=""
              suffix="g"
            />
          )}
        />
        <Controller
          name="necessidade_nutricional.proteina_metodo"
          control={control}
          rules={{ required: "Campo obrigatório." }}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <InputRadioButton
              required
              label="Método"
              error={error?.message}
              value={value}
              onChange={onChange}
              options={[
                { label: "Prático", value: "Pratico" },
                { label: "VCT", value: "VCT" },
              ]}
            />
          )}
        />
        <Controller
          name="necessidade_nutricional.proteina_observacao"
          control={control}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <InputForm
              label="Observação"
              error={error?.message}
              onChange={onChange}
              value={value}
              placeholder=""
            />
          )}
        />
      </div>
      <Divider
        style={{
          margin: 0,
        }}
      />
      <div className="flex gap-4">
        <Controller
          name="necessidade_nutricional.hidrica"
          control={control}
          rules={{ required: "Campo obrigatório." }}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <InputForm
              required
              label="Hídrica(ml)"
              error={error?.message}
              onChange={onChange}
              value={value}
              placeholder=""
              suffix="ml"
            />
          )}
        />
        <Controller
          name="necessidade_nutricional.hidrica_observacao"
          control={control}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <InputForm
              label="Observação"
              error={error?.message}
              onChange={onChange}
              value={value}
              placeholder=""
            />
          )}
        />
      </div>
    </div>
  );
};
