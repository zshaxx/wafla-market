'use client'
import { useState, useEffect } from 'react'

export default function Page() {
  const [products, setProducts] = useState([])
  const [search, setSearch] = useState('')
  const [showPost, setShowPost] = useState(false)
  const [showPay, setShowPay] = useState(false)
  const [isPaid, setIsPaid] = useState(false)
  const [paidUntil, setPaidUntil] = useState(null)
  const [form, setForm] = useState({ jina:'', bei:'', whatsapp:'', category:'Mitindo', maelezo:'', picha:'' })

  useEffect(()=>{
    const saved = JSON.parse(localStorage.getItem('wafla_products_v2') || '[]')
    if(saved.length > 0) setProducts(saved)
    else setProducts([
      {id:1,jina:'Gauni la Kitenge Original',bei:'45000',whatsapp:'255754000000',category:'Mitindo',maelezo:'Size M, L, XL - Mwanza mjini',picha:'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=600',date:Date.now()},
      {id:2,jina:'iPhone 11 128GB Boxed',bei:'550000',whatsapp:'255712345678',category:'Simu',maelezo:'Battery 98%, kila kitu',picha:'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=600',date:Date.now()},
      {id:3,jina:'Sofa Set 3-2-1',bei:'1200000',whatsapp:'255702379441',category:'Samani',maelezo:'Mpya kutoka duka',picha:'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600',date:Date.now()},
    ])
    const untilStr = localStorage.getItem('wafla_paid_until')
    if(untilStr){
      const until = new Date(untilStr)
      if(until > new Date()){ setIsPaid(true); setPaidUntil(until) }
    }
  },[])

  const save = (list)=>{ setProducts(list); localStorage.setItem('wafla_products_v2', JSON.stringify(list)) }

  const handlePost = (e)=>{
    e.preventDefault()
    if(!isPaid){ setShowPay(true); return }
    if(!form.jina ||!form.bei ||!form.whatsapp ||!form.picha){ alert('Jaza picha, jina, bei, whatsapp'); return }
    const newProd = { id:Date.now(),...form, date:Date.now() }
    save([newProd,...products])
    setForm({ jina:'', bei:'', whatsapp:'', category:'Mitindo', maelezo:'', picha:'' })
    setShowPost(false)
  }

  const handlePay = ()=>{
    const next = new Date(); next.setMonth(next.getMonth()+1)
    localStorage.setItem('wafla_paid_until', next.toISOString())
    setIsPaid(true); setPaidUntil(next); setShowPay(false); setShowPost(true)
  }

  const onImage = (e)=>{
    const f = e.target.files[0]; if(!f) return
    const r = new FileReader(); r.onload = (ev)=> setForm({...form, picha:ev.target.result}); r.readAsDataURL(f)
  }

  const filtered = products.filter(p=> p.jina.toLowerCase().includes(search.toLowerCase()) || p.category.toLowerCase().includes(search.toLowerCase()))

  return (
    <div style={{background:'#f5f5f7', minHeight:'100vh'}}>
      <div style={{background:'#111827', color:'white', position:'sticky', top:0, zIndex:10}}>
        <div style={{maxWidth:1200, margin:'0 auto', padding:'14px 16px', display:'flex', gap:12, alignItems:'center', justifyContent:'space-between', flexWrap:'wrap'}}>
          <div style={{fontWeight:900, fontSize:22, letterSpacing:1}}>WAFLA <span style={{color:'#22c55e'}}>MARKET</span></div>
          <div style={{display:'flex', gap:8, flex:1, maxWidth:500}}>
            <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Tafuta gauni, simu, sofa..." style={{flex:1, padding:'10px 14px', borderRadius:24, border:0, outline:'none'}}/>
          </div>
          <button onClick={()=> isPaid? setShowPost(true) : setShowPay(true)} style={{background:'#22c55e', color:'white', border:0, padding:'10px 18px', borderRadius:24, fontWeight:800, cursor:'pointer'}}>
            + UZA
          </button>
        </div>
      </div>

      <div style={{maxWidth:1200, margin:'0 auto', padding:'16px'}}>
        {isPaid && paidUntil && (
          <div style={{background:'#dcfce7', border:'1px solid #86efac', padding:10, borderRadius:12, marginBottom:12, fontSize:13}}>
            ✅ Umalipo wako unatumika mpaka: <b>{paidUntil.toLocaleDateString('sw-TZ')}</b>. Unaweza kuweka bidhaa zote bila kikomo.
          </div>
        )}
        {!isPaid && (
          <div style={{background:'white', padding:12, borderRadius:12, marginBottom:12, display:'flex', justifyContent:'space-between', alignItems:'center'}}>
            <span style={{fontSize:14}}>💡 Jiunge <b>BURE</b> kutazama. Kuza unalipa <b>TZS 5,000 / mwezi</b> kuweka bidhaa zote.</span>
            <button onClick={()=>setShowPay(true)} style={{background:'#111827', color:'white', border:0, padding:'8px 14px', borderRadius:20, fontSize:12}}>Kuwa Muuzaji</button>
          </div>
        )}

        <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(170px,1fr))', gap:12}}>
          {filtered.map(p=>(
            <div key={p.id} style={{background:'white', borderRadius:16, overflow:'hidden', boxShadow:'0 2px 10px rgba(0,0,0,.06)', display:'flex', flexDirection:'column'}}>
              <img src={p.picha} style={{width:'100%', height:180, objectFit:'cover'}}/>
              <div style={{padding:10, flex:1, display:'flex', flexDirection:'column'}}>
                <div style={{fontSize:11, background:'#f3f4f6', display:'inline-block', padding:'2px 8px', borderRadius:10, width:'fit-content'}}>{p.category}</div>
                <div style={{fontWeight:700, fontSize:14, marginTop:6, lineHeight:1.2, height:34, overflow:'hidden'}}>{p.jina}</div>
                <div style={{color:'#16a34a', fontWeight:900, marginTop:6}}>TZS {Number(p.bei).toLocaleString()}</div>
                <div style={{fontSize:11, color:'#6b7280', marginTop:4, height:28, overflow:'hidden'}}>{p.maelezo}</div>
                <a href={`https://wa.me/${p.whatsapp}?text=Habari, nimeona ${encodeURIComponent(p.jina)} Wafla Market`} target="_blank" style={{marginTop:10, background:'#25D366', color:'white', textAlign:'center', padding:'9px', borderRadius:10, textDecoration:'none', fontWeight:800, fontSize:13}}>WhatsApp</a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showPost && (
        <div style={{position:'fixed', inset:0, background:'rgba(0,0,0,.6)', display:'flex', alignItems:'center', justifyContent:'center', zIndex:50, padding:12}}>
          <form onSubmit={handlePost} style={{background:'white', padding:20, borderRadius:20, width:'100%', maxWidth:440, maxHeight:'90vh', overflowY:'auto'}}>
            <h2 style={{marginTop:0}}>Weka Bidhaa Mpya</h2>
            <label style={label}>Picha ya Bidhaa *</label>
            <input type="file" accept="image/*" onChange={onImage} required style={{marginBottom:10}}/>
            {form.picha && <img src={form.picha} style={{width:'100%', height:160, objectFit:'cover', borderRadius:12, marginBottom:10}}/>}
            <label style={label}>Jina *</label><input value={form.jina} onChange={e=>setForm({...form,jina:e.target.value})} placeholder="Mf: Gauni la harusi" style={inp} required/>
            <label style={label}>Bei TZS *</label><input value={form.bei} onChange={e=>setForm({...form,bei:e.target.value})} placeholder="35000" type="number" style={inp} required/>
            <label style={label}>Namba ya WhatsApp *</label><input value={form.whatsapp} onChange={e=>setForm({...form,whatsapp:e.target.value})} placeholder="2557..." style={inp} required/>
            <label style={label}>Aina</label>
            <select value={form.category} onChange={e=>setForm({...form,category:e.target.value})} style={inp}>
              <option>Mitindo</option><option>Simu</option><option>Samani</option><option>Viatu</option><option>Magari</option><option>Vyakula</option>
            </select>
            <label style={label}>Maelezo</label><textarea value={form.maelezo} onChange={e=>setForm({...form,maelezo:e.target.value})} placeholder="Ipo wapi, size, hali" style={{...inp,height:60}}/>
            <button type="submit" style={{width:'100%', padding:13, background:'#111827', color:'white', borderRadius:12, border:0, fontWeight:800, marginTop:8}}>Chapisha Sokoni (Bila kikomo)</button>
            <button type="button" onClick={()=>setShowPost(false)} style={{width:'100%', padding:10, background:'#f3f4f6', borderRadius:12, border:0, marginTop:8}}>Funga</button>
          </form>
        </div>
      )}

      {showPay && (
        <div style={{position:'fixed', inset:0, background:'rgba(0,0,0,.75)', display:'flex', alignItems:'center', justifyContent:'center', zIndex:60, padding:12}}>
          <div style={{background:'white', padding:22, borderRadius:20, width:'100%', maxWidth:380}}>
            <h2 style={{marginTop:0, textAlign:'center'}}>Kuwa Muuzaji Wafla</h2>
            <div style={{background:'#f9fafb', border:'1px solid #e5e7eb', padding:14, borderRadius:14, textAlign:'left', fontSize:14, lineHeight:1.5}}>
              <div>✅ Kujiunga kutazama ni <b>BURE</b></div>
              <div>✅ Kuza unalipa <b>TZS 5,000 / mwezi</b> tu</div>
              <div>✅ Baada ya kulipa unaweka <b>bidhaa zote</b> unazotaka</div>
              <div>✅ Wateja wanakupigia <b>WhatsApp moja kwa moja</b></div>
              <div style={{marginTop:12, padding:10, background:'white', borderRadius:10, border:'1px dashed #22c55e'}}>
                <div>Lipa hapa:</div>
                <div style={{fontWeight:900, color:'#16a34a'}}>M-PESA LIPA NAMBA: 123456</div>
                <div style={{fontSize:11, color:'#6b7280'}}>Badilisha hapo juu na Lipa yako halisi</div>
              </div>
            </div>
            <button onClick={handlePay} style={{width:'100%', padding:13, background:'#22c55e', color:'white', borderRadius:12, border:0, fontWeight:900, marginTop:14}}>✅ NIMELIPA - ANZA KUUZA</button>
            <button onClick={()=>setShowPay(false)} style={{width:'100%', padding:10, background:'#f3f4f6', borderRadius:12, border:0, marginTop:8}}>Baadaye</button>
          </div>
        </div>
      )}
    </div>
  )
}
const inp = {width:'100%', padding:'11px 12px', borderRadius:10, border:'1px solid #d1d5db', marginBottom:10, boxSizing:'border-box'}
const label = {fontSize:12, fontWeight:700, display:'block', marginBottom:4}
