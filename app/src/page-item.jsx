import React from 'react';
import { SELLERS, CATS, LISTINGS } from './data.js';
import { ItemImage, Stars, Confetti } from './shared.jsx';
import { ArrowLeft, X } from './icons.jsx';
import { api } from './api.js';
import { shareItem } from './share-util.js';
import { ReportSheet, BlockSheet } from './trust-safety.jsx';
/* Item detail page */
const { useState, useEffect, useRef } = React;

const ItemDetailPage = ({item, onBack, onItemSelect, onSellerOpen}) => {
  const sellerRec = SELLERS.find(s=>s.name===item.seller);
  const seller = sellerRec || {name:item.seller,avatar:item.seller==='You'?'🙋':'👤',unit:item.unit_,rating:null,sales:0,since:'',badge:'New',bio:''};
  const cat = CATS.find(c=>c.id===item.catId);
  const [msgs,setMsgs]   = useState([]);
  const [draft,setDraft] = useState('');
  const [typing,setTyping] = useState(false);
  const [saved,setSaved] = useState(false);
  const [toast,setToast] = useState(null);
  const [offerOpen,setOfferOpen] = useState(false);
  const [offerAmt,setOfferAmt]   = useState('');
  const [offerDone,setOfferDone] = useState(false);
  const [optionsOpen,setOptionsOpen] = useState(false);
  const [reportOpen,setReportOpen]   = useState(false);
  const [blockOpen,setBlockOpen]     = useState(false);
  const scrollRef = useRef();
  const inputRef  = useRef();
  const galRef    = useRef();
  const [pic,setPic] = useState(0);

  const pics = (item.imgs&&item.imgs.length)?item.imgs:(item.img?[item.img]:[]);
  const fmt = `EGP ${Number(item.price.toFixed(2))}${item.unit}`;
  const [allItems,setAllItems] = useState([]);
  const similar = allItems.filter(l=>l.id!==item.id&&l.catId===item.catId)
    .concat(allItems.filter(l=>l.id!==item.id&&l.catId!==item.catId)).slice(0,5);
  useEffect(()=>{ api.listings().then(setAllItems).catch(()=>setAllItems([])); },[]);
  useEffect(()=>{ api.messages(item.id).then(ms=>{ if(ms&&ms.length) setMsgs(ms.map(m=>({me:true,text:m.text}))); }).catch(()=>{}); },[item.id]);

  const showToast = (t) => { setToast(t); setTimeout(()=>setToast(null),2200); };

  const onGalScroll = () => { const el=galRef.current; if(!el)return; setPic(Math.round(el.scrollLeft/el.clientWidth)); };
  const goPic = (i) => { const el=galRef.current; if(!el)return; el.scrollTo({left:i*el.clientWidth,behavior:'smooth'}); };

  const send = (text) => {
    const t = (text||draft).trim(); if(!t) return;
    setMsgs(m=>[...m,{me:true,text:t}]); setDraft('');
    api.sendMessage(item.id,t).catch(()=>{});
    // Fake auto-replies removed — the seller answers when they see it.
  };

  const sendOffer = () => {
    if(!parseFloat(offerAmt)) return;
    api.sendOffer(item.id, parseFloat(offerAmt)).catch(()=>{});
    setOfferDone(true);
    setTimeout(()=>{setOfferOpen(false);setOfferDone(false);setOfferAmt('');showToast('🤝 Offer sent to '+seller.name.split(' ')[0]+'!');},2400);
  };

  const goToComposer = () => {
    if(scrollRef.current) scrollRef.current.scrollTo({top:scrollRef.current.scrollHeight,behavior:'smooth'});
    setTimeout(()=>inputRef.current&&inputRef.current.focus(),350);
  };

  useEffect(()=>{
    if(msgs.length&&scrollRef.current) scrollRef.current.scrollTo({top:scrollRef.current.scrollHeight,behavior:'smooth'});
  },[msgs,typing]);

  const chips = ['Is this still available?','Can I pick up today?','Would you take a bit less?'];

  const handleShare = async () => {
    try {
      const result = await shareItem(item);
      if (result?.copied) {
        showToast('📋 Copied to clipboard!');
      }
    } catch (err) {
      showToast('Share failed');
    }
  };

  return (
    <div style={{flex:1,display:'flex',flexDirection:'column',minHeight:0,position:'relative'}}>
      <div ref={scrollRef} style={{flex:1,overflowY:'auto',paddingBottom:96}} className="sh">

        {/* Hero gallery */}
        <div style={{position:'relative',height:300,background:item.bg,overflow:'hidden'}}>
          {pics.length>0?(
            <div ref={galRef} onScroll={onGalScroll} className="sh" style={{display:'flex',overflowX:'auto',scrollSnapType:'x mandatory',height:'100%',scrollBehavior:'smooth'}}>
              {pics.map((src,i)=>(
                <div key={i} style={{flex:'0 0 100%',scrollSnapAlign:'start',height:'100%',position:'relative'}}>
                  <ItemImage src={src} emoji={item.emoji} bg={item.bg} fontSize={110} style={{position:'absolute',inset:0}}/>
                </div>
              ))}
            </div>
          ):(
            <ItemImage src={item.img} emoji={item.emoji} bg={item.bg} fontSize={110} style={{position:'absolute',inset:0}}/>
          )}
          <div style={{position:'absolute',top:0,left:0,right:0,height:90,background:'linear-gradient(180deg,rgba(10,53,64,0.45),transparent)',pointerEvents:'none'}}></div>
          <div style={{position:'absolute',top:50,left:14,right:14,display:'flex',justifyContent:'space-between',pointerEvents:'none'}}>
            <button onClick={onBack} className="cp" style={{pointerEvents:'auto',width:38,height:38,borderRadius:12,background:'rgba(10,53,64,0.55)',backdropFilter:'blur(8px)',border:'none',display:'flex',alignItems:'center',justifyContent:'center',color:'#FFFFFF'}}>
              <ArrowLeft size={18} strokeWidth={2.4}/>
            </button>
            <div style={{display:'flex',gap:8,pointerEvents:'auto'}}>
              <button onClick={handleShare} className="cp" style={{width:38,height:38,borderRadius:12,background:'rgba(10,53,64,0.55)',backdropFilter:'blur(8px)',border:'none',display:'flex',alignItems:'center',justifyContent:'center',fontSize:16}}>
                <span>↗️</span>
              </button>
              <button onClick={()=>{setSaved(s=>!s);showToast(saved?'Removed from saved':'❤️ Saved!');}} className="cp" style={{width:38,height:38,borderRadius:12,background:'rgba(10,53,64,0.55)',backdropFilter:'blur(8px)',border:'none',display:'flex',alignItems:'center',justifyContent:'center',fontSize:16}}>
                <span style={{filter:saved?'none':'grayscale(1) opacity(0.85)',display:'inline-block',animation:saved?'tabPop .35s cubic-bezier(0.34,1.56,0.64,1)':'none'}}>❤️</span>
              </button>
              <button onClick={()=>setOptionsOpen(true)} aria-label="More options" className="cp" style={{width:38,height:38,borderRadius:12,background:'rgba(10,53,64,0.55)',backdropFilter:'blur(8px)',border:'none',display:'flex',alignItems:'center',justifyContent:'center',fontSize:15,fontWeight:800,color:'#FFFFFF',letterSpacing:'0.05em'}}>···</button>
            </div>
          </div>
          {pics.length>1&&(
            <>
              <div style={{position:'absolute',top:54,left:'50%',transform:'translateX(-50%)',background:'rgba(10,53,64,0.55)',backdropFilter:'blur(8px)',borderRadius:100,padding:'4px 11px',fontSize:11,fontWeight:700,color:'#FFFFFF',pointerEvents:'none',whiteSpace:'nowrap'}}>{pic+1} / {pics.length}</div>
              <div style={{position:'absolute',bottom:12,left:0,right:0,display:'flex',justifyContent:'center',gap:6}}>
                {pics.map((_,i)=>(
                  <button key={i} onClick={()=>goPic(i)} style={{width:i===pic?20:7,height:7,borderRadius:100,border:'none',padding:0,background:i===pic?'#FFFFFF':'rgba(255,255,255,0.45)',boxShadow:'0 1px 4px rgba(10,53,64,0.3)',transition:'all .3s cubic-bezier(0.22,1,0.36,1)'}}></button>
                ))}
              </div>
            </>
          )}
          {item.tag&&<div style={{position:'absolute',bottom:12,left:14,background:'#14A09B',color:'#FFFFFF',fontSize:11,fontWeight:700,letterSpacing:'0.08em',padding:'5px 12px',borderRadius:100,boxShadow:'0 4px 14px rgba(20,160,155,0.4)',pointerEvents:'none',whiteSpace:'nowrap'}}>{item.tag}</div>}
        </div>

        {/* Title + price */}
        <div style={{padding:'18px 18px 0',animation:'fadeUp .35s ease-out both'}}>
          <div style={{display:'flex',alignItems:'center',gap:6,marginBottom:8}}>
            {cat&&<span style={{background:cat.bg,color:cat.c,fontSize:11,fontWeight:700,padding:'4px 11px',borderRadius:100,whiteSpace:'nowrap'}}>{cat.emoji} {cat.name}</span>}
            <span style={{fontSize:11,color:'var(--ink3)'}}>· {item.posted}</span>
          </div>
          <h1 style={{fontFamily:"'Baloo Bhaijaan 2',sans-serif",fontSize:26,fontWeight:900,lineHeight:1.15,marginBottom:6}}>{item.name}</h1>
          <div style={{fontFamily:"'Baloo Bhaijaan 2',sans-serif",fontSize:28,fontWeight:900,color:'#14A09B'}}>{fmt}</div>
        </div>

        {/* Description */}
        {item.desc&&(
          <div style={{padding:'16px 18px 0',animation:'fadeUp .35s .06s ease-out both'}}>
            <div style={{fontSize:11,fontWeight:700,letterSpacing:'0.1em',color:'var(--ink3)',marginBottom:7}}>ABOUT THIS ITEM</div>
            <p style={{fontSize:14,lineHeight:1.7,color:'#3A5A61'}}>{item.desc}</p>
          </div>
        )}

        {/* Details grid */}
        <div style={{padding:'16px 18px 0',animation:'fadeUp .35s .1s ease-out both'}}>
          <div style={{background:'var(--card)',border:'1px solid rgba(20,160,155,0.1)',borderRadius:16,overflow:'hidden'}}>
            {[['Condition',item.cond||'—'],['Pickup','Unit '+item.unit_],['Listed',item.posted],['Payment','Cash or in-app on pickup']].map(([k,v],i,arr)=>(
              <div key={k} style={{display:'flex',justifyContent:'space-between',gap:16,padding:'12px 15px',borderBottom:i<arr.length-1?'1px solid rgba(20,160,155,0.07)':'none'}}>
                <span style={{fontSize:13,color:'var(--ink3)',fontWeight:500,flexShrink:0}}>{k}</span>
                <span style={{fontSize:13,fontWeight:700,color:'var(--ink)',whiteSpace:'nowrap'}}>{v}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Seller card */}
        <div style={{padding:'16px 18px 0',animation:'fadeUp .35s .14s ease-out both'}}>
          <div style={{fontSize:11,fontWeight:700,letterSpacing:'0.1em',color:'var(--ink3)',marginBottom:7}}>SELLER</div>
          <div onClick={()=>sellerRec&&onSellerOpen&&onSellerOpen(sellerRec.id)} className={sellerRec?'cp':''} style={{background:'linear-gradient(145deg,#0A3540,#0D7E7A)',borderRadius:18,padding:'16px',color:'#FFFFFF',cursor:sellerRec?'pointer':'default'}}>
            <div style={{display:'flex',alignItems:'center',gap:12}}>
              <div style={{width:50,height:50,borderRadius:16,background:'rgba(255,138,115,0.18)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:26,flexShrink:0}}>{seller.avatar}</div>
              <div style={{flex:1}}>
                <div style={{display:'flex',alignItems:'center',gap:7}}>
                  <span style={{fontFamily:"'Baloo Bhaijaan 2',sans-serif",fontSize:16,fontWeight:700}}>{seller.name}</span>
                  <span style={{background:'rgba(255,138,115,0.15)',color:'#FF8A73',fontSize:9,fontWeight:800,letterSpacing:'0.06em',padding:'3px 8px',borderRadius:100}}>{seller.badge}</span>
                </div>
                <div style={{display:'flex',alignItems:'center',gap:5,marginTop:3}}>
                  {seller.rating?<Stars rating={seller.rating} size={11}/>:null}
                  <span style={{fontSize:11,color:'rgba(255,255,255,0.55)'}}>{seller.rating?seller.rating+' · ':''}{seller.sales} sales</span>
                </div>
              </div>
              {sellerRec&&<span style={{fontSize:11,fontWeight:700,color:'#FF8A73',flexShrink:0}}>Profile →</span>}
            </div>
            <div style={{display:'flex',gap:8,marginTop:12}}>
              {[['🏠','Unit '+(seller.unit||'—')],['🌴','El Gouna'],['💬','In-app chat']].map(([e,l])=>(
                <div key={l} style={{flex:1,background:'rgba(255,255,255,0.06)',borderRadius:11,padding:'8px 4px',textAlign:'center'}}>
                  <div style={{fontSize:13}}>{e}</div>
                  <div style={{fontSize:10,fontWeight:600,color:'rgba(255,255,255,0.75)',marginTop:2}}>{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Message window */}
        <div style={{padding:'16px 18px 0',animation:'fadeUp .35s .18s ease-out both'}}>
          <div style={{fontSize:11,fontWeight:700,letterSpacing:'0.1em',color:'var(--ink3)',marginBottom:7}}>MESSAGE {seller.name.split(' ')[0].toUpperCase()}</div>
          <div style={{background:'var(--card)',border:'1px solid rgba(20,160,155,0.12)',borderRadius:18,overflow:'hidden'}}>
            {(msgs.length>0||typing)&&(
              <div style={{padding:'14px 14px 6px',display:'flex',flexDirection:'column',gap:8}}>
                {msgs.map((m,i)=>(
                  <div key={i} style={{alignSelf:m.me?'flex-end':'flex-start',maxWidth:'80%',background:m.me?'linear-gradient(135deg,#14A09B,#0D7E7A)':'rgba(20,160,155,0.08)',color:m.me?'#FFFFFF':'var(--ink)',fontSize:13,lineHeight:1.5,padding:'9px 13px',borderRadius:m.me?'15px 15px 4px 15px':'15px 15px 15px 4px',animation:'fadeUp .25s ease-out both'}}>
                    {m.text}
                  </div>
                ))}
                {typing&&(
                  <div style={{alignSelf:'flex-start',background:'rgba(20,160,155,0.08)',borderRadius:'15px 15px 15px 4px',padding:'11px 14px',display:'flex',gap:4,animation:'fadeIn .2s ease-out'}}>
                    {[0,1,2].map(n=><span key={n} style={{width:6,height:6,borderRadius:'50%',background:'#14A09B',opacity:0.5,animation:`livePulse 1s ${n*0.18}s ease-in-out infinite`}}></span>)}
                  </div>
                )}
              </div>
            )}
            {msgs.length===0&&(
              <div style={{padding:'12px 14px 0',display:'flex',flexWrap:'wrap',gap:6}}>
                {chips.map(c=>(
                  <button key={c} onClick={()=>send(c)} style={{background:'rgba(20,160,155,0.07)',border:'1px solid rgba(20,160,155,0.18)',borderRadius:100,padding:'7px 13px',fontSize:12,fontWeight:600,color:'#14A09B'}}>{c}</button>
                ))}
              </div>
            )}
            <div style={{display:'flex',gap:8,padding:'12px 12px 14px',alignItems:'flex-end'}}>
              <div className="iwl" style={{flex:1,background:'var(--bg)',border:'1px solid rgba(20,160,155,0.15)',borderRadius:14,padding:'11px 14px'}}>
                <input ref={inputRef} type="text" className="lp" value={draft} onChange={e=>setDraft(e.target.value)} onKeyDown={e=>{if(e.key==='Enter')send();}} placeholder={`Message ${seller.name.split(' ')[0]}…`} style={{background:'transparent',border:'none',color:'var(--ink)',fontSize:14,width:'100%',fontFamily:"'Rubik',sans-serif"}}/>
              </div>
              <button onClick={()=>send()} className="btn-em" style={{width:44,height:44,borderRadius:13,display:'flex',alignItems:'center',justifyContent:'center',fontSize:17,flexShrink:0,opacity:draft.trim()?1:0.45}}>➤</button>
            </div>
          </div>
        </div>

        {/* Similar items */}
        {similar.length>0&&(
          <div style={{padding:'18px 0 10px',animation:'fadeUp .35s .22s ease-out both'}}>
            <div style={{fontSize:11,fontWeight:700,letterSpacing:'0.1em',color:'var(--ink3)',margin:'0 18px 8px'}}>SIMILAR ITEMS</div>
            <div style={{overflowX:'auto',display:'flex',gap:10,padding:'0 18px 4px'}} className="sh">
              {similar.map(l=>(
                <button key={l.id} onClick={()=>onItemSelect&&onItemSelect(l)} className="cp" style={{flexShrink:0,width:132,background:'var(--card)',borderRadius:15,overflow:'hidden',border:'1px solid rgba(20,160,155,0.09)',textAlign:'left',padding:0}}>
                  <div style={{height:84,background:l.bg,position:'relative',overflow:'hidden'}}>
                    <ItemImage src={l.img} emoji={l.emoji} bg={l.bg} fontSize={36} style={{position:'absolute',inset:0}}/>
                  </div>
                  <div style={{padding:'9px 10px'}}>
                    <div style={{fontSize:12,fontWeight:700,color:'var(--ink)',lineHeight:1.25,marginBottom:3,whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>{l.name}</div>
                    <div style={{fontFamily:"'Baloo Bhaijaan 2',sans-serif",fontSize:13,fontWeight:700,color:'#14A09B'}}>EGP {Number(l.price.toFixed(2))}{l.unit}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Sticky action bar */}
      <div style={{position:'absolute',bottom:0,left:0,right:0,background:'rgba(255,255,255,0.96)',backdropFilter:'blur(12px)',borderTop:'1px solid rgba(20,160,155,0.12)',padding:'12px 16px 26px',display:'flex',alignItems:'center',gap:10,animation:'slideUp .35s cubic-bezier(0.22,1,0.36,1)'}}>
        <div style={{flexShrink:0}}>
          <div style={{fontSize:10,fontWeight:700,letterSpacing:'0.08em',color:'var(--ink3)'}}>PRICE</div>
          <div style={{fontFamily:"'Baloo Bhaijaan 2',sans-serif",fontSize:19,fontWeight:900,color:'#14A09B',lineHeight:1.1}}>{fmt}</div>
        </div>
        <button onClick={()=>{setOfferOpen(true);setOfferAmt('');}} className="btn-ghost-em" style={{flex:1,padding:'14px 8px',borderRadius:100,fontSize:13}}>🏷 Offer</button>
        <button onClick={goToComposer} className="btn-em" style={{flex:1.4,padding:'15px 8px',borderRadius:100,fontSize:13,boxShadow:'0 6px 20px rgba(20,160,155,0.35)'}}>💬 Message</button>
      </div>

      {/* OFFER SHEET */}
      {offerOpen&&(
        <div style={{position:'fixed',inset:0,zIndex:50,display:'flex',alignItems:'flex-end',justifyContent:'center',background:'rgba(10,53,64,0.6)',backdropFilter:'blur(4px)',animation:'fadeIn .25s ease-out'}} onClick={()=>{if(!offerDone)setOfferOpen(false);}}>
          <div className="su" style={{width:'100%',maxWidth:440,background:'var(--bg)',borderRadius:'26px 26px 0 0',padding:'24px 22px 44px'}} onClick={e=>e.stopPropagation()}>
            {offerDone?(
              <div style={{textAlign:'center',padding:'18px 0'}}>
                <Confetti show={true}/>
                <div style={{fontSize:54,marginBottom:10,animation:'scaleIn .4s cubic-bezier(0.34,1.56,0.64,1)'}}>🤝</div>
                <h2 style={{fontFamily:"'Baloo Bhaijaan 2',sans-serif",fontSize:23,fontWeight:700,color:'#14A09B',marginBottom:8}}>Offer sent!</h2>
                <p style={{fontSize:14,color:'var(--ink3)',lineHeight:1.6}}>We sent your offer of <strong style={{color:'var(--ink)'}}>EGP {offerAmt}</strong> to {seller.name}.<br/>They usually respond within an hour.</p>
              </div>
            ):(
              <>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:16}}>
                  <h3 style={{fontFamily:"'Baloo Bhaijaan 2',sans-serif",fontSize:20,fontWeight:700}}>Make an Offer</h3>
                  <button onClick={()=>setOfferOpen(false)} className="btn-icon-teal" style={{width:34,height:34,borderRadius:10,display:'flex',alignItems:'center',justifyContent:'center'}}><X size={15}/></button>
                </div>
                <div style={{background:'var(--card)',borderRadius:14,padding:'12px 14px',marginBottom:16,display:'flex',gap:12,alignItems:'center',border:'1px solid rgba(20,160,155,0.1)'}}>
                  <div style={{width:44,height:44,borderRadius:11,overflow:'hidden',flexShrink:0}}><ItemImage src={pics[0]||item.img} emoji={item.emoji} bg={item.bg} fontSize={24}/></div>
                  <div>
                    <div style={{fontSize:14,fontWeight:700,color:'var(--ink)'}}>{item.name}</div>
                    <div style={{fontSize:12,color:'#14A09B',fontWeight:700}}>Asking {fmt}</div>
                  </div>
                </div>
                <div style={{display:'flex',gap:8,marginBottom:12}}>
                  {[5,10,15].map(p=>(
                    <button key={p} onClick={()=>setOfferAmt(String(Math.round(item.price*(1-p/100)*100)/100))} style={{flex:1,padding:'10px 4px',borderRadius:12,background:'rgba(20,160,155,0.07)',border:'1px solid rgba(20,160,155,0.18)',color:'#14A09B',fontWeight:700,fontSize:12}}>
                      −{p}% <span style={{fontWeight:500,opacity:0.75}}>(EGP {Math.round(item.price*(1-p/100)*100)/100})</span>
                    </button>
                  ))}
                </div>
                <div className="iwl" style={{display:'flex',alignItems:'center',gap:10,background:'var(--card)',border:'1px solid rgba(20,160,155,0.15)',borderRadius:14,padding:'13px 16px',marginBottom:16}}>
                  <span style={{fontFamily:"'Baloo Bhaijaan 2',sans-serif",fontSize:19,fontWeight:700,color:'#14A09B'}}>EGP</span>
                  <input type="number" className="lp" value={offerAmt} onChange={e=>setOfferAmt(e.target.value)} placeholder="Your offer" style={{background:'transparent',border:'none',color:'var(--ink)',fontSize:17,fontFamily:"'Baloo Bhaijaan 2',sans-serif",fontWeight:700,width:'100%'}}/>
                </div>
                <button onClick={sendOffer} className="btn-em" style={{width:'100%',padding:'16px',borderRadius:100,fontSize:14,opacity:parseFloat(offerAmt)>0?1:0.5}}>Send Offer →</button>
              </>
            )}
          </div>
        </div>
      )}

      {/* Options sheet — report / block (App Store 1.2) */}
      {optionsOpen&&(
        <div style={{position:'fixed',inset:0,zIndex:65,display:'flex',alignItems:'flex-end',justifyContent:'center',background:'rgba(10,53,64,0.6)',backdropFilter:'blur(4px)',animation:'fadeIn .25s ease-out'}} onClick={()=>setOptionsOpen(false)}>
          <div className="su" style={{width:'100%',maxWidth:440,background:'var(--bg)',borderRadius:'26px 26px 0 0',padding:'10px 22px 44px'}} onClick={e=>e.stopPropagation()}>
            <div style={{width:40,height:4,borderRadius:100,background:'rgba(20,160,155,0.2)',margin:'0 auto 16px'}}></div>
            <button onClick={()=>{setOptionsOpen(false);setReportOpen(true);}} style={{width:'100%',display:'flex',alignItems:'center',gap:12,padding:'15px 16px',background:'var(--card)',border:'1px solid rgba(20,160,155,0.12)',borderRadius:14,textAlign:'left',marginBottom:8}}>
              <span style={{fontSize:17}}>⚑</span>
              <div>
                <div style={{fontSize:13.5,fontWeight:700,color:'var(--ink)'}}>Report this listing</div>
                <div style={{fontSize:11.5,color:'var(--ink2)'}}>Confidential — reviewed within 24 hours</div>
              </div>
            </button>
            <button onClick={()=>{setOptionsOpen(false);setBlockOpen(true);}} style={{width:'100%',display:'flex',alignItems:'center',gap:12,padding:'15px 16px',background:'rgba(232,81,60,0.06)',border:'1px solid rgba(232,81,60,0.15)',borderRadius:14,textAlign:'left',marginBottom:8}}>
              <span style={{fontSize:17}}>🚫</span>
              <div>
                <div style={{fontSize:13.5,fontWeight:700,color:'#E8513C'}}>Block {seller.name.split(' ')[0]}</div>
                <div style={{fontSize:11.5,color:'var(--ink2)'}}>Hide their listings and stop all contact</div>
              </div>
            </button>
            <button onClick={()=>setOptionsOpen(false)} style={{width:'100%',padding:'14px',borderRadius:100,fontSize:14,fontWeight:700,background:'transparent',color:'var(--ink2)',border:'1.5px solid rgba(20,160,155,0.2)',marginTop:4}}>Cancel</button>
          </div>
        </div>
      )}
      {reportOpen&&<ReportSheet item={item} onClose={()=>setReportOpen(false)}/>}
      {blockOpen&&<BlockSheet sellerName={seller.name.split(' ')[0]} sellerId={item.sellerId||(sellerRec&&sellerRec.id)||item.seller} onClose={()=>setBlockOpen(false)} onBlocked={()=>{showToast('Member blocked');setTimeout(onBack,900);}}/>}

      {/* Toast */}
      {toast&&(
        <div style={{position:'absolute',top:100,left:'50%',transform:'translateX(-50%)',zIndex:60,background:'#0A3540',color:'#FFFFFF',borderRadius:100,padding:'10px 20px',fontSize:13,fontWeight:600,boxShadow:'0 6px 20px rgba(10,53,64,0.35)',animation:'fadeUp .25s ease-out',whiteSpace:'nowrap'}}>{toast}</div>
      )}
    </div>
  );
};

export { ItemDetailPage };
