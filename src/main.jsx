import { useState } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"

function App(){
  const [ok,setOk]=useState(false)
  return(
    <div style={{padding:20, maxWidth:400, margin:"auto"}}>
      <h2>WAFLA MARKET - 10K</h2>
      {!ok ? (
        <div style={{border:"2px solid red", padding:15, background:"#ffe0e0", borderRadius:12}}>
          <h3>🔒 IMEFUNGWA</h3>
          <p>Lipa 0702379441 kwanza</p>
          <button onClick={()=>window.open("https://wa.me/255702379441")} style={{background:"black", color:"white", width:"100%", padding:12}}>NIMELIPA</button>
          <button onClick={()=>setOk(true)} style={{marginTop:10, width:"100%", padding:8}}>TEST FUNGUA</button>
        </div>
      ) : (
        <div style={{border:"2px solid green", padding:15, borderRadius:12}}>
          <p>✅ IMEFUNGULIWA - Weka bidhaa sasa</p>
          <input type="file" style={{width:"100%"}}/>
          <input placeholder="Jina la bidhaa" style={{width:"100%", padding:10, marginTop:10}}/>
          <button style={{background:"green", color:"white", width:"100%", padding:12, marginTop:10}}>WEKA SOKONI</button>
        </div>
      )}
    </div>
  )
}

createRoot(document.getElementById("root")).render(<App />)
