import { useMutation } from "@/utils/hooks/useMutation";
import { InboxOutlined, UserAddOutlined } from "@ant-design/icons";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { InputSelect } from "@/components/input";
import { ModalDefault } from "@/components/modal/ModalDefault";
import { authToken } from "@/config/authToken";
import { useCookies } from "react-cookie";
import { Checkbox, Radio, Select } from "antd";
import { InputDatePicker } from "@/components/input/InputDatePicker";
import dayjs from "dayjs";
import { useFetch } from "@/utils/hooks/useFetch";
import { queryBuilder } from "@/utils/functions/query-builder";
import { IIdoso } from "../../idoso/Interface/IIdoso";
import { IOperationRelatorioPia } from "../Interface/IRelatorioPia";
import TextArea from "antd/es/input/TextArea";
import { IModeloRelatorioPia } from "../../modelo-pia/Interface/IModeloRelatorioPia";

export const CriarRelatorioPiaModal = ({
  refetchList,
}: {
  refetchList: () => void;
}) => {
  const [cookies] = useCookies([authToken.nome]);
  const [open, setOpen] = useState(false);

  const { handleSubmit, control, reset, watch, getValues } =
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

  const modeloUid = modelosPia?.find(
    (v) => v.id === getValues("id_modelo_relatorio_pia")
  )?.uid;

  const { data: findModeloPiaSelect, refetch: refetchModelo } =
    useFetch<IModeloRelatorioPia>(
      "/modelo-relatorio-pia/" + modeloUid,
      [modeloUid],
      {
        enable: open && !!modeloUid && modeloUid !== undefined,
        resNotInData: true,
      }
    );

  console.log(findModeloPiaSelect);

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
                onChange={async (e) => {
                  await onChange(e);
                  await refetchModelo();
                }}
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
        {findModeloPiaSelect ? (
          findModeloPiaSelect.modelo_relatorio_pia_pergunta?.map((pergunta) => (
            <div
              key={pergunta.uid}
              className="py-[10px] px-[15px] flex gap-[20px] w-full bg-[#f9f9f9] rounded-md"
            >
              <p className="w-full text-left min-w-[300px]">
                {pergunta.pergunta}
              </p>
              {pergunta.modelo_relatorio_pia_resposta?.map((resposta) => (
                <>
                  {resposta.tipo === "RADIO" && (
                    <div className="w-full flex flex-col gap-1">
                      <p>{resposta.titulo}</p>
                      <Radio.Group onChange={() => {}} value={""}>
                        {resposta.modelo_relatorio_pia_resposta_opcao?.map(
                          (opcao) => (
                            <Radio key={opcao.uid} value={opcao.uid}>
                              {opcao.opcao}
                            </Radio>
                          )
                        )}
                      </Radio.Group>
                    </div>
                  )}
                  {resposta.tipo === "CHECKBOX" && (
                    <div className="w-full flex flex-col gap-1">
                      <p>{resposta.titulo}</p>
                      <Checkbox.Group onChange={() => {}}>
                        {resposta.modelo_relatorio_pia_resposta_opcao?.map(
                          (opcao) => (
                            <Checkbox key={opcao.uid} value={opcao.uid}>
                              {opcao.opcao}
                            </Checkbox>
                          )
                        )}
                      </Checkbox.Group>
                    </div>
                  )}
                  {resposta.tipo === "TEXT" && (
                    <div className="flex flex-col gap-1 w-full">
                      <p>{resposta.titulo}</p>
                      <TextArea rows={2} />
                    </div>
                  )}
                </>
              ))}
            </div>
          ))
        ) : (
          <div className="text-black/40 flex w-full justify-center items-center gap-2">
            <InboxOutlined className="text-xl" /> Nenhum modelo selecionado.
          </div>
        )}
      </form>
    </ModalDefault>
  );
};
