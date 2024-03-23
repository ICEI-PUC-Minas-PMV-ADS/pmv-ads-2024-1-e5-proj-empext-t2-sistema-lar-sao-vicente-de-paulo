import { IAuthUser } from '@/common/decorators/auth.decorator';
import { TypeRole } from '@/common/enums/roles';
import { AppError } from '@/common/utils/app-error';
import { IS_PUBLIC_KEY } from '@/config/is-public-key';
import { ROLES_KEY } from '@/config/roles-key';
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
	constructor(private reflector: Reflector) {}

	canActivate(context: ExecutionContext): boolean {
		const isPublic = this.reflector.get<boolean>(
			IS_PUBLIC_KEY,
			context.getHandler(),
		);

		if (isPublic) return true;

		const requiredRoles = this.reflector.getAllAndOverride<TypeRole[]>(
			ROLES_KEY,
			[context.getHandler(), context.getClass()],
		);

		if (!requiredRoles) {
			return true;
		}

		const { user }: { user: IAuthUser } = context
			.switchToHttp()
			.getRequest();

		// verifica as permissoes de um usuario comum
		function verifyAcessUsuario(): boolean {
			// verifica se o modelo de permissao do usuario e ADMIN, sem necessidade de verificar todas as permissoes
			if (user.usuario.cargo) {
				return true;
			}

			// valida as permissoes
			const isCheckRoles = requiredRoles.map((r) => {
				// verifica se o usuario contem a permissao que esta passando, validando se está TRUE
				if (
					!user.usuario.cargo.cargo_permissao.some(
						(up) => up.permissao.codigo === r && up.ativo === true,
					)
				) {
					// caso não tenha a permissao solicitada, ele retorna false
					return false;
				} else {
					// caso tenha o retorno é true e passa para a proxima validacao
					return true;
				}
			});

			if (isCheckRoles.length < 1) return false;

			// verifica se teve alguma permissao FALSE, caso tenha ele nega o acesso
			if (isCheckRoles.includes(false)) {
				return false;
			} else {
				return true;
			}
		}

		if (
			// verifica se usuario pode passar
			!verifyAcessUsuario()
		) {
			throw new AppError('Acesso negado', 403);
		}

		return true;
	}
}
