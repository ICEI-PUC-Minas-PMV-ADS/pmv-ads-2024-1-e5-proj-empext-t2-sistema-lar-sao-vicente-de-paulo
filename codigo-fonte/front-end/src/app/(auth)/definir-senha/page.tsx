"use client";

import { InputPassword } from "@/components/input";
import { useMutation } from "@/utils/hooks/useMutation";
import { Button, Spin } from "antd";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { IDefinirSenha } from "./Interface/IDefinirSenha";
import { CheckPassword } from "@/components/CheckPassword";

export default function DefinirSenha() {
  return (
    <Suspense
      fallback={<Spin style={{ zIndex: 9999 }} spinning={true} fullscreen />}
    >
      <FormDefinirSenha />
    </Suspense>
  );
}

function FormDefinirSenha() {
  const router = useRouter();
  const query = useSearchParams();

  const [checkSenha, setCheckSenha] = useState(false);

  const { handleSubmit, control } = useForm<IDefinirSenha>({
    defaultValues: {
      uid: query.get("for") || undefined,
      codigo: query.get("code") || undefined,
    },
  });

  const { mutate: mutateDefinirSenha } = useMutation<IDefinirSenha>(
    "/auth/definir-senha",
    {
      method: "post",
      messageSucess: "Senha definida com sucesso!",
      onSuccess: () => {
        router.push("/login");
      },
    }
  );

  return (
    <form
      onSubmit={handleSubmit(mutateDefinirSenha)}
      className="w-full flex flex-col gap-4 justify-center"
    >
      <div className="flex flex-col gap-2">
        <h1 className="text-left text-4xl font-bold">Definir senha</h1>
        <p className="text-left text-sm  pb-3">
          Defina sua senha, para realizar seu primeiro acesso.
        </p>
      </div>

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

      <Button htmlType="submit" type="primary" size="large" className="w-full">
        Confirmar
      </Button>
    </form>
  );
}
