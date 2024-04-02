INSERT INTO permissao (id, uid, id_grupo_permissao, nome, codigo, atualizado_em) 
VALUES
(1, '2df1ad43-dbb4-4dbd-82a2-ccf55cfa97a5',1, 'Criar usuário', 101, current_timestamp),
(2, '1c658131-9993-4f55-8656-5560d277d703',1, 'Buscar usuário', 102, current_timestamp),
(3, '038f5969-69d0-4453-98fa-773672c4b85c',1, 'Atualizar usuário', 103, current_timestamp),
(4, '3cf5e068-3bf1-4003-86bb-b33bcf421fd6',1, 'Deletar usuário', 104, current_timestamp),
(5, 'de0fa75d-260f-42b5-9134-146055383812',2, 'Cadastrar cargo', 201, current_timestamp),
(6, '495f9f6c-3de4-4255-8073-8a67b785426e',2, 'Buscar cargo', 202, current_timestamp),
(7, 'f5924ec8-b950-482d-9003-0f47cb1e94f4',2, 'Atualizar cargo', 203, current_timestamp),
(8, '6a88d667-6c61-41d9-82cd-4e6f75d25bdd',2, 'Deletar cargo', 204, current_timestamp),
(9, 'a45c49df-6902-464d-b09d-1d3a86cc96f7',3, 'Cadastrar idoso', 301, current_timestamp),
(10, 'f20a3e1e-eff4-4f07-b453-cb72cc096aa1',3, 'Buscar idoso', 302, current_timestamp),
(11, 'c6706f02-7f1a-458b-9f8b-c378fd7aa3e6',3, 'Atualizar idoso', 303, current_timestamp),
(12, 'c22c6432-9459-43cb-90d2-ae7cb08461d1',3, 'Deletar idoso', 304, current_timestamp)
ON CONFLICT (id) DO UPDATE
  SET
    uid = EXCLUDED.uid,
    id_grupo_permissao = EXCLUDED.id_grupo_permissao,
    nome = EXCLUDED.nome,
    codigo = EXCLUDED.codigo,
    atualizado_em = EXCLUDED.atualizado_em;