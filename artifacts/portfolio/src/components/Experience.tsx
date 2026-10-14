import { motion } from 'framer-motion';

const experiences = [
  {
    company: 'PT Sifang Mining Indonesia',
    role: 'Safety Supervisor',
    period: 'Jul 2026 – Okt 2026',
    tag: null,
    tagColor: '#c8a84a',
    color: '#c8a84a',
    description: [
      'Membangun Safety Management System dari nol untuk perusahaan yang baru memasuki sektor pertambangan',
      'Menyusun prosedur K3, HIRADC, dan ERP sesuai regulasi',
      'Pengawasan K3 lapangan harian, investigasi insiden, dan induksi K3',
    ],
  },
  {
    company: 'PT. Sungai Berlian Mahakam',
    role: 'HSE Coordinator / SMKP Auditor & Internal Auditor',
    period: 'Jan 2025 – Nov 2025',
    tag: null,
    tagColor: '#7ab8ff',
    color: '#7ab8ff',
    description: [
      'Mengembangkan dan meningkatkan sistem manajemen K3L di seluruh wilayah IUP',
      'Menyusun pelaporan K3L berbasis data untuk Direktur MSED',
      'Mengkoordinasikan perencanaan personel HSE lintas seluruh operasi IUP',
      'Memastikan kepatuhan regulasi pertambangan di seluruh perusahaan',
    ],
  },
  {
    company: 'PT. Batara Dharma Persada',
    role: 'Senior Safety Officer',
    period: 'Sep 2024 – Jan 2025',
    tag: null,
    tagColor: '#c8a84a',
    color: '#c8a84a',
    description: [
      'Membangun Safety Management System lengkap dari nol untuk proyek coal mining dan coal hauling Tabang–Senyiur Bayan Group',
      'Mempertahankan operasi tanpa insiden di lingkungan subkontraktor high-risk',
    ],
  },
  {
    company: 'PT. Aragon Tambang Pratama',
    role: 'Senior HSE Staff',
    period: 'Sep 2023 – Jul 2024',
    tag: 'Zero LTI',
    tagColor: '#7ab8ff',
    color: '#c8a84a',
    description: [
      'Merancang dan menerapkan Sistem Manajemen K3L lengkap dari nol',
      'Mencapai Zero Accident dan tanpa LTI selama seluruh durasi proyek',
      'Nol temuan mayor pada audit eksternal',
    ],
  },
  {
    company: 'PT. Bara Tabang – Bayan Resources Group',
    role: 'Safety Foreman, Systems & Compliance',
    period: 'Jul 2017 – Jun 2023',
    tag: '6 Tahun · Penghargaan',
    tagColor: '#c8a84a',
    color: '#c8a84a',
    description: [
      'Mengelola dokumentasi keselamatan end-to-end di salah satu site coal mining terbesar Indonesia',
      'Mempertahankan 100% SOP aktual di seluruh site selama 6 tahun',
      'Membangun dan mempertahankan budaya Zero Accident lintas siklus operasi',
      'Penghargaan Ketua Panitia Terbaik — Bulan K3 Nasional 2023 oleh PT. Bayan Resources Tabang',
    ],
  },
];

// Captions name the responsible role function using only vocabulary already
// present in the `experiences` roles/tags/descriptions above — they describe
// the HSE function, not the provenance of the illustrative photo.
const fieldPhotos = [
  { src: '/photos/mining-inspection.jpg', caption: 'Audit SMKP & Sistem K3L',      sub: 'HSE Coordinator · SMKP Auditor & Internal Auditor' },
  { src: '/photos/mining-panorama.jpg',   caption: 'Coal Mining & Coal Hauling',   sub: 'Senior Safety Officer · Tabang–Senyiur' },
  { src: '/photos/safety-patrol-pit.jpg', caption: 'Sistem K3L & Zero Accident',   sub: 'Senior HSE Staff · Zero LTI' },
];

