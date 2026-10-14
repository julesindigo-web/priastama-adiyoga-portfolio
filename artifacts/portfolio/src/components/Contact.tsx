import { motion } from 'framer-motion';
import { Mail, Linkedin, MapPin, Phone, MessageCircle, ExternalLink, ArrowUpRight, Download } from 'lucide-react';

const opportunities = [
  { label: 'HSE Manager & Leadership K3L',  color: '#c8a84a' },
  { label: 'SMKP Audit & Sistem K3L',       color: '#2a7fff' },
  { label: 'Konsultan Keselamatan Tambang', color: '#c8a84a' },
  { label: 'CSMS & Pembinaan Kontraktor',   color: '#2a7fff' },
];

const contacts = [
  {
    Icon: Mail,
    label: 'adiyoga.hse@gmail.com',
    href: 'mailto:adiyoga.hse@gmail.com',
    aria: 'Kirim email kebutuhan HSE dan K3L',
    color: '#c8a84a',
  },
  {
    Icon: Linkedin,
    label: 'Priastama Adiyoga — HSE & K3L',
    href: 'https://linkedin.com/in/priastama-adiyoga',
    aria: 'Buka profil LinkedIn HSE Priastama Adiyoga',
    color: '#2a7fff',
    external: true,
  },
  {
    Icon: Phone,
    label: 'Kontak utama: +62 821-5482-5454',
    href: 'tel:+6282154825454',
    aria: 'Telepon HSE +62 821-5482-5454',
    color: '#c8a84a',
  },
  {
    Icon: MessageCircle,
    label: 'Cadangan / WhatsApp: +62 822-1359-5760',
    href: 'https://wa.me/6282213595760?text=Halo%2C%20saya%20melihat%20portfolio%20HSE%20%26%20K3L%20Anda%20dan%20ingin%20mendiskusikan%20kebutuhan%20site.',
    aria: 'Hubungi WhatsApp HSE +62 822-1359-5760',
    color: '#2a7fff',
    external: true,
  },
  {
    Icon: MapPin,
    label: 'Samarinda, Kalimantan Timur — Siap onsite site',
    href: null,
    aria: 'Lokasi HSE Samarinda, Kalimantan Timur — siap onsite site',
    color: 'rgba(216,228,252,0.6)',
  },
];

