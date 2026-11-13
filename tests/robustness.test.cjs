const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const src=fs.readFileSync(require('node:path').resolve(__dirname,'../app.js'),'utf8');
const stateCode=src.slice(src.indexOf('function restoredIndex('),src.indexOf("history.scrollRestoration='manual'"));
for(const value of ['null','[]','{"selected":99,"friend":-2,"featured":"2","scroll":-3}','{"selected":0,"friend":5,"featured":3,"scroll":234}','invalid']){
 const c={homeState:{scroll:0,selected:2,featured:0,friend:0},selected:2,SESSION_KEY:'test',sessionStorage:{getItem:()=>value}};
 vm.createContext(c);vm.runInContext(stateCode,c);assert(c.homeState.selected>=0&&c.homeState.selected<5);assert(c.homeState.scroll>=0);
 if(value.includes('234'))assert.equal(c.homeState.selected,0,'zero is a valid saved index');
}
const saveCode=src.slice(src.indexOf('function savePosition('),src.indexOf('function storeHome('));
const sc={history:{replaceState(){throw Error('SecurityError')}},scrollY:333,route:'home',selected:2,featuredIndex:1,friendIndex:4,homeState:{},saveSession(){}};
vm.createContext(sc);vm.runInContext(saveCode,sc);assert.doesNotThrow(()=>sc.savePosition());assert.equal(sc.homeState.scroll,333);
let handler;const linkCode=src.slice(src.indexOf("document.addEventListener('click',e=>{const a=e.target.closest('a')"),src.indexOf('function updateCover('));
let navigated=0,prevented=0;const lc={document:{addEventListener:(type,fn)=>handler=fn},location:{origin:'https://example.test',pathname:'/repo/',search:''},route:'home',goRoute:()=>navigated++};vm.createContext(lc);vm.runInContext(linkCode,lc);
function click(extra={},link={}){const a={origin:lc.location.origin,pathname:'/repo/',search:'',target:'',hash:'#/p1',dataset:{},getAttribute:()=> '#/p1',hasAttribute:()=>false,classList:{contains:()=>false},...link};handler({target:{closest:()=>a},button:0,preventDefault(){prevented++},...extra});}
click({ctrlKey:true});click({metaKey:true});click({}, {target:'_blank'});click({}, {origin:'https://other.test'});assert.equal(navigated,0);assert.equal(prevented,0);click();assert.equal(navigated,1);
// Exercise the production timer with a deterministic clock, including teardown.
let time=0,id=0,observer;const pending=new Map(),events={};const classes=new Set();
const button={classList:{add:x=>classes.add(x),remove:x=>classes.delete(x)},addEventListener:(n,fn)=>events[n]=fn,removeEventListener:(n)=>delete events[n]};
const c={document:{hidden:false,querySelector:()=>button,addEventListener(){},removeEventListener(){}},reduceMotion:{matches:false,addEventListener(){},removeEventListener(){}},IntersectionObserver:class{constructor(fn){this.fn=fn;observer=this}observe(){}disconnect(){}},setTimeout:(fn,ms)=>{pending.set(++id,{fn,at:time+ms});return id},clearTimeout:n=>pending.delete(n)};
vm.createContext(c);vm.runInContext(src.slice(src.indexOf('function mountAboutInvitation()'),src.indexOf('function mountHome()')),c);const cleanup=c.mountAboutInvitation();
function advance(end){while(true){const e=[...pending].sort((a,b)=>a[1].at-b[1].at)[0];if(!e||e[1].at>end)break;time=e[1].at;pending.delete(e[0]);e[1].fn()}time=end}
observer.fn([{isIntersecting:true,intersectionRatio:1}]);advance(4999);assert(!classes.has('is-waving'));advance(5000);assert(classes.has('is-waving'));events.animationend();advance(10000);assert(classes.has('is-waving'));events.pointerenter();assert(!classes.has('is-waving'));advance(20000);assert.equal(pending.size,0);events.pointerleave();advance(25000);assert(classes.has('is-waving'));c.document.hidden=true;observer.fn([{isIntersecting:false,intersectionRatio:0}]);assert.equal(pending.size,0);cleanup();assert.equal(pending.size,0);
console.log('Passed: malformed storage, index zero, history quota, external/modified links, Zoe 5s recurrence, hover pause and timer cleanup.');
