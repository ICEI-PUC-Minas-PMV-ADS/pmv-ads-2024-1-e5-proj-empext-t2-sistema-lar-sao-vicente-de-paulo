import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export interface IAuthUser {
    token: string;
    usuario: {
        id: bigint;
        uid: string;
        created_at: Date;
        updated_at: Date;
        is_admin: boolean;
        primeiro_nome: string;
        nome_completo: string;
        email: string;
        senha: string;
        telefone: string;
        situacao: string;
        usuario_permissao: {
            id: bigint;
            uid: string;
            created_at: Date | string;
            id_usuario: number;
            id_permissao: number;
            permissao: {
                id: bigint;
                uid: string;
                codigo: number;
                created_at: Date | string;
                updated_at: Date | string;
                id_grupo_permissao: number;
                grupo_permissao: {
                    id: bigint;
                    uid: string;
                    codigo: number;
                    created_at: Date | string;
                    updated_at: Date | string;
                };
            };
        }[];
    };
}

export const AuthUser = createParamDecorator(
    (data: unknown, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();
        return request.user as IAuthUser;
    },
);
