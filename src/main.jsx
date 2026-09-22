        import { useState } from "react"
import { createRoot } from "react-dom/client"

function App(){
  const [page, setPage] = useState("soko")
  const [lipa, setLipa] = useState(false)
  const [ameLipa, setAmeLipa] = useState(false) // IMEFUNGWA - hakuna localStorage ya kujifungulia
  const [posts, setPosts] = useState([
    {id:1, user:"@neema_shop", jina:"Nguo za kike", bei:"20000", maelezo:"Rangi zote", likes:34, liked:false, picha:"👗", wa:"255700000001"},
    {id:2, user:"@juma_phones", jina:"Infinix Hot 40", bei:"250000", maelezo:"Mpya box", likes:89, liked:false, picha:"📱", wa:"255700000002"},
  ])
  const [newPost, setNewPost] = useState({jina:"", bei:"", maelezo:"", wa:"", preview:null, type:"image"})

  const like = (id) => setPosts(posts.map(p=> p.id===id? {...p, liked:!p.liked, likes: p.liked? p.likes-1 : p.likes+1} : p))

  // LOKI YA VIDEO - IGOMA KABISA KAMA HAJALIPA
  const fileChange = e => {
    if(!ameLipa){
      setLipa(true)
      e.target.value = "" // futa file
      return
    }
    const f = e.target.files[0]; if(!f) return
    setNewPost({...newPost, preview:URL.createObjectURL(f), type: f.type.startsWith("video")?"video":"image"})
  }

  const waLink = (namba, jina) => {
    let n = namba.replace(/[^0-9]/g,"")
    if(n.startsWith("0")) n = "255"+n.slice(1)
    window.open(`https://wa.me/${n}?text=Habari, nimeona ${jina} Wafla Market`, "_blank")
  }

  const publish = () => {
    if(!ameLipa){ setLipa(true); return } // HAWEZI KUCHAPISHIA BILA KULIPA
    if(!newPost.preview) return alert("🔒 Weka picha/video kwanza - bila video haiwezi!")
    if(!newPost.jina ||!newPost.bei ||!newPost.wa) return alert("Jaza jina, bei na WhatsApp yako!")
    setPosts([{id:Date.now(), user:"@wewe", jina:newPost.jina, bei:newPost.bei, maelezo:newPost.maelezo, wa:newPost.wa, likes:0, liked:false, preview:newPost.preview, type:newPost.type},...posts])
    setNewPost({jina:"", bei:"", maelezo:"", wa:"", preview:null, type:"image"})
    setPage("soko")
    alert("Imewekwa sokoni!")
  }

  return(
    <div style={{maxWidth:430, margin:"auto", background:"black", color:"white", minHeight:"100vh", fontFamily:"sans-serif", paddingBottom:70}}>
      <div style={{display:"flex", justifyContent:"space-between", padding:14, borderBottom:"1px solid #222", position:"sticky", top:0, background:"black", zIndex:10}}>
        <h3 style={{margin:0, cursor:"pointer"}} onClick={()=>setPage("soko")}>Wafla Market</h3>
        <button onClick={()=> ameLipa? setPage("uza") : setLipa(true)} style={{background: ameLipa? "#00c853" : "#ff0050", color:"white", border:"none", padding:"8px 14px", borderRadius:20, fontSize:11, fontWeight:"bold"}}>
          {ameLipa? "➕ WEKA BIZAA" : "🔒 JIUNGE - 10K"}
        </button>
      </div>

      {page==="soko"? (
        <div>
          <div style={{padding:12, textAlign:"center", background:"#0a0a0a"}}>
            <button onClick={()=> ameLipa? setPage("uza") : setLipa(true)} style={{background:"#ff0050", color:"white", border:"none", padding:"12px 20px", borderRadius:25, fontWeight:"bold", width:"100%"}}>
              {ameLipa? "➕ WEKA BIDHAA YAKO SASA" : "🔒 JIUNGE UWEZE KUWEKA VIDEO - 10K"}
            </button>
            <p style={{fontSize:10, color:"#666", marginTop:6}}>Bila kulipa HUTAWEZA kuweka video - itagoma</p>
          </div>
          {posts.map(p=>(
            <div key={p.id} style={{borderBottom:"1px solid #1a1a1a"}}>
              <div style={{display:"flex", gap:8, padding:10}}><div style={{width:32, height:32, borderRadius:16, background:"linear-gradient(45deg,#feda75,#d62976)"}}></div><b style={{fontSize:13}}>{p.user}</b></div>
              <div style={{background:"#111", minHeight:300, display:"flex", alignItems:"center", justifyContent:"center"}}>{p.preview? (p.type==="video"? <video src={p.preview} controls style={{width:"100%"}}/> : <img src={p.preview} style={{width:"100%"}}/>) : <div style={{fontSize:70}}>{p.picha}</div>}</div>
              <div style={{padding:10}}><div style={{display:"flex", justifyContent:"space-between"}}><span onClick={()=>like(p.id)} style={{fontSize:20}}>{p.liked? "❤️" : "🤍"} {p.likes}</span><button onClick={()=>waLink(p.wa, p.jina)} style={{background:"#25D366", color:"white", border:"none", padding:"6px 14px", borderRadius:20, fontSize:11, fontWeight:"bold"}}>WhatsApp</button></div><div style={{fontSize:13}}><b>{p.jina}</b> - TZS {p.bei}</div></div>
            </div>
          ))}
        </div>
      ) : (
        <div style={{padding:12}}>
          <div style={{background:"#111", padding:12, borderRadius:14, border: ameLipa?"2px solid #00c853":"2px solid red"}}>
            <p style={{textAlign:"center", fontWeight:"bold", color: ameLipa?"#00ff7f":"red"}}>{ameLipa? "✅ Umeruhusiwa kuweka VIDEO" : "🔒 HUJA LIPA - VIDEO IMEGOMA"}</p>

            <div style={{background:"#000", minHeight:220, borderRadius:12, display:"flex", alignItems:"center", justifyContent:"center", border:"1px dashed #333"}}>
              {ameLipa && newPost.preview? (newPost.type==="video"? <video src={newPost.preview} controls style={{width:"100%", borderRadius:12}}/> : <img src={newPost.preview} style={{width:"100%", borderRadius:12}}/>) : <div style={{textAlign:"center", color:"#666"}}><div style={{fontSize:40}}>🔒</div><div style={{fontSize:12}}>{ameLipa? "Hakuna video bado" : "VIDEO IMEGOMA\nLipa ndio uone hapa"}</div></div>}
            </div>

            {/* BUTTON YA VIDEO - IMEFUNGWA KAMA HAJALIPA */}
            <label style={{display:"block", background: ameLipa?"#222":"#330000", padding:14, borderRadius:10, textAlign:"center", marginTop:10, cursor: ameLipa?"pointer":"not-allowed", opacity: ameLipa?1:0.5, border: ameLipa?"none":"1px solid red"}}>
              {ameLipa? "📸🎬 CHAGUA PICHA / VIDEO" : "🔒 CHAGUA VIDEO (IMEGOMA - LIPA KWANZA)"}
              <input type="file" accept="image/*,video/*" onChange={fileChange} hidden disabled={!ameLipa}/>
            </label>

            <input placeholder="Jina la bizaa" value={newPost.jina} onChange={e=> ameLipa && setNewPost({...newPost, jina:e.target.value})} disabled={!ameLipa} style={{width:"100%", padding:12, marginTop:10, borderRadius:8, background:"black", border:"1px solid #333", color:"white", opacity:ameLipa?1:0.3}}/>
            <input placeholder="Bei" value={newPost.bei} onChange={e=> ameLipa && setNewPost({...newPost, bei:e.target.value})} disabled={!ameLipa} style={{width:"100%", padding:12, marginTop:8, borderRadius:8, background:"black", border:"1px solid #333", color:"white", opacity:ameLipa?1:0.3}}/>
            <input placeholder="Namba yako ya WhatsApp 07..." value={newPost.wa} onChange={e=> ameLipa && setNewPost({...newPost, wa:e.target.value})} disabled={!ameLipa} style={{width:"100%", padding:12, marginTop:8, borderRadius:8, background:"black", border:"1px solid #25D366", color:"white", opacity:ameLipa?1:0.3}}/>

            <button onClick={publish} disabled={!ameLipa} style={{background: ameLipa?"white":"#333", color: ameLipa?"black":"#666", width:"100%", padding:14, borderRadius:25, border:"none", fontWeight:"bold", marginTop:12, cursor: ameLipa?"pointer":"not-allowed"}}>
              {ameLipa? "WEKA SOKONI SASA" : "🔒 HAUWEZI KUWEKA - LIPA KWANZA"}
            </button>

            {!ameLipa && <button onClick={()=>setLipa(true)} style={{background:"#ff0050", color:"white", width:"100%", padding:12, borderRadius:25, border:"none", fontWeight:"bold", marginTop:8}}>LIPA 10K KWA LAWI RASHIDI - 0702379441</button>}
          </div>
        </div>
      )}

      {lipa && (
        <div style={{position:"fixed", top:0, left:0, right:0, bottom:0, background:"rgba(0,0,0,0.96)", display:"flex", alignItems:"center", justifyContent:"center", padding:20, zIndex:99}}>
          <div style={{background:"#111", padding:22, borderRadius:18, width:"100%", maxWidth:350, textAlign:"center", border:"2px solid red"}}>
            <h2 style={{color:"red", margin:0}}>🚫 VIDEO IMEGOMA</h2>
            <p style={{fontSize:13, marginTop:10}}>Huwezi kuweka picha au video bila kulipa!<br/>Kuangalia ni bure, kuweka lazima ulipe</p>
            <div style={{background:"white", color:"black", padding:14, borderRadius:12, marginTop:14, textAlign:"left", lineHeight:"22px"}}>
              M-Pesa: <b>0702379441</b><br/>Jina: <b>LAWI RASHIDI</b><br/>10K = 60 bizaa<br/>+ unaweka namba yako ya WhatsApp
            </div>
            <button onClick={()=>{setAmeLipa(true); setLipa(false); setPage("uza")}} style={{background:"#00c853", color:"white", width:"100%", padding:13, borderRadius:25, border:"none", fontWeight:"bold", marginTop:12}}>✅ NIMELIPA KWA LAWI RASHIDI</button>
            <button onClick={()=>setLipa(false)} style={{background:"none", border:"none", color:"#888", marginTop:10}}>Rudi</button>
          </div>
        </div>
      )}
    </div>
  )
}
createRoot(document.getElementById("root")).render(<App />)
