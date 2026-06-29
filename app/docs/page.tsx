const S = {
  bg: {minHeight:"100vh",background:"#060608",color:"#e8e8f0",fontFamily:"monospace"},
  wrap: {maxWidth:820,margin:"0 auto",padding:"0 24px"},
  card: {border:"1px solid rgba(255,255,255,0.07)",background:"#0d0d12",padding:"22px 26px",marginBottom:16},
  teal: {color:"#00e5cc"},
  muted: {color:"rgba(232,232,240,0.6)"},
  h2: {fontSize:18,fontWeight:700,letterSpacing:"-0.02em",marginTop:40,marginBottom:14,color:"#e8e8f0"},
  p: {fontSize:13,lineHeight:1.8,color:"rgba(232,232,240,0.65)",marginBottom:12},
  logoBox: {width:24,height:24,border:"1.5px solid #00e5cc",position:"relative" as const,display:"grid",placeItems:"center"},
  logoFill: {position:"absolute" as const,inset:3,background:"#00e5cc",clipPath:"polygon(0 0,100% 0,100% 70%,70% 100%,0 100%)"},
  methodBadge: (m:string) => ({
    fontSize:10,fontWeight:700,padding:"3px 8px",letterSpacing:"0.05em",
    background: m==="GET" ? "rgba(0,229,204,0.1)" : m==="POST" ? "rgba(245,158,11,0.12)" : "rgba(255,77,109,0.1)",
    color: m==="GET" ? "#00e5cc" : m==="POST" ? "#f59e0b" : "#ff4d6d",
  }),
};

function Endpoint({method, path, desc, code}: {method:string; path:string; desc:string; code:string}) {
  return (
    <div style={S.card}>
      <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:10,flexWrap:"wrap" as const}}>
        <span style={S.methodBadge(method)}>{method}</span>
        <code style={{fontSize:13,color:"#e8e8f0"}}>{path}</code>
      </div>
      <p style={{fontSize:12,color:"rgba(232,232,240,0.5)",marginBottom:14}}>{desc}</p>
      <pre style={{background:"#060608",border:"1px solid rgba(255,255,255,0.07)",padding:"14px 16px",
        fontSize:11.5,lineHeight:1.7,overflowX:"auto",margin:0,color:"#e8e8f0"}}>{code}</pre>
    </div>
  );
}

