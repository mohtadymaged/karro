/* Shared UI primitives. */
const { useState, useEffect, useMemo, useRef } = React;

const KarroMark = ({ size=40, reversed=false }) => (
  <svg width={size} height={size} viewBox="0 0 132 132" fill="none" style={{flexShrink:0,display:'block'}}>
    <path d="M20 16 L44 22 L20 30 Z" fill="#FF6A55"></path>
    <path d="M20 14 V40 C20 44 23 47 27 48 L32 49.5 L41 88 C42.6 94.5 48.4 99 55 99 H92 C98.6 99 104.4 94.5 106 88 L114 56 C115.4 50.5 111.2 45 105.5 45 H38" stroke={reversed?'#FFFFFF':'#14A09B'} strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" fill="none"></path>
    <path d="M38 45 H105.5 C111.2 45 115.4 50.5 114 56 L106 88 C104.4 94.5 98.6 99 92 99 H55 C48.4 99 42.6 94.5 41 88 L32 49.5 Z" fill={reversed?'#FFFFFF':'#14A09B'}></path>
    <path d="M52 72 C60 64 67 80 75 72 C83 64 90 79 98 71.5" stroke={reversed?'#14A09B':'#FFFFFF'} strokeWidth="7" strokeLinecap="round" fill="none"></path>
    <circle cx="58" cy="115" r="9" fill={reversed?'#7ED8D3':'#0A3540'}></circle>
    <circle cx="58" cy="115" r="3.5" fill={reversed?'#0A3540':'#FFFFFF'}></circle>
    <circle cx="92" cy="115" r="9" fill={reversed?'#7ED8D3':'#0A3540'}></circle>
    <circle cx="92" cy="115" r="3.5" fill={reversed?'#0A3540':'#FFFFFF'}></circle>
  </svg>
);

const Logo = ({ light=false, lg=false }) => (
  <div style={{display:'flex',alignItems:'center',gap:lg?12:9}}>
    <KarroMark size={lg?52:40} reversed={light}/>
    <div>
      <div style={{fontFamily:"'Baloo Bhaijaan 2',sans-serif",fontWeight:800,fontSize:lg?26:20,color:light?'#FFFFFF':'var(--ink)',lineHeight:1}}>kar<span style={{color:light?'#7ED8D3':'#FF6A55'}}>ro</span></div>
      <div style={{fontSize:lg?11:9,fontWeight:500,letterSpacing:'0.07em',marginTop:3,color:light?'rgba(255,255,255,0.5)':'var(--ink-dim)'}}>El Gouna's marketplace</div>
    </div>
  </div>
);

const Stars = ({ rating, size=14 }) => (
  <span style={{fontSize:size,letterSpacing:1}}>
    {[1,2,3,4,5].map(n=><span key={n} style={{color:n<=Math.round(rating)?'#FF6A55':'rgba(255,106,85,0.2)'}}>★</span>)}
  </span>
);

const Particles = () => {
  const pts = useMemo(()=>Array.from({length:24},(_,i)=>({id:i,x:Math.random()*100,y:Math.random()*100,size:Math.random()*4+2,delay:Math.random()*5,dur:Math.random()*3+2.5,op:Math.random()*0.55+0.2,green:i%5===0})),[]);
  return <div style={{position:'absolute',inset:0,overflow:'hidden',pointerEvents:'none'}}>{pts.map(p=><div key={p.id} style={{position:'absolute',left:`${p.x}%`,top:`${p.y}%`,width:p.size,height:p.size,borderRadius:'50%',background:p.green?'#7ED8D3':'#FF6A55',opacity:p.op,animation:`twinkle ${p.dur}s ${p.delay}s ease-in-out infinite`}}/>)}</div>;
};

const Counter = ({ target, suffix='', prefix='', locale=false }) => {
  const [v,setV]=useState(0); const ref=useRef();
  useEffect(()=>{const o=new IntersectionObserver(([e])=>{if(!e.isIntersecting)return;o.disconnect();const s=Date.now(),d=1600,t=()=>{const p=Math.min((Date.now()-s)/d,1),e2=1-Math.pow(1-p,3);setV(Math.floor(e2*target));if(p<1)requestAnimationFrame(t);};requestAnimationFrame(t);},{threshold:0.5});if(ref.current)o.observe(ref.current);return()=>o.disconnect();},[target]);
  return <span ref={ref}>{prefix}{locale?v.toLocaleString():v}{suffix}</span>;
};

const Confetti = ({show}) => {
  const ps=useMemo(()=>Array.from({length:60},(_,i)=>{const a=(Math.random()*360)*Math.PI/180,d=60+Math.random()*130;return{id:i,cx:`${Math.cos(a)*d}px`,cy:`${Math.sin(a)*d-50}px`,cr:`${Math.random()*720-360}deg`,color:['#FF6A55','#7ED8D3','#FF8A73','#14A09B','#FFFFFF','#E8513C'][i%6],size:5+Math.random()*9,delay:Math.random()*0.35,circle:i%3!==0}}),[]);
  if(!show)return null;
  return <div style={{position:'fixed',inset:0,pointerEvents:'none',zIndex:300,display:'flex',alignItems:'center',justifyContent:'center'}}>{ps.map(p=><div key={p.id} style={{position:'absolute',width:p.size,height:p.size,background:p.color,borderRadius:p.circle?'50%':'2px','--cx':p.cx,'--cy':p.cy,'--cr':p.cr,animation:`cpop 1.4s ${p.delay}s cubic-bezier(0.22,1,0.36,1) forwards`}}/>)}</div>;
};

