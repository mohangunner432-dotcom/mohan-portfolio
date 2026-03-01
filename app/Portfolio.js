'use client'
import { useState, useEffect, useRef } from "react";

const COLORS = {
  bg: "#0a0a0f",
  surface: "rgba(18, 18, 28, 0.7)",
  glass: "rgba(255, 255, 255, 0.03)",
  glassBorder: "rgba(255, 255, 255, 0.08)",
  accent: "#3b82f6",
  accentGlow: "rgba(59, 130, 246, 0.15)",
  accentSoft: "rgba(59, 130, 246, 0.08)",
  lime: "#84cc16",
  limeGlow: "rgba(132, 204, 22, 0.12)",
  text: "#e2e8f0",
  textMuted: "#94a3b8",
  textDim: "#64748b",
};

const techStack = [
  { name: "AWS Glue", cat: "cloud" },
  { name: "AWS Lambda", cat: "cloud" },
  { name: "AWS S3", cat: "cloud" },
  { name: "Step Functions", cat: "cloud" },
  { name: "Redshift", cat: "data" },
  { name: "Databricks", cat: "data" },
  { name: "Apache Spark", cat: "data" },
  { name: "Delta Lake", cat: "data" },
  { name: "Python", cat: "lang" },
  { name: "SQL", cat: "lang" },
  { name: "PySpark", cat: "lang" },
  { name: "Power BI", cat: "viz" },
  { name: "Salesforce", cat: "tool" },
  { name: "AppFlow", cat: "cloud" },
  { name: "Git", cat: "tool" },
  { name: "Stripe API", cat: "tool" },
];

const projects = [
  {
    title: "Data Unity Platform",
    subtitle: "Customer Deduplication at Scale",
    desc: "Built an enterprise-grade customer deduplication system consolidating data across 15+ software products and 5 payment processors into a unified identity graph using Universal Customer IDs (UCIDs).",
    tech: ["AWS Glue", "Redshift", "S3", "Lambda", "Step Functions"],
    metrics: ["15+ Products", "5 Processors", "Millions of Records"],
    size: "large",
  },
  {
    title: "ETL Pipeline Orchestration",
    subtitle: "Automated Data Workflows",
    desc: "Designed incremental load pipelines with bookmark-based extraction, automated error handling, and comprehensive audit trails across multiple data sources.",
    tech: ["Step Functions", "Lambda", "Python", "S3"],
    metrics: ["99.9% Uptime", "Incremental Loads", "Auto-Recovery"],
    size: "medium",
  },
  {
    title: "Salesforce Integration",
    subtitle: "CRM to Data Warehouse Bridge",
    desc: "Architected a multi-stage integration pipeline using AWS AppFlow to sync Salesforce objects into Redshift through a medallion-style staging → curated → final pattern.",
    tech: ["AppFlow", "Redshift", "Parquet", "SQL"],
    metrics: ["4 SF Objects", "Real-time Sync", "Schema Evolution"],
    size: "medium",
  },
  {
    title: "Revenue Analytics Dashboard",
    subtitle: "Customer Health Monitoring",
    desc: "Developed comprehensive Power BI dashboards tracking MRR, payment revenue, and customer health across the entire product portfolio with SCD Type 1 change detection.",
    tech: ["Power BI", "Redshift", "SQL", "Stripe"],
    metrics: ["Executive-Level", "SCD Tracking", "Multi-Product"],
    size: "small",
  },
];

const experience = [
  {
    role: "BI Developer & Data Engineer",
    company: "TogetherWork Holdings",
    location: "Atlanta, GA",
    period: "2025 — Present",
    highlights: [
      "Architect and maintain the Data Unity platform — a customer deduplication engine processing millions of records across 15+ SaaS products",
      "Design ETL pipelines using AWS Glue, Lambda, Step Functions, and Redshift with incremental load patterns",
      "Build executive dashboards in Power BI tracking MRR, payment revenue, and customer health metrics",
    ],
    current: true,
  },
  {
    role: "Power BI Developer",
    company: "Previous Experience",
    location: "",
    period: "2021 — 2025",
    highlights: [
      "Developed interactive business intelligence reports and dashboards for enterprise clients",
      "Transitioned from SSRS to Power BI, modernizing legacy reporting infrastructure",
    ],
    current: false,
  },
  {
    role: "SSRS Report Developer",
    company: "Earlier Career",
    location: "",
    period: "2019 — 2021",
    highlights: [
      "Built and maintained SQL Server Reporting Services reports for business stakeholders",
      "Developed strong SQL foundations and database design skills",
    ],
    current: false,
  },
];

