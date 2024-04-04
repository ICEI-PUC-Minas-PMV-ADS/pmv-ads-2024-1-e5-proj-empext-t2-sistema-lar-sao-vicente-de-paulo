"use client";

import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CookiesProvider } from "react-cookie";
import { ReduxProvider } from "./ReduxProvider";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ConfigProvider } from "antd";

export const Providers = ({ children }: { children: ReactNode }) => {
  const queryClient = new QueryClient();

  return (
    <CookiesProvider>
      <ReduxProvider>
        <QueryClientProvider client={queryClient}>
          <AntdRegistry>
            <ConfigProvider
              theme={{
                components: {
                  Form: { itemMarginBottom: 15 },
                },
                token: {
                  colorPrimary: "#0086FF",
                  "blue-1": "#0086FF",
                  "blue-2": "#007AE5",
                  "blue-3": "#005FB3",
                  "green-1": "#00AD2B",
                  "green-2": "#009425",
                  "green-3": "#006118",
                  colorText: "#2d2d29",
                },
              }}
            >
              {children}
            </ConfigProvider>
          </AntdRegistry>
        </QueryClientProvider>
      </ReduxProvider>
    </CookiesProvider>
  );
};
