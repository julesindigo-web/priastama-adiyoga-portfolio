import { motion } from 'framer-motion';
import { GraduationCap, Scale, BadgeCheck } from 'lucide-react';

const certs = [
  { name: 'Ahli K3 Pertambangan', org: 'BNSP', date: '', featured: true },
  { name: 'ISMKP — Sistem Manajemen Keselamatan Pertambangan', org: 'PPSDM Geominerba (ESDM)', date: 'Jan 2023', featured: false },
  { name: 'Pengawas Operasional Madya (POM)', org: 'BNSP', date: 'Jul 2024 – Jul 2029', featured: false },
  { name: 'Safety & Environment Training', org: 'Exagama Merapi Sertifikasi', date: 'Okt 2023', featured: false },
  { name: 'HIRADC & Risk Assessment', org: 'Exagama Merapi Sertifikasi', date: 'Okt 2023', featured: false },
  { name: 'Incident Investigation', org: 'Exagama Merapi Sertifikasi', date: 'Okt 2023', featured: false },
  { name: 'Emergency Response Plan', org: 'Exagama Merapi Sertifikasi', date: 'Okt 2023', featured: false },
  { name: 'Contractor Safety Management (CSMS)', org: 'Exagama Merapi Sertifikasi', date: 'Okt 2023', featured: false },
  { name: 'Behavior Based Safety', org: 'Exagama Merapi Sertifikasi', date: 'Okt 2023', featured: false },
  { name: 'Sistem Manajemen Lingkungan', org: 'Exagama Merapi Sertifikasi', date: 'Okt 2023', featured: false },
  { name: 'CAIA – Certified Auditor Internal Awareness', org: 'ESAS Management', date: 'Nov 2025', featured: false },
  { name: 'APKPI Safety Sharing Session Batch 160', org: 'APKPI', date: 'Sep 2026', featured: false },
];

const degrees = [
  {
    year: '2011–2015',
    title: 'Sarjana Hukum (S.H.)',
    subtitle: 'Fondasi Kepatuhan K3L',
    institution: 'Universitas 17 Agustus 1945 Samarinda',
    color: '#c8a84a',
    Icon: GraduationCap,
  },
  {
    year: '2017',
    title: 'Lulus Ujian Profesi Advokat',
    subtitle: 'PERADI · 2017',
    institution: 'Perhimpunan Advokat Indonesia',
    color: '#7ab8ff',
    Icon: Scale,
  },
];

