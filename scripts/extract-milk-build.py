from pathlib import Path
import copy,re,xml.etree.ElementTree as E
import argparse
parser=argparse.ArgumentParser(description='Extract the ten milk-farm construction stages from the original design SVG.')
parser.add_argument('source',type=Path)
args=parser.parse_args()
p=Path(__file__).resolve().parents[1];src=args.source
ns='http://www.w3.org/2000/svg';E.register_namespace('',ns);E.register_namespace('xlink','http://www.w3.org/1999/xlink')
r=E.parse(src).getroot();root=r[0];scene=root[2];children=list(scene)
parts={0:{170,171,172},1:set(range(0,32))|set(range(46,58))|set(range(123,145))|{164,165,166},2:set(range(32,46))|set(range(58,123))|set(range(158,164))|set(range(167,170)),3:set(range(148,152))|set(range(179,216)),4:set(range(145,148))|set(range(152,158))|set(range(173,179)),5:set(range(224,240)),6:set(range(221,224))|set(range(240,243)),7:set(range(216,221))|set(range(243,264)),8:set(range(264,267))|set(range(589,612)),9:set(range(267,286))|set(range(576,589)),10:set(range(612,912)),11:set(range(912,944))}
lookup={i:step for step,indices in parts.items() for i in indices}
assert sum(map(len,parts.values()))==len(lookup)
# Keep all masks in defs: late-painted barn gates still cover the cows correctly.
for child in children:
 if child.tag.endswith('mask'):r[-1].append(copy.deepcopy(child))
scene.clear();scene.set('clip-path','url(#clip2_1373_100240)')
E.SubElement(scene,'{'+ns+'}rect',{'y':'464','width':'402','height':'410','fill':'#FBD9E6'})
def wrap_motion(parent,first,last,cls,origin,delay='0s'):
 nodes=list(parent)[first:last+1]
 group=E.Element('{'+ns+'}g',{'class':cls,'style':f'transform-origin:{origin};--cow-delay:{delay}'})
 parent.insert(first,group)
 for node in nodes:parent.remove(node);group.append(node)
 return group

