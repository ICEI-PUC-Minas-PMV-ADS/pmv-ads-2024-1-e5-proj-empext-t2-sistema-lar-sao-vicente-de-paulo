"use client";
import { authToken } from "@/config/authToken";
import { IUsuarioAuth } from "@/interface/IUsuarioAuth";
import { setAuthToken, setAuthUsuario } from "@/redux/slices/auth.slice";
import { useMutation } from "@/utils/hooks/useMutation";
import { useAppDispatch } from "@/utils/hooks/useRedux";
import { Button } from "antd";
import { useRouter } from "next/navigation";
import { useCookies } from "react-cookie";
import { Controller, useForm } from "react-hook-form";
import { ILogin } from "./Interface/ILogin";
import Link from "next/link";
import { InputForm, InputPassword } from "@/components/input";

export default function Login() {
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
    <form
      onSubmit={handleSubmit(mutateLogin)}
      className="w-full flex flex-col gap-4 justify-center"
    >
      <h1 className="text-left text-4xl font-bold pb-3">Login</h1>
      <Controller
        control={control}
        name="email"
        rules={{ required: "Preencha o campo de e-mail" }}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <InputForm
            required
            error={error?.message}
            onChange={onChange}
            value={value}
            placeholder="E-mail"
          />
        )}
      />
      <Controller
        control={control}
        name="senha"
        rules={{ required: "Preencha o campo da senha" }}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <div className="flex flex-col gap-2">
            <InputPassword
              required
              placeholder="Senha"
              error={error?.message}
              onChange={onChange}
              value={value}
            />
            <Link
              className="text-xs text-primaria hover:underline text-right"
              href={"/redefinir-senha"}
            >
              Esqueceu sua senha? Clique aqui
            </Link>
          </div>
        )}
      />

      <Button htmlType="submit" type="primary" size="large" className="w-full">
        Acessar
      </Button>
    </form>
  );
}
