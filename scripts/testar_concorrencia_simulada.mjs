/**
 * Concorrência simulada: executa o Code.gs real em vários worker_threads,
 * com implementações controladas do LockService e de uma planilha em memória.
 * Não acessa a implantação Google Apps Script nem grava votos reais.
 *
 * IMPORTANTE: este teste não substitui a concorrência real no Apps Script.
 */
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';
import { Worker, isMainThread, parentPort, workerData } from 'node:worker_threads';

const CODE = 'CodigoFicticioConcorrencia00000000000001';
const HASH = createHash('sha256').update(CODE).digest('hex');
const NOTES = { criatividade: 4, clareza: 5, relevancia: 4, demonstracao: 3 };
const ID_PROJETO = 'NAC-001';
const HEADERS = [
  'id_requisicao', 'hash_codigo', 'id_projeto', 'criatividade', 'clareza',
  'relevancia', 'demonstracao', 'nota_ponderada', 'timestamp', 'estado'
];
const SCRIPT = readFileSync(new URL('../backend/Code.gs', import.meta.url), 'utf8');

function competir() {
  const shared = new Int32Array(workerData.shared);
  let savedRow;
  const synchronized = {
    waitLock(timeout) {
      const deadline = Date.now() + timeout;
      while (Atomics.compareExchange(shared, 0, 0, 1) !== 0) {
        const ms = deadline - Date.now();
        if (ms <= 0) throw new Error('Timeout ao adquirir lock simulado');
        Atomics.wait(shared, 0, 1, Math.min(ms, 100));
      }
      Atomics.add(shared, 4, 1);
    },
    releaseLock() {
      assert.equal(Atomics.load(shared, 0), 1);
      Atomics.store(shared, 0, 0);
      Atomics.add(shared, 5, 1);
      Atomics.notify(shared, 0, 1);
    }
  };

  const sheet = name => {
    if (name === 'Projetos') return {
      getDataRange: () => ({
        getValues: () => [['id', 'titulo', 'modalidade'], [ID_PROJETO, 'Projeto fictício', 'Mostra Nacional']]
      })
    };
    if (name === 'Codigos') return {
      getDataRange: () => ({ getValues: () => [['hash_codigo', 'habilitado'], [HASH, true]] })
    };
    if (name === 'Configuracao') return {
      getDataRange: () => ({ getValues: () => [['chave', 'valor'], ['votacao_aberta', true]] })
    };
    if (name === 'Avaliacoes') return {
      getDataRange: () => ({ getValues: () => {
        // Um atraso na seção crítica aumenta a chance de uma corrida
        // caso a implementação do LockService seja removida.
        Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, 5);
        const rows = [HEADERS];
        if (Atomics.load(shared, 1) > 0) rows.push([
          'pedido-primeiro-concorrente', HASH, ID_PROJETO, 4, 5, 4, 3, 4.15,
          new Date('2026-11-23T00:00:00Z'), 'VALIDA'
        ]);
        return rows;
      } }),
      appendRow: row => {
        savedRow = row;
        Atomics.add(shared, 1, 1);
      },
      getLastRow: () => Atomics.load(shared, 1) + 1,
      getRange: () => ({ getValues: () => [savedRow] })
    };
    throw new Error('Planilha inesperada: ' + name);
  };
  const env = {
    LockService: { getScriptLock: () => synchronized },
    SpreadsheetApp: {
      openById: () => ({ getSheetByName: sheet }),
      flush: () => {}
    },
    PropertiesService: { getScriptProperties: () => ({ getProperty: () => 'ficticio' }) },
    Utilities: {
      DigestAlgorithm: { SHA_256: 'SHA_256' },
      Charset: { UTF_8: 'UTF_8' },
      computeDigest: (_alg, text) => [...createHash('sha256').update(text).digest()]
    }
  };

  runInNewContext(SCRIPT + '\nthis.__teste = registrarAvaliacao;', env, { timeout: 5000 });
  Atomics.add(shared, 2, 1);
  Atomics.notify(shared, 2, 1);
  // Barreira: todos iniciam os pedidos praticamente juntos.
  Atomics.wait(shared, 3, 0, 10000);
  const requestId = 'pedido-concorrencia-' + String(workerData.index).padStart(4, '0');
  try {
    const result = env.__teste({ codigo: CODE, id_projeto: ID_PROJETO, id_requisicao: requestId, notas: NOTES });
    parentPort.postMessage({ outcome: 'received', status: result.status });
  } catch (error) {
    parentPort.postMessage({ outcome: 'rejected', reason: String(error.message || error) });
  }
}

async function rodada(index) {
  const total = 12;
  // [lock, numero de votos, workers prontos, inicio, locks adquiridos, locks liberados]
  const shared = new SharedArrayBuffer(Int32Array.BYTES_PER_ELEMENT * 6);
  const state = new Int32Array(shared);
  const jobs = Array.from({ length: total }, (_, i) => new Promise((resolve, reject) => {
    const worker = new Worker(new URL(import.meta.url), { workerData: { shared, index: index * total + i } });
    worker.once('message', resolve);
    worker.once('error', reject);
    worker.once('exit', code => { if (code !== 0) reject(new Error('Worker saiu com código ' + code)); });
  }));

  const deadline = Date.now() + 15000;
  while (Atomics.load(state, 2) < total && Date.now() < deadline) {
    await new Promise(resolve => setTimeout(resolve, 25));
  }
  assert.equal(Atomics.load(state, 2), total, 'Todos os workers devem estar prontos');
  Atomics.store(state, 3, 1);
  Atomics.notify(state, 3, total);

  const replies = await Promise.all(jobs);
  const received = replies.filter(r => r.outcome === 'received');
  const rejected = replies.filter(r => r.outcome === 'rejected');
  assert.equal(received.length, 1, 'Apenas um worker deve salvar voto');
  assert.equal(received[0].status, 'recebido');
  assert.equal(rejected.length, total - 1, 'Todos os outros devem receber erro');
  assert.ok(rejected.every(r => r.reason.includes('Este código já avaliou este projeto.')));
  assert.equal(Atomics.load(state, 1), 1, 'Deve persistir exatamente um voto');
  assert.equal(Atomics.load(state, 4), total, 'Todas as solicitações adquirem lock');
  assert.equal(Atomics.load(state, 5), total, 'Todas as solicitações liberam lock');
  assert.equal(Atomics.load(state, 0), 0, 'Lock deve estar liberado ao final');
  return { received: received.length, rejected: rejected.length };
}

if (isMainThread) {
  const rounds = [];
  for (let i = 0; i < 2; i++) rounds.push(await rodada(i));
  console.log('CONCORRÊNCIA SIMULADA: PASSOU. 2 rodadas, 24 tentativas, 2 votos aceitos (um por rodada), 22 duplicados rejeitados.');
  console.log('Ambiente: worker_threads + Code.gs + serviços Google simulados. Não é teste de concorrência da implantação oficial.');
} else {
  competir();
}
