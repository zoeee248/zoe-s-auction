const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const src=fs.readFileSync(require('node:path').resolve(__dirname,'../app.js'),'utf8');
const code=src.slice(src.indexOf('function heroGuidanceEligible()'),src.indexOf('function cueShowScroll()'));
let clock=0,serial=0;const timers=new Map(),events=[];
const ctx={route:'home',heroVisible:true,scrollY:0,document:{hidden:false},heroGuidanceTimer:0,heroGuidanceSince:0,Date:{now:()=>clock},carouselRoute:()=>ctx.route==='home',setTimeout(fn,ms){timers.set(++serial,{at:clock+ms,fn});return serial},clearTimeout(id){timers.delete(id)},cueShowScroll:()=>events.push(['home',clock]),cueOpening:()=>events.push(['detail',clock])};
vm.createContext(ctx);vm.runInContext(code,ctx);
function advance(to){while(true){const first=[...timers].sort((a,b)=>a[1].at-b[1].at)[0];if(!first||first[1].at>to)break;clock=first[1].at;timers.delete(first[0]);first[1].fn()}clock=to}
ctx.scheduleHeroGuidance(true);advance(4999);assert.equal(events.length,0);advance(5000);assert.deepEqual(events,[['home',5000]]);
advance(8000);ctx.scheduleHeroGuidance(true);advance(12999);assert.equal(events.length,1,'interaction restarts five seconds');advance(13000);assert.equal(events.length,2);
ctx.route='p5';ctx.scheduleHeroGuidance(true);advance(30000);assert.equal(events.length,2,'the personal detail has no hero reminder');
ctx.route='home';ctx.scrollY=9;ctx.scheduleHeroGuidance();advance(40000);assert.equal(events.length,2,'leaving top pauses reminders');
ctx.scrollY=0;ctx.document.hidden=true;ctx.scheduleHeroGuidance(true);advance(50000);assert.equal(events.length,2,'background tab has no reminders');
ctx.document.hidden=false;ctx.scheduleHeroGuidance(true);advance(55000);assert.equal(events.length,3,'returning starts a fresh five-second delay');
console.log('Passed: homepage 5s inactivity, user activity reset, no personal-detail hero, scroll-away and hidden pause.');
