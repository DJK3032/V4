import { useState, useEffect, useRef } from "react";

// ─── Design System ───
// Inspired by Anduril/Palantir: monochromatic foundation, surgical accent color, technical precision
const C = {
  bg: "#0A0A0A",
  surface: "#111111",
  surfaceRaised: "#1A1A1A",
  border: "#222222",
  borderLight: "#2A2A2A",
  textPrimary: "#F0F0F0",
  textSecondary: "#8A8A8A",
  textMuted: "#555555",
  accent: "#C8102E", // ARC red — used surgically
  accentDim: "#C8102E33",
  accentGlow: "#C8102E22",
  white: "#FFFFFF",
  black: "#000000",
  warmWhite: "#FAFAFA",
};

// ─── Animated Grid Background ───
const GridBg = ({ opacity = 0.04, children, style = {} }) => (
  <div style={{ position: "relative", overflow: "hidden", ...style }}>
    <div style={{
      position: "absolute", inset: 0, opacity,
      backgroundImage: `
        linear-gradient(${C.textSecondary} 1px, transparent 1px),
        linear-gradient(90deg, ${C.textSecondary} 1px, transparent 1px)
      `,
      backgroundSize: "60px 60px",
    }}/>
    <div style={{
      position: "absolute", inset: 0, opacity: opacity * 0.5,
      background: `radial-gradient(ellipse at 50% 0%, ${C.accent}15 0%, transparent 70%)`,
    }}/>
    <div style={{ position: "relative", zIndex: 1 }}>{children}</div>
  </div>
);

// ─── ARC Eagle Logo (inline SVG from brand asset) ───
const ArcLogo = ({ size = 32, color = "#C8102E" }) => (
  <svg width={size} height={size * (139.26/162.4)} viewBox="0 0 162.4 139.26" fill="none">
    <polygon fill={color} points="54.03 4.01 108.37 4.01 112.3 16.11 116.12 15.1 111.21 0 51.19 0 46.29 15.1 50.1 16.11 54.03 4.01"/>
    <polygon fill={color} points="36.68 44.65 32.64 57.08 81.2 92.37 129.76 57.08 125.72 44.65 122.55 47.65 125.17 55.7 81.2 87.64 37.24 55.7 39.85 47.65 36.68 44.65"/>
    <polygon fill={color} points="48.29 32.6 39.13 41.76 50.82 52.82 67.57 48.4 61.93 62.07 81.2 76.22 100.48 62.07 94.83 48.4 111.58 52.82 123.28 41.76 114.11 32.6 129.77 35.76 162.4 6.72 97.05 24.07 81.2 41.78 65.36 24.07 0 6.72 32.63 35.76 48.29 32.6"/>
    <polygon fill={color} points="78.39 26.74 81.2 33.34 84.02 26.73 88.36 23.81 81.2 14.27 74.04 23.81 78.39 26.74"/>
    <path fill={color} d="m138.88,128.49h-9.57c-5.95,0-10.56-5.73-8.62-11.97,1.16-3.72,4.72-6.57,8.62-6.57h9.57c.08,0,.15-.05.18-.12l3.65-9.99c.05-.12-.05-.25-.18-.25h-13.22c-10.95,0-19.83,8.88-19.83,19.83s8.88,19.83,19.83,19.83h13.22c.13,0,.22-.13.18-.25l-3.65-10.39c-.03-.08-.1-.13-.18-.13Z"/>
    <path fill={color} d="m67.23,99.59h-14.19c-.06,0-.11.02-.14.07l-33.17,39.29c-.1.12-.02.31.14.31h14.43c.06,0,.11-.03.15-.07l21.86-27.08c.11-.14.34-.06.34.12v16.07c0,.1-.08.19-.19.19h-5.39c-.06,0-.11.03-.15.07l-7.91,10.39c-.09.12,0,.3.15.3h24.07c.1,0,.19-.08.19-.19v-39.29c0-.1-.08-.19-.19-.19Z"/>
    <path fill={color} d="m108.29,112.41c-.32-7.23-6.49-12.82-13.73-12.82h-22.64v39.47c0,.1.08.19.19.19h10.01c.1,0,.19-.08.19-.19v-14.32h10.09l6.1,14.39c.03.07.1.12.17.12h10.51c.14,0,.23-.14.17-.26l-6.41-15.27c3.39-2.56,5.54-6.68,5.34-11.31Zm-12.96,3.66h-13.01v-7.07h13.01s2.61.68,2.61,3.44c0,1.53-1.13,3.42-2.61,3.63Z"/>
  </svg>
);

// ─── Shared Typography ───
const font = "'Inter', -apple-system, 'Segoe UI', system-ui, sans-serif";
const mono = "'JetBrains Mono', 'SF Mono', 'Fira Code', 'Cascadia Code', monospace";

// ─── Shared Components ───
const Nav = ({ page, setPage }) => {
  const links = ["Home","Technology","Operations","Training","Programs","Newsroom","Company","Contact"];
  return (
    <nav style={{
      position: "sticky", top: 0, zIndex: 100,
      background: `${C.bg}E8`,
      backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)",
      borderBottom: `1px solid ${C.border}`,
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "0 40px", height: 60,
      fontFamily: font,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }} onClick={() => setPage("Home")}>
        <ArcLogo size={36} color={C.accent} />
      </div>
      <div style={{ display: "flex", gap: 1 }}>
        {links.map(l => (
          <button key={l} onClick={() => setPage(l)} style={{
            background: page === l ? `${C.accent}18` : "transparent",
            color: page === l ? C.white : C.textSecondary,
            border: page === l ? `1px solid ${C.accent}44` : "1px solid transparent",
            padding: "6px 14px", borderRadius: 4,
            fontSize: 11.5, fontWeight: 500,
            cursor: "pointer", fontFamily: font, letterSpacing: 0.5,
            textTransform: "uppercase",
            transition: "all 0.15s ease",
          }}>{l}</button>
        ))}
      </div>
    </nav>
  );
};

// ─── Classification-Style Banner ───
const ClassBanner = ({ text }) => (
  <div style={{
    background: C.accent, padding: "4px 0", textAlign: "center",
    fontFamily: mono, fontSize: 10, fontWeight: 700,
    letterSpacing: 3, color: C.white, textTransform: "uppercase",
  }}>{text}</div>
);

// ─── Tag Component ───
const Tag = ({ children }) => (
  <span style={{
    display: "inline-block",
    fontFamily: mono, fontSize: 10, fontWeight: 600,
    letterSpacing: 2.5, textTransform: "uppercase",
    color: C.accent, padding: "5px 14px",
    border: `1px solid ${C.accent}44`,
    borderRadius: 2, marginBottom: 20,
  }}>{children}</span>
);

// ─── Hero Section ───
const Hero = ({ tag, title, sub, cta, onCta, cta2, onCta2 }) => (
  <GridBg opacity={0.05} style={{ background: C.bg }}>
    <section style={{
      padding: "100px 48px 80px", textAlign: "center",
      fontFamily: font, maxWidth: 900, margin: "0 auto",
    }}>
      {tag && <Tag>{tag}</Tag>}
      <h1 style={{
        color: C.textPrimary, fontSize: 52, fontWeight: 700,
        lineHeight: 1.1, margin: "0 0 22px", letterSpacing: -1.5,
      }}>{title}</h1>
      <p style={{
        color: C.textSecondary, fontSize: 17, lineHeight: 1.7,
        margin: "0 auto 40px", maxWidth: 620,
      }}>{sub}</p>
      <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
        {cta && <button onClick={onCta} style={{
          background: C.accent, color: C.white, border: "none",
          padding: "12px 30px", borderRadius: 4, fontSize: 13,
          fontWeight: 600, cursor: "pointer", fontFamily: font,
          letterSpacing: 0.5, textTransform: "uppercase",
        }}>{cta}</button>}
        {cta2 && <button onClick={onCta2} style={{
          background: "transparent", color: C.textSecondary,
          border: `1px solid ${C.border}`,
          padding: "12px 30px", borderRadius: 4, fontSize: 13,
          fontWeight: 600, cursor: "pointer", fontFamily: font,
          letterSpacing: 0.5, textTransform: "uppercase",
        }}>{cta2}</button>}
      </div>
    </section>
  </GridBg>
);

// ─── Section Heading ───
const SectionTitle = ({ label, title, subtitle, light = true }) => (
  <div style={{ textAlign: "center", marginBottom: 52 }}>
    {label && <div style={{
      fontFamily: mono, color: C.accent, fontSize: 10, fontWeight: 600,
      letterSpacing: 3, textTransform: "uppercase", marginBottom: 14,
    }}>{label}</div>}
    <h2 style={{
      fontSize: 36, fontWeight: 700,
      color: light ? C.textPrimary : C.bg,
      margin: "0 0 14px", letterSpacing: -0.8,
      fontFamily: font,
    }}>{title}</h2>
    {subtitle && <p style={{
      color: light ? C.textSecondary : C.textMuted,
      fontSize: 15, lineHeight: 1.65, maxWidth: 560, margin: "0 auto",
    }}>{subtitle}</p>}
  </div>
);

// ─── Stat Block ───
const Stat = ({ number, label }) => (
  <div style={{ textAlign: "center", flex: 1, minWidth: 150 }}>
    <div style={{
      fontFamily: mono, fontSize: 34, fontWeight: 700,
      color: C.white, letterSpacing: -1,
      marginBottom: 6,
    }}>{number}</div>
    <div style={{
      fontFamily: mono, fontSize: 10, color: C.textMuted,
      letterSpacing: 2, textTransform: "uppercase",
    }}>{label}</div>
  </div>
);

