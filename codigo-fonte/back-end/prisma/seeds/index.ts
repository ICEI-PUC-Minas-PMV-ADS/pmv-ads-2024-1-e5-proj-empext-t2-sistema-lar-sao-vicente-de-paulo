import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import * as fs from 'node:fs';
import * as path from 'node:path';

const generateSeed = async (file: string) => {
	const sql = fs.readFileSync(path.join(__dirname, file)).toString();

	await prisma.$executeRawUnsafe(sql);
};

async function main() {
	await generateSeed('grupo-permissao.sql');
	await generateSeed('permissao.sql');
}

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.log(e);
		await prisma.$disconnect();

		process.exit(1);
	});
