export default function EmbedDemo() {
  return (
    <main style={{minHeight:"100vh",background:"#060608",color:"#e8e8f0",fontFamily:"monospace",padding:"60px 24px"}}>
      <div style={{maxWidth:600,margin:"0 auto"}}>
        <div style={{fontSize:11,letterSpacing:"0.15em",color:"#00e5cc",marginBottom:16}}>↳ LIVE WIDGET DEMO</div>
        <h1 style={{fontSize:28,fontWeight:800,marginBottom:24}}>Embeddable Usage Widget</h1>
        <p style={{fontSize:13,color:"rgba(232,232,240,0.6)",marginBottom:32,lineHeight:1.7}}>
          This is a real, live widget pulling data from the ProjectBlock API — embeddable in your own app with one script tag.
        </p>

        <div id="pb-usage" style={{marginBottom:40}}></div>

        <div style={{background:"#0d0d12",border:"1px solid rgba(255,255,255,0.07)",padding:"20px",fontSize:12}}>
          <pre style={{margin:0,overflowX:"auto"}}>{`<div id="pb-usage"></div>
<script src="https://project-block.com/widget.js"
        data-key="pb_pub_your_publishable_key"
        data-user="usr_123"></script>`}</pre>
        </div>

        <script
          src="/widget.js"
          data-key="pb_pub_4bf1952584af45d9a8666bcf57af9c55"
          data-user="usr_test"
          data-target="pb-usage"
        ></script>
      </div>
    </main>
  );
}
