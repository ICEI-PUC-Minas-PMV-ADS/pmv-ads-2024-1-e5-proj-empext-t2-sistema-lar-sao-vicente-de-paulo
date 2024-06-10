import { Controller, useFormContext } from "react-hook-form";
import { InputForm } from "@/components/input";
import { InputRadioButton } from "@/components/input/InputRadioButton";
import { Divider } from "antd";
import { INecessidadeNutricional } from "../../interface/INecessidadeNutricional";

export const TabNecessidadesNutricionais = () => {
  const { control } = useFormContext<INecessidadeNutricional>();

  return (
    <div className="w-full flex flex-col gap-[15px]">
      <div className="flex gap-4">
        <Controller
          name="peso"
          control={control}
          rules={{}}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <InputForm
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
          name="peso_tipo"
          control={control}
          rules={{}}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <InputRadioButton
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
          name="peso_obs"
          control={control}
          rules={{}}
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
          name="caloria"
          control={control}
          rules={{}}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <InputForm
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
          name="caloria_metodo"
          control={control}
          rules={{}}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <InputRadioButton
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
          name="caloria_observacao"
          control={control}
          rules={{}}
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
          name="proteina"
          control={control}
          rules={{}}
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
          name="proteina_metodo"
          control={control}
          rules={{}}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <InputRadioButton
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
          name="proteina_observacao"
          control={control}
          rules={{}}
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
          name="hidrica"
          control={control}
          rules={{}}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <InputForm
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
          name="hidrica_observacao"
          control={control}
          rules={{}}
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
