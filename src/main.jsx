import { useState, useEffect } from "react"
import { createRoot } from "react-dom/client"

function App(){
  const [page, setPage] = useState("soko")
  const [lipa, setLipa] = useState(false)
  const [ameLipa, setAmeLipa] = useState(localStorage.getItem("wafla_paid")==="yes")
  const [pending, setPending] = useState(localStorage.getItem("wafla_pending")==="yes")
  const [txId, setTxId] = useState(localStorage.getItem("wafla_tx") || "")
  const [posts, setPosts] = useState([
    {id:1, user:"@neema_shop", jina:"Nguo za kike", bei:"20,000", maelezo:"Rangi zote size M-XXL", likes:34, liked:false, picha:"👗", wa:"255700000001"},
    {id:2, user:"@juma_phones", jina:"Infinix Hot 40", bei:"250,000", maelezo:"Mpya box 128GB", likes:89, liked:false, picha:"📱", wa:"255700000002"},
  ])
  const [newPost, setNewPost] = useState({jina:"", bei:"", maelezo:"", wa:"", preview:null, type:"image"})

  const like = (id) => setPosts(posts.map(p=> p.id===id? {...p, liked:!p.liked, likes: p.liked? p.likes-1 : p.likes+1} : p))

  const fileChange = e => {
    if(!ameLipa){ setLipa(true); e.target.value=""; return }
    const f = e.target.files[0]; if(!f) return
    setNewPost({...newPost, preview:URL.createObjectURL(f), type: f.type.startsWith("video")?"video":"image"})
  }

  const waLink = (namba, jina) => {
    let n = namba.replace(/[^0-9]/g,"")
    if(n.startsWith("0")) n = "255"+n.slice(1)
    window.open(`https://wa.me/${n}?text=Habari, nimeona ${jina} kwenye Wafla Market. Bado ipo?`, "_blank")
  }

  const publish = () => {
    if(!ameLipa) return setLipa(true)
    if(!newPost.preview) return alert("Weka picha au video kwanza!")
    if(!newPost.jina ||!newPost.bei ||!newPost.wa) return alert("Jaza jina, bei na WhatsApp yako!")
    setPosts([{id:Date.now(), user:"@wewe", jina:newPost.jina, bei:newPost.bei, maelezo:newPost.maelezo, wa:newPost.wa, likes:0, liked:false, preview:newPost.preview, type:newPost.type},...posts])
    setNewPost({jina:"", bei:"", maelezo:"", wa:"", preview:null, type:"image"})
    setPage("soko")
  }

  const submitTx = () => {
    if(txId.length < 4) return alert("Weka Transaction ID ya M-Pesa, mfano: QK97...")
    localStorage.setItem("wafla_pending","yes")
    localStorage.setItem("wafla_tx", txId)
    setPending(true)
    setLipa(false)
    window.open(`https://wa.me/255702379441?text=Habari Lawi Rashidi, NIMELIPA 10K WAFLA MARKET. TxID: ${txId}. Naomba unifungulie niweke bidhaa na namba yangu`, "_blank")
  }

  const adminUnlock = () => {
    const pass = document.getElementById("adminPass")?.value
    if(pass === "lawi123"){
      localStorage.setItem("wafla_paid","yes")
      localStorage.removeItem("wafla_pending")
      setAmeLipa(true)
      setPending(false)
      alert("✅ Umefunguliwa! Sasa unaweza kuweka video")
    } else alert("Password ya admin si sahihi")
  }

  return(
    <div style={{maxWidth:500, margin:"auto", background:"black", color:"white", minHeight:"100vh", fontFamily:"sans-serif"}}>

      <div style={{display:"flex", justifyContent:"space-between", alignItems:"center", padding:"16px 18px", borderBottom:"1px solid #222", position:"sticky", top:0, background:"black", zIndex:10}}>
        <h2 style={{margin:0, cursor:"pointer"}} onClick={()=>setPage("soko")}>Wafla Market</h2>
        <button onClick={()=> ameLipa? setPage("uza") : setLipa(true)} style={{background: ameLipa? "#00c853" : "#ff0050", color:"white", border:"none", padding:"10px 18px", borderRadius:24, fontWeight:"bold"}}>
          {ameLipa? "➕ Weka Bizaa" : "🔒 Jiunge 10K"}
        </button>
      </div>

      {page==="soko" && (
        <div>
          <div style={{padding:20, background:"#0f0f0f"}}>
            <h3 style={{margin:"0 0 8px 0"}}>Soko la Mwanza</h3>
            <p style={{fontSize:13, color:"#888", margin:0}}>Kuangalia ni BURE. Kuweka bizaa lazima ulipe na uweke namba yako ya WhatsApp.</p>
            <button onClick={()=> ameLipa? setPage("uza") : setLipa(true)} style={{background:"white", color:"black", border:"none", width:"100%", padding:14, borderRadius:28, fontWeight:"bold", marginTop:14, fontSize:14}}>
              {ameLipa? "➕ WEKA BIDHAA YAKO NA VIDEO" : "🔒 JIUNGE KAMA MUUZAJI - 10K / MWEZI"}
            </button>
          </div>

          {posts.map(p=>(
            <div key={p.id} style={{borderBottom:"8px solid #0a0a0a", paddingBottom:12}}>
              <div style={{display:"flex", gap:10, padding:"14px 16px", alignItems:"center"}}>
                <div style={{width:36, height:36, borderRadius:18, background:"linear-gradient(45deg,#feda75,#d62976)"}}></div>
                <div><b style={{fontSize:14}}>{p.user}</b><div style={{fontSize:11, color:"#888"}}>Mwanza</div></div>
                <div style={{marginLeft:"auto", fontSize:11, color:"#888"}}>{p.wa.slice(-12)}</div>
              </div>
              <div style={{background:"#111", minHeight:380, display:"flex", alignItems:"center", justifyContent:"center"}}>
                {p.preview? (p.type==="video"? <video src={p.preview} controls style={{width:"100%"}}/> : <img src={p.preview} style={{width:"100%"}}/>) : <div style={{fontSize:80}}>{p.picha}</div>}
              </div>
              <div style={{padding:"14px 16px"}}>
                <div style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
                  <div style={{display:"flex", gap:18, fontSize:24}}><span onClick={()=>like(p.id)} style={{cursor:"pointer"}}>{p.liked? "❤️" : "🤍"}</span><span>💬</span></div>
                  <button onClick={()=>waLink(p.wa, p.jina)} style={{background:"#25D366", color:"white", border:"none", padding:"9px 18px", borderRadius:22, fontWeight:"bold"}}>WhatsApp Muuzaji</button>
                </div>
                <div style={{fontSize:14, marginTop:10}}><b>{p.likes} likes</b></div>
                <div style={{fontSize:14, marginTop:4}}><b>{p.user}</b> {p.jina} - <span style={{color:"#ff3b5c"}}>TZS {p.bei}</span></div>
                <div style={{fontSize:13, color:"#bbb", marginTop:4}}>{p.maelezo}</div>
                <div style={{fontSize:11, color:"#666", marginTop:6}}>Namba: {p.wa}</div>
              </div>
            </div>
          ))}
        </div>
      )}

      {page==="uza" && (
        <div style={{padding:20}}>
          {pending &&!ameLipa? (
            <div style={{background:"#111", padding:24, borderRadius:18, textAlign:"center", border:"1px solid #333"}}>
              <div style={{fontSize:40}}>⏳</div>
              <h3>Subiri Uthibitisho</h3>
              <p style={{fontSize:13, color:"#aaa"}}>Umetuma TxID: <b style={{color:"white"}}>{txId}</b><br/>Kwa LAWI RASHIDI - 0702379441<br/>Baada ya kuona pesa ata kufungulia.</p>
              <div style={{background:"#000", padding:14, borderRadius:12, marginTop:16, textAlign:"left"}}>
                <p style={{fontSize:12, margin:0}}>Kwa Admin (Lawi):</p>
                <input id="adminPass" placeholder="Password ya admin" type="password" style={{width:"100%", padding:12, marginTop:8, borderRadius:8, background:"#222", border:"1px solid #444", color:"white"}}/>
                <button onClick={adminUnlock} style={{background:"white", color:"black", width:"100%", padding:12, borderRadius:24, border:"none", fontWeight:"bold", marginTop:10}}>FUNGUA MTU HUYU - NIMEMUONA M-PESA</button>
                <p style={{fontSize:10, color:"#666", marginTop:8}}>Password ni lawi123 - usimpe mteja</p>
              </div>
              <button onClick={()=>{localStorage.clear(); setPending(false); setAmeLipa(false); setTxId("")}} style={{background:"none", border:"none", color:"#666", marginTop:14, fontSize:12}}>Ghairi / Tuma TxID nyingine</button>
            </div>
          ) :!ameLipa? (
            <div style={{background:"#151515", padding:24, borderRadius:18, border:"1px solid #222"}}>
              <h2 style={{marginTop:0}}>Jiunge kama Muuzaji</h2>
              <p style={{fontSize:13, color:"#aaa"}}>Mchakato:</p>
              <div style={{fontSize:14, lineHeight:"28px", background:"#000", padding:16, borderRadius:12}}>
                1. Lipa 10,000 TZS M-Pesa<br/>2. Namba: <b style={{color:"#ffeb3b"}}>0702379441</b><br/>3. Jina: <b>LAWI RASHIDI</b><br/>4. Copy Transaction ID<br/>5. Weka hapa chini
              </div>
              <button onClick={()=>setLipa(true)} style={{background:"#ff0050", color:"white", width:"100%", padding:14, borderRadius:28, border:"none", fontWeight:"bold", marginTop:16, fontSize:15}}>NIMESHALIPA - WEKA TX ID</button>
            </div>
          ) : (
            <div style={{background:"#111", padding:20, borderRadius:18, border:"2px solid #00c853"}}>
              <p style={{textAlign:"center", color:"#00ff7f", fontWeight:"bold", marginTop:0}}>✅ Umeruhusiwa - Weka video na namba yako</p>
              <div style={{background:"#000", borderRadius:14, minHeight:260, display:"flex", alignItems:"center", justifyContent:"center", border:"1px dashed #333", overflow:"hidden"}}>
                {newPost.preview? (newPost.type==="video"? <video src={newPost.preview} controls style={{width:"100%"}}/> : <img src={newPost.preview} style={{width:"100%"}}/>) : <span style={{color:"#555", fontSize:13}}>Hakuna picha / video bado</span>}
              </div>
              <label style={{display:"block", background:"#222", padding:14, borderRadius:12, textAlign:"center", marginTop:14, cursor:"pointer", fontWeight:"bold"}}>📸🎬 CHAGUA PICHA / VIDEO YA BIZAA<input type="file" accept="image/*,video/*" onChange={fileChange} hidden/></label>
              <input placeholder="Jina la bizaa - mf: Nguo / iPhone" value={newPost.jina} onChange={e=>setNewPost({...newPost, jina:e.target.value})} style={{width:"100%", padding:14, marginTop:14, borderRadius:10, background:"black", border:"1px solid #333", color:"white", fontSize:14}}/>
              <input placeholder="Bei - mf: 25000" value={newPost.bei} onChange={e=>setNewPost({...newPost, bei:e.target.value})} style={{width:"100%", padding:14, marginTop:10, borderRadius:10, background:"black", border:"1px solid #333", color:"white", fontSize:14}}/>
              <input placeholder="Namba yako ya WhatsApp - 07..." value={newPost.wa} onChange={e=>setNewPost({...newPost, wa:e.target.value})} style={{width:"100%", padding:14, marginTop:10, borderRadius:10, background:"black", border:"2px solid #25D366", color:"white", fontSize:14}}/>
              <textarea placeholder="Maelezo ya bizaa - size, rangi..." value={newPost.maelezo} onChange={e=>setNewPost({...newPost, maelezo:e.target.value})} style={{width:"100%", padding:14, marginTop:10, borderRadius:10, background:"black", border:"1px solid #333", color:"white", fontSize:14, minHeight:80}}/>
              <button onClick={publish} style={{background:"white", color:"black", width:"100%", padding:16, borderRadius:30, border:"none", fontWeight:"bold", marginTop:16, fontSize:15}}>WEKA SOKONI SASA</button>
            </div>
          )}
        </div>
      )}

      {lipa && (
        <div style={{position:"fixed", top:0, left:0, right:0, bottom:0, background:"rgba(0,0,0,0.96)", display:"flex", alignItems:"center", justifyContent:"center", padding:20, zIndex:99}}>
          <div style={{background:"#161616", padding:24, borderRadius:20, width:"100%", maxWidth:380, border:"1px solid #333"}}>
            <h3 style={{marginTop:0, textAlign:"center"}}>🔒 Thibitisha Malipo</h3>
            <p style={{fontSize:12, color:"#aaa", textAlign:"center"}}>Mtu asiyelipa HAWEZI kuweka video. Weka Transaction ID ya M-Pesa baada ya kulipa kwa LAWI RASHIDI</p>
            <div style={{background:"white", color:"black", padding:14, borderRadius:12, marginTop:12, lineHeight:"24px"}}>
              M-Pesa: <b>0702379441</b><br/>Jina: <b>LAWI RASHIDI</b><br/>Kiasi: <b>10,000 TZS</b>
            </div>
            <input placeholder="Weka Transaction ID ya M-Pesa hapa" value={txId} onChange={e=>setTxId(e.target.value)} style={{width:"100%", padding:14, borderRadius:10, marginTop:14, background:"black", border:"1px solid #444", color:"white"}}/>
            <button onClick={submitTx} style={{background:"#25D366", color:"white", width:"100%", padding:14, borderRadius:28, border:"none", fontWeight:"bold", marginTop:10}}>TUMA KWA LAWI RASHIDI WHATSAPP</button>
            <button onClick={()=>setLipa(false)} style={{background:"none", border:"none", width:"100%", color:"#666", marginTop:10}}>Ghairi</button>
            <p style={{fontSize:10, color:"#555", textAlign:"center", marginTop:8}}>Bila TxID sahihi na bila Lawi kukuthibitisha, video haitafunguka</p>
          </div>
        </div>
      )}
    </div>
  )
}

createRoot(document.getElementById("root")).render(<App />)