current=None;last=None;left_cow=None
for i,child in enumerate(children):
 if child.tag.endswith('mask') or i not in lookup or i in [915,926]:continue
 step=lookup[i]
 if step!=last:
  current=E.SubElement(scene,'{'+ns+'}g',{'data-milk-step':str(step)});last=step
 if i==912:current.set('id','milkResident')
 node=copy.deepcopy(child)
 if i==45:
  # The hay and ground shadow remain fixed; each cow breathes independently.
  cow=wrap_motion(node,4,59,'milk-cow','161px 317.6px','-.9s')
  # Indices below refer to the original nested cow artwork, before wrapping.
  wrap_motion(cow,45,46,'milk-cow-eye','146.183px 282px','-1.7s')
  wrap_motion(cow,43,44,'milk-cow-eye','130.145px 282px','-1.7s')
  wrap_motion(cow,3,12,'milk-cow-tail','184px 286px','-.6s')
 if i==72:
  left_cow=E.SubElement(current,'{'+ns+'}g',{'class':'milk-cow','style':'transform-origin:30px 317.6px;--cow-delay:0s'})
 if i==170:node.set('d','M0 463.5H135L174 437.5H242.5L287.5 453H402V874H0Z')
 if i==172:
  node.set('d','M0 463.5H135L174 437.5H242.5L287.5 453H402');node.attrib.pop('mask',None)
 if i in [914,925]:node.set('d',re.sub(r'C41\.3649 480\.919.*?46\.4889 465\.34','L46.4889 465.34',node.get('d')))
 # Animate only the moving components, keeping all attachment points fixed.
 hose_pairs=[(35,38,174.021,244.657),(36,39,151.132,245.221),(37,40,130.461,244.897),(61,64,15.3901,245.512),(62,65,31.8347,244.893),(63,66,55.5339,244.711)]
 for n,(a,b,x,y) in enumerate(hose_pairs):
  if i in (a,b):node.set('class','milk-hose');node.set('style',f'transform-origin:{x}px {y}px;--delay:{-n*.18}s')
 for index,cls in [(238,'milk-gauge'),(260,'milk-wheel'),(262,'milk-wheel'),(594,'milk-indicator')]:
  if i==index:node.set('class',cls)
 if i==213:
  node.set('id','milkStorageLiquid')
  node[0].set('class','milk-liquid')
 if i in (276,278,582,584,280,281,282,283,284,285,586,587,588):node.set('class','milk-static-belt')
 if i==276:
  moving=E.SubElement(current,'{'+ns+'}g',{'class':'milk-moving-belt'})
  # A union mask prevents circles from drawing internal black seams.
  mask=E.SubElement(r[-1],'{'+ns+'}mask',{'id':'milkBeltMask','maskUnits':'userSpaceOnUse','x':'110','y':'480','width':'405','height':'55'})
  E.SubElement(mask,'{'+ns+'}path',{'d':'M135 493H480A14 14 0 0 1 480 521H135A14 14 0 0 1 135 493Z','fill':'white','stroke':'white','stroke-width':'10'})
  for n in range(60):
   E.SubElement(mask,'{'+ns+'}circle',{'r':'7.4','fill':'white','class':'milk-belt-lobe','style':f'--delay:{-n*24/60}s'})
  E.SubElement(moving,'{'+ns+'}rect',{'x':'110','y':'480','width':'405','height':'55','fill':'white','mask':'url(#milkBeltMask)'})
  # Outline the union with a morphological filter rather than separate rings.
  filt=E.SubElement(r[-1],'{'+ns+'}filter',{'id':'milkBeltOutline','x':'-5%','y':'-30%','width':'110%','height':'160%'})
  E.SubElement(filt,'{'+ns+'}feMorphology',{'in':'SourceAlpha','operator':'dilate','radius':'.5','result':'edge'})
  E.SubElement(filt,'{'+ns+'}feFlood',{'flood-color':'black','result':'black'})
  E.SubElement(filt,'{'+ns+'}feComposite',{'in':'black','in2':'edge','operator':'in','result':'border'})
  merge=E.SubElement(filt,'{'+ns+'}feMerge')
  E.SubElement(merge,'{'+ns+'}feMergeNode',{'in':'border'});E.SubElement(merge,'{'+ns+'}feMergeNode',{'in':'SourceGraphic'})
  moving.set('filter','url(#milkBeltOutline)')
 if i==586:
  clip=E.SubElement(r[-1],'{'+ns+'}clipPath',{'id':'milkRollerClip'})
  for x in (122.789,291.989):E.SubElement(clip,'{'+ns+'}rect',{'x':str(x),'y':'495.996','width':'209.589','height':'22.2394','rx':'11.1197'})
  rollerclip=E.SubElement(current,'{'+ns+'}g',{'class':'milk-moving-belt','clip-path':'url(#milkRollerClip)'})
  rollers=E.SubElement(rollerclip,'{'+ns+'}g',{'class':'milk-rollers'})
  for n in range(15):E.SubElement(rollers,'{'+ns+'}circle',{'cx':str(105.942+n*30.326),'cy':'506.779','r':'6.06528','fill':'white','stroke':'black','stroke-width':'.67392'})
 if i==588:
  # Reuse the supplied empty/full bottle artwork with a common baseline.
  for name,start,end,cx in [('milkBottleFull',286,359,151.24),('milkBottleEmpty',359,430,369.646)]:
   template=E.SubElement(r[-1],'{'+ns+'}g',{'id':name,'transform':f'translate({-cx} -488.13)'})
   for original in children[start:end]:
    if not original.tag.endswith('mask'):template.append(copy.deepcopy(original))
  bottles=E.SubElement(current,'{'+ns+'}g',{'class':'milk-production-bottles'})
  for n in range(6):
   bottle=E.SubElement(bottles,'{'+ns+'}g',{'class':'milk-production-bottle','style':f'--bottle-delay:{n*2.74}s'})
   for kind in ['Empty','Full']:
    E.SubElement(bottle,'{'+ns+'}use',{'{http://www.w3.org/1999/xlink}href':'#milkBottle'+kind,'class':'milk-bottle-'+kind.lower()})
 if i in (613,687,761,834):
  crate_bottle=E.SubElement(current,'{'+ns+'}g',{'class':'milk-crate-bottle','data-milk-crate-slot':str((613,687,761,834).index(i)),'style':'visibility:hidden'})
 if 72<=i<=122:
  # Group eyes and highlights together so they close without leaving white dots.
  if i in (110,112):
   eye=E.SubElement(left_cow,'{'+ns+'}g',{'class':'milk-cow-eye','style':f'transform-origin:{60.8723 if i==110 else 44.8345}px 282px;--cow-delay:0s'})
  if i==75:
   tail=E.SubElement(left_cow,'{'+ns+'}g',{'class':'milk-cow-tail','style':'transform-origin:7px 286px;--cow-delay:0s'})
  if 75<=i<=79:tail.append(node)
  elif 110<=i<=113:eye.append(node)
  else:left_cow.append(node)
 elif 613<=i<=906 and i not in (686,760):crate_bottle.append(node)
 else:current.append(node)
