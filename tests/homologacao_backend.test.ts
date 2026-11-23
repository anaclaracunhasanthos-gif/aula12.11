import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';
import { describe, expect, it } from 'vitest';

// Homologacao isolada: executa o proprio backend/Code.gs com uma planilha em memoria.
// NUNCA chama a implantacao publica nem modifica dados reais de participantes.
type Notas = {
  criatividade: number;
  clareza: number;
  relevancia: number;
  demonstracao: number;
};
type Voto = {
  codigo: string;
  id_projeto: string;
  id_requisicao: string;
  notas: Notas;
};
type Valor = string | number | boolean | Date;
type Resposta = { status: string; id_requisicao: string; nota: number };
const CODIGO_FICTICIO = 'CodigoHomologacao000000000000000001';
const notas: Notas = { criatividade: 4, clareza: 5, relevancia: 4, demonstracao: 3 };

function ambienteDeHomologacao() {
  const hash = createHash('sha256').update(CODIGO_FICTICIO).digest('hex');
  const dados: Record<string, Valor[][]> = {
    Projetos: [
      ['id', 'titulo', 'modalidade', 'area_tematica', 'data', 'inicio', 'fim', 'formato', 'local'],
      ['NAC-001', 'Projeto ficticio um', 'Mostra Nacional', '', '', '', '', '', ''],
      ['NAC-002', 'Projeto ficticio dois', 'Mostra Nacional', '', '', '', '', '', '']
    ],
    Codigos: [
      ['hash_codigo', 'habilitado', 'criado_em'],
      [hash, true, new Date('2026-01-01T00:00:00Z')]
    ],
    Avaliacoes: [
      ['id_requisicao', 'hash_codigo', 'id_projeto', 'criatividade', 'clareza',
        'relevancia', 'demonstracao', 'nota_ponderada', 'timestamp', 'estado']
    ],
    Configuracao: [
      ['chave', 'valor'],
      ['votacao_aberta', 'true'],
      ['inicio', ''],
      ['fim', ''],
      ['minimo_ranking', '5']
    ]
  };

  const eventosLock: string[] = [];
  let lockAtivo = false;
  const conferirLock = () => {
    if (!lockAtivo) throw new Error('Acesso à planilha fora do LockService');
  };

  const sandbox: Record<string, unknown> = {
    LockService: {
      getScriptLock: () => ({
        waitLock: () => {
          if (lockAtivo) throw new Error('Lock já ocupado');
          lockAtivo = true;
          eventosLock.push('adquirido');
        },
        releaseLock: () => {
          conferirLock();
          eventosLock.push('liberado');
          lockAtivo = false;
        }
      })
    },
    PropertiesService: {
      getScriptProperties: () => ({ getProperty: () => 'planilha-ficticia' })
    },
    Utilities: {
      DigestAlgorithm: { SHA_256: 'SHA_256' },
      Charset: { UTF_8: 'UTF_8' },
      computeDigest: (_alg: string, value: string) =>
        [...createHash('sha256').update(value).digest()]
    },
    SpreadsheetApp: {
      openById: () => ({
        getSheetByName: (name: string) => {
          const linhas = dados[name];
          if (!linhas) throw new Error('Aba ausente: ' + name);
          return {
            getDataRange: () => ({
              getValues: () => {
                conferirLock();
                eventosLock.push('leitura');
                return linhas.map(row => [...row]);
              }
            }),
            appendRow: (row: Valor[]) => {
              conferirLock();
              eventosLock.push('gravação');
              linhas.push([...row]);
            },
            getLastRow: () => linhas.length,
            getRange: (row: number, col: number, height = 1, width = 1) => ({
              getValues: () => linhas.slice(row - 1, row - 1 + height)
                .map(line => line.slice(col - 1, col - 1 + width))
            })
          };
        }
      }),
      flush: () => {
        conferirLock();
        eventosLock.push('flush');
      }
    }
  };
  const source = readFileSync(new URL('../backend/Code.gs', import.meta.url), 'utf8');
  runInNewContext(source + '\nthis.__homologacao = { registrarAvaliacao };', sandbox, {
    timeout: 5000
  });
  const api = sandbox.__homologacao as {
    registrarAvaliacao: (voto: Voto) => Resposta;
  };
  return {
    registrar: api.registrarAvaliacao,
    avaliacoes: dados.Avaliacoes,
    eventosLock,
    lockEstaAtivo: () => lockAtivo
  };
}

function voto(id_requisicao: string, id_projeto = 'NAC-001'): Voto {
  return { codigo: CODIGO_FICTICIO, id_projeto, id_requisicao, notas };
}

describe('Homologacao do backend Google Apps Script em ambiente isolado', () => {
  it('registra a primeira avaliacao valida usando o proprio Code.gs', () => {
    const env = ambienteDeHomologacao();
    const resposta = env.registrar(voto('pedido-homologacao-0001'));
    expect(resposta.status).toBe('recebido');
    expect(resposta.nota).toBe(4.15);
    expect(env.avaliacoes).toHaveLength(2); // cabecalho e um voto
  });

  it('bloqueia o segundo voto com mesmo codigo e mesmo projeto', () => {
    const env = ambienteDeHomologacao();
    env.registrar(voto('pedido-homologacao-0001'));
    expect(() => env.registrar(voto('pedido-homologacao-0002')))
      .toThrow('Este código já avaliou este projeto.');
    expect(env.avaliacoes).toHaveLength(2);
  });

  it('permite o mesmo codigo em projetos diferentes', () => {
    const env = ambienteDeHomologacao();
    expect(env.registrar(voto('pedido-homologacao-0001', 'NAC-001')).status)
      .toBe('recebido');
    expect(env.registrar(voto('pedido-homologacao-0002', 'NAC-002')).status)
      .toBe('recebido');
    expect(env.avaliacoes).toHaveLength(3);
  });

  it('reenvio identico nao grava voto duplicado', () => {
    const env = ambienteDeHomologacao();
    const entrada = voto('pedido-homologacao-0001');
    expect(env.registrar(entrada).status).toBe('recebido');
    expect(env.registrar(entrada).status).toBe('ja_processada');
    expect(env.avaliacoes).toHaveLength(2);
  });
  it('mantém leitura e gravação protegidas pelo lock', () => {
    const env = ambienteDeHomologacao();
    env.registrar(voto('pedido-homologacao-0001'));
    const eventos = env.eventosLock;
    expect(eventos[0]).toBe('adquirido');
    expect(eventos).toContain('gravação');
    expect(eventos).toContain('flush');
    expect(eventos.at(-1)).toBe('liberado');
    expect(env.lockEstaAtivo()).toBe(false);
  });

  it('libera o lock quando uma tentativa duplicada é rejeitada', () => {
    const env = ambienteDeHomologacao();
    env.registrar(voto('pedido-homologacao-0001'));
    expect(() => env.registrar(voto('pedido-homologacao-0002')))
      .toThrow('Este código já avaliou este projeto.');
    expect(env.lockEstaAtivo()).toBe(false);
    expect(env.eventosLock.at(-1)).toBe('liberado');
    expect(env.avaliacoes).toHaveLength(2);
  });

});
