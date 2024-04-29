import { UserAddOutlined } from "@ant-design/icons";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { InputForm, InputSelect } from "@/components/input";
import { ModalDefault } from "@/components/modal/ModalDefault";
import { isNome } from "@/utils/validator/isName";
import { withoutNumber } from "@/utils/validator/withoutNumber";
import { IOperationResponsavelIdoso } from "../Interface/IResponsavelIdoso";
import { regexTel } from "@/utils/regex/regexTel";
import { regexCEP } from "@/utils/regex/regexCEP";
import { isCEP } from "@/utils/validator/isCEP";
import { Select } from "antd";

export const CriarResponsavelIdosoModal = ({
  refetchList,
}: {
  refetchList: () => void;
}) => {
  const [open, setOpen] = useState(false);

  const { handleSubmit, control, reset, watch } =
    useForm<IOperationResponsavelIdoso>();

  return (
    <ModalDefault
      nameButtonOpenModal={"Cadastrar Responsável"}
      iconButtonOpenModal={<UserAddOutlined />}
      titleModal={"Adicionando responsável"}
      okText="Adicionar"
      onSubmit={() => {}}
      isFetching={false}
      width="750px"
      setOpenModal={setOpen}
      openModal={open}
    >
      <form className="w-full flex flex-col gap-[15px]">
        <div className="flex items-center gap-[15px]">
          <Controller
            name="nome_completo"
            control={control}
            defaultValue=""
            rules={{
              required: "Insira o nome do responsável",
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
                placeholder="Marcos da Silva"
              />
            )}
          />
          <Controller
            name="parentesco"
            control={control}
            defaultValue=""
            rules={{
              required: "Insira o parentesco",
            }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <InputForm
                label="Parentesco"
                required
                error={error?.message}
                onChange={onChange}
                value={value}
                placeholder="Filho(a)"
              />
            )}
          />
        </div>
        <div className="flex items-center gap-[15px]">
          <Controller
            name="telefone_1"
            control={control}
            defaultValue=""
            rules={{
              required: "Insira um número de telefone",
            }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <InputForm
                label="1° Telefone"
                required
                error={error?.message}
                onChange={onChange}
                value={regexTel(value)}
                placeholder="(35) 99999-9999"
              />
            )}
          />
          <Controller
            name="telefone_2"
            control={control}
            defaultValue=""
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <InputForm
                label="2° Telefone"
                error={error?.message}
                onChange={onChange}
                value={value && regexTel(value)}
                placeholder="(35) 99999-9999"
              />
            )}
          />
        </div>
        <div className="flex items-center gap-[15px]">
          <Controller
            name="cep"
            control={control}
            defaultValue=""
            rules={{
              required: "Insira o CEP",
              validate: (value) => {
                if (isCEP(value)) return "Formato inválido do CEP";
                return true;
              },
            }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <InputForm
                label="CEP"
                required
                error={error?.message}
                onChange={onChange}
                value={regexCEP(value)}
                placeholder="00000-000"
              />
            )}
          />
          <Controller
            name="logradouro"
            control={control}
            defaultValue=""
            rules={{
              required: "Insira o logradouro",
            }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <InputForm
                label="Logradouro"
                required
                error={error?.message}
                onChange={onChange}
                value={value}
                placeholder="Rua Avenida"
              />
            )}
          />
          <Controller
            name="endereco_numero"
            control={control}
            defaultValue=""
            rules={{
              required: "Insira o número residencial",
            }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <InputForm
                label="Número Residencial"
                required
                error={error?.message}
                onChange={onChange}
                value={value}
                placeholder="999"
              />
            )}
          />
        </div>
        <div className="flex items-center gap-[15px]">
          <Controller
            name="cep"
            control={control}
            defaultValue=""
            rules={{
              required: "Insira o Bairro",
            }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <InputForm
                label="CEP"
                required
                error={error?.message}
                onChange={onChange}
                value={regexCEP(value)}
                placeholder="Bairro Jardim"
              />
            )}
          />
          <Controller
            name="estado"
            control={control}
            rules={{
              required: "Selecione o estado",
            }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
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
            render={({ field: { onChange, value }, fieldState: { error } }) => (
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
      </form>
    </ModalDefault>
  );
};
