import React from 'react';
import { CATS, MY_LISTINGS } from './data.js';
import { api } from './api.js';
import { ItemImage, Particles, Counter } from './shared.jsx';
import { X, Bell, Check, ChevronRight } from './icons.jsx';
/* Home page */
const { useState, useEffect, useMemo } = React;

// Demo notifications removed — real notifications arrive with push (Phase 4b).
const NOTIFS = [];

const NotifSheet = ({onClose}) => (
  <div style={{position:'fixed',inset:0,zIndex:50,display:'flex',alignItems:'flex-end',justifyContent:'center',background:'rgba(10,53,64,0.6)',backdropFilter:'blur(4px)',animation:'fadeIn .25s ease-out'}} onClick={onClose}>
    <div className="su" style={{width:'100%',maxWidth:440,background:'var(--bg)',borderRadius:'26px 26px 0 0',padding:'24px 22px 44px',maxHeight:'70vh',overflowY:'auto'}} onClick={e=>e.stopPropagation()}>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:16}}>
        <h3 style={{fontFamily:"'Baloo Bhaijaan 2',sans-serif",fontSize:20,fontWeight:700}}>Notifications</h3>
        <button onClick={onClose} className="btn-icon-teal" style={{width:34,height:34,borderRadius:10,display:'flex',alignItems:'center',justifyContent:'center'}}><X size={15}/></button>
      </div>
      <div style={{display:'flex',flexDirection:'column',gap:8}}>
        {NOTIFS.map(n=>(
          <div key={n.id} style={{display:'flex',gap:12,alignItems:'flex-start',background:n.unread?'var(--card)':'transparent',border:n.unread?'1px solid rgba(255,106,85,0.15)':'1px solid transparent',borderRadius:14,padding:'12px 14px'}}>
            <span style={{fontSize:20,flexShrink:0}}>{n.icon}</span>
            <div style={{flex:1,minWidth:0}}>
              <div style={{display:'flex',alignItems:'baseline',gap:8}}>
                <span style={{fontSize:13,fontWeight:700,color:'var(--ink)',flex:1}}>{n.title}</span>
                <span style={{fontSize:10,color:'var(--ink3)',flexShrink:0}}>{n.time}</span>
              </div>
              <p style={{fontSize:12,color:'var(--ink2)',lineHeight:1.5,marginTop:2}}>{n.body}</p>
            </div>
            {n.unread&&<span style={{width:7,height:7,borderRadius:'50%',background:'#E8513C',flexShrink:0,marginTop:5}}></span>}
          </div>
        ))}
      </div>
    </div>
  </div>
);

