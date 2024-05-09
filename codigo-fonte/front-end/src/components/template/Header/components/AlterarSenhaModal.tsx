import { useMutation } from "@/utils/hooks/useMutation";
import { LockOutlined } from "@ant-design/icons";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { InputPassword } from "@/components/input";
import { ModalDefault } from "@/components/modal/ModalDefault";
import { Button } from "antd";
import { IAlterarSenha } from "../Interface/IAlterarSenha";
import { CheckPassword } from "@/components/CheckPassword";
import { useAppDispatch } from "@/utils/hooks/useRedux";
import { useCookies } from "react-cookie";
import { authToken } from "@/config/authToken";
import { setAuthToken, setAuthUsuario } from "@/redux/slices/auth.slice";

export const AlterarSenhaModal = () => {
  const [open, setOpen] = useState(false);
  const [checkSenha, setCheckSenha] = useState(false);

  const [cookie, setCookie, removeCookie] = useCookies([authToken.nome]);
  const dispatch = useAppDispatch();

  const { handleSubmit, control, reset } = useForm<IAlterarSenha>();

  const { mutate: updateSenha, isFetching: isUpdatingSenha } =
    useMutation<IAlterarSenha>("/auth/update-senha", {
      method: "post",
      messageSucess: "Senha alterada com sucesso!",
      onSuccess: () => {
        mutateDeslogar({ token: cookie[authToken.nome] });
        setOpen(false);
        reset();
      },
    });

  const { mutate: mutateDeslogar } = useMutation<{ token: string }>(
    "/auth/logout",
    {
      method: "post",
      messageSucess: null,
      onSuccess: () => {
        dispatch(setAuthToken(null as any));
        dispatch(setAuthUsuario(null as any));
        removeCookie(authToken.nome);
      },
    }
  );

  return (
    <ModalDefault
      showFooter
      customButtonOpenModal={
        <Button
          htmlType="button"
          icon={<LockOutlined />}
          onClick={() => setOpen(true)}
        >
          Alterar Senha
        </Button>
      }
      titleModal={"Alterando senha"}
      okText="Salvar"
      onSubmit={handleSubmit(updateSenha)}
      isFetching={isUpdatingSenha}
      width="350px"
      setOpenModal={setOpen}
      openModal={open}
      onClose={() => reset()}
    >
      <form className="w-full flex flex-col gap-[15px]">
        <Controller
          name="senha_atual"
          control={control}
          rules={{
            required: "Insira sua senha atual",
          }}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <InputPassword
              label="Senha atual"
              onChange={onChange}
              required
              value={value}
              error={error?.message}
              placeholder="********"
            />
          )}
        />
        <Controller
          name="senha_nova"
          control={control}
          rules={{
            required: "Insira sua nova senha",
            validate: (value) => {
              if (!checkSenha)
                return "Critérios mínimos da senha não foram atendidos";
              return true;
            },
          }}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <>
              <InputPassword
                label="Nova senha"
                onChange={onChange}
                required
                value={value}
                error={error?.message}
                placeholder="********"
              />
              <CheckPassword password={value} check={(v) => setCheckSenha(v)} />
            </>
          )}
        />
      </form>
    </ModalDefault>
  );
};
