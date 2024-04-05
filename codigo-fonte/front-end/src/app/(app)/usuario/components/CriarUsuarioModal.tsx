import { useMutation } from "@/utils/hooks/useMutation";
import { CameraOutlined, UserAddOutlined } from "@ant-design/icons";
import {
  Button,
  Form,
  GetProp,
  Modal,
  Select,
  Upload,
  UploadFile,
  UploadProps,
  Image,
} from "antd";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { ICreateUsuario } from "../Interface/IUsuario";
import { useFetch } from "@/utils/hooks/useFetch";
import { queryBuilder } from "@/utils/functions/query-builder";
import { invertCPF, regexCPF } from "@/utils/regex/regexCPF";
import { InputForm, InputPassword, InputSelect } from "@/components/input";
import { isCPF } from "@/utils/validator/isCPF";

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

export const CriarUsuarioModal = ({
  refetchList,
}: {
  refetchList: () => void;
}) => {
  const [open, setOpen] = useState(false);

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const showModal = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const { handleSubmit, control, setValue, reset } = useForm<ICreateUsuario>();

  const { mutate: createUsuario, isFetching } = useMutation<ICreateUsuario>(
    "/usuarios",
    {
      method: "post",
      messageSucess: "Usuário cadastrado com sucesso!",
      onSuccess: () => {
        reset();
        refetchList();
        setOpen(false);
      },
    }
  );

  const { data: cargos } = useFetch<
    { id: number; uid: string; nome: string }[]
  >("/cargos", ["cargos_lista"], {
    params: queryBuilder({
      page_limit: 999999,
    }),
  });

  const uploadButton = (
    <button style={{ border: 0, background: "none" }} type="button">
      <CameraOutlined className="text-[45px] opacity-20" />
    </button>
  );

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    newFileList = newFileList.map((file) => {
      if (file.error) {
        file.status = "done";
      }
      return file;
    });
    setFileList(newFileList);
  };

  return (
    <>
      <Button
        type="primary"
        onClick={showModal}
        size="large"
        icon={<UserAddOutlined />}
      >
        Cadastrar
      </Button>
      <Modal
        destroyOnClose
        centered
        keyboard
        title={"Adicionando usuário"}
        open={open}
        onOk={handleSubmit(createUsuario)}
        confirmLoading={isFetching}
        onCancel={handleCancel}
        okButtonProps={{ size: "large" }}
        cancelButtonProps={{ size: "large" }}
        okText="Cadastrar"
        cancelText="Cancelar"
        width={"700px"}
        styles={{
          content: { margin: 24 },
          body: { margin: "24px 0" },
          header: { marginBottom: 8 },
        }}
      >
        <form className="w-full flex flex-col gap-[15px]">
          <div className="flex items-center gap-[15px]">
            <div className="w-[140px] h-[100px] flex items-center">
              <Controller
                name="foto"
                control={control}
                render={() => (
                  <>
                    <Upload
                      action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                      listType="picture-circle"
                      fileList={fileList}
                      onPreview={handlePreview}
                      onChange={handleChange}
                    >
                      {fileList.length >= 1 ? null : uploadButton}
                    </Upload>
                    {previewImage && (
                      <Image
                        alt="foto-usuario"
                        wrapperStyle={{ display: "none" }}
                        preview={{
                          visible: previewOpen,
                          onVisibleChange: (visible) => setPreviewOpen(visible),
                        }}
                        src={previewImage}
                      />
                    )}
                  </>
                )}
              />
            </div>
            <Controller
              name="nome"
              control={control}
              defaultValue=""
              rules={{ required: "Insira o nome do usuário" }}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <InputForm
                  label="Nome"
                  required
                  error={error?.message}
                  onChange={onChange}
                  value={value}
                  placeholder="Maria da Silva"
                />
              )}
            />
          </div>
          <div className="flex justify-between gap-4">
            <Controller
              name="cpf_cnh"
              control={control}
              defaultValue=""
              rules={{
                required: "Insira o CPF do usuário",
                validate: (value) => {
                  if (!isCPF(value)) return "Formato inválido do CPF";
                  return true;
                },
              }}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <InputForm
                  label="CPF"
                  required
                  error={error?.message}
                  onChange={(e) => {
                    onChange(invertCPF(e.target.value));
                  }}
                  value={regexCPF(value)}
                  placeholder="000.000.000-00"
                />
              )}
            />
            <Controller
              name="id_cargo"
              control={control}
              rules={{ required: "Insira um cargo para o usuário" }}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <InputSelect
                  tooltip="O cargo irá definir as permissões que o usuário terá no sistema."
                  label="Cargo"
                  onChange={onChange}
                  error={error?.message}
                  required
                  placeholder="Selecionar"
                >
                  {cargos?.map((cargo) => (
                    <option key={cargo.uid} value={cargo.id}>
                      {cargo.nome}
                    </option>
                  ))}
                </InputSelect>
              )}
            />
          </div>
          <div className="flex justify-between gap-4">
            <Controller
              name="email"
              control={control}
              rules={{ required: "Insira o e-mail do usuário" }}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <InputForm
                  label="E-mail"
                  required
                  error={error?.message}
                  onChange={onChange}
                  value={value}
                  placeholder="maria@mail.com"
                />
              )}
            />
            <Controller
              name="senha"
              control={control}
              rules={{ required: "Insira a senha do usuário" }}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <InputPassword
                  label="Senha"
                  required
                  placeholder="********"
                  error={error?.message}
                  onChange={onChange}
                  value={value}
                />
              )}
            />
          </div>
        </form>
      </Modal>
    </>
  );
};
