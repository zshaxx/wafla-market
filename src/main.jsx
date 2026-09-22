 import { useState } from "react"
import { createRoot } from "react-dom/client"

function App(){
  const [page,setPage]=useState("soko")
  const [lipa,setLipa]=useState(false)
  const [ameLipa,setAmeLipa]=useState(localStorage.getItem("wafla_paid")==="yes")
  const [pending,setPending]=useState(localStorage.getItem("wafla_pending")==="yes")
  const [txId,setTxId]=useState("")
  const [posts,setPosts]=useState([
    {id:1,user:"neema_classic",jina:"Gauni la harusi",bei:"45,000",maelezo:"Size M-XXL, delivery Mwanza",likes:128,liked:false, picha:"https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500", wa:"255700000001"},
    {id:2,user:"juma_phones",jina:"iPhone 13 Pro",bei:"1,450,000",maelezo:"Used clean, 256GB, box",likes:89,liked:false, picha:"https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500", wa:"255700000002"},
  ])
  const [newPost,setNewPost]=useState({jina:"",bei:"",maelezo:"",wa:"",preview:null,type:"image"})

  const like=(id)=>setPosts(posts.map(p=>p.id===id?{...p,liked:!p.liked,likes:p.liked?p.likes-1:p.likes+1}:p))
  const fileChange=e=>{
    if(!ameLipa){setLipa(true);e.target.value="";return}
    const f=e.target.files[0]; if(!f) return
    setNewPost({...newPost,preview:URL.createObjectURL(f),type:f.type.startsWith("video")?"video":"image"})
  }
  const waLink=(n,j)=>{
    let num=n.replace(/\D/g,""); if(num.startsWith("0")) num="255"+num.slice(1)
    window.open(`https://wa.me/${num}?text=Habari ${j}, nimeiona Wafla Market`,"_blank")
  }

  return(
    <div style={{maxWidth:480,margin:"auto",background:"#fafafa",color:"#111",minHeight:"100vh",fontFamily:"-apple-system,BlinkMacSystemFont,sans-serif",paddingBottom:80}}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Grand+Hotel&display=swap');`}</style>

      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"14px 18px",background:"white",borderBottom:"1px solid #efefef",position:"sticky",top:0,zIndex:10}}>
        <h1 style={{fontFamily:"Grand Hotel, cursive",fontSize:32,margin:0,fontWeight:400}}>Wafla Market</h1>
        <button onClick={()=>ameLipa?setPage("uza"):setLipa(true)} style={{background:ameLipa?"#111":"linear-gradient(45deg,#feda75,#fa7e1e,#d62976)",color:"white",border:"none",padding:"8px 18px",borderRadius:20,fontWeight:700,fontSize:13}}>{ameLipa?"＋ Weka":"JIUNGE 10K"}</button>
      </div>

      {page==="soko"?(
        <>
          <div style={{background:"white",padding:16,display:"flex",gap:14,overflowX:"auto",borderBottom:"1px solid #efefef"}}>
            {[
              {name:"wewe",active:true},{name:"neema"},{name:"juma"},{name:"fatma"},{name:"soko"},
            ].map((s,i)=>(
              <div key={i} style={{textAlign:"center",minWidth:64}}>
                <div style={{width:64,height:64,borderRadius:32,background:i===0?"#eee":"linear-gradient(45deg,#feda75,#d62976)",padding:2}}><div style={{width:"100%",height:"100%",borderRadius:32,background:"white",display:"flex",alignItems:"center",justifyContent:"center",fontSize:24}}>{i===0?"➕":"👩‍🦰"}</div></div>
                <div style={{fontSize:11,marginTop:6}}>{s.name}</div>
              </div>
            ))}
          </div>

          {posts.map(p=>(
            <div key={p.id} style={{background:"white",marginTop:8,border:"1px solid #efefef",borderRadius:0}}>
              <div style={{display:"flex",alignItems:"center",gap:10,padding:"12px 14px"}}>
                <div style={{width:32,height:32,borderRadius:16,background:"linear-gradient(45deg,#feda75,#d62976)"}}></div>
                <b style={{fontSize:14}}>{p.user}</b><span style={{color:"#888",fontSize:12}}>• Mwanza</span>
                <span style={{marginLeft:"auto"}}>•••</span>
              </div>
              <div style={{background:"#000",aspectRatio:"4/5",display:"flex",alignItems:"center",justifyContent:"center",overflow:"hidden"}}>
                {p.preview? (p.type==="video"? <video src={p.preview} controls style={{width:"100%",height:"100%",objectFit:"cover"}}/> : <img src={p.preview} style={{width:"100%",height:"100%",objectFit:"cover"}}/>) : <img src={p.picha} style={{width:"100%",height:"100%",objectFit:"cover"}}/>}
              </div>
              <div style={{padding:"12px 14px"}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                  <div style={{display:"flex",gap:16,fontSize:22}}><span onClick={()=>like(p.id)} style={{cursor:"pointer"}}>{p.liked?"❤️":"🤍"}</span><span>💬</span><span>✈️</span></div>
                  <span>🔖</span>
                </div>
                <div style={{fontWeight:700,marginTop:8,fontSize:14}}>{p.likes} likes</div>
                <div style={{fontSize:14,marginTop:4}}><b>{p.user}</b> {p.jina} <span style={{color:"#d62976",fontWeight:700}}>TZS {p.bei}</span></div>
                <div style={{fontSize:13,color:"#555"}}>{p.maelezo}</div>
                <div style={{marginTop:10,display:"flex",gap:8}}>
                  <button onClick={()=>waLink(p.wa,p.jina)} style={{flex:1,background:"#25D366",color:"white",border:"none",padding:"10px",borderRadius:8,fontWeight:700}}>WhatsApp Muuzaji - {p.wa.slice(-9)}</button>
                </div>
              </div>
            </div>
          ))}
        </>
      ):(
        <div style={{padding:20}}>
          {pending&&!ameLipa?(
            <div style={{background:"white",padding:24,borderRadius:16,textAlign:"center",boxShadow:"0 4px 20px rgba(0,0,0,0.08)"}}>
              <div style={{fontSize:48}}>⏳</div><h3>Subiri Uthibitisho</h3><p style={{fontSize:13,color:"#666"}}>TxID: {localStorage.getItem("wafla_tx")} imetumwa kwa LAWI RASHIDI<br/>Akiona M-Pesa 0702379441 atakufungulia</p>
              <input id="adminPass" placeholder="Password ya admin (lawi123)" style={{width:"100%",padding:12,borderRadius:10,border:"1px solid #ddd",marginTop:12}}/>
              <button onClick={()=>{if(document.getElementById("adminPass").value==="lawi123"){localStorage.setItem("wafla_paid","yes");localStorage.removeItem("wafla_pending");setAmeLipa(true);setPending(false)}}} style={{background:"black",color:"white",width:"100%",padding:12,borderRadius:10,marginTop:10,fontWeight:700}}>FUNGUA KAMA ADMIN</button>
            </div>
          ):!ameLipa?(
            <div style={{background:"white",padding:24,borderRadius:20,boxShadow:"0 8px 30px rgba(0,0,0,0.08)",textAlign:"center"}}>
              <div style={{width:80,height:80,borderRadius:40,background:"linear-gradient(45deg,#feda75,#d62976)",margin:"auto",display:"flex",alignItems:"center",justifyContent:"center",fontSize:36}}>🔒</div>
              <h2 style={{margin:"16px 0 8px 0"}}>Anza Kuuza Leo</h2>
              <p style={{color:"#666",fontSize:14,lineHeight:"20px"}}>Wafanyabiashara 200+ wanauza hapa. Lipa mara moja uza kila siku na weka namba yako ya WhatsApp.</p>
              <div style={{background:"#fafafa",borderRadius:12,padding:16,textAlign:"left",marginTop:16,border:"1px solid #eee"}}>
                <div style={{display:"flex",justifyContent:"space-between",marginBottom:8}}><span>💰 Ada ya mwezi</span><b>10,000 TZS</b></div>
                <div style={{display:"flex",justifyContent:"space-between",marginBottom:8}}><span>📦 Bidhaa</span><b>60</b></div>
                <div style={{display:"flex",justifyContent:"space-between"}}><span>💬 WhatsApp yako</span><b>Moja kwa moja</b></div>
              </div>
              <button onClick={()=>setLipa(true)} style={{background:"black",color:"white",width:"100%",padding:16,borderRadius:30,border:"none",fontWeight:800,marginTop:20,fontSize:16}}>LIPA 10K - ANZA KUUZA</button>
              <p style={{fontSize:11,color:"#999",marginTop:10}}>M-Pesa: 0702379441 - LAWI RASHIDI</p>
            </div>
          ):(
            <div style={{background:"white",padding:20,borderRadius:20,boxShadow:"0 8px 30px rgba(0,0,0,0.08)"}}>
              <h3 style={{marginTop:0}}>Weka Bidhaa Mpya</h3>
              <div style={{background:"#fafafa",aspectRatio:"1",borderRadius:16,display:"flex",alignItems:"center",justifyContent:"center",overflow:"hidden",border:"2px dashed #ddd"}}>
                {newPost.preview? (newPost.type==="video"? <video src={newPost.preview} controls style={{width:"100%",height:"100%",objectFit:"cover"}}/> : <img src={newPost.preview} style={{width:"100%",height:"100%",objectFit:"cover"}}/>) : <span style={{color:"#999"}}>Hakuna picha bado</span>}
              </div>
              <label style={{display:"block",background:"black",color:"white",padding:14,borderRadius:12,textAlign:"center",marginTop:14,fontWeight:700,cursor:"pointer"}}>📸 Chagua Picha / Video<input type="file" accept="image/*,video/*" onChange={fileChange} hidden/></label>
              <input placeholder="Jina la bidhaa" value={newPost.jina} onChange={e=>setNewPost({...newPost,jina:e.target.value})} style={{width:"100%",padding:14,marginTop:12,borderRadius:10,border:"1px solid #ddd"}}/>
              <input placeholder="Bei" value={newPost.bei} onChange={e=>setNewPost({...newPost,bei:e.target.value})} style={{width:"100%",padding:14,marginTop:10,borderRadius:10,border:"1px solid #ddd"}}/>
              <input placeholder="Namba yako ya WhatsApp 07..." value={newPost.wa} onChange={e=>setNewPost({...newPost,wa:e.target.value})} style={{width:"100%",padding:14,marginTop:10,borderRadius:10,border:"2px solid #25D366"}}/>
              <textarea placeholder="Maelezo..." value={newPost.maelezo} onChange={e=>setNewPost({...newPost,maelezo:e.target.value})} style={{width:"100%",padding:14,marginTop:10,borderRadius:10,border:"1px solid #ddd",minHeight:70}}/>
              <button onClick={()=>{if(!newPost.preview)return alert("Weka picha/video!");setPosts([{id:Date.now(),user:"wewe",jina:newPost.jina,bei:newPost.bei,maelezo:newPost.maelezo,wa:newPost.wa,likes:0,liked:false,preview:newPost.preview,type:newPost.type,picha:""},...posts]);setNewPost({jina:"",bei:"",maelezo:"",wa:"",preview:null,type:"image"});setPage("soko")}} style={{background:"linear-gradient(45deg,#feda75,#fa7e1e,#d62976)",color:"white",width:"100%",padding:16,borderRadius:30,border:"none",fontWeight:800,marginTop:14}}>CHAPISHA SOKONI 🚀</button>
            </div>
          )}
        </div>
      )}

      <div style={{position:"fixed",bottom:0,left:0,right:0,maxWidth:480,margin:"auto",background:"white",borderTop:"1px solid #efefef",display:"flex",justifyContent:"space-around",padding:"10px 0"}}>
        <span onClick={()=>setPage("soko")} style={{fontSize:22,cursor:"pointer"}}>🏠</span><span style={{fontSize:22}}>🔍</span><span onClick={()=>ameLipa?setPage("uza"):setLipa(true)} style={{fontSize:22,cursor:"pointer"}}>➕</span><span style={{fontSize:22}}>❤️</span><span style={{fontSize:22}}>👤</span>
      </div>

      {lipa&&(
        <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.5)",display:"flex",alignItems:"flex-end",justifyContent:"center",zIndex:99}}>
          <div style={{background:"white",width:"100%",maxWidth:480,borderRadius:"24px 24px 0 0",padding:24,animation:"slideUp 0.3s"}}>
            <div style={{width:40,height:4,background:"#ddd",borderRadius:2,margin:"0 auto 16px auto"}}></div>
            <h3 style={{marginTop:0}}>Thibitisha Malipo</h3>
            <p style={{fontSize:13,color:"#666"}}>Lipa M-Pesa 0702379441 - LAWI RASHIDI kisha weka Transaction ID</p>
            <div style={{background:"#fafafa",padding:14,borderRadius:12,marginTop:12}}>M-Pesa: <b>0702379441</b><br/>Jina: <b>LAWI RASHIDI</b><br/>10K = 60 bidhaa + WhatsApp yako</div>
            <input placeholder="Weka Transaction ID - QK123..." value={txId} onChange={e=>setTxId(e.target.value)} style={{width:"100%",padding:14,borderRadius:10,border:"1px solid #ddd",marginTop:14}}/>
            <button onClick={()=>{if(txId.length<4)return alert("Weka TxID");localStorage.setItem("wafla_pending","yes");localStorage.setItem("wafla_tx",txId);setPending(true);setLipa(false);window.open(`https://wa.me/255702379441?text=NIMELIPA 10K TxID: ${txId}`)}} style={{background:"black",color:"white",width:"100%",padding:14,borderRadius:30,border:"none",fontWeight:800,marginTop:12}}>TUMA KWA LAWI RASHIDI</button>
            <button onClick={()=>setLipa(false)} style={{background:"none",border:"none",width:"100%",color:"#666",marginTop:10}}>Ghairi</button>
          </div>
        </div>
      )}
    </div>
  )
}
createRoot(document.getElementById("root")).render(<App />)           
