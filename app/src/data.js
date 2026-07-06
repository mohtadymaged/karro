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
  {id:'home',       name:'Home & Garden',emoji:'🛋️',c:'#0D7E7A',bg:'#BFE7E4',members:35,img:'https://images.unsplash.com/photo-1567538096631-e0c55bd6374c?w=400&h=400&fit=crop&auto=format&q=80'},
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
const AUCTION_BASE = [
  {id:'a1',status:'live',emoji:'⌚',img:'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=600&fit=crop&auto=format&q=80',bg:'#F3E9D7',title:'Vintage Rolex Submariner',sub:'1968 · Papers & Box · Excellent',cat:'Jewelry',seller:'Michael R.',sRating:4.9,sSales:47,startBid:2500,currentBid:4850,reserve:6000,bids:23,endH:2,endM:14,hot:true,desc:'Rare 1968 Rolex Submariner Date, original black dial, tritium indices, original bracelet. Full set with papers and original box. Condition 8.5/10.'},
  {id:'a2',status:'live',emoji:'🖼️',img:'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=600&h=600&fit=crop&auto=format&q=80',bg:'#F3E9D7',title:'Original Oil Painting',sub:'Harbor at Dawn · 36×48in · Signed',cat:'Art & Crafts',seller:'Sarah K.',sRating:4.8,sSales:32,startBid:800,currentBid:1250,reserve:1500,bids:11,endH:5,endM:42,desc:'Original oil on canvas by local artist. Cedar Creek harbor at sunrise. Framed. Certificate of authenticity included.'},
  {id:'a3',status:'live',emoji:'💻',img:'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&h=600&fit=crop&auto=format&q=80',bg:'#BFE7E4',title:'MacBook Pro M3 Max',sub:'16" · 36GB RAM · 1TB · Like New',cat:'Electronics',seller:'David L.',sRating:4.7,sSales:68,startBid:1800,currentBid:2200,reserve:2800,bids:8,endH:12,endM:30,desc:'Purchased 4 months ago, used lightly for travel. All accessories included. AppleCare+ transferable until 2026.'},
  {id:'a4',status:'live',emoji:'🪨',img:'https://images.unsplash.com/photo-1600166898405-da9535204843?w=600&h=600&fit=crop&auto=format&q=80',bg:'#F3E9D7',title:'Antique Persian Rug',sub:'Hand-knotted · 8×10ft · 1940s',cat:'Home & Garden',seller:'Emma T.',sRating:5.0,sSales:12,startBid:600,currentBid:890,reserve:1200,bids:5,endH:23,endM:15,desc:'Genuine hand-knotted Persian rug, circa 1940s. Wool pile, traditional floral motif. Expert-appraised at $1,400.'},
  {id:'a5',status:'live',emoji:'💍',img:'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&h=600&fit=crop&auto=format&q=80',bg:'#F3E9D7',title:'Diamond Engagement Ring',sub:'1.8ct · Platinum · GIA Certified',cat:'Jewelry',seller:'Michael R.',sRating:4.9,sSales:47,startBid:2800,currentBid:3400,reserve:4500,bids:31,endH:1,endM:8,hot:true,desc:'1.8ct round brilliant, E color, VS1 clarity. GIA certificate included. Platinum 950 setting. Size 6 (resizable).'},
  {id:'a6',status:'live',emoji:'🏀',img:'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=600&h=600&fit=crop&auto=format&q=80',bg:'#E2D2C4',title:'LeBron James Signed Jersey',sub:'Lakers · PSA/DNA Authenticated',cat:'Sports',seller:'James W.',sRating:4.6,sSales:89,startBid:900,currentBid:1100,reserve:1500,bids:14,endH:8,endM:20,desc:'Official Lakers jersey signed in 2022. PSA/DNA authenticated with COA. Framed display case included.'},
  {id:'a7',status:'review',emoji:'🎹',img:'https://images.unsplash.com/photo-1552422535-c45813c61732?w=600&h=600&fit=crop&auto=format&q=80',bg:'#D6CFE0',title:'Steinway Baby Grand Piano',sub:'Model M · 1952 · Recently Serviced',cat:'Music',seller:'Emma T.',sRating:5.0,sSales:12,startBid:8000,currentBid:0,bids:0,endH:0,endM:0,reviewDays:1,desc:'1952 Steinway Model M baby grand. Original ebony finish. Full service and regulation 2024. Pickup required.'},
  {id:'a8',status:'review',emoji:'🎸',img:'https://images.unsplash.com/photo-1564186763535-ebb21ef5277f?w=600&h=600&fit=crop&auto=format&q=80',bg:'#BFE7E4',title:'1957 Gibson Les Paul',sub:'Sunburst · All Original · Case',cat:'Music',seller:'James W.',sRating:4.6,sSales:89,startBid:12000,currentBid:0,bids:0,endH:0,endM:0,reviewDays:2,desc:'Rare 1957 Gibson Les Paul Standard. All original parts. Minor weather checking. Hard shell case. Expert authenticated.'},
];