/* ---- Advertise-with-us application sheet ---- */
const AdApplySheet = ({onClose, slot}) => {
  const [form, setForm] = useState({name:'', contact:'', message:''});
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');
  const set = (k) => (e) => setForm(f=>({...f,[k]:e.target.value}));
  const canSubmit = form.name.trim() && form.contact.trim() && !busy;
  const submit = async () => {
    if(!canSubmit) return;
    setErr(''); setBusy(true);
    try { await api.applyAd({...form, slot}); setSent(true); }
    catch(e){ setErr(e.message||'Could not send — please try again.'); }
    finally { setBusy(false); }
  };
  const inputStyle = {width:'100%',boxSizing:'border-box',background:'var(--card)',border:'1px solid rgba(20,160,155,0.25)',borderRadius:12,padding:'12px 14px',fontSize:13,color:'var(--ink)',outline:'none',fontFamily:'inherit'};
  return (
    <div style={{position:'fixed',inset:0,zIndex:50,display:'flex',alignItems:'flex-end',justifyContent:'center',background:'rgba(10,53,64,0.6)',backdropFilter:'blur(4px)',animation:'fadeIn .25s ease-out'}} onClick={onClose}>
      <div className="su" style={{width:'100%',maxWidth:440,background:'var(--bg)',borderRadius:'26px 26px 0 0',padding:'24px 22px 44px'}} onClick={e=>e.stopPropagation()}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:14}}>
          <h3 style={{fontFamily:"'Baloo Bhaijaan 2',sans-serif",fontSize:20,fontWeight:700}}>Advertise on Karro</h3>
          <button onClick={onClose} className="btn-icon-teal" style={{width:34,height:34,borderRadius:10,display:'flex',alignItems:'center',justifyContent:'center'}}><X size={15}/></button>
        </div>
        {sent ? (
          <div style={{textAlign:'center',padding:'22px 8px 10px',animation:'fadeUp .35s ease-out both'}}>
            <div style={{width:58,height:58,borderRadius:'50%',background:'linear-gradient(135deg,#14A09B,#0D7E7A)',display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 14px',color:'#fff'}}><Check size={26} strokeWidth={3}/></div>
            <div style={{fontFamily:"'Baloo Bhaijaan 2',sans-serif",fontSize:18,fontWeight:700,marginBottom:6}}>Application submitted!</div>
            <p style={{fontSize:13,color:'var(--ink2)',lineHeight:1.55}}>Thanks, {form.name.trim()}. Our team will review your request and contact you within 2 business days.</p>
            <button onClick={onClose} className="btn-gold" style={{marginTop:18,padding:'11px 28px',borderRadius:100,fontSize:13}}>Done</button>
          </div>
        ) : (
          <div style={{display:'flex',flexDirection:'column',gap:10}}>
            <p style={{fontSize:12.5,color:'var(--ink2)',lineHeight:1.55,marginBottom:2}}>Get your business in front of the whole neighborhood. Fill in the form and we'll get back to you.</p>
            <input value={form.name} onChange={set('name')} placeholder="Business / brand name" style={inputStyle}/>
            <input value={form.contact} onChange={set('contact')} placeholder="Phone or email" style={inputStyle}/>
            <textarea value={form.message} onChange={set('message')} placeholder="What would you like to advertise? (optional)" rows={3} style={{...inputStyle,resize:'none'}}></textarea>
            {err&&<p style={{fontSize:12,color:'#E8513C',fontWeight:600}}>{err}</p>}
            <button onClick={submit} disabled={!canSubmit} className="btn-gold" style={{padding:'13px',borderRadius:100,fontSize:14,fontWeight:700,marginTop:4,opacity:canSubmit?1:0.45}}>{busy?'Sending…':'Submit application'}</button>
          </div>
        )}
      </div>
    </div>
  );
};

/* ---- "Your ad here" slot boxes ---- */
const AdSlot = ({onApply, slot, height=88}) => (
  <button onClick={()=>onApply(slot)} className="cp" style={{width:'100%',height,border:'1.5px dashed rgba(20,160,155,0.45)',background:'rgba(20,160,155,0.05)',borderRadius:18,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:4,animation:'fadeUp .5s ease-out both'}}>
    <div style={{fontSize:12.5,fontWeight:700,color:'#14A09B',display:'flex',alignItems:'center',gap:6}}><span style={{fontSize:15}}>📣</span> Add your advertisement here</div>
    <div style={{fontSize:10.5,color:'var(--ink3)'}}>Click to apply — we'll review your submission</div>
  </button>
);

