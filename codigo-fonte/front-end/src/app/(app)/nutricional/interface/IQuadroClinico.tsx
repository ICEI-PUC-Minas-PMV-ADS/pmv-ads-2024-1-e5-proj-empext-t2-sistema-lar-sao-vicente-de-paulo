export interface IQuadroClinico {
    id: number,
    uid: string,
    data: Date,
    aceitacao_alimentar: string,
    suplemento_oral: string,
    apetite: string,
    disfagia: string,
    nausea_vomito: string,
    dor_abdominal: string,
    evacuacao: string,
    diurese: string,
    observacao: string,
    criado_em: Date,
    atualizado_em: Date,
    id_ficha_nutricional: number
}