import { useMutation } from "@/utils/hooks/useMutation";
import { EditOutlined, TeamOutlined, WarningOutlined } from "@ant-design/icons";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { InputForm } from "@/components/input";
import { ModalDefault } from "@/components/modal/ModalDefault";
import { ICargo, IOperationCargo } from "../Interface/ICargo";
import { Alert, Divider, Switch, Tooltip } from "antd";
import { useFetch } from "@/utils/hooks/useFetch";
import { queryBuilder } from "@/utils/functions/query-builder";
import { IGrupoPermissao } from "../Interface/IGrupoPermissao";
import { IPermissao } from "../Interface/IPermissao";
import { IOperationCargoPermissao } from "../Interface/ICargoPermissao";

export const AtualizarCargoModal = ({
  item,
  refetchList,
}: {
  item: ICargo;
  refetchList: () => void;
}) => {
  const [open, setOpen] = useState(false);

  const { handleSubmit, control, reset, formState, setValue } =
    useForm<IOperationCargo>({
      defaultValues: {
        nome: item.nome,
        permissoes: item.cargo_permissao,
      },
    });

  const { mutate: updateCargo, isFetching } = useMutation<
    Partial<IOperationCargo>
  >("/cargos/" + item.uid, {
    method: "patch",
    messageSucess: "Cargo atualizado com sucesso!",
    onSuccess: () => {
      refetchList();
      setOpen(false);
    },
  });

  const { mutate: deleteCargo } = useMutation<void>("/cargos/" + item.uid, {
    method: "delete",
    body: undefined,
    params: undefined,
    messageSucess: "Cargo deletado com sucesso!",
    onSuccess: () => {
      refetchList();
      setOpen(false);
    },
  });

  const { data: grupoPermissoes } = useFetch<IGrupoPermissao[]>(
    "/grupo-permissoes",
    ["grupo-permissoes"],
    {
      params: queryBuilder({
        page_limit: 9999,
      }),
    }
  );

  return (
    <ModalDefault
      customButtonOpenModal={
        <Tooltip title={"Editar"}>
          <button
            onClick={() => setOpen(true)}
            className="text-black/30 hover:text-primaria h-full w-[50px]"
          >
            <EditOutlined className={"text-[18px]"} />
          </button>
        </Tooltip>
      }
      titleModal={"Editando cargo"}
      okText="Salvar"
      onSubmit={handleSubmit(updateCargo)}
      isFetching={isFetching}
      width="750px"
      setOpenModal={setOpen}
      openModal={open}
      listOptions={[
        {
          label: "Deletar",
          onClick: () => {
            deleteCargo();
          },
        },
      ]}
      customAlert={
        <Alert
          message={
            item._count?.usuario +
            (item._count?.usuario === 1
              ? " usuário vinculado"
              : " usuários vinculados")
          }
          type={"info"}
          icon={<TeamOutlined className="text-[20px]" />}
          showIcon
        />
      }
      created_item={item.criado_em}
      updated_item={item.atualizado_em}
    >
      <form className="w-full flex flex-col gap-[15px]">
        <Controller
          name="nome"
          control={control}
          defaultValue=""
          rules={{ required: "Insira o nome do cargo" }}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <InputForm
              label="Nome"
              required
              error={error?.message}
              onChange={onChange}
              value={value}
              placeholder="Enfermeiro(a)"
            />
          )}
        />
        <div className="flex flex-col gap-1">
          <label>
            Permissões<span className="text-red-600 pl-1">*</span>
          </label>

          <Controller
            name="permissoes"
            control={control}
            rules={{ required: "Insira ao menos uma permissão para o cargo" }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <>
                <div className="grid grid-cols-3 gap-[15px]">
                  <ModuloPermissao
                    grupoPermissoes={grupoPermissoes}
                    setPermissoes={onChange}
                    permissoes={value}
                  />
                </div>
                {error && (
                  <div className="flex pt-1 gap-2 items-center w-full text-red-600 text-xs">
                    <WarningOutlined />
                    <p>{error.message}</p>
                  </div>
                )}
              </>
            )}
          />
        </div>
      </form>
    </ModalDefault>
  );
};

