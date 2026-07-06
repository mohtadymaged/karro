/* Landing + SignIn + Register */
const { useState, useEffect, useMemo, useRef } = React;

const useTypewriter=(text,speed=65,delay=400)=>{const[i,setI]=useState(0);useEffect(()=>{const t=setTimeout(()=>{const iv=setInterval(()=>setI(n=>{if(n>=text.length){clearInterval(iv);return n;}return n+1;}),speed);return()=>clearInterval(iv);},delay);return()=>clearTimeout(t);},[]);return text.slice(0,i);};

const deriveUsername = (email) => (email||'').split('@')[0].trim() || 'neighbor';

const AUTH_BG = "linear-gradient(180deg,rgba(10,53,64,0.7) 0%,rgba(58,90,97,0.7) 50%,rgba(74,107,114,0.75) 100%), url('uploads/istockphoto-2215303116-1024x1024.jpg') center/cover no-repeat fixed";

const cardBg = 'rgba(255,255,255,0.08)';
const cardBgActive = 'rgba(255,106,85,0.15)';
const cardBorder = '1px solid rgba(255,255,255,0.1)';
const cardBorderActive = '1.5px solid rgba(255,106,85,0.35)';
const GLASS = {background:'rgba(10,53,64,0.72)',backdropFilter:'blur(14px)',WebkitBackdropFilter:'blur(14px)',border:'1px solid rgba(126,216,211,0.18)',borderRadius:24,boxShadow:'0 24px 60px rgba(0,0,0,0.35)'};

const LANDING_CSS = `
@keyframes marquee{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
@keyframes heroZoom{0%{transform:scale(1)}100%{transform:scale(1.08)}}
.step-row{display:flex;gap:16px;align-items:flex-start;}
`;

