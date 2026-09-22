         import { useState } from "react"
import { createRoot } from "react-dom/client"

function App(){
  const [page,setPage]=useState("soko")
  const [lipa,setLipa]=useState(false)
  const [ameLipa,setAmeLipa]=useState(localStorage.getItem("wafla_paid")==="yes")
  const [pending,setPending]=useState(localStorage.getItem("wafla_pending")==="yes")
  const [txId,setTxId]=useState(localStorage.getItem("wafla_tx")||"")
  const [story,setStory]=useState(null) // kwa story viewer

  const [posts,setPosts]=useState([
    {id:1,user:"neema_classic",jina:"Gauni la harusi",bei:"45,000",maelezo:"Size M-XXL, delivery Mwanza",likes:128,liked:false, picha:"https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500", wa:"255712345678", storyImg:"https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500"},
    {id:2,user:"juma_phones",jina:"iPhone 13 Pro",bei:"1,450,000",maelezo:"Used clean, 256GB, box",likes:89,liked:false, picha:"https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500", wa:"255713456789", storyImg:"https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500"},
    {id:3,user:"fatma_fashion",jina:"Hijab mpya",bei:"15,000",maelezo:"Rangi 10",likes:56,liked:false, picha:"https://images.unsplash.com/photo-1581044777550-4cfa60707c03?w=500", wa:"255714567890", storyImg:"https://images.unsplash.com/photo-1581044777550-4cfa60707c03?w=500"},
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

  const stories = [
    {id:0, name:"wewe", img:"➕", isYou:true, post:null},
   ...posts.map(p=>({id:p.id, name:p.user.split("_")[0], img:p.picha, post:p}))
  ]

  return(
    <div style={{maxWidth:480,margin:"auto",background:"#fafafa",color:"#111",minHeight:"100vh",fontFamily:"sans-serif",paddingBottom:80}}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Grand+Hotel&display=swap');`}</style>

      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"14px 18px",background:"white",borderBottom:"1px solid #efefef",position:"sticky",top:0,zIndex:10}}>
        <h1 style={{fontFamily:"Grand Hotel, cursive",fontSize:32,margin:0,fontWeight:400}}>Wafla Market</h1>
        <button onClick={()=>ameLipa?setPage("uza"):setLipa(true)} style={{background:ameLipa?"#111":"linear-gradient(45deg,#feda75,#fa7e1e,#d62976)",color:"white",border:"none",padding:"8px 18px",borderRadius:20,fontWeight:700,fontSize:13}}>{ameLipa?"＋ Weka":"JIUNGE 10K"}</button>
      </div>

      {page==="soko"&&(
        <>
          {/* STORY - SASA ZINAFANYA KAZI */}
          <div style={{background:"white",padding:"12px 10px",display:"flex",gap:14,overflowX:"auto",borderBottom:"1px solid #efefef"}}>
            {stories.map(s=>(
              <div key={s.id} onClick={()=>{
                if(s.isYou){ ameLipa? setPage("uza") : setLipa(true); return }
                setStory(s.post)
              }} style={{textAlign:"center",minWidth:66,cursor:"pointer"}}>
                <div style={{width:66,height:66,borderRadius:33,background: s.isYou?"#eee":"linear-gradient(45deg,#feda75,#fa7e1e,#d62976)",padding:3}}>
                  <div style={{width:"100%",height:"100%",borderRadius:33,background:"white",overflow:"hidden",display:"flex",alignItems:"center",justifyContent:"center",border:"2px solid white"}}>
                    {s.isYou? <div style={{fontSize:28}}>{s.img}</div> : <img src={s.img} style={{width:"100%",height:"100%",objectFit:"cover"}}/>}
                  </div>
                </div>
                <div style={{fontSize:11,marginTop:6,whiteSpace:"nowrap"}}>{s.name}</div>
              </div>
            ))}
          </div>

          {posts.map(p=>(
            <div key={p.id} style={{background:"white",marginTop:8,border:"1px solid #efefef"}}>
              <div style={{display:"flex",alignItems:"center",gap:10,padding:"12px 14px"}}>
                <img src={p.picha} onClick={()=>setStory(p)} style={{width:32,height:32,borderRadius:16,objectFit:"cover",cursor:"pointer"}}/>
                <b style={{fontSize:14}}>{p.user}</b>
              </div>
              <div style={{background:"#000",aspectRatio:"4/5",overflow:"hidden"}}><img src={p.preview || p.picha} style={{width:"100%",height:"100%",objectFit:"cover"}}/></div>
              <div style={{padding:"12px 14px"}}>
                <div style={{display:"flex",justifyContent:"space-between"}}>
                  <div style={{display:"flex",gap:16,fontSize:22}}><span onClick={()=>like(p.id)} style={{cursor:"pointer"}}>{p.liked?"❤️":"🤍"}</span><span>💬</span></div>
                  <button onClick={()=>waLink(p.wa,p.jina)} style={{background:"#25D366",color:"white",border:"none",padding:"8px 16px",borderRadius:20,fontWeight:700,fontSize:12}}>WhatsApp</button>
                </div>
                <div style={{fontWeight:700,marginTop:8}}>{p.likes} likes</div>
                <div><b>{p.user}</b> {p.jina} <span style={{color:"#d62976"}}>TZS {p.bei}</span></div>
              </div>
            </div>
          ))}
        </>
      )}

      {page==="uza"&&(
        <div style={{padding:20}}>
          {pending&&!ameLipa?(
            <div style={{background:"white",padding:24,borderRadius:16,textAlign:"center",boxShadow:"0 4px 20px rgba(0,0,0,0.08)"}}>
              <div style={{fontSize:48}}>⏳</div><h3>Subiri Uthibitisho</h3><p style={{fontSize:13,color:"#666"}}>TxID: {localStorage.getItem("wafla_tx")} - Lawi ataangalia M-Pesa 0702379441</p>
              <input id="adminPass" placeholder="Password admin lawi123" type="password" style={{width:"100%",padding:12,borderRadius:10,border:"1px solid #ddd",marginTop:12}}/>
              <button onClick={()=>{if(document.getElementById("adminPass").value==="lawi123"){localStorage.setItem("wafla_paid","yes");localStorage.removeItem("wafla_pending");setAmeLipa(true);setPending(false)}}} style={{background:"black",color:"white",width:"100%",padding:12,borderRadius:10,marginTop:10,fontWeight:700}}>FUNGUA</button>
            </div>
          ):!ameLipa?(
            <div style={{background:"white",padding:24,borderRadius:20,textAlign:"center",boxShadow:"0 8px 30px rgba(0,0,0,0.08)"}}>
              <h2>Anza Kuuza</h2><p style={{color:"#666",fontSize:14}}>Lipa 10K kwa LAWI RASHIDI 0702379441</p>
              <button onClick={()=>setLipa(true)} style={{background:"black",color:"white",width:"100%",padding:16,borderRadius:30,border:"none",fontWeight:800,marginTop:16}}>LIPA 10K</button>
            </div>
          ):(
            <div style={{background:"white",padding:20,borderRadius:20}}>
              <h3>Weka Bidhaa</h3>
              <div style={{background:"#fafafa",aspectRatio:"1",borderRadius:16,overflow:"hidden",display:"flex",alignItems:"center",justifyContent:"center",border:"2px dashed #ddd"}}>{newPost.preview? (newPost.type==="video"? <video src={newPost.preview} controls style={{width:"100%"}}/> : <img src={newPost.preview} style={{width:"100%"}}/>) : <span style={{color:"#999"}}>Hakuna picha</span>}</div>
              <label style={{display:"block",background:"black",color:"white",padding:14,borderRadius:12,textAlign:"center",marginTop:14,fontWeight:700,cursor:"pointer"}}>Chagua Picha/Video<input type="file" accept="image/*,video/*" onChange={fileChange} hidden/></label>
              <input placeholder="Jina" value={newPost.jina} onChange={e=>setNewPost({...newPost,jina:e.target.value})} style={{width:"100%",padding:14,marginTop:12,borderRadius:10,border:"1px solid #ddd"}}/>
              <input placeholder="Bei" value={newPost.bei} onChange={e=>setNewPost({...newPost,bei:e.target.value})} style={{width:"100%",padding:14,marginTop:10,borderRadius:10,border:"1px solid #ddd"}}/>
              <input placeholder="WhatsApp 07..." value={newPost.wa} onChange={e=>setNewPost({...newPost,wa:e.target.value})} style={{width:"100%",padding:14,marginTop:10,borderRadius:10,border:"2px solid #25D366"}}/>
              <button onClick={()=>{if(!newPost.preview)return alert("Weka picha");setPosts([{id:Date.now(),user:"wewe",jina:newPost.jina,bei:newPost.bei,maelezo:newPost.maelezo,wa:newPost.wa,likes:0,liked:false,preview:newPost.preview,type:newPost.type,picha:newPost.preview,storyImg:newPost.preview},...posts]);setNewPost({jina:"",bei:"",maelezo:"",wa:"",preview:null,type:"image"});setPage("soko")}} style={{background:"black",color:"white",width:"100%",padding:16,borderRadius:30,border:"none",fontWeight:800,marginTop:14}}>CHAPISHA 🚀</button>
            </div>
          )}
        </div>
      )}

      {/* STORY VIEWER - KAMA INSTA KWELI */}
      {story&&(
        <div style={{position:"fixed",inset:0,background:"black",zIndex:100,display:"flex",flexDirection:"column"}}>
          <div style={{display:"flex",justifyContent:"space-between",padding:14,alignItems:"center"}}>
            <div style={{display:"flex",gap:10,alignItems:"center"}}><img src={story.picha} style={{width:36,height:36,borderRadius:18}}/><b style={{color:"white"}}>{story.user}</b></div>
            <button onClick={()=>setStory(null)} style={{background:"none",border:"none",color:"white",fontSize:24}}>✕</button>
          </div>
          <div style={{flex:1,display:"flex",alignItems:"center",justifyContent:"center"}}><img src={story.preview||story.picha} style={{maxWidth:"100%",maxHeight:"70vh",objectFit:"contain"}}/></div>
          <div style={{padding:16,background:"linear-gradient(transparent, rgba(0,0,0,0.8))"}}>
            <div style={{color:"white"}}><b>{story.jina}</b> - TZS {story.bei}</div>
            <button onClick={()=>{waLink(story.wa,story.jina)}} style={{background:"#25D366",color:"white",width:"100%",padding:14,borderRadius:30,border:"none",fontWeight:800,marginTop:10}}>WhatsApp {story.wa} 💬</button>
          </div>
        </div>
      )}

      <div style={{position:"fixed",bottom:0,left:0,right:0,maxWidth:480,margin:"auto",background:"white",borderTop:"1px solid #efefef",display:"flex",justifyContent:"space-around",padding:"12px 0"}}><span onClick={()=>setPage("soko")} style={{fontSize:22}}>🏠</span><span>🔍</span><span onClick={()=>ameLipa?setPage("uza"):setLipa(true)}>➕</span><span>❤️</span><span>👤</span></div>

      {lipa&&(
        <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.5)",display:"flex",alignItems:"flex-end",justifyContent:"center",zIndex:99}}>
          <div style={{background:"white",width:"100%",maxWidth:480,borderRadius:"24px 24px 0 0",padding:24}}>
            <h3>Thibitisha Malipo</h3><p style={{fontSize:13,color:"#666"}}>0702379441 - LAWI RASHIDI - 10K</p>
            <input placeholder="Transaction ID" value={txId} onChange={e=>setTxId(e.target.value)} style={{width:"100%",padding:14,borderRadius:10,border:"1px solid #ddd",marginTop:10}}/>
            <button onClick={()=>{if(txId.length<4)return alert("Weka TxID");localStorage.setItem("wafla_pending","yes");localStorage.setItem("wafla_tx",txId);setPending(true);setLipa(false);window.open(`https://wa.me/255702379441?text=NIMELIPA TxID:${txId}`)}} style={{background:"black",color:"white",width:"100%",padding:14,borderRadius:30,border:"none",fontWeight:800,marginTop:12}}>TUMA</button>
          </div>
        </div>
      )}
    </div>
  )
}
createRoot(document.getElementById("root")).render(<App />)
