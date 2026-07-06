import React from 'react';
import { CATS, LISTINGS } from './data.js';
import { ItemImage } from './shared.jsx';
import { ArrowLeft, Search, X, Bell } from './icons.jsx';
import { SellSheet } from './page-sell.jsx';
import { NotifSheet, NOTIFS } from './pages-home.jsx';
/* Market + Category pages */
const { useState, useEffect, useMemo } = React;

const CategoryPage = ({cat, onBack, onItemSelect}) => {
  const [following, setFollowing] = useState(false);
  const [toast, setToast] = useState(false);
  const items = LISTINGS.filter(l=>l.catId===cat.id);

  const handleFollow = () => {
    const next = !following;
    setFollowing(next);
    setToast(true);
    setTimeout(()=>setToast(false), 2800);
  };

  const fmt = (p, u) => `EGP ${Number(p.toFixed(2))}${u}`;

  return (
    <div style={{flex:1,overflowY:'auto',paddingBottom:90}} className="sh">
      {/* Header */}
      <header style={{padding:'54px 16px 14px',position:'sticky',top:0,zIndex:10,background:'var(--bg)'}}>
        <div style={{display:'flex',alignItems:'center',gap:12}}>
          <button onClick={onBack} className="btn-icon-teal" style={{width:36,height:36,borderRadius:11,display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
            <ArrowLeft size={17} strokeWidth={2.3}/>
          </button>
          <div style={{width:40,height:40,borderRadius:13,background:cat.bg,display:'flex',alignItems:'center',justifyContent:'center',fontSize:22,flexShrink:0}}>
            {cat.emoji}
          </div>
          <div style={{flex:1}}>
            <div style={{fontFamily:"'Baloo Bhaijaan 2',sans-serif",fontSize:18,fontWeight:700,lineHeight:1.2}}>{cat.name}</div>
            <div style={{fontSize:11,color:'var(--ink3)'}}>{items.length} listing{items.length!==1?'s':''} · {cat.members} watching</div>
          </div>
          {/* Follow / Notification bell */}
          <button onClick={handleFollow} className={following?'btn-icon-teal':'btn-ghost-em'} style={{borderRadius:100,padding:'7px 12px',display:'flex',alignItems:'center',gap:6,flexShrink:0}}>
            <span style={{fontSize:14}}>{following?'🔔':'🔕'}</span>
            <span style={{fontSize:11,fontWeight:700,color:following?'#14A09B':'var(--ink3)'}}>{following?'Following':'Follow'}</span>
          </button>
        </div>
      </header>

      {/* Toast */}
      {toast&&(
        <div style={{position:'fixed',top:80,left:'50%',transform:'translateX(-50%)',zIndex:50,background:'#14A09B',color:'#FFFFFF',borderRadius:100,padding:'10px 20px',fontSize:13,fontWeight:600,boxShadow:'0 6px 20px rgba(20,160,155,0.35)',animation:'fadeUp .25s ease-out',whiteSpace:'nowrap'}}>
          {following?`🔔 Notified when new listings in ${cat.name}`:`🔕 Unfollowed ${cat.name}`}
        </div>
      )}

      {/* Follow hint */}
      {!following&&(
        <div style={{margin:'0 16px 14px',background:'rgba(20,160,155,0.06)',border:'1px solid rgba(20,160,155,0.12)',borderRadius:14,padding:'10px 14px',display:'flex',alignItems:'center',gap:10}}>
          <span style={{fontSize:18}}>🔕</span>
          <p style={{fontSize:12,color:'var(--ink2)',lineHeight:1.5}}>Follow to get notified when new items are listed in <strong>{cat.name}</strong>.</p>
        </div>
      )}

      <div style={{padding:'0 16px'}}>
        {items.length===0 ? (
          <div style={{textAlign:'center',padding:'52px 24px'}}>
            <div style={{width:90,height:90,borderRadius:26,background:cat.bg,display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 20px',fontSize:46,animation:'floatSlow 4s ease-in-out infinite',boxShadow:`0 10px 28px ${cat.bg}bb`}}>
              {cat.emoji}
            </div>
            <h2 style={{fontFamily:"'Baloo Bhaijaan 2',sans-serif",fontSize:22,fontWeight:700,marginBottom:8}}>No items listed yet</h2>
            <p style={{fontSize:14,color:'var(--ink3)',lineHeight:1.65,marginBottom:6}}>Be the first to post in <strong style={{color:cat.c}}>{cat.name}</strong>.</p>
            <p style={{fontSize:12,color:'var(--ink3)',marginBottom:28}}>{cat.members} neighbors are watching this category.</p>
            {!following&&(
              <button onClick={handleFollow} style={{display:'flex',alignItems:'center',gap:7,background:'rgba(20,160,155,0.08)',border:'1px solid rgba(20,160,155,0.2)',borderRadius:100,padding:'10px 20px',margin:'0 auto 16px',color:'#14A09B',fontWeight:700,fontSize:13}}>
                🔔 Follow — get notified first
              </button>
            )}
            {following&&(
              <div style={{display:'inline-flex',alignItems:'center',gap:7,background:'rgba(20,160,155,0.1)',border:'1px solid rgba(20,160,155,0.25)',borderRadius:100,padding:'10px 20px',color:'#14A09B',fontWeight:700,fontSize:13}}>
                🔔 You'll be notified of new listings
              </div>
            )}
          </div>
        ) : (
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12}}>
            {items.map((item,i)=>(
              <div key={item.id} onClick={()=>onItemSelect&&onItemSelect(item)} className={`cp s${Math.min(i+1,9)}`} style={{background:'var(--card)',borderRadius:18,overflow:'hidden',border:'1px solid rgba(20,160,155,0.08)',animation:'fadeUp .3s ease-out both',cursor:'pointer'}}>
                <div style={{height:110,background:item.bg,position:'relative',overflow:'hidden'}}>
                  <ItemImage src={item.img} emoji={item.emoji} bg={item.bg} fontSize={50} style={{position:'absolute',inset:0}}/>
                  {item.tag&&<div style={{position:'absolute',bottom:6,left:8,background:'#14A09B',color:'#FFFFFF',fontSize:9,fontWeight:700,letterSpacing:'0.08em',padding:'3px 8px',borderRadius:100}}>{item.tag}</div>}
                </div>
                <div style={{padding:'12px'}}>
                  <div style={{fontFamily:"'Baloo Bhaijaan 2',sans-serif",fontSize:14,fontWeight:700,lineHeight:1.3,marginBottom:3}}>{item.name}</div>
                  <div style={{fontSize:11,color:'var(--ink3)',marginBottom:6}}>{item.seller} · Unit {item.unit_}</div>
                  <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                    <div style={{fontFamily:"'Baloo Bhaijaan 2',sans-serif",fontSize:16,fontWeight:700,color:'#14A09B'}}>{fmt(item.price,item.unit)}</div>
                    <div style={{fontSize:10,color:'var(--ink3)'}}>{item.posted}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

/* ─── MARKET / BROWSE PAGE ───────────────────────────── */
const BrowsePage = ({onCatSelect, onItemSelect, onSellersOpen}) => {
  const [selCat, setSelCat]   = useState('all');
  const [search, setSearch]   = useState('');
  const [modal, setModal]     = useState(false);
  const [showNotifs, setShowNotifs] = useState(false);

  const filtered = (() => {
    let list = selCat==='all' ? LISTINGS : LISTINGS.filter(l=>l.catId===selCat);
    if(search) list = list.filter(l=>l.name.toLowerCase().includes(search.toLowerCase())||l.seller.toLowerCase().includes(search.toLowerCase()));
    return list;
  })();

  const fmt = (p,u) => `EGP ${Number(p.toFixed(2))}${u}`;

  return (
    <div style={{flex:1,overflowY:'auto',paddingBottom:90}} className="sh">
      {/* Header */}
      <header style={{padding:'54px 16px 12px',position:'sticky',top:0,zIndex:10,background:'linear-gradient(180deg,#0D7E7A 0%,#14A09B 100%)',overflow:'hidden'}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:12}}>
          <div style={{fontFamily:"'Baloo Bhaijaan 2',sans-serif",fontSize:20,fontWeight:700,color:'#FFFFFF'}}><span style={{fontSize:34,lineHeight:2,position:'relative',top:10}}>🏪 Market</span></div>
          <div style={{display:'flex',gap:8,alignItems:'center'}}>
            <button onClick={()=>onSellersOpen&&onSellersOpen()} style={{display:'flex',alignItems:'center',gap:5,background:'rgba(255,255,255,0.14)',border:'1px solid rgba(255,255,255,0.22)',borderRadius:100,padding:'8px 14px',fontSize:11,fontWeight:700,color:'#FFFFFF'}}>🌟 Sellers</button>
            <button onClick={()=>setShowNotifs(true)} aria-label="Notifications" style={{position:'relative',width:36,height:36,borderRadius:12,background:'rgba(255,255,255,0.14)',border:'1px solid rgba(255,255,255,0.22)',color:'#FFFFFF',display:'flex',alignItems:'center',justifyContent:'center'}}>
              <Bell size={16} strokeWidth={2}/>
              {NOTIFS.filter(n=>n.unread).length>0&&<span style={{position:'absolute',top:-4,right:-4,minWidth:15,height:15,borderRadius:100,background:'#E8513C',color:'#fff',fontSize:9,fontWeight:800,display:'flex',alignItems:'center',justifyContent:'center',padding:'0 4px'}}>{NOTIFS.filter(n=>n.unread).length}</span>}
            </button>
          </div>
        </div>
        {/* Search */}
        <div className="iwl" style={{display:'flex',alignItems:'center',gap:10,background:'rgba(255,255,255,0.14)',border:'1px solid rgba(255,255,255,0.22)',borderRadius:15,padding:'11px 14px',marginBottom:10}}>
          <Search size={15} strokeWidth={2.3} style={{color:'rgba(255,255,255,0.75)',flexShrink:0}}/>
          <input type="text" className="lp" value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search listings…" style={{background:'transparent',border:'none',color:'#FFFFFF',fontSize:14,width:'100%',fontFamily:"'Rubik',sans-serif"}}/>
          {search&&<button onClick={()=>setSearch('')} style={{background:'transparent',border:'none',color:'#FFFFFF',display:'flex'}}><X size={13}/></button>}
        </div>
        {/* Category chips */}
        <div style={{overflowX:'auto',display:'flex',gap:6,paddingBottom:4}} className="sh">
          <button onClick={()=>setSelCat('all')} style={{flexShrink:0,display:'flex',alignItems:'center',gap:5,padding:'6px 13px',borderRadius:100,fontSize:12,fontWeight:700,letterSpacing:'0.03em',background:selCat==='all'?'linear-gradient(135deg,#FF6A55,#FF8A73)':'rgba(255,255,255,0.12)',color:selCat==='all'?'#0E4B54':'#FFFFFF',border:`1px solid ${selCat==='all'?'transparent':'rgba(255,255,255,0.22)'}`,boxShadow:selCat==='all'?'0 3px 12px rgba(255,106,85,0.35)':'none',whiteSpace:'nowrap',transition:'all .2s'}}>
            🌐 All
          </button>
          {CATS.map(c=>{
            const act=selCat===c.id;
            const count=LISTINGS.filter(l=>l.catId===c.id).length;
            return (
              <button key={c.id} onClick={()=>onCatSelect(c)} style={{flexShrink:0,display:'flex',alignItems:'center',gap:5,padding:'6px 11px',borderRadius:100,fontSize:11,fontWeight:600,background:act?'linear-gradient(135deg,#FF6A55,#FF8A73)':'rgba(255,255,255,0.12)',color:act?'#0E4B54':'#FFFFFF',border:`1px solid ${act?'transparent':'rgba(255,255,255,0.22)'}`,whiteSpace:'nowrap',position:'relative'}}>
                <span>{c.emoji}</span><span>{c.name}</span>
                {count>0&&<span style={{background:act?'rgba(10,53,64,0.18)':'rgba(255,255,255,0.18)',borderRadius:100,padding:'0 5px',fontSize:9,fontWeight:700}}>{count}</span>}
              </button>
            );
          })}
        </div>
      </header>

      <div style={{padding:'8px 16px'}}>
        {/* Result count */}
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:12}}>
          <div style={{fontFamily:"'Baloo Bhaijaan 2',sans-serif",fontSize:16,fontWeight:700}}>
            {selCat==='all'?'All Listings':CATS.find(c=>c.id===selCat)?.name}
          </div>
          <div style={{fontSize:12,color:'var(--ink3)',whiteSpace:'nowrap'}}>{filtered.length} item{filtered.length!==1?'s':''}</div>
        </div>

        {filtered.length===0 ? (
          <div style={{textAlign:'center',padding:'52px 24px'}}>
            <div style={{fontSize:52,marginBottom:16,animation:'floatSlow 4s ease-in-out infinite'}}>
              {selCat==='all'?'🏪':CATS.find(c=>c.id===selCat)?.emoji||'📦'}
            </div>
            <h2 style={{fontFamily:"'Baloo Bhaijaan 2',sans-serif",fontSize:22,fontWeight:700,marginBottom:8}}>
              {search?'Nothing found':'No listings for now'}
            </h2>
            <p style={{fontSize:14,color:'var(--ink3)',lineHeight:1.65,marginBottom:24}}>
              {search?`No results for "${search}"`:'Be the first to post something in this category.'}
            </p>
            {selCat!=='all'&&!search&&(
              <button onClick={()=>onCatSelect(CATS.find(c=>c.id===selCat))} style={{display:'flex',alignItems:'center',gap:7,background:'rgba(20,160,155,0.08)',border:'1px solid rgba(20,160,155,0.2)',borderRadius:100,padding:'10px 20px',margin:'0 auto 12px',color:'#14A09B',fontWeight:700,fontSize:13}}>
                🔔 Follow {CATS.find(c=>c.id===selCat)?.name} — get notified
              </button>
            )}
            <button onClick={()=>setModal(true)} className="btn-em" style={{padding:'12px 28px',borderRadius:100,fontSize:13,boxShadow:'0 4px 14px rgba(20,160,155,0.3)'}}>
              + Post a Listing
            </button>
          </div>
        ) : (
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12}}>
            {filtered.map((item,i)=>(
              <div key={item.id} onClick={()=>onItemSelect&&onItemSelect(item)} className={`cp s${Math.min(i+1,9)}`} style={{background:'var(--card)',borderRadius:18,overflow:'hidden',border:'1px solid rgba(20,160,155,0.07)',animation:'fadeUp .3s ease-out both',cursor:'pointer'}}>
                <div style={{height:104,background:item.bg,position:'relative',overflow:'hidden'}}>
                  <ItemImage src={item.img} emoji={item.emoji} bg={item.bg} fontSize={46} style={{position:'absolute',inset:0}}/>
                  {item.tag&&<div style={{position:'absolute',bottom:5,left:7,background:'#14A09B',color:'#FFFFFF',fontSize:9,fontWeight:700,padding:'2px 7px',borderRadius:100}}>{item.tag}</div>}
                </div>
                <div style={{padding:'11px'}}>
                  <div style={{fontFamily:"'Baloo Bhaijaan 2',sans-serif",fontSize:13,fontWeight:700,lineHeight:1.3,marginBottom:2}}>{item.name}</div>
                  <div style={{fontSize:10,color:'var(--ink3)',marginBottom:6}}>{item.seller} · Unit {item.unit_}</div>
                  <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                    <div style={{fontFamily:"'Baloo Bhaijaan 2',sans-serif",fontSize:15,fontWeight:700,color:'#14A09B'}}>{fmt(item.price,item.unit)}</div>
                    <div style={{fontSize:10,color:'var(--ink3)',whiteSpace:'nowrap'}}>{item.posted}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {modal&&<SellSheet onClose={()=>setModal(false)} onPosted={()=>setSelCat('all')}/>}
      {showNotifs&&<NotifSheet onClose={()=>setShowNotifs(false)}/>}
    </div>
  );
};


export { CategoryPage, BrowsePage };
