/* Karro data + CSS. Exported to window. */

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Baloo+Bhaijaan+2:wght@400;500;600;700;800&family=Rubik:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&display=swap');
*{box-sizing:border-box;margin:0;padding:0;}
.ff{font-family:'Baloo Bhaijaan 2',sans-serif;}
.fs{font-family:'Rubik',system-ui,sans-serif;color:var(--ink);
  --bg:#F6FBFA;--card:#FFFFFF;--card2:#E9F6F5;--ink:#0A3540;--ink2:#4A6B72;--ink3:#E8513C;--ink-dim:rgba(10,53,64,0.4);--nav-bg:rgba(255,255,255,0.97);}
.fs[data-theme="dark"]{--bg:#07262E;--card:#0E3D47;--card2:#0A313B;--ink:#E9F6F5;--ink2:#9BBFC4;--ink3:#FF8A73;--ink-dim:rgba(233,246,245,0.42);--nav-bg:rgba(7,38,46,0.97);}
.fs[data-theme="dark"] .item-ph{filter:saturate(0.72) brightness(0.85);}
.sh::-webkit-scrollbar{display:none;}.sh{-ms-overflow-style:none;scrollbar-width:none;}
@keyframes fadeUp  {from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)}}
@keyframes fadeIn  {from{opacity:0}to{opacity:1}}
@keyframes slideIn {from{opacity:0;transform:translateX(28px)}to{opacity:1;transform:translateX(0)}}
@keyframes slideUp {from{transform:translateY(100%)}to{transform:translateY(0)}}
@keyframes scaleIn {from{opacity:0;transform:scale(0.88)}to{opacity:1;transform:scale(1)}}
@keyframes orb1{0%,100%{transform:translate(0,0) scale(1)}40%{transform:translate(50px,-40px) scale(1.1)}70%{transform:translate(-30px,25px) scale(0.95)}}
@keyframes orb2{0%,100%{transform:translate(0,0)}50%{transform:translate(-60px,50px)}}
@keyframes orb3{0%,100%{transform:translate(0,0) scale(1)}35%{transform:translate(40px,50px) scale(1.05)}75%{transform:translate(-40px,-30px) scale(0.92)}}
@keyframes float    {0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
@keyframes floatSlow{0%,100%{transform:translateY(0) rotate(0deg)}50%{transform:translateY(-14px) rotate(4deg)}}
@keyframes twinkle  {0%,100%{opacity:0.15;transform:scale(1)}50%{opacity:0.9;transform:scale(1.4)}}
@keyframes spin     {to{transform:rotate(360deg)}}
@keyframes pulse    {0%,100%{box-shadow:0 0 0 0 rgba(20,160,155,0.35)}50%{box-shadow:0 0 0 12px rgba(20,160,155,0)}}
@keyframes shimmer  {0%{background-position:-300% center}100%{background-position:300% center}}
@keyframes livePulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:0.5;transform:scale(0.75)}}
@keyframes bidFlash {0%{background:rgba(20,160,155,0.2);transform:scale(1.03)}100%{background:transparent;transform:scale(1)}}
@keyframes urgentTick{0%,100%{color:#E8513C}50%{color:#FF6A55}}
@keyframes starPop  {0%{transform:scale(0) rotate(-30deg)}70%{transform:scale(1.3) rotate(5deg)}100%{transform:scale(1) rotate(0)}}
@keyframes cpop     {0%{transform:translate(0,0) scale(0) rotate(0deg);opacity:1}25%{opacity:1}100%{transform:translate(var(--cx),var(--cy)) scale(1) rotate(var(--cr));opacity:0}}
@keyframes blink    {0%,100%{opacity:1}50%{opacity:0}}
@keyframes pageIn   {from{opacity:0;transform:translateY(14px) scale(0.985)}to{opacity:1;transform:translateY(0) scale(1)}}
@keyframes marqueeR {0%{transform:translateX(-50%)}100%{transform:translateX(0)}}
.marquee-track{display:flex;gap:8px;width:max-content;animation:marqueeR 28s linear infinite;}
.marquee-track.rev{animation-direction:reverse;}
.marquee-track:hover{animation-play-state:paused;}
.glass{background:rgba(255,255,255,0.42) !important;backdrop-filter:blur(16px) saturate(1.4);-webkit-backdrop-filter:blur(16px) saturate(1.4);border:1px solid rgba(255,255,255,0.55);box-shadow:0 8px 24px rgba(10,53,64,0.10), inset 0 1px 0 rgba(255,255,255,0.6);}
.glass-dark{background:rgba(10,53,64,0.82) !important;backdrop-filter:blur(16px) saturate(1.3);-webkit-backdrop-filter:blur(16px) saturate(1.3);border:1px solid rgba(255,255,255,0.18);box-shadow:0 8px 24px rgba(10,53,64,0.25), inset 0 1px 0 rgba(255,255,255,0.15);}
.fs[data-theme="dark"] .glass{background:rgba(14,75,84,0.45) !important;border-color:rgba(255,255,255,0.14);}
@keyframes tabPop   {0%{transform:scale(0.7)}55%{transform:scale(1.28)}100%{transform:scale(1)}}
@keyframes popIn    {0%{opacity:0;transform:scaleX(0)}100%{opacity:1;transform:scaleX(1)}}
@keyframes wave     {0%,60%,100%{transform:rotate(0deg)}10%,30%{transform:rotate(18deg)}20%,40%{transform:rotate(-9deg)}}
@keyframes avatarIn {0%{opacity:0;transform:scale(0.4) rotate(-12deg)}70%{transform:scale(1.12) rotate(3deg)}100%{opacity:1;transform:scale(1) rotate(0)}}
@keyframes ripple   {0%{transform:scale(0);opacity:0.55}100%{transform:scale(2.8);opacity:0}}
@keyframes sellPulse{0%,100%{box-shadow:0 6px 18px rgba(255,106,85,0.45), 0 0 0 4px var(--bg), 0 0 0 4px rgba(255,106,85,0)}50%{box-shadow:0 8px 22px rgba(255,106,85,0.6), 0 0 0 4px var(--bg), 0 0 0 10px rgba(255,106,85,0.14)}}
.su{animation:slideUp .38s cubic-bezier(0.22,1,0.36,1) both;}
button{transition:transform .18s cubic-bezier(0.34,1.56,0.64,1),box-shadow .2s,filter .2s;}
button:active{transform:scale(0.96);}
.cp:hover,.card-press:hover{transform:translateY(-2px);}


.btn-gold{background:linear-gradient(135deg,#FF8A73,#FF6A55);color:#FFFFFF !important;font-weight:700 !important;border:none !important;letter-spacing:0.02em;box-shadow:0 2px 8px rgba(255,106,85,0.16);}
.btn-emerald{background:linear-gradient(135deg,#14A09B,#0D7E7A);color:#FFFFFF !important;font-weight:700 !important;border:none !important;letter-spacing:0.02em;box-shadow:0 2px 8px rgba(20,160,155,0.16);}
.btn-em{background:linear-gradient(135deg,#14A09B,#0D7E7A);color:#FFFFFF !important;font-weight:700 !important;border:none !important;letter-spacing:0.02em;box-shadow:0 2px 8px rgba(20,160,155,0.16);}
.tg{color:#E8513C;}
.cp{transition:transform .15s cubic-bezier(0.34,1.56,0.64,1);}.cp:active{transform:scale(0.94)!important;}
.text-gold{color:#E8513C;}
.card-press{transition:transform 0.15s cubic-bezier(0.34,1.56,0.64,1);}
.card-press:active{transform:scale(0.94)!important;}
.inp-wrap{transition:border-color .2s,box-shadow .2s;}
.inp-wrap:focus-within{border-color:rgba(20,160,155,0.6)!important;box-shadow:0 0 0 3px rgba(20,160,155,0.12)!important;}
.inp-light:focus-within{border-color:rgba(20,160,155,0.6)!important;box-shadow:0 0 0 3px rgba(20,160,155,0.12)!important;}
.iw{transition:border-color .2s,box-shadow .2s;}
.iw:focus-within{border-color:rgba(20,160,155,0.6)!important;box-shadow:0 0 0 3px rgba(20,160,155,0.12)!important;}
.iwl{transition:border-color .2s,box-shadow .2s;}
.iwl:focus-within{border-color:rgba(20,160,155,0.6)!important;box-shadow:0 0 0 3px rgba(20,160,155,0.12)!important;}
.s1{animation-delay:0s}.s2{animation-delay:.07s}.s3{animation-delay:.14s}.s4{animation-delay:.21s}.s5{animation-delay:.28s}.s6{animation-delay:.35s}.s7{animation-delay:.42s}.s8{animation-delay:.49s}.s9{animation-delay:.56s}

.btn-teal{background:#14A09B;color:#FFFFFF !important;font-weight:700 !important;border:none !important;letter-spacing:0.02em;box-shadow:0 2px 8px rgba(20,160,155,0.14);}
.btn-ghost-gold{background:rgba(255,106,85,0.07);border:1.5px solid rgba(255,106,85,0.4) !important;color:#E8513C !important;font-weight:700 !important;letter-spacing:0.02em;transition:all .2s;}
.btn-ghost-gold:active{background:rgba(255,106,85,0.16) !important;}
.btn-ghost-em{background:rgba(20,160,155,0.08);border:1.5px solid rgba(20,160,155,0.4) !important;color:#14A09B !important;font-weight:700 !important;letter-spacing:0.02em;transition:all .2s;}
.btn-ghost-em:active{background:rgba(20,160,155,0.18) !important;}
.btn-icon-teal{background:rgba(20,160,155,0.12);border:1px solid rgba(20,160,155,0.25) !important;color:#14A09B !important;transition:all .2s;}
.btn-icon-teal:active{background:rgba(20,160,155,0.25) !important;}
.btn-icon-gold{background:rgba(255,106,85,0.12);border:1px solid rgba(255,106,85,0.3) !important;color:#E8513C !important;transition:all .2s;}
.btn-icon-gold:active{background:rgba(255,106,85,0.25) !important;}
.tab-pill-active{background:#0D7E7A;color:#FFFFFF !important;font-weight:700;border:none !important;box-shadow:0 2px 8px rgba(13,126,122,0.25);}
.tab-pill-idle{background:rgba(20,160,155,0.07);color:#14A09B !important;font-weight:600;border:1px solid rgba(20,160,155,0.16) !important;}
.cursor::after{content:'|';animation:blink .9s step-start infinite;color:#FF6A55;}
input:focus{outline:none;}input::placeholder{color:rgba(255,255,255,0.3);}
.lp::placeholder{color:rgba(10,53,64,0.28)!important;}
button{cursor:pointer;font-family:'Rubik',system-ui,sans-serif;}
`;

/* ─── CATS (Events + Services removed) ─────────────── */
const CATS = [
  {id:'electronics',name:'Electronics',  emoji:'📱',c:'#0D7E7A',bg:'#BFE7E4',members:31,img:'https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=400&h=400&fit=crop&auto=format&q=80'},
  {id:'clothing',   name:'Clothing',     emoji:'👕',c:'#0D7E7A',bg:'#BFE7E4',members:19,img:'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=400&h=400&fit=crop&auto=format&q=80'},
  {id:'appliances', name:'Appliances',   emoji:'⚡',c:'#0D7E7A',bg:'#BFE7E4',members:22,img:'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=400&h=400&fit=crop&auto=format&q=80'},
  {id:'vehicles',   name:'Vehicles',     emoji:'🚗',c:'#0D7E7A',bg:'#BFE7E4',members:12,img:'https://images.unsplash.com/photo-1502877338535-766e1452684a?w=400&h=400&fit=crop&auto=format&q=80'},
  {id:'games',      name:'Games & Toys', emoji:'🎮',c:'#0D7E7A',bg:'#BFE7E4',members:28,img:'https://images.unsplash.com/photo-1580327344181-c1163234e5a0?w=400&h=400&fit=crop&auto=format&q=80'},
  {id:'home',       name:'Home & Garden',emoji:'🛋️',c:'#0D7E7A',bg:'#BFE7E4',members:35,img:'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=400&fit=crop&auto=format&q=80'},
  {id:'sports',     name:'Sports',       emoji:'⚽',c:'#0D7E7A',bg:'#BFE7E4',members:18},
  {id:'books',      name:'Books & Media',emoji:'📚',c:'#0D7E7A',bg:'#BFE7E4',members:27},
  {id:'beauty',     name:'Beauty & Care',emoji:'💄',c:'#E8513C',bg:'#F3E9D7',members:21},
  {id:'pets',       name:'Pets',         emoji:'🐾',c:'#E8513C',bg:'#F3E9D7',members:14},
  {id:'art',        name:'Art & Crafts', emoji:'🎨',c:'#E8513C',bg:'#F3E9D7',members:23},
  {id:'music',      name:'Music',        emoji:'🎵',c:'#E8513C',bg:'#F3E9D7',members:11},
  {id:'jewelry',    name:'Jewelry',      emoji:'💍',c:'#E8513C',bg:'#F3E9D7',members:9 },
  {id:'kids',       name:'Kids',         emoji:'🧸',c:'#E8513C',bg:'#F3E9D7',members:17},
  {id:'tools',      name:'Tools & DIY',  emoji:'🔨',c:'#E8513C',bg:'#F3E9D7',members:13},
  {id:'other',      name:'Other',        emoji:'📦',c:'#E8513C',bg:'#F3E9D7',members:8 },
];

/* ─── AUCTIONS ──────────────────────────────────────── */
// Seed/demo data removed — the marketplace now runs on real content only.
const AUCTION_BASE = [];

/* ─── SELLERS ────────────────────────────────────────── */
// Seed/demo data removed — the marketplace now runs on real content only.
const SELLERS = [];

// Seed/demo data removed — the marketplace now runs on real content only.
const TESTIMONIALS = {};

const SWATCHES = [{c:'#0A3540',l:'Deep Water'},{c:'#0D7E7A',l:'Lagoon Dark'},{c:'#14A09B',l:'Lagoon'},{c:'#7ED8D3',l:'Shallow'},{c:'#FF6A55',l:'Coral'},{c:'#FF8A73',l:'Coral Light'},{c:'#F3E9D7',l:'Sun Sand'},{c:'#E9F6F5',l:'Sea Foam'}];
const RESIDENT_TYPES = [{id:'owner',label:'Owner',emoji:'🏠'},{id:'resident',label:'Resident',emoji:'🏢'}];

/* ─── SELLER LISTINGS (mock data) ───────────────────── */
// Seed/demo data removed — the marketplace now runs on real content only.
const MY_LISTINGS = [];


// Seed/demo data removed — the marketplace now runs on real content only.
const LISTINGS = [];


export { CSS, CATS, AUCTION_BASE, SELLERS, TESTIMONIALS, SWATCHES, RESIDENT_TYPES, MY_LISTINGS, LISTINGS };
