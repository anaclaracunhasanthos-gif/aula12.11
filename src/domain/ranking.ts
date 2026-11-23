import type { ResultadoRanking, Modalidade } from './types';
/** Ordena apenas projetos elegíveis primeiro, sem divulgar médias com amostra insuficiente. */
export function ordenarRanking(itens: ResultadoRanking[], modalidade: Modalidade, minimo = 5): ResultadoRanking[] {
  const rows = itens.filter(x => x.modalidade === modalidade).map(x =>
    x.total >= minimo && x.media !== null
      ? { ...x, posicao: null }
      : { ...x, media: null, medias_criterios: null, posicao: null });
  rows.sort((a,b) => Number(b.media !== null) - Number(a.media !== null) ||
    (b.media ?? 0) - (a.media ?? 0) || b.total - a.total || a.titulo.localeCompare(b.titulo,'pt-BR'));
  let posicao = 0;
  return rows.map(x => ({...x, posicao: x.media === null ? null : ++posicao}));
}
