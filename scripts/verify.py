#!/usr/bin/env python3
"""Static integrity checks. Standard-library only; run from any working directory."""
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import unquote, urlsplit
import hashlib, json, re
ROOT=Path(__file__).resolve().parents[1]
errors=[];refs=set()
def check_ref(value):
 value=unquote(value.strip())
 if not value or value.startswith(('#','data:','${')) or urlsplit(value).scheme:return
 value=value.split('?')[0].split('#')[0]
 if '${' in value:return
 refs.add(value)
 if not (ROOT/value).is_file():errors.append('Missing resource: '+value)
class Parser(HTMLParser):
 def handle_starttag(self,tag,attrs):
  d=dict(attrs)
  if 'src' in d:check_ref(d['src'])
  if tag=='link' and d.get('rel')=='stylesheet':check_ref(d.get('href',''))
  if tag=='a' and d.get('target')=='_blank' and 'noopener' not in d.get('rel',''):errors.append('Unsafe external new-tab link')
  if tag in ['script','iframe'] and d.get('src','').startswith(('http:','https:')):errors.append('Unexpected third-party runtime')
Parser().feed((ROOT/'index.html').read_text())
details=json.loads((ROOT/'details.json').read_text());featured=json.loads((ROOT/'featured.json').read_text())
for key in map(str,range(1,6)):
 if len(details.get(key,''))<100:errors.append('Missing detail '+key)
 Parser().feed(details.get(key,''))
def walk(v):
 if isinstance(v,dict):
  for k,x in v.items():
   if k=='art' and x:check_ref('assets/content/'+x+'.webp')
   walk(x)
 elif isinstance(v,list):
  for x in v:walk(x)
 elif isinstance(v,str):
  if v.startswith(('assets/','source-assets/','fonts/')):check_ref(v)
  elif '<' in v:Parser().feed(v)
walk(featured)
css=(ROOT/'styles.css').read_text()
for ref in re.findall(r'url\([\'"]?([^\)\'\"]+)',css):check_ref(ref)
js=(ROOT/'app.js').read_text()
for ref in re.findall(r"asset:'([^']+)'",js):check_ref('assets/'+ref)
for ref in re.findall(r"(assets/[^'\"`<>$]+\.(?:png|jpg|webp|svg))",js):check_ref(ref)
for filename in ['敞开的剧场帷幕.png','旋转木马音乐盒.png','贝壳中的圆润珍珠.png','举望远镜的小人.png','展开风箱的手风琴.png','树式瑜伽人物.png']:check_ref('assets/chapters/'+filename)
if len(featured['friends']['shots'])!=5 or len(featured['friends']['list'])!=6:errors.append('Gallery schema mismatch')
if '也许不起眼' not in details['2'] or details['2'].count('<blockquote')!=2:errors.append('Noah draft quote missing')
if '完整正文待补充' in details['5']:errors.append('Biography placeholder remains')
if not (ROOT/'.nojekyll').is_file():errors.append('.nojekyll missing')
manifest=ROOT/'checksums.json'
if manifest.exists():
 for filename,expected in json.loads(manifest.read_text()).items():
  f=ROOT/filename
  if not f.is_file() or hashlib.sha256(f.read_bytes()).hexdigest()!=expected:errors.append('Checksum mismatch: '+filename)
if errors:raise SystemExit('\n'.join(errors))
print(f'PASS: 5 complete details, 6 gallery items, {len(refs)} local resource references, font URLs and package integrity.')
