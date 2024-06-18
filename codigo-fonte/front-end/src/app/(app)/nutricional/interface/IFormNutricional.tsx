import { IAntropometriaNutricional } from "./IAntropometriaNutricional";
import { ICondutaNutricional } from "./ICondutaNutricional";
import { INecessidadeNutricional } from "./INecessidadeNutricional";
import { IQuadroClinico } from "./IQuadroClinico";
import { IRegistroAntropometrico } from "./IRegistroAntropometrico";
import { ISemiologiaNutricional } from "./ISemiologiaNutricional";

export interface IFormNutricional {
  id?: bigint;
  uid?: string;
  criado_em?: Date;
  atualizado_em?: Date;
  data_vencimento: Date;
  diagnostico: string;
  especificacao: string;
  alergia_intolerancia: boolean;
  alergia_intolerancia_obs: string;
  observacao: string;
  id_idoso: number;
  id_usuario: number;
  conduta_nutricional: ICondutaNutricional[];
  antropometria_nutricional: IAntropometriaNutricional;
  registro_antrometrico: IRegistroAntropometrico[];
  quadro_clinico: IQuadroClinico[];
  necessidade_nutricional: INecessidadeNutricional;
  semiologia_nutricional: ISemiologiaNutricional;
}
