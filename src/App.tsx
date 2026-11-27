import {useEffect,useMemo,useState} from 'react';
import catalogo from './data/catalogo.json';
import type {Projeto,Modalidade} from './domain/types';
import {normalizarBusca} from './domain/avaliacao';
import {gasPage} from './services/api';

const projetos=catalogo.projetos as Projeto[];
const modalidades=['Todas','Mostra Nacional','Mostra de Extensão'] as const;
type Aba='projetos'|'ranking';
const PAGE_SIZE=6;
function dataBR(s:string){return new Date(`${s}T12:00:00`).toLocaleDateString('pt-BR')}
function irAoTopo(){window.scrollTo({top:0,behavior:'smooth'})}
export default function App(){
  const [aba,setAba]=useState<Aba>('projetos');
  const [busca,setBusca]=useState('');
  const [modalidade,setModalidade]=useState<(typeof modalidades)[number]>('Todas');
  const [area,setArea]=useState('Todas');
  const [dia,setDia]=useState('Todos');
  const [pagina,setPagina]=useState(1);
  const [selecionado,setSelecionado]=useState<Projeto|null>(()=>projetos.find(p=>p.id===window.location.hash.replace('#projeto/',''))||null);
  const [rankModal,setRankModal]=useState<Modalidade>('Mostra Nacional');
  useEffect(()=>{const sync=()=>{const p=projetos.find(p=>p.id===window.location.hash.replace('#projeto/',''))||null;setSelecionado(p);if(p)setAba('projetos')};window.addEventListener('hashchange',sync);return()=>window.removeEventListener('hashchange',sync)},[]);
  const areas=useMemo(()=>[...new Set(projetos.map(p=>p.area_tematica))].sort(),[]);
  const dias=useMemo(()=>[...new Set(projetos.map(p=>p.data))].sort(),[]);
  const filtrados=useMemo(()=>projetos.filter(p=>(modalidade==='Todas'||p.modalidade===modalidade)&&(area==='Todas'||p.area_tematica===area)&&(dia==='Todos'||p.data===dia)&&normalizarBusca(`${p.titulo} ${p.id} ${p.area_tematica}`).includes(normalizarBusca(busca))),[busca,modalidade,area,dia]);
  useEffect(()=>setPagina(1),[busca,modalidade,area,dia]);
  const totalPaginas=Math.max(1,Math.ceil(filtrados.length/PAGE_SIZE));
  const visiveis=filtrados.slice((pagina-1)*PAGE_SIZE,pagina*PAGE_SIZE);
  const totalNacional=projetos.filter(p=>p.modalidade==='Mostra Nacional').length;
  const totalExtensao=projetos.filter(p=>p.modalidade==='Mostra de Extensão').length;
  function abrirCatalogo(){setAba('projetos');window.location.hash='';setSelecionado(null);irAoTopo()}
  function abrirProjeto(p:Projeto){setSelecionado(p);window.location.hash=`projeto/${p.id}`;irAoTopo()}
  function abrirRanking(m:Modalidade){setRankModal(m);setAba('ranking');window.location.hash='';setSelecionado(null);irAoTopo()}
  function limparFiltros(){setBusca('');setModalidade('Todas');setArea('Todas');setDia('Todos');setPagina(1)}
  function mudarPagina(n:number){setPagina(Math.min(Math.max(1,n),totalPaginas));document.querySelector('.catalog-head')?.scrollIntoView({behavior:'smooth',block:'start'})}
  const urlVote=selecionado?gasPage('avaliar',`&id=${encodeURIComponent(selecionado.id)}`):'';
  const rankingUrl=gasPage('ranking',`&modalidade=${encodeURIComponent(rankModal)}`);
  return <div className="app">
    <header className="top"><div className="top-inner">
      <div className="brand"><span className="brand-mark" aria-hidden="true">◉</span><div><strong>Universo IF <em>Avalia</em></strong><small>Plataforma de Avaliação de Projetos do IFMA</small></div></div>
      <nav className="desktop-nav" aria-label="Navegação principal"><button className={aba==='projetos'?'active':''} onClick={abrirCatalogo}>▦ Catálogo</button><button className={aba==='ranking'?'active':''} onClick={()=>abrirRanking(rankModal)}>▥ Ranking</button></nav>
    </div></header>
    <main>
      {aba==='projetos'?<>{selecionado?<section className="detail">
        <button className="back" onClick={abrirCatalogo}>← Voltar ao catálogo</button>
        <span className={`tag ${selecionado.modalidade==='Mostra de Extensão'?'extension':'national'}`}>{selecionado.modalidade}</span>
        <p className="detail-id">{selecionado.id}</p><h1>{selecionado.titulo}</h1>
        <dl className="meta"><div><dt>Área temática</dt><dd>{selecionado.area_tematica}</dd></div><div><dt>Data</dt><dd>{dataBR(selecionado.data)}</dd></div><div><dt>Horário</dt><dd>{selecionado.inicio}–{selecionado.fim}</dd></div><div><dt>Formato</dt><dd>{selecionado.formato}</dd></div><div><dt>Local</dt><dd>{selecionado.local}</dd></div></dl>
        {urlVote?<a className="primary" href={urlVote}>Avaliar este projeto ↗</a>:<p className="muted">A avaliação será habilitada quando o endereço do Google Apps Script for configurado.</p>}
      </section>:<>
        <section className="catalog-head" aria-labelledby="catalog-title">
          <div className="catalog-title"><p className="eyebrow">IFMA · UNIVERSO IF 2026</p><h1 id="catalog-title">▱ Catálogo de Projetos</h1><p>Explore, encontre e avalie os projetos do IFMA.</p></div>
          <div className="stats" aria-label="Resumo dos projetos"><div className="stat"><strong>{projetos.length}</strong><span>Projetos</span></div><div className="stat national"><strong>{totalNacional}</strong><span>Mostra Nacional</span></div><div className="stat extension"><strong>{totalExtensao}</strong><span>Mostra de Extensão</span></div></div>
        </section>
        <section className="catalog-panel" aria-label="Explorar projetos">
          <div className="filters">
            <label className="search-label"><span>Buscar projetos</span><input type="search" value={busca} onChange={e=>setBusca(e.target.value)} placeholder="Nome, código ou palavra-chave…" /></label>
            <label><span>Modalidade</span><select value={modalidade} onChange={e=>setModalidade(e.target.value as typeof modalidade)}>{modalidades.map(m=><option key={m} value={m}>{m==='Todas'?'Todas as modalidades':m}</option>)}</select></label>
            <label><span>Área temática</span><select value={area} onChange={e=>setArea(e.target.value)}><option>Todas</option>{areas.map(a=><option key={a}>{a}</option>)}</select></label>
            <label><span>Data</span><select value={dia} onChange={e=>setDia(e.target.value)}><option>Todos</option>{dias.map(d=><option key={d} value={d}>{dataBR(d)}</option>)}</select></label>
            <button className="clear" onClick={limparFiltros} type="button">↻ Limpar filtros</button>
          </div>
          <div className="results-line"><strong>{filtrados.length} projeto{filtrados.length===1?'':'s'} encontrado{filtrados.length===1?'':'s'}</strong><span>Selecione um projeto para ver detalhes e avaliar</span></div>
          <div className="cards">{visiveis.map(p=><article className="project" key={p.id}>
            <div className="project-top"><span className={`project-icon ${p.modalidade==='Mostra de Extensão'?'extension':'national'}`} aria-hidden="true">{p.modalidade==='Mostra de Extensão'?'♧':'▣'}</span><div className="project-labels"><span className={`tag ${p.modalidade==='Mostra de Extensão'?'extension':'national'}`}>{p.modalidade}</span><span className="id">{p.id}</span></div></div>
            <h2>{p.titulo}</h2><p className="area">{p.area_tematica}</p><p className="small">{dataBR(p.data)} · {p.inicio}–{p.fim}</p>
            <div className="project-actions"><button onClick={()=>abrirProjeto(p)} className="outline">Ver detalhes →</button><button onClick={()=>abrirProjeto(p)} className="primary-action">Avaliar ↗</button></div>
          </article>)}</div>
          {filtrados.length===0&&<p className="empty">Nenhum projeto encontrado. Tente limpar os filtros ou alterar a busca.</p>}
          {filtrados.length>0&&<div className="pagination"><span>Exibindo {(pagina-1)*PAGE_SIZE+1}–{Math.min(pagina*PAGE_SIZE,filtrados.length)} de {filtrados.length} projetos</span><div className="pagination-buttons"><button disabled={pagina===1} onClick={()=>mudarPagina(pagina-1)} aria-label="Página anterior">‹</button>{Array.from({length:totalPaginas},(_,i)=>i+1).map(n=><button key={n} className={pagina===n?'current':''} onClick={()=>mudarPagina(n)} aria-label={`Página ${n}`} aria-current={pagina===n?'page':undefined}>{n}</button>)}<button disabled={pagina===totalPaginas} onClick={()=>mudarPagina(pagina+1)} aria-label="Próxima página">›</button></div></div>}
        </section>
        <p className="notice">Atividade acadêmica: as avaliações populares não representam julgamento científico nem resultado oficial do evento.</p>
      </>}</>:<section className="rank">
        <p className="eyebrow">UNIVERSO IF AVALIA</p><h1>Ranking popular indicativo</h1><p className="muted">As modalidades são classificadas separadamente. Projetos com menos de cinco avaliações aguardam amostra mínima.</p>
        <div className="segmented"><button className={rankModal==='Mostra Nacional'?'chosen':''} onClick={()=>abrirRanking('Mostra Nacional')}>Mostra Nacional</button><button className={rankModal==='Mostra de Extensão'?'chosen':''} onClick={()=>abrirRanking('Mostra de Extensão')}>Mostra de Extensão</button></div>
        {rankingUrl?<p><a className="primary" href={rankingUrl}>Abrir ranking atualizado ↗</a></p>:<p className="empty">Configure VITE_GAS_APP_URL para habilitar a consulta do ranking.</p>}
        <p className="muted">Desempate: maior média; depois maior quantidade de avaliações; persistindo empate, título em ordem alfabética. A classificação é indicativa e não representa prêmio do evento.</p>
      </section>}
    </main>
    <footer><span>Universo IF Avalia · Protótipo acadêmico</span><span>IFMA · 2026.2</span></footer>
    <nav className="bottom" aria-label="Navegação inferior"><button className={aba==='projetos'?'active':''} onClick={abrirCatalogo}>▦<span>Catálogo</span></button><button className={aba==='ranking'?'active':''} onClick={()=>abrirRanking(rankModal)}>▥<span>Ranking</span></button></nav>
  </div>
}