// ─── Geometric Icon ───
const GeoIcon = ({ type, size = 44 }) => {
  const icons = {
    target: (
      <svg width={size} height={size} viewBox="0 0 44 44" fill="none">
        <circle cx="22" cy="22" r="18" stroke={C.accent} strokeWidth="1.5" opacity="0.3"/>
        <circle cx="22" cy="22" r="12" stroke={C.accent} strokeWidth="1.5" opacity="0.5"/>
        <circle cx="22" cy="22" r="5" fill={C.accent} opacity="0.8"/>
        <line x1="22" y1="0" x2="22" y2="10" stroke={C.accent} strokeWidth="1" opacity="0.3"/>
        <line x1="22" y1="34" x2="22" y2="44" stroke={C.accent} strokeWidth="1" opacity="0.3"/>
        <line x1="0" y1="22" x2="10" y2="22" stroke={C.accent} strokeWidth="1" opacity="0.3"/>
        <line x1="34" y1="22" x2="44" y2="22" stroke={C.accent} strokeWidth="1" opacity="0.3"/>
      </svg>
    ),
    play: (
      <svg width={size} height={size} viewBox="0 0 44 44" fill="none">
        <rect x="2" y="2" width="40" height="40" rx="4" stroke={C.accent} strokeWidth="1.5" opacity="0.3"/>
        <polygon points="17,12 34,22 17,32" fill={C.accent} opacity="0.7"/>
      </svg>
    ),
    cycle: (
      <svg width={size} height={size} viewBox="0 0 44 44" fill="none">
        <path d="M22 6 A16 16 0 1 1 6 22" stroke={C.accent} strokeWidth="1.5" fill="none" opacity="0.6"/>
        <polygon points="22,2 26,8 18,8" fill={C.accent} opacity="0.7"/>
        <circle cx="22" cy="22" r="4" fill={C.accent} opacity="0.4"/>
      </svg>
    ),
    gear: (
      <svg width={size} height={size} viewBox="0 0 44 44" fill="none">
        <circle cx="22" cy="22" r="8" stroke={C.accent} strokeWidth="1.5" opacity="0.6"/>
        <circle cx="22" cy="22" r="3" fill={C.accent} opacity="0.5"/>
        {[0,45,90,135,180,225,270,315].map(a => (
          <line key={a} x1="22" y1="22" x2={22 + 18*Math.cos(a*Math.PI/180)} y2={22 + 18*Math.sin(a*Math.PI/180)}
            stroke={C.accent} strokeWidth="1" opacity="0.25"/>
        ))}
      </svg>
    ),
    hex: (
      <svg width={size} height={size} viewBox="0 0 44 44" fill="none">
        <polygon points="22,3 39,13 39,31 22,41 5,31 5,13" stroke={C.accent} strokeWidth="1.5" fill={`${C.accent}10`}/>
        <polygon points="22,12 31,17 31,27 22,32 13,27 13,17" stroke={C.accent} strokeWidth="1" fill={`${C.accent}15`}/>
      </svg>
    ),
    shield: (
      <svg width={size} height={size} viewBox="0 0 44 44" fill="none">
        <path d="M22 4 L38 12 L38 26 Q38 36 22 42 Q6 36 6 26 L6 12 Z" stroke={C.accent} strokeWidth="1.5" fill={`${C.accent}08`}/>
        <path d="M22 16 L18 22 L22 20 L26 22 Z" fill={C.accent} opacity="0.5"/>
      </svg>
    ),
    signal: (
      <svg width={size} height={size} viewBox="0 0 44 44" fill="none">
        <circle cx="22" cy="22" r="4" fill={C.accent} opacity="0.7"/>
        <circle cx="22" cy="22" r="10" stroke={C.accent} strokeWidth="1" opacity="0.4" strokeDasharray="3 3"/>
        <circle cx="22" cy="22" r="16" stroke={C.accent} strokeWidth="1" opacity="0.25" strokeDasharray="3 3"/>
        <circle cx="22" cy="22" r="20" stroke={C.accent} strokeWidth="1" opacity="0.15" strokeDasharray="3 3"/>
      </svg>
    ),
    chip: (
      <svg width={size} height={size} viewBox="0 0 44 44" fill="none">
        <rect x="10" y="10" width="24" height="24" rx="3" stroke={C.accent} strokeWidth="1.5" fill={`${C.accent}10`}/>
        <rect x="16" y="16" width="12" height="12" rx="1" fill={C.accent} opacity="0.3"/>
        {[16,22,28].map(x => <line key={`t${x}`} x1={x} y1="4" x2={x} y2="10" stroke={C.accent} strokeWidth="1" opacity="0.4"/>)}
        {[16,22,28].map(x => <line key={`b${x}`} x1={x} y1="34" x2={x} y2="40" stroke={C.accent} strokeWidth="1" opacity="0.4"/>)}
        {[16,22,28].map(y => <line key={`l${y}`} x1="4" y1={y} x2="10" y2={y} stroke={C.accent} strokeWidth="1" opacity="0.4"/>)}
        {[16,22,28].map(y => <line key={`r${y}`} x1="34" y1={y} x2="40" y2={y} stroke={C.accent} strokeWidth="1" opacity="0.4"/>)}
      </svg>
    ),
    node: (
      <svg width={size} height={size} viewBox="0 0 44 44" fill="none">
        <circle cx="22" cy="22" r="5" fill={C.accent} opacity="0.6"/>
        <circle cx="8" cy="10" r="3" stroke={C.accent} strokeWidth="1" opacity="0.4"/>
        <circle cx="36" cy="10" r="3" stroke={C.accent} strokeWidth="1" opacity="0.4"/>
        <circle cx="8" cy="34" r="3" stroke={C.accent} strokeWidth="1" opacity="0.4"/>
        <circle cx="36" cy="34" r="3" stroke={C.accent} strokeWidth="1" opacity="0.4"/>
        <line x1="22" y1="22" x2="8" y2="10" stroke={C.accent} strokeWidth="1" opacity="0.25"/>
        <line x1="22" y1="22" x2="36" y2="10" stroke={C.accent} strokeWidth="1" opacity="0.25"/>
        <line x1="22" y1="22" x2="8" y2="34" stroke={C.accent} strokeWidth="1" opacity="0.25"/>
        <line x1="22" y1="22" x2="36" y2="34" stroke={C.accent} strokeWidth="1" opacity="0.25"/>
      </svg>
    ),
  };
  return <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>{icons[type] || icons.hex}</div>;
};

