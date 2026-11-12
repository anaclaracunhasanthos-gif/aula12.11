import type { Notas } from './types';
export const PESOS = { criatividade:0.30, clareza:0.30, relevancia:0.25, demonstracao:0.15 } as const;
export const CRITERIOS = [{key:'criatividade',label:'Criatividade e inovação',weight:'30%'},{key:'clareza',label:'Clareza da apresentação',weight:'30%'},{key:'relevancia',label:'Relevância e impacto',weight:'25%'},{key:'demonstracao',label:'Demonstração e resultados',weight:'15%'}] as const;
export function notaPonderada(n:Notas):number { validarNotas(n); return +(n.criatividade*PESOS.criatividade+n.clareza*PESOS.clareza+n.relevancia*PESOS.relevancia+n.demonstracao*PESOS.demonstracao).toFixed(2); }
export function validarNotas(n:Partial<Notas>): asserts n is Notas { for(const k of Object.keys(PESOS) as (keyof Notas)[]){const v=n[k];if(!Number.isInteger(v)||v!<1||v!>5)throw new Error(`A nota de ${k} deve ser um inteiro entre 1 e 5.`);} }
export function normalizarBusca(s:string):string{return s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLocaleLowerCase('pt-BR').trim();}
