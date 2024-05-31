import { ModalDefault } from "@/components/modal/ModalDefault";
import { FileAddOutlined } from "@ant-design/icons";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { IRelatorioNutricional } from "../interface/IRelatorioNutricional";
import { useMutation } from "@/utils/hooks/useMutation";
import { useCookies } from "react-cookie";
import { authToken } from "@/config/authToken";
import { InputForm, InputSelect } from "@/components/input";
import { IIdoso } from "../../idoso/Interface/IIdoso";
import { Divider, Select, Tabs } from "antd";
import { InputDatePicker } from "@/components/input/InputDatePicker";
import { InputRadioButton } from "@/components/input/InputRadioButton";
import { InputTextArea } from "@/components/input/InputTextArea";
import { ColumnsType } from "antd/es/table";
import { TableDefault } from "@/components/table/TableDefault";
import { CriarRegistroAntropometricoModal } from "./CriarRegistroAntropometricoModal";
import { CriarRegistroClinicoModal } from "./CriarRegistroClinicoModal";

export const CriarRelatorioNutricionalModal = ({
    refetchList,
}: {
    refetchList: () => void;
}) => {
    const [cookies] = useCookies([authToken.nome]);
    const [open, setOpen] = useState(false);
    const [idosos, setIdosos] = useState<IIdoso[]>([]);

    const { handleSubmit, control, reset, watch } = useForm<IRelatorioNutricional>();

    const { mutate: createRelatorioNutricional, isFetching: isFetchingData } = useMutation<
        IRelatorioNutricional,
        { uid: string }
    >("/relatorio-nutricao", {
        method: "post",
        messageSucess: null,
        onSuccess: async (data) => {
        const formData = new FormData();

        },
    });

    const columnsDadosAntropometricos: ColumnsType<IRelatorioNutricional> = [
        {
            title: "Data"
        },
        {
            title: "Peso (kg)"
        },
        {
            title: "Ascite"
        },
        {
            title: "Edema"
        },
        {
            title: "IMC (kg/m²)"
        },
        {
            title: "Classificação"
        },
        {
            title: "CB (cm)"
        },
        {
            title: "CP (cm)"
        },
        {
            title: "Observações"
        },
    ]

    const columnsDadosRegistroClinico: ColumnsType<IRelatorioNutricional> = [
        {
            title: "Data"
        },
        {
            title: "Aceitação Dieta Vo"
        },
        {
            title: "Sumplementação Oral"
        },
        {
            title: "Apetite"
        },
        {
            title: "Disfagia"
        },
        {
            title: "Náuse/Vômito"
        },
        {
            title: "Dor Abdominal"
        },
        {
            title: "Evacuação"
        },
        {
            title: "Diurese"
        },
        {
            title: "Observação"
        }
    ]

    return (
        <ModalDefault 
            showFooter
            nameButtonOpenModal={"Cadastrar Relatório Nutricional"}
            iconButtonOpenModal={<FileAddOutlined/>}
            titleModal={"Adicionando Relatório Nutricional"}
            okText="Cadastrar"
            onSubmit={handleSubmit(createRelatorioNutricional)}
            isFetching={isFetchingData}
            width="1350px"
            setOpenModal={setOpen}
            openModal={open}
        >
            <form className="w-full flex flex-col gap-[15px]">
                <div className="flex items-center gap-[15px]">
                    <Controller 
                        name="nome_idoso"
                        control={control}
                        rules={{
                            required: "Selecione o idoso",
                        }}
                        render={({ field: { onChange, value}, fieldState: { error } }) => (
                            <InputSelect 
                                label="Idoso"
                                required
                                onChange={onChange}
                                error={error?.message}
                                placeholder="Selecionar"
                                value={value}
                                showSearch>
                                    {idosos?.map((idoso) => (
                                        <Select.Option key={idoso.uid} value={idoso.nome_completo}>
                                            {idoso.nome_completo}
                                        </Select.Option>
                                    ))}
                            </InputSelect>
                        )}
                    />
                    <Controller 
                        name="data_vencimento"
                        control={control}
                        render={({
                            field: { onChange, value },
                            fieldState: { error }
                        }) => (
                            <InputDatePicker 
                                label="Data de Vencimento"
                                error={error?.message}
                                onChange={onChange}
                                placeholder="Selicione data"    
                            />
                        )}
                    />
                </div>
                <Tabs 
                    defaultActiveKey="1"
                    tabPosition="left"
                    items={[
                        {
                            key: "1",
                            label:"Geral",
                            children: (
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
                        },
                        {
                            key:"2",
                            label: "Diagnóstico Clínico / Hipótese Diagnosticadas",
                            children: (
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
                        },
                        {
                            key: "3",
                            label: "Semiologia Nutricional",
                            children: (
                                <div className="w-full flex flex-col gap-[15px]">
                                    <div className="">
                                    <Controller
                                            name="perda_aparente_de"
                                            control={control}
                                            defaultValue=""
                                            rules={{}}
                                            render={({
                                                field: { onChange, value },
                                                fieldState: { error },
                                            }) => (
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
                                            render={({ field: { onChange, value}, fieldState: { error } }) => (
                                                <InputSelect 
                                                    label="Gordura Subcutânea"
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
                                        <Controller 
                                            name="edema"
                                            control={control}
                                            rules={{}}
                                            render={({ field: { onChange, value}, fieldState: { error } }) => (
                                                <InputSelect 
                                                    label="Edema"
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
                                    <div className="flex gap-4">
                                        <Controller 
                                            name="local_edema"
                                            control={control}
                                            rules={{}}
                                            render={({ field: { onChange, value}, fieldState: { error } }) => (
                                                <InputSelect 
                                                    label="Local do Edema"
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
                                        <Controller 
                                            name="ascite"
                                            control={control}
                                            rules={{}}
                                            render={({ field: { onChange, value}, fieldState: { error } }) => (
                                                <InputSelect 
                                                    label="Ascite"
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
                                </div>
                            )
                        },
                        {
                            key: "4",
                            label: "Antropometria",
                            children: (
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
                        },
                        {
                            key: "5",
                            label: "Dados Antropométricos",
                            children: (
                                <div className="w-full flex flex-col gap-[15px]">
                                    <div className="">
                                        <CriarRegistroAntropometricoModal/>
                                        <div className="mt-2">
                                            <TableDefault
                                                dataSource={[]}
                                                columns={columnsDadosAntropometricos}
                                            />
                                        </div>
                                    </div>
                                </div>
                            )
                        },
                        {
                            key: "6",
                            label: "Necessidades Nutricionais",
                            children: (
                                <div>
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
                                </div>
                            )
                        },
                        {
                            key: "7",
                            label: "Quadro Clínico",
                            children: (
                                <div className="w-full flex flex-col gap-[15px]">
                                    <div className="">
                                        <CriarRegistroClinicoModal/>
                                        <div className="mt-2">
                                            <TableDefault
                                                dataSource={[]}
                                                columns={columnsDadosRegistroClinico}
                                            />
                                        </div>
                                    </div>
                                </div>
                            )
                        },
                        {
                            key: "8",
                            label: "Conduta Nutricional"
                        }

                    ]}
                />
            </form>
        </ModalDefault>
    );
}