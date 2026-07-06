import React from 'react';
import { SELLERS, TESTIMONIALS } from './data.js';
import { Particles, Stars } from './shared.jsx';
import { ArrowLeft, Search, Check } from './icons.jsx';
/* Sellers page */
const { useState, useEffect, useMemo } = React;

const SellersPage = ({initialActive=null}) => {
  const [active, setActive] = useState(initialActive);
  const [profileTab, setProfileTab] = useState('reviews');
  const [search, setSearch] = useState('');
  const seller = SELLERS.find(s=>s.id===active);
  const reviews = active ? (TESTIMONIALS[active]||[]) : [];
  const avgRating = reviews.length ? (reviews.reduce((s,r)=>s+r.rating,0)/reviews.length).toFixed(1) : null;

  if(active&&seller) return (
    <div style={{flex:1,overflowY:'auto',paddingBottom:80}} className="sh">
      {/* Profile header */}
      <div style={{background:'linear-gradient(180deg,#0D7E7A 0%,#14A09B 100%)',padding:'20px 16px 24px',position:'relative',overflow:'hidden'}}>
        <Particles/>
        <button onClick={()=>setActive(null)} style={{background:'rgba(255,255,255,0.12)',border:'none',width:36,height:36,borderRadius:11,display:'flex',alignItems:'center',justifyContent:'center',color:'#FFFFFF',marginBottom:16,position:'relative',zIndex:1}}><ArrowLeft size={17} strokeWidth={2.3}/></button>
        <div style={{display:'flex',gap:14,alignItems:'center',position:'relative',zIndex:1}}>
          <div style={{width:64,height:64,borderRadius:20,background:'var(--bg)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:32,flexShrink:0,boxShadow:'0 4px 16px rgba(0,0,0,0.3)'}}>{seller.avatar}</div>
          <div>
            <div style={{fontFamily:"'Baloo Bhaijaan 2',sans-serif",fontSize:22,fontWeight:700,color:'#FFFFFF'}}>{seller.name}</div>
            <div style={{display:'flex',alignItems:'center',gap:6,marginTop:2}}>
              <Stars rating={seller.rating} size={13}/>
              <span style={{fontSize:12,fontWeight:700,color:'#FF8A73'}}>{seller.rating}</span>
            </div>
            <div style={{display:'flex',gap:6,marginTop:6}}>
              <span style={{background:seller.badge==='Perfect Rating'?'rgba(255,106,85,0.25)':'rgba(20,160,155,0.2)',border:`1px solid ${seller.badge==='Perfect Rating'?'rgba(255,106,85,0.5)':'rgba(20,160,155,0.4)'}`,borderRadius:100,padding:'3px 10px',fontSize:10,fontWeight:700,color:seller.badge==='Perfect Rating'?'#FF8A73':'#7ED8D3'}}>
                {seller.badge==='Top Seller'?'🏆':seller.badge==='Power Seller'?'⚡':seller.badge==='Perfect Rating'?'⭐':seller.badge==='Verified'?'✓':''} {seller.badge}
              </span>
            </div>
          </div>
        </div>
        <div style={{display:'flex',gap:0,marginTop:20,background:'rgba(255,255,255,0.06)',borderRadius:14,position:'relative',zIndex:1}}>
          {[['Sales',seller.sales],[avgRating||'—','Rating'],['Since',seller.since.split(' ')[0]]].map(([v,l])=>(
            <div key={l} style={{flex:1,textAlign:'center',padding:'10px 4px',borderRight:'1px solid rgba(255,255,255,0.06)'}}>
              <div style={{fontFamily:"'Baloo Bhaijaan 2',sans-serif",fontSize:18,fontWeight:700,color:'#FF8A73'}}>{v}</div>
              <div style={{fontSize:10,color:'rgba(255,255,255,0.45)',fontWeight:500,marginTop:2}}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{padding:'16px'}}>
        <p style={{fontSize:13,color:'var(--ink2)',lineHeight:1.6,marginBottom:16,background:'#E9F6F5',borderRadius:14,padding:'12px 14px',border:'1px solid rgba(20,160,155,0.1)'}}>{seller.bio}</p>

        {/* Tabs */}
        <div style={{display:'flex',gap:6,marginBottom:16}}>
          {['reviews','listings','auctions'].map(t=>(
            <button key={t} onClick={()=>setProfileTab(t)} style={{flex:1,padding:'9px 4px',borderRadius:100,fontSize:12,fontWeight:600,background:profileTab===t?'#14A09B':'rgba(20,160,155,0.08)',color:profileTab===t?'#FFFFFF':'#14A09B',border:'none',textTransform:'capitalize'}}>
              {t==='reviews'?`Reviews (${reviews.length})`:t==='listings'?'Listings':'Auctions'}
            </button>
          ))}
        </div>

        {/* REVIEWS TAB */}
        {profileTab==='reviews'&&(
          <div>
            {/* Rating summary */}
            {reviews.length>0&&(
              <div style={{background:'var(--card)',borderRadius:18,padding:'16px',marginBottom:14,border:'1px solid rgba(255,106,85,0.15)'}}>
                <div style={{display:'flex',gap:16,alignItems:'center'}}>
                  <div style={{textAlign:'center'}}>
                    <div style={{fontFamily:"'Baloo Bhaijaan 2',sans-serif",fontSize:42,fontWeight:900,color:'#FF6A55',lineHeight:1}}>{avgRating}</div>
                    <Stars rating={parseFloat(avgRating)} size={16}/>
                    <div style={{fontSize:11,color:'var(--ink3)',marginTop:4}}>{reviews.length} reviews</div>
                  </div>
                  <div style={{flex:1}}>
                    {[5,4,3].map(n=>{
                      const cnt=reviews.filter(r=>r.rating===n).length;
                      const pct=Math.round(cnt/reviews.length*100);
                      return <div key={n} style={{display:'flex',alignItems:'center',gap:8,marginBottom:4}}>
                        <span style={{fontSize:11,color:'#FF6A55',width:8,fontWeight:700}}>{n}</span>
                        <div style={{flex:1,height:6,borderRadius:100,background:'rgba(255,106,85,0.12)',overflow:'hidden'}}><div style={{height:'100%',borderRadius:100,background:'linear-gradient(90deg,#E8513C,#FF6A55)',width:`${pct}%`,transition:'width .6s'}}/></div>
                        <span style={{fontSize:10,color:'var(--ink3)',width:28,textAlign:'right'}}>{pct}%</span>
                      </div>;
                    })}
                  </div>
                </div>
              </div>
            )}
            {reviews.map((r,i)=>(
              <div key={r.id} className={`s${Math.min(i+1,9)}`} style={{background:'var(--card)',borderRadius:16,padding:'14px',marginBottom:10,border:'1px solid rgba(20,160,155,0.08)',animation:'fadeUp .4s ease-out both'}}>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:8}}>
                  <div>
                    <Stars rating={r.rating} size={13}/>
                    <div style={{fontFamily:"'Baloo Bhaijaan 2',sans-serif",fontSize:13,fontWeight:600,color:'var(--ink)',marginTop:2}}>{r.reviewer}</div>
                  </div>
                  <div style={{textAlign:'right'}}>
                    <div style={{fontSize:10,color:'var(--ink3)'}}>{r.date}</div>
                    {r.verified&&<div style={{display:'flex',alignItems:'center',gap:3,justifyContent:'flex-end',marginTop:2}}><Check size={10} style={{color:'#14A09B'}}/><span style={{fontSize:9,color:'#14A09B',fontWeight:600}}>Verified Buyer</span></div>}
                  </div>
                </div>
                <p style={{fontSize:13,color:'var(--ink2)',lineHeight:1.6,fontStyle:'italic'}}>"{r.text}"</p>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginTop:10,paddingTop:8,borderTop:'1px solid rgba(20,160,155,0.07)'}}>
                  <span style={{fontSize:11,color:'var(--ink3)'}}>Item: <strong>{r.item}</strong></span>
                  <div style={{display:'flex',alignItems:'center',gap:4}}>
                    <span style={{fontSize:10,color:'var(--ink3)'}}>👍 {r.helpful} helpful</span>
                  </div>
                </div>
              </div>
            ))}
            {reviews.length===0&&<div style={{textAlign:'center',padding:'32px',color:'var(--ink3)'}}><div style={{fontSize:32,marginBottom:8}}>💬</div><p>No reviews yet</p></div>}
          </div>
        )}
        {(profileTab==='listings'||profileTab==='auctions')&&(
          <div style={{textAlign:'center',padding:'48px 24px'}}>
            <div style={{fontSize:40,marginBottom:12,animation:'floatSlow 4s ease-in-out infinite'}}>{profileTab==='listings'?'📦':'⚡'}</div>
            <div style={{fontFamily:"'Baloo Bhaijaan 2',sans-serif",fontSize:18,fontWeight:600,color:'var(--ink)',marginBottom:6}}>No {profileTab} yet</div>
            <p style={{fontSize:13,color:'var(--ink3)'}}>Check back soon — {seller.name.split(' ')[0]} is preparing new items.</p>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div style={{flex:1,overflowY:'auto',paddingBottom:80}} className="sh">
      <div style={{background:'linear-gradient(180deg,#0A3540 0%,#0D7E7A 100%)',padding:'58px 16px 18px',position:'sticky',top:0,zIndex:10}}>
        <h1 style={{fontFamily:"'Baloo Bhaijaan 2',sans-serif",fontSize:26,fontWeight:900,color:'#FFFFFF',marginBottom:12}}>🌟 <span className="text-gold">Sellers</span></h1>
        <div style={{display:'flex',alignItems:'center',gap:10,background:'rgba(255,255,255,0.05)',border:'1px solid rgba(255,106,85,0.15)',borderRadius:14,padding:'12px 14px'}}>
          <Search size={15} strokeWidth={2.3} style={{color:'rgba(255,106,85,0.6)',flexShrink:0}}/>
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search sellers…" style={{background:'transparent',border:'none',color:'#FFFFFF',fontSize:14,width:'100%',fontFamily:"'Rubik',sans-serif"}}/>
        </div>
      </div>
      <div style={{padding:'14px 16px'}}>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10}}>
          {SELLERS.filter(s=>!search||s.name.toLowerCase().includes(search.toLowerCase())).map((s,i)=>(
            <button key={s.id} onClick={()=>{setActive(s.id);setProfileTab('reviews');}} className={`card-press s${i+1}`} style={{background:'var(--card)',borderRadius:18,padding:'16px',textAlign:'left',border:'1px solid rgba(20,160,155,0.1)',animation:'fadeUp .4s ease-out both'}}>
              <div style={{width:44,height:44,borderRadius:14,background:'linear-gradient(135deg,#BFE7E4,#7ED8D3)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:22,marginBottom:10}}>{s.avatar}</div>
              <div style={{fontFamily:"'Baloo Bhaijaan 2',sans-serif",fontSize:15,fontWeight:700,color:'var(--ink)',marginBottom:2}}>{s.name}</div>
              <div style={{display:'flex',alignItems:'center',gap:4,marginBottom:6}}>
                <Stars rating={s.rating} size={11}/>
                <span style={{fontSize:11,fontWeight:700,color:'#FF6A55'}}>{s.rating}</span>
              </div>
              <div style={{fontSize:10,color:'var(--ink3)',marginBottom:8}}>{s.sales} sales · Unit {s.unit}</div>
              <div style={{background:s.badge==='Top Seller'||s.badge==='Power Seller'?'rgba(255,106,85,0.12)':'rgba(20,160,155,0.1)',borderRadius:100,padding:'3px 8px',display:'inline-block'}}>
                <span style={{fontSize:9,fontWeight:700,color:s.badge==='Perfect Rating'?'#FF6A55':s.badge==='Top Seller'||s.badge==='Power Seller'?'#E8513C':'#14A09B'}}>{s.badge}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};


export { SellersPage };