// ─── Portal Screenshot Placeholder ───
// Represents actual ARC portal screenshots/video stills from deployment footage
const PortalShot = ({ label, caption, aspect = "16/9", width = "100%", overlay = "satellite" }) => (
  <div style={{
    width, aspectRatio: aspect, background: C.black, borderRadius: 6,
    border: `1px solid ${C.border}`, position: "relative", overflow: "hidden",
  }}>
    {/* Simulated satellite imagery base layer */}
    {overlay === "satellite" && <>
      <div style={{ position: "absolute", inset: 0, background: `linear-gradient(135deg, #1a2a1a 0%, #0d1a0d 30%, #1a2a20 50%, #0a140a 100%)`, opacity: 0.9 }}/>
      <div style={{
        position: "absolute", inset: 0, opacity: 0.08,
        backgroundImage: `linear-gradient(#4a6 1px, transparent 1px), linear-gradient(90deg, #4a6 1px, transparent 1px)`,
        backgroundSize: "32px 32px",
      }}/>
      {/* Simulated structures */}
      <div style={{ position: "absolute", top: "25%", left: "30%", width: "40%", height: "50%", border: `1px solid #5a5a4a33`, borderRadius: 2, background: "#2a2a2022" }}/>
      <div style={{ position: "absolute", top: "30%", left: "35%", width: "12%", height: "18%", background: "#3a3a3044", borderRadius: 1 }}/>
      <div style={{ position: "absolute", top: "32%", left: "52%", width: "14%", height: "22%", background: "#3a3a3044", borderRadius: 1 }}/>
      {/* Firing vectors (red lines) */}
      <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} viewBox="0 0 400 225" preserveAspectRatio="none">
        <line x1="120" y1="180" x2="200" y2="90" stroke={C.accent} strokeWidth="1.5" opacity="0.7"/>
        <line x1="120" y1="180" x2="230" y2="100" stroke={C.accent} strokeWidth="1.5" opacity="0.5"/>
        <line x1="120" y1="180" x2="180" y2="75" stroke={C.accent} strokeWidth="1.5" opacity="0.6"/>
        <line x1="140" y1="170" x2="210" y2="80" stroke={C.accent} strokeWidth="1" opacity="0.4"/>
        <line x1="140" y1="170" x2="250" y2="95" stroke={C.accent} strokeWidth="1" opacity="0.35"/>
        {/* Blue friendly markers */}
        <circle cx="120" cy="180" r="4" fill="#4488FF" opacity="0.9"/>
        <circle cx="140" cy="170" r="4" fill="#4488FF" opacity="0.9"/>
        <circle cx="100" cy="185" r="3" fill="#4488FF" opacity="0.7"/>
        {/* Green partner force markers */}
        <circle cx="280" cy="140" r="3" fill="#44CC66" opacity="0.8"/>
        <circle cx="290" cy="155" r="3" fill="#44CC66" opacity="0.8"/>
        {/* Red OPFOR markers */}
        <circle cx="200" cy="90" r="3" fill="#FF4444" opacity="0.6"/>
        <circle cx="230" cy="100" r="3" fill="#FF4444" opacity="0.6"/>
      </svg>
    </>}
    {overlay === "network" && <>
      <div style={{ position: "absolute", inset: 0, background: `linear-gradient(135deg, #0a1a1a 0%, #051515 50%, #0a1520 100%)` }}/>
      <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} viewBox="0 0 400 225" preserveAspectRatio="none">
        {/* Network nodes */}
        {[[80,60],[160,40],[240,70],[320,50],[60,120],[140,140],[200,110],[280,130],[340,150],[100,180],[200,190],[300,200]].map(([x,y], i) => (
          <g key={i}>
            <circle cx={x} cy={y} r="5" fill="#44bbaa" opacity="0.6"/>
            <circle cx={x} cy={y} r="12" stroke="#44bbaa" strokeWidth="0.5" fill="none" opacity="0.2"/>
          </g>
        ))}
        {/* Connection lines */}
        {[[80,60,160,40],[160,40,240,70],[240,70,320,50],[60,120,140,140],[140,140,200,110],[200,110,280,130],[280,130,340,150],[80,60,60,120],[160,40,140,140],[240,70,200,110],[320,50,280,130],[60,120,100,180],[200,110,200,190],[340,150,300,200]].map(([x1,y1,x2,y2], i) => (
          <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#44bbaa" strokeWidth="0.8" opacity="0.25"/>
        ))}
      </svg>
    </>}
    {/* ARC logo watermark */}
    <div style={{ position: "absolute", top: 12, right: 14, opacity: 0.6 }}>
      <ArcLogo size={22} color={C.white} />
    </div>
    {/* Timeline bar */}
    <div style={{
      position: "absolute", bottom: 0, left: 0, right: 0, height: 32,
      background: `linear-gradient(transparent, ${C.black}CC)`,
      display: "flex", alignItems: "flex-end", padding: "0 12px 6px",
      justifyContent: "space-between",
    }}>
      <div style={{ fontFamily: mono, fontSize: 9, color: C.white, opacity: 0.7, letterSpacing: 1 }}>{label}</div>
      <div style={{ fontFamily: mono, fontSize: 8, color: C.accent, opacity: 0.8, letterSpacing: 0.5 }}>▶ REPLAY</div>
    </div>
    {/* Subtle scan line effect */}
    <div style={{
      position: "absolute", inset: 0, opacity: 0.03,
      backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, ${C.white} 2px, ${C.white} 3px)`,
    }}/>
    {/* Caption overlay */}
    {caption && <div style={{
      position: "absolute", top: 10, left: 12,
      fontFamily: mono, fontSize: 9, color: C.white, opacity: 0.5,
      letterSpacing: 1.5, textTransform: "uppercase",
    }}>{caption}</div>}
  </div>
);

// ─── Discharge Panel Component ───
// Simulates real-time discharge tracking from Bronco Blitz video
// Production note: This will be replaced with a looped video embed from Bronco Blitz footage
const DischargePanel = ({ label = "BRONCO BLITZ FIRING DATA", aspect = "16/9" }) => {
  // Pulsing animation for live indicator
  const pulseKeyframes = `
    @keyframes pulse {
      0%, 100% { opacity: 0.6; }
      50% { opacity: 1; }
    }
  `;

  const weaponData = [
    { id: "TM1-A", rounds: 12 },
    { id: "TM1-B", rounds: 8 },
    { id: "TM2-A", rounds: 15 },
    { id: "TM2-B", rounds: 10 },
    { id: "TM3-A", rounds: 11 },
    { id: "TM3-B", rounds: 9 },
  ];

  return (
    <div style={{
      width: "100%", aspectRatio: aspect, background: C.black,
      borderRadius: 6, border: `1px solid ${C.border}`,
      position: "relative", overflow: "hidden", display: "flex",
    }}>
      <style>{pulseKeyframes}</style>

      {/* LEFT: Satellite-style background with firing cones */}
      <div style={{
        flex: "0 0 70%", position: "relative", background: C.black,
      }}>
        {/* Dark satellite base layer */}
        <div style={{
          position: "absolute", inset: 0,
          background: `linear-gradient(135deg, #0a1a0a 0%, #0d0d0d 30%, #0a1210 50%, #050a05 100%)`,
          opacity: 0.95,
        }}/>

        {/* Subtle grid overlay */}
        <div style={{
          position: "absolute", inset: 0, opacity: 0.06,
          backgroundImage: `linear-gradient(#4a6 1px, transparent 1px), linear-gradient(90deg, #4a6 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}/>

        {/* SVG with firing cones and unit positions */}
        <svg style={{
          position: "absolute", inset: 0, width: "100%", height: "100%",
        }} viewBox="0 0 400 225" preserveAspectRatio="none">
          {/* Friendly position 1 - blue dot */}
          <circle cx="100" cy="180" r="5" fill="#4488FF" opacity="0.95"/>

          {/* Firing cone 1 - red/orange fan from position 1 */}
          <polygon points="100,180 150,80 120,75" fill={C.accent} opacity="0.25"/>
          <line x1="100" y1="180" x2="150" y2="80" stroke={C.accent} strokeWidth="1.5" opacity="0.6"/>
          <line x1="100" y1="180" x2="120" y2="75" stroke={C.accent} strokeWidth="1.5" opacity="0.6"/>
          <line x1="100" y1="180" x2="135" y2="85" stroke={C.accent} strokeWidth="1" opacity="0.3"/>

          {/* Friendly position 2 - blue dot */}
          <circle cx="130" cy="170" r="5" fill="#4488FF" opacity="0.9"/>

          {/* Firing cone 2 - red/orange fan from position 2 */}
          <polygon points="130,170 180,70 160,60" fill={C.accent} opacity="0.2"/>
          <line x1="130" y1="170" x2="180" y2="70" stroke={C.accent} strokeWidth="1.5" opacity="0.5"/>
          <line x1="130" y1="170" x2="160" y2="60" stroke={C.accent} strokeWidth="1" opacity="0.4"/>

          {/* Partner force position - green dot */}
          <circle cx="320" cy="140" r="4" fill="#44CC66" opacity="0.85"/>

          {/* Enemy/target positions - red dots */}
          <circle cx="180" cy="65" r="3" fill="#FF6644" opacity="0.7"/>
          <circle cx="210" cy="85" r="3" fill="#FF6644" opacity="0.6"/>
          <circle cx="155" cy="75" r="2.5" fill="#FF6644" opacity="0.5"/>
        </svg>
      </div>

      {/* RIGHT: Sidebar panel with weapon data */}
      <div style={{
        flex: "0 0 30%", background: C.surfaceRaised,
        borderLeft: `1px solid ${C.border}`,
        display: "flex", flexDirection: "column", padding: "16px",
        overflow: "hidden",
      }}>
        {/* Header */}
        <div style={{
          fontFamily: mono, fontSize: 11, fontWeight: 700,
          color: C.accent, letterSpacing: 2, marginBottom: 12,
          textTransform: "uppercase",
        }}>
          SQUAD ROUNDS: 74
        </div>

        {/* Weapon entries list */}
        <div style={{
          flex: 1, overflow: "auto", marginBottom: 12,
        }}>
          {weaponData.map((w, i) => (
            <div key={w.id} style={{
              display: "flex", alignItems: "center", gap: 8,
              padding: "8px 0", borderBottom: `1px solid ${C.border}`,
            }}>
              {/* Simplified weapon silhouette */}
              <div style={{
                width: 28, height: 12, background: C.border,
                borderRadius: 2, flexShrink: 0,
              }}/>
              {/* Weapon label */}
              <div style={{
                fontFamily: mono, fontSize: 9, color: C.textPrimary,
                flex: 1, letterSpacing: 0.5,
              }}>
                {w.id}
              </div>
              {/* Round count */}
              <div style={{
                fontFamily: mono, fontSize: 10, fontWeight: 600,
                color: C.accent, minWidth: 24, textAlign: "right",
              }}>
                {w.rounds}
              </div>
            </div>
          ))}
        </div>

        {/* Live tracking indicator */}
        <div style={{
          display: "flex", alignItems: "center", gap: 8,
          padding: "8px 0", borderTop: `1px solid ${C.border}`,
        }}>
          <div style={{
            width: 6, height: 6, borderRadius: "50%", background: C.accent,
            animation: "pulse 1.5s ease-in-out infinite",
          }}/>
          <div style={{
            fontFamily: mono, fontSize: 8, color: C.textSecondary,
            letterSpacing: 1.5, textTransform: "uppercase",
          }}>
            LIVE TRACKING
          </div>
        </div>
      </div>

      {/* ARC logo watermark */}
      <div style={{ position: "absolute", top: 12, right: 14, opacity: 0.5 }}>
        <ArcLogo size={20} color={C.white} />
      </div>

      {/* Bottom caption bar */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0, height: 28,
        background: `linear-gradient(transparent, ${C.black}CC)`,
        display: "flex", alignItems: "flex-end", padding: "0 12px 4px",
        justifyContent: "flex-start",
      }}>
        <div style={{
          fontFamily: mono, fontSize: 8, color: C.white,
          opacity: 0.6, letterSpacing: 0.5,
        }}>
          {label}
        </div>
      </div>
    </div>
  );
};

// ─── Video Placeholder Component ───
// For hero looped video and other video embed points
const VideoPlaceholder = ({ label, sublabel, height = 500, children }) => (
  <div style={{
    width: "100%", height, background: C.black, position: "relative",
    overflow: "hidden",
  }}>
    {/* Animated gradient background simulating video */}
    <div style={{
      position: "absolute", inset: 0,
      background: `
        radial-gradient(ellipse at 30% 50%, #0a1a0a 0%, transparent 50%),
        radial-gradient(ellipse at 70% 40%, #1a0a0a 0%, transparent 50%),
        linear-gradient(180deg, ${C.black} 0%, #0a0f0a 30%, #0f0a0a 70%, ${C.black} 100%)
      `,
    }}/>
    {/* Network visualization overlay  */}
    <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} viewBox="0 0 1200 500" preserveAspectRatio="xMidYMid slice">
      {/* Subtle connection lines */}
      {[[100,80,300,150],[300,150,500,100],[500,100,700,200],[700,200,900,120],[900,120,1100,180],
        [200,300,400,250],[400,250,600,350],[600,350,800,280],[800,280,1000,350],
        [100,80,200,300],[300,150,400,250],[500,100,600,350],[700,200,800,280],[900,120,1000,350],
        [150,400,350,350],[550,420,750,380],[950,430,1100,380]
      ].map(([x1,y1,x2,y2], i) => (
        <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#44bbaa" strokeWidth="0.6" opacity="0.12"/>
      ))}
      {/* Nodes */}
      {[[100,80],[300,150],[500,100],[700,200],[900,120],[1100,180],
        [200,300],[400,250],[600,350],[800,280],[1000,350],
        [150,400],[350,350],[550,420],[750,380],[950,430],[1100,380]
      ].map(([x,y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r="3" fill="#44bbaa" opacity={0.3 + (i % 3) * 0.15}/>
          <circle cx={x} cy={y} r="8" stroke="#44bbaa" strokeWidth="0.4" fill="none" opacity="0.1"/>
        </g>
      ))}
    </svg>
    {/* Vignette */}
    <div style={{
      position: "absolute", inset: 0,
      background: `radial-gradient(ellipse at center, transparent 40%, ${C.black}88 100%)`,
    }}/>
    {/* Content overlay */}
    <div style={{
      position: "relative", zIndex: 2, height: "100%",
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
    }}>
      {children}
    </div>
    {/* Video embed marker for production */}
    <div style={{
      position: "absolute", bottom: 16, right: 20,
      fontFamily: mono, fontSize: 9, color: C.textMuted,
      letterSpacing: 1.5, opacity: 0.5,
      display: "flex", alignItems: "center", gap: 6,
    }}>
      <div style={{ width: 6, height: 6, borderRadius: "50%", background: C.accent, opacity: 0.6 }}/>
      {sublabel || "LOOPED VIDEO — HERO"}
    </div>
    {/* Production note */}
    <div style={{
      position: "absolute", bottom: 16, left: 20,
      fontFamily: mono, fontSize: 8, color: C.textMuted,
      letterSpacing: 1, opacity: 0.4, maxWidth: 300,
    }}>{label}</div>
  </div>
);

// ─── Data Pipeline Visualization ───
const PipelineStep = ({ icon, label, desc, last }) => (
  <div style={{ display: "flex", alignItems: "center" }}>
    <div style={{
      width: 200, textAlign: "center", padding: 20,
      background: C.surfaceRaised, borderRadius: 8,
      border: `1px solid ${C.border}`,
    }}>
      <div style={{ marginBottom: 10 }}><GeoIcon type={icon} size={40} /></div>
      <div style={{ fontFamily: mono, fontWeight: 600, fontSize: 11, color: C.textPrimary, letterSpacing: 1, textTransform: "uppercase", marginBottom: 6 }}>{label}</div>
      <div style={{ fontSize: 11, color: C.textMuted, lineHeight: 1.5 }}>{desc}</div>
    </div>
    {!last && <div style={{
      fontFamily: mono, fontSize: 20, color: C.textMuted,
      padding: "0 12px", userSelect: "none",
    }}>→</div>}
  </div>
);

// ─── Footer ───
const Footer = ({ setPage }) => (
  <footer style={{
    background: C.black, padding: "56px 48px 32px",
    fontFamily: font,
    borderTop: `1px solid ${C.border}`,
  }}>
    <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", gap: 56, flexWrap: "wrap" }}>
      <div style={{ flex: 1, minWidth: 220 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
          <ArcLogo size={30} color={C.textPrimary} />
          <span style={{ color: C.textPrimary, fontWeight: 600, fontSize: 12, letterSpacing: 3, fontFamily: mono, textTransform: "uppercase" }}>Armaments Research Company</span>
        </div>
        <p style={{ color: C.textMuted, fontSize: 12, lineHeight: 1.7, maxWidth: 280 }}>
          AI-enabled weapon sensors delivering real-time situational awareness, predictive logistics, and training optimization.
        </p>
        <div style={{ display: "flex", gap: 16, marginTop: 14 }}>
          <span style={{ fontFamily: mono, fontSize: 10, color: C.textMuted, letterSpacing: 1 }}>WASHINGTON, D.C.</span>
          <span style={{ fontFamily: mono, fontSize: 10, color: C.accent, letterSpacing: 1 }}>CLEARED FACILITY</span>
        </div>
      </div>
      <div style={{ display: "flex", gap: 48, flexWrap: "wrap" }}>
        {[
          { title: "Platform", links: [{ l: "AEWS Technology", p: "Technology" }, { l: "Sensor Hardware", p: "Technology" }, { l: "Data & Analytics", p: "Technology" }] },
          { title: "Solutions", links: [{ l: "Operations", p: "Operations" }, { l: "Training", p: "Training" }, { l: "Programs", p: "Programs" }] },
          { title: "Company", links: [{ l: "About", p: "Company" }, { l: "Newsroom", p: "Newsroom" }, { l: "Careers", p: "Company" }, { l: "Contact", p: "Contact" }] },
        ].map(col => (
          <div key={col.title}>
            <div style={{ fontFamily: mono, color: C.textMuted, fontSize: 10, fontWeight: 600, letterSpacing: 2, textTransform: "uppercase", marginBottom: 14 }}>{col.title}</div>
            {col.links.map(item => (
              <div key={item.l} onClick={() => setPage(item.p)}
                style={{ color: C.textSecondary, fontSize: 12, padding: "4px 0", cursor: "pointer" }}>{item.l}</div>
            ))}
          </div>
        ))}
      </div>
    </div>
    <div style={{
      maxWidth: 1100, margin: "36px auto 0", paddingTop: 18,
      borderTop: `1px solid ${C.border}`,
      display: "flex", justifyContent: "space-between", alignItems: "center",
    }}>
      <span style={{ fontFamily: mono, color: C.textMuted, fontSize: 10, letterSpacing: 0.5 }}>© 2026 Armaments Research Company, Inc.</span>
      <span style={{ fontFamily: mono, color: C.textMuted, fontSize: 10 }}>info@armaments.us</span>
    </div>
  </footer>
);


// ═══════════════════════════════════════════════════
// PAGE: HOME
// ═══════════════════════════════════════════════════
const HomePage = ({ setPage }) => (
  <div>
    {/* ─── HERO VIDEO SECTION ─── */}
    {/* Full-width looped video hero. In production, replace VideoPlaceholder with
        a <video autoPlay muted loop playsInline> element using the branded network intro
        network animation or a custom "sensor to decision" motion piece. */}
    <VideoPlaceholder
      height={560}
      label="Replace with looped hero video (branded network intro or custom 'sensor to decision' animation)"
      sublabel="LOOPED VIDEO — MUTED AUTOPLAY"
    >
      <Tag>Weapon-Borne Intelligence</Tag>
      <h1 style={{
        color: C.textPrimary, fontSize: 58, fontWeight: 700,
        lineHeight: 1.08, margin: "0 0 24px", letterSpacing: -2,
        fontFamily: font, textAlign: "center",
      }}>
        One Sensor.<br/>Seven Capabilities.
      </h1>
      <p style={{
        color: C.textSecondary, fontSize: 18, lineHeight: 1.7,
        margin: "0 auto 44px", maxWidth: 660, textAlign: "center",
        fontFamily: font,
      }}>
        ARC builds AI-enabled weapon sensors that turn every firearm into an information node —
        delivering engagement intelligence, early warning, predictive logistics,
        training analytics, and passive C-UAS detection. Go-dark capable.
      </p>
      <div style={{ display: "flex", gap: 14, justifyContent: "center" }}>
        <button onClick={() => setPage("Technology")} style={{
          background: C.accent, color: C.white, border: "none",
          padding: "13px 32px", borderRadius: 4, fontSize: 13,
          fontWeight: 600, cursor: "pointer", fontFamily: font,
          letterSpacing: 0.8, textTransform: "uppercase",
        }}>Explore the Platform</button>
        <button onClick={() => setPage("Contact")} style={{
          background: `${C.white}15`, color: C.white,
          border: `1px solid ${C.white}30`,
          backdropFilter: "blur(8px)",
          padding: "13px 32px", borderRadius: 4, fontSize: 13,
          fontWeight: 600, cursor: "pointer", fontFamily: font,
          letterSpacing: 0.8, textTransform: "uppercase",
        }}>Request Briefing</button>
      </div>
    </VideoPlaceholder>

    {/* Stats Bar */}
    <section style={{
      padding: "44px 48px",
      background: C.surface,
      borderTop: `1px solid ${C.border}`,
      borderBottom: `1px solid ${C.border}`,
    }}>
      <div style={{ display: "flex", gap: 28, maxWidth: 1100, margin: "0 auto", flexWrap: "wrap", justifyContent: "center" }}>
        <Stat number="$950M" label="JADC2 IDIQ Ceiling" />
        <div style={{ width: 1, background: C.border, alignSelf: "stretch" }}/>
        <Stat number="$60M" label="DoD Production Contract" />
        <div style={{ width: 1, background: C.border, alignSelf: "stretch" }}/>
        <Stat number="$15M" label="Air Force STRATFI" />
        <div style={{ width: 1, background: C.border, alignSelf: "stretch" }}/>
        <Stat number="2016" label="Founded" />
      </div>
    </section>

    {/* ─── PORTAL PREVIEW — Engagement Replay ─── */}
    {/* Full-width portal screenshot showing real engagement data */}
    <section style={{ padding: "72px 48px 0", background: C.bg }}>
      <SectionTitle
        label="See It In Action"
        title="Real Engagement Data. Real Operations."
        subtitle="ARC's portal replays weapon-level data on satellite imagery — showing every trigger pull, firing vector, and unit movement in real time."
      />
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <PortalShot
          label="JOINT FORCE ENGAGEMENT REPLAY — SYNTHETIC DATA"
          caption="ARC AEWS // LIVE REPLAY"
          overlay="satellite"
          aspect="16/9"
        />
        <div style={{ display: "flex", justifyContent: "center", gap: 24, marginTop: 16, marginBottom: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#4488FF" }}/>
            <span style={{ fontFamily: mono, fontSize: 10, color: C.textMuted, letterSpacing: 0.5 }}>US FORCES</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#44CC66" }}/>
            <span style={{ fontFamily: mono, fontSize: 10, color: C.textMuted, letterSpacing: 0.5 }}>PARTNER FORCE</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <div style={{ width: 8, height: 2, background: C.accent }}/>
            <span style={{ fontFamily: mono, fontSize: 10, color: C.textMuted, letterSpacing: 0.5 }}>FIRING VECTORS</span>
          </div>
        </div>
      </div>
    </section>

    {/* Seven Capabilities */}
    <section style={{ padding: "72px 48px 80px", background: C.bg }}>
      <SectionTitle
        label="The ARC AEWS Platform"
        title="One Sensor. Seven Capabilities."
        subtitle="A single ruggedized weapon sensor unlocks operational capability across the full spectrum — from the individual firearm to the joint force."
      />
      {/* Top row: 4 cards */}
      <div style={{
        display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))",
        gap: 14, maxWidth: 1100, margin: "0 auto 14px",
      }}>
        {[
          { num: "01", icon: "target", title: "Engagement Intelligence", desc: "Automated, real-time COP overlay showing which units are in contact, volume of fire, and bearing — replacing fragmentary voice reports with machine-generated ground truth.", page: "Operations" },
          { num: "02", icon: "signal", title: "Passive C-UAS Detection", desc: "Aggregated firing vectors triangulate aerial threats — no active emissions required. Go-dark mode suppresses all BLE transmissions when signature discipline demands it.", page: "Operations" },
          { num: "03", icon: "node", title: "AI/ML Data Foundation", desc: "First large-scale kinetic engagement dataset — millions of labeled data points monthly feeding AI models, simulations, digital twins, and autonomous system development.", page: "Technology" },
          { num: "04", icon: "shield", title: "Distributed Early Warning", desc: "Any engagement anywhere in the battlespace is instantly visible across the network — automated contact detection and threat-axis cueing without voice relay.", page: "Operations" },
        ].map((c, i) => (
          <div key={i} onClick={() => setPage(c.page)} style={{
            background: C.surface, borderRadius: 8, padding: 26,
            border: `1px solid ${C.border}`, cursor: "pointer",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
              <span style={{ fontFamily: mono, fontSize: 20, fontWeight: 700, color: C.accent, opacity: 0.4 }}>{c.num}</span>
              <GeoIcon type={c.icon} size={32} />
            </div>
            <h3 style={{ fontSize: 15, fontWeight: 600, color: C.textPrimary, margin: "0 0 8px", fontFamily: font }}>{c.title}</h3>
            <p style={{ fontSize: 12, color: C.textSecondary, lineHeight: 1.6, margin: 0 }}>{c.desc}</p>
          </div>
        ))}
      </div>
      {/* Bottom row: 3 cards */}
      <div style={{
        display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        gap: 14, maxWidth: 1100, margin: "0 auto",
      }}>
        {[
          { num: "05", icon: "cycle", title: "Ammo Accountability", desc: "Exact round count per weapon, per soldier, in real time. Enables predictive resupply, right-sized logistics, and eliminates manual expenditure reporting.", page: "Operations" },
          { num: "06", icon: "gear", title: "Weapon Health & Maintenance", desc: "Continuous stress profiles per weapon drive condition-based maintenance — replacing calendar-based schedules with data-driven failure prediction.", page: "Operations" },
          { num: "07", icon: "play", title: "Training Analytics", desc: "Objective, repeatable lethality metrics from squad to brigade. Every training event produces structured data for readiness measurement and training ROI.", page: "Training" },
        ].map((c, i) => (
          <div key={i} onClick={() => setPage(c.page)} style={{
            background: C.surface, borderRadius: 8, padding: 26,
            border: `1px solid ${C.border}`, cursor: "pointer",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
              <span style={{ fontFamily: mono, fontSize: 20, fontWeight: 700, color: C.accent, opacity: 0.4 }}>{c.num}</span>
              <GeoIcon type={c.icon} size={32} />
            </div>
            <h3 style={{ fontSize: 15, fontWeight: 600, color: C.textPrimary, margin: "0 0 8px", fontFamily: font }}>{c.title}</h3>
            <p style={{ fontSize: 12, color: C.textSecondary, lineHeight: 1.6, margin: 0 }}>{c.desc}</p>
          </div>
        ))}
      </div>
    </section>

    {/* Sensor-to-Decision Pipeline Preview */}
    <section style={{ padding: "72px 48px", background: C.surface, borderTop: `1px solid ${C.border}` }}>
      <SectionTitle label="Architecture" title="Sensor to Decision" subtitle="From the weapon grip to the commander's dashboard — in real time." />
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "center",
        gap: 0, flexWrap: "wrap", maxWidth: 1100, margin: "0 auto",
      }}>
        <PipelineStep icon="chip" label="GRIP Sensor" desc="Ruggedized IoT. Captures discharge, rounds, position, time." />
        <PipelineStep icon="signal" label="Edge Compute" desc="On-device processing. Operates in denied environments." />
        <PipelineStep icon="node" label="AI/ML Engine" desc="Predictive models transform data into intelligence." />
        <PipelineStep icon="target" label="Commander View" desc="COP integration. Dashboards. Automated triggers." last />
      </div>
      <div style={{ textAlign: "center", marginTop: 36 }}>
        <button onClick={() => setPage("Technology")} style={{
          background: "transparent", color: C.accent,
          border: `1px solid ${C.accent}44`,
          padding: "10px 24px", borderRadius: 4, fontSize: 12,
          fontWeight: 600, cursor: "pointer", fontFamily: mono,
          letterSpacing: 1, textTransform: "uppercase",
        }}>Deep Dive: Technology →</button>
      </div>
    </section>

    {/* Featured News */}
    <section style={{ padding: "72px 48px", background: C.bg }}>
      <SectionTitle label="Newsroom" title="Recent Developments" />
      <div style={{ display: "flex", gap: 16, maxWidth: 1100, margin: "0 auto", flexWrap: "wrap" }}>
        {[
          { date: "OCT 2025", title: "25th Infantry Division EONS Deployment — Hawaii", desc: "ARC AEWS fielded with the 25th Infantry Division during EONS exercise in Hawaii, validating weapon-borne intelligence in Pacific theater operations." },
          { date: "SEP 2025", title: "101st Airborne JRTC EONS Exercise", desc: "ARC technology deployed with the 101st Airborne Division at JRTC, providing real-time engagement intelligence during large-scale combat exercise." },
          { date: "2025", title: "Project FLYTRAP 4.5 — Passive Sensing Winner", desc: "ARC wins passive sensing category at Project FLYTRAP 4.5 in Germany, validating passive C-UAS detection capability using aggregated firing vectors." },
        ].map((n, i) => (
          <div key={i} onClick={() => setPage("Newsroom")} style={{
            flex: "1 1 300px", padding: 24, borderRadius: 8,
            background: C.surface, border: `1px solid ${C.border}`,
            cursor: "pointer", borderLeft: `2px solid ${C.accent}`,
          }}>
            <div style={{ fontFamily: mono, color: C.accent, fontSize: 10, fontWeight: 600, letterSpacing: 2, marginBottom: 10 }}>{n.date}</div>
            <h3 style={{ fontSize: 15, fontWeight: 600, color: C.textPrimary, margin: "0 0 8px", lineHeight: 1.35 }}>{n.title}</h3>
            <p style={{ fontSize: 12, color: C.textSecondary, lineHeight: 1.6, margin: 0 }}>{n.desc}</p>
          </div>
        ))}
      </div>
      <div style={{ textAlign: "center", marginTop: 28 }}>
        <button onClick={() => setPage("Newsroom")} style={{
          background: "transparent", color: C.textSecondary,
          border: `1px solid ${C.border}`,
          padding: "10px 24px", borderRadius: 4, fontSize: 12,
          fontWeight: 600, cursor: "pointer", fontFamily: mono,
          letterSpacing: 1, textTransform: "uppercase",
        }}>All News →</button>
      </div>
    </section>

    {/* Trust Strip */}
    <section style={{
      padding: "44px 48px", background: C.surface,
      borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}`,
    }}>
      <div style={{ textAlign: "center", marginBottom: 20 }}>
        <div style={{ fontFamily: mono, color: C.textMuted, fontSize: 10, fontWeight: 600, letterSpacing: 3, textTransform: "uppercase" }}>Trusted Across the Department of Defense</div>
      </div>
      <div style={{ display: "flex", justifyContent: "center", gap: 16, flexWrap: "wrap" }}>
        {["U.S. Army PEO Soldier", "Army DEVCOM", "USSOCOM", "USMC", "DARPA", "NSF", "JADC2", "101st ABN", "25th ID", "Joint Task Force"].map(name => (
          <div key={name} style={{
            padding: "8px 18px", background: C.surfaceRaised,
            border: `1px solid ${C.border}`, borderRadius: 4,
            fontFamily: mono, color: C.textSecondary, fontSize: 11,
            fontWeight: 500, letterSpacing: 0.5,
          }}>{name}</div>
        ))}
      </div>
    </section>

    {/* Field Validated */}
    <section style={{ padding: "48px 48px", background: C.bg, borderTop: `1px solid ${C.border}` }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ fontFamily: mono, color: C.accent, fontSize: 10, fontWeight: 600, letterSpacing: 3, textTransform: "uppercase", marginBottom: 16, textAlign: "center" }}>Field Validated</div>
        <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap" }}>
          {[
            { unit: "101st ABN", event: "JRTC EONS Sep '25" },
            { unit: "25th ID", event: "Hawaii EONS Oct '25" },
            { unit: "Joint Task Force", event: "Pacific Theater Exercise" },
            { unit: "Ukraine 3rd Assault Bde", event: "Combat testing & C-UAS" },
          ].map((v, i) => (
            <div key={i} style={{
              padding: "10px 18px", background: C.surface,
              border: `1px solid ${C.border}`, borderRadius: 4,
              textAlign: "center",
            }}>
              <div style={{ fontFamily: mono, color: C.textPrimary, fontSize: 12, fontWeight: 600, letterSpacing: 0.5 }}>{v.unit}</div>
              <div style={{ fontFamily: mono, color: C.textMuted, fontSize: 10, marginTop: 3 }}>{v.event}</div>
            </div>
          ))}
        </div>
        <div style={{ textAlign: "center", marginTop: 14 }}>
          <span style={{
            fontFamily: mono, fontSize: 10, fontWeight: 600, letterSpacing: 1.5,
            color: C.accent, padding: "4px 12px",
            border: `1px solid ${C.accent}33`, borderRadius: 3,
            background: `${C.accent}10`,
          }}>PROJECT FLYTRAP 4.5 — PASSIVE SENSING WINNER (GERMANY 2025)</span>
        </div>
      </div>
    </section>

    {/* CTA */}
    <GridBg opacity={0.08} style={{ background: C.bg }}>
      <section style={{ padding: "72px 48px", textAlign: "center" }}>
        <h2 style={{ color: C.textPrimary, fontSize: 30, fontWeight: 700, margin: "0 0 12px" }}>Ready to see how it works?</h2>
        <p style={{ color: C.textSecondary, fontSize: 15, margin: "0 0 28px" }}>Schedule a classified or unclassified briefing with our team.</p>
        <button onClick={() => setPage("Contact")} style={{
          background: C.accent, color: C.white, border: "none",
          padding: "13px 32px", borderRadius: 4, fontSize: 13,
          fontWeight: 600, cursor: "pointer", letterSpacing: 0.8,
          textTransform: "uppercase",
        }}>Contact Us</button>
      </section>
    </GridBg>
  </div>
);



// ═══════════════════════════════════════════════════
// PAGE: TECHNOLOGY
// ═══════════════════════════════════════════════════
const TechnologyPage = ({ setPage }) => (
  <div>
    <Hero
      tag="Weapon-Borne Intelligence"
      title="AI-Enabled Weapon Sensor"
      sub="The Army collects exabytes of data — yet zero from the soldier's weapon. Billions of rounds fired annually generate no structured data linking outcomes to readiness or lethality. ARC's AEWS changes that."
      cta="See It In Operations" onCta={() => setPage("Operations")}
      cta2="See It In Training" onCta2={() => setPage("Training")}
    />

    {/* The GRIP Sensor */}
    <section style={{ padding: "80px 48px", background: C.bg }}>
      <div style={{ maxWidth: 1000, margin: "0 auto", display: "flex", gap: 48, flexWrap: "wrap", alignItems: "center" }}>
        <div style={{ flex: "1 1 400px" }}>
          <div style={{ fontFamily: mono, color: C.accent, fontSize: 10, fontWeight: 600, letterSpacing: 3, marginBottom: 10 }}>THE HARDWARE</div>
          <h2 style={{ fontSize: 34, fontWeight: 700, color: C.textPrimary, margin: "0 0 18px", lineHeight: 1.2 }}>The GRIP Sensor</h2>
          <p style={{ fontSize: 15, color: C.textSecondary, lineHeight: 1.7, margin: "0 0 24px" }}>
            A ruggedized IoT sensor integrated into the weapon grip. Captures discharge events, round count, timestamp, and geolocation — all without modifying the weapon's form factor or operation. The warfighter notices nothing different. The data changes everything.
          </p>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {["Discharge Detection", "Round Count", "Geolocation", "Timestamp", "Weapon Health", "Go-Dark Mode"].map(t => (
              <span key={t} style={{
                padding: "5px 12px", background: C.surfaceRaised,
                border: `1px solid ${C.border}`, borderRadius: 3,
                fontFamily: mono, fontSize: 10, fontWeight: 500,
                color: C.textSecondary, letterSpacing: 0.5,
              }}>{t}</span>
            ))}
          </div>
        </div>
        <div style={{
          flex: "0 0 360px", height: 280, background: C.surface,
          borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center",
          border: `1px solid ${C.border}`, position: "relative", overflow: "hidden",
        }}>
          {/* Technical grid overlay on placeholder */}
          <div style={{
            position: "absolute", inset: 0, opacity: 0.06,
            backgroundImage: `
              linear-gradient(${C.accent} 1px, transparent 1px),
              linear-gradient(90deg, ${C.accent} 1px, transparent 1px)
            `,
            backgroundSize: "20px 20px",
          }}/>
          <div style={{ textAlign: "center", position: "relative" }}>
            <GeoIcon type="chip" size={72} />
            <div style={{ fontFamily: mono, color: C.textSecondary, fontSize: 12, fontWeight: 600, marginTop: 12, letterSpacing: 2 }}>ARC GRIP SENSOR</div>
            <div style={{ fontFamily: mono, color: C.textMuted, fontSize: 10, marginTop: 4 }}>[Product render placeholder]</div>
          </div>
        </div>
      </div>
    </section>

    {/* Data Pipeline with Portal Screenshot */}
    <section style={{ padding: "80px 48px", background: C.surface, borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}` }}>
      <SectionTitle label="Architecture" title="Sensor to Decision" subtitle="From the weapon grip to the commander's dashboard — in real time." />
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "center",
        gap: 0, flexWrap: "wrap", maxWidth: 1100, margin: "0 auto 40px",
      }}>
        <PipelineStep icon="chip" label="GRIP Sensor" desc="Ruggedized IoT in weapon grip. Captures discharge, rounds, position, time." />
        <PipelineStep icon="signal" label="Edge Processing" desc="On-device compute. Local storage for contested, denied environments." />
        <PipelineStep icon="node" label="AI/ML Analytics" desc="Cloud models transform raw data into operational intelligence and predictions." />
        <PipelineStep icon="target" label="Commander View" desc="COP integration, AAR dashboards, automated resupply, maintenance alerts." last />
      </div>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <div style={{ fontFamily: mono, color: C.accent, fontSize: 10, fontWeight: 600, letterSpacing: 3, textTransform: "uppercase", marginBottom: 12, textAlign: "center" }}>Commander View — Live Portal</div>
        <div style={{
          width: "100%", aspectRatio: "16/9", background: C.surfaceRaised, borderRadius: 8,
          border: `1px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "center",
          position: "relative", overflow: "hidden",
        }}>
          <div style={{ position: "absolute", inset: 0, opacity: 0.04, backgroundImage: `linear-gradient(${C.accent} 1px, transparent 1px), linear-gradient(90deg, ${C.accent} 1px, transparent 1px)`, backgroundSize: "28px 28px" }}/>
          <div style={{ textAlign: "center", position: "relative" }}>
            <GeoIcon type="target" size={72} />
            <div style={{ fontFamily: mono, color: C.textSecondary, fontSize: 12, fontWeight: 600, marginTop: 12, letterSpacing: 2 }}>COMMANDER DASHBOARD</div>
            <div style={{ fontFamily: mono, color: C.textMuted, fontSize: 10, marginTop: 4 }}>[Portal screenshot or looped video placeholder]</div>
          </div>
        </div>
      </div>
    </section>

    {/* Platform Capabilities */}
    <section style={{ padding: "80px 48px", background: C.bg }}>
      <SectionTitle label="Platform Capabilities" title="Built for the Battlefield" />
      <div style={{
        display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        gap: 16, maxWidth: 1100, margin: "0 auto",
      }}>
        {[
          { icon: "hex", t: "Modular Open System Architecture", d: "MOSA-compliant design adapts to new weapon systems. Currently fielded across multiple small arms platforms including the M249 SAW." },
          { icon: "signal", t: "Contested Environment Ready", d: "Edge processing ensures data capture and local storage even when connectivity is denied. Batch sync when networks restore." },
          { icon: "shield", t: "Security by Design", d: "End-to-end encryption. Cleared facility. Built to DoD cybersecurity standards from the ground up." },
          { icon: "target", t: "Real-Time Processing", d: "Sub-second latency from weapon discharge to COP update when network conditions permit." },
          { icon: "node", t: "Integration Ready", d: "Open APIs and standard data formats enable integration with existing C2 systems, autonomous platforms, and JADC2 architecture." },
          { icon: "chip", t: "AI/ML at the Edge", d: "Machine learning delivers predictive logistics, anomaly detection, weapon health monitoring, and pattern recognition across formations." },
        ].map((f, i) => (
          <div key={i} style={{
            background: C.surface, borderRadius: 8, padding: 28,
            border: `1px solid ${C.border}`,
          }}>
            <div style={{ marginBottom: 14 }}><GeoIcon type={f.icon} size={36} /></div>
            <h3 style={{ fontSize: 15, fontWeight: 600, color: C.textPrimary, margin: "0 0 8px" }}>{f.t}</h3>
            <p style={{ fontSize: 13, color: C.textSecondary, lineHeight: 1.65, margin: 0 }}>{f.d}</p>
          </div>
        ))}
      </div>
    </section>

    {/* Cross-link */}
    <section style={{ padding: "56px 48px", background: C.surface, borderTop: `1px solid ${C.border}`, textAlign: "center" }}>
      <h2 style={{ color: C.textPrimary, fontSize: 24, fontWeight: 700, margin: "0 0 10px" }}>See the impact across operations and training</h2>
      <p style={{ color: C.textSecondary, fontSize: 14, margin: "0 0 24px" }}>The same sensor, the same data — applied to every phase of the fight and every phase of readiness.</p>
      <div style={{ display: "flex", gap: 14, justifyContent: "center" }}>
        <button onClick={() => setPage("Operations")} style={{ background: C.accent, color: C.white, border: "none", padding: "11px 26px", borderRadius: 4, fontSize: 12, fontWeight: 600, cursor: "pointer", letterSpacing: 0.8, textTransform: "uppercase" }}>Operations →</button>
        <button onClick={() => setPage("Training")} style={{ background: "transparent", color: C.textSecondary, border: `1px solid ${C.border}`, padding: "11px 26px", borderRadius: 4, fontSize: 12, fontWeight: 600, cursor: "pointer", letterSpacing: 0.8, textTransform: "uppercase" }}>Training →</button>
      </div>
    </section>
  </div>
);

