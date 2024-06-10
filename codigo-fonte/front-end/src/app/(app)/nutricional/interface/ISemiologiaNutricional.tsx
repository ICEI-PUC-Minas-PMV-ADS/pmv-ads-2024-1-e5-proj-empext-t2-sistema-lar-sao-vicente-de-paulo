export interface ISemiologiaNutricional {
  id: number;
  uid: string;
  perda_aparente: string;
  gordura_subcutanea: "A" | "L" | "M" | "G";
  edema: "E0" | "E1" | "E2" | "E3" | "E4";
  local_edema: "Tornozelo" | "Joelho" | "Coxa" | "Anasarca";
  ascite: "A" | "L" | "M" | "G";
  criado_em: Date;
  atualizado_em: Date;
  id_ficha_nutricional: number;
}
