import { Controller, useForm } from "react-hook-form";
import { IRelatorioNutricional } from "../../interface/IRelatorioNutricional";
import { InputTextArea } from "@/components/input/InputTextArea";
import { InputRadioButton } from "@/components/input/InputRadioButton";
import { InputForm } from "@/components/input";

export const TabDiagnosticoHipoteseClinico = () => {

    const { handleSubmit, control, reset, watch } = useForm<IRelatorioNutricional>();
    
    return (
        <div className="w-full flex flex-col gap-[15px]">
            <div className="">
                <Controller
                    name="especificacoes"
                    control={control}
                    defaultValue=""
                    rules={{}}
                    render={({
                        field: { onChange, value },
                        fieldState: { error },
                    }) => (
                        <InputTextArea
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
                <div className="flex">
                <Controller
                    name="possui_alergias_intolerancias"
                    control={control}
                    defaultValue={true}
                    rules={{}}
                    render={({
                        field: { onChange, value },
                        fieldState: { error },
                    }) => (
                        <InputRadioButton
                        label="Possui alergias/intorerâncias alimentares"
                        error={error?.message}
                        value={value}
                        required
                        onChange={onChange}
                        options={[
                            { label: "Sim", value: 1 },
                            { label: "Não", value: 2 },
                        ]}
                        />
                    )}
                />
                <Controller
                    name="quais_alergias_intolerancias"
                    control={control}
                    defaultValue=""
                    rules={{}}
                    render={({
                        field: { onChange, value },
                        fieldState: { error },
                    }) => (
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
    )
}