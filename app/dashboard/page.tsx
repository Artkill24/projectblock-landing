"use client";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";

const API = "https://api.project-block.com";

const S = {
  bg: {minHeight:"100vh",background:"#060608",color:"#e8e8f0",fontFamily:"monospace"},
  wrap: {maxWidth:900,margin:"0 auto",padding:"40px 24px"},
  card: {border:"1px solid rgba(255,255,255,0.07)",background:"#0d0d12",padding:"28px",marginBottom:16},
  label: {fontSize:10,letterSpacing:"0.15em",color:"rgba(232,232,240,0.45)",textTransform:"uppercase" as const,marginBottom:8},
  teal: {color:"#00e5cc"},
  grid: {display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))",gap:16,marginBottom:24},
  badge: (plan:string) => ({
    display:"inline-block",fontSize:10,padding:"3px 10px",letterSpacing:"0.1em",
    textTransform:"uppercase" as const,
    background: plan==="free"?"rgba(255,255,255,0.05)":"rgba(0,229,204,0.1)",
    color: plan==="free"?"rgba(232,232,240,0.45)":"#00e5cc",
    border: `1px solid ${plan==="free"?"rgba(255,255,255,0.07)":"#00e5cc"}`,
  }),
};

function DashboardContent() {
  const params = useSearchParams();
  const token = params.get("token");

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [linkSent, setLinkSent] = useState(false);
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [billingLoading, setBillingLoading] = useState(false);

  const manageBilling = async () => {
    setBillingLoading(true);
    try {
      const res = await fetch(`${API}/v1/billing/portal`, {
        method: "POST",
        headers: { "Authorization": `Bearer ${data.api_key}` },
      });
      if (!res.ok) throw new Error();
      const d = await res.json();
      window.location.href = d.url;
    } catch {
      alert("Could not open the billing portal. Please try again in a moment.");
    } finally {
      setBillingLoading(false);
    }
  };
  const [verifying, setVerifying] = useState(!!token);

  // Se c'è un token nell'URL, verifica automaticamente
  useEffect(() => {
    if (!token) return;
    (async () => {
      try {
        const res = await fetch(`${API}/v1/auth/verify?token=${token}`);
        if (!res.ok) throw new Error("This link is invalid or has expired.");
        const d = await res.json();
        setData(d);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setVerifying(false);
      }
    })();
  }, [token]);

  const requestLink = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!email.includes("@")) return;
    setLoading(true);
    setError("");
    try {
      await fetch(`${API}/v1/auth/request-link`, {
        method: "POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify({email})
      });
      setLinkSent(true);
    } catch {
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const copy = () => {
    navigator.clipboard.writeText(data.api_key);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const planLimits: Record<string,string> = {
    free: "500K events/mo", starter: "10M events/mo",
    pro: "100M events/mo", business: "Unlimited",
  };

  return (
    <main style={S.bg}>
      <nav style={{borderBottom:"1px solid rgba(255,255,255,0.07)",background:"rgba(6,6,8,0.9)",backdropFilter:"blur(20px)",position:"sticky",top:0,zIndex:100}}>
        <div style={{maxWidth:900,margin:"0 auto",padding:"0 24px",height:56,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
          <a href="/" style={{display:"flex",alignItems:"center",gap:10,textDecoration:"none",color:"#e8e8f0",fontSize:14,fontWeight:700}}>
            <div style={{width:24,height:24,border:"1.5px solid #00e5cc",position:"relative",display:"grid",placeItems:"center"}}>
              <div style={{position:"absolute",inset:3,background:"#00e5cc",clipPath:"polygon(0 0,100% 0,100% 70%,70% 100%,0 100%)"}}/>
            </div>
            project<span style={S.teal}>block</span>
          </a>
          <span style={{fontSize:11,color:"rgba(232,232,240,0.45)"}}>DASHBOARD</span>
        </div>
      </nav>

      <div style={S.wrap}>
        {verifying ? (
          <div style={{textAlign:"center",marginTop:100,color:"rgba(232,232,240,0.45)",fontSize:13}}>
            Verifying your link...
          </div>
        ) : !data ? (
          <div style={{maxWidth:440,margin:"80px auto"}}>
            {linkSent ? (
              <>
                <div style={{fontSize:11,letterSpacing:"0.15em",...S.teal,marginBottom:16}}>↳ CHECK YOUR INBOX</div>
                <h1 style={{fontSize:32,fontWeight:800,letterSpacing:"-0.03em",marginBottom:8}}>Link sent.</h1>
                <p style={{fontSize:12,color:"rgba(232,232,240,0.45)",lineHeight:1.7}}>
                  If an account exists for <span style={S.teal}>{email}</span>, you&apos;ll receive a login link in the next minute.
                  The link expires in 15 minutes.
                </p>
                <button onClick={()=>{setLinkSent(false);setEmail("");}}
                  style={{fontSize:11,background:"transparent",color:"rgba(232,232,240,0.3)",
                    border:"none",cursor:"pointer",marginTop:24,fontFamily:"monospace"}}>
                  ← Use a different email
                </button>
              </>
            ) : (
              <>
                <div style={{fontSize:11,letterSpacing:"0.15em",...S.teal,marginBottom:16}}>↳ ACCESS YOUR ACCOUNT</div>
                <h1 style={{fontSize:32,fontWeight:800,letterSpacing:"-0.03em",marginBottom:8}}>Welcome back.</h1>
                <p style={{fontSize:12,color:"rgba(232,232,240,0.45)",marginBottom:32,lineHeight:1.7}}>
                  Enter your email — we&apos;ll send you a secure login link. No password needed.
                </p>
                <form onSubmit={requestLink} style={{display:"flex",flexDirection:"column",gap:12}}>
                  <input
                    type="email" placeholder="your@email.com" value={email}
                    onChange={e=>setEmail(e.target.value)}
                    style={{fontSize:13,background:"#0d0d12",border:"1px solid rgba(255,255,255,0.07)",
                      color:"#e8e8f0",padding:"14px 16px",outline:"none",fontFamily:"monospace",width:"100%"}}
                  />
                  {error && <div style={{fontSize:12,color:"#ff4d6d"}}>{error}</div>}
                  <button type="submit" disabled={loading}
                    style={{fontSize:13,fontWeight:700,background:"#00e5cc",color:"#000",border:"none",
                      cursor:"pointer",padding:"14px",letterSpacing:"0.05em",fontFamily:"monospace",
                      opacity:loading?0.6:1}}>
                    {loading ? "SENDING..." : "SEND LOGIN LINK →"}
                  </button>
                </form>
              </>
            )}
          </div>
        ) : (
          <div>
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:32,flexWrap:"wrap",gap:12}}>
              <div>
                <div style={{fontSize:11,letterSpacing:"0.15em",...S.teal,marginBottom:8}}>↳ YOUR ACCOUNT</div>
                <h1 style={{fontSize:28,fontWeight:800,letterSpacing:"-0.03em"}}>{data.email}</h1>
              </div>
              <span style={S.badge(data.plan)}>{data.plan}</span>
            </div>

            <div style={S.grid}>
              {[
                {label:"Plan", val: data.plan.toUpperCase()},
                {label:"Events limit", val: planLimits[data.plan] || "Unlimited"},
                {label:"Budget", val: `$${data.budget_usd}/mo`},
                {label:"Member since", val: new Date(data.created_at).toLocaleDateString("en", {month:"short",year:"numeric"})},
              ].map(s=>(
                <div key={s.label} style={S.card}>
                  <div style={S.label}>{s.label}</div>
                  <div style={{fontSize:15,fontWeight:700,...S.teal}}>{s.val}</div>
                </div>
              ))}
            </div>

            <div style={S.card}>
              <div style={S.label}>Your API Key</div>
              <div style={{display:"flex",alignItems:"center",gap:12,flexWrap:"wrap"}}>
                <code style={{fontSize:12,background:"#060608",padding:"10px 14px",
                  border:"1px solid rgba(255,255,255,0.07)",flex:1,wordBreak:"break-all" as const,
                  color:"#00e5cc"}}>
                  {data.api_key}
                </code>
                <button onClick={copy}
                  style={{fontSize:11,fontWeight:700,background:copied?"rgba(0,229,204,0.1)":"transparent",
                    color:copied?"#00e5cc":"rgba(232,232,240,0.45)",border:"1px solid rgba(255,255,255,0.07)",
                    cursor:"pointer",padding:"10px 16px",fontFamily:"monospace",whiteSpace:"nowrap" as const}}>
                  {copied ? "✓ COPIED" : "COPY"}
                </button>
              </div>
            </div>

            <div style={S.card}>
              <div style={S.label}>Quickstart</div>
              <pre style={{fontSize:12,lineHeight:1.7,overflowX:"auto",margin:0}}>
                <span style={{color:"rgba(232,232,240,0.3)"}}>{"# Install\n"}</span>
                {"pip install projectblock\n\n"}
                <span style={{color:"rgba(232,232,240,0.3)"}}>{"# Use\n"}</span>
                <span style={{color:"#c792ea"}}>{"from"}</span>{" "}<span style={S.teal}>{"projectblock"}</span>{" import gate, record\n\n"}
                <span style={{color:"#c792ea"}}>{"await"}</span>{" gate("}<span style={{color:"#c3e88d"}}>{"\"user_123\""}</span>{", budget_usd="}<span style={{color:"#f78c6c"}}>{"5.00"}</span>{")\n"}
                <span style={{color:"#c792ea"}}>{"await"}</span>{" record("}<span style={{color:"#c3e88d"}}>{"\"user_123\""}</span>{", model="}<span style={{color:"#c3e88d"}}>{"\"gpt-4o\""}</span>{", cost="}<span style={{color:"#f78c6c"}}>{"0.003"}</span>{")"}
              </pre>
            </div>

            {data.plan !== "free" && (
              <div style={S.card}>
                <div style={S.label}>Billing</div>
                <p style={{fontSize:12,color:"rgba(232,232,240,0.45)",marginBottom:16,lineHeight:1.6}}>
                  Update your payment method, download invoices, or cancel your subscription.
                </p>
                <button onClick={manageBilling} disabled={billingLoading}
                  style={{fontSize:12,fontWeight:700,background:"transparent",
                    color:"#00e5cc",border:"1px solid #00e5cc",cursor:"pointer",
                    padding:"10px 20px",fontFamily:"monospace",letterSpacing:"0.05em",
                    opacity:billingLoading?0.6:1}}>
                  {billingLoading ? "OPENING..." : "MANAGE BILLING →"}
                </button>
              </div>
            )}

            {data.plan === "free" && (
              <div style={{...S.card,borderColor:"#00e5cc",display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:16}}>
                <div>
                  <div style={{fontSize:14,fontWeight:700,marginBottom:4}}>Upgrade to Starter</div>
                  <div style={{fontSize:12,color:"rgba(232,232,240,0.45)"}}>10M events/mo + 1 year audit log + webhooks</div>
                </div>
                <a href="https://buy.stripe.com/cNicN42Fr3xB1CI7FGcQU02" target="_blank"
                  style={{fontSize:12,fontWeight:700,background:"#00e5cc",color:"#000",
                    padding:"12px 24px",textDecoration:"none",letterSpacing:"0.05em",whiteSpace:"nowrap" as const}}>
                  UPGRADE €19/mo →
                </a>
              </div>
            )}

            <button onClick={()=>{setData(null);setEmail("");window.history.replaceState({},"","/dashboard");}}
              style={{fontSize:11,background:"transparent",color:"rgba(232,232,240,0.3)",
                border:"none",cursor:"pointer",marginTop:8,fontFamily:"monospace"}}>
              ← Sign out
            </button>
          </div>
        )}
      </div>
    </main>
  );
}

export default function Dashboard() {
  return (
    <Suspense>
      <DashboardContent />
    </Suspense>
  );
}
