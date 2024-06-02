import { EditOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { ModalDefault } from "@/components/modal/ModalDefault";
import { Tooltip } from "antd";
import { useCookies } from "react-cookie";
import { authToken } from "@/config/authToken";
import {
  IModeloRelatorioPia,
  IOperationModeloRelatorioPia,
} from "../Interface/IModeloRelatorioPia";
import { useFetch } from "@/utils/hooks/useFetch";

export const AtualizarModeloPiaModal = ({
  uid,
  refetchList,
}: {
  uid: string;
  refetchList: () => void;
}) => {
  const [cookies] = useCookies([authToken.nome]);
  const [open, setOpen] = useState(false);

  const { handleSubmit, control, setValue } =
    useForm<Partial<IOperationModeloRelatorioPia>>();

  const { data: modeloPia } = useFetch<IModeloRelatorioPia>(
    "/modelo-relatorio-pia/" + uid,
    [uid],
    {
      enable: open,
    }
  );

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
      titleModal={"Editando modelo relatório PIA"}
      okText="Salvar"
      onSubmit={() => {}}
      isFetching={false}
      width="550px"
      setOpenModal={setOpen}
      openModal={open}
      created_item={modeloPia?.criado_em}
      updated_item={modeloPia?.atualizado_em}
    >
      <form className="w-full flex flex-col gap-[15px]"></form>
    </ModalDefault>
  );
};