/* ---- Swipeable ad carousel (auto-advances, snap-scroll) ---- */
const AdCarousel = ({onApply}) => {
  const ref = React.useRef(null);
  const [idx, setIdx] = useState(0);
  const slides = [1,2,3].map(n=>({key:`ad-${n}`, n, onClick:()=>onApply(`home-carousel-${n}`)}));
  useEffect(()=>{
    const t = setInterval(()=>{
      const el = ref.current; if(!el) return;
      const w = el.clientWidth;
      const next = (Math.round(el.scrollLeft/w)+1) % slides.length;
      el.scrollTo({left:next*w, behavior:'smooth'});
    }, 3800);
    return ()=>clearInterval(t);
  },[]);
  const onScroll = e => setIdx(Math.round(e.currentTarget.scrollLeft/e.currentTarget.clientWidth));
  return (
    <div>
      <div ref={ref} onScroll={onScroll} className="sh" style={{display:'flex',overflowX:'auto',scrollSnapType:'x mandatory',gap:0}}>
        {slides.map(s=>(
          <div key={s.key} style={{flexShrink:0,width:'100%',scrollSnapAlign:'start',padding:'0 16px',boxSizing:'border-box'}}>
            <button onClick={s.onClick} className="cp" style={{width:'100%',height:92,border:'1.5px dashed rgba(20,160,155,0.45)',background:'rgba(20,160,155,0.05)',borderRadius:18,padding:'0 18px',display:'flex',alignItems:'center',gap:14,textAlign:'left',position:'relative'}}>
              <span style={{position:'absolute',top:8,right:12,fontSize:9,fontWeight:700,letterSpacing:'0.08em',color:'var(--ink3)'}}>AD SPACE {s.n}/3</span>
              <span style={{fontSize:30,flexShrink:0,filter:'drop-shadow(0 3px 8px rgba(0,0,0,0.2))'}}>📣</span>
              <div style={{flex:1,minWidth:0}}>
                <div style={{fontFamily:"'Baloo Bhaijaan 2',sans-serif",fontSize:15,fontWeight:800,color:'#14A09B',lineHeight:1.2}}>Add your advertisement here</div>
                <div style={{fontSize:11,color:'var(--ink3)',marginTop:3}}>Click to apply — we review every submission</div>
              </div>
              <span style={{flexShrink:0,fontSize:11.5,fontWeight:700,padding:'7px 14px',borderRadius:100,background:'rgba(20,160,155,0.14)',color:'#14A09B'}}>Apply</span>
            </button>
          </div>
        ))}
      </div>
      <div style={{display:'flex',justifyContent:'center',gap:5,marginTop:8}}>
        {slides.map((s,i)=>(
          <span key={s.key} style={{width:idx===i?16:6,height:6,borderRadius:100,background:idx===i?'#14A09B':'rgba(20,160,155,0.25)',transition:'all .3s'}}></span>
        ))}
      </div>
    </div>
  );
};

const CatTile = ({c, i, onSelect, height=78, fontSize=26}) => {
  const { useState } = React;
  const [ripples,setRipples] = useState([]);
  const spawn = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    const size = Math.max(r.width, r.height);
    const id = Date.now()+Math.random();
    setRipples(a=>[...a,{id, x:e.clientX-r.left, y:e.clientY-r.top, size}]);
    setTimeout(()=>setRipples(a=>a.filter(q=>q.id!==id)), 650);
  };
  return (
    <button onClick={()=>onSelect(c)} onPointerDown={spawn} className={`cp s${i+1}`} style={{position:'relative',border:'none',borderRadius:14,padding:0,height,width:'100%',overflow:'hidden',animation:'fadeUp .4s ease-out both'}}>
      <ItemImage src={c.img} emoji={c.emoji} bg={c.bg} fontSize={fontSize} style={{position:'absolute',inset:0}}/>
      <div style={{position:'absolute',inset:0,background:'linear-gradient(180deg,rgba(0,0,0,0) 40%,rgba(0,0,0,0.55) 100%)'}}></div>
      <div style={{position:'absolute',bottom:6,left:0,right:0,textAlign:'center',fontSize:10,fontWeight:700,color:'#fff',lineHeight:1.2,textShadow:'0 1px 3px rgba(0,0,0,0.5)'}}>{c.name}</div>
      {ripples.map(q=><span key={q.id} style={{position:'absolute',left:q.x-q.size/2,top:q.y-q.size/2,width:q.size,height:q.size,borderRadius:'50%',background:'rgba(255,255,255,0.5)',pointerEvents:'none',animation:'ripple .6s ease-out forwards',zIndex:3}}></span>)}
    </button>
  );
};

