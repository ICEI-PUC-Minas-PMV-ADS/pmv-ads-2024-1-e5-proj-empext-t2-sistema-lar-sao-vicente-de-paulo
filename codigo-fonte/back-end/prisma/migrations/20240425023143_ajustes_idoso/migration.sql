/*
  Warnings:

  - You are about to drop the column `certidao_casamento` on the `idoso` table. All the data in the column will be lost.
  - You are about to drop the column `certidao_nascimento` on the `idoso` table. All the data in the column will be lost.
  - You are about to drop the column `pais` on the `idoso` table. All the data in the column will be lost.
  - You are about to alter the column `rg_orgao_expedidor` on the `idoso` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(20)`.
  - You are about to drop the column `endereco` on the `responsavel_idoso` table. All the data in the column will be lost.
  - Added the required column `cidade` to the `idoso` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cidade` to the `responsavel_idoso` table without a default value. This is not possible if the table is not empty.
  - Added the required column `logradouro` to the `responsavel_idoso` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "idoso" DROP COLUMN "certidao_casamento",
DROP COLUMN "certidao_nascimento",
DROP COLUMN "pais",
ADD COLUMN     "apelido" VARCHAR(255),
ADD COLUMN     "cartao_sus" VARCHAR(20),
ADD COLUMN     "cidade" VARCHAR(100) NOT NULL,
ADD COLUMN     "genero" VARCHAR(255),
ALTER COLUMN "rg_orgao_expedidor" SET DATA TYPE VARCHAR(20);

-- AlterTable
ALTER TABLE "responsavel_idoso" DROP COLUMN "endereco",
ADD COLUMN     "cidade" VARCHAR(50) NOT NULL,
ADD COLUMN     "logradouro" VARCHAR(100) NOT NULL;
