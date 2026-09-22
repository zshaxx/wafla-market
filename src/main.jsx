import { useState } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"

function App(){
  const [page, setPage] = useState("sokoni")
  const [likes, setLikes] = useState({})
  const [bidhaa, setBidhaa] = useState([
    {id:1, jina:"Viatu kali", bei:"25000", user:"@neema", picha:"👟", video:null, likes:124},
    {id:2, jina:"T-shirt trending", bei:"15000", user:"@juma_style", picha:"👕", video:null, likes:89},
  ])

  const [newPost, setNewPost] = useState({jina:"", bei:"", file:null, preview:null, type:"image"})

  const handleFile = (e) => {
    const file = e.target.files[0]
    if(!file) return
    const isVideo = file.type.startsWith("video")
    setNewPost({...newPost, file, preview: URL.createObjectURL(file), type: isVideo? "video" : "image"})
  }

  const wekaPost = () => {
    if(!newPost.jina) return alert("Weka jina la bidhaa")
    const postMpya = {
      id: Date.now(),
      jina: newPost.jina,
      bei: newPost.bei,
      user: "@wewe",
      picha: newPost.type === "image"? "🛍️" : "🎬",
      video: newPost.type === "video"? newPost.preview : null,
      image: newPost.type === "image"? newPost.preview : null,
      likes: 0
    }
    setBidhaa([postMpya,...bidhaa])
    setNewPost({jina:"", bei:"", file:null, preview:null, type:"image"})
    setPage("sokoni")
  }

  // PAGE LIPA
  if(page === "lipa"){
    return(
      <div style={{padding:20, maxWidth:420, margin:"auto", background:"black", color:"white", minHeight:"100vh"}}>
        <button onClick={()=>setPage("sokoni")} style={{color:"white", background:"none", border:"none"}}>⬅</button>
        <div style={{textAlign:"center", marginTop:40}}>
          <div style={{fontSize:60}}>💎</div>
          <h2>WEKA BIDHAA KAMA INSTA</h2>
          <p style={{color:"#aaa"}}>Watu wataona kama Reel / Story</p>
          <div style={{background:"#222", padding:20, borderRadius:16, marginTop:20}}>
            <p>Lipa <b style={{color:"#ff0050"}}>10K</b> u-post video + picha bila kikomo</p>
            <p style={{background:"white", color:"black", padding:12, borderRadius:10}}>M-Pesa: <b>0702379441</b></p>
            <button onClick={()=>setPage("weka")} style={{background:"linear-gradient(45deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)", color:"white", width:"100%", padding:14, borderRadius:25, border:"none", fontWeight:"bold", marginTop:15}}>🔓 NIMELIPA - FUNGUA</button>
          </div>
        </div>
      </div>
    )
  }

  // PAGE WEKA - KAMA INSTA
  if(page === "weka"){
    return(
      <div style={{maxWidth:420, margin:"auto", background:"black", color:"white", minHeight:"100vh"}}>
        <div style={{display:"flex", justifyContent:"space-between", padding:15, borderBottom:"1px solid #333"}}>
          <button onClick={()=>setPage("sokoni")} style={{background:"none", border:"none", color:"white"}}>❌</button>
          <b
