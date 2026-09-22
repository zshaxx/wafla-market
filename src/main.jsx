import { useState } from "react"
import { createRoot } from "react-dom/client"

function App(){
  const [lipa, setLipa] = useState(false)
  const [ameLipa, setAmeLipa] = useState(false)

  return (
    <div style={{maxWidth:400, margin:"auto", padding:15, fontFamily:"sans-serif"}}>
      <h2 style={{textAlign:"center"}}>WAFLA MARKET</h2>
      <p style={{textAlign:"center", fontSize:12, color:"#666"}}>Ingia BURE - Sokoni la Mwanza</p>

      {/* SOKO BURE - ANAONA BILA KULIPA */}
      <div style={{border:"1px solid #ddd", padding:10, borderRadius:10, marginBottom:10}}>
        <div style={{fontSize:40, textAlign:"center"}}>👟</div>
        <b>Viatu</b> - TZS 25,000<br/>
        <span style={{fontSize:11}}>Mwanza - @neema</span>
      </div>

      <div style={{border:"1px solid #ddd", padding:10, borderRadius:10, marginBottom:10}}>
        <div style={{fontSize:40, textAlign:"center"}}>👕</div>
        <b>T-shirt</b> - TZS 15,000<br/>
        <span style={{fontSize:11}}>Mwanza - @juma</span>
      </div>

      {/* BUTTON YA KUWEKA - HAPA NDIPO LOKI ILIPO */}
      <button onClick={()=> ameLipa ? alert("Weka bidhaa sasa - umeshalipa!") : setLipa(true)} 
        style={{background:"green", color:"white", width:"100%", padding:14, borderRadius:10, border:"none", fontWeight:"bold", marginTop:15}}>
        ➕ WEKA BIDHAA YAKO
      </button>

      {/* LOKI - INATOKA TU AKIBONYEZA WEKA */}
      {lipa && (
        <div style={{position:"fixed", top:0, left:0, right:0, bottom:0, background:"rgba(0,0,0,0.8)", display:"flex", alignItems:"center", justifyContent:"center", padding:20}}>
          <div style={{background:"white", padding:20, borderRadius:15, width:"100%", maxWidth:350, textAlign:"center"}}>
            <h3>🔒 Lipa Ndio Uweke</h3>
            <p style={{fontSize:13}}>Kuangalia ni BURE, kuweka biashara ndio 10K kwa mwezi (bidhaa 60)</p>
            <div style={{background:"#f0f0f0", padding:10, borderRadius:8, margin:"10px 0"}}>
              M-Pesa: <b>0702379441</b><br/>Jina: WAFLA
            </div>
            <button onClick={()=>{setAmeLipa(true); setLipa(false)}} style={{background:"black", color:"white", width:"100%", padding:12, borderRadius:8}}>✅ NIMELIPA 10K</button>
            <button onClick={()=>setLipa(false)} style={{background:"none", border:"none", marginTop:10, color:"#666"}}>Rudi Sokoni BURE</button>
          </div>
        </div>
      )}

      {ameLipa && (
        <div style={{background:"#e0ffe0", padding:10, borderRadius:8, marginTop:10, textAlign:"center"}}>
          ✅ Umelipa! Sasa unaweza kuweka bidhaa 60 kwa mwezi huu.<br/>
          <input type="file" accept="image/*,video/*" style={{marginTop:10, width:"100%"}}/>
          <input placeholder="Jina la bidhaa" style={{width:"100%", padding:8, marginTop:8}}/>
          <input placeholder="Bei" style={{width:"100%", padding:8, marginTop:8}}/>
          <textarea placeholder="Maelezo ya bidhaa" style={{width:"100%", padding:8, marginTop:8}}></textarea>
          <button style={{background:"green", color:"white", width:"100%", padding:10, marginTop:8, borderRadius:8, border:"none"}}>WEKA SOKONI</button>
        </div>
      )}
    </div>
  )
}

createRoot(document.getElementById("root")).render(<App />)
