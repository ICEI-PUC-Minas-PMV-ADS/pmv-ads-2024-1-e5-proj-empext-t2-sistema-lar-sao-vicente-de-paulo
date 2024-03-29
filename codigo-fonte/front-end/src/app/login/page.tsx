"use client";
import { authToken } from "@/config/authToken";
import { IUsuario } from "@/interface/IUsuario";
import { setAuthToken, setAuthUsuario } from "@/redux/slices/auth.slice";
import { useMutation } from "@/utils/hooks/useMutation";
import { useAppDispatch } from "@/utils/hooks/useRedux";
import { Button, Input } from "antd";
import { useRouter } from "next/navigation";
import { useCookies } from "react-cookie";
import { Controller, useForm } from "react-hook-form";

interface ILoginFormData {
  email: string;
  senha: string;
}

export default function LoginPage() {
  const router = useRouter();

  const { handleSubmit, control } = useForm<ILoginFormData>();
  const [, setCookie] = useCookies([authToken.nome]);
  const dispatch = useAppDispatch();

  const { mutate: mutateLogin } = useMutation<
    ILoginFormData,
    { token: string; usuario: IUsuario }
  >("/auth/login", {
    method: "post",
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
    <div className=" h-[100vh] flex justify-center items-center w-full">
      <form
        onSubmit={handleSubmit(mutateLogin)}
        className="w-[300px] flex flex-col gap-2 items-center justify-center"
      >
        <h1>Login</h1>
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange } }) => (
            <Input placeholder="Email" onChange={onChange} />
          )}
        />
        <Controller
          control={control}
          name="senha"
          render={({ field: { onChange } }) => (
            <Input type="password" placeholder="Senha" onChange={onChange} />
          )}
        />
        <Button htmlType="submit" type="primary" className="w-full">
          Acessar
        </Button>
      </form>
    </div>
  );
}
