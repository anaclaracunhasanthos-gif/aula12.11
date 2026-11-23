import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

// Verificação estática de pontos críticos: não substitui leitor de tela ou
// auditoria manual no navegador.
const read = (path: string) => readFileSync(new URL(path, import.meta.url), 'utf8');
const frontend = read('../src/style.css');
const app = read('../src/App.tsx');
const styles = read('../backend/Styles.html');
const client = read('../backend/Client.html');
const vote = read('../backend/Vote.html');
const ranking = read('../backend/Ranking.html');

function contrast(foreground: string, background: string): number {
  const luma = (hex: string) => {
    const nums = [1, 3, 5].map(i => parseInt(hex.slice(i, i + 2), 16) / 255);
    const linear = nums.map(x => x <= 0.04045 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4);
    return 0.2126 * linear[0] + 0.7152 * linear[1] + 0.0722 * linear[2];
  };
  const a = luma(foreground), b = luma(background);
  return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
}

function colorWithin(stylesheet: string, selector: string): string {
  const idx = stylesheet.indexOf(selector + '{');
  if (idx < 0) throw new Error('Seletor ausente: ' + selector);
  const block = stylesheet.slice(idx + selector.length + 1).split('}')[0];
  const color = block.match(/(?:^|;)color:(#[a-f0-9]{6})/i)?.[1];
  if (!color) throw new Error('Cor ausente: ' + selector);
  return color;
}

describe('Acessibilidade estática dos arquivos de desenvolvimento', () => {
  it('mantém contraste mínimo 4,5:1 em textos pequenos do catálogo', () => {
    const samples: [string, string][] = [
      ['.id', '#ffffff'],
      ['.meta dt', '#ffffff'],
      ['.rank-info small', '#ffffff'],
      ['.empty', '#ffffff'],
      ['footer', '#eaf0f6'],
      ['.tabs button,.segmented button', '#f4f7fb'],
      ['.eyebrow', '#f4f7fb'],
    ];
    for (const [selector, background] of samples) {
      expect(contrast(colorWithin(frontend, selector), background), selector).toBeGreaterThanOrEqual(4.5);
    }
    expect(contrast(colorWithin(styles, '.rank small'), '#ffffff')).toBeGreaterThanOrEqual(4.5);
  });

  it('agrupa semanticamente cada critério e as cinco notas', () => {
    expect(client).toContain('<fieldset class="criterion"><legend>${l} (${w})</legend>');
    expect(client).toContain('</div></fieldset>');
    expect(client).toContain('type="radio"');
    expect(client).toContain('required');
    expect(styles).toContain('.options label{display:flex;align-items:center;gap:8px;font-weight:400;min-width:44px;min-height:44px');
  });

  it('anuncia carregamento, confirmação e mudanças de contagem', () => {
    expect(vote).toContain('id="message" role="status" aria-live="polite" aria-atomic="true"');
    expect(ranking).toContain('id="results" role="status" aria-live="polite"');
    expect(app).toContain('className="count" role="status" aria-live="polite"');
  });

  it('identifica estados ativos da navegação e seletor de modalidade', () => {
    expect(app).toContain("aria-current={aba==='projetos'?'page':undefined}");
    expect(app).toContain("aria-current={aba==='ranking'?'page':undefined}");
    expect(app).toContain("aria-pressed={rankModal==='Mostra Nacional'}");
    expect(app).toContain("aria-pressed={rankModal==='Mostra de Extensão'}");
  });

  it('mantém foco visível no formulário e preserva os destinos oficiais', () => {
    expect(styles).toContain('select:focus-visible,a:focus-visible');
    expect(vote).toContain('https://anaclaracunhasanthos-gif.github.io/aula12.11/');
    expect(ranking).toContain('https://anaclaracunhasanthos-gif.github.io/aula12.11/');
  });
});
