import { UpdateUsuarioDto } from '@/app/modules/usuario/dtos/update-usuario.dto';
import { Prisma, Usuario } from '@prisma/client';

export interface usuarioRepository {
	create(data: Prisma.UsuarioCreateInput): Promise<Usuario>;
	findById(id: bigint): Promise<Usuario | null>;
	findByUid(uid: string): Promise<Usuario | null>;
	findByCpf(cpf_cnh: string): Promise<Usuario | null>;
	alreadyExistsUserEmail(email: string): Promise<Usuario | null>;
	alreadyExistsUserCPF(cpf_cnh: string): Promise<Usuario | null>;
	update(uid: string, data: UpdateUsuarioDto): Promise<Usuario>;
	save(usuario: Usuario): Promise<Usuario>;
}
