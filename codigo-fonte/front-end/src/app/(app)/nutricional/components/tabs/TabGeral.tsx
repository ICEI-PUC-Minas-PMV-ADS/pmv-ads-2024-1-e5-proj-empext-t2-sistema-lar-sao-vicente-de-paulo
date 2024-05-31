import { InputTextArea } from "@/components/input/InputTextArea";
import { Controller, useForm } from "react-hook-form";
import { IRelatorioNutricional } from "../../interface/IRelatorioNutricional";

export const TabGeral = () => {

    const { handleSubmit, control, reset, watch } = useForm<IRelatorioNutricional>();
    
    return (
        <div className="w-full flex flex-col gap-[15px]">
            <div className="">
                <Controller
                    name="diagnostico"
                    control={control}
                    defaultValue=""
                    rules={{}}
                    render={({
                        field: { onChange, value },
                        fieldState: { error },
                    }) => (
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
                    name="observacoes"
                    control={control}
                    defaultValue=""
                    rules={{}}
                    render={({
                        field: { onChange, value },
                        fieldState: { error },
                    }) => (
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
    )
} 