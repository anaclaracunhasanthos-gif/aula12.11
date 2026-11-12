import type { ResultadoRanking, Modalidade } from './types';
export function ordenarRanking(itens:ResultadoRanking[],modalidade:Modalidade,minimo=5):ResultadoRanking[]{return itens.filter(x=>x.modalidade===modalidade).map(x=>({...x,posicao:null})).sort((a,b)=>b.media-a.media||b.total-a.total||a.titulo.localeCompare(b.titulo,'pt-BR')).map((x,i)=>({...x,posicao:x.total>=minimo?i+1:null}));}
