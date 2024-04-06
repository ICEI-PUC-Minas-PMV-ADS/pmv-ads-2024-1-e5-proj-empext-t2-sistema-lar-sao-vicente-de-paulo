import { MoreOutlined } from "@ant-design/icons";
import { Alert, Button, Dropdown, Modal } from "antd";
import { Dispatch, ReactNode, SetStateAction, useState } from "react";

interface IModalDefault {
  children: ReactNode;
  customButtonOpenModal?: ReactNode;
  nameButtonOpenModal?: string;
  iconButtonOpenModal?: ReactNode;
  titleModal: string;
  onSubmit: () => void;
  isFetching?: boolean;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
  openModal: boolean;
  width?: string;
  okText?: string;
  okDisable?: boolean;
  cancelText?: string;
  listOptions?: {
    label?: string;
    icon?: ReactNode;
    onClick?: () => void;
    customOption?: ReactNode;
  }[];
  onClose?: () => void;
  situation?: "ATIVO" | "INATIVO";
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
  listOptions,
  okDisable,
  onClose,
  situation,
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
        destroyOnClose={false}
        keyboard
        title={titleModal}
        afterOpenChange={onClose}
        open={openModal}
        onOk={onSubmit}
        onCancel={handleCancel}
        width={width}
        styles={{
          content: { margin: 24 },
          body: { margin: "24px 0" },
          header: { marginBottom: 8 },
        }}
        footer={
          <div className="flex justify-between w-full">
            <div className="flex gap-2 justify-end">
              {listOptions && (
                <Dropdown
                  className="flex px-[10px] justify-center items-center border border-black/20 rounded-md cursor-pointer hover:border-primaria text-black hover:text-primaria"
                  dropdownRender={(m) => (
                    <div className="flex flex-col w-full gap-[8px] bg-white shadow-lg rounded-lg p-[10px]">
                      {listOptions.map((option) =>
                        option.customOption ? (
                          option.customOption
                        ) : (
                          <button
                            key={option.label}
                            className="appearance-none items-center flex gap-2 text-left py-[10px] px-[15px] rounded-lg hover:bg-primaria transition-all text-black font-semibold hover:text-white hover:cursor-pointer"
                            onClick={option.onClick}
                          >
                            {option.icon}
                            {option.label}
                          </button>
                        )
                      )}
                    </div>
                  )}
                >
                  <MoreOutlined className="text-[18px]" />
                </Dropdown>
              )}
              {situation && (
                <Alert
                  message={situation === "ATIVO" ? "Ativo" : "Inativo"}
                  type={situation === "ATIVO" ? "success" : "error"}
                  showIcon
                />
              )}
            </div>
            <div className="flex gap-2 justify-end">
              <Button onClick={handleCancel} htmlType="button" size="large">
                {cancelText ? cancelText : "Cancelar"}
              </Button>
              <Button
                loading={isFetching}
                onClick={onSubmit}
                disabled={okDisable}
                htmlType="button"
                size="large"
                type="primary"
              >
                {okText ? okText : "Ok"}
              </Button>
            </div>
          </div>
        }
      >
        {children}
      </Modal>
    </>
  );
};
