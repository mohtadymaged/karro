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

const CatTile = ({c, i, onSelect}) => {
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
    <button onClick={()=>onSelect(c)} onPointerDown={spawn} className={`cp s${i+1}`} style={{position:'relative',border:'none',borderRadius:14,padding:0,height:78,overflow:'hidden',animation:'fadeUp .4s ease-out both'}}>
      <ItemImage src={c.img} emoji={c.emoji} bg={c.bg} fontSize={26} style={{position:'absolute',inset:0}}/>
      <div style={{position:'absolute',inset:0,background:'linear-gradient(180deg,rgba(0,0,0,0) 40%,rgba(0,0,0,0.55) 100%)'}}></div>
      <div style={{position:'absolute',bottom:6,left:0,right:0,textAlign:'center',fontSize:10,fontWeight:700,color:'#fff',lineHeight:1.2,textShadow:'0 1px 3px rgba(0,0,0,0.5)'}}>{c.name}</div>
      {ripples.map(q=><span key={q.id} style={{position:'absolute',left:q.x-q.size/2,top:q.y-q.size/2,width:q.size,height:q.size,borderRadius:'50%',background:'rgba(255,255,255,0.5)',pointerEvents:'none',animation:'ripple .6s ease-out forwards',zIndex:3}}></span>)}
    </button>
  );
};

const HomePage = ({isSeller, onNav, onCatSelect, onSellerOpen, username=''}) => {
  const [showNotifs, setShowNotifs] = useState(false);
  const [sy, setSy] = useState(0);
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
        <div aria-hidden style={{position:'absolute',right:12,bottom:14,display:'flex',gap:8,pointerEvents:'none',transform:`translateY(${Math.min(sy,200)*0.55}px)`,opacity:Math.max(1-sy/160,0)}}>
          {['📱','👕','💍'].map((e,i)=>(
            <span key={e} style={{fontSize:30,opacity:0.9,filter:'drop-shadow(0 4px 10px rgba(0,0,0,0.25))',animation:`floatSlow ${4+i}s ${i*0.4}s ease-in-out infinite`}}>{e}</span>
          ))}
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
      <div style={{margin:'12px 16px 0',display:'flex',gap:8,animation:'fadeUp .5s .18s ease-out both'}}>
        {[['LIVE','5 Auctions running',()=>onNav('auctions'),'rgba(232,81,60,0.1)','#E8513C',true],['🆕 NEW','New listings today',()=>onNav('browse'),'rgba(20,160,155,0.1)','#14A09B',false]].map(([badge,label,fn,bg,c,live])=>(
          <button key={badge} onClick={fn} className="cp" style={{flex:1,background:bg,border:`1px solid ${c}40`,borderRadius:14,padding:'10px 12px',textAlign:'left',boxShadow:`0 2px 10px ${c}20`,transition:'all .2s'}}>
            <div style={{fontSize:10,fontWeight:700,color:c,letterSpacing:'0.08em',marginBottom:3,display:'flex',alignItems:'center',gap:5}}>{live&&<span style={{width:7,height:7,borderRadius:'50%',background:c,animation:'livePulse 1.1s ease-in-out infinite',display:'inline-block'}}></span>}{badge}</div>
            <div style={{fontSize:12,fontWeight:600,color:'var(--ink)'}}>{label}</div>
          </button>
        ))}
      </div>
      <div style={{padding:'16px 16px 0',animation:'fadeUp .5s .26s ease-out both'}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'baseline',marginBottom:10}}>
          <div style={{fontFamily:"'Baloo Bhaijaan 2',sans-serif",fontSize:18,fontWeight:700}}>Quick Browse</div>
          <button onClick={()=>onNav('browse')} style={{background:'transparent',border:'none',fontSize:12,fontWeight:600,color:'#14A09B',display:'flex',alignItems:'center',gap:2}}>All <ChevronRight size={13}/></button>
        </div>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:8,marginBottom:16}}>
          {CATS.slice(0,6).map((c,i)=><CatTile key={c.id} c={c} i={i} onSelect={onCatSelect}/>)}
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
                <div style={{fontSize:10,color:'rgba(255,255,255,0.4)',marginTop:2}}>{a.endH}h {a.endM}m · {a.bids} bids</div>
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
        <div style={{background:'linear-gradient(180deg,#0A3540 0%,#0D7E7A 100%)',borderRadius:16,padding:'12px 16px',display:'flex',alignItems:'center',gap:12,color:'#FFFFFF'}}>
          <span style={{fontSize:20,animation:'float 3s ease-in-out infinite'}}>📣</span>
          <div style={{flex:1,minWidth:0}}>
            <div style={{fontFamily:"'Baloo Bhaijaan 2',sans-serif",fontSize:14,fontWeight:700}}>Invite your neighbors</div>
            <p style={{fontSize:11,color:'rgba(255,255,255,0.48)'}}>The more members, the better.</p>
          </div>
          <button className="btn-gold" style={{padding:'8px 16px',borderRadius:100,fontSize:12,flexShrink:0}}>Share</button>
        </div>
      </div>
      {showNotifs&&<NotifSheet onClose={()=>setShowNotifs(false)}/>}
    </div>
  );
};


export { HomePage, NotifSheet, NOTIFS };
