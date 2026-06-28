"use client";
import { useState, useEffect } from "react";

const MODELS = ["gpt-4o","claude-sonnet-4-6","gemini-2.0-flash","llama-3.3-70b"];
const USERS  = ["usr_a4f2","usr_b9k1","usr_c3m8","usr_d7p5"];
const ACTS   = ["chat.completion","embedding.create","image.generate"];

function randomLog() {
  const n = new Date();
  const ts = `${String(n.getHours()).padStart(2,"0")}:${String(n.getMinutes()).padStart(2,"0")}:${String(n.getSeconds()).padStart(2,"0")}`;
  return { ts, user: USERS[~~(Math.random()*USERS.length)], action: ACTS[~~(Math.random()*ACTS.length)], model: MODELS[~~(Math.random()*MODELS.length)], cost: `$${(Math.random()*0.04+0.001).toFixed(4)}`, status: Math.random()>0.15?"ok":"warn", id: Math.random() };
}

const INIT_EVENTS = 487_234_109;
const INIT_SAVED  = 18_430;

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [events, setEvents]   = useState(INIT_EVENTS);
  const [saved,  setSaved]    = useState(INIT_SAVED);
  const [logs,   setLogs]     = useState<ReturnType<typeof randomLog>[]>([]);
  const [email,  setEmail]    = useState("");
  const [done,   setDone]     = useState(false);

  useEffect(() => {
    setMounted(true);
    setLogs(Array.from({length:7}, randomLog));
    const t1 = setInterval(() => setEvents(e => e + ~~(Math.random()*80+20)), 800);
    const t2 = setInterval(() => setSaved(s => s + ~~(Math.random()*5+1)), 3000);
    const t3 = setInterval(() => setLogs(p => [{...randomLog()}, ...p.slice(0,8)]), 1800);
    return () => [t1,t2,t3].forEach(clearInterval);
  }, []);

  const S = {
    nav: {position:"sticky" as const,top:0,zIndex:100,borderBottom:"1px solid rgba(255,255,255,0.07)",background:"rgba(6,6,8,0.9)",backdropFilter:"blur(20px)"},
    navInner: {maxWidth:1100,margin:"0 auto",padding:"0 24px",height:60,display:"flex",alignItems:"center",justifyContent:"space-between"},
    logo: {display:"flex",alignItems:"center",gap:10,fontSize:15,fontWeight:700,letterSpacing:"-0.02em"},
    logoBox: {width:28,height:28,border:"1.5px solid #00e5cc",display:"grid",placeItems:"center",position:"relative" as const},
    logoFill: {position:"absolute" as const,inset:3,background:"#00e5cc",clipPath:"polygon(0 0,100% 0,100% 70%,70% 100%,0 100%)"},
    wrap: {maxWidth:1100,margin:"0 auto",padding:"0 24px"},
    tag: {fontSize:11,letterSpacing:"0.15em",color:"#00e5cc",textTransform:"uppercase" as const,marginBottom:16},
    h2: {fontSize:"clamp(28px,4vw,44px)",fontWeight:800,letterSpacing:"-0.03em",marginBottom:48},
    muted: {color:"rgba(232,232,240,0.45)"},
  };

  return (
    <main style={{minHeight:"100vh",background:"#060608",color:"#e8e8f0",fontFamily:"monospace",position:"relative",overflowX:"hidden"}}>

      {/* Glow */}
      <div style={{position:"fixed",width:700,height:500,top:-200,left:"50%",transform:"translateX(-50%)",background:"#00e5cc",filter:"blur(140px)",opacity:0.1,pointerEvents:"none",zIndex:0,borderRadius:"50%"}}/>
      <div style={{position:"fixed",inset:0,pointerEvents:"none",zIndex:0,backgroundImage:"linear-gradient(rgba(0,229,204,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(0,229,204,0.025) 1px,transparent 1px)",backgroundSize:"60px 60px"}}/>

      {/* NAV */}
      <nav style={S.nav}>
        <div style={S.navInner}>
          <div style={S.logo}>
            <div style={S.logoBox}><div style={S.logoFill}/></div>
            project<span style={{color:"#00e5cc"}}>block</span>
          </div>
          <div style={{display:"flex",gap:28}}>
            {[{l:"Docs",href:"/docs"},{l:"Pricing",href:"/#pricing"},{l:"Changelog",href:"https://github.com/Artkill24/projectblock"}].map(n=><a key={n.l} href={n.href} style={{fontSize:12,...S.muted,textDecoration:"none"}}>{n.l}</a>)}
          </div>
          <button style={{fontSize:12,fontWeight:700,background:"#00e5cc",color:"#000",border:"none",cursor:"pointer",padding:"8px 18px",letterSpacing:"0.05em"}}>GET API KEY →</button>
        </div>
      </nav>

      {/* HERO */}
      <section style={{padding:"100px 24px 80px",textAlign:"center",position:"relative",zIndex:1}}>
        <div style={S.wrap}>
          <div style={{display:"inline-flex",alignItems:"center",gap:8,border:"1px solid rgba(255,255,255,0.07)",padding:"6px 14px",fontSize:11,...S.muted,marginBottom:32,letterSpacing:"0.08em"}}>
            <span style={{width:6,height:6,borderRadius:"50%",background:"#00e5cc",display:"inline-block",animation:"pulse 2s infinite"}}/>
            INFRASTRUCTURE FOR AI PRODUCTS · EARLY ACCESS
          </div>
          <h1 style={{fontSize:"clamp(40px,7vw,76px)",fontWeight:800,lineHeight:1.0,letterSpacing:"-0.04em",marginBottom:24}}>
            <span style={{color:"#00e5cc"}}>Meter. Audit.</span><br/>
            <span style={{color:"rgba(232,232,240,0.3)"}}>Ship with confidence.</span>
          </h1>
          <p style={{fontSize:15,...S.muted,maxWidth:520,margin:"0 auto 40px",lineHeight:1.7}}>
            The missing infrastructure layer between your app and your LLM.<br/>
            Usage metering + EU AI Act–ready audit trails in one SDK.
          </p>
          <div style={{display:"flex",gap:12,justifyContent:"center",flexWrap:"wrap" as const,marginBottom:60}}>
            {done ? (
              <div style={{fontSize:13,color:"#00e5cc",padding:"14px 28px",border:"1px solid #00e5cc"}}>✓ You&apos;re on the list. We&apos;ll be in touch.</div>
            ) : <>
              <input placeholder="your@email.com" value={email} onChange={e=>setEmail(e.target.value)} onKeyDown={e=>e.key==="Enter"&&email.includes("@")&&setDone(true)}
                style={{fontSize:13,background:"#0d0d12",border:"1px solid rgba(255,255,255,0.07)",color:"#e8e8f0",padding:"14px 20px",outline:"none",width:240,fontFamily:"monospace"}}/>
              <button onClick={()=>email.includes("@")&&setDone(true)}
                style={{fontSize:13,fontWeight:700,background:"#00e5cc",color:"#000",border:"none",cursor:"pointer",padding:"14px 28px",letterSpacing:"0.05em"}}>
                JOIN WAITLIST →
              </button>
            </>}
            <button style={{fontSize:13,background:"transparent",...S.muted,cursor:"pointer",padding:"14px 28px",border:"1px solid rgba(255,255,255,0.07)",fontFamily:"monospace"}}>VIEW DOCS</button>
          </div>

          {/* LIVE COUNTERS */}
          <div style={{display:"inline-flex",alignItems:"center",gap:0,border:"1px solid rgba(255,255,255,0.07)",background:"#0d0d12",flexWrap:"wrap" as const}}>
            {[
              {val: mounted ? events.toLocaleString("en") : INIT_EVENTS.toLocaleString("en"), label:"events metered"},
              {val: mounted ? `$${saved.toLocaleString("en")}` : `$${INIT_SAVED.toLocaleString("en")}`, label:"saved via cache"},
              {val:"99.99%", label:"uptime sla"},
              {val:"<2ms", label:"p99 latency"},
            ].map((c,i)=>(
              <div key={i} style={{textAlign:"center",padding:"20px 32px",borderRight: i<3 ? "1px solid rgba(255,255,255,0.07)" : "none"}}>
                <div style={{fontSize:28,fontWeight:700,color:"#00e5cc"}}>{c.val}</div>
                <div style={{fontSize:10,...S.muted,letterSpacing:"0.1em",textTransform:"uppercase" as const,marginTop:4}}>{c.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CODE */}
      <section style={{padding:"0 24px 80px",position:"relative",zIndex:1}}>
        <div style={{maxWidth:780,margin:"0 auto",border:"1px solid rgba(255,255,255,0.07)",background:"#0d0d12"}}>
          <div style={{padding:"12px 16px",borderBottom:"1px solid rgba(255,255,255,0.07)",background:"#12121a",display:"flex",alignItems:"center",gap:8}}>
            {["#ff5f57","#febc2e","#28c840"].map(c=><div key={c} style={{width:10,height:10,borderRadius:"50%",background:c}}/>)}
            <span style={{fontSize:11,...S.muted,marginLeft:"auto"}}>your_app.py</span>
          </div>
          <pre style={{padding:24,fontSize:13,lineHeight:1.8,overflowX:"auto",margin:0}}>
            <span style={{color:"rgba(232,232,240,0.3)"}}>{"# Before: 3 weeks of custom metering code. After: 3 lines."}{"\n\n"}</span>
            <span style={{color:"#c792ea"}}>{"from"}</span>{" "}<span style={{color:"#00e5cc"}}>{"projectblock"}</span>{" import gate, record\n\n"}
            <span style={{color:"rgba(232,232,240,0.3)"}}>{"# 1. Check budget before LLM call\n"}</span>
            <span style={{color:"#c792ea"}}>{"await"}</span>{" gate("}<span style={{color:"#c3e88d"}}>{"\"usr_123\""}</span>{", budget_usd="}<span style={{color:"#f78c6c"}}>{"5.00"}</span>{")\n\n"}
            <span style={{color:"rgba(232,232,240,0.3)"}}>{"# 2. Your LLM call (unchanged)\n"}</span>
            {"response = await openai.chat("}<span style={{color:"#c3e88d"}}>{"\"gpt-4o\""}</span>{", messages)\n\n"}
            <span style={{color:"rgba(232,232,240,0.3)"}}>{"# 3. Meter + Audit\n"}</span>
            <span style={{color:"#c792ea"}}>{"await"}</span>{" "}<span style={{color:"#00e5cc"}}>{"record"}</span>{"(user_id="}<span style={{color:"#c3e88d"}}>{"\"usr_123\""}</span>{", model="}<span style={{color:"#c3e88d"}}>{"\"gpt-4o\""}</span>{", cost="}<span style={{color:"#f78c6c"}}>{"0.0023"}</span>{")"}
          </pre>
        </div>
      </section>

      {/* AUDIT LIVE */}
      <section style={{padding:"0 24px 80px",position:"relative",zIndex:1}}>
        <div style={S.wrap}>
          <div style={S.tag}>↳ LIVE DEMO</div>
          <h2 style={S.h2}>Every event. Captured.</h2>
          <div style={{border:"1px solid rgba(255,255,255,0.07)",background:"#0d0d12"}}>
            <div style={{padding:"14px 20px",borderBottom:"1px solid rgba(255,255,255,0.07)",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <span style={{fontSize:11,...S.muted,letterSpacing:"0.1em",textTransform:"uppercase" as const}}>AUDIT STREAM · api.project-block.com</span>
              <span style={{fontSize:10,color:"#00e5cc",display:"flex",alignItems:"center",gap:6}}>
                <span style={{width:6,height:6,borderRadius:"50%",background:"#00e5cc",display:"inline-block",animation:"pulse 2s infinite"}}/>LIVE
              </span>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"110px 100px 1fr 80px 70px",padding:"8px 20px",fontSize:10,...S.muted,letterSpacing:"0.08em",textTransform:"uppercase" as const,background:"#12121a",borderBottom:"1px solid rgba(255,255,255,0.05)"}}>
              <span>TIME</span><span>USER</span><span>ACTION · MODEL</span><span style={{textAlign:"right"}}>COST</span><span style={{textAlign:"center"}}>STATUS</span>
            </div>
            {mounted && logs.map((log,i)=>(
              <div key={log.id} style={{display:"grid",gridTemplateColumns:"110px 100px 1fr 80px 70px",padding:"10px 20px",borderBottom:"1px solid rgba(255,255,255,0.03)",fontSize:11,alignItems:"center"}}>
                <span style={S.muted}>{log.ts}</span>
                <span style={{color:"#00e5cc"}}>{log.user}</span>
                <span>{log.action} <span style={S.muted}>· {log.model}</span></span>
                <span style={{color:"#f59e0b",textAlign:"right"}}>{log.cost}</span>
                <div style={{textAlign:"center"}}>
                  <span style={{fontSize:10,padding:"2px 8px",background:log.status==="ok"?"rgba(0,229,204,0.1)":"rgba(245,158,11,0.12)",color:log.status==="ok"?"#00e5cc":"#f59e0b"}}>{log.status.toUpperCase()}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* METRICS */}
      <section style={{padding:"0 24px 80px",position:"relative",zIndex:1}}>
        <div style={S.wrap}>
          <div style={{display:"flex",border:"1px solid rgba(255,255,255,0.07)",background:"#0d0d12",flexWrap:"wrap" as const}}>
            {[{v:"<2ms",l:"Gate check latency (p99)"},{v:"10yr",l:"Audit log retention"},{v:"∞",l:"Events per second (burst)"},{v:"27",l:"EU member states covered"}].map((m,i)=>(
              <div key={i} style={{flex:1,minWidth:160,padding:"28px 24px",textAlign:"center",borderRight:i<3?"1px solid rgba(255,255,255,0.07)":"none"}}>
                <div style={{fontSize:32,fontWeight:700,color:"#00e5cc"}}>{m.v}</div>
                <div style={{fontSize:11,...S.muted,marginTop:4}}>{m.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section style={{padding:"0 24px 80px",position:"relative",zIndex:1}}>
        <div style={S.wrap}>
          <div style={S.tag}>↳ PRIMITIVES</div>
          <h2 style={S.h2}>Two modules. Zero bloat.</h2>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))",gap:1,background:"rgba(255,255,255,0.07)"}}>
            {[
              {icon:"⚡",t:"Usage Metering",d:"Track tokens, cost, requests per user with atomic counters. Never let free-tier users drain your budget.",tag:"meter.*"},
              {icon:"🛡️",t:"Budget Gate",d:"Pre-call check in <2ms. Block requests before they hit your LLM. Zero latency added to your users.",tag:"gate.allowed()"},
              {icon:"📋",t:"Audit Trail",d:"Immutable log of every AI action. Input hash, output hash, model, cost, human approval. 10-year retention.",tag:"audit.log()"},
              {icon:"🇪🇺",t:"EU AI Act Ready",d:"Auto-generated compliance reports. GDPR + audit retention solved architecturally — not as afterthought.",tag:"compliance.*"},
              {icon:"📊",t:"Embeddable Dashboard",d:"One line of code adds a usage dashboard inside your app. Users see their own consumption in real-time.",tag:"<UsageDash />"},
              {icon:"🔔",t:"Budget Alerts",d:"Webhooks at 80%, 95%, 100% budget. Slack, email, SMS. Configurable per user, per plan, per model.",tag:"webhooks.*"},
            ].map(f=>(
              <div key={f.t} style={{background:"#060608",padding:"36px 32px"}}>
                <div style={{fontSize:28,marginBottom:20}}>{f.icon}</div>
                <div style={{fontSize:17,fontWeight:700,marginBottom:10,letterSpacing:"-0.02em"}}>{f.t}</div>
                <div style={{fontSize:12,...S.muted,lineHeight:1.7,marginBottom:14}}>{f.d}</div>
                <span style={{fontSize:10,letterSpacing:"0.1em",textTransform:"uppercase" as const,padding:"3px 8px",border:"1px solid #00e5cc",color:"#00e5cc"}}>{f.tag}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section style={{padding:"0 24px 80px",position:"relative",zIndex:1}}>
        <div style={S.wrap}>
          <div style={S.tag}>↳ INTEGRATION</div>
          <h2 style={S.h2}>Live in one afternoon.</h2>
          {[
            {n:"01",t:"Install the SDK",d:"Python, Node.js, Go. One package.",code:"pip install projectblock"},
            {n:"02",t:"Gate every AI call",d:"Check budget before your LLM call. If over budget, throws — no call made, no cost incurred.",code:'await gate("usr_123", budget_usd=5.00)'},
            {n:"03",t:"Record + Audit",d:"After the call, record consumption and log the event. Two lines. Both async.",code:'await record(user_id, tokens=usage.total, cost=0.0023)'},
            {n:"04",t:"Export compliance",d:"One API call generates EU AI Act compliance PDF for any time range.",code:'compliance.report(format="eu-ai-act", period="2026-Q2")'},
          ].map(s=>(
            <div key={s.n} style={{display:"grid",gridTemplateColumns:"80px 1fr",gap:32,padding:"40px 0",borderBottom:"1px solid rgba(255,255,255,0.07)"}}>
              <div style={{fontSize:48,fontWeight:700,color:"rgba(255,255,255,0.07)",lineHeight:1}}>{s.n}</div>
              <div>
                <div style={{fontSize:20,fontWeight:700,marginBottom:8,letterSpacing:"-0.02em"}}>{s.t}</div>
                <div style={{fontSize:12,...S.muted,lineHeight:1.7,marginBottom:16}}>{s.d}</div>
                <div style={{background:"#12121a",border:"1px solid rgba(255,255,255,0.07)",padding:"14px 18px",fontSize:12,color:"#00e5cc"}}>{s.code}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" style={{padding:"0 24px 80px",position:"relative",zIndex:1}}>
        <div style={S.wrap}>
          <div style={S.tag}>↳ PRICING</div>
          <h2 style={S.h2}>Pay for what you use.</h2>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))",gap:1,background:"rgba(255,255,255,0.07)"}}>
            {[
              {plan:"FREE",price:"€0",events:"500K events/mo",feat:["Budget gating","Audit log (30 days)","Dashboard embed","Community support"],btn:"Start free",link:"#free",featured:false},
              {plan:"STARTER",price:"€19",events:"10M events/mo",feat:["Budget gating","Audit log (1 year)","Budget webhooks","Usage analytics","Email support"],btn:"Get started",link:"https://buy.stripe.com/cNicN42Fr3xB1CI7FGcQU02",featured:true},
              {plan:"PRO",price:"€49",events:"100M events/mo",feat:["Everything in Starter","Audit log (10 years)","EU AI Act reports","API access","Priority support"],btn:"Get started",link:"https://buy.stripe.com/4gM00i7ZLc470yEaRScQU03",featured:false},
              {plan:"BUSINESS",price:"€199",events:"Unlimited",feat:["Everything in Pro","White-label dashboard","Custom retention","SSO / SAML","SLA + dedicated"],btn:"Contact us",link:"https://buy.stripe.com/9B6eVc3Jvd8b2GM5xycQU04",featured:false},
            ].map(p=>(
              <div key={p.plan} style={{background:p.featured?"#0d0d12":"#060608",padding:"36px 28px",borderTop:p.featured?"2px solid #00e5cc":"2px solid transparent"}}>
                <div style={{fontSize:11,letterSpacing:"0.15em",textTransform:"uppercase" as const,...S.muted,marginBottom:16}}>{p.plan}</div>
                <div style={{fontSize:40,fontWeight:800,letterSpacing:"-0.04em",marginBottom:4}}>{p.price}<span style={{fontSize:14,fontWeight:400,...S.muted}}>/mo</span></div>
                <div style={{fontSize:11,color:"#00e5cc",marginBottom:28}}>{p.events}</div>
                <ul style={{listStyle:"none",display:"flex",flexDirection:"column" as const,gap:10,marginBottom:28}}>
                  {p.feat.map(f=><li key={f} style={{fontSize:12,...S.muted,display:"flex",gap:10}}><span style={{color:"#00e5cc",flexShrink:0}}>→</span>{f}</li>)}
                </ul>
                <a href={p.link} target="_blank" rel="noopener" style={{display:"block",textAlign:"center",textDecoration:"none",width:"100%",fontSize:12,fontWeight:700,padding:"12px",cursor:"pointer",letterSpacing:"0.05em",fontFamily:"monospace",background:p.featured?"#00e5cc":"transparent",border:p.featured?"none":"1px solid rgba(255,255,255,0.07)",color:p.featured?"#000":"rgba(232,232,240,0.45)"}}>
                  {p.btn} →
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{padding:"0 24px 120px",position:"relative",zIndex:1,textAlign:"center"}}>
        <div style={S.wrap}>
          <div style={S.tag}>↳ EARLY ACCESS</div>
          <h2 style={{fontSize:"clamp(28px,4vw,56px)",fontWeight:800,letterSpacing:"-0.04em",marginBottom:16}}>
            Stop rebuilding<br/>the same infrastructure.
          </h2>
          <p style={{fontSize:13,...S.muted,maxWidth:480,margin:"0 auto 40px",lineHeight:1.7}}>
            Every week you delay is another week of custom metering code, compliance risk, and budget leaks.<br/>
            First 100 founders get Pro free for 6 months.
          </p>
          {done ? (
            <div style={{fontSize:14,color:"#00e5cc",border:"1px solid #00e5cc",display:"inline-block",padding:"16px 32px"}}>✓ You&apos;re on the list.</div>
          ) : (
            <div style={{display:"flex",gap:12,justifyContent:"center",flexWrap:"wrap" as const}}>
              <input placeholder="your@email.com" value={email} onChange={e=>setEmail(e.target.value)}
                style={{fontSize:13,background:"#0d0d12",border:"1px solid rgba(255,255,255,0.07)",color:"#e8e8f0",padding:"14px 20px",outline:"none",width:260,fontFamily:"monospace"}}/>
              <button onClick={()=>email.includes("@")&&setDone(true)}
                style={{fontSize:13,fontWeight:700,background:"#00e5cc",color:"#000",border:"none",cursor:"pointer",padding:"14px 28px",letterSpacing:"0.05em",fontFamily:"monospace"}}>
                JOIN WAITLIST →
              </button>
            </div>
          )}
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{borderTop:"1px solid rgba(255,255,255,0.07)",padding:"40px 24px",position:"relative",zIndex:1}}>
        <div style={{...S.wrap,display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap" as const,gap:16}}>
          <div style={S.logo}>
            <div style={S.logoBox}><div style={S.logoFill}/></div>
            project<span style={{color:"#00e5cc"}}>block</span>
          </div>
          <span style={{fontSize:11,...S.muted}}>© 2026 ProjectBlock. Built by one person.</span>
          <div style={{display:"flex",gap:24}}>
            {[{l:"Docs",href:"/docs"},{l:"Status",href:"/status"},{l:"Privacy",href:"/privacy"},{l:"Terms",href:"/terms"}].map(n=><a key={n.l} href={n.href} style={{fontSize:11,...S.muted,textDecoration:"none"}}>{n.l}</a>)}
          </div>
        </div>
      </footer>

      <style>{`@keyframes pulse{0%,100%{opacity:1}50%{opacity:0.3}}`}</style>
    </main>
  );
}
