import type {ResultadoRanking} from '../domain/types';
const GAS=import.meta.env.VITE_GAS_APP_URL||'';
export function gasPage(page:string,params=''){return GAS?`${GAS}?page=${page}${params}`:'';}
export async function carregarRanking(modalidade:string):Promise<ResultadoRanking[]>{if(!GAS)return [];const url=`${GAS}?action=ranking&modalidade=${encodeURIComponent(modalidade)}`;const res=await fetch(url,{headers:{Accept:'application/json'}});if(!res.ok)throw new Error('Não foi possível consultar o ranking.');const data=await res.json();return data.resultados||[];}
