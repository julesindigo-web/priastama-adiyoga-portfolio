import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as fs from 'node:fs';
import * as path from 'node:path';
import { describe, expect, it } from 'vitest';

import Home from '@/pages/Home';
import NotFound from '@/pages/not-found';

const ROOT = path.resolve(__dirname, '..', '..');

function read(rel: string): string {
  return fs.readFileSync(path.join(ROOT, rel), 'utf8');
}

// ─── Task B: owner-ordered rebrand ───────────────────────────────────────────
// "HSE Manager" (incl. "Mining HSE Manager") and "SMKP Auditor"/"Auditor SMKP"
// become "Specialist OHS Expert" everywhere EXCEPT the protected
// employment-history role + its verbatim field caption in Experience.tsx,
// which stay byte-identical per the DO-NOT-TOUCH rule.
describe('rebrand to Specialist OHS Expert', () => {
  it('rewrites document metadata with a deduped title and jobTitle', () => {
    const html = read('index.html');
    expect(html).toContain(
      '<title>Priastama Adiyoga — Specialist OHS Expert · K3L Mining Safety</title>',
    );
    expect(html).toContain('"jobTitle": "Specialist OHS Expert"');
    // Dedupe: the new term appears in title/meta but never twice on one line.
    for (const line of html.split('\n')) {
      const hits = line.match(/Specialist OHS Expert/g) ?? [];
      expect(hits.length).toBeLessThanOrEqual(1);
    }
  });

  it('rewrites the PWA manifest description with a deduped term', () => {
    const manifest = JSON.parse(read('public/manifest.json')) as {
      description: string;
    };
    expect(manifest.description.startsWith('Specialist OHS Expert —')).toBe(
      true,
    );
    expect(manifest.description).not.toMatch(/HSE Manager|SMKP Auditor/);
  });

  it('renders the deduped hero roles without a redundant Specialist pair', () => {
    render(<Home />);
    expect(screen.getByText('Specialist OHS Expert')).toBeInTheDocument();
    expect(
      screen.getByText('SMKP Systems · OHS Compliance'),
    ).toBeInTheDocument();
    expect(screen.getByText('K3L Systems Leader')).toBeInTheDocument();
    expect(screen.queryByText('Mining HSE Manager')).toBeNull();
    expect(screen.queryByText('SMKP Auditor · OHS Specialist')).toBeNull();
  });

  it('renders the deduped About name card and alt text', () => {
    render(<Home />);
    expect(
      screen.getByText('Specialist OHS Expert · K3L'),
    ).toBeInTheDocument();
    expect(screen.queryByText('HSE Manager · SMKP Auditor · K3L')).toBeNull();
    const profile = document.querySelector(
      'img[src="/photos/profile.jpg"]',
    ) as HTMLImageElement | null;
    expect(profile?.alt).toBe(
      'Priastama Adiyoga — Specialist OHS Expert di site Kalimantan Timur',
    );
  });

  it('renders the rebranded Contact opportunity with no duplication', () => {
    render(<Home />);
    expect(
      screen.getByText('Specialist OHS Expert & Leadership K3L'),
    ).toBeInTheDocument();
    expect(screen.queryByText('HSE Manager & Leadership K3L')).toBeNull();
  });

  it('keeps the protected employment-history role byte-identical', () => {
    const experience = read('src/components/Experience.tsx');
    expect(experience).toContain(
      "role: 'HSE Coordinator / SMKP Auditor & Internal Auditor'",
    );
    render(<Home />);
    expect(
      screen.getByText('HSE Coordinator / SMKP Auditor & Internal Auditor'),
    ).toBeInTheDocument();
  });

  it('leaves no target phrase outside the protected history lines', () => {
    const files = [
      'index.html',
      'public/manifest.json',
      'src/components/Hero.tsx',
      'src/components/About.tsx',
      'src/components/Contact.tsx',
      'src/components/Skills.tsx',
      'src/components/Education.tsx',
      'src/components/Achievements.tsx',
      'src/pages/not-found.tsx',
    ];
    for (const file of files) {
      const src = read(file);
      expect(src).not.toMatch(/HSE Manager/);
      expect(src).not.toMatch(/SMKP Auditor/);
      expect(src).not.toMatch(/Auditor SMKP/);
      expect(src).not.toMatch(/Manajer HSE/i);
    }
  });
});

