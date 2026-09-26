"use client"
import { useEffect, useState } from "react"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  "https://exwdildhebdrweqpdjkb.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV4d2RpbGRoZWJkcndlcXBkamtiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTAwMjM5NTYsImV4cCI6MjEwNTU5OTk1Nn0.Exr_ee5ghi84jp4YZtTahfJKS2fO0p-KAUNVNHFzdak"
)

const demoProducts = [
  { name: "Fresh Nile Perch", price: 12000, unit: "/ kg", rating: "4.8", sold: "24 sold", image: "https://images.unsplash.com/photo-1580476262798-bddd9f4b7369?w=500" },
  { name: "Kanga Fabric", price: 8500, unit: "/ piece", rating: "4.9", sold: "56 sold", image: "https://images.unsplash.com/photo-1590732596287-9b7e3ff2a9d6?w=500" },
  { name: "Mangoes", price: 3000, unit: "/ kg", rating: "4.6", sold: "102 sold", image: "https://images.unsplash.com/photo-1591424238567-6d0d88a9a9d9?w=500" },
  { name: "Woven Basket", price: 15000, unit: "/ piece", rating: "4.7", sold: "18 sold", image: "https://images.unsplash.com/photo-1596161290887-9a2b9d9a8d9c?w=500" },
]

export default function WaflaMarket(){
  const [products,setProducts]=useState<any[]>(demoProducts)
  const [cartCount,setCartCount]=useState(2)

  useEffect(()=>{
    supabase.from("products").select("*").then(r=>{
      if(r.data && r.data.length>0) setProducts(r.data.map((p:any)=>({...p, unit:"/ piece", rating:"4.8", sold:"10 sold"})))
    })
  },[])

  return (
    <div className="min-h-screen bg-white max-w-[430px] mx-auto relative pb-24">
      {/* Header */}
      <div className="flex justify-between items-center p-4">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-[#1a1f4d] rounded-full flex items-center justify-center">🧺</div>
          <h1 className="font-black text-xl leading-none text-[#1a1f4d]">WAFLA<br/>MARKET</h1>
        </div>
        <div className="flex gap-4 text-xl">
          <span>🔔</span>
          <span className="relative">🛒<span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">{cartCount}</span></span>
        </div>
      </div>

      {/* Location */}
      <div className="mx-4 bg-[#fff7e6] p-3 rounded-full flex items-center gap-2 border">
        <span>📍</span><span className="text-sm">Mwanza, Tanzania</span><span>⌄</span>
      </div>

      {/* Kanga border */}
      <div className="h-3 w-full my-3" style={{background:"repeating-linear-gradient(90deg, #e67e22, #e67e22 20px, #1a1f4d 20px, #1a1f4d 40px, #f1c40f 40px, #f1c40f 60px)"}}></div>

      {/* Search */}
      <div className="mx-4 bg-[#fff7e6] p-3 rounded-xl flex items-center gap-2">
        <span>🔍</span>
        <input placeholder="Search fish, fabrics, produce..." className="bg-transparent flex-1 outline-none text-sm"/>
        <span>🎙️</span><span>⚙️</span>
      </div>

      {/* Popular */}
      <div className="flex justify-between items-center p-4 mt-2">
        <h2 className="font-bold text-lg">Popular in Mwanza</h2>
        <span className="text-orange-600 font-bold text-sm">See all</span>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-2 gap-4 px-4">
        {products.map((p,i)=>(
          <div key={i} className="bg-white rounded-2xl shadow border p-2">
            <img src={p.image_url || p.image} className="h-32 w-full object-cover rounded-xl"/>
            <h3 className="font-bold text-sm mt-2">{p.name}</h3>
            <p className="text-orange-600 font-bold text-sm">TZS {p.price?.toLocaleString()} {p.unit}</p>
            <div className="flex justify-between items-center mt-1">
              <span className="text-xs">⭐ {p.rating} · {p.sold}</span>
              <button onClick={()=>setCartCount(c=>c+1)} className="w-7 h-7 bg-orange-500 text-white rounded-full">+</button>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom kanga + nav */}
      <div className="fixed bottom-0 left-0 right-0 max-w-[430px] mx-auto bg-white border-t">
        <div className="h-3 w-full" style={{background:"repeating-linear-gradient(90deg, #e67e22, #e67e22 20px, #1a1f4d 20px, #1a1f4d 40px, #f1c40f 40px, #f1c40f 60px)"}}></div>
        <div className="flex justify-around items-center p-2">
          <span className="flex flex-col items-center text-orange-600"><span>🏠</span><span className="text-[11px]">Home</span></span>
          <span className="flex flex-col items-center"><span>🧭</span><span className="text-[11px]">Explore</span></span>
          <span className="w-12 h-12 bg-[#1a1f4d] rounded-full flex items-center justify-center text-white text-xl">+</span>
          <span className="flex flex-col items-center"><span>💬</span><span className="text-[11px]">Inbox</span></span>
          <span className="flex flex-col items-center"><span>👤</span><span className="text-[11px]">Me</span></span>
        </div>
      </div>
    </div>
  )
   }
