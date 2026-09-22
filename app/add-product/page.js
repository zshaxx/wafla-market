"use client"
import { useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function AddProduct(){
 const [form, setForm] = useState({title:'', price:'', size:'', condition:'Mpya', brand:'', phone:''})

 const save = async () => {
   const { data, error } = await supabase.from('products').insert([form])
   if(!error){ alert('Bidhaa imeongezwa!'); window.location.href='/' }
   else alert(error.message)
 }

 return (
   <div style={{maxWidth:400, margin:'20px auto', padding:20}}>
     <h2>Ongeza Bidhaa - Wafla Market</h2>
     <input placeholder="Jina" onChange={e=>setForm({...form,title:e.target.value})} style={{width:'100%',padding:10,margin:5}}/>
     <input placeholder="Bei (TZS)" type="number" onChange={e=>setForm({...form,price:e.target.value})} style={{width:'100%',padding:10,margin:5}}/>
     <select onChange={e=>setForm({...form,size:e.target.value})} style={{width:'100%',padding:10,margin:5}}>
       <option>Size</option><option>S</option><option>M</option><option>L</option><option>XL</option><option>42</option><option>44</option>
     </select>
     <select onChange={e=>setForm({...form,condition:e.target.value})} style={{width:'100%',padding:10,margin:5}}>
       <option>Mpya</option><option>Mtumba</option>
     </select>
     <input placeholder="Brand" onChange={e=>setForm({...form,brand:e.target.value})} style={{width:'100%',padding:10,margin:5}}/>
     <input placeholder="Namba ya WhatsApp" onChange={e=>setForm({...form,phone:e.target.value})} style={{width:'100%',padding:10,margin:5}}/>
     <button onClick={save} style={{width:'100%',padding:12,background:'green',color:'white',marginTop:10}}>Hifadhi</button>
   </div>
 )
                                   }
