import React from 'react';
import { X, Check } from './icons.jsx';
import { api, setToken } from './api.js';
/* Trust & safety UI — report listing, block user, delete account, terms gate.
   Copy here is deliberately plain and serious (no marketplace playfulness). */
const { useState } = React;

const SHEET_BACKDROP = {position:'fixed',inset:0,zIndex:70,display:'flex',alignItems:'flex-end',justifyContent:'center',background:'rgba(10,53,64,0.6)',backdropFilter:'blur(4px)',animation:'fadeIn .25s ease-out'};
const SHEET_BODY = {width:'100%',maxWidth:440,background:'var(--bg)',borderRadius:'26px 26px 0 0',padding:'10px 22px 40px',maxHeight:'85vh',overflowY:'auto'};
const Grabber = () => <div style={{width:40,height:4,borderRadius:100,background:'rgba(20,160,155,0.2)',margin:'0 auto 16px'}}></div>;

const REPORT_REASONS = [
  ['prohibited', 'Prohibited or illegal item'],
  ['scam',       'Scam or misleading listing'],
  ['offensive',  'Offensive or inappropriate content'],
  ['counterfeit','Counterfeit or stolen goods'],
  ['spam',       'Spam or wrong category'],
  ['other',      'Something else'],
];

/* ── Report a listing ─────────────────────────────────────── */
const ReportSheet = ({item, onClose}) => {
  const [reason, setReason] = useState('');
  const [note, setNote]     = useState('');
  const [busy, setBusy]     = useState(false);
  const [done, setDone]     = useState(false);
  const [err, setErr]       = useState('');

  const submit = async () => {
    setErr(''); setBusy(true);
    try {
      const label = REPORT_REASONS.find(([id])=>id===reason)?.[1] || reason;
      await api.reportListing(item.id, note ? `${label} — ${note}` : label);
      setDone(true);
      setTimeout(onClose, 2200);
    } catch(e) {
      setErr(e.message || 'Could not send the report. Please try again.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div style={SHEET_BACKDROP} onClick={()=>{if(!busy)onClose();}}>
      <div className="su" style={SHEET_BODY} onClick={e=>e.stopPropagation()}>
        <Grabber/>
        {done?(
          <div style={{textAlign:'center',padding:'20px 0 8px'}}>
            <div style={{width:64,height:64,borderRadius:20,background:'rgba(20,160,155,0.1)',border:'1px solid rgba(20,160,155,0.25)',display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 14px'}}>
              <Check size={28} strokeWidth={2.2} style={{color:'#14A09B'}}/>
            </div>
            <h3 style={{fontFamily:"'Baloo Bhaijaan 2',sans-serif",fontSize:20,fontWeight:700,color:'var(--ink)',marginBottom:8}}>Report received</h3>
            <p style={{fontSize:13,color:'var(--ink2)',lineHeight:1.6,maxWidth:300,margin:'0 auto'}}>Our moderation team will review this listing within 24 hours. Repeated reports hide a listing automatically.</p>
          </div>
        ):(
          <>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:6}}>
              <h3 style={{fontFamily:"'Baloo Bhaijaan 2',sans-serif",fontSize:20,fontWeight:700,color:'var(--ink)'}}>Report this listing</h3>
              <button onClick={onClose} aria-label="Close" style={{width:34,height:34,borderRadius:10,background:'rgba(20,160,155,0.08)',border:'none',display:'flex',alignItems:'center',justifyContent:'center',color:'#14A09B'}}><X size={15}/></button>
            </div>
            <p style={{fontSize:13,color:'var(--ink2)',lineHeight:1.6,marginBottom:16}}>Reports are confidential. The seller will not see who reported them.</p>
            <div style={{display:'flex',flexDirection:'column',gap:8,marginBottom:14}}>
              {REPORT_REASONS.map(([id,label])=>(
                <button key={id} onClick={()=>setReason(id)} style={{display:'flex',alignItems:'center',gap:10,padding:'13px 15px',borderRadius:14,textAlign:'left',fontSize:13.5,fontWeight:600,background:reason===id?'rgba(20,160,155,0.12)':'var(--card)',border:`1.5px solid ${reason===id?'#14A09B':'rgba(20,160,155,0.12)'}`,color:'var(--ink)'}}>
                  <span style={{width:18,height:18,borderRadius:'50%',flexShrink:0,border:`2px solid ${reason===id?'#14A09B':'rgba(20,160,155,0.3)'}`,background:reason===id?'#14A09B':'transparent',display:'flex',alignItems:'center',justifyContent:'center'}}>
                    {reason===id&&<Check size={11} strokeWidth={3} style={{color:'#FFFFFF'}}/>}
                  </span>
                  {label}
                </button>
              ))}
            </div>
            <div style={{background:'var(--card)',border:'1px solid rgba(20,160,155,0.15)',borderRadius:14,padding:'12px 15px',marginBottom:14}}>
              <textarea value={note} onChange={e=>setNote(e.target.value)} rows={2} placeholder="Add details (optional)" style={{background:'transparent',border:'none',color:'var(--ink)',fontSize:13.5,width:'100%',fontFamily:"'Rubik',sans-serif",resize:'none'}}></textarea>
            </div>
            {err&&<p style={{fontSize:12.5,color:'#E8513C',fontWeight:600,marginBottom:10}}>{err}</p>}
            <button onClick={submit} disabled={!reason||busy} className="btn-em" style={{width:'100%',padding:'15px',borderRadius:100,fontSize:14,opacity:(!reason||busy)?0.5:1}}>{busy?'Sending…':'Submit report'}</button>
          </>
        )}
      </div>
    </div>
  );
};

/* ── Block a user ─────────────────────────────────────────── */
const BlockSheet = ({sellerName, sellerId, onClose, onBlocked}) => {
  const [busy, setBusy] = useState(false);
  const [err, setErr]   = useState('');

  const block = async () => {
    setErr(''); setBusy(true);
    try {
      await api.blockUser(sellerId);
      onBlocked && onBlocked();
      onClose();
    } catch(e) {
      setErr(e.message || 'Could not block this user. Please try again.');
      setBusy(false);
    }
  };

  return (
    <div style={SHEET_BACKDROP} onClick={()=>{if(!busy)onClose();}}>
      <div className="su" style={{...SHEET_BODY,paddingBottom:44}} onClick={e=>e.stopPropagation()}>
        <Grabber/>
        <h3 style={{fontFamily:"'Baloo Bhaijaan 2',sans-serif",fontSize:20,fontWeight:700,color:'var(--ink)',marginBottom:8}}>Block {sellerName}?</h3>
        <p style={{fontSize:13.5,color:'var(--ink2)',lineHeight:1.65,marginBottom:18}}>
          You will no longer see their listings, and they will not be able to message you or make offers on your items. They will not be notified. You can review blocked members with our support team at any time.
        </p>
        {err&&<p style={{fontSize:12.5,color:'#E8513C',fontWeight:600,marginBottom:10}}>{err}</p>}
        <button onClick={block} disabled={busy} style={{width:'100%',padding:'15px',borderRadius:100,fontSize:14,fontWeight:700,background:'#E8513C',color:'#FFFFFF',border:'none',opacity:busy?0.6:1,marginBottom:10}}>{busy?'Blocking…':`Block ${sellerName}`}</button>
        <button onClick={onClose} disabled={busy} style={{width:'100%',padding:'14px',borderRadius:100,fontSize:14,fontWeight:700,background:'transparent',color:'var(--ink2)',border:'1.5px solid rgba(20,160,155,0.2)'}}>Cancel</button>
      </div>
    </div>
  );
};

/* ── Delete account (two-step confirm) ────────────────────── */
const DeleteAccountSheet = ({onClose, onDeleted}) => {
  const [step, setStep]     = useState(1);
  const [confirm, setConfirm] = useState('');
  const [busy, setBusy]     = useState(false);
  const [err, setErr]       = useState('');

  const doDelete = async () => {
    setErr(''); setBusy(true);
    try {
      await api.deleteAccount();
      setToken('');
      onDeleted();
    } catch(e) {
      setErr(e.message || 'Could not delete your account. Please try again or contact support.');
      setBusy(false);
    }
  };

  return (
    <div style={SHEET_BACKDROP} onClick={()=>{if(!busy)onClose();}}>
      <div className="su" style={{...SHEET_BODY,paddingBottom:44}} onClick={e=>e.stopPropagation()}>
        <Grabber/>
        {step===1?(
          <>
            <h3 style={{fontFamily:"'Baloo Bhaijaan 2',sans-serif",fontSize:20,fontWeight:700,color:'var(--ink)',marginBottom:8}}>Delete your account</h3>
            <p style={{fontSize:13.5,color:'var(--ink2)',lineHeight:1.65,marginBottom:12}}>Deleting your account is permanent. This will immediately and irreversibly remove:</p>
            <ul style={{fontSize:13.5,color:'var(--ink2)',lineHeight:1.9,marginBottom:16,paddingLeft:20}}>
              <li>Your profile and verification status</li>
              <li>All of your listings and photos</li>
              <li>Your messages, offers and bids</li>
              <li>Your saved items and purchase history</li>
            </ul>
            <p style={{fontSize:13.5,color:'var(--ink)',fontWeight:600,lineHeight:1.6,marginBottom:18}}>This cannot be undone.</p>
            <button onClick={()=>setStep(2)} style={{width:'100%',padding:'15px',borderRadius:100,fontSize:14,fontWeight:700,background:'rgba(232,81,60,0.1)',color:'#E8513C',border:'1.5px solid rgba(232,81,60,0.3)',marginBottom:10}}>Continue to delete</button>
            <button onClick={onClose} style={{width:'100%',padding:'14px',borderRadius:100,fontSize:14,fontWeight:700,background:'transparent',color:'var(--ink2)',border:'1.5px solid rgba(20,160,155,0.2)'}}>Keep my account</button>
          </>
        ):(
          <>
            <h3 style={{fontFamily:"'Baloo Bhaijaan 2',sans-serif",fontSize:20,fontWeight:700,color:'var(--ink)',marginBottom:8}}>Confirm deletion</h3>
            <p style={{fontSize:13.5,color:'var(--ink2)',lineHeight:1.65,marginBottom:14}}>Type <strong style={{color:'#E8513C'}}>DELETE</strong> below to permanently delete your account.</p>
            <div style={{background:'var(--card)',border:'1.5px solid rgba(232,81,60,0.3)',borderRadius:14,padding:'13px 15px',marginBottom:14}}>
              <input type="text" value={confirm} onChange={e=>setConfirm(e.target.value)} placeholder="DELETE" autoCapitalize="characters" style={{background:'transparent',border:'none',color:'var(--ink)',fontSize:15,width:'100%',fontFamily:"'Rubik',sans-serif",fontWeight:700,letterSpacing:'0.1em'}}/>
            </div>
            {err&&<p style={{fontSize:12.5,color:'#E8513C',fontWeight:600,marginBottom:10}}>{err}</p>}
            <button onClick={doDelete} disabled={confirm!=='DELETE'||busy} style={{width:'100%',padding:'15px',borderRadius:100,fontSize:14,fontWeight:700,background:'#E8513C',color:'#FFFFFF',border:'none',opacity:(confirm!=='DELETE'||busy)?0.45:1,marginBottom:10}}>{busy?'Deleting…':'Permanently delete my account'}</button>
            <button onClick={onClose} disabled={busy} style={{width:'100%',padding:'14px',borderRadius:100,fontSize:14,fontWeight:700,background:'transparent',color:'var(--ink2)',border:'1.5px solid rgba(20,160,155,0.2)'}}>Cancel</button>
          </>
        )}
      </div>
    </div>
  );
};

/* ── Terms of use gate (first launch, Guideline 1.2) ──────── */
const TERMS_KEY = 'karro_terms_accepted_v1';
export const termsAccepted = () => { try { return localStorage.getItem(TERMS_KEY) === '1'; } catch { return false; } };

const TermsGate = ({onAccept}) => {
  const [agreed, setAgreed] = useState(false);
  const accept = () => {
    try { localStorage.setItem(TERMS_KEY, '1'); } catch { /* ignore */ }
    onAccept();
  };
  return (
    <div style={{position:'absolute',inset:0,zIndex:90,display:'flex',flexDirection:'column',background:'var(--bg, #F6FBFA)',animation:'fadeIn .3s ease-out'}} className="fs">
      <div style={{flex:1,overflowY:'auto',padding:'70px 24px 20px'}} className="sh">
        <h2 style={{fontFamily:"'Baloo Bhaijaan 2',sans-serif",fontSize:24,fontWeight:800,color:'#0A3540',marginBottom:6}}>Before you join Karro</h2>
        <p style={{fontSize:13.5,color:'#4A6B72',lineHeight:1.65,marginBottom:20}}>Karro is a community marketplace for El Gouna residents. To keep it safe for everyone, we ask every member to agree to a few ground rules.</p>
        {[
          ['🚫','Zero tolerance for abuse','Objectionable content, harassment and abusive behaviour are not allowed. Violations lead to removal within 24 hours and may result in a permanent ban.'],
          ['🛡️','Real people, real items','Only list items you own and can hand over in El Gouna. Prohibited, counterfeit or misrepresented items are removed.'],
          ['⚑','You are in control','You can report any listing and block any member. Blocked members cannot contact you. Our team reviews every report within 24 hours.'],
          ['🔒','Your data','We store only what the marketplace needs to run. You can permanently delete your account and all your data at any time from your profile.'],
        ].map(([icon,title,body])=>(
          <div key={title} style={{display:'flex',gap:12,marginBottom:16,background:'#FFFFFF',border:'1px solid rgba(20,160,155,0.12)',borderRadius:16,padding:'14px 16px'}}>
            <span style={{fontSize:20,flexShrink:0}}>{icon}</span>
            <div>
              <div style={{fontSize:13.5,fontWeight:700,color:'#0A3540',marginBottom:3}}>{title}</div>
              <div style={{fontSize:12.5,color:'#4A6B72',lineHeight:1.55}}>{body}</div>
            </div>
          </div>
        ))}
        <p style={{fontSize:12,color:'#4A6B72',lineHeight:1.6,marginTop:4}}>By continuing you accept Karro's Terms of Use and Privacy Policy. The full text is available any time under Profile → Rules &amp; Regulations.</p>
      </div>
      <div style={{padding:'14px 24px 40px',borderTop:'1px solid rgba(20,160,155,0.1)',background:'#FFFFFF'}}>
        <button onClick={()=>setAgreed(a=>!a)} style={{display:'flex',alignItems:'center',gap:10,background:'transparent',border:'none',textAlign:'left',marginBottom:14,padding:0}}>
          <span style={{width:22,height:22,borderRadius:7,flexShrink:0,border:`2px solid ${agreed?'#14A09B':'rgba(10,53,64,0.25)'}`,background:agreed?'#14A09B':'transparent',display:'flex',alignItems:'center',justifyContent:'center',transition:'all .15s'}}>
            {agreed&&<Check size={13} strokeWidth={3} style={{color:'#FFFFFF'}}/>}
          </span>
          <span style={{fontSize:13,color:'#0A3540',fontWeight:600,lineHeight:1.4}}>I have read and agree to the Terms of Use and Privacy Policy</span>
        </button>
        <button onClick={accept} disabled={!agreed} className="btn-em" style={{width:'100%',padding:'16px',borderRadius:100,fontSize:15,opacity:agreed?1:0.45}}>Agree and continue</button>
      </div>
    </div>
  );
};

export { ReportSheet, BlockSheet, DeleteAccountSheet, TermsGate };
