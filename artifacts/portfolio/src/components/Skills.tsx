import { motion } from 'framer-motion';
import { HardHat, ClipboardCheck, Siren, HeartHandshake } from 'lucide-react';

const categories = [
  {
    title: 'HSE & Operasi Keselamatan',
    Icon: HardHat,
    color: '#c8a84a',
    gradient: 'linear-gradient(135deg, rgba(200,168,74,0.12) 0%, rgba(200,168,74,0.03) 100%)',
    border: 'rgba(200,168,74,0.22)',
    skills: [
      'Manajemen Risiko K3', 'Investigasi Insiden', 'HIRADC', 'Inspeksi & Audit K3',
      'Behavior Based Safety', 'Safety Counseling', 'Perizinan Kerja Aman', 'SMKP',
    ],
  },
  {
    title: 'K3L, SMKP & Kepatuhan Regulasi',
    Icon: ClipboardCheck,
    color: '#7ab8ff',
    gradient: 'linear-gradient(135deg, rgba(42,127,255,0.1) 0%, rgba(42,127,255,0.02) 100%)',
    border: 'rgba(42,127,255,0.18)',
    skills: [
      'SMKP Pertambangan', 'Kepatuhan Regulasi ESDM', 'Legal Drafting K3L', 'CSMS',
      'Dokumentasi & SOP K3L', 'Audit Internal SMKP', 'Latar Hukum K3L (PERADI)',
    ],
  },
  {
    title: 'Tanggap Darurat & Lingkungan',
    Icon: Siren,
    color: '#2a7fff',
    gradient: 'linear-gradient(135deg, rgba(42,127,255,0.12) 0%, rgba(42,127,255,0.03) 100%)',
    border: 'rgba(42,127,255,0.22)',
    skills: [
      'Emergency Response Plan', 'Manajemen Lingkungan', 'Pengelolaan Limbah Tambang',
      'Pemantauan Kualitas Lingkungan', 'Simulasi Kedaruratan', 'First Aid & Rescue Support',
    ],
  },
  {
    title: 'Kepemimpinan Budaya K3L',
    Icon: HeartHandshake,
    color: '#c8a84a',
    gradient: 'linear-gradient(135deg, rgba(200,168,74,0.1) 0%, rgba(200,168,74,0.02) 100%)',
    border: 'rgba(200,168,74,0.18)',
    skills: [
      'Safety Leadership', 'Pembinaan Pekerja & Kontraktor', 'Kampanye Bulan K3 Nasional',
      'Continuous Improvement K3L', 'Analytical Problem Solving',
    ],
  },
];

export function Skills() {
  return (
    <section id="skills" className="py-36 relative overflow-hidden" style={{ background: '#020a18' }}>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(42,127,255,0.05) 0%, transparent 65%)', filter: 'blur(60px)' }} />

      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-24 text-center"
        >
          <span className="text-xs tracking-[0.18em] sm:tracking-[0.3em] uppercase font-semibold mb-4 block break-words" style={{ color: '#c8a84a', fontFamily: 'Inter, sans-serif' }}>
            — Kompetensi Inti K3L —
          </span>
          <h2 className="font-heading font-bold tracking-tight" style={{ fontSize: 'clamp(2rem,5vw,3.5rem)', color: '#eef2ff' }}>
            Matriks Kompetensi HSE
          </h2>
          <p className="mt-4 text-sm max-w-xl mx-auto" style={{ color: 'rgba(216,228,252,0.75)', fontFamily: 'Inter, sans-serif' }}>
            Fokus penuh pada safety, K3L, SMKP, dan budaya Zero Accident di operasi pertambangan.
          </p>
          <div className="mt-4 mx-auto" style={{ width: 80, height: 2, background: 'linear-gradient(90deg,#c8a84a,#2a7fff)' }} />
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {categories.map((cat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              className="group relative rounded-2xl p-5 sm:p-8 overflow-hidden"
              style={{ background: cat.gradient, border: `1px solid ${cat.border}`, backdropFilter: 'blur(16px)' }}
            >
              <div
                className="absolute -top-16 -right-16 w-48 h-48 rounded-full opacity-35 pointer-events-none"
                style={{ background: `radial-gradient(circle, ${cat.color}28, transparent 70%)` }}
              />

              <div className="flex items-center gap-4 mb-7">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: `${cat.color}18`, border: `1px solid ${cat.color}28` }}
                >
                  <cat.Icon size={22} style={{ color: cat.color }} aria-hidden="true" />
                </div>
                <h3 className="font-heading font-bold text-xl min-w-0 break-words" style={{ color: cat.color }}>
                  {cat.title}
                </h3>
                <div className="ml-auto text-xs shrink-0" style={{ color: `${cat.color}70`, fontFamily: 'Inter, sans-serif' }}>
                  {cat.skills.length} kompetensi
                </div>
              </div>

              <div className="flex flex-wrap gap-2.5">
                {cat.skills.map((skill, j) => (
                  <motion.span
                    key={j}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.08 + j * 0.04 }}
                    className="px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-300 cursor-default"
                    style={{
                      background: 'rgba(2,10,24,0.45)',
                      border: '1px solid rgba(210,225,255,0.08)',
                      color: 'rgba(216,228,252,0.78)',
                      fontFamily: 'Inter, sans-serif',
                    }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLElement).style.background = `${cat.color}18`;
                      (e.currentTarget as HTMLElement).style.borderColor = `${cat.color}48`;
                      (e.currentTarget as HTMLElement).style.color = cat.color;
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLElement).style.background = 'rgba(2,10,24,0.45)';
                      (e.currentTarget as HTMLElement).style.borderColor = 'rgba(210,225,255,0.08)';
                      (e.currentTarget as HTMLElement).style.color = 'rgba(216,228,252,0.78)';
                    }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
