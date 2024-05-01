/*
  Warnings:

  - You are about to drop the column `certidao_casamento` on the `idoso` table. All the data in the column will be lost.
  - You are about to drop the column `certidao_nascimento` on the `idoso` table. All the data in the column will be lost.
  - You are about to drop the column `pais` on the `idoso` table. All the data in the column will be lost.
  - You are about to drop the column `endereco` on the `responsavel_idoso` table. All the data in the column will be lost.
  - Added the required column `cidade` to the `idoso` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cidade` to the `responsavel_idoso` table without a default value. This is not possible if the table is not empty.
  - Added the required column `logradouro` to the `responsavel_idoso` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "idoso_cnh_key";

-- DropIndex
DROP INDEX "idoso_cpf_key";

-- DropIndex
DROP INDEX "idoso_rg_key";

-- AlterTable
ALTER TABLE "idoso" DROP COLUMN "certidao_casamento",
DROP COLUMN "certidao_nascimento",
DROP COLUMN "pais",
ADD COLUMN     "apelido" VARCHAR(255),
ADD COLUMN     "cartao_sus" VARCHAR(255),
ADD COLUMN     "cidade" VARCHAR(255) NOT NULL,
ADD COLUMN     "genero" VARCHAR(255),
ALTER COLUMN "naturalidade" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "estado_civil" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "religiao" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "escolaridade" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "cnh" SET DATA TYPE VARCHAR(11),
ALTER COLUMN "rg" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "certidao_nascimento_folha" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "certidao_nascimento_livro" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "certidao_casamento_folha" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "certidao_casamento_livro" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "motivo_inativacao" SET DATA TYPE VARCHAR;

-- AlterTable
ALTER TABLE "responsavel_idoso" DROP COLUMN "endereco",
ADD COLUMN     "cidade" VARCHAR(50) NOT NULL,
ADD COLUMN     "logradouro" VARCHAR(100) NOT NULL;