/* ─── SELLERS ────────────────────────────────────────── */
const SELLERS = [
  {id:'s1',name:'Michael R.',avatar:'👨',unit:'4B',since:'Jan 2025',rating:4.9,sales:47,badge:'Top Seller',specialties:['Jewelry','Collectibles'],bio:'Vintage watch collector & jewelry enthusiast. Every item authenticated and described with full honesty.'},
  {id:'s2',name:'Sarah K.',avatar:'👩',unit:'12A',since:'Mar 2025',rating:4.8,sales:32,badge:'Verified',specialties:['Art & Crafts','Home'],bio:'Local artist and interior design lover. I curate beautiful pieces for your home and workspace.'},
  {id:'s3',name:'David L.',avatar:'🧑',unit:'7C',since:'Nov 2024',rating:4.7,sales:68,badge:'Power Seller',specialties:['Electronics','Appliances'],bio:'Tech enthusiast upgrading frequently. All electronics tested, reset, and backed by my personal guarantee.'},
  {id:'s4',name:'Emma T.',avatar:'👩',unit:'1A',since:'Feb 2025',rating:5.0,sales:12,badge:'Perfect Rating',specialties:['Home & Garden'],bio:'I love curating vintage furniture and garden decor for the community.'},
  {id:'s5',name:'James W.',avatar:'👨',unit:'9D',since:'Dec 2024',rating:4.6,sales:89,badge:'Top Seller',specialties:['Sports','Music','Clothing'],bio:'Sports memorabilia and vintage clothing expert. 15 years of collecting. Everything ships same day.'},
];