// ─── Task A: mobile source-inferred guards (320/360/390px, touch) ───────────
// jsdom cannot measure layout; these assert the structural guards that
// prevent the audited defects (tap sizes, drawer width/scroll/lock,
// wrapping, responsive tracking/padding).
describe('mobile guards (source-inferred)', () => {
  it('gives the brand mark and burger ~44px touch targets', () => {
    render(<Home />);
    const brand = screen.getByRole('button', {
      name: /kembali ke beranda portfolio hse/i,
    });
    expect(brand.style.minWidth).toBe('44px');
    expect(brand.style.minHeight).toBe('44px');
    const burger = screen.getByRole('button', { name: /buka menu navigasi/i });
    expect(burger.style.minWidth).toBe('44px');
    expect(burger.style.minHeight).toBe('44px');
  });

  it('constrains the drawer width, scrolls short viewports, and locks body scroll', async () => {
    const user = userEvent.setup();
    render(<Home />);
    await user.click(screen.getByRole('button', { name: /buka menu navigasi/i }));
    const drawer = screen.getByRole('dialog', { name: /menu navigasi hse/i });
    expect(drawer.className).toMatch(/max-w-\[85vw\]/);
    expect(drawer.className).toMatch(/overflow-y-auto/);
    expect(drawer.style.maxWidth).toBe('85vw');
    expect(document.body.style.overflow).toBe('hidden');
    await user.click(
      screen.getByRole('button', { name: /tutup menu navigasi/i }),
    );
    expect(document.body.style.overflow).toBe('');
  });

  it('lets the hero badge and drawer-era labels wrap instead of overflowing', () => {
    const hero = read('src/components/Hero.tsx');
    expect(hero).toMatch(/flexWrap: 'wrap'/);
    render(<Home />);
    const nav = screen.getByRole('navigation', { name: /navigasi utama/i });
    expect(nav).toBeInTheDocument();
  });

  it('keeps section labels on the shared rhythm with mobile-safe tracking', () => {
    const files = [
      'src/components/About.tsx',
      'src/components/Experience.tsx',
      'src/components/Skills.tsx',
      'src/components/Education.tsx',
      'src/components/Achievements.tsx',
      'src/components/Contact.tsx',
    ];
    for (const file of files) {
      const src = read(file);
      // Design-system rhythm is preserved (regression-brand-design relies on it).
      expect(src).toMatch(/tracking-\[0\.3em\]/);
      expect(src).toMatch(/width: 80, height: 2/);
      expect(src).toMatch(/mb-24 text-center/);
      // Mobile guard: tighter base tracking upgraded at sm+, plus wrapping.
      expect(src).toMatch(/sm:tracking-\[0\.3em\]/);
      expect(src).toMatch(/break-words/);
    }
  });

  it('lets timeline periods wrap inside narrow cards', () => {
    const experience = read('src/components/Experience.tsx');
    expect(experience).toMatch(/whiteSpace: 'normal'/);
    expect(experience).toMatch(/max-w-full/);
    expect(experience).toMatch(/pl-14 sm:pl-20/);
    render(<Home />);
    expect(screen.getByText('PT Sifang Mining Indonesia')).toBeInTheDocument();
  });

  it('uses mobile-first card padding that expands at sm+', () => {
    expect(read('src/components/Skills.tsx')).toMatch(/p-5 sm:p-8/);
    expect(read('src/components/Education.tsx')).toMatch(/p-5 sm:p-7/);
    expect(read('src/components/Achievements.tsx')).toMatch(/p-6 sm:p-8/);
    expect(read('src/components/Experience.tsx')).toMatch(/p-5 sm:p-7/);
  });

  it('breaks long contact labels instead of overflowing 320px cards', () => {
    expect(read('src/components/Contact.tsx')).toMatch(/overflowWrap: 'anywhere'/);
    render(<Home />);
    expect(screen.getByText('adiyoga.hse@gmail.com')).toBeInTheDocument();
  });

  it('keeps 404 shortcuts reachable with ~44px targets and wrapping', () => {
    render(<NotFound />);
    const exp = screen.getByRole('link', { name: 'Lihat Pengalaman' });
    const contact = screen.getByRole('link', { name: 'Hubungi K3L' });
    expect(exp.style.minHeight).toBe('44px');
    expect(contact.style.minHeight).toBe('44px');
    const cta = screen.getByRole('link', { name: /kembali ke beranda/i });
    expect(cta.className).toMatch(/max-w-full/);
  });

  it('clips page-level horizontal overflow as a safety net', () => {
    expect(read('src/index.css')).toMatch(/overflow-x: clip/);
  });

  it('keeps the reduced-motion path and lean canvas budgets intact', () => {
    const hero = read('src/components/Hero.tsx');
    expect(hero).toMatch(/prefersReduced/);
    expect(hero).toMatch(/isNarrow \? 90 : 140/);
    const css = read('src/index.css');
    expect(css).toMatch(/prefers-reduced-motion: reduce/);
    expect(css).toMatch(/\.hero-section canvas/);
  });
});
