import { useMutation } from "@/utils/hooks/useMutation";
import { CameraOutlined, UserAddOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal, Select } from "antd";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { ICreateUsuario } from "../Interface/IUsuario";
import { useFetch } from "@/utils/hooks/useFetch";
import { queryBuilder } from "@/utils/functions/query-builder";

export const CriarUsuarioModal = ({
  refetchList,
}: {
  refetchList: () => void;
}) => {
  const [open, setOpen] = useState(false);

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

  const handleFileLogo = (file: FileList) => {
    const fileLogo = file[0];
    const fileReader = new FileReader();
    fileReader.readAsBinaryString(fileLogo);
    fileReader.onload = () => {
      const content = fileReader.result;
      /*  setValue(
        "foto",
        Buffer.from(content?.toString() || "", "binary").toString("base64")
      ); */
    };
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
          body: { marginTop: 24 },
          header: { marginBottom: 8 },
        }}
      >
        <Form layout="vertical" className="w-full flex flex-col">
          <div className="flex items-center gap-[15px]">
            <Controller
              name="foto"
              control={control}
              render={({ field: { value } }) => (
                <label
                  htmlFor="foto-usuario"
                  className="z-10 h-[80px] w-[80px] rounded-full hover:cursor-pointer hover:opacity-80"
                >
                  <input
                    id="foto-usuario"
                    type="file"
                    style={{ display: "none" }}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      if (event.target.files)
                        handleFileLogo(event.target.files);
                    }}
                  />
                  <div
                    style={{
                      backgroundImage: `url("data:image/png;base64,${value}")`,
                    }}
                    className="flex h-[80px] w-[80px] items-center justify-center rounded-full bg-cinza bg-contain bg-center bg-no-repeat p-[15px] text-center text-base text-custom9"
                  >
                    {!value && (
                      <CameraOutlined className="text-[36px] opacity-20" />
                    )}
                  </div>
                </label>
              )}
            />
            <Controller
              name="nome"
              control={control}
              defaultValue=""
              rules={{ required: "Insira o nome do usuário!" }}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <Form.Item label="Nome" required className="w-full">
                  <Input
                    onChange={onChange}
                    value={value}
                    size="large"
                    placeholder="Maria da Silva"
                  />
                  <p className="text-red-600">{error?.message}</p>
                </Form.Item>
              )}
            />
          </div>
          <div className="flex justify-between gap-4">
            <Controller
              name="cpf_cnh"
              control={control}
              defaultValue=""
              rules={{ required: "Insira o CPF do usuário!" }}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <Form.Item label="CPF" required className="w-full">
                  <Input
                    onChange={onChange}
                    value={value}
                    size="large"
                    placeholder="000.000.000-00"
                  />
                  <p className="text-red-600">{error?.message}</p>
                </Form.Item>
              )}
            />
            <Controller
              name="id_cargo"
              control={control}
              rules={{ required: "Insira um cargo para o usuário!" }}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <Form.Item
                  label="Cargo"
                  tooltip="O cargo irá definir as permissões que o usuário terá no sistema."
                  required
                  className="w-full"
                >
                  <Select
                    onChange={onChange}
                    size="large"
                    aria-required
                    placeholder="Selecionar"
                  >
                    {cargos?.map((cargo) => (
                      <option key={cargo.uid} value={cargo.id}>
                        {cargo.nome}
                      </option>
                    ))}
                  </Select>
                  <p className="text-red-600">{error?.message}</p>
                </Form.Item>
              )}
            />
          </div>
          <div className="flex justify-between gap-4">
            <Controller
              name="email"
              control={control}
              rules={{ required: "Insira o e-mail do usuário!" }}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <Form.Item label="E-mail" required className="w-full">
                  <Input
                    onChange={onChange}
                    value={value}
                    size="large"
                    placeholder="maria@mail.com"
                  />
                  <p className="text-red-600">{error?.message}</p>
                </Form.Item>
              )}
            />
            <Controller
              name="senha"
              control={control}
              rules={{ required: "Insira a senha do usuário!" }}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <Form.Item label="Senha" required className="w-full">
                  <Input.Password
                    onChange={onChange}
                    value={value}
                    size="large"
                  />
                  <p className="text-red-600">{error?.message}</p>
                </Form.Item>
              )}
            />
          </div>
        </Form>
      </Modal>
    </>
  );
};
