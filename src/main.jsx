    import { useState, useEffect } from "react"
import { createRoot } from "react-dom/client"

function App(){
  const [page,setPage]=useState("soko")
  const [lipa,setLipa]=useState(false)
  const [ameLipa,setAmeLipa]=useState(localStorage.getItem("wafla_paid")==="yes")
  const [pending,setPending]=useState(localStorage.getItem("wafla_pending")==="yes")
  const [txId,setTxId]=useState(localStorage.getItem("wafla_tx")||"")
  const [story,setStory]=useState(null)

  const [posts,setPosts]=useState(()=>{
    const saved = localStorage.getItem("wafla_posts")
    if(saved) return JSON.parse(saved)
    return [
      {id:1,user:"neema_classic",jina:"Gauni la harusi",bei:"45,000",maelezo:"Size M-XXL, delivery Mwanza",likes:12,liked:false, picha:"https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500", wa:"255712345678", time:"2h"},
      {id:2,user:"juma_phones",jina:"Infinix Hot 40 128GB",bei:"250,000",maelezo:"Mpya box, warranty",likes:34,liked:false, picha:"https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500", wa:"255713456789", time:"5h"},
    ]
  })

  useEffect(()=>{ localStorage.setItem("wafla_posts", JSON.stringify(posts)) }, [posts])

  const [newPost,setNewPost]=useState({jina:"",bei:"",maelezo:"",wa:"",preview:null,type:"image",file:null})

  const like=(id)=>setPosts(posts.map(p=>p.id===id?{...p,liked:!p.liked,likes:p.liked?p.likes-1:p.likes+1}:p))

  const fileChange=e=>{
    if(!ameLipa){setLipa(true);e.target.value="";return}
    const f=e.target.files[0]; if(!f) return
    if(f.size > 15*1024*1024) return alert("Video kubwa sana, weka chini ya 15MB")
    const url = URL.createObjectURL(f)
    setNewPost({...newPost,preview:url,type:f.type.startsWith("video")?"video":"image",file:f})
  }

  const waLink=(n,j)=>{
    let num=n.replace(/\D/g,""); if(num.startsWith("0")) num="255"+num.slice(1)
    if(!num.startsWith("255")) num="255"+num
    window.open(`https://wa.me/${num}?text=Habari, nimeona ${j} kwenye Wafla Market. Bado ipo?`, "_blank")
  }

  const publish=()=>{
    if(!ameLipa) return setLipa(true)
    if(!newPost.preview) return alert("Weka picha au video kwanza!")
    if(!newPost.jina ||!newPost.bei ||!newPost.wa) return alert("Jaza jina, bei, na WhatsApp yako!")
    const post = {
      id:Date.now(),
      user:"wewe",
      jina:newPost.jina,
      bei:newPost.bei,
      maelezo:newPost.maelezo,
      wa:newPost.wa,
      likes:0,
      liked:false,
      preview:newPost.preview,
      picha:newPost.preview,
      type:newPost.type,
      time:"sasa"
    }
    setPosts([post,...posts])
    setNewPost({jina:"",bei:"",maelezo:"",wa:"",preview:null,type:"image",file:null})
    setPage("soko")
    alert("✅ Imewekwa! Watu wataiona na WhatsApp yako")
  }

  return(
    <div style={{maxWidth:480,margin:"auto",background:"#fafafa",minHeight:"100vh",fontFamily:"-apple-system, sans-serif",paddingBottom:70}}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Grand+Hotel&display=swap');`}</style>

      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"12px 16px",background:"white",borderBottom:"1px solid #dbdbdb",position:"sticky",top:0,zIndex:10}}>
        <h1 style={{fontFamily:"Grand Hotel",fontSize:30,margin:0}}>Wafla Market</h1>
        <div style={{display:"flex",gap:8}}>
          <button onClick={()=>setPage("soko")} style={{background:page==="soko"?"black":"white",color:page==="soko"?"white":"black",border:"1px solid #dbdbdb",padding:"6px 14px",borderRadius:20,fontWeight:700,fontSize:12}}>SOKO</button>
          <button onClick={()=>ameLipa?setPage("uza"):setLipa(true)} style={{background:ameLipa?"#0095f6":"black",color:"white",border:"none",padding:"6px 14px",borderRadius:20,fontWeight:700,fontSize:12}}>{ameLipa?"＋ UZA":"🔒 10K"}</button>
        </div>
      </div>

      {page==="soko" && (
        <>
          <div style={{background:"white",padding:"10px",display:"flex",gap:12,overflowX:"auto",borderBottom:"1px solid #dbdbdb"}}>
            {[{name:"wewe",isYou:true},...posts.slice(0,6).map(p=>({name:p.user.split("_")[0], p}))].map((s,i)=>(
              <div key={i} onClick={()=>{
                if(s.isYou) return ameLipa? setPage("uza"): setLipa(true)
                setStory(s.p)
              }} style={{textAlign:"center",minWidth:64,cursor:"pointer"}}>
                <div style={{width:64,height:64,borderRadius:32,padding:2,background:s.isYou?"#eee":"linear-gradient(45deg,#feda75,#fa7e1e,#d62976)"}}>
                  <div style={{background:"white",width:"100%",height:"100%",borderRadius:32,overflow:"hidden",display:"flex",alignItems:"center",justifyContent:"center",border:"2px solid white"}}>
                    {s.isYou? <span style={{fontSize:24}}>＋</span> : <img src={s.p.picha} style={{width:"100%",height:"100%",objectFit:"cover"}}/>}
                  </div>
                </div>
                <div style={{fontSize:10,marginTop:4}}>{s.name}</div>
              </div>
            ))}
          </div>

          {posts.map(p=>(
            <div key={p.id} style={{background:"white",marginBottom:8,borderTop:"1px solid #dbdbdb",borderBottom:"1px solid #dbdbdb"}}>
              <div style={{display:"flex",alignItems:"center",padding:10,gap:10}}><img src={p.picha} style={{width:32,height:32,borderRadius:16,objectFit:"cover"}}/><b style={{fontSize:14}}>{p.user}</b><span style={{fontSize:11,color:"#888"}}>• {p.time}</span></div>
              <div style={{background:"black",aspectRatio:"1/1",overflow:"hidden"}}>{p.type==="video"? <video src={p.preview||p.picha} controls style={{width:"100%",height:"100%",objectFit:"cover"}}/> : <img src={p.preview||p.picha} style={{width:"100%",height:"100%",objectFit:"cover"}}/>}</div>
              <div style={{padding:12}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                  <div style={{display:"flex",gap:14,fontSize:22}}><span onClick={()=>like(p.id)} style={{cursor:"pointer"}}>{p.liked?"❤️":"🤍"}</span><span onClick={()=>waLink(p.wa,p.jina)}>💬</span></div>
                  <button onClick={()=>waLink(p.wa,p.jina)} style={{background:"#25D366",color:"white",border:"none",padding:"8px 16px",borderRadius:20,fontWeight:700,fontSize:12}}>WhatsApp</button>
                </div>
                <div style={{fontSize:14,marginTop:8}}><b>{p.likes} likes</b></div>
                <div style={{fontSize:14}}><b>{p.user}</b> {p.jina} - <b style={{color:"#ed4956"}}>TZS {p.bei}</b></div>
                <div style={{fontSize:13,color:"#555"}}>{p.maelezo}</div>
                <div style={{fontSize:11,color:"#888",marginTop:4}}>WhatsApp: {p.wa} • Bonyeza WhatsApp kununua</div>
              </div>
            </div>
          ))}
        </>
      )}

      {page==="uza" && (
        <div style={{padding:16}}>
          {pending&&!ameLipa? (
            <div style={{background:"white",padding:20,borderRadius:16,textAlign:"center",border:"1px solid #dbdbdb"}}>
              <h3>⏳ Inasubiri Uthibitisho</h3>
              <p style={{fontSize:13,color:"#666"}}>TxID: {localStorage.getItem("wafla_tx")} imetumwa kwa Lawi 0702379441</p>
              <div style={{background:"#fafafa",padding:12,borderRadius:10,marginTop:12}}>
                <input id="adminPass" type="password" placeholder="Password ya admin" style={{width:"100%",padding:10,borderRadius:8,border:"1px solid #dbdbdb"}}/>
                <button onClick={()=>{if(document.getElementById("adminPass").value==="lawi123"){localStorage.setItem("wafla_paid","yes");localStorage.removeItem("wafla_pending");setAmeLipa(true);setPending(false)}}} style={{width:"100%",marginTop:8,background:"black",color:"white",padding:10,borderRadius:20,border:"none",fontWeight:700}}>FUNGUA MTU HUYU</button>
              </div>
            </div>
          ) :!ameLipa? (
            <div style={{background:"white",padding:20,borderRadius:16,border:"1px solid #dbdbdb",textAlign:"center"}}>
              <h2 style={{marginTop:0}}>Anza Kuuza Mwanza</h2>
              <div style={{textAlign:"left",background:"#fafafa",padding:14,borderRadius:10,fontSize:14,lineHeight:"26px"}}>
                1. Lipa 10K M-Pesa<br/>2. Namba: <b>0702379441</b><br/>3. Jina: <b>LAWI RASHIDI</b><br/>4. Weka Transaction ID hapa chini
              </div>
              <button onClick={()=>setLipa(true)} style={{width:"100%",background:"black",color:"white",padding:14,borderRadius:30,border:"none",fontWeight:800,marginTop:16}}>NIMELIPA 10K</button>
            </div>
          ) : (
            <div style={{background:"white",padding:16,borderRadius:16,border:"1px solid #dbdbdb"}}>
              <b>Weka Bidhaa Mpya</b>
              <div style={{marginTop:10,background:"#fafafa",aspectRatio:"1",borderRadius:12,overflow:"hidden",display:"flex",alignItems:"center",justifyContent:"center",border:"1px dashed #ccc"}}>
                {newPost.preview? (newPost.type==="video"? <video src={newPost.preview} controls style={{width:"100%"}}/> : <img src={newPost.preview} style={{width:"100%"}}/>) : <span style={{color:"#999",fontSize:13}}>Hakuna picha/video</span>}
              </div>
              <label style={{display:"block",background:"black",color:"white",textAlign:"center",padding:12,borderRadius:10,marginTop:10,cursor:"pointer",fontWeight:700}}>📸 CHAGUA PICHA/VIDEO<input type="file" accept="image/*,video/*" onChange={fileChange} hidden/></label>
              <input value={newPost.jina} onChange={e=>setNewPost({...newPost,jina:e.target.value})} placeholder="Jina la bidhaa" style={{width:"100%",padding:12,marginTop:10,borderRadius:8,border:"1px solid #dbdbdb"}}/>
              <input value={newPost.bei} onChange={e=>setNewPost({...newPost,bei:e.target.value})} placeholder="Bei - 25000" style={{width:"100%",padding:12,marginTop:8,borderRadius:8,border:"1px solid #dbdbdb"}}/>
              <input value={newPost.wa} onChange={e=>setNewPost({...newPost,wa:e.target.value})} placeholder="Namba yako ya WhatsApp 07..." style={{width:"100%",padding:12,marginTop:8,borderRadius:8,border:"2px solid #25D366"}}/>
              <textarea value={newPost.maelezo} onChange={e=>setNewPost({...newPost,maelezo:e.target.value})} placeholder="Maelezo - size, location" style={{width:"100%",padding:12,marginTop:8,borderRadius:8,border:"1px solid #dbdbdb",minHeight:60}}/>
              <button onClick={publish} style={{width:"100%",background:"#0095f6",color:"white",padding:14,borderRadius:30,border:"none",fontWeight:800,marginTop:12}}>WEKA SOKONI SASA 🚀</button>
            </div>
          )}
        </div>
      )}

      {story && (
        <div style={{position:"fixed",inset:0,background:"black",zIndex:50,display:"flex",flexDirection:"column"}}>
          <div style={{display:"flex",justifyContent:"space-between",padding:14}}><div style={{display:"flex",gap:8,alignItems:"center"}}><img src={story.picha} style={{width:32,height:32,borderRadius:16}}/><b style={{color:"white"}}>{story.user}</b></div><button onClick={()=>setStory(null)} style={{color:"white",background:"none",border:"none",fontSize:22}}>✕</button></div>
          <div style={{flex:1,display:"flex",alignItems:"center",justifyContent:"center"}}><img src={story.preview||story.picha} style={{maxWidth:"100%",maxHeight:"80vh"}}/></div>
          <div style={{padding:16}}><div style={{color:"white"}}>{story.jina} - TZS {story.bei}</div><button onClick={()=>waLink(story.wa,story.jina)} style={{width:"100%",background:"#25D366",color:"white",padding:14,borderRadius:30,border:"none",fontWeight:800,marginTop:10}}>WhatsApp {story.wa}</button></div>
        </div>
      )}

      {lipa && (
        <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.6)",display:"flex",alignItems:"flex-end",justifyContent:"center",zIndex:40}}>
          <div style={{background:"white",width:"100%",maxWidth:480,borderRadius:"20px 20px 0 0",padding:20}}>
            <h3 style={{marginTop:0}}>Lipa ili Uweze Kuweka Video</h3>
            <div style={{background:"#f6f6f6",padding:12,borderRadius:10}}>M-Pesa: <b>0702379441</b><br/>Jina: <b>LAWI RASHIDI</b><br/>10,000 TZS - 60 bidhaa</div>
            <input value={txId} onChange={e=>setTxId(e.target.value)} placeholder="Weka Transaction ID ya M-Pesa" style={{width:"100%",padding:12,marginTop:12,borderRadius:8,border:"1px solid #dbdbdb"}}/>
            <button onClick={()=>{if(txId.length<4)return alert("Weka TxID");localStorage.setItem("wafla_pending","yes");localStorage.setItem("wafla_tx",txId);setPending(true);setLipa(false);window.open(`https://wa.me/255702379441?text=Habari Lawi, NIMELIPA 10K TxID:${txId}`)}} style={{width:"100%",background:"black",color:"white",padding:14,borderRadius:30,border:"none",fontWeight:800,marginTop:10}}>TUMA UTHIBITISHO</button>
            <button onClick={()=>setLipa(false)} style={{width:"100%",background:"none",border:"none",color:"#888",marginTop:8}}>Ghairi</button>
          </div>
        </div>
      )}

      <div style={{position:"fixed",bottom:0,left:0,right:0,maxWidth:480,margin:"auto",background:"white",borderTop:"1px solid #dbdbdb",display:"flex",justifyContent:"space-around",padding:"10px 0"}}><span onClick={()=>setPage("soko")}>🏠</span><span>🔍</span><span onClick={()=>ameLipa?setPage("uza"):setLipa(true)}>➕</span><span>❤️</span><span>👤</span></div>
    </div>
  )
}
createRoot(document.getElementById("root")).render(<App />)                       
