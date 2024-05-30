import { ModalDefault } from "@/components/modal/ModalDefault";
import { FileAddOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { IRelatorioNutricional } from "../interface/IRelatorioNutricional";
import { useMutation } from "@/utils/hooks/useMutation";
import { useCookies } from "react-cookie";
import { authToken } from "@/config/authToken";

export const CriarRelatorioNutricionalModal = ({
    refetchList,
}: {
    refetchList: () => void;
}) => {
    const [cookies] = useCookies([authToken.nome]);
    const [open, setOpen] = useState(false);

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
            width="550px"
            setOpenModal={setOpen}
            openModal={open}
        >
            <form>

            </form>
        </ModalDefault>
    );
}