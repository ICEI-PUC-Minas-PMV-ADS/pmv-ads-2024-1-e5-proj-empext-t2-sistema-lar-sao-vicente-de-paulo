INSERT INTO permissao (id, uid, id_grupo_permissao, nome, codigo, atualizado_em) 
VALUES
(1, '2df1ad43-dbb4-4dbd-82a2-ccf55cfa97a5',1, 'Criar', 101, current_timestamp),
(2, '1c658131-9993-4f55-8656-5560d277d703',1, 'Acessar', 102, current_timestamp),
(3, '038f5969-69d0-4453-98fa-773672c4b85c',1, 'Atualizar', 103, current_timestamp),
(4, '3cf5e068-3bf1-4003-86bb-b33bcf421fd6',1, 'Deletar', 104, current_timestamp),
(5, 'de0fa75d-260f-42b5-9134-146055383812',2, 'Criar', 201, current_timestamp),
(6, '495f9f6c-3de4-4255-8073-8a67b785426e',2, 'Acessar', 202, current_timestamp),
(7, 'f5924ec8-b950-482d-9003-0f47cb1e94f4',2, 'Atualizar', 203, current_timestamp),
(8, '6a88d667-6c61-41d9-82cd-4e6f75d25bdd',2, 'Deletar', 204, current_timestamp),
(9, 'a45c49df-6902-464d-b09d-1d3a86cc96f7',3, 'Criar', 301, current_timestamp),
(10, 'f20a3e1e-eff4-4f07-b453-cb72cc096aa1',3, 'Acessar', 302, current_timestamp),
(11, 'c6706f02-7f1a-458b-9f8b-c378fd7aa3e6',3, 'Atualizar', 303, current_timestamp),
(12, 'c22c6432-9459-43cb-90d2-ae7cb08461d1',3, 'Deletar', 304, current_timestamp),
(13, 'e42923da-73ac-4f7f-ba0a-87ff4f5116a4',4, 'Criar', 401, current_timestamp),
(14, 'f96f386c-3ac4-4d6f-baf3-0bfd327efff2',4, 'Acessar', 402, current_timestamp),
(15, '19c43f71-a393-4372-a0ba-9e86554b64da',4, 'Atualizar', 403, current_timestamp),
(16, 'b440d938-3595-4438-862e-e092633b5359',4, 'Deletar', 404, current_timestamp),
(17, 'd2afd460-852f-48c3-aabf-2d0a04c524d9',5, 'Criar', 501, current_timestamp),
(18, '7d87f675-619d-4589-a704-b452b5d87d07',5, 'Acessar', 502, current_timestamp),
(19, '17070d9f-33ff-4508-a19b-b9360410bca1',5, 'Atualizar', 503, current_timestamp),
(20, '25fb279f-4d28-4652-ab65-8c8c89a92011',5, 'Deletar', 504, current_timestamp),
(21, 'b9742128-c26f-46a1-b387-55dab307be0b',6, 'Criar', 601, current_timestamp),
(22, '2bebd99c-c325-44fe-b696-124997ca5972',6, 'Acessar', 602, current_timestamp),
(23, '84874322-0192-4154-b98e-f77c68c22f8b',6, 'Atualizar', 603, current_timestamp),
(24, 'b2b068b2-63e1-44d7-89bd-90275f3269a4',6, 'Deletar', 604, current_timestamp)
ON CONFLICT (id) DO UPDATE
  SET
    uid = EXCLUDED.uid,
    id_grupo_permissao = EXCLUDED.id_grupo_permissao,
    nome = EXCLUDED.nome,
    codigo = EXCLUDED.codigo,
    atualizado_em = EXCLUDED.atualizado_em;