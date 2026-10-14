import { motion } from 'framer-motion';
import { HardHat, Scale, ShieldCheck, ClipboardCheck, Siren } from 'lucide-react';

// Royal Night palette — HSE/K3L premium
// Gold:  #c8a84a | #d4b558 | #e8c870
// Blue:  #2a7fff | #7ab8ff
// Navy bg: #020a18

const stats = [
  { value: '8+',    label: 'Tahun di HSE & K3L',     color: '#c8a84a' },
  { value: 'SMKP',  label: 'Auditor Tersertifikasi', color: '#7ab8ff' },
  { value: '30+',   label: 'Sertifikasi K3',         color: '#c8a84a' },
  { value: 'Zero',  label: 'LTI · Aragon 23–24',     color: '#7ab8ff' },
];

const identities = [
  {
    Icon: HardHat,
    title: 'Mining HSE Expert',
    color: '#c8a84a',
    desc: '8+ tahun operasi coal mining, coal hauling, dan andesite mining di Kalimantan Timur — termasuk 6 tahun bersama Bayan Resources Group (Bara Tabang) — safety leadership di high-risk environment.',
  },
  {
    Icon: Scale,
    title: 'SMKP & Kepatuhan K3L',
    color: '#7ab8ff',
    desc: 'Sarjana Hukum (S.H.), lulus Ujian Profesi Advokat PERADI 2017 — presisi hukum untuk arsitektur kepatuhan SMKP, regulasi ESDM, dan audit K3L.',
  },
  {
    Icon: ShieldCheck,
    title: 'K3L Culture Builder',
    color: '#7ab8ff',
    desc: 'Membangun 3× Safety Management System dari nol, HIRADC, CSMS, dan budaya Zero Accident yang bertahan lintas siklus operasi.',
  },
];

