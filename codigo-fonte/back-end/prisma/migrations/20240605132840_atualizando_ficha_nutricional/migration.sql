/*
  Warnings:

  - You are about to alter the column `dieta` on the `conduta_nutricional` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(20)`.
  - You are about to alter the column `volume` on the `conduta_nutricional` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(20)`.
  - You are about to alter the column `fracionamento` on the `conduta_nutricional` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(20)`.
  - You are about to alter the column `kcal_dia` on the `conduta_nutricional` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(20)`.
  - You are about to alter the column `agua_ml` on the `conduta_nutricional` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(20)`.
  - You are about to drop the column `ascite` on the `ficha_nutricional` table. All the data in the column will be lost.
  - You are about to drop the column `caloria` on the `ficha_nutricional` table. All the data in the column will be lost.
  - You are about to drop the column `caloria_metodo` on the `ficha_nutricional` table. All the data in the column will be lost.
  - You are about to drop the column `diagnostico_clinico` on the `ficha_nutricional` table. All the data in the column will be lost.
  - You are about to drop the column `diagnostico_nutricional` on the `ficha_nutricional` table. All the data in the column will be lost.
  - You are about to drop the column `edema` on the `ficha_nutricional` table. All the data in the column will be lost.
  - You are about to drop the column `hidrica` on the `ficha_nutricional` table. All the data in the column will be lost.
  - You are about to drop the column `hidrica_observacao` on the `ficha_nutricional` table. All the data in the column will be lost.
  - You are about to drop the column `local_edema` on the `ficha_nutricional` table. All the data in the column will be lost.
  - You are about to drop the column `proteina` on the `ficha_nutricional` table. All the data in the column will be lost.
  - You are about to drop the column `proteina_metodo` on the `ficha_nutricional` table. All the data in the column will be lost.
  - You are about to drop the column `dispneia` on the `quadro_clinico` table. All the data in the column will be lost.
  - You are about to drop the column `mastigacao` on the `quadro_clinico` table. All the data in the column will be lost.
  - You are about to drop the column `odinofagia` on the `quadro_clinico` table. All the data in the column will be lost.
  - You are about to alter the column `aceitacao_alimentar` on the `quadro_clinico` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(20)`.
  - You are about to alter the column `suplemento_oral` on the `quadro_clinico` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(20)`.
  - You are about to alter the column `apetite` on the `quadro_clinico` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(20)`.
  - You are about to alter the column `disfagia` on the `quadro_clinico` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(20)`.
  - You are about to alter the column `nausea_vomito` on the `quadro_clinico` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(20)`.
  - You are about to alter the column `dor_abdominal` on the `quadro_clinico` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(20)`.
  - You are about to alter the column `evacuacao` on the `quadro_clinico` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(20)`.
  - You are about to alter the column `diurese` on the `quadro_clinico` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(20)`.
  - You are about to alter the column `observacao` on the `quadro_clinico` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(20)`.
  - You are about to drop the `acompanhamento_antropometrico` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `antropometria_admissional` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `dieta` on table `conduta_nutricional` required. This step will fail if there are existing NULL values in that column.
  - Made the column `volume` on table `conduta_nutricional` required. This step will fail if there are existing NULL values in that column.
  - Made the column `fracionamento` on table `conduta_nutricional` required. This step will fail if there are existing NULL values in that column.
  - Made the column `kcal_dia` on table `conduta_nutricional` required. This step will fail if there are existing NULL values in that column.
  - Made the column `ptn_dia` on table `conduta_nutricional` required. This step will fail if there are existing NULL values in that column.
  - Made the column `agua_ml` on table `conduta_nutricional` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `alergia_intolerancia` to the `ficha_nutricional` table without a default value. This is not possible if the table is not empty.
  - Added the required column `especificacao` to the `ficha_nutricional` table without a default value. This is not possible if the table is not empty.
  - Made the column `aceitacao_alimentar` on table `quadro_clinico` required. This step will fail if there are existing NULL values in that column.
  - Made the column `suplemento_oral` on table `quadro_clinico` required. This step will fail if there are existing NULL values in that column.
  - Made the column `apetite` on table `quadro_clinico` required. This step will fail if there are existing NULL values in that column.
  - Made the column `disfagia` on table `quadro_clinico` required. This step will fail if there are existing NULL values in that column.
  - Made the column `nausea_vomito` on table `quadro_clinico` required. This step will fail if there are existing NULL values in that column.
  - Made the column `dor_abdominal` on table `quadro_clinico` required. This step will fail if there are existing NULL values in that column.
  - Made the column `evacuacao` on table `quadro_clinico` required. This step will fail if there are existing NULL values in that column.
  - Made the column `diurese` on table `quadro_clinico` required. This step will fail if there are existing NULL values in that column.
  - Made the column `observacao` on table `quadro_clinico` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "Status" AS ENUM ('A', 'L', 'M', 'G');

-- CreateEnum
CREATE TYPE "Edema" AS ENUM ('E0', 'E1', 'E2', 'E3', 'E4');

-- CreateEnum
CREATE TYPE "LocalEdema" AS ENUM ('Tornozelo', 'Joelho', 'Coxa', 'Anasarca');

-- CreateEnum
CREATE TYPE "tiposTriagem" AS ENUM ('NRS2002', 'MNA');

-- CreateEnum
CREATE TYPE "PPStatus" AS ENUM ('M', 'G');

-- CreateEnum
CREATE TYPE "ladoBraco" AS ENUM ('E', 'D');

-- CreateEnum
CREATE TYPE "antoprometriaClassificacao" AS ENUM ('A', 'R', 'D');

-- CreateEnum
CREATE TYPE "pesoTipo" AS ENUM ('Atual', 'Estimado', 'Seco');

-- CreateEnum
CREATE TYPE "caloriaMetodo" AS ENUM ('FDB', 'Outro');

-- CreateEnum
CREATE TYPE "proteinaMetodo" AS ENUM ('Pratico', 'VCT');

-- DropForeignKey
ALTER TABLE "acompanhamento_antropometrico" DROP CONSTRAINT "acompanhamento_antropometrico_id_ficha_nutricional_fkey";

-- DropForeignKey
ALTER TABLE "antropometria_admissional" DROP CONSTRAINT "antropometria_admissional_id_ficha_nutricional_fkey";

-- AlterTable
ALTER TABLE "conduta_nutricional" ALTER COLUMN "dieta" SET NOT NULL,
ALTER COLUMN "dieta" SET DATA TYPE VARCHAR(20),
ALTER COLUMN "volume" SET NOT NULL,
ALTER COLUMN "volume" SET DATA TYPE VARCHAR(20),
ALTER COLUMN "fracionamento" SET NOT NULL,
ALTER COLUMN "fracionamento" SET DATA TYPE VARCHAR(20),
ALTER COLUMN "kcal_dia" SET NOT NULL,
ALTER COLUMN "kcal_dia" SET DATA TYPE VARCHAR(20),
ALTER COLUMN "ptn_dia" SET NOT NULL,
ALTER COLUMN "ptn_dia" SET DATA TYPE VARCHAR(20),
ALTER COLUMN "agua_ml" SET NOT NULL,
ALTER COLUMN "agua_ml" SET DATA TYPE VARCHAR(20);

-- AlterTable
ALTER TABLE "ficha_nutricional" DROP COLUMN "ascite",
DROP COLUMN "caloria",
DROP COLUMN "caloria_metodo",
DROP COLUMN "diagnostico_clinico",
DROP COLUMN "diagnostico_nutricional",
DROP COLUMN "edema",
DROP COLUMN "hidrica",
DROP COLUMN "hidrica_observacao",
DROP COLUMN "local_edema",
DROP COLUMN "proteina",
DROP COLUMN "proteina_metodo",
ADD COLUMN     "alergia_intolerancia" BOOLEAN NOT NULL,
ADD COLUMN     "alergia_intolerancia_obs" VARCHAR(100),
ADD COLUMN     "especificacao" VARCHAR(300) NOT NULL,
ADD COLUMN     "observacao" VARCHAR(300);

-- AlterTable
ALTER TABLE "quadro_clinico" DROP COLUMN "dispneia",
DROP COLUMN "mastigacao",
DROP COLUMN "odinofagia",
ALTER COLUMN "aceitacao_alimentar" SET NOT NULL,
ALTER COLUMN "aceitacao_alimentar" SET DATA TYPE VARCHAR(20),
ALTER COLUMN "suplemento_oral" SET NOT NULL,
ALTER COLUMN "suplemento_oral" SET DATA TYPE VARCHAR(20),
ALTER COLUMN "apetite" SET NOT NULL,
ALTER COLUMN "apetite" SET DATA TYPE VARCHAR(20),
ALTER COLUMN "disfagia" SET NOT NULL,
ALTER COLUMN "disfagia" SET DATA TYPE VARCHAR(20),
ALTER COLUMN "nausea_vomito" SET NOT NULL,
ALTER COLUMN "nausea_vomito" SET DATA TYPE VARCHAR(20),
ALTER COLUMN "dor_abdominal" SET NOT NULL,
ALTER COLUMN "dor_abdominal" SET DATA TYPE VARCHAR(20),
ALTER COLUMN "evacuacao" SET NOT NULL,
ALTER COLUMN "evacuacao" SET DATA TYPE VARCHAR(20),
ALTER COLUMN "diurese" SET NOT NULL,
ALTER COLUMN "diurese" SET DATA TYPE VARCHAR(20),
ALTER COLUMN "observacao" SET NOT NULL,
ALTER COLUMN "observacao" SET DATA TYPE VARCHAR(20);

-- DropTable
DROP TABLE "acompanhamento_antropometrico";

-- DropTable
DROP TABLE "antropometria_admissional";

-- CreateTable
CREATE TABLE "semiologia_nutricional" (
    "id" BIGSERIAL NOT NULL,
    "uid" UUID NOT NULL DEFAULT gen_random_uuid(),
    "perda_aparente" VARCHAR(100) NOT NULL,
    "gordura_subcutanea" "Status" NOT NULL,
    "edema" "Edema" NOT NULL,
    "local_edema" "LocalEdema" NOT NULL,
    "ascite" "Status" NOT NULL,
    "criado_em" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizado_em" TIMESTAMP NOT NULL,
    "id_ficha_nutricional" BIGINT NOT NULL,

    CONSTRAINT "semiologia_nutricional_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "antropometria_nutricional" (
    "id" BIGSERIAL NOT NULL,
    "uid" UUID NOT NULL DEFAULT gen_random_uuid(),
    "triagem" "tiposTriagem" NOT NULL,
    "triagem_obs" VARCHAR(100) NOT NULL,
    "escore" VARCHAR(20) NOT NULL,
    "triagem_classificacao" VARCHAR(200) NOT NULL,
    "perda_peso" VARCHAR(200) NOT NULL,
    "peso_atual" VARCHAR(10) NOT NULL,
    "peso_estimado" VARCHAR(10) NOT NULL,
    "peso_seco" VARCHAR(10) NOT NULL,
    "pp_kg" VARCHAR(10) NOT NULL,
    "pp" VARCHAR(10) NOT NULL,
    "pp_tempo" VARCHAR(10) NOT NULL,
    "pp_classificacao" "PPStatus" NOT NULL,
    "altura_atual" VARCHAR(10) NOT NULL,
    "altura_estimada" VARCHAR(10) NOT NULL,
    "altura_aj" VARCHAR(10) NOT NULL,
    "imc" VARCHAR(10) NOT NULL,
    "imc_classificacao" VARCHAR(50) NOT NULL,
    "circ_braco" VARCHAR(10) NOT NULL,
    "braco_lado" "ladoBraco" NOT NULL,
    "circ_braco_percentil" VARCHAR(10) NOT NULL,
    "circ_braco_classificacao" "antoprometriaClassificacao" NOT NULL,
    "circ_panturrilha" VARCHAR(10) NOT NULL,
    "circ_panturrilha_percentil" VARCHAR(10) NOT NULL,
    "circ_panturrilha_classificacao" "antoprometriaClassificacao" NOT NULL,
    "circ_abdominal" VARCHAR(10) NOT NULL,
    "criado_em" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizado_em" TIMESTAMP NOT NULL,
    "id_ficha_nutricional" BIGINT NOT NULL,

    CONSTRAINT "antropometria_nutricional_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "necessidade_nutricional" (
    "id" BIGSERIAL NOT NULL,
    "uid" UUID NOT NULL DEFAULT gen_random_uuid(),
    "peso" VARCHAR(50) NOT NULL,
    "peso_tipo" "pesoTipo" NOT NULL,
    "peso_obs" VARCHAR(50),
    "caloria" VARCHAR(50) NOT NULL,
    "caloria_metodo" "caloriaMetodo" NOT NULL,
    "caloria_fdb" VARCHAR(50),
    "caloria_outro" VARCHAR(50),
    "proteina" VARCHAR(255),
    "proteina_metodo" "proteinaMetodo" NOT NULL,
    "proteina_pratico" VARCHAR(50),
    "proteina_vct" VARCHAR(50),
    "hidrica" VARCHAR(50) NOT NULL,
    "hidrica_observacao" VARCHAR(50),
    "criado_em" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizado_em" TIMESTAMP NOT NULL,
    "id_ficha_nutricional" BIGINT NOT NULL,

    CONSTRAINT "necessidade_nutricional_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "semiologia_nutricional_uid_key" ON "semiologia_nutricional"("uid");

-- CreateIndex
CREATE UNIQUE INDEX "semiologia_nutricional_id_ficha_nutricional_key" ON "semiologia_nutricional"("id_ficha_nutricional");

-- CreateIndex
CREATE UNIQUE INDEX "antropometria_nutricional_uid_key" ON "antropometria_nutricional"("uid");

-- CreateIndex
CREATE UNIQUE INDEX "antropometria_nutricional_id_ficha_nutricional_key" ON "antropometria_nutricional"("id_ficha_nutricional");

-- CreateIndex
CREATE UNIQUE INDEX "necessidade_nutricional_uid_key" ON "necessidade_nutricional"("uid");

-- CreateIndex
CREATE UNIQUE INDEX "necessidade_nutricional_id_ficha_nutricional_key" ON "necessidade_nutricional"("id_ficha_nutricional");

-- AddForeignKey
ALTER TABLE "semiologia_nutricional" ADD CONSTRAINT "semiologia_nutricional_id_ficha_nutricional_fkey" FOREIGN KEY ("id_ficha_nutricional") REFERENCES "ficha_nutricional"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "antropometria_nutricional" ADD CONSTRAINT "antropometria_nutricional_id_ficha_nutricional_fkey" FOREIGN KEY ("id_ficha_nutricional") REFERENCES "ficha_nutricional"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "necessidade_nutricional" ADD CONSTRAINT "necessidade_nutricional_id_ficha_nutricional_fkey" FOREIGN KEY ("id_ficha_nutricional") REFERENCES "ficha_nutricional"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
