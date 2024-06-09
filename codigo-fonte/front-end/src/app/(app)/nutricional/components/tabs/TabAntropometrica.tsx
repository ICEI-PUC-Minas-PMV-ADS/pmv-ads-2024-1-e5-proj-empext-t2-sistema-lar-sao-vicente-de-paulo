import { Controller, useForm } from "react-hook-form";
import { IRelatorioNutricional } from "../../interface/IRelatorioNutricional";
import { InputRadioButton } from "@/components/input/InputRadioButton";
import { InputForm, InputSelect } from "@/components/input";
import { Divider, Select } from "antd";

export const TabAntropometria = () => {

    const { handleSubmit, control, reset, watch } = useForm<IRelatorioNutricional>();
    
    return (
        <div className="w-full flex flex-col gap-[15px]">
            <p style={{
                fontWeight:'bold'
            }}>
            Triagem
            </p>
            <div className="flex gap-4">
                <Controller
                    name="triagem"
                    control={control}
                    rules={{}}
                    render={({
                        field: { onChange, value },
                        fieldState: { error },
                    }) => (
                        <InputRadioButton
                        label="Selecione:"
                        error={error?.message}
                        value={value}
                        onChange={onChange}
                        options={[
                            { label: "NRS2002", value: 1 },
                            { label: "MNA", value: 2 },
                        ]}
                        />
                    )}
                />
                <Controller
                    name="observacoes_antropometria"
                    control={control}
                    defaultValue=""
                    rules={{}}
                    render={({
                    field: { onChange, value },
                    fieldState: { error },
                    }) => (
                    <InputForm
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
                    name="escore"
                    control={control}
                    defaultValue=""
                    rules={{}}
                    render={({
                    field: { onChange, value },
                    fieldState: { error },
                    }) => (
                    <InputForm
                        label="Escore"
                        error={error?.message}
                        onChange={onChange}
                        value={value}
                        placeholder=""
                    />
                    )}
                />
                <Controller
                    name="classificacao"
                    control={control}
                    defaultValue=""
                    rules={{}}
                    render={({
                    field: { onChange, value },
                    fieldState: { error },
                    }) => (
                    <InputForm
                        label="Classificação"
                        error={error?.message}
                        onChange={onChange}
                        value={value}
                        placeholder=""
                    />
                    )}
                />
            </div>
            <Divider style={{
                margin: 0
            }}/>
            <p style={{
                fontWeight:'bold'
            }}>
            Peso
            </p>
            <div className="flex gap-4">
                <Controller
                    name="perda_peso"
                    control={control}
                    rules={{}}
                    render={({
                    field: { onChange, value },
                    fieldState: { error },
                    }) => (
                    <InputForm
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
                    name="perda_atual"
                    control={control}
                    rules={{}}
                    render={({
                    field: { onChange, value },
                    fieldState: { error },
                    }) => (
                    <InputForm
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
                    name="peso_estimado"
                    control={control}
                    rules={{}}
                    render={({
                    field: { onChange, value },
                    fieldState: { error },
                    }) => (
                    <InputForm
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
                    name="peso_seco"
                    control={control}
                    rules={{}}
                    render={({
                    field: { onChange, value },
                    fieldState: { error },
                    }) => (
                    <InputForm
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
                    name="pp"
                    control={control}
                    rules={{}}
                    render={({
                    field: { onChange, value },
                    fieldState: { error },
                    }) => (
                    <InputForm
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
                    name="pp_porcentagem"
                    control={control}
                    rules={{}}
                    render={({
                    field: { onChange, value },
                    fieldState: { error },
                    }) => (
                    <InputForm
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
                    name="tempo"
                    control={control}
                    rules={{}}
                    render={({
                    field: { onChange, value },
                    fieldState: { error },
                    }) => (
                    <InputForm
                        label="Tempo"
                        error={error?.message}
                        onChange={onChange}
                        value={value}
                        placeholder=""
                    />
                    )}
                />
                <Controller 
                    name="pp_select"
                    control={control}
                    rules={{}}
                    render={({ field: { onChange, value}, fieldState: { error } }) => (
                        <InputSelect
                            label="PP"
                            required={false}
                            onChange={onChange}
                            error={error?.message}
                            placeholder="Selecionar"
                            value={value}
                            showSearch>
                                <Select.Option >
                                    Teste
                                </Select.Option>
                        </InputSelect>
                    )}
                />
            </div>
            <Divider style={{
                margin: 0
            }}/>
            <p style={{
                fontWeight:'bold',
            }}>
            Altura(m)
            </p>
            <div className="flex gap-4">
                <Controller
                    name="altura_atual"
                    control={control}
                    rules={{}}
                    render={({
                    field: { onChange, value },
                    fieldState: { error },
                    }) => (
                    <InputForm
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
                    name="altura_estimada"
                    control={control}
                    rules={{}}
                    render={({
                    field: { onChange, value },
                    fieldState: { error },
                    }) => (
                    <InputForm
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
                    name="aj"
                    control={control}
                    rules={{}}
                    render={({
                    field: { onChange, value },
                    fieldState: { error },
                    }) => (
                    <InputForm
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
            <Divider style={{
                margin: 0
            }}/>
            <p style={{
                fontWeight:'bold',
            }}>
            IMC
            </p>
            <div className="flex gap-4">
                <Controller
                    name="resultado_imc"
                    control={control}
                    rules={{}}
                    render={({
                    field: { onChange, value },
                    fieldState: { error },
                    }) => (
                    <InputForm
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
                    name="classificacao_imc"
                    control={control}
                    rules={{}}
                    render={({
                    field: { onChange, value },
                    fieldState: { error },
                    }) => (
                    <InputForm
                        label="Classificação"
                        error={error?.message}
                        onChange={onChange}
                        value={value}
                        placeholder=""
                    />
                    )}
                />
            </div>
            <Divider style={{
                margin: 0
            }}/>
            <p style={{
                fontWeight:'bold',
            }}>
            Perímetros(cm)
            </p>
            <div className="flex gap-4 items-center">
                <Controller
                    name="circ_braco"
                    control={control}
                    rules={{}}
                    render={({
                    field: { onChange, value },
                    fieldState: { error },
                    }) => (
                    <InputForm
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
                    name="braco_e_d"
                    control={control}
                    rules={{}}
                    render={({
                        field: { onChange, value },
                        fieldState: { error },
                    }) => (
                        <InputRadioButton
                        label=""
                        error={error?.message}
                        value={value}
                        required
                        onChange={onChange}
                        options={[
                            { label: "E", value: 1 },
                            { label: "D", value: 2 },
                        ]}
                        />
                    )}
                />
                <Controller
                    name="percentil_braco"
                    control={control}
                    rules={{}}
                    render={({
                    field: { onChange, value },
                    fieldState: { error },
                    }) => (
                    <InputForm
                        label="Percentil"
                        error={error?.message}
                        onChange={onChange}
                        value={value}
                        placeholder=""
                    />
                    )}
                />
                <Controller
                    name="classificao_braco"
                    control={control}
                    rules={{}}
                    render={({
                    field: { onChange, value },
                    fieldState: { error },
                    }) => (
                    <InputForm
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
                    name="circ_panturrilha"
                    control={control}
                    rules={{}}
                    render={({
                    field: { onChange, value },
                    fieldState: { error },
                    }) => (
                    <InputForm
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
                    name="percentil_panturrilha"
                    control={control}
                    rules={{}}
                    render={({
                    field: { onChange, value },
                    fieldState: { error },
                    }) => (
                    <InputForm
                        label="Percentil"
                        error={error?.message}
                        onChange={onChange}
                        value={value}
                        placeholder=""
                    />
                    )}
                />
                <Controller
                    name="classificao_panturrilha"
                    control={control}
                    rules={{}}
                    render={({
                    field: { onChange, value },
                    fieldState: { error },
                    }) => (
                    <InputForm
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
                        name="circ_abdominal"
                        control={control}
                        rules={{}}
                        render={({
                        field: { onChange, value },
                        fieldState: { error },
                        }) => (
                        <InputForm
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
    )
}