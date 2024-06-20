/*
  Warnings:

  - Added the required column `id_relatorio_pia_resposta` to the `relatorio_pia_resposta_definida` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "relatorio_pia_resposta_definida" ADD COLUMN     "id_relatorio_pia_resposta" BIGINT NOT NULL;

-- AddForeignKey
ALTER TABLE "relatorio_pia_resposta_definida" ADD CONSTRAINT "relatorio_pia_resposta_definida_id_relatorio_pia_resposta_fkey" FOREIGN KEY ("id_relatorio_pia_resposta") REFERENCES "relatorio_pia_resposta"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
