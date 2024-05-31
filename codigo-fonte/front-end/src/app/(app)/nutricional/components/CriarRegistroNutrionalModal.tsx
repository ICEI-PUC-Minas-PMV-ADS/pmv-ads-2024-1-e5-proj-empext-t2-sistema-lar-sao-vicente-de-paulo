import { authToken } from "@/config/authToken";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { Controller, useForm } from "react-hook-form";
import { IRelatorioNutricional } from "../interface/IRelatorioNutricional";
import { ModalDefault } from "@/components/modal/ModalDefault";
import { PlusOutlined } from "@ant-design/icons";
import { InputDatePicker } from "@/components/input/InputDatePicker";
import { InputForm } from "@/components/input";

export const CriarRegistroNutriconalModal = ({

}: {

}) => {
    const [cookies] = useCookies([authToken.nome]);
    const [open, setOpen] = useState(false);

    const { handleSubmit, control, reset, watch } = useForm<IRelatorioNutricional>();

    return (
        <ModalDefault
            showFooter
            nameButtonOpenModal="Adcionar"
            iconButtonOpenModal={<PlusOutlined/>}
            titleModal="Adicionando registro Nutricional"
            okText="Adicionar"
            width="800px"
            setOpenModal={setOpen}
            openModal={open}
        >
            <form className="w-full flex flex-col gap-[15px]">
                <div className="flex gap-4">
                    <Controller
                        name="data_registro_nutricional"
                        control={control}
                        render={({
                            field: { onChange, value },
                            fieldState: { error }
                        }) => (
                            <InputDatePicker
                                label="Data"
                                error={error?.message}
                                onChange={onChange}
                                placeholder="Selicione data"    
                            />
                        )}
                    />
                    <Controller
                        name="dieta_indicada_registro_nutricional"
                        control={control}
                        rules={{}}
                        render={({
                        field: { onChange, value },
                        fieldState: { error },
                        }) => (
                        <InputForm
                            label="Data Indicada"
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
                        name="volume_registro_nutricional"
                        control={control}
                        rules={{}}
                        render={({
                        field: { onChange, value },
                        fieldState: { error },
                        }) => (
                        <InputForm
                            label="Volume"
                            error={error?.message}
                            onChange={onChange}
                            value={value}
                            placeholder=""
                        />
                        )}
                    />
                    <Controller
                        name="fracionamento_registro_nutricional"
                        control={control}
                        rules={{}}
                        render={({
                        field: { onChange, value },
                        fieldState: { error },
                        }) => (
                        <InputForm
                            label="Fracionamento"
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
                        name="calorias_dia_registro_nutricional"
                        control={control}
                        rules={{}}
                        render={({
                        field: { onChange, value },
                        fieldState: { error },
                        }) => (
                        <InputForm
                            label="Kcal/Dia"
                            error={error?.message}
                            onChange={onChange}
                            value={value}
                            placeholder=""
                        />
                        )}
                    />
                    <Controller
                        name="ptn_dia_registro_nutriocional"
                        control={control}
                        rules={{}}
                        render={({
                        field: { onChange, value },
                        fieldState: { error },
                        }) => (
                        <InputForm
                            label="PTN/Dia"
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
                        name="agua_hidratacao_registro_nutricional"
                        control={control}
                        rules={{}}
                        render={({
                        field: { onChange, value },
                        fieldState: { error },
                        }) => (
                        <InputForm
                            label="Água p/Hidratação"
                            error={error?.message}
                            onChange={onChange}
                            value={value}
                            placeholder=""
                        />
                        )}
                    />
                </div>
            </form>
        </ModalDefault>

    )
}
