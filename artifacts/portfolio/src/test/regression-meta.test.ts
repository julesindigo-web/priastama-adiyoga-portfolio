import * as fs from 'node:fs';
import * as path from 'node:path';
import { describe, expect, it } from 'vitest';

const ROOT = path.resolve(__dirname, '..', '..');
const REPO_ROOT = path.resolve(__dirname, '..', '..', '..', '..');

function read(rel: string): string {
  return fs.readFileSync(path.join(ROOT, rel), 'utf8');
}

function readRepo(rel: string): string {
  return fs.readFileSync(path.join(REPO_ROOT, rel), 'utf8');
}

describe('document metadata (regression)', () => {
  it('keeps SEO/OG/Twitter copy on the 8+ narrative with valid locale and images', () => {
    const html = read('index.html');
    expect(html).toMatch(/<html lang="id">/);
    expect(html).toMatch(/8\+ tahun/);
    expect(html).not.toMatch(/9\+/);
    expect(html).toMatch(/og:locale" content="id_ID"/);
    expect(html).toMatch(/og:image:width/);
    expect(html).toMatch(/Priastama Adiyoga — Specialist OHS Expert/);
  });

  it('loads exactly the used font weights with display=swap', () => {
    const html = read('index.html');
    expect(html).toMatch(/family=Cormorant\+Garamond:ital,wght@0,600;0,700;1,600;1,700/);
    expect(html).toMatch(/display=swap/);
    expect(html).toMatch(/family=Syne:wght@500;600;700;800/);
  });

  it('preloads above-the-fold brand assets', () => {
    const html = read('index.html');
    expect(html).toMatch(/rel="preload" as="image" href="\/photos\/royal-night-bg\.jpg"/);
    expect(html).toMatch(/rel="preload" as="image" href="\/brand-pa-nav\.png"/);
  });

  it('keeps person structured data coherent with the page', () => {
    const html = read('index.html');
    expect(html).toMatch(/"@type": "Person"/);
    expect(html).toMatch(/"name": "Priastama Adiyoga"/);
    expect(html).toMatch(/"jobTitle": "Specialist OHS Expert"/);
    expect(html).toMatch(/8\+ tahun HSE & K3L/);
  });

  it('keeps the PWA manifest on-brand with valid icon wiring', () => {
    const manifest = JSON.parse(read('public/manifest.json')) as {
      name: string;
      description: string;
      icons: Array<{ src: string }>;
    };
    expect(manifest.description).toMatch(/8\+ tahun/);
    expect(manifest.name).toMatch(/Priastama Adiyoga/);
    for (const icon of manifest.icons) {
      expect(
        fs.existsSync(path.join(ROOT, 'public', icon.src.replace(/^\//, ''))),
      ).toBe(true);
    }
  });

  it('keeps deployment headers covering brand and photo assets', () => {
    const vercel = readRepo('vercel.json');
    // Note: vercel.json stores the pattern JSON-escaped (\\.), so assert the
    // literal filename rather than the regex form.
    expect(vercel).toContain('brand-pa-nav');
    expect(vercel).toMatch(/photos\/\(\.\*\)/);
    expect(vercel).toMatch(/@workspace\/portfolio.*run build/);
  });

  it('keeps the offline shell caching the app entry points', () => {
    const sw = read('public/sw.js');
    expect(sw).toMatch(/priastama-hse-v\d/);
    expect(sw).toMatch(/\/index\.html/);
    expect(sw).toMatch(/\/manifest\.json/);
  });
});