const TESTIMONIALS = {
  s1:[
    {id:'t1',reviewer:'Alice M.',rating:5,text:'Michael was incredibly professional. The Rolex was exactly as described — perfect condition and the transaction was flawless from start to finish. A true asset to our community.',date:'3 days ago',item:'Vintage Rolex',helpful:12,verified:true},
    {id:'t2',reviewer:'Tom B.',rating:5,text:'Third time buying from Michael and still the best seller in the building. Always reliable, honest, and every piece is authentic. Cannot recommend enough.',date:'1 week ago',item:'Diamond Bracelet',helpful:8,verified:true},
    {id:'t3',reviewer:'Lisa C.',rating:5,text:'Was nervous about a high-value purchase but Michael made me feel completely at ease. Great photos, honest description, easy pickup.',date:'2 weeks ago',item:'Sapphire Ring',helpful:5,verified:true},
    {id:'t4',reviewer:'Dave H.',rating:4,text:'Great seller, accurate description. Minor delay in communication but resolved quickly. Would buy again.',date:'3 weeks ago',item:'Vintage Brooch',helpful:2,verified:true},
  ],
  s2:[
    {id:'t5',reviewer:'Chloe R.',rating:5,text:"Sarah's painting transformed my living room. Even more stunning in person than the photos. She took time to explain the piece and its history. Truly exceptional.",date:'5 days ago',item:'Harbor Painting',helpful:9,verified:true},
    {id:'t6',reviewer:'Mark L.',rating:5,text:'Bought a framed print and a plant. Both perfect. Sarah is warm, responsive, and everything is as described. Community is lucky to have her.',date:'2 weeks ago',item:'Framed Print',helpful:6,verified:true},
    {id:'t7',reviewer:'Nina P.',rating:4,text:'Beautiful piece, very well packaged. Would have liked a little more detail in the listing but the item itself exceeded expectations.',date:'1 month ago',item:'Ceramic Vase',helpful:3,verified:true},
  ],
  s3:[
    {id:'t8',reviewer:'Sam K.',rating:5,text:'Bought a MacBook and it was immaculate. Factory reset, all accessories, and David even helped set it up. Outstanding seller.',date:'1 week ago',item:'MacBook Pro',helpful:15,verified:true},
    {id:'t9',reviewer:'Rachel T.',rating:4,text:'Great condition iPad. David communicates quickly and is flexible on pickup times. Solid seller.',date:'2 weeks ago',item:'iPad Pro',helpful:4,verified:true},
  ],
  s4:[
    {id:'t10',reviewer:'Mark J.',rating:5,text:'Emma\'s vintage side table is beautiful — great condition and exactly as described. She clearly takes care of everything she sells. Will be a regular!',date:'2 days ago',item:'Vintage Side Table',helpful:7,verified:true},
    {id:'t11',reviewer:'Amy S.',rating:5,text:'Perfect. The planter set was lovely and Emma was so generous sharing care tips. A true community gem.',date:'1 week ago',item:'Ceramic Planter Set',helpful:5,verified:true},
  ],
  s5:[
    {id:'t12',reviewer:'Chris M.',rating:5,text:'The LeBron jersey is beyond real — you can feel the energy in it. James had all the paperwork ready and even threw in a display stand. 10/10.',date:'4 days ago',item:'LeBron Jersey',helpful:11,verified:true},
    {id:'t13',reviewer:'Kim L.',rating:4,text:'Good communication, fast transaction. Bought a vintage jacket — exactly as described. Would recommend.',date:'2 weeks ago',item:'Vintage Jacket',helpful:3,verified:true},
  ],
};

const SWATCHES = [{c:'#0A3540',l:'Deep Water'},{c:'#0D7E7A',l:'Lagoon Dark'},{c:'#14A09B',l:'Lagoon'},{c:'#7ED8D3',l:'Shallow'},{c:'#FF6A55',l:'Coral'},{c:'#FF8A73',l:'Coral Light'},{c:'#F3E9D7',l:'Sun Sand'},{c:'#E9F6F5',l:'Sea Foam'}];
const RESIDENT_TYPES = [{id:'owner',label:'Owner',emoji:'🏠'},{id:'resident',label:'Resident',emoji:'🏢'}];

/* ─── SELLER LISTINGS (mock data) ───────────────────── */
const MY_LISTINGS = [
  {id:'ml1',name:'Vintage Table Lamp',   emoji:'🪔',img:'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=600&h=600&fit=crop&auto=format&q=80',cat:'Home & Garden',bg:'#BFE7E4',clicks:312, status:'live', price:65, listedDate:'2 days ago'},
  {id:'ml3',name:'Polaroid SX-70 Camera',emoji:'📸',img:'https://images.unsplash.com/photo-1495707902641-75cac588d2e9?w=600&h=600&fit=crop&auto=format&q=80',cat:'Electronics',  bg:'#BFE7E4',clicks:445, status:'live', price:89, listedDate:'1 day ago'},
  {id:'ml4',name:'Nike Air Max 90',       emoji:'👟',img:'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=600&fit=crop&auto=format&q=80',cat:'Clothing',     bg:'#BFE7E4',clicks:489, status:'sold', price:120,soldFor:115,soldDate:'3 days ago', buyer:'Tom B.'},
  {id:'ml5',name:'Espresso Machine',      emoji:'☕',img:'https://images.unsplash.com/photo-1572119865084-43c285814d63?w=600&h=600&fit=crop&auto=format&q=80',cat:'Appliances',   bg:'#BFE7E4',clicks:234, status:'sold', price:249,soldFor:220,soldDate:'5 days ago', buyer:'Sarah M.'},
  {id:'ml6',name:'Mountain Bike 29"',     emoji:'🚲',img:'https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=600&h=600&fit=crop&auto=format&q=80',cat:'Vehicles',     bg:'#BFE7E4',clicks:891, status:'sold', price:599,soldFor:550,soldDate:'12 days ago',buyer:'James K.',archived:true},
  {id:'ml7',name:'Vintage Record Player', emoji:'📻',img:'https://images.unsplash.com/photo-1485518882345-15568b007f4f?w=600&h=600&fit=crop&auto=format&q=80',cat:'Music',        bg:'#F3E9D7',clicks:672, status:'sold', price:180,soldFor:165,soldDate:'9 days ago', buyer:'Emma R.', archived:true},
  {id:'ml8',name:'Garden Tool Set',       emoji:'🌿',img:'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&h=600&fit=crop&auto=format&q=80',cat:'Home & Garden',bg:'#BFE7E4',clicks:234, status:'sold', price:89, soldFor:80, soldDate:'14 days ago',buyer:'Alex T.', archived:true},
  {id:'ml9',name:'Leather Armchair',      emoji:'🪑',img:'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?w=600&h=600&fit=crop&auto=format&q=80',cat:'Home & Garden',bg:'#BFE7E4',clicks:567, status:'sold', price:350,soldFor:320,soldDate:'18 days ago',buyer:'Nina P.', archived:true},
];


