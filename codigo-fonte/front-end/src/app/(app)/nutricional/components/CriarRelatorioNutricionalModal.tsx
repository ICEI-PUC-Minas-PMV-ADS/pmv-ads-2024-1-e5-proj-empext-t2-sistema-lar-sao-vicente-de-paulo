import { ModalDefault } from "@/components/modal/ModalDefault";
import { FileAddOutlined } from "@ant-design/icons";
import { useState } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { useCookies } from "react-cookie";
import { authToken } from "@/config/authToken";
import { InputSelect } from "@/components/input";
import { IIdoso } from "../../idoso/Interface/IIdoso";
import { Select, Tabs, notification } from "antd";
import { InputDatePicker } from "@/components/input/InputDatePicker";
import { TabGeral } from "./tabs/TabGeral";
import { TabDiagnosticoHipoteseClinico } from "./tabs/TabDiagnosticoHipoteseClinico";
import { TabSemiologiaNutricional } from "./tabs/TabSemiologiaNutricional";
import { TabAntropometria } from "./tabs/TabAntropometrica";
import { TabDadosAntropometricos } from "./tabs/TabDadosAntropometricos";
import { TabNecessidadesNutricionais } from "./tabs/TabNecessidadesNutricionais";
import { TabQuadroClinico } from "./tabs/TabQuadroClinico";
import { TabCondutaNutricional } from "./tabs/TabCondutaNutricional";
import { useFetch } from "@/utils/hooks/useFetch";
import { queryBuilder } from "@/utils/functions/query-builder";
import { IFormNutricional } from "../interface/IFormNutricional";
import { api } from "@/utils/service/api";
import { useAppSelector } from "@/utils/hooks/useRedux";
import { ISemiologiaNutricional } from "../interface/ISemiologiaNutricional";
import { IAntropometriaNutricional } from "../interface/IAntropometriaNutricional";
import { INecessidadeNutricional } from "../interface/INecessidadeNutricional";
import { ICondutaNutricional } from "../interface/ICondutaNutricional";
import { IQuadroClinico } from "../interface/IQuadroClinico";
import { IRegistroAntropometrico } from "../interface/IRegistroAntropometrico";
import dayjs from "dayjs";
import { AxiosError } from "axios";
import { IErrorState } from "@/utils/hooks/useMutation";

