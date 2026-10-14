import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

// ─── Royal Night palette ──────────────────────────────────────────────────────
// Navy:   #020a18 | #04101e | #061228
// Gold:   #c8a84a | #d4b558 | #e8c870
// Blue:   #2a7fff | #7ab8ff
// Text:   #eef2ff | rgba(210,225,255,0.75)

type Sparkle = {
  x: number; y: number; vx: number; vy: number;
  life: number; maxLife: number; size: number; gold: boolean;
};

type Stream = {
  pts: { x: number; y: number }[];
  speed: number; width: number; alpha: number;
  progress: number; color: string;
};

function spawnSparkle(w: number, h: number): Sparkle {
  const zone = Math.random();
  let x: number, y: number;
  if (zone < 0.5) {
    x = Math.random() * w * 0.45;
    y = h * 0.55 + Math.random() * h * 0.45;
  } else if (zone < 0.8) {
    const t = Math.random();
    x = w * 0.1 + t * w * 0.7;
    y = h * 0.8 - t * h * 0.4 + (Math.random() - 0.5) * 60;
  } else {
    x = Math.random() * w;
    y = Math.random() * h;
  }
  const maxLife = 80 + Math.random() * 160;
  return {
    x, y,
    vx: (Math.random() - 0.5) * 0.6,
    vy: -0.15 - Math.random() * 0.5,
    life: Math.random() * maxLife,
    maxLife,
    size: 0.6 + Math.random() * 2.4,
    gold: Math.random() > 0.28,
  };
}

function makeStream(w: number, h: number, isGold: boolean): Stream {
  const startX = Math.random() * w * 0.3;
  const startY = h * 0.7 + Math.random() * h * 0.3;
  const endX = w * 0.6 + Math.random() * w * 0.4;
  const endY = Math.random() * h * 0.4;
  const cp1x = startX + w * 0.15, cp1y = startY - h * 0.2;
  const cp2x = endX - w * 0.2,    cp2y = endY + h * 0.2;
  const pts: { x: number; y: number }[] = [];
  for (let i = 0; i <= 80; i++) {
    const t = i / 80, mt = 1 - t;
    pts.push({
      x: mt*mt*mt*startX + 3*mt*mt*t*cp1x + 3*mt*t*t*cp2x + t*t*t*endX,
      y: mt*mt*mt*startY + 3*mt*mt*t*cp1y + 3*mt*t*t*cp2y + t*t*t*endY,
    });
  }
  return {
    pts,
    speed: 0.003 + Math.random() * 0.005,
    width: isGold ? 0.4 + Math.random() * 1.2 : 0.3 + Math.random() * 0.7,
    alpha: isGold ? 0.32 + Math.random() * 0.42 : 0.14 + Math.random() * 0.22,
    progress: Math.random(),
    color: isGold
      ? `rgba(${200 + Math.random() * 50},${155 + Math.random() * 50},${40 + Math.random() * 40},`
      : `rgba(${42 + Math.random() * 40},${127 + Math.random() * 80},${255},`,
  };
}

