INSERT INTO grupo_permissao (id, uid, nome, codigo, atualizado_em) 
VALUES
(1, 'fb6acc55-8ef1-4f91-8bbf-5075ad3ff820','Usuário', 100, current_timestamp),
(2, 'aca3131f-5931-40ac-ae31-7b11fa417ca0','Cargo', 200, current_timestamp),
(3, 'c843bf96-644a-4cbc-852e-5ab1cb96cc36','Idoso', 300, current_timestamp)
ON CONFLICT (id) DO UPDATE
  SET
    uid = EXCLUDED.uid,
    nome = EXCLUDED.nome,
    codigo = EXCLUDED.codigo,
    atualizado_em = EXCLUDED.atualizado_em;