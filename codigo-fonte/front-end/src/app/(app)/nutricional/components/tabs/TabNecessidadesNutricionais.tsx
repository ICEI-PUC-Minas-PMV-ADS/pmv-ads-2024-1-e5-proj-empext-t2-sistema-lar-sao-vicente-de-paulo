import { Controller, useForm } from "react-hook-form";
import { IRelatorioNutricional } from "../../interface/IRelatorioNutricional";
import { InputForm } from "@/components/input";
import { InputRadioButton } from "@/components/input/InputRadioButton";
import { Divider } from "antd";

export const TabNecessidadesNutricionais = () => {

    const { handleSubmit, control, reset, watch } = useForm<IRelatorioNutricional>();
    
    return (
        <div className="w-full flex flex-col gap-[15px]">
            <div className="flex gap-4">
                <Controller
                    name="peso_necessidades_nutricionais"
                    control={control}
                    rules={{}}
                    render={({
                    field: { onChange, value },
                    fieldState: { error },
                    }) => (
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
                    name="tipo"
                    control={control}
                    rules={{}}
                    render={({
                        field: { onChange, value },
                        fieldState: { error },
                    }) => (
                        <InputRadioButton
                        label="Tipo"
                        error={error?.message}
                        value={value}
                        onChange={onChange}
                        options={[
                            { label: "Atual", value: 1 },
                            { label: "Estimado", value: 2 },
                            { label: "Seco", value: 2 },
                        ]}
                    />
                    )}
                />
                <Controller
                    name="observacao_necessidades_nutrionais_peso"
                    control={control}
                    rules={{}}
                    render={({
                    field: { onChange, value },
                    fieldState: { error },
                    }) => (
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
            <Divider  style={{
                margin: 0
            }}/>
            <div className="flex gap-4">
                <Controller
                    name="calorias"
                    control={control}
                    rules={{}}
                    render={({
                    field: { onChange, value },
                    fieldState: { error },
                    }) => (
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
                    name="metodo_calorias"
                    control={control}
                    rules={{}}
                    render={({
                        field: { onChange, value },
                        fieldState: { error },
                    }) => (
                        <InputRadioButton
                        label="Método"
                        error={error?.message}
                        value={value}
                        onChange={onChange}
                        options={[
                            { label: "Fórmula de bolso", value: 1 },
                            { label: "Outro", value: 2 },
                        ]}
                    />
                    )}
                />
                <Controller
                    name="observacao_calorias"
                    control={control}
                    rules={{}}
                    render={({
                    field: { onChange, value },
                    fieldState: { error },
                    }) => (
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
            <Divider  style={{
                margin: 0
            }}/>
            <div className="flex gap-4">
                <Controller
                    name="proteinas"
                    control={control}
                    rules={{}}
                    render={({
                    field: { onChange, value },
                    fieldState: { error },
                    }) => (
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
                    name="metodo_proteinas"
                    control={control}
                    rules={{}}
                    render={({
                        field: { onChange, value },
                        fieldState: { error },
                    }) => (
                        <InputRadioButton
                        label="Método"
                        error={error?.message}
                        value={value}
                        onChange={onChange}
                        options={[
                            { label: "Prático", value: 1 },
                            { label: "%VCT", value: 2 },
                        ]}
                    />
                    )}
                />
                <Controller
                    name="observacao_proteinas"
                    control={control}
                    rules={{}}
                    render={({
                    field: { onChange, value },
                    fieldState: { error },
                    }) => (
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
            <Divider  style={{
                margin: 0
            }}/>
            <div className="flex gap-4">
                <Controller
                    name="hidrica"
                    control={control}
                    rules={{}}
                    render={({
                    field: { onChange, value },
                    fieldState: { error },
                    }) => (
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
                    name="observacao_hidrica"
                    control={control}
                    rules={{}}
                    render={({
                    field: { onChange, value },
                    fieldState: { error },
                    }) => (
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
    )
}