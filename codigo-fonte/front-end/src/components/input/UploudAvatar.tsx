import { CameraOutlined } from "@ant-design/icons";
import { GetProp, Upload, UploadFile, UploadProps, Image } from "antd";
import { Dispatch, SetStateAction, useState } from "react";

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

export const UploudAvatar = ({
  fileList,
  setFileList,
}: {
  fileList: UploadFile<any>[];
  setFileList: Dispatch<SetStateAction<UploadFile<any>[]>>;
}) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");

  const getBase64 = (file: FileType): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });

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
      <Upload
        listType="picture-circle"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
      >
        {fileList.length >= 1 ? null : (
          <button style={{ border: 0, background: "none" }} type="button">
            <CameraOutlined className="text-[45px] opacity-20" />
          </button>
        )}
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
  );
};
