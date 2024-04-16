/*
  Warnings:

  - You are about to drop the column `modelo_relatorio_pia_id` on the `relatorio_pia` table. All the data in the column will be lost.
  - You are about to drop the `pergunta` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `pergunta_relatorio` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `versao` to the `modelo_relatorio_pia` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_modelo` to the `relatorio_pia` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nome` to the `relatorio_pia` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "pergunta" DROP CONSTRAINT "pergunta_id_modelo_relatorio_pia_fkey";

-- DropForeignKey
ALTER TABLE "pergunta_relatorio" DROP CONSTRAINT "pergunta_relatorio_id_relatorio_pia_fkey";

-- DropForeignKey
ALTER TABLE "relatorio_pia" DROP CONSTRAINT "relatorio_pia_modelo_relatorio_pia_id_fkey";

-- AlterTable
ALTER TABLE "modelo_relatorio_pia" ADD COLUMN     "versao" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "relatorio_pia" DROP COLUMN "modelo_relatorio_pia_id",
ADD COLUMN     "id_modelo" BIGINT NOT NULL,
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
    "id_modelo" BIGINT NOT NULL,

    CONSTRAINT "modelo_relatorio_pia_pergunta_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "relatorio_pia_pergunta" (
    "id" BIGSERIAL NOT NULL,
    "uid" UUID NOT NULL DEFAULT gen_random_uuid(),
    "criado_em" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizado_em" TIMESTAMP NOT NULL,
    "id_pergunta" BIGINT NOT NULL,
    "id_relatorio" BIGINT NOT NULL,

    CONSTRAINT "relatorio_pia_pergunta_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "relatorio_pia_resposta" (
    "id" BIGSERIAL NOT NULL,
    "uid" UUID NOT NULL DEFAULT gen_random_uuid(),
    "resposta" BOOLEAN NOT NULL,
    "descricao" VARCHAR(500),
    "criado_em" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizado_em" TIMESTAMP NOT NULL,
    "id_pergunta" BIGINT NOT NULL,

    CONSTRAINT "relatorio_pia_resposta_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "modelo_relatorio_pia_pergunta_uid_key" ON "modelo_relatorio_pia_pergunta"("uid");

-- CreateIndex
CREATE UNIQUE INDEX "relatorio_pia_pergunta_uid_key" ON "relatorio_pia_pergunta"("uid");

-- CreateIndex
CREATE UNIQUE INDEX "relatorio_pia_resposta_uid_key" ON "relatorio_pia_resposta"("uid");

-- CreateIndex
CREATE UNIQUE INDEX "relatorio_pia_resposta_id_pergunta_key" ON "relatorio_pia_resposta"("id_pergunta");

-- AddForeignKey
ALTER TABLE "modelo_relatorio_pia_pergunta" ADD CONSTRAINT "modelo_relatorio_pia_pergunta_id_modelo_fkey" FOREIGN KEY ("id_modelo") REFERENCES "modelo_relatorio_pia"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "relatorio_pia" ADD CONSTRAINT "relatorio_pia_id_modelo_fkey" FOREIGN KEY ("id_modelo") REFERENCES "modelo_relatorio_pia"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "relatorio_pia_pergunta" ADD CONSTRAINT "relatorio_pia_pergunta_id_pergunta_fkey" FOREIGN KEY ("id_pergunta") REFERENCES "modelo_relatorio_pia_pergunta"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "relatorio_pia_pergunta" ADD CONSTRAINT "relatorio_pia_pergunta_id_relatorio_fkey" FOREIGN KEY ("id_relatorio") REFERENCES "relatorio_pia"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "relatorio_pia_resposta" ADD CONSTRAINT "relatorio_pia_resposta_id_pergunta_fkey" FOREIGN KEY ("id_pergunta") REFERENCES "relatorio_pia_pergunta"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