const ModuloPermissao = ({
  grupoPermissoes,
  setPermissoes,
  permissoes,
}: {
  grupoPermissoes?: IGrupoPermissao[];
  setPermissoes: Dispatch<
    SetStateAction<IOperationCargoPermissao[] | undefined>
  >;
  permissoes: IOperationCargoPermissao[] | undefined;
}) => {
  const { data: dataPermissoes } = useFetch<IPermissao[]>(
    "/permissoes",
    ["permissoes"],
    {
      params: queryBuilder({
        page_limit: 9999,
      }),
    }
  );

  const permissoesChange = (idPermissao: number, checked: boolean) => {
    const check = dataPermissoes?.map((permissao) => {
      const defaultPermissao = permissoes?.find(
        (e) => e.id_permissao === permissao.id
      );

      if (idPermissao === permissao.id && defaultPermissao) {
        return {
          uid: defaultPermissao?.uid,
          id_permissao: defaultPermissao.id_permissao,
          ativo: checked,
        };
      } else {
        if (defaultPermissao?.id_permissao) {
          return defaultPermissao;
        } else {
          return {
            uid: undefined,
            id_permissao: permissao.id,
            ativo: false,
          };
        }
      }
    });

    if (check) setPermissoes(check);
  };

  return grupoPermissoes?.map((modulo) => {
    const acessar = modulo.permissao?.find(
      (permissao) => permissao.nome === "Acessar"
    );
    const criar = modulo.permissao?.find(
      (permissao) => permissao.nome === "Criar"
    );
    const atualizar = modulo.permissao?.find(
      (permissao) => permissao.nome === "Atualizar"
    );
    const deletar = modulo.permissao?.find(
      (permissao) => permissao.nome === "Deletar"
    );

    return (
      <div
        key={modulo.uid}
        className="px-[16px] py-[12px] w-full rounded-[5px] border border-black/20 flex flex-col gap-[10px]"
      >
        <p className="font-medium">{modulo.nome}</p>
        <Divider type="horizontal" style={{ margin: 0 }} />
        <div className="flex flex-col gap-[6px]">
          {acessar && (
            <div className="w-full flex justify-between">
              <p>{acessar.nome}</p>
              <Switch
                size="small"
                onChange={(e) => permissoesChange(acessar.id, e)}
                defaultChecked={
                  permissoes?.find((p) => p.id_permissao === acessar.id)?.ativo
                }
                value={
                  permissoes?.find((p) => p.id_permissao === acessar.id)?.ativo
                }
              />
            </div>
          )}
          <div className="flex flex-col gap-[6px]">
            {criar && (
              <div className="w-full flex justify-between">
                <p>{criar.nome}</p>
                <Switch
                  size="small"
                  onChange={(e) => permissoesChange(criar.id, e)}
                  defaultChecked={
                    permissoes?.find((p) => p.id_permissao === criar.id)?.ativo
                  }
                  value={
                    permissoes?.find((p) => p.id_permissao === criar.id)?.ativo
                  }
                />
              </div>
            )}
            {atualizar && (
              <div className="w-full flex justify-between">
                <p>{atualizar.nome}</p>
                <Switch
                  size="small"
                  onChange={(e) => permissoesChange(atualizar.id, e)}
                  defaultChecked={
                    permissoes?.find((p) => p.id_permissao === atualizar.id)
                      ?.ativo
                  }
                  value={
                    permissoes?.find((p) => p.id_permissao === atualizar.id)
                      ?.ativo
                  }
                />
              </div>
            )}
            {deletar && (
              <div className="w-full flex justify-between">
                <p>{deletar.nome}</p>
                <Switch
                  size="small"
                  onChange={(e) => permissoesChange(deletar.id, e)}
                  defaultChecked={
                    permissoes?.find((p) => p.id_permissao === deletar.id)
                      ?.ativo
                  }
                  value={
                    permissoes?.find((p) => p.id_permissao === deletar.id)
                      ?.ativo
                  }
                />
              </div>
            )}
          </div>
        </div>
      </div>
    );
  });
};
