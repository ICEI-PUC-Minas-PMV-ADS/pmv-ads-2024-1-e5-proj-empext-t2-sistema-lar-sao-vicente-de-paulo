"use client";

import { authToken } from "@/config/authToken";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useAppDispatch, useAppSelector } from "../hooks/useRedux";
import { useFetch } from "../hooks/useFetch";
import { setAuthToken, setAuthUsuario } from "@/redux/slices/auth.slice";
import { IUsuarioAuth } from "@/interface/IUsuarioAuth";

export const AuthApp = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const [cookie, setCookie, removeCookie] = useCookies([authToken.nome]);

  const dispatch = useAppDispatch();
  const usuario = useAppSelector((r) => r.auth.usuario);

  useFetch<{ token: string; usuario: IUsuarioAuth }>(
    "/auth/recover",
    ["auth-recover"],
    {
      params: { token: cookie[authToken.nome] },
      enable: !!cookie[authToken.nome],
      onSuccess: ({ data }) => {
        dispatch(setAuthToken(data.token));
        dispatch(setAuthUsuario(data.usuario));
        setCookie(authToken.nome, data.token, {
          path: "/",
          maxAge: authToken.expire,
        });
      },
      onError: () => {
        dispatch(setAuthToken(null as any));
        dispatch(setAuthUsuario(null as any));
        removeCookie(authToken.nome);
      },
    }
  );

  useEffect(() => {
    if (!cookie[authToken.nome]) {
      router.push("/login");
    }
  }, [router, cookie]);

  return <>{usuario && children}</>;
};
