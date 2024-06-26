import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  DeleteFilled,
  EditOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import { Dispatch, SetStateAction, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { InputForm, InputSelect, UploudAvatar } from "@/components/input";
import { ModalDefault } from "@/components/modal/ModalDefault";
import {
  Popconfirm,
  Select,
  Tabs,
  Tooltip,
  UploadFile,
  notification,
} from "antd";
import { isNome } from "@/utils/validator/isName";
import { isText } from "@/utils/validator/isText";
import { IIdoso, IOperationIdoso } from "../Interface/IIdoso";
import { InputDatePicker } from "@/components/input/InputDatePicker";
import dayjs from "dayjs";
import { isCPF } from "@/utils/validator/isCPF";
import { isCNH } from "@/utils/validator/isCNH";
import { invertCPF, regexCPF } from "@/utils/regex/regexCPF";
import { isCNS } from "@/utils/validator/isCNS";
import { TableDefault } from "@/components/table/TableDefault";
import {
  IOperationResponsavelIdoso,
  IResponsavelIdoso,
} from "../Interface/IResponsavelIdoso";
import { ColumnsType } from "antd/es/table";
import { CriarResponsavelIdosoModal } from "./CriarResponsavelIdosoModal";
import { useFetch } from "@/utils/hooks/useFetch";
import { IEstado } from "@/interface/IEstado";
import { ICidade } from "@/interface/ICidade";
import axios, { AxiosError } from "axios";
import { useCookies } from "react-cookie";
import { authToken } from "@/config/authToken";
import { IErrorState, useMutation } from "@/utils/hooks/useMutation";
import { api } from "@/utils/service/api";
import { AtualizarResponsavelIdosoModal } from "./AtualizarResponsavelIdosoModal";
import { queryBuilder } from "@/utils/functions/query-builder";

export const AtualizarIdosoModal = ({
  id,
  uid,
  refetchList,
}: {
  id: bigint;
  uid: string;
  refetchList: () => void;
}) => {
  const [cookies] = useCookies([authToken.nome]);
  const [open, setOpen] = useState(false);
  const [isFetchingFoto, setIsFetchingFoto] = useState(false);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [cidades, setCidades] = useState<ICidade[]>([]);

  const { handleSubmit, control, reset, setValue } = useForm<IOperationIdoso>();

  const { data: idoso } = useFetch<IIdoso>("/idosos/" + uid, [uid], {
    enable: open,
    onSuccess: (data) => {
      const idoso = data.data;
      if (idoso) {
        if (idoso.foto) {
          setFileList([
            {
              url: idoso.foto,
              uid: idoso.uid,
              name: idoso.nome_completo,
            },
          ]);
        }

        setValue("apelido", idoso.apelido);
        setValue("cartao_sus", idoso.cartao_sus);
        setValue("certidao_casamento_folha", idoso.certidao_casamento_folha);
        setValue("certidao_casamento_livro", idoso.certidao_casamento_livro);
        setValue("certidao_nascimento_folha", idoso.certidao_nascimento_folha);
        setValue("certidao_nascimento_livro", idoso.certidao_nascimento_livro);
        setValue("cidade", idoso.cidade);
        setValue("cnh", idoso.cnh);
        setValue("cpf", idoso.cpf);
        setValue("data_ingresso", idoso.data_ingresso);
        setValue("data_nascimento", idoso.data_nascimento);
        setValue("escolaridade", idoso.escolaridade);
        setValue("estado", idoso.estado);
        setValue("estado_civil", idoso.estado_civil);
        setValue("genero", idoso.genero);
        setValue("naturalidade", idoso.naturalidade);
        setValue("nome_completo", idoso.nome_completo);
        setValue("nome_mae", idoso.nome_mae);
        setValue("nome_pai", idoso.nome_pai);
        setValue("religiao", idoso.religiao);
        setValue("rg", idoso.rg);
        setValue("rg_orgao_expedidor", idoso.rg_orgao_expedidor);
        setValue("situacao", idoso.situacao);
        setValue("titulo_eleitor", idoso.titulo_eleitor);
        setValue("titulo_eleitor_secao", idoso.titulo_eleitor_secao);
        setValue("titulo_eleitor_zona", idoso.titulo_eleitor_zona);
      }
    },
  });

  const { mutate: updateIdoso, isFetching: isUpdatingIdoso } = useMutation<
    Partial<IIdoso>,
    { uid: string; id: bigint }
  >("/idosos/" + uid, {
    method: "patch",
    messageSucess: null,
    onSuccess: async () => {
      const formData = new FormData();

      try {
        if (fileList.length > 0 && fileList[0] && fileList[0].originFileObj) {
          setIsFetchingFoto(true);
          await formData.append("foto", fileList[0]?.originFileObj);
          await api.post("/idosos/" + uid + "/upload-foto", formData, {
            headers: {
              Authorization: "Bearer " + cookies[authToken.nome],
              "content-type": "multipart/form-data",
            },
          });
        }

        await notification.open({
          message: "Operação realizada",
          description: "Idoso atualizado com sucesso!",
          type: "success",
        });
        await reset();
        await refetchList();
        await setOpen(false);
      } catch (err) {
        const error = err as AxiosError<{ error: IErrorState }>;

        notification.open({
          message: "Ocorreu um erro",
          description: error.response?.data?.error.message,
          type: "error",
        });
        setIsFetchingFoto(false);
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
      titleModal={"Editando idoso"}
      okText="Salvar"
      onSubmit={handleSubmit(updateIdoso)}
      isFetching={isUpdatingIdoso || isFetchingFoto}
      width="800px"
      setOpenModal={setOpen}
      openModal={open}
      listOptions={[
        {
          popconfirm: true,
          popconfirmType: idoso?.situacao === "ATIVO" ? "danger" : "primary",
          popconfirmTitle:
            (idoso?.situacao === "ATIVO" ? "Inativar" : "Reativar") + " Idoso",
          popconfirmDescrition:
            idoso?.situacao === "ATIVO"
              ? "Você tem certeza que deseja inativar o idoso?"
              : "Você tem certeza que deseja reativar o idoso?",
          popconfirmIcon: (
            <QuestionCircleOutlined
              style={{
                color: idoso?.situacao === "ATIVO" ? "red" : "blue",
              }}
            />
          ),
          label: idoso?.situacao === "ATIVO" ? "Inativar" : "Reativar",
          onClick: () =>
            updateIdoso({
              situacao: idoso?.situacao === "ATIVO" ? "INATIVO" : "ATIVO",
            }),
          icon:
            idoso?.situacao === "ATIVO" ? (
              <CloseCircleOutlined />
            ) : (
              <CheckCircleOutlined />
            ),
        },
      ]}
      situation={idoso?.situacao}
      created_item={idoso?.criado_em}
      updated_item={idoso?.atualizado_em}
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
                  <div className="flex gap-4">
                    <Controller
                      name="nome_mae"
                      control={control}
                      defaultValue=""
                      rules={{
                        required: "Insira o nome da mãe",
                        validate: (value) => {
                          if (isNome(value)) return "Preencher o nome completo";
                          if (isText(value))
                            return "Nome não pode conter números nem caractéres especiais";
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
                          if (isText(value))
                            return "Nome não pode conter números nem caractéres especiais";
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
                  <div className="grid grid-cols-3 gap-4">
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
                          showSearch
                        >
                          {cidades?.map((cidade) => (
                            <Select.Option
                              key={cidade.codigo_ibge}
                              value={cidade.nome}
                            >
                              {cidade.nome}
                            </Select.Option>
                          ))}
                        </InputSelect>
                      )}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
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
                          <Select.Option value={"Solteiro(a)"}>
                            Solteiro(a)
                          </Select.Option>
                          <Select.Option value={"Casado(a)"}>
                            Casado(a)
                          </Select.Option>
                          <Select.Option value={"Viúvo(a)"}>
                            Viúvo(a)
                          </Select.Option>
                          <Select.Option value={"Divorciado(a)"}>
                            Divorciado(a)
                          </Select.Option>
                          <Select.Option value={"Separado(a) judicialmente"}>
                            Separado(a) judicialmente
                          </Select.Option>
                          <Select.Option value={"União estável"}>
                            União estável
                          </Select.Option>
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
                          <Select.Option value={"Analfabeto"}>
                            Analfabeto
                          </Select.Option>
                          <Select.Option
                            value={"Ensino Fundamental Incompleto"}
                          >
                            Ensino Fundamental Incompleto
                          </Select.Option>
                          <Select.Option value={"Ensino Fundamental Completo"}>
                            Ensino Fundamental Completo
                          </Select.Option>
                          <Select.Option value={"Ensino Médio Incompleto"}>
                            Ensino Médio Incompleto
                          </Select.Option>
                          <Select.Option value={"Ensino Médio Completo"}>
                            Ensino Médio Completo
                          </Select.Option>
                          <Select.Option value={"Ensino Superior Incompleto"}>
                            Ensino Superior Incompleto
                          </Select.Option>
                          <Select.Option value={"Ensino Superior Completo"}>
                            Ensino Superior Completo
                          </Select.Option>
                        </InputSelect>
                      )}
                    />
                  </div>
                  <div className="grid grid-cols-4 gap-4">
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
                          label="Gênero Biológico"
                          onChange={onChange}
                          error={error?.message}
                          required
                          placeholder="Selecionar"
                          value={value}
                        >
                          <Select.Option value={"Masculino"}>
                            Masculino
                          </Select.Option>
                          <Select.Option value={"Feminino"}>
                            Feminino
                          </Select.Option>
                        </InputSelect>
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
                      defaultValue={new Date()}
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
              children: (
                <div className="w-full flex flex-col gap-[15px]">
                  <div className="flex gap-4">
                    <Controller
                      name="cpf"
                      control={control}
                      defaultValue=""
                      rules={{
                        validate: (value) => {
                          if (value && !isCPF(value))
                            return "Formato inválido do CPF";
                          return true;
                        },
                      }}
                      render={({
                        field: { onChange, value },
                        fieldState: { error },
                      }) => (
                        <InputForm
                          label="CPF"
                          error={error?.message}
                          onChange={(e) => {
                            onChange(invertCPF(e.target.value));
                          }}
                          value={value && regexCPF(value)}
                          placeholder="000.000.000-00"
                        />
                      )}
                    />
                    <Controller
                      name="cnh"
                      control={control}
                      defaultValue=""
                      rules={{
                        validate: (value) => {
                          if (value && !isCNH(value))
                            return "Formato inválido do CNH";
                          return true;
                        },
                      }}
                      render={({
                        field: { onChange, value },
                        fieldState: { error },
                      }) => (
                        <InputForm
                          label="CNH"
                          error={error?.message}
                          onChange={onChange}
                          value={value}
                          placeholder="00000000000"
                          maxLength={11}
                        />
                      )}
                    />
                  </div>
                  <div className="flex gap-4">
                    <Controller
                      name="rg"
                      control={control}
                      defaultValue=""
                      render={({
                        field: { onChange, value },
                        fieldState: { error },
                      }) => (
                        <InputForm
                          label="RG"
                          error={error?.message}
                          onChange={onChange}
                          value={value}
                          placeholder="MG-00.000.000"
                          maxLength={20}
                        />
                      )}
                    />
                    <Controller
                      name="rg_orgao_expedidor"
                      control={control}
                      defaultValue=""
                      render={({
                        field: { onChange, value },
                        fieldState: { error },
                      }) => (
                        <InputForm
                          label="Órgão Expedidor"
                          error={error?.message}
                          onChange={onChange}
                          value={value}
                          placeholder="SSP MG"
                          maxLength={20}
                        />
                      )}
                    />
                    <Controller
                      name="cartao_sus"
                      control={control}
                      defaultValue=""
                      rules={{
                        validate: (value) => {
                          if (value && !isCNS(value))
                            return "Formato inválido do Cartão do SUS";
                          return true;
                        },
                      }}
                      render={({
                        field: { onChange, value },
                        fieldState: { error },
                      }) => (
                        <InputForm
                          label="Cartão do SUS"
                          error={error?.message}
                          onChange={onChange}
                          value={value}
                          placeholder="000000000000000"
                          maxLength={15}
                        />
                      )}
                    />
                  </div>
                  <div className="flex gap-4">
                    <Controller
                      name="titulo_eleitor"
                      control={control}
                      defaultValue=""
                      render={({
                        field: { onChange, value },
                        fieldState: { error },
                      }) => (
                        <InputForm
                          label="Título de Eleitor"
                          error={error?.message}
                          onChange={onChange}
                          value={value}
                          placeholder="000000000000"
                          maxLength={12}
                        />
                      )}
                    />
                    <Controller
                      name="titulo_eleitor_zona"
                      control={control}
                      defaultValue=""
                      render={({
                        field: { onChange, value },
                        fieldState: { error },
                      }) => (
                        <InputForm
                          label="Zona"
                          error={error?.message}
                          onChange={onChange}
                          value={value}
                          placeholder="000"
                          maxLength={3}
                        />
                      )}
                    />
                    <Controller
                      name="titulo_eleitor_secao"
                      control={control}
                      defaultValue=""
                      render={({
                        field: { onChange, value },
                        fieldState: { error },
                      }) => (
                        <InputForm
                          label="Seção"
                          error={error?.message}
                          onChange={onChange}
                          value={value}
                          placeholder="0000"
                          maxLength={4}
                        />
                      )}
                    />
                  </div>
                  <div className="flex gap-4">
                    <Controller
                      name="certidao_nascimento_livro"
                      control={control}
                      defaultValue=""
                      render={({
                        field: { onChange, value },
                        fieldState: { error },
                      }) => (
                        <InputForm
                          label="C. Nascimento / Livro"
                          error={error?.message}
                          onChange={onChange}
                          value={value}
                          placeholder="00000"
                          maxLength={5}
                        />
                      )}
                    />
                    <Controller
                      name="certidao_nascimento_folha"
                      control={control}
                      defaultValue=""
                      render={({
                        field: { onChange, value },
                        fieldState: { error },
                      }) => (
                        <InputForm
                          label="C. Nascimento / Folha"
                          error={error?.message}
                          onChange={onChange}
                          value={value}
                          placeholder="000"
                          maxLength={3}
                        />
                      )}
                    />
                    <Controller
                      name="certidao_casamento_livro"
                      control={control}
                      defaultValue=""
                      render={({
                        field: { onChange, value },
                        fieldState: { error },
                      }) => (
                        <InputForm
                          label="C. Casamento / Livro"
                          error={error?.message}
                          onChange={onChange}
                          value={value}
                          placeholder="00000"
                          maxLength={5}
                        />
                      )}
                    />
                    <Controller
                      name="certidao_casamento_folha"
                      control={control}
                      defaultValue=""
                      render={({
                        field: { onChange, value },
                        fieldState: { error },
                      }) => (
                        <InputForm
                          label="C. Casamento / Folha"
                          error={error?.message}
                          onChange={onChange}
                          value={value}
                          placeholder="000"
                          maxLength={3}
                        />
                      )}
                    />
                  </div>
                </div>
              ),
            },
            {
              key: "3",
              label: "Responsáveis",
              children: (
                <div className="w-full flex flex-col gap-[15px]">
                  <Responsaveis idIdoso={id} />
                </div>
              ),
            },
          ]}
        />
      </form>
    </ModalDefault>
  );
};

