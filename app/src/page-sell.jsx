import React from 'react';
import { CATS } from './data.js';
import { Shield, X } from './icons.jsx';
import { api } from './api.js';
/* Sell an item — bottom sheet flow (photos required + verification before listing) */
const SellSheet = ({onClose, defaultCat='', onPosted}) => {
  const { useState, useRef } = React;
  const [step,setStep] = useState(1);
  const [done,setDone] = useState(false);
  const [busy,setBusy] = useState(false);
  const [err,setErr]   = useState('');
  const [f,setFm] = useState({name:'',cat:defaultCat,price:'',unit:'',desc:'',cond:'Good',emoji:'📦'});
  const [mode,setMode] = useState('fixed'); // fixed | auction
  const [duration,setDuration] = useState('48');
  const [photos,setPhotos] = useState([]); // dataURLs
  const setF = (k,v)=>setFm(x=>({...x,[k]:v}));
  const fileRef = useRef(null);
  const camRef  = useRef(null);

  const MAX_PHOTOS = 4;
  const addFiles = (e) => {
    const files = Array.from(e.target.files||[]).slice(0, MAX_PHOTOS - photos.length);
    files.forEach(file=>{
      const r = new FileReader();
      r.onload = ev => setPhotos(p => p.length<MAX_PHOTOS ? [...p, ev.target.result] : p);
      r.readAsDataURL(file);
    });
    e.target.value='';
  };
  const removePhoto = (i) => setPhotos(p=>p.filter((_,n)=>n!==i));

  const conds  = ['New','Like new','Good','Fair'];
  const units  = [['','each'],['/pair','per pair'],['/set','per set']];

  const submit = async () => {
    // Persist to the marketplace, then show the "submitted for review" screen.
    setErr(''); setBusy(true);
    try {
      await api.createListing({name:f.name, catId:f.cat, price:f.price, unit:f.unit, desc:f.desc, cond:f.cond, photos, mode});
      setBusy(false); setDone(true);
      setTimeout(()=>{onPosted&&onPosted();onClose();},2600);
    } catch(e) {
      setBusy(false);
      setErr(e.message||'Could not submit — are you signed in?');
    }
  };

  const step1Ok = f.name && f.cat && photos.length>0;

  return (
    <div style={{position:'fixed',inset:0,zIndex:50,display:'flex',alignItems:'flex-end',justifyContent:'center',background:'rgba(10,53,64,0.6)',backdropFilter:'blur(4px)',animation:'fadeIn .25s ease-out'}} onClick={()=>{if(!done)onClose();}}>
      <div className="su" style={{width:'100%',maxWidth:440,background:'var(--bg)',borderRadius:'26px 26px 0 0',padding:'24px 22px 44px',maxHeight:'88vh',overflowY:'auto'}} onClick={e=>e.stopPropagation()}>
        {done?(
          <div style={{textAlign:'center',padding:'24px 0'}}>
            <div style={{width:72,height:72,borderRadius:24,background:'rgba(255,106,85,0.12)',border:'1px solid rgba(255,106,85,0.3)',display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 14px',animation:'scaleIn .4s cubic-bezier(0.34,1.56,0.64,1)'}}>
              <Shield size={32} strokeWidth={1.8} style={{color:'#FF6A55'}}/>
            </div>
            <h2 style={{fontFamily:"'Baloo Bhaijaan 2',sans-serif",fontSize:24,fontWeight:700,color:'var(--ink)',marginBottom:8}}>Submitted for review</h2>
            <p style={{fontSize:14,color:'var(--ink3)',lineHeight:1.65,maxWidth:300,margin:'0 auto'}}>Our community team verifies every listing before it goes live. <strong style={{color:'var(--ink)'}}>{f.name}</strong> {mode==='auction'?'will enter the Auction House once approved':'is usually approved within'}{mode==='auction'?'.':' '}{mode==='fixed'&&<strong style={{color:'#14A09B'}}>2 hours</strong>}{mode==='fixed'&&' — we\'ll notify you.'}</p>
            <div style={{display:'inline-flex',alignItems:'center',gap:6,marginTop:16,background:'rgba(20,160,155,0.08)',border:'1px solid rgba(20,160,155,0.15)',borderRadius:100,padding:'8px 16px',fontSize:11,fontWeight:700,color:'#14A09B'}}>⏳ PENDING VERIFICATION</div>
          </div>
        ):(
          <>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:6}}>
              <h3 style={{fontFamily:"'Baloo Bhaijaan 2',sans-serif",fontSize:20,fontWeight:700}}>{step===1?'Sell an Item':'Price & Condition'}</h3>
              <button onClick={onClose} className="btn-icon-teal" style={{width:34,height:34,borderRadius:10,display:'flex',alignItems:'center',justifyContent:'center'}}><X size={15}/></button>
            </div>
            <div style={{display:'flex',gap:6,marginBottom:18}}>
              {[1,2].map(n=><div key={n} style={{flex:1,height:3,borderRadius:100,background:'rgba(20,160,155,0.12)',overflow:'hidden'}}><div style={{height:'100%',background:'linear-gradient(90deg,#14A09B,#14A09B)',width:n<=step?'100%':'0%',transition:'width .4s'}}></div></div>)}
            </div>

            {step===1?(
              <>
                <div style={{display:'flex',alignItems:'baseline',gap:6,marginBottom:8}}>
                  <label style={{fontSize:10,fontWeight:700,letterSpacing:'.1em',color:'var(--ink3)'}}>PHOTOS</label>
                  <span style={{fontSize:10,fontWeight:700,color:'#E8513C'}}>* required</span>
                  <span style={{fontSize:10,color:'var(--ink3)',marginLeft:'auto'}}>{photos.length}/{MAX_PHOTOS}</span>
                </div>
                <input ref={fileRef} type="file" accept="image/*" multiple onChange={addFiles} style={{display:'none'}}/>
                <input ref={camRef}  type="file" accept="image/*" capture="environment" onChange={addFiles} style={{display:'none'}}/>
                {photos.length>0&&(
                  <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr 1fr',gap:8,marginBottom:8}}>
                    {photos.map((src,i)=>(
                      <div key={i} style={{position:'relative',aspectRatio:'1',borderRadius:13,overflow:'hidden',border:'1.5px solid rgba(20,160,155,0.25)',animation:'scaleIn .25s ease-out'}}>
                        <img src={src} alt={`Photo ${i+1}`} style={{width:'100%',height:'100%',objectFit:'cover'}}/>
                        {i===0&&<span style={{position:'absolute',bottom:3,left:3,background:'rgba(10,53,64,0.75)',color:'#FF8A73',fontSize:8,fontWeight:700,borderRadius:6,padding:'2px 6px',letterSpacing:'0.05em'}}>COVER</span>}
                        <button onClick={()=>removePhoto(i)} aria-label="Remove photo" style={{position:'absolute',top:3,right:3,width:20,height:20,borderRadius:'50%',background:'rgba(10,53,64,0.75)',border:'none',color:'#FFFFFF',display:'flex',alignItems:'center',justifyContent:'center'}}><X size={11}/></button>
                      </div>
                    ))}
                  </div>
                )}
                {photos.length<MAX_PHOTOS&&(
                  <div style={{display:'flex',gap:8,marginBottom:10}}>
                    <button onClick={()=>camRef.current&&camRef.current.click()} style={{flex:1,display:'flex',flexDirection:'column',alignItems:'center',gap:5,padding:'16px 8px',borderRadius:14,background:'var(--card)',border:'1.5px dashed rgba(20,160,155,0.35)',color:'#14A09B'}}>
                      <span style={{fontSize:22}}>📷</span>
                      <span style={{fontSize:11,fontWeight:700}}>Take a picture</span>
                    </button>
                    <button onClick={()=>fileRef.current&&fileRef.current.click()} style={{flex:1,display:'flex',flexDirection:'column',alignItems:'center',gap:5,padding:'16px 8px',borderRadius:14,background:'var(--card)',border:'1.5px dashed rgba(20,160,155,0.35)',color:'#14A09B'}}>
                      <span style={{fontSize:22}}>🖼️</span>
                      <span style={{fontSize:11,fontWeight:700}}>Upload photos</span>
                    </button>
                  </div>
                )}
                {photos.length===0&&<p style={{fontSize:11,color:'var(--ink3)',marginBottom:14}}>Clear, real photos are required — listings without photos can't be submitted.</p>}
                <label style={{display:'block',fontSize:10,fontWeight:700,letterSpacing:'.1em',color:'var(--ink3)',marginBottom:6,marginTop:photos.length>0?6:0}}>ITEM NAME</label>
                <div className="iwl" style={{background:'var(--card)',border:'1px solid rgba(20,160,155,0.15)',borderRadius:14,padding:'13px 15px',marginBottom:12}}>
                  <input type="text" className="lp" value={f.name} onChange={e=>setF('name',e.target.value)} placeholder="e.g. Vintage Table Lamp" style={{background:'transparent',border:'none',color:'var(--ink)',fontSize:14,width:'100%',fontFamily:"'Rubik',sans-serif"}}/>
                </div>
                <label style={{display:'block',fontSize:10,fontWeight:700,letterSpacing:'.1em',color:'var(--ink3)',marginBottom:6}}>CATEGORY</label>
                <div className="iwl" style={{background:'var(--card)',border:'1px solid rgba(20,160,155,0.15)',borderRadius:14,padding:'13px 15px',marginBottom:12}}>
                  <select value={f.cat} onChange={e=>setF('cat',e.target.value)} style={{background:'transparent',border:'none',color:f.cat?'var(--ink)':'var(--ink-dim)',fontSize:14,width:'100%',fontFamily:"'Rubik',sans-serif"}}>
                    <option value="">Select category…</option>
                    {CATS.map(c=><option key={c.id} value={c.id}>{c.emoji} {c.name}</option>)}
                  </select>
                </div>
                <label style={{display:'block',fontSize:10,fontWeight:700,letterSpacing:'.1em',color:'var(--ink3)',marginBottom:6}}>DESCRIPTION</label>
                <div className="iwl" style={{background:'var(--card)',border:'1px solid rgba(20,160,155,0.15)',borderRadius:14,padding:'13px 15px',marginBottom:16}}>
                  <textarea value={f.desc} onChange={e=>setF('desc',e.target.value)} rows={3} placeholder="Condition, size, pickup details…" className="lp" style={{background:'transparent',border:'none',color:'var(--ink)',fontSize:14,width:'100%',fontFamily:"'Rubik',sans-serif",resize:'none'}}></textarea>
                </div>
                <button onClick={()=>setStep(2)} disabled={!step1Ok} className="btn-em" style={{width:'100%',padding:'15px',borderRadius:100,fontSize:14,opacity:!step1Ok?0.5:1}}>{photos.length===0?'Add at least 1 photo to continue':'Continue →'}</button>
              </>
            ):(
              <>
                <label style={{display:'block',fontSize:10,fontWeight:700,letterSpacing:'.1em',color:'var(--ink3)',marginBottom:8}}>SELL AS</label>
                <div style={{display:'flex',gap:8,marginBottom:16}}>
                  {[['fixed','🏷️ Fixed price'],['auction','⚡ Auction']].map(([id,l])=>(
                    <button key={id} onClick={()=>setMode(id)} style={{flex:1,padding:'11px 4px',borderRadius:12,fontSize:12,fontWeight:700,background:mode===id?'rgba(255,106,85,0.15)':'var(--card)',border:`1.5px solid ${mode===id?'#FF6A55':'rgba(20,160,155,0.12)'}`,color:mode===id?'#FF6A55':'var(--ink3)'}}>{l}</button>
                  ))}
                </div>
                <label style={{display:'block',fontSize:10,fontWeight:700,letterSpacing:'.1em',color:'var(--ink3)',marginBottom:6}}>{mode==='auction'?'STARTING BID (EGP)':'PRICE (EGP)'}</label>
                <div className="iwl" style={{display:'flex',alignItems:'center',gap:10,background:'var(--card)',border:'1px solid rgba(20,160,155,0.15)',borderRadius:14,padding:'13px 15px',marginBottom:12}}>
                  <span style={{fontFamily:"'Baloo Bhaijaan 2',sans-serif",fontSize:18,fontWeight:700,color:'#14A09B'}}>EGP</span>
                  <input type="number" className="lp" value={f.price} onChange={e=>setF('price',e.target.value)} placeholder="0.00" style={{background:'transparent',border:'none',color:'var(--ink)',fontSize:16,fontFamily:"'Baloo Bhaijaan 2',sans-serif",fontWeight:700,width:'100%'}}/>
                </div>
                {mode==='fixed'?(
                  <>
                    <label style={{display:'block',fontSize:10,fontWeight:700,letterSpacing:'.1em',color:'var(--ink3)',marginBottom:8}}>SOLD</label>
                    <div style={{display:'flex',gap:6,marginBottom:14,flexWrap:'wrap'}}>
                      {units.map(([v,l])=>(
                        <button key={v} onClick={()=>setF('unit',v)} style={{padding:'8px 14px',borderRadius:100,fontSize:12,fontWeight:700,background:f.unit===v?'rgba(20,160,155,0.15)':'var(--card)',border:`1.5px solid ${f.unit===v?'#14A09B':'rgba(20,160,155,0.12)'}`,color:f.unit===v?'#14A09B':'var(--ink3)'}}>{l}</button>
                      ))}
                    </div>
                  </>
                ):(
                  <>
                    <label style={{display:'block',fontSize:10,fontWeight:700,letterSpacing:'.1em',color:'var(--ink3)',marginBottom:8}}>AUCTION DURATION</label>
                    <div style={{display:'flex',gap:6,marginBottom:14}}>
                      {[['24','24h'],['48','48h'],['72','72h']].map(([v,l])=>(
                        <button key={v} onClick={()=>setDuration(v)} style={{flex:1,padding:'10px 4px',borderRadius:12,fontSize:12,fontWeight:700,background:duration===v?'rgba(255,106,85,0.15)':'var(--card)',border:`1.5px solid ${duration===v?'#FF6A55':'rgba(20,160,155,0.12)'}`,color:duration===v?'#FF6A55':'var(--ink3)'}}>{l}</button>
                      ))}
                    </div>
                  </>
                )}
                <label style={{display:'block',fontSize:10,fontWeight:700,letterSpacing:'.1em',color:'var(--ink3)',marginBottom:8}}>CONDITION</label>
                <div style={{display:'flex',gap:6,marginBottom:18}}>
                  {conds.map(c=>(
                    <button key={c} onClick={()=>setF('cond',c)} style={{flex:1,padding:'10px 4px',borderRadius:12,fontSize:12,fontWeight:700,background:f.cond===c?'rgba(20,160,155,0.15)':'var(--card)',border:`1.5px solid ${f.cond===c?'#14A09B':'rgba(20,160,155,0.12)'}`,color:f.cond===c?'#14A09B':'var(--ink3)'}}>{c}</button>
                  ))}
                </div>
                {/* Preview */}
                <div style={{fontSize:10,fontWeight:700,letterSpacing:'.1em',color:'var(--ink3)',marginBottom:7}}>PREVIEW</div>
                <div style={{background:'var(--card)',borderRadius:16,border:'1px solid rgba(20,160,155,0.1)',padding:'12px 14px',display:'flex',gap:12,alignItems:'center',marginBottom:14}}>
                  <div style={{width:48,height:48,borderRadius:12,background:'#F3E9D7',display:'flex',alignItems:'center',justifyContent:'center',fontSize:24,flexShrink:0,overflow:'hidden'}}>
                    {photos[0]?<img src={photos[0]} alt="Cover" style={{width:'100%',height:'100%',objectFit:'cover'}}/>:f.emoji}
                  </div>
                  <div style={{flex:1,minWidth:0}}>
                    <div style={{fontSize:14,fontWeight:700,color:'var(--ink)',whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>{f.name||'Your item'}</div>
                    <div style={{fontSize:11,color:'var(--ink3)'}}>You · Unit 5C · Just now</div>
                  </div>
                  <div style={{fontFamily:"'Baloo Bhaijaan 2',sans-serif",fontSize:16,fontWeight:700,color:'#14A09B',flexShrink:0}}>{mode==='auction'?<span style={{fontSize:12,color:'#FF6A55'}}>⚡ from </span>:null}EGP {f.price||'0'}{mode==='fixed'?f.unit:''}</div>
                </div>
                {/* Verification notice */}
                <div style={{display:'flex',gap:10,alignItems:'flex-start',background:'rgba(255,106,85,0.08)',border:'1px solid rgba(255,106,85,0.2)',borderRadius:14,padding:'11px 14px',marginBottom:16}}>
                  <Shield size={15} strokeWidth={2} style={{color:'#FF6A55',flexShrink:0,marginTop:1}}/>
                  <p style={{fontSize:11.5,color:'var(--ink3)',lineHeight:1.55}}>To keep Karro scam-free, every listing is <strong>verified by the community team</strong> before it appears in the market. Approval usually takes under 2 hours.</p>
                </div>
                {err&&<p style={{fontSize:12,color:'#E8513C',marginBottom:10,textAlign:'center'}}>{err}</p>}
                <div style={{display:'flex',gap:8}}>
                  <button onClick={()=>setStep(1)} className="btn-ghost-em" style={{padding:'15px 20px',borderRadius:100,fontSize:14}}>← Back</button>
                  <button onClick={submit} disabled={!f.price||busy} className="btn-em" style={{flex:1,padding:'15px',borderRadius:100,fontSize:14,opacity:(!f.price||busy)?0.5:1,boxShadow:'0 6px 20px rgba(20,160,155,0.3)'}}>{busy?'Submitting…':'Submit for Review 🛡️'}</button>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export { SellSheet };
