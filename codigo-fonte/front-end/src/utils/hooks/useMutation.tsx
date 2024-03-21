import axios, { AxiosError, AxiosResponse } from 'axios';
import { useState } from 'react';
import { useCookies } from 'react-cookie';
import { api } from '../service/api';
import { authToken } from '@/config/authToken';

interface IErrorState {
    detail: string[];
    message: string;
    path: string;
    statusCode: number;
    timetamp: Date | string;
}

export function useMutation<TDataSend = unknown, TDataResponse = unknown>(
    url: string, // string para consulta
    options: {
        params?: object; // parametros da consulta, req.query
        headers?: object; // cabecalho da consulta, req.headers
        body?: Partial<TDataSend>; // corpo da consulta, req.body
        method: 'post' | 'put' | 'patch' | 'delete' | 'get'; // metodo da consulta, req.method
        resNotInData?: boolean; // TRUE se o resultado não estiver sendo repassado no campo DATA (res.data.data), geralmente passado somente o resultado (res.data)
        enable?: boolean; // caso esteja TRUE o useEffect será executado, caso contrario ele não será executado, usad para definir se uma consulta está pronta para ser executada
        messageError?: string | null | undefined; // secaso seja null, não será exibido nenhuma mensagem de erro
        messageSucess?: string | undefined | null; // caso seja null, não será exibido nenhuma mensagem de sucesso
        disableSpinnerLoading?: boolean; // caso esteja TRUE o loading não será exibido
        delay?: number; // tempo de delay para executar a requisição
        onSuccess?: (data: { res: AxiosResponse; data: TDataResponse }) => void;
        onError?: (error: AxiosError<{ error: IErrorState }>) => void;
        notOpenModalWhithoutPermission?: boolean; // se TRUE o hook não irá enviar o codigo da permissao para o dispatch, sendo assim não vai abrir o modal
    },
) {
    //const dispatch = useAppDispatch();

    const mutateAPI = url[0] === '/' ? api : axios; // decide se a api vai ser a padrão ou requisição para outras

    const [cookies] = useCookies([authToken.nome]);
    api.defaults.headers.common['Authorization'] = 'Bearer ' + cookies[authToken.nome];

    const [data, setData] = useState<TDataResponse | null>(null); // valor que será retorndo para o front, resultado da consulta
    const [isFetching, setIsFetching] = useState(false); // se a consulta ainda está sendo realizada
    const [error, setError] = useState<IErrorState | null>(null); // se houve erro na consulta
    const [withoutPermission] = useState<{ codigoPermissao: string } | null>(null); // se o usuário não tem permissão para acessar a rota

    const runMutate = (dataMutate: TDataSend) =>
        mutateAPI(url, {
            params: options?.params,
            headers: {
                ...options?.headers,
            },
            method: options?.method,
            data: {
                ...dataMutate,
                ...options?.body,
            },
        })
            .then(res => {
                const data = options?.resNotInData ? res.data : res.data.data;

                if (options?.resNotInData) {
                    setData(data);
                } else {
                    setData(data);
                }

                if (options?.onSuccess) options.onSuccess({ res, data: data });

                if (options?.messageSucess !== null) {
                    //toastSuccess(options?.messageSucess || 'Operação realizada');
                }
            })
            .catch((err: AxiosError<{ error: IErrorState }>) => {
                setError(err.response?.data.error || null);

                if (options?.onError) options.onError(err);

                // verifica se mensagem de erro não é nula ou retorna um código 403
                // caso seja 403, não irá imprimir essa mensagem de erro, irá abrir um modal informando que usuário não possui determinada permissao
                if (options?.messageError !== null && err.response?.data?.error.statusCode !== 403) {
                    // se mensagem de erro for passada nas options, será exibida ela

                    //toastError(options?.messageError || err.response?.data?.error.message || 'Ocorreu um erro');
                }

                /* if (err.response?.data?.erro?.statusCode === 403) {
                    if (!options?.notOpenModalWhithoutPermission) {
                        dispatch(
                            setModalAcessoRestrito({
                                aberto: true,
                                codigoPermissao: err.response?.data?.erro?.codigoPermissao || '',
                            }),
                        );
                    }

                    setWithoutPermission({ codigoPermissao: err.response?.data?.erro?.codigoPermissao || '' });
                } */
            })
            .finally(() => {
                setIsFetching(false);
                /* if (!options?.disableSpinnerLoading) dispatch(setLoading(false)); */
            });

    function mutate(dataMutate: TDataSend) {
        if (options?.enable === false) return setData(null);

        setIsFetching(true);

        /* if (!options?.disableSpinnerLoading) dispatch(setLoading(true)); */

        if (options?.delay) {
            setTimeout(() => {
                runMutate(dataMutate);
            }, options.delay);
        } else {
            runMutate(dataMutate);
        }
    }

    return {
        data,
        isFetching,
        error,
        withoutPermission,
        mutate,
    };
}
