import { useState } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"

function App(){
  const [page,setPage]=useState("soko")
  const [bidhaa,setBidhaa]=useState([{jina:"Viatu",bei:"25000"}])

  if(page==="lipa"){
    return(
      <div style={{padding:20, maxWidth:400, margin:"auto", textAlign:"center"}}>
        <h2>Lipa 10K / Mwezi - Weka 60</h2>
        <p>M-Pesa: 0702379441 - WAFLA</p>
        <p style={{fontSize:12}}>Ukiingia ni BURE, kuweka ndio 10K</p>
        <button onClick={()=>setPage("weka")} style={{background:"black", color:"white", width:"100%", padding:12, borderRadius:8}}>NIMELIPA</button>
        <button onClick={()=>setPage("soko")} style={{marginTop:10}}>Rudi Sokoni BURE</button>
      </div>
    )
  }

  if(page==="weka"){
    return(
      <div style={{padding:20, maxWidth:400, margin:"auto"}}>
        <button onClick={()=>setPage("soko")}>Rudi</button>
        <h3>Weka Bidhaa - Video/Picha</h3>
        <input type="file" accept="image/*,video/*" style={{width:"100%", margin:"10px 0"}}/>
        <input placeholder="Jina la bidhaa" style={{width:"100%", padding:10, marginBottom:8}}/>
        <input placeholder="Bei" style={{width:"100%", padding:10, marginBottom:8}}/>
        <textarea placeholder="Maelezo ya bidhaa" style={{width:"100%", padding:10, marginBottom:8}}></textarea>
        <button onClick={()=>setPage("soko")} style={{background:"green", color:"white", width:"100%", padding:12}}>WEKA SOKONI</button>
        <p style={{fontSize:11}}>Bado: 60 bidhaa kwa mwezi</p>
      </div>
    )
  }

  return(
    <div style={{padding:20, maxWidth:400, margin:"auto"}}>
      <h2 style={{textAlign:"center"}}>WAFLA MARKET</h2>
      <p style={{textAlign:"center", fontSize:12}}>Kuingia BURE - Kuweka 10K/60 kwa mwezi</p>
      <button onClick={()=>setPage("lipa")} style={{background:"green", color:"white", width:"100%", padding:12, borderRadius:8, fontWeight:"bold"}}>➕ WEKA BIASHARA YAKO</button>
      <div style={{marginTop:15}}>
        {bidhaa.map((b,i)=><div key={i} style={{border:"1px solid #ddd", padding:10, borderRadius:8, marginBottom:8}}>{b.jina} - {b.bei}</div>)}
      </div>
    </div>
  )
}

createRoot(document.getElementById("root")).render(<App />)
