import { useState } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"

function App(){
  const [page, setPage] = useState("feed") // feed, pay, post
  const [posts, setPosts] = useState([
    {id:1, user:"@neema_store", jina:"Viatu Vya Kike", bei:"35000", maelezo:"Size 38-42, rangi zote", likes:234, picha:"👟"},
    {id:2, user:"@juma_electronics", jina:"Headset", bei:"25000", maelezo:"Bluetooth, bass kali", likes:120, picha:"🎧"},
  ])
  const [newPost, setNewPost] = useState({jina:"", bei:"", maelezo:"", preview:null, type:"image"})
  const [used, setUsed] = useState(2) // alishoweka ngapi

  const handleFile = e => {
    const file = e.target.files[0]
    if(!file) return
    setNewPost({...newPost, preview: URL.createObjectURL(file), type: file.type.startsWith("video")?"video":"image"})
  }

  const publish = () => {
    if(!newPost.jina) return alert("Weka jina")
    if(used >= 60) return alert("Umefikisha 60, ongeza mwezi mwingine")
    setPosts([{id:Date.now(), user:"@wewe", jina:newPost.jina, bei:newPost.bei, maelezo:newPost.maelezo, likes:0, preview:newPost.preview, type:newPost.type},...posts])
    setUsed(used+1)
    setNewPost({jina:"", bei:"", maelezo:"", preview:null, type:"image"})
    setPage("feed")
  }

  if(page==="pay"){
    return(
      <div style={{maxWidth:420, margin:"auto", background:"black", color:"white", minHeight:"100vh", padding:20}}>
        <button onClick={()=>setPage("feed")} style={{background:"none", border:"none", color:"white"}}>⬅ Rudi</button>
        <div style={{textAlign:"center", marginTop:30}}>
          <div style={{fontSize:50}}>👑</div>
          <h2>WAFLA PREMIUM</h2>
          <div style={{background:"linear-gradient(135deg,#1a1a1a,#2a2a2a)", border:"1px solid #ff0050", borderRadius:20, padding:20, marginTop:20}}>
            <h3 style={{color:"#ff0050"}}>10,000 TZS / MWEZI</h3>
            <div style={{textAlign:"left", fontSize:14, lineHeight:"28px", marginTop:15}}>
              ✅ Weka bidhaa <b>60</b> kwa mwezi<br/>
              ✅ Video + Picha kama Insta<br/>
              ✅ Maelezo marefu ya bidhaa<br/>
              ✅ Wateja wakuone Mwanza nzima<br/>
              ✅ WhatsApp direct<br/>
              <div style={{background:"#222", padding:10, borderRadius:10, marginTop:15}}>
                Umeweka: <b>{used}/60</b> bidhaa<br/>
                <div style={{background:"#333", height:8, borderRadius:5, marginTop:5}}><div style={{background:"#ff0050", height:8, width:`${(used/60)*100}%`, borderRadius:5}}></div></div>
              </div>
            </div>
            <div style={{background:"white", color:"black", padding:12, borderRadius:10, marginTop:15}}>Lipa M-Pesa: <b>0702379441</b><br/>WAFLA MARKET</div>
            <button onClick={()=>setPage("post")} style={{background:"linear-gradient(45deg,#f09433,#dc2743)", color:"white", width:"100%", padding:14, borderRadius:25, border:"none", fontWeight:"bold", marginTop:15}}>NIMELIPA - ANZA KUWEKA</button>
          </div>
        </div>
      </div>
    )
  }

  if(page==="post"){
    return(
      <div style={{maxWidth:420, margin:"auto", background:"black", color:"white", minHeight:"100vh"}}>
        <div style={{display:"flex", justifyContent:"space-between", padding:15, borderBottom:"1px solid #222"}}>
          <button onClick={()=>setPage("feed")} style={{background:"none", border:"none", color:"white"}}>✕</button>
          <b>New Product ({used}/60)</b>
          <button onClick={publish} style={{background:"none", border:"none", color:"#0095f6", fontWeight:"bold"}}>Share</button>
        </div>
        <div style={{padding:15}}>
          {newPost.preview?
            newPost.type==="video"? <video src={newPost.preview} controls style={{width:"100%", borderRadius:12}}/> : <img src={newPost.preview} style={{width:"100%", borderRadius:12}}/>
            :
            <label style={{border:"2px dashed #333", display:"block", padding:40, borderRadius:15, textAlign:"center", cursor:"pointer"}}>
              <div style={{fontSize:40}}>📸 + 🎬</div>
              <p>Chagua Video au Picha ya Bidhaa</p>
              <input type="file" accept="image/*,video/*" onChange={handleFile} hidden/>
