import { useMutation } from "@/utils/hooks/useMutation";
import { UserAddOutlined } from "@ant-design/icons";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { InputForm, InputSelect } from "@/components/input";
import { ModalDefault } from "@/components/modal/ModalDefault";
import { authToken } from "@/config/authToken";
import { useCookies } from "react-cookie";
import { isNome } from "@/utils/validator/isName";
import { isText } from "@/utils/validator/isText";
import { Select } from "antd";
import { InputDatePicker } from "@/components/input/InputDatePicker";
import dayjs from "dayjs";

export const CriarRelatorioPiaModal = ({
  refetchList,
}: {
  refetchList: () => void;
}) => {
  const [cookies] = useCookies([authToken.nome]);
  const [open, setOpen] = useState(false);

  const { handleSubmit, control, reset, watch } = useForm();

  const { mutate: createRelatorioPia, isFetching: isFetchingData } =
    useMutation<{ uid: string }>("/relatorio-pia", {
      method: "post",
      messageSucess: null,
    });

  return (
    <ModalDefault
      showFooter
      nameButtonOpenModal={"Cadastrar Relatório PIA"}
      iconButtonOpenModal={<UserAddOutlined />}
      titleModal={"Adicionando Relatório PIA"}
      okText="Cadastrar"
      onSubmit={() => {}}
      isFetching={isFetchingData}
      width="900px"
      setOpenModal={setOpen}
      openModal={open}
    >
      <form className="w-full flex flex-col gap-[15px]">
        <div className="flex items-center gap-[15px]">
          <Controller
            name="id_cargo"
            control={control}
            rules={{ required: "Selecione um idoso" }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <InputSelect
                label="Idoso"
                onChange={onChange}
                error={error?.message}
                required
                placeholder="Selecionar"
                value={value}
              >
                <Select.Option value={""}>vazio</Select.Option>
              </InputSelect>
            )}
          />

          <Controller
            name="id_cargo"
            control={control}
            rules={{ required: "Selecione um modelo de relatório" }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <InputSelect
                label="Modelo"
                onChange={onChange}
                error={error?.message}
                required
                placeholder="Selecionar"
                value={value}
              >
                <Select.Option value={""}>vazio</Select.Option>
              </InputSelect>
            )}
          />

          <Controller
            name="data_nascimento"
            control={control}
            rules={{
              required: "Selecionar data de vencimento",
            }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <InputDatePicker
                label="Data de Vencimento"
                required
                error={error?.message}
                onChange={onChange}
                value={value && dayjs(value)}
                placeholder="Selecionar data"
              />
            )}
          />
        </div>
      </form>
    </ModalDefault>
  );
};
