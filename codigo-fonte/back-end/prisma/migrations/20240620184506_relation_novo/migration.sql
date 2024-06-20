-- DropForeignKey
ALTER TABLE "relatorio_pia_resposta_definida" DROP CONSTRAINT "relatorio_pia_resposta_definida_uid_relatorio_pia_resposta_fkey";

-- AlterTable
ALTER TABLE "relatorio_pia_resposta_definida" ALTER COLUMN "uid_relatorio_pia_resposta_opcao" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "relatorio_pia_resposta_definida" ADD CONSTRAINT "relatorio_pia_resposta_definida_uid_relatorio_pia_resposta_fkey" FOREIGN KEY ("uid_relatorio_pia_resposta_opcao") REFERENCES "relatorio_pia_resposta_opcao"("uid") ON DELETE SET NULL ON UPDATE CASCADE;
