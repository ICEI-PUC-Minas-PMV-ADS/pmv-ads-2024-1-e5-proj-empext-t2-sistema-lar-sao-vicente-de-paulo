import { InputTextArea } from "@/components/input/InputTextArea";
import { Controller, useFormContext } from "react-hook-form";
import { IFormNutricional } from "../../interface/IFormNutricional";

export const TabGeral = () => {
  const { control } = useFormContext<IFormNutricional>();

  return (
    <div className="w-full flex flex-col gap-[15px]">
      <div className="">
        <Controller
          name="diagnostico"
          control={control}
          defaultValue=""
          rules={{}}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <InputTextArea
              label="Diagnóstico Nutricional"
              error={error?.message}
              onChange={onChange}
              value={value}
              placeholder=""
              rows={4}
            />
          )}
        />
        <Controller
          name="observacao"
          control={control}
          defaultValue=""
          rules={{}}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <InputTextArea
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
    </div>
  );
};
