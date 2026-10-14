import { render, screen } from '@testing-library/react';
import * as fs from 'node:fs';
import * as path from 'node:path';
import { describe, expect, it } from 'vitest';

import Home from '@/pages/Home';

const ROOT = path.resolve(__dirname, '..', '..');

function read(rel: string): string {
  return fs.readFileSync(path.join(ROOT, rel), 'utf8');
}

describe('experience claims (regression)', () => {
  it('states 8+ years everywhere and never the retired 9+ figure', () => {
    const tenureSources = [
      read('src/components/Hero.tsx'),
      read('src/components/About.tsx'),
      read('src/components/Contact.tsx'),
      read('index.html'),
      read('public/manifest.json'),
    ];
    for (const src of tenureSources) {
      expect(src).toMatch(/8\+/);
      expect(src).not.toMatch(/9\+/);
    }
    // Achievements carries the Aragon-scoped Zero-LTI claim and no tenure figure.
    expect(read('src/components/Achievements.tsx')).not.toMatch(/9\+/);
    expect(read('public/manifest.json')).toMatch(/8\+ tahun/);
  });

  it('renders the 8+ hero stat with zero-LTI and certification proof points', () => {
    render(<Home />);
    // Hero trio plus the About quad restate the same proof points.
    expect(screen.getAllByText('8+').length).toBeGreaterThanOrEqual(2);
    expect(screen.getAllByText('Tahun di HSE & K3L').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('LTI · Aragon 23–24').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('Sertifikasi K3').length).toBeGreaterThanOrEqual(1);
  });

  it('covers coal mining, coal hauling, and andesite mining in the narrative', () => {
    render(<Home />);
    const body = document.body.textContent ?? '';
    expect(body).toMatch(/coal mining/i);
    expect(body).toMatch(/coal hauling/i);
    expect(body).toMatch(/andesite mining/i);
  });

  it('keeps per-role durations honest (6-year site tenure, 30+ certifications)', () => {
    const experience = read('src/components/Experience.tsx');
    expect(experience).toMatch(/6 Tahun/);
    expect(experience).not.toMatch(/9\+ Tahun/);
    render(<Home />);
    expect(screen.getAllByText('30+').length).toBeGreaterThanOrEqual(2);
  });

  it('opens the timeline with the Sifang Safety Supervisor assignment', () => {
    const experience = read('src/components/Experience.tsx');
    expect(experience).toMatch(/PT Sifang Mining Indonesia/);
    expect(experience).toMatch(/Safety Supervisor/);
    expect(experience).toMatch(/Jul 2026 – Okt 2026/);
    // The retired 'Terkini' tag is gone from every entry.
    expect(experience).not.toMatch(/Terkini/);
    render(<Home />);
    expect(screen.getByText('PT Sifang Mining Indonesia')).toBeInTheDocument();
    expect(screen.queryByText('Terkini')).toBeNull();
  });

  it('keeps personal birth data out of the profile', () => {
    const about = read('src/components/About.tsx');
    expect(about).not.toMatch(/Born/);
    expect(about).not.toMatch(/1992/);
    render(<Home />);
    expect(screen.queryByText(/Born/)).toBeNull();
  });

  it('lists the current certification set including CAIA, APKPI and the POM validity', () => {
    const education = read('src/components/Education.tsx');
    expect(education).toMatch(/CAIA/);
    expect(education).toMatch(/APKPI/);
    expect(education).toMatch(/2029/);
    render(<Home />);
    expect(screen.getByText(/CAIA – Certified Auditor Internal Awareness/)).toBeInTheDocument();
    expect(screen.getByText(/APKPI Safety Sharing Session Batch 160/)).toBeInTheDocument();
    expect(screen.getByText(/Jul 2024 – Jul 2029/)).toBeInTheDocument();
  });
});
