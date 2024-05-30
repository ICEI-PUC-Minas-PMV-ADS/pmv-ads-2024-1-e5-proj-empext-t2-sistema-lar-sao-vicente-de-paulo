export interface IRelatorioNutricional {
    id: bigint
    uid: string
    nome_idoso: string
    data_vencimento: Date
    diagnostico: string
    observacoes: string
    especificacoes: string
    possui_alergias_intolerancias: boolean
    quais_alergias_intolerancias: string
    perda_aparente_de: string
    gordura_subcutanea: string
    edema: string
    local_edema: string
    ascite: string
    triagem: string
    observacoes_antropometria: string
    escore: string
    classificacao: string
    perda_peso: number
    perda_atual: number
    peso_estimado: number
    peso_seco: number
    pp: number
    pp_porcentagem: number
    tempo: string
    pp_select: string
    altura_atual: number
    altura_estimada: number
    aj: number
    resultado_imc: number
    classificacao_imc: string
    circ_braco: number
    braco_e_d: string
    percentil_braco: number
    classificao_braco: string
    circ_panturrilha: number
    percentil_panturrilha: number
    classificao_panturrilha: number
    circ_abdominal: number
    data_registro_antropometrico: Date
    peso_antropometrico: number
    edema_antropometrico: string
    ascite_antropometrico: string
    imc_antropometrico: number
    classificao_antropometrico: string
    cb_antropometrico: string
    cp_antropometrico: string
    observacoes_antropometrico: string
}

export interface IOperationRelatorioNutricional {
    
}