// Animated starfield background
function Starfield() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId;
    let stars = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    for (let i = 0; i < 120; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.2 + 0.3,
        speed: Math.random() * 0.15 + 0.02,
        opacity: Math.random() * 0.6 + 0.2,
        pulse: Math.random() * Math.PI * 2,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach((s) => {
        s.pulse += 0.008;
        const o = s.opacity + Math.sin(s.pulse) * 0.15;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(148, 163, 184, ${Math.max(0.05, o)})`;
        ctx.fill();
        s.y -= s.speed;
        if (s.y < -5) {
          s.y = canvas.height + 5;
          s.x = Math.random() * canvas.width;
        }
      });
      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        pointerEvents: "none",
      }}
    />
  );
}

// Glow orbs for ambient lighting
function GlowOrbs() {
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none", overflow: "hidden" }}>
      <div
        style={{
          position: "absolute",
          top: "10%",
          left: "15%",
          width: 500,
          height: 500,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(59,130,246,0.06) 0%, transparent 70%)",
          filter: "blur(60px)",
          animation: "float1 20s ease-in-out infinite",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "20%",
          right: "10%",
          width: 400,
          height: 400,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(132,204,22,0.05) 0%, transparent 70%)",
          filter: "blur(60px)",
          animation: "float2 25s ease-in-out infinite",
        }}
      />
    </div>
  );
}

// Glass card component
function GlassCard({ children, style, hover = true, className = "" }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => hover && setHovered(true)}
      onMouseLeave={() => hover && setHovered(false)}
      style={{
        background: hovered ? "rgba(255,255,255,0.05)" : COLORS.glass,
        border: `1px solid ${hovered ? "rgba(59,130,246,0.2)" : COLORS.glassBorder}`,
        borderRadius: 16,
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        transition: "all 0.3s ease",
        boxShadow: hovered ? "0 8px 32px rgba(59,130,246,0.08)" : "none",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

// Animated section reveal
function RevealSection({ children, delay = 0 }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(30px)",
        transition: `all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

// Typewriter effect
function TypeWriter({ words, speed = 100 }) {
  const [current, setCurrent] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[current];
    const timeout = setTimeout(
      () => {
        if (!deleting) {
          setText(word.slice(0, text.length + 1));
          if (text.length === word.length) {
            setTimeout(() => setDeleting(true), 1800);
          }
        } else {
          setText(word.slice(0, text.length - 1));
          if (text.length === 0) {
            setDeleting(false);
            setCurrent((c) => (c + 1) % words.length);
          }
        }
      },
      deleting ? speed / 2 : speed
    );
    return () => clearTimeout(timeout);
  }, [text, deleting, current, words, speed]);

  return (
    <span>
      {text}
      <span
        style={{
          borderRight: `2px solid ${COLORS.accent}`,
          marginLeft: 2,
          animation: "blink 1s step-end infinite",
        }}
      />
    </span>
  );
}

// Tech pill
function TechPill({ name, cat }) {
  const colors = {
    cloud: COLORS.accent,
    data: COLORS.lime,
    lang: "#f59e0b",
    viz: "#ec4899",
    tool: "#8b5cf6",
  };
  const color = colors[cat] || COLORS.accent;

  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        padding: "6px 14px",
        borderRadius: 20,
        background: `${color}10`,
        border: `1px solid ${color}25`,
        color: color,
        fontSize: 13,
        fontWeight: 500,
        fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
        letterSpacing: 0.3,
        whiteSpace: "nowrap",
      }}
    >
      <span style={{ width: 6, height: 6, borderRadius: "50%", background: color, opacity: 0.7 }} />
      {name}
    </span>
  );
}

