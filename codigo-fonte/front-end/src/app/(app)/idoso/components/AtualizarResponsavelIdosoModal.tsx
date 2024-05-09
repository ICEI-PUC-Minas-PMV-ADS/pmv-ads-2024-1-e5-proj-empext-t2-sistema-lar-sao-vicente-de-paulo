import { EditOutlined, UserAddOutlined } from "@ant-design/icons";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { InputForm, InputSelect } from "@/components/input";
import { ModalDefault } from "@/components/modal/ModalDefault";
import { isNome } from "@/utils/validator/isName";
import { isText } from "@/utils/validator/isText";
import {
  IOperationResponsavelIdoso,
  IResponsavelIdoso,
} from "../Interface/IResponsavelIdoso";
import { regexTel } from "@/utils/regex/regexTel";
import { regexCEP } from "@/utils/regex/regexCEP";
import { isCEP } from "@/utils/validator/isCEP";
import { Select, Tooltip } from "antd";
import axios from "axios";
import { useFetch } from "@/utils/hooks/useFetch";
import { IEstado } from "@/interface/IEstado";
import { ICidade } from "@/interface/ICidade";
import { useMutation } from "@/utils/hooks/useMutation";

export const AtualizarResponsavelIdosoModal = ({
  setResponsaveis,
  responsavel,
  uid,
  refetch,
}: {
  setResponsaveis?: (value: IOperationResponsavelIdoso) => void;
  responsavel?: IOperationResponsavelIdoso;
  uid?: string;
  refetch?: () => void;
}) => {
  const [open, setOpen] = useState(false);
  const [cidades, setCidades] = useState<ICidade[]>([]);

  const { handleSubmit, control, setValue } =
    useForm<IOperationResponsavelIdoso>({
      defaultValues: responsavel,
    });

  useFetch<IResponsavelIdoso>("/responsaveis/" + uid, [uid], {
    enable: open && !!uid,
    onSuccess: (data) => {
      const responsavel = data.data;
      if (responsavel) {
        setValue("bairro", responsavel.bairro);
        setValue("cep", responsavel.cep);
        setValue("cidade", responsavel.cidade);
        setValue("endereco_numero", responsavel.endereco_numero);
        setValue("estado", responsavel.estado);
        setValue("logradouro", responsavel.logradouro);
        setValue("nome_completo", responsavel.nome_completo);
        setValue("parentesco", responsavel.parentesco);
        setValue("telefone_1", responsavel.telefone_1);
        setValue("telefone_2", responsavel.telefone_2);
      }
    },
  });

  const { data: estados } = useFetch<IEstado[]>(
    "https://brasilapi.com.br/api/ibge/uf/v1",
    ["estados_brasil"],
    {
      method: "get",
      enable: open,
      messageError: null,
      resNotInData: true,
    }
  );

  const adicionarResponsavel = async (data: IOperationResponsavelIdoso) => {
    if (setResponsaveis) await setResponsaveis(data);
    if (refetch && uid) await updateResponsavel(data);
    await setOpen(false);
  };

  const { mutate: updateResponsavel } = useMutation<Partial<IResponsavelIdoso>>(
    "/responsaveis/" + uid,
    {
      method: "patch",
      messageSucess: "Responsável atualizado com sucesso!",
      onSuccess: () => {
        refetch && refetch();
      },
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
      iconButtonOpenModal={<UserAddOutlined />}
      titleModal={"Atualizando responsável"}
      okText="Salvar"
      onSubmit={handleSubmit(adicionarResponsavel)}
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
            rules={{
              required: "Insira o nome do responsável",
              validate: (value) => {
                if (isNome(value)) return "Preencher o nome completo";
                if (isText(value))
                  return "Nome não pode conter números nem caractéres especiais";
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
            rules={{
              required: "Insira um número de telefone",
            }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <InputForm
                label="1° Telefone"
                required
                error={error?.message}
                onChange={(e) => onChange(regexTel(e.target.value))}
                value={value && regexTel(value)}
                placeholder="(35) 99999-9999"
              />
            )}
          />
          <Controller
            name="telefone_2"
            control={control}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <InputForm
                label="2° Telefone"
                error={error?.message}
                onChange={(e) => onChange(regexTel(e.target.value))}
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
            rules={{
              required: "Insira o CEP",
              validate: (value) => {
                if (!isCEP(value)) return "Formato inválido do CEP";
                return true;
              },
            }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <InputForm
                label="CEP"
                required
                error={error?.message}
                onChange={(e) => onChange(regexCEP(e.target.value))}
                value={value && regexCEP(value)}
                placeholder="00000-000"
              />
            )}
          />
          <Controller
            name="logradouro"
            control={control}
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
            name="bairro"
            control={control}
            rules={{
              required: "Insira o Bairro",
            }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <InputForm
                label="Bairro"
                required
                error={error?.message}
                onChange={onChange}
                value={value}
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
                onChange={(value) => {
                  onChange(value);
                  axios
                    .get(
                      `https://brasilapi.com.br/api/ibge/municipios/v1/${value}?providers=dados-abertos-br,gov,wikipedia`
                    )
                    .then((data) => {
                      setCidades(data.data);
                    });
                }}
                error={error?.message}
                required
                placeholder="Selecionar"
                value={value}
                showSearch
              >
                {estados?.map((estado) => (
                  <Select.Option key={estado.id} value={estado.sigla}>
                    {estado.sigla}
                  </Select.Option>
                ))}
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
                showSearch
              >
                {cidades?.map((cidade) => (
                  <Select.Option key={cidade.codigo_ibge} value={cidade.nome}>
                    {cidade.nome}
                  </Select.Option>
                ))}
              </InputSelect>
            )}
          />
        </div>
      </form>
    </ModalDefault>
  );
};
