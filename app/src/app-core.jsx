import React from 'react';
import { CSS } from './data.js';
import { BottomNav } from './shared.jsx';
import { HomePage } from './pages-home.jsx';
import { BrowsePage, CategoryPage } from './pages-market.jsx';
import { AuctionsPage } from './pages-auctions.jsx';
import { SellersPage } from './pages-sellers.jsx';
import { ProfilePage } from './pages-profile.jsx';
import { SettingsPage } from './pages-settings.jsx';
import { ItemDetailPage } from './page-item.jsx';
import { SellSheet } from './page-sell.jsx';
/* MarketplaceApp tabs shell — with nav history (back-stack) */
const { useState, useEffect } = React;

const MarketplaceApp = ({onSignOut, initialTab='home', initialIsSeller=false, initialActiveCat=null, initialSellerTab='live', initialSellerActive=null, initialOnboarding=false, username=''}) => {
  const [nav, setNav]   = useState({tab: initialTab, cat: initialActiveCat, item: null});
  const [hist, setHist] = useState([]);
  const [isSeller, setIsSeller] = useState(initialIsSeller);
  const [sellerFocus, setSellerFocus] = useState(null);
  const [showSell, setShowSell] = useState(false);
  const [settingsTab, setSettingsTab] = useState(initialSellerTab);
  const [theme, setThemeState] = useState(()=>{try{return localStorage.getItem('gt_theme')||'Light';}catch(e){return 'Light';}});
  const setTheme = (t)=>{ setThemeState(t); try{localStorage.setItem('gt_theme',t);}catch(e){} };
  const themeAttr = theme==='Dark'?'dark':'light';
  const {tab, cat: activeCat, item: activeItem} = nav;

  // push current state onto the stack, then apply the change
  const push = (next) => { setHist(h=>[...h, nav]); setNav({...nav, ...next}); };
  // tab-bar switches reset the stack
  const switchTab = (t) => { setHist([]); setSellerFocus(null); setNav({tab:t, cat:null, item:null}); };
  // back pops the stack; falls back to peeling item → cat → tab root
  const goBack = () => {
    if(hist.length){ const prev = hist[hist.length-1]; setHist(h=>h.slice(0,-1)); setNav(prev); }
    else if(nav.item) setNav({...nav, item:null});
    else setNav({...nav, cat:null});
  };

  const handleNav = (t) => { if(t==='sell'){ setShowSell(true); return; } switchTab(t); };
  const handleCatSelect = (cat) => push({cat});
  const openItem = (it) => push({item: it});
  const openSeller = (sid) => { setSellerFocus(sid); switchTab('sellers'); };

  const sellSheet = showSell && <SellSheet onClose={()=>setShowSell(false)} onPosted={()=>switchTab('browse')}/>;

  // If an item is open, show ItemDetailPage over everything
  if(activeItem) return (
    <div className="fs" data-theme={themeAttr} style={{height:'100%',display:'flex',flexDirection:'column',background:'var(--bg)'}}>
      <style>{CSS}</style>
      <div style={{flex:1,display:'flex',flexDirection:'column',maxWidth:440,margin:'0 auto',width:'100%',overflow:'hidden',animation:'slideIn .25s ease-out'}}>
        <ItemDetailPage key={activeItem.id} item={activeItem} onBack={goBack} onItemSelect={openItem} onSellerOpen={openSeller}/>
      </div>
      {sellSheet}
    </div>
  );

  // If a category is active, show CategoryPage over current tab
  if(activeCat) return (
    <div className="fs" data-theme={themeAttr} style={{height:'100%',display:'flex',flexDirection:'column',background:'var(--bg)'}}>
      <style>{CSS}</style>
      <div style={{flex:1,display:'flex',flexDirection:'column',maxWidth:440,margin:'0 auto',width:'100%',overflow:'hidden',animation:'slideIn .25s ease-out'}}>
        <CategoryPage cat={activeCat} onBack={goBack} onItemSelect={openItem}/>
        <BottomNav active="browse" onChange={handleNav}/>
      </div>
      {sellSheet}
    </div>
  );

  return (
    <div className="fs" data-theme={themeAttr} style={{height:'100%',display:'flex',flexDirection:'column',background:'var(--bg)',animation:'fadeIn .4s ease-out'}}>
      <style>{CSS}</style>
      <div style={{flex:1,display:'flex',flexDirection:'column',maxWidth:440,margin:'0 auto',width:'100%',overflow:'hidden'}}>
        <div key={tab} style={{flex:1,minHeight:0,display:'flex',flexDirection:'column',overflow:'hidden',animation:'pageIn .35s cubic-bezier(0.22,1,0.36,1)'}}>
          {tab==='home'    &&<HomePage    isSeller={isSeller} onNav={switchTab} onCatSelect={handleCatSelect} onSellerOpen={openSeller} username={username}/>}
          {tab==='browse'  &&<BrowsePage  onCatSelect={handleCatSelect} onItemSelect={openItem} onSellersOpen={()=>openSeller(null)}/>}
          {tab==='auctions'&&<AuctionsPage/>}
          {tab==='sellers' &&<SellersPage initialActive={sellerFocus||initialSellerActive}/>}
          {tab==='profile' &&<ProfilePage onNav={switchTab} onItemSelect={openItem} onSignOut={onSignOut} theme={theme} setTheme={setTheme} onOpenStall={(t)=>{setSettingsTab(t||'live');setIsSeller(true);switchTab('settings');}} username={username}/>}
          {tab==='settings'&&<SettingsPage key={settingsTab} isSeller={isSeller} setIsSeller={setIsSeller} onSignOut={onSignOut} onBack={()=>switchTab('profile')} initialSellerTab={settingsTab} initialOnboarding={initialOnboarding}/>}
        </div>
        <BottomNav active={tab==='settings'?'profile':tab} onChange={handleNav}/>
      </div>
      {sellSheet}
    </div>
  );
};


export { MarketplaceApp };