export function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef   = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    // The canvas element is unconditionally rendered above; null is only
    // possible if the React ref API itself fails.
    /* v8 ignore next */
    if (!canvas) return;
    // Respect users who prefer reduced motion: render one static frame
    // (stars + faint streams) and skip the rAF loop entirely.
    const prefersReduced =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const ctx = canvas.getContext('2d')!;

    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();

    // Use ResizeObserver so canvas redraws correctly when section height
    // changes due to content reflow (e.g. text zoom, narrow viewports).
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    window.addEventListener('resize', resize);

    const W = () => canvas.width;
    const H = () => canvas.height;

    // Narrow screens get fewer particles/streams, and stream head-dots are
    // skipped entirely — a glowing dot drifting near the CTAs reads as a
    // stray spinner/loading artifact on mobile.
    // Masterpiece pass: leaner budgets (140/90 sparkles, 7+4/5+2 streams)
    // keep the Royal Night density while easing mid-range GPUs.
    const isNarrow = window.innerWidth < 640;
    const sparkles: Sparkle[] = Array.from({ length: isNarrow ? 90 : 140 }, () => spawnSparkle(W(), H()));
    const streams: Stream[] = [
      ...Array.from({ length: isNarrow ? 5 : 7 }, () => makeStream(W(), H(), true)),
      ...Array.from({ length: isNarrow ? 2 : 4  }, () => makeStream(W(), H(), false)),
    ];
    const stars = Array.from({ length: 140 }, () => ({
      x: Math.random(), y: Math.random(),
      r: Math.random() * 0.9,
      a: 0.1 + Math.random() * 0.45,
      tw: Math.random() * Math.PI * 2,
      sp: 0.4 + Math.random() * 1.0,
    }));

    let t = 0;

    const draw = () => {
      const w = W(), h = H();
      ctx.clearRect(0, 0, w, h);

      const base = ctx.createLinearGradient(0, 0, w, h);
      base.addColorStop(0, 'rgba(2,10,24,0.25)');
      base.addColorStop(0.5, 'rgba(4,16,30,0.15)');
      base.addColorStop(1, 'rgba(6,18,40,0.3)');
      ctx.fillStyle = base;
      ctx.fillRect(0, 0, w, h);

      const blueGlow = ctx.createRadialGradient(w * 0.82, h * 0.28, 0, w * 0.82, h * 0.28, w * 0.45);
      blueGlow.addColorStop(0, 'rgba(42,127,255,0.12)');
      blueGlow.addColorStop(0.4, 'rgba(18,55,160,0.06)');
      blueGlow.addColorStop(1, 'transparent');
      ctx.fillStyle = blueGlow;
      ctx.fillRect(0, 0, w, h);

      const goldGlow = ctx.createRadialGradient(w * 0.18, h * 0.84, 0, w * 0.18, h * 0.84, w * 0.36);
      goldGlow.addColorStop(0, 'rgba(200,168,74,0.12)');
      goldGlow.addColorStop(0.5, 'rgba(160,120,20,0.05)');
      goldGlow.addColorStop(1, 'transparent');
      ctx.fillStyle = goldGlow;
      ctx.fillRect(0, 0, w, h);

      stars.forEach(s => {
        const a = s.a * (0.5 + 0.5 * Math.sin(t * s.sp + s.tw));
        ctx.beginPath();
        ctx.arc(s.x * w, s.y * h, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(210,225,255,${a})`;
        ctx.fill();
      });

      streams.forEach(stream => {
        stream.progress = (stream.progress + stream.speed) % 1;
        const tailLen = 0.18;
        const segStart = Math.floor(stream.progress * 80);
        const segEnd   = Math.floor(((stream.progress + tailLen) % 1) * 80);
        const pts = stream.pts;
        if (segEnd > segStart && pts.length > 1) {
          const end = Math.min(segEnd, pts.length - 1);
          ctx.beginPath();
          ctx.moveTo(pts[segStart].x, pts[segStart].y);
          for (let i = segStart + 1; i <= end; i++) ctx.lineTo(pts[i].x, pts[i].y);
          ctx.strokeStyle = `${stream.color}${stream.alpha * 0.28})`;
          ctx.lineWidth = stream.width * 5;
          ctx.lineCap = 'round';
          ctx.shadowBlur = 8;
          ctx.shadowColor = `${stream.color}0.4)`;
          ctx.stroke();
          ctx.shadowBlur = 0;

          ctx.beginPath();
          ctx.moveTo(pts[segStart].x, pts[segStart].y);
          for (let i = segStart + 1; i <= end; i++) ctx.lineTo(pts[i].x, pts[i].y);
          ctx.strokeStyle = `${stream.color}${stream.alpha})`;
          ctx.lineWidth = stream.width;
          ctx.stroke();

          // Head-dot: desktop only, small + faint. At 6px/0.9α it looked
          // like a loading spinner when passing near buttons.
          // Checked against live width (not mount-time isNarrow) so rotating
          // a phone to portrait immediately drops the dots too.
          // Reduced-motion users get no drifting dots at all.
          if (w >= 640 && !prefersReduced) {
            const hx = pts[end].x, hy = pts[end].y;
            const hg = ctx.createRadialGradient(hx, hy, 0, hx, hy, 3.5);
            hg.addColorStop(0, `${stream.color}0.5)`);
            hg.addColorStop(1, 'transparent');
            ctx.fillStyle = hg;
            ctx.beginPath();
            ctx.arc(hx, hy, 3.5, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      });

      sparkles.forEach((sp, idx) => {
        sp.life++;
        sp.x += sp.vx;
        sp.y += sp.vy;
        if (sp.life >= sp.maxLife) { sparkles[idx] = spawnSparkle(w, h); return; }
        const prog  = sp.life / sp.maxLife;
        const alpha = prog < 0.15 ? prog / 0.15 : prog > 0.75 ? (1 - (prog - 0.75) / 0.25) : 1;
        const size  = sp.size * alpha;

        if (sp.gold) {
          const br = 0.6 + 0.4 * Math.sin(t * 3 + sp.life * 0.1);
          const rr = Math.floor(220 + 30 * br), gg = Math.floor(160 + 50 * br), bb = Math.floor(40 + 40 * br);
          const ga = alpha * 0.85;
          const grd = ctx.createRadialGradient(sp.x, sp.y, 0, sp.x, sp.y, size * 4);
          grd.addColorStop(0, `rgba(${rr},${gg},${bb},${ga * 0.45})`);
          grd.addColorStop(1, 'transparent');
          ctx.fillStyle = grd;
          ctx.fillRect(sp.x - size * 4, sp.y - size * 4, size * 8, size * 8);
          ctx.save();
          ctx.translate(sp.x, sp.y);
          ctx.rotate(t * 0.5 + sp.life * 0.05);
          ctx.fillStyle = `rgba(${rr},${gg},${bb},${ga})`;
          ctx.fillRect(-size * 0.15, -size, size * 0.3, size * 2);
          ctx.fillRect(-size, -size * 0.15, size * 2, size * 0.3);
          ctx.rotate(Math.PI / 4);
          ctx.fillStyle = `rgba(${rr},${gg},${bb},${ga * 0.5})`;
          ctx.fillRect(-size * 0.1, -size * 0.6, size * 0.2, size * 1.2);
          ctx.fillRect(-size * 0.6, -size * 0.1, size * 1.2, size * 0.2);
          ctx.restore();
        } else {
          ctx.beginPath();
          ctx.arc(sp.x, sp.y, size * 0.7, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(180,210,255,${alpha * 0.55})`;
          ctx.fill();
        }
      });

      const vig = ctx.createRadialGradient(w * 0.4, h * 0.45, h * 0.08, w * 0.4, h * 0.45, h * 0.82);
      vig.addColorStop(0, 'transparent');
      vig.addColorStop(1, 'rgba(2,8,18,0.65)');
      ctx.fillStyle = vig;
      ctx.fillRect(0, 0, w, h);

      t += 0.012;
      if (prefersReduced) return;
      animRef.current = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(animRef.current);
      ro.disconnect();
      window.removeEventListener('resize', resize);
    };
  }, []);

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  const stats = [
    { value: '8+',  label: 'Tahun di HSE & K3L',   blue: false },
    { value: '0',   label: 'LTI · Aragon 23–24', blue: true  },
    { value: '30+', label: 'Sertifikasi K3',      blue: false },
  ];

  const roles: { label: string; color: string; weight: number }[] = [
    { label: 'Mining HSE Manager',          color: '#c8a84a',                weight: 500 },
    { label: 'SMKP Auditor · OHS Specialist', color: 'rgba(210,225,255,0.66)', weight: 400 },
    { label: 'K3L Systems Leader',          color: '#7ab8ff',                weight: 400 },
  ];

  return (
    // ─── Section: sizing is content-driven, min-height from CSS class
    // overflow-hidden clips absolute decorative layers to the section boundary.
    <section id="hero" className="hero-section relative w-full overflow-hidden">

      {/* Layer 0 : optimized JPG background (114KB) - PNG original preserved in git history */}
      <img
        src="/photos/royal-night-bg.jpg"
        srcSet="/photos/royal-night-bg.jpg 1600w"
        sizes="100vw"
        alt=""
        aria-hidden="true"
        fetchPriority="high"
        decoding="async"
        draggable={false}
        width={1600}
        height={900}
        className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none select-none"
        style={{ filter: 'brightness(0.52) saturate(1.1)', zIndex: 0, aspectRatio: '16 / 9' }}
      />

      {/* ── Layer 1 · animated particle canvas ────────────────────────────── */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ zIndex: 1, mixBlendMode: 'screen' }}
      />

      {/* ── Layer 2 · text-readability overlay ────────────────────────────── */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 2,
          background:
            'linear-gradient(120deg, rgba(2,10,24,0.66) 0%, rgba(4,14,32,0.30) 55%, rgba(6,18,40,0.52) 100%)',
        }}
      />

      {/* ── Layer 3 · bottom fade into next section ────────────────────────── */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-40 pointer-events-none"
        style={{ zIndex: 3, background: 'linear-gradient(to bottom, transparent, #020a18)' }}
      />

      {/* ── Semantic content: normal document flow, z-index 10 ─────────────
           padding-top accounts for the fixed nav bar.
           padding-bottom gives breathing room above the bottom fade.
           flex column + align-center + justify-center centres short content;
           when content exceeds min-height the section grows naturally.       */}
      <div
        className="relative w-full flex flex-col items-center justify-center text-center hero-content"
        style={{ zIndex: 10 }}
      >

        {/* ── 1. Availability badge ─────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="inline-flex items-center justify-center gap-2 rounded-full"
          style={{
            padding: '7px 16px',
            marginBottom: 18,
            maxWidth: '92vw',
            border: '1px solid rgba(200,168,74,0.32)',
            background: 'rgba(200,168,74,0.07)',
            color: '#e8c870',
            fontSize: 'clamp(11px, 2.4vw, 12px)',
            fontFamily: 'Inter, sans-serif',
            letterSpacing: '0.18em',
            fontWeight: 600,
            textTransform: 'uppercase',
            backdropFilter: 'blur(10px)',
          }}
        >
          <span
            aria-hidden="true"
            style={{
              display: 'inline-block',
              width: 5, height: 5,
              flexShrink: 0,
              borderRadius: '50%',
              background: '#c8a84a',
              boxShadow: '0 0 7px #c8a84a',
              animation: 'pulse 2.2s ease-in-out infinite',
            }}
          />
          Open to HSE Leadership & K3L Collaborations
        </motion.div>

        {/* ── 2. Name — single h1 for premium SEO/outline ─────────────────────── */}
        <motion.h1
          initial={{ opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.25 }}
          className="font-display font-semibold tracking-tight"
          style={{ lineHeight: 1.14, paddingTop: '0.02em', paddingBottom: '0.1em', marginBottom: '0.05em', overflow: 'visible' }}
        >
          <span
            style={{
              display: 'block',
              fontSize: 'clamp(2.8rem, 9vw, 7.5rem)',
              fontWeight: 700,
              lineHeight: 1.14,
              letterSpacing: '0.01em',
              color: '#eef2ff',
              textWrap: 'balance',
              textShadow: '0 2px 40px rgba(2,10,24,0.9)',
            }}
          >
            Priastama
          </span>
          <span
            aria-hidden="false"
            style={{
              display: 'block',
              fontSize: 'clamp(2.8rem, 9vw, 7.5rem)',
              fontStyle: 'italic',
              fontWeight: 700,
              lineHeight: 1.22,
              paddingBottom: '0.16em',
              marginBottom: 8,
              overflow: 'visible',
              background: 'linear-gradient(135deg, #c8a84a 0%, #e8c870 45%, #f0d890 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              textWrap: 'balance',
              filter: 'drop-shadow(0 0 20px rgba(200,168,74,0.45))',
            }}
          >
            Adiyoga
          </span>
        </motion.h1>

        {/* ── 3. Gold rule ──────────────────────────────────────────────────── */}
        <motion.div
          aria-hidden="true"
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          style={{
            width: 52, height: 1,
            marginBottom: 14,
            flexShrink: 0,
            background: 'linear-gradient(to right, transparent, #c8a84a, transparent)',
          }}
        />

        {/* ── 4. Professional roles
               Each role+separator is wrapped in a non-breaking inline-flex
               span, so flex-wrap never splits a separator from its role.      */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.55 }}
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'center',
            columnGap: 0,
            rowGap: 4,
            marginBottom: 12,
          }}
        >
          {roles.map(({ label, color, weight }, i) => (
            // whiteSpace:nowrap keeps "ROLE ·" as an atomic wrap unit
            <span
              key={i}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                whiteSpace: 'nowrap',
              }}
            >
              <span
                style={{
                  fontSize: 'clamp(0.72rem, 1.85vw, 0.95rem)',
                  fontWeight: weight,
                  color,
                  letterSpacing: '0.10em',
                  textTransform: 'uppercase',
                  fontFamily: 'Inter, sans-serif',
                  padding: '0 8px',
                }}
              >
                {label}
              </span>
              {i < roles.length - 1 && (
                <span
                  aria-hidden="true"
                  style={{
                    color: 'rgba(200,168,74,0.40)',
                    fontSize: 16,
                    lineHeight: 1,
                    userSelect: 'none',
                    paddingRight: 2,
                  }}
                >
                  ·
                </span>
              )}
            </span>
          ))}
        </motion.div>

        {/* ── 5. Value proposition — HSE/K3L-first, concrete, high contrast. ── */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.75 }}
          style={{
            fontFamily: 'Inter, sans-serif',
            fontWeight: 400,
            fontSize: 'clamp(0.85rem, 2.1vw, 1rem)',
            lineHeight: 1.68,
            color: 'rgba(222,233,255,0.87)',
            maxWidth: '46ch',
            margin: '0 auto',
            marginBottom: 'clamp(18px, 3vh, 30px)',
            textShadow: '0 1px 18px rgba(2,10,24,0.85)',
          }}
        >
          Safety Specialist ber-latar Advokat PERADI yang membangun dan memelihara
          sistem K3L di operasi high-risk Kalimantan — 8+ tahun di coal mining,
          coal hauling, dan andesite mining Kalimantan Timur, dengan Zero
          Lost-Time Injury terdokumentasi pada penugasan Aragon Tambang Pratama
          (2023–2024).
        </motion.p>

        {/* ── 6. CTAs ───────────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.95 }}
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 12,
            justifyContent: 'center',
            marginBottom: 'clamp(20px, 4vh, 38px)',
          }}
        >
          {/* Primary — View Experience first: visitors need proof before
              they are ready to contact. */}
          <button
            onClick={() => scrollTo('experience')}
            aria-label="Lihat pengalaman HSE dan K3L"
            className="group relative rounded-lg font-bold uppercase overflow-hidden"
            style={{
              padding: '13px 32px',
              fontSize: 11,
              letterSpacing: '0.15em',
              background: 'linear-gradient(135deg, #c8a84a, #e8c870)',
              color: '#06101e',
              boxShadow: '0 4px 28px rgba(200,168,74,0.32)',
              minHeight: 48,
              cursor: 'pointer',
              border: 'none',
              outline: 'none',
            }}
            onFocus={e => (e.currentTarget.style.boxShadow = '0 0 0 3px rgba(200,168,74,0.55), 0 4px 28px rgba(200,168,74,0.32)')}
            onBlur={e  => (e.currentTarget.style.boxShadow = '0 4px 28px rgba(200,168,74,0.32)')}
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              View Experience
              <span className="group-hover:translate-x-1 transition-transform inline-block">→</span>
            </span>
            <div
              aria-hidden="true"
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ background: 'linear-gradient(135deg, #b8983a, #d4b558)' }}
            />
          </button>

          {/* Secondary — Contact Me */}
          <button
            onClick={() => scrollTo('contact')}
            aria-label="Hubungi untuk kebutuhan HSE dan K3L"
            className="rounded-lg font-semibold uppercase transition-colors duration-300"
            style={{
              padding: '13px 32px',
              fontSize: 11,
              letterSpacing: '0.15em',
              border: '1px solid rgba(200,168,74,0.48)',
              background: 'rgba(4,14,30,0.45)',
              color: 'rgba(220,232,255,0.90)',
              backdropFilter: 'blur(12px)',
              minHeight: 48,
              cursor: 'pointer',
              outline: 'none',
            }}
            onMouseEnter={e => {
              const el = e.currentTarget as HTMLElement;
              el.style.background    = 'rgba(200,168,74,0.13)';
              el.style.borderColor   = 'rgba(200,168,74,0.68)';
              el.style.color         = '#e8c870';
            }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLElement;
              el.style.background    = 'rgba(4,14,30,0.45)';
              el.style.borderColor   = 'rgba(200,168,74,0.48)';
              el.style.color         = 'rgba(220,232,255,0.90)';
            }}
            onFocus={e => (e.currentTarget.style.outline = '2px solid rgba(200,168,74,0.55)')}
            onBlur={e  => (e.currentTarget.style.outline = 'none')}
          >
            Contact Me
          </button>
        </motion.div>

        {/* ── 7. Statistics — document-flow grid, never absolutely positioned ─
               Three equal columns; column dividers are CSS borders (no z-index
               conflicts). Responsive: shrinks gracefully to narrow screens.   */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.3 }}
          role="list"
          aria-label="Career highlights"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            width: '100%',
            maxWidth: 380,
          }}
        >
          {stats.map((s, i) => (
            <div
              key={i}
              role="listitem"
              style={{
                textAlign: 'center',
                padding: '10px 6px',
                // Column divider via border-left — no absolute/z-index
                borderLeft: i > 0
                  ? '1px solid rgba(200,168,74,0.18)'
                  : 'none',
              }}
            >
              <div
                className="font-heading font-bold"
                style={{
                  fontSize: 'clamp(20px, 5.2vw, 28px)',
                  lineHeight: 1.1,
                  color: s.blue ? '#7ab8ff' : '#c8a84a',
                  textShadow: s.blue
                    ? '0 0 18px rgba(100,180,255,0.50)'
                    : '0 0 18px rgba(200,168,74,0.45)',
                }}
              >
                {s.value}
              </div>
              <div
                style={{
                  marginTop: 4,
                  fontSize: 'clamp(10px, 2vw, 10px)',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'rgba(190,208,232,0.85)',
                  fontFamily: 'Inter, sans-serif',
                  lineHeight: 1.35,
                  wordBreak: 'break-word',
                }}
              >
                {s.label}
              </div>
            </div>
          ))}
        </motion.div>

      </div>{/* /hero-content */}

      {/* ── Decorative scroll indicator ───────────────────────────────────── */}
      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0, scaleY: 0 }}
        animate={{ opacity: 1, scaleY: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
        className="absolute bottom-0 left-1/2 -translate-x-1/2 origin-top pointer-events-none"
        style={{
          zIndex: 20,
          width: 1,
          height: 48,
          background: 'linear-gradient(to bottom, rgba(200,168,74,0.50), transparent)',
        }}
      />
    </section>
  );
}
