"""Export UI artwork from the supplied 402 x 874 Milk Factory design."""
from pathlib import Path
import argparse,copy,re,xml.etree.ElementTree as E
parser=argparse.ArgumentParser();parser.add_argument('source',type=Path);args=parser.parse_args()
ns='http://www.w3.org/2000/svg';E.register_namespace('',ns);E.register_namespace('xlink','http://www.w3.org/1999/xlink')
r=E.parse(args.source).getroot();art=r[0];pool={e.get('id'):e for e in r.iter() if e.get('id')}
out=Path(__file__).resolve().parents[1]/'img/svg'
def export(name,box,nodes):
 svg=E.Element('{'+ns+'}svg',{'viewBox':box,'fill':'none','xmlns:xlink':'http://www.w3.org/1999/xlink'})
 # ElementTree supplies the xlink namespace when a reference is present.
 svg.attrib.pop('xmlns:xlink')
 defs=E.SubElement(svg,'{'+ns+'}defs')
 for node in nodes:svg.append(copy.deepcopy(node))
 while True:
  markup=E.tostring(svg,encoding='unicode');existing={e.get('id') for e in svg.iter() if e.get('id')}
  refs=set(re.findall(r'url\(#([^)]*)\)',markup)+re.findall(r'href="#([^"]*)"',markup))
  missing=refs-existing
  if not missing:break
  for key in sorted(missing):defs.append(copy.deepcopy(pool[key]))
 E.ElementTree(svg).write(out/name,encoding='unicode')
# Retain the complete fish badge, pink pill, + sign, coin and cow icons.
header=[art[i] for i in range(111,244) if i not in set(range(122,138))|set(range(162,165))|set(range(183,186))]
export('milk-header.svg','0 0 402 65',header)
frame=copy.deepcopy(art[394])
for node in list(frame)[61:67]:frame.remove(node)
export('milk-produce-ja.svg','24 569 350 54',[art[394],art[395],art[396],art[397]])
export('milk-produce-frame.svg','24 569 350 54',[frame,art[395],art[396],art[397]])
sale=copy.deepcopy(art[398])
# Counter and reward remain live; all decorative elements retain their design positions.
for index in sorted([307,308,309,420,421,422],reverse=True):sale.remove(sale[index])
export('milk-sell-ja.svg','24 618 366 83',[sale,*list(art)[399:407]])
sale_frame=copy.deepcopy(art[398]);cta=sale_frame[423]
for index in [3,2,1]:cta.remove(cta[index])
for index in sorted(list(range(304,310))+list(range(389,392))+list(range(420,423)),reverse=True):sale_frame.remove(sale_frame[index])
export('milk-sell-frame.svg','24 618 366 83',[sale_frame,*list(art)[399:407]])
print('Exported milk header, production and sale artwork')

export('milk-guide-stock.svg','238 12 112 40',[art[i] for i in range(179,244) if i not in (183,184,185)])
export('milk-guide-coins.svg','148 15 90 39',[art[i] for i in range(154,179) if i not in (162,163,164)])
