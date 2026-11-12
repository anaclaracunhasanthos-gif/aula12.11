export type Modalidade = 'Mostra Nacional' | 'Mostra de Extensão';
export interface Projeto { id:string; titulo:string; modalidade:Modalidade; area_tematica:string; data:string; inicio:string; fim:string; formato:string; local:string; fontes:{arquivo:string;pagina:number}[] }
export interface Notas { criatividade:number; clareza:number; relevancia:number; demonstracao:number }
export interface Avaliacao { id_projeto:string; codigo:string; notas:Notas; id_requisicao:string }
export interface ResultadoRanking { id_projeto:string; titulo:string; modalidade:Modalidade; media:number|null; total:number; medias_criterios:{criatividade:number;clareza:number;relevancia:number;demonstracao:number}|null; posicao:number|null; atualizado_em:string }
