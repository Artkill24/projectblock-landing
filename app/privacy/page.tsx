const S = {
  bg: {minHeight:"100vh",background:"#060608",color:"#e8e8f0",fontFamily:"monospace"},
  wrap: {maxWidth:760,margin:"0 auto",padding:"0 24px"},
  card: {border:"1px solid rgba(255,255,255,0.07)",background:"#0d0d12",padding:"24px 28px",marginBottom:16},
  label: {fontSize:10,letterSpacing:"0.15em",color:"rgba(232,232,240,0.45)",textTransform:"uppercase" as const,marginBottom:8},
  teal: {color:"#00e5cc"},
  muted: {color:"rgba(232,232,240,0.6)"},
  h2: {fontSize:18,fontWeight:700,letterSpacing:"-0.02em",marginTop:36,marginBottom:12,color:"#e8e8f0"},
  p: {fontSize:13,lineHeight:1.8,color:"rgba(232,232,240,0.65)",marginBottom:12},
  li: {fontSize:13,lineHeight:1.8,color:"rgba(232,232,240,0.65)",marginBottom:6},
  logoBox: {width:24,height:24,border:"1.5px solid #00e5cc",position:"relative" as const,display:"grid",placeItems:"center"},
  logoFill: {position:"absolute" as const,inset:3,background:"#00e5cc",clipPath:"polygon(0 0,100% 0,100% 70%,70% 100%,0 100%)"},
};

