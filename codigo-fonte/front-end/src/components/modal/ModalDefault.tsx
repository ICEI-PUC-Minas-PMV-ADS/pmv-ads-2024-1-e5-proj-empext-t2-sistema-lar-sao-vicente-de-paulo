import { Button, Modal } from "antd";
import { Dispatch, ReactNode, SetStateAction, useState } from "react";

interface IModalDefault {
  children: ReactNode;
  customButtonOpenModal?: ReactNode;
  nameButtonOpenModal: string;
  iconButtonOpenModal?: ReactNode;
  titleModal: string;
  onSubmit: () => void;
  isFetching?: boolean;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
  openModal: boolean;
  width?: string;
  okText?: string;
  cancelText?: string;
}

export const ModalDefault = ({
  children,
  onSubmit,
  isFetching,
  setOpenModal,
  openModal,
  customButtonOpenModal,
  nameButtonOpenModal,
  iconButtonOpenModal,
  titleModal,
  width,
  okText,
  cancelText,
}: IModalDefault) => {
  const showModalDefault = () => {
    setOpenModal(true);
  };

  const handleCancel = () => {
    setOpenModal(false);
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
        open={openModal}
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
