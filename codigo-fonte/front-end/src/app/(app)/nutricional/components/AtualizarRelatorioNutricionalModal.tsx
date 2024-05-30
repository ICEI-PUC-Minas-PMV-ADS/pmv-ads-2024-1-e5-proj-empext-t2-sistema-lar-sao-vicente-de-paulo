import { ModalDefault } from "@/components/modal/ModalDefault";
import { authToken } from "@/config/authToken";
import { EditOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { useForm } from "react-hook-form";
import { IOperationRelatorioNutricional } from "../interface/IRelatorioNutricional";
import { useMutation } from "@/utils/hooks/useMutation";

export const AtualizarRelatorioNutricionalModal = ({
    uid,
    refetchList,
}: {
    uid: string;
    refetchList: () => void;
}) => {
    const [cookies] = useCookies([authToken.nome]);
    const [open, setOpen] = useState(false);

    const { handleSubmit, control, setValue } =
    useForm<Partial<IOperationRelatorioNutricional>>();7

    const { mutate: updateRelatorioNutricional, isFetching: isFetchingData } = useMutation<
        Partial<IOperationRelatorioNutricional>,
        { uid: string }
    >("/relatorio-nutricao/" + uid, {
        method: "patch",
        messageSucess: null,
        onSuccess: async (data) => {
        const formData = new FormData();

        },
    });


    return (
        <ModalDefault 
            showFooter
            customButtonOpenModal={
                <Tooltip title={"Editar"}>
                  <button
                    type="button"
                    onClick={() => setOpen(true)}
                    className="text-black/30 hover:text-primaria h-full w-[50px] flex justify-center items-center"
                  >
                    <EditOutlined className={"text-[18px]"} />
                  </button>
                </Tooltip>
            }
            titleModal={"Editando Relatório Nutricional"}
            okText="Salvar"
            onSubmit={handleSubmit(updateRelatorioNutricional)}
            isFetching={isFetchingData}
            width="550px"
            setOpenModal={setOpen}
            openModal={open}
        >
            <form>
                
            </form>
        </ModalDefault>
    );
}