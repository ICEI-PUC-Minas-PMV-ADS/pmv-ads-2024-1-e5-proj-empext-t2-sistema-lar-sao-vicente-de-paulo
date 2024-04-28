import { UserAddOutlined } from "@ant-design/icons";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { InputForm, InputSelect, UploudAvatar } from "@/components/input";
import { ModalDefault } from "@/components/modal/ModalDefault";
import { DatePicker, Select, Tabs, TabsProps, UploadFile } from "antd";
import { isNome } from "@/utils/validator/isName";
import { withoutNumber } from "@/utils/validator/withoutNumber";
import { IOperationIdoso } from "../Interface/IIdoso";
import { InputDatePicker } from "@/components/input/InputDatePicker";
import dayjs from "dayjs";

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
      width="750px"
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
              required: "Insira o nome do idoso",
              validate: (value) => {
                if (isNome(value)) return "Preencher o nome completo";
                if (withoutNumber(value)) return "Nome não pode conter números";
                return true;
              },
            }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <InputForm
                label="Nome Completo"
                required
                error={error?.message}
                onChange={onChange}
                value={value}
                placeholder="José da Silva"
              />
            )}
          />
          <Controller
            name="apelido"
            control={control}
            defaultValue=""
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <InputForm
                label="Apelido"
                error={error?.message}
                onChange={onChange}
                value={value}
                placeholder="Zé da Silva"
              />
            )}
          />
        </div>
        <Tabs
          defaultActiveKey="1"
          items={[
            {
              key: "1",
              label: "Identificação",
              children: (
                <div className="w-full flex flex-col gap-[15px]">
                  <div className="flex justify-between gap-4">
                    <Controller
                      name="nome_mae"
                      control={control}
                      defaultValue=""
                      rules={{
                        required: "Insira o nome da mãe",
                        validate: (value) => {
                          if (isNome(value)) return "Preencher o nome completo";
                          if (withoutNumber(value))
                            return "Nome não pode conter números";
                          return true;
                        },
                      }}
                      render={({
                        field: { onChange, value },
                        fieldState: { error },
                      }) => (
                        <InputForm
                          label="Nome da Mãe"
                          required
                          error={error?.message}
                          onChange={onChange}
                          value={value}
                          placeholder="Maria da Silva"
                        />
                      )}
                    />
                    <Controller
                      name="nome_pai"
                      control={control}
                      defaultValue=""
                      rules={{
                        required: "Insira o nome do pai",
                        validate: (value) => {
                          if (isNome(value)) return "Preencher o nome completo";
                          if (withoutNumber(value))
                            return "Nome não pode conter números";
                          return true;
                        },
                      }}
                      render={({
                        field: { onChange, value },
                        fieldState: { error },
                      }) => (
                        <InputForm
                          label="Nome do Pai"
                          required
                          error={error?.message}
                          onChange={onChange}
                          value={value}
                          placeholder="Carlos da Silva"
                        />
                      )}
                    />
                  </div>
                  <div className="flex justify-between gap-4">
                    <Controller
                      name="naturalidade"
                      control={control}
                      defaultValue=""
                      rules={{
                        required: "Insira a naturalidade",
                      }}
                      render={({
                        field: { onChange, value },
                        fieldState: { error },
                      }) => (
                        <InputForm
                          label="Naturalidade"
                          required
                          error={error?.message}
                          onChange={onChange}
                          value={value}
                          placeholder="Brasileiro(a)"
                        />
                      )}
                    />
                    <Controller
                      name="estado"
                      control={control}
                      rules={{
                        required: "Selecione o estado",
                      }}
                      render={({
                        field: { onChange, value },
                        fieldState: { error },
                      }) => (
                        <InputSelect
                          label="Estado"
                          onChange={onChange}
                          error={error?.message}
                          required
                          placeholder="Selecionar"
                          value={value}
                        >
                          <Select.Option>Vazio</Select.Option>
                        </InputSelect>
                      )}
                    />
                    <Controller
                      name="cidade"
                      control={control}
                      rules={{
                        required: "Selecione a cidade",
                      }}
                      render={({
                        field: { onChange, value },
                        fieldState: { error },
                      }) => (
                        <InputSelect
                          label="Cidade"
                          onChange={onChange}
                          error={error?.message}
                          required
                          placeholder="Selecionar"
                          value={value}
                        >
                          <Select.Option>Vazio</Select.Option>
                        </InputSelect>
                      )}
                    />
                  </div>
                  <div className="flex justify-between gap-4">
                    <Controller
                      name="genero"
                      control={control}
                      rules={{
                        required: "Insira o gênero",
                      }}
                      render={({
                        field: { onChange, value },
                        fieldState: { error },
                      }) => (
                        <InputSelect
                          label="Gênero"
                          onChange={onChange}
                          error={error?.message}
                          required
                          placeholder="Selecionar"
                          value={value}
                        >
                          <Select.Option>Vazio</Select.Option>
                        </InputSelect>
                      )}
                    />
                    <Controller
                      name="estado_civil"
                      control={control}
                      rules={{
                        required: "Selecione o estado civil",
                      }}
                      render={({
                        field: { onChange, value },
                        fieldState: { error },
                      }) => (
                        <InputSelect
                          label="Estado Civil"
                          onChange={onChange}
                          error={error?.message}
                          required
                          placeholder="Selecionar"
                          value={value}
                        >
                          <Select.Option>Vazio</Select.Option>
                        </InputSelect>
                      )}
                    />
                    <Controller
                      name="escolaridade"
                      control={control}
                      rules={{
                        required: "Selecione a cidade",
                      }}
                      render={({
                        field: { onChange, value },
                        fieldState: { error },
                      }) => (
                        <InputSelect
                          label="Escolaridade"
                          onChange={onChange}
                          error={error?.message}
                          required
                          placeholder="Selecionar"
                          value={value}
                        >
                          <Select.Option>Vazio</Select.Option>
                        </InputSelect>
                      )}
                    />
                  </div>
                  <div className="flex justify-between gap-4">
                    <Controller
                      name="religiao"
                      control={control}
                      defaultValue=""
                      rules={{
                        required: "Insira a religião",
                      }}
                      render={({
                        field: { onChange, value },
                        fieldState: { error },
                      }) => (
                        <InputForm
                          label="Religião"
                          required
                          error={error?.message}
                          onChange={onChange}
                          value={value}
                          placeholder="Católico(a)"
                        />
                      )}
                    />
                    <Controller
                      name="data_nascimento"
                      control={control}
                      rules={{
                        required: "Selecione a data de nascimento",
                      }}
                      render={({
                        field: { onChange, value },
                        fieldState: { error },
                      }) => (
                        <InputDatePicker
                          label="Data de Nascimento"
                          required
                          error={error?.message}
                          onChange={onChange}
                          value={value && dayjs(value)}
                          placeholder="Selecionar data"
                        />
                      )}
                    />
                    <Controller
                      name="data_ingresso"
                      control={control}
                      rules={{
                        required: "Selecione a data que ingressou",
                      }}
                      render={({
                        field: { onChange, value },
                        fieldState: { error },
                      }) => (
                        <InputDatePicker
                          label="Data de Ingressão"
                          required
                          error={error?.message}
                          onChange={onChange}
                          value={value && dayjs(value)}
                          defaultValue={dayjs(new Date())}
                          placeholder="Selecionar data"
                        />
                      )}
                    />
                  </div>
                </div>
              ),
            },
            {
              key: "2",
              label: "Documentos",
              children: "Content of Tab Pane 2",
            },
            {
              key: "3",
              label: "Responsáveis",
              children: "Content of Tab Pane 3",
            },
          ]}
        />
      </form>
    </ModalDefault>
  );
};
