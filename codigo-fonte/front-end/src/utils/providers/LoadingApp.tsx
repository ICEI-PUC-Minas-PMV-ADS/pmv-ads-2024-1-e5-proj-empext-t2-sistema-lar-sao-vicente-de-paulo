import { Spin } from "antd";
import { useAppSelector } from "../hooks/useRedux";

export const LoadingGlobal = () => {
  const loading = useAppSelector((r) => r.app.loading);

  return <Spin spinning={loading} fullscreen />;
};
