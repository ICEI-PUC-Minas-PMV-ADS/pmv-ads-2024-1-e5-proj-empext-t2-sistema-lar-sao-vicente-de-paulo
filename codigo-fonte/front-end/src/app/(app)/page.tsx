import { Alert } from "antd";

export default function Home() {
  return (
    <div className="flex justify-center items-center w-full my-[10%]">
      <Alert message={"Em desenvolvimento..."} type="warning" showIcon />
    </div>
  );
}
