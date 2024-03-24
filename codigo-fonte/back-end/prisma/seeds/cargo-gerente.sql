INSERT INTO cargo (id, uid, nome, atualizado_em) 
VALUES
(1, '8f4e5e03-d245-4406-82b7-fa8d995897a1','Gerente', current_timestamp)
ON CONFLICT (id) DO UPDATE
  SET
    uid = EXCLUDED.uid,
    nome = EXCLUDED.nome,
    atualizado_em = EXCLUDED.atualizado_em;