export default function Privacy() {
  return (
    <main style={S.bg}>
      <nav style={{borderBottom:"1px solid rgba(255,255,255,0.07)",background:"rgba(6,6,8,0.9)",backdropFilter:"blur(20px)",position:"sticky",top:0,zIndex:100}}>
        <div style={{maxWidth:900,margin:"0 auto",padding:"0 24px",height:56,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
          <a href="/" style={{display:"flex",alignItems:"center",gap:10,textDecoration:"none",color:"#e8e8f0",fontSize:14,fontWeight:700}}>
            <div style={S.logoBox}><div style={S.logoFill}/></div>
            project<span style={S.teal}>block</span>
          </a>
          <span style={{fontSize:11,color:"rgba(232,232,240,0.45)"}}>PRIVACY POLICY</span>
        </div>
      </nav>

      <div style={{...S.wrap, padding:"56px 24px 100px"}}>
        <div style={{fontSize:11,letterSpacing:"0.15em",...S.teal,marginBottom:16}}>↳ LEGAL</div>
        <h1 style={{fontSize:32,fontWeight:800,letterSpacing:"-0.03em",marginBottom:8}}>Privacy Policy</h1>
        <p style={{fontSize:12,color:"rgba(232,232,240,0.4)",marginBottom:32}}>Last updated: June 27, 2026</p>

        <div style={S.card}>
          <p style={S.p}>
            ProjectBlock (&quot;we&quot;, &quot;our&quot;, &quot;the service&quot;) is operated by Saad Kaicar,
            a sole proprietor based in Italy. This policy explains what data we collect when you use
            project-block.com and the ProjectBlock API, and how it is processed under the EU General
            Data Protection Regulation (GDPR).
          </p>
        </div>

        <h2 style={S.h2}>1. What we collect</h2>
        <ul style={{paddingLeft:20,marginBottom:12}}>
          <li style={S.li}><strong style={{color:"#e8e8f0"}}>Account data</strong> — the email address you sign up with, your plan, and your API key.</li>
          <li style={S.li}><strong style={{color:"#e8e8f0"}}>Usage metering data</strong> — token counts, cost, model names, and timestamps for each metered API call.</li>
          <li style={S.li}><strong style={{color:"#e8e8f0"}}>Audit log content</strong> — by default we store only a cryptographic hash of any prompt/response text you choose to pass us, never the raw text, unless you explicitly opt in to richer logging in the future.</li>
          <li style={S.li}><strong style={{color:"#e8e8f0"}}>Payment data</strong> — handled entirely by Stripe. We never see or store your card details.</li>
        </ul>

        <h2 style={S.h2}>2. Why we process it</h2>
        <p style={S.p}>
          We process this data to provide the service you signed up for: metering AI usage, enforcing
          budgets, generating audit trails, and billing your subscription. Where required by the EU AI
          Act (Regulation (EU) 2024/1689, Article 12), audit records are retained for the period tied to
          your plan, as record-keeping evidence for AI systems you operate.
        </p>

        <h2 style={S.h2}>3. Who else sees it</h2>
        <p style={S.p}>We use a small number of infrastructure processors, all of whom only see what they need to run their part of the service:</p>
        <ul style={{paddingLeft:20,marginBottom:12}}>
          <li style={S.li}><strong style={{color:"#e8e8f0"}}>Supabase</strong> (Ireland, EU) — database storage</li>
          <li style={S.li}><strong style={{color:"#e8e8f0"}}>Upstash</strong> — Redis usage counters</li>
          <li style={S.li}><strong style={{color:"#e8e8f0"}}>Stripe</strong> — payment processing</li>
          <li style={S.li}><strong style={{color:"#e8e8f0"}}>Resend</strong> — transactional email (login links, receipts)</li>
          <li style={S.li}><strong style={{color:"#e8e8f0"}}>Fly.io</strong> — application hosting</li>
        </ul>
        <p style={S.p}>We do not sell your data, and we do not share it with advertisers.</p>
        <p style={S.p}>
          Some processors handle data outside the EU (for example, application compute on Fly.io may run
          in the US). Where this happens, we rely on Standard Contractual Clauses or equivalent safeguards
          maintained by each processor to keep your data protected to EU standards.
        </p>

        <h2 style={S.h2}>4. Your rights</h2>
        <p style={S.p}>Under GDPR, you can ask us to:</p>
        <ul style={{paddingLeft:20,marginBottom:12}}>
          <li style={S.li}>Access the personal data we hold about you</li>
          <li style={S.li}>Correct inaccurate data</li>
          <li style={S.li}>Export your data in a portable format</li>
          <li style={S.li}>
            Erase your personal identifiers — for end-users metered through your account, this is
            available self-service via the <code style={{color:"#00e5cc"}}>DELETE /v1/gdpr/user/{`{user_id}`}</code> API.
            It permanently pseudonymizes the identifier while keeping the underlying timestamp, cost, and
            model fields, which we are required to retain for compliance purposes.
          </li>
        </ul>
        <p style={S.p}>
          To exercise these rights for your own account data, email{" "}
          <a href="mailto:robertkiller23@gmail.com" style={S.teal}>robertkiller23@gmail.com</a>.
          You also have the right to lodge a complaint with the Italian Garante per la protezione dei
          dati personali.
        </p>

        <h2 style={S.h2}>5. Data location & retention</h2>
        <p style={S.p}>
          Infrastructure is hosted within the EU where possible (Supabase: Ireland). Account data is kept
          for as long as your account is active. Audit log retention follows your plan: 30 days (Free),
          1 year (Starter), 10 years (Pro/Business) — matching EU AI Act record-keeping windows.
        </p>

        <h2 style={S.h2}>6. Cookies</h2>
        <p style={S.p}>
          The dashboard uses no tracking or advertising cookies. We do not run any analytics scripts
          that profile individual visitors.
        </p>

        <h2 style={S.h2}>7. Changes</h2>
        <p style={S.p}>
          If this policy changes materially, we&apos;ll update the date at the top of this page and, for
          significant changes, notify active subscribers by email.
        </p>

        <h2 style={S.h2}>8. Contact</h2>
        <p style={S.p}>
          Questions about this policy: <a href="mailto:robertkiller23@gmail.com" style={S.teal}>robertkiller23@gmail.com</a>
        </p>
      </div>

      <footer style={{borderTop:"1px solid rgba(255,255,255,0.07)",padding:"32px 24px"}}>
        <div style={{maxWidth:900,margin:"0 auto",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap" as const,gap:16}}>
          <a href="/" style={{fontSize:11,...S.muted,textDecoration:"none"}}>← Back to project-block.com</a>
          <div style={{display:"flex",gap:24}}>
            <a href="/docs" style={{fontSize:11,...S.muted,textDecoration:"none"}}>Docs</a>
            <a href="/status" style={{fontSize:11,...S.muted,textDecoration:"none"}}>Status</a>
            <a href="/terms" style={{fontSize:11,...S.muted,textDecoration:"none"}}>Terms</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
