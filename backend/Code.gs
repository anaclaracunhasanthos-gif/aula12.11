/** Universo IF Avalia — Apps Script. Configure SPREADSHEET_ID nas propriedades do script. */
const SHEETS = { projetos:'Projetos', codigos:'Codigos', avaliacoes:'Avaliacoes', config:'Configuracao' };
const CRITERIA = ['criatividade','clareza','relevancia','demonstracao'];
const WEIGHTS = [0.30,0.30,0.25,0.15];
function doGet(e) {
  const page = (e && e.parameter && e.parameter.page) || '';
  if (page === 'avaliar') return renderPage_('Vote', 'Avaliar projeto', e.parameter.id || '');
  if (page === 'ranking') return renderPage_('Ranking', 'Ranking popular');
  if (e && e.parameter && e.parameter.action === 'ranking') {
    const results = getPublicRanking_(e.parameter.modalidade || 'Mostra Nacional');
    return ContentService.createTextOutput(JSON.stringify({ resultados: results })).setMimeType(ContentService.MimeType.JSON);
  }
  return renderPage_('Home', 'Universo IF Avalia');
}
function doPost(e) { // endpoint técnico; interface recomendada usa google.script.run
  try { const payload = JSON.parse((e.postData && e.postData.contents) || '{}'); return json_({ok:true, recibo: registrarAvaliacao(payload)}); }
  catch(err) { return json_({ok:false, erro:String(err.message || err)}); }
}
function renderPage_(file,title,projectId){const t=HtmlService.createTemplateFromFile(file);t.title=title;t.projectId=projectId||'';return t.evaluate().setTitle(title).addMetaTag('viewport','width=device-width, initial-scale=1');}
function include_(name){return HtmlService.createHtmlOutputFromFile(name).getContent();}
function setupPlanilha_(){
 const ss=SpreadsheetApp.openById(prop_('SPREADSHEET_ID'));
 const defs={Projetos:['id','titulo','modalidade','area_tematica','data','inicio','fim','formato','local'],Codigos:['hash_codigo','habilitado','criado_em'],Avaliacoes:['id_requisicao','hash_codigo','id_projeto','criatividade','clareza','relevancia','demonstracao','nota_ponderada','timestamp','estado'],Configuracao:['chave','valor']};
 Object.keys(defs).forEach(n=>{let sh=ss.getSheetByName(n)||ss.insertSheet(n);sh.clear();sh.getRange(1,1,1,defs[n].length).setValues([defs[n]]);sh.setFrozenRows(1);});
 const catalog=JSON.parse(UrlFetchApp.fetch(prop_('CATALOGO_JSON_URL')).getContentText());
 const rows=catalog.projetos.map(p=>[p.id,p.titulo,p.modalidade,p.area_tematica,p.data,p.inicio,p.fim,p.formato,p.local]);
 ss.getSheetByName(SHEETS.projetos).getRange(2,1,rows.length,rows[0].length).setValues(rows);
 ss.getSheetByName(SHEETS.config).getRange(2,1,5,2).setValues([['votacao_aberta','false'],['inicio',''],['fim',''],['catalogo_versao','1.0'],['minimo_ranking','5']]);
 return 'Planilha inicializada: 46 projetos.';
}
function registrarAvaliacao(payload){
 if(!payload || typeof payload.id_requisicao!=='string' || !/^[a-zA-Z0-9-]{16,80}$/.test(payload.id_requisicao) || typeof payload.codigo!=='string' || !/^[a-zA-Z0-9]{32,128}$/.test(payload.codigo.trim()) || typeof payload.id_projeto!=='string' || !/^(NAC|EXT)-\d{3}$/.test(payload.id_projeto) || typeof payload.notas!=='object') throw new Error('Dados incompletos ou inválidos.');
 const lock=LockService.getScriptLock();lock.waitLock(20000);
 try {
  const ss=SpreadsheetApp.openById(prop_('SPREADSHEET_ID'));const cfg=readConfig_(ss);
  if(cfg.votacao_aberta!=='true')throw new Error('Votação fechada.');
  const now=new Date();
  if(cfg.inicio && new Date(cfg.inicio)>now)throw new Error('A votação ainda não começou.');
  if(cfg.fim && new Date(cfg.fim)<now)throw new Error('O período de votação terminou.');
  const notas=payload.notas;const vals=CRITERIA.map(k=>notas[k]);
  vals.forEach(v=>{if(!Number.isInteger(v)||v<1||v>5)throw new Error('Todas as notas devem ser inteiros de 1 a 5.');});
  const projects=ss.getSheetByName(SHEETS.projetos).getDataRange().getValues();
  if(!projects.slice(1).some(r=>r[0]===payload.id_projeto))throw new Error('Projeto inexistente.');
  const hash=sha256_(String(payload.codigo).trim());const codes=ss.getSheetByName(SHEETS.codigos).getDataRange().getValues();
  const authorized=codes.slice(1).some(r=>r[0]===hash && String(r[1]).toLowerCase()==='true');if(!authorized)throw new Error('Código inválido ou desabilitado.');
  const votes=ss.getSheetByName(SHEETS.avaliacoes);const all=votes.getDataRange().getValues();
  const prior=all.slice(1).find(r=>r[0]===payload.id_requisicao);
  if(prior){
    if(prior[1]!==hash||prior[2]!==payload.id_projeto)throw new Error('ID de requisição já utilizado com outro envio.');
    return {status:'ja_processada',id_requisicao:payload.id_requisicao,nota:Number(prior[7])};
  }
  if(all.slice(1).some(r=>r[1]===hash&&r[2]===payload.id_projeto&&r[9]==='VALIDA'))throw new Error('Este código já avaliou este projeto.');
  const score=+(vals[0]*WEIGHTS[0]+vals[1]*WEIGHTS[1]+vals[2]*WEIGHTS[2]+vals[3]*WEIGHTS[3]).toFixed(2);
  votes.appendRow([payload.id_requisicao,hash,payload.id_projeto,...vals,score,new Date(),'VALIDA']);
  SpreadsheetApp.flush();
  const last=votes.getLastRow();const saved=votes.getRange(last,1,1,10).getValues()[0];
  if(saved[0]!==payload.id_requisicao||saved[1]!==hash||saved[2]!==payload.id_projeto)throw new Error('Não foi possível confirmar a gravação.');
  return {status:'recebido',id_requisicao:payload.id_requisicao,id_projeto:payload.id_projeto,nota:score,registrado_em:saved[8].toISOString()};
 } finally {lock.releaseLock();}
}
function getPublicRanking_(modalidade){
 if(!['Mostra Nacional','Mostra de Extensão'].includes(modalidade))throw new Error('Modalidade inválida.');
 const ss=SpreadsheetApp.openById(prop_('SPREADSHEET_ID'));
 const config=readConfig_(ss);const min=Math.max(1,Math.min(100,Number(config.minimo_ranking)||5));
 const projects=ss.getSheetByName(SHEETS.projetos).getDataRange().getValues().slice(1);
 const votes=ss.getSheetByName(SHEETS.avaliacoes).getDataRange().getValues().slice(1).filter(r=>r[9]==='VALIDA');
 const result=projects.filter(p=>p[2]===modalidade).map(p=>{
  const v=votes.filter(x=>x[2]===p[0]);const eligible=v.length>=min;
  const avg=i=>v.length?+(v.reduce((s,x)=>s+Number(x[i]),0)/v.length).toFixed(2):0;
  return {id_projeto:p[0],titulo:p[1],modalidade:p[2],media:eligible?avg(7):null,total:v.length,
   medias_criterios:eligible?{criatividade:avg(3),clareza:avg(4),relevancia:avg(5),demonstracao:avg(6)}:null,
   posicao:null,amostra_minima:min,atualizado_em:new Date().toISOString()};
 });
 result.sort((a,b)=>Number(b.media!==null)-Number(a.media!==null)||
  ((b.media??0)-(a.media??0))||b.total-a.total||a.titulo.localeCompare(b.titulo,'pt-BR'));
 let rank=0;result.forEach(x=>{if(x.media!==null)x.posicao=++rank;});return result;
}
function emitirCodigos_(quantidade){if(!Number.isInteger(quantidade)||quantidade<1||quantidade>5000)throw new Error('Quantidade inválida (1–5000).');const ss=SpreadsheetApp.openById(prop_('SPREADSHEET_ID'));const sh=ss.getSheetByName(SHEETS.codigos);const out=[];for(let i=0;i<quantidade;i++){const token=Utilities.getUuid().replace(/-/g,'')+Utilities.getUuid().replace(/-/g,'');out.push([sha256_(token),true,new Date()]);}sh.getRange(sh.getLastRow()+1,1,out.length,3).setValues(out);return 'Códigos gerados e hashes gravados. Para distribuir tokens individuais, execute emitirCodigosExportacao_(quantidade) e guarde o retorno fora do repositório.';}
function emitirCodigosExportacao_(quantidade){if(!Number.isInteger(quantidade)||quantidade<1||quantidade>100)throw new Error('Use 1–100 por lote.');const ss=SpreadsheetApp.openById(prop_('SPREADSHEET_ID'));const sh=ss.getSheetByName(SHEETS.codigos);const rows=[],plain=[];for(let i=0;i<quantidade;i++){const token=Utilities.getUuid().replace(/-/g,'')+Utilities.getUuid().replace(/-/g,'');rows.push([sha256_(token),true,new Date()]);plain.push(token);}sh.getRange(sh.getLastRow()+1,1,rows.length,3).setValues(rows);return plain;}
function getRankingForUi(modalidade){return getPublicRanking_(modalidade);}
function submitVote(payload){return registrarAvaliacao(payload);}
function getProjectForUi(id){const ss=SpreadsheetApp.openById(prop_('SPREADSHEET_ID'));const rows=ss.getSheetByName(SHEETS.projetos).getDataRange().getValues();const p=rows.slice(1).find(r=>r[0]===id);if(!p)throw new Error('Projeto não encontrado.');return {id:p[0],titulo:p[1],modalidade:p[2],area:p[3]};}
function readConfig_(ss){const rows=ss.getSheetByName(SHEETS.config).getDataRange().getValues();const o={};rows.slice(1).forEach(r=>o[r[0]]=String(r[1]));return o;}
function prop_(k){const v=PropertiesService.getScriptProperties().getProperty(k);if(!v)throw new Error('Configure a propriedade '+k+'.');return v;}
function sha256_(s){return Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256,s,Utilities.Charset.UTF_8).map(b=>('0'+(b&255).toString(16)).slice(-2)).join('');}
function json_(o){return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON);}