export function Experience() {
  return (
    <section id="experience" className="py-36 relative overflow-hidden" style={{ background: '#04101e' }}>
      {/* Background grid */}
      <div className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(200,168,74,0.022) 1px,transparent 1px),linear-gradient(90deg,rgba(200,168,74,0.022) 1px,transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(200,168,74,0.04) 0%, transparent 65%)', filter: 'blur(60px)' }} />

      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-24 text-center"
        >
          <span className="text-xs tracking-[0.3em] uppercase font-semibold mb-4 block" style={{ color: '#c8a84a', fontFamily: 'Inter, sans-serif' }}>
            — Linimasa Karier K3L —
          </span>
          <h2 className="font-heading font-bold tracking-tight" style={{ fontSize: 'clamp(2rem,5vw,3.5rem)', color: '#eef2ff' }}>
            Jejak Profesional HSE
          </h2>
          <div className="mt-4 mx-auto" style={{ width: 80, height: 2, background: 'linear-gradient(90deg,#c8a84a,#2a7fff)' }} />
        </motion.div>

        {/* Field photo strip */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-20"
        >
          {fieldPhotos.map((photo, i) => (
            <div
              key={i}
              className="group relative rounded-2xl overflow-hidden cursor-default"
              style={{ aspectRatio: '16/10', border: '1px solid rgba(200,168,74,0.1)' }}
            >
              <img
                src={photo.src}
                srcSet={`${photo.src} 640w`}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
                alt={`${photo.caption} — dokumentasi HSE di site tambang`}
                loading="lazy"
                decoding="async"
                width={640}
                height={400}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                // Shared "site/field" grade (matches the About Kalimantan photo):
                // desaturated + dimmed so gold/blue overlays and captions hold
                // contrast. Portrait (About profile) stays natural; Achievement
                // cards keep their darker text-legibility overlay by design.
                style={{ filter: 'grayscale(25%) brightness(0.68) saturate(1.1)' }}
              />
              <div
                className="absolute inset-0 transition-opacity duration-300"
                style={{ background: 'linear-gradient(to top, rgba(4,16,30,0.92) 0%, rgba(4,16,30,0.18) 60%, transparent 100%)' }}
              />
              <div className="absolute top-0 left-0 right-0 h-px"
                style={{ background: 'linear-gradient(90deg,transparent,rgba(200,168,74,0.5),transparent)' }} />
              <div className="absolute bottom-3 left-4 right-4">
                <div className="font-heading font-semibold text-sm" style={{ color: '#eef2ff' }}>{photo.caption}</div>
                <div className="text-xs mt-0.5" style={{ color: 'rgba(210,225,255,0.70)', fontFamily: 'Inter, sans-serif' }}>{photo.sub}</div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          <div
            className="absolute left-6 md:left-8 top-0 bottom-0 w-px"
            style={{ background: 'linear-gradient(to bottom, rgba(200,168,74,0.55), rgba(42,127,255,0.28), transparent)' }}
          />

          <div className="space-y-12">
            {experiences.map((exp, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.7, delay: i * 0.08 }}
                className="relative pl-20 md:pl-24 group"
              >
                {/* Dot */}
                <div
                  className="absolute left-4 md:left-6 top-6 -translate-x-1/2 w-5 h-5 rounded-full flex items-center justify-center"
                  style={{ background: '#04101e', border: `2px solid ${exp.color}` }}
                >
                  <div className="w-2 h-2 rounded-full" style={{ background: exp.color, boxShadow: `0 0 10px ${exp.color}` }} />
                </div>

                {/* Card */}
                <div
                  className="relative rounded-2xl p-7 overflow-hidden transition-all duration-500 group-hover:-translate-y-0.5"
                  style={{
                    background: 'rgba(238,242,255,0.022)',
                    border: '1px solid rgba(238,242,255,0.07)',
                    backdropFilter: 'blur(10px)',
                  }}
                >
                  <div
                    className="absolute left-0 top-0 bottom-0 w-0.5 rounded-l-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ background: `linear-gradient(to bottom, ${exp.color}, transparent)` }}
                  />
                  <div
                    className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ background: `linear-gradient(90deg, transparent, ${exp.color}60, transparent)` }}
                  />

                  <div className="relative z-10">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 mb-4">
                      <div>
                        <div className="flex items-center gap-3 flex-wrap mb-1">
                          <h3 className="font-heading font-bold text-xl leading-tight" style={{ color: '#eef2ff' }}>{exp.company}</h3>
                          {exp.tag && (
                            <span
                              className="text-xs font-bold tracking-widest uppercase px-2.5 py-1 rounded-full"
                              style={{
                                background: `${exp.tagColor}18`,
                                color: exp.tagColor,
                                border: `1px solid ${exp.tagColor}40`,
                                fontFamily: 'Inter, sans-serif',
                              }}
                            >
                              {exp.tag}
                            </span>
                          )}
                        </div>
                        <h4 className="font-medium text-base" style={{ color: '#7ab8ff', fontFamily: 'Inter, sans-serif' }}>{exp.role}</h4>
                      </div>
                      <div
                        className="text-xs font-mono font-semibold tracking-wider shrink-0 px-3 py-1.5 rounded-lg"
                        style={{
                          background: 'rgba(200,168,74,0.08)',
                          color: '#c8a84a',
                          border: '1px solid rgba(200,168,74,0.2)',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {exp.period}
                      </div>
                    </div>

                    <ul className="space-y-2.5">
                      {exp.description.map((item, j) => (
                        <li
                          key={j}
                          className="flex items-start gap-3 text-sm leading-relaxed"
                          style={{ color: 'rgba(216,228,252,0.82)', fontFamily: 'Inter, sans-serif' }}
                        >
                          <span className="mt-1.5 shrink-0 w-1 h-1 rounded-full" style={{ background: exp.color }} />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