const DarkField = ({icon:Icon,type='text',value,onChange,placeholder,right}) => (
  <div className="inp-wrap" style={{display:'flex',alignItems:'center',gap:12,background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,106,85,0.18)',borderRadius:14,padding:'14px 16px',marginBottom:12}}>
    {Icon&&<Icon size={16} strokeWidth={2.2} style={{color:'rgba(255,106,85,0.55)',flexShrink:0}}/>}
    <input type={type} value={value} onChange={onChange} placeholder={placeholder} style={{background:'transparent',border:'none',color:'#FFFFFF',fontSize:15,width:'100%',flex:1,fontFamily:"'Rubik',sans-serif"}}/>
    {right}
  </div>
);

/* ─── ITEM IMAGE (real photo, emoji fallback) ────────── */
const ItemImage = ({src, emoji, bg, fontSize=50, className, style, imgStyle}) => {
  const [err, setErr] = React.useState(false);
  const cls = `item-ph${className?' '+className:''}`;
  const base = {width:'100%',height:'100%',display:'block',position:'relative',background:bg, ...(style||{})};
  if (!src || err) {
    return (
      <div className={cls} style={{...base,display:'flex',alignItems:'center',justifyContent:'center',fontSize}}>{emoji}</div>
    );
  }
  return (
    <div className={cls} style={base}>
      <img src={src} alt="" loading="lazy" onError={()=>setErr(true)}
        style={{width:'100%',height:'100%',objectFit:'cover',display:'block', ...(imgStyle||{})}}/>
    </div>
  );
};

/* ─── BOTTOM NAV (5 tabs + center Sell) ──────────────── */
const BottomNav = ({active, onChange}) => {
  const left  = [
    {id:'home',   label:'Home',   Icon:Home},
    {id:'browse', label:'Market', Icon:Store},
  ];
  const right = [
    {id:'auctions',label:'Auctions',Icon:Zap},
    {id:'profile', label:'Profile', Icon:User},
  ];
  const mid = [];
  const Tab = ({t}) => {
    const act = active===t.id;
    return (
      <button key={t.id} onClick={()=>onChange(t.id)} style={{flex:1,padding:'9px 2px 16px',display:'flex',flexDirection:'column',alignItems:'center',gap:4,border:'none',background:'transparent',position:'relative',minWidth:0}}>
        <span key={act?'on':'off'} style={{display:'inline-flex',color:act?'#14A09B':'var(--ink-dim)',transition:'color .2s',animation:act?'tabPop .35s cubic-bezier(0.34,1.56,0.64,1)':'none'}}><t.Icon size={21} strokeWidth={act?2.2:1.8}/></span>
        <span style={{fontSize:10,fontWeight:act?700:500,letterSpacing:'0.02em',color:act?'#14A09B':'var(--ink-dim)',transition:'color .2s'}}>{t.label}</span>
        {act&&<div style={{position:'absolute',bottom:10,width:14,height:2.5,borderRadius:100,background:'#14A09B',animation:'popIn .3s ease-out'}}></div>}
      </button>
    );
  };
  return (
    <div style={{position:'fixed',bottom:0,left:0,right:0,zIndex:30,background:'var(--nav-bg)',backdropFilter:'blur(12px)',borderTop:'1px solid rgba(20,160,155,0.12)',display:'flex',justifyContent:'center',paddingBottom:22}}>
      <div style={{display:'flex',width:'100%',maxWidth:440,alignItems:'stretch'}}>
        {left.map(t=><Tab key={t.id} t={t}/>)}
        {/* Center SELL button */}
        <button onClick={()=>onChange('sell')} aria-label="Sell an item" style={{flex:1,border:'none',background:'transparent',display:'flex',flexDirection:'column',alignItems:'center',gap:4,padding:'0 2px 16px',position:'relative',minWidth:0}}>
          <span style={{width:46,height:46,marginTop:-16,borderRadius:'50%',background:'linear-gradient(135deg,#FF6A55,#FF8A73)',display:'flex',alignItems:'center',justifyContent:'center',color:'#0E4B54',boxShadow:'0 6px 18px rgba(255,106,85,0.45), 0 0 0 4px var(--bg)',animation:'sellPulse 3s ease-in-out infinite',transition:'transform .15s'}} className="cp"><Plus size={22} strokeWidth={2.6}/></span>
          <span style={{fontSize:10,fontWeight:700,letterSpacing:'0.02em',color:'var(--ink3)'}}>Sell</span>
        </button>
        {mid.map(t=><Tab key={t.id} t={t}/>)}
        {right.map(t=><Tab key={t.id} t={t}/>)}
      </div>
    </div>
  );
};


Object.assign(window, { Logo, Stars, Particles, Counter, Confetti, DarkField, ItemImage, BottomNav });
