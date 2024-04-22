"use client";

import { InputForm, InputPassword } from "@/components/input";
import { useMutation } from "@/utils/hooks/useMutation";
import { LeftOutlined } from "@ant-design/icons";
import { Button, notification } from "antd";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { IRedefinirSenha } from "./Interface/IRedefinirSenha";
import { CheckPassword } from "@/components/CheckPassword";

export default function RedefinirSenha() {
  const router = useRouter();
  const [checkSenha, setCheckSenha] = useState(false);
  const [step, setStep] = useState(1);

  const { handleSubmit, control } = useForm<IRedefinirSenha>();

  const { mutate: mutateRedefinirSenha } = useMutation<IRedefinirSenha>(
    "/auth/redefinir-senha",
    {
      method: "post",
      messageSucess: null,
      onSuccess: () => {
        if (step === 1) {
          notification.open({
            message: "Operação realizada",
            description: "E-mail com código de verificação enviado!",
            type: "success",
          });
          setStep(2);
        }
        if (step === 2) {
          notification.open({
            message: "Operação realizada",
            description: "Senha redefinida com sucesso!",
            type: "success",
          });
          router.push("/login");
        }
      },
    }
  );

  return (
    <form
      onSubmit={handleSubmit(mutateRedefinirSenha)}
      className="w-full flex flex-col gap-4 justify-center"
    >
      <button
        type="button"
        onClick={() => router.back()}
        className="w-full items-center self-start text-sm flex gap-2 hover:text-primaria pb-5"
      >
        <LeftOutlined className="text-[12px]" /> Voltar
      </button>
      <div className="flex flex-col gap-2">
        <h1 className="text-left text-4xl font-bold">Redefinir senha</h1>
        <p className="text-left text-sm  pb-3">
          Fique tranquilo(a), vamos enviar um e-mail com um código de validação
          para redefinir sua senha.
        </p>
      </div>

      {step === 1 && (
        <Controller
          control={control}
          name="email"
          rules={{ required: "Preencha o campo de e-mail" }}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <div className="flex flex-col gap-2">
              <p className="text-left text-sm">
                Nos informe o e-mail usado no cadastro:
              </p>
              <InputForm
                required
                error={error?.message}
                onChange={onChange}
                value={value}
                placeholder="E-mail"
              />
            </div>
          )}
        />
      )}

      {step === 2 && (
        <>
          <Controller
            control={control}
            name="codigo"
            rules={{ required: "Preencha o campo do código" }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <div className="flex flex-col gap-2">
                <p className="text-left text-sm">
                  Informe o código que recebeu no e-mail:
                </p>
                <InputForm
                  required
                  error={error?.message}
                  onChange={onChange}
                  value={value}
                  placeholder="Código"
                />
              </div>
            )}
          />
          <Controller
            control={control}
            name="senha"
            rules={{
              required: "Preencha o campo da senha",
              validate: (value) => {
                if (!checkSenha)
                  return "Critérios mínimos da senha não foram atendidos";
                return true;
              },
            }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <div className="flex flex-col gap-2">
                <p className="text-left text-sm">Informe a nova senha:</p>
                <InputPassword
                  required
                  placeholder="Senha"
                  error={error?.message}
                  onChange={onChange}
                  value={value}
                />
                <CheckPassword
                  password={value || ""}
                  check={(v) => setCheckSenha(v)}
                />
              </div>
            )}
          />
        </>
      )}

      <Button htmlType="submit" type="primary" size="large" className="w-full">
        Confirmar
      </Button>
    </form>
  );
}
