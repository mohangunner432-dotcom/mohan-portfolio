'use client'
import { useState, useEffect, useRef } from "react";

const COLORS = {
  bg: "#0a0a0f", surface: "rgba(18, 18, 28, 0.7)", glass: "rgba(255, 255, 255, 0.03)",
  glassBorder: "rgba(255, 255, 255, 0.08)", accent: "#3b82f6", accentGlow: "rgba(59, 130, 246, 0.15)",
  accentSoft: "rgba(59, 130, 246, 0.08)", lime: "#84cc16", limeGlow: "rgba(132, 204, 22, 0.12)",
  amber: "#f59e0b", amberGlow: "rgba(245, 158, 11, 0.12)", text: "#e2e8f0",
  textMuted: "#94a3b8", textDim: "#64748b",
};

const techStack = [
  { name: "AWS Glue", cat: "cloud" }, { name: "AWS Lambda", cat: "cloud" }, { name: "Amazon S3", cat: "cloud" },
  { name: "Step Functions", cat: "cloud" }, { name: "AWS AppFlow", cat: "cloud" }, { name: "Amazon Redshift", cat: "data" },
  { name: "Snowflake", cat: "data" }, { name: "Databricks", cat: "data" }, { name: "Apache Spark", cat: "data" },
  { name: "Delta Lake", cat: "data" }, { name: "Python", cat: "lang" }, { name: "SQL", cat: "lang" },
  { name: "PySpark", cat: "lang" }, { name: "Power BI", cat: "viz" }, { name: "Salesforce", cat: "tool" },
  { name: "Stripe API", cat: "tool" }, { name: "Vitally", cat: "tool" }, { name: "Git", cat: "tool" },
];

