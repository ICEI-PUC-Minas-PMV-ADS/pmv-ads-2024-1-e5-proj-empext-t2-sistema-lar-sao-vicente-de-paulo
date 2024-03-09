-- CreateTable
CREATE TABLE "usuario" (
    "id" BIGSERIAL NOT NULL,
    "uid" UUID NOT NULL DEFAULT gen_random_uuid(),
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL,
    "is_admin" BOOLEAN NOT NULL DEFAULT false,
    "primeiro_nome" VARCHAR(255) NOT NULL,
    "nome_completo" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "senha" VARCHAR(511) NOT NULL,
    "telefone" VARCHAR(255) NOT NULL,
    "situacao" VARCHAR(255) NOT NULL DEFAULT 'ATIVO',

    CONSTRAINT "usuario_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "usuario_uid_key" ON "usuario"("uid");
