-- DropForeignKey
ALTER TABLE "relatorio_pia" DROP CONSTRAINT "relatorio_pia_id_modelo_relatorio_pia_fkey";

-- AlterTable
ALTER TABLE "relatorio_pia" ALTER COLUMN "id_modelo_relatorio_pia" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "relatorio_pia" ADD CONSTRAINT "relatorio_pia_id_modelo_relatorio_pia_fkey" FOREIGN KEY ("id_modelo_relatorio_pia") REFERENCES "modelo_relatorio_pia"("id") ON DELETE SET NULL ON UPDATE CASCADE;