const projects = [
  {
    title: "Data Unity Platform",
    subtitle: "Turning Customer Chaos Into a Single Source of Truth",
    icon: "\u{1F517}", color: COLORS.accent,
    problem: "The company operates 15+ SaaS products, each with its own customer database. The same customer \u2014 say a yoga studio owner \u2014 could appear as 15 different records across 15 different systems. Nobody knew the real customer count, revenue per customer, or churn rate.",
    solution: "I built the Data Unity platform \u2014 a customer identity resolution engine that assigns every customer a Universal Customer ID (UCID). The system ingests records from all 15+ products, matches them using multi-attribute logic (name, email, address, business details), and merges duplicates into a single golden record.",
    impact: [
      "Unified millions of customer records across 15+ products into one identity graph",
      "Enabled the first-ever accurate customer count and true revenue-per-customer metrics for leadership",
      "Reduced duplicate customer records that were inflating business metrics",
    ],
    techDetail: "Built on AWS \u2014 Glue for ETL orchestration, Lambda for event-driven processing, Step Functions for pipeline workflows, S3 for data lake storage, and Redshift as the analytical warehouse. Implemented incremental loading with bookmark-based extraction to process only new/changed records. Designed a star schema with DURS (fact table tracking monthly volume, revenue, and transactions per customer per processor) and DUCS (dimension table holding the golden customer record).",
    tech: ["AWS Glue", "Lambda", "Step Functions", "S3", "Redshift", "Python", "SQL"],
    metrics: [{ label: "Products Unified", value: "15+" }, { label: "Payment Processors", value: "5" }, { label: "Records Processed", value: "Millions" }],
    size: "hero",
  },
  {
    title: "Customer Health Dashboard",
    subtitle: "Giving Leadership a Real-Time Pulse on Every Customer",
    icon: "\u{1F4CA}", color: COLORS.lime,
    problem: "Executives had no unified view of customer health. Subscription data lived in Stripe, payment processing revenue was scattered across 5 processors, and customer success scores were in Vitally. Leaders couldn't answer: 'Which customers are growing? Which are at risk?'",
    solution: "I designed and built the Customer Health Dashboard \u2014 a Power BI reporting system that combines subscription revenue (MRR from Stripe), payment processing revenue (from 5 processors), and customer success data (from Vitally's parent-child hierarchy) into a single executive-level view.",
    impact: [
      "Gave leadership their first unified view of subscription + payment revenue per customer",
      "Enabled customer success teams to proactively identify at-risk accounts before churn",
      "Automated monthly reporting that previously required days of manual spreadsheet work",
    ],
    techDetail: "Built a Redshift stored procedure that processes data from Stripe Billing (subscriptions, MRR calculations), 5 payment processors (Stripe, ProPay, CardConnect, OpenEdge, Spreedly), and Vitally's customer success platform. Implemented SCD Type 1 change detection using hash-key comparison to track how customer health metrics evolve over time. The procedure handles complex status prioritization logic \u2014 when a customer has multiple subscriptions, it intelligently determines the correct overall status.",
    tech: ["Power BI", "Redshift", "Stripe API", "Vitally", "SQL", "Python"],
    metrics: [{ label: "Revenue Streams", value: "2" }, { label: "Data Sources", value: "7+" }, { label: "SCD Tracking", value: "Type 1" }],
    size: "large",
  },
  {
    title: "Salesforce CRM Integration",
    subtitle: "Bridging Sales Data With the Data Warehouse",
    icon: "\u2601\uFE0F", color: COLORS.amber,
    problem: "The sales team tracked accounts, contacts, and opportunities in Salesforce, but this data was completely disconnected from the data warehouse. Analytics teams couldn't combine sales pipeline data with customer usage and payment data.",
    solution: "I architected an end-to-end integration pipeline using AWS AppFlow to automatically sync 4 Salesforce objects (Accounts, Contacts, Opportunities, Users) into Redshift through a three-stage medallion architecture: staging \u2192 curated \u2192 final production tables.",
    impact: [
      "Connected Salesforce pipeline data with customer and payment data for the first time",
      "Eliminated manual CSV exports that the sales ops team was doing weekly",
      "Enabled cross-functional reporting combining sales, subscriptions, and payment revenue",
    ],
    techDetail: "Used AWS AppFlow to extract Salesforce data as Parquet files into S3, then COPY commands to load into Redshift staging tables. Built stored procedures for each transformation stage. Solved a critical Parquet column-ordering issue \u2014 COPY commands map columns positionally, not by name, so staging tables must exactly match Parquet file column order.",
    tech: ["AWS AppFlow", "Salesforce", "S3", "Redshift", "Parquet", "SQL"],
    metrics: [{ label: "SF Objects", value: "4" }, { label: "Pipeline Stages", value: "3" }, { label: "Automated", value: "\u2713" }],
    size: "large",
  },
  {
    title: "Payment Revenue Analytics",
    subtitle: "Unified Revenue View Across 5 Processors",
    icon: "\u{1F4B0}", color: "#8b5cf6",
    problem: "Revenue flowed through 5 different payment processors \u2014 each with different data formats and field names. Finance couldn't get a consolidated revenue picture without weeks of manual reconciliation.",
    solution: "I built the DURS reporting system \u2014 a unified fact table that standardizes transaction data from all 5 processors into one consistent format, with monthly grain per customer per processor per payment method.",
    impact: [
      "Created the company's first unified view of payment processing revenue",
      "Enabled Finance to categorize revenue into 4 reporting tiers for accurate forecasting",
      "Distinguished real revenue from whitespace opportunities for upsell targeting",
    ],
    techDetail: "Built a 7-block UNION ALL stored procedure \u2014 one block per processor source. Each block preprocesses raw data, joins with merchant tables for account grouping, and links to product_customer for UCID resolution. Handles product remapping and gateway-level reporting category assignment.",
    tech: ["Redshift", "SQL", "Python", "Stripe", "Power BI"],
    metrics: [{ label: "Processors", value: "5" }, { label: "Revenue Tiers", value: "4" }, { label: "Monthly Grain", value: "\u2713" }],
    size: "medium",
  },
  {
    title: "ETL Pipeline Orchestration",
    subtitle: "Self-Healing Pipelines That Run While I Sleep",
    icon: "\u2699\uFE0F", color: "#ec4899",
    problem: "Data pipelines were fragile \u2014 a single upstream change could silently corrupt downstream reports. Failures were discovered days later by business users.",
    solution: "I redesigned the pipeline architecture with automated error handling, incremental bookmark-based loading, comprehensive backup procedures, and audit trails tracking every change to the customer identity system.",
    impact: [
      "Reduced pipeline failure recovery time from days to minutes",
      "Implemented backup-before-modify pattern preventing data loss incidents",
      "Built UCID change detection so every identity merge or split is auditable",
    ],
    techDetail: "AWS Step Functions orchestrate multi-stage workflows: extract (bookmark-based incremental pulls) \u2192 transform (Glue jobs with Python/PySpark) \u2192 load (Redshift COPY). Built Lambda functions for file validation, bookmark management, and failure alerting. Solved silent data corruption like scientific notation converting merchant IDs.",
    tech: ["Step Functions", "Lambda", "Glue", "S3", "Python", "Redshift"],
    metrics: [{ label: "Recovery", value: "Minutes" }, { label: "Incremental", value: "\u2713" }, { label: "Auto-Recovery", value: "\u2713" }],
    size: "medium",
  },
];

const experience = [
  {
    role: "Data Engineer", company: "Protech \u00B7 TogetherWork Holdings", location: "Atlanta, GA", period: "Aug 2024 \u2014 Present",
    desc: "Leading the design and maintenance of the Data Unity platform \u2014 a customer data unification engine serving 15+ SaaS products. Building ETL pipelines on AWS, integrating Salesforce CRM data, and developing executive dashboards tracking subscription and payment revenue.",
    highlights: ["Architected the UCID identity resolution system unifying millions of customer records", "Built Salesforce-to-Redshift integration using AWS AppFlow with medallion architecture", "Developed Customer Health Dashboard combining Stripe, 5 payment processors, and Vitally", "Designed star schema (DURS fact + DUCS dimension) for scalable multi-product analytics"],
    current: true,
  },
  {
    role: "Business Intelligence Developer", company: "Protech", location: "", period: "Jan 2022 \u2014 Jul 2024",
    desc: "Built and modernized business intelligence solutions, migrating legacy SSRS reports to interactive Power BI dashboards and establishing self-service analytics for business stakeholders.",
    highlights: ["Migrated 20+ legacy SSRS reports to modern Power BI dashboards", "Designed data models and wrote complex SQL for KPI tracking and trend analysis", "Enabled self-service analytics reducing ad-hoc report requests"],
    current: false,
  },
  {
    role: "CRM Developer & Report Developer", company: "Protech", location: "", period: "Jan 2019 \u2014 Dec 2021",
    desc: "Developed reporting solutions within Microsoft Dynamics 365 CRM. Built the SQL and data analysis foundation that drove my transition into data engineering.",
    highlights: ["Built SSRS reports integrated with Dynamics 365 CRM for sales and operations", "Developed SSIS packages for data migration between CRM and external sources", "Wrote stored procedures and complex SQL for data extraction and transformation"],
    current: false,
  },
];

