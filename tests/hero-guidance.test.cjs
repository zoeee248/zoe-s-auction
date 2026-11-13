const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const src=fs.readFileSync(require('node:path').resolve(__dirname,'../app.js'),'utf8');
const code=src.slice(src.indexOf('function heroGuidanceEligible()'),src.indexOf('function cueShowScroll()'));
let clock=0,serial=0;const timers=new Map(),events=[];
const ctx={route:'home',heroVisible:true,scrollY:0,document:{hidden:false},heroGuidanceTimer:0,heroGuidanceSince:0,Date:{now:()=>clock},carouselRoute:()=>true,setTimeout(fn,ms){timers.set(++serial,{at:clock+ms,fn});return serial},clearTimeout(id){timers.delete(id)},cueShowScroll:()=>events.push(['home',clock]),cueOpening:()=>events.push(['detail',clock])};
vm.createContext(ctx);vm.runInContext(code,ctx);
function advance(to){while(true){const first=[...timers].sort((a,b)=>a[1].at-b[1].at)[0];if(!first||first[1].at>to)break;clock=first[1].at;timers.delete(first[0]);first[1].fn()}clock=to}
ctx.scheduleHeroGuidance(true);advance(4999);assert.equal(events.length,0);advance(5000);assert.deepEqual(events,[['home',5000]]);
advance(8000);ctx.scheduleHeroGuidance(true);advance(12999);assert.equal(events.length,1,'interaction restarts five seconds');advance(13000);assert.equal(events.length,2);
ctx.route='p5';ctx.scheduleHeroGuidance(true);advance(15799);assert.equal(events.length,2);advance(15800);assert.deepEqual(events.at(-1),['detail',15800]);advance(18600);assert.deepEqual(events.at(-1),['detail',18600]);
ctx.scrollY=9;ctx.scheduleHeroGuidance();advance(30000);assert.equal(events.length,4,'leaving top pauses reminders');ctx.scrollY=0;ctx.scheduleHeroGuidance(true);ctx.document.hidden=true;ctx.scheduleHeroGuidance();advance(40000);assert.equal(events.length,4,'background tab has no reminders');ctx.document.hidden=false;ctx.scheduleHeroGuidance(true);advance(42800);assert.equal(events.length,5,'returning starts a fresh delay');
console.log('Passed: home 5s inactivity, user activity reset, detail 2.8s recurrence, scroll-away and hidden pause.');
