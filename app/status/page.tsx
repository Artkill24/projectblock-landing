"use client";
import { useState, useEffect, useCallback } from "react";

const API = "https://api.project-block.com";

const S = {
  bg: {minHeight:"100vh",background:"#060608",color:"#e8e8f0",fontFamily:"monospace"},
  wrap: {maxWidth:760,margin:"0 auto",padding:"0 24px"},
  card: {border:"1px solid rgba(255,255,255,0.07)",background:"#0d0d12",padding:"24px 28px",marginBottom:16},
  teal: {color:"#00e5cc"},
  muted: {color:"rgba(232,232,240,0.6)"},
  logoBox: {width:24,height:24,border:"1.5px solid #00e5cc",position:"relative" as const,display:"grid",placeItems:"center"},
  logoFill: {position:"absolute" as const,inset:3,background:"#00e5cc",clipPath:"polygon(0 0,100% 0,100% 70%,70% 100%,0 100%)"},
};

type CheckState = "checking" | "operational" | "down";

export default function Status() {
  const [state, setState] = useState<CheckState>("checking");
  const [latencyMs, setLatencyMs] = useState<number | null>(null);
  const [lastChecked, setLastChecked] = useState<Date | null>(null);

  const check = useCallback(async () => {
    setState("checking");
    const start = performance.now();
    try {
      const res = await fetch(`${API}/health`, { cache: "no-store" });
      const elapsed = Math.round(performance.now() - start);
      setLatencyMs(elapsed);
      setState(res.ok ? "operational" : "down");
    } catch {
      setState("down");
      setLatencyMs(null);
    }
    setLastChecked(new Date());
  }, []);

  useEffect(() => { check(); }, [check]);

  const dotColor = state === "operational" ? "#00e5cc" : state === "down" ? "#ff4d6d" : "rgba(232,232,240,0.3)";
  const label = state === "operational" ? "All systems operational" : state === "down" ? "API unreachable" : "Checking...";

  return (
    <main style={S.bg}>
      <nav style={{borderBottom:"1px solid rgba(255,255,255,0.07)",background:"rgba(6,6,8,0.9)",backdropFilter:"blur(20px)",position:"sticky",top:0,zIndex:100}}>
        <div style={{maxWidth:900,margin:"0 auto",padding:"0 24px",height:56,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
          <a href="/" style={{display:"flex",alignItems:"center",gap:10,textDecoration:"none",color:"#e8e8f0",fontSize:14,fontWeight:700}}>
            <div style={S.logoBox}><div style={S.logoFill}/></div>
            project<span style={S.teal}>block</span>
          </a>
          <span style={{fontSize:11,color:"rgba(232,232,240,0.45)"}}>STATUS</span>
        </div>
      </nav>

      <div style={{...S.wrap, padding:"56px 24px 100px"}}>
        <div style={{fontSize:11,letterSpacing:"0.15em",...S.teal,marginBottom:16}}>↳ LIVE STATUS</div>
        <h1 style={{fontSize:32,fontWeight:800,letterSpacing:"-0.03em",marginBottom:24}}>System status.</h1>

        <div style={{...S.card, display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap" as const, gap:16}}>
          <div style={{display:"flex", alignItems:"center", gap:12}}>
            <span style={{width:10,height:10,borderRadius:"50%",background:dotColor,display:"inline-block",
              animation: state==="checking" ? "pulse 1s infinite" : undefined}}/>
            <span style={{fontSize:14,fontWeight:700}}>{label}</span>
          </div>
          <button onClick={check} style={{fontSize:11,fontWeight:700,background:"transparent",
            color:"rgba(232,232,240,0.5)",border:"1px solid rgba(255,255,255,0.07)",cursor:"pointer",
            padding:"8px 16px",fontFamily:"monospace",letterSpacing:"0.05em"}}>
            CHECK AGAIN →
          </button>
        </div>

        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(160px,1fr))",gap:1,
          background:"rgba(255,255,255,0.07)",marginBottom:16}}>
          {[
            {label:"api.project-block.com", val: state==="checking" ? "—" : state},
            {label:"Last response", val: latencyMs !== null ? `${latencyMs}ms` : "—"},
            {label:"Last checked", val: lastChecked ? lastChecked.toLocaleTimeString("en-GB") : "—"},
            {label:"Target p99 latency", val:"<2ms"},
          ].map(m=>(
            <div key={m.label} style={{background:"#0d0d12",padding:"20px 20px"}}>
              <div style={{fontSize:10,letterSpacing:"0.1em",color:"rgba(232,232,240,0.4)",
                textTransform:"uppercase" as const,marginBottom:6}}>{m.label}</div>
              <div style={{fontSize:16,fontWeight:700,...S.teal}}>{m.val}</div>
            </div>
          ))}
        </div>

        <div style={S.card}>
          <div style={{fontSize:10,letterSpacing:"0.1em",color:"rgba(232,232,240,0.4)",
            textTransform:"uppercase" as const,marginBottom:10}}>About this page</div>
          <p style={{fontSize:12,lineHeight:1.8,color:"rgba(232,232,240,0.6)",margin:0}}>
            This page pings the public <code style={{color:"#00e5cc"}}>/health</code> endpoint of the
            ProjectBlock API directly from your browser, in real time — there&apos;s no synthetic or cached
            data behind it. Sub-component monitoring (database, queue, email delivery) is on the roadmap.
          </p>
        </div>

        <div style={S.card}>
          <div style={{fontSize:10,letterSpacing:"0.1em",color:"rgba(232,232,240,0.4)",
            textTransform:"uppercase" as const,marginBottom:10}}>Incident history</div>
          <p style={{fontSize:12,color:"rgba(232,232,240,0.45)",margin:0}}>No incidents reported.</p>
        </div>
      </div>

      <footer style={{borderTop:"1px solid rgba(255,255,255,0.07)",padding:"32px 24px"}}>
        <div style={{maxWidth:900,margin:"0 auto",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap" as const,gap:16}}>
          <a href="/" style={{fontSize:11,...S.muted,textDecoration:"none"}}>← Back to project-block.com</a>
          <div style={{display:"flex",gap:24}}>
            <a href="/docs" style={{fontSize:11,...S.muted,textDecoration:"none"}}>Docs</a>
            <a href="/privacy" style={{fontSize:11,...S.muted,textDecoration:"none"}}>Privacy</a>
            <a href="/terms" style={{fontSize:11,...S.muted,textDecoration:"none"}}>Terms</a>
          </div>
        </div>
      </footer>

      <style>{`@keyframes pulse{0%,100%{opacity:1}50%{opacity:0.3}}`}</style>
    </main>
  );
}
