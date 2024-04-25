/*
  Warnings:

  - You are about to drop the column `modelo_relatorio_pia_id` on the `relatorio_pia` table. All the data in the column will be lost.
  - You are about to drop the `pergunta` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `pergunta_relatorio` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `id_modelo_relatorio_pia` to the `relatorio_pia` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nome` to the `relatorio_pia` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "tiposReposta" AS ENUM ('TEXT', 'RADIO', 'CHECKBOX');

-- DropForeignKey
ALTER TABLE "pergunta" DROP CONSTRAINT "pergunta_id_modelo_relatorio_pia_fkey";

-- DropForeignKey
ALTER TABLE "pergunta_relatorio" DROP CONSTRAINT "pergunta_relatorio_id_relatorio_pia_fkey";

-- DropForeignKey
ALTER TABLE "relatorio_pia" DROP CONSTRAINT "relatorio_pia_modelo_relatorio_pia_id_fkey";

-- AlterTable
ALTER TABLE "modelo_relatorio_pia" ADD COLUMN     "versao" INTEGER NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE "relatorio_pia" DROP COLUMN "modelo_relatorio_pia_id",
ADD COLUMN     "id_modelo_relatorio_pia" BIGINT NOT NULL,
ADD COLUMN     "nome" VARCHAR(255) NOT NULL;

-- DropTable
DROP TABLE "pergunta";

-- DropTable
DROP TABLE "pergunta_relatorio";

-- CreateTable
CREATE TABLE "modelo_relatorio_pia_pergunta" (
    "id" BIGSERIAL NOT NULL,
    "uid" UUID NOT NULL DEFAULT gen_random_uuid(),
    "pergunta" VARCHAR(255) NOT NULL,
    "criado_em" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizado_em" TIMESTAMP NOT NULL,
    "id_modelo_relatorio_pia" BIGINT NOT NULL,

    CONSTRAINT "modelo_relatorio_pia_pergunta_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "modelo_relatorio_pia_resposta" (
    "id" BIGSERIAL NOT NULL,
    "uid" UUID NOT NULL DEFAULT gen_random_uuid(),
    "titulo" VARCHAR(255) NOT NULL,
    "tipo" "tiposReposta" NOT NULL,
    "criado_em" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizado_em" TIMESTAMP NOT NULL,
    "id_modelo_relatorio_pia_pergunta" BIGINT NOT NULL,

    CONSTRAINT "modelo_relatorio_pia_resposta_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "modelo_relatorio_pia_resposta_opcao" (
    "uid" UUID NOT NULL DEFAULT gen_random_uuid(),
    "opcao" VARCHAR(255) NOT NULL,
    "criado_em" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizado_em" TIMESTAMP NOT NULL,
    "id_modelo_relatorio_pia_resposta" BIGINT NOT NULL,

    CONSTRAINT "modelo_relatorio_pia_resposta_opcao_pkey" PRIMARY KEY ("uid")
);

-- CreateTable
CREATE TABLE "relatorio_pia_pergunta" (
    "id" BIGSERIAL NOT NULL,
    "uid" UUID NOT NULL DEFAULT gen_random_uuid(),
    "pergunta" VARCHAR(255) NOT NULL,
    "criado_em" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizado_em" TIMESTAMP NOT NULL,
    "id_relatorio_pia" BIGINT NOT NULL,

    CONSTRAINT "relatorio_pia_pergunta_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "relatorio_pia_resposta" (
    "id" BIGSERIAL NOT NULL,
    "uid" UUID NOT NULL DEFAULT gen_random_uuid(),
    "titulo" VARCHAR(255) NOT NULL,
    "tipo" "tiposReposta" NOT NULL,
    "criado_em" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizado_em" TIMESTAMP NOT NULL,
    "id_relatorio_pia_pergunta" BIGINT NOT NULL,

    CONSTRAINT "relatorio_pia_resposta_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "relatorio_pia_resposta_opcao" (
    "uid" UUID NOT NULL DEFAULT gen_random_uuid(),
    "opcao" VARCHAR(255) NOT NULL,
    "criado_em" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizado_em" TIMESTAMP NOT NULL,
    "id_relatorio_pia_resposta" BIGINT NOT NULL,

    CONSTRAINT "relatorio_pia_resposta_opcao_pkey" PRIMARY KEY ("uid")
);

-- CreateTable
CREATE TABLE "relatorio_pia_resposta_definida" (
    "id" BIGSERIAL NOT NULL,
    "uid" UUID NOT NULL DEFAULT gen_random_uuid(),
    "valor" VARCHAR(255),
    "criado_em" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizado_em" TIMESTAMP NOT NULL,
    "uid_relatorio_pia_resposta_opcao" UUID NOT NULL,

    CONSTRAINT "relatorio_pia_resposta_definida_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "modelo_relatorio_pia_pergunta_uid_key" ON "modelo_relatorio_pia_pergunta"("uid");

-- CreateIndex
CREATE UNIQUE INDEX "modelo_relatorio_pia_resposta_uid_key" ON "modelo_relatorio_pia_resposta"("uid");

-- CreateIndex
CREATE UNIQUE INDEX "relatorio_pia_pergunta_uid_key" ON "relatorio_pia_pergunta"("uid");

-- CreateIndex
CREATE UNIQUE INDEX "relatorio_pia_resposta_uid_key" ON "relatorio_pia_resposta"("uid");

-- CreateIndex
CREATE UNIQUE INDEX "relatorio_pia_resposta_id_relatorio_pia_pergunta_key" ON "relatorio_pia_resposta"("id_relatorio_pia_pergunta");

-- CreateIndex
CREATE UNIQUE INDEX "relatorio_pia_resposta_definida_uid_key" ON "relatorio_pia_resposta_definida"("uid");

-- CreateIndex
CREATE UNIQUE INDEX "relatorio_pia_resposta_definida_uid_relatorio_pia_resposta__key" ON "relatorio_pia_resposta_definida"("uid_relatorio_pia_resposta_opcao");

-- AddForeignKey
ALTER TABLE "modelo_relatorio_pia_pergunta" ADD CONSTRAINT "modelo_relatorio_pia_pergunta_id_modelo_relatorio_pia_fkey" FOREIGN KEY ("id_modelo_relatorio_pia") REFERENCES "modelo_relatorio_pia"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "modelo_relatorio_pia_resposta" ADD CONSTRAINT "modelo_relatorio_pia_resposta_id_modelo_relatorio_pia_perg_fkey" FOREIGN KEY ("id_modelo_relatorio_pia_pergunta") REFERENCES "modelo_relatorio_pia_pergunta"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "modelo_relatorio_pia_resposta_opcao" ADD CONSTRAINT "modelo_relatorio_pia_resposta_opcao_id_modelo_relatorio_pi_fkey" FOREIGN KEY ("id_modelo_relatorio_pia_resposta") REFERENCES "modelo_relatorio_pia_resposta"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "relatorio_pia" ADD CONSTRAINT "relatorio_pia_id_modelo_relatorio_pia_fkey" FOREIGN KEY ("id_modelo_relatorio_pia") REFERENCES "modelo_relatorio_pia"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "relatorio_pia_pergunta" ADD CONSTRAINT "relatorio_pia_pergunta_id_relatorio_pia_fkey" FOREIGN KEY ("id_relatorio_pia") REFERENCES "relatorio_pia"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "relatorio_pia_resposta" ADD CONSTRAINT "relatorio_pia_resposta_id_relatorio_pia_pergunta_fkey" FOREIGN KEY ("id_relatorio_pia_pergunta") REFERENCES "relatorio_pia_pergunta"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "relatorio_pia_resposta_opcao" ADD CONSTRAINT "relatorio_pia_resposta_opcao_id_relatorio_pia_resposta_fkey" FOREIGN KEY ("id_relatorio_pia_resposta") REFERENCES "relatorio_pia_resposta"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "relatorio_pia_resposta_definida" ADD CONSTRAINT "relatorio_pia_resposta_definida_uid_relatorio_pia_resposta_fkey" FOREIGN KEY ("uid_relatorio_pia_resposta_opcao") REFERENCES "relatorio_pia_resposta_opcao"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;