const certs = [
  { name: "AWS Data Engineer Associate", status: "In Progress", icon: "\u{1F3AF}" },
  { name: "Databricks DE Associate", status: "Planned", icon: "\u{1F4CB}" },
  { name: "SnowPro Core", status: "Planned", icon: "\u{1F4CB}" },
];

function Starfield() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext("2d"); let animId, stars = [];
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize(); window.addEventListener("resize", resize);
    for (let i = 0; i < 120; i++) stars.push({ x: Math.random()*canvas.width, y: Math.random()*canvas.height, r: Math.random()*1.2+0.3, speed: Math.random()*0.15+0.02, opacity: Math.random()*0.6+0.2, pulse: Math.random()*Math.PI*2 });
    const draw = () => { ctx.clearRect(0,0,canvas.width,canvas.height); stars.forEach(s => { s.pulse+=0.008; const o=s.opacity+Math.sin(s.pulse)*0.15; ctx.beginPath(); ctx.arc(s.x,s.y,s.r,0,Math.PI*2); ctx.fillStyle=`rgba(148,163,184,${Math.max(0.05,o)})`; ctx.fill(); s.y-=s.speed; if(s.y<-5){s.y=canvas.height+5;s.x=Math.random()*canvas.width;} }); animId=requestAnimationFrame(draw); };
    draw(); return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={canvasRef} style={{position:"fixed",top:0,left:0,width:"100%",height:"100%",zIndex:0,pointerEvents:"none"}} />;
}

function GlowOrbs() {
  return (<div style={{position:"fixed",inset:0,zIndex:0,pointerEvents:"none",overflow:"hidden"}}>
    <div style={{position:"absolute",top:"10%",left:"15%",width:500,height:500,borderRadius:"50%",background:"radial-gradient(circle,rgba(59,130,246,0.06) 0%,transparent 70%)",filter:"blur(60px)",animation:"float1 20s ease-in-out infinite"}} />
    <div style={{position:"absolute",bottom:"20%",right:"10%",width:400,height:400,borderRadius:"50%",background:"radial-gradient(circle,rgba(132,204,22,0.05) 0%,transparent 70%)",filter:"blur(60px)",animation:"float2 25s ease-in-out infinite"}} />
  </div>);
}

function GlassCard({ children, style, hover=true }) {
  const [h, setH] = useState(false);
  return (<div onMouseEnter={()=>hover&&setH(true)} onMouseLeave={()=>hover&&setH(false)} style={{background:h?"rgba(255,255,255,0.05)":COLORS.glass,border:`1px solid ${h?"rgba(59,130,246,0.2)":COLORS.glassBorder}`,borderRadius:16,backdropFilter:"blur(12px)",WebkitBackdropFilter:"blur(12px)",transition:"all 0.3s ease",boxShadow:h?"0 8px 32px rgba(59,130,246,0.08)":"none",...style}}>{children}</div>);
}

function RevealSection({ children, delay=0 }) {
  const ref = useRef(null); const [v, setV] = useState(false);
  useEffect(() => { const obs = new IntersectionObserver(([e])=>{if(e.isIntersecting)setV(true);},{threshold:0.1}); if(ref.current) obs.observe(ref.current); return ()=>obs.disconnect(); }, []);
  return <div ref={ref} style={{opacity:v?1:0,transform:v?"translateY(0)":"translateY(30px)",transition:`all 0.6s cubic-bezier(0.16,1,0.3,1) ${delay}s`}}>{children}</div>;
}

function TypeWriter({ words, speed=100 }) {
  const [cur, setCur] = useState(0); const [text, setText] = useState(""); const [del, setDel] = useState(false);
  useEffect(() => { const w=words[cur]; const t=setTimeout(()=>{ if(!del){setText(w.slice(0,text.length+1));if(text.length===w.length)setTimeout(()=>setDel(true),1800);} else{setText(w.slice(0,text.length-1));if(text.length===0){setDel(false);setCur(c=>(c+1)%words.length);}} },del?speed/2:speed); return ()=>clearTimeout(t); }, [text,del,cur,words,speed]);
  return <span>{text}<span style={{borderRight:`2px solid ${COLORS.accent}`,marginLeft:2,animation:"blink 1s step-end infinite"}} /></span>;
}

function TechPill({ name, cat }) {
  const colors = {cloud:COLORS.accent,data:COLORS.lime,lang:"#f59e0b",viz:"#ec4899",tool:"#8b5cf6"};
  const c = colors[cat]||COLORS.accent;
  return <span style={{display:"inline-flex",alignItems:"center",gap:6,padding:"6px 14px",borderRadius:20,background:`${c}10`,border:`1px solid ${c}25`,color:c,fontSize:13,fontWeight:500,fontFamily:"'JetBrains Mono',monospace",letterSpacing:0.3,whiteSpace:"nowrap"}}><span style={{width:6,height:6,borderRadius:"50%",background:c,opacity:0.7}} />{name}</span>;
}

