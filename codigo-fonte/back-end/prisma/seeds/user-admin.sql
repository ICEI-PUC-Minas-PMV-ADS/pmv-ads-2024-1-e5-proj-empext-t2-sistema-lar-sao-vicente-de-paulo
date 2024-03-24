INSERT INTO usuario (id, uid, id_cargo, nome, cpf_cnh, email, senha, atualizado_em) 
VALUES
(1, 'cf122f7c-a1d1-4e6e-aed8-f6ce1a7b16a1', 1, 'Admin', 'Vazio', 'admin@mail.com', 'adpexzg3FUZAk', current_timestamp)
ON CONFLICT (id) DO UPDATE
  SET
    uid = EXCLUDED.uid,
    id_cargo = EXCLUDED.id_cargo,
    nome = EXCLUDED.nome,
    cpf_cnh = EXCLUDED.cpf_cnh,
    email = EXCLUDED.email,
    senha = EXCLUDED.senha,
    atualizado_em = EXCLUDED.atualizado_em;