export const CriarRelatorioNutricionalModal = ({
  id,
  refetchList,
}: {
  id?: bigint;
  refetchList: () => void;
}) => {
  const [cookies] = useCookies([authToken.nome]);
  const [open, setOpen] = useState(false);
  const [isLoading, setIsloading] = useState(false);
  const usuario = useAppSelector((v) => v.auth.usuario.id);

  const methods = useForm<IFormNutricional>();

  const { handleSubmit, control, reset, setValue, formState } = methods;

  async function createRelatorioNutricional(data: IFormNutricional) {
    setIsloading(true);
    await api
      .post<{ id: bigint }>(
        "/ficha-nutricional",
        {
          diagnostico: data.diagnostico,
          especificacao: data.especificacao,
          alergia_intolerancia: data.alergia_intolerancia,
          alergia_intolerancia_obs: data.alergia_intolerancia_obs,
          observacao: data.observacao,
          id_idoso: data.id_idoso,
          id_usuario: usuario,
          data_vencimento: data.data_vencimento,
        },
        {
          headers: {
            Authorization: "Bearer " + cookies[authToken.nome],
          },
        }
      )
      .then(async (res) => {
        try {
          await api.post<{ id: bigint }>(
            "/semiologia-nutricional",
            {
              ...data.semiologia_nutricional,
              id_ficha_nutricional: res.data.id,
            } as ISemiologiaNutricional,
            {
              headers: {
                Authorization: "Bearer " + cookies[authToken.nome],
              },
            }
          );
          await api.post<{ id: bigint }>(
            "/antropometria",
            {
              ...data.antropometria_nutricional,
              id_ficha_nutricional: res.data.id,
            } as IAntropometriaNutricional,
            {
              headers: {
                Authorization: "Bearer " + cookies[authToken.nome],
              },
            }
          );
          await api.post<{ id: bigint }>(
            "/necessidade-nutricional",
            {
              ...data.necessidade_nutricional,
              id_ficha_nutricional: res.data.id,
            } as INecessidadeNutricional,
            {
              headers: {
                Authorization: "Bearer " + cookies[authToken.nome],
              },
            }
          );
          await data.conduta_nutricional.map((conduta) => {
            api.post<{ id: bigint }>(
              "/conduta-nutricional",
              {
                ...conduta,
                id_ficha_nutricional: res.data.id,
              } as ICondutaNutricional,
              {
                headers: {
                  Authorization: "Bearer " + cookies[authToken.nome],
                },
              }
            );
          });
          await data.quadro_clinico.map((quadro) => {
            api.post<{ id: bigint }>(
              "/quadro-clinico",
              {
                ...quadro,
                id_ficha_nutricional: res.data.id,
              } as IQuadroClinico,
              {
                headers: {
                  Authorization: "Bearer " + cookies[authToken.nome],
                },
              }
            );
          });
          await data.registro_antrometrico.map((registro) => {
            api.post<{ id: bigint }>(
              "/registro-antropometrico",
              {
                ...registro,
                id_ficha_nutricional: res.data.id,
              } as IRegistroAntropometrico,
              {
                headers: {
                  Authorization: "Bearer " + cookies[authToken.nome],
                },
              }
            );
          });

          await notification.open({
            message: "Operação realizada",
            description: "Relatório Nutricional cadastrado com sucesso!",
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
    onSuccess: () => {
      if (id) setValue("id_idoso", id);
    },
  });

  return (
    <ModalDefault
      showFooter
      nameButtonOpenModal={"Cadastrar Relatório Nutricional"}
      iconButtonOpenModal={<FileAddOutlined />}
      titleModal={"Adicionando Relatório Nutricional"}
      okText="Cadastrar"
      onSubmit={handleSubmit(createRelatorioNutricional)}
      isFetching={isLoading}
      width="1340px"
      setOpenModal={setOpen}
      openModal={open}
    >
      <FormProvider {...methods}>
        <form className="w-full flex flex-col gap-[15px]">
          <div className="flex gap-4">
            <div className="flex-grow w-80">
              <Controller
                name="id_idoso"
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
                    placeholder="Selicione data"
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
                label: (
                  <div className="text-left flex flex-col">
                    <p>Geral</p>
                    {formState.errors.diagnostico && (
                      <p className="text-red-700 text-xs">
                        * Campos obrigatórios <br /> não preenchidos.
                      </p>
                    )}
                  </div>
                ),
                children: <TabGeral />,
                forceRender: true,
              },
              {
                key: "2",
                label: (
                  <div className="text-left flex flex-col">
                    <p>
                      Diagnóstico Clínico / <br /> Hipótese Diagnosticadas
                    </p>
                    {(formState.errors.especificacao ||
                      formState.errors.alergia_intolerancia) && (
                      <p className="text-red-700 text-xs">
                        * Campos obrigatórios <br /> não preenchidos.
                      </p>
                    )}
                  </div>
                ),
                children: <TabDiagnosticoHipoteseClinico />,
                forceRender: true,
              },
              {
                key: "3",
                label: (
                  <div className="text-left flex flex-col">
                    <p>Semiologia Nutricional</p>
                    {formState.errors.semiologia_nutricional && (
                      <p className="text-red-700 text-xs">
                        * Campos obrigatórios <br /> não preenchidos.
                      </p>
                    )}
                  </div>
                ),
                children: <TabSemiologiaNutricional />,
                forceRender: true,
              },
              {
                key: "4",
                label: (
                  <div className="text-left flex flex-col">
                    <p>Antropometria</p>
                    {formState.errors.antropometria_nutricional && (
                      <p className="text-red-700 text-xs">
                        * Campos obrigatórios <br /> não preenchidos.
                      </p>
                    )}
                  </div>
                ),
                children: <TabAntropometria />,
                forceRender: true,
              },
              {
                key: "5",
                label: (
                  <div className="text-left flex flex-col">
                    <p>Dados Antropométricos</p>
                    {formState.errors.registro_antrometrico && (
                      <p className="text-red-700 text-xs">
                        * Campos obrigatórios <br /> não preenchidos.
                      </p>
                    )}
                  </div>
                ),
                children: <TabDadosAntropometricos />,
                forceRender: true,
              },
              {
                key: "6",
                label: (
                  <div className="text-left flex flex-col">
                    <p>Necessidades Nutricionais</p>
                    {formState.errors.necessidade_nutricional && (
                      <p className="text-red-700 text-xs">
                        * Campos obrigatórios <br /> não preenchidos.
                      </p>
                    )}
                  </div>
                ),
                children: <TabNecessidadesNutricionais />,
                forceRender: true,
              },
              {
                key: "7",
                label: (
                  <div className="text-left flex flex-col">
                    <p>Quadro Clínico</p>
                    {formState.errors.quadro_clinico && (
                      <p className="text-red-700 text-xs">
                        * Campos obrigatórios <br /> não preenchidos.
                      </p>
                    )}
                  </div>
                ),
                children: <TabQuadroClinico />,
                forceRender: true,
              },
              {
                key: "8",
                label: (
                  <div className="text-left flex flex-col">
                    <p>Conduta Nutricional</p>
                    {formState.errors.conduta_nutricional && (
                      <p className="text-red-700 text-xs">
                        * Campos obrigatórios <br /> não preenchidos.
                      </p>
                    )}
                  </div>
                ),
                children: <TabCondutaNutricional />,
                forceRender: true,
              },
            ]}
          />
        </form>
      </FormProvider>
    </ModalDefault>
  );
};