const HomePage = ({isSeller, onNav, onCatSelect, onSellerOpen, username=''}) => {
  const [showNotifs, setShowNotifs] = useState(false);
  const [sy, setSy] = useState(0);
  const [adSlot, setAdSlot] = useState(null);
  const [auctions,setAuctions] = useState([]);
  const [sellers,setSellers] = useState([]);
  useEffect(()=>{ api.auctions().then(a=>setAuctions(a.filter(x=>x.status==='live'))).catch(()=>{}); api.sellers().then(setSellers).catch(()=>{}); },[]);
  const homeVerified = (()=>{try{return localStorage.getItem('gt_verified')==='1';}catch(e){return false;}})();
  const unread = NOTIFS.filter(n=>n.unread).length;
  const h = new Date().getHours();
  const displayName = username ? username.charAt(0).toUpperCase()+username.slice(1) : '';
  const totalRev = MY_LISTINGS.filter(l=>l.status==='sold').reduce((s,l)=>s+(l.soldFor||0),0);
  const totalClk = MY_LISTINGS.reduce((s,l)=>s+l.clicks,0);
  const liveCount = MY_LISTINGS.filter(l=>l.status==='live').length;
  return (
    <div style={{flex:1,overflowY:'auto',paddingBottom:90}} className="sh" onScroll={e=>setSy(e.currentTarget.scrollTop)}>
      <div style={{background:'linear-gradient(180deg,#0D7E7A 0%,#14A09B 100%)',padding:'58px 16px 20px',position:'relative',overflow:'hidden'}}>
        <Particles/>
        <button onClick={()=>setShowNotifs(true)} aria-label="Notifications" style={{position:'absolute',top:56,right:16,zIndex:2,width:38,height:38,borderRadius:12,background:'rgba(255,255,255,0.14)',border:'1px solid rgba(255,255,255,0.22)',color:'#FFFFFF',display:'flex',alignItems:'center',justifyContent:'center'}}>
          <Bell size={17} strokeWidth={2}/>
          {unread>0&&<span style={{position:'absolute',top:-4,right:-4,minWidth:16,height:16,borderRadius:100,background:'#E8513C',color:'#fff',fontSize:9,fontWeight:800,display:'flex',alignItems:'center',justifyContent:'center',padding:'0 4px',boxShadow:'0 2px 6px rgba(232,81,60,0.5)'}}>{unread}</span>}
        </button>
        <div style={{position:'relative',zIndex:1,display:'flex',alignItems:'center',gap:14,transform:`translateY(${Math.min(sy,200)*0.32}px)`,opacity:Math.max(1-sy/220,0)}}>
          <div style={{position:'relative',flexShrink:0,animation:'avatarIn .55s cubic-bezier(0.34,1.56,0.64,1) both'}}>
            <div style={{width:56,height:56,borderRadius:20,background:'linear-gradient(135deg,#FF6A55,#FF8A73)',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:"'Baloo Bhaijaan 2',sans-serif",fontSize:26,fontWeight:900,color:'#0E4B54',boxShadow:'0 6px 20px rgba(0,0,0,0.28), 0 0 0 2.5px rgba(255,138,115,0.35)'}}>{displayName?displayName.charAt(0):'🌱'}</div>
            {homeVerified&&<span style={{position:'absolute',bottom:-4,right:-4,width:20,height:20,borderRadius:'50%',background:'linear-gradient(135deg,#14A09B,#0D7E7A)',border:'2px solid #0D7E7A',display:'flex',alignItems:'center',justifyContent:'center',color:'#FFFFFF',boxShadow:'0 2px 8px rgba(0,0,0,0.3)'}}><Check size={10} strokeWidth={3.2}/></span>}
          </div>
          <div style={{minWidth:0}}>
            <div style={{fontSize:10,color:'rgba(255,255,255,0.55)',fontWeight:600,letterSpacing:'0.1em',marginBottom:4,animation:'fadeUp .5s .1s ease-out both'}}>
              {h<12?'🌅':h<18?'☀️':'🌙'} {h<12?'GOOD MORNING':h<18?'GOOD AFTERNOON':'GOOD EVENING'}{displayName?`, ${displayName.toUpperCase()}`:', NEIGHBOR'}
            </div>
            <div style={{fontFamily:"'Baloo Bhaijaan 2',sans-serif",fontSize:24,fontWeight:900,color:'#FFFFFF',lineHeight:1.12,animation:'fadeUp .5s .18s ease-out both'}}>{displayName?<>Welcome back,<br/><span style={{color:'#FF8A73'}}>{displayName}.</span> <span style={{display:'inline-block',animation:'wave 2.4s .6s ease-in-out infinite',transformOrigin:'70% 70%',fontSize:20}}>👋</span></>:<>Welcome to<br/><span style={{color:'#FF8A73'}}>Karro.</span></>}</div>
            <p style={{fontSize:12,color:'rgba(255,255,255,0.55)',marginTop:6,animation:'fadeUp .5s .26s ease-out both'}}>Your neighborhood marketplace</p>
          </div>
        </div>
      </div>
      {isSeller&&(
        <div style={{margin:'14px 16px 0',background:'var(--card)',borderRadius:18,border:'1px solid rgba(255,106,85,0.15)',overflow:'hidden',animation:'fadeUp .5s .1s ease-out both'}}>
          <div style={{background:'rgba(20,160,155,0.06)',padding:'10px 14px',display:'flex',alignItems:'center',gap:6,borderBottom:'1px solid rgba(20,160,155,0.08)'}}>
            <span style={{fontSize:14}}>💼</span><span style={{fontSize:12,fontWeight:700,color:'#14A09B'}}>Your Stall</span>
            <button onClick={()=>onNav('settings')} style={{marginLeft:'auto',background:'transparent',border:'none',color:'#14A09B',fontSize:12,fontWeight:600,display:'flex',alignItems:'center',gap:2}}>Manage <ChevronRight size={13}/></button>
          </div>
          <div style={{display:'flex'}}>
            {[[<Counter key="rev" prefix="EGP " target={totalRev} locale/>,'Revenue'],[liveCount,'Live Now'],[<Counter key="clk" target={totalClk} locale/>,'Views'],['4.9 ★','Rating']].map(([v,l],i)=>(
              <div key={l} style={{flex:1,textAlign:'center',padding:'12px 4px',borderRight:i<3?'1px solid rgba(20,160,155,0.07)':'none'}}>
                <div style={{fontFamily:"'Baloo Bhaijaan 2',sans-serif",fontSize:15,fontWeight:700,color:l==='Live Now'?'#14A09B':l==='Rating'?'#FF6A55':'var(--ink)'}}>{v}</div>
                <div style={{fontSize:9,color:'var(--ink3)',fontWeight:500,marginTop:2}}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* Ad bar */}
      <div style={{margin:'12px 16px 0',animation:'fadeUp .5s .18s ease-out both'}}>
        <AdSlot slot="home-top" height={64} onApply={setAdSlot}/>
      </div>
      {/* Featured banner box */}
      <div style={{padding:'14px 16px 0',animation:'fadeUp .5s .22s ease-out both'}}>
        <button onClick={()=>onNav('auctions')} className="cp" style={{width:'100%',border:'none',borderRadius:18,overflow:'hidden',position:'relative',height:96,background:'#0A3540',textAlign:'left',padding:0,display:'block'}}>
          <img src="uploads/El-Gouna-Red-Sea-Sheraton-Miramar-Resort-1fbe121b-2.webp" alt="El Gouna" style={{position:'absolute',inset:0,width:'100%',height:'100%',objectFit:'cover'}}/>
          <div style={{position:'absolute',inset:0,background:'linear-gradient(90deg,rgba(10,53,64,0.75) 0%,rgba(10,53,64,0.35) 60%,rgba(10,53,64,0.1) 100%)'}}></div>
          <div style={{position:'relative',zIndex:1,height:'100%',display:'flex',flexDirection:'column',justifyContent:'center',gap:4,padding:'0 18px'}}>
            <div style={{fontFamily:"'Baloo Bhaijaan 2',sans-serif",fontSize:19,fontWeight:900,color:'#fff',letterSpacing:'0.01em',textShadow:'0 2px 8px rgba(0,0,0,0.4)'}}>NOW LIVE IN EL GOUNA</div>
            <div style={{fontSize:11.5,color:'rgba(255,255,255,0.85)',textShadow:'0 1px 4px rgba(0,0,0,0.4)'}}>Live auctions & new listings from your neighbors, 24/7</div>
          </div>
        </button>
      </div>
      <div style={{padding:'16px 16px 0',animation:'fadeUp .5s .26s ease-out both'}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'baseline',marginBottom:10}}>
          <div style={{fontFamily:"'Baloo Bhaijaan 2',sans-serif",fontSize:18,fontWeight:700}}>Quick Browse</div>
          <button onClick={()=>onNav('browse')} style={{background:'transparent',border:'none',fontSize:12,fontWeight:600,color:'#14A09B',display:'flex',alignItems:'center',gap:2}}>All <ChevronRight size={13}/></button>
        </div>
        {/* Continuous marquee — 2 rows */}
        <div style={{margin:'0 -16px 16px',overflow:'hidden',display:'flex',flexDirection:'column',gap:8}}>
          {[CATS.slice(0,3), CATS.slice(3,6)].map((row,r)=>(
            <div key={r} className={`marquee-track${r===1?' rev':''}`} style={{padding:'0 0 0 16px'}}>
              {[0,1,2].map(dup=>row.map((c,i)=>(
                <div key={`${c.id}-${dup}`} style={{width:170,flexShrink:0}}>
                  <CatTile c={c} i={i} height={112} fontSize={38} onSelect={onCatSelect}/>
                </div>
              )))}
            </div>
          ))}
        </div>
        {/* Ad carousel */}
        <div style={{margin:'0 -16px 12px'}}>
          <AdCarousel onApply={setAdSlot}/>
        </div>
        {/* Constant ad box */}
        <div style={{margin:'0 0 16px'}}>
          <AdSlot slot="home-constant" height={104} onApply={setAdSlot}/>
        </div>
      </div>
      <div style={{padding:'0 16px 0'}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'baseline',marginBottom:10}}>
          <div style={{fontFamily:"'Baloo Bhaijaan 2',sans-serif",fontSize:18,fontWeight:700}}>⚡ Auction Spotlight</div>
          <button onClick={()=>onNav('auctions')} style={{background:'transparent',border:'none',fontSize:12,fontWeight:600,color:'#FF6A55',display:'flex',alignItems:'center',gap:2}}>All <ChevronRight size={13}/></button>
        </div>
        <div style={{overflowX:'auto',display:'flex',gap:10,paddingBottom:4}} className="sh">
          {auctions.length===0&&<div style={{flexShrink:0,flex:1,padding:'18px 16px',background:'var(--card2)',borderRadius:16,fontSize:12.5,color:'var(--ink2)'}}>No live auctions yet — start one from the Sell button ⚡</div>}
          {auctions.slice(0,3).map((a,i)=>(
            <button key={a.id} onClick={()=>onNav('auctions')} className={`cp s${i+1}`} style={{flexShrink:0,width:150,background:'linear-gradient(145deg,#0E4B54,#0E4B54)',borderRadius:18,overflow:'hidden',border:'none',textAlign:'left',animation:'fadeUp .45s ease-out both'}}>
              <div style={{height:72,background:a.bg,position:'relative',overflow:'hidden'}}>
                <ItemImage src={a.img} emoji={a.emoji} bg={a.bg} fontSize={34} style={{position:'absolute',inset:0}}/>{a.hot&&<div style={{position:'absolute',top:4,right:4,width:7,height:7,borderRadius:'50%',background:'#E8513C',animation:'livePulse 1s ease-in-out infinite',zIndex:2}}/>}
              </div>
              <div style={{padding:'9px'}}>
                <div style={{fontSize:11,fontWeight:700,color:'#FFFFFF',lineHeight:1.3,marginBottom:3}}>{a.title}</div>
                <div style={{fontFamily:"'Baloo Bhaijaan 2',sans-serif",fontSize:14,fontWeight:700,color:'#FF8A73'}}>EGP {a.currentBid.toLocaleString()}</div>
                <div style={{fontSize:10,color:'rgba(255,255,255,0.7)',marginTop:2}}>{a.endH}h {a.endM}m · {a.bids} bids</div>
              </div>
            </button>
          ))}
        </div>
      </div>
      {/* TOP SELLERS */}
      <div style={{padding:'16px 16px 0'}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'baseline',marginBottom:10}}>
          <div style={{fontFamily:"'Baloo Bhaijaan 2',sans-serif",fontSize:18,fontWeight:700}}>🌟 Top Sellers</div>
          <button onClick={()=>onSellerOpen&&onSellerOpen(null)} style={{background:'transparent',border:'none',fontSize:12,fontWeight:600,color:'#14A09B',display:'flex',alignItems:'center',gap:2}}>All <ChevronRight size={13}/></button>
        </div>
        <div style={{overflowX:'auto',display:'flex',gap:10,paddingBottom:4}} className="sh">
          {sellers.length===0&&<div style={{flexShrink:0,flex:1,padding:'18px 16px',background:'var(--card2)',borderRadius:16,fontSize:12.5,color:'var(--ink2)'}}>No stalls open yet — yours could be the first 🌟</div>}
          {sellers.map((s,i)=>(
            <button key={s.id} onClick={()=>onSellerOpen&&onSellerOpen(s.id)} className={`cp s${Math.min(i+1,9)}`} style={{flexShrink:0,width:118,background:'var(--card)',border:'1px solid rgba(255,106,85,0.12)',borderRadius:16,padding:'13px 10px',textAlign:'center',animation:'fadeUp .45s ease-out both'}}>
              <div style={{width:42,height:42,borderRadius:14,background:'linear-gradient(135deg,#BFE7E4,#7ED8D3)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:21,margin:'0 auto 7px'}}>{s.avatar}</div>
              <div style={{fontSize:12,fontWeight:700,color:'var(--ink)',whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>{s.name}</div>
              <div style={{fontSize:10,color:'#FF6A55',fontWeight:700,marginTop:2}}>{s.badge} <span style={{color:'var(--ink3)',fontWeight:500}}>· {s.live} live</span></div>
            </button>
          ))}
        </div>
      </div>
      <div style={{padding:'14px 16px 6px',animation:'fadeUp .5s .34s ease-out both'}}>
        {/* Ad slot — below sellers */}
        <div style={{margin:'0 0 14px'}}>
          <AdSlot slot="home-bottom" onApply={setAdSlot}/>
        </div>
        <div style={{background:'linear-gradient(180deg,#0A3540 0%,#0D7E7A 100%)',borderRadius:16,padding:'12px 16px',display:'flex',alignItems:'center',gap:12,color:'#FFFFFF'}}>
          <span style={{fontSize:20,animation:'float 3s ease-in-out infinite'}}>📣</span>
          <div style={{flex:1,minWidth:0}}>
            <div style={{fontFamily:"'Baloo Bhaijaan 2',sans-serif",fontSize:14,fontWeight:700}}>Invite your neighbors</div>
            <p style={{fontSize:11,color:'rgba(255,255,255,0.75)'}}>The more members, the better.</p>
          </div>
          <button className="btn-gold" style={{padding:'8px 16px',borderRadius:100,fontSize:12,flexShrink:0}}>Share</button>
        </div>
      </div>
      {adSlot&&<AdApplySheet slot={adSlot} onClose={()=>setAdSlot(null)}/>}
      {showNotifs&&<NotifSheet onClose={()=>setShowNotifs(false)}/>}
    </div>
  );
};


export { HomePage, NotifSheet, NOTIFS };