const LISTINGS = [
  {id:'L5',catId:'electronics',name:'iPad Air 5th Gen',     emoji:'📱',img:'https://images.unsplash.com/photo-1561154464-82e9adf32764?w=600&h=600&fit=crop&auto=format&q=80',bg:'#C8D4F0',price:450,  unit:'',       seller:'David L.',   unit_:'7C', posted:'3h ago', cond:'Like new', desc:'iPad Air 5th gen, 64GB, Space Gray. Battery health 96%. Includes original charger and box — screen protector applied since day one.', imgs:['https://images.unsplash.com/photo-1561154464-82e9adf32764?w=600&h=600&fit=crop&auto=format&q=80','https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=600&h=600&fit=crop&auto=format&q=80','https://images.unsplash.com/photo-1561154464-82e9adf32764?w=600&h=600&fit=crop&auto=format&q=80&flip=h']},
  {id:'L6',catId:'clothing',   name:"Vintage Levi's Jacket",emoji:'🧥',bg:'#DCC4E8',price:65,   unit:'',       seller:'James W.',   unit_:'9D', posted:'2 days ago', cond:'Good vintage', desc:"Authentic vintage Levi's trucker jacket, size M. Beautiful natural fade, no rips or stains. From my personal collection of 15 years.", imgs:['https://images.unsplash.com/photo-1551537482-f2075a1d41f2?w=600&h=600&fit=crop&auto=format&q=80','https://images.unsplash.com/photo-1551537482-f2075a1d41f2?w=600&h=600&fit=crop&auto=format&q=80&flip=h']},
  {id:'L7',catId:'home',       name:'Monstera Deliciosa',   emoji:'🪴',img:'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=600&h=600&fit=crop&auto=format&q=80',bg:'#BFE7E4',price:35,   unit:'',       seller:'Sarah K.',   unit_:'12A',posted:'5h ago', cond:'Thriving', desc:'Healthy Monstera Deliciosa, about 70cm tall with 8 leaves and new growth coming. Comes in a ceramic pot. Grown from a cutting two years ago.', imgs:['https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=600&h=600&fit=crop&auto=format&q=80','https://images.unsplash.com/photo-1545241047-6083a3684587?w=600&h=600&fit=crop&auto=format&q=80','https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=600&h=600&fit=crop&auto=format&q=80&flip=h']},
  {id:'L8',catId:'books',      name:'Atomic Habits',        emoji:'📚',img:'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=600&h=600&fit=crop&auto=format&q=80',bg:'#E0D0B8',price:12,   unit:'',       seller:'Michael R.', unit_:'4B', posted:'1 day ago', cond:'Like new', desc:'Atomic Habits by James Clear, hardcover. Read once — like new, no markings or dog-ears. Just decluttering my shelf.', imgs:['https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=600&h=600&fit=crop&auto=format&q=80','https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600&h=600&fit=crop&auto=format&q=80','https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=600&h=600&fit=crop&auto=format&q=80&flip=h']},
];


export { CSS, CATS, AUCTION_BASE, SELLERS, TESTIMONIALS, SWATCHES, RESIDENT_TYPES, MY_LISTINGS, LISTINGS };
