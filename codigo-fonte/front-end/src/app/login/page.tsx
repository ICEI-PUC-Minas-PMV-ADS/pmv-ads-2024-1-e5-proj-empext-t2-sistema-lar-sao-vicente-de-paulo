"use client";
import { Logomarca } from "@/components/logo";
import { authToken } from "@/config/authToken";
import { IUsuarioAuth } from "@/interface/IUsuarioAuth";
import { setAuthToken, setAuthUsuario } from "@/redux/slices/auth.slice";
import { useMutation } from "@/utils/hooks/useMutation";
import { useAppDispatch } from "@/utils/hooks/useRedux";
import { Button, Input } from "antd";
import { useRouter } from "next/navigation";
import { useCookies } from "react-cookie";
import { Controller, useForm } from "react-hook-form";
import { ILogin } from "./Interface/ILogin";
import { WarningOutlined } from "@ant-design/icons";

export default function LoginPage() {
  const router = useRouter();

  const { handleSubmit, control } = useForm<ILogin>();
  const [, setCookie] = useCookies([authToken.nome]);
  const dispatch = useAppDispatch();

  const { mutate: mutateLogin } = useMutation<
    ILogin,
    { token: string; usuario: IUsuarioAuth }
  >("/auth/login", {
    method: "post",
    messageSucess: "Login realizado com sucesso!",
    onSuccess: ({ data }) => {
      dispatch(setAuthToken(data.token));
      dispatch(setAuthUsuario(data.usuario));
      setCookie(authToken.nome, data.token, {
        path: "/",
        maxAge: authToken.expire,
      });
      router.push("/");
    },
  });

  return (
    <div className=" h-[100vh] flex justify-between items-center w-full">
      <div className="bg-[url('/login/login_bg.png')] bg-cover bg-right lg:w-[70%] w-[60%] h-full lg:p-[120px] p-[40px]">
        <Logomarca className="lg:w-[365px] w-[200px]" />
      </div>
      <div className="flex justify-center items-center lg:w-[30%] w-[40%]">
        <form
          onSubmit={handleSubmit(mutateLogin)}
          className="w-full max-w-[345px] flex flex-col gap-4 justify-center lg:mx-[70px] mx-[40px] "
        >
          <h1 className="text-left text-4xl font-bold pb-3">Login</h1>
          <Controller
            control={control}
            name="email"
            rules={{ required: "Preencha o campo de e-mail" }}
            render={({ field: { onChange }, fieldState: { error } }) => (
              <div className="flex flex-col gap-1">
                <Input
                  status={error && "error"}
                  placeholder="Email"
                  size="large"
                  onChange={onChange}
                />
                {error && (
                  <div className="flex gap-2 items-center text-red-600 text-xs">
                    <WarningOutlined />
                    <p>{error.message}</p>
                  </div>
                )}
              </div>
            )}
          />
          <Controller
            control={control}
            name="senha"
            rules={{ required: "Preencha o campo da senha" }}
            render={({ field: { onChange }, fieldState: { error } }) => (
              <div className="flex flex-col gap-1">
                <Input.Password
                  status={error && "error"}
                  type="password"
                  placeholder="Senha"
                  size="large"
                  onChange={onChange}
                />
                {error && (
                  <div className="flex gap-2 items-center text-red-600 text-xs">
                    <WarningOutlined />
                    <p>{error.message}</p>
                  </div>
                )}
              </div>
            )}
          />
          <Button
            htmlType="submit"
            type="primary"
            size="large"
            className="w-full"
          >
            Acessar
          </Button>
        </form>
      </div>
    </div>
  );
}
