        import { useState } from "react"
import { createRoot } from "react-dom/client"

function App(){
  const [page, setPage] = useState("soko") // soko au uza
  const [lipa, setLipa] = useState(false)
  const [ameLipa, setAmeLipa] = useState(localStorage.getItem("amelipa")==="ndio")
  const [posts, setPosts] = useState([
    {id:1, user:"@neema_shop", jina:"Nguo za kike", bei:"20000", maelezo:"Rangi zote", likes:34, liked:false, picha:"👗", wa:"255700000001"},
    {id:2, user:"@juma_phones", jina:"Infinix Hot 40", bei:"250000", maelezo:"Mpya box", likes:89, liked:false, picha:"📱", wa:"255700000002"},
  ])
  const [newPost, setNewPost] = useState({jina:"", bei:"", maelezo:"", wa:"", preview:null, type:"image"})

  const like = (id) => setPosts(posts.map(p=> p.id===id? {...p, liked:!p.liked, likes: p.liked? p.likes-1 : p.likes+1} : p))

  const fileChange = e => {
    if(!ameLipa){ setLipa(true); return; } // IGOME VIDEO KAMA HAJALIPA
    const f = e.target.files[0]; if(!f) return
    setNewPost({...newPost, preview:URL.createObjectURL(f), type: f.type.startsWith("video")?"video":"image"})
  }

  const waLink = (namba, jina) => {
    let n = namba.replace(/[^0-9]/g,"")
    if(n.startsWith("0")) n = "255"+n.slice(1)
    window.open(`https://wa.me/${n}?text=Habari, nimeona ${jina} Wafla Market`, "_blank")
  }

  const publish = () => {
    if(!ameLipa) return setLipa(true)
    if(!newPost.jina ||!newPost.bei ||!newPost.wa) return alert("Jaza jina, bei na WhatsApp yako!")
    if(!newPost.preview) return alert("Weka picha au video ya bizaa!")
    setPosts([{id:Date.now(), user:"@wewe", jina:newPost.jina, bei:newPost.bei, maelezo:newPost.maelezo, wa:newPost.wa, likes:0, liked:false, preview:newPost.preview, type:newPost.type},...posts])
    setNewPost({jina:"", bei:"", maelezo:"", wa:"", preview:null, type:"image"})
    setPage("soko")
    alert("Hongera! Imewekwa - wateja watakuta WhatsApp")
  }

  return(
    <div style={{maxWidth:430, margin:"auto", background:"black", color:"white", minHeight:"100vh", fontFamily:"sans-serif", paddingBottom:70}}>

      {/* HEADER */}
      <div style={{display:"flex", justifyContent:"space-between", padding:14, borderBottom:"1px solid #222", position:"sticky", top:0, background:"black", zIndex:10}}>
        <h3 style={{margin:0}} onClick={()=>setPage("soko")}>Wafla Market</h3>
        <div style={{display:"flex", gap:8}}>
          <button onClick={()=>setPage("soko")} style={{background:page==="soko"?"white":"#222", color:page==="soko"?"black":"white", border:"none", padding:"6px 12px", borderRadius:20, fontSize:11}}>SOKO BURE</button>
          <button onClick={()=>setPage("uza")} style={{background:page==="uza"?"#ff0050":"#00c853", color:"white", border:"none", padding:"6px 14px", borderRadius:20, fontSize:11, fontWeight:"bold"}}>{ameLipa? "➕ WEKA BIZAA" : "🔒 UZA 10K"}</button>
        </div>
      </div>

      {page==="soko"? (
        // SOKO - BURE KWA WOTE
        <div>
          <div style={{padding:12, background:"#0a0a0a", textAlign:"center"}}>
            <p style={{fontSize:12, color:"#aaa"}}>Karibu Sokoni - Kuangalia ni BURE<br/>Unataka kuuza? Bonyeza button hapo juu</p>
            <button onClick={()=>setPage("uza")} style={{background:"#ff0050", color:"white", border:"none", padding:"10px 20px", borderRadius:25, fontWeight:"bold", marginTop:6}}>JIUNGE KAMA MUUZAJI - 10K/MWEZI</button>
          </div>
          {posts.map(p=>(
            <div key={p.id} style={{borderBottom:"1px solid #1a1a1a"}}>
              <div style={{display:"flex", gap:8, padding:10}}><div style={{width:32, height:32, borderRadius:16, background:"linear-gradient(45deg,#feda75,#d62976)"}}></div><b style={{fontSize:13}}>{p.user}</b></div>
              <div style={{background:"#111", minHeight:350, display:"flex", alignItems:"center", justifyContent:"center"}}>{p.preview? (p.type==="video"? <video src={p.preview} controls style={{width:"100%"}}/> : <img src={p.preview} style={{width:"100%"}}/>) : <div style={{fontSize:80}}>{p.picha}</div>}</div>
              <div style={{padding:10}}>
                <div style={{display:"flex", justifyContent:"space-between"}}><span onClick={()=>like(p.id)} style={{cursor:"pointer", fontSize:22}}>{p.liked? "❤️" : "🤍"} {p.likes}</span><button onClick={()=>waLink(p.wa, p.jina)} style={{background:"#25D366", color:"white", border:"none", padding:"6px 14px", borderRadius:20, fontSize:11, fontWeight:"bold"}}>WhatsApp {p.wa.slice(-9)}</button></div>
                <div style={{fontSize:13, marginTop:6}}><b>{p.jina}</b> - <b style={{color:"#ff3b5c"}}>TZS {p.bei}</b></div><div style={{fontSize:11, color:"#aaa"}}>{p.maelezo}</div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        // PAGE YA KUWEKA - NA MCHAKATO WA KUJIUNGA NA LOKI YA VIDEO
        <div style={{padding:12}}>
          {!ameLipa? (
            <div style={{background:"#151515", padding:18, borderRadius:14, textAlign:"center", border:"1px solid #333"}}>
              <h3 style={{margin:0}}>Mchakato wa Kujiunga</h3>
              <div style={{textAlign:"left", marginTop:15, fontSize:13, lineHeight:"22px"}}>
                <div>1️⃣ Lipa 10,000 TZS</div>
                <div>2️⃣ Jina: <b>LAWI RASHIDI</b></div>
                <div>3️⃣ Namba: <b style={{color:"yellow"}}>0702379441</b> M-Pesa</div>
                <div>4️⃣ Utapata kuweka 60 bizaa/mwezi</div>
                <div>5️⃣ Weka namba yako mteja akubonyeze WhatsApp</div>
              </div>
              <div style={{background:"white", color:"black", padding:12, borderRadius:10, marginTop:12}}>0702379441 - LAWI RASHIDI - 10K</div>
              <button onClick={()=>window.open("https://wa.me/255702379441?text=NIMELIPA 10K WAFLA")} style={{background:"#25D366", color:"white", width:"100%", padding:12, borderRadius:25, border:"none", fontWeight:"bold", marginTop:12}}>TUMA UTHIBITISHO WHATSAPP</button>
              <button onClick={()=>{localStorage.setItem("amelipa","ndio"); setAmeLipa(true)}} style={{background:"#ff0050", color:"white", width:"100%", padding:12, borderRadius:25, border:"none", fontWeight:"bold", marginTop:8}}>✅ NIMELIPA - FUNGUA KUWEKA VIDEO</button>
              <p style={{fontSize:10, color:"#666", marginTop:8}}>Bila kulipa HUTAWEZA kuweka picha/video - itagoma</p>
            </div>
          ) : (
            <div style={{background:"#111", padding:12, borderRadius:14}}>
              <p style={{color:"#00ff7f", textAlign:"center", fontWeight:"bold"}}>✅ Umelipa - Sasa weka bizaa</p>
              <div style={{background:"#000", minHeight:200, borderRadius:12, display:"flex", alignItems:"center", justifyContent:"center", border: newPost.preview?"2px solid #00ff7f":"1px dashed #333"}}>
                {newPost.preview? (newPost.type==="video"? <video src={newPost.preview} controls style={{width:"100%", borderRadius:12}}/> : <img src={newPost.preview} style={{width:"100%", borderRadius:12}}/>) : <span style={{color:"#666"}}>Hakuna video/picha bado</span>}
              </div>
              <label style={{display:"block", background: ameLipa?"#222":"#330000", padding:12, borderRadius:10, textAlign:"center", marginTop:10, cursor:"pointer"}}>
                {ameLipa? "📸🎬 Bonyeza kuweka PICHA/VIDEO" : "🔒 VIDEO IMEGOMA - Lipa kwanza"} <input type="file" accept="image/*,video/*" onChange={fileChange} hidden/>
              </label>
              <input placeholder="Jina la bizaa" value={newPost.jina} onChange={e=>setNewPost({...newPost, jina:e.target.value})} style={{width:"100%", padding:12, marginTop:10, borderRadius:8, background:"black", border:"1px solid #333", color:"white"}}/>
              <input placeholder="Bei" value={newPost.bei} onChange={e=>setNewPost({...newPost, bei:e.target.value})} style={{width:"100%", padding:12, marginTop:8, borderRadius:8, background:"black", border:"1px solid #333", color:"white"}}/>
              <input placeholder="Namba yako ya WhatsApp 07..." value={newPost.wa} onChange={e=>setNewPost({...newPost, wa:e.target.value})} style={{width:"100%", padding:12, marginTop:8, borderRadius:8, background:"black", border:"1px solid #25D366", color:"white"}}/>
              <textarea placeholder="Maelezo" value={newPost.maelezo} onChange={e=>setNewPost({...newPost, maelezo:e.target.value})} style={{width:"100%", padding:12, marginTop:8, borderRadius:8, background:"black", border:"1px solid #333", color:"white"}}/>
              <button onClick={publish} style={{background:"white", color:"black", width:"100%", padding:13, borderRadius:25, border:"none", fontWeight:"bold", marginTop:10}}>WEKA SOKONI SASA</button>
            </div>
          )}
        </div>
      )}

      {lipa && (
        <div style={{position:"fixed", top:0, left:0, right:0, bottom:0, background:"rgba(0,0,0,0.95)", display:"flex", alignItems:"center", justifyContent:"center", padding:20, zIndex:99}}>
          <div style={{background:"#111", padding:20, borderRadius:16, width:"100%", maxWidth:350, textAlign:"center"}}>
            <h2 style={{color:"red"}}>🔒 VIDEO IMEGOMA</h2>
            <p style={{fontSize:12}}>Huwezi kuweka picha/video bila kulipa 10K kwa LAWI RASHIDI</p>
            <div style={{background:"white", color:"black", padding:12, borderRadius:10, marginTop:10}}>0702379441 - LAWI RASHIDI</div>
            <button onClick={()=>{localStorage.setItem("amelipa","ndio"); setAmeLipa(true); setLipa(false); setPage("uza")}} style={{background:"green", color:"white", width:"100%", padding:12, borderRadius:25, border:"none", marginTop:10, fontWeight:"bold"}}>NIMELIPA</button>
            <button onClick={()=>setLipa(false)} style={{background:"none", border:"none", color:"#666", marginTop:8}}>Ghairi</button>
          </div>
        </div>
      )}
    </div>
  )
}
createRoot(document.getElementById("root")).render(<App />)
