import { fireEvent, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as fs from 'node:fs';
import * as path from 'node:path';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { Hero } from '@/components/Hero';
import { Achievements } from '@/components/Achievements';
import { HeartHandshake } from 'lucide-react';
import NotFound from '@/pages/not-found';
import Home from '@/pages/Home';

// Opsi B polish regression: focus trap, reduced-motion, brand alt,
// 404 shortcuts, and contact labels all carry observable behavior.

function openDrawer() {
  return screen.getByRole('dialog', { name: /menu navigasi hse/i });
}

describe('mobile drawer focus trap (polish)', () => {
  it('moves focus to the first drawer item on open', async () => {
    const user = userEvent.setup();
    render(<Home />);
    await user.click(screen.getByRole('button', { name: /buka menu navigasi/i }));
    const drawer = openDrawer();
    const first = within(drawer).getByRole('button', { name: 'About' });
    expect(document.activeElement).toBe(first);
  });

  it('wraps Tab from the last item back to the first', async () => {
    const user = userEvent.setup();
    render(<Home />);
    await user.click(screen.getByRole('button', { name: /buka menu navigasi/i }));
    const drawer = openDrawer();
    const first = within(drawer).getByRole('button', { name: 'About' });
    const last = within(drawer).getByRole('button', { name: 'Connect' });
    last.focus();
    fireEvent.keyDown(window, { key: 'Tab', shiftKey: false });
    expect(document.activeElement).toBe(first);
  });

  it('wraps Shift+Tab from the first item to the last', async () => {
    const user = userEvent.setup();
    render(<Home />);
    await user.click(screen.getByRole('button', { name: /buka menu navigasi/i }));
    const drawer = openDrawer();
    const first = within(drawer).getByRole('button', { name: 'About' });
    const last = within(drawer).getByRole('button', { name: 'Connect' });
    expect(document.activeElement).toBe(first);
    fireEvent.keyDown(window, { key: 'Tab', shiftKey: true });
    expect(document.activeElement).toBe(last);
  });

  it('leaves focus alone on a mid-list Tab', async () => {
    const user = userEvent.setup();
    render(<Home />);
    await user.click(screen.getByRole('button', { name: /buka menu navigasi/i }));
    const drawer = openDrawer();
    const mid = within(drawer).getByRole('button', { name: 'Skills' });
    mid.focus();
    fireEvent.keyDown(window, { key: 'Tab', shiftKey: false });
    expect(document.activeElement).toBe(mid);
  });

  it('returns focus to the burger when the drawer closes', async () => {
    const user = userEvent.setup();
    render(<Home />);
    const burger = screen.getByRole('button', { name: /buka menu navigasi/i });
    await user.click(burger);
    expect(openDrawer()).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: /tutup menu navigasi/i }));
    expect(document.activeElement).toBe(
      screen.getByRole('button', { name: /buka menu navigasi/i }),
    );
  });
});

describe('reduced-motion hero (polish)', () => {
  const originalMatchMedia = window.matchMedia;

  afterEach(() => {
    window.matchMedia = originalMatchMedia;
    vi.restoreAllMocks();
  });

  it('renders the static hero shell without the particle loop', () => {
    window.matchMedia = ((query: string) => ({
      matches: query === '(prefers-reduced-motion: reduce)',
      media: query,
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
      dispatchEvent: () => false,
    })) as unknown as typeof window.matchMedia;
    render(<Hero />);
    expect(document.querySelector('#hero canvas')).not.toBeNull();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/Adiyoga/);
  });
});

