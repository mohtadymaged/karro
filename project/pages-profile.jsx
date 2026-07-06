/* Profile page — matches reference layout: header, avatar+Edit, ID, member badge, settings list, edit-profile subview */
const AVATAR_PRESETS = ['🧑','👩','👨','🧑‍🌾','🦊','🐢','🐝','🌻','🌱','🍉','⚽','🎨'];

const ProfilePage = ({onNav, onItemSelect, onSignOut, onOpenStall, theme='Light', setTheme=()=>{}, username=''}) => {
  const { useState, useRef } = React;
  const [view, setView] = useState('main'); // main | edit | purchases | favorites
  const [pickOpen, setPickOpen] = useState(false);
  const [rulesOpen, setRulesOpen] = useState(false);
  const [savedModal, setSavedModal] = useState(false);
  const [notif, setNotif] = useState(true);
  const [verified, setVerified] = useState(()=>{try{return localStorage.getItem('gt_verified')==='1';}catch(e){return false;}});
  const idRef = useRef(null);
  const onIdFile = (e)=>{const file=e.target.files&&e.target.files[0];if(!file)return;setVerified(true);try{localStorage.setItem('gt_verified','1');}catch(err){}e.target.value='';};
  const [avatar, setAvatar] = useState(()=>{try{return JSON.parse(localStorage.getItem('gt_avatar'))||null;}catch(e){return null;}});
  const defaultName = username ? username.charAt(0).toUpperCase()+username.slice(1) : 'Neighbor';
  const [profile, setProfile] = useState(()=>{try{return JSON.parse(localStorage.getItem('gt_profile'))||{};}catch(e){return {};}});
  const [form, setForm] = useState({name:profile.name||defaultName, phone:profile.phone||'', dob:profile.dob||''});
  const fileRef = useRef(null);
  const name = profile.name || defaultName;

  const saveAvatar = (a) => { setAvatar(a); try{ if(a) localStorage.setItem('gt_avatar', JSON.stringify(a)); else localStorage.removeItem('gt_avatar'); }catch(e){} };
  const onFile = (e) => {
    const file = e.target.files&&e.target.files[0];
    if(!file) return;
    const r = new FileReader();
    r.onload = ev => { saveAvatar({type:'img', src:ev.target.result}); setPickOpen(false); };
    r.readAsDataURL(file);
    e.target.value='';
  };
  const saveProfile = () => {
    const p = {name:form.name||defaultName, phone:form.phone, dob:form.dob};
    setProfile(p); try{localStorage.setItem('gt_profile', JSON.stringify(p));}catch(e){}
    setSavedModal(true);
  };

  const PURCHASES = [
    {id:'p1',emoji:'☕',img:'https://images.unsplash.com/photo-1572119865084-43c285814d63?w=600&h=600&fit=crop&auto=format&q=80',bg:'#BFE7E4',name:'Espresso Machine',seller:'David L.',unit:'7C',date:'Jun 28',price:220},
    {id:'p2',emoji:'🪴',img:'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=600&h=600&fit=crop&auto=format&q=80',bg:'#BFE7E4',name:'Monstera Deliciosa',seller:'Sarah K.',unit:'12A',date:'Jun 19',price:35},
    {id:'p3',emoji:'📚',img:'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=600&h=600&fit=crop&auto=format&q=80',bg:'#E0D0B8',name:'Atomic Habits',seller:'Emma T.',unit:'1A',date:'Jun 04',price:12},
    {id:'p4',emoji:'🧥',bg:'#DCC4E8',name:"Vintage Levi's Jacket",seller:'James W.',unit:'9D',date:'May 22',price:65},
  ];
  const favorites = LISTINGS.slice(0,4);

  const Avatar = ({size=104, radius=null, fontSize=44}) => (
    <div style={{width:size,height:size,borderRadius:radius==null?'50%':radius,background:'linear-gradient(135deg,#FF6A55,#FF8A73)',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:"'Baloo Bhaijaan 2',sans-serif",fontSize,fontWeight:900,color:'#0E4B54',overflow:'hidden',boxShadow:'0 8px 24px rgba(255,106,85,0.35)'}}>
      {avatar&&avatar.type==='img'?<img src={avatar.src} alt="Your avatar" style={{width:'100%',height:'100%',objectFit:'cover'}}/>:avatar&&avatar.type==='emoji'?avatar.v:name.charAt(0)}
    </div>
  );

  const SubHeader = ({title}) => (
    <div style={{display:'flex',alignItems:'center',padding:'58px 16px 14px',position:'relative'}}>
      <button onClick={()=>setView('main')} aria-label="Back" style={{width:38,height:38,borderRadius:12,background:'rgba(20,160,155,0.08)',border:'1px solid rgba(20,160,155,0.15)',display:'flex',alignItems:'center',justifyContent:'center',color:'#14A09B',zIndex:1}}><ArrowLeft size={17} strokeWidth={2.3}/></button>
      <div style={{position:'absolute',left:0,right:0,textAlign:'center',fontFamily:"'Baloo Bhaijaan 2',sans-serif",fontSize:18,fontWeight:700,color:'var(--ink)'}}>{title}</div>
    </div>
  );

  const Field = ({label, children}) => (
    <div style={{marginBottom:16}}>
      <label style={{display:'block',fontSize:13,fontWeight:700,color:'var(--ink)',marginBottom:8}}>{label}</label>
      {children}
    </div>
  );

  /* ─── EDIT PROFILE ─────────────────────────────────── */
  if(view==='edit') return (
    <div style={{flex:1,overflowY:'auto',paddingBottom:90}} className="sh">
      <SubHeader title="Edit Profile"/>
      <div style={{display:'flex',justifyContent:'center',padding:'14px 0 26px'}}>
        <div style={{position:'relative'}}>
          <Avatar/>
          <button onClick={()=>setPickOpen(true)} aria-label="Change photo" style={{position:'absolute',bottom:2,right:2,width:32,height:32,borderRadius:'50%',background:'#14A09B',border:'2.5px solid #FFFFFF',display:'flex',alignItems:'center',justifyContent:'center',fontSize:14,boxShadow:'0 3px 10px rgba(0,0,0,0.25)'}}>📷</button>
        </div>
      </div>
      <div style={{padding:'0 20px'}}>
        <Field label="Full Name">
          <div className="iwl" style={{background:'var(--card)',border:'1px solid rgba(20,160,155,0.15)',borderRadius:16,padding:'14px 16px'}}>
            <input type="text" className="lp" value={form.name} onChange={e=>setForm(f=>({...f,name:e.target.value}))} placeholder="Your full name" style={{background:'transparent',border:'none',color:'var(--ink)',fontSize:14,width:'100%',fontFamily:"'Rubik',sans-serif"}}/>
          </div>
        </Field>
        <Field label="Phone Number">
          <div style={{display:'flex',gap:8}}>
            <div style={{display:'flex',alignItems:'center',gap:6,background:'var(--card)',border:'1px solid rgba(20,160,155,0.15)',borderRadius:16,padding:'14px 14px',flexShrink:0}}>
              <span style={{fontSize:16}}>🇪🇬</span><span style={{fontSize:13,fontWeight:700,color:'var(--ink)'}}>+20</span><ChevronRight size={12} style={{color:'var(--ink-dim)',transform:'rotate(90deg)'}}/>
            </div>
            <div className="iwl" style={{flex:1,background:'var(--card)',border:'1px solid rgba(20,160,155,0.15)',borderRadius:16,padding:'14px 16px'}}>
              <input type="tel" className="lp" value={form.phone} onChange={e=>setForm(f=>({...f,phone:e.target.value}))} placeholder="Enter mobile number" style={{background:'transparent',border:'none',color:'var(--ink)',fontSize:14,width:'100%',fontFamily:"'Rubik',sans-serif"}}/>
            </div>
          </div>
        </Field>
        <Field label="Date of Birth">
          <div className="iwl" style={{background:'var(--card)',border:'1px solid rgba(20,160,155,0.15)',borderRadius:16,padding:'14px 16px'}}>
            <input type="text" className="lp" value={form.dob} onChange={e=>setForm(f=>({...f,dob:e.target.value}))} placeholder="DD/MM/YYYY" style={{background:'transparent',border:'none',color:'var(--ink)',fontSize:14,width:'100%',fontFamily:"'Rubik',sans-serif"}}/>
          </div>
        </Field>
        <button onClick={saveProfile} className="btn-em" style={{width:'100%',padding:'16px',borderRadius:100,fontSize:15,marginTop:12,boxShadow:'0 6px 20px rgba(20,160,155,0.3)'}}>Save Change</button>
      </div>
      {/* Saved modal */}
      {savedModal&&(
        <div style={{position:'fixed',inset:0,zIndex:60,display:'flex',alignItems:'center',justifyContent:'center',background:'rgba(10,53,64,0.6)',backdropFilter:'blur(4px)',animation:'fadeIn .25s ease-out',padding:24}}>
          <div style={{width:'100%',maxWidth:340,background:'var(--bg)',borderRadius:26,padding:'34px 26px 26px',textAlign:'center',animation:'scaleIn .35s cubic-bezier(0.34,1.56,0.64,1) both'}}>
            <div style={{width:76,height:76,borderRadius:'50%',background:'rgba(20,160,155,0.1)',display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 18px'}}>
              <div style={{width:52,height:52,borderRadius:'50%',background:'linear-gradient(135deg,#14A09B,#0D7E7A)',display:'flex',alignItems:'center',justifyContent:'center',color:'#FFFFFF',boxShadow:'0 6px 18px rgba(20,160,155,0.4)'}}><Check size={26} strokeWidth={3}/></div>
            </div>
            <h2 style={{fontFamily:"'Baloo Bhaijaan 2',sans-serif",fontSize:23,fontWeight:800,color:'var(--ink)',marginBottom:10}}>Profile Updated</h2>
            <p style={{fontSize:13,color:'var(--ink2)',lineHeight:1.65,marginBottom:22}}>Congratulations 🥳, your profile has been successfully updated. Enjoy trading with your neighbors.</p>
            <button onClick={()=>{setSavedModal(false);setView('main');}} className="btn-em" style={{width:'100%',padding:'15px',borderRadius:100,fontSize:14,boxShadow:'0 6px 20px rgba(20,160,155,0.3)'}}>Okay, Thanks</button>
          </div>
        </div>
      )}
      {pickOpen&&<AvatarSheet avatar={avatar} name={name} fileRef={fileRef} onFile={onFile} saveAvatar={saveAvatar} onClose={()=>setPickOpen(false)}/>}
    </div>
  );

  /* ─── PAST PURCHASES ───────────────────────────────── */
  if(view==='purchases') return (
    <div style={{flex:1,overflowY:'auto',paddingBottom:90}} className="sh">
      <SubHeader title="Past Purchases"/>
      {PURCHASES.length===0&&(
        <div style={{textAlign:'center',padding:'56px 32px'}}>
          <div style={{fontSize:44,marginBottom:14,animation:'floatSlow 4s ease-in-out infinite'}}>🛍️</div>
          <div style={{fontFamily:"'Baloo Bhaijaan 2',sans-serif",fontSize:19,fontWeight:700,marginBottom:6}}>No purchases yet</div>
          <p style={{fontSize:13,color:'var(--ink3)',lineHeight:1.6,marginBottom:22}}>When you buy from a neighbor, it shows up here.</p>
          <button onClick={()=>onNav('browse')} className="btn-em" style={{padding:'13px 28px',borderRadius:100,fontSize:13}}>Browse the Market</button>
        </div>
      )}
      <div style={{padding:'8px 16px',display:'flex',flexDirection:'column',gap:8}}>
        {PURCHASES.map((p,i)=>(
          <div key={p.id} className={`s${i+1}`} style={{display:'flex',alignItems:'center',gap:12,background:'var(--card)',border:'1px solid rgba(255,106,85,0.12)',borderRadius:14,padding:'10px 12px',animation:'fadeUp .35s ease-out both'}}>
            <ItemImage src={p.img} emoji={p.emoji} bg={p.bg} fontSize={22} style={{width:48,height:48,borderRadius:12,flexShrink:0,overflow:'hidden'}}/>
            <div style={{flex:1,minWidth:0}}>
              <div style={{fontSize:13,fontWeight:700,color:'var(--ink)',whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>{p.name}</div>
              <div style={{fontSize:11,color:'var(--ink3)',marginTop:2}}>from {p.seller} ({p.unit}) · {p.date}</div>
            </div>
            <div style={{textAlign:'right',flexShrink:0}}>
              <div style={{fontFamily:"'Baloo Bhaijaan 2',sans-serif",fontSize:14,fontWeight:700,color:'#14A09B'}}>EGP {p.price}</div>
              <div style={{fontSize:9,color:'var(--ink3)',marginTop:2}}>✓ Met up</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  /* ─── FAVORITES ────────────────────────────────────── */
  if(view==='favorites') return (
    <div style={{flex:1,overflowY:'auto',paddingBottom:90}} className="sh">
      <SubHeader title="My Favorites"/>
      {favorites.length===0&&(
        <div style={{textAlign:'center',padding:'56px 32px'}}>
          <div style={{fontSize:44,marginBottom:14,animation:'floatSlow 4s ease-in-out infinite'}}>❤️</div>
          <div style={{fontFamily:"'Baloo Bhaijaan 2',sans-serif",fontSize:19,fontWeight:700,marginBottom:6}}>No favorites yet</div>
          <p style={{fontSize:13,color:'var(--ink3)',lineHeight:1.6,marginBottom:22}}>Tap the heart on any listing to save it here.</p>
          <button onClick={()=>onNav('browse')} className="btn-em" style={{padding:'13px 28px',borderRadius:100,fontSize:13}}>Browse the Market</button>
        </div>
      )}
      <div style={{padding:'8px 16px',display:'grid',gridTemplateColumns:'1fr 1fr',gap:10}}>
        {favorites.map((it,i)=>(
          <button key={it.id} onClick={()=>onItemSelect&&onItemSelect(it)} className={`cp s${i+1}`} style={{border:'1px solid rgba(255,106,85,0.12)',borderRadius:16,padding:0,overflow:'hidden',background:'var(--card)',textAlign:'left',animation:'fadeUp .35s ease-out both'}}>
            <div style={{position:'relative',height:96}}>
              <ItemImage src={it.img} emoji={it.emoji} bg={it.bg} fontSize={30} style={{position:'absolute',inset:0}}/>
              <span style={{position:'absolute',top:8,right:8,width:24,height:24,borderRadius:'50%',background:'rgba(255,255,255,0.92)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:12}}>❤️</span>
            </div>
            <div style={{padding:'9px 11px 11px'}}>
              <div style={{fontSize:12,fontWeight:700,color:'var(--ink)',whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>{it.name}</div>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'baseline',marginTop:3}}>
                <span style={{fontFamily:"'Baloo Bhaijaan 2',sans-serif",fontSize:13,fontWeight:700,color:'#14A09B'}}>EGP {it.price}</span>
                <span style={{fontSize:10,color:'var(--ink3)'}}>{it.seller}</span>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );

  /* ─── MAIN ─────────────────────────────────────────── */
  const liveN = MY_LISTINGS.filter(l=>l.status==='live').length;
  const soldN = MY_LISTINGS.filter(l=>l.status==='sold'&&!l.archived).length;
  const archN = MY_LISTINGS.filter(l=>l.archived).length;
  const revN  = (TESTIMONIALS['s1']||[]).length;
  const settingsRows = [
    {icon:'🌐', label:'Languages',           value:'English',      action:()=>{}},
    {icon:'🪪', label:'ID Verification',     value:verified?'Verified ✓':'Not verified', action:()=>{if(!verified&&idRef.current)idRef.current.click();}},
    {icon:'🔔', label:'Notification',        value:notif?'On':'Off', action:()=>setNotif(n=>!n)},
    {icon:theme==='Light'?'☀️':'🌙', label:'Theme', theme:true},
    {icon:'🛍️', label:'Past Purchases',      value:`${PURCHASES.length}`, action:()=>setView('purchases')},
    {icon:'❤️', label:'My Favorites',        value:`${favorites.length}`, action:()=>setView('favorites')},
    {icon:'📦', label:'Live Listings',       value:`${liveN}`, action:()=>onOpenStall&&onOpenStall('live')},
    {icon:'🏷️', label:'Sold Items',          value:`${soldN}`, action:()=>onOpenStall&&onOpenStall('sold')},
    {icon:'⭐', label:'My Reviews',          value:`${revN}`,  action:()=>onOpenStall&&onOpenStall('reviews')},
    {icon:'📘', label:'Rules & Regulations', value:'',             action:()=>setRulesOpen(true)},
  ];
  const Row = ({r, last, i=0}) => {
    const Tag = r.theme ? 'div' : 'button';
    return (
    <Tag onClick={r.action} style={{width:'100%',display:'flex',alignItems:'center',gap:11,padding:'10.5px 14px',background:'transparent',border:'none',borderBottom:!last?'1px solid rgba(20,160,155,0.06)':'none',textAlign:'left'}}>
      <div style={{width:30,height:30,borderRadius:'50%',background:'rgba(20,160,155,0.07)',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0,fontSize:13}}>{r.icon}</div>
      <span style={{fontSize:13,fontWeight:600,color:'var(--ink)',flex:1}}>{r.label}</span>
      {r.theme?(
        <span style={{display:'inline-flex',background:'rgba(20,160,155,0.08)',borderRadius:100,padding:2,gap:2}}>
          {['Light','Dark'].map(t=>(
            <button key={t} onClick={e=>{e.stopPropagation();setTheme(t);}} style={{border:'none',borderRadius:100,padding:'4px 12px',fontSize:10.5,fontWeight:700,background:theme===t?'#14A09B':'transparent',color:theme===t?'#FFFFFF':'var(--ink2)',transition:'all .18s'}}>{t}</button>
          ))}
        </span>
      ):(
        <>
          {r.value&&<span style={{fontSize:11.5,color:'var(--ink3)'}}>{r.value}</span>}
          <ChevronRight size={14} style={{color:'var(--ink-dim)'}}/>
        </>
      )}
    </Tag>
    );
  };
  return (
    <div style={{flex:1,overflowY:'auto',paddingBottom:90}} className="sh">
      {/* Header */}
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'58px 20px 6px'}}>
        <h1 style={{fontFamily:"'Baloo Bhaijaan 2',sans-serif",fontSize:22,fontWeight:800,color:'var(--ink)'}}>Profile</h1>
        <button onClick={onSignOut} style={{background:'transparent',border:'none',color:'#E8513C',fontSize:14,fontWeight:700}}>Logout</button>
      </div>
      {/* Identity */}
      <div style={{textAlign:'center',padding:'12px 20px 4px'}}>
        <div style={{position:'relative',display:'inline-block',animation:'avatarIn .55s cubic-bezier(0.34,1.56,0.64,1) both'}}>
          <Avatar size={100} fontSize={42}/>
          {verified&&<span style={{position:'absolute',top:2,right:2,width:26,height:26,borderRadius:'50%',background:'linear-gradient(135deg,#14A09B,#0D7E7A)',border:'2.5px solid var(--bg)',display:'flex',alignItems:'center',justifyContent:'center',color:'#FFFFFF',boxShadow:'0 3px 10px rgba(20,160,155,0.4)'}}><Check size={13} strokeWidth={3}/></span>}
          <button onClick={()=>setView('edit')} style={{position:'absolute',bottom:-8,left:'50%',transform:'translateX(-50%)',display:'flex',alignItems:'center',gap:4,background:'var(--card)',border:'1px solid rgba(20,160,155,0.2)',borderRadius:100,padding:'5px 12px',fontSize:11,fontWeight:700,color:'#14A09B',boxShadow:'0 3px 10px rgba(0,0,0,0.12)'}}>✏️ Edit</button>
        </div>
        <div style={{fontFamily:"'Baloo Bhaijaan 2',sans-serif",fontSize:23,fontWeight:800,color:'var(--ink)',marginTop:18,animation:'fadeUp .5s .12s ease-out both'}}>{name}</div>
        <div style={{fontSize:12,color:'var(--ink3)',marginTop:4,animation:'fadeUp .5s .18s ease-out both'}}>ID No : 2205 4871 · Unit 5C</div>
        <div style={{display:'inline-flex',alignItems:'center',gap:6,marginTop:10,background:verified?'linear-gradient(135deg,#FF6A55,#FF8A73)':'rgba(20,160,155,0.1)',border:verified?'none':'1px solid rgba(20,160,155,0.2)',borderRadius:100,padding:'7px 16px',fontSize:11,fontWeight:800,color:verified?'#0E4B54':'var(--ink3)',whiteSpace:'nowrap',boxShadow:verified?'0 3px 12px rgba(255,106,85,0.35)':'none'}}>{verified?<Check size={11} strokeWidth={3}/>:'⏳'}{verified?'Verified Member':'Unverified — tap ID Verification below'}</div>
        <input ref={idRef} type="file" accept="image/*" onChange={onIdFile} style={{display:'none'}}/>
      </div>
      {/* Settings list */}
      <div style={{padding:'20px 16px 0',animation:'fadeUp .5s .26s ease-out both'}}>
        <div style={{fontFamily:"'Baloo Bhaijaan 2',sans-serif",fontSize:16,fontWeight:700,color:'var(--ink)',marginBottom:8}}>Settings</div>
        <div style={{background:'var(--card)',borderRadius:18,overflow:'hidden',border:'1px solid rgba(20,160,155,0.08)'}}>
          {settingsRows.map((r,i)=><Row key={r.label} r={r} last={i===settingsRows.length-1}/>)}
        </div>
      </div>
      {/* Rules & Regulations sheet */}
      {rulesOpen&&(
        <div style={{position:'fixed',inset:0,zIndex:60,display:'flex',alignItems:'flex-end',justifyContent:'center',background:'rgba(10,53,64,0.6)',backdropFilter:'blur(4px)',animation:'fadeIn .25s ease-out'}} onClick={()=>setRulesOpen(false)}>
          <div className="su" style={{width:'100%',maxWidth:440,background:'var(--bg)',borderRadius:'26px 26px 0 0',padding:'10px 22px 40px',maxHeight:'78vh',display:'flex',flexDirection:'column'}} onClick={e=>e.stopPropagation()}>
            <div style={{width:40,height:4,borderRadius:100,background:'rgba(20,160,155,0.2)',margin:'0 auto 16px'}}></div>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:14,flexShrink:0}}>
              <h3 style={{fontFamily:"'Baloo Bhaijaan 2',sans-serif",fontSize:20,fontWeight:700}}>📘 Rules & Regulations</h3>
              <button onClick={()=>setRulesOpen(false)} className="btn-icon-teal" style={{width:34,height:34,borderRadius:10,display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}><X size={15}/></button>
            </div>
            <div className="sh" style={{overflowY:'auto',paddingRight:2}}>
              <p style={{fontSize:13,color:'var(--ink2)',lineHeight:1.6,marginBottom:16}}>To keep Karro safe, honest and welcoming for every neighbor, all members agree to the following.</p>
              <div style={{display:'flex',flexDirection:'column',gap:9}}>
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
                  <div key={title} style={{background:'var(--card)',border:'1px solid rgba(20,160,155,0.1)',borderRadius:14,padding:'12px 14px',display:'flex',gap:11}}>
                    <span style={{fontSize:17,flexShrink:0}}>{icon}</span>
                    <div>
                      <div style={{fontSize:13,fontWeight:700,color:'var(--ink)',marginBottom:2}}>{title}</div>
                      <div style={{fontSize:12,color:'var(--ink2)',lineHeight:1.55}}>{body}</div>
                    </div>
                  </div>
                ))}
              </div>
              <p style={{fontSize:11,color:'var(--ink3)',textAlign:'center',marginTop:14}}>Last updated July 2026</p>
            </div>
          </div>
        </div>
      )}
      {pickOpen&&<AvatarSheet avatar={avatar} name={name} fileRef={fileRef} onFile={onFile} saveAvatar={saveAvatar} onClose={()=>setPickOpen(false)}/>}
    </div>
  );
};

/* Avatar picker bottom sheet (upload or presets) */
const AvatarSheet = ({avatar, name, fileRef, onFile, saveAvatar, onClose}) => (
  <div style={{position:'fixed',inset:0,zIndex:70,display:'flex',alignItems:'flex-end',justifyContent:'center',background:'rgba(10,53,64,0.6)',backdropFilter:'blur(4px)',animation:'fadeIn .25s ease-out'}} onClick={onClose}>
    <div className="su" style={{width:'100%',maxWidth:440,background:'var(--bg)',borderRadius:'26px 26px 0 0',padding:'24px 22px 44px'}} onClick={e=>e.stopPropagation()}>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:16}}>
        <h3 style={{fontFamily:"'Baloo Bhaijaan 2',sans-serif",fontSize:20,fontWeight:700}}>Choose your avatar</h3>
        <button onClick={onClose} className="btn-icon-teal" style={{width:34,height:34,borderRadius:10,display:'flex',alignItems:'center',justifyContent:'center'}}><X size={15}/></button>
      </div>
      <input ref={fileRef} type="file" accept="image/*" onChange={onFile} style={{display:'none'}}/>
      <button onClick={()=>fileRef.current&&fileRef.current.click()} style={{width:'100%',display:'flex',alignItems:'center',justifyContent:'center',gap:8,padding:'15px',borderRadius:14,background:'var(--card)',border:'1.5px dashed rgba(20,160,155,0.35)',color:'#14A09B',fontSize:13,fontWeight:700,marginBottom:16}}>🖼️ Upload a photo</button>
      <div style={{fontSize:10,fontWeight:700,letterSpacing:'.1em',color:'var(--ink3)',marginBottom:8}}>OR PICK ONE</div>
      <div style={{display:'grid',gridTemplateColumns:'repeat(6,1fr)',gap:8,marginBottom:16}}>
        {AVATAR_PRESETS.map(e=>(
          <button key={e} onClick={()=>{saveAvatar({type:'emoji',v:e});onClose();}} style={{aspectRatio:'1',borderRadius:14,fontSize:24,background:avatar&&avatar.type==='emoji'&&avatar.v===e?'rgba(20,160,155,0.15)':'var(--card)',border:`1.5px solid ${avatar&&avatar.type==='emoji'&&avatar.v===e?'#14A09B':'rgba(20,160,155,0.12)'}`,display:'flex',alignItems:'center',justifyContent:'center'}}>{e}</button>
        ))}
      </div>
      <button onClick={()=>{saveAvatar(null);onClose();}} style={{width:'100%',padding:'12px',borderRadius:100,background:'transparent',border:'1px solid rgba(20,160,155,0.2)',color:'#14A09B',fontSize:13,fontWeight:700}}>Use my initial “{name.charAt(0)}”</button>
    </div>
  </div>
);

Object.assign(window, { ProfilePage });
