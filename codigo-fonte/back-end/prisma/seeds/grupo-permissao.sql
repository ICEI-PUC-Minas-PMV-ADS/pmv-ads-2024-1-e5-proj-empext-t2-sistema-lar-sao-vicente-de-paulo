INSERT INTO grupo_permissao (id, uid, nome, codigo, atualizado_em) 
VALUES
(1, 'fb6acc55-8ef1-4f91-8bbf-5075ad3ff820','Usuário', 100, current_timestamp),
(2, 'aca3131f-5931-40ac-ae31-7b11fa417ca0','Cargo', 200, current_timestamp),
(3, 'c843bf96-644a-4cbc-852e-5ab1cb96cc36','Idoso', 300, current_timestamp),
(4, '69d55dec-1207-4214-878f-f2224fd8f7c6','Modelo Relatório Pia', 400, current_timestamp),
(5, '932786ff-26c7-45bf-8a2e-8066e767e49b','Relatório Pia', 500, current_timestamp),
(6, '3df266bd-994b-4de5-a4ba-d5d61df94616','Relatório Nutricional', 600, current_timestamp)
ON CONFLICT (id) DO UPDATE
  SET
    uid = EXCLUDED.uid,
    nome = EXCLUDED.nome,
    codigo = EXCLUDED.codigo,
    atualizado_em = EXCLUDED.atualizado_em;