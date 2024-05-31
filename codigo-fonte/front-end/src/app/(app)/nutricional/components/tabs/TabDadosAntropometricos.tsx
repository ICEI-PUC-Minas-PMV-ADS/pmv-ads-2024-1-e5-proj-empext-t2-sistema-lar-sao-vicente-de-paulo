import { useForm } from "react-hook-form";
import { IRelatorioNutricional } from "../../interface/IRelatorioNutricional";
import { CriarRegistroAntropometricoModal } from "../CriarRegistroAntropometricoModal";
import { TableDefault } from "@/components/table/TableDefault";
import { ColumnsType } from "antd/es/table";

export const TabDadosAntropometricos = () => {

    const { handleSubmit, control, reset, watch } = useForm<IRelatorioNutricional>();

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
    
    return (
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
}