const OperationsPage = ({ setPage }) => (
  <div>
    <Hero tag="Operations" title={<>See the Fight.<br/>Command the Fight.</>}
      sub="In large-scale combat operations, commanders lack real-time visibility at the weapon level. ARC changes that — turning every trigger pull into a data point that informs decisions from squad leader to brigade."
      cta="Request Briefing" onCta={() => setPage("Contact")} />

    {/* ─── Featured Portal: Real-Time Discharge Tracking ─── */}
    <section style={{ padding: "64px 48px", background: C.surface, borderTop: `1px solid ${C.border}` }}>
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <div style={{ fontFamily: mono, color: C.accent, fontSize: 10, fontWeight: 600, letterSpacing: 3, marginBottom: 10, textAlign: "center" }}>REAL-TIME DISCHARGE TRACKING</div>
        <h2 style={{ fontSize: 28, fontWeight: 700, color: C.textPrimary, margin: "0 0 14px", lineHeight: 1.25, textAlign: "center", fontFamily: font }}>This Is What the Commander Sees</h2>
        <p style={{ fontSize: 14, color: C.textSecondary, lineHeight: 1.7, margin: "0 auto 28px", textAlign: "center", maxWidth: 680 }}>
          Every trigger pull tracked in real time. Individual weapon round counts, squad-level ammunition status, and firing vectors — all captured automatically by ARC sensors and displayed on the commander's dashboard.
        </p>
        <DischargePanel
          label="EXERCISE ENGAGEMENT REPLAY — SQUAD LIVE-FIRE (SYNTHETIC DATA)"
          aspect="16/9"
        />
        <p style={{ fontFamily: font, fontSize: 12, color: C.textMuted, textAlign: "center", marginTop: 12, lineHeight: 1.5, fontStyle: "italic" }}>
          In production, this section will be a looped video from live exercise footage showing real-time discharge tracking.
        </p>
      </div>
    </section>

    <section style={{ padding: "80px 48px", background: C.bg }}>
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        {[
          { label: "COMMAND & CONTROL", icon: "target", title: "Common Operating Picture — Enhanced",
            desc: "Every weapon discharge is timestamped, geolocated, and fed into the COP in real time. Commanders see where engagements are happening, how intense they are, and how they're evolving — without waiting for a radio report." },
          { label: "FORCE PROTECTION", icon: "shield", title: "Fratricide Reduction",
            desc: "When you know the precise location and firing direction of every friendly weapon in the battlespace, you can build deconfliction tools that save lives. ARC's data layer provides the positional fidelity that existing blue force tracking systems lack at the individual weapon level." },
          { label: "SUSTAINMENT", icon: "cycle", title: "Predictive Resupply",
            desc: "Instead of waiting for a radio call that ammunition is running low, logistics nodes see real-time consumption data across the formation. Resupply is pushed forward automatically, prioritized by urgency. In LSCO, this is the difference between a unit that fights through and one that culminates." },
          { label: "MAINTENANCE", icon: "gear", title: "Conditions-Based Maintenance",
            desc: "Weapon health monitoring replaces calendar-based maintenance cycles. Know which weapons need attention before they fail — not after. Round-count tracking, usage patterns, and anomaly detection keep the force in the fight." },
          { label: "COUNTER-UAS", icon: "signal", title: "Passive C-UAS Detection",
            desc: "Aggregated firing vectors triangulate aerial threats — no active emissions required. Operator-controlled go-dark mode suppresses all BLE transmissions when signature discipline demands it. Winner, Project FLYTRAP 4.5 passive sensing category." },
          { label: "JOINT ARCHITECTURE", icon: "node", title: "Autonomous System Integration",
            desc: "Weapon sensor data cues autonomous resupply vehicles, redirects ISR assets, and triggers counter-UAS responses. This is the JADC2 vision made tangible — weapons as sensor nodes in a joint information architecture." },
        ].map((item, i) => (
          <div key={i} style={{
            display: "flex", gap: 36, alignItems: "flex-start",
            marginBottom: 48, flexDirection: i % 2 === 1 ? "row-reverse" : "row",
            flexWrap: "wrap",
          }}>
            <div style={{ flex: "1 1 380px" }}>
              <div style={{ fontFamily: mono, color: C.accent, fontSize: 10, fontWeight: 600, letterSpacing: 3, marginBottom: 10 }}>{item.label}</div>
              <h3 style={{ fontSize: 26, fontWeight: 700, color: C.textPrimary, margin: "0 0 14px", lineHeight: 1.25 }}>{item.title}</h3>
              <p style={{ fontSize: 14, color: C.textSecondary, lineHeight: 1.7, margin: 0 }}>{item.desc}</p>
            </div>
            <div style={{ flex: "0 0 380px" }}>
              <div style={{
                flex: "0 0 380px", aspectRatio: "4/3", background: C.surface,
                borderRadius: 8, border: `1px solid ${C.border}`,
                display: "flex", alignItems: "center", justifyContent: "center",
                position: "relative", overflow: "hidden",
              }}>
                <div style={{
                  position: "absolute", inset: 0, opacity: 0.04,
                  backgroundImage: `linear-gradient(${C.accent} 1px, transparent 1px), linear-gradient(90deg, ${C.accent} 1px, transparent 1px)`,
                  backgroundSize: "24px 24px",
                }}/>
                <div style={{ position: "relative" }}><GeoIcon type={item.icon} size={64} /></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>

    <section style={{ padding: "56px 48px", background: C.surface, borderTop: `1px solid ${C.border}`, textAlign: "center" }}>
      <h2 style={{ fontSize: 24, fontWeight: 700, color: C.textPrimary, margin: "0 0 10px" }}>See how the same data transforms training</h2>
      <p style={{ color: C.textSecondary, fontSize: 14, margin: "0 0 20px" }}>One platform. Operational impact and training optimization from the same sensor.</p>
      <button onClick={() => setPage("Training")} style={{ background: C.accent, color: C.white, border: "none", padding: "11px 26px", borderRadius: 4, fontSize: 12, fontWeight: 600, cursor: "pointer", letterSpacing: 0.8, textTransform: "uppercase" }}>Explore Training →</button>
    </section>
  </div>
);


// ═══════════════════════════════════════════════════
// PAGE: TRAINING
// ═══════════════════════════════════════════════════
const TrainingPage = ({ setPage }) => (
  <div>
    <Hero tag="Training Optimization" title="Game Film for Ground Combat"
      sub="After-action reviews rely on memory, radio logs, and guesswork. ARC provides the quantitative foundation that training commands need — every trigger pull captured, every engagement reconstructable."
      cta="Request Briefing" onCta={() => setPage("Contact")} />

    <section style={{ padding: "80px 48px", background: C.bg }}>
      <SectionTitle label="The Problem" title="You Can't Improve What You Can't Measure"
        subtitle="Every sport has game film. Every flight has a black box. Ground combat units have neither — until now." />

      {/* ─── Tactical Replay Portal Screenshot ─── */}
      <div style={{ maxWidth: 1000, margin: "0 auto 48px" }}>
        <div style={{
          background: C.surface, borderRadius: 8, overflow: "hidden",
          border: `1px solid ${C.border}`, boxShadow: `0 20px 60px ${C.black}88`,
        }}>
          {/* Terminal-style header — matching actual portal UI */}
          <div style={{
            padding: "8px 16px", background: C.black,
            display: "flex", alignItems: "center", gap: 8,
            borderBottom: `1px solid ${C.border}`,
          }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#FF5F57" }}/>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#FEBC2E" }}/>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#28C840" }}/>
            <span style={{ fontFamily: mono, color: C.textMuted, fontSize: 10, marginLeft: 10, letterSpacing: 1 }}>ARC AEWS // ENGAGEMENT REPLAY — EXERCISE IRON SENTINEL</span>
          </div>
          {/* Portal map view */}
          <PortalShot
            label="JOINT FORCE EXERCISE — PARTNERED ASSAULT ON HARDENED STRUCTURES — SYNTHETIC DATA"
            caption="COMBINED TASK FORCE & PARTNER ELEMENT"
            overlay="satellite"
            aspect="16/9"
          />
          {/* Replay controls bar */}
          <div style={{
            padding: "10px 16px", background: C.black,
            display: "flex", alignItems: "center", gap: 16,
            borderTop: `1px solid ${C.border}`,
          }}>
            <div style={{ fontFamily: mono, fontSize: 10, color: C.accent, fontWeight: 600 }}>▶ PLAY</div>
            <div style={{ flex: 1, height: 3, background: C.border, borderRadius: 2, position: "relative" }}>
              <div style={{ width: "35%", height: "100%", background: C.accent, borderRadius: 2 }}/>
            </div>
            <div style={{ fontFamily: mono, fontSize: 9, color: C.textMuted }}>1400 GMT — 1835 GMT</div>
            <div style={{ fontFamily: mono, fontSize: 9, color: C.textMuted }}>1x SPEED</div>
          </div>
        </div>
        <p style={{ fontFamily: font, fontSize: 13, color: C.textMuted, textAlign: "center", marginTop: 14, lineHeight: 1.6 }}>
          ARC portal replay from Joint Force Exercise Iron Sentinel. Soldier movement, weapon orientation, and team maneuver captured in real time. US units (blue), Partner Force (green), OPFOR (red). (Synthetic scenario data.)
        </p>
      </div>

      {/* Dashboard Mockup — redesigned with dark technical aesthetic */}
      <div style={{
        maxWidth: 940, margin: "0 auto 60px", background: C.surface, borderRadius: 8,
        overflow: "hidden", border: `1px solid ${C.border}`,
        boxShadow: `0 20px 60px ${C.black}88`,
      }}>
        {/* Terminal-style header */}
        <div style={{
          padding: "8px 16px", background: C.black,
          display: "flex", alignItems: "center", gap: 8,
          borderBottom: `1px solid ${C.border}`,
        }}>
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#FF5F57" }}/>
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#FEBC2E" }}/>
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#28C840" }}/>
          <span style={{ fontFamily: mono, color: C.textMuted, fontSize: 10, marginLeft: 10, letterSpacing: 1 }}>ARC AEWS // AFTER-ACTION REVIEW — EXERCISE THUNDER RESOLVE</span>
        </div>
        <div style={{ padding: 24 }}>
          {/* Metrics Row */}
          <div style={{ display: "flex", gap: 12, marginBottom: 18, flexWrap: "wrap" }}>
            {[
              { label: "Rounds Fired", val: "2,847", delta: "+12% vs baseline", up: true },
              { label: "Avg Time-to-First-Shot", val: "3.2s", delta: "-0.8s improvement", up: true },
              { label: "Ammo Discipline Score", val: "87/100", delta: "+14 pts", up: true },
              { label: "Engagements Captured", val: "156", delta: "100% coverage", up: true },
            ].map((m, i) => (
              <div key={i} style={{
                flex: "1 1 180px", background: C.surfaceRaised, borderRadius: 6, padding: 16,
                border: `1px solid ${C.border}`,
              }}>
                <div style={{ fontFamily: mono, color: C.textMuted, fontSize: 9, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 6 }}>{m.label}</div>
                <div style={{ fontFamily: mono, color: C.white, fontSize: 28, fontWeight: 700, letterSpacing: -1 }}>{m.val}</div>
                <div style={{ fontFamily: mono, color: C.accent, fontSize: 10, marginTop: 5 }}>{m.delta}</div>
              </div>
            ))}
          </div>
          {/* Charts Row */}
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <div style={{
              flex: "2 1 340px", background: C.surfaceRaised, borderRadius: 6, padding: 20,
              border: `1px solid ${C.border}`,
            }}>
              <div style={{ fontFamily: mono, color: C.textMuted, fontSize: 9, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 14 }}>Rounds per Engagement — Exercise Timeline</div>
              <div style={{ display: "flex", alignItems: "flex-end", gap: 3, height: 90 }}>
                {[45,62,38,71,55,82,67,90,43,76,88,95,60,72,85,50,68,91,74,80,65,77,83,58,92,70].map((h, i) => (
                  <div key={i} style={{
                    flex: 1, height: `${h}%`, borderRadius: 2,
                    background: C.accent,
                    opacity: 0.4 + (h / 200),
                  }}/>
                ))}
              </div>
            </div>
            <div style={{
              flex: "1 1 200px", background: C.surfaceRaised, borderRadius: 6, padding: 20,
              border: `1px solid ${C.border}`,
            }}>
              <div style={{ fontFamily: mono, color: C.textMuted, fontSize: 9, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 14 }}>Formation Activity</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 3 }}>
                {[90,45,72,30,55,88,62,40,35,78,92,50,68,42,85,70].map((v, i) => (
                  <div key={i} style={{
                    height: 24, borderRadius: 2,
                    background: C.accent, opacity: v / 120,
                  }}/>
                ))}
              </div>
              <div style={{ fontFamily: mono, color: C.textMuted, fontSize: 9, marginTop: 10 }}>Squad-level heatmap</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Training Capabilities */}
    <section style={{ padding: "80px 48px", background: C.surface, borderTop: `1px solid ${C.border}` }}>
      <div style={{ maxWidth: 1000, margin: "0 auto", display: "flex", gap: 16, flexWrap: "wrap" }}>
        {[
          { icon: "play", t: "Engagement Reconstruction", d: "Replay any engagement shot by shot. See who fired, when, where, and in what sequence. Identify what went right and why — with data, not memory." },
          { icon: "target", t: "Quantitative Readiness Metrics", d: "Rounds per engagement. Time-to-first-shot. Ammunition discipline. These metrics don't exist in ground combat today. ARC creates them." },
          { icon: "node", t: "Individual to Collective", d: "Roll up individual weapon data to squad, platoon, and company-level patterns. Identify systemic training gaps not visible at the individual level." },
          { icon: "shield", t: "Proven in Combat", d: "ARC technology has been deployed with Ukraine's 3rd Assault Brigade, providing real-world validation of training optimization in combat conditions." },
        ].map((c, i) => (
          <div key={i} style={{
            flex: "1 1 220px", background: C.bg, borderRadius: 8, padding: 28,
            border: `1px solid ${C.border}`,
            borderTop: `2px solid ${C.accent}`,
          }}>
            <div style={{ marginBottom: 14 }}><GeoIcon type={c.icon} size={36} /></div>
            <h3 style={{ fontSize: 16, fontWeight: 600, color: C.textPrimary, margin: "0 0 10px" }}>{c.t}</h3>
            <p style={{ fontSize: 13, color: C.textSecondary, lineHeight: 1.65, margin: 0 }}>{c.d}</p>
          </div>
        ))}
      </div>
    </section>

    <section style={{ padding: "56px 48px", background: C.bg, textAlign: "center" }}>
      <div style={{ display: "flex", gap: 14, justifyContent: "center" }}>
        <button onClick={() => setPage("Operations")} style={{ background: "transparent", color: C.textSecondary, border: `1px solid ${C.border}`, padding: "11px 26px", borderRadius: 4, fontSize: 12, fontWeight: 600, cursor: "pointer", letterSpacing: 0.8, textTransform: "uppercase" }}>← Operations</button>
        <button onClick={() => setPage("Programs")} style={{ background: C.accent, color: C.white, border: "none", padding: "11px 26px", borderRadius: 4, fontSize: 12, fontWeight: 600, cursor: "pointer", letterSpacing: 0.8, textTransform: "uppercase" }}>View Programs →</button>
      </div>
    </section>
  </div>
);


// ═══════════════════════════════════════════════════
// PAGE: PROGRAMS
// ═══════════════════════════════════════════════════
const ProgramsPage = ({ setPage }) => (
  <div>
    <Hero tag="Programs & Past Performance" title="Proven Across the DoD"
      sub="From DARPA seedling to JADC2 IDIQ — ARC has built a track record of delivering AI-enabled weapon sensing across the Army, Air Force, Marine Corps, and Special Operations." />

    <section style={{ padding: "80px 48px", background: C.bg }}>
      <SectionTitle label="Active Programs" title="How to Engage ARC" />
      <div style={{ maxWidth: 920, margin: "0 auto" }}>
        {[
          { vehicle: "JADC2 IDIQ", value: "$950M Ceiling", agency: "U.S. Air Force / Joint", desc: "Indefinite-delivery/indefinite-quantity contract for maturation, demonstration, and proliferation of capability across platforms and domains." },
          { vehicle: "DoD Production Contract", value: "$60M", agency: "Department of Defense", desc: "Major production contract awarded August 2024 for AI-enabled weapon sensor manufacturing and deployment." },
          { vehicle: "Air Force STRATFI", value: "$15M", agency: "U.S. Air Force", desc: "Strategic Financing program to accelerate scaling of ARC's AI-enabled weapon sensing technology." },
          { vehicle: "MILTECH — PEO Soldier", value: "2025", agency: "U.S. Army", desc: "Development of AI-enhanced weapon sensor for the M249 Squad Automatic Weapon via Montana State University partnership." },
          { vehicle: "Air Force Human-Machine Teaming", value: "2025", agency: "U.S. Air Force", desc: "Developing AI capabilities for human-machine teaming in contested environments." },
          { vehicle: "Army DEVCOM Resupply", value: "2025", agency: "U.S. Army DEVCOM", desc: "AI-enabled predictive logistics for automated small unit resupply in large-scale combat operations." },
        ].map((p, i) => (
          <div key={i} style={{
            background: C.surface, borderRadius: 6, padding: 24, marginBottom: 12,
            borderLeft: `2px solid ${C.accent}`,
            border: `1px solid ${C.border}`,
            borderLeftWidth: 2, borderLeftColor: C.accent,
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 6, flexWrap: "wrap" }}>
              <h3 style={{ fontFamily: font, fontSize: 17, fontWeight: 700, color: C.textPrimary, margin: 0 }}>{p.vehicle}</h3>
              <span style={{
                fontFamily: mono, background: `${C.accent}18`, color: C.accent,
                padding: "3px 10px", borderRadius: 3, fontSize: 10,
                fontWeight: 600, letterSpacing: 0.5,
                border: `1px solid ${C.accent}33`,
              }}>{p.value}</span>
            </div>
            <div style={{ fontFamily: mono, color: C.accent, fontSize: 10, fontWeight: 600, letterSpacing: 2, marginBottom: 8 }}>{p.agency}</div>
            <p style={{ fontSize: 13, color: C.textSecondary, lineHeight: 1.6, margin: 0 }}>{p.desc}</p>
          </div>
        ))}
      </div>
    </section>

    {/* Timeline */}
    <section style={{ padding: "80px 48px", background: C.surface, borderTop: `1px solid ${C.border}` }}>
      <SectionTitle label="Track Record" title="Program History"
        subtitle="Eight years of continuous DoD investment — from SBIR to production." />
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        {[
          { year: "2025", items: ["101st ABN EONS (JRTC)", "25th ID EONS (Hawaii)", "Joint Task Force Exercise (Pacific Theater)", "Project FLYTRAP 4.5 Passive Sensing Winner (Germany)", "Air Force Human-Machine Teaming", "Army DEVCOM Small Unit Resupply", "MILTECH M249 SAW — PEO Soldier", "xTech Counterstrike Winner (C-UAS)"] },
          { year: "2024", items: ["$60M DoD Production Contract", "$15M Air Force STRATFI", "Joint Force Weapons Sensing", "USMC Conditions-Based Maintenance", "Army DEVCOM Contested Logistics", "Ukraine 3rd Assault Brigade Deployment", "Executive Team Expansion"] },
          { year: "2023", items: ["JADC2 IDIQ Award ($950M ceiling)", "Continued Army & SOCOM programs"] },
          { year: "2020–22", items: ["ARC-Response platform fielding", "SOCOM SBIR Phase II", "Army xTech Accelerator", "Multiple PEO Soldier engagements"] },
          { year: "2017–19", items: ["NSF SBIR Phase I & II", "DARPA seedling programs", "Initial technology development", "Company founding"] },
        ].map((period, i) => (
          <div key={i} style={{ display: "flex", gap: 20, marginBottom: 24, alignItems: "flex-start" }}>
            <div style={{
              flex: "0 0 72px", textAlign: "right",
              fontFamily: mono, fontSize: 14, fontWeight: 700,
              color: C.accent, paddingTop: 14, letterSpacing: 0.5,
            }}>{period.year}</div>
            <div style={{
              flex: "0 0 12px", display: "flex", flexDirection: "column",
              alignItems: "center", paddingTop: 16,
            }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: C.accent }}/>
              {i < 4 && <div style={{ width: 1, flex: 1, background: C.border, marginTop: 4, minHeight: 50 }}/>}
            </div>
            <div style={{
              flex: 1, background: C.bg, borderRadius: 6, padding: "14px 20px",
              border: `1px solid ${C.border}`,
            }}>
              {period.items.map((item, j) => (
                <div key={j} style={{
                  fontSize: 12, color: C.textSecondary, lineHeight: 1.5, padding: "3px 0",
                  borderBottom: j < period.items.length - 1 ? `1px solid ${C.border}` : "none",
                }}>{item}</div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>

    {/* Partnership Model */}
    <section style={{ padding: "72px 48px", background: C.bg }}>
      <SectionTitle label="Partnership" title="Built to Integrate"
        subtitle="MOSA-compliant. Open APIs. Designed to plug into your architecture — not replace it." />
      <div style={{ display: "flex", gap: 16, maxWidth: 920, margin: "0 auto", flexWrap: "wrap" }}>
        {[
          { t: "For Primes & Integrators", d: "ARC provides the weapon-level sensing layer your platform is missing. Open APIs and standard data formats integrate with existing C2 and logistics systems." },
          { t: "For Program Offices", d: "Sole-source or competitive — ARC's technology is proven, cleared, and ready to pilot. We work within your acquisition framework and timeline." },
          { t: "Security & Clearance", d: "Cleared facility supporting classified programs. NIST 800-171 compliant. Purpose-built for sensitive mission data." },
        ].map((p, i) => (
          <div key={i} style={{
            flex: "1 1 260px", background: C.surface, borderRadius: 8, padding: 28,
            border: `1px solid ${C.border}`,
          }}>
            <h3 style={{ fontSize: 15, fontWeight: 600, color: C.textPrimary, margin: "0 0 8px" }}>{p.t}</h3>
            <p style={{ fontSize: 13, color: C.textSecondary, lineHeight: 1.65, margin: 0 }}>{p.d}</p>
          </div>
        ))}
      </div>
    </section>

    <section style={{ padding: "56px 48px", background: C.surface, borderTop: `1px solid ${C.border}`, textAlign: "center" }}>
      <h2 style={{ color: C.textPrimary, fontSize: 24, fontWeight: 700, margin: "0 0 20px" }}>Ready to discuss your requirements?</h2>
      <button onClick={() => setPage("Contact")} style={{ background: C.accent, color: C.white, border: "none", padding: "11px 26px", borderRadius: 4, fontSize: 12, fontWeight: 600, cursor: "pointer", letterSpacing: 0.8, textTransform: "uppercase" }}>Contact Us →</button>
    </section>
  </div>
);


// ═══════════════════════════════════════════════════
// PAGE: NEWSROOM
// ═══════════════════════════════════════════════════
const NewsroomPage = () => (
  <div>
    <Hero tag="Newsroom" title="Latest Updates" sub="Contract awards, program milestones, and company news from Armaments Research Company." />

    <section style={{ padding: "80px 48px", background: C.bg }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        {[
          { date: "October 2025", title: "25th Infantry Division EONS Deployment — Hawaii", desc: "ARC AEWS technology fielded with the 25th Infantry Division during EONS exercise in Hawaii, validating weapon-borne intelligence capabilities in Pacific theater operations.", tag: "Deployment" },
          { date: "September 2025", title: "101st Airborne Division JRTC EONS Exercise", desc: "ARC AEWS deployed with the 101st Airborne Division at Joint Readiness Training Center, providing real-time engagement intelligence during large-scale combat operations exercise.", tag: "Deployment" },
          { date: "2025", title: "Project FLYTRAP 4.5 — Passive Sensing Winner (Germany)", desc: "ARC wins the passive sensing category at Project FLYTRAP 4.5 in Germany, validating passive C-UAS detection capability using aggregated firing vectors with no active emissions.", tag: "Award" },
          { date: "August 2025", title: "ARC Selected for Air Force Human-Machine Teaming Program", desc: "ARC has been selected to develop next-generation AI capabilities for human-machine teaming in contested environments, furthering the integration of weapon-level sensing data with autonomous systems.", tag: "Contract Award" },
          { date: "July 2025", title: "Army DEVCOM Awards ARC Small Unit Resupply Contract", desc: "U.S. Army DEVCOM selects ARC to develop AI-enabled predictive logistics capabilities for automated small unit resupply in large-scale combat operations.", tag: "Contract Award" },
          { date: "April 2025", title: "ARC Announces MILTECH Contract with PEO Soldier for M249 SAW", desc: "ARC awarded MILTECH contract through Montana State University supporting U.S. Army PEO Soldier to develop an innovative, AI-powered weapon sensor for the M249 Squad Automatic Weapon.", tag: "Contract Award" },
          { date: "September 2024", title: "ARC Technology Deployed with Ukraine's 3rd Assault Brigade", desc: "ARC's AI-enabled weapon sensing technology is deployed with Ukraine's 3rd Assault Brigade, providing real-world combat validation of training optimization and situational awareness capabilities.", tag: "Deployment" },
          { date: "August 2024", title: "ARC Awarded $60M DoD Production Contract", desc: "Major production contract positions ARC for scaled manufacturing and deployment of AI-enabled weapon sensors across the Department of Defense.", tag: "Contract Award" },
          { date: "August 2024", title: "Air Force Awards ARC $15M STRATFI", desc: "U.S. Air Force Strategic Financing program accelerates scaling of ARC's weapon sensing platform across Air Force special operations and conventional forces.", tag: "Contract Award" },
          { date: "August 2024", title: "USMC Selects ARC for Conditions-Based Maintenance", desc: "U.S. Marine Corps engages ARC to develop AI-enabled conditions-based maintenance capabilities using weapon sensor data to predict and prevent weapon system failures.", tag: "Contract Award" },
          { date: "August 2024", title: "Army DEVCOM Awards Contested Logistics Contract", desc: "ARC selected by Army DEVCOM to develop AI-enabled contested logistics solutions leveraging real-time weapon and ammunition data.", tag: "Contract Award" },
          { date: "July 2024", title: "ARC Announces Executive Appointments", desc: "Armaments Research Company appoints Kyle Rice as Chief Technology Officer and Dan Kurtenbach as Chief Operating Officer, strengthening leadership as the company scales.", tag: "Company News" },
          { date: "July 2024", title: "Joint Force Weapons Sensing Program", desc: "Air Force Special Operations Command engages ARC for AI-enabled weapons sensing capabilities in support of special operations missions.", tag: "Contract Award" },
        ].map((n, i) => (
          <div key={i} style={{
            padding: 24, marginBottom: 12, borderRadius: 6,
            background: i === 0 ? C.surfaceRaised : C.surface,
            border: `1px solid ${C.border}`,
            borderLeft: `2px solid ${C.accent}`,
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8, flexWrap: "wrap" }}>
              <span style={{ fontFamily: mono, color: C.accent, fontSize: 10, fontWeight: 600, letterSpacing: 2 }}>{n.date.toUpperCase()}</span>
              <span style={{
                fontFamily: mono, background: `${C.accent}15`, color: C.accent,
                padding: "2px 8px", borderRadius: 3, fontSize: 9,
                fontWeight: 600, letterSpacing: 1,
                border: `1px solid ${C.accent}33`,
              }}>{n.tag}</span>
            </div>
            <h3 style={{ fontSize: 17, fontWeight: 700, color: C.textPrimary, margin: "0 0 8px", lineHeight: 1.35 }}>{n.title}</h3>
            <p style={{ fontSize: 13, color: C.textSecondary, lineHeight: 1.6, margin: 0 }}>{n.desc}</p>
          </div>
        ))}
      </div>
    </section>
  </div>
);


// ═══════════════════════════════════════════════════
// PAGE: COMPANY
// ═══════════════════════════════════════════════════
const CompanyPage = ({ setPage }) => (
  <div>
    <Hero tag="Company" title="Veterans & Technologists"
      sub="Founded in 2016 with DARPA and NSF backing. Top-secret cleared. Washington, D.C.-based. Led by combat veterans and enterprise AI executives." />

    {/* Leadership */}
    <section style={{ padding: "80px 48px", background: C.bg }}>
      <SectionTitle label="Leadership" title="The Team" />
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap", justifyContent: "center", marginBottom: 20 }}>
          {[
            { name: "Michael Canty", role: "CEO & Co-Founder", bio: "West Point graduate. Army officer, three combat deployments. Columbia Business School MBA. Former Microsoft senior business manager. Founded ARC in 2016 and built it from DARPA/NSF seedling to a leading defense technology company." },
            { name: "Dan Kurtenbach", role: "Chief Operating Officer", bio: "Former Special Forces officer, White House Fellow, and Apple veteran. Doctorate in defense acquisition reform. Operational, policy, and commercial technology experience across Army, Air Force, SOCOM, and USMC programs." },
            { name: "Kyle Rice", role: "Chief Technology Officer", bio: "Former CTO at SAP National Security Services, Leidos, SAIC, and Virtualitics. Led technology strategy for $1B+ enterprise software companies and major systems integrators. Recognized speaker on deploying AI at scale within the DoD." },
          ].map((p, i) => (
            <div key={i} style={{
              flex: "1 1 300px", maxWidth: 340, textAlign: "center",
              background: C.surface, borderRadius: 8, padding: 32,
              border: `1px solid ${C.border}`,
            }}>
              <div style={{
                width: 80, height: 80, borderRadius: "50%", background: C.surfaceRaised,
                margin: "0 auto 16px", display: "flex", alignItems: "center", justifyContent: "center",
                fontFamily: mono, fontSize: 24, color: C.textSecondary, fontWeight: 700,
                border: `2px solid ${C.accent}44`,
              }}>{p.name.split(" ").map(n => n[0]).join("")}</div>
              <h3 style={{ fontSize: 17, fontWeight: 700, color: C.textPrimary, margin: "0 0 3px" }}>{p.name}</h3>
              <div style={{ fontFamily: mono, color: C.accent, fontSize: 10, fontWeight: 600, letterSpacing: 1.5, marginBottom: 12 }}>{p.role.toUpperCase()}</div>
              <p style={{ fontSize: 12, color: C.textSecondary, lineHeight: 1.6, margin: 0 }}>{p.bio}</p>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
          {[
            { name: "Kevin Kolego", role: "VP of Growth" },
            { name: "Zac Hester", role: "Director of Engineering" },
            { name: "Jalil Faieq", role: "Director of Manufacturing" },
            { name: "Sarah Noyes", role: "Director of Talent" },
            { name: "Jeff Denton", role: "Director of Operations" },
            { name: "Brian Ruther", role: "Director, Defense Programs" },
          ].map((p, i) => (
            <div key={i} style={{
              flex: "0 0 155px", textAlign: "center", padding: 18,
              background: C.surface, borderRadius: 6, border: `1px solid ${C.border}`,
            }}>
              <div style={{
                width: 48, height: 48, borderRadius: "50%", background: C.surfaceRaised,
                margin: "0 auto 10px", display: "flex", alignItems: "center", justifyContent: "center",
                fontFamily: mono, fontSize: 16, color: C.textMuted, fontWeight: 700,
                border: `1px solid ${C.border}`,
              }}>{p.name.split(" ").map(n => n[0]).join("")}</div>
              <h4 style={{ fontSize: 12, fontWeight: 600, color: C.textPrimary, margin: "0 0 2px" }}>{p.name}</h4>
              <div style={{ fontFamily: mono, color: C.textMuted, fontSize: 10 }}>{p.role}</div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Origin */}
    <section style={{ padding: "72px 48px", background: C.surface, borderTop: `1px solid ${C.border}` }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <SectionTitle label="Origin" title="From DARPA Lab to the Frontline" />
        <div style={{ fontSize: 14, color: C.textSecondary, lineHeight: 1.8, textAlign: "center" }}>
          <p style={{ margin: "0 0 16px" }}>
            ARC was founded in 2016 on a simple premise: the individual weapon is the most widely deployed sensor platform the military has — but it generates zero data. Every rifle, carbine, and machine gun in the inventory is informationally silent.
          </p>
          <p style={{ margin: "0 0 16px" }}>
            With initial investment from DARPA and the National Science Foundation, ARC built the AI-enabled weapon sensor — a ruggedized IoT platform that turns every firearm into an information node without changing how the warfighter operates.
          </p>
          <p style={{ margin: 0 }}>
            Today, ARC's technology is deployed across the Army, Air Force, Marine Corps, and Special Operations, with combat validation alongside Ukraine's 3rd Assault Brigade. From a three-person startup to $950M in contract vehicle access, ARC is building the weapon-level data layer the DoD has never had.
          </p>
        </div>
      </div>
    </section>

    {/* Values */}
    <section style={{ padding: "72px 48px", background: C.bg }}>
      <SectionTitle label="Principles" title="What Drives Us" />
      <div style={{ display: "flex", gap: 16, maxWidth: 1000, margin: "0 auto", flexWrap: "wrap" }}>
        {[
          { v: "Mission First", d: "Every decision is measured against one question: does this make the warfighter more lethal and more survivable?" },
          { v: "Technical Excellence", d: "DARPA and NSF built the foundation. We maintain that standard in everything we ship." },
          { v: "Speed with Rigor", d: "Move fast, but never cut corners on security, reliability, or interoperability." },
          { v: "Veteran-Led", d: "Founded and led by people who've been on the receiving end of the problems we're solving." },
        ].map((v, i) => (
          <div key={i} style={{
            flex: "1 1 220px", padding: 24, borderRadius: 8,
            border: `1px solid ${C.border}`,
            borderTop: `2px solid ${C.accent}`,
            background: C.surface,
          }}>
            <h3 style={{ fontSize: 15, fontWeight: 600, color: C.textPrimary, margin: "0 0 8px" }}>{v.v}</h3>
            <p style={{ fontSize: 13, color: C.textSecondary, lineHeight: 1.6, margin: 0 }}>{v.d}</p>
          </div>
        ))}
      </div>
    </section>

    {/* Careers */}
    <GridBg opacity={0.05} style={{ background: C.bg }}>
      <section style={{ padding: "56px 48px", textAlign: "center" }}>
        <h2 style={{ color: C.textPrimary, fontSize: 24, fontWeight: 700, margin: "0 0 10px" }}>Join the team</h2>
        <p style={{ color: C.textSecondary, fontSize: 14, margin: "0 0 20px" }}>We're building something that's never existed before. If that excites you, we want to talk.</p>
        <button onClick={() => setPage("Contact")} style={{ background: C.accent, color: C.white, border: "none", padding: "11px 26px", borderRadius: 4, fontSize: 12, fontWeight: 600, cursor: "pointer", letterSpacing: 0.8, textTransform: "uppercase" }}>View Open Roles →</button>
      </section>
    </GridBg>
  </div>
);


// ═══════════════════════════════════════════════════
// PAGE: CONTACT
// ═══════════════════════════════════════════════════
const ContactPage = () => (
  <div>
    <Hero tag="Contact" title="Let's Talk"
      sub="Whether you're a program office evaluating capability, a prime looking to integrate, or a candidate building the future of weapon sensing — we're here." />

    <section style={{ padding: "80px 48px", background: C.bg }}>
      <div style={{ maxWidth: 920, margin: "0 auto", display: "flex", gap: 32, flexWrap: "wrap" }}>
        <div style={{ flex: "1 1 400px" }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: C.textPrimary, margin: "0 0 24px" }}>How can we help?</h2>
          {[
            { type: "Government / DoD Inquiries", desc: "Program offices, contracting officers, and requirements owners evaluating ARC's technology.", email: "info@armaments.us" },
            { type: "Industry / Partnerships", desc: "Primes, integrators, and technology partners interested in collaboration.", email: "info@armaments.us" },
            { type: "Media / Press", desc: "Journalists and analysts covering defense technology.", email: "info@armaments.us" },
            { type: "Careers", desc: "Join a team of veterans and technologists.", email: "info@armaments.us" },
          ].map((c, i) => (
            <div key={i} style={{
              padding: 20, marginBottom: 10, borderRadius: 6,
              border: `1px solid ${C.border}`, background: C.surface,
              borderLeft: `2px solid ${C.accent}`,
            }}>
              <h3 style={{ fontSize: 14, fontWeight: 600, color: C.textPrimary, margin: "0 0 4px" }}>{c.type}</h3>
              <p style={{ fontSize: 12, color: C.textSecondary, lineHeight: 1.55, margin: "0 0 6px" }}>{c.desc}</p>
              <div style={{ fontFamily: mono, color: C.accent, fontSize: 11, fontWeight: 500 }}>{c.email}</div>
            </div>
          ))}
        </div>

        <div style={{
          flex: "1 1 340px", background: C.surface, borderRadius: 8, padding: 32,
          border: `1px solid ${C.border}`,
        }}>
          <h3 style={{ fontSize: 17, fontWeight: 700, color: C.textPrimary, margin: "0 0 22px" }}>Send a Message</h3>
          {["Name", "Email", "Organization"].map((f, i) => (
            <div key={i} style={{ marginBottom: 16 }}>
              <label style={{ display: "block", fontFamily: mono, fontSize: 10, fontWeight: 600, color: C.textMuted, marginBottom: 5, letterSpacing: 1.5, textTransform: "uppercase" }}>{f}</label>
              <div style={{
                width: "100%", padding: "10px 12px", borderRadius: 4,
                border: `1px solid ${C.border}`, background: C.bg,
                height: 16, boxSizing: "content-box",
              }}/>
            </div>
          ))}
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: "block", fontFamily: mono, fontSize: 10, fontWeight: 600, color: C.textMuted, marginBottom: 5, letterSpacing: 1.5, textTransform: "uppercase" }}>Inquiry Type</label>
            <div style={{
              width: "100%", padding: "10px 12px", borderRadius: 4,
              border: `1px solid ${C.border}`, background: C.bg,
              color: C.textMuted, fontSize: 12,
            }}>Select one...</div>
          </div>
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: "block", fontFamily: mono, fontSize: 10, fontWeight: 600, color: C.textMuted, marginBottom: 5, letterSpacing: 1.5, textTransform: "uppercase" }}>Message</label>
            <div style={{
              width: "100%", height: 80, borderRadius: 4,
              border: `1px solid ${C.border}`, background: C.bg,
            }}/>
          </div>
          <div style={{
            background: C.accent, color: C.white, textAlign: "center",
            padding: "11px 26px", borderRadius: 4, fontSize: 12,
            fontWeight: 600, cursor: "pointer", letterSpacing: 0.8,
            textTransform: "uppercase",
          }}>Submit Inquiry</div>
        </div>
      </div>

      <div style={{
        maxWidth: 920, margin: "32px auto 0", padding: 24, background: C.surface,
        borderRadius: 6, border: `1px solid ${C.border}`,
        display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 14,
      }}>
        <div>
          <div style={{ fontSize: 14, fontWeight: 700, color: C.textPrimary }}>Armaments Research Company, Inc.</div>
          <div style={{ fontFamily: mono, fontSize: 11, color: C.textMuted, marginTop: 3, letterSpacing: 0.5 }}>Washington, D.C.</div>
        </div>
        <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
          <div style={{ fontFamily: mono, fontSize: 11, color: C.textMuted }}>
            <span style={{ fontWeight: 600, color: C.accent }}>CLEARANCE</span> Cleared Facility
          </div>
          <div style={{ fontFamily: mono, fontSize: 11, color: C.textMuted }}>
            <span style={{ fontWeight: 600, color: C.accent }}>CAGE</span> Available on request
          </div>
        </div>
      </div>
    </section>
  </div>
);


// ═══════════════════════════════════════════════════
// MAIN APP
// ═══════════════════════════════════════════════════
export default function ARCWebsite() {
  const [page, setPage] = useState("Home");

  const scrollToTop = (p) => {
    setPage(p);
  };

  const pages = {
    Home: <HomePage setPage={scrollToTop} />,
    Technology: <TechnologyPage setPage={scrollToTop} />,
    Operations: <OperationsPage setPage={scrollToTop} />,
    Training: <TrainingPage setPage={scrollToTop} />,
    Programs: <ProgramsPage setPage={scrollToTop} />,
    Newsroom: <NewsroomPage />,
    Company: <CompanyPage setPage={scrollToTop} />,
    Contact: <ContactPage />,
  };

  return (
    <div style={{
      fontFamily: font,
      background: C.bg, color: C.textPrimary,
      minHeight: "100vh", lineHeight: 1.5,
    }}>
      <ClassBanner text="Armaments Research Company — Washington, D.C." />
      <Nav page={page} setPage={scrollToTop} />
      {pages[page]}
      <Footer setPage={scrollToTop} />
    </div>
  );
}