// Pipeline animation
function PipelineAnimation() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "12px 0" }}>
      {["Extract", "Transform", "Load"].map((step, i) => (
        <div key={step} style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div
            style={{
              padding: "6px 16px",
              borderRadius: 8,
              background: i === 1 ? COLORS.accentGlow : COLORS.glass,
              border: `1px solid ${i === 1 ? `${COLORS.accent}40` : COLORS.glassBorder}`,
              color: i === 1 ? COLORS.accent : COLORS.textMuted,
              fontSize: 12,
              fontFamily: "'JetBrains Mono', monospace",
              fontWeight: 600,
              letterSpacing: 1,
            }}
          >
            {step}
          </div>
          {i < 2 && (
            <div style={{ display: "flex", gap: 3 }}>
              {[0, 1, 2].map((d) => (
                <div
                  key={d}
                  style={{
                    width: 4,
                    height: 4,
                    borderRadius: "50%",
                    background: COLORS.accent,
                    opacity: 0.4,
                    animation: `pulse 1.5s ease-in-out ${d * 0.3}s infinite`,
                  }}
                />
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// Navigation
function Nav({ active, onNavigate }) {
  const links = ["Home", "Stack", "Projects", "Experience", "Contact"];

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: "16px 0",
        background: "rgba(10, 10, 15, 0.8)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderBottom: `1px solid ${COLORS.glassBorder}`,
      }}
    >
      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          padding: "0 24px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: 8,
              background: `linear-gradient(135deg, ${COLORS.accent}, ${COLORS.lime})`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 14,
              fontWeight: 800,
              color: "#0a0a0f",
              fontFamily: "'JetBrains Mono', monospace",
            }}
          >
            M
          </div>
          <span style={{ color: COLORS.text, fontWeight: 600, fontSize: 16, letterSpacing: -0.3 }}>
            mohan<span style={{ color: COLORS.textDim }}>.dev</span>
          </span>
        </div>
        <div style={{ display: "flex", gap: 4 }}>
          {links.map((l) => (
            <button
              key={l}
              onClick={() => onNavigate(l.toLowerCase())}
              style={{
                padding: "8px 16px",
                borderRadius: 8,
                border: "none",
                background: active === l.toLowerCase() ? COLORS.accentSoft : "transparent",
                color: active === l.toLowerCase() ? COLORS.accent : COLORS.textMuted,
                fontSize: 13,
                fontWeight: 500,
                cursor: "pointer",
                transition: "all 0.2s",
                fontFamily: "inherit",
              }}
            >
              {l}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}

// Main portfolio
export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("home");
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [formSent, setFormSent] = useState(false);

  // Track active section on scroll
  useEffect(() => {
    const sections = ["home", "stack", "projects", "experience", "contact"];
    const handleScroll = () => {
      const scrollPos = window.scrollY + 150;
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id) => {
    setActiveSection(id);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = () => {
    if (formData.name && formData.email && formData.message) {
      setFormSent(true);
      setTimeout(() => setFormSent(false), 3000);
      setFormData({ name: "", email: "", message: "" });
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: COLORS.bg,
        color: COLORS.text,
        fontFamily: "'DM Sans', 'Segoe UI', system-ui, sans-serif",
        overflowX: "hidden",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700&display=swap');
        
        * { margin: 0; padding: 0; box-sizing: border-box; }
        
        @keyframes blink { 0%, 50% { opacity: 1; } 51%, 100% { opacity: 0; } }
        @keyframes pulse { 0%, 100% { opacity: 0.2; } 50% { opacity: 0.8; } }
        @keyframes float1 { 0%, 100% { transform: translate(0, 0); } 50% { transform: translate(30px, -40px); } }
        @keyframes float2 { 0%, 100% { transform: translate(0, 0); } 50% { transform: translate(-20px, 30px); } }
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes glow { 0%, 100% { box-shadow: 0 0 20px rgba(59,130,246,0.1); } 50% { box-shadow: 0 0 30px rgba(59,130,246,0.2); } }
        @keyframes successPop { 
          0% { transform: scale(0.8); opacity: 0; } 
          50% { transform: scale(1.05); } 
          100% { transform: scale(1); opacity: 1; } 
        }

        ::selection { background: rgba(59,130,246,0.3); color: #fff; }
        
        input, textarea {
          font-family: 'DM Sans', system-ui, sans-serif;
        }

        @media (max-width: 768px) {
          .bento-grid { grid-template-columns: 1fr !important; }
          .hero-title { font-size: 36px !important; }
          .hero-sub { font-size: 16px !important; }
          .nav-links { display: none !important; }
          .section-pad { padding: 0 16px !important; }
          .timeline-item { padding-left: 24px !important; }
        }
      `}</style>

      <Starfield />
      <GlowOrbs />
      <Nav active={activeSection} onNavigate={scrollTo} />

      {/* ============ HERO ============ */}
      <section
        id="home"
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          zIndex: 1,
          padding: "0 24px",
        }}
      >
        <div
          style={{
            maxWidth: 800,
            textAlign: "center",
            animation: "slideUp 0.8s ease-out",
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "6px 16px",
              borderRadius: 20,
              background: COLORS.accentSoft,
              border: `1px solid ${COLORS.accent}30`,
              marginBottom: 24,
            }}
          >
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: COLORS.lime, boxShadow: `0 0 8px ${COLORS.lime}` }} />
            <span style={{ color: COLORS.accent, fontSize: 13, fontWeight: 500 }}>Available for Opportunities</span>
          </div>

          <h1
            className="hero-title"
            style={{
              fontSize: 60,
              fontWeight: 700,
              lineHeight: 1.1,
              letterSpacing: -2,
              marginBottom: 20,
              background: `linear-gradient(135deg, ${COLORS.text} 0%, ${COLORS.textMuted} 100%)`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Data Engineer &<br />
            <span style={{ WebkitTextFillColor: COLORS.accent }}>
              <TypeWriter words={["Pipeline Architect", "BI Developer", "Cloud Engineer", "Analytics Builder"]} speed={80} />
            </span>
          </h1>

          <p
            className="hero-sub"
            style={{
              fontSize: 18,
              color: COLORS.textMuted,
              lineHeight: 1.7,
              maxWidth: 600,
              margin: "0 auto 32px",
              fontWeight: 400,
            }}
          >
            I build scalable data pipelines and analytics platforms on AWS.
            Currently engineering customer data unification across 15+ products
            at TogetherWork Holdings.
          </p>

          <PipelineAnimation />

          <div style={{ display: "flex", gap: 12, justifyContent: "center", marginTop: 32 }}>
            <button
              onClick={() => scrollTo("projects")}
              style={{
                padding: "12px 28px",
                borderRadius: 10,
                border: "none",
                background: COLORS.accent,
                color: "#fff",
                fontSize: 14,
                fontWeight: 600,
                cursor: "pointer",
                transition: "all 0.3s",
                boxShadow: `0 4px 20px ${COLORS.accent}40`,
              }}
            >
              View My Work →
            </button>
            <button
              onClick={() => scrollTo("contact")}
              style={{
                padding: "12px 28px",
                borderRadius: 10,
                border: `1px solid ${COLORS.glassBorder}`,
                background: COLORS.glass,
                color: COLORS.text,
                fontSize: 14,
                fontWeight: 500,
                cursor: "pointer",
                transition: "all 0.3s",
                backdropFilter: "blur(8px)",
              }}
            >
              Get In Touch
            </button>
          </div>
        </div>
      </section>

      {/* ============ TECH STACK ============ */}
      <section id="stack" style={{ padding: "100px 24px", position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <RevealSection>
            <p style={{ color: COLORS.accent, fontSize: 13, fontWeight: 600, letterSpacing: 2, marginBottom: 8, fontFamily: "'JetBrains Mono', monospace" }}>
              TECH STACK
            </p>
            <h2 style={{ fontSize: 36, fontWeight: 700, letterSpacing: -1, marginBottom: 40 }}>
              Tools I Work With
            </h2>
          </RevealSection>

          {/* Marquee */}
          <div style={{ overflow: "hidden", marginBottom: 40, padding: "16px 0" }}>
            <div style={{ display: "flex", gap: 12, animation: "marquee 30s linear infinite", width: "max-content" }}>
              {[...techStack, ...techStack].map((t, i) => (
                <TechPill key={`${t.name}-${i}`} name={t.name} cat={t.cat} />
              ))}
            </div>
          </div>

          {/* Category breakdown */}
          <RevealSection delay={0.2}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 16 }}>
              {[
                { label: "Cloud & Orchestration", items: ["AWS Glue", "Lambda", "S3", "Step Functions", "AppFlow"], icon: "☁️" },
                { label: "Data Platforms", items: ["Redshift", "Databricks", "Spark", "Delta Lake"], icon: "🗄️" },
                { label: "Languages & BI", items: ["Python", "SQL", "PySpark", "Power BI"], icon: "⚡" },
                { label: "Integrations", items: ["Stripe API", "Salesforce", "Git", "Parquet"], icon: "🔗" },
              ].map((cat) => (
                <GlassCard key={cat.label} style={{ padding: 24 }}>
                  <div style={{ fontSize: 24, marginBottom: 12 }}>{cat.icon}</div>
                  <h3 style={{ fontSize: 15, fontWeight: 600, marginBottom: 12, color: COLORS.text }}>{cat.label}</h3>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                    {cat.items.map((item) => (
                      <span
                        key={item}
                        style={{
                          padding: "4px 10px",
                          borderRadius: 6,
                          background: "rgba(255,255,255,0.04)",
                          fontSize: 12,
                          color: COLORS.textMuted,
                          fontFamily: "'JetBrains Mono', monospace",
                        }}
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </GlassCard>
              ))}
            </div>
          </RevealSection>
        </div>
      </section>

      {/* ============ PROJECTS (BENTO GRID) ============ */}
      <section id="projects" style={{ padding: "100px 24px", position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <RevealSection>
            <p style={{ color: COLORS.lime, fontSize: 13, fontWeight: 600, letterSpacing: 2, marginBottom: 8, fontFamily: "'JetBrains Mono', monospace" }}>
              PROJECTS
            </p>
            <h2 style={{ fontSize: 36, fontWeight: 700, letterSpacing: -1, marginBottom: 40 }}>
              What I've Built
            </h2>
          </RevealSection>

          <div
            className="bento-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 16,
            }}
          >
            {projects.map((p, i) => (
              <RevealSection key={p.title} delay={i * 0.1}>
                <GlassCard
                  style={{
                    padding: 28,
                    gridColumn: p.size === "large" ? "1 / -1" : "auto",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
                    <div>
                      <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 4, letterSpacing: -0.5 }}>{p.title}</h3>
                      <p style={{ fontSize: 13, color: COLORS.accent, fontWeight: 500 }}>{p.subtitle}</p>
                    </div>
                    <div
                      style={{
                        width: 36,
                        height: 36,
                        borderRadius: 8,
                        background: COLORS.accentSoft,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 16,
                        flexShrink: 0,
                      }}
                    >
                      {i === 0 ? "🔗" : i === 1 ? "⚙️" : i === 2 ? "☁️" : "📊"}
                    </div>
                  </div>

                  <p style={{ fontSize: 14, color: COLORS.textMuted, lineHeight: 1.7, marginBottom: 20, flex: 1 }}>{p.desc}</p>

                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 16 }}>
                    {p.metrics.map((m) => (
                      <span
                        key={m}
                        style={{
                          padding: "4px 12px",
                          borderRadius: 6,
                          background: COLORS.limeGlow,
                          color: COLORS.lime,
                          fontSize: 12,
                          fontWeight: 600,
                          fontFamily: "'JetBrains Mono', monospace",
                        }}
                      >
                        {m}
                      </span>
                    ))}
                  </div>

                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                    {p.tech.map((t) => (
                      <span
                        key={t}
                        style={{
                          padding: "3px 10px",
                          borderRadius: 4,
                          background: "rgba(255,255,255,0.04)",
                          border: `1px solid ${COLORS.glassBorder}`,
                          fontSize: 11,
                          color: COLORS.textDim,
                          fontFamily: "'JetBrains Mono', monospace",
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </GlassCard>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* ============ EXPERIENCE TIMELINE ============ */}
      <section id="experience" style={{ padding: "100px 24px", position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <RevealSection>
            <p style={{ color: COLORS.accent, fontSize: 13, fontWeight: 600, letterSpacing: 2, marginBottom: 8, fontFamily: "'JetBrains Mono', monospace" }}>
              EXPERIENCE
            </p>
            <h2 style={{ fontSize: 36, fontWeight: 700, letterSpacing: -1, marginBottom: 48 }}>
              Career Timeline
            </h2>
          </RevealSection>

          <div style={{ position: "relative" }}>
            {/* Timeline line */}
            <div
              style={{
                position: "absolute",
                left: 12,
                top: 8,
                bottom: 8,
                width: 2,
                background: `linear-gradient(to bottom, ${COLORS.accent}, ${COLORS.glassBorder})`,
              }}
            />

            {experience.map((exp, i) => (
              <RevealSection key={exp.role} delay={i * 0.15}>
                <div className="timeline-item" style={{ position: "relative", paddingLeft: 48, marginBottom: 40 }}>
                  {/* Timeline dot */}
                  <div
                    style={{
                      position: "absolute",
                      left: 4,
                      top: 8,
                      width: 18,
                      height: 18,
                      borderRadius: "50%",
                      background: exp.current ? COLORS.accent : COLORS.glass,
                      border: `2px solid ${exp.current ? COLORS.accent : COLORS.glassBorder}`,
                      animation: exp.current ? "glow 3s ease-in-out infinite" : "none",
                    }}
                  />

                  <GlassCard style={{ padding: 24 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 8, marginBottom: 12 }}>
                      <div>
                        <h3 style={{ fontSize: 18, fontWeight: 700, letterSpacing: -0.3 }}>{exp.role}</h3>
                        <p style={{ fontSize: 14, color: COLORS.accent, fontWeight: 500 }}>
                          {exp.company} {exp.location && `· ${exp.location}`}
                        </p>
                      </div>
                      <span
                        style={{
                          padding: "4px 12px",
                          borderRadius: 6,
                          background: exp.current ? COLORS.accentSoft : COLORS.glass,
                          border: `1px solid ${exp.current ? `${COLORS.accent}30` : COLORS.glassBorder}`,
                          color: exp.current ? COLORS.accent : COLORS.textDim,
                          fontSize: 12,
                          fontFamily: "'JetBrains Mono', monospace",
                          fontWeight: 500,
                          whiteSpace: "nowrap",
                        }}
                      >
                        {exp.period}
                      </span>
                    </div>
                    <ul style={{ listStyle: "none", padding: 0 }}>
                      {exp.highlights.map((h, hi) => (
                        <li
                          key={hi}
                          style={{
                            fontSize: 14,
                            color: COLORS.textMuted,
                            lineHeight: 1.7,
                            paddingLeft: 16,
                            position: "relative",
                            marginBottom: 6,
                          }}
                        >
                          <span style={{ position: "absolute", left: 0, color: COLORS.textDim }}>›</span>
                          {h}
                        </li>
                      ))}
                    </ul>
                  </GlassCard>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* ============ EDUCATION ============ */}
      <section style={{ padding: "0 24px 100px", position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <RevealSection>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <GlassCard style={{ padding: 24 }}>
                <p style={{ fontSize: 12, color: COLORS.accent, fontWeight: 600, letterSpacing: 1, marginBottom: 8, fontFamily: "'JetBrains Mono', monospace" }}>
                  MASTER'S DEGREE
                </p>
                <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 4 }}>Information Technology</h3>
                <p style={{ fontSize: 14, color: COLORS.textMuted }}>Towson University</p>
              </GlassCard>
              <GlassCard style={{ padding: 24 }}>
                <p style={{ fontSize: 12, color: COLORS.lime, fontWeight: 600, letterSpacing: 1, marginBottom: 8, fontFamily: "'JetBrains Mono', monospace" }}>
                  MBA
                </p>
                <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 4 }}>Business Administration</h3>
                <p style={{ fontSize: 14, color: COLORS.textMuted }}>Centennial College, Toronto</p>
              </GlassCard>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* ============ CONTACT ============ */}
      <section id="contact" style={{ padding: "100px 24px 80px", position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          <RevealSection>
            <p style={{ color: COLORS.lime, fontSize: 13, fontWeight: 600, letterSpacing: 2, marginBottom: 8, fontFamily: "'JetBrains Mono', monospace", textAlign: "center" }}>
              CONTACT
            </p>
            <h2 style={{ fontSize: 36, fontWeight: 700, letterSpacing: -1, marginBottom: 12, textAlign: "center" }}>
              Let's Connect
            </h2>
            <p style={{ fontSize: 15, color: COLORS.textMuted, textAlign: "center", marginBottom: 40 }}>
              Open to data engineering roles, freelance analytics projects, and collaboration opportunities.
            </p>
          </RevealSection>

          <RevealSection delay={0.2}>
            <GlassCard style={{ padding: 32 }} hover={false}>
              {formSent ? (
                <div style={{ textAlign: "center", padding: "40px 0", animation: "successPop 0.4s ease-out" }}>
                  <div style={{ fontSize: 48, marginBottom: 16 }}>✓</div>
                  <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8, color: COLORS.lime }}>Message Sent!</h3>
                  <p style={{ color: COLORS.textMuted, fontSize: 14 }}>I'll get back to you shortly.</p>
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  {[
                    { key: "name", label: "Name", type: "text" },
                    { key: "email", label: "Email", type: "email" },
                  ].map((field) => (
                    <div key={field.key}>
                      <label style={{ fontSize: 12, color: COLORS.textDim, fontWeight: 600, letterSpacing: 0.5, marginBottom: 6, display: "block" }}>
                        {field.label}
                      </label>
                      <input
                        type={field.type}
                        value={formData[field.key]}
                        onChange={(e) => setFormData((f) => ({ ...f, [field.key]: e.target.value }))}
                        style={{
                          width: "100%",
                          padding: "12px 16px",
                          borderRadius: 10,
                          border: `1px solid ${COLORS.glassBorder}`,
                          background: "rgba(255,255,255,0.03)",
                          color: COLORS.text,
                          fontSize: 14,
                          outline: "none",
                          transition: "border-color 0.2s",
                        }}
                        onFocus={(e) => (e.target.style.borderColor = `${COLORS.accent}50`)}
                        onBlur={(e) => (e.target.style.borderColor = COLORS.glassBorder)}
                      />
                    </div>
                  ))}
                  <div>
                    <label style={{ fontSize: 12, color: COLORS.textDim, fontWeight: 600, letterSpacing: 0.5, marginBottom: 6, display: "block" }}>
                      Message
                    </label>
                    <textarea
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData((f) => ({ ...f, message: e.target.value }))}
                      style={{
                        width: "100%",
                        padding: "12px 16px",
                        borderRadius: 10,
                        border: `1px solid ${COLORS.glassBorder}`,
                        background: "rgba(255,255,255,0.03)",
                        color: COLORS.text,
                        fontSize: 14,
                        outline: "none",
                        resize: "vertical",
                        transition: "border-color 0.2s",
                      }}
                      onFocus={(e) => (e.target.style.borderColor = `${COLORS.accent}50`)}
                      onBlur={(e) => (e.target.style.borderColor = COLORS.glassBorder)}
                    />
                  </div>
                  <button
                    onClick={handleSubmit}
                    style={{
                      padding: "14px 32px",
                      borderRadius: 10,
                      border: "none",
                      background: `linear-gradient(135deg, ${COLORS.accent}, #2563eb)`,
                      color: "#fff",
                      fontSize: 15,
                      fontWeight: 600,
                      cursor: "pointer",
                      transition: "all 0.3s",
                      boxShadow: `0 4px 20px ${COLORS.accent}30`,
                      marginTop: 8,
                    }}
                  >
                    Send Message →
                  </button>
                </div>
              )}
            </GlassCard>
          </RevealSection>
        </div>
      </section>

      {/* ============ FOOTER ============ */}
      <footer
        style={{
          padding: "32px 24px",
          textAlign: "center",
          borderTop: `1px solid ${COLORS.glassBorder}`,
          position: "relative",
          zIndex: 1,
        }}
      >
        <p style={{ fontSize: 13, color: COLORS.textDim }}>
          Built with passion · Data Engineer based in Atlanta, GA
        </p>
      </footer>
    </div>
  );
}
