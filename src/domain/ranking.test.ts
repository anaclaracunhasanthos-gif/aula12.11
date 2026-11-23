import {describe,it,expect} from 'vitest';
import {ordenarRanking} from './ranking';
import type {ResultadoRanking} from './types';
const crit={criatividade:4,clareza:4,relevancia:4,demonstracao:4};
function row(id:string,media:number,total:number):ResultadoRanking {return {id_projeto:id,titulo:id,modalidade:'Mostra Nacional',media,total,medias_criterios:crit,posicao:null,atualizado_em:'2026-11-12T00:00:00Z'};}
describe('ranking por modalidade e amostra mínima',()=>{
 it('não classifica projeto com menos de 5 avaliações, mesmo quando a média é maior',()=>{
  const r=ordenarRanking([row('A',5,2),row('B',4.4,5),row('C',4.6,6)],'Mostra Nacional');
  expect(r.map(x=>x.id_projeto)).toEqual(['C','B','A']);
  expect(r.map(x=>x.posicao)).toEqual([1,2,null]);
  expect(r[2].media).toBeNull();expect(r[2].medias_criterios).toBeNull();
 });
});
