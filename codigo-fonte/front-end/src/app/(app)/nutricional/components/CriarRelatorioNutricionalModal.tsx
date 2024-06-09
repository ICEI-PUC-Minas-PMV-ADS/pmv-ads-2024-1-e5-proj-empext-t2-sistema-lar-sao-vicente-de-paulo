import { ModalDefault } from "@/components/modal/ModalDefault";
import { FileAddOutlined } from "@ant-design/icons";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { IRelatorioNutricional } from "../interface/IRelatorioNutricional";
import { useMutation } from "@/utils/hooks/useMutation";
import { useCookies } from "react-cookie";
import { authToken } from "@/config/authToken";
import { InputSelect } from "@/components/input";
import { IIdoso } from "../../idoso/Interface/IIdoso";
import { Select, Tabs } from "antd";
import { InputDatePicker } from "@/components/input/InputDatePicker";
import { TabGeral } from "./tabs/TabGeral";
import { TabDiagnosticoHipoteseClinico } from "./tabs/TabDiagnosticoHipoteseClinico";
import { TabSemiologiaNutricional } from "./tabs/TabSemiologiaNutricional";
import { TabAntropometria } from "./tabs/TabAntropometrica";
import { TabDadosAntropometricos } from "./tabs/TabDadosAntropometricos";
import { TabNecessidadesNutricionais } from "./tabs/TabNecessidadesNutricionais";
import { TabQuadroClinico } from "./tabs/TabQuadroClinico";
import { TabCondutaNutricional } from "./tabs/TabCondutaNutricional";

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
            width="1350px"
            setOpenModal={setOpen}
            openModal={open}
        >
            <form className="w-full flex flex-col gap-[15px]">
                <div className="flex gap-4">
                    <div className="flex-grow w-80">
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
                    </div>
                    <div className="w-80">
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
                </div>
                <Tabs 
                    defaultActiveKey="1"
                    tabPosition="left"
                    items={[
                        {
                            key: "1",
                            label:"Geral",
                            children: (
                                <TabGeral />
                            )
                        },
                        {
                            key:"2",
                            label: "Diagnóstico Clínico / Hipótese Diagnosticadas",
                            children: (
                                <TabDiagnosticoHipoteseClinico />
                            )
                        },
                        {
                            key: "3",
                            label: "Semiologia Nutricional",
                            children: (
                                <TabSemiologiaNutricional />
                            )
                        },
                        {
                            key: "4",
                            label: "Antropometria",
                            children: (
                                 <TabAntropometria />                         
                            )
                        },
                        {
                            key: "5",
                            label: "Dados Antropométricos",
                            children: (
                                <TabDadosAntropometricos />
                            )
                        },
                        {
                            key: "6",
                            label: "Necessidades Nutricionais",
                            children: (
                                <TabNecessidadesNutricionais />
                            )
                        },
                        {
                            key: "7",
                            label: "Quadro Clínico",
                            children: (
                                <TabQuadroClinico />
                            )
                        },
                        {
                            key: "8",
                            label: "Conduta Nutricional",
                            children: (
                                <TabCondutaNutricional />
                            )
                        }

                    ]}
                />
            </form>
        </ModalDefault>
    );
}