export default function Docs() {
  return (
    <main style={S.bg}>
      <nav style={{borderBottom:"1px solid rgba(255,255,255,0.07)",background:"rgba(6,6,8,0.9)",backdropFilter:"blur(20px)",position:"sticky",top:0,zIndex:100}}>
        <div style={{maxWidth:900,margin:"0 auto",padding:"0 24px",height:56,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
          <a href="/" style={{display:"flex",alignItems:"center",gap:10,textDecoration:"none",color:"#e8e8f0",fontSize:14,fontWeight:700}}>
            <div style={S.logoBox}><div style={S.logoFill}/></div>
            project<span style={S.teal}>block</span>
          </a>
          <a href="https://api.project-block.com/docs" target="_blank"
            style={{fontSize:11,...S.teal,textDecoration:"none"}}>Full Swagger reference →</a>
        </div>
      </nav>

      <div style={{...S.wrap, padding:"56px 24px 100px"}}>
        <div style={{fontSize:11,letterSpacing:"0.15em",...S.teal,marginBottom:16}}>↳ DOCUMENTATION</div>
        <h1 style={{fontSize:32,fontWeight:800,letterSpacing:"-0.03em",marginBottom:8}}>API Reference</h1>
        <p style={{fontSize:13,color:"rgba(232,232,240,0.5)",marginBottom:8}}>
          Base URL: <code style={S.teal}>https://api.project-block.com</code>
        </p>

        <h2 style={S.h2}>Install</h2>
        <pre style={{background:"#0d0d12",border:"1px solid rgba(255,255,255,0.07)",padding:"16px 20px",
          fontSize:13,marginBottom:8}}>pip install projectblock</pre>
        <p style={{fontSize:12,color:"rgba(232,232,240,0.45)",marginBottom:16}}>
          Using LangChain? <code style={S.teal}>pip install projectblock[langchain]</code> adds a drop-in callback handler — see below.
        </p>

        <h2 style={S.h2}>Authentication</h2>
        <p style={S.p}>
          Every request needs your API key as a Bearer token. Find yours on the{" "}
          <a href="/dashboard" style={S.teal}>dashboard</a> after signing up.
        </p>
        <pre style={{background:"#0d0d12",border:"1px solid rgba(255,255,255,0.07)",padding:"16px 20px",
          fontSize:13,marginBottom:16}}>Authorization: Bearer pb_your_api_key_here</pre>

        <h2 style={S.h2}>Quickstart (Python SDK)</h2>
        <pre style={{background:"#0d0d12",border:"1px solid rgba(255,255,255,0.07)",padding:"16px 20px",
          fontSize:12.5,lineHeight:1.8,overflowX:"auto"}}>
{`import os
os.environ["PROJECTBLOCK_API_KEY"] = "pb_your_key"

from projectblock import gate, record

await gate("user_123", budget_usd=5.00)
response = await openai.chat.completions.create(model="gpt-4o", messages=messages)
await record("user_123", model="gpt-4o", cost_usd=0.0023)`}
        </pre>

        <h2 style={S.h2}>Endpoints</h2>

        <Endpoint
          method="POST" path="/v1/gate"
          desc="Check whether a user still has budget left before you call your LLM. Returns 401 with an Invalid API key message if the key is wrong."
          code={`curl -X POST https://api.project-block.com/v1/gate \\
  -H "Authorization: Bearer pb_your_key" \\
  -H "Content-Type: application/json" \\
  -d '{"user_id":"usr_123","budget_usd":5.00}'

→ {"allowed":true,"remaining_usd":5.0,"used_usd":0.0}`}
        />

        <Endpoint
          method="POST" path="/v1/record"
          desc="Meter and audit a completed AI call in one call. Always async on our side — never adds latency to your user-facing request."
          code={`curl -X POST https://api.project-block.com/v1/record \\
  -H "Authorization: Bearer pb_your_key" \\
  -H "Content-Type: application/json" \\
  -d '{"user_id":"usr_123","model":"gpt-4o","cost_usd":0.0023}'

→ {"ok":true,"event_id":"...","monthly_cost_usd":0.0023,"remaining_usd":4.9977}`}
        />

        <Endpoint
          method="GET" path="/v1/usage/{user_id}"
          desc="Current month usage for a single end-user."
          code={`curl https://api.project-block.com/v1/usage/usr_123 \\
  -H "Authorization: Bearer pb_your_key"

→ {"cost_usd":0.0023,"tokens":350,"events":1,"budget_usd":5.0,"used_pct":0.05}`}
        />

        <Endpoint
          method="GET" path="/v1/audit/stream"
          desc="Most recent audit events for your organization, newest first."
          code={`curl https://api.project-block.com/v1/audit/stream \\
  -H "Authorization: Bearer pb_your_key"`}
        />

        <Endpoint
          method="POST" path="/v1/webhooks"
          desc="Register a webhook endpoint. Budget alerts (80/95/100%) are delivered here, signed with HMAC-SHA256 in the X-ProjectBlock-Signature header."
          code={`curl -X POST https://api.project-block.com/v1/webhooks \\
  -H "Authorization: Bearer pb_your_key" \\
  -H "Content-Type: application/json" \\
  -d '{"url":"https://yourapp.com/webhook","events":["budget.80","budget.95","budget.100"]}'`}
        />

        <Endpoint
          method="GET" path="/v1/compliance/report?period=YYYY-MM"
          desc="Download a PDF EU AI Act compliance report (Article 12 record-keeping) for a given month."
          code={`curl "https://api.project-block.com/v1/compliance/report?period=2026-06" \\
  -H "Authorization: Bearer pb_your_key" \\
  -o report.pdf`}
        />

        <Endpoint
          method="DELETE" path="/v1/gdpr/user/{user_id}"
          desc="Right-to-be-forgotten for one end-user. Pseudonymizes their identifier across all audit events; preserves timestamp, model, and cost fields required for AI Act retention."
          code={`curl -X DELETE https://api.project-block.com/v1/gdpr/user/usr_123 \\
  -H "Authorization: Bearer pb_your_key"

→ {"ok":true,"pseudonym":"deleted_a0053e6d...","events_anonymized":4}`}
        />

        <h2 style={S.h2}>LangChain integration</h2>
        <p style={S.p}>
          Drop <code style={S.teal}>ProjectBlockCallbackHandler</code> into any LangChain{" "}
          <code style={S.teal}>callbacks=[...]</code> list to get automatic budget gating, usage
          metering, and audit logging for every LLM call — no other changes to your chain.
        </p>
        <pre style={{background:"#0d0d12",border:"1px solid rgba(255,255,255,0.07)",padding:"16px 20px",
          fontSize:12.5,lineHeight:1.8,overflowX:"auto",marginBottom:24}}>
{`from langchain_openai import ChatOpenAI
from projectblock.langchain import ProjectBlockCallbackHandler

handler = ProjectBlockCallbackHandler(
    user_id="usr_123",
    budget_usd=5.00,
    cost_per_1k_input=0.0025,   # set to your model's real pricing
    cost_per_1k_output=0.01,
)

llm = ChatOpenAI(model="gpt-4o", callbacks=[handler])
response = await llm.ainvoke("Hello!")
# Budget checked before the call. Usage + audit event recorded after.`}
        </pre>

        <h2 style={S.h2}>Need more?</h2>
        <p style={S.p}>
          The full interactive Swagger reference, with every parameter and response schema, is at{" "}
          <a href="https://api.project-block.com/docs" target="_blank" style={S.teal}>
            api.project-block.com/docs
          </a>.
        </p>
      </div>

      <footer style={{borderTop:"1px solid rgba(255,255,255,0.07)",padding:"32px 24px"}}>
        <div style={{maxWidth:900,margin:"0 auto",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap" as const,gap:16}}>
          <a href="/" style={{fontSize:11,...S.muted,textDecoration:"none"}}>← Back to project-block.com</a>
          <div style={{display:"flex",gap:24}}>
            <a href="/status" style={{fontSize:11,...S.muted,textDecoration:"none"}}>Status</a>
            <a href="/privacy" style={{fontSize:11,...S.muted,textDecoration:"none"}}>Privacy</a>
            <a href="/terms" style={{fontSize:11,...S.muted,textDecoration:"none"}}>Terms</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