const LandingPage = ({onSignIn, onRegister}) => {
  const l1=useTypewriter('From Us.',70,600); const l2=useTypewriter('To Us.',70,1550);
  const steps=[
    {n:'01',title:'Join your community',desc:'Sign up with your unit. You only see your own neighborhood.'},
    {n:'02',title:'List or browse',desc:'Snap a photo, set a price. Or scroll what neighbors are selling today.'},
    {n:'03',title:'Meet at the door',desc:'Message directly, agree, and hand it over. No shipping, no fees.'},
  ];
  const marqueeCats=[...CATS,...CATS];
  return (
    <div className="fs" style={{minHeight:'100%',background:'#0A3540',color:'#FFFFFF',overflowX:'hidden',position:'relative'}}>
      <style>{CSS}</style><style>{LANDING_CSS}</style>
      {/* HERO — full-screen photo, centered content, ticker at bottom edge */}
      <div style={{height:'100cqh',display:'flex',flexDirection:'column',position:'relative',overflow:'hidden'}}>
        <div style={{position:'absolute',inset:0,background:"url('uploads/istockphoto-2215303116-1024x1024.jpg') center 30%/cover no-repeat",animation:'heroZoom 24s ease-in-out infinite alternate'}}></div>
        <div style={{position:'absolute',inset:0,background:'linear-gradient(180deg,rgba(10,53,64,0.6) 0%,rgba(10,53,64,0.35) 40%,rgba(10,53,64,0.55) 78%,rgba(10,53,64,0.85) 100%)'}}></div>
        <Particles/>
        <header style={{padding:'52px 22px 12px',display:'flex',justifyContent:'flex-start',alignItems:'center',position:'relative',zIndex:2}}>
          <Logo light/>
        </header>
        <section style={{position:'relative',zIndex:2,flex:1,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',padding:'0 22px',textAlign:'center'}}>
          <div style={{display:'inline-flex',alignItems:'center',gap:6,background:'rgba(10,53,64,0.72)',backdropFilter:'blur(8px)',border:'1px solid rgba(255,106,85,0.35)',borderRadius:100,padding:'8px 16px',marginBottom:24,animation:'fadeIn .6s ease-out'}}><Star size={11} strokeWidth={2.5} style={{color:'#FF8A73'}}/><span style={{fontSize:10,fontWeight:700,letterSpacing:'0.16em',color:'#FF8A73'}}>COMMUNITY MARKETPLACE</span></div>
          <h1 className="ff" style={{fontSize:'clamp(52px,14vw,72px)',fontWeight:900,lineHeight:0.98,letterSpacing:'-0.03em',marginBottom:18,minHeight:130,textShadow:'0 4px 30px rgba(0,0,0,0.55)'}}>
            <span style={{color:'#FFFFFF'}}>{l1}</span>
            {l1.length>=8&&<><br/><span style={{color:'#FF8A73',fontStyle:'italic'}}>{l2}</span>{l2.length<6&&<span className="cursor"/>}</>}
          </h1>
          <p style={{fontSize:15,lineHeight:1.65,color:'rgba(255,255,255,0.92)',maxWidth:320,margin:'0 auto 30px',textShadow:'0 1px 14px rgba(0,0,0,0.6)',animation:'fadeUp .7s .5s ease-out both'}}>The marketplace that ends at your gate. Buy, sell and connect with the people right next door.</p>
          <div style={{display:'flex',flexDirection:'column',gap:12,width:'100%',maxWidth:340,animation:'fadeUp .7s .7s ease-out both'}}>
            <button onClick={onRegister} className="btn-gold" style={{padding:'17px 20px',borderRadius:16,fontSize:16,fontWeight:600,boxShadow:'0 8px 32px rgba(255,106,85,0.45)',whiteSpace:'nowrap',width:'100%'}}>Join Karro</button>
            <button onClick={onSignIn} style={{padding:'17px 20px',borderRadius:16,background:'rgba(10,53,64,0.35)',backdropFilter:'blur(8px)',color:'#FF8A73',fontSize:15,fontWeight:600,border:'1px solid rgba(255,106,85,0.55)',whiteSpace:'nowrap',width:'100%'}}>Sign In</button>
          </div>
        </section>
        {/* CATEGORY TICKER */}
        <div style={{position:'relative',zIndex:2,padding:'14px 0 46px',overflow:'hidden'}}>
          <div style={{display:'flex',gap:10,width:'max-content',animation:'marquee 30s linear infinite'}}>
            {marqueeCats.map((c,i)=><span key={i} style={{display:'inline-flex',alignItems:'center',gap:7,padding:'9px 18px',borderRadius:100,background:'rgba(10,53,64,0.45)',backdropFilter:'blur(8px)',border:'1px solid rgba(126,216,211,0.18)',fontSize:12,fontWeight:600,color:'rgba(255,255,255,0.85)',whiteSpace:'nowrap'}}><span style={{fontSize:15}}>{c.emoji}</span>{c.name}</span>)}
          </div>
        </div>
      </div>
      {/* HOW IT WORKS */}
      <section style={{padding:'52px 22px 20px',position:'relative'}}>
        <p style={{fontSize:10,fontWeight:700,letterSpacing:'0.2em',color:'#FF6A55',marginBottom:10}}>HOW IT WORKS</p>
        <h2 className="ff" style={{fontSize:30,fontWeight:800,lineHeight:1.15,marginBottom:30}}>Three steps between<br/><span style={{color:'#7ED8D3',fontStyle:'italic'}}>you and your neighbor.</span></h2>
        <div style={{display:'flex',flexDirection:'column',gap:0,position:'relative'}}>
          <div style={{position:'absolute',left:19,top:12,bottom:24,width:1,background:'linear-gradient(180deg,rgba(255,106,85,0.4),rgba(126,216,211,0.2))'}}/>
          {steps.map((s,i)=><div key={s.n} className="step-row" style={{paddingBottom:i<2?28:0,position:'relative'}}>
            <div style={{width:40,height:40,borderRadius:12,flexShrink:0,background:'rgba(10,53,64,1)',border:'1px solid rgba(255,106,85,0.4)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:12,fontWeight:800,color:'#FF8A73',position:'relative',zIndex:1}}>{s.n}</div>
            <div style={{paddingTop:4}}>
              <div style={{fontSize:16,fontWeight:700,marginBottom:5,color:'#FFFFFF'}}>{s.title}</div>
              <div style={{fontSize:13,lineHeight:1.65,color:'rgba(255,255,255,0.55)'}}>{s.desc}</div>
            </div>
          </div>)}
        </div>
      </section>
      {/* QUOTE */}
      <div style={{padding:'36px 34px',textAlign:'center'}}>
        <p className="ff" style={{fontSize:21,fontStyle:'italic',lineHeight:1.5,color:'rgba(255,255,255,0.85)'}}>"Buy from members. Sell to members. <span style={{color:'#FF8A73'}}>Belong.</span>"</p>
      </div>
      {/* CTA */}
      <section style={{padding:'0 22px 56px'}}>
        <div style={{...GLASS,padding:'40px 24px',textAlign:'center',position:'relative',overflow:'hidden'}}>
          <div style={{position:'absolute',top:-60,right:-60,width:180,height:180,borderRadius:'50%',background:'radial-gradient(circle,rgba(255,106,85,0.25),transparent 70%)'}}/>
          <div style={{fontSize:38,marginBottom:14,animation:'float 3s ease-in-out infinite'}}>🌱</div>
          <h2 className="ff" style={{fontSize:28,fontWeight:800,marginBottom:8}}>Ready to roll<br/>with Karro?</h2>
          <p style={{fontSize:14,color:'rgba(255,255,255,0.6)',marginBottom:26,lineHeight:1.65}}>Free. Local. Just for your community.</p>
          <button onClick={onRegister} className="btn-gold" style={{padding:'16px 44px',borderRadius:12,fontSize:15,fontWeight:600,boxShadow:'0 8px 32px rgba(255,106,85,0.4)'}}>Get Started Free</button>
        </div>
      </section>
      <footer style={{padding:'24px 22px 40px',borderTop:'1px solid rgba(255,106,85,0.1)',textAlign:'center'}}><Logo light/><p style={{fontSize:11,color:'rgba(255,255,255,0.25)',marginTop:14}}>© 2026 Karro. All rights reserved.</p></footer>
    </div>
  );
};

/* SIGN IN ════════════════════════════════════════════ */
/* FORGOT PASSWORD flow (modal over Sign In) */
const ForgotFlow = ({onClose}) => {
  const [fp,setFp] = useState(1); // 1 email · 2 code · 3 new pass · 4 done
  const [email,setEmail] = useState('');
  const [code,setCode] = useState('');
  const [p1,setP1] = useState(''); const [p2,setP2] = useState(''); const [show,setShow] = useState(false);
  const [busy,setBusy] = useState(false);
  const emailOk = /^\S+@\S+\.\S+$/.test(email);
  const wait = (fn)=>{setBusy(true);setTimeout(()=>{setBusy(false);fn();},1100);};
  const label = (t)=><label style={{display:'block',fontSize:10,fontWeight:700,letterSpacing:'0.1em',color:'rgba(255,106,85,0.65)',marginBottom:8}}>{t}</label>;
  return (
    <div style={{position:'fixed',inset:0,zIndex:60,display:'flex',alignItems:'center',justifyContent:'center',background:'rgba(10,53,64,0.7)',backdropFilter:'blur(6px)',animation:'fadeIn .25s ease-out',padding:22}} onClick={onClose}>
      <div style={{...GLASS,width:'100%',maxWidth:380,padding:'26px 24px',animation:'scaleIn .3s cubic-bezier(0.34,1.56,0.64,1) both'}} onClick={e=>e.stopPropagation()}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:6}}>
          <h2 className="ff" style={{fontSize:22,fontWeight:800,color:'#FFFFFF'}}>{fp===4?'Password reset!':'Reset password'}</h2>
          <button onClick={onClose} style={{background:'rgba(255,106,85,0.15)',border:'1px solid rgba(255,106,85,0.25)',width:32,height:32,borderRadius:10,display:'flex',alignItems:'center',justifyContent:'center',color:'#FF6A55'}}><X size={14}/></button>
        </div>
        {fp<4&&<div style={{display:'flex',gap:5,margin:'10px 0 18px'}}>{[1,2,3].map(n=><div key={n} style={{flex:1,height:3,borderRadius:100,background:n<=fp?'#FF6A55':'rgba(255,106,85,0.15)',transition:'background .3s'}}></div>)}</div>}
        {fp===1&&<>
          <p style={{fontSize:13,color:'rgba(255,255,255,0.6)',marginBottom:16,lineHeight:1.6}}>Enter the email on your account and we'll send you a 6-digit reset code.</p>
          {label('EMAIL ADDRESS')}
          <DarkField icon={Mail} type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@email.com"/>
          {email&&!emailOk&&<p style={{fontSize:11,color:'#FF8A73',marginTop:6}}>That doesn't look like a valid email.</p>}
          <button onClick={()=>wait(()=>setFp(2))} disabled={!emailOk||busy} className="btn-gold" style={{width:'100%',padding:'15px',borderRadius:12,fontSize:14,fontWeight:600,marginTop:18,opacity:(!emailOk||busy)?0.55:1}}>{busy?'Sending…':'Send Reset Code'}</button>
        </>}
        {fp===2&&<>
          <p style={{fontSize:13,color:'rgba(255,255,255,0.6)',marginBottom:16,lineHeight:1.6}}>We sent a code to <strong style={{color:'#FF8A73'}}>{email}</strong>. Enter it below.</p>
          {label('6-DIGIT CODE')}
          <DarkField icon={Lock} value={code} onChange={e=>setCode(e.target.value.replace(/\D/g,'').slice(0,6))} placeholder="••••••"/>
          <button onClick={()=>wait(()=>setFp(3))} disabled={code.length!==6||busy} className="btn-gold" style={{width:'100%',padding:'15px',borderRadius:12,fontSize:14,fontWeight:600,marginTop:18,opacity:(code.length!==6||busy)?0.55:1}}>{busy?'Verifying…':'Verify Code'}</button>
          <p style={{textAlign:'center',marginTop:12,fontSize:12,color:'rgba(255,255,255,0.45)'}}>Didn't get it? <button style={{background:'transparent',border:'none',color:'#7ED8D3',fontWeight:700,fontSize:12,cursor:'pointer'}}>Resend</button></p>
        </>}
        {fp===3&&<>
          <p style={{fontSize:13,color:'rgba(255,255,255,0.6)',marginBottom:16,lineHeight:1.6}}>Choose a new password (min. 8 characters).</p>
          {label('NEW PASSWORD')}
          <DarkField icon={Lock} type={show?'text':'password'} value={p1} onChange={e=>setP1(e.target.value)} placeholder="New password" right={<button onClick={()=>setShow(!show)} style={{background:'transparent',border:'none',color:'rgba(255,106,85,0.6)',display:'flex',cursor:'pointer'}}>{show?<EyeOff size={15}/>:<Eye size={15}/>}</button>}/>
          <div style={{height:12}}></div>
          {label('CONFIRM PASSWORD')}
          <DarkField icon={Lock} type={show?'text':'password'} value={p2} onChange={e=>setP2(e.target.value)} placeholder="Repeat password"/>
          {p2&&p1!==p2&&<p style={{fontSize:11,color:'#FF8A73',marginTop:6}}>Passwords don't match.</p>}
          <button onClick={()=>wait(()=>setFp(4))} disabled={p1.length<8||p1!==p2||busy} className="btn-gold" style={{width:'100%',padding:'15px',borderRadius:12,fontSize:14,fontWeight:600,marginTop:18,opacity:(p1.length<8||p1!==p2||busy)?0.55:1}}>{busy?'Saving…':'Reset Password'}</button>
        </>}
        {fp===4&&<div style={{textAlign:'center',padding:'8px 0 4px'}}>
          <div style={{width:64,height:64,borderRadius:'50%',background:'rgba(126,216,211,0.15)',border:'1px solid rgba(126,216,211,0.4)',display:'flex',alignItems:'center',justifyContent:'center',margin:'14px auto 16px',animation:'scaleIn .4s cubic-bezier(0.34,1.56,0.64,1)'}}><Check size={28} strokeWidth={2.6} style={{color:'#7ED8D3'}}/></div>
          <p style={{fontSize:14,color:'rgba(255,255,255,0.75)',lineHeight:1.65,marginBottom:22}}>Your password has been updated.<br/>Sign in with your new password.</p>
          <button onClick={onClose} className="btn-gold" style={{width:'100%',padding:'15px',borderRadius:12,fontSize:14,fontWeight:600}}>Back to Sign In</button>
        </div>}
      </div>
    </div>
  );
};

const SignInPage = ({onBack,onSuccess,onRegister}) => {
  const[email,setEmail]=useState('');const[pass,setPass]=useState('');const[show,setShow]=useState(false);const[busy,setBusy]=useState(false);const[forgot,setForgot]=useState(false);
  const submit=()=>{setBusy(true);setTimeout(()=>{setBusy(false);onSuccess(deriveUsername(email));},1400);};
  return(
    <div className="fs" style={{minHeight:'100%',background:AUTH_BG,color:'#FFFFFF',display:'flex',flexDirection:'column',animation:'slideIn .35s ease-out',position:'relative',overflow:'hidden'}}>
      <style>{CSS}</style>
      <div style={{position:'absolute',top:'-30%',right:'-30%',width:'80vw',height:'80vw',borderRadius:'50%',background:'radial-gradient(circle,rgba(20,160,155,0.18) 0%,transparent 65%)',animation:'orb1 20s ease-in-out infinite',pointerEvents:'none'}}/>
      <header style={{padding:'52px 22px 20px',display:'flex',alignItems:'center',gap:14,position:'relative',zIndex:1}}>
        <button onClick={onBack} style={{background:'rgba(255,106,85,0.15)',border:'1px solid rgba(255,106,85,0.25)',width:38,height:38,borderRadius:12,display:'flex',alignItems:'center',justifyContent:'center',color:'#FF6A55',transition:'all .2s'}}><ArrowLeft size={18} strokeWidth={2.3}/></button>
        <Logo light/>
      </header>
      <div style={{flex:1,padding:'12px 20px 36px',display:'flex',flexDirection:'column',justifyContent:'center',maxWidth:460,width:'100%',margin:'0 auto',position:'relative',zIndex:1}}>
       <div style={{...GLASS,padding:'28px 24px'}}>
        <div style={{marginBottom:28,animation:'fadeUp .5s ease-out both'}}>
          <h1 className="ff" style={{fontSize:36,fontWeight:900,lineHeight:1.08,marginBottom:8}}>Welcome<br/><span className="text-gold">back.</span></h1>
          <p style={{fontSize:14,color:'rgba(255,255,255,0.6)'}}>Sign in to your Karro account</p>
        </div>
        <div style={{animation:'fadeUp .5s .1s ease-out both'}}>
          <label style={{display:'block',fontSize:10,fontWeight:700,letterSpacing:'0.1em',color:'rgba(255,106,85,0.65)',marginBottom:8}}>EMAIL ADDRESS</label>
          <DarkField icon={Mail} type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@email.com"/>
          <label style={{display:'block',fontSize:10,fontWeight:700,letterSpacing:'0.1em',color:'rgba(255,106,85,0.65)',marginBottom:8,marginTop:14}}>PASSWORD</label>
          <DarkField icon={Lock} type={show?'text':'password'} value={pass} onChange={e=>setPass(e.target.value)} placeholder="Your password" right={<button onClick={()=>setShow(!show)} style={{background:'transparent',border:'none',color:'rgba(255,106,85,0.6)',display:'flex',cursor:'pointer'}}>{show?<EyeOff size={15}/>:<Eye size={15}/>}</button>}/>
          <div style={{textAlign:'right',marginBottom:26,marginTop:10}}><button onClick={()=>setForgot(true)} className="btn-ghost-gold" style={{borderRadius:8,padding:'6px 12px',fontSize:12,fontWeight:600,color:'#FF8A73',background:'transparent',border:'none',cursor:'pointer',whiteSpace:'nowrap'}}>Forgot password?</button></div>
        </div>
        <button onClick={submit} disabled={busy} className="btn-gold" style={{padding:'16px',borderRadius:12,fontSize:15,fontWeight:600,marginBottom:18,opacity:busy?.7:1,boxShadow:'0 8px 32px rgba(255,106,85,0.4)',width:'100%',transition:'all .2s',cursor:busy?'not-allowed':'pointer'}}>{busy?'Signing in…':'Sign In →'}</button>
        <p style={{textAlign:'center',fontSize:14,color:'rgba(255,255,255,0.5)'}}>New here?{' '}<button onClick={onRegister} style={{background:'transparent',border:'none',color:'#7ED8D3',fontWeight:700,fontSize:14,cursor:'pointer',whiteSpace:'nowrap'}}>Join Karro</button></p>
       </div>
      </div>
      {forgot&&<ForgotFlow onClose={()=>setForgot(false)}/>}
    </div>
  );
};

/* REGISTER ══════════════════════════════════════════ */
const RegisterPage = ({onBack,onSuccess,initialStep=1,initialDone=false,initialForm}) => {
  const[step,setStep]=useState(initialStep);const[busy,setBusy]=useState(false);const[showP,setShowP]=useState(false);const[confetti,setConfetti]=useState(false);const[done,setDone]=useState(initialDone);
  const[form,setForm]=useState(initialForm||{name:'',email:'',username:'',password:'',unit:'',floor:'',residentType:'',interests:new Set(),idPhoto:null});
  const idRef=useRef(null);
  const set=(k,v)=>setForm(f=>({...f,[k]:v}));const tog=(id)=>setForm(f=>{const s=new Set(f.interests);s.has(id)?s.delete(id):s.add(id);return{...f,interests:s};});
  const back=()=>step>1?setStep(s=>s-1):onBack();
  const emailOk=/^\S+@\S+\.\S+$/.test(form.email);
  const finish=()=>{setBusy(true);setTimeout(()=>{setBusy(false);try{localStorage.setItem('gt_verified',form.idPhoto?'1':'0');}catch(e){}setConfetti(true);setDone(true);setTimeout(()=>setConfetti(false),2000);},1600);};
  const next=()=>{if(step<4){setStep(s=>s+1);return;}finish();};
  const onIdFile=(e)=>{const file=e.target.files&&e.target.files[0];if(!file)return;const r=new FileReader();r.onload=ev=>set('idPhoto',ev.target.result);r.readAsDataURL(file);e.target.value='';};
  const canGo=step===1?(form.name.trim().length>=2&&emailOk&&form.username.length>=3&&form.password.length>=8):step===2?(form.unit&&form.residentType):step===3?form.interests.size>=3:true;
  const strength=form.password.length<4?0:form.password.length<7?1:form.password.length<10?2:3;
  const strC=['#E8513C','#FF6A55','#7ED8D3','#14A09B'];const strL=['Weak','Fair','Good','Strong'];
  if(done)return(
    <div className="fs" style={{minHeight:'100%',background:AUTH_BG,color:'#FFFFFF',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',textAlign:'center',padding:32,animation:'fadeIn .4s ease-out'}}>
      <style>{CSS}</style><Confetti show={confetti}/>
      <div style={{...GLASS,padding:'44px 32px',maxWidth:380,width:'100%',display:'flex',flexDirection:'column',alignItems:'center'}}>
      <div style={{fontSize:72,marginBottom:20,animation:'scaleIn .6s .3s cubic-bezier(0.34,1.56,0.64,1) both'}}>🎉</div>
      <h1 className="ff text-gold" style={{fontSize:38,fontWeight:900,marginBottom:10}}>You're in!</h1>
      <p style={{fontSize:15,color:'rgba(255,255,255,0.7)',lineHeight:1.7,marginBottom:8}}>Welcome to Karro,<br/><strong style={{color:'#7ED8D3'}}>@{form.username||'neighbor'}</strong></p>
      {form.idPhoto?(
        <div style={{display:'inline-flex',alignItems:'center',gap:6,background:'rgba(126,216,211,0.12)',border:'1px solid rgba(126,216,211,0.35)',borderRadius:100,padding:'7px 14px',fontSize:11,fontWeight:700,color:'#7ED8D3',marginBottom:14}}><Check size={11} strokeWidth={3}/>ID SUBMITTED — VERIFIED BADGE PENDING APPROVAL</div>
      ):(
        <p style={{fontSize:12,color:'rgba(255,138,115,0.75)',lineHeight:1.6,marginBottom:14,maxWidth:300}}>⚠️ Your account is <strong>unverified</strong> — neighbors won't see the ✓ badge beside your picture until you upload your ID from your Profile.</p>
      )}
      <p style={{fontSize:13,color:'rgba(255,255,255,0.45)',marginBottom:36}}>Your community marketplace is ready.</p>
      <button onClick={()=>onSuccess(form.username)} className="btn-gold" style={{padding:'16px 44px',borderRadius:12,fontSize:15,fontWeight:600,boxShadow:'0 8px 32px rgba(255,106,85,0.4)',animation:'pulse 2s 1s ease-in-out infinite'}}>Explore the Market →</button>
      </div>
    </div>
  );
  return(
    <div className="fs" style={{minHeight:'100%',background:AUTH_BG,color:'#FFFFFF',display:'flex',flexDirection:'column',animation:'slideIn .35s ease-out',position:'relative',overflow:'hidden'}}>
      <style>{CSS}</style><Confetti show={confetti}/>
      <div style={{position:'absolute',top:'-15%',right:'-20%',width:'70vw',height:'70vw',borderRadius:'50%',background:'radial-gradient(circle,rgba(255,106,85,0.1) 0%,transparent 65%)',animation:'orb2 20s ease-in-out infinite',pointerEvents:'none'}}/>
      <header style={{padding:'52px 22px 20px',display:'flex',alignItems:'center',gap:14,position:'relative',zIndex:1}}>
        <button onClick={back} style={{background:'rgba(255,106,85,0.15)',border:'1px solid rgba(255,106,85,0.25)',width:38,height:38,borderRadius:12,display:'flex',alignItems:'center',justifyContent:'center',color:'#FF6A55',transition:'all .2s',cursor:'pointer'}}><ArrowLeft size={18} strokeWidth={2.3}/></button>
        <Logo light/><span style={{marginLeft:'auto',fontSize:12,fontWeight:600,color:'rgba(255,106,85,0.6)'}}>Step {step} / 4</span>
      </header>
      <div style={{padding:'0 22px 6px',position:'relative',zIndex:1}}>
        <div style={{display:'flex',gap:6}}>{[1,2,3,4].map(n=><div key={n} style={{flex:1,height:4,borderRadius:100,background:'rgba(255,106,85,0.15)',overflow:'hidden'}}><div style={{height:'100%',borderRadius:100,background:'linear-gradient(90deg,#E8513C,#FF8A73)',width:n<=step?'100%':'0%',transition:'width .5s cubic-bezier(0.34,1.56,0.64,1)'}}/></div>)}</div>
      </div>
      <div className="sh" style={{flex:1,overflowY:'auto',padding:'20px 20px 0',maxWidth:480,width:'100%',margin:'0 auto',position:'relative',zIndex:1}}>
       <div style={{...GLASS,padding:'24px 20px',marginBottom:16}}>
        <div style={{marginBottom:26,animation:'fadeUp .4s ease-out both'}}>
          <h1 className="ff" style={{fontSize:32,fontWeight:900,lineHeight:1.1,marginBottom:6}}>
            {step===1&&<>Create<br/><span className="text-gold">your account.</span></>}
            {step===2&&<>Your<br/><span style={{color:'#7ED8D3',fontStyle:'italic'}}>home.</span></>}
            {step===3&&<>Your<br/><span className="text-gold">interests.</span></>}
            {step===4&&<>Verify<br/><span style={{color:'#7ED8D3',fontStyle:'italic'}}>your identity.</span></>}
          </h1>
          <p style={{fontSize:13,color:'rgba(255,255,255,0.55)'}}>{step===1&&'Tell us who you are to get started.'}{step===2&&'Let your neighbors know where you live in the community.'}{step===3&&`Pick at least 3 to personalize your feed · ${form.interests.size} selected`}{step===4&&'Upload a photo of your ID to earn the verified badge. You can skip this and verify later.'}</p>
        </div>
        {step===1&&<div style={{animation:'slideIn .3s ease-out both'}}>
          {[{l:'FULL NAME',icon:User,k:'name',p:'Jane Smith',t:'text'},{l:'EMAIL ADDRESS',icon:Mail,k:'email',p:'you@email.com',t:'email'}].map(f=><div key={f.k}><label style={{display:'block',fontSize:10,fontWeight:700,letterSpacing:'.1em',color:'rgba(255,106,85,0.65)',marginBottom:8,marginTop:12}}>{f.l}</label><DarkField icon={f.icon} type={f.t} value={form[f.k]} onChange={e=>set(f.k,e.target.value)} placeholder={f.p}/></div>)}
          <label style={{display:'block',fontSize:10,fontWeight:700,letterSpacing:'.1em',color:'rgba(255,106,85,0.65)',marginBottom:8,marginTop:14}}>USERNAME</label>
          <DarkField value={form.username} onChange={e=>set('username',e.target.value.toLowerCase().replace(/\s/g,''))} placeholder="jane_smith" right={<span style={{color:'rgba(255,106,85,0.6)',fontSize:15,fontWeight:700,marginRight:4}}>@</span>}/>
          <label style={{display:'block',fontSize:10,fontWeight:700,letterSpacing:'.1em',color:'rgba(255,106,85,0.65)',marginBottom:8,marginTop:14}}>PASSWORD</label>
          <DarkField icon={Lock} type={showP?'text':'password'} value={form.password} onChange={e=>set('password',e.target.value)} placeholder="Min. 8 characters" right={<button onClick={()=>setShowP(!showP)} style={{background:'transparent',border:'none',color:'rgba(255,106,85,0.6)',display:'flex',cursor:'pointer'}}>{showP?<EyeOff size={15}/>:<Eye size={15}/>}</button>}/>
          {form.email.length>0&&!emailOk&&<p style={{fontSize:11,color:'#FF8A73',marginTop:8}}>Please enter a valid email address.</p>}
          {form.password.length>0&&form.password.length<8&&<p style={{fontSize:11,color:'#FF8A73',marginTop:6}}>Password must be at least 8 characters.</p>}
          {form.password.length>0&&<div style={{marginBottom:4}}><div style={{display:'flex',gap:4,marginBottom:4}}>{[0,1,2,3].map(n=><div key={n} style={{flex:1,height:3,borderRadius:100,background:n<=strength?strC[strength]:'rgba(255,106,85,0.1)',transition:'background .3s'}}/>)}</div><p style={{fontSize:10,color:'rgba(255,255,255,0.4)'}}>{strL[strength]} password</p></div>}
        </div>}
        {step===2&&<div style={{animation:'slideIn .3s ease-out both'}}>
          <label style={{display:'block',fontSize:10,fontWeight:700,letterSpacing:'.1em',color:'rgba(255,106,85,0.65)',marginBottom:8}}>UNIT / DOOR NUMBER</label>
          <DarkField icon={Building} value={form.unit} onChange={e=>set('unit',e.target.value)} placeholder="e.g. 4B · 12 · Unit 305"/>
          <label style={{display:'block',fontSize:10,fontWeight:700,letterSpacing:'.1em',color:'rgba(255,106,85,0.65)',marginBottom:8,marginTop:14}}>FLOOR (Optional)</label>
          <DarkField icon={Home} type="number" value={form.floor} onChange={e=>set('floor',e.target.value)} placeholder="e.g. Ground · 3"/>
          <label style={{display:'block',fontSize:10,fontWeight:700,letterSpacing:'.1em',color:'rgba(255,106,85,0.65)',marginBottom:12,marginTop:16}}>TYPE OF RESIDENT</label>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8}}>
            {RESIDENT_TYPES.map(r=>{const sel=form.residentType===r.id;return(
              <button key={r.id} onClick={()=>set('residentType',r.id)} className="card-press" style={{display:'flex',alignItems:'center',gap:10,padding:'14px',borderRadius:14,textAlign:'left',background:sel?cardBgActive:cardBg,border:sel?cardBorderActive:cardBorder,color:sel?'#FF8A73':'rgba(255,255,255,0.7)',transition:'all .2s',backdropFilter:'blur(6px)',cursor:'pointer'}}>
                <span style={{fontSize:22,flexShrink:0}}>{r.emoji}</span><span style={{fontSize:12,fontWeight:600,lineHeight:1.3,flex:1}}>{r.label}</span>{sel&&<Check size={13} strokeWidth={2.6}/>}
              </button>);
            })}
          </div>
        </div>}
        {step===3&&<div style={{animation:'slideIn .3s ease-out both',paddingBottom:16}}>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:8}}>
            {CATS.map((c,i)=>{const sel=form.interests.has(c.id);return(
              <button key={c.id} onClick={()=>tog(c.id)} className={`card-press s${(i%9)+1}`} style={{display:'flex',flexDirection:'column',alignItems:'center',gap:6,padding:'14px 8px',borderRadius:14,position:'relative',background:sel?cardBgActive:cardBg,border:sel?cardBorderActive:cardBorder,transition:'all .2s',animation:'scaleIn .3s ease-out both',backdropFilter:'blur(6px)',cursor:'pointer'}}>
                {sel&&<div style={{position:'absolute',top:5,right:5,width:16,height:16,borderRadius:'50%',background:'#FF6A55',display:'flex',alignItems:'center',justifyContent:'center',animation:'scaleIn .2s ease-out'}}><Check size={8} strokeWidth={3} style={{color:'#0A3540'}}/></div>}
                <span style={{fontSize:28}}>{c.emoji}</span>
                <span style={{fontSize:10,fontWeight:600,textAlign:'center',lineHeight:1.2,color:sel?'#FF8A73':'rgba(255,255,255,0.65)'}}>{c.name}</span>
              </button>);
            })}
          </div>
        </div>}
        {step===4&&<div style={{animation:'slideIn .3s ease-out both',paddingBottom:8}}>
          <input ref={idRef} type="file" accept="image/*" onChange={onIdFile} style={{display:'none'}}/>
          {form.idPhoto?(
            <div style={{position:'relative',borderRadius:16,overflow:'hidden',border:'1.5px solid rgba(126,216,211,0.5)',marginBottom:14,animation:'scaleIn .3s ease-out'}}>
              <img src={form.idPhoto} alt="Your ID" style={{width:'100%',height:170,objectFit:'cover',display:'block'}}/>
              <div style={{position:'absolute',bottom:0,left:0,right:0,background:'rgba(10,53,64,0.85)',padding:'8px 12px',display:'flex',alignItems:'center',gap:6}}>
                <Check size={12} strokeWidth={3} style={{color:'#7ED8D3'}}/><span style={{fontSize:11,fontWeight:700,color:'#7ED8D3'}}>ID uploaded — pending review</span>
                <button onClick={()=>set('idPhoto',null)} style={{marginLeft:'auto',background:'transparent',border:'none',color:'rgba(255,255,255,0.6)',fontSize:11,fontWeight:600,cursor:'pointer'}}>Remove</button>
              </div>
            </div>
          ):(
            <button onClick={()=>idRef.current&&idRef.current.click()} style={{width:'100%',display:'flex',flexDirection:'column',alignItems:'center',gap:8,padding:'30px 16px',borderRadius:16,background:cardBg,border:'1.5px dashed rgba(255,106,85,0.45)',color:'#FF8A73',marginBottom:14,cursor:'pointer'}}>
              <span style={{fontSize:30}}>🪪</span>
              <span style={{fontSize:13,fontWeight:700}}>Upload a picture of your ID</span>
              <span style={{fontSize:11,color:'rgba(255,255,255,0.5)'}}>National ID, passport or residence card</span>
            </button>
          )}
          <div style={{display:'flex',gap:10,alignItems:'flex-start',background:'rgba(126,216,211,0.07)',border:'1px solid rgba(126,216,211,0.18)',borderRadius:14,padding:'12px 14px',marginBottom:10}}>
            <Shield size={15} strokeWidth={2} style={{color:'#7ED8D3',flexShrink:0,marginTop:1}}/>
            <p style={{fontSize:11.5,color:'rgba(255,255,255,0.65)',lineHeight:1.6}}>Verified members get a <strong style={{color:'#7ED8D3'}}>✓ badge</strong> beside their picture that neighbors can see. Your ID is only used for verification and never shown to anyone.</p>
          </div>
          {!form.idPhoto&&<p style={{fontSize:11,color:'rgba(255,255,255,0.45)',lineHeight:1.6}}>Skipping? Your account will still be created — just without the verified badge until you upload your ID from your Profile.</p>}
        </div>}
       </div>
      </div>
      <div style={{padding:'16px 22px 36px',background:'rgba(10,53,64,0.78)',backdropFilter:'blur(14px)',WebkitBackdropFilter:'blur(14px)',borderTop:'1px solid rgba(126,216,211,0.18)',maxWidth:480,width:'100%',margin:'0 auto',position:'relative',zIndex:1}}>
        <button onClick={next} disabled={!canGo||busy} className={canGo?'btn-gold':''} style={{width:'100%',padding:'16px',borderRadius:12,fontSize:15,fontWeight:600,background:canGo?undefined:'rgba(10,53,64,0.7)',color:canGo?undefined:'rgba(255,138,115,0.75)',border:canGo?'none':'1px solid rgba(255,106,85,0.35)',boxShadow:canGo?'0 8px 32px rgba(255,106,85,0.35)':undefined,transition:'all .2s',cursor:canGo?'pointer':'not-allowed',opacity:busy?.7:1}}>
          {busy?'Setting up…':step<4?'Continue →':form.idPhoto?'🎉 Join Karro':'Skip & Join Unverified'}
        </button>
        {step===1&&<p style={{textAlign:'center',marginTop:14,fontSize:13,color:'rgba(255,255,255,0.7)'}}>Already a member?{' '}<button onClick={onBack} style={{background:'transparent',border:'none',color:'#7ED8D3',fontWeight:700,fontSize:13,cursor:'pointer',whiteSpace:'nowrap'}}>Sign In</button></p>}
      </div>
    </div>
  );
};


Object.assign(window, { LandingPage, SignInPage, RegisterPage, useTypewriter });