function ProjectCard({ project, index }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <RevealSection delay={index*0.1}>
      <GlassCard style={{padding:0,overflow:"hidden",gridColumn:project.size==="hero"||project.size==="large"?"1 / -1":"auto"}}>
        <div style={{padding:"28px 28px 0"}}>
          <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:16}}>
            <div style={{width:40,height:40,borderRadius:10,background:`${project.color}15`,border:`1px solid ${project.color}30`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,flexShrink:0}}>{project.icon}</div>
            <div><h3 style={{fontSize:20,fontWeight:700,letterSpacing:-0.5,margin:0,lineHeight:1.2}}>{project.title}</h3><p style={{fontSize:13,color:project.color,fontWeight:500,margin:0,marginTop:2}}>{project.subtitle}</p></div>
          </div>
          <div style={{display:"flex",gap:0,marginBottom:16,borderRadius:10,background:"rgba(255,255,255,0.02)",border:`1px solid ${COLORS.glassBorder}`,overflow:"hidden"}}>
            {project.metrics.map((m,i)=>(<div key={m.label} style={{flex:1,padding:"12px 16px",textAlign:"center",borderRight:i<project.metrics.length-1?`1px solid ${COLORS.glassBorder}`:"none"}}><div style={{fontSize:18,fontWeight:800,color:project.color,fontFamily:"'JetBrains Mono',monospace"}}>{m.value}</div><div style={{fontSize:11,color:COLORS.textDim,marginTop:2,letterSpacing:0.3}}>{m.label}</div></div>))}
          </div>
          <div style={{marginBottom:16}}><p style={{fontSize:12,color:COLORS.textDim,fontWeight:700,letterSpacing:1.5,marginBottom:6,fontFamily:"'JetBrains Mono',monospace"}}>THE CHALLENGE</p><p style={{fontSize:14,color:COLORS.textMuted,lineHeight:1.75,margin:0}}>{project.problem}</p></div>
          <div style={{marginBottom:16}}><p style={{fontSize:12,color:project.color,fontWeight:700,letterSpacing:1.5,marginBottom:6,fontFamily:"'JetBrains Mono',monospace"}}>WHAT I BUILT</p><p style={{fontSize:14,color:COLORS.textMuted,lineHeight:1.75,margin:0}}>{project.solution}</p></div>
        </div>
        <div style={{maxHeight:expanded?600:0,overflow:"hidden",transition:"max-height 0.4s ease"}}>
          <div style={{padding:"0 28px"}}>
            <div style={{marginBottom:16}}><p style={{fontSize:12,color:COLORS.lime,fontWeight:700,letterSpacing:1.5,marginBottom:8,fontFamily:"'JetBrains Mono',monospace"}}>BUSINESS IMPACT</p>
              {project.impact.map((item,i)=>(<div key={i} style={{display:"flex",gap:8,marginBottom:6,fontSize:14,color:COLORS.textMuted,lineHeight:1.6}}><span style={{color:COLORS.lime,flexShrink:0}}>{"\u2192"}</span><span>{item}</span></div>))}
            </div>
            <div style={{marginBottom:16}}><p style={{fontSize:12,color:COLORS.accent,fontWeight:700,letterSpacing:1.5,marginBottom:6,fontFamily:"'JetBrains Mono',monospace"}}>TECHNICAL DEEP DIVE</p><p style={{fontSize:13,color:COLORS.textDim,lineHeight:1.75,margin:0}}>{project.techDetail}</p></div>
          </div>
        </div>
        <div style={{padding:"16px 28px 20px",borderTop:`1px solid ${COLORS.glassBorder}`,display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:12}}>
          <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>{project.tech.map(t=>(<span key={t} style={{padding:"3px 10px",borderRadius:4,background:"rgba(255,255,255,0.04)",border:`1px solid ${COLORS.glassBorder}`,fontSize:11,color:COLORS.textDim,fontFamily:"'JetBrains Mono',monospace"}}>{t}</span>))}</div>
          <button onClick={()=>setExpanded(!expanded)} style={{padding:"6px 16px",borderRadius:6,border:`1px solid ${project.color}30`,background:`${project.color}10`,color:project.color,fontSize:12,fontWeight:600,cursor:"pointer",fontFamily:"'JetBrains Mono',monospace",transition:"all 0.2s"}}>{expanded?"Show Less \u2191":"Impact & Details \u2193"}</button>
        </div>
      </GlassCard>
    </RevealSection>
  );
}

