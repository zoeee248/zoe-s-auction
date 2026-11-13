'use strict';
const items=[{page:4,name:'三角饭团',asset:'错落四杯咖啡塔.png'},{page:2,name:'诺亚方舟',asset:'流线型石墨帆船.png'},{page:1,name:'压缩包型人格',asset:'会走路的拉链文件夹.png'},{page:3,name:'魔女甜品店',asset:'透明背景的手绘巫师帽.png'},{page:5,name:'好事之徒',asset:'柔和线描瑜伽树式.png'}];
function homeBody(){return openingScene()+featuredScene()+growthScene()+exploreScene()+moreScene()+aboutScene();}

const handCharacterMap={"戏": "戲", "开": "開", "场": "場", "东": "東", "们": "們", "见": "見", "创": "創", "动": "動", "识": "識", "设": "設", "规": "規", "节": "節", "谢": "謝", "过": "過", "远": "遠", "历": "歷", "组": "組", "这": "這", "为": "為", "术": "術", "现": "現", "风": "風", "时": "時", "间": "間", "导": "導", "划": "劃", "爱": "愛", "书": "書", "无": "無", "种": "種", "听": "聽", "让": "讓", "还": "還", "实": "實", "样": "樣", "话": "話", "单": "單", "获": "獲", "带": "帶", "读": "讀", "页": "頁"};
function applyHandwriting(){document.querySelectorAll('.chapter-side .number,.chapter-side h2,.chapter-side .sub,.chapter-side .chapter-intro,.opening-copy,.about-kicker,.about-copy h3,.about-copy>p').forEach(root=>{const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);let n;while(n=walker.nextNode())n.textContent=[...n.textContent].map(c=>handCharacterMap[c]||c).join('');});}
function escapeText(value){return String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
function rail(id,num,title,sub,lead=''){return `<aside class="chapter-side"><div class="number">${num}</div><h2>${title}</h2><div class="sub">${sub}</div><img class="rail-art" src="${assetUrl('assets/chapters/'+chapterArt[id])}" alt="" width="220" height="260"><p class="chapter-intro">${lead}</p></aside>`;}
function openingScene(){return `<section id="intro" class="opening-section"><div class="section-grid">${rail('intro','01','「好」戏开场','欢迎来到秀场')}<div class="opening-copy"><p class="welcome reveal-line">女士们先生们，欢迎来到<span>『好东西秀场』</span></p><p class="creation reveal-line">你们将看到<span>想象力、创造力与行动力</span>的造物</p><p class="before-rules reveal-line">开场之前，有几条秀场的知识你可能需要了解</p><ol class="show-rules"><li class="reveal-line">秀场不设限</li><li class="reveal-line">秀场没有循规蹈矩的节目</li><li class="reveal-line">部分节目可能需要一点耐心，感谢理解</li></ol><p class="encounter reveal-line">——相信我，这会是一场<span>奇遇</span></p></div></div></section>`;}
function featuredScene(){return `<section id="works" class="featured-scene" aria-label="秀场代表作"><div class="featured-stage section-grid">${rail('works','02','拿手「好」戏','秀场代表作','集中体现创造力与想象力的几组“作品”')}<div class="featured-window"><div class="work-progress" role="img" aria-label="第1个代表作，共4个">${Array.from({length:4},(_,i)=>`<span ${i===0?'class="active"':''}></span>`).join('')}</div><div class="work-panels">${featuredData.projects.map((p,i)=>workPanel(p,i)).join('')}${friendPanel()}</div></div></div></section>`;}
function imageLink(path,p,i){return `<a class="work-image image-${i}" href="${escapeText(p.article)}" target="_blank" rel="noopener noreferrer" data-cursor="查看原文" aria-label="查看${escapeText(p.label)}原文（新标签打开）"><img src="${assetUrl(path)}" alt="${escapeText(p.label)}作品图 ${i+1}" decoding="async"></a>`;}
function workPanel(p,i){return `<article class="work-panel work-type-${i} ${i===featuredIndex?'is-active':''}" data-work="${i}" ${i===featuredIndex?'':'inert aria-hidden="true"'}><h3>${escapeText(p.title)}</h3><div class="work-copy"><div class="work-body-window"><div class="work-body">${p.body}</div></div><a class="work-talk" href="${escapeText(p.article)}" target="_blank" rel="noopener noreferrer">查看原文</a></div><div class="work-visual images-${p.images.length}">${p.images.map((src,j)=>imageLink(src,p,j)).join('')}</div></article>`;}
function friendPanel(){const f=featuredData.friends,slides=[...f.shots,{video:f.video,caption:'老辈子的建议，一定要听！'}];return `<article class="work-panel friends-panel ${featuredIndex===3?'is-active':''}" data-work="3" ${featuredIndex===3?'':'inert aria-hidden="true"'}><div class="friend-heading"><h3>${escapeText(f.title)}</h3><p>${escapeText(f.summary)}</p></div><div class="friend-titles" role="tablist" aria-label="朋友圈内容">${f.list.map((x,i)=>`<button id="friend-tab-${i}" class="friend-title ${i===friendIndex?'selected':''}" role="tab" aria-selected="${i===friendIndex}" aria-controls="friend-media-${i}" data-friend="${i}">${escapeText(x)}</button>`).join('')}</div><div class="friend-media">${slides.map((x,i)=>`<div id="friend-media-${i}" class="friend-slide ${i===friendIndex?'selected':''}" role="tabpanel" aria-labelledby="friend-tab-${i}" ${i===friendIndex?'':'inert aria-hidden="true"'}>${x.video?`<video controls playsinline preload="metadata" poster="${assetUrl('assets/content/friends-poster.webp')}" src="${assetUrl(x.video)}" aria-label="老师给年轻人的建议"></video>`:`<button class="screenshot-button" data-full-image="${escapeText(x.image)}" data-caption="${escapeText(x.caption)}" aria-label="放大朋友圈截图 ${i+1}"><img src="${assetUrl(x.image)}" alt="${escapeText(x.caption)}" decoding="async"></button>`}</div>`).join('')}</div><div class="friend-captions">${slides.map((x,i)=>`<p class="friend-caption ${i===friendIndex?'selected':''}" data-caption-index="${i}">${escapeText(x.caption)}</p>`).join('')}</div></article>`;}
function growthScene(){return `<section id="growth" class="growth-scene"><div class="growth-sticky section-grid">${rail('growth','03','「好」事多磨','好东西的生长痛','伴随好东西生长的几段重要经历')}<div class="growth-stage">${featuredData.growth.map((p,i)=>`<article class="growth-card card-${i}"><h3><button class="growth-toggle" aria-expanded="${i===0}" aria-controls="growth-detail-${i}">${escapeText(p.title)}<span class="growth-toggle-sign" aria-hidden="true">+</span></button></h3><div class="growth-card-content" id="growth-detail-${i}">${p.art?`<img class="growth-art" src="${assetUrl('assets/content/'+p.art+'.webp')}" alt="" width="180" height="140">`:''}<div class="growth-body-window"><div class="growth-body">${p.body}</div></div><label class="growth-scroll-control"><span>滑动阅读</span><input type="range" class="growth-scroll-range" min="0" max="100" value="0" aria-label="滚动阅读${escapeText(p.title)}"></label>${i===2?`<div class="bites-media"><a href="${escapeText(p.article)}" target="_blank" rel="noopener noreferrer" data-cursor="查看原文"><img src="${assetUrl(p.image)}" alt="Delta Bites 三角饭团" width="2555" height="3319"></a><a class="activity-link" href="${escapeText(p.article)}" target="_blank" rel="noopener noreferrer">第一期主办活动</a><a class="launch-link" href="${escapeText(p.launch)}" target="_blank" rel="noopener noreferrer">Delta Bites创刊</a></div>`:''}</div></article>`).join('')}</div></div></section>`;}
function exploreScene(){return `<section id="explore" class="explore-section"><div class="section-grid">${rail('explore','04','「好」高骛远','好，更好一点','围绕 AI 展开的探索。')}<div class="explore-accordion">${featuredData.explore.map((p,i)=>`<article class="explore-card explore-${i} ${i===0?'open':''}"><h3><button class="explore-toggle" aria-expanded="${i===0}">${escapeText(p.title)}</button></h3><img class="explore-art" src="${assetUrl('assets/content/'+p.art+'.webp')}" alt="" width="170" height="200"><span class="expand-dot" aria-hidden="true">+</span><div class="explore-detail" ${i===0?'':'inert'}><p class="explore-subtitle">${escapeText(p.subtitle.replace(/^—+/,''))}</p>${i===0?`<div class="digital-lead">${p.body.match(/<p>.*?<\/p>/)?.[0]||''}</div>`:''}${p.video?`<video class="digital-video" controls playsinline preload="none" poster="${assetUrl(p.poster)}" src="${assetUrl(p.video)}" aria-label="数字人演示视频"></video>`:''}${p.images?`<div class="phone-row">${p.images.map((src,j)=>`<img src="${assetUrl(src)}" alt="饭见界面 ${j+1}" loading="lazy">`).join('')}</div>`:''}<div class="explore-body">${i===0?p.body.replace(/<p>.*?<\/p>/,''):p.body}</div>${i===2?`<img class="collaboration-detail-art" src="${assetUrl('assets/content/'+p.art+'.webp')}" alt="" width="170" height="200">`:''}${p.link?`<a class="demo-link" href="${escapeText(p.link)}" target="_blank" rel="noopener noreferrer">查看demo</a>`:''}</div></article>`).join('')}</div></div></section>`;}
function moreScene(){return `<section id="more" class="more-section"><div class="section-grid">${rail('more','05','见「好」不收','好东西不能停','其他项目与摄影集')}<div class="more-content"><div class="project-list">${featuredData.more.map(p=>`<article class="archive-row"><img src="${assetUrl(p.image)}" alt="${escapeText(p.title)}封面" loading="lazy"><h3>${escapeText(p.title)}</h3><p>${escapeText(p.body)}</p></article>`).join('')}</div><div class="photos" aria-label="摄影作品">${featuredData.photos.map((row,i)=>`<div class="photo-row photo-row-${i}">${row.map((src,j)=>`<figure class="photo-item ${(i===2&&j===0)||(i===3&&j===1)?'portrait-restored':''}"><img src="${assetUrl(src)}" alt="Zoe 的摄影作品" ${intrinsicSize(src)} loading="lazy"></figure>`).join('')}</div>`).join('')}</div></div></div></section>`;}
function aboutScene(){return `<section id="about" class="about-section"><div class="section-grid">${rail('about','06','「好」事之徒','好事收藏家','hope you enjoy the show!')}<div class="about-content"><div class="about-main"><div class="about-copy"><p class="about-kicker">会一会秀场的总策划、总导演、主理人、策展人、主创——</p><h3>hi，我是zoe</h3><p>感谢你看到这里！</p><div class="about-principles"><p>选择创意与创造，对抗无趣与无聊</p><p>选择逆流而上，选择价值与理想</p><p>接受痛苦，选择长期主义，选择幸福</p></div></div><aside class="about-contact-card" aria-label="Zoe 的个人名片"><div class="about-card-top"><img class="contact-portrait" src="${assetUrl('assets/content/zoe-portrait.png')}" alt="Zoe 的 Mii 人物形象" loading="lazy"><a class="about-button" href="#/p5">zoe其人 <span aria-hidden="true">↗</span></a></div><h3 class="contact-card-title">联系我</h3><dl class="contact-card-details"><div><dt>邮箱</dt><dd><a href="mailto:2332174980@qq.com">2332174980@qq.com</a></dd></div><div><dt>电话</dt><dd><a href="tel:1516807570">1516807570</a></dd></div></dl><button class="contact-card-qr" data-full-image="assets/content/wechat-new.jpg" data-qr="true" data-caption="Zoe 的微信二维码" aria-label="放大微信二维码"><img class="qr-cutout" src="${assetUrl('assets/content/wechat-new.jpg')}" alt="微信二维码" width="96" height="96"></button></aside></div></div></div><footer class="about-footer"><button class="back-to-top">回到顶部 ↑</button></footer></section>`;}

let featuredCleanup=()=>{},contentCleanup=()=>{};
const phoneLayout=()=>matchMedia('(max-width: 800px)').matches;
function mountFeatured(){
 featuredCleanup();const scene=document.querySelector('.featured-scene');if(!scene)return;
 const stage=scene.querySelector('.featured-stage'),panels=[...scene.querySelectorAll('.work-panel')],progress=scene.querySelector('.work-progress'),friend=scene.querySelector('.friends-panel'),tabs=[...friend.querySelectorAll('.friend-title')],slides=[...friend.querySelectorAll('.friend-slide')],captions=[...friend.querySelectorAll('.friend-caption')],video=friend.querySelector('video');
 let frame=0,timer=0,index=-1,disposed=false,visible=false,slide=friendIndex;
 const stop=()=>{clearTimeout(timer);timer=0;};
 function placeCaption(){const b=tabs[slide],c=captions[slide];const top=b.offsetTop+b.offsetHeight-c.offsetHeight;c.style.setProperty('--caption-y',top+'px');}
 function setSlide(value){const previous=slide;slide=(value+6)%6;friendIndex=slide;if(previous!==slide)video.pause();tabs.forEach((b,i)=>{b.classList.toggle('selected',i===slide);b.setAttribute('aria-selected',String(i===slide));});slides.forEach((e,i)=>{e.classList.toggle('selected',i===slide);e.inert=i!==slide;e.setAttribute('aria-hidden',String(i!==slide));});captions.forEach((e,i)=>e.classList.toggle('selected',i===slide));placeCaption();storeHome();}
 function start(){stop();if(disposed||!visible||document.hidden||reduceMotion.matches||!video.paused||document.querySelector('.image-lightbox[open]'))return;timer=setTimeout(()=>{setSlide(slide+1);start();},3000);}
 tabs.forEach((b,i)=>b.addEventListener('click',()=>{video.pause();setSlide(i);start();}));
 friend.querySelector('.friend-titles').addEventListener('keydown',e=>{if(!['ArrowDown','ArrowUp','ArrowLeft','ArrowRight'].includes(e.key))return;e.preventDefault();const d=['ArrowDown','ArrowRight'].includes(e.key)?1:-1;video.pause();setSlide(slide+d);tabs[slide].focus({preventScroll:true});start();});
 const ended=()=>{setSlide(slide+1);start();};video.addEventListener('play',stop);video.addEventListener('ended',ended);video.addEventListener('pause',start);
 function measure(){if(!phoneLayout()){const heading=stage.querySelector('.chapter-side h2');stage.style.setProperty('--work-top',(heading.getBoundingClientRect().top-stage.getBoundingClientRect().top)+'px');stage.style.setProperty('--number-bottom',(stage.querySelector('.number').getBoundingClientRect().bottom-stage.getBoundingClientRect().top)+'px');}if(phoneLayout()){scene.style.height='auto';}else scene.style.height=(panels.length*innerHeight*.9+stage.offsetHeight+80)+'px';placeCaption();update();}
 function update(){frame=0;if(disposed)return;const mobile=phoneLayout(),d=Math.max(0,-scene.getBoundingClientRect().top),next=mobile?3:Math.min(3,Math.floor(d/(innerHeight*.9)));if(next!==index||mobile){index=next;featuredIndex=next;panels.forEach((p,i)=>{const active=mobile||i===next;p.classList.toggle('is-active',active);p.inert=!active;p.setAttribute('aria-hidden',String(!active));});progress.querySelectorAll('span').forEach((e,i)=>e.classList.toggle('active',i===next));progress.setAttribute('aria-label',`第${next+1}个代表作，共4个`);stage.classList.toggle('friends-active',!mobile&&next===3);hideImageCursor();}
 const fr=friend.getBoundingClientRect();visible=(mobile||index===3)&&fr.top<innerHeight*.8&&fr.bottom>innerHeight*.2;
 if(visible&&!document.hidden){if(!timer)start();}else{stop();video.pause();}}
 const request=()=>{if(!frame)frame=requestAnimationFrame(update);},visibility=()=>{stop();if(document.hidden)video.pause();update();},gallery=()=>{stop();if(!document.querySelector('.image-lightbox[open]'))start();};
 setSlide(slide);measure();addEventListener('scroll',request,{passive:true});addEventListener('resize',measure);document.addEventListener('visibilitychange',visibility);document.addEventListener('gallerychange',gallery);reduceMotion.addEventListener('change',visibility);
 featuredCleanup=()=>{disposed=true;stop();video.removeEventListener('play',stop);video.removeEventListener('pause',start);video.removeEventListener('ended',ended);video.pause();cancelAnimationFrame(frame);removeEventListener('scroll',request);removeEventListener('resize',measure);document.removeEventListener('visibilitychange',visibility);document.removeEventListener('gallerychange',gallery);reduceMotion.removeEventListener('change',visibility);};
}
function mountAboutInvitation(){
 const button=document.querySelector('#about .about-button');if(!button)return ()=>{};
 let visible=false,hovered=false,focused=false,timer=0,disposed=false;
 function stop(){clearTimeout(timer);timer=0;button.classList.remove('is-waving');}
 function schedule(){
  stop();if(disposed||!visible||hovered||focused||document.hidden||reduceMotion.matches)return;
  timer=setTimeout(pulse,5000);
 }
 function pulse(){timer=0;if(disposed||!visible||hovered||focused||document.hidden||reduceMotion.matches)return;button.classList.add('is-waving');timer=setTimeout(pulse,5000);}
 function pulseEnd(){button.classList.remove('is-waving');}
 const observer=new IntersectionObserver(([entry])=>{visible=entry.isIntersecting&&entry.intersectionRatio>=.6;if(visible)schedule();else stop();},{threshold:[0,.6,1]});observer.observe(button);
 const enter=()=>{hovered=true;stop();},leave=()=>{hovered=false;schedule();},focus=()=>{focused=true;stop();},blur=()=>{focused=false;schedule();};
 button.addEventListener('pointerenter',enter);button.addEventListener('pointerleave',leave);button.addEventListener('focus',focus);button.addEventListener('blur',blur);button.addEventListener('animationend',pulseEnd);
 document.addEventListener('visibilitychange',schedule);reduceMotion.addEventListener('change',schedule);
 return ()=>{disposed=true;stop();observer.disconnect();button.removeEventListener('pointerenter',enter);button.removeEventListener('pointerleave',leave);button.removeEventListener('focus',focus);button.removeEventListener('blur',blur);button.removeEventListener('animationend',pulseEnd);document.removeEventListener('visibilitychange',schedule);reduceMotion.removeEventListener('change',schedule);};
}
function mountHome(){
 contentCleanup();const growth=document.querySelector('.growth-scene');if(!growth)return;
 const cards=[...growth.querySelectorAll('.growth-card')],stage=growth.querySelector('.growth-stage'),acc=[...document.querySelectorAll('.explore-card')],clamp=(v,a,b)=>Math.min(b,Math.max(a,v));let frame=0,disposed=false;
 const reveals=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-revealed');reveals.unobserve(entry.target);}}),{threshold:.12});document.querySelectorAll('.photo-row').forEach(e=>reveals.observe(e));
 const opening=document.querySelector('.opening-section'),introLines=[...document.querySelectorAll('.reveal-line')];let growthOpen=0;
 function growthControls(){cards.forEach((c,i)=>{const mobile=phoneLayout(),button=c.querySelector('.growth-toggle'),content=c.querySelector('.growth-card-content'),port=c.querySelector('.growth-body-window'),slider=c.querySelector('.growth-scroll-range'),control=c.querySelector('.growth-scroll-control'),open=!mobile||growthOpen===i;button.disabled=!mobile;button.setAttribute('aria-expanded',String(open));content.hidden=!open;const overflow=port.scrollHeight-port.clientHeight;control.hidden=!mobile||!open||overflow<2;slider.value=overflow>0?String(Math.round(port.scrollTop/overflow*100)):'0';});}
 cards.forEach((c,i)=>{const button=c.querySelector('.growth-toggle'),port=c.querySelector('.growth-body-window'),slider=c.querySelector('.growth-scroll-range');button.addEventListener('click',()=>{if(!phoneLayout())return;growthOpen=growthOpen===i?-1:i;growthControls();requestAnimationFrame(growthControls);});port.addEventListener('scroll',()=>{const max=port.scrollHeight-port.clientHeight;slider.value=max>0?String(Math.round(port.scrollTop/max*100)):'0';},{passive:true});slider.addEventListener('input',()=>{port.scrollTop=(port.scrollHeight-port.clientHeight)*Number(slider.value)/100;});});
 function select(i){acc.forEach((c,j)=>{const open=phoneLayout()||i===j;c.classList.toggle('open',open);c.querySelector('button').setAttribute('aria-expanded',String(open));c.querySelector('.explore-detail').inert=!open;if(!open)c.querySelector('video')?.pause();});}
 function measure(){const about=document.querySelector('#about'),ac=about?.querySelector('.about-content'),kicker=about?.querySelector('.about-kicker'),sub=about?.querySelector('.sub');if(ac&&kicker&&sub&&!phoneLayout())ac.style.setProperty('--about-kicker-top',(sub.getBoundingClientRect().bottom-ac.getBoundingClientRect().top-kicker.offsetHeight)+'px');introLines.forEach(e=>{if(phoneLayout())reveals.observe(e);else reveals.unobserve(e);});growthControls();if(phoneLayout()){growth.style.height='auto';cards.forEach(c=>c.style.transform='none');}else{growth.style.height=(innerHeight*2.25+stage.offsetHeight+160)+'px';}select(Math.max(0,acc.findIndex(c=>c.classList.contains('open'))));update();}
 function update(){frame=0;if(disposed)return;if(!phoneLayout()){const progress=clamp((80-opening.getBoundingClientRect().top)/Math.max(1,opening.offsetHeight-innerHeight),0,1);introLines.forEach((e,i)=>{const reveal=clamp((progress*introLines.length-i)*1.5,0,1);e.style.setProperty('--intro-reveal',String(reveal));});const d=-growth.getBoundingClientRect().top,h=stage.clientHeight;cards.forEach((e,i)=>{const start=(i-1)*innerHeight*.85+innerHeight*.3,p=i===0?1:clamp((d-start)/(innerHeight*.7),0,1);e.style.transform=`translateY(${i===0?0:(h+80)*(1-p)+i*64*p}px)`;});}
 document.querySelectorAll('nav a').forEach(a=>{const e=document.getElementById(a.hash.split('/').pop());if(e){const r=e.getBoundingClientRect();if(r.top<innerHeight*.4&&r.bottom>innerHeight*.4)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current');}});}
 const request=()=>{if(!frame)frame=requestAnimationFrame(update);};
 const videos=[...document.querySelectorAll('.digital-video')],videoObserver=new IntersectionObserver(entries=>entries.forEach(e=>{if(!e.isIntersecting)e.target.pause();}),{threshold:0});videos.forEach(v=>videoObserver.observe(v));const visibility=()=>{if(document.hidden)videos.forEach(v=>v.pause());};document.addEventListener('visibilitychange',visibility);
 acc.forEach((c,i)=>{c.addEventListener('pointerenter',e=>{if(!phoneLayout()&&e.pointerType!=='touch')select(i);});c.querySelector('button').addEventListener('focus',()=>{if(!phoneLayout())select(i);});c.querySelector('button').addEventListener('click',()=>select(i));});
 document.querySelector('.back-to-top')?.addEventListener('click',()=>fastScroll(0));
 addEventListener('scroll',request,{passive:true});addEventListener('resize',measure);measure();
 const aboutInvitationCleanup=mountAboutInvitation();
 contentCleanup=()=>{aboutInvitationCleanup();disposed=true;cancelAnimationFrame(frame);removeEventListener('scroll',request);removeEventListener('resize',measure);reveals.disconnect();videoObserver.disconnect();document.removeEventListener('visibilitychange',visibility);videos.forEach(v=>v.pause());};
}
function openScreenshot(button){
 const dialog=document.createElement('dialog');dialog.className='image-lightbox';dialog.setAttribute('aria-label','图片大图');dialog.innerHTML=`<button class="close-lightbox" aria-label="关闭大图">×</button><figure><img class="${button.dataset.qr?'qr-cutout':''}" src="${assetUrl(button.dataset.fullImage)}" alt="${escapeText(button.dataset.caption)}"><figcaption>${escapeText(button.dataset.caption)}</figcaption></figure>`;document.body.append(dialog);const previousOverflow=document.body.style.overflow;document.body.style.overflow='hidden';dialog.showModal();hideImageCursor();document.dispatchEvent(new Event('gallerychange'));
 const close=()=>dialog.close();dialog.querySelector('button').addEventListener('click',close);dialog.addEventListener('click',e=>{if(e.target===dialog)close();});dialog.addEventListener('close',()=>{document.body.style.overflow=previousOverflow;dialog.remove();if(button.isConnected)button.focus({preventScroll:true});document.dispatchEvent(new Event('gallerychange'));},{once:true});
}
document.addEventListener('click',e=>{if(e.target.closest('[data-detail-top]')){returnDetailTop();return;}const button=e.target.closest('[data-full-image]');if(button)openScreenshot(button);});

let imageCursor=null;
function hideImageCursor(){imageCursor?.classList.remove('is-visible');}
function followImageCursor(e){const hit=e.target.closest('[data-cursor]');if(!hit||hit.closest('[inert]')){hideImageCursor();return;}if(!imageCursor){imageCursor=document.createElement('span');imageCursor.className='image-cursor';imageCursor.setAttribute('aria-hidden','true');document.body.append(imageCursor);}imageCursor.textContent=hit.dataset.cursor;imageCursor.classList.add('is-visible');const width=imageCursor.offsetWidth,height=imageCursor.offsetHeight;imageCursor.style.transform=`translate3d(${Math.max(8,Math.min(innerWidth-width-8,e.clientX+8))}px,${Math.min(innerHeight-height-8,e.clientY+18)}px,0)`;}
document.addEventListener('pointermove',followImageCursor);document.addEventListener('pointerout',e=>{if(!e.relatedTarget||!e.relatedTarget.closest?.('[data-cursor]'))hideImageCursor();});document.addEventListener('click',hideImageCursor);
function detailHTML(page){return (details[page]||'<p>详情载入失败，请刷新页面。</p>').replace(/src="([^"]+)"/g,(_,src)=>`src="${assetUrl(decodeURI(src))}"`);}

// Browser-rendered fill uses the approved transparent contour; the source PNG is unchanged.
const assetCache=new Map();
async function paint(canvas){const file=canvas.dataset.asset;let image=assetCache.get(file);if(!image){image=new Image();image.src=assetUrl('assets/'+file);assetCache.set(file,image);}await image.decode();const ctx=canvas.getContext('2d',{willReadFrequently:true}),w=canvas.width,h=canvas.height;ctx.drawImage(image,0,0,w,h);const pixels=ctx.getImageData(0,0,w,h),d=pixels.data;const outside=new Uint8Array(w*h),queue=new Int32Array(w*h);let head=0,tail=0;function add(i){if(outside[i]||d[i*4+3]>60)return;outside[i]=1;queue[tail++]=i;}
for(let x=0;x<w;x++){add(x);add((h-1)*w+x);}for(let y=0;y<h;y++){add(y*w);add(y*w+w-1);}while(head<tail){const i=queue[head++],x=i%w;if(x)add(i-1);if(x<w-1)add(i+1);if(i>=w)add(i-w);if(i<w*(h-1))add(i+w);}
// Color enclosed regions independently; keep the approved contour and source intact.
const seen=new Uint8Array(w*h),cream=[255,241,206],gold=[243,211,53],blue=[106,160,167];
function regionColor(cx,cy){
 if(file.includes('文件夹'))return cy<.285?cream:cy>.69?cream:(Math.abs(cx-.5)<.065&&cy<.41)?blue:gold;
 if(file.includes('帆船'))return cy<.59?cream:gold;
 if(file.includes('巫师帽'))return cy>.62&&cy<.74?gold:cream;
 if(file.includes('咖啡'))return cy<.4||cy>.65?gold:cream;
 return cream;
}
for(let seed=0;seed<w*h;seed++){
 if(outside[seed]||seen[seed]||d[seed*4+3]>60)continue;
 head=0;tail=0;queue[tail++]=seed;seen[seed]=1;let sx=0,sy=0;
 while(head<tail){const i=queue[head++],x=i%w,y=(i/w)|0;sx+=x;sy+=y;
  for(const j of [x?i-1:-1,x<w-1?i+1:-1,y?i-w:-1,y<h-1?i+w:-1])if(j>=0&&!outside[j]&&!seen[j]&&d[j*4+3]<=60){seen[j]=1;queue[tail++]=j;}
 }
 if(tail<12)continue;
 const color=regionColor(sx/tail/w,sy/tail/h);
 for(let k=0;k<tail;k++){const i=queue[k]*4;d[i]=color[0];d[i+1]=color[1];d[i+2]=color[2];d[i+3]=255;}
}
ctx.putImageData(pixels,0,0);}
function assetUrl(path){return path;}
const imageDimensions={"assets/content/photo-20261112-060337.webp": [1600, 1200], "assets/content/photo-20261112-060315.webp": [1600, 1200], "assets/content/photo-20261112-060318.webp": [1600, 1200], "assets/content/photo-20261112-060330.webp": [1600, 1200], "assets/content/photo-20261112-060324.webp": [1200, 1600], "assets/content/photo-20261112-060416.webp": [1600, 1200], "assets/content/photo-20261112-060405.webp": [1600, 1200], "assets/content/photo-20261112-060354.webp": [1600, 1200], "assets/content/photo-20261112-060349.webp": [1600, 1200], "assets/content/photo-20261112-060357.webp": [1600, 1200]};
function intrinsicSize(src){const [width,height]=imageDimensions[src]||[];return width?`width="${width}" height="${height}"`:'';}
const app=document.querySelector('#app');
document.body.classList.add('immersive-hero');
const SESSION_KEY='showroom-content-r5';
const reduceMotion=matchMedia('(prefers-reduced-motion: reduce)');
const AUTO_INTERVAL=2000,MANUAL_IDLE=8000,MOVE_DURATION=650;
let selected=2,route='',details={},featuredData={},renderId=0,navigationMode='',restoring=false;
let featuredIndex=0,friendIndex=0;
let homeState={scroll:0,selected:2,featured:0,friend:0};
let autoTimer=0,moveTimer=0,scrollFrame=0,heroObserver=null,heroVisible=false,manualUntil=0,moving=false;
let detailNavigationCleanup=()=>{},openingHintTimer=0,pendingOpeningHint=false;
let heroGuidanceTimer=0,heroGuidanceSince=Date.now();
function restoredIndex(value, max, fallback=0){
 return Number.isInteger(value)&&value>=0&&value<=max?value:fallback;
}
try{
 const saved=JSON.parse(sessionStorage.getItem(SESSION_KEY)||'{}');
 homeState={
  scroll:Number.isFinite(saved?.scroll)&&saved.scroll>=0?saved.scroll:0,
  selected:restoredIndex(saved?.selected,4,2),
  featured:restoredIndex(saved?.featured,3),
  friend:restoredIndex(saved?.friend,5)
 };
 selected=homeState.selected;
}catch{}
history.scrollRestoration='manual';
function saveSession(){try{sessionStorage.setItem(SESSION_KEY,JSON.stringify(homeState));}catch{}}
function savePosition(){try{history.replaceState({...history.state,scroll:scrollY,...(route==='home'?{selected,featured:featuredIndex,friend:friendIndex}:{})},'');}catch{/* Browsers may temporarily limit history writes; reading must continue. */}if(route==='home'){homeState={scroll:scrollY,selected,featured:featuredIndex,friend:friendIndex};saveSession();}}
function storeHome(){if(route==='home'&&!restoring)savePosition();}
const chapterArt={intro:'敞开的剧场帷幕.png',works:'旋转木马音乐盒.png',growth:'贝壳中的圆润珍珠.png',explore:'举望远镜的小人.png',more:'展开风箱的手风琴.png',about:'树式瑜伽人物.png'};
function currentPage(){return route==='home'?0:Number(route.slice(1));}
function projectTarget(){const p=currentPage();return p===items[selected].page?'#body':'#/p'+items[selected].page;}
function objectTransform(offset){const distance=Math.abs(offset);const scale=distance===0?1.25:distance===1?.63:.43;return `translateX(${offset*66.666667}%) scale(${scale})`;}
function objectMarkup(offset){const index=(selected+offset+10)%5;const item=items[index];const outside=Math.abs(offset)>2;return `<button class="object ${offset===0?'is-current':''}" data-item="${index}" data-offset="${offset}" style="transform:${objectTransform(offset)};opacity:${outside?0:1};z-index:${3-Math.abs(offset)}"  ${outside?'aria-hidden="true" tabindex="-1"':''} aria-label="${offset===0?'打开':'选择'}${item.name}${offset===0?'详情':''}"><canvas data-asset="${item.asset}" data-color="${item.page===5?'cream':'yellow'}" width="628" height="628" role="img" aria-label="${item.name}"></canvas></button>`;}
function objectsMarkup(){return [-4,-3,-2,-1,0,1,2,3,4].map(offset=>objectMarkup(offset)).join('');}
function hero(p){return `<section class="hero " aria-label="秀场首屏"><a class="hero-title" href="#/" data-home="restore" aria-label="好东西秀场，返回首页"><img src="${assetUrl('assets/title/showroom.svg')}" alt="好东西秀场" width="2183" height="720" fetchpriority="high"></a><div class="beam"></div><div class="pool"></div><div class="objects" role="group" aria-label="项目物件轮播">${objectsMarkup()}</div><button class="hero-arrow prev" aria-label="上一个物件" >‹</button><button class="hero-arrow next" aria-label="下一个物件" >›</button><div class="hero-bottom"><a class="project-link" href="${projectTarget()}">${items[selected].name}</a><div class="indicators" role="group" aria-label="五个物件切换">${items.map((x,i)=>`<button  aria-label="切换到${x.name}" aria-pressed="${i===selected}" data-index="${i}"></button>`).join('')}</div></div><div class="english tagline">no good thing ever dies</div><div class="english signature">zoe/portfolio</div><a class="scroll-cue" href="#body"><span class="scroll-cue-label">${p?'下滑查看详情':'下滑查看秀场'}</span> <span aria-hidden="true">↓</span></a><div class="glow-divider" aria-hidden="true"><i></i></div></section>`;}
const filledCache=new Map(),pixelMasks=new WeakMap(),sourceMasks=new WeakMap(),groundBounds=new WeakMap();
let hoveredObject=null,lastPointer=null;
async function paintAll(){await Promise.all([...document.querySelectorAll('canvas[data-asset]')].map(async c=>{try{const key=c.dataset.asset+c.dataset.color;let ready=filledCache.get(key);if(!ready){ready=paint(c).then(()=>{const copy=document.createElement('canvas');copy.width=c.width;copy.height=c.height;copy.getContext('2d').drawImage(c,0,0);return copy;});filledCache.set(key,ready);}const source=await ready;if(c.isConnected){c.getContext('2d').drawImage(source,0,0);let mask=sourceMasks.get(source);if(!mask){mask=source.getContext('2d').getImageData(0,0,source.width,source.height).data;sourceMasks.set(source,mask);}pixelMasks.set(c,mask);c.dataset.hitReady='true';measureObjectGround(c,mask);}}catch{c.setAttribute('aria-label','物件载入失败');}}));}
// Alpha bounds keep ground shadows under the original independent artwork.
function measureObjectGround(canvas,mask){
 const el=canvas.closest('.object'),hero=canvas.closest('.hero');if(!el||!hero||!mask)return;
 let bounds=groundBounds.get(mask);
 if(!bounds){
  let minX=canvas.width,maxX=0,maxY=0;
  for(let y=0;y<canvas.height;y++)for(let x=0;x<canvas.width;x++)if(mask[(y*canvas.width+x)*4+3]>80){minX=Math.min(minX,x);maxX=Math.max(maxX,x);maxY=Math.max(maxY,y);}
  bounds={minX,maxX,maxY};groundBounds.set(mask,bounds);
 }
 const {minX,maxX,maxY}=bounds;
 const w=el.clientWidth,h=el.clientHeight,size=Math.min(w,h),cx=(w-size)/2+(minX+maxX)/2/canvas.width*size,foot=(h-size)/2+maxY/canvas.height*size;
 el.style.setProperty('--foot-x',cx+'px');el.style.setProperty('--foot-y',foot+'px');el.style.setProperty('--foot-width',Math.max(24,(maxX-minX)/canvas.width*size*.68)+'px');
 if(el.classList.contains('is-current')){const stage=el.parentElement;hero.style.setProperty('--floor-y',(stage.offsetTop+h*.7+(foot-h*.7)*1.25)+'px');hero.style.setProperty('--floor-x',(stage.offsetLeft+el.offsetLeft+w/2+(cx-w/2)*1.25)+'px');hero.style.setProperty('--floor-width',Math.max(300,(maxX-minX)/canvas.width*size*2.4)+'px');}
}
function carouselRoute(){return route==='home'||/^p[1-5]$/.test(route);}
function manualActivity(){manualUntil=Date.now()+MANUAL_IDLE;clearTimeout(autoTimer);scheduleAuto();}
function scheduleAuto(delay){clearTimeout(autoTimer);if(!carouselRoute()||document.hidden||!heroVisible||reduceMotion.matches||hoveredObject?.isConnected)return;const wait=delay??Math.max(AUTO_INTERVAL,manualUntil-Date.now());autoTimer=setTimeout(()=>{if(carouselRoute()&&!document.hidden&&heroVisible&&Date.now()>=manualUntil&&!moving)change(1,false);else scheduleAuto();},wait);}
function refreshProjectLink(){const a=document.querySelector('.project-link');if(!a)return;a.href=projectTarget();a.textContent=items[selected].name;document.querySelectorAll('[data-index]').forEach(b=>b.setAttribute('aria-pressed',String(Number(b.dataset.index)===selected)));}
function settleObjects(){clearTimeout(moveTimer);moving=false;const stage=document.querySelector('.objects');if(stage){const focused=stage.contains(document.activeElement)?document.activeElement.dataset.item:null;stage.innerHTML=objectsMarkup();hoveredObject=null;paintAll().then(updateHover);if(focused!==null)stage.querySelector(`[data-item="${focused}"]:not([aria-hidden])`)?.focus({preventScroll:true});}}
function change(delta,manual=true,sync=true){if(manual)manualActivity();if(moving)settleObjects();delta=((delta+7)%5)-2;if(!delta){if(manual&&sync)syncSelectedDetail();scheduleAuto();return;}selected=(selected+delta+5)%5;const stage=document.querySelector('.objects');if(!stage)return;moving=true;stage.querySelectorAll('.object').forEach(el=>{const offset=Number(el.dataset.offset)-delta;el.dataset.offset=offset;el.style.transform=objectTransform(offset);el.style.opacity=Math.abs(offset)>2?'0':'1';el.style.zIndex=String(3-Math.abs(offset));el.classList.toggle('is-current',offset===0);if(Math.abs(offset)>2){el.setAttribute('aria-hidden','true');el.tabIndex=-1;}else{el.removeAttribute('aria-hidden');el.tabIndex=0;}el.setAttribute('aria-label',(offset===0?'打开':'选择')+items[Number(el.dataset.item)].name+(offset===0?'详情':''));});stage.querySelectorAll('canvas').forEach(c=>measureObjectGround(c,pixelMasks.get(c)));refreshProjectLink();if(route==='home')storeHome();if(manual&&sync)syncSelectedDetail();moveTimer=setTimeout(settleObjects,reduceMotion.matches?0:MOVE_DURATION);scheduleAuto();}
// Map viewport coordinates through object-fit:contain; transparent pixels never activate.
function paintedPixel(canvas,x,y){
 const mask=pixelMasks.get(canvas);if(!mask)return false;
 const r=canvas.getBoundingClientRect(),scale=Math.min(r.width/canvas.width,r.height/canvas.height);
 if(!scale)return false;
 const px=Math.floor((x-r.left-(r.width-canvas.width*scale)/2)/scale);
 const py=Math.floor((y-r.top-(r.height-canvas.height*scale)/2)/scale);
 return px>=0&&py>=0&&px<canvas.width&&py<canvas.height&&mask[(py*canvas.width+px)*4+3]>32;
}
function objectAt(x,y){
 const objects=[...document.querySelectorAll('.object:not([aria-hidden]):not(:disabled)')];
 objects.sort((a,b)=>Number(b.style.zIndex)-Number(a.style.zIndex));
 return objects.find(el=>paintedPixel(el.querySelector('canvas'),x,y))||null;
}
function updateHover(){
 const next=lastPointer?objectAt(lastPointer.x,lastPointer.y):null;
 document.querySelector('.hero')?.classList.toggle('has-object-hit',!!next);
 if(next===hoveredObject)return;
 hoveredObject?.classList.remove('is-hovered');hoveredObject=next;
 next?.classList.add('is-hovered');
 if(next)clearTimeout(autoTimer);else scheduleAuto();
}
function activateObject(obj){
 manualActivity();const offset=Number(obj.dataset.offset);
 if(offset!==0)change(offset);else{const target=projectTarget();if(target==='#body')scrollToContent();else goRoute(target,'project-open');}
}
function bindHero(){
 hoveredObject=null;lastPointer=null;
 paintAll();const el=document.querySelector('.hero');
 el.addEventListener('pointermove',e=>{if(e.pointerType==='touch')return;lastPointer={x:e.clientX,y:e.clientY};updateHover();});
 el.addEventListener('pointerleave',()=>{lastPointer=null;updateHover();});
 el.addEventListener('click',e=>{
  if(e.target.closest('.project-link,.scroll-cue,.hero-arrow,.indicators'))return;
  const keyboard=e.detail===0&&e.target.closest('.object');
  const obj=keyboard||objectAt(e.clientX,e.clientY);
  const r=el.querySelector('.objects').getBoundingClientRect();
  const inStage=e.clientX>=r.left&&e.clientX<=r.right&&e.clientY>=r.top&&e.clientY<=r.bottom;
  if(obj){e.preventDefault();e.stopImmediatePropagation();activateObject(obj);}
  else if(inStage||[...el.querySelectorAll('.object:not([aria-hidden]) canvas')].some(c=>{const box=c.getBoundingClientRect();return e.clientX>=box.left&&e.clientX<=box.right&&e.clientY>=box.top&&e.clientY<=box.bottom;})||e.target.closest('.object')){e.preventDefault();e.stopImmediatePropagation();}
 },true);
 el.addEventListener('click',e=>{const b=e.target.closest('[data-index]');if(b){change(Number(b.dataset.index)-selected);return;}if(e.target.closest('.prev'))change(-1);else if(e.target.closest('.next'))change(1);});
 heroObserver?.disconnect();heroObserver=new IntersectionObserver(([entry])=>{heroVisible=entry.isIntersecting&&entry.intersectionRatio>=.3;document.documentElement.classList.toggle('motion-paused',document.hidden||!heroVisible);scheduleAuto();scheduleHeroGuidance(true);},{threshold:[0,.3,1]});heroObserver.observe(el);
}
// Only explicit navigation animates. History restoration remains immediate.
function fastScroll(y){cancelAnimationFrame(scrollFrame);const from=scrollY,target=Math.max(0,Math.min(y,document.documentElement.scrollHeight-innerHeight));if(reduceMotion.matches||Math.abs(target-from)<2){scrollTo(0,target);savePosition();return;}const started=performance.now(),duration=480;function frame(now){const t=Math.min(1,(now-started)/duration),progress=1-Math.pow(1-t,3);scrollTo(0,from+(target-from)*progress);if(t<1)scrollFrame=requestAnimationFrame(frame);else{scrollFrame=0;savePosition();}}scrollFrame=requestAnimationFrame(frame);}
function contentTop(target){return target.getBoundingClientRect().top+scrollY-(target.classList.contains('detail')?(document.querySelector('header')?.offsetHeight||0):0);}
function scrollToContent(){manualActivity();const target=document.querySelector('#body')||document.querySelector('#intro');if(target)fastScroll(contentTop(target));}
function goRoute(hash,mode){savePosition();navigationMode=mode;if(location.hash===hash)navigate();else location.hash=hash;}
function heroGuidanceEligible(){return carouselRoute()&&heroVisible&&!document.hidden&&scrollY<=8;}
function scheduleHeroGuidance(reset=false){
 clearTimeout(heroGuidanceTimer);heroGuidanceTimer=0;
 if(reset)heroGuidanceSince=Date.now();
 if(!heroGuidanceEligible())return;
 const delay=route==='home'?5000:2800;
 heroGuidanceTimer=setTimeout(()=>{
  heroGuidanceTimer=0;if(!heroGuidanceEligible())return;
  if(route==='home')cueShowScroll();else cueOpening();
  heroGuidanceSince=Date.now();scheduleHeroGuidance();
 },Math.max(0,delay-(Date.now()-heroGuidanceSince)));
}
function cueShowScroll(){
 const cue=document.querySelector('.scroll-cue');if(!cue)return;
 cue.classList.remove('is-idle-inviting');
 requestAnimationFrame(()=>{if(route==='home'&&heroGuidanceEligible())cue.classList.add('is-idle-inviting');});
}
function cueOpening(){
 const link=document.querySelector('.opening-link');if(!link)return;
 clearTimeout(openingHintTimer);link.classList.remove('is-inviting');
 requestAnimationFrame(()=>{if(!pendingOpeningHint&&route!=='home'&&heroGuidanceEligible()){link.classList.add('is-inviting');openingHintTimer=setTimeout(()=>link.classList.remove('is-inviting'),1800);}});
}
function returnDetailTop(){
 if(route==='home'){fastScroll(0);return;}
 const original=items.findIndex(item=>item.page===currentPage());
 if(original>=0&&original!==selected)change(original-selected,false,false);
 manualActivity();pendingOpeningHint=true;fastScroll(0);
 if(scrollY<2){pendingOpeningHint=false;cueOpening();}
}
function mountDetailNavigation(){
 detailNavigationCleanup();
 const sentinel=document.querySelector('.detail-end'),bar=document.querySelector('.show-invitation');if(!sentinel||!bar)return;
 const observer=new IntersectionObserver(([entry])=>{
  const show=entry.isIntersecting&&!document.hidden;
  bar.classList.toggle('is-visible',show);bar.inert=!show;bar.setAttribute('aria-hidden',String(!show));
 },{threshold:0,rootMargin:'0px 0px 8px 0px'});
 observer.observe(sentinel);
 const visibility=()=>{if(document.hidden){bar.classList.remove('is-visible');bar.inert=true;bar.setAttribute('aria-hidden','true');}else{observer.unobserve(sentinel);observer.observe(sentinel);}};
 document.addEventListener('visibilitychange',visibility);
 detailNavigationCleanup=()=>{observer.disconnect();document.removeEventListener('visibilitychange',visibility);};
}
function clearDetailGuidance(){clearTimeout(heroGuidanceTimer);heroGuidanceTimer=0;detailNavigationCleanup();detailNavigationCleanup=()=>{};pendingOpeningHint=false;clearTimeout(openingHintTimer);document.querySelector('.opening-link')?.classList.remove('is-inviting');}
function pageBody(p){
 const content=!p?homeBody():`<div id="body" class="detail">${detailHTML(p)}<footer class="detail-footer"><button class="detail-back-to-top" data-detail-top>回到顶部 ↑</button></footer><div class="detail-end" aria-hidden="true"></div></div><aside class="show-invitation" aria-label="前往主秀场" aria-hidden="true" inert><p>🎊 精彩才刚开始，去主秀场看看</p><a class="show-go" href="#/chapter/intro" aria-label="GO，前往主秀场开场">GO <span aria-hidden="true">→</span></a></aside>`;
 return p>=1&&p<=5?content.replace(/(<a\b[^>]*class="return"[\s\S]*?<\/a>)(\s*<h1>[\s\S]*?<\/h1>)/,'<div class="detail-heading">$1$2</div>'):content;
}
function pageMeta(p,chapterMatch,hash){
 document.title=(p?['','压缩包型人格','诺亚方舟','魔女甜品店','三角饭团','好事之徒','创意朋友圈'][p]+' · ':'')+'好东西秀场';
 document.querySelectorAll('nav a').forEach(a=>a.removeAttribute('aria-current'));const active=document.querySelector(p===5?'nav a:last-child':chapterMatch?`nav a[href="${hash}"]`:'nav a[aria-current]');active?.setAttribute('aria-current',p===5?'page':'location');
}
function syncSelectedDetail(){
 clearDetailGuidance();featuredCleanup();contentCleanup();clearTimeout(autoTimer);
 const cover=document.querySelector('.hero-cover');if(cover){const hero=cover.firstElementChild;hero.style.opacity='1';cover.replaceWith(hero);}document.body.classList.remove('home-route');
 cancelAnimationFrame(scrollFrame);scrollFrame=0;
 const p=items[selected].page,hash='#/p'+p,fromY=scrollY;
 savePosition();
 if(location.hash!==hash)history.pushState({scroll:fromY},'',hash);
 route='p'+p;
 document.querySelector('#page-content').innerHTML=pageBody(p);mountDetailNavigation();
 document.querySelector('.scroll-cue-label').textContent='下滑查看详情';
 pageMeta(p,null,hash);refreshProjectLink();
 scrollTo(0,fromY);savePosition();scheduleAuto();scheduleHeroGuidance(true);
}
function navigate(){document.querySelector('.image-lightbox[open]')?.close();clearTimeout(positionTimer);positionTimer=0;clearDetailGuidance();featuredCleanup();contentCleanup();clearTimeout(autoTimer);clearTimeout(moveTimer);cancelAnimationFrame(scrollFrame);moving=false;restoring=true;const mode=navigationMode;navigationMode='';const id=++renderId;const fromY=scrollY;let hash=location.hash||'#/';if(hash==='#/p6'){hash='#/';history.replaceState(null,'',hash);}const chapterMatch=hash.match(/^#\/chapter\/(intro|works|growth|explore|more|about)$/);const pMatch=hash.match(/^#\/p([1-5])$/);const p=pMatch?Number(pMatch[1]):0;route=p?'p'+p:'home';if(p)selected=items.findIndex(x=>x.page===p);else if(!p)selected=mode==='home-return'?2:restoredIndex(history.state?.selected,4,homeState.selected);
if(mode==='home-return'){homeState.selected=2;saveSession();manualUntil=Date.now()+MANUAL_IDLE;}
document.title=(p?['','压缩包型人格','诺亚方舟','魔女甜品店','三角饭团','好事之徒','创意朋友圈'][p]+' · ':'')+'好东西秀场';
if(!p){featuredIndex=restoredIndex(history.state?.featured,3,homeState.featured);friendIndex=restoredIndex(history.state?.friend,5,homeState.friend);}
heroGuidanceSince=Date.now();app.innerHTML=(p?hero(p):'<div class="hero-cover">'+hero(p)+'</div>')+'<div id="page-content">'+pageBody(p)+'</div>';document.body.classList.toggle('home-route',!p);applyHandwriting();bindHero();if(!p){mountFeatured();mountHome();}else mountDetailNavigation();pageMeta(p,chapterMatch,hash);
requestAnimationFrame(()=>{if(id!==renderId)return;const target=chapterMatch?document.getElementById(chapterMatch[1]):null;if(target&&chapterMatch[1]==='intro'){scrollTo(0,target.getBoundingClientRect().top+scrollY);target.querySelector('.welcome')?.setAttribute('tabindex','-1');target.querySelector('.welcome')?.focus({preventScroll:true});}else if(target&&mode==='chapter'){scrollTo(0,fromY);fastScroll(target.getBoundingClientRect().top+scrollY);}else if(mode==='project-open'){scrollTo(0,fromY);const body=document.querySelector('#body');if(body)fastScroll(contentTop(body));}else if(mode==='home-return')scrollTo(0,homeState.scroll);else if(target&&history.state?.scroll==null)scrollTo(0,target.getBoundingClientRect().top+scrollY);else scrollTo(0,history.state?.scroll??(!p?homeState.scroll:0));requestAnimationFrame(()=>{if(id===renderId){restoring=false;savePosition();}});});}
document.addEventListener('click',e=>{const a=e.target.closest('a');if(!a||e.defaultPrevented||e.button!==0||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey||a.hasAttribute('download')||(a.target&&a.target!=='_self')||a.origin!==location.origin||a.pathname!==location.pathname||a.search!==location.search)return;if(a.getAttribute('href')==='#body'){e.preventDefault();scrollToContent();return;}if(a.hash.startsWith('#/')){e.preventDefault();if(a.classList.contains('project-link'))manualActivity();if(a.dataset.home&&route==='home'){manualActivity();change(2-selected,true,false);fastScroll(0);return;}const mode=a.hash.startsWith('#/chapter/')?'chapter':a.dataset.home?'home-return':(a.classList.contains('project-link')||a.classList.contains('about-button')||a.classList.contains('work-talk')||a.dataset.cursor==='解锁隐藏页')?'project-open':'route';goRoute(a.hash,mode);}});
function updateCover(){const cover=document.querySelector('.hero-cover');if(cover){const p=Math.max(0,Math.min(1,scrollY/innerHeight));cover.style.setProperty('--cover-opacity',String(1-p*.94));}}
let positionTimer=0;addEventListener('scroll',()=>{updateCover();scheduleHeroGuidance();if(pendingOpeningHint&&scrollY<2){pendingOpeningHint=false;cueOpening();}if(!positionTimer&&!restoring){positionTimer=setTimeout(()=>{positionTimer=0;if(!restoring)savePosition();},500);}},{passive:true});
for(const event of ['wheel','touchstart'])addEventListener(event,()=>{cancelAnimationFrame(scrollFrame);scrollFrame=0;},{passive:true});
addEventListener('hashchange',navigate);addEventListener('pagehide',storeHome);document.addEventListener('visibilitychange',()=>{document.documentElement.classList.toggle('motion-paused',document.hidden||!heroVisible);scheduleAuto();scheduleHeroGuidance(true);});reduceMotion.addEventListener('change',()=>scheduleAuto());
Promise.all(['details.json','featured.json'].map(path=>fetch(path).then(r=>{if(!r.ok)throw Error(path);return r.json();}))).then(([d,f])=>{details=d;featuredData=f;return document.fonts.ready.then(navigate);}).catch(()=>{app.innerHTML='<p>页面内容未能载入，请刷新重试。</p>';});


addEventListener('resize',()=>requestAnimationFrame(()=>document.querySelectorAll('.hero canvas').forEach(c=>measureObjectGround(c,pixelMasks.get(c)))));

for(const event of ['pointerdown','keydown','wheel','touchstart'])addEventListener(event,()=>{document.querySelector('.scroll-cue')?.classList.remove('is-idle-inviting');scheduleHeroGuidance(true);},{passive:true});
