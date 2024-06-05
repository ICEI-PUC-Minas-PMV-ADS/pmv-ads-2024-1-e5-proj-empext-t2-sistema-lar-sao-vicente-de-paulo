import { useMutation } from "@/utils/hooks/useMutation";
import { UserAddOutlined } from "@ant-design/icons";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { InputForm, InputSelect } from "@/components/input";
import { ModalDefault } from "@/components/modal/ModalDefault";
import { authToken } from "@/config/authToken";
import { useCookies } from "react-cookie";
import { Input, Radio, Select } from "antd";
import { InputDatePicker } from "@/components/input/InputDatePicker";
import dayjs from "dayjs";
import { useFetch } from "@/utils/hooks/useFetch";
import { queryBuilder } from "@/utils/functions/query-builder";
import { IIdoso } from "../../idoso/Interface/IIdoso";
import { IOperationRelatorioPia } from "../Interface/IRelatorioPia";
import RelatorioPia from "../page";
import TextArea from "antd/es/input/TextArea";

export const CriarRelatorioPiaModal = ({
  refetchList,
}: {
  refetchList: () => void;
}) => {
  const [cookies] = useCookies([authToken.nome]);
  const [open, setOpen] = useState(false);

  const { handleSubmit, control, reset, watch } =
    useForm<IOperationRelatorioPia>();

  const { mutate: createRelatorioPia, isFetching: isFetchingData } =
    useMutation<IOperationRelatorioPia, { uid: string }>("/relatorio-pia", {
      method: "post",
      messageSucess: null,
    });

  const { data: idosos } = useFetch<IIdoso[]>("/idosos", ["idosos-pia"], {
    enable: open,
    params: queryBuilder({
      page_limit: 9999,
      filter: [
        {
          path: "situacao",
          operator: "equals",
          value: "ATIVO",
        },
      ],
      sort: [{ field: "criado_em", criteria: "desc" }],
    }),
  });

  const { data: modelosPia } = useFetch<
    { uid: string; id: bigint; nome: string }[]
  >("/modelo-relatorio-pia", ["modelos-relatorio-pia"], {
    enable: open,
    params: queryBuilder({
      page_limit: 9999,
      sort: [{ field: "criado_em", criteria: "desc" }],
    }),
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
            name="id_idoso"
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
                {idosos?.map((idoso) => (
                  <Select.Option key={idoso.uid} value={idoso.id}>
                    {idoso.nome_completo}
                  </Select.Option>
                ))}
              </InputSelect>
            )}
          />

          <Controller
            name="id_modelo_relatorio_pia"
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
                {modelosPia?.map((modelo) => (
                  <Select.Option key={modelo.uid} value={modelo.id}>
                    {modelo.nome}
                  </Select.Option>
                ))}
              </InputSelect>
            )}
          />

          <Controller
            name="data_validade"
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
        <p>Questionário do Relatório</p>
        <div className="py-[10px] px-[15px] flex gap-[20px] w-full items-center bg-[#f9f9f9] rounded-md">
          <p className="w-full text-left min-w-[300px]">
            Faz algum tratamento especializado?
          </p>
          <div className="w-full flex justify-center items-center">
            <Radio.Group onChange={() => {}} value={""}>
              <Radio value={1}>Sim</Radio>
              <Radio value={2}>Nao</Radio>
            </Radio.Group>
          </div>
          <div className="flex flex-col gap-1 w-full">
            <p>Descricao</p>
            <TextArea rows={2} />
          </div>
        </div>
      </form>
    </ModalDefault>
  );
};
