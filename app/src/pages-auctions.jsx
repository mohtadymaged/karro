import React from 'react';
import { AUCTION_BASE, CATS } from './data.js';
import { ItemImage, Stars, DarkField } from './shared.jsx';
import { NotifSheet, NOTIFS } from './pages-home.jsx';
import { Bell, X } from './icons.jsx';
/* Auctions page */
const { useState, useEffect, useMemo } = React;

const AuctionsPage = () => {
  const [filter, setFilter] = useState('all');
  const [bids, setBids] = useState({});
  const [bidCounts, setBidCounts] = useState({});
  const [bidModal, setBidModal] = useState(null);
  const [bidAmt, setBidAmt] = useState('');
  const [bidDone, setBidDone] = useState(false);
  const [submitOpen, setSubmitOpen] = useState(false);
  const [submitStep, setSubmitStep] = useState(1);
  const [submitDone, setSubmitDone] = useState(false);
  const [form, setForm] = useState({title:'',cat:'',desc:'',startBid:'',reserve:'',duration:'48'});
  const [flash, setFlash] = useState({});
  const [showNotifs, setShowNotifs] = useState(false);
  const setF = (k,v) => setForm(f=>({...f,[k]:v}));

  /* live bid ticker */
  useEffect(()=>{
    const iv=setInterval(()=>{
      const live=AUCTION_BASE.filter(a=>a.status==='live');
      const r=live[Math.floor(Math.random()*live.length)];
      if(r){
        const inc=Math.floor(Math.random()*75)+25;
        setBids(p=>({...p,[r.id]:(p[r.id]||r.currentBid)+inc}));
        setBidCounts(p=>({...p,[r.id]:(p[r.id]||r.bids)+1}));
        setFlash(p=>({...p,[r.id]:true}));
        setTimeout(()=>setFlash(p=>({...p,[r.id]:false})),600);
      }
    },4500);
    return()=>clearInterval(iv);
  },[]);

  const getBid = a => bids[a.id] || a.currentBid;
  const getCnt = a => bidCounts[a.id] || a.bids;
  const live = AUCTION_BASE.filter(a=>a.status==='live');
  const review = AUCTION_BASE.filter(a=>a.status==='review');
  const urgent = live.filter(a=>a.endH<2);
  const display = filter==='ending'?urgent:filter==='review'?review:live;

  const placeBid = () => {
    if(!bidModal) return;
    const min = getBid(bidModal)+50;
    if(parseFloat(bidAmt)<min) return;
    setBids(p=>({...p,[bidModal.id]:parseFloat(bidAmt)}));
    setBidCounts(p=>({...p,[bidModal.id]:getCnt(bidModal)+1}));
    setBidDone(true);
    setTimeout(()=>{setBidModal(null);setBidDone(false);setBidAmt('');},2200);
  };

  const submitAuction = () => {
    setSubmitDone(true);
    setTimeout(()=>{setSubmitOpen(false);setSubmitDone(false);setSubmitStep(1);setForm({title:'',cat:'',desc:'',startBid:'',reserve:'',duration:'48'});},2500);
  };

  const AuctionCard = ({a, i=0}) => {
    const cb=getBid(a); const cnt=getCnt(a); const urgent=a.endH<2&&a.status==='live';
    return (
      <div className={`card-press s${Math.min(i+1,9)}`} style={{background:'linear-gradient(180deg,#0A3540 0%,#0D7E7A 100%)',borderRadius:22,overflow:'hidden',marginBottom:12,boxShadow:'0 8px 32px rgba(10,53,64,0.35)',animation:'fadeUp .4s ease-out both'}}>
        {/* Item visual */}
        <div style={{position:'relative',height:140,display:'flex',alignItems:'center',justifyContent:'center',background:a.bg,overflow:'hidden'}}>
          <ItemImage src={a.img} emoji={a.emoji} bg={a.bg} fontSize={70} style={{position:'absolute',inset:0}}/>
          {a.hot&&<div style={{position:'absolute',top:12,left:12,background:'#E8513C',color:'#fff',fontSize:10,fontWeight:800,letterSpacing:'0.1em',padding:'4px 10px',borderRadius:100,animation:'urgentTick 1s ease-in-out infinite',boxShadow:'0 2px 10px rgba(232,81,60,0.5)'}}>🔥 HOT</div>}
          <div style={{position:'absolute',top:12,right:12,display:'flex',alignItems:'center',gap:5,background:'rgba(10,53,64,0.75)',borderRadius:100,padding:'5px 10px',backdropFilter:'blur(6px)',animation:'fadeIn .25s ease-out'}}>
            <div style={{width:7,height:7,borderRadius:'50%',background:a.status==='live'?'#7ED8D3':'#FF6A55',animation:'livePulse 1.2s ease-in-out infinite'}}/>
            <span style={{fontSize:10,fontWeight:700,letterSpacing:'0.08em',color:a.status==='live'?'#7ED8D3':'#FF6A55'}}>{a.status==='live'?'LIVE':'REVIEW'}</span>
          </div>
        </div>
        {/* Content */}
        <div style={{padding:'16px'}}>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:4}}>
            <div style={{flex:1,marginRight:8}}>
              <h3 style={{fontFamily:"'Baloo Bhaijaan 2',sans-serif",fontSize:17,fontWeight:700,color:'#FFFFFF',lineHeight:1.2}}>{a.title}</h3>
              <p style={{fontSize:11,color:'rgba(255,255,255,0.5)',marginTop:2}}>{a.sub}</p>
            </div>
            {a.status==='live'&&(
              <div style={{textAlign:'right',flexShrink:0}}>
                <div style={{fontSize:10,color:urgent?'#FF6A55':'rgba(255,255,255,0.4)',fontWeight:600,letterSpacing:'0.06em',animation:urgent?'urgentTick 1s ease-in-out infinite':'none'}}>
                  ⏱ {a.endH}h {a.endM}m
                </div>
              </div>
            )}
            {a.status==='review'&&(
              <div style={{background:'rgba(255,106,85,0.12)',border:'1px solid rgba(255,106,85,0.25)',borderRadius:8,padding:'4px 10px'}}>
                <div style={{fontSize:9,color:'#FF6A55',fontWeight:700}}>DAY {a.reviewDays}/3</div>
                <div style={{fontSize:8,color:'rgba(255,106,85,0.6)'}}>REVIEWING</div>
              </div>
            )}
          </div>

          {a.status==='live'?(
            <>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',background:'rgba(255,255,255,0.04)',borderRadius:12,padding:'10px 14px',margin:'12px 0',animation:flash[a.id]?'bidFlash 0.5s ease-out':'none',transition:'all .3s'}}>
                <div>
                  <div style={{fontSize:10,color:'rgba(255,255,255,0.4)',fontWeight:600,letterSpacing:'0.08em'}}>CURRENT BID</div>
                  <div style={{fontFamily:"'Baloo Bhaijaan 2',sans-serif",fontSize:22,fontWeight:900,color:'#FF8A73',lineHeight:1.1}}>EGP {cb.toLocaleString()}</div>
                </div>
                <div style={{textAlign:'right'}}>
                  <div style={{fontSize:10,color:'rgba(255,255,255,0.4)',fontWeight:600,letterSpacing:'0.08em'}}>BIDS</div>
                  <div style={{fontFamily:"'Baloo Bhaijaan 2',sans-serif",fontSize:22,fontWeight:900,color:'#7ED8D3',lineHeight:1.1}}>{cnt}</div>
                </div>
              </div>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                <div style={{display:'flex',alignItems:'center',gap:6}}>
                  <span style={{fontSize:14}}>{a.status==='live'?'👤':''}</span>
                  <div>
                    <div style={{fontSize:11,color:'rgba(255,255,255,0.5)'}}>by {a.seller}</div>
                    <div style={{display:'flex',alignItems:'center',gap:3}}><Stars rating={a.sRating} size={10}/><span style={{fontSize:10,color:'rgba(255,255,255,0.4)'}}>({a.sSales})</span></div>
                  </div>
                </div>
                <button onClick={()=>{setBidModal(a);setBidAmt('');}} className="btn-gold" style={{padding:'10px 20px',borderRadius:100,fontSize:13,boxShadow:'0 4px 14px rgba(255,106,85,0.35)'}}>
                  Place Bid
                </button>
              </div>
            </>
          ):(
            <div style={{marginTop:10}}>
              <div style={{background:'rgba(255,106,85,0.08)',border:'1px dashed rgba(255,106,85,0.25)',borderRadius:12,padding:'12px',marginBottom:12}}>
                <div style={{fontSize:11,color:'rgba(255,106,85,0.7)',fontWeight:600,marginBottom:4}}>📋 Under Expert Review</div>
                <div style={{fontSize:12,color:'rgba(255,255,255,0.5)',lineHeight:1.5}}>Starting bid: <strong style={{color:'#FF8A73'}}>EGP {a.startBid.toLocaleString()}</strong> · Submitted {a.reviewDays} day{a.reviewDays>1?'s':''} ago · Est. 1-3 days</div>
              </div>
              <div style={{fontSize:11,color:'rgba(255,255,255,0.35)',lineHeight:1.5}}>{a.desc}</div>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div style={{flex:1,overflowY:'auto',paddingBottom:80}} className="sh">
      {/* Header */}
      <div style={{background:'linear-gradient(180deg,#0D7E7A 0%,#14A09B 100%)',padding:'58px 16px 16px',position:'sticky',top:0,zIndex:10}}>
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:14}}>
          <div>
            <div style={{display:'flex',alignItems:'center',gap:8}}>
              <div style={{width:8,height:8,borderRadius:'50%',background:'#7ED8D3',animation:'livePulse 1.2s ease-in-out infinite'}}/>
              <span style={{fontSize:10,fontWeight:700,letterSpacing:'0.14em',color:'#7ED8D3'}}>LIVE BIDDING</span>
            </div>
            <h1 style={{fontFamily:"'Baloo Bhaijaan 2',sans-serif",fontSize:26,fontWeight:900,color:'#FFFFFF',lineHeight:1.1,marginTop:2}}>
              ⚡ <span style={{color:'#FFFFFF'}}>Auctions</span>
            </h1>
          </div>
          <button onClick={()=>setShowNotifs(true)} aria-label="Notifications" style={{position:'relative',width:38,height:38,borderRadius:12,background:'rgba(255,255,255,0.14)',border:'1px solid rgba(255,255,255,0.22)',color:'#FFFFFF',display:'flex',alignItems:'center',justifyContent:'center'}}>
            <Bell size={16} strokeWidth={2}/>
            {NOTIFS.filter(n=>n.unread).length>0&&<span style={{position:'absolute',top:-4,right:-4,minWidth:15,height:15,borderRadius:100,background:'#E8513C',color:'#fff',fontSize:9,fontWeight:800,display:'flex',alignItems:'center',justifyContent:'center',padding:'0 4px'}}>{NOTIFS.filter(n=>n.unread).length}</span>}
          </button>
        </div>
        {/* Filter tabs */}
        <div style={{display:'flex',gap:6}}>
          {[['all','All Live'],['ending','Ending Soon'],['review','Under Review']].map(([id,l])=>(
            <button key={id} onClick={()=>setFilter(id)} style={{padding:'7px 14px',borderRadius:100,fontSize:12,fontWeight:600,background:filter===id?'rgba(255,106,85,0.2)':'rgba(255,255,255,0.05)',border:`1px solid ${filter===id?'rgba(255,106,85,0.5)':'rgba(255,255,255,0.08)'}`,color:filter===id?'#FF8A73':'rgba(255,255,255,0.5)'}}>
              {l} {id==='ending'&&urgent.length>0&&<span style={{background:'#E8513C',borderRadius:100,padding:'0 5px',fontSize:10}}>{urgent.length}</span>}
            </button>
          ))}
        </div>
      </div>

      <div style={{padding:'14px 16px'}}>
        {display.length===0&&<div style={{textAlign:'center',padding:'48px 24px',color:'rgba(255,255,255,0.4)'}}>
          <div style={{fontSize:40,marginBottom:12}}>📭</div>
          <div style={{fontFamily:"'Baloo Bhaijaan 2',sans-serif",fontSize:18,color:'#FFFFFF'}}>Nothing here yet</div>
          <p style={{fontSize:13,marginTop:6}}>Check back soon!</p>
        </div>}
        {display.map((a,i)=><AuctionCard key={a.id} a={a} i={i}/>)}
      </div>
      {showNotifs&&<NotifSheet onClose={()=>setShowNotifs(false)}/>}

      {/* BID MODAL */}
      {bidModal&&(
        <div style={{position:'fixed',inset:0,zIndex:50,display:'flex',alignItems:'flex-end',justifyContent:'center',background:'rgba(10,53,64,0.7)',backdropFilter:'blur(6px)',animation:'fadeIn .25s ease-out'}} onClick={()=>{if(!bidDone){setBidModal(null);setBidAmt('');}}}>
          <div className="su" style={{width:'100%',maxWidth:440,background:'linear-gradient(180deg,#0A3540 0%,#0D7E7A 100%)',borderRadius:'26px 26px 0 0',padding:'26px 22px 44px'}} onClick={e=>e.stopPropagation()}>
            {bidDone?(
              <div style={{textAlign:'center',padding:'20px 0'}}>
                <div style={{fontSize:56,marginBottom:12,animation:'scaleIn .4s cubic-bezier(0.34,1.56,0.64,1)'}}>🥇</div>
                <h2 style={{fontFamily:"'Baloo Bhaijaan 2',sans-serif",fontSize:24,fontWeight:700,color:'#FF8A73',marginBottom:8}}>You're the highest bidder!</h2>
                <p style={{fontSize:14,color:'rgba(255,255,255,0.55)'}}>We'll notify you if you're outbid.</p>
              </div>
            ):(
              <>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:18}}>
                  <h3 style={{fontFamily:"'Baloo Bhaijaan 2',sans-serif",fontSize:20,fontWeight:700,color:'#FFFFFF'}}>Place Your Bid</h3>
                  <button onClick={()=>{setBidModal(null);setBidAmt('');}} style={{background:'rgba(255,255,255,0.07)',border:'none',width:34,height:34,borderRadius:10,display:'flex',alignItems:'center',justifyContent:'center',color:'rgba(255,255,255,0.6)'}}><X size={16}/></button>
                </div>
                <div style={{background:'rgba(255,255,255,0.04)',borderRadius:14,padding:'14px',marginBottom:18,display:'flex',gap:12,alignItems:'center'}}>
                  <div style={{width:48,height:48,borderRadius:12,overflow:'hidden',flexShrink:0}}><ItemImage src={bidModal.img} emoji={bidModal.emoji} bg={bidModal.bg} fontSize={26}/></div>
                  <div>
                    <div style={{fontFamily:"'Baloo Bhaijaan 2',sans-serif",fontSize:15,fontWeight:700,color:'#FFFFFF'}}>{bidModal.title}</div>
                    <div style={{display:'flex',gap:12,marginTop:4}}>
                      <span style={{fontSize:11,color:'#FF8A73',fontWeight:700}}>Current: EGP {getBid(bidModal).toLocaleString()}</span>
                      <span style={{fontSize:11,color:'rgba(255,255,255,0.4)'}}>{getCnt(bidModal)} bids · {bidModal.endH}h {bidModal.endM}m</span>
                    </div>
                  </div>
                </div>
                <label style={{display:'block',fontSize:10,fontWeight:700,letterSpacing:'0.1em',color:'rgba(255,106,85,0.55)',marginBottom:7}}>YOUR BID (min. EGP {(getBid(bidModal)+50).toLocaleString()})</label>
                <div className="inp-wrap" style={{display:'flex',alignItems:'center',gap:10,background:'rgba(255,255,255,0.05)',border:'1px solid rgba(255,106,85,0.2)',borderRadius:14,padding:'14px 16px',marginBottom:16}}>
                  <span style={{fontFamily:"'Baloo Bhaijaan 2',sans-serif",fontSize:20,fontWeight:700,color:'#FF6A55',flexShrink:0}}>EGP</span>
                  <input type="number" value={bidAmt} onChange={e=>setBidAmt(e.target.value)} placeholder={(getBid(bidModal)+50).toString()} style={{background:'transparent',border:'none',color:'#FFFFFF',fontSize:18,fontFamily:"'Baloo Bhaijaan 2',sans-serif",fontWeight:700,width:'100%'}}/>
                </div>
                <button onClick={placeBid} className="btn-gold" style={{width:'100%',padding:'17px',borderRadius:100,fontSize:15,boxShadow:'0 6px 24px rgba(255,106,85,0.35)'}}>
                  Confirm Bid →
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {/* SUBMIT AUCTION MODAL */}
      {submitOpen&&(
        <div style={{position:'fixed',inset:0,zIndex:50,display:'flex',alignItems:'flex-end',justifyContent:'center',background:'rgba(10,53,64,0.7)',backdropFilter:'blur(6px)',animation:'fadeIn .25s ease-out'}} onClick={()=>setSubmitOpen(false)}>
          <div className="su" style={{width:'100%',maxWidth:440,background:'linear-gradient(180deg,#0A3540 0%,#0D7E7A 100%)',borderRadius:'26px 26px 0 0',padding:'26px 22px 44px',maxHeight:'90vh',overflowY:'auto'}} onClick={e=>e.stopPropagation()}>
            {submitDone?(
              <div style={{textAlign:'center',padding:'30px 0'}}>
                <div style={{fontSize:60,marginBottom:12,animation:'float 2s ease-in-out infinite'}}>📋</div>
                <h2 style={{fontFamily:"'Baloo Bhaijaan 2',sans-serif",fontSize:24,fontWeight:700,color:'#FF8A73',marginBottom:8}}>Submitted for Review!</h2>
                <p style={{fontSize:14,color:'rgba(255,255,255,0.55)',lineHeight:1.6}}>Our team will review your item within 1-3 days.<br/>You'll be notified once bidding opens.</p>
              </div>
            ):(
              <>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:6}}>
                  <h3 style={{fontFamily:"'Baloo Bhaijaan 2',sans-serif",fontSize:20,fontWeight:700,color:'#FFFFFF'}}>{submitStep===1?'Item Details':'Pricing & Duration'}</h3>
                  <button onClick={()=>setSubmitOpen(false)} style={{background:'rgba(255,255,255,0.07)',border:'none',width:34,height:34,borderRadius:10,display:'flex',alignItems:'center',justifyContent:'center',color:'rgba(255,255,255,0.6)'}}><X size={16}/></button>
                </div>
                <div style={{display:'flex',gap:6,marginBottom:20}}>
                  {[1,2].map(n=><div key={n} style={{flex:1,height:3,borderRadius:100,background:'rgba(255,106,85,0.12)',overflow:'hidden'}}><div style={{height:'100%',background:'linear-gradient(90deg,#E8513C,#FF8A73)',width:n<=submitStep?'100%':'0%',transition:'width .4s'}}/></div>)}
                </div>
                {submitStep===1?(
                  <>
                    <label style={{display:'block',fontSize:10,fontWeight:700,letterSpacing:'.1em',color:'rgba(255,106,85,0.55)',marginBottom:6}}>ITEM NAME</label>
                    <DarkField value={form.title} onChange={e=>setF('title',e.target.value)} placeholder="e.g. Vintage Rolex Submariner"/>
                    <label style={{display:'block',fontSize:10,fontWeight:700,letterSpacing:'.1em',color:'rgba(255,106,85,0.55)',marginBottom:6,marginTop:4}}>CATEGORY</label>
                    <div className="inp-wrap" style={{background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,106,85,0.18)',borderRadius:14,padding:'14px 16px',marginBottom:12}}>
                      <select value={form.cat} onChange={e=>setF('cat',e.target.value)} style={{background:'transparent',border:'none',color:form.cat?'#FFFFFF':'rgba(255,255,255,0.35)',fontSize:15,width:'100%',fontFamily:"'Rubik',sans-serif"}}>
                        <option value="" style={{background:'#0E4B54'}}>Select category…</option>
                        {CATS.map(c=><option key={c.id} value={c.id} style={{background:'#0E4B54'}}>{c.emoji} {c.name}</option>)}
                      </select>
                    </div>
                    <label style={{display:'block',fontSize:10,fontWeight:700,letterSpacing:'.1em',color:'rgba(255,106,85,0.55)',marginBottom:6,marginTop:4}}>DESCRIPTION</label>
                    <div className="inp-wrap" style={{background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,106,85,0.18)',borderRadius:14,padding:'14px 16px',marginBottom:12}}>
                      <textarea value={form.desc} onChange={e=>setF('desc',e.target.value)} placeholder="Describe the item in detail — condition, provenance, inclusions…" rows={3} style={{background:'transparent',border:'none',color:'#FFFFFF',fontSize:14,width:'100%',fontFamily:"'Rubik',sans-serif",resize:'none'}}/>
                    </div>
                    <button onClick={()=>setSubmitStep(2)} disabled={!form.title||!form.cat} className="btn-gold" style={{width:'100%',padding:'16px',borderRadius:100,fontSize:15,boxShadow:'0 6px 24px rgba(255,106,85,0.3)',opacity:(!form.title||!form.cat)?0.5:1}}>Continue →</button>
                  </>
                ):(
                  <>
                    <label style={{display:'block',fontSize:10,fontWeight:700,letterSpacing:'.1em',color:'rgba(255,106,85,0.55)',marginBottom:6}}>STARTING BID ($)</label>
                    <DarkField type="number" value={form.startBid} onChange={e=>setF('startBid',e.target.value)} placeholder="e.g. 500"/>
                    <label style={{display:'block',fontSize:10,fontWeight:700,letterSpacing:'.1em',color:'rgba(255,106,85,0.55)',marginBottom:6,marginTop:4}}>RESERVE PRICE ($) — Optional</label>
                    <DarkField type="number" value={form.reserve} onChange={e=>setF('reserve',e.target.value)} placeholder="Minimum you'll accept"/>
                    <label style={{display:'block',fontSize:10,fontWeight:700,letterSpacing:'.1em',color:'rgba(255,106,85,0.55)',marginBottom:10,marginTop:4}}>AUCTION DURATION</label>
                    <div style={{display:'flex',gap:8,marginBottom:20}}>
                      {[['24','24h'],['48','48h'],['72','72h']].map(([v,l])=>(
                        <button key={v} onClick={()=>setF('duration',v)} style={{flex:1,padding:'12px',borderRadius:14,background:form.duration===v?'rgba(255,106,85,0.15)':'rgba(255,255,255,0.04)',border:`1.5px solid ${form.duration===v?'#FF6A55':'rgba(255,106,85,0.12)'}`,color:form.duration===v?'#FF8A73':'rgba(255,255,255,0.5)',fontWeight:700,fontSize:14}}>
                          {l}
                        </button>
                      ))}
                    </div>
                    <div style={{background:'rgba(20,160,155,0.1)',border:'1px solid rgba(20,160,155,0.2)',borderRadius:12,padding:'12px',marginBottom:16,fontSize:12,color:'rgba(20,160,155,0.8)',lineHeight:1.6}}>
                      🔍 Our team reviews every submission to verify authenticity and fair pricing. This usually takes 1-3 days. You'll be notified by notification once your auction goes live.
                    </div>
                    <button onClick={submitAuction} disabled={!form.startBid} className="btn-gold" style={{width:'100%',padding:'17px',borderRadius:100,fontSize:15,opacity:!form.startBid?0.5:1}}>Submit for Review 📋</button>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};


export { AuctionsPage };