export function About() {
  return (
    <section id="about" className="py-36 relative overflow-hidden" style={{ background: '#020a18' }}>
      {/* Background glows */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(200,168,74,0.06) 0%, transparent 70%)', filter: 'blur(40px)' }} />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(42,127,255,0.05) 0%, transparent 70%)', filter: 'blur(40px)' }} />

      <div className="container mx-auto px-6 max-w-6xl relative z-10">

        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-24 text-center"
        >
          <span className="text-xs tracking-[0.3em] uppercase font-semibold mb-4 block" style={{ color: '#c8a84a', fontFamily: 'Inter, sans-serif' }}>
            — Profil HSE —
          </span>
          <h2 className="font-heading font-bold tracking-tight" style={{ fontSize: 'clamp(2.2rem,5vw,4rem)', lineHeight: 1.2, color: '#eef2ff' }}>
            Bridging the{' '}
            <span
              className="text-transparent bg-clip-text"
              style={{ backgroundImage: 'linear-gradient(90deg,#c8a84a,#e8c870)', display: 'inline-block', paddingBottom: '0.06em' }}
            >
              Physical
            </span>
            {' & '}
            <span
              className="text-transparent bg-clip-text"
              style={{ backgroundImage: 'linear-gradient(90deg,#2a7fff,#7ab8ff)', display: 'inline-block', paddingBottom: '0.06em' }}
            >
              Digital
            </span>
          </h2>
          <div className="mt-4 mx-auto" style={{ width: 80, height: 2, background: 'linear-gradient(90deg,#c8a84a,#2a7fff)' }} />
        </motion.div>

        {/* Main layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-0">

          {/* LEFT: Photos */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className="lg:col-span-4 flex flex-col gap-5"
          >
            {/* Profile photo */}
            <div
              className="relative rounded-2xl overflow-hidden"
              style={{ aspectRatio: '3/4', border: '1px solid rgba(200,168,74,0.2)' }}
            >
              <img
                src="/photos/profile.jpg"
                srcSet="/photos/profile.jpg 600w"
                sizes="(max-width: 1024px) 100vw, 400px"
                alt="Priastama Adiyoga — Mining HSE Manager di site Kalimantan Timur"
                loading="lazy"
                decoding="async"
                width={600}
                height={800}
                className="w-full h-full object-cover object-center"
                style={{ filter: 'contrast(1.04) brightness(1.02)' }}
              />
              <div
                className="absolute inset-x-0 bottom-0 h-2/5"
                style={{ background: 'linear-gradient(to top, rgba(2,10,24,0.92) 0%, transparent 100%)' }}
              />
              {/* Gold top accent */}
              <div className="absolute top-0 left-0 right-0 h-px"
                style={{ background: 'linear-gradient(90deg, transparent, #c8a84a, transparent)' }} />
              {/* Name card */}
              <div className="absolute bottom-5 left-5 right-5">
                <div
                  className="px-4 py-3 rounded-xl"
                  style={{
                    background: 'rgba(2,10,24,0.72)',
                    backdropFilter: 'blur(12px)',
                    border: '1px solid rgba(200,168,74,0.2)',
                  }}
                >
                  <div className="font-heading font-bold text-sm" style={{ color: '#eef2ff' }}>Priastama Adiyoga</div>
                  <div className="text-xs mt-0.5" style={{ color: '#c8a84a', fontFamily: 'Inter, sans-serif' }}>
                    HSE Manager · SMKP Auditor · K3L
                  </div>
                </div>
              </div>
            </div>

            {/* Kalimantan photo */}
            <div
              className="relative rounded-2xl overflow-hidden"
              style={{ aspectRatio: '4/3', border: '1px solid rgba(42,127,255,0.15)' }}
            >
              <img
                src="/photos/kalimantan.jpg"
                srcSet="/photos/kalimantan.jpg 600w"
                sizes="(max-width: 1024px) 100vw, 400px"
                alt="Operasi tambang Kalimantan Timur — area kerja HSE dan K3L"
                loading="lazy"
                decoding="async"
                width={600}
                height={450}
                className="w-full h-full object-cover"
                // Shared "site/field" grade (matches the Experience strip).
                style={{ filter: 'grayscale(25%) brightness(0.68) saturate(1.1)' }}
              />
              <div className="absolute inset-0"
                style={{ background: 'linear-gradient(to top, rgba(2,10,24,0.78) 0%, transparent 60%)' }} />
              <div className="absolute bottom-4 left-4">
                <div className="text-xs font-semibold tracking-widest uppercase" style={{ color: '#7ab8ff', fontFamily: 'Inter, sans-serif' }}>
                  Kalimantan Timur — Site K3L
                </div>
              </div>
              <div className="absolute top-0 left-0 right-0 h-px"
                style={{ background: 'linear-gradient(90deg, transparent, #2a7fff, transparent)' }} />
            </div>
          </motion.div>

          {/* RIGHT: Narrative */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="lg:col-span-8 flex flex-col gap-8"
          >
            {/* Identity cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {identities.map((id, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="group relative rounded-xl p-5 overflow-hidden cursor-default"
                  style={{
                    background: 'rgba(238,242,255,0.025)',
                    border: '1px solid rgba(238,242,255,0.07)',
                    backdropFilter: 'blur(12px)',
                  }}
                >
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl pointer-events-none"
                    style={{ background: `radial-gradient(ellipse at 50% 0%, ${id.color}18 0%, transparent 70%)` }}
                  />
                  <div
                    className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ background: `linear-gradient(90deg, transparent, ${id.color}, transparent)` }}
                  />
                  <div className="relative z-10">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
                      style={{ background: `${id.color}14`, border: `1px solid ${id.color}30` }}
                    >
                      <id.Icon size={18} style={{ color: id.color }} aria-hidden="true" />
                    </div>
                    <h3 className="font-heading font-bold text-sm mb-2" style={{ color: id.color }}>{id.title}</h3>
                    <p className="text-xs leading-relaxed" style={{ color: 'rgba(216,228,252,0.82)', fontFamily: 'Inter, sans-serif' }}>
                      {id.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Story — scannable HSE/K3L pillars */}
            <div className="space-y-3">
              {[
                {
                  Icon: HardHat,
                  color: '#c8a84a',
                  label: 'Keahlian Lapangan K3L',
                  text: '8+ tahun membangun dan mempertahankan sistem HSE di operasi coal mining, coal hauling, dan andesite mining Kalimantan — di mana satu kelalaian bisa fatal dan Zero LTI adalah satu-satunya target.',
                },
                {
                  Icon: ClipboardCheck,
                  color: '#7ab8ff',
                  label: 'SMKP & Kepatuhan Regulasi',
                  text: 'Sarjana Hukum (S.H.) dan lulusan Ujian Profesi Advokat PERADI 2017 — merancang arsitektur kepatuhan SMKP, audit internal, dan dokumentasi K3L yang lolos audit eksternal tanpa temuan mayor.',
                },
                {
                  Icon: Siren,
                  color: '#7ab8ff',
                  label: 'HIRADC · CSMS · Tanggap Darurat',
                  text: 'Spesialis HIRADC, Contractor Safety Management System, investigasi insiden, dan emergency response plan untuk heavy equipment zone di coal mining, coal hauling, dan andesite mining.',
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.55, delay: 0.08 + i * 0.1 }}
                  className="flex gap-4 p-4 rounded-xl"
                  style={{
                    background: 'rgba(238,242,255,0.022)',
                    border: `1px solid ${item.color}1a`,
                  }}
                >
                  <div
                    className="shrink-0 w-9 h-9 rounded-lg flex items-center justify-center mt-0.5"
                    style={{ background: `${item.color}14`, border: `1px solid ${item.color}28` }}
                  >
                    <item.Icon size={16} style={{ color: item.color }} aria-hidden="true" />
                  </div>
                  <div>
                    <div
                      className="text-xs font-bold tracking-[0.18em] uppercase mb-1.5"
                      style={{ color: item.color, fontFamily: 'Inter, sans-serif' }}
                    >
                      {item.label}
                    </div>
                    <p
                      className="text-sm leading-relaxed"
                      style={{ color: 'rgba(216,228,252,0.82)', fontFamily: 'Inter, sans-serif' }}
                    >
                      {item.text}
                    </p>
                  </div>
                </motion.div>
              ))}
              <div
                className="flex items-center gap-4 pt-1 text-xs tracking-[0.2em] uppercase font-semibold"
                style={{ color: 'rgba(210,225,255,0.55)' }}
              >
                <span style={{ width: 40, height: 1, background: 'rgba(200,168,74,0.18)', display: 'inline-block' }} />
                Samarinda, Kalimantan Timur
              </div>
            </div>

            {/* Stats — list semantics mirror the Hero highlights */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3" role="list" aria-label="Profil singkat">
              {stats.map((s, i) => (
                <motion.div
                  key={i}
                  role="listitem"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 * i }}
                  className="relative rounded-xl p-4 text-center overflow-hidden"
                  style={{
                    background: 'rgba(238,242,255,0.025)',
                    border: `1px solid ${s.color}22`,
                  }}
                >
                  <div
                    className="absolute inset-0 opacity-20 pointer-events-none rounded-xl"
                    style={{ background: `radial-gradient(ellipse at 50% 0%, ${s.color}30 0%, transparent 70%)` }}
                  />
                  <div className="relative z-10">
                    <div className="font-heading font-bold text-2xl mb-1" style={{ color: s.color, lineHeight: 1.15 }}>
                      {s.value}
                    </div>
                    <div className="text-xs tracking-wider uppercase" style={{ color: 'rgba(210,225,255,0.70)', fontFamily: 'Inter, sans-serif' }}>
                      {s.label}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* English summary — owner-approved final. Both sentences are direct
            translations of existing ID copy (Skills header + Contact intro) and
            intentionally carry no tenure, certification, phone, or DOB figures. */}
        <div
          lang="en"
          aria-label="English summary"
          className="mt-12 mx-auto max-w-3xl rounded-2xl p-6 text-left"
          style={{
            background: 'rgba(238,242,255,0.022)',
            border: '1px dashed rgba(200,168,74,0.35)',
          }}
        >
          <p className="text-sm leading-relaxed mb-2" style={{ color: 'rgba(216,228,252,0.82)', fontFamily: 'Inter, sans-serif' }}>
            Focused on safety, K3L, SMKP, and a Zero-Accident culture in mining operations.
          </p>
          <p className="text-sm leading-relaxed" style={{ color: 'rgba(216,228,252,0.82)', fontFamily: 'Inter, sans-serif' }}>
            For organisations that put safety first — let&apos;s build K3L systems that pass audits
            and a Zero-Accident culture that lasts.
          </p>
        </div>
      </div>
    </section>
  );
}
