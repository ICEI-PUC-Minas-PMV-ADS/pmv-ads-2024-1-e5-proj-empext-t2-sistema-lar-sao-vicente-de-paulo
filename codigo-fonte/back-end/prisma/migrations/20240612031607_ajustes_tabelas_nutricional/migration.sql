/*
  Warnings:

  - You are about to drop the column `caloria_fdb` on the `necessidade_nutricional` table. All the data in the column will be lost.
  - You are about to drop the column `caloria_outro` on the `necessidade_nutricional` table. All the data in the column will be lost.
  - You are about to drop the column `proteina_pratico` on the `necessidade_nutricional` table. All the data in the column will be lost.
  - You are about to drop the column `proteina_vct` on the `necessidade_nutricional` table. All the data in the column will be lost.
  - You are about to drop the `escala_braden` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `perroca` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `prontuario` table. If the table is not empty, all the data it contains will be lost.
  - Changed the type of `circ_braco_classificacao` on the `antropometria_nutricional` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `circ_panturrilha_classificacao` on the `antropometria_nutricional` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `data_vencimento` to the `ficha_nutricional` table without a default value. This is not possible if the table is not empty.
  - Added the required column `diagnostico` to the `ficha_nutricional` table without a default value. This is not possible if the table is not empty.
  - Added the required column `data_vencimento` to the `relatorio_pia` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "escala_braden" DROP CONSTRAINT "escala_braden_id_idoso_fkey";

-- DropForeignKey
ALTER TABLE "escala_braden" DROP CONSTRAINT "escala_braden_id_usuario_fkey";

-- DropForeignKey
ALTER TABLE "perroca" DROP CONSTRAINT "perroca_id_idoso_fkey";

-- DropForeignKey
ALTER TABLE "perroca" DROP CONSTRAINT "perroca_id_usuario_fkey";

-- DropForeignKey
ALTER TABLE "prontuario" DROP CONSTRAINT "prontuario_id_idoso_fkey";

-- DropForeignKey
ALTER TABLE "prontuario" DROP CONSTRAINT "prontuario_id_usuario_fkey";

-- AlterTable
ALTER TABLE "antropometria_nutricional" DROP COLUMN "circ_braco_classificacao",
ADD COLUMN     "circ_braco_classificacao" VARCHAR(100) NOT NULL,
DROP COLUMN "circ_panturrilha_classificacao",
ADD COLUMN     "circ_panturrilha_classificacao" VARCHAR(100) NOT NULL;

-- AlterTable
ALTER TABLE "ficha_nutricional" ADD COLUMN     "data_vencimento" TIMESTAMP NOT NULL,
ADD COLUMN     "diagnostico" VARCHAR NOT NULL,
ALTER COLUMN "especificacao" SET DATA TYPE VARCHAR,
ALTER COLUMN "observacao" SET DATA TYPE VARCHAR;

-- AlterTable
ALTER TABLE "necessidade_nutricional" DROP COLUMN "caloria_fdb",
DROP COLUMN "caloria_outro",
DROP COLUMN "proteina_pratico",
DROP COLUMN "proteina_vct",
ADD COLUMN     "caloria_observacao" VARCHAR,
ADD COLUMN     "proteina_observacao" VARCHAR,
ALTER COLUMN "hidrica_observacao" SET DATA TYPE VARCHAR;

-- AlterTable
ALTER TABLE "relatorio_pia" ADD COLUMN     "data_vencimento" TIMESTAMP NOT NULL;

-- DropTable
DROP TABLE "escala_braden";

-- DropTable
DROP TABLE "perroca";

-- DropTable
DROP TABLE "prontuario";

-- DropEnum
DROP TYPE "antoprometriaClassificacao";

-- CreateTable
CREATE TABLE "registro_antrometrico" (
    "id" BIGSERIAL NOT NULL,
    "uid" UUID NOT NULL DEFAULT gen_random_uuid(),
    "peso" VARCHAR(20) NOT NULL,
    "edema" VARCHAR(20) NOT NULL,
    "ascite" VARCHAR(20) NOT NULL,
    "imc" VARCHAR(20) NOT NULL,
    "imc_classificacao" VARCHAR(20) NOT NULL,
    "cb" VARCHAR(20) NOT NULL,
    "cp" VARCHAR(20) NOT NULL,
    "observacao" VARCHAR NOT NULL,
    "criado_em" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizado_em" TIMESTAMP NOT NULL,
    "id_ficha_nutricional" BIGINT NOT NULL,

    CONSTRAINT "registro_antrometrico_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "registro_antrometrico_uid_key" ON "registro_antrometrico"("uid");

-- CreateIndex
CREATE UNIQUE INDEX "registro_antrometrico_id_ficha_nutricional_key" ON "registro_antrometrico"("id_ficha_nutricional");

-- AddForeignKey
ALTER TABLE "registro_antrometrico" ADD CONSTRAINT "registro_antrometrico_id_ficha_nutricional_fkey" FOREIGN KEY ("id_ficha_nutricional") REFERENCES "ficha_nutricional"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