arm=copy.deepcopy(children[926]);arm.set('fill','#C5C5C5');arm.set('d',arm.get('d')+'Z')
wave=E.SubElement(current,'{'+ns+'}g',{'id':'milkResidentArm'});wave.append(arm)
# Hide recruitment and the operation buttons until the build is acknowledged.
outer=list(root)
for i,e in enumerate(outer):
 if 291<=i<=392 and not e.tag.endswith('mask'):e.set('data-milk-side-ui','')
 if i>=3 and not 291<=i<=392 and not e.tag.endswith('mask'):e.set('data-milk-reference-ui','')
for i,e in enumerate(outer):
 if 3<=i<110 or 393<=i<=406:
  if not e.tag.endswith('mask'):e.set('data-milk-operating-ui','')
parents={e:par for par in r.iter() for e in par}
for m in list(r.iter()):
 if m.tag.endswith('mask') and m.get('x')=='355' and m.get('y')=='15':
  par=parents[m];siblings=list(par);i=siblings.index(m)
  for e in siblings[i-1:i+8]:par.remove(e)
style=E.Element('{'+ns+'}style');style.text='[data-milk-step]:not([data-milk-step="0"]),[data-milk-operating-ui]{visibility:hidden}'
style.text+="\n.milk-moving-belt{display:none}\n.milk-operating .milk-moving-belt{display:inline}\n.milk-operating .milk-static-belt{visibility:hidden}\n.milk-operating .milk-hose{animation:milkSqueeze 1.3s ease-in-out var(--delay) infinite}\n.milk-operating .milk-gauge{transform-origin:34.7999px 393.161px;animation:milkTurn 3s linear infinite}\n.milk-operating .milk-wheel{transform-origin:145.392px 354.392px;animation:milkTurn 2.4s linear infinite}\n.milk-operating .milk-indicator{animation:milkBlink 1.1s ease-in-out infinite}\n.milk-liquid{transform:none}\n.milk-belt-lobe{offset-path:path('M135 493H480A14 14 0 0 1 480 521H135A14 14 0 0 1 135 493Z');offset-rotate:0deg;animation:milkBelt 24s linear var(--delay) infinite;animation-play-state:paused}\n.milk-operating .milk-belt-lobe{animation-play-state:running}\n.milk-operating .milk-rollers{animation:milkRollers 1.8s linear infinite}\n@keyframes milkSqueeze{0%,100%{transform:scaleY(1)}50%{transform:scaleY(.87)}}\n@keyframes milkTurn{to{transform:rotate(360deg)}}\n@keyframes milkBlink{0%,100%{fill:#FFF01C}50%{fill:#FFF9AB}}\n@keyframes milkBelt{from{offset-distance:100%}to{offset-distance:0%}}\n@keyframes milkRollers{to{transform:translateX(-30.326px)}}\n@media(prefers-reduced-motion:reduce){.milk-operating *{animation:none!important}}\n"
style.text+='\n.milk-operating .milk-cow{animation:milkCowBreathe 3.4s ease-in-out var(--cow-delay) infinite}\n.milk-operating .milk-cow-eye{animation:milkCowBlink 4.7s linear var(--cow-delay) infinite}\n.milk-operating .milk-cow-tail{animation:milkCowTail 2.2s ease-in-out var(--cow-delay) infinite}\n@keyframes milkCowBreathe{0%,100%{transform:scaleY(1)}50%{transform:scaleY(1.035)}}\n@keyframes milkCowBlink{0%,40%,46%,100%{transform:scaleY(1)}43%{transform:scaleY(.08)}}\n@keyframes milkCowTail{0%,100%{transform:rotate(-12deg)}50%{transform:rotate(14deg)}}\n'
style.text+='\n.milk-production-bottles{display:none}\n.milk-operating .milk-production-bottles{display:inline}\n.milk-production-bottle{transform:translate(420px,488.13px)}\n.milk-bottle-full{opacity:0}\n.milk-operating .milk-production-bottle{animation:milkBottleTravel 16.44s linear var(--bottle-delay) infinite}\n.milk-operating .milk-bottle-empty{animation:milkBottleEmpty 16.44s steps(1,end) var(--bottle-delay) infinite}\n.milk-operating .milk-bottle-full{animation:milkBottleFull 16.44s steps(1,end) var(--bottle-delay) infinite}\n@keyframes milkBottleTravel{0%{transform:translate(420px,488.13px);opacity:1}98%{opacity:1}100%{transform:translate(124px,488.13px);opacity:0}}\n@keyframes milkBottleEmpty{0%{opacity:1}36.5%,100%{opacity:0}}\n@keyframes milkBottleFull{0%{opacity:0}36.5%,100%{opacity:1}}\n'
style.text+='\n.milk-build-guiding > g > :nth-child(-n+2),.milk-build-guiding [data-milk-step]:not(.milk-lit-part),.milk-build-guiding [data-milk-side-ui],.milk-build-guiding > g > g:nth-child(3) > rect{filter:brightness(.58)}\n.milk-live-ui [data-milk-reference-ui]{display:none}\n'
style.text+='\n.milk-operation-guiding [data-milk-side-ui]{visibility:hidden}\n'
r.insert(0,style)
E.ElementTree(r).write(p/'img/svg/milk-factory-level-one-build.svg',encoding='unicode')
print('Extracted',[(step,len([i for i in indices if not children[i].tag.endswith('mask')])) for step,indices in parts.items()])

icon=E.Element('{'+ns+'}svg',{'viewBox':'-14 -52 28 52','width':'28','height':'52','fill':'none'})
icon_defs=copy.deepcopy(r[-1])
references={'milkBottleFull'}
while True:
 before=len(references)
 for definition in icon_defs:
  if definition.get('id') in references:
   markup=E.tostring(definition,encoding='unicode')
   references.update(re.findall(r'url\(#([^)]*)\)',markup))
   references.update(re.findall(r'href="#([^"]*)"',markup))
 if len(references)==before:break
for definition in list(icon_defs):
 if definition.get('id') not in references:icon_defs.remove(definition)
icon.append(icon_defs)
E.SubElement(icon,'{'+ns+'}use',{'{http://www.w3.org/1999/xlink}href':'#milkBottleFull'})
E.ElementTree(icon).write(p/'img/svg/milk-bottle.svg',encoding='unicode')
