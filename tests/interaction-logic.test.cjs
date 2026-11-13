const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const src=fs.readFileSync(require('node:path').resolve(__dirname,'../app.js'),'utf8');
const code=src.slice(src.indexOf('function carouselRoute()'),src.indexOf('function refreshProjectLink()'));
let clock=0,serial=0,timers=new Map(),changes=[];
const ctx={route:'home',hoveredObject:null,document:{hidden:false},heroVisible:true,reduceMotion:{matches:false},manualUntil:0,moving:false,autoTimer:0,AUTO_INTERVAL:Number(src.match(/AUTO_INTERVAL=(\d+)/)[1]),MANUAL_IDLE:8000,Date:{now:()=>clock},setTimeout:(fn,ms)=>{timers.set(++serial,{at:clock+ms,fn});return serial;},clearTimeout:id=>timers.delete(id),change:()=>{changes.push(clock);ctx.scheduleAuto();}};
assert.equal(ctx.AUTO_INTERVAL,2000);
vm.createContext(ctx);vm.runInContext(code,ctx);
function advance(end){while(true){const next=[...timers].sort((a,b)=>a[1].at-b[1].at)[0];if(!next||next[1].at>end)break;clock=next[1].at;timers.delete(next[0]);next[1].fn();}clock=end;}
ctx.scheduleAuto();advance(1999);assert.equal(changes.length,0);advance(2000);assert.deepEqual(changes,[2000]);
ctx.manualActivity();advance(9999);assert.equal(changes.length,1);advance(10000);assert.deepEqual(changes,[2000,10000]);
ctx.document.hidden=true;ctx.scheduleAuto();advance(15000);assert.equal(changes.length,2);ctx.document.hidden=false;ctx.scheduleAuto();advance(17000);assert.equal(changes.length,3);
ctx.heroVisible=false;ctx.scheduleAuto();advance(22000);assert.equal(changes.length,3);ctx.heroVisible=true;ctx.reduceMotion.matches=true;ctx.scheduleAuto();advance(26000);assert.equal(changes.length,3);
const scrollCode=src.slice(src.indexOf('function fastScroll('),src.indexOf('function scrollToContent('));let pos=0,frames=[],samples=[];
const sc={scrollFrame:0,scrollY:0,innerHeight:936,document:{documentElement:{scrollHeight:5000}},reduceMotion:{matches:false},performance:{now:()=>0},cancelAnimationFrame:()=>{},requestAnimationFrame:fn=>{frames.push(fn);return 1;},scrollTo:(_,y)=>{pos=y;samples.push(y);},savePosition:()=>{}};
vm.createContext(sc);vm.runInContext(scrollCode,sc);sc.fastScroll(2000);for(let t=0;t<=480;t+=80){const f=frames.shift();if(f)f(t);}assert.equal(pos,2000);assert(samples.some(y=>y>0&&y<2000));assert(samples.every((y,i)=>i===0||y>=samples[i-1]));
console.log(JSON.stringify({autoplay:'2000ms interval',manualIdle:'8000ms, no early restart',pause:'hidden/offscreen/reduced motion',fastScrollSamples:samples}));

const pixelCode=src.slice(src.indexOf('function paintedPixel('),src.indexOf('function objectAt('));
const mask=new Uint8ClampedArray(10*10*4);mask[(5*10+5)*4+3]=255;
const canvas={width:10,height:10,getBoundingClientRect:()=>({left:20,top:10,width:100,height:200})};
const masks=new WeakMap();masks.set(canvas,mask);const pc={pixelMasks:masks};vm.createContext(pc);vm.runInContext(pixelCode,pc);
assert.equal(pc.paintedPixel(canvas,75,115),true,'painted body activates');
assert.equal(pc.paintedPixel(canvas,25,65),false,'transparent area in image does not activate');
assert.equal(pc.paintedPixel(canvas,75,20),false,'object-fit letterbox does not activate');
assert.equal(pc.paintedPixel(canvas,200,115),false,'outside image does not activate');
mask[(5*10+5)*4+3]=12;assert.equal(pc.paintedPixel(canvas,75,115),false,'invisible alpha does not activate');
ctx.reduceMotion.matches=false;ctx.hoveredObject={isConnected:true};ctx.scheduleAuto();advance(30000);assert.equal(changes.length,3,'hover pauses autoplay');
console.log('Alpha hit area, contain letterbox, bounds, alpha threshold and hover pause passed.');


ctx.hoveredObject=null;ctx.route='p5';ctx.scheduleAuto();const beforeDetail=changes.length;advance(32000);assert.equal(changes.length,beforeDetail+1,'detail hero uses the same autoplay interval');
ctx.heroVisible=false;ctx.scheduleAuto();advance(40000);assert.equal(changes.length,beforeDetail+1,'reading a detail pauses the hero');
const changeCode=src.slice(src.indexOf('function change('),src.indexOf('// Map viewport coordinates'));
let detailSyncs=0;const stageMock={querySelectorAll:()=>[]};const changeCtx={route:'p5',selected:4,moving:false,document:{querySelector:()=>stageMock},manualActivity(){},settleObjects(){},refreshProjectLink(){},storeHome(){},syncSelectedDetail(){detailSyncs++},setTimeout:()=>1,settleObjects(){},reduceMotion:{matches:false},MOVE_DURATION:650,scheduleAuto(){}};
vm.createContext(changeCtx);vm.runInContext(changeCode,changeCtx);changeCtx.change(1,false);assert.equal(changeCtx.selected,0);assert.equal(detailSyncs,0,'automatic rotation preserves the detail article');changeCtx.moving=false;changeCtx.change(1,true);assert.equal(detailSyncs,1,'only explicit selection switches the detail');
console.log('Detail autoplay, offscreen pause and explicit-only article switching passed.');
