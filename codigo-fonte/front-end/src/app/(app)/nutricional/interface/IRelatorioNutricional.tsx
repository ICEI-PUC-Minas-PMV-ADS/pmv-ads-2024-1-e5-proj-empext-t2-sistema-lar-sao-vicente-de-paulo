export interface IRelatorioNutricional {
    id: bigint
    uid: string
    nome_idoso: string
    data_vencimento: Date
    diagnostico: string
    observacoes: string
    especificacoes: string
    possui_alergias_intolerancias: boolean,
    quais_alergias_intolerancias: string
}

export interface IOperationRelatorioNutricional {
    
}