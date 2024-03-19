-- CreateEnum
CREATE TYPE "Situacao" AS ENUM ('ATIVO', 'INATIVO', 'PENDENTE');

-- CreateTable
CREATE TABLE "usuarios" (
    "id" BIGSERIAL NOT NULL,
    "uid" UUID NOT NULL DEFAULT gen_random_uuid(),
    "cargo_id" BIGINT,
    "foto" BYTEA,
    "nome" VARCHAR(255) NOT NULL,
    "cpf_cnh" VARCHAR(11) NOT NULL,
    "email" VARCHAR(254) NOT NULL,
    "senha" VARCHAR(60) NOT NULL,
    "situacao" "Situacao" NOT NULL DEFAULT 'ATIVO',
    "criado_em" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizado_em" TIMESTAMP NOT NULL,

    CONSTRAINT "usuarios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "idosos" (
    "id" BIGSERIAL NOT NULL,
    "uid" UUID NOT NULL DEFAULT gen_random_uuid(),
    "usuario_id" BIGINT NOT NULL,
    "foto" BYTEA,
    "nome_completo" VARCHAR(255) NOT NULL,
    "data_nascimento" DATE NOT NULL,
    "naturalidade" VARCHAR(100) NOT NULL,
    "estado" VARCHAR(2) NOT NULL,
    "pais" VARCHAR(100) NOT NULL,
    "estado_civil" VARCHAR(20) NOT NULL,
    "religiao" VARCHAR(50) NOT NULL,
    "escolaridade" VARCHAR(50) NOT NULL,
    "nome_pai" VARCHAR(255) NOT NULL,
    "nome_mae" VARCHAR(255) NOT NULL,
    "data_ingresso" DATE NOT NULL,
    "cpf" VARCHAR(11),
    "cnh" VARCHAR(8),
    "rg" VARCHAR(10),
    "rg_orgao_expedidor" VARCHAR(255),
    "titulo_eleitor" VARCHAR(12),
    "titulo_eleitor_secao" VARCHAR(4),
    "titulo_eleitor_zona" VARCHAR(3),
    "certidao_nascimento" VARCHAR(30),
    "certidao_nascimento_folha" VARCHAR(20),
    "certidao_nascimento_livro" VARCHAR(20),
    "certidao_casamento" VARCHAR(30),
    "certidao_casamento_folha" VARCHAR(20),
    "certidao_casamento_livro" VARCHAR(20),
    "situacao" "Situacao" NOT NULL DEFAULT 'ATIVO',
    "motivo_inativacao" VARCHAR(100),
    "criado_em" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizado_em" TIMESTAMP NOT NULL,

    CONSTRAINT "idosos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "responsaveis_idosos" (
    "id" BIGSERIAL NOT NULL,
    "uid" UUID NOT NULL DEFAULT gen_random_uuid(),
    "idoso_id" BIGINT NOT NULL,
    "parentesco" VARCHAR(50) NOT NULL,
    "nome_completo" VARCHAR(255) NOT NULL,
    "endereco" VARCHAR(100) NOT NULL,
    "endereco_numero" VARCHAR(20) NOT NULL,
    "bairro" VARCHAR(50) NOT NULL,
    "cep" VARCHAR(50) NOT NULL,
    "estado" VARCHAR(2) NOT NULL,
    "telefone_1" VARCHAR(20) NOT NULL,
    "telefone_2" VARCHAR(20),
    "criado_em" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizado_em" TIMESTAMP NOT NULL,

    CONSTRAINT "responsaveis_idosos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "modelo_cargo" (
    "id" BIGSERIAL NOT NULL,
    "uid" UUID NOT NULL DEFAULT gen_random_uuid(),
    "nome" VARCHAR(255) NOT NULL,
    "criado_em" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizado_em" TIMESTAMP NOT NULL,

    CONSTRAINT "modelo_cargo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "modelo_cargo_permissao" (
    "id" BIGSERIAL NOT NULL,
    "uid" UUID NOT NULL DEFAULT gen_random_uuid(),
    "cargo_id" BIGINT NOT NULL,
    "permissao_id" BIGINT NOT NULL,
    "criado_em" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizado_em" TIMESTAMP NOT NULL,

    CONSTRAINT "modelo_cargo_permissao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "permissao" (
    "id" BIGSERIAL NOT NULL,
    "uid" UUID NOT NULL DEFAULT gen_random_uuid(),
    "grupo_permissao_id" BIGINT NOT NULL,
    "nome" VARCHAR(255) NOT NULL,
    "codigo" INTEGER NOT NULL,
    "criado_em" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizado_em" TIMESTAMP NOT NULL,

    CONSTRAINT "permissao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "grupo_permissao" (
    "id" BIGSERIAL NOT NULL,
    "uid" UUID NOT NULL DEFAULT gen_random_uuid(),
    "nome" VARCHAR(255) NOT NULL,
    "codigo" INTEGER NOT NULL,
    "criado_em" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizado_em" TIMESTAMP NOT NULL,

    CONSTRAINT "grupo_permissao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "prontuario" (
    "id" BIGSERIAL NOT NULL,
    "uid" UUID NOT NULL DEFAULT gen_random_uuid(),
    "idoso_id" BIGINT NOT NULL,
    "usuario_id" BIGINT NOT NULL,
    "relatorio" TEXT NOT NULL,
    "criado_em" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizado_em" TIMESTAMP NOT NULL,

    CONSTRAINT "prontuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "relatorio_pia" (
    "id" BIGSERIAL NOT NULL,
    "uid" UUID NOT NULL DEFAULT gen_random_uuid(),
    "modelo_relatorio_pia_id" BIGINT NOT NULL,
    "idoso_id" BIGINT NOT NULL,
    "usuario_id" BIGINT NOT NULL,
    "criado_em" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizado_em" TIMESTAMP NOT NULL,

    CONSTRAINT "relatorio_pia_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pergunta_relatorio" (
    "id" BIGSERIAL NOT NULL,
    "uid" UUID NOT NULL DEFAULT gen_random_uuid(),
    "relatorio_pia_id" BIGINT NOT NULL,
    "pergunta" VARCHAR(255) NOT NULL,
    "sim_nao" BOOLEAN NOT NULL,
    "observacao" TEXT,
    "criado_em" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizado_em" TIMESTAMP NOT NULL,

    CONSTRAINT "pergunta_relatorio_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "modelo_relatorio_pia" (
    "id" BIGSERIAL NOT NULL,
    "uid" UUID NOT NULL DEFAULT gen_random_uuid(),
    "nome" VARCHAR(255) NOT NULL,
    "criado_em" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizado_em" TIMESTAMP NOT NULL,

    CONSTRAINT "modelo_relatorio_pia_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "perguntas" (
    "id" BIGSERIAL NOT NULL,
    "uid" UUID NOT NULL DEFAULT gen_random_uuid(),
    "modelo_id" BIGINT NOT NULL,
    "pergunta" VARCHAR(255) NOT NULL,
    "criado_em" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizado_em" TIMESTAMP NOT NULL,

    CONSTRAINT "perguntas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ficha_nutricional" (
    "id" BIGSERIAL NOT NULL,
    "uid" UUID NOT NULL DEFAULT gen_random_uuid(),
    "idoso_id" BIGINT NOT NULL,
    "usuario_id" BIGINT NOT NULL,
    "diagnostico_clinico" VARCHAR(255),
    "edema" VARCHAR(255),
    "local_edema" VARCHAR(255),
    "ascite" VARCHAR(255),
    "diagnostico_nutricional" VARCHAR(255),
    "caloria" VARCHAR(255),
    "caloria_metodo" VARCHAR(255),
    "proteina" VARCHAR(255),
    "proteina_metodo" VARCHAR(255),
    "hidrica" VARCHAR(255),
    "hidrica_observacao" VARCHAR(255),
    "criado_em" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizado_em" TIMESTAMP NOT NULL,

    CONSTRAINT "ficha_nutricional_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "antropometria_admissional" (
    "id" BIGSERIAL NOT NULL,
    "uid" UUID NOT NULL DEFAULT gen_random_uuid(),
    "ficha_nutricional_id" BIGINT NOT NULL,
    "triagem" VARCHAR(255) NOT NULL,
    "escore" INTEGER NOT NULL,
    "triagem_classificacao" VARCHAR(255) NOT NULL,
    "peso_atual" DOUBLE PRECISION NOT NULL,
    "peso_estimado" DOUBLE PRECISION,
    "pp_kg" DOUBLE PRECISION,
    "pp_porcentagem" VARCHAR(255),
    "pp_tempo" VARCHAR(255),
    "pp_classificacao" VARCHAR(255),
    "altura_atual" DOUBLE PRECISION NOT NULL,
    "altura_estimada" DOUBLE PRECISION,
    "altura_aj" VARCHAR(255),
    "circ_braco" DOUBLE PRECISION NOT NULL,
    "circ_braco_percentil" VARCHAR(255),
    "circ_braco_classificacao" VARCHAR(255),
    "circ_panturrilha" DOUBLE PRECISION NOT NULL,
    "circ_panturrilha_percentil" VARCHAR(255),
    "circ_panturrilha_classificacao" VARCHAR(255),
    "circ_abdominal" DOUBLE PRECISION,
    "criado_em" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizado_em" TIMESTAMP NOT NULL,

    CONSTRAINT "antropometria_admissional_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "conduta_nutricional" (
    "id" BIGSERIAL NOT NULL,
    "uid" UUID NOT NULL DEFAULT gen_random_uuid(),
    "ficha_nutricional_id" BIGINT NOT NULL,
    "data" DATE NOT NULL,
    "dieta" VARCHAR(255),
    "volume" VARCHAR(255),
    "fracionamento" VARCHAR(255),
    "kcal_dia" VARCHAR(255),
    "ptn_dia" INTEGER,
    "agua_ml" VARCHAR(255),
    "criado_em" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizado_em" TIMESTAMP NOT NULL,

    CONSTRAINT "conduta_nutricional_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "quadro_clinico" (
    "id" BIGSERIAL NOT NULL,
    "uid" UUID NOT NULL DEFAULT gen_random_uuid(),
    "ficha_nutricional_id" BIGINT NOT NULL,
    "data" DATE NOT NULL,
    "aceitacao_alimentar" VARCHAR(255),
    "suplemento_oral" VARCHAR(255),
    "apetite" VARCHAR(255),
    "mastigacao" VARCHAR(255),
    "disfagia" VARCHAR(255),
    "odinofagia" VARCHAR(255),
    "dispneia" VARCHAR(255),
    "nausea_vomito" VARCHAR(255),
    "dor_abdominal" VARCHAR(255),
    "evacuacao" VARCHAR(255),
    "diurese" VARCHAR(255),
    "observacao" TEXT,
    "criado_em" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizado_em" TIMESTAMP NOT NULL,

    CONSTRAINT "quadro_clinico_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "acompanhamento_antropometrico" (
    "id" BIGSERIAL NOT NULL,
    "uid" UUID NOT NULL DEFAULT gen_random_uuid(),
    "ficha_nutricional_id" BIGINT NOT NULL,
    "data" DATE NOT NULL,
    "altura" DOUBLE PRECISION NOT NULL,
    "peso" DOUBLE PRECISION NOT NULL,
    "ascite" VARCHAR(255),
    "edema" VARCHAR(255),
    "imc" DOUBLE PRECISION NOT NULL,
    "ca" DOUBLE PRECISION,
    "cb" DOUBLE PRECISION,
    "cp" DOUBLE PRECISION,
    "observacao" TEXT,
    "criado_em" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizado_em" TIMESTAMP NOT NULL,

    CONSTRAINT "acompanhamento_antropometrico_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "perroca" (
    "id" BIGSERIAL NOT NULL,
    "uid" UUID NOT NULL DEFAULT gen_random_uuid(),
    "idoso_id" BIGINT NOT NULL,
    "usuario_id" BIGINT NOT NULL,
    "estado_metal_conciencia" INTEGER NOT NULL,
    "oxigenacao" INTEGER NOT NULL,
    "sinais_vitais" INTEGER NOT NULL,
    "nutricao_hidratacao" INTEGER NOT NULL,
    "motilidade" INTEGER NOT NULL,
    "locomocao" INTEGER NOT NULL,
    "cuidado_corporal" INTEGER NOT NULL,
    "eliminacoes" INTEGER NOT NULL,
    "terapeutica" INTEGER NOT NULL,
    "educacao_saude" INTEGER NOT NULL,
    "comportamento" INTEGER NOT NULL,
    "comunicacao" INTEGER NOT NULL,
    "integridade_cutaneo_mucosa" INTEGER NOT NULL,
    "tipo_cuidado_pontuacao" INTEGER NOT NULL,
    "tipo_cuidado_classificacao" INTEGER NOT NULL,
    "criado_em" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizado_em" TIMESTAMP NOT NULL,

    CONSTRAINT "perroca_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "escala_braden" (
    "id" BIGSERIAL NOT NULL,
    "uid" UUID NOT NULL DEFAULT gen_random_uuid(),
    "idoso_id" BIGINT NOT NULL,
    "usuario_id" BIGINT NOT NULL,
    "pontuacao_escala" VARCHAR(255) NOT NULL,
    "percepcao_sensorial" VARCHAR(255) NOT NULL,
    "umidade" VARCHAR(255) NOT NULL,
    "atividade" VARCHAR(255) NOT NULL,
    "mobilidade" VARCHAR(255) NOT NULL,
    "nutricao" VARCHAR(255) NOT NULL,
    "friccao_cisalhamento" VARCHAR(255) NOT NULL,
    "criado_em" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizado_em" TIMESTAMP NOT NULL,

    CONSTRAINT "escala_braden_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_uid_key" ON "usuarios"("uid");

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_cpf_cnh_key" ON "usuarios"("cpf_cnh");

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_email_key" ON "usuarios"("email");

-- CreateIndex
CREATE UNIQUE INDEX "idosos_uid_key" ON "idosos"("uid");

-- CreateIndex
CREATE UNIQUE INDEX "idosos_cpf_key" ON "idosos"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "idosos_cnh_key" ON "idosos"("cnh");

-- CreateIndex
CREATE UNIQUE INDEX "idosos_rg_key" ON "idosos"("rg");

-- CreateIndex
CREATE UNIQUE INDEX "responsaveis_idosos_uid_key" ON "responsaveis_idosos"("uid");

-- CreateIndex
CREATE UNIQUE INDEX "modelo_cargo_uid_key" ON "modelo_cargo"("uid");

-- CreateIndex
CREATE UNIQUE INDEX "modelo_cargo_permissao_uid_key" ON "modelo_cargo_permissao"("uid");

-- CreateIndex
CREATE UNIQUE INDEX "permissao_uid_key" ON "permissao"("uid");

-- CreateIndex
CREATE UNIQUE INDEX "grupo_permissao_uid_key" ON "grupo_permissao"("uid");

-- CreateIndex
CREATE UNIQUE INDEX "prontuario_uid_key" ON "prontuario"("uid");

-- CreateIndex
CREATE UNIQUE INDEX "relatorio_pia_uid_key" ON "relatorio_pia"("uid");

-- CreateIndex
CREATE UNIQUE INDEX "pergunta_relatorio_uid_key" ON "pergunta_relatorio"("uid");

-- CreateIndex
CREATE UNIQUE INDEX "modelo_relatorio_pia_uid_key" ON "modelo_relatorio_pia"("uid");

-- CreateIndex
CREATE UNIQUE INDEX "perguntas_uid_key" ON "perguntas"("uid");

-- CreateIndex
CREATE UNIQUE INDEX "ficha_nutricional_uid_key" ON "ficha_nutricional"("uid");

-- CreateIndex
CREATE UNIQUE INDEX "antropometria_admissional_uid_key" ON "antropometria_admissional"("uid");

-- CreateIndex
CREATE UNIQUE INDEX "antropometria_admissional_ficha_nutricional_id_key" ON "antropometria_admissional"("ficha_nutricional_id");

-- CreateIndex
CREATE UNIQUE INDEX "conduta_nutricional_uid_key" ON "conduta_nutricional"("uid");

-- CreateIndex
CREATE UNIQUE INDEX "quadro_clinico_uid_key" ON "quadro_clinico"("uid");

-- CreateIndex
CREATE UNIQUE INDEX "acompanhamento_antropometrico_uid_key" ON "acompanhamento_antropometrico"("uid");

-- CreateIndex
CREATE UNIQUE INDEX "perroca_uid_key" ON "perroca"("uid");

-- CreateIndex
CREATE UNIQUE INDEX "escala_braden_uid_key" ON "escala_braden"("uid");

-- AddForeignKey
ALTER TABLE "usuarios" ADD CONSTRAINT "usuarios_cargo_id_fkey" FOREIGN KEY ("cargo_id") REFERENCES "modelo_cargo"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "idosos" ADD CONSTRAINT "idosos_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "responsaveis_idosos" ADD CONSTRAINT "responsaveis_idosos_idoso_id_fkey" FOREIGN KEY ("idoso_id") REFERENCES "idosos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "modelo_cargo_permissao" ADD CONSTRAINT "modelo_cargo_permissao_cargo_id_fkey" FOREIGN KEY ("cargo_id") REFERENCES "modelo_cargo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "modelo_cargo_permissao" ADD CONSTRAINT "modelo_cargo_permissao_permissao_id_fkey" FOREIGN KEY ("permissao_id") REFERENCES "permissao"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "permissao" ADD CONSTRAINT "permissao_grupo_permissao_id_fkey" FOREIGN KEY ("grupo_permissao_id") REFERENCES "grupo_permissao"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "prontuario" ADD CONSTRAINT "prontuario_idoso_id_fkey" FOREIGN KEY ("idoso_id") REFERENCES "idosos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "prontuario" ADD CONSTRAINT "prontuario_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "relatorio_pia" ADD CONSTRAINT "relatorio_pia_idoso_id_fkey" FOREIGN KEY ("idoso_id") REFERENCES "idosos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "relatorio_pia" ADD CONSTRAINT "relatorio_pia_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "relatorio_pia" ADD CONSTRAINT "relatorio_pia_modelo_relatorio_pia_id_fkey" FOREIGN KEY ("modelo_relatorio_pia_id") REFERENCES "modelo_relatorio_pia"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pergunta_relatorio" ADD CONSTRAINT "pergunta_relatorio_relatorio_pia_id_fkey" FOREIGN KEY ("relatorio_pia_id") REFERENCES "relatorio_pia"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "perguntas" ADD CONSTRAINT "perguntas_modelo_id_fkey" FOREIGN KEY ("modelo_id") REFERENCES "modelo_relatorio_pia"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ficha_nutricional" ADD CONSTRAINT "ficha_nutricional_idoso_id_fkey" FOREIGN KEY ("idoso_id") REFERENCES "idosos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ficha_nutricional" ADD CONSTRAINT "ficha_nutricional_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "antropometria_admissional" ADD CONSTRAINT "antropometria_admissional_ficha_nutricional_id_fkey" FOREIGN KEY ("ficha_nutricional_id") REFERENCES "ficha_nutricional"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "conduta_nutricional" ADD CONSTRAINT "conduta_nutricional_ficha_nutricional_id_fkey" FOREIGN KEY ("ficha_nutricional_id") REFERENCES "ficha_nutricional"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "quadro_clinico" ADD CONSTRAINT "quadro_clinico_ficha_nutricional_id_fkey" FOREIGN KEY ("ficha_nutricional_id") REFERENCES "ficha_nutricional"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "acompanhamento_antropometrico" ADD CONSTRAINT "acompanhamento_antropometrico_ficha_nutricional_id_fkey" FOREIGN KEY ("ficha_nutricional_id") REFERENCES "ficha_nutricional"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "perroca" ADD CONSTRAINT "perroca_idoso_id_fkey" FOREIGN KEY ("idoso_id") REFERENCES "idosos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "perroca" ADD CONSTRAINT "perroca_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "escala_braden" ADD CONSTRAINT "escala_braden_idoso_id_fkey" FOREIGN KEY ("idoso_id") REFERENCES "idosos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "escala_braden" ADD CONSTRAINT "escala_braden_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
