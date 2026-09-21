import { useState } from 'react'
const products=[
{id:1,name:"Miwa Gunia",price:25000,img:"🌾",loc:"Ilemela"},
{id:2,name:"Mchele 25kg",price:65000,img:"🍚",loc:"Nyamagana"},
{id:3,name:"Samaki Sato",price:12000,img:"🐟",loc:"Kirumba"},
]
export default function App(){
const [cart,setCart]=useState([])
return(<div style={{maxWidth:420,margin:'0 auto',background:'#fff',minHeight:'100vh',paddingBottom:60}}>
<div style={{background:'#16a34a',color:'#fff',padding:16}}><h1>🌿 WAFLA MARKET</h1><p style={{fontSize:12}}>Jumia ya Mwanza</p></div>
<div style={{padding:12,display:'grid',gridTemplateColumns:'1fr 1fr',gap:12}}>
{products.map(p=><div key={p.id} style={{border:'1px solid #eee',borderRadius:12,padding:12}}>
<div style={{fontSize:36,textAlign:'center'}}>{p.img}</div><b style={{fontSize:13}}>{p.name}</b><div style={{fontSize:11,color:'#666'}}>{p.loc}</div>
<div style={{color:'#16a34a',fontWeight:800}}>TZS {p.price}</div>
<button onClick={()=>setCart([...cart,p])} style={{width:'100%',background:'#16a34a',color:'#fff',border:0,padding:7,borderRadius:8,marginTop:6}}>Ongeza</button></div>)}
</div><div style={{position:'fixed',bottom:0,left:'50%',transform:'translateX(-50%)',width:'100%',maxWidth:420,background:'#000',color:'#fff',padding:12,display:'flex',justifyContent:'space-between'}}><span>Cart {cart.length}</span><span>{cart.reduce((a,b)=>a+b.price,0)}</span></div></div>)}
