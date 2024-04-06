import { CameraOutlined } from "@ant-design/icons";
import { GetProp, Upload, UploadFile, UploadProps, Image } from "antd";
import { useState } from "react";

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

export const UploudAvatar = () => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState<UploadFile[]>([]);

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
        action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
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
function getBase64(
  arg0: FileType
): string | PromiseLike<string | undefined> | undefined {
  throw new Error("Function not implemented.");
}
