import React from 'react';
import { MY_LISTINGS, TESTIMONIALS } from './data.js';
import { ItemImage, Stars, Particles } from './shared.jsx';
import { ArrowLeft, Check, Eye, TrendingUp, Bell, Shield, User, HelpCircle, BookOpen, ChevronRight, LogOut, X } from './icons.jsx';
/* Settings + Seller Dashboard */
const { useState, useEffect, useMemo } = React;

const SettingsPage = ({isSeller, setIsSeller, onSignOut, onBack, initialSellerTab='live', initialOnboarding=false}) => {
  const [sellerTab, setSellerTab] = useState(initialSellerTab);
  const [notif, setNotif] = useState(true);
  const [rulesOpen, setRulesOpen] = useState(false);

  const liveItems   = MY_LISTINGS.filter(l=>l.status==='live');
  const soldItems   = MY_LISTINGS.filter(l=>l.status==='sold'&&!l.archived);
  const archived    = MY_LISTINGS.filter(l=>l.archived);
  const myRevs      = TESTIMONIALS['s1']||[];
  const totalRev    = MY_LISTINGS.filter(l=>l.status==='sold').reduce((s,l)=>s+(l.soldFor||0),0);
  const totalClk    = MY_LISTINGS.reduce((s,l)=>s+l.clicks,0);
  const avgRating   = myRevs.length ? (myRevs.reduce((s,r)=>s+r.rating,0)/myRevs.length).toFixed(1) : '—';
  const soldRevWeek = soldItems.reduce((s,l)=>s+(l.soldFor||0),0);
  const archRev     = archived.reduce((s,l)=>s+(l.soldFor||0),0);

  const ListingCard = ({item, dim=false}) => (
    <div style={{background:dim?'var(--card2)':'var(--card)',borderRadius:16,padding:'14px',marginBottom:10,border:`1px solid ${item.status==='live'?'rgba(20,160,155,0.18)':dim?'rgba(155,191,196,0.18)':'rgba(255,106,85,0.15)'}`,opacity:dim?0.82:1}}>
      <div style={{display:'flex',gap:12,alignItems:'flex-start'}}>
        <div style={{width:52,height:52,borderRadius:14,overflow:'hidden',flexShrink:0,filter:dim?'grayscale(0.2)':'none'}}><ItemImage src={item.img} emoji={item.emoji} bg={item.bg} fontSize={26}/></div>
        <div style={{flex:1,minWidth:0}}>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:4}}>
            <div style={{fontFamily:"'Baloo Bhaijaan 2',sans-serif",fontSize:15,fontWeight:700,lineHeight:1.2,flex:1,marginRight:8}}>{item.name}</div>
            {item.status==='live' ? (
              <div style={{display:'flex',alignItems:'center',gap:5,background:'rgba(20,160,155,0.1)',border:'1px solid rgba(20,160,155,0.3)',borderRadius:100,padding:'3px 9px',flexShrink:0}}>
                <div style={{width:6,height:6,borderRadius:'50%',background:'#14A09B',animation:'livePulse 1.2s ease-in-out infinite'}}/>
                <span style={{fontSize:9,fontWeight:800,color:'#14A09B',letterSpacing:'0.08em'}}>LIVE</span>
              </div>
            ) : dim ? (
              <div style={{display:'flex',alignItems:'center',gap:3,background:'rgba(139,170,175,0.1)',border:'1px solid rgba(139,170,175,0.25)',borderRadius:100,padding:'3px 8px',flexShrink:0}}>
                <Check size={9} style={{color:'var(--ink3)'}}/><span style={{fontSize:9,fontWeight:700,color:'var(--ink3)',letterSpacing:'0.06em'}}>ARCHIVED</span>
              </div>
            ) : (
              <div style={{display:'flex',alignItems:'center',gap:4,background:'rgba(255,106,85,0.1)',border:'1px solid rgba(255,106,85,0.3)',borderRadius:100,padding:'3px 9px',flexShrink:0}}>
                <Check size={9} style={{color:'#FF6A55'}}/><span style={{fontSize:9,fontWeight:800,color:'#FF6A55',letterSpacing:'0.08em'}}>SOLD</span>
              </div>
            )}
          </div>
          <div style={{fontSize:11,color:'var(--ink3)',marginBottom:6}}>{item.cat}</div>
          <div style={{display:'flex',flexWrap:'wrap',gap:'3px 10px',marginBottom:item.status==='sold'?5:2}}>
            <span style={{fontSize:11,color:'var(--ink2)',display:'flex',alignItems:'center',gap:3}}>
              <Eye size={11} style={{color:'#14A09B'}}/> {item.clicks.toLocaleString()} views
            </span>
            {item.status==='live' && <span style={{fontSize:11,color:'var(--ink2)'}}>Listed at <strong style={{color:'#14A09B'}}>EGP {item.price}</strong></span>}
            {item.status==='sold' && <>
              <span style={{fontSize:11,color:'var(--ink2)'}}>Listed: <strong>EGP {item.price}</strong></span>
              <span style={{fontSize:11,fontWeight:700,color:dim?'#6B8489':'#FF6A55'}}>→ Sold for <strong style={{color:dim?'#4A6B72':'#14A09B'}}>EGP {item.soldFor}</strong></span>
            </>}
          </div>
          {item.status==='sold' && <div style={{fontSize:11,color:'var(--ink3)'}}>Buyer: <strong>{item.buyer}</strong> · {item.soldDate}</div>}
          {item.status==='live' && <div style={{fontSize:11,color:'var(--ink3)'}}>Listed {item.listedDate}</div>}
        </div>
      </div>
    </div>
  );

  return (
    <div style={{flex:1,overflowY:'auto',paddingBottom:90}} className="sh">
      {/* Seller profile header */}
      <div style={{background:'linear-gradient(180deg,#0D7E7A 0%,#14A09B 100%)',padding:'52px 16px 20px',position:'relative',overflow:'hidden'}}>
        <Particles/>
        <div style={{position:'relative',zIndex:1}}>
          <button onClick={onBack} aria-label="Back" style={{background:'rgba(255,255,255,0.12)',border:'1px solid rgba(255,255,255,0.2)',width:36,height:36,borderRadius:11,display:'flex',alignItems:'center',justifyContent:'center',color:'#FFFFFF',marginBottom:14}}><ArrowLeft size={17} strokeWidth={2.3}/></button>
          {isSeller ? (
            <>
              <div style={{display:'flex',gap:14,alignItems:'center',marginBottom:16}}>
                <div style={{width:58,height:58,borderRadius:18,background:'linear-gradient(135deg,#FF6A55,#FF8A73)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:26,flexShrink:0,boxShadow:'0 4px 16px rgba(255,106,85,0.4)'}}>👤</div>
                <div>
                  <div style={{fontSize:10,fontWeight:600,letterSpacing:'0.1em',color:'rgba(255,255,255,0.5)',marginBottom:3}}>YOUR SELLER ACCOUNT</div>
                  <div style={{fontFamily:"'Baloo Bhaijaan 2',sans-serif",fontSize:20,fontWeight:700,color:'#FFFFFF'}}>@michael_r</div>
                  <div style={{display:'flex',alignItems:'center',gap:6,marginTop:3}}>
                    <Stars rating={4.9} size={13}/><span style={{fontSize:12,fontWeight:700,color:'#FF8A73'}}>4.9</span><span style={{fontSize:11,color:'rgba(255,255,255,0.45)'}}>· {myRevs.length} reviews</span>
                  </div>
                  <div style={{marginTop:5}}><span style={{background:'rgba(255,106,85,0.22)',border:'1px solid rgba(255,106,85,0.45)',borderRadius:100,padding:'2px 10px',fontSize:9,fontWeight:700,color:'#FF8A73'}}>🏆 Top Seller · Unit 4B</span></div>
                </div>
              </div>
              <div style={{display:'flex',gap:0,background:'rgba(255,255,255,0.07)',borderRadius:14}}>
                {[['EGP '+totalRev.toLocaleString(),'Total Revenue'],[`${liveItems.length}`,'Live Now'],[totalClk.toLocaleString(),'Views'],[avgRating+' ★','Rating']].map(([v,l],i)=>(
                  <div key={l} style={{flex:1,textAlign:'center',padding:'10px 2px',borderRight:i<3?'1px solid rgba(255,255,255,0.07)':'none'}}>
                    <div style={{fontFamily:"'Baloo Bhaijaan 2',sans-serif",fontSize:14,fontWeight:700,color:l==='Rating'?'#FF8A73':l==='Live Now'?'#7ED8D3':'#FFFFFF',lineHeight:1}}>{v}</div>
                    <div style={{fontSize:8,color:'rgba(255,255,255,0.4)',fontWeight:500,marginTop:3}}>{l}</div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div>
              <div style={{fontFamily:"'Baloo Bhaijaan 2',sans-serif",fontSize:22,fontWeight:700,color:'#FFFFFF',marginBottom:4}}>⚙️ Settings</div>
              <p style={{fontSize:13,color:'rgba(255,255,255,0.5)'}}>Manage your Karro account</p>
            </div>
          )}
        </div>
      </div>

      {/* Seller tabs */}
      {isSeller&&(
        <div style={{padding:'10px 16px 0',background:'var(--bg)',position:'sticky',top:0,zIndex:9}}>
          <div style={{display:'flex',gap:5}}>
            {[
              ['live',   `Live (${liveItems.length})`],
              ['sold',   `Sold (${soldItems.length})`],
              ['reviews',`Reviews (${myRevs.length})`],
            ].map(([id,label])=>(
              <button key={id} onClick={()=>setSellerTab(id)} className={sellerTab===id?'tab-pill-active':'tab-pill-idle'} style={{flex:1,padding:'8px 2px',borderRadius:100,fontSize:10,whiteSpace:'nowrap'}}>
                {label}
              </button>
            ))}
          </div>
        </div>
      )}

      <div style={{padding:'12px 16px'}}>
        {/* LIVE */}
        {isSeller&&sellerTab==='live'&&(
          <div>
            {liveItems.length===0 ? (
              <div style={{textAlign:'center',padding:'36px 20px',background:'var(--card)',borderRadius:18,border:'1px dashed rgba(20,160,155,0.2)'}}>
                <div style={{fontSize:36,marginBottom:10,animation:'floatSlow 4s ease-in-out infinite'}}>📦</div>
                <div style={{fontFamily:"'Baloo Bhaijaan 2',sans-serif",fontSize:17,fontWeight:600,marginBottom:6}}>No live listings</div>
                <p style={{fontSize:13,color:'var(--ink3)'}}>Post your first item to start selling.</p>
              </div>
            ) : liveItems.map(i=><ListingCard key={i.id} item={i}/>)}
          </div>
        )}

        {/* SOLD THIS WEEK */}
        {isSeller&&sellerTab==='sold'&&(
          <div>
            <div style={{background:'rgba(20,160,155,0.07)',border:'1px solid rgba(20,160,155,0.12)',borderRadius:12,padding:'10px 14px',marginBottom:12,display:'flex',alignItems:'center',gap:8}}>
              <TrendingUp size={14} style={{color:'#14A09B',flexShrink:0}}/>
              <span style={{fontSize:12,color:'var(--ink2)'}}>This week: <strong style={{color:'#14A09B'}}>EGP {soldRevWeek}</strong> from {soldItems.length} item{soldItems.length!==1?'s':''}</span>
            </div>
            {soldItems.length===0 ? (
              <div style={{textAlign:'center',padding:'36px',color:'var(--ink3)'}}><div style={{fontSize:36,marginBottom:10}}>📭</div><p>No sales this week yet</p></div>
            ) : soldItems.map(i=><ListingCard key={i.id} item={i}/>)}
          </div>
        )}

        {/* REVIEWS */}
        {isSeller&&sellerTab==='reviews'&&(
          <div>
            <div style={{background:'var(--card)',borderRadius:18,padding:'16px',marginBottom:14,border:'1px solid rgba(255,106,85,0.15)',display:'flex',gap:16,alignItems:'center'}}>
              <div style={{textAlign:'center'}}>
                <div style={{fontFamily:"'Baloo Bhaijaan 2',sans-serif",fontSize:38,fontWeight:900,color:'#FF6A55',lineHeight:1}}>{avgRating}</div>
                <Stars rating={parseFloat(avgRating)} size={15}/>
                <div style={{fontSize:10,color:'var(--ink3)',marginTop:4}}>{myRevs.length} reviews</div>
              </div>
              <div style={{flex:1}}>
                {[5,4,3].map(n=>{const cnt=myRevs.filter(r=>r.rating===n).length,pct=myRevs.length?Math.round(cnt/myRevs.length*100):0;return(
                  <div key={n} style={{display:'flex',alignItems:'center',gap:6,marginBottom:5}}>
                    <span style={{fontSize:10,color:'#FF6A55',width:8,fontWeight:700}}>{n}</span>
                    <div style={{flex:1,height:5,borderRadius:100,background:'rgba(255,106,85,0.12)',overflow:'hidden'}}><div style={{height:'100%',borderRadius:100,background:'linear-gradient(90deg,#E8513C,#FF6A55)',width:`${pct}%`}}/></div>
                    <span style={{fontSize:9,color:'var(--ink3)',width:26,textAlign:'right'}}>{pct}%</span>
                  </div>
                );})}
              </div>
            </div>
            {myRevs.map((r,i)=>(
              <div key={r.id} className={`s${Math.min(i+1,9)}`} style={{background:'var(--card)',borderRadius:16,padding:'14px',marginBottom:10,border:'1px solid rgba(20,160,155,0.08)',animation:'fadeUp .3s ease-out both'}}>
                <div style={{display:'flex',justifyContent:'space-between',marginBottom:8}}>
                  <div><Stars rating={r.rating} size={13}/><div style={{fontFamily:"'Baloo Bhaijaan 2',sans-serif",fontSize:13,fontWeight:600,marginTop:2}}>{r.reviewer}</div></div>
                  <div style={{textAlign:'right'}}><div style={{fontSize:10,color:'var(--ink3)'}}>{r.date}</div>{r.verified&&<div style={{display:'flex',alignItems:'center',gap:2,justifyContent:'flex-end',marginTop:2}}><Check size={9} style={{color:'#14A09B'}}/><span style={{fontSize:9,color:'#14A09B',fontWeight:600}}>Verified</span></div>}</div>
                </div>
                <p style={{fontSize:13,color:'var(--ink2)',lineHeight:1.6,fontStyle:'italic'}}>"{r.text}"</p>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginTop:8,paddingTop:7,borderTop:'1px solid rgba(20,160,155,0.07)'}}>
                  <span style={{fontSize:11,color:'var(--ink3)'}}>Item: <strong>{r.item}</strong></span>
                  <span style={{fontSize:10,color:'var(--ink3)'}}>👍 {r.helpful}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* GENERAL SETTINGS (always shown below seller tabs) */}
        <div style={{marginTop:isSeller?16:0}}>
          <div style={{background:'var(--card)',borderRadius:18,overflow:'hidden',border:'1px solid rgba(20,160,155,0.08)'}}>
            {[
              {icon:Bell,  label:'Notifications',  value:notif?'On':'Off',  action:()=>setNotif(!notif)},
              {icon:Shield,label:'Privacy Settings',value:'Managed',         action:()=>{}},
              {icon:User,  label:'Account Info',    value:'Unit 4B',          action:()=>{}},
              {icon:HelpCircle,label:'Help & Support',value:'',              action:()=>{}},
            ].map((item,i)=>(
              <button key={item.label} onClick={item.action} style={{width:'100%',display:'flex',alignItems:'center',gap:12,padding:'14px 16px',background:'transparent',border:'none',borderBottom:'1px solid rgba(20,160,155,0.07)',textAlign:'left'}}>
                <div style={{width:36,height:36,borderRadius:11,background:'rgba(20,160,155,0.08)',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}><item.icon size={16} strokeWidth={2.2} style={{color:'#14A09B'}}/></div>
                <span style={{fontSize:14,fontWeight:600,color:'var(--ink)',flex:1}}>{item.label}</span>
                <span style={{fontSize:12,color:'var(--ink3)'}}>{item.value}</span>
                <ChevronRight size={14} style={{color:'var(--ink-dim)'}}/>
              </button>
            ))}
            <button onClick={()=>setRulesOpen(true)} style={{width:'100%',display:'flex',alignItems:'center',gap:12,padding:'14px 16px',background:'transparent',border:'none',textAlign:'left'}}>
              <div style={{width:36,height:36,borderRadius:11,background:'rgba(20,160,155,0.08)',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}><BookOpen size={16} strokeWidth={2.2} style={{color:'#14A09B'}}/></div>
              <span style={{fontSize:14,fontWeight:600,color:'var(--ink)',flex:1}}>Rules & Regulations</span>
              <ChevronRight size={14} style={{color:'var(--ink-dim)'}}/>
            </button>
          </div>
          <button onClick={onSignOut} style={{width:'100%',marginTop:12,display:'flex',alignItems:'center',gap:12,padding:'14px 16px',background:'rgba(232,81,60,0.06)',border:'1px solid rgba(232,81,60,0.15)',borderRadius:14,textAlign:'left'}}>
            <div style={{width:36,height:36,borderRadius:11,background:'rgba(232,81,60,0.1)',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}><LogOut size={16} strokeWidth={2.2} style={{color:'#E8513C'}}/></div>
            <span style={{fontSize:14,fontWeight:600,color:'#E8513C'}}>Sign Out</span>
          </button>
        </div>
      </div>

      {rulesOpen&&(
        <div style={{position:'fixed',inset:0,zIndex:50,display:'flex',alignItems:'flex-end',justifyContent:'center',background:'rgba(10,53,64,0.6)',backdropFilter:'blur(4px)',animation:'fadeIn .25s ease-out'}} onClick={()=>setRulesOpen(false)}>
          <div className="su" style={{width:'100%',maxWidth:440,background:'var(--bg)',borderRadius:'26px 26px 0 0',padding:'10px 22px 40px',maxHeight:'78vh',display:'flex',flexDirection:'column'}} onClick={e=>e.stopPropagation()}>
            <div style={{width:40,height:4,borderRadius:100,background:'rgba(20,160,155,0.2)',margin:'0 auto 16px'}}></div>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:14,flexShrink:0}}>
              <h3 style={{fontFamily:"'Baloo Bhaijaan 2',sans-serif",fontSize:20,fontWeight:700}}>📘 Rules & Regulations</h3>
              <button onClick={()=>setRulesOpen(false)} className="btn-icon-teal" style={{width:34,height:34,borderRadius:10,display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}><X size={15}/></button>
            </div>
            <div className="sh" style={{overflowY:'auto',paddingRight:2}}>
            <p style={{fontSize:13,color:'var(--ink2)',lineHeight:1.6,marginBottom:18}}>To keep Karro safe, honest and welcoming for every neighbor, all members agree to the following.</p>
            <div style={{display:'flex',flexDirection:'column',gap:10}}>
              {[
                ['🏘️','Members Only','Buying and selling is limited to verified residents of this community. No outside or commercial sellers.'],
                ['✅','Honest Listings','Describe items accurately — condition, defects, and photos must reflect the real item.'],
                ['🚫','Prohibited Items','No weapons, illegal goods, counterfeit items, or anything unsafe for community exchange.'],
                ['🤝','Respectful Conduct','Treat every neighbor with courtesy. Harassment, spam, or abusive messages are not tolerated.'],
                ['💰','Fair Pricing','Auction and listing prices should be set in good faith — no bid manipulation or shill bidding.'],
                ['📦','Pickup & Payment','Arrange pickup and payment directly with the seller. Karro is not responsible for transactions.'],
                ['⚠️','Reporting Issues','Report suspicious listings or behavior via Help & Support — our team reviews all reports promptly.'],
                ['🔒','Enforcement','Violating these rules may result in listing removal, suspension, or account termination.'],
              ].map(([icon,title,body])=>(
                <div key={title} style={{background:'var(--card)',border:'1px solid rgba(20,160,155,0.1)',borderRadius:14,padding:'13px 15px',display:'flex',gap:12}}>
                  <span style={{fontSize:18,flexShrink:0}}>{icon}</span>
                  <div>
                    <div style={{fontSize:13,fontWeight:700,color:'var(--ink)',marginBottom:3}}>{title}</div>
                    <div style={{fontSize:12,color:'var(--ink2)',lineHeight:1.55}}>{body}</div>
                  </div>
                </div>
              ))}
            </div>
            <p style={{fontSize:11,color:'var(--ink3)',textAlign:'center',marginTop:14,flexShrink:0}}>Last updated July 2026</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};


export { SettingsPage };
