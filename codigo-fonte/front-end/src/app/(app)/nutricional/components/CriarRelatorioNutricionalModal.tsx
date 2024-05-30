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
import { Select, Tabs } from "antd";
import { InputDatePicker } from "@/components/input/InputDatePicker";
import { InputRadioButton } from "@/components/input/InputRadioButton";
import { InputTextArea } from "@/components/input/InputTextArea";

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

    return (
        <ModalDefault 
            showFooter
            nameButtonOpenModal={"Cadastrar Relatório Nutricional"}
            iconButtonOpenModal={<FileAddOutlined/>}
            titleModal={"Adicionando Relatório Nutricional"}
            okText="Cadastrar"
            onSubmit={handleSubmit(createRelatorioNutricional)}
            isFetching={isFetchingData}
            width="1000px"
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
                            label: "Semiologia Nutricional"
                        },
                        {
                            key: "4",
                            label: "Antropometria"
                        },
                        {
                            key: "5",
                            label: "Dados Antropométricos"
                        },
                        {
                            key: "6",
                            label: "Necessidades Nutricionais"
                        },
                        {
                            key: "7",
                            label: "Quadro Clínico"
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