describe('polish content markers', () => {
  it('announces the brand artwork with a meaningful name', () => {
    render(<Home />);
    const nav = screen.getByRole('navigation', { name: /navigasi utama/i });
    const mark = nav.querySelector(
      'img[src="/brand-pa-nav.png"]',
    ) as HTMLImageElement | null;
    expect(mark?.alt).toBe('Priastama Adiyoga — Beranda portfolio HSE');
  });

  it('labels the two phone channels distinctly', () => {
    render(<Home />);
    expect(screen.getByText(/Kontak utama:/)).toBeInTheDocument();
    expect(screen.getByText(/Cadangan \/ WhatsApp:/)).toBeInTheDocument();
  });

  it('offers section shortcuts on the 404 page', () => {
    render(<NotFound />);
    expect(
      screen.getByRole('link', { name: 'Lihat Pengalaman' }),
    ).toHaveAttribute('href', '/#experience');
    expect(
      screen.getByRole('link', { name: 'Hubungi K3L' }),
    ).toHaveAttribute('href', '/#contact');
  });
});

const META_ROOT = path.resolve(__dirname, '..', '..');

function readMeta(rel: string): string {
  return fs.readFileSync(path.join(META_ROOT, rel), 'utf8');
}

describe('OG/canonical structured-data truthfulness (polish)', () => {
  it('serves the generated 1200×630 OG/Twitter card', () => {
    const html = readMeta('index.html');
    // og-image.jpg is generated at exactly 1200×630 (see gen_og.py) —
    // tags must state the shipped asset, never an ideal.
    expect(html).toMatch(
      /<meta property="og:image" content="https:\/\/priastama-adiyoga\.vercel\.app\/og-image\.jpg" \/>/,
    );
    expect(html).toMatch(
      /<meta name="twitter:image" content="https:\/\/priastama-adiyoga\.vercel\.app\/og-image\.jpg" \/>/,
    );
    expect(html).toMatch(/og:image:width" content="1200"/);
    expect(html).toMatch(/og:image:height" content="630"/);
  });

  it('declares og:url matching the canonical', () => {
    const html = readMeta('index.html');
    expect(html).toMatch(
      /<link rel="canonical" href="https:\/\/priastama-adiyoga\.vercel\.app\/" \/>/,
    );
    expect(html).toMatch(
      /<meta property="og:url" content="https:\/\/priastama-adiyoga\.vercel\.app\/" \/>/,
    );
  });

  it('keeps Person JSON-LD coherent with url/image/sameAs', () => {
    const html = readMeta('index.html');
    expect(html).toMatch(/"@type": "Person"/);
    expect(html).toMatch(
      /"url": "https:\/\/priastama-adiyoga\.vercel\.app\/"/,
    );
    expect(html).toMatch(
      /"image": "https:\/\/priastama-adiyoga\.vercel\.app\/og-image\.jpg"/,
    );
    expect(html).toMatch(/"inLanguage": "id"/);
    expect(html).toMatch(/linkedin\.com\/in\/priastama-adiyoga/);
  });
});

describe('one-page PDF profile (polish)', () => {
  it('ships a valid PDF wired to the Contact download link', () => {
    const pdf = path.join(META_ROOT, 'public', 'priastama-adiyoga-hse-profil.pdf');
    expect(fs.existsSync(pdf)).toBe(true);
    const head = fs.readFileSync(pdf).subarray(0, 5).toString('utf8');
    expect(head).toBe('%PDF-');
    render(<Home />);
    const link = screen.getByRole('link', { name: /unduh profil.*pdf/i });
    expect(link).toHaveAttribute('href', '/priastama-adiyoga-hse-profil.pdf');
    expect(link).toHaveAttribute('download');
  });
});

describe('WhatsApp prefilled CTA (polish)', () => {
  it('prefills a message without changing the number', () => {
    render(<Home />);
    const wa = screen.getByRole('link', { name: /whatsapp/i });
    const href = wa.getAttribute('href') ?? '';
    expect(href.startsWith('https://wa.me/6282213595760')).toBe(true);
    expect(href).toMatch(/\?text=.+/);
    // The visible channel label stays exactly as the owner approved it.
    expect(screen.getByText(/Cadangan \/ WhatsApp:/)).toBeInTheDocument();
  });
});

describe('role-named field captions (polish)', () => {
  it('derives captions from Experience roles only', () => {
    render(<Home />);
    expect(
      screen.getByText('Audit SMKP & Sistem K3L'),
    ).toBeInTheDocument();
    expect(
      screen.getByText('HSE Coordinator · SMKP Auditor & Internal Auditor'),
    ).toBeInTheDocument();
    expect(
      screen.getByText('Coal Mining & Coal Hauling'),
    ).toBeInTheDocument();
    expect(
      screen.getByText('Senior Safety Officer · Tabang–Senyiur'),
    ).toBeInTheDocument();
    expect(
      screen.getByText('Sistem K3L & Zero Accident'),
    ).toBeInTheDocument();
    expect(screen.getByText('Senior HSE Staff · Zero LTI')).toBeInTheDocument();
    // Generic placeholders are gone.
    expect(screen.queryByText('Pengawasan Site')).toBeNull();
    expect(screen.queryByText('Operasi Aktif')).toBeNull();
    expect(screen.queryByText('Inspeksi K3L Lapangan')).toBeNull();
  });
});

describe('English summary (polish)', () => {
  it('renders the finalized translation with lang="en" and no figures', () => {
    render(<Home />);
    const box = screen.getByRole('generic', {
      name: /english summary/i,
    });
    expect(box).toHaveAttribute('lang', 'en');
    expect(box).toHaveTextContent(/Zero-Accident culture/);
    // Final copy carries no DRAFT marker and no tenure/cert/phone figures.
    expect(box.textContent ?? '').not.toMatch(/DRAFT/);
    expect(box.textContent ?? '').not.toMatch(/\d+\+/);
    expect(box.textContent ?? '').not.toMatch(/\+62|\(\+62/);
  });
});

describe('card hierarchy (polish)', () => {
  it('gives the About stats list semantics like the Hero highlights', () => {
    render(<Home />);
    const list = screen.getByRole('list', { name: /profil singkat/i });
    expect(
      within(list).getAllByRole('listitem'),
    ).toHaveLength(4);
  });
});

describe('field photography (polish)', () => {
  it('ships the wired field photos on disk within the size budget', () => {
    for (const file of ['emergency-drill.jpg', 'safety-patrol-pit.jpg']) {
      const disk = path.join(META_ROOT, 'public/photos', file);
      expect(fs.existsSync(disk)).toBe(true);
      expect(fs.statSync(disk).size).toBeLessThanOrEqual(307200);
    }
  });

  it('renders the drill and pit-patrol photos with meaningful alts', () => {
    render(<Home />);
    const drill = document.querySelector(
      'img[src="/photos/emergency-drill.jpg"]',
    ) as HTMLImageElement | null;
    expect(drill).not.toBeNull();
    expect(drill?.alt.length ?? 0).toBeGreaterThan(8);
    expect(drill?.getAttribute('loading')).toBe('lazy');
    const patrol = document.querySelector(
      'img[src="/photos/safety-patrol-pit.jpg"]',
    ) as HTMLImageElement | null;
    expect(patrol).not.toBeNull();
    expect(patrol?.alt.length ?? 0).toBeGreaterThan(8);
    expect(patrol?.getAttribute('loading')).toBe('lazy');
  });

  it('falls back to the gradient fill when a card has no photo', () => {
    render(
      <Achievements
        items={[
          {
            Icon: HeartHandshake,
            title: 'Fallback tanpa foto',
            subtitle: 'Uji',
            color: '#c8a84a',
            gradient:
              'linear-gradient(135deg, rgba(200,168,74,0.1), rgba(200,168,74,0.02))',
            border: 'rgba(200,168,74,0.22)',
            photo: null,
            description: 'Cabang fallback untuk kartu tanpa foto.',
          },
        ]}
      />,
    );
    expect(screen.getByText('Fallback tanpa foto')).toBeInTheDocument();
    expect(document.querySelector('img')).toBeNull();
  });
});
