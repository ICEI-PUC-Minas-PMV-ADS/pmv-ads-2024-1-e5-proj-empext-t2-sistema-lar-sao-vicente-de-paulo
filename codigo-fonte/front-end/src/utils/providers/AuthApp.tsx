'use client';

import { authToken } from '@/config/authToken';
import { useRouter } from 'next/navigation';
import { ReactNode, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useAppDispatch, useAppSelector } from '../hooks/useRedux';
import { IUser } from '@/interface/IUser';
import { useFetch } from '../hooks/useFetch';
import { setAuthToken, setAuthUser } from '@/redux/slices/auth.slice';

export const AuthApp = ({ children }: { children: ReactNode }) => {
    const router = useRouter();
    const [cookie, setCookie, removeCookie] = useCookies([authToken.nome]);

    const dispatch = useAppDispatch();
    const user = useAppSelector(r => r.auth.user);

    useFetch<{ token: string; user: IUser }>('/auth/recover', ['auth-recover'], {
        enable: !!cookie[authToken.nome],
        onSuccess: ({ data }) => {
            dispatch(setAuthToken(data.token));
            dispatch(setAuthUser(data.user));
            setCookie(authToken.nome, data.token, {
                path: '/',
                maxAge: authToken.expire,
            });
        },
        onError: () => {
            dispatch(setAuthToken(null as any));
            dispatch(setAuthUser(null as any));
            removeCookie(authToken.nome);
        },
    });

    useEffect(() => {
        if (!cookie[authToken.nome]) {
            router.push('/sign-in');
        }
    }, [router, cookie]);

    return <>{user && children}</>;
};
