import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Search, ArrowLeft, Eye, EyeOff, Check, Mail, Lock, User, Building, Home, X, Plus, Star, ChevronRight, MapPin, Bell, Shield, HelpCircle, LogOut, TrendingUp } from 'lucide-react';

/* ═══ G-TRIBES PALETTE ════════════════════════════════
   #091408  Void      #133B1C  Forest    #1A6B35  Emerald
   #52B788  Mint      #D4A520  Gold      #F5D860  Gold Light
   #FDE8A0  Gold Pale #F5F1E0  Cream
══════════════════════════════════════════════════════ */

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,600;0,9..144,700;0,9..144,900;1,9..144,400&family=DM+Sans:wght@400;500;600;700&display=swap');
*{box-sizing:border-box;margin:0;padding:0;}
.ff{font-family:'Fraunces',Georgia,serif;}
.fs{font-family:'DM Sans',system-ui,sans-serif;}
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
@keyframes pulse    {0%,100%{box-shadow:0 0 0 0 rgba(212,165,32,0.5)}50%{box-shadow:0 0 0 12px rgba(212,165,32,0)}}
@keyframes shimmer  {0%{background-position:-300% center}100%{background-position:300% center}}
@keyframes livePulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:0.5;transform:scale(0.75)}}
@keyframes bidFlash {0%{background:rgba(212,165,32,0.35);transform:scale(1.05)}100%{background:transparent;transform:scale(1)}}
@keyframes urgentTick{0%,100%{color:#E85020}50%{color:#FF7050}}
@keyframes starPop  {0%{transform:scale(0) rotate(-30deg)}70%{transform:scale(1.3) rotate(5deg)}100%{transform:scale(1) rotate(0)}}
@keyframes cpop     {0%{transform:translate(0,0) scale(0) rotate(0deg);opacity:1}25%{opacity:1}100%{transform:translate(var(--cx),var(--cy)) scale(1) rotate(var(--cr));opacity:0}}
@keyframes blink    {0%,100%{opacity:1}50%{opacity:0}}


.btn-gold{background:linear-gradient(90deg,#8B6810 0%,#D4A520 22%,#F5D860 45%,#FFED90 50%,#F5D860 55%,#D4A520 78%,#8B6810 100%);background-size:300% auto;animation:shimmer 3.5s linear infinite;color:#091408 !important;font-weight:700 !important;border:none !important;letter-spacing:0.04em;box-shadow:0 4px 20px rgba(212,165,32,0.35);}
.btn-emerald{background:linear-gradient(90deg,#0D4020 0%,#1A6B35 30%,#28A050 55%,#1A6B35 80%,#0D4020 100%);background-size:300% auto;animation:shimmer 4s linear infinite;color:#F5F1E0 !important;font-weight:700 !important;border:none !important;letter-spacing:0.04em;box-shadow:0 4px 18px rgba(26,107,53,0.35);}
.btn-em{background:linear-gradient(90deg,#0D4020 0%,#1A6B35 30%,#28A050 55%,#1A6B35 80%,#0D4020 100%);background-size:300% auto;animation:shimmer 4s linear infinite;color:#F5F1E0 !important;font-weight:700 !important;border:none !important;letter-spacing:0.04em;box-shadow:0 4px 18px rgba(26,107,53,0.35);}
.tg{background:linear-gradient(90deg,#B88A10,#F5D860,#D4A520,#FFED80,#B88A10);background-size:250% auto;animation:shimmer 4s linear infinite;-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;}
.cp{transition:transform .15s cubic-bezier(0.34,1.56,0.64,1);}.cp:active{transform:scale(0.94)!important;}
.text-gold{background:linear-gradient(90deg,#B88A10,#F5D860,#D4A520,#FFED80,#B88A10);background-size:250% auto;animation:shimmer 4s linear infinite;-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;}
.card-press{transition:transform 0.15s cubic-bezier(0.34,1.56,0.64,1);}
.card-press:active{transform:scale(0.94)!important;}
.inp-wrap{transition:border-color .2s,box-shadow .2s;}
.inp-wrap:focus-within{border-color:rgba(212,165,32,0.7)!important;box-shadow:0 0 0 3px rgba(212,165,32,0.15)!important;}
.inp-light:focus-within{border-color:rgba(26,107,53,0.6)!important;box-shadow:0 0 0 3px rgba(26,107,53,0.12)!important;}
.iw{transition:border-color .2s,box-shadow .2s;}
.iw:focus-within{border-color:rgba(212,165,32,0.7)!important;box-shadow:0 0 0 3px rgba(212,165,32,0.15)!important;}
.iwl{transition:border-color .2s,box-shadow .2s;}
.iwl:focus-within{border-color:rgba(26,107,53,0.6)!important;box-shadow:0 0 0 3px rgba(26,107,53,0.12)!important;}
.s1{animation-delay:0s}.s2{animation-delay:.07s}.s3{animation-delay:.14s}.s4{animation-delay:.21s}.s5{animation-delay:.28s}.s6{animation-delay:.35s}.s7{animation-delay:.42s}.s8{animation-delay:.49s}.s9{animation-delay:.56s}

.btn-teal{background:linear-gradient(135deg,#1A8A58 0%,#52B788 50%,#1A8A58 100%);background-size:200% auto;animation:shimmer 4s linear infinite;color:#091408 !important;font-weight:700 !important;border:none !important;letter-spacing:0.04em;box-shadow:0 4px 16px rgba(82,183,136,0.35);}
.btn-ghost-gold{background:rgba(212,165,32,0.08);border:1.5px solid rgba(212,165,32,0.45) !important;color:#D4A520 !important;font-weight:700 !important;letter-spacing:0.04em;transition:all .2s;}
.btn-ghost-gold:active{background:rgba(212,165,32,0.18) !important;}
.btn-ghost-em{background:rgba(26,107,53,0.08);border:1.5px solid rgba(26,107,53,0.4) !important;color:#1A6B35 !important;font-weight:700 !important;letter-spacing:0.04em;transition:all .2s;}
.btn-ghost-em:active{background:rgba(26,107,53,0.18) !important;}
.btn-icon-teal{background:rgba(26,107,53,0.12);border:1px solid rgba(26,107,53,0.25) !important;color:#1A6B35 !important;transition:all .2s;}
.btn-icon-teal:active{background:rgba(26,107,53,0.25) !important;}
.btn-icon-gold{background:rgba(212,165,32,0.12);border:1px solid rgba(212,165,32,0.3) !important;color:#B88A10 !important;transition:all .2s;}
.btn-icon-gold:active{background:rgba(212,165,32,0.25) !important;}
.tab-pill-active{background:linear-gradient(135deg,#133B1C,#1A6B35);color:#F5F1E0 !important;font-weight:700;border:none !important;box-shadow:0 3px 12px rgba(26,107,53,0.4);}
.tab-pill-idle{background:rgba(26,107,53,0.07);color:#1A6B35 !important;font-weight:600;border:1px solid rgba(26,107,53,0.15) !important;}
.cursor::after{content:'|';animation:blink .9s step-start infinite;color:#D4A520;}
input:focus{outline:none;}input::placeholder{color:rgba(240,235,216,0.3);}
.lp::placeholder{color:rgba(31,42,20,0.28)!important;}
button{cursor:pointer;font-family:'DM Sans',system-ui,sans-serif;}
`;

/* ─── CATS (Events + Services removed) ─────────────── */
const CATS = [
  {id:'farm',       name:'Farm Fresh',   emoji:'🌾',c:'#1A5820',bg:'#C4E8C0',members:24},
  {id:'electronics',name:'Electronics',  emoji:'📱',c:'#1A4830',bg:'#B8D8C0',members:31},
  {id:'clothing',   name:'Clothing',     emoji:'👕',c:'#1A5030',bg:'#C0DCC0',members:19},
  {id:'appliances', name:'Appliances',   emoji:'⚡',c:'#1A5825',bg:'#BCE4C4',members:22},
  {id:'vehicles',   name:'Vehicles',     emoji:'🚗',c:'#1A4A2C',bg:'#B8D4C0',members:12},
  {id:'games',      name:'Games & Toys', emoji:'🎮',c:'#1A5428',bg:'#C0E0C8',members:28},
  {id:'home',       name:'Home & Garden',emoji:'🛋️',c:'#1A5824',bg:'#C8E4CC',members:35},
  {id:'sports',     name:'Sports',       emoji:'⚽',c:'#1A5028',bg:'#B8DCC0',members:18},
  {id:'books',      name:'Books & Media',emoji:'📚',c:'#1A4828',bg:'#C4D8BC',members:27},
  {id:'beauty',     name:'Beauty & Care',emoji:'💄',c:'#7A5010',bg:'#F5E4A0',members:21},
  {id:'pets',       name:'Pets',         emoji:'🐾',c:'#785010',bg:'#F0DC8C',members:14},
  {id:'art',        name:'Art & Crafts', emoji:'🎨',c:'#7A5014',bg:'#F5DC9C',members:23},
  {id:'food',       name:'Food & Drinks',emoji:'🍕',c:'#785010',bg:'#F0D880',members:20},
  {id:'music',      name:'Music',        emoji:'🎵',c:'#7A5010',bg:'#ECD484',members:11},
  {id:'jewelry',    name:'Jewelry',      emoji:'💍',c:'#806014',bg:'#F5E094',members:9 },
  {id:'kids',       name:'Kids',         emoji:'🧸',c:'#785010',bg:'#F0D888',members:17},
  {id:'tools',      name:'Tools & DIY',  emoji:'🔨',c:'#6A5010',bg:'#E8D880',members:13},
  {id:'other',      name:'Other',        emoji:'📦',c:'#6A5818',bg:'#EED888',members:8 },
];

/* ─── AUCTIONS ──────────────────────────────────────── */
const AUCTION_BASE = [
  {id:'a1',status:'live',emoji:'⌚',bg:'#E8D880',title:'Vintage Rolex Submariner',sub:'1968 · Papers & Box · Excellent',cat:'Jewelry',seller:'Michael R.',sRating:4.9,sSales:47,startBid:2500,currentBid:4850,reserve:6000,bids:23,endH:2,endM:14,hot:true,desc:'Rare 1968 Rolex Submariner Date, original black dial, tritium indices, original bracelet. Full set with papers and original box. Condition 8.5/10.'},
  {id:'a2',status:'live',emoji:'🖼️',bg:'#F5E4A0',title:'Original Oil Painting',sub:'Harbor at Dawn · 36×48in · Signed',cat:'Art & Crafts',seller:'Sarah K.',sRating:4.8,sSales:32,startBid:800,currentBid:1250,reserve:1500,bids:11,endH:5,endM:42,desc:'Original oil on canvas by local artist. Cedar Creek harbor at sunrise. Framed. Certificate of authenticity included.'},
  {id:'a3',status:'live',emoji:'💻',bg:'#B8D8C0',title:'MacBook Pro M3 Max',sub:'16" · 36GB RAM · 1TB · Like New',cat:'Electronics',seller:'David L.',sRating:4.7,sSales:68,startBid:1800,currentBid:2200,reserve:2800,bids:8,endH:12,endM:30,desc:'Purchased 4 months ago, used lightly for travel. All accessories included. AppleCare+ transferable until 2026.'},
  {id:'a4',status:'live',emoji:'🪨',bg:'#F0D880',title:'Antique Persian Rug',sub:'Hand-knotted · 8×10ft · 1940s',cat:'Home & Garden',seller:'Emma T.',sRating:5.0,sSales:12,startBid:600,currentBid:890,reserve:1200,bids:5,endH:23,endM:15,desc:'Genuine hand-knotted Persian rug, circa 1940s. Wool pile, traditional floral motif. Expert-appraised at $1,400.'},
  {id:'a5',status:'live',emoji:'💍',bg:'#F5E094',title:'Diamond Engagement Ring',sub:'1.8ct · Platinum · GIA Certified',cat:'Jewelry',seller:'Michael R.',sRating:4.9,sSales:47,startBid:2800,currentBid:3400,reserve:4500,bids:31,endH:1,endM:8,hot:true,desc:'1.8ct round brilliant, E color, VS1 clarity. GIA certificate included. Platinum 950 setting. Size 6 (resizable).'},
  {id:'a6',status:'live',emoji:'🏀',bg:'#F0C8B0',title:'LeBron James Signed Jersey',sub:'Lakers · PSA/DNA Authenticated',cat:'Sports',seller:'James W.',sRating:4.6,sSales:89,startBid:900,currentBid:1100,reserve:1500,bids:14,endH:8,endM:20,desc:'Official Lakers jersey signed in 2022. PSA/DNA authenticated with COA. Framed display case included.'},
  {id:'a7',status:'review',emoji:'🎹',bg:'#D4C4EC',title:'Steinway Baby Grand Piano',sub:'Model M · 1952 · Recently Serviced',cat:'Music',seller:'Emma T.',sRating:5.0,sSales:12,startBid:8000,currentBid:0,bids:0,endH:0,endM:0,reviewDays:1,desc:'1952 Steinway Model M baby grand. Original ebony finish. Full service and regulation 2024. Pickup required.'},
  {id:'a8',status:'review',emoji:'🎸',bg:'#C8E4CC',title:'1957 Gibson Les Paul',sub:'Sunburst · All Original · Case',cat:'Music',seller:'James W.',sRating:4.6,sSales:89,startBid:12000,currentBid:0,bids:0,endH:0,endM:0,reviewDays:2,desc:'Rare 1957 Gibson Les Paul Standard. All original parts. Minor weather checking. Hard shell case. Expert authenticated.'},
];

/* ─── SELLERS ────────────────────────────────────────── */
const SELLERS = [
  {id:'s1',name:'Michael R.',avatar:'👨',unit:'4B',since:'Jan 2025',rating:4.9,sales:47,badge:'Top Seller',specialties:['Jewelry','Collectibles'],bio:'Vintage watch collector & jewelry enthusiast. Every item authenticated and described with full honesty.'},
  {id:'s2',name:'Sarah K.',avatar:'👩',unit:'12A',since:'Mar 2025',rating:4.8,sales:32,badge:'Verified',specialties:['Art & Crafts','Home'],bio:'Local artist and interior design lover. I curate beautiful pieces for your home and workspace.'},
  {id:'s3',name:'David L.',avatar:'🧑',unit:'7C',since:'Nov 2024',rating:4.7,sales:68,badge:'Power Seller',specialties:['Electronics','Appliances'],bio:'Tech enthusiast upgrading frequently. All electronics tested, reset, and backed by my personal guarantee.'},
  {id:'s4',name:'Emma T.',avatar:'👩',unit:'1A',since:'Feb 2025',rating:5.0,sales:12,badge:'Perfect Rating',specialties:['Farm Fresh','Home & Garden'],bio:'I grow a small organic garden and sell seasonal produce every Saturday at the community stall.'},
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
    {id:'t10',reviewer:'Mark J.',rating:5,text:'Emma\'s tomatoes are incredible — the best I\'ve had in years. She clearly puts love into everything she grows. Will be a regular!',date:'2 days ago',item:'Heirloom Tomatoes',helpful:7,verified:true},
    {id:'t11',reviewer:'Amy S.',rating:5,text:'Perfect. The honey is extraordinary and Emma was so generous explaining the bees and the harvest. A true community gem.',date:'1 week ago',item:'Wildflower Honey',helpful:5,verified:true},
  ],
  s5:[
    {id:'t12',reviewer:'Chris M.',rating:5,text:'The LeBron jersey is beyond real — you can feel the energy in it. James had all the paperwork ready and even threw in a display stand. 10/10.',date:'4 days ago',item:'LeBron Jersey',helpful:11,verified:true},
    {id:'t13',reviewer:'Kim L.',rating:4,text:'Good communication, fast transaction. Bought a vintage jacket — exactly as described. Would recommend.',date:'2 weeks ago',item:'Vintage Jacket',helpful:3,verified:true},
  ],
};

const SWATCHES = [{c:'#091408',l:'Void'},{c:'#133B1C',l:'Forest'},{c:'#1A6B35',l:'Emerald'},{c:'#52B788',l:'Mint'},{c:'#D4A520',l:'Gold'},{c:'#F5D860',l:'Light'},{c:'#FDE8A0',l:'Pale'},{c:'#F5F1E0',l:'Cream'}];
const RESIDENT_TYPES = [{id:'owner',label:'Homeowner',emoji:'🏠'},{id:'tenant',label:'Tenant / Renter',emoji:'🏢'},{id:'student',label:'Student',emoji:'🎓'},{id:'business',label:'Business Owner',emoji:'💼'},{id:'staff',label:'Staff / Employee',emoji:'🔑'},{id:'visitor',label:'Visitor / Guest',emoji:'👤'}];

/* ─── SELLER LISTINGS (mock data) ───────────────────── */
const MY_LISTINGS = [
  {id:'ml1',name:'Vintage Table Lamp',   emoji:'🪔',cat:'Home & Garden',bg:'#C8E4CC',clicks:312, status:'live', price:65, listedDate:'2 days ago'},
  {id:'ml2',name:'Sourdough Starter Kit',emoji:'🍞',cat:'Farm Fresh',   bg:'#C4E8C0',clicks:156, status:'live', price:25, listedDate:'4 days ago'},
  {id:'ml3',name:'Polaroid SX-70 Camera',emoji:'📸',cat:'Electronics',  bg:'#B8D8C0',clicks:445, status:'live', price:89, listedDate:'1 day ago'},
  {id:'ml4',name:'Nike Air Max 90',       emoji:'👟',cat:'Clothing',     bg:'#C0DCC0',clicks:489, status:'sold', price:120,soldFor:115,soldDate:'3 days ago', buyer:'Tom B.'},
  {id:'ml5',name:'Espresso Machine',      emoji:'☕',cat:'Appliances',   bg:'#B8D8C0',clicks:234, status:'sold', price:249,soldFor:220,soldDate:'5 days ago', buyer:'Sarah M.'},
  {id:'ml6',name:'Mountain Bike 29"',     emoji:'🚲',cat:'Vehicles',     bg:'#C8E4CC',clicks:891, status:'sold', price:599,soldFor:550,soldDate:'12 days ago',buyer:'James K.',archived:true},
  {id:'ml7',name:'Vintage Record Player', emoji:'📻',cat:'Music',        bg:'#F0D880',clicks:672, status:'sold', price:180,soldFor:165,soldDate:'9 days ago', buyer:'Emma R.', archived:true},
  {id:'ml8',name:'Garden Tool Set',       emoji:'🌿',cat:'Home & Garden',bg:'#B8DCC0',clicks:234, status:'sold', price:89, soldFor:80, soldDate:'14 days ago',buyer:'Alex T.', archived:true},
  {id:'ml9',name:'Leather Armchair',      emoji:'🪑',cat:'Home & Garden',bg:'#C8E4CC',clicks:567, status:'sold', price:350,soldFor:320,soldDate:'18 days ago',buyer:'Nina P.', archived:true},
];

/* ─── SHARED COMPONENTS ─────────────────────────────── */
const Logo = ({ light=false, lg=false }) => (
  <div style={{display:'flex',alignItems:'center',gap:lg?14:10}}>
    <div style={{width:lg?52:40,height:lg?52:40,borderRadius:lg?16:12,flexShrink:0,background:light?'linear-gradient(135deg,#D4A520,#F5D860)':'linear-gradient(135deg,#1A6B35,#0D4020)',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:'Fraunces,serif',fontSize:lg?28:21,fontWeight:900,color:light?'#091408':'#F5D860',boxShadow:light?'0 4px 16px rgba(212,165,32,0.4)':'0 4px 16px rgba(26,107,53,0.4)'}}>G</div>
    <div>
      <div style={{fontFamily:'DM Sans,sans-serif',fontWeight:700,letterSpacing:'0.18em',fontSize:lg?20:15,color:light?'#F5F1E0':'#091408',lineHeight:1}}>TRIBES</div>
      <div style={{fontSize:lg?11:9,fontWeight:500,letterSpacing:'0.07em',marginTop:3,color:light?'rgba(245,241,224,0.5)':'rgba(9,20,8,0.45)'}}>Community Market</div>
    </div>
  </div>
);

const Stars = ({ rating, size=14 }) => (
  <span style={{fontSize:size,letterSpacing:1}}>
    {[1,2,3,4,5].map(n=><span key={n} style={{color:n<=Math.round(rating)?'#D4A520':'rgba(212,165,32,0.2)'}}>★</span>)}
  </span>
);

const Particles = () => {
  const pts = useMemo(()=>Array.from({length:24},(_,i)=>({id:i,x:Math.random()*100,y:Math.random()*100,size:Math.random()*4+2,delay:Math.random()*5,dur:Math.random()*3+2.5,op:Math.random()*0.55+0.2,green:i%5===0})),[]);
  return <div style={{position:'absolute',inset:0,overflow:'hidden',pointerEvents:'none'}}>{pts.map(p=><div key={p.id} style={{position:'absolute',left:`${p.x}%`,top:`${p.y}%`,width:p.size,height:p.size,borderRadius:'50%',background:p.green?'#52B788':'#D4A520',opacity:p.op,animation:`twinkle ${p.dur}s ${p.delay}s ease-in-out infinite`}}/>)}</div>;
};

const Counter = ({ target, suffix='' }) => {
  const [v,setV]=useState(0); const ref=useRef();
  useEffect(()=>{const o=new IntersectionObserver(([e])=>{if(!e.isIntersecting)return;o.disconnect();const s=Date.now(),d=1600,t=()=>{const p=Math.min((Date.now()-s)/d,1),e2=1-Math.pow(1-p,3);setV(Math.floor(e2*target));if(p<1)requestAnimationFrame(t);};requestAnimationFrame(t);},{threshold:0.5});if(ref.current)o.observe(ref.current);return()=>o.disconnect();},[target]);
  return <span ref={ref}>{v}{suffix}</span>;
};

const Confetti = ({show}) => {
  const ps=useMemo(()=>Array.from({length:60},(_,i)=>{const a=(Math.random()*360)*Math.PI/180,d=60+Math.random()*130;return{id:i,cx:`${Math.cos(a)*d}px`,cy:`${Math.sin(a)*d-50}px`,cr:`${Math.random()*720-360}deg`,color:['#D4A520','#52B788','#F5D860','#1A6B35','#F5F1E0','#B88A10'][i%6],size:5+Math.random()*9,delay:Math.random()*0.35,circle:i%3!==0}}),[]);
  if(!show)return null;
  return <div style={{position:'fixed',inset:0,pointerEvents:'none',zIndex:300,display:'flex',alignItems:'center',justifyContent:'center'}}>{ps.map(p=><div key={p.id} style={{position:'absolute',width:p.size,height:p.size,background:p.color,borderRadius:p.circle?'50%':'2px','--cx':p.cx,'--cy':p.cy,'--cr':p.cr,animation:`cpop 1.4s ${p.delay}s cubic-bezier(0.22,1,0.36,1) forwards`}}/>)}</div>;
};

const DarkField = ({icon:Icon,type='text',value,onChange,placeholder,right}) => (
  <div className="inp-wrap" style={{display:'flex',alignItems:'center',gap:12,background:'rgba(255,255,255,0.04)',border:'1px solid rgba(212,165,32,0.18)',borderRadius:14,padding:'14px 16px',marginBottom:12}}>
    {Icon&&<Icon size={16} strokeWidth={2.2} style={{color:'rgba(212,165,32,0.55)',flexShrink:0}}/>}
    <input type={type} value={value} onChange={onChange} placeholder={placeholder} style={{background:'transparent',border:'none',color:'#F5F1E0',fontSize:15,width:'100%',flex:1,fontFamily:'DM Sans,sans-serif'}}/>
    {right}
  </div>
);

/* ─── BOTTOM NAV (5 tabs) ────────────────────────────── */
const BottomNav = ({active, onChange}) => {
  const tabs = [
    {id:'home',    label:'Home',    emoji:'🏠'},
    {id:'browse',  label:'Market',  emoji:'🏪'},
    {id:'sellers', label:'Sellers', emoji:'🌟'},
    {id:'auctions',label:'Auctions',emoji:'⚡', special:true},
    {id:'settings',label:'Settings',emoji:'⚙️'},
  ];
  return (
    <div style={{position:'fixed',bottom:0,left:0,right:0,zIndex:30,background:'rgba(245,241,224,0.97)',backdropFilter:'blur(12px)',borderTop:'1px solid rgba(26,107,53,0.12)',display:'flex',justifyContent:'center'}}>
      <div style={{display:'flex',width:'100%',maxWidth:440}}>
        {tabs.map(t=>{
          const act=active===t.id;
          return (
            <button key={t.id} onClick={()=>onChange(t.id)} style={{flex:1,padding:t.special?'5px 2px 18px':'8px 2px 18px',display:'flex',flexDirection:'column',alignItems:'center',gap:3,border:'none',background:'transparent',position:'relative'}}>
              {t.special?(
                <div style={{background:act?'linear-gradient(135deg,#133B1C,#1A6B35)':'rgba(26,107,53,0.1)',borderRadius:16,padding:'6px 10px',display:'flex',flexDirection:'column',alignItems:'center',gap:2,boxShadow:act?'0 4px 16px rgba(26,107,53,0.4)':'none',transition:'all .2s'}}>
                  <span style={{fontSize:18}}>{t.emoji}</span>
                  <span style={{fontSize:8,fontWeight:700,letterSpacing:'0.06em',color:act?'#F5D860':'#1A6B35'}}>{t.label}</span>
                </div>
              ):(
                <>
                  <span style={{fontSize:20,filter:act?'none':'grayscale(0.4) opacity(0.5)',transition:'filter .2s'}}>{t.emoji}</span>
                  <span style={{fontSize:8,fontWeight:600,letterSpacing:'0.04em',color:act?'#1A6B35':'rgba(31,42,20,0.35)',transition:'color .2s'}}>{t.label}</span>
                  {act&&<div style={{position:'absolute',bottom:12,width:14,height:2.5,borderRadius:100,background:'#1A6B35'}}/>}
                </>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

/* ─── MARKETPLACE LISTINGS (sample data) ───────────── */
const LISTINGS = [
  {id:'L1',catId:'farm',       name:'Heirloom Tomatoes',    emoji:'🍅',bg:'#F4D4CB',price:4.50, unit:'/lb',    seller:'Emma T.',    unit_:'1A', posted:'2h ago', tag:'Fresh today'},
  {id:'L2',catId:'farm',       name:'Sourdough Boule',      emoji:'🥖',bg:'#EBD9B4',price:8.00, unit:'/loaf',  seller:'Emma T.',    unit_:'1A', posted:'4h ago'},
  {id:'L3',catId:'farm',       name:'Farm Eggs',            emoji:'🥚',bg:'#F0E5C0',price:7.00, unit:'/dozen', seller:'Sarah K.',   unit_:'12A',posted:'1 day ago'},
  {id:'L4',catId:'farm',       name:'Wildflower Honey',     emoji:'🍯',bg:'#F0CB8E',price:12.00,unit:'/jar',   seller:'Emma T.',    unit_:'1A', posted:'2 days ago'},
  {id:'L5',catId:'electronics',name:'iPad Air 5th Gen',     emoji:'📱',bg:'#C8D4F0',price:450,  unit:'',       seller:'David L.',   unit_:'7C', posted:'3h ago'},
  {id:'L6',catId:'clothing',   name:"Vintage Levi's Jacket",emoji:'🧥',bg:'#DCC4E8',price:65,   unit:'',       seller:'James W.',   unit_:'9D', posted:'2 days ago'},
  {id:'L7',catId:'home',       name:'Monstera Deliciosa',   emoji:'🪴',bg:'#C8E4CC',price:35,   unit:'',       seller:'Sarah K.',   unit_:'12A',posted:'5h ago'},
  {id:'L8',catId:'books',      name:'Atomic Habits',        emoji:'📚',bg:'#E0D0B8',price:12,   unit:'',       seller:'Michael R.', unit_:'4B', posted:'1 day ago'},
];

/* ─── CATEGORY + MARKET PAGES ───────────────────────── */
const CategoryPage = ({cat, onBack}) => {
  const [following, setFollowing] = useState(false);
  const [toast, setToast] = useState(false);
  const items = LISTINGS.filter(l=>l.catId===cat.id);

  const handleFollow = () => {
    const next = !following;
    setFollowing(next);
    setToast(true);
    setTimeout(()=>setToast(false), 2800);
  };

  const fmt = (p, u) => `$${Number(p.toFixed(2))}${u}`;

  return (
    <div style={{flex:1,overflowY:'auto',paddingBottom:90}} className="sh">
      {/* Header */}
      <header style={{padding:'18px 16px 14px',position:'sticky',top:0,zIndex:10,background:'#F5F1E0'}}>
        <div style={{display:'flex',alignItems:'center',gap:12}}>
          <button onClick={onBack} className="btn-icon-teal" style={{width:36,height:36,borderRadius:11,display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
            <ArrowLeft size={17} strokeWidth={2.3}/>
          </button>
          <div style={{width:40,height:40,borderRadius:13,background:cat.bg,display:'flex',alignItems:'center',justifyContent:'center',fontSize:22,flexShrink:0}}>
            {cat.emoji}
          </div>
          <div style={{flex:1}}>
            <div style={{fontFamily:'Fraunces,serif',fontSize:18,fontWeight:700,lineHeight:1.2}}>{cat.name}</div>
            <div style={{fontSize:11,color:'#7A6B4A'}}>{items.length} listing{items.length!==1?'s':''} · {cat.members} watching</div>
          </div>
          {/* Follow / Notification bell */}
          <button onClick={handleFollow} className={following?'btn-icon-teal':'btn-ghost-em'} style={{borderRadius:100,padding:'7px 12px',display:'flex',alignItems:'center',gap:6,flexShrink:0}}>
            <span style={{fontSize:14}}>{following?'🔔':'🔕'}</span>
            <span style={{fontSize:11,fontWeight:700,color:following?'#1A6B35':'#7A6B4A'}}>{following?'Following':'Follow'}</span>
          </button>
        </div>
      </header>

      {/* Toast */}
      {toast&&(
        <div style={{position:'fixed',top:80,left:'50%',transform:'translateX(-50%)',zIndex:50,background:'#1A6B35',color:'#F5F1E0',borderRadius:100,padding:'10px 20px',fontSize:13,fontWeight:600,boxShadow:'0 6px 20px rgba(26,107,53,0.35)',animation:'fadeUp .25s ease-out',whiteSpace:'nowrap'}}>
          {following?`🔔 Notified when new listings in ${cat.name}`:`🔕 Unfollowed ${cat.name}`}
        </div>
      )}

      {/* Follow hint */}
      {!following&&(
        <div style={{margin:'0 16px 14px',background:'rgba(26,107,53,0.06)',border:'1px solid rgba(26,107,53,0.12)',borderRadius:14,padding:'10px 14px',display:'flex',alignItems:'center',gap:10}}>
          <span style={{fontSize:18}}>🔕</span>
          <p style={{fontSize:12,color:'#5A6050',lineHeight:1.5}}>Follow to get notified when new items are listed in <strong>{cat.name}</strong>.</p>
        </div>
      )}

      <div style={{padding:'0 16px'}}>
        {items.length===0 ? (
          <div style={{textAlign:'center',padding:'52px 24px'}}>
            <div style={{width:90,height:90,borderRadius:26,background:cat.bg,display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 20px',fontSize:46,animation:'floatSlow 4s ease-in-out infinite',boxShadow:`0 10px 28px ${cat.bg}bb`}}>
              {cat.emoji}
            </div>
            <h2 style={{fontFamily:'Fraunces,serif',fontSize:22,fontWeight:700,marginBottom:8}}>No items listed yet</h2>
            <p style={{fontSize:14,color:'#7A6B4A',lineHeight:1.65,marginBottom:6}}>Be the first to post in <strong style={{color:cat.c}}>{cat.name}</strong>.</p>
            <p style={{fontSize:12,color:'#8A7860',marginBottom:28}}>{cat.members} neighbors are watching this category.</p>
            {!following&&(
              <button onClick={handleFollow} style={{display:'flex',alignItems:'center',gap:7,background:'rgba(26,107,53,0.08)',border:'1px solid rgba(26,107,53,0.2)',borderRadius:100,padding:'10px 20px',margin:'0 auto 16px',color:'#1A6B35',fontWeight:700,fontSize:13}}>
                🔔 Follow — get notified first
              </button>
            )}
            {following&&(
              <div style={{display:'inline-flex',alignItems:'center',gap:7,background:'rgba(26,107,53,0.1)',border:'1px solid rgba(26,107,53,0.25)',borderRadius:100,padding:'10px 20px',color:'#1A6B35',fontWeight:700,fontSize:13}}>
                🔔 You'll be notified of new listings
              </div>
            )}
          </div>
        ) : (
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12}}>
            {items.map((item,i)=>(
              <div key={item.id} className={`cp s${Math.min(i+1,9)}`} style={{background:'#FFFDF0',borderRadius:18,overflow:'hidden',border:'1px solid rgba(26,107,53,0.08)',animation:'fadeUp .3s ease-out both'}}>
                <div style={{height:110,background:item.bg,display:'flex',alignItems:'center',justifyContent:'center',fontSize:50,position:'relative'}}>
                  {item.emoji}
                  {item.tag&&<div style={{position:'absolute',bottom:6,left:8,background:'#1A6B35',color:'#F5F1E0',fontSize:9,fontWeight:700,letterSpacing:'0.08em',padding:'3px 8px',borderRadius:100}}>{item.tag}</div>}
                </div>
                <div style={{padding:'12px'}}>
                  <div style={{fontFamily:'Fraunces,serif',fontSize:14,fontWeight:700,lineHeight:1.3,marginBottom:3}}>{item.name}</div>
                  <div style={{fontSize:11,color:'#7A6B4A',marginBottom:6}}>{item.seller} · Unit {item.unit_}</div>
                  <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                    <div style={{fontFamily:'Fraunces,serif',fontSize:16,fontWeight:700,color:'#1A6B35'}}>{fmt(item.price,item.unit)}</div>
                    <div style={{fontSize:10,color:'#A89B7A'}}>{item.posted}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

/* ─── MARKET / BROWSE PAGE ───────────────────────────── */
const BrowsePage = ({onCatSelect}) => {
  const [selCat, setSelCat]   = useState('all');
  const [search, setSearch]   = useState('');
  const [modal, setModal]     = useState(false);

  const filtered = (() => {
    let list = selCat==='all' ? LISTINGS : LISTINGS.filter(l=>l.catId===selCat);
    if(search) list = list.filter(l=>l.name.toLowerCase().includes(search.toLowerCase())||l.seller.toLowerCase().includes(search.toLowerCase()));
    return list;
  })();

  const fmt = (p,u) => `$${Number(p.toFixed(2))}${u}`;

  return (
    <div style={{flex:1,overflowY:'auto',paddingBottom:90}} className="sh">
      {/* Header */}
      <header style={{padding:'18px 16px 10px',position:'sticky',top:0,zIndex:10,background:'#F5F1E0'}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:12}}>
          <div style={{fontFamily:'Fraunces,serif',fontSize:20,fontWeight:700}}>🏪 Market</div>
          <button onClick={()=>setModal(true)} className="btn-em" style={{display:'flex',alignItems:'center',gap:6,padding:'9px 15px',borderRadius:100,fontSize:12,boxShadow:'0 4px 14px rgba(26,107,53,0.3)'}}><Plus size={14} strokeWidth={2.6}/> Post</button>
        </div>
        {/* Search */}
        <div className="iwl" style={{display:'flex',alignItems:'center',gap:10,background:'#FFFDF0',border:'1px solid rgba(26,107,53,0.15)',borderRadius:15,padding:'11px 14px',marginBottom:10}}>
          <Search size={15} strokeWidth={2.3} style={{color:'#1A6B35',flexShrink:0}}/>
          <input type="text" className="lp" value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search listings…" style={{background:'transparent',border:'none',color:'#091408',fontSize:14,width:'100%',fontFamily:'DM Sans,sans-serif'}}/>
          {search&&<button onClick={()=>setSearch('')} style={{background:'transparent',border:'none',color:'#1A6B35',display:'flex'}}><X size={13}/></button>}
        </div>
        {/* Category chips */}
        <div style={{overflowX:'auto',display:'flex',gap:6,paddingBottom:4}} className="sh">
          <button onClick={()=>setSelCat('all')} style={{flexShrink:0,display:'flex',alignItems:'center',gap:5,padding:'6px 13px',borderRadius:100,fontSize:12,fontWeight:700,letterSpacing:'0.03em',background:selCat==='all'?'linear-gradient(135deg,#133B1C,#1A6B35)':'rgba(26,107,53,0.07)',color:selCat==='all'?'#F5F1E0':'#1A6B35',border:`1px solid ${selCat==='all'?'transparent':'rgba(26,107,53,0.18)'}`,boxShadow:selCat==='all'?'0 3px 12px rgba(26,107,53,0.35)':'none',whiteSpace:'nowrap',transition:'all .2s'}}>
            🌐 All
          </button>
          {CATS.map(c=>{
            const act=selCat===c.id;
            const count=LISTINGS.filter(l=>l.catId===c.id).length;
            return (
              <button key={c.id} onClick={()=>onCatSelect(c)} style={{flexShrink:0,display:'flex',alignItems:'center',gap:5,padding:'6px 11px',borderRadius:100,fontSize:11,fontWeight:600,background:act?c.c:'rgba(26,107,53,0.06)',color:act?'#F5F1E0':c.c,border:`1px solid ${act?'transparent':c.bg}`,whiteSpace:'nowrap',position:'relative'}}>
                <span>{c.emoji}</span><span>{c.name}</span>
                {count>0&&<span style={{background:act?'rgba(255,255,255,0.25)':'rgba(26,107,53,0.15)',borderRadius:100,padding:'0 5px',fontSize:9,fontWeight:700}}>{count}</span>}
              </button>
            );
          })}
        </div>
      </header>

      <div style={{padding:'8px 16px'}}>
        {/* Result count */}
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:12}}>
          <div style={{fontFamily:'Fraunces,serif',fontSize:16,fontWeight:700}}>
            {selCat==='all'?'All Listings':CATS.find(c=>c.id===selCat)?.name}
          </div>
          <div style={{fontSize:12,color:'#7A6B4A'}}>{filtered.length} item{filtered.length!==1?'s':''}</div>
        </div>

        {filtered.length===0 ? (
          <div style={{textAlign:'center',padding:'52px 24px'}}>
            <div style={{fontSize:52,marginBottom:16,animation:'floatSlow 4s ease-in-out infinite'}}>
              {selCat==='all'?'🏪':CATS.find(c=>c.id===selCat)?.emoji||'📦'}
            </div>
            <h2 style={{fontFamily:'Fraunces,serif',fontSize:22,fontWeight:700,marginBottom:8}}>
              {search?'Nothing found':'No listings for now'}
            </h2>
            <p style={{fontSize:14,color:'#7A6B4A',lineHeight:1.65,marginBottom:24}}>
              {search?`No results for "${search}"`:'Be the first to post something in this category.'}
            </p>
            {selCat!=='all'&&!search&&(
              <button onClick={()=>onCatSelect(CATS.find(c=>c.id===selCat))} style={{display:'flex',alignItems:'center',gap:7,background:'rgba(26,107,53,0.08)',border:'1px solid rgba(26,107,53,0.2)',borderRadius:100,padding:'10px 20px',margin:'0 auto 12px',color:'#1A6B35',fontWeight:700,fontSize:13}}>
                🔔 Follow {CATS.find(c=>c.id===selCat)?.name} — get notified
              </button>
            )}
            <button onClick={()=>setModal(true)} className="btn-em" style={{padding:'12px 28px',borderRadius:100,fontSize:13,boxShadow:'0 4px 14px rgba(26,107,53,0.3)'}}>
              + Post a Listing
            </button>
          </div>
        ) : (
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12}}>
            {filtered.map((item,i)=>(
              <div key={item.id} className={`cp s${Math.min(i+1,9)}`} style={{background:'#FFFDF0',borderRadius:18,overflow:'hidden',border:'1px solid rgba(26,107,53,0.07)',animation:'fadeUp .3s ease-out both'}}>
                <div style={{height:104,background:item.bg,display:'flex',alignItems:'center',justifyContent:'center',fontSize:46,position:'relative'}}>
                  {item.emoji}
                  {item.tag&&<div style={{position:'absolute',bottom:5,left:7,background:'#1A6B35',color:'#F5F1E0',fontSize:9,fontWeight:700,padding:'2px 7px',borderRadius:100}}>{item.tag}</div>}
                </div>
                <div style={{padding:'11px'}}>
                  <div style={{fontFamily:'Fraunces,serif',fontSize:13,fontWeight:700,lineHeight:1.3,marginBottom:2}}>{item.name}</div>
                  <div style={{fontSize:10,color:'#7A6B4A',marginBottom:6}}>{item.seller} · Unit {item.unit_}</div>
                  <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                    <div style={{fontFamily:'Fraunces,serif',fontSize:15,fontWeight:700,color:'#1A6B35'}}>{fmt(item.price,item.unit)}</div>
                    <div style={{fontSize:10,color:'#A89B7A'}}>{item.posted}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {modal&&(
        <div style={{position:'fixed',inset:0,zIndex:50,display:'flex',alignItems:'flex-end',justifyContent:'center',background:'rgba(9,20,8,0.6)',backdropFilter:'blur(4px)'}} onClick={()=>setModal(false)}>
          <div className="su" style={{width:'100%',maxWidth:440,background:'#F5F1E0',borderRadius:'26px 26px 0 0',padding:'24px 22px 44px'}} onClick={e=>e.stopPropagation()}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:14}}>
              <h3 style={{fontFamily:'Fraunces,serif',fontSize:20,fontWeight:700}}>Post a Listing</h3>
              <button onClick={()=>setModal(false)} className="btn-icon-teal" style={{width:34,height:34,borderRadius:10,display:'flex',alignItems:'center',justifyContent:'center'}}><X size={15}/></button>
            </div>
            <div style={{background:'linear-gradient(135deg,#C4E8C0,#E8F5E0)',borderRadius:16,padding:'14px',marginBottom:14,display:'flex',gap:10,alignItems:'center'}}>
              <span style={{fontSize:24}}>🌱</span><p style={{fontSize:13,color:'#1A5820',lineHeight:1.55,fontWeight:500}}>Listings go live on our launch day! We'll notify you first.</p>
            </div>
            <button onClick={()=>setModal(false)} className="btn-em" style={{width:'100%',padding:'15px',borderRadius:100,fontSize:14}}>Notify Me on Launch 🎉</button>
          </div>
        </div>
      )}
    </div>
  );
};


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

  const AuctionCard = ({a}) => {
    const cb=getBid(a); const cnt=getCnt(a); const urgent=a.endH<2&&a.status==='live';
    return (
      <div className="card-press" style={{background:'linear-gradient(145deg,#0F2214,#133B1C)',borderRadius:22,overflow:'hidden',marginBottom:12,boxShadow:'0 8px 32px rgba(9,20,8,0.35)'}}>
        {/* Item visual */}
        <div style={{position:'relative',height:140,display:'flex',alignItems:'center',justifyContent:'center',background:a.bg,overflow:'hidden'}}>
          <span style={{fontSize:70,filter:'drop-shadow(0 4px 16px rgba(0,0,0,0.2))',animation:'floatSlow 4s ease-in-out infinite'}}>{a.emoji}</span>
          {a.hot&&<div style={{position:'absolute',top:12,left:12,background:'#E85020',color:'#fff',fontSize:10,fontWeight:800,letterSpacing:'0.1em',padding:'4px 10px',borderRadius:100,animation:'urgentTick 1s ease-in-out infinite',boxShadow:'0 2px 10px rgba(232,80,32,0.5)'}}>🔥 HOT</div>}
          <div style={{position:'absolute',top:12,right:12,display:'flex',alignItems:'center',gap:5,background:'rgba(9,20,8,0.75)',borderRadius:100,padding:'5px 10px',backdropFilter:'blur(6px)'}}>
            <div style={{width:7,height:7,borderRadius:'50%',background:a.status==='live'?'#52B788':'#D4A520',animation:'livePulse 1.2s ease-in-out infinite'}}/>
            <span style={{fontSize:10,fontWeight:700,letterSpacing:'0.08em',color:a.status==='live'?'#52B788':'#D4A520'}}>{a.status==='live'?'LIVE':'REVIEW'}</span>
          </div>
        </div>
        {/* Content */}
        <div style={{padding:'16px'}}>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:4}}>
            <div style={{flex:1,marginRight:8}}>
              <h3 style={{fontFamily:'Fraunces,serif',fontSize:17,fontWeight:700,color:'#F5F1E0',lineHeight:1.2}}>{a.title}</h3>
              <p style={{fontSize:11,color:'rgba(245,241,224,0.5)',marginTop:2}}>{a.sub}</p>
            </div>
            {a.status==='live'&&(
              <div style={{textAlign:'right',flexShrink:0}}>
                <div style={{fontSize:10,color:urgent?'#FF7050':'rgba(245,241,224,0.4)',fontWeight:600,letterSpacing:'0.06em',animation:urgent?'urgentTick 1s ease-in-out infinite':'none'}}>
                  ⏱ {a.endH}h {a.endM}m
                </div>
              </div>
            )}
            {a.status==='review'&&(
              <div style={{background:'rgba(212,165,32,0.12)',border:'1px solid rgba(212,165,32,0.25)',borderRadius:8,padding:'4px 10px'}}>
                <div style={{fontSize:9,color:'#D4A520',fontWeight:700}}>DAY {a.reviewDays}/3</div>
                <div style={{fontSize:8,color:'rgba(212,165,32,0.6)'}}>REVIEWING</div>
              </div>
            )}
          </div>

          {a.status==='live'?(
            <>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',background:'rgba(255,255,255,0.04)',borderRadius:12,padding:'10px 14px',margin:'12px 0',animation:flash[a.id]?'bidFlash 0.5s ease-out':'none',transition:'all .3s'}}>
                <div>
                  <div style={{fontSize:10,color:'rgba(245,241,224,0.4)',fontWeight:600,letterSpacing:'0.08em'}}>CURRENT BID</div>
                  <div style={{fontFamily:'Fraunces,serif',fontSize:22,fontWeight:900,color:'#F5D860',lineHeight:1.1}}>${cb.toLocaleString()}</div>
                </div>
                <div style={{textAlign:'right'}}>
                  <div style={{fontSize:10,color:'rgba(245,241,224,0.4)',fontWeight:600,letterSpacing:'0.08em'}}>BIDS</div>
                  <div style={{fontFamily:'Fraunces,serif',fontSize:22,fontWeight:900,color:'#52B788',lineHeight:1.1}}>{cnt}</div>
                </div>
              </div>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                <div style={{display:'flex',alignItems:'center',gap:6}}>
                  <span style={{fontSize:14}}>{a.status==='live'?'👤':''}</span>
                  <div>
                    <div style={{fontSize:11,color:'rgba(245,241,224,0.5)'}}>by {a.seller}</div>
                    <div style={{display:'flex',alignItems:'center',gap:3}}><Stars rating={a.sRating} size={10}/><span style={{fontSize:10,color:'rgba(245,241,224,0.4)'}}>({a.sSales})</span></div>
                  </div>
                </div>
                <button onClick={()=>{setBidModal(a);setBidAmt('');}} className="btn-gold" style={{padding:'10px 20px',borderRadius:100,fontSize:13,boxShadow:'0 4px 14px rgba(212,165,32,0.35)'}}>
                  Place Bid
                </button>
              </div>
            </>
          ):(
            <div style={{marginTop:10}}>
              <div style={{background:'rgba(212,165,32,0.08)',border:'1px dashed rgba(212,165,32,0.25)',borderRadius:12,padding:'12px',marginBottom:12}}>
                <div style={{fontSize:11,color:'rgba(212,165,32,0.7)',fontWeight:600,marginBottom:4}}>📋 Under Expert Review</div>
                <div style={{fontSize:12,color:'rgba(245,241,224,0.5)',lineHeight:1.5}}>Starting bid: <strong style={{color:'#F5D860'}}>${a.startBid.toLocaleString()}</strong> · Submitted {a.reviewDays} day{a.reviewDays>1?'s':''} ago · Est. 1-3 days</div>
              </div>
              <div style={{fontSize:11,color:'rgba(245,241,224,0.35)',lineHeight:1.5}}>{a.desc}</div>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div style={{flex:1,overflowY:'auto',paddingBottom:80}} className="sh">
      {/* Header */}
      <div style={{background:'linear-gradient(135deg,#091408,#133B1C)',padding:'22px 16px 16px',position:'sticky',top:0,zIndex:10}}>
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:14}}>
          <div>
            <div style={{display:'flex',alignItems:'center',gap:8}}>
              <div style={{width:8,height:8,borderRadius:'50%',background:'#52B788',animation:'livePulse 1.2s ease-in-out infinite'}}/>
              <span style={{fontSize:10,fontWeight:700,letterSpacing:'0.14em',color:'#52B788'}}>LIVE BIDDING</span>
            </div>
            <h1 style={{fontFamily:'Fraunces,serif',fontSize:26,fontWeight:900,color:'#F5F1E0',lineHeight:1.1,marginTop:2}}>
              ⚡ <span className="text-gold">Auctions</span>
            </h1>
          </div>
          <button onClick={()=>setSubmitOpen(true)} className="btn-gold" style={{padding:'9px 16px',borderRadius:100,fontSize:12,boxShadow:'0 4px 14px rgba(212,165,32,0.35)'}}>+ Submit Item</button>
        </div>
        {/* Filter tabs */}
        <div style={{display:'flex',gap:6}}>
          {[['all','All Live'],['ending','Ending Soon'],['review','Under Review']].map(([id,l])=>(
            <button key={id} onClick={()=>setFilter(id)} style={{padding:'7px 14px',borderRadius:100,fontSize:12,fontWeight:600,background:filter===id?'rgba(212,165,32,0.2)':'rgba(255,255,255,0.05)',border:`1px solid ${filter===id?'rgba(212,165,32,0.5)':'rgba(255,255,255,0.08)'}`,color:filter===id?'#F5D860':'rgba(245,241,224,0.5)'}}>
              {l} {id==='ending'&&urgent.length>0&&<span style={{background:'#E85020',borderRadius:100,padding:'0 5px',fontSize:10}}>{urgent.length}</span>}
            </button>
          ))}
        </div>
      </div>

      <div style={{padding:'14px 16px'}}>
        {display.length===0&&<div style={{textAlign:'center',padding:'48px 24px',color:'rgba(245,241,224,0.4)'}}>
          <div style={{fontSize:40,marginBottom:12}}>📭</div>
          <div style={{fontFamily:'Fraunces,serif',fontSize:18,color:'#F5F1E0'}}>Nothing here yet</div>
          <p style={{fontSize:13,marginTop:6}}>Check back soon!</p>
        </div>}
        {display.map(a=><AuctionCard key={a.id} a={a}/>)}
      </div>

      {/* BID MODAL */}
      {bidModal&&(
        <div style={{position:'fixed',inset:0,zIndex:50,display:'flex',alignItems:'flex-end',justifyContent:'center',background:'rgba(9,20,8,0.7)',backdropFilter:'blur(6px)'}} onClick={()=>{if(!bidDone){setBidModal(null);setBidAmt('');}}}>
          <div className="su" style={{width:'100%',maxWidth:440,background:'linear-gradient(145deg,#0F2214,#133B1C)',borderRadius:'26px 26px 0 0',padding:'26px 22px 44px'}} onClick={e=>e.stopPropagation()}>
            {bidDone?(
              <div style={{textAlign:'center',padding:'20px 0'}}>
                <div style={{fontSize:56,marginBottom:12,animation:'scaleIn .4s cubic-bezier(0.34,1.56,0.64,1)'}}>🥇</div>
                <h2 style={{fontFamily:'Fraunces,serif',fontSize:24,fontWeight:700,color:'#F5D860',marginBottom:8}}>You're the highest bidder!</h2>
                <p style={{fontSize:14,color:'rgba(245,241,224,0.55)'}}>We'll notify you if you're outbid.</p>
              </div>
            ):(
              <>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:18}}>
                  <h3 style={{fontFamily:'Fraunces,serif',fontSize:20,fontWeight:700,color:'#F5F1E0'}}>Place Your Bid</h3>
                  <button onClick={()=>{setBidModal(null);setBidAmt('');}} style={{background:'rgba(255,255,255,0.07)',border:'none',width:34,height:34,borderRadius:10,display:'flex',alignItems:'center',justifyContent:'center',color:'rgba(245,241,224,0.6)'}}><X size={16}/></button>
                </div>
                <div style={{background:'rgba(255,255,255,0.04)',borderRadius:14,padding:'14px',marginBottom:18,display:'flex',gap:12,alignItems:'center'}}>
                  <div style={{width:48,height:48,borderRadius:12,background:bidModal.bg,display:'flex',alignItems:'center',justifyContent:'center',fontSize:26,flexShrink:0}}>{bidModal.emoji}</div>
                  <div>
                    <div style={{fontFamily:'Fraunces,serif',fontSize:15,fontWeight:700,color:'#F5F1E0'}}>{bidModal.title}</div>
                    <div style={{display:'flex',gap:12,marginTop:4}}>
                      <span style={{fontSize:11,color:'#F5D860',fontWeight:700}}>Current: ${getBid(bidModal).toLocaleString()}</span>
                      <span style={{fontSize:11,color:'rgba(245,241,224,0.4)'}}>{getCnt(bidModal)} bids · {bidModal.endH}h {bidModal.endM}m</span>
                    </div>
                  </div>
                </div>
                <label style={{display:'block',fontSize:10,fontWeight:700,letterSpacing:'0.1em',color:'rgba(212,165,32,0.55)',marginBottom:7}}>YOUR BID (min. ${(getBid(bidModal)+50).toLocaleString()})</label>
                <div className="inp-wrap" style={{display:'flex',alignItems:'center',gap:10,background:'rgba(255,255,255,0.05)',border:'1px solid rgba(212,165,32,0.2)',borderRadius:14,padding:'14px 16px',marginBottom:16}}>
                  <span style={{fontFamily:'Fraunces,serif',fontSize:20,fontWeight:700,color:'#D4A520',flexShrink:0}}>$</span>
                  <input type="number" value={bidAmt} onChange={e=>setBidAmt(e.target.value)} placeholder={(getBid(bidModal)+50).toString()} style={{background:'transparent',border:'none',color:'#F5F1E0',fontSize:18,fontFamily:'Fraunces,serif',fontWeight:700,width:'100%'}}/>
                </div>
                <button onClick={placeBid} className="btn-gold" style={{width:'100%',padding:'17px',borderRadius:100,fontSize:15,boxShadow:'0 6px 24px rgba(212,165,32,0.35)'}}>
                  Confirm Bid →
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {/* SUBMIT AUCTION MODAL */}
      {submitOpen&&(
        <div style={{position:'fixed',inset:0,zIndex:50,display:'flex',alignItems:'flex-end',justifyContent:'center',background:'rgba(9,20,8,0.7)',backdropFilter:'blur(6px)'}} onClick={()=>setSubmitOpen(false)}>
          <div className="su" style={{width:'100%',maxWidth:440,background:'linear-gradient(145deg,#0F2214,#133B1C)',borderRadius:'26px 26px 0 0',padding:'26px 22px 44px',maxHeight:'90vh',overflowY:'auto'}} onClick={e=>e.stopPropagation()}>
            {submitDone?(
              <div style={{textAlign:'center',padding:'30px 0'}}>
                <div style={{fontSize:60,marginBottom:12,animation:'float 2s ease-in-out infinite'}}>📋</div>
                <h2 style={{fontFamily:'Fraunces,serif',fontSize:24,fontWeight:700,color:'#F5D860',marginBottom:8}}>Submitted for Review!</h2>
                <p style={{fontSize:14,color:'rgba(245,241,224,0.55)',lineHeight:1.6}}>Our team will review your item within 1-3 days.<br/>You'll be notified once bidding opens.</p>
              </div>
            ):(
              <>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:6}}>
                  <h3 style={{fontFamily:'Fraunces,serif',fontSize:20,fontWeight:700,color:'#F5F1E0'}}>{submitStep===1?'Item Details':'Pricing & Duration'}</h3>
                  <button onClick={()=>setSubmitOpen(false)} style={{background:'rgba(255,255,255,0.07)',border:'none',width:34,height:34,borderRadius:10,display:'flex',alignItems:'center',justifyContent:'center',color:'rgba(245,241,224,0.6)'}}><X size={16}/></button>
                </div>
                <div style={{display:'flex',gap:6,marginBottom:20}}>
                  {[1,2].map(n=><div key={n} style={{flex:1,height:3,borderRadius:100,background:'rgba(212,165,32,0.12)',overflow:'hidden'}}><div style={{height:'100%',background:'linear-gradient(90deg,#B88A10,#F5D860)',width:n<=submitStep?'100%':'0%',transition:'width .4s'}}/></div>)}
                </div>
                {submitStep===1?(
                  <>
                    <label style={{display:'block',fontSize:10,fontWeight:700,letterSpacing:'.1em',color:'rgba(212,165,32,0.55)',marginBottom:6}}>ITEM NAME</label>
                    <DarkField value={form.title} onChange={e=>setF('title',e.target.value)} placeholder="e.g. Vintage Rolex Submariner"/>
                    <label style={{display:'block',fontSize:10,fontWeight:700,letterSpacing:'.1em',color:'rgba(212,165,32,0.55)',marginBottom:6,marginTop:4}}>CATEGORY</label>
                    <div className="inp-wrap" style={{background:'rgba(255,255,255,0.04)',border:'1px solid rgba(212,165,32,0.18)',borderRadius:14,padding:'14px 16px',marginBottom:12}}>
                      <select value={form.cat} onChange={e=>setF('cat',e.target.value)} style={{background:'transparent',border:'none',color:form.cat?'#F5F1E0':'rgba(245,241,224,0.35)',fontSize:15,width:'100%',fontFamily:'DM Sans,sans-serif'}}>
                        <option value="" style={{background:'#133B1C'}}>Select category…</option>
                        {CATS.map(c=><option key={c.id} value={c.id} style={{background:'#133B1C'}}>{c.emoji} {c.name}</option>)}
                      </select>
                    </div>
                    <label style={{display:'block',fontSize:10,fontWeight:700,letterSpacing:'.1em',color:'rgba(212,165,32,0.55)',marginBottom:6,marginTop:4}}>DESCRIPTION</label>
                    <div className="inp-wrap" style={{background:'rgba(255,255,255,0.04)',border:'1px solid rgba(212,165,32,0.18)',borderRadius:14,padding:'14px 16px',marginBottom:12}}>
                      <textarea value={form.desc} onChange={e=>setF('desc',e.target.value)} placeholder="Describe the item in detail — condition, provenance, inclusions…" rows={3} style={{background:'transparent',border:'none',color:'#F5F1E0',fontSize:14,width:'100%',fontFamily:'DM Sans,sans-serif',resize:'none'}}/>
                    </div>
                    <button onClick={()=>setSubmitStep(2)} disabled={!form.title||!form.cat} className="btn-gold" style={{width:'100%',padding:'16px',borderRadius:100,fontSize:15,boxShadow:'0 6px 24px rgba(212,165,32,0.3)',opacity:(!form.title||!form.cat)?0.5:1}}>Continue →</button>
                  </>
                ):(
                  <>
                    <label style={{display:'block',fontSize:10,fontWeight:700,letterSpacing:'.1em',color:'rgba(212,165,32,0.55)',marginBottom:6}}>STARTING BID ($)</label>
                    <DarkField type="number" value={form.startBid} onChange={e=>setF('startBid',e.target.value)} placeholder="e.g. 500"/>
                    <label style={{display:'block',fontSize:10,fontWeight:700,letterSpacing:'.1em',color:'rgba(212,165,32,0.55)',marginBottom:6,marginTop:4}}>RESERVE PRICE ($) — Optional</label>
                    <DarkField type="number" value={form.reserve} onChange={e=>setF('reserve',e.target.value)} placeholder="Minimum you'll accept"/>
                    <label style={{display:'block',fontSize:10,fontWeight:700,letterSpacing:'.1em',color:'rgba(212,165,32,0.55)',marginBottom:10,marginTop:4}}>AUCTION DURATION</label>
                    <div style={{display:'flex',gap:8,marginBottom:20}}>
                      {[['24','24h'],['48','48h'],['72','72h']].map(([v,l])=>(
                        <button key={v} onClick={()=>setF('duration',v)} style={{flex:1,padding:'12px',borderRadius:14,background:form.duration===v?'rgba(212,165,32,0.15)':'rgba(255,255,255,0.04)',border:`1.5px solid ${form.duration===v?'#D4A520':'rgba(212,165,32,0.12)'}`,color:form.duration===v?'#F5D860':'rgba(245,241,224,0.5)',fontWeight:700,fontSize:14}}>
                          {l}
                        </button>
                      ))}
                    </div>
                    <div style={{background:'rgba(82,183,136,0.1)',border:'1px solid rgba(82,183,136,0.2)',borderRadius:12,padding:'12px',marginBottom:16,fontSize:12,color:'rgba(82,183,136,0.8)',lineHeight:1.6}}>
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

/* ══════════════════════════════════════════════════════
   SELLERS PAGE
══════════════════════════════════════════════════════ */
const SellersPage = () => {
  const [active, setActive] = useState(null);
  const [profileTab, setProfileTab] = useState('reviews');
  const [search, setSearch] = useState('');
  const seller = SELLERS.find(s=>s.id===active);
  const reviews = active ? (TESTIMONIALS[active]||[]) : [];
  const avgRating = reviews.length ? (reviews.reduce((s,r)=>s+r.rating,0)/reviews.length).toFixed(1) : null;

  if(active&&seller) return (
    <div style={{flex:1,overflowY:'auto',paddingBottom:80}} className="sh">
      {/* Profile header */}
      <div style={{background:'linear-gradient(135deg,#133B1C,#1A6B35)',padding:'20px 16px 24px',position:'relative',overflow:'hidden'}}>
        <Particles/>
        <button onClick={()=>setActive(null)} style={{background:'rgba(245,241,224,0.12)',border:'none',width:36,height:36,borderRadius:11,display:'flex',alignItems:'center',justifyContent:'center',color:'#F5F1E0',marginBottom:16,position:'relative',zIndex:1}}><ArrowLeft size={17} strokeWidth={2.3}/></button>
        <div style={{display:'flex',gap:14,alignItems:'center',position:'relative',zIndex:1}}>
          <div style={{width:64,height:64,borderRadius:20,background:'#F5F1E0',display:'flex',alignItems:'center',justifyContent:'center',fontSize:32,flexShrink:0,boxShadow:'0 4px 16px rgba(0,0,0,0.3)'}}>{seller.avatar}</div>
          <div>
            <div style={{fontFamily:'Fraunces,serif',fontSize:22,fontWeight:700,color:'#F5F1E0'}}>{seller.name}</div>
            <div style={{display:'flex',alignItems:'center',gap:6,marginTop:2}}>
              <Stars rating={seller.rating} size={13}/>
              <span style={{fontSize:12,fontWeight:700,color:'#F5D860'}}>{seller.rating}</span>
            </div>
            <div style={{display:'flex',gap:6,marginTop:6}}>
              <span style={{background:seller.badge==='Perfect Rating'?'rgba(212,165,32,0.25)':'rgba(82,183,136,0.2)',border:`1px solid ${seller.badge==='Perfect Rating'?'rgba(212,165,32,0.5)':'rgba(82,183,136,0.4)'}`,borderRadius:100,padding:'3px 10px',fontSize:10,fontWeight:700,color:seller.badge==='Perfect Rating'?'#F5D860':'#52B788'}}>
                {seller.badge==='Top Seller'?'🏆':seller.badge==='Power Seller'?'⚡':seller.badge==='Perfect Rating'?'⭐':seller.badge==='Verified'?'✓':''} {seller.badge}
              </span>
            </div>
          </div>
        </div>
        <div style={{display:'flex',gap:0,marginTop:20,background:'rgba(255,255,255,0.06)',borderRadius:14,position:'relative',zIndex:1}}>
          {[['Sales',seller.sales],[avgRating||'—','Rating'],['Since',seller.since.split(' ')[0]]].map(([v,l])=>(
            <div key={l} style={{flex:1,textAlign:'center',padding:'10px 4px',borderRight:'1px solid rgba(255,255,255,0.06)'}}>
              <div style={{fontFamily:'Fraunces,serif',fontSize:18,fontWeight:700,color:'#F5D860'}}>{v}</div>
              <div style={{fontSize:10,color:'rgba(245,241,224,0.45)',fontWeight:500,marginTop:2}}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{padding:'16px'}}>
        <p style={{fontSize:13,color:'#5A6050',lineHeight:1.6,marginBottom:16,background:'#F0ECD8',borderRadius:14,padding:'12px 14px',border:'1px solid rgba(26,107,53,0.1)'}}>{seller.bio}</p>

        {/* Tabs */}
        <div style={{display:'flex',gap:6,marginBottom:16}}>
          {['reviews','listings','auctions'].map(t=>(
            <button key={t} onClick={()=>setProfileTab(t)} style={{flex:1,padding:'9px 4px',borderRadius:100,fontSize:12,fontWeight:600,background:profileTab===t?'#1A6B35':'rgba(26,107,53,0.08)',color:profileTab===t?'#F5F1E0':'#1A6B35',border:'none',textTransform:'capitalize'}}>
              {t==='reviews'?`Reviews (${reviews.length})`:t==='listings'?'Listings':'Auctions'}
            </button>
          ))}
        </div>

        {/* REVIEWS TAB */}
        {profileTab==='reviews'&&(
          <div>
            {/* Rating summary */}
            {reviews.length>0&&(
              <div style={{background:'#FFFDF0',borderRadius:18,padding:'16px',marginBottom:14,border:'1px solid rgba(212,165,32,0.15)'}}>
                <div style={{display:'flex',gap:16,alignItems:'center'}}>
                  <div style={{textAlign:'center'}}>
                    <div style={{fontFamily:'Fraunces,serif',fontSize:42,fontWeight:900,color:'#D4A520',lineHeight:1}}>{avgRating}</div>
                    <Stars rating={parseFloat(avgRating)} size={16}/>
                    <div style={{fontSize:11,color:'#7A6B4A',marginTop:4}}>{reviews.length} reviews</div>
                  </div>
                  <div style={{flex:1}}>
                    {[5,4,3].map(n=>{
                      const cnt=reviews.filter(r=>r.rating===n).length;
                      const pct=Math.round(cnt/reviews.length*100);
                      return <div key={n} style={{display:'flex',alignItems:'center',gap:8,marginBottom:4}}>
                        <span style={{fontSize:11,color:'#D4A520',width:8,fontWeight:700}}>{n}</span>
                        <div style={{flex:1,height:6,borderRadius:100,background:'rgba(212,165,32,0.12)',overflow:'hidden'}}><div style={{height:'100%',borderRadius:100,background:'linear-gradient(90deg,#B88A10,#D4A520)',width:`${pct}%`,transition:'width .6s'}}/></div>
                        <span style={{fontSize:10,color:'#7A6B4A',width:28,textAlign:'right'}}>{pct}%</span>
                      </div>;
                    })}
                  </div>
                </div>
              </div>
            )}
            {reviews.map((r,i)=>(
              <div key={r.id} className={`s${Math.min(i+1,9)}`} style={{background:'#FFFDF0',borderRadius:16,padding:'14px',marginBottom:10,border:'1px solid rgba(26,107,53,0.08)',animation:'fadeUp .4s ease-out both'}}>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:8}}>
                  <div>
                    <Stars rating={r.rating} size={13}/>
                    <div style={{fontFamily:'Fraunces,serif',fontSize:13,fontWeight:600,color:'#091408',marginTop:2}}>{r.reviewer}</div>
                  </div>
                  <div style={{textAlign:'right'}}>
                    <div style={{fontSize:10,color:'#7A6B4A'}}>{r.date}</div>
                    {r.verified&&<div style={{display:'flex',alignItems:'center',gap:3,justifyContent:'flex-end',marginTop:2}}><Check size={10} style={{color:'#1A6B35'}}/><span style={{fontSize:9,color:'#1A6B35',fontWeight:600}}>Verified Buyer</span></div>}
                  </div>
                </div>
                <p style={{fontSize:13,color:'#3A4030',lineHeight:1.6,fontStyle:'italic'}}>"{r.text}"</p>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginTop:10,paddingTop:8,borderTop:'1px solid rgba(26,107,53,0.07)'}}>
                  <span style={{fontSize:11,color:'#7A6B4A'}}>Item: <strong>{r.item}</strong></span>
                  <div style={{display:'flex',alignItems:'center',gap:4}}>
                    <span style={{fontSize:10,color:'#7A6B4A'}}>👍 {r.helpful} helpful</span>
                  </div>
                </div>
              </div>
            ))}
            {reviews.length===0&&<div style={{textAlign:'center',padding:'32px',color:'#7A6B4A'}}><div style={{fontSize:32,marginBottom:8}}>💬</div><p>No reviews yet</p></div>}
          </div>
        )}
        {(profileTab==='listings'||profileTab==='auctions')&&(
          <div style={{textAlign:'center',padding:'48px 24px'}}>
            <div style={{fontSize:40,marginBottom:12,animation:'floatSlow 4s ease-in-out infinite'}}>{profileTab==='listings'?'📦':'⚡'}</div>
            <div style={{fontFamily:'Fraunces,serif',fontSize:18,fontWeight:600,color:'#091408',marginBottom:6}}>No {profileTab} yet</div>
            <p style={{fontSize:13,color:'#7A6B4A'}}>Check back soon — {seller.name.split(' ')[0]} is preparing new items.</p>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div style={{flex:1,overflowY:'auto',paddingBottom:80}} className="sh">
      <div style={{background:'linear-gradient(135deg,#0F2214,#133B1C)',padding:'22px 16px 18px',position:'sticky',top:0,zIndex:10}}>
        <h1 style={{fontFamily:'Fraunces,serif',fontSize:26,fontWeight:900,color:'#F5F1E0',marginBottom:12}}>🌟 <span className="text-gold">Sellers</span></h1>
        <div style={{display:'flex',alignItems:'center',gap:10,background:'rgba(255,255,255,0.05)',border:'1px solid rgba(212,165,32,0.15)',borderRadius:14,padding:'12px 14px'}}>
          <Search size={15} strokeWidth={2.3} style={{color:'rgba(212,165,32,0.6)',flexShrink:0}}/>
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search sellers…" style={{background:'transparent',border:'none',color:'#F5F1E0',fontSize:14,width:'100%',fontFamily:'DM Sans,sans-serif'}}/>
        </div>
      </div>
      <div style={{padding:'14px 16px'}}>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10}}>
          {SELLERS.filter(s=>!search||s.name.toLowerCase().includes(search.toLowerCase())).map((s,i)=>(
            <button key={s.id} onClick={()=>{setActive(s.id);setProfileTab('reviews');}} className={`card-press s${i+1}`} style={{background:'#FFFDF0',borderRadius:18,padding:'16px',textAlign:'left',border:'1px solid rgba(26,107,53,0.1)',animation:'fadeUp .4s ease-out both'}}>
              <div style={{width:44,height:44,borderRadius:14,background:'linear-gradient(135deg,#C4E8C0,#A8D8A0)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:22,marginBottom:10}}>{s.avatar}</div>
              <div style={{fontFamily:'Fraunces,serif',fontSize:15,fontWeight:700,color:'#091408',marginBottom:2}}>{s.name}</div>
              <div style={{display:'flex',alignItems:'center',gap:4,marginBottom:6}}>
                <Stars rating={s.rating} size={11}/>
                <span style={{fontSize:11,fontWeight:700,color:'#D4A520'}}>{s.rating}</span>
              </div>
              <div style={{fontSize:10,color:'#7A6B4A',marginBottom:8}}>{s.sales} sales · Unit {s.unit}</div>
              <div style={{background:s.badge==='Top Seller'||s.badge==='Power Seller'?'rgba(212,165,32,0.12)':'rgba(26,107,53,0.1)',borderRadius:100,padding:'3px 8px',display:'inline-block'}}>
                <span style={{fontSize:9,fontWeight:700,color:s.badge==='Perfect Rating'?'#D4A520':s.badge==='Top Seller'||s.badge==='Power Seller'?'#B88A10':'#1A6B35'}}>{s.badge}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

/* ══════════════════════════════════════════════════════
   HOME PAGE
══════════════════════════════════════════════════════ */
const HomePage = ({isSeller, onNav, onCatSelect}) => {
  const h = new Date().getHours();
  const totalRev = MY_LISTINGS.filter(l=>l.status==='sold').reduce((s,l)=>s+(l.soldFor||0),0);
  const totalClk = MY_LISTINGS.reduce((s,l)=>s+l.clicks,0);
  const liveCount = MY_LISTINGS.filter(l=>l.status==='live').length;
  return (
    <div style={{flex:1,overflowY:'auto',paddingBottom:90}} className="sh">
      <div style={{background:'linear-gradient(135deg,#133B1C,#1A6B35)',padding:'22px 16px 20px',position:'relative',overflow:'hidden'}}>
        <Particles/>
        <div style={{position:'relative',zIndex:1}}>
          <div style={{fontSize:10,color:'rgba(245,241,224,0.55)',fontWeight:600,letterSpacing:'0.1em',marginBottom:4}}>
            {h<12?'🌅':h<18?'☀️':'🌙'} {h<12?'GOOD MORNING':h<18?'GOOD AFTERNOON':'GOOD EVENING'}, NEIGHBOR
          </div>
          <div style={{fontFamily:'Fraunces,serif',fontSize:26,fontWeight:900,color:'#F5F1E0',lineHeight:1.1}}>Welcome to<br/><span className="tg">G-Tribes.</span></div>
          <p style={{fontSize:12,color:'rgba(245,241,224,0.55)',marginTop:8}}>320 members · 18 categories · 5 live auctions</p>
        </div>
        <div aria-hidden style={{position:'absolute',right:-10,bottom:-10,fontSize:90,opacity:.85,animation:'floatSlow 5s ease-in-out infinite',pointerEvents:'none'}}>🌿</div>
      </div>
      {isSeller&&(
        <div style={{margin:'14px 16px 0',background:'#FFFDF0',borderRadius:18,border:'1px solid rgba(212,165,32,0.15)',overflow:'hidden'}}>
          <div style={{background:'rgba(26,107,53,0.06)',padding:'10px 14px',display:'flex',alignItems:'center',gap:6,borderBottom:'1px solid rgba(26,107,53,0.08)'}}>
            <span style={{fontSize:14}}>💼</span><span style={{fontSize:12,fontWeight:700,color:'#1A6B35'}}>Your Stall</span>
            <button onClick={()=>onNav('settings')} style={{marginLeft:'auto',background:'transparent',border:'none',color:'#1A6B35',fontSize:12,fontWeight:600,display:'flex',alignItems:'center',gap:2}}>Manage <ChevronRight size={13}/></button>
          </div>
          <div style={{display:'flex'}}>
            {[['$'+totalRev.toLocaleString(),'Revenue'],[`${liveCount}`,'Live Now'],[totalClk.toLocaleString(),'Views'],['4.9 ★','Rating']].map(([v,l],i)=>(
              <div key={l} style={{flex:1,textAlign:'center',padding:'12px 4px',borderRight:i<3?'1px solid rgba(26,107,53,0.07)':'none'}}>
                <div style={{fontFamily:'Fraunces,serif',fontSize:15,fontWeight:700,color:l==='Live Now'?'#1A6B35':l==='Rating'?'#D4A520':'#091408'}}>{v}</div>
                <div style={{fontSize:9,color:'#7A6B4A',fontWeight:500,marginTop:2}}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      )}
      <div style={{margin:'12px 16px 0',display:'flex',gap:8}}>
        {[['🔴 LIVE','5 Auctions running',()=>onNav('auctions'),'rgba(232,80,32,0.1)','#E85020'],['🌱 NEW','3 farm listings',()=>onNav('browse'),'rgba(26,107,53,0.1)','#1A6B35']].map(([badge,label,fn,bg,c])=>(
          <button key={badge} onClick={fn} className="cp" style={{flex:1,background:bg,border:`1px solid ${c}40`,borderRadius:14,padding:'10px 12px',textAlign:'left',boxShadow:`0 2px 10px ${c}20`,transition:'all .2s'}}>
            <div style={{fontSize:10,fontWeight:700,color:c,letterSpacing:'0.08em',marginBottom:3}}>{badge}</div>
            <div style={{fontSize:12,fontWeight:600,color:'#091408'}}>{label}</div>
          </button>
        ))}
      </div>
      <div style={{padding:'16px 16px 0'}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'baseline',marginBottom:10}}>
          <div style={{fontFamily:'Fraunces,serif',fontSize:18,fontWeight:700}}>Quick Browse</div>
          <button onClick={()=>onNav('browse')} style={{background:'transparent',border:'none',fontSize:12,fontWeight:600,color:'#1A6B35',display:'flex',alignItems:'center',gap:2}}>All <ChevronRight size={13}/></button>
        </div>
        <button onClick={()=>onCatSelect(CATS.find(c=>c.id==='farm'))} className="cp" style={{width:'100%',background:'linear-gradient(135deg,#C4E8C0,#A8D8A0)',border:'none',borderRadius:20,padding:'18px',textAlign:'left',display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:8,boxShadow:'0 4px 16px rgba(26,88,32,0.15)'}}>
          <div><div style={{fontSize:10,fontWeight:700,letterSpacing:'0.12em',color:'#1A5820',marginBottom:4}}>✦ COMMUNITY FARM</div><div style={{fontFamily:'Fraunces,serif',fontSize:20,fontWeight:700,color:'#1A5820'}}>Farm Fresh</div></div>
          <span style={{fontSize:50,lineHeight:1,animation:'floatSlow 4s ease-in-out infinite'}}>🌾</span>
        </button>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:8,marginBottom:16}}>
          {CATS.filter(c=>c.id!=='farm').slice(0,6).map((c,i)=>(
            <button key={c.id} onClick={()=>onCatSelect(c)} className={`cp s${i+1}`} style={{background:c.bg,border:'none',borderRadius:14,padding:'12px 6px',display:'flex',flexDirection:'column',alignItems:'center',gap:4,animation:'fadeUp .4s ease-out both'}}>
              <span style={{fontSize:24}}>{c.emoji}</span><span style={{fontSize:10,fontWeight:700,color:c.c,textAlign:'center',lineHeight:1.2}}>{c.name}</span>
            </button>
          ))}
        </div>
      </div>
      <div style={{padding:'0 16px 0'}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'baseline',marginBottom:10}}>
          <div style={{fontFamily:'Fraunces,serif',fontSize:18,fontWeight:700}}>⚡ Auction Spotlight</div>
          <button onClick={()=>onNav('auctions')} style={{background:'transparent',border:'none',fontSize:12,fontWeight:600,color:'#D4A520',display:'flex',alignItems:'center',gap:2}}>All <ChevronRight size={13}/></button>
        </div>
        <div style={{overflowX:'auto',display:'flex',gap:10,paddingBottom:4}} className="sh">
          {AUCTION_BASE.filter(a=>a.status==='live').slice(0,3).map(a=>(
            <button key={a.id} onClick={()=>onNav('auctions')} className="cp" style={{flexShrink:0,width:150,background:'linear-gradient(145deg,#0F2214,#133B1C)',borderRadius:18,overflow:'hidden',border:'none',textAlign:'left'}}>
              <div style={{height:72,background:a.bg,display:'flex',alignItems:'center',justifyContent:'center',fontSize:34,position:'relative'}}>
                {a.emoji}{a.hot&&<div style={{position:'absolute',top:4,right:4,width:7,height:7,borderRadius:'50%',background:'#E85020',animation:'livePulse 1s ease-in-out infinite'}}/>}
              </div>
              <div style={{padding:'9px'}}>
                <div style={{fontSize:11,fontWeight:700,color:'#F5F1E0',lineHeight:1.3,marginBottom:3}}>{a.title}</div>
                <div style={{fontFamily:'Fraunces,serif',fontSize:14,fontWeight:700,color:'#F5D860'}}>${a.currentBid.toLocaleString()}</div>
                <div style={{fontSize:10,color:'rgba(245,241,224,0.4)',marginTop:2}}>{a.endH}h {a.endM}m · {a.bids} bids</div>
              </div>
            </button>
          ))}
        </div>
      </div>
      <div style={{padding:'14px 16px 6px'}}>
        <div style={{background:'linear-gradient(135deg,#091408,#133B1C)',borderRadius:22,padding:'20px',textAlign:'center',color:'#F5F1E0'}}>
          <div style={{fontSize:26,marginBottom:8,animation:'float 3s ease-in-out infinite'}}>📣</div>
          <div style={{fontFamily:'Fraunces,serif',fontSize:16,fontWeight:700,marginBottom:4}}>Invite your neighbors</div>
          <p style={{fontSize:12,color:'rgba(245,241,224,0.48)',marginBottom:12}}>The more members, the better the marketplace.</p>
          <button className="btn-gold" style={{padding:'10px 22px',borderRadius:100,fontSize:13}}>Share G-Tribes</button>
        </div>
      </div>
    </div>
  );
};

/* ══════════════════════════════════════════════════════
   SETTINGS / SELLER DASHBOARD
══════════════════════════════════════════════════════ */
const SettingsPage = ({isSeller, setIsSeller, onSignOut}) => {
  const [sellerTab, setSellerTab] = useState('live');
  const [onboarding, setOnboarding] = useState(false);
  const [setupName, setSetupName] = useState('');
  const [setupBio, setSetupBio] = useState('');
  const [setupDone, setSetupDone] = useState(false);
  const [notif, setNotif] = useState(true);

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
    <div style={{background:dim?'#F5F0E4':'#FFFDF0',borderRadius:16,padding:'14px',marginBottom:10,border:`1px solid ${item.status==='live'?'rgba(26,107,53,0.18)':dim?'rgba(180,170,150,0.18)':'rgba(212,165,32,0.15)'}`,opacity:dim?0.82:1}}>
      <div style={{display:'flex',gap:12,alignItems:'flex-start'}}>
        <div style={{width:52,height:52,borderRadius:14,background:item.bg,display:'flex',alignItems:'center',justifyContent:'center',fontSize:26,flexShrink:0,filter:dim?'grayscale(0.2)':'none'}}>{item.emoji}</div>
        <div style={{flex:1,minWidth:0}}>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:4}}>
            <div style={{fontFamily:'Fraunces,serif',fontSize:15,fontWeight:700,lineHeight:1.2,flex:1,marginRight:8}}>{item.name}</div>
            {item.status==='live' ? (
              <div style={{display:'flex',alignItems:'center',gap:5,background:'rgba(26,107,53,0.1)',border:'1px solid rgba(26,107,53,0.3)',borderRadius:100,padding:'3px 9px',flexShrink:0}}>
                <div style={{width:6,height:6,borderRadius:'50%',background:'#1A6B35',animation:'livePulse 1.2s ease-in-out infinite'}}/>
                <span style={{fontSize:9,fontWeight:800,color:'#1A6B35',letterSpacing:'0.08em'}}>LIVE</span>
              </div>
            ) : dim ? (
              <div style={{display:'flex',alignItems:'center',gap:3,background:'rgba(150,150,130,0.1)',border:'1px solid rgba(150,150,130,0.25)',borderRadius:100,padding:'3px 8px',flexShrink:0}}>
                <Check size={9} style={{color:'#7A7A60'}}/><span style={{fontSize:9,fontWeight:700,color:'#7A7A60',letterSpacing:'0.06em'}}>ARCHIVED</span>
              </div>
            ) : (
              <div style={{display:'flex',alignItems:'center',gap:4,background:'rgba(212,165,32,0.1)',border:'1px solid rgba(212,165,32,0.3)',borderRadius:100,padding:'3px 9px',flexShrink:0}}>
                <Check size={9} style={{color:'#D4A520'}}/><span style={{fontSize:9,fontWeight:800,color:'#D4A520',letterSpacing:'0.08em'}}>SOLD</span>
              </div>
            )}
          </div>
          <div style={{fontSize:11,color:'#7A6B4A',marginBottom:6}}>{item.cat}</div>
          <div style={{display:'flex',flexWrap:'wrap',gap:'3px 10px',marginBottom:item.status==='sold'?5:2}}>
            <span style={{fontSize:11,color:'#5A6050',display:'flex',alignItems:'center',gap:3}}>
              <Eye size={11} style={{color:'#1A6B35'}}/> {item.clicks.toLocaleString()} views
            </span>
            {item.status==='live' && <span style={{fontSize:11,color:'#5A6050'}}>Listed at <strong style={{color:'#1A6B35'}}>${item.price}</strong></span>}
            {item.status==='sold' && <>
              <span style={{fontSize:11,color:'#5A6050'}}>Listed: <strong>${item.price}</strong></span>
              <span style={{fontSize:11,fontWeight:700,color:dim?'#7A7050':'#D4A520'}}>→ Sold for <strong style={{color:dim?'#5A7040':'#1A6B35'}}>${item.soldFor}</strong></span>
            </>}
          </div>
          {item.status==='sold' && <div style={{fontSize:11,color:dim?'#8A8A70':'#7A6B4A'}}>Buyer: <strong>{item.buyer}</strong> · {item.soldDate}</div>}
          {item.status==='live' && <div style={{fontSize:11,color:'#8A7A5A'}}>Listed {item.listedDate}</div>}
        </div>
      </div>
    </div>
  );

  if(onboarding) return (
    <div style={{flex:1,overflowY:'auto',paddingBottom:90}} className="sh">
      <div style={{background:'linear-gradient(135deg,#0F2214,#133B1C)',padding:'20px 16px 16px'}}>
        <button onClick={()=>setOnboarding(false)} style={{background:'rgba(245,241,224,0.08)',border:'none',width:36,height:36,borderRadius:11,display:'flex',alignItems:'center',justifyContent:'center',color:'#F5F1E0',marginBottom:12}}><ArrowLeft size={17} strokeWidth={2.3}/></button>
        <h1 style={{fontFamily:'Fraunces,serif',fontSize:24,fontWeight:900,color:'#F5F1E0'}}>{setupDone?'Your stall is open!':'Set Up Your Stall'}</h1>
      </div>
      <div style={{padding:'20px 16px'}}>
        {setupDone ? (
          <div style={{textAlign:'center',padding:'40px 24px'}}>
            <div style={{fontSize:56,marginBottom:16,animation:'float 2s ease-in-out infinite'}}>🎪</div>
            <h2 style={{fontFamily:'Fraunces,serif',fontSize:24,fontWeight:700,marginBottom:8,color:'#1A6B35'}}>You are live!</h2>
            <p style={{fontSize:14,color:'#5A6050',lineHeight:1.6,marginBottom:28}}>Welcome to the seller community, <strong>{setupName||'neighbor'}</strong>. Post your first listing or submit to auction.</p>
            <button onClick={()=>{setIsSeller(true);setOnboarding(false);}} className="btn-em" style={{width:'100%',padding:'16px',borderRadius:100,fontSize:15,boxShadow:'0 6px 20px rgba(26,107,53,0.3)'}}>Go to My Dashboard →</button>
          </div>
        ) : (
          <>
            <label style={{display:'block',fontSize:10,fontWeight:700,letterSpacing:'.1em',color:'#7A6050',marginBottom:6}}>DISPLAY NAME</label>
            <div className="iwl" style={{display:'flex',alignItems:'center',gap:10,background:'#FFFDF0',border:'1px solid rgba(26,107,53,0.2)',borderRadius:14,padding:'14px 15px',marginBottom:12}}>
              <User size={16} strokeWidth={2.2} style={{color:'rgba(26,107,53,0.5)',flexShrink:0}}/>
              <input value={setupName} onChange={e=>setSetupName(e.target.value)} placeholder="Your name as buyers will see it" className="lp" style={{background:'transparent',border:'none',color:'#091408',fontSize:15,width:'100%',fontFamily:'DM Sans,sans-serif'}}/>
            </div>
            <label style={{display:'block',fontSize:10,fontWeight:700,letterSpacing:'.1em',color:'#7A6050',marginBottom:6}}>SHORT BIO</label>
            <div className="iwl" style={{background:'#FFFDF0',border:'1px solid rgba(26,107,53,0.2)',borderRadius:14,padding:'14px 15px',marginBottom:22}}>
              <textarea value={setupBio} onChange={e=>setSetupBio(e.target.value)} placeholder="Tell buyers what you sell…" rows={3} className="lp" style={{background:'transparent',border:'none',color:'#091408',fontSize:14,width:'100%',fontFamily:'DM Sans,sans-serif',resize:'none'}}/>
            </div>
            <button onClick={()=>setSetupDone(true)} disabled={!setupName} className="btn-em" style={{width:'100%',padding:'16px',borderRadius:100,fontSize:15,opacity:!setupName?0.5:1}}>Open My Stall 🌿</button>
          </>
        )}
      </div>
    </div>
  );

  return (
    <div style={{flex:1,overflowY:'auto',paddingBottom:90}} className="sh">
      {/* Seller profile header */}
      <div style={{background:'linear-gradient(135deg,#133B1C,#1A6B35)',padding:'22px 16px 20px',position:'relative',overflow:'hidden'}}>
        <Particles/>
        <div style={{position:'relative',zIndex:1}}>
          {isSeller ? (
            <>
              <div style={{display:'flex',gap:14,alignItems:'center',marginBottom:16}}>
                <div style={{width:58,height:58,borderRadius:18,background:'linear-gradient(135deg,#D4A520,#F5D860)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:26,flexShrink:0,boxShadow:'0 4px 16px rgba(212,165,32,0.4)'}}>👤</div>
                <div>
                  <div style={{fontSize:10,fontWeight:600,letterSpacing:'0.1em',color:'rgba(245,241,224,0.5)',marginBottom:3}}>YOUR SELLER ACCOUNT</div>
                  <div style={{fontFamily:'Fraunces,serif',fontSize:20,fontWeight:700,color:'#F5F1E0'}}>@michael_r</div>
                  <div style={{display:'flex',alignItems:'center',gap:6,marginTop:3}}>
                    <Stars rating={4.9} size={13}/><span style={{fontSize:12,fontWeight:700,color:'#F5D860'}}>4.9</span><span style={{fontSize:11,color:'rgba(245,241,224,0.45)'}}>· {myRevs.length} reviews</span>
                  </div>
                  <div style={{marginTop:5}}><span style={{background:'rgba(212,165,32,0.22)',border:'1px solid rgba(212,165,32,0.45)',borderRadius:100,padding:'2px 10px',fontSize:9,fontWeight:700,color:'#F5D860'}}>🏆 Top Seller · Unit 4B</span></div>
                </div>
              </div>
              <div style={{display:'flex',gap:0,background:'rgba(255,255,255,0.07)',borderRadius:14}}>
                {[['$'+totalRev.toLocaleString(),'Total Revenue'],[`${liveItems.length}`,'Live Now'],[totalClk.toLocaleString(),'Views'],[avgRating+' ★','Rating']].map(([v,l],i)=>(
                  <div key={l} style={{flex:1,textAlign:'center',padding:'10px 2px',borderRight:i<3?'1px solid rgba(255,255,255,0.07)':'none'}}>
                    <div style={{fontFamily:'Fraunces,serif',fontSize:14,fontWeight:700,color:l==='Rating'?'#F5D860':l==='Live Now'?'#52B788':'#F5F1E0',lineHeight:1}}>{v}</div>
                    <div style={{fontSize:8,color:'rgba(245,241,224,0.4)',fontWeight:500,marginTop:3}}>{l}</div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div>
              <div style={{fontFamily:'Fraunces,serif',fontSize:22,fontWeight:700,color:'#F5F1E0',marginBottom:4}}>⚙️ Settings</div>
              <p style={{fontSize:13,color:'rgba(245,241,224,0.5)'}}>Manage your G-Tribes account</p>
            </div>
          )}
        </div>
      </div>

      {/* Seller tabs */}
      {isSeller&&(
        <div style={{padding:'10px 16px 0',background:'#F5F1E0',position:'sticky',top:0,zIndex:9}}>
          <div style={{display:'flex',gap:5}}>
            {[
              ['live',   `Live (${liveItems.length})`],
              ['sold',   `Sold (${soldItems.length})`],
              ['archive',`Archive (${archived.length})`],
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
              <div style={{textAlign:'center',padding:'36px 20px',background:'#FFFDF0',borderRadius:18,border:'1px dashed rgba(26,107,53,0.2)'}}>
                <div style={{fontSize:36,marginBottom:10,animation:'floatSlow 4s ease-in-out infinite'}}>📦</div>
                <div style={{fontFamily:'Fraunces,serif',fontSize:17,fontWeight:600,marginBottom:6}}>No live listings</div>
                <p style={{fontSize:13,color:'#7A6B4A'}}>Post your first item to start selling.</p>
              </div>
            ) : liveItems.map(i=><ListingCard key={i.id} item={i}/>)}
          </div>
        )}

        {/* SOLD THIS WEEK */}
        {isSeller&&sellerTab==='sold'&&(
          <div>
            <div style={{background:'rgba(26,107,53,0.07)',border:'1px solid rgba(26,107,53,0.12)',borderRadius:12,padding:'10px 14px',marginBottom:12,display:'flex',alignItems:'center',gap:8}}>
              <TrendingUp size={14} style={{color:'#1A6B35',flexShrink:0}}/>
              <span style={{fontSize:12,color:'#5A6050'}}>This week: <strong style={{color:'#1A6B35'}}>${soldRevWeek}</strong> from {soldItems.length} item{soldItems.length!==1?'s':''}</span>
            </div>
            {soldItems.length===0 ? (
              <div style={{textAlign:'center',padding:'36px',color:'#7A6B4A'}}><div style={{fontSize:36,marginBottom:10}}>📭</div><p>No sales this week yet</p></div>
            ) : soldItems.map(i=><ListingCard key={i.id} item={i}/>)}
          </div>
        )}

        {/* ARCHIVE (sold 7+ days ago) */}
        {isSeller&&sellerTab==='archive'&&(
          <div>
            <div style={{background:'rgba(26,107,53,0.04)',border:'1px solid rgba(26,107,53,0.1)',borderRadius:12,padding:'10px 14px',marginBottom:12}}>
              <span style={{fontSize:12,color:'#6A6050'}}>📁 Sold 7+ days ago · {archived.length} items · Revenue: <strong style={{color:'#1A6B35'}}>${archRev.toLocaleString()}</strong></span>
            </div>
            {archived.map(i=><ListingCard key={i.id} item={i} dim={true}/>)}
          </div>
        )}

        {/* REVIEWS */}
        {isSeller&&sellerTab==='reviews'&&(
          <div>
            <div style={{background:'#FFFDF0',borderRadius:18,padding:'16px',marginBottom:14,border:'1px solid rgba(212,165,32,0.15)',display:'flex',gap:16,alignItems:'center'}}>
              <div style={{textAlign:'center'}}>
                <div style={{fontFamily:'Fraunces,serif',fontSize:38,fontWeight:900,color:'#D4A520',lineHeight:1}}>{avgRating}</div>
                <Stars rating={parseFloat(avgRating)} size={15}/>
                <div style={{fontSize:10,color:'#7A6B4A',marginTop:4}}>{myRevs.length} reviews</div>
              </div>
              <div style={{flex:1}}>
                {[5,4,3].map(n=>{const cnt=myRevs.filter(r=>r.rating===n).length,pct=myRevs.length?Math.round(cnt/myRevs.length*100):0;return(
                  <div key={n} style={{display:'flex',alignItems:'center',gap:6,marginBottom:5}}>
                    <span style={{fontSize:10,color:'#D4A520',width:8,fontWeight:700}}>{n}</span>
                    <div style={{flex:1,height:5,borderRadius:100,background:'rgba(212,165,32,0.12)',overflow:'hidden'}}><div style={{height:'100%',borderRadius:100,background:'linear-gradient(90deg,#B88A10,#D4A520)',width:`${pct}%`}}/></div>
                    <span style={{fontSize:9,color:'#7A6B4A',width:26,textAlign:'right'}}>{pct}%</span>
                  </div>
                );})}
              </div>
            </div>
            {myRevs.map((r,i)=>(
              <div key={r.id} className={`s${Math.min(i+1,9)}`} style={{background:'#FFFDF0',borderRadius:16,padding:'14px',marginBottom:10,border:'1px solid rgba(26,107,53,0.08)',animation:'fadeUp .3s ease-out both'}}>
                <div style={{display:'flex',justifyContent:'space-between',marginBottom:8}}>
                  <div><Stars rating={r.rating} size={13}/><div style={{fontFamily:'Fraunces,serif',fontSize:13,fontWeight:600,marginTop:2}}>{r.reviewer}</div></div>
                  <div style={{textAlign:'right'}}><div style={{fontSize:10,color:'#7A6B4A'}}>{r.date}</div>{r.verified&&<div style={{display:'flex',alignItems:'center',gap:2,justifyContent:'flex-end',marginTop:2}}><Check size={9} style={{color:'#1A6B35'}}/><span style={{fontSize:9,color:'#1A6B35',fontWeight:600}}>Verified</span></div>}</div>
                </div>
                <p style={{fontSize:13,color:'#3A4030',lineHeight:1.6,fontStyle:'italic'}}>"{r.text}"</p>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginTop:8,paddingTop:7,borderTop:'1px solid rgba(26,107,53,0.07)'}}>
                  <span style={{fontSize:11,color:'#7A6B4A'}}>Item: <strong>{r.item}</strong></span>
                  <span style={{fontSize:10,color:'#7A6B4A'}}>👍 {r.helpful}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* GENERAL SETTINGS (always shown below seller tabs) */}
        <div style={{marginTop:isSeller?16:0}}>
          {!isSeller&&(
            <div style={{background:'#FFFDF0',borderRadius:18,padding:'22px',marginBottom:14,border:'1px solid rgba(212,165,32,0.12)',textAlign:'center'}}>
              <div style={{fontSize:44,marginBottom:12,animation:'floatSlow 4s ease-in-out infinite'}}>🪴</div>
              <div style={{fontFamily:'Fraunces,serif',fontSize:20,fontWeight:700,marginBottom:6}}>Open Your Stall</div>
              <p style={{fontSize:13,color:'#5A6050',lineHeight:1.65,marginBottom:20}}>Join 5 active sellers. List items, run auctions, build your reputation.</p>
              <button onClick={()=>setOnboarding(true)} className="btn-em" style={{width:'100%',padding:'15px',borderRadius:100,fontSize:14,boxShadow:'0 4px 14px rgba(26,107,53,0.3)'}}>Become a Seller →</button>
            </div>
          )}
          <div style={{background:'#FFFDF0',borderRadius:18,overflow:'hidden',border:'1px solid rgba(26,107,53,0.08)'}}>
            {[
              {icon:Bell,  label:'Notifications',  value:notif?'On':'Off',  action:()=>setNotif(!notif)},
              {icon:Shield,label:'Privacy Settings',value:'Managed',         action:()=>{}},
              {icon:User,  label:'Account Info',    value:'Unit 4B',          action:()=>{}},
              {icon:HelpCircle,label:'Help & Support',value:'',              action:()=>{}},
            ].map((item,i)=>(
              <button key={item.label} onClick={item.action} style={{width:'100%',display:'flex',alignItems:'center',gap:12,padding:'14px 16px',background:'transparent',border:'none',borderBottom:i<3?'1px solid rgba(26,107,53,0.07)':'none',textAlign:'left'}}>
                <div style={{width:36,height:36,borderRadius:11,background:'rgba(26,107,53,0.08)',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}><item.icon size={16} strokeWidth={2.2} style={{color:'#1A6B35'}}/></div>
                <span style={{fontSize:14,fontWeight:600,color:'#091408',flex:1}}>{item.label}</span>
                <span style={{fontSize:12,color:'#7A6B4A'}}>{item.value}</span>
                <ChevronRight size={14} style={{color:'rgba(31,42,20,0.3)'}}/>
              </button>
            ))}
          </div>
          <button onClick={onSignOut} style={{width:'100%',marginTop:12,display:'flex',alignItems:'center',gap:12,padding:'14px 16px',background:'rgba(232,80,32,0.06)',border:'1px solid rgba(232,80,32,0.15)',borderRadius:14,textAlign:'left'}}>
            <div style={{width:36,height:36,borderRadius:11,background:'rgba(232,80,32,0.1)',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}><LogOut size={16} strokeWidth={2.2} style={{color:'#E85020'}}/></div>
            <span style={{fontSize:14,fontWeight:600,color:'#E85020'}}>Sign Out</span>
          </button>
        </div>
      </div>
    </div>
  );
};

/* ══════════════════════════════════════════════════════
   MARKETPLACE APP (tabs)
══════════════════════════════════════════════════════ */
const MarketplaceApp = ({onSignOut}) => {
  const [tab, setTab]         = useState('home');
  const [isSeller, setIsSeller] = useState(false);
  const [activeCat, setActiveCat] = useState(null); // {id, name, emoji, bg, c, members}

  const handleCatSelect = (cat) => { setActiveCat(cat); };
  const handleCatBack   = ()    => { setActiveCat(null); };

  // If a category is active, show CategoryPage over current tab
  if(activeCat) return (
    <div className="fs" style={{height:'100vh',display:'flex',flexDirection:'column',background:'#F5F1E0'}}>
      <style>{CSS}</style>
      <div style={{flex:1,display:'flex',flexDirection:'column',maxWidth:440,margin:'0 auto',width:'100%',overflow:'hidden',animation:'slideIn .25s ease-out'}}>
        <CategoryPage cat={activeCat} onBack={handleCatBack}/>
        <BottomNav active={tab} onChange={t=>{setTab(t);setActiveCat(null);}}/>
      </div>
    </div>
  );

  return (
    <div className="fs" style={{height:'100vh',display:'flex',flexDirection:'column',background:'#F5F1E0',animation:'fadeIn .4s ease-out'}}>
      <style>{CSS}</style>
      <div style={{flex:1,display:'flex',flexDirection:'column',maxWidth:440,margin:'0 auto',width:'100%',overflow:'hidden'}}>
        {tab==='home'    &&<HomePage    isSeller={isSeller} onNav={setTab} onCatSelect={handleCatSelect}/>}
        {tab==='browse'  &&<BrowsePage  onCatSelect={handleCatSelect}/>}
        {tab==='auctions'&&<AuctionsPage/>}
        {tab==='sellers' &&<SellersPage/>}
        {tab==='settings'&&<SettingsPage isSeller={isSeller} setIsSeller={setIsSeller} onSignOut={onSignOut}/>}
        <BottomNav active={tab} onChange={setTab}/>
      </div>
    </div>
  );
};

/* ══════════════════════════════════════════════════════
   LANDING PAGE
══════════════════════════════════════════════════════ */
const useTypewriter=(text,speed=65,delay=400)=>{const[i,setI]=useState(0);useEffect(()=>{const t=setTimeout(()=>{const iv=setInterval(()=>setI(n=>{if(n>=text.length){clearInterval(iv);return n;}return n+1;}),speed);return()=>clearInterval(iv);},delay);return()=>clearTimeout(t);},[]);return text.slice(0,i);};

const LandingPage = ({onSignIn, onRegister}) => {
  const l1=useTypewriter('From Us.',70,600); const l2=useTypewriter('To Us.',70,l1.length>=8?1300:99999);
  const features=[{emoji:'🏘️',title:'Neighbors Only',desc:'Buy and sell only within your own community.'},{emoji:'🤝',title:'Member to Member',desc:'Direct peer-to-peer. No corporate middlemen.'},{emoji:'⚡',title:'Auction House',desc:'High-value items submitted, reviewed, then bid on live.'},{emoji:'💬',title:'Direct Connect',desc:'Message any seller privately inside the app.'}];
  return (
    <div className="fs" style={{minHeight:'100vh',background:'#091408',color:'#F5F1E0',overflowX:'hidden',position:'relative'}}>
      <style>{CSS}</style>
      <div style={{position:'fixed',inset:0,pointerEvents:'none',overflow:'hidden',zIndex:0}}>
        <div style={{position:'absolute',top:'-10%',left:'-15%',width:'70vw',height:'70vw',borderRadius:'50%',background:'radial-gradient(circle,rgba(26,107,53,0.22) 0%,transparent 65%)',animation:'orb1 18s ease-in-out infinite'}}/>
        <div style={{position:'absolute',bottom:'-20%',right:'-20%',width:'80vw',height:'80vw',borderRadius:'50%',background:'radial-gradient(circle,rgba(212,165,32,0.14) 0%,transparent 65%)',animation:'orb2 22s ease-in-out infinite'}}/>
        <div style={{position:'absolute',top:'40%',right:'-10%',width:'50vw',height:'50vw',borderRadius:'50%',background:'radial-gradient(circle,rgba(82,183,136,0.1) 0%,transparent 60%)',animation:'orb3 26s ease-in-out infinite'}}/>
      </div>
      <Particles/>
      <div style={{position:'relative',zIndex:1}}>
        <header style={{padding:'20px 22px',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
          <Logo light/><button onClick={onSignIn} style={{background:'rgba(212,165,32,0.1)',border:'1px solid rgba(212,165,32,0.3)',color:'#F5D860',padding:'9px 22px',borderRadius:100,fontSize:13,fontWeight:600}}>Sign In</button>
        </header>
        <section style={{padding:'36px 22px 52px',textAlign:'center'}}>
          <div style={{display:'inline-flex',alignItems:'center',gap:6,background:'rgba(212,165,32,0.1)',border:'1px solid rgba(212,165,32,0.25)',borderRadius:100,padding:'7px 18px',marginBottom:28,animation:'fadeIn .6s ease-out'}}><Star size={11} strokeWidth={2.5} style={{color:'#D4A520'}}/><span style={{fontSize:10,fontWeight:700,letterSpacing:'0.16em',color:'#D4A520'}}>COMMUNITY MARKETPLACE</span></div>
          <h1 className="ff" style={{fontSize:'clamp(46px,12vw,64px)',fontWeight:900,lineHeight:1.04,letterSpacing:'-0.025em',marginBottom:20,minHeight:140}}>
            <span className={l1.length>=8?'text-gold':''}>{l1}</span>
            {l1.length>=8&&<><br/><span style={{color:'#52B788',fontStyle:'italic'}}>{l2}</span>{l2.length<6&&<span className="cursor"/>}</>}
          </h1>
          <p style={{fontSize:15,lineHeight:1.7,color:'rgba(245,241,224,0.62)',maxWidth:300,margin:'0 auto 36px',animation:'fadeUp .7s .5s ease-out both'}}>Buy, sell and connect with the people right next door. Your community. Your marketplace. <em>Your tribe.</em></p>
          <div style={{display:'flex',flexDirection:'column',gap:12,maxWidth:290,margin:'0 auto',animation:'fadeUp .7s .7s ease-out both'}}>
            <button onClick={onRegister} className="btn-gold" style={{padding:'17px 24px',borderRadius:100,fontSize:15,boxShadow:'0 6px 28px rgba(212,165,32,0.4)'}}>Join the Tribe 🌿</button>
            <button onClick={onSignIn} style={{padding:'15px 24px',borderRadius:100,background:'rgba(82,183,136,0.08)',color:'#52B788',fontSize:14,fontWeight:600,border:'1px solid rgba(82,183,136,0.25)'}}>Sign In</button>
          </div>
          <div style={{display:'flex',justifyContent:'center',gap:36,marginTop:52,paddingTop:36,borderTop:'1px solid rgba(212,165,32,0.1)',animation:'fadeIn 1s 1s ease-out both'}}>
            {[['320','+','Members'],['18','','Categories'],['6','','Live Auctions']].map(([n,s,l])=>(
              <div key={l} style={{textAlign:'center'}}>
                <div className="ff text-gold" style={{fontSize:28,fontWeight:900}}><Counter target={parseInt(n)}/>{s}</div>
                <div style={{fontSize:10,fontWeight:600,letterSpacing:'0.1em',color:'rgba(245,241,224,0.38)',marginTop:4}}>{l}</div>
              </div>
            ))}
          </div>
          <div style={{marginTop:40,animation:'fadeIn 1s 1.2s ease-out both'}}>
            <p style={{fontSize:10,fontWeight:600,letterSpacing:'0.14em',color:'rgba(245,241,224,0.3)',marginBottom:12}}>BRAND PALETTE</p>
            <div style={{display:'flex',justifyContent:'center',gap:6,flexWrap:'wrap'}}>
              {SWATCHES.map(s=><div key={s.c} title={s.l} style={{textAlign:'center'}}><div style={{width:28,height:28,borderRadius:8,background:s.c,border:'1px solid rgba(255,255,255,0.08)',marginBottom:4}}/><div style={{fontSize:8,color:'rgba(245,241,224,0.3)'}}>{s.l}</div></div>)}
            </div>
          </div>
        </section>
        <div style={{background:'linear-gradient(90deg,rgba(26,107,53,0.25),rgba(212,165,32,0.18),rgba(26,107,53,0.25))',borderTop:'1px solid rgba(212,165,32,0.15)',borderBottom:'1px solid rgba(212,165,32,0.15)',padding:'16px 22px',textAlign:'center'}}>
          <p className="ff" style={{fontSize:18,fontStyle:'italic',color:'rgba(245,241,224,0.65)'}}>"Buy from members. Sell to members. <span style={{color:'#D4A520'}}>Belong.</span>"</p>
        </div>
        <section style={{padding:'44px 22px'}}>
          <h2 className="ff" style={{fontSize:28,fontWeight:700,marginBottom:6,textAlign:'center'}}>Why <span className="text-gold">G-Tribes?</span></h2>
          <p style={{fontSize:13,color:'rgba(245,241,224,0.4)',textAlign:'center',marginBottom:26}}>Built for communities. Powered by neighbors.</p>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10}}>
            {features.map((f,i)=><div key={f.title} className={`s${i+1}`} style={{background:'rgba(26,107,53,0.08)',border:'1px solid rgba(212,165,32,0.1)',borderRadius:20,padding:18,animation:'fadeUp .6s ease-out both'}}><div style={{fontSize:30,marginBottom:10}}>{f.emoji}</div><div style={{fontSize:13,fontWeight:700,marginBottom:5,color:'#F5D860'}}>{f.title}</div><div style={{fontSize:11,lineHeight:1.6,color:'rgba(245,241,224,0.48)'}}>{f.desc}</div></div>)}
          </div>
        </section>
        <section style={{padding:'0 22px 60px'}}>
          <div style={{background:'linear-gradient(135deg,rgba(26,107,53,0.3),rgba(212,165,32,0.15))',border:'1px solid rgba(212,165,32,0.2)',borderRadius:28,padding:'40px 24px',textAlign:'center',position:'relative',overflow:'hidden'}}>
            <div style={{fontSize:38,marginBottom:14,animation:'float 3s ease-in-out infinite'}}>🌱</div>
            <h2 className="ff" style={{fontSize:28,fontWeight:700,marginBottom:8}}>Ready to join<br/>your tribe?</h2>
            <p style={{fontSize:14,color:'rgba(245,241,224,0.55)',marginBottom:28,lineHeight:1.65}}>Free. Local. Just for your community.</p>
            <button onClick={onRegister} className="btn-gold" style={{padding:'15px 44px',borderRadius:100,fontSize:15,boxShadow:'0 6px 24px rgba(212,165,32,0.35)'}}>Get Started Free</button>
          </div>
        </section>
        <footer style={{padding:'24px 22px 40px',borderTop:'1px solid rgba(212,165,32,0.08)',textAlign:'center'}}><Logo light/><p style={{fontSize:11,color:'rgba(245,241,224,0.22)',marginTop:14}}>© 2026 G-Tribes. All rights reserved.</p></footer>
      </div>
    </div>
  );
};

/* SIGN IN ════════════════════════════════════════════ */
const SignInPage = ({onBack,onSuccess,onRegister}) => {
  const[email,setEmail]=useState('');const[pass,setPass]=useState('');const[show,setShow]=useState(false);const[busy,setBusy]=useState(false);
  const submit=()=>{setBusy(true);setTimeout(()=>{setBusy(false);onSuccess();},1400);};
  return(
    <div className="fs" style={{minHeight:'100vh',background:'#091408',color:'#F5F1E0',display:'flex',flexDirection:'column',animation:'slideIn .35s ease-out',position:'relative',overflow:'hidden'}}>
      <style>{CSS}</style>
      <div style={{position:'absolute',top:'-30%',right:'-30%',width:'80vw',height:'80vw',borderRadius:'50%',background:'radial-gradient(circle,rgba(26,107,53,0.18) 0%,transparent 65%)',animation:'orb1 20s ease-in-out infinite',pointerEvents:'none'}}/>
      <header style={{padding:'20px 22px',display:'flex',alignItems:'center',gap:14,position:'relative',zIndex:1}}>
        <button onClick={onBack} style={{background:'rgba(212,165,32,0.1)',border:'1px solid rgba(212,165,32,0.2)',width:38,height:38,borderRadius:12,display:'flex',alignItems:'center',justifyContent:'center',color:'#D4A520'}}><ArrowLeft size={18} strokeWidth={2.3}/></button>
        <Logo light/>
      </header>
      <div style={{flex:1,padding:'12px 24px 36px',display:'flex',flexDirection:'column',maxWidth:440,width:'100%',margin:'0 auto',position:'relative',zIndex:1}}>
        <div style={{marginBottom:32,animation:'fadeUp .5s ease-out both'}}>
          <h1 className="ff" style={{fontSize:38,fontWeight:900,lineHeight:1.08,marginBottom:8}}>Welcome<br/><span className="text-gold">back.</span></h1>
          <p style={{fontSize:14,color:'rgba(245,241,224,0.48)'}}>Sign in to your G-Tribes account</p>
        </div>
        <div style={{animation:'fadeUp .5s .1s ease-out both'}}>
          <label style={{display:'block',fontSize:10,fontWeight:700,letterSpacing:'0.1em',color:'rgba(212,165,32,0.6)',marginBottom:7}}>EMAIL ADDRESS</label>
          <DarkField icon={Mail} type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@email.com"/>
          <label style={{display:'block',fontSize:10,fontWeight:700,letterSpacing:'0.1em',color:'rgba(212,165,32,0.6)',marginBottom:7,marginTop:4}}>PASSWORD</label>
          <DarkField icon={Lock} type={show?'text':'password'} value={pass} onChange={e=>setPass(e.target.value)} placeholder="Your password" right={<button onClick={()=>setShow(!show)} style={{background:'transparent',border:'none',color:'rgba(212,165,32,0.5)',display:'flex'}}>{show?<EyeOff size={15}/>:<Eye size={15}/>}</button>}/>
          <div style={{textAlign:'right',marginBottom:32}}><button className="btn-ghost-gold" style={{borderRadius:8,padding:'4px 8px',fontSize:13}}>Forgot password?</button></div>
        </div>
        <button onClick={submit} disabled={busy} className="btn-gold" style={{padding:'17px',borderRadius:100,fontSize:15,marginBottom:20,opacity:busy?.75:1,boxShadow:'0 6px 24px rgba(212,165,32,0.35)'}}>{busy?'Signing in…':'Sign In →'}</button>
        <p style={{textAlign:'center',fontSize:14,color:'rgba(245,241,224,0.4)'}}>New here?{' '}<button onClick={onRegister} className="btn-ghost-em" style={{borderRadius:8,padding:'4px 8px',fontSize:14}}>Join the Tribe</button></p>
      </div>
    </div>
  );
};

/* REGISTER ══════════════════════════════════════════ */
const RegisterPage = ({onBack,onSuccess}) => {
  const[step,setStep]=useState(1);const[busy,setBusy]=useState(false);const[showP,setShowP]=useState(false);const[confetti,setConfetti]=useState(false);const[done,setDone]=useState(false);
  const[form,setForm]=useState({name:'',email:'',username:'',password:'',unit:'',floor:'',residentType:'',interests:new Set()});
  const set=(k,v)=>setForm(f=>({...f,[k]:v}));const tog=(id)=>setForm(f=>{const s=new Set(f.interests);s.has(id)?s.delete(id):s.add(id);return{...f,interests:s};});
  const back=()=>step>1?setStep(s=>s-1):onBack();
  const next=()=>{if(step<3){setStep(s=>s+1);return;}setBusy(true);setTimeout(()=>{setBusy(false);setConfetti(true);setDone(true);setTimeout(()=>setConfetti(false),2000);},1600);};
  const canGo=step===1?(form.name&&form.email&&form.username&&form.password):step===2?(form.unit&&form.residentType):form.interests.size>=3;
  const strength=form.password.length<4?0:form.password.length<7?1:form.password.length<10?2:3;
  const strC=['#E85040','#D4A520','#52B788','#1A6B35'];const strL=['Weak','Fair','Good','Strong'];
  if(done)return(
    <div className="fs" style={{minHeight:'100vh',background:'#091408',color:'#F5F1E0',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',textAlign:'center',padding:32,animation:'fadeIn .4s ease-out'}}>
      <style>{CSS}</style><Confetti show={confetti}/>
      <div style={{fontSize:72,marginBottom:20,animation:'scaleIn .6s .3s cubic-bezier(0.34,1.56,0.64,1) both'}}>🎉</div>
      <h1 className="ff text-gold" style={{fontSize:38,fontWeight:900,marginBottom:10}}>You're in!</h1>
      <p style={{fontSize:15,color:'rgba(245,241,224,0.6)',lineHeight:1.7,marginBottom:8}}>Welcome to G-Tribes,<br/><strong style={{color:'#52B788'}}>@{form.username||'neighbor'}</strong></p>
      <p style={{fontSize:13,color:'rgba(245,241,224,0.38)',marginBottom:40}}>Your community marketplace is ready.</p>
      <button onClick={onSuccess} className="btn-gold" style={{padding:'16px 44px',borderRadius:100,fontSize:15,boxShadow:'0 6px 28px rgba(212,165,32,0.4)',animation:'pulse 2s 1s ease-in-out infinite'}}>Explore the Market →</button>
    </div>
  );
  return(
    <div className="fs" style={{minHeight:'100vh',background:'#091408',color:'#F5F1E0',display:'flex',flexDirection:'column',animation:'slideIn .35s ease-out',position:'relative',overflow:'hidden'}}>
      <style>{CSS}</style><Confetti show={confetti}/>
      <div style={{position:'absolute',top:'-15%',right:'-20%',width:'70vw',height:'70vw',borderRadius:'50%',background:'radial-gradient(circle,rgba(212,165,32,0.1) 0%,transparent 65%)',animation:'orb2 20s ease-in-out infinite',pointerEvents:'none'}}/>
      <header style={{padding:'20px 22px',display:'flex',alignItems:'center',gap:14,position:'relative',zIndex:1}}>
        <button onClick={back} style={{background:'rgba(212,165,32,0.1)',border:'1px solid rgba(212,165,32,0.2)',width:38,height:38,borderRadius:12,display:'flex',alignItems:'center',justifyContent:'center',color:'#D4A520'}}><ArrowLeft size={18} strokeWidth={2.3}/></button>
        <Logo light/><span style={{marginLeft:'auto',fontSize:12,fontWeight:600,color:'rgba(212,165,32,0.5)'}}>Step {step} / 3</span>
      </header>
      <div style={{padding:'0 22px 6px',position:'relative',zIndex:1}}>
        <div style={{display:'flex',gap:6}}>{[1,2,3].map(n=><div key={n} style={{flex:1,height:4,borderRadius:100,background:'rgba(212,165,32,0.1)',overflow:'hidden'}}><div style={{height:'100%',borderRadius:100,background:'linear-gradient(90deg,#B88A10,#F5D860)',width:n<=step?'100%':'0%',transition:'width .5s cubic-bezier(0.34,1.56,0.64,1)'}}/></div>)}</div>
      </div>
      <div className="sh" style={{flex:1,overflowY:'auto',padding:'20px 22px 0',maxWidth:440,width:'100%',margin:'0 auto',position:'relative',zIndex:1}}>
        <div style={{marginBottom:26,animation:'fadeUp .4s ease-out both'}}>
          <h1 className="ff" style={{fontSize:32,fontWeight:900,lineHeight:1.1,marginBottom:6}}>
            {step===1&&<>Create<br/><span className="text-gold">your account.</span></>}
            {step===2&&<>Your<br/><span style={{color:'#52B788',fontStyle:'italic'}}>home.</span></>}
            {step===3&&<>Your<br/><span className="text-gold">interests.</span></>}
          </h1>
          <p style={{fontSize:13,color:'rgba(245,241,224,0.45)'}}>{step===1&&'Tell us who you are to get started.'}{step===2&&'Let your neighbors know where you live in the community.'}{step===3&&`Pick at least 3 to personalize your feed · ${form.interests.size} selected`}</p>
        </div>
        {step===1&&<div style={{animation:'slideIn .3s ease-out both'}}>
          {[{l:'FULL NAME',icon:User,k:'name',p:'Jane Smith',t:'text'},{l:'EMAIL ADDRESS',icon:Mail,k:'email',p:'you@email.com',t:'email'}].map(f=><div key={f.k}><label style={{display:'block',fontSize:10,fontWeight:700,letterSpacing:'.1em',color:'rgba(212,165,32,0.55)',marginBottom:6,marginTop:12}}>{f.l}</label><DarkField icon={f.icon} type={f.t} value={form[f.k]} onChange={e=>set(f.k,e.target.value)} placeholder={f.p}/></div>)}
          <label style={{display:'block',fontSize:10,fontWeight:700,letterSpacing:'.1em',color:'rgba(212,165,32,0.55)',marginBottom:6,marginTop:12}}>USERNAME</label>
          <DarkField value={form.username} onChange={e=>set('username',e.target.value.toLowerCase().replace(/\s/g,''))} placeholder="jane_smith" right={<span style={{color:'rgba(212,165,32,0.5)',fontSize:15,fontWeight:700,marginRight:4}}>@</span>}/>
          <label style={{display:'block',fontSize:10,fontWeight:700,letterSpacing:'.1em',color:'rgba(212,165,32,0.55)',marginBottom:6,marginTop:12}}>PASSWORD</label>
          <DarkField icon={Lock} type={showP?'text':'password'} value={form.password} onChange={e=>set('password',e.target.value)} placeholder="Min. 8 characters" right={<button onClick={()=>setShowP(!showP)} style={{background:'transparent',border:'none',color:'rgba(212,165,32,0.5)',display:'flex'}}>{showP?<EyeOff size={15}/>:<Eye size={15}/>}</button>}/>
          {form.password.length>0&&<div style={{marginBottom:4}}><div style={{display:'flex',gap:4,marginBottom:4}}>{[0,1,2,3].map(n=><div key={n} style={{flex:1,height:3,borderRadius:100,background:n<=strength?strC[strength]:'rgba(212,165,32,0.1)',transition:'background .3s'}}/>)}</div><p style={{fontSize:10,color:'rgba(245,241,224,0.35)'}}>{strL[strength]} password</p></div>}
        </div>}
        {step===2&&<div style={{animation:'slideIn .3s ease-out both'}}>
          <label style={{display:'block',fontSize:10,fontWeight:700,letterSpacing:'.1em',color:'rgba(212,165,32,0.55)',marginBottom:6}}>UNIT / DOOR NUMBER</label>
          <DarkField icon={Building} value={form.unit} onChange={e=>set('unit',e.target.value)} placeholder="e.g. 4B · 12 · Unit 305"/>
          <label style={{display:'block',fontSize:10,fontWeight:700,letterSpacing:'.1em',color:'rgba(212,165,32,0.55)',marginBottom:6,marginTop:12}}>FLOOR (Optional)</label>
          <DarkField icon={Home} type="number" value={form.floor} onChange={e=>set('floor',e.target.value)} placeholder="e.g. Ground · 3"/>
          <label style={{display:'block',fontSize:10,fontWeight:700,letterSpacing:'.1em',color:'rgba(212,165,32,0.55)',marginBottom:12,marginTop:16}}>TYPE OF RESIDENT</label>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8}}>
            {RESIDENT_TYPES.map(r=>{const sel=form.residentType===r.id;return(
              <button key={r.id} onClick={()=>set('residentType',r.id)} className="card-press" style={{display:'flex',alignItems:'center',gap:10,padding:'13px',borderRadius:14,textAlign:'left',background:sel?'rgba(212,165,32,0.12)':'rgba(255,255,255,0.03)',border:`1.5px solid ${sel?'#D4A520':'rgba(212,165,32,0.12)'}`,color:sel?'#F5D860':'rgba(245,241,224,0.6)',transition:'border-color .15s,background .15s'}}>
                <span style={{fontSize:22,flexShrink:0}}>{r.emoji}</span><span style={{fontSize:12,fontWeight:600,lineHeight:1.3,flex:1}}>{r.label}</span>{sel&&<Check size={13} strokeWidth={2.6}/>}
              </button>);
            })}
          </div>
        </div>}
        {step===3&&<div style={{animation:'slideIn .3s ease-out both',paddingBottom:16}}>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:7}}>
            {CATS.map((c,i)=>{const sel=form.interests.has(c.id);return(
              <button key={c.id} onClick={()=>tog(c.id)} className={`card-press s${(i%9)+1}`} style={{display:'flex',flexDirection:'column',alignItems:'center',gap:5,padding:'12px 6px',borderRadius:14,position:'relative',background:sel?'rgba(212,165,32,0.1)':'rgba(26,107,53,0.07)',border:`1.5px solid ${sel?'#D4A520':'rgba(212,165,32,0.1)'}`,transition:'border-color .15s,background .15s',animation:'scaleIn .3s ease-out both'}}>
                {sel&&<div style={{position:'absolute',top:5,right:5,width:16,height:16,borderRadius:'50%',background:'#D4A520',display:'flex',alignItems:'center',justifyContent:'center',animation:'scaleIn .2s ease-out'}}><Check size={8} strokeWidth={3} style={{color:'#091408'}}/></div>}
                <span style={{fontSize:26}}>{c.emoji}</span>
                <span style={{fontSize:9,fontWeight:600,textAlign:'center',lineHeight:1.3,color:sel?'#F5D860':'rgba(245,241,224,0.55)'}}>{c.name}</span>
              </button>);
            })}
          </div>
        </div>}
      </div>
      <div style={{padding:'16px 22px 36px',borderTop:'1px solid rgba(212,165,32,0.08)',maxWidth:440,width:'100%',margin:'0 auto',position:'relative',zIndex:1}}>
        <button onClick={next} disabled={!canGo||busy} className={canGo?'btn-gold':''} style={{width:'100%',padding:'17px',borderRadius:100,fontSize:15,background:canGo?undefined:'rgba(212,165,32,0.15)',color:canGo?undefined:'rgba(212,165,32,0.4)',border:'none',boxShadow:canGo?'0 6px 24px rgba(212,165,32,0.3)':undefined,transition:'all .2s'}}>
          {busy?'Setting up…':step<3?'Continue →':'🎉 Join the Tribe'}
        </button>
        {step===1&&<p style={{textAlign:'center',marginTop:14,fontSize:13,color:'rgba(245,241,224,0.35)'}}>Already a member?{' '}<button onClick={onBack} style={{background:'transparent',border:'none',color:'#52B788',fontWeight:700,fontSize:13}}>Sign In</button></p>}
      </div>
    </div>
  );
};

/* ROOT ══════════════════════════════════════════════ */
export default function GTribsApp() {
  const[page,setPage]=useState('landing');
  return(
    <>
      {page==='landing'  &&<LandingPage   onSignIn={()=>setPage('signin')}   onRegister={()=>setPage('register')}/>}
      {page==='signin'   &&<SignInPage    onBack={()=>setPage('landing')}    onSuccess={()=>setPage('app')}  onRegister={()=>setPage('register')}/>}
      {page==='register' &&<RegisterPage  onBack={()=>setPage('signin')}     onSuccess={()=>setPage('app')}/>}
      {page==='app'      &&<MarketplaceApp onSignOut={()=>setPage('landing')}/>}
    </>
  );
}
