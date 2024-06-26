import { Controller, useForm, useFormContext } from "react-hook-form";
import { InputTextArea } from "@/components/input/InputTextArea";
import { InputRadioButton } from "@/components/input/InputRadioButton";
import { InputForm } from "@/components/input";
import { IFormNutricional } from "../../interface/IFormNutricional";

export const TabDiagnosticoHipoteseClinico = () => {
  const { control } = useFormContext<IFormNutricional>();

  return (
    <div className="w-full flex flex-col gap-[15px]">
      <div className="">
        <Controller
          name="especificacao"
          control={control}
          defaultValue=""
          rules={{ required: "Campo obrigatório." }}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <InputTextArea
              required
              label="Especificações"
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
        <div className="flex-grow w-50">
          <Controller
            name="alergia_intolerancia"
            control={control}
            defaultValue={false}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <InputRadioButton
                label="Possui alergias/intolerâncias alimentares"
                error={error?.message}
                value={value}
                required
                onChange={onChange}
                options={[
                  { label: "Sim", value: true },
                  { label: "Não", value: false },
                ]}
              />
            )}
          />
        </div>
        <div className="flex-grow w-50">
          <Controller
            name="alergia_intolerancia_obs"
            control={control}
            defaultValue=""
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <InputForm
                label="Quais são"
                error={error?.message}
                onChange={onChange}
                value={value}
                placeholder=""
              />
            )}
          />
        </div>
      </div>
    </div>
  );
};
