import { ModalDefault } from "@/components/modal/ModalDefault";
import { authToken } from "@/config/authToken";
import {
  CloseCircleOutlined,
  EditOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import { Select, Tabs, Tooltip, notification } from "antd";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { IErrorState, useMutation } from "@/utils/hooks/useMutation";
import { IFichaNutricional } from "../interface/IFichaNutricional";
import { InputSelect } from "@/components/input";
import { InputDatePicker } from "@/components/input/InputDatePicker";
import dayjs from "dayjs";
import { TabAntropometria } from "./tabs/TabAntropometrica";
import { TabCondutaNutricional } from "./tabs/TabCondutaNutricional";
import { TabDadosAntropometricos } from "./tabs/TabDadosAntropometricos";
import { TabDiagnosticoHipoteseClinico } from "./tabs/TabDiagnosticoHipoteseClinico";
import { TabGeral } from "./tabs/TabGeral";
import { TabNecessidadesNutricionais } from "./tabs/TabNecessidadesNutricionais";
import { TabQuadroClinico } from "./tabs/TabQuadroClinico";
import { TabSemiologiaNutricional } from "./tabs/TabSemiologiaNutricional";
import { IFormNutricional } from "../interface/IFormNutricional";
import { useFetch } from "@/utils/hooks/useFetch";
import { IIdoso } from "../../idoso/Interface/IIdoso";
import { queryBuilder } from "@/utils/functions/query-builder";
import { api } from "@/utils/service/api";
import { ISemiologiaNutricional } from "../interface/ISemiologiaNutricional";
import { AxiosError } from "axios";
import { IAntropometriaNutricional } from "../interface/IAntropometriaNutricional";
import { INecessidadeNutricional } from "../interface/INecessidadeNutricional";

export const AtualizarRelatorioNutricionalModal = ({
  id,
  uid,
  refetchList,
}: {
  id: bigint;
  uid: string;
  refetchList: () => void;
}) => {
  const [cookies] = useCookies([authToken.nome]);
  const [open, setOpen] = useState(false);
  const [isLoading, setIsloading] = useState(false);

  const methods = useForm<IFormNutricional>();

  const { handleSubmit, control, reset, setValue } = methods;

  const { data: relatorio } = useFetch<IFormNutricional>(
    "/ficha-nutricional/" + uid,
    [uid],
    {
      enable: open,
      resNotInData: true,
      onSuccess: (data) => {
        const relatorio = data.data;

        if (relatorio) {
          setValue("data_vencimento", relatorio.data_vencimento);
          setValue("diagnostico", relatorio.diagnostico);
          setValue("especificacao", relatorio.especificacao);
          setValue("alergia_intolerancia", relatorio.alergia_intolerancia);
          setValue(
            "alergia_intolerancia_obs",
            relatorio.alergia_intolerancia_obs
          );
          setValue("observacao", relatorio.observacao);
          setValue("id_idoso", relatorio.id_idoso);

          setValue("antropometria_nutricional", {
            ...relatorio.antropometria_nutricional,
            id: undefined,
            uid: undefined,
            criado_em: undefined,
            atualizado_em: undefined,
            id_ficha_nutricional: undefined,
          });
          setValue("necessidade_nutricional", {
            ...relatorio.necessidade_nutricional,
            id: undefined,
            uid: undefined,
            criado_em: undefined,
            atualizado_em: undefined,
            id_ficha_nutricional: undefined,
          });
          setValue("semiologia_nutricional", {
            ...relatorio.semiologia_nutricional,
            id: undefined,
            uid: undefined,
            criado_em: undefined,
            atualizado_em: undefined,
            id_ficha_nutricional: undefined,
          });
        }
      },
    }
  );

  async function updateRelatorioNutricional(data: IFormNutricional) {
    setIsloading(true);
    await api
      .patch<{ id: bigint }>(
        "/ficha-nutricional/" + relatorio?.uid,
        {
          diagnostico: data.diagnostico,
          especificacao: data.especificacao,
          alergia_intolerancia: data.alergia_intolerancia,
          alergia_intolerancia_obs: data.alergia_intolerancia_obs,
          observacao: data.observacao,
          data_vencimento: data.data_vencimento,
        } as IFichaNutricional,
        {
          headers: {
            Authorization: "Bearer " + cookies[authToken.nome],
          },
        }
      )
      .then(async () => {
        try {
          if (relatorio?.semiologia_nutricional.uid) {
            await api.patch<{ id: bigint }>(
              "/semiologia-nutricional/" + relatorio.semiologia_nutricional.uid,
              data.semiologia_nutricional as ISemiologiaNutricional,
              {
                headers: {
                  Authorization: "Bearer " + cookies[authToken.nome],
                },
              }
            );
          } else {
            await api.post<{ id: bigint }>(
              "/semiologia-nutricional",
              {
                ...data.semiologia_nutricional,
                id_ficha_nutricional: id,
              } as ISemiologiaNutricional,
              {
                headers: {
                  Authorization: "Bearer " + cookies[authToken.nome],
                },
              }
            );
          }
          if (relatorio?.antropometria_nutricional.uid) {
            await api.patch<{ id: bigint }>(
              "/antropometria/" + relatorio.antropometria_nutricional.uid,
              data.antropometria_nutricional as IAntropometriaNutricional,
              {
                headers: {
                  Authorization: "Bearer " + cookies[authToken.nome],
                },
              }
            );
          } else {
            await api.post<{ id: bigint }>(
              "/antropometria",
              {
                ...data.antropometria_nutricional,
                id_ficha_nutricional: id,
              } as IAntropometriaNutricional,
              {
                headers: {
                  Authorization: "Bearer " + cookies[authToken.nome],
                },
              }
            );
          }
          if (relatorio?.necessidade_nutricional.uid) {
            await api.patch<{ id: bigint }>(
              "/necessidade-nutricional/" +
                relatorio.necessidade_nutricional.uid,
              data.necessidade_nutricional as INecessidadeNutricional,
              {
                headers: {
                  Authorization: "Bearer " + cookies[authToken.nome],
                },
              }
            );
          } else {
            await api.post<{ id: bigint }>(
              "/necessidade-nutricional",
              {
                ...data.necessidade_nutricional,
                id_ficha_nutricional: id,
              } as INecessidadeNutricional,
              {
                headers: {
                  Authorization: "Bearer " + cookies[authToken.nome],
                },
              }
            );
          }
          await notification.open({
            message: "Operação realizada",
            description: "Relatório Nutricional atualizado com sucesso!",
            type: "success",
          });
          await reset();
          await refetchList();
          await setIsloading(false);
          await setOpen(false);
        } catch (err) {
          const error = err as AxiosError<{ error: IErrorState }>;

          notification.open({
            message: "Ocorreu um erro",
            description: error.response?.data?.error.message,
            type: "error",
          });
          setIsloading(false);
        }
      });
  }

  const { data: idosos } = useFetch<IIdoso[]>("/idosos", ["idosos-pia"], {
    enable: open,
    params: queryBuilder({
      page_limit: 9999,
      filter: [
        {
          path: "situacao",
          operator: "equals",
          value: "ATIVO",
        },
      ],
      sort: [{ field: "criado_em", criteria: "desc" }],
    }),
  });

  return (
    <ModalDefault
      showFooter
      customButtonOpenModal={
        <Tooltip title={"Editar"}>
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="text-black/30 hover:text-primaria h-full w-[50px] flex justify-center items-center"
          >
            <EditOutlined className={"text-[18px]"} />
          </button>
        </Tooltip>
      }
      titleModal={"Editando Relatório Nutricional"}
      okText="Salvar"
      onSubmit={handleSubmit(updateRelatorioNutricional)}
      isFetching={isLoading}
      width="1340px"
      setOpenModal={setOpen}
      openModal={open}
      listOptions={[
        {
          popconfirm: true,
          popconfirmType: "danger",
          popconfirmTitle: "Excluir Relatório Nutricional",
          popconfirmDescrition:
            "Ao excluir o Relatório Nutricional, não será possível recuperá-lo novamente. Você tem certeza?",
          popconfirmIcon: (
            <QuestionCircleOutlined
              style={{
                color: "red",
              }}
            />
          ),
          label: "Excluir",
          onClick: () => {
            api
              .delete<{ id: bigint }>("/ficha-nutricional/" + uid, {
                headers: {
                  Authorization: "Bearer " + cookies[authToken.nome],
                },
              })
              .then(() => {
                notification.open({
                  message: "Operação realizada",
                  description: "Relatório Nutricional excluído com sucesso!",
                  type: "success",
                });
                refetchList();
                setOpen(false);
              })
              .catch((err) => {
                const error = err as AxiosError<{ error: IErrorState }>;

                notification.open({
                  message: "Ocorreu um erro",
                  description: error.response?.data?.error.message,
                  type: "error",
                });
              });
          },
          icon: <CloseCircleOutlined />,
        },
      ]}
      created_item={relatorio?.criado_em}
      updated_item={relatorio?.atualizado_em}
    >
      <FormProvider {...methods}>
        <form className="w-full flex flex-col gap-[15px]">
          <div className="flex gap-4">
            <div className="flex-grow w-80">
              <Controller
                name="id_idoso"
                disabled
                control={control}
                rules={{
                  required: "Selecione o idoso",
                }}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <InputSelect
                    label="Idoso"
                    disabled
                    required
                    onChange={onChange}
                    error={error?.message}
                    placeholder="Selecionar"
                    value={value}
                    showSearch
                  >
                    {idosos?.map((idoso) => (
                      <Select.Option key={idoso.uid} value={idoso.id}>
                        {idoso.nome_completo}
                      </Select.Option>
                    ))}
                  </InputSelect>
                )}
              />
            </div>
            <div className="w-80">
              <Controller
                name="data_vencimento"
                disabled
                control={control}
                rules={{ required: "Campo obrigatório." }}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <InputDatePicker
                    required
                    label="Data de Vencimento"
                    error={error?.message}
                    onChange={onChange}
                    value={value && dayjs(value)}
                    placeholder="Selecione a data"
                  />
                )}
              />
            </div>
          </div>
          <Tabs
            defaultActiveKey="1"
            tabPosition="left"
            items={[
              {
                key: "1",
                label: "Geral",
                children: <TabGeral />,
              },
              {
                key: "2",
                label: (
                  <p className="text-left">
                    Diagnóstico Clínico / <br /> Hipótese Diagnosticadas
                  </p>
                ),
                children: <TabDiagnosticoHipoteseClinico />,
              },
              {
                key: "3",
                label: "Semiologia Nutricional",
                children: <TabSemiologiaNutricional />,
              },
              {
                key: "4",
                label: "Antropometria",
                children: <TabAntropometria />,
              },
              {
                key: "5",
                label: "Dados Antropométricos",
                children: <TabDadosAntropometricos id={id} />,
              },
              {
                key: "6",
                label: "Necessidades Nutricionais",
                children: <TabNecessidadesNutricionais />,
              },
              {
                key: "7",
                label: "Quadro Clínico",
                children: <TabQuadroClinico id={id} />,
              },
              {
                key: "8",
                label: "Conduta Nutricional",
                children: <TabCondutaNutricional id={id} />,
              },
            ]}
          />
        </form>
      </FormProvider>
    </ModalDefault>
  );
};
