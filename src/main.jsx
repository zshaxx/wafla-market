import { useState } from "react"
import { createRoot } from "react-dom/client"

function App(){
  const [lipa, setLipa] = useState(false)
  const [ameLipa, setAmeLipa] = useState(localStorage.getItem("amelipa")==="ndio")
  const [posts, setPosts] = useState([
    {id:1, user:"@neema_shop", jina:"Nguo za kike", bei:"20000", maelezo:"Rangi zote size M-XXL, Mwanza", likes:34, liked:false, picha:"👗", wa:"255700000001"},
    {id:2, user:"@juma_phones", jina:"Infinix Hot 40", bei:"250000", maelezo:"Mpya box, 128GB", likes:89, liked:false, picha:"📱", wa:"255700000002"},
  ])
  const [newPost, setNewPost] = useState({jina:"", bei:"", maelezo:"", wa:"", preview:null, type:"image", file:null})

  const like = (id) => setPosts(posts.map(p=> p.id===id? {...p, liked:!p.liked, likes: p.liked? p.likes-1 : p.likes+1} : p))

  const fileChange = e => {
    const f = e.target.files[0]; if(!f) return
    setNewPost({...newPost, preview:URL.createObjectURL(f), type: f.type.startsWith("video")?"video":"image", file:f})
  }

  const waLink = (namba, jina) => {
    let n = namba.replace(/[^0-9]/g,"")
    if(n.startsWith("0")) n = "255"+n.slice(1)
    if(!n.startsWith("255")) n = "255"+n
    window.open(`https://wa.me/${n}?text=Habari, nimeona ${jina} kwenye Wafla Market. Bado ipo?`, "_blank")
  }

  const publish = () => {
    if(!ameLipa) return setLipa(true)
    if(!newPost.jina ||!newPost.bei ||!newPost.wa) return alert("Jaza Jina, Bei, na Namba yako ya WhatsApp!")
    setPosts([{id:Date.now(), user:"@wewe", jina:newPost.jina, bei:newPost.bei, maelezo:newPost.maelezo, wa:newPost.wa, likes:0, liked:false, preview:newPost.preview, type:newPost.type},...posts])
    setNewPost({jina:"", bei:"", maelezo:"", wa:"", preview:null, type:"image", file:null})
    alert("Hongera! Bidhaa yako imewekwa Sokoni - Watu wata-like na kukutafuta WhatsApp")
  }

  return(
    <div style={{maxWidth:430, margin:"auto", background:"black", color:"white", minHeight:"100vh", fontFamily:"sans-serif"}}>

      <div style={{display:"flex", justifyContent:"space-between", padding:14, borderBottom:"1px solid #222", position:"sticky", top:0, background:"black", zIndex:10}}>
        <h3 style={{margin:0, fontFamily:"cursive"}}>Wafla Market</h3>
        <button onClick={()=> ameLipa? alert("Umeshalipa! Weka bidhaa 60 kwa mwezi") : setLipa(true)} style={{background: ameLipa? "#00c853" : "#ff0050", color:"white", border:"none", padding:"6px 14px", borderRadius:20, fontSize:11, fontWeight:"bold"}}>
          {ameLipa? "✅ UMELIPA" : "🔒 WEKA 10K"}
        </button>
      </div>

      <div style={{padding:12, borderBottom:"8px solid #0a0a0a"}}>
        {!ameLipa? (
          <div onClick={()=>setLipa(true)} style={{background:"#151515", border:"1px dashed #333", padding:18, borderRadius:14, textAlign:"center"}}>
            <div style={{fontSize:32}}>🔒</div>
            <p style={{fontSize:13, fontWeight:"bold"}}>Unataka kuweka biashara yako?</p>
            <p style={{fontSize:11, color:"#888"}}>Lipa 10K kwa <b style={{color:"white"}}>LAWI RASHIDI</b> ndio uweke<br/>Nguo, Simu, Video, Picha - 60 kwa mwezi<br/>Utaweka namba yako mteja akubonyeze WhatsApp moja kwa moja</p>
            <div style={{background:"#ff0050", padding:10, borderRadius:20, fontSize:13, fontWeight:"bold", marginTop:10}}>LIPA SASA 0702379441</div>
          </div>
        ) : (
          <div style={{background:"#111", padding:12, borderRadius:14}}>
            <p style={{fontSize:12, color:"#00ff7f", textAlign:"center", fontWeight:"bold"}}>✅ Umelipa - Weka bizaa yako na namba yako ya WhatsApp</p>
            {newPost.preview && (newPost.type==="video"? <video src={newPost.preview} controls style={{width:"100%", borderRadius:12, maxHeight:350}}/> : <img src={newPost.preview} style={{width:"100%", borderRadius:12}}/>)}
            <label style={{display:"block", background:"#222", padding:12, borderRadius:10, textAlign:"center", marginTop:10, cursor:"pointer", fontSize:13}}>
              📸🎬 Chagua Picha / Video ya Bizaa <input type="file" accept="image/*,video/*" onChange={fileChange} hidden/>
            </label>
            <input placeholder="Jina la bizaa - mf: Nguo za watoto / iPhone" value={newPost.jina} onChange={e=>setNewPost({...newPost, jina:e.target.value})} style={{width:"100%", padding:12, marginTop:10, borderRadius:8, background:"black", border:"1px solid #333", color:"white"}}/>
            <div style={{display:"flex", gap:"4%"}}>
              <input placeholder="Bei - 25000" value={newPost.bei} onChange={e=>setNewPost({...newPost, bei:e.target.value})} style={{width:"48%", padding:12, marginTop:8, borderRadius:8, background:"black", border:"1px solid #333", color:"white"}}/>
              <input placeholder="Namba yako ya WhatsApp - 07..." value={newPost.wa} onChange={e=>setNewPost({...newPost, wa:e.target.value})} style={{width:"48%", padding:12, marginTop:8, borderRadius:8, background:"black", border:"1px solid #25D366", color:"white"}}/>
            </div>
            <textarea placeholder="Maelezo - size, rangi, location yako..." value={newPost.maelezo} onChange={e=>setNewPost({...newPost, maelezo:e.target.value})} style={{width:"100%", padding:12, marginTop:8, borderRadius:8, background:"black", border:"1px solid #333", color:"white"}}/>
            <button onClick={publish} style={{background:"white", color:"black", width:"100%", padding:13, borderRadius:25, border:"none", fontWeight:"bold", marginTop:10}}>WEKA SOKONI - Watu Walike & WhatsApp</button>
            <p style={{fontSize:9, textAlign:"center", color:"#666", marginTop:5}}>Mteja akibonyeza WhatsApp ataenda namba yako uliyoweka</p>
          </div>
        )}
      </div>

      {posts.map(p=>(
        <div key={p.id} style={{borderBottom:"1px solid #1a1a1a", paddingBottom:10}}>
          <div style={{display:"flex", gap:8, padding:10, alignItems:"center"}}>
            <div style={{width:32, height:32, borderRadius:16, background:"linear-gradient(45deg,#feda75,#fa7e1e,#d62976,#962fbf,#4f5bd5)"}}></div>
            <div><b style={{fontSize:13}}>{p.user}</b><div style={{fontSize:10, color:"#888"}}>Mwanza • anauza</div></div>
            <div style={{marginLeft:"auto", fontSize:10, color:"#888"}}>{p.wa}</div>
          </div>
          <div style={{background:"#0a0a0a", minHeight:350, display:"flex", alignItems:"center", justifyContent:"center"}}>
            {p.preview? (p.type==="video"? <video src={p.preview} controls style={{width:"100%"}}/> : <img src={p.preview} style={{width:"100%"}}/>) : <div style={{fontSize:80}}>{p.picha}</div>}
          </div>
          <div style={{padding:"10px 12px"}}>
            <div style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
              <div style={{display:"flex", gap:16, fontSize:22}}>
                <span onClick={()=>like(p.id)} style={{cursor:"pointer"}}>{p.liked? "❤️" : "🤍"}</span>
                <span onClick={()=>waLink(p.wa, p.jina)} style={{cursor:"pointer"}}>💬</span>
              </div>
              <button onClick={()=>waLink(p.wa, p.jina)} style={{background:"#25D366", color:"white", border:"none", padding:"7px 16px", borderRadius:20, fontSize:12, fontWeight:"bold"}}>WhatsApp Muuzaji</button>
            </div>
            <div style={{fontSize:13, marginTop:8}}><b>{p.likes} likes</b></div>
            <div style={{fontSize:13}}><b>{p.user}</b> {p.jina} - <b style={{color:"#ff3b5c"}}>TZS {p.bei}</b></div>
            <div style={{fontSize:12, color:"#bbb"}}>{p.maelezo}</div>
            <div style={{fontSize:10, color:"#666", marginTop:4}}>Namba: {p.wa} • Bonyeza WhatsApp kumuuliza</div>
          </div>
        </div>
      ))}

      {lipa && (
        <div style={{position:"fixed", top:0, left:0, right:0, bottom:0, background:"rgba(0,0,0,0.92)", display:"flex", alignItems:"center", justifyContent:"center", padding:20, zIndex:99}}>
          <div style={{background:"#111", padding:22, borderRadius:18, width:"100%", maxWidth:360, textAlign:"center", border:"1px solid #333"}}>
            <h3 style={{margin:0}}>🔒 Lazima Ulipe Ndio Uweke</h3>
            <p style={{fontSize:11, color:"#888", marginTop:8}}>Kama hujalipa HUWEZI kuweka. Kuingia ni BURE tu.<br/>Ukilipa unaweka namba yako wateja wakutafute WhatsApp</p>
            <div style={{background:"white", color:"black", padding:14, borderRadius:12, marginTop:14, lineHeight:"22px", textAlign:"left"}}>
              Lipa M-Pesa:<br/>Namba: <b>0702379441</b><br/>Jina: <b>LAWI RASHIDI</b><br/>Kiasi: <b>10,000 TZS / Mwezi</b><br/><span style={{fontSize:11}}>60 bizaa - Nguo, Simu, chochote</span>
            </div>
            <button onClick={()=>window.open("https://wa.me/255702379441?text=Habari Lawi, NIMELIPA 10K WAFLA MARKET, naomba nifunguliwe niweke namba yangu")} style={{background:"#25D366", color:"white", width:"100%", padding:12, borderRadius:25, border:"none", fontWeight:"bold", marginTop:12}}>📱 Tuma Uthibitisho WhatsApp</button>
            <button onClick={()=>{localStorage.setItem("amelipa","ndio"); setAmeLipa(true); setLipa(false)}} style={{background:"white", color:"black", width:"100%", padding:12, borderRadius:25, border:"none", fontWeight:"bold", marginTop:8}}>✅ NIMESHALIPA</button>
            <button onClick={()=>setLipa(false)} style={{background:"none", border:"none", color:"#666", marginTop:10, fontSize:11}}>Rudi Sokoni BURE</button>
          </div>
        </div>
      )}
    </div>
  )
}
createRoot(document.getElementById("root")).render(<App />)
