/* All-screens overview — each artboard hosts an iOS device with a deep-linked screen */
const { useState } = React;

// Stage wrapper: iOS device + brand-background interior + transform parent
// so position:fixed children stay inside.
const DeviceWrap = ({children, lightBg=false}) => (
  <IOSDevice width={402} height={874} dark={!lightBg}>
    <div className="sh" style={{
      height: '100%', width: '100%',
      position: 'relative', transform: 'translateZ(0)',
      overflow: 'auto',
      background: lightBg ? '#FFFFFF' : 'linear-gradient(180deg,#0A3540 0%,#3A5A61 50%,#4A6B72 100%)',
    }}>
      {children}
    </div>
  </IOSDevice>
);

// Convenience: prefilled register form for showing steps 2/3 populated
const FORM_AFTER_1 = {
  name: 'Jane Smith', email: 'jane@email.com', username: 'jane_smith',
  password: 'secret123', unit: '', floor: '', residentType: '', interests: new Set(),
};
const FORM_AFTER_2 = { ...FORM_AFTER_1, unit: '4B', floor: '3', residentType: 'owner' };
const FORM_AFTER_3 = { ...FORM_AFTER_2, interests: new Set(['farm','electronics','home','art','jewelry']) };

const FARM_CAT = { id:'farm', name:'Farm Fresh', emoji:'🌾', c:'#0D7E7A', bg:'#BFE7E4', members:24 };

const noop = () => {};

function ScreensOverview() {
  return (
    <DesignCanvas>

      {/* ════════════ AUTH & ONBOARDING ════════════ */}
      <DCSection id="auth" title="Auth & Onboarding" subtitle="Landing → Sign in → 3-step register → welcome">

        <DCArtboard id="landing" label="01 · Landing" width={402} height={874}>
          <DeviceWrap>
            <LandingPage onSignIn={noop} onRegister={noop}/>
          </DeviceWrap>
        </DCArtboard>

        <DCArtboard id="signin" label="02 · Sign In" width={402} height={874}>
          <DeviceWrap>
            <SignInPage onBack={noop} onSuccess={noop} onRegister={noop}/>
          </DeviceWrap>
        </DCArtboard>

        <DCArtboard id="register-1" label="03 · Register — Account" width={402} height={874}>
          <DeviceWrap>
            <RegisterPage onBack={noop} onSuccess={noop} initialStep={1} initialForm={FORM_AFTER_1}/>
          </DeviceWrap>
        </DCArtboard>

        <DCArtboard id="register-2" label="04 · Register — Home" width={402} height={874}>
          <DeviceWrap>
            <RegisterPage onBack={noop} onSuccess={noop} initialStep={2} initialForm={FORM_AFTER_2}/>
          </DeviceWrap>
        </DCArtboard>

        <DCArtboard id="register-3" label="05 · Register — Interests" width={402} height={874}>
          <DeviceWrap>
            <RegisterPage onBack={noop} onSuccess={noop} initialStep={3} initialForm={FORM_AFTER_3}/>
          </DeviceWrap>
        </DCArtboard>

        <DCArtboard id="register-done" label="06 · Welcome 🎉" width={402} height={874}>
          <DeviceWrap>
            <RegisterPage onBack={noop} onSuccess={noop} initialDone={true} initialForm={FORM_AFTER_3}/>
          </DeviceWrap>
        </DCArtboard>

      </DCSection>

      {/* ════════════ APP SHELL ════════════ */}
      <DCSection id="app" title="App Shell" subtitle="Five tabs · home, market, sell, auctions, profile">

        <DCArtboard id="home-member" label="07 · Home — Member" width={402} height={874}>
          <DeviceWrap lightBg>
            <MarketplaceApp initialTab="home" initialIsSeller={false} onSignOut={noop}/>
          </DeviceWrap>
        </DCArtboard>

        <DCArtboard id="home-seller" label="08 · Home — Seller" width={402} height={874}>
          <DeviceWrap lightBg>
            <MarketplaceApp initialTab="home" initialIsSeller={true} onSignOut={noop}/>
          </DeviceWrap>
        </DCArtboard>

        <DCArtboard id="market" label="09 · Market — Browse" width={402} height={874}>
          <DeviceWrap lightBg>
            <MarketplaceApp initialTab="browse" onSignOut={noop}/>
          </DeviceWrap>
        </DCArtboard>

        <DCArtboard id="category" label="10 · Category — Farm Fresh" width={402} height={874}>
          <DeviceWrap lightBg>
            <MarketplaceApp initialTab="browse" initialActiveCat={FARM_CAT} onSignOut={noop}/>
          </DeviceWrap>
        </DCArtboard>

        <DCArtboard id="sell" label="11 · Sell — New Listing" width={402} height={874}>
          <DeviceWrap lightBg>
            <MarketplaceApp initialTab="home" onSignOut={noop}/>
            <SellSheet onClose={noop}/>
          </DeviceWrap>
        </DCArtboard>

        <DCArtboard id="auctions" label="12 · Auctions — Live" width={402} height={874}>
          <DeviceWrap>
            <MarketplaceApp initialTab="auctions" onSignOut={noop}/>
          </DeviceWrap>
        </DCArtboard>

        <DCArtboard id="profile" label="13 · Profile" width={402} height={874}>
          <DeviceWrap lightBg>
            <MarketplaceApp initialTab="profile" onSignOut={noop}/>
          </DeviceWrap>
        </DCArtboard>

        <DCArtboard id="sellers" label="14 · Sellers — Directory" width={402} height={874}>
          <DeviceWrap lightBg>
            <MarketplaceApp initialTab="sellers" onSignOut={noop}/>
          </DeviceWrap>
        </DCArtboard>

        <DCArtboard id="seller-profile" label="15 · Seller Profile — Michael R." width={402} height={874}>
          <DeviceWrap lightBg>
            <MarketplaceApp initialTab="sellers" initialSellerActive="s1" onSignOut={noop}/>
          </DeviceWrap>
        </DCArtboard>

      </DCSection>

      {/* ════════════ SETTINGS & SELLER DASHBOARD ════════════ */}
      <DCSection id="settings" title="Settings & Stall Dashboard" subtitle="Settings + live / sold / reviews stall views">

        <DCArtboard id="settings-member" label="16 · Settings" width={402} height={874}>
          <DeviceWrap lightBg>
            <MarketplaceApp initialTab="settings" initialIsSeller={false} onSignOut={noop}/>
          </DeviceWrap>
        </DCArtboard>

        <DCArtboard id="dash-live" label="17 · Stall — Live" width={402} height={874}>
          <DeviceWrap lightBg>
            <MarketplaceApp initialTab="settings" initialIsSeller={true} initialSellerTab="live" onSignOut={noop}/>
          </DeviceWrap>
        </DCArtboard>

        <DCArtboard id="dash-sold" label="18 · Stall — Sold" width={402} height={874}>
          <DeviceWrap lightBg>
            <MarketplaceApp initialTab="settings" initialIsSeller={true} initialSellerTab="sold" onSignOut={noop}/>
          </DeviceWrap>
        </DCArtboard>

        <DCArtboard id="dash-reviews" label="19 · Stall — Reviews" width={402} height={874}>
          <DeviceWrap lightBg>
            <MarketplaceApp initialTab="settings" initialIsSeller={true} initialSellerTab="reviews" onSignOut={noop}/>
          </DeviceWrap>
        </DCArtboard>

      </DCSection>

    </DesignCanvas>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<ScreensOverview />);
