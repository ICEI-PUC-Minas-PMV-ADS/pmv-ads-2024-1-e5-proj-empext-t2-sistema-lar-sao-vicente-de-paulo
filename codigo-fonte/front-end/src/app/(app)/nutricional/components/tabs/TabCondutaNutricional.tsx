import { useForm } from "react-hook-form";
import { IRelatorioNutricional } from "../../interface/IRelatorioNutricional";
import { CriarRegistroNutriconalModal } from "../CriarRegistroNutrionalModal";
import { TableDefault } from "@/components/table/TableDefault";
import { ColumnsType } from "antd/es/table";

export const TabCondutaNutricional = () => {

    const { handleSubmit, control, reset, watch } = useForm<IRelatorioNutricional>();

    const columnsDadosRegistroNutricional: ColumnsType<IRelatorioNutricional> = [
        { 
            title: "Data"
        },
        { 
            title: "Dieta Indicada"
        },
        { 
            title: "Volume"
        },
        { 
            title: "Fracionamento"
        },
        { 
            title: "Kcal/Dia"
        },
        { 
            title: "PTN/Dia"
        },
        { 
            title: "Água p/Hidratação"
        }
    ]
    
    return (
        <div className="w-full flex flex-col gap-[15px]">
            <div className="">
                <CriarRegistroNutriconalModal />
                <div className="mt-2">
                    <TableDefault
                        dataSource={[]}
                        columns={columnsDadosRegistroNutricional}
                    />
                </div>
            </div>
        </div>
    )
}