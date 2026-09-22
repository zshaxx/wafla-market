import { useState } from "react"
import { createRoot } from "react-dom/client"

function App(){
  const [lipa, setLipa] = useState(false)
  const [ameLipa, setAmeLipa] = useState(localStorage.getItem("amelipa") === "ndio")

  const thibitisha = () => {
    localStorage.setItem("amelipa", "ndio")
    setAmeLipa(true)
    setLipa(false)
  }

  return (
    <div style={{maxWidth:420, margin:"auto", padding:15, fontFamily:"sans-serif", background:"#f9f9f9", minHeight:"100vh"}}>
      <h2 style={{textAlign:"center", margin:0}}>WAFLA MARKET</h2>
      <p style={{textAlign:"center", fontSize:11, color:"#666"}}>Soko la Mwanza - Kuingia BURE</p>

      {/* BIDHAA BURE - WATU WANAONA */}
      <div style={{background:"white", padding:10, borderRadius:10, marginTop:15, display:"flex", gap:10}}>
        <div style={{fontSize:40}}>👗</div>
        <div><b>Nguo za kike</b><br/>TZS 20,000<br/><span style={{fontSize:11}}>Aina zote</span></div>
      </div>
      <div style={{background:"white", padding:10, borderRadius:10, marginTop:10, display:"flex", gap:10}}>
        <div style={{fontSize:40}}>📱</div>
        <div><b>Simu Infinix</b><br/>TZS 250,000<br/><span style={{fontSize:11}}>Mpya box</span></div>
      </div>

      {/* BUTTON */}
      {!ameLipa ? (
        <button onClick={()=>setLipa(true)} style={{background:"black", color:"white", width:"100%", padding:14, borderRadius:25, border:"none", fontWeight:"bold", marginTop:20}}>
          ➕ WEKA BIASHARA YAKO - 10K/Mwezi
        </button>
      ) : (
        <div style={{background:"white", padding:15, borderRadius:15, marginTop:20, border:"2px solid green"}}>
          <b style={{color:"green"}}>✅ Umelipa - LAWI RASHIDI</b>
          <p style={{fontSize:12}}>Sasa weka nguo, simu, bizaa yoyote (60 kwa mwezi)</p>
          <input type="file" accept="image/*,video/*" style={{width:"100%", marginTop:10}}/>
          <input placeholder="Jina la bizaa - mf: Nguo / Simu" style={{width:"100%", padding:10, marginTop:8, borderRadius:8, border:"1px solid #ccc"}}/>
          <input placeholder="Bei" style={{width:"100%", padding:10, marginTop:8, borderRadius:8, border:"1px solid #ccc"}}/>
          <textarea placeholder="Maelezo - size, rangi, namba yako" style={{width:"100%", padding:10, marginTop:8, borderRadius:8, border:"1px solid #ccc"}}></textarea>
          <button style={{background:"green", color:"white", width:"100%", padding:12, marginTop:10, borderRadius:8, border:"none", fontWeight:"bold"}}>WEKA SOKONI SASA</button>
          <p style={{fontSize:10, textAlign:"center", marginTop:8}}>60 bizaa / mwezi - 10K</p>
        </div>
      )}

      {/* POPUP YA MALIPO - INATOKA TU AKITAKA KUWEKA */}
      {lipa && (
        <div style={{position:"fixed", top:0, left:0, right:0, bottom:0, background:"rgba(0,0,0,0.85)", display:"flex", alignItems:"center", justifyContent:"center", padding:20, zIndex:100}}>
          <div style={{background:"white", padding:20, borderRadius:16, width:"100%", maxWidth:360, textAlign:"center"}}>
            <h3 style={{margin:0}}>🔒 Lipa Kwanza</h3>
            <p style={{fontSize:13, color:"#666"}}>Kuingia sokoni ni BURE<br/>Kuweka bizaa yoyote ni 10K tu</p>
            
            <div style={{background:"#000", color:"white", padding:15, borderRadius:10, marginTop:15, lineHeight:"22px"}}>
              Lipa M-Pesa<br/>
              Namba: <b style={{color:"#ffcc00"}}>0702379441</b><br/>
              Jina: <b>LAWI RASHIDI</b><br/>
              Kiasi: <b>10,000 TZS</b>
            </div>

            <p style={{fontSize:11, marginTop:10, color:"#444"}}>Baada ya kulipa utaweza kuweka:<br/>✅ Nguo, Simu, Viatu, Mafuta, Bizaa YOYOTE (60 kwa mwezi)</p>

            <button onClick={()=>window.open("https://wa.me/255702379441?text=NIMELIPA 10K JINA LAWI RASHIDI, NAOMBA NIFUNGULIWE WAFLA MARKET")} style={{background:"#25D366", color:"white", width:"100%", padding:12, borderRadius:10, border:"none", fontWeight:"bold", marginTop:10}}>
              📱 Tuma Uthibitisho WhatsApp
            </button>

            <button onClick={thibitisha} style={{background:"black", color:"white", width:"100%", padding:12, borderRadius:10, border:"none", marginTop:10}}>
              ✅ NIMESHALIPA - Fungua
            </button>

            <button onClick={()=>setLipa(false)} style={{background:"none", border:"none", marginTop:10, fontSize:12, color:"#888"}}>Rudi Sokoni (Bure)</button>
          </div>
        </div>
      )}
    </div>
  )
}

createRoot(document.getElementById("root")).render(<App />)