const Responsaveis = ({ idIdoso }: { idIdoso: bigint }) => {
  const [cookies] = useCookies([authToken.nome]);
  const columns: ColumnsType<IResponsavelIdoso> = [
    {
      title: "Nome",
      dataIndex: "nome_completo",
      key: "nome_completo",
    },
    {
      title: "Parentesco",
      dataIndex: "parentesco",
      key: "parentesco",
    },
    {
      title: "Contatos",
      key: "telefones",
      render(_: any, record: IResponsavelIdoso) {
        return (
          <div className="flex flex-col">
            <p>{record.telefone_1}</p>
            <p>{record?.telefone_2}</p>
          </div>
        );
      },
    },
    {
      key: "atualizar_responsavel_idoso",
      width: 50,
      render(_: any, record: IResponsavelIdoso) {
        return (
          <div className="flex justify-end w-full">
            <AtualizarResponsavelIdosoModal
              uid={record.uid}
              refetch={refetch}
            />
          </div>
        );
      },
    },
    {
      key: "deletar_responsavel_idoso",
      width: 50,
      render(_: any, record: IResponsavelIdoso) {
        return (
          <div className="flex justify-end w-full">
            <Popconfirm
              overlayStyle={{ maxWidth: 350 }}
              placement="rightBottom"
              title={"Excluir"}
              description={"Você tem certeza que deseja excluir?"}
              onConfirm={() =>
                api
                  .delete("/responsaveis/" + record.uid, {
                    headers: {
                      Authorization: "Bearer " + cookies[authToken.nome],
                    },
                  })
                  .then(() => {
                    notification.open({
                      message: "Operação realizada",
                      description: "Responsável excluído com sucesso!",
                      type: "success",
                    });

                    refetch();
                  })
              }
              okType={"danger"}
              okText={"Confirmar"}
              cancelText={"Cancelar"}
              icon={<QuestionCircleOutlined style={{ color: "red" }} />}
            >
              <Tooltip title={"Excluir"}>
                <button
                  type="button"
                  className="text-red-500 w-[50px] h-full flex justify-center items-center hover:text-red-700"
                >
                  <DeleteFilled className="text-[16px]" />
                </button>
              </Tooltip>
            </Popconfirm>
          </div>
        );
      },
    },
  ];

  const { data, refetch } = useFetch<IResponsavelIdoso[]>(
    "/responsaveis",
    ["responsaveis", idIdoso],
    {
      params: queryBuilder({
        page_limit: 99999,
        filter: [{ path: "id_idoso", operator: "equals", value: idIdoso }],
        sort: [{ field: "criado_em", criteria: "desc" }],
      }),
    }
  );

  return (
    <>
      <div>
        <CriarResponsavelIdosoModal refetch={refetch} idIdoso={idIdoso} />
      </div>
      <TableDefault dataSource={data} columns={columns} />
    </>
  );
};
