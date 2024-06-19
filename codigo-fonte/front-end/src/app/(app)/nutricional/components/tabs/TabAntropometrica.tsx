import { Controller, useFormContext } from "react-hook-form";
import { InputRadioButton } from "@/components/input/InputRadioButton";
import { InputForm, InputSelect } from "@/components/input";
import { Divider, Select } from "antd";
import { IFormNutricional } from "../../interface/IFormNutricional";

export const TabAntropometria = () => {
  const { control } = useFormContext<IFormNutricional>();

  return (
    <div className="w-full flex flex-col gap-[15px]">
      <p
        style={{
          fontWeight: "bold",
        }}
      >
        Triagem
      </p>
      <div className="flex gap-4">
        <Controller
          name="antropometria_nutricional.triagem"
          control={control}
          rules={{ required: "Campo obrigatório." }}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <div className="whitespace-nowrap">
              <InputRadioButton
                required
                label="Selecione:"
                error={error?.message}
                value={value}
                onChange={onChange}
                options={[
                  { label: "NRS2002", value: "NRS2002" },
                  { label: "MNA", value: "MNA" },
                ]}
              />
            </div>
          )}
        />
        <Controller
          name="antropometria_nutricional.triagem_obs"
          control={control}
          defaultValue=""
          rules={{ required: "Campo obrigatório." }}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <InputForm
              required
              label="Observações"
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
          name="antropometria_nutricional.escore"
          control={control}
          defaultValue=""
          rules={{ required: "Campo obrigatório." }}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <InputForm
              required
              label="Escore"
              error={error?.message}
              onChange={onChange}
              value={value}
              placeholder=""
            />
          )}
        />
        <Controller
          name="antropometria_nutricional.triagem_classificacao"
          control={control}
          defaultValue=""
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
      <Divider
        style={{
          margin: 0,
        }}
      />
      <p
        style={{
          fontWeight: "bold",
        }}
      >
        Peso
      </p>
      <div className="flex gap-4">
        <Controller
          name="antropometria_nutricional.perda_peso"
          control={control}
          rules={{ required: "Campo obrigatório." }}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <InputForm
              required
              label="% de Perda de Peso"
              error={error?.message}
              onChange={onChange}
              value={value}
              placeholder=""
              suffix="%"
            />
          )}
        />
        <Controller
          name="antropometria_nutricional.peso_atual"
          control={control}
          rules={{ required: "Campo obrigatório." }}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <InputForm
              required
              label="Peso Atual"
              error={error?.message}
              onChange={onChange}
              value={value}
              placeholder=""
              suffix="kg"
            />
          )}
        />
        <Controller
          name="antropometria_nutricional.peso_estimado"
          control={control}
          rules={{ required: "Campo obrigatório." }}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <InputForm
              required
              label="Peso Estimado"
              error={error?.message}
              onChange={onChange}
              value={value}
              placeholder=""
              suffix="kg"
            />
          )}
        />
        <Controller
          name="antropometria_nutricional.peso_seco"
          control={control}
          rules={{ required: "Campo obrigatório." }}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <InputForm
              required
              label="Peso Seco"
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
          name="antropometria_nutricional.pp"
          control={control}
          rules={{ required: "Campo obrigatório." }}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <InputForm
              required
              label="PP"
              error={error?.message}
              onChange={onChange}
              value={value}
              placeholder=""
              suffix="kg"
            />
          )}
        />
        <Controller
          name="antropometria_nutricional.pp_kg"
          control={control}
          rules={{ required: "Campo obrigatório." }}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <InputForm
              required
              label="% PP"
              error={error?.message}
              onChange={onChange}
              value={value}
              placeholder=""
              suffix="%"
            />
          )}
        />
        <Controller
          name="antropometria_nutricional.pp_tempo"
          control={control}
          rules={{ required: "Campo obrigatório." }}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <InputForm
              required
              label="Tempo"
              error={error?.message}
              onChange={onChange}
              value={value}
              placeholder=""
            />
          )}
        />
        <Controller
          name="antropometria_nutricional.pp_classificacao"
          control={control}
          rules={{ required: "Campo obrigatório." }}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <InputSelect
              label="PP"
              required
              onChange={onChange}
              error={error?.message}
              placeholder="Selecionar"
              value={value}
              showSearch
            >
              <Select.Option value={"M"}>M</Select.Option>
              <Select.Option value={"G"}>G</Select.Option>
            </InputSelect>
          )}
        />
      </div>
      <Divider
        style={{
          margin: 0,
        }}
      />
      <p
        style={{
          fontWeight: "bold",
        }}
      >
        Altura(m)
      </p>
      <div className="flex gap-4">
        <Controller
          name="antropometria_nutricional.altura_atual"
          control={control}
          rules={{ required: "Campo obrigatório." }}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <InputForm
              required
              label="Altura atual"
              error={error?.message}
              onChange={onChange}
              value={value}
              placeholder=""
              suffix="m"
            />
          )}
        />
        <Controller
          name="antropometria_nutricional.altura_estimada"
          control={control}
          rules={{ required: "Campo obrigatório." }}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <InputForm
              required
              label="Altura estimada"
              error={error?.message}
              onChange={onChange}
              value={value}
              placeholder=""
              suffix="m"
            />
          )}
        />
        <Controller
          name="antropometria_nutricional.altura_aj"
          control={control}
          rules={{ required: "Campo obrigatório." }}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <InputForm
              required
              label="AJ"
              error={error?.message}
              onChange={onChange}
              value={value}
              placeholder=""
              suffix="cm"
            />
          )}
        />
      </div>
      <Divider
        style={{
          margin: 0,
        }}
      />
      <p
        style={{
          fontWeight: "bold",
        }}
      >
        IMC
      </p>
      <div className="flex gap-4">
        <Controller
          name="antropometria_nutricional.imc"
          control={control}
          rules={{ required: "Campo obrigatório." }}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <InputForm
              required
              label="Resultado IMC"
              error={error?.message}
              onChange={onChange}
              value={value}
              placeholder=""
              suffix="kg/m²"
            />
          )}
        />
        <Controller
          name="antropometria_nutricional.imc_classificacao"
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
      <Divider
        style={{
          margin: 0,
        }}
      />
      <p
        style={{
          fontWeight: "bold",
        }}
      >
        Perímetros(cm)
      </p>
      <div className="flex gap-4 items-center">
        <Controller
          name="antropometria_nutricional.circ_braco"
          control={control}
          rules={{ required: "Campo obrigatório." }}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <InputForm
              required
              label="Circ. Braço"
              error={error?.message}
              onChange={onChange}
              value={value}
              placeholder=""
              suffix="cm"
            />
          )}
        />
        <Controller
          name="antropometria_nutricional.braco_lado"
          control={control}
          rules={{ required: "Campo obrigatório." }}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <div className="h-full whitespace-nowrap self-end">
              <InputRadioButton
                label=""
                error={error?.message}
                value={value}
                required
                onChange={onChange}
                options={[
                  { label: "E", value: "E" },
                  { label: "D", value: "D" },
                ]}
              />
            </div>
          )}
        />
        <Controller
          name="antropometria_nutricional.circ_braco_percentil"
          control={control}
          rules={{ required: "Campo obrigatório." }}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <InputForm
              required
              label="Percentil"
              error={error?.message}
              onChange={onChange}
              value={value}
              placeholder=""
            />
          )}
        />
        <Controller
          name="antropometria_nutricional.circ_braco_classificacao"
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
          name="antropometria_nutricional.circ_panturrilha"
          control={control}
          rules={{ required: "Campo obrigatório." }}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <InputForm
              required
              label="Circ. Panturrilha"
              error={error?.message}
              onChange={onChange}
              value={value}
              placeholder=""
              suffix="cm"
            />
          )}
        />
        <Controller
          name="antropometria_nutricional.circ_panturrilha_percentil"
          control={control}
          rules={{ required: "Campo obrigatório." }}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <InputForm
              required
              label="Percentil"
              error={error?.message}
              onChange={onChange}
              value={value}
              placeholder=""
            />
          )}
        />
        <Controller
          name="antropometria_nutricional.circ_panturrilha_classificacao"
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
        <div className="w-1/3">
          <Controller
            name="antropometria_nutricional.circ_abdominal"
            control={control}
            rules={{ required: "Campo obrigatório." }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <InputForm
                required
                label="Circ. Abdominal"
                error={error?.message}
                onChange={onChange}
                value={value}
                placeholder=""
                suffix="cm"
              />
            )}
          />
        </div>
      </div>
    </div>
  );
};
