export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background px-6">
      <div
        className="text-center p-10 rounded-2xl max-w-md w-full"
        style={{ background: 'rgba(238,242,255,0.022)', border: '1px solid rgba(200,168,74,0.2)' }}
      >
        <div
          className="text-xs tracking-[0.3em] uppercase font-semibold mb-4 block"
          style={{ color: '#c8a84a', fontFamily: 'Inter, sans-serif' }}
        >
          — Halaman Tidak Ditemukan —
        </div>
        <h1 className="font-display font-semibold" style={{ fontSize: 'clamp(3.5rem,10vw,5.5rem)', lineHeight: 1.1, color: '#eef2ff' }}>
          404
        </h1>
        <div className="mt-4 mx-auto" style={{ width: 80, height: 2, background: 'linear-gradient(90deg,#c8a84a,#2a7fff)' }} />
        <p className="text-sm mt-6 mb-8 font-light" style={{ color: 'rgba(216,228,252,0.78)', fontFamily: 'Inter, sans-serif', lineHeight: 1.68 }}>
          Rute yang Anda tuju tidak tersedia. Kembali ke beranda untuk melanjutkan eksplorasi portfolio HSE &amp; K3L.
        </p>
        <a
          href="/"
          className="inline-flex items-center justify-center gap-2 rounded-lg font-bold uppercase text-sm transition-all duration-300 hover:scale-[1.02]"
          style={{
            padding: '13px 32px',
            fontSize: 11,
            letterSpacing: '0.15em',
            background: 'linear-gradient(135deg, #c8a84a, #e8c870)',
            color: '#06101e',
            boxShadow: '0 4px 28px rgba(200,168,74,0.32)',
            minHeight: 48,
            fontFamily: 'Inter, sans-serif',
          }}
        >
          Kembali ke Beranda
        </a>
        <div className="mt-4 flex items-center justify-center gap-5 text-xs font-semibold tracking-widest uppercase" style={{ fontFamily: 'Inter, sans-serif' }}>
          <a href="/#experience" className="transition-colors hover:opacity-100" style={{ color: 'rgba(216,228,252,0.70)' }}>
            Lihat Pengalaman
          </a>
          <span aria-hidden="true" style={{ color: 'rgba(200,168,74,0.40)' }}>·</span>
          <a href="/#contact" className="transition-colors hover:opacity-100" style={{ color: 'rgba(216,228,252,0.70)' }}>
            Hubungi K3L
          </a>
        </div>
      </div>
    </div>
  );
}