function Nav({ active, onNavigate }) {
  const links = ["Home","Stack","Projects","Experience","Contact"];
  return (<nav style={{position:"fixed",top:0,left:0,right:0,zIndex:100,padding:"16px 0",background:"rgba(10,10,15,0.8)",backdropFilter:"blur(20px)",WebkitBackdropFilter:"blur(20px)",borderBottom:`1px solid ${COLORS.glassBorder}`}}>
    <div style={{maxWidth:1100,margin:"0 auto",padding:"0 24px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
      <div style={{display:"flex",alignItems:"center",gap:10}}>
        <div style={{width:32,height:32,borderRadius:8,background:`linear-gradient(135deg,${COLORS.accent},${COLORS.lime})`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,fontWeight:800,color:"#0a0a0f",fontFamily:"'JetBrains Mono',monospace"}}>M</div>
        <span style={{color:COLORS.text,fontWeight:600,fontSize:16,letterSpacing:-0.3}}>mohan<span style={{color:COLORS.textDim}}>.engineer</span></span>
      </div>
      <div className="nav-links" style={{display:"flex",gap:4}}>{links.map(l=>(<button key={l} onClick={()=>onNavigate(l.toLowerCase())} style={{padding:"8px 16px",borderRadius:8,border:"none",background:active===l.toLowerCase()?COLORS.accentSoft:"transparent",color:active===l.toLowerCase()?COLORS.accent:COLORS.textMuted,fontSize:13,fontWeight:500,cursor:"pointer",transition:"all 0.2s",fontFamily:"inherit"}}>{l}</button>))}</div>
    </div>
  </nav>);
}

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("home");
  const [formData, setFormData] = useState({name:"",email:"",message:""});
  const [formSent, setFormSent] = useState(false);

  useEffect(() => {
    const sections = ["home","stack","projects","experience","contact"];
    const handleScroll = () => { const sp=window.scrollY+150; for(let i=sections.length-1;i>=0;i--){const el=document.getElementById(sections[i]);if(el&&el.offsetTop<=sp){setActiveSection(sections[i]);break;}} };
    window.addEventListener("scroll",handleScroll,{passive:true}); return ()=>window.removeEventListener("scroll",handleScroll);
  }, []);

  const scrollTo = (id) => { setActiveSection(id); document.getElementById(id)?.scrollIntoView({behavior:"smooth"}); };
  const handleSubmit = () => { if(formData.name&&formData.email&&formData.message){setFormSent(true);setTimeout(()=>setFormSent(false),3000);setFormData({name:"",email:"",message:""});} };

  return (
    <div style={{minHeight:"100vh",background:COLORS.bg,color:COLORS.text,fontFamily:"'DM Sans','Segoe UI',system-ui,sans-serif",overflowX:"hidden"}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700&display=swap');
        *{margin:0;padding:0;box-sizing:border-box}
        @keyframes blink{0%,50%{opacity:1}51%,100%{opacity:0}}
        @keyframes pulse{0%,100%{opacity:0.2}50%{opacity:0.8}}
        @keyframes float1{0%,100%{transform:translate(0,0)}50%{transform:translate(30px,-40px)}}
        @keyframes float2{0%,100%{transform:translate(0,0)}50%{transform:translate(-20px,30px)}}
        @keyframes marquee{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
        @keyframes slideUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
        @keyframes glow{0%,100%{box-shadow:0 0 20px rgba(59,130,246,0.1)}50%{box-shadow:0 0 30px rgba(59,130,246,0.2)}}
        @keyframes successPop{0%{transform:scale(0.8);opacity:0}50%{transform:scale(1.05)}100%{transform:scale(1);opacity:1}}
        ::selection{background:rgba(59,130,246,0.3);color:#fff}
        input,textarea{font-family:'DM Sans',system-ui,sans-serif}
        @media(max-width:768px){.bento-grid{grid-template-columns:1fr!important}.hero-title{font-size:36px!important}.hero-sub{font-size:16px!important}.nav-links{display:none!important}.stats-grid{grid-template-columns:repeat(2,1fr)!important}}
      `}</style>

      <Starfield /><GlowOrbs /><Nav active={activeSection} onNavigate={scrollTo} />

      {/* HERO */}
      <section id="home" style={{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",position:"relative",zIndex:1,padding:"0 24px"}}>
        <div style={{maxWidth:800,textAlign:"center",animation:"slideUp 0.8s ease-out"}}>
          <div style={{display:"inline-flex",alignItems:"center",gap:8,padding:"6px 16px",borderRadius:20,background:COLORS.accentSoft,border:`1px solid ${COLORS.accent}30`,marginBottom:24}}>
            <span style={{width:7,height:7,borderRadius:"50%",background:COLORS.lime,boxShadow:`0 0 8px ${COLORS.lime}`}} /><span style={{color:COLORS.accent,fontSize:13,fontWeight:500}}>Open to Data Engineering Opportunities</span>
          </div>
          <h1 className="hero-title" style={{fontSize:60,fontWeight:700,lineHeight:1.1,letterSpacing:-2,marginBottom:20,background:`linear-gradient(135deg,${COLORS.text} 0%,${COLORS.textMuted} 100%)`,WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>
            I Turn Messy Data Into<br /><span style={{WebkitTextFillColor:COLORS.accent}}><TypeWriter words={["Business Decisions","Unified Customer Views","Revenue Insights","Scalable Pipelines"]} speed={80} /></span>
          </h1>
          <p className="hero-sub" style={{fontSize:18,color:COLORS.textMuted,lineHeight:1.7,maxWidth:640,margin:"0 auto 24px",fontWeight:400}}>
            Data Engineer specializing in building production data platforms on AWS. I take scattered customer records across dozens of systems and unify them into a single source of truth that drives real business decisions.
          </p>
          <div style={{display:"flex",alignItems:"center",gap:8,padding:"12px 0",flexWrap:"wrap",justifyContent:"center"}}>
            {["Extract","Transform","Load","Analyze"].map((step,i)=>(<div key={step} style={{display:"flex",alignItems:"center",gap:8}}>
              <div style={{padding:"6px 16px",borderRadius:8,background:i===1?COLORS.accentGlow:COLORS.glass,border:`1px solid ${i===1?`${COLORS.accent}40`:COLORS.glassBorder}`,color:i===1?COLORS.accent:COLORS.textMuted,fontSize:12,fontFamily:"'JetBrains Mono',monospace",fontWeight:600,letterSpacing:1}}>{step}</div>
              {i<3&&<div style={{display:"flex",gap:3}}>{[0,1,2].map(d=>(<div key={d} style={{width:4,height:4,borderRadius:"50%",background:COLORS.accent,opacity:0.4,animation:`pulse 1.5s ease-in-out ${d*0.3}s infinite`}} />))}</div>}
            </div>))}
          </div>
          <div className="stats-grid" style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:8,maxWidth:520,margin:"24px auto 32px"}}>
            {[{v:"15+",l:"Products Unified",c:COLORS.accent},{v:"5",l:"Payment Processors",c:COLORS.lime},{v:"7+",l:"Years in Data",c:COLORS.amber},{v:"M+",l:"Records Processed",c:"#8b5cf6"}].map(s=>(<div key={s.l} style={{textAlign:"center",padding:"16px 8px"}}><div style={{fontSize:32,fontWeight:800,color:s.c,fontFamily:"'JetBrains Mono',monospace",letterSpacing:-1}}>{s.v}</div><div style={{fontSize:12,color:COLORS.textDim,marginTop:4,fontWeight:500,letterSpacing:0.5}}>{s.l}</div></div>))}
          </div>
          <div style={{display:"flex",gap:12,justifyContent:"center"}}>
            <button onClick={()=>scrollTo("projects")} style={{padding:"12px 28px",borderRadius:10,border:"none",background:COLORS.accent,color:"#fff",fontSize:14,fontWeight:600,cursor:"pointer",boxShadow:`0 4px 20px ${COLORS.accent}40`}}>See What I've Built \u2192</button>
            <button onClick={()=>scrollTo("contact")} style={{padding:"12px 28px",borderRadius:10,border:`1px solid ${COLORS.glassBorder}`,background:COLORS.glass,color:COLORS.text,fontSize:14,fontWeight:500,cursor:"pointer",backdropFilter:"blur(8px)"}}>Get In Touch</button>
          </div>
        </div>
      </section>

      {/* TECH STACK */}
      <section id="stack" style={{padding:"100px 24px",position:"relative",zIndex:1}}>
        <div style={{maxWidth:1100,margin:"0 auto"}}>
          <RevealSection>
            <p style={{color:COLORS.accent,fontSize:13,fontWeight:600,letterSpacing:2,marginBottom:8,fontFamily:"'JetBrains Mono',monospace"}}>TECH STACK</p>
            <h2 style={{fontSize:36,fontWeight:700,letterSpacing:-1,marginBottom:12}}>Tools & Technologies</h2>
            <p style={{color:COLORS.textMuted,fontSize:15,maxWidth:600,lineHeight:1.7,marginBottom:40}}>I work across the full data engineering stack — from cloud infrastructure and pipeline orchestration to data warehousing and business intelligence.</p>
          </RevealSection>
          <div style={{overflow:"hidden",marginBottom:40,padding:"16px 0"}}><div style={{display:"flex",gap:12,animation:"marquee 35s linear infinite",width:"max-content"}}>{[...techStack,...techStack].map((t,i)=><TechPill key={`${t.name}-${i}`} name={t.name} cat={t.cat} />)}</div></div>
          <RevealSection delay={0.2}>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))",gap:16}}>
              {[
                {label:"Cloud & Orchestration",desc:"Pipeline infrastructure on AWS",items:["AWS Glue","Lambda","S3","Step Functions","AppFlow"],icon:"\u2601\uFE0F"},
                {label:"Data Platforms",desc:"Storage & compute engines",items:["Redshift","Snowflake","Databricks","Spark","Delta Lake"],icon:"\u{1F5C4}\uFE0F"},
                {label:"Languages & Analytics",desc:"Code + visualization",items:["Python","SQL","PySpark","Power BI","DAX"],icon:"\u26A1"},
                {label:"Integrations",desc:"Connecting business systems",items:["Stripe API","Salesforce","Vitally","Parquet","Git"],icon:"\u{1F517}"},
              ].map(cat=>(<GlassCard key={cat.label} style={{padding:24}}>
                <div style={{fontSize:24,marginBottom:8}}>{cat.icon}</div>
                <h3 style={{fontSize:15,fontWeight:600,marginBottom:4,color:COLORS.text}}>{cat.label}</h3>
                <p style={{fontSize:12,color:COLORS.textDim,marginBottom:12}}>{cat.desc}</p>
                <div style={{display:"flex",flexWrap:"wrap",gap:6}}>{cat.items.map(item=>(<span key={item} style={{padding:"4px 10px",borderRadius:6,background:"rgba(255,255,255,0.04)",fontSize:12,color:COLORS.textMuted,fontFamily:"'JetBrains Mono',monospace"}}>{item}</span>))}</div>
              </GlassCard>))}
            </div>
          </RevealSection>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" style={{padding:"100px 24px",position:"relative",zIndex:1}}>
        <div style={{maxWidth:1100,margin:"0 auto"}}>
          <RevealSection>
            <p style={{color:COLORS.lime,fontSize:13,fontWeight:600,letterSpacing:2,marginBottom:8,fontFamily:"'JetBrains Mono',monospace"}}>PROJECTS</p>
            <h2 style={{fontSize:36,fontWeight:700,letterSpacing:-1,marginBottom:12}}>What I've Built</h2>
            <p style={{color:COLORS.textMuted,fontSize:15,maxWidth:600,lineHeight:1.7,marginBottom:40}}>Each project follows the same pattern: understand the business problem, architect a data solution, and measure the impact. Click "Impact & Details" to see the full story.</p>
          </RevealSection>
          <div className="bento-grid" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>{projects.map((p,i)=><ProjectCard key={p.title} project={p} index={i} />)}</div>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section id="experience" style={{padding:"100px 24px",position:"relative",zIndex:1}}>
        <div style={{maxWidth:800,margin:"0 auto"}}>
          <RevealSection>
            <p style={{color:COLORS.accent,fontSize:13,fontWeight:600,letterSpacing:2,marginBottom:8,fontFamily:"'JetBrains Mono',monospace"}}>EXPERIENCE</p>
            <h2 style={{fontSize:36,fontWeight:700,letterSpacing:-1,marginBottom:12}}>Career Journey</h2>
            <p style={{color:COLORS.textMuted,fontSize:15,maxWidth:600,lineHeight:1.7,marginBottom:48}}>From CRM reporting to full-stack data engineering — each role built on the last, giving me a unique perspective combining business understanding with technical depth.</p>
          </RevealSection>
          <div style={{position:"relative"}}>
            <div style={{position:"absolute",left:12,top:8,bottom:8,width:2,background:`linear-gradient(to bottom,${COLORS.accent},${COLORS.glassBorder})`}} />
            {experience.map((exp,i)=>(<RevealSection key={exp.role} delay={i*0.15}>
              <div style={{position:"relative",paddingLeft:48,marginBottom:40}}>
                <div style={{position:"absolute",left:4,top:8,width:18,height:18,borderRadius:"50%",background:exp.current?COLORS.accent:COLORS.glass,border:`2px solid ${exp.current?COLORS.accent:COLORS.glassBorder}`,animation:exp.current?"glow 3s ease-in-out infinite":"none"}} />
                <GlassCard style={{padding:24}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",flexWrap:"wrap",gap:8,marginBottom:8}}>
                    <div><h3 style={{fontSize:18,fontWeight:700,letterSpacing:-0.3}}>{exp.role}</h3><p style={{fontSize:14,color:COLORS.accent,fontWeight:500}}>{exp.company} {exp.location&&`\u00B7 ${exp.location}`}</p></div>
                    <span style={{padding:"4px 12px",borderRadius:6,background:exp.current?COLORS.accentSoft:COLORS.glass,border:`1px solid ${exp.current?`${COLORS.accent}30`:COLORS.glassBorder}`,color:exp.current?COLORS.accent:COLORS.textDim,fontSize:12,fontFamily:"'JetBrains Mono',monospace",fontWeight:500,whiteSpace:"nowrap"}}>{exp.period}</span>
                  </div>
                  <p style={{fontSize:14,color:COLORS.textMuted,lineHeight:1.7,marginBottom:12}}>{exp.desc}</p>
                  <ul style={{listStyle:"none",padding:0}}>{exp.highlights.map((h,hi)=>(<li key={hi} style={{fontSize:13,color:COLORS.textDim,lineHeight:1.7,paddingLeft:16,position:"relative",marginBottom:4}}><span style={{position:"absolute",left:0,color:COLORS.accent}}>{"\u2192"}</span>{h}</li>))}</ul>
                </GlassCard>
              </div>
            </RevealSection>))}
          </div>
        </div>
      </section>

      {/* EDUCATION & CERTS */}
      <section style={{padding:"0 24px 100px",position:"relative",zIndex:1}}>
        <div style={{maxWidth:800,margin:"0 auto"}}>
          <RevealSection>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:16}}>
              <GlassCard style={{padding:24}}><p style={{fontSize:12,color:COLORS.accent,fontWeight:600,letterSpacing:1,marginBottom:8,fontFamily:"'JetBrains Mono',monospace"}}>MASTER'S DEGREE</p><h3 style={{fontSize:16,fontWeight:700,marginBottom:4}}>Information Technology</h3><p style={{fontSize:14,color:COLORS.textMuted}}>Towson University, Maryland</p></GlassCard>
              <GlassCard style={{padding:24}}><p style={{fontSize:12,color:COLORS.lime,fontWeight:600,letterSpacing:1,marginBottom:8,fontFamily:"'JetBrains Mono',monospace"}}>MBA</p><h3 style={{fontSize:16,fontWeight:700,marginBottom:4}}>Business Administration</h3><p style={{fontSize:14,color:COLORS.textMuted}}>Centennial College, Toronto</p></GlassCard>
            </div>
          </RevealSection>
          <RevealSection delay={0.1}>
            <GlassCard style={{padding:24}}>
              <p style={{fontSize:12,color:COLORS.amber,fontWeight:600,letterSpacing:1,marginBottom:16,fontFamily:"'JetBrains Mono',monospace"}}>CERTIFICATIONS & LEARNING</p>
              <div style={{display:"flex",gap:16,flexWrap:"wrap"}}>{certs.map(c=>(<div key={c.name} style={{display:"flex",alignItems:"center",gap:10,padding:"8px 16px",borderRadius:8,background:"rgba(255,255,255,0.02)",border:`1px solid ${COLORS.glassBorder}`}}><span>{c.icon}</span><div><div style={{fontSize:13,fontWeight:600,color:COLORS.text}}>{c.name}</div><div style={{fontSize:11,color:c.status==="In Progress"?COLORS.amber:COLORS.textDim}}>{c.status}</div></div></div>))}</div>
              <p style={{fontSize:13,color:COLORS.textDim,marginTop:16,lineHeight:1.6}}>Currently studying: "Designing Data-Intensive Applications" by Martin Kleppmann — deepening my understanding of distributed systems, storage engines, and data architecture patterns.</p>
            </GlassCard>
          </RevealSection>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" style={{padding:"100px 24px 80px",position:"relative",zIndex:1}}>
        <div style={{maxWidth:600,margin:"0 auto"}}>
          <RevealSection>
            <p style={{color:COLORS.lime,fontSize:13,fontWeight:600,letterSpacing:2,marginBottom:8,fontFamily:"'JetBrains Mono',monospace",textAlign:"center"}}>CONTACT</p>
            <h2 style={{fontSize:36,fontWeight:700,letterSpacing:-1,marginBottom:12,textAlign:"center"}}>Let's Connect</h2>
            <p style={{fontSize:15,color:COLORS.textMuted,textAlign:"center",marginBottom:40,lineHeight:1.7}}>Open to full-time Data Engineering roles, freelance analytics projects, and technical collaborations. Based in Atlanta, GA.</p>
          </RevealSection>
          <RevealSection delay={0.2}>
            <GlassCard style={{padding:32}} hover={false}>
              {formSent?(<div style={{textAlign:"center",padding:"40px 0",animation:"successPop 0.4s ease-out"}}><div style={{fontSize:48,marginBottom:16}}>{"\u2713"}</div><h3 style={{fontSize:20,fontWeight:700,marginBottom:8,color:COLORS.lime}}>Message Sent!</h3><p style={{color:COLORS.textMuted,fontSize:14}}>I'll get back to you shortly.</p></div>):(
                <div style={{display:"flex",flexDirection:"column",gap:16}}>
                  {[{key:"name",label:"Name",type:"text"},{key:"email",label:"Email",type:"email"}].map(field=>(<div key={field.key}><label style={{fontSize:12,color:COLORS.textDim,fontWeight:600,letterSpacing:0.5,marginBottom:6,display:"block"}}>{field.label}</label><input type={field.type} value={formData[field.key]} onChange={e=>setFormData(f=>({...f,[field.key]:e.target.value}))} style={{width:"100%",padding:"12px 16px",borderRadius:10,border:`1px solid ${COLORS.glassBorder}`,background:"rgba(255,255,255,0.03)",color:COLORS.text,fontSize:14,outline:"none"}} onFocus={e=>e.target.style.borderColor=`${COLORS.accent}50`} onBlur={e=>e.target.style.borderColor=COLORS.glassBorder} /></div>))}
                  <div><label style={{fontSize:12,color:COLORS.textDim,fontWeight:600,letterSpacing:0.5,marginBottom:6,display:"block"}}>Message</label><textarea rows={4} value={formData.message} onChange={e=>setFormData(f=>({...f,message:e.target.value}))} style={{width:"100%",padding:"12px 16px",borderRadius:10,border:`1px solid ${COLORS.glassBorder}`,background:"rgba(255,255,255,0.03)",color:COLORS.text,fontSize:14,outline:"none",resize:"vertical"}} onFocus={e=>e.target.style.borderColor=`${COLORS.accent}50`} onBlur={e=>e.target.style.borderColor=COLORS.glassBorder} /></div>
                  <button onClick={handleSubmit} style={{padding:"14px 32px",borderRadius:10,border:"none",background:`linear-gradient(135deg,${COLORS.accent},#2563eb)`,color:"#fff",fontSize:15,fontWeight:600,cursor:"pointer",boxShadow:`0 4px 20px ${COLORS.accent}30`,marginTop:8}}>Send Message {"\u2192"}</button>
                </div>
              )}
            </GlassCard>
          </RevealSection>
        </div>
      </section>

      <footer style={{padding:"32px 24px",textAlign:"center",borderTop:`1px solid ${COLORS.glassBorder}`,position:"relative",zIndex:1}}><p style={{fontSize:13,color:COLORS.textDim}}>Mohan Perugu {"\u00B7"} Data Engineer {"\u00B7"} Atlanta, GA</p></footer>
    </div>
  );
}
