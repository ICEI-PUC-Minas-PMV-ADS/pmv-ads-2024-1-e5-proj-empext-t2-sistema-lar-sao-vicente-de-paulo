import { UserAddOutlined } from "@ant-design/icons";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { InputForm, UploudAvatar } from "@/components/input";
import { ModalDefault } from "@/components/modal/ModalDefault";
import { UploadFile } from "antd";
import { isNome } from "@/utils/validator/isName";
import { withoutNumber } from "@/utils/validator/withoutNumber";
import { IOperationIdoso } from "../Interface/IIdoso";

export const CriarIdosoModal = ({
  refetchList,
}: {
  refetchList: () => void;
}) => {
  const [open, setOpen] = useState(false);
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const { handleSubmit, control, reset, watch } = useForm<IOperationIdoso>();

  return (
    <ModalDefault
      nameButtonOpenModal={"Cadastrar"}
      iconButtonOpenModal={<UserAddOutlined />}
      titleModal={"Adicionando idoso"}
      okText="Cadastrar"
      onSubmit={() => {}}
      isFetching={false}
      width="550px"
      setOpenModal={setOpen}
      openModal={open}
    >
      <form className="w-full flex flex-col gap-[15px]">
        <div className="flex items-center gap-[15px]">
          <div className="w-[140px] h-[100px] flex items-center">
            <Controller
              name="foto"
              control={control}
              render={() => (
                <UploudAvatar setFileList={setFileList} fileList={fileList} />
              )}
            />
          </div>
          <Controller
            name="nome_completo"
            control={control}
            defaultValue=""
            rules={{
              required: "Insira o nome do usuário",
              validate: (value) => {
                if (isNome(value)) return "Preencher o nome completo";
                if (withoutNumber(value)) return "Nome não pode conter números";
                return true;
              },
            }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <InputForm
                label="Nome"
                required
                error={error?.message}
                onChange={onChange}
                value={value}
                placeholder="José da Silva"
              />
            )}
          />
        </div>
      </form>
    </ModalDefault>
  );
};
