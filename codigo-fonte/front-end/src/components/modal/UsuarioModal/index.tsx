import { CameraOutlined, UserAddOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal, Select } from "antd";
import { useState } from "react";

export const UsuarioModal = () => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
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
        title="Adicionando usuário"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        okText="Cadastrar"
        cancelText="Cancelar"
      >
        <div className="w-full">
          <Form layout="vertical">
            <div className="flex flex-col">
              <div className="flex items-center gap-[15px]">
                <div className="bg-borderSecondary rounded-full p-3">
                  <CameraOutlined className="text-[36px] opacity-20" />
                </div>
                <Form.Item
                  label="Nome"
                  name="nome"
                  rules={[
                    { required: true, message: "Insira o nome do usuário!" },
                  ]}
                  className="w-full"
                  required
                >
                  <Input placeholder="Maria da Silva" />
                </Form.Item>
              </div>
              <div className="flex justify-between gap-4">
                <Form.Item
                  label="CPF"
                  name="cpf"
                  rules={[
                    { required: true, message: "Insira o CPF do usuário!" },
                  ]}
                  className="w-full"
                  required
                >
                  <Input placeholder="000.000.000-00" />
                </Form.Item>
                <Form.Item
                  tooltip="Um cargo referente ao usuário que será cadastrado."
                  label="Cargo"
                  name="cargo"
                  rules={[
                    {
                      required: true,
                      message: "Insira um cargo para o usuário!",
                    },
                  ]}
                  className="w-full"
                >
                  <Select aria-required placeholder="Selecionar" />
                </Form.Item>
              </div>
              <Form.Item
                label="E-mail"
                name="email"
                rules={[
                  { required: true, message: "Insira o e-mail do usuário!" },
                ]}
                className="w-full"
              >
                <Input placeholder="maria@mail.com" />
              </Form.Item>
            </div>
          </Form>
        </div>
      </Modal>
    </>
  );
};
