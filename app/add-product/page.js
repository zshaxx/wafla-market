import { useState } from 'react'
import { supabase } from '../lib/supabase'

export default function App(){
  const [phone, setPhone] = useState("")
  const [isApproved, setIsApproved] = useState(false)
  const [form, setForm] = useState({jina:'', bei:''})

  const checkPayment = async () => {
    if(!phone) return alert("Weka namba")
    let {data} = await supabase.from('approved_users').select('*').eq('phone', phone).single()
    if(data){ setIsApproved(true); alert("Umefunguliwa! Weka bidhaa 60 sasa") }
    else {
      window.open(`https://wa.me/255702379441?text=NIMELIPA 10K namba ${phone} - Nifungulie`,'_blank')
      alert("Bado hujafunguliwa. Nimemtumia Admin ujumbe. Subiri dakika 5")
    }
  }

  const postProduct = async () => {
    if(!isApproved) return alert("Lipa kwanza!")
    await supabase.from('products').insert([{...form, phone, status:'approved'}])
    alert("Bidhaa imewekwa!")
  }

  return(
    <div style={{padding:20, maxWidth:400, margin:'auto'}}>
      <h3>WAFLA MARKET - 10K / 60 Bidhaa</h3>
      
      {!isApproved ? (
        <div style={{border:'2px solid red', padding:15, borderRadius:10}}>
          <p>🔒 UJAWEKA PICHA - LIPA KWANZA</p>
          <p>Lipa: <b>M-Pesa 0702379441</b></p>
          <input value={phone} onChange={e=>setPhone(e.target.value)} placeholder="Namba yako 07..." style={{width:'100%',padding:12}}/>
          <button onClick={checkPayment} style={{background:'black',color:'white',width:'100%',padding:12,marginTop:10}}>NIMELIPA - NIFUNGULIE</button>
        </div>
      ) : (
        <div style={{border:'2px solid green', padding:15, borderRadius:10}}>
          <p>✅ UMEFUNGULIWA - Weka picha 60</p>
          <input placeholder="Jina la bidhaa" onChange={e=>setForm({...form, jina:e.target.value})} style={{width:'100%',padding:10,marginBottom:8}}/>
          <input placeholder="Bei" onChange={e=>setForm({...form, bei:e.target.value})} style={{width:'100%',padding:10,marginBottom:8}}/>
          <input type="file" style={{width:'100%',marginBottom:8}}/>
          <button onClick={postProduct} style={{background:'green',color:'white',width:'100%',padding:12}}>WEKA SOKONI</button>
        </div>
      )}
    </div>
  )
       }
