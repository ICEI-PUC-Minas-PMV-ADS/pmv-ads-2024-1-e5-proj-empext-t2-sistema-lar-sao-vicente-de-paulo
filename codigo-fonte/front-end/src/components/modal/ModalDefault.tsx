import { Button, Modal } from "antd";
import { ReactNode, useState } from "react";

interface IModalDefault {
  children: ReactNode;
  customButtonOpenModal?: ReactNode;
  nameButtonOpenModal: string;
  iconButtonOpenModal?: ReactNode;
  titleModal: string;
  onSubmit: () => void;
  isFetching?: boolean;
  showModal?: boolean;
  width?: string;
  okText?: string;
  cancelText?: string;
}

export const ModalDefault = ({
  children,
  onSubmit,
  isFetching,
  showModal,
  customButtonOpenModal,
  nameButtonOpenModal,
  iconButtonOpenModal,
  titleModal,
  width,
  okText,
  cancelText,
}: IModalDefault) => {
  const [open, setOpen] = useState(false);

  const showModalDefault = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <>
      {customButtonOpenModal ? (
        customButtonOpenModal
      ) : (
        <Button
          type="primary"
          onClick={showModalDefault}
          size="large"
          icon={iconButtonOpenModal}
        >
          {nameButtonOpenModal}
        </Button>
      )}

      <Modal
        destroyOnClose
        centered
        keyboard
        title={titleModal}
        open={showModal ? showModal : open}
        onOk={onSubmit}
        confirmLoading={isFetching}
        onCancel={handleCancel}
        okButtonProps={{ size: "large" }}
        cancelButtonProps={{ size: "large" }}
        okText={okText ? okText : "Cadastrar"}
        cancelText={cancelText ? cancelText : "Cancelar"}
        width={width}
        styles={{
          content: { margin: 24 },
          body: { margin: "24px 0" },
          header: { marginBottom: 8 },
        }}
      >
        {children}
      </Modal>
    </>
  );
};