export function Education() {
  return (
    <section id="education" className="py-36 relative overflow-hidden" style={{ background: '#04101e' }}>
      {/* Grid */}
      <div className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(42,127,255,0.022) 1px,transparent 1px),linear-gradient(90deg,rgba(42,127,255,0.022) 1px,transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(42,127,255,0.05) 0%, transparent 65%)', filter: 'blur(60px)' }} />

      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-24 text-center"
        >
          <span className="text-xs tracking-[0.18em] sm:tracking-[0.3em] uppercase font-semibold mb-4 block break-words" style={{ color: '#7ab8ff', fontFamily: 'Inter, sans-serif' }}>
            — Akademik & Kredensial K3L —
          </span>
          <h2 className="font-heading font-bold tracking-tight" style={{ fontSize: 'clamp(2rem,5vw,3.5rem)', color: '#eef2ff' }}>
            Kredensial & Pendidikan K3
          </h2>
          <div className="mt-4 mx-auto" style={{ width: 80, height: 2, background: 'linear-gradient(90deg,#c8a84a,#2a7fff)' }} />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Degrees */}
          <div className="lg:col-span-5 space-y-5">
            <h3
              className="text-xs tracking-[0.25em] uppercase font-semibold mb-8"
              style={{ color: 'rgba(216,228,252,0.70)', fontFamily: 'Inter, sans-serif' }}
            >
              Latar Akademik untuk K3L
            </h3>

            {degrees.map((d, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -25 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.12 }}
                className="group relative rounded-2xl p-5 sm:p-7 overflow-hidden"
                style={{
                  background: 'rgba(238,242,255,0.025)',
                  border: `1px solid ${d.color}25`,
                  backdropFilter: 'blur(10px)',
                }}
              >
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none"
                  style={{ background: `radial-gradient(ellipse at 0% 0%, ${d.color}12 0%, transparent 60%)` }}
                />
                <div className="relative z-10 flex gap-5 items-start">
                  <div
                    className="w-12 h-12 rounded-xl shrink-0 flex items-center justify-center"
                    style={{ background: `${d.color}14`, border: `1px solid ${d.color}28` }}
                  >
                    <d.Icon size={22} style={{ color: d.color }} aria-hidden="true" />
                  </div>
                  <div>
                    <div className="text-xs font-mono font-semibold mb-1" style={{ color: d.color }}>{d.year}</div>
                    <h4 className="font-heading font-bold text-lg leading-snug" style={{ color: '#eef2ff' }}>{d.title}</h4>
                    <div className="text-xs mb-2" style={{ color: d.color + 'aa', fontFamily: 'Inter, sans-serif' }}>{d.subtitle}</div>
                    <p className="text-sm" style={{ color: 'rgba(216,228,252,0.78)', fontFamily: 'Inter, sans-serif' }}>{d.institution}</p>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* 30+ badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="rounded-2xl p-5 sm:p-7 text-center relative overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, rgba(200,168,74,0.1), rgba(42,127,255,0.05))',
                border: '1px solid rgba(200,168,74,0.2)',
              }}
            >
              <div className="font-heading font-bold text-5xl mb-2" style={{ color: '#c8a84a', lineHeight: 1.1, paddingTop: '0.04em' }}>30+</div>
              <div
                className="text-sm tracking-widest uppercase font-semibold"
                style={{ color: 'rgba(216,228,252,0.75)', fontFamily: 'Inter, sans-serif' }}
              >
                Sertifikasi K3 & K3L Profesional
              </div>
            </motion.div>
          </div>

          {/* Certs */}
          <div className="lg:col-span-7">
            <h3
              className="text-xs tracking-[0.25em] uppercase font-semibold mb-8"
              style={{ color: 'rgba(216,228,252,0.70)', fontFamily: 'Inter, sans-serif' }}
            >
              Sertifikasi Kunci K3L
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {certs.map((cert, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05, duration: 0.5 }}
                  className="group relative rounded-xl p-5 overflow-hidden transition-all duration-300 cursor-default"
                  style={{
                    background: cert.featured ? 'rgba(200,168,74,0.07)' : 'rgba(238,242,255,0.02)',
                    border: cert.featured ? '1px solid rgba(200,168,74,0.32)' : '1px solid rgba(238,242,255,0.06)',
                  }}
                >
                  {cert.featured && (
                    <div
                      className="absolute top-0 left-0 right-0 h-px"
                      style={{ background: 'linear-gradient(90deg,transparent,rgba(200,168,74,0.75),transparent)' }}
                    />
                  )}
                  <div className="relative z-10">
                    {cert.featured && (
                      <div className="flex items-center gap-1.5 text-xs font-bold tracking-widest uppercase mb-2" style={{ color: '#c8a84a', fontFamily: 'Inter, sans-serif' }}>
                        <BadgeCheck size={13} aria-hidden="true" />
                        Unggulan K3L
                      </div>
                    )}
                    <h4
                      className="font-semibold text-sm leading-snug mb-2"
                      style={{ color: cert.featured ? '#e8c870' : 'rgba(238,242,255,0.86)', fontFamily: 'Inter, sans-serif' }}
                    >
                      {cert.name}
                    </h4>
                    <div className="flex items-center gap-1.5 text-xs" style={{ color: 'rgba(216,228,252,0.70)', fontFamily: 'Inter, sans-serif' }}>
                      <span>{cert.org}</span>
                      {cert.date ? (
                        <>
                          <span aria-hidden="true">·</span>
                          <span>{cert.date}</span>
                        </>
                      ) : null}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            <div
              className="mt-5 text-center text-xs tracking-widest uppercase font-semibold"
              style={{ color: 'rgba(216,228,252,0.60)', fontFamily: 'Inter, sans-serif' }}
            >
              + 20 sertifikasi K3L spesialis tambahan
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
