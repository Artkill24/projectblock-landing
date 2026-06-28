const S = {
  bg: {minHeight:"100vh",background:"#060608",color:"#e8e8f0",fontFamily:"monospace"},
  wrap: {maxWidth:760,margin:"0 auto",padding:"0 24px"},
  card: {border:"1px solid rgba(255,255,255,0.07)",background:"#0d0d12",padding:"24px 28px",marginBottom:16},
  teal: {color:"#00e5cc"},
  muted: {color:"rgba(232,232,240,0.6)"},
  h2: {fontSize:18,fontWeight:700,letterSpacing:"-0.02em",marginTop:36,marginBottom:12,color:"#e8e8f0"},
  p: {fontSize:13,lineHeight:1.8,color:"rgba(232,232,240,0.65)",marginBottom:12},
  li: {fontSize:13,lineHeight:1.8,color:"rgba(232,232,240,0.65)",marginBottom:6},
  logoBox: {width:24,height:24,border:"1.5px solid #00e5cc",position:"relative" as const,display:"grid",placeItems:"center"},
  logoFill: {position:"absolute" as const,inset:3,background:"#00e5cc",clipPath:"polygon(0 0,100% 0,100% 70%,70% 100%,0 100%)"},
};

export default function Terms() {
  return (
    <main style={S.bg}>
      <nav style={{borderBottom:"1px solid rgba(255,255,255,0.07)",background:"rgba(6,6,8,0.9)",backdropFilter:"blur(20px)",position:"sticky",top:0,zIndex:100}}>
        <div style={{maxWidth:900,margin:"0 auto",padding:"0 24px",height:56,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
          <a href="/" style={{display:"flex",alignItems:"center",gap:10,textDecoration:"none",color:"#e8e8f0",fontSize:14,fontWeight:700}}>
            <div style={S.logoBox}><div style={S.logoFill}/></div>
            project<span style={S.teal}>block</span>
          </a>
          <span style={{fontSize:11,color:"rgba(232,232,240,0.45)"}}>TERMS OF SERVICE</span>
        </div>
      </nav>

      <div style={{...S.wrap, padding:"56px 24px 100px"}}>
        <div style={{fontSize:11,letterSpacing:"0.15em",...S.teal,marginBottom:16}}>↳ LEGAL</div>
        <h1 style={{fontSize:32,fontWeight:800,letterSpacing:"-0.03em",marginBottom:8}}>Terms of Service</h1>
        <p style={{fontSize:12,color:"rgba(232,232,240,0.4)",marginBottom:32}}>Last updated: June 27, 2026</p>

        <div style={S.card}>
          <p style={S.p}>
            These terms govern your use of ProjectBlock (project-block.com and api.project-block.com),
            operated by Saad Kaicar. By creating an account or using the API, you agree to them.
          </p>
        </div>

        <h2 style={S.h2}>1. The service</h2>
        <p style={S.p}>
          ProjectBlock provides usage metering, budget enforcement, and audit-trail infrastructure for
          AI/LLM calls, accessed via API and SDK. It is infrastructure software: it does not generate or
          process the content of your AI calls itself, only the metadata and metrics you send to it.
        </p>
        <p style={S.p}>
          The service is intended for developers, businesses, and professionals integrating AI systems
          into their own products — not for personal, non-professional consumer use. By creating an
          account, you confirm you are acquiring the service for such business or professional purposes.
        </p>

        <h2 style={S.h2}>2. Accounts & API keys</h2>
        <ul style={{paddingLeft:20,marginBottom:12}}>
          <li style={S.li}>You are responsible for keeping your API key secret. Treat it like a password.</li>
          <li style={S.li}>You are responsible for the accuracy of usage data your integration sends us.</li>
          <li style={S.li}>One account may not be shared across unrelated organizations without our written consent.</li>
        </ul>

        <h2 style={S.h2}>3. Plans & billing</h2>
        <ul style={{paddingLeft:20,marginBottom:12}}>
          <li style={S.li}>Paid plans are billed monthly via Stripe and renew automatically until cancelled.</li>
          <li style={S.li}>You can cancel anytime; you keep access until the end of the current billing period.</li>
          <li style={S.li}>Fees are non-refundable except where required by law.</li>
          <li style={S.li}>We may change prices with at least 30 days&apos; notice to active subscribers.</li>
        </ul>

        <h2 style={S.h2}>4. Right of withdrawal (EU consumers)</h2>
        <p style={S.p}>
          ProjectBlock is priced and designed as a business tool for developers and companies building
          AI products; most subscriptions are concluded for professional rather than personal consumer
          purposes. If you are nonetheless acting as a consumer under EU law, you have a 14-day right to
          withdraw from your subscription without giving a reason.
        </p>
        <p style={S.p}>
          By subscribing, you ask us to start the service immediately, and you acknowledge that once you
          have used the service within that period your right of withdrawal is correspondingly limited to
          the unused portion, consistent with Article 9 et seq. of EU Directive 2011/83/EC. You can cancel
          at any time, with immediate effect on future billing, via the{" "}
          <strong style={{color:"#e8e8f0"}}>Manage Billing</strong> button in your{" "}
          <a href="/dashboard" style={S.teal}>dashboard</a>, or by emailing{" "}
          <a href="mailto:robertkiller23@gmail.com" style={S.teal}>robertkiller23@gmail.com</a>.
        </p>

        <h2 style={S.h2}>5. Acceptable use</h2>
        <p style={S.p}>You agree not to:</p>
        <ul style={{paddingLeft:20,marginBottom:12}}>
          <li style={S.li}>Use the service for any unlawful purpose, or to facilitate one</li>
          <li style={S.li}>Attempt to bypass rate limits, budget gates, or authentication</li>
          <li style={S.li}>Resell or sublicense API access without our written consent</li>
          <li style={S.li}>Send us data you are not legally permitted to share (e.g. special-category personal data, without appropriate safeguards)</li>
        </ul>

        <h2 style={S.h2}>6. Your data</h2>
        <p style={S.p}>
          You own the data you send through the API. We process it under the terms of our{" "}
          <a href="/privacy" style={S.teal}>Privacy Policy</a>. You can export or pseudonymize end-user
          records at any time via the API.
        </p>

        <h2 style={S.h2}>7. Compliance reports</h2>
        <p style={S.p}>
          The EU AI Act compliance PDF generated by ProjectBlock is infrastructure-level evidence of your
          recorded AI activity. It does not constitute legal advice and is not a certified regulatory
          filing — you remain responsible for your own legal compliance obligations.
        </p>

        <h2 style={S.h2}>8. Availability</h2>
        <p style={S.p}>
          We aim for high availability but, as an early-stage service, make no uptime guarantee beyond
          best-effort operation. The <code style={{color:"#00e5cc"}}>gate()</code> client in our SDK fails
          open by default specifically so a ProjectBlock outage never breaks your application.
        </p>

        <h2 style={S.h2}>9. Limitation of liability</h2>
        <p style={S.p}>
          The service is provided &quot;as is&quot;. To the maximum extent permitted by law, we are not
          liable for indirect, incidental, or consequential damages arising from your use of the service,
          including decisions made based on metering or audit data it provides.
        </p>

        <h2 style={S.h2}>10. Termination</h2>
        <p style={S.p}>
          You may close your account at any time. We may suspend or terminate accounts that violate these
          terms, with notice where practicable.
        </p>

        <h2 style={S.h2}>11. Governing law</h2>
        <p style={S.p}>
          These terms are governed by Italian law. Any dispute will be subject to the jurisdiction of the
          competent courts in Italy, without prejudice to any mandatory consumer-protection rights you may
          have under EU law.
        </p>

        <h2 style={S.h2}>12. Changes</h2>
        <p style={S.p}>
          We may update these terms as the product evolves. Material changes will be communicated to
          active subscribers by email.
        </p>

        <h2 style={S.h2}>13. Contact</h2>
        <p style={S.p}>
          <a href="mailto:robertkiller23@gmail.com" style={S.teal}>robertkiller23@gmail.com</a>
        </p>
      </div>

      <footer style={{borderTop:"1px solid rgba(255,255,255,0.07)",padding:"32px 24px"}}>
        <div style={{maxWidth:900,margin:"0 auto",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap" as const,gap:16}}>
          <a href="/" style={{fontSize:11,...S.muted,textDecoration:"none"}}>← Back to project-block.com</a>
          <div style={{display:"flex",gap:24}}>
            <a href="/docs" style={{fontSize:11,...S.muted,textDecoration:"none"}}>Docs</a>
            <a href="/status" style={{fontSize:11,...S.muted,textDecoration:"none"}}>Status</a>
            <a href="/privacy" style={{fontSize:11,...S.muted,textDecoration:"none"}}>Privacy</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
