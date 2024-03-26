import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function CreateUsuarioAdmin() {
	const admin = {
		nome: 'Admin',
		cpf_cnh: '00000000000',
		email: 'admin@mail.com',
		senha: '$2a$09$rO4s0axg9AwcTxYAj7Cs4ufoECq98YX6bVedKFx1OEYAxkrnoZsbq',
	};

	const cargoAdmin = { nome: 'Gerente' };

	async function permissoesAdmin(id_cargo: bigint) {
		await prisma.cargoPermissao.createMany({
			data: [
				{ id_cargo, id_permissao: 1, ativo: true },
				{ id_cargo, id_permissao: 2, ativo: true },
				{ id_cargo, id_permissao: 3, ativo: true },
				{ id_cargo, id_permissao: 4, ativo: true },
				{ id_cargo, id_permissao: 5, ativo: true },
				{ id_cargo, id_permissao: 6, ativo: true },
				{ id_cargo, id_permissao: 7, ativo: true },
				{ id_cargo, id_permissao: 8, ativo: true },
				{ id_cargo, id_permissao: 9, ativo: true },
				{ id_cargo, id_permissao: 10, ativo: true },
				{ id_cargo, id_permissao: 11, ativo: true },
				{ id_cargo, id_permissao: 12, ativo: true },
			],
		});
	}

	const usuarioAdminExist = await prisma.usuario.findFirst({
		where: admin,
	});

	const cargoGerenteExist = await prisma.cargo.findFirst({
		where: cargoAdmin,
	});

	if (usuarioAdminExist && cargoGerenteExist) {
		await prisma.usuario.update({
			where: { id: usuarioAdminExist.id },
			data: admin,
		});

		await prisma.cargo.update({
			where: { id: cargoGerenteExist.id },
			data: cargoAdmin,
		});

		await prisma.cargoPermissao.deleteMany({
			where: { id_cargo: cargoGerenteExist.id },
		});

		await permissoesAdmin(cargoGerenteExist.id);
	} else {
		const cargo = await prisma.cargo.create({
			data: cargoAdmin,
		});

		await permissoesAdmin(cargo.id);

		await prisma.usuario.create({
			data: {
				...admin,
				id_cargo: cargo.id,
			},
		});
	}
}