export function Contact() {
  return (
    <section id="contact" className="py-36 relative overflow-hidden" style={{ background: '#04101e' }}>
      {/* Background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(200,168,74,0.02) 1px,transparent 1px),linear-gradient(90deg,rgba(200,168,74,0.02) 1px,transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />
      <div className="absolute top-0 left-0 w-[700px] h-[500px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(200,168,74,0.055) 0%, transparent 65%)', filter: 'blur(60px)' }} />
      <div className="absolute bottom-0 right-0 w-[500px] h-[400px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(42,127,255,0.045) 0%, transparent 65%)', filter: 'blur(60px)' }} />

      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-24 text-center"
        >
          <span className="text-xs tracking-[0.3em] uppercase font-semibold mb-4 block" style={{ color: '#c8a84a', fontFamily: 'Inter, sans-serif' }}>
            — Hubungi untuk K3L —
          </span>
          <h2 className="font-heading font-bold tracking-tight" style={{ fontSize: 'clamp(2.5rem,6vw,5rem)', lineHeight: 1.2, color: '#eef2ff' }}>
            Mari bangun{' '}
            <span
              className="text-transparent bg-clip-text"
              style={{ backgroundImage: 'linear-gradient(135deg, #c8a84a, #e8c870, #7ab8ff)', display: 'inline-block', paddingBottom: '0.06em' }}
            >
              budaya selamat.
            </span>
          </h2>
          <div className="mt-4 mx-auto" style={{ width: 80, height: 2, background: 'linear-gradient(90deg,#c8a84a,#2a7fff)' }} />
          <p
            className="mt-6 text-base max-w-lg mx-auto font-light"
            style={{ color: 'rgba(216,228,252,0.78)', fontFamily: 'Inter, sans-serif', lineHeight: 1.68 }}
          >
            Bagi organisasi yang menempatkan keselamatan sebagai prioritas — mari
            membangun sistem K3L yang lolos audit dan budaya Zero Accident yang
            bertahan, didukung 8+ tahun pengalaman lapangan.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Contact links */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h3
              className="text-xs tracking-[0.25em] uppercase font-semibold mb-8"
              style={{ color: 'rgba(216,228,252,0.68)', fontFamily: 'Inter, sans-serif' }}
            >
              Kontak Langsung HSE
            </h3>
            <div className="space-y-4">
              {contacts.map((c, i) => {
                const inner = (
                  <div
                    key={i}
                    className="group flex items-center gap-5 p-5 rounded-2xl transition-all duration-300"
                    style={{
                      background: 'rgba(238,242,255,0.022)',
                      border: '1px solid rgba(238,242,255,0.07)',
                      cursor: c.href ? 'pointer' : 'default',
                    }}
                    onMouseEnter={e => {
                      if (c.href) {
                        (e.currentTarget as HTMLElement).style.background = `${c.color}0c`;
                        (e.currentTarget as HTMLElement).style.borderColor = `${c.color}28`;
                      }
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLElement).style.background = 'rgba(238,242,255,0.022)';
                      (e.currentTarget as HTMLElement).style.borderColor = 'rgba(238,242,255,0.07)';
                    }}
                  >
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 group-hover:scale-105"
                      style={{ background: `${c.color}14`, border: `1px solid ${c.color}28` }}
                    >
                      <c.Icon size={18} style={{ color: c.color }} aria-hidden="true" />
                    </div>
                    <span className="font-medium text-sm" style={{ color: 'rgba(238,242,255,0.86)', fontFamily: 'Inter, sans-serif' }}>
                      {c.label}
                    </span>
                    {c.external && (
                      <ArrowUpRight size={14} className="ml-auto opacity-35 group-hover:opacity-75 transition-opacity" style={{ color: c.color }} />
                    )}
                  </div>
                );

                return c.href ? (
                  <a key={i} href={c.href} aria-label={c.aria} target={c.external ? '_blank' : undefined} rel={c.external ? 'noreferrer' : undefined}>
                    {inner}
                  </a>
                ) : (
                  <div key={i} aria-label={c.aria}>{inner}</div>
                );
              })}
            </div>
          </motion.div>

          {/* Open to opportunities */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="relative rounded-2xl p-8 overflow-hidden"
            style={{
              background: 'rgba(238,242,255,0.02)',
              border: '1px solid rgba(238,242,255,0.07)',
            }}
          >
            {/* Top accent */}
            <div
              className="absolute top-0 left-0 right-0 h-px"
              style={{ background: 'linear-gradient(90deg,transparent,rgba(200,168,74,0.55),rgba(42,127,255,0.38),transparent)' }}
            />

            <h3
              className="text-xs tracking-[0.25em] uppercase font-semibold mb-8"
              style={{ color: 'rgba(216,228,252,0.68)', fontFamily: 'Inter, sans-serif' }}
            >
              Terbuka untuk Penugasan K3L
            </h3>

            <div className="space-y-3 mb-10">
              {opportunities.map((opp, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.08 }}
                  className="flex items-center gap-4 p-4 rounded-xl transition-all duration-300 group cursor-default hover:translate-x-1"
                  style={{ background: 'rgba(238,242,255,0.022)', border: '1px solid rgba(238,242,255,0.05)' }}
                >
                  <div
                    className="w-2 h-2 rounded-full shrink-0"
                    style={{ background: opp.color, boxShadow: `0 0 8px ${opp.color}` }}
                  />
                  <span className="font-medium text-sm" style={{ color: 'rgba(238,242,255,0.84)', fontFamily: 'Inter, sans-serif' }}>
                    {opp.label}
                  </span>
                  <ExternalLink size={12} className="ml-auto opacity-18 group-hover:opacity-55 transition-opacity" style={{ color: opp.color }} />
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <a
              href="mailto:adiyoga.hse@gmail.com?subject=Kebutuhan%20HSE%20%2F%20K3L%20—%20Diskusi%20Site"
              aria-label="Kirim email kebutuhan HSE dan K3L"
              className="flex items-center justify-center gap-2 w-full py-4 rounded-xl font-bold text-sm tracking-widest uppercase transition-all duration-300 hover:scale-[1.02]"
              style={{
                background: 'linear-gradient(135deg, #c8a84a, #e8c870)',
                color: '#06101e',
                boxShadow: '0 4px 24px rgba(200,168,74,0.28)',
                fontFamily: 'Inter, sans-serif',
              }}
            >
              <Mail size={15} />
              Diskusikan Kebutuhan K3L
            </a>

            {/* PDF 1 halaman */}
            <a
              href="/priastama-adiyoga-hse-profil.pdf"
              download="Priastama-Adiyoga-HSE-Profil.pdf"
              aria-label="Unduh profil HSE satu halaman (PDF)"
              className="mt-3 flex items-center justify-center gap-2 w-full py-4 rounded-xl font-bold text-sm tracking-widest uppercase transition-all duration-300 hover:scale-[1.02]"
              style={{
                border: '1px solid rgba(200,168,74,0.48)',
                background: 'rgba(4,14,30,0.45)',
                color: '#e8c870',
                fontFamily: 'Inter, sans-serif',
              }}
            >
              <Download size={15} />
              Unduh Profil 1 Halaman (PDF)
            </a>

            {/* Footer */}
            <div className="mt-8 pt-6 text-center" style={{ borderTop: '1px solid rgba(200,168,74,0.08)' }}>
              <p
                className="text-xs tracking-[0.15em] uppercase font-semibold"
                style={{ color: 'rgba(216,228,252,0.60)', fontFamily: 'Inter, sans-serif' }}
              >
                © {new Date().getFullYear()} Priastama Adiyoga — HSE · K3L · Mining Safety
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
