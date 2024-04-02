import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";
import { authToken } from "@/config/authToken";
import { api } from "../service/api";
import { useAppDispatch } from "./useRedux";
import { setAuthToken, setAuthUsuario } from "@/redux/slices/auth.slice";

// tipagem de erro, padrão enviado pela API
interface IErrorState {
  error: {
    details: string[];
    message: string;
    path: string;
    statusCode: number;
    timetamp: Date | string;
  };
}

export function useFetch<T = unknown>(
  url: string, // string para consulta
  queryKey: unknown[],
  options?: {
    params?: object; // parametros da consulta, req.query
    headers?: object; // cabecalho da consulta, req.headers
    body?: object; // corpo da consulta, req.body
    method?: "get" | "post" | "put" | "patch" | "delete"; // metodo da consulta, req.method
    resNotInData?: boolean; // TRUE se o resultado não estiver sendo repassado no campo DATA (res.data.data), geralmente passado somente o resultado (res.data)
    enable?: boolean; // caso esteja TRUE o useEffect será executado, caso contrario ele não será executado, usad para definir se uma consulta está pronta para ser executada
    messageError?: string | undefined | null; // secaso seja null, não será exibido nenhuma mensagem de erro
    messageSucess?: string | undefined | null; // caso seja null, não será exibido nenhuma mensagem de sucesso
    disableSpinnerLoading?: boolean; // caso esteja TRUE o loading não será exibido
    onSuccess?: (data: { data: T }) => void;
    onError?: (error: AxiosError) => void;
    notOpenModalWhithoutPermission?: boolean; // se TRUE o hook não irá enviar o codigo da permissao para o dispatch, sendo assim não vai abrir o modal
  }
) {
  const dispatch = useAppDispatch();

  // pega o cookie e define ele no header da API
  const [cookies, , removeCookie] = useCookies([authToken.nome]);
  api.defaults.headers.common["Authorization"] =
    "Bearer " + cookies[authToken.nome];

  async function runFetchingAPI() {
    const fetchAPI = url[0] === "/" ? api : axios; // decide se a api vai ser a padrão ou requisição para outras

    //if (!options?.disableSpinnerLoading) dispatch(setLoading(true));

    try {
      return await fetchAPI(url, {
        params: options?.params,
        headers: {
          ...options?.headers,
        },
        method: options?.method || "get",
        data: options?.body,
      });
    } finally {
      //if (!options?.disableSpinnerLoading) dispatch(setLoading(false));
    }
  }

  const {
    data: response,
    refetch,
    dataUpdatedAt,
    error,
    errorUpdateCount,
    errorUpdatedAt,
    failureCount,
    failureReason,
    fetchStatus,
    isError,
    isFetched,
    isFetchedAfterMount,
    isFetching,
    isLoading,
    isLoadingError,
    isPaused,
    isPlaceholderData,
    isRefetchError,
    isRefetching,
    isStale,
    isSuccess,
    status,
  } = useQuery<AxiosResponse, AxiosError<IErrorState>>({
    queryKey: [...queryKey],
    enabled: options?.enable,
    refetchOnWindowFocus: false,
    retry: 0,
    queryFn: runFetchingAPI,
  });

  const data = options?.resNotInData ? response?.data : response?.data.data;
  const [totalCount, setTotalCount] = useState<number | null>(null);

  /* tratamento de onError */
  useEffect(() => {
    if (error) {
      if (options?.onError) options.onError(error);

      // verifica se mensagem de erro não é nula ou retorna um código 403
      // caso seja 403, não irá imprimir essa mensagem de erro, irá abrir um modal informando que usuário não possui determinada permissao
      if (options?.messageError !== null) {
        // se mensagem de erro for passada nas options, será exibida ela
        if (options?.messageError) {
          //toastError(options?.messageError || "Ocorreu um erro");
        } else {
          console.log(error.response?.data.error.message);
          //toastError(error.response?.data.error.message || "Ocorreu um erro");
        }
      }

      if (error.response?.status === 401) {
        removeCookie(authToken.nome, {
          path: "/",
        });
        dispatch(setAuthUsuario(null as any));
        dispatch(setAuthToken(null as any));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, error]);

  /* tratamento de onSuccess */
  useEffect(() => {
    if (status === "success") {
      if (options?.onSuccess) options.onSuccess({ data: data });

      if (options?.messageSucess) {
        //toastSuccess(options.messageSucess);
      }

      setTotalCount(response?.data?.total_count);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, data]);

  return {
    data: data as T | undefined,
    pageNumber: response?.data?.page_number as number | undefined,
    pageLimit: response?.data?.page_limit as number | undefined,
    totalCount: totalCount,
    refetch,
    dataUpdatedAt,
    error,
    errorUpdateCount,
    errorUpdatedAt,
    failureCount,
    failureReason,
    fetchStatus,
    isError,
    isFetched,
    isFetchedAfterMount,
    isFetching,
    isLoading,
    isLoadingError,
    isPaused,
    isPlaceholderData,
    isRefetchError,
    isRefetching,
    isStale,
    isSuccess,
    status,
  };
}
