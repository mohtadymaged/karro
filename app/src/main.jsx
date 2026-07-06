/* App root — wires up pages inside an iOS device frame */
import React from 'react';
import ReactDOM from 'react-dom/client';
import { IOSDevice } from './ios-frame.jsx';
import { LandingPage, SignInPage, RegisterPage } from './auth.jsx';
import { MarketplaceApp } from './app-core.jsx';
import { setToken } from './api.js';
import { initPushNotifications } from './push-util.js';
import { TermsGate, termsAccepted } from './trust-safety.jsx';
import { isNative } from './native.js';

const { useState, useEffect } = React;

function GTribsRoot() {
  const [page, setPage] = useState('landing');
  const [username, setUsername] = useState('');
  const [terms, setTerms] = useState(termsAccepted);

  const enterApp = (u) => {
    if(u) setUsername(u);
    setPage('app');
    // Initialize push notifications when user enters the app
    initPushNotifications().catch(console.error);
  };

  // First launch: terms must be accepted before anything else (Guideline 1.2)
  if(!terms) return <TermsGate onAccept={()=>setTerms(true)}/>;

  return (
    <>
      {page==='landing'  && <LandingPage   onSignIn={()=>setPage('signin')}   onRegister={()=>setPage('register')}/>}
      {page==='signin'   && <SignInPage    onBack={()=>setPage('landing')}    onSuccess={enterApp} onRegister={()=>setPage('register')}/>}
      {page==='register' && <RegisterPage  onBack={()=>setPage('signin')}     onSuccess={enterApp}/>}
      {page==='app'      && <MarketplaceApp onSignOut={()=>{setToken('');setPage('landing');}} username={username}/>}
    </>
  );
}

function StagedApp() {
  // dark island/status when on landing/auth (dark bg), light when in marketplace (cream bg)
  // We don't know the route here; default dark looks fine on both since the device chrome dims.
  return (
    <div style={{
      minHeight: '100vh',
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px',
      boxSizing: 'border-box',
      background: 'linear-gradient(180deg, #04222B 0%, #082F38 50%, #0D4C55 100%)',
      fontFamily: '-apple-system, system-ui, sans-serif',
    }}>
      <IOSDevice width={402} height={874} dark={true}>
        {/* Transform wrapper makes position:fixed children stay inside the device */}
        <div style={{
          height: '100%',
          width: '100%',
          position: 'relative',
          transform: 'translateZ(0)',
          overflow: 'auto',
          containerType: 'size',
          background: 'linear-gradient(180deg,#0A3540 0%,#3A5A61 50%,#4A6B72 100%)',
        }} className="sh">
          <GTribsRoot />
        </div>
      </IOSDevice>
    </div>
  );
}

// Native (Capacitor): the phone IS the device — render full-screen, no fake frame.
function NativeApp() {
  return (
    <div style={{
      height: '100dvh',
      width: '100%',
      position: 'relative',
      overflow: 'auto',
      containerType: 'size',
      background: 'linear-gradient(180deg,#0A3540 0%,#3A5A61 50%,#4A6B72 100%)',
    }} className="sh">
      <GTribsRoot />
    </div>
  );
}

// Phone browsers and installed PWAs also get the full-screen app;
// the decorative device frame is desktop-only.
const isStandalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;
const isPhoneViewport = window.matchMedia('(max-width: 640px)').matches;
const fullScreen = isNative || isStandalone || isPhoneViewport;

ReactDOM.createRoot(document.getElementById('root')).render(fullScreen ? <NativeApp /> : <StagedApp />);

// PWA: register the service worker on the real web only (not inside Capacitor)
if (!isNative && 'serviceWorker' in navigator && window.location.protocol === 'https:') {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(() => {/* non-fatal */});
  });
}
