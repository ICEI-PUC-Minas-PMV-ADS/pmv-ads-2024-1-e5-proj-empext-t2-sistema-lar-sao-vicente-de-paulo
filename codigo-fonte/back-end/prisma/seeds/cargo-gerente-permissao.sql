INSERT INTO cargo_permissao (id, uid, id_cargo, id_permissao, ativo, atualizado_em) 
VALUES
(1, 'dcf70bba-bc71-4b0d-90bc-849e98f30d4b', 1, 1, true, current_timestamp),
(2, 'aca7b48c-7260-4a2a-b358-9880c98223fd', 1, 2, true, current_timestamp),
(3, 'f18a1361-1b30-45e5-b5d3-ec931defae2b', 1, 3, true, current_timestamp),
(4, '839ae90a-7f2b-4c3e-a8d4-b08ee8625cae', 1, 4, true, current_timestamp),
(5, 'd53ffc15-3da4-44b4-a109-da8f345bd139', 1, 5, true, current_timestamp),
(6, '498899cb-b0f2-4e15-a775-8a69ef34009c', 1, 6, true, current_timestamp),
(7, '53f3aaa2-f96b-406d-ab16-5eb296a4dc30', 1, 7, true, current_timestamp),
(8, '2e861f2d-a276-48e4-a95c-df20cb454440', 1, 8, true, current_timestamp),
(9, 'd705b41d-e52d-4b06-a4bb-75c268b3d11a', 1, 9, true, current_timestamp),
(10, '4d2382a5-d6bd-45ce-b98f-cf0c9791f028', 1, 10, true, current_timestamp),
(11, '4185b84c-d24c-42fe-bc26-027e933c847d', 1, 11, true, current_timestamp),
(12, '15fd423a-a3d5-4c79-96bb-aaca12d106e4', 1, 12, true, current_timestamp)
ON CONFLICT (id) DO UPDATE
  SET
    uid = EXCLUDED.uid,
    id_cargo = EXCLUDED.id_cargo,
    id_permissao = EXCLUDED.id_permissao,
    ativo = EXCLUDED.ativo,
    atualizado_em = EXCLUDED.atualizado_em;