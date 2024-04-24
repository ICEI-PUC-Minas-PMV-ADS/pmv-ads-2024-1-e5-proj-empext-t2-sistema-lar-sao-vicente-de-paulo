import { MoreOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import { Alert, Button, Dropdown, Modal, Popconfirm } from "antd";
import { LegacyButtonType } from "antd/es/button/button";
import dayjs from "dayjs";
import { Dispatch, ReactNode, SetStateAction } from "react";

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
    popconfirm?: boolean;
    popconfirmOkText?: string;
    popconfirmOkCancel?: string;
    popconfirmTitle?: string;
    popconfirmDescrition?: string;
    popconfirmIcon?: ReactNode;
    popconfirmType?: LegacyButtonType | undefined;
  }[];
  onClose?: () => void;
  situation?: "ATIVO" | "INATIVO";
  user_created_item?: string;
  created_item?: Date;
  updated_item?: Date;
  customAlert?: ReactNode;
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
  customAlert,
  user_created_item,
  created_item,
  updated_item,
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
          htmlType="button"
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
          <div className="flex flex-col w-full gap-2">
            {created_item && updated_item && (
              <div className="w-full text-xs flex text-black/40 gap-3">
                {user_created_item ? (
                  <p>
                    Criado por {user_created_item} em{" "}
                    {dayjs(created_item).format("DD/MM/YY, H:mm")}
                  </p>
                ) : (
                  <p>
                    Criado em {dayjs(created_item).format("DD/MM/YY, H:mm")}
                  </p>
                )}
                |
                <p>
                  Última atualização em{" "}
                  {dayjs(updated_item).format("DD/MM/YY, H:mm")}
                </p>
              </div>
            )}
            <div className="flex justify-between w-full">
              <div className="flex gap-2">
                {listOptions && (
                  <Dropdown
                    trigger={["click"]}
                    className="flex px-[10px] justify-center items-center border border-black/20 rounded-md cursor-pointer hover:border-primaria text-black hover:text-primaria"
                    dropdownRender={(m) => (
                      <div className="flex flex-col w-full gap-[8px] bg-white shadow-lg rounded-lg p-[10px]">
                        {listOptions.map((option) =>
                          option.customOption ? (
                            option.customOption
                          ) : option.popconfirm ? (
                            <>
                              <Popconfirm
                                overlayStyle={{ maxWidth: 350 }}
                                placement="rightBottom"
                                title={
                                  option.popconfirmTitle
                                    ? option.popconfirmTitle
                                    : "Deletar"
                                }
                                description={
                                  option.popconfirmDescrition
                                    ? option.popconfirmDescrition
                                    : "Você tem certeza que deseja deletar?"
                                }
                                onConfirm={option.onClick}
                                okType={
                                  option.popconfirmType
                                    ? option.popconfirmType
                                    : "danger"
                                }
                                okText={
                                  option.popconfirmOkText
                                    ? option.popconfirmOkText
                                    : "Confirmar"
                                }
                                cancelText={
                                  option.popconfirmOkCancel
                                    ? option.popconfirmOkCancel
                                    : "Cancelar"
                                }
                                okButtonProps={{
                                  loading: isFetching,
                                }}
                                icon={
                                  option.popconfirmIcon ? (
                                    option.popconfirmIcon
                                  ) : (
                                    <QuestionCircleOutlined
                                      style={{ color: "red" }}
                                    />
                                  )
                                }
                              >
                                <button
                                  type="button"
                                  key={option.label}
                                  className="appearance-none items-center flex gap-2 text-left py-[10px] px-[15px] rounded-lg hover:bg-primaria transition-all text-black font-semibold hover:text-white hover:cursor-pointer"
                                >
                                  {option.icon}
                                  {option.label}
                                </button>
                              </Popconfirm>
                            </>
                          ) : (
                            <button
                              type="button"
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
                {customAlert && customAlert}
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
          </div>
        }
      >
        {children}
      </Modal>
    </>
  );
};
