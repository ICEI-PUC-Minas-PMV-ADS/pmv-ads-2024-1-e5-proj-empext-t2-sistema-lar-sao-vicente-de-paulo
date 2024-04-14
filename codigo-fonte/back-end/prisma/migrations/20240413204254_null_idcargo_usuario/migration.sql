-- DropForeignKey
ALTER TABLE "usuario" DROP CONSTRAINT "usuario_id_cargo_fkey";

-- AlterTable
ALTER TABLE "usuario" ALTER COLUMN "id_cargo" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "usuario" ADD CONSTRAINT "usuario_id_cargo_fkey" FOREIGN KEY ("id_cargo") REFERENCES "cargo"("id") ON DELETE SET NULL ON UPDATE CASCADE;
