import { Controller, useForm } from "react-hook-form";
import { IRelatorioNutricional } from "../../interface/IRelatorioNutricional";
import { InputTextArea } from "@/components/input/InputTextArea";
import { InputSelect } from "@/components/input";
import { Select } from "antd";

export const TabSemiologiaNutricional = () => {

    const { handleSubmit, control, reset, watch } = useForm<IRelatorioNutricional>();
    
    return (
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
}