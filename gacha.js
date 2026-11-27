// Closet artwork: machine and capsule extracted from the supplied SVG designs.
const GACHA_PRICE=100;
const gachaPool=WARDROBE_CATEGORIES
 .flatMap(group=>group.items.filter(item=>item.id).map(item=>({...item,category:group.id,key:wardrobeItemKey(group.id,item.id)})));
const gachaCopy=(zh,ja,en)=>GameI18n.language==='ja'?ja:GameI18n.language==='en'?en:zh;
let gachaStage='machine',gachaReward=null,gachaRevealTimer=0,gachaSpinTimer=0;
const GACHA_OPEN_DURATION=850;
const GACHA_SPIN_DURATION=1100;
function normalizeGacha(){
 state.gachaOwned=Array.isArray(state.gachaOwned)?[...new Set(state.gachaOwned.filter(key=>gachaPool.some(item=>item.key===key)))]:[];
 state.draws=Number.isInteger(state.draws)&&state.draws>=0?state.draws:0;
 state.gachaColor=Number.isInteger(state.gachaColor)&&state.gachaColor>=0&&state.gachaColor<8?state.gachaColor:0;
 const pending=gachaPool.find(item=>item.key===state.gachaPending);
 if(!pending)state.gachaPending=null;
 return pending;
}
function openGacha(){
 const pending=normalizeGacha();
 // Reopening starts a fresh visit; only an unopened paid capsule is resumed.
 gachaReward=pending||null;gachaStage=pending?'capsule':'machine';
 const box=document.querySelector('.phone').getBoundingClientRect();
 $('gachaDialog').style.setProperty('--gacha-width',box.width+'px');
 $('gachaDialog').style.setProperty('--gacha-height',box.height+'px');
 renderGacha();if(!$('gachaDialog').open)$('gachaDialog').showModal();
}
function closeGacha(){
 clearTimeout(gachaRevealTimer);clearTimeout(gachaSpinTimer);
 if(gachaStage==='spinning')gachaStage='capsule';
 if(gachaStage==='opening')gachaStage='result';
 $('gachaDialog').close();$('wardrobeGacha').focus({preventScroll:true});
}
function setGachaButtonArt(button,asset,label){
 button.setAttribute('aria-label',label);
 let img=button.querySelector('img');
 if(!img){img=document.createElement('img');img.alt='';img.draggable=false;button.replaceChildren(img)}
 const src=asset+'?v=1.0.235';if(img.getAttribute('src')!==src)img.src=src;
}
function renderGacha(){
 const spinning=gachaStage==='spinning',machine=gachaStage==='machine',capsule=gachaStage==='capsule',result=gachaStage==='result',opening=gachaStage==='opening';
 const enough=wardrobeWallet().coins>=GACHA_PRICE;
 const title=gachaCopy('扭蛋机','ガチャ','Gacha');
 setText($('gachaTitle'),title);$('gachaDialog').setAttribute('aria-label',title);
 $('gachaDialog').dataset.stage=gachaStage;
 $('gachaDraw').setAttribute('aria-busy',String(spinning));
 setText($('gachaBalance'),number(wardrobeWallet().coins));
 const color=state.gachaColor||0;
 for(const [el,file] of [[$('gachaEjected'),`capsule-${color}`],[$('gachaCapsuleButton').querySelector('img'),`capsule-${color}`],[$('gachaCapsuleTop'),`capsule-top-${color}`],[$('gachaCapsuleBottom'),`capsule-bottom-${color}`]]){
  const src=`img/gacha/${file}.svg?v=1.0.235`;if(el.getAttribute('src')!==src)el.src=src;
 }
 setText($('gachaPrice'),gachaCopy('每次 100 金币 · 服装等概率抽取','1回100コイン・各アイテム同確率','100 coins per draw · equal odds'));
 $('gachaMachineRig').hidden=!(machine||spinning);$('gachaEjected').hidden=!spinning;$('gachaCapsuleButton').hidden=!capsule;$('gachaResult').hidden=!(result||opening);
 $('gachaWear').disabled=opening;$('gachaAgain').disabled=opening;
 $('gachaDraw').hidden=!(machine||spinning);$('gachaDraw').disabled=spinning||!enough||!gachaPool.length;
 setGachaButtonArt($('gachaDraw'),`img/gacha/draw-${enough?'ready':'disabled'}.svg`,spinning?gachaCopy('转动中…','まわしています…','Spinning…'):enough?gachaCopy('转动扭蛋！','ガチャを回す！','Draw!'):gachaCopy('金币不足','コインが足りません','Not enough coins'));
 setText($('gachaHint'),spinning?gachaCopy('胶囊正在滚出来！','カプセルが出てくるよ！','Here comes your capsule!'):machine?gachaCopy('抽到的服装会永久解锁。可能抽到重复服装。','アイテムはコレクションに追加。同じ物が出る場合があります。','Items join your permanent collection. Duplicates are possible.'):capsule?gachaCopy('点击胶囊，看看抽到了什么！','カプセルをタップして開けよう！','Tap the capsule to open it!'):gachaCopy('已解锁并加入收藏','コレクションに追加しました','Added to your permanent collection'));
 $('gachaCapsuleButton').setAttribute('aria-label',gachaCopy('打开胶囊','カプセルを開ける','Open capsule'));
 setGachaButtonArt($('gachaWear'),'img/gacha/wear-button.svg',gachaCopy('立即穿上！','すぐ着る！','Wear now!'));
 setText($('gachaAgain'),gachaCopy('再抽一次','もう一回','Draw again'));
 setGachaButtonArt($('gachaClose'),'img/closet/back-button.svg',gachaCopy('返回衣橱','クローゼットに戻る','Back to closet'));
 if((result||opening)&&gachaReward){
  if($('gachaItemArt').getAttribute('src')!==gachaReward.icon)$('gachaItemArt').src=gachaReward.icon;
  setText($('gachaItemName'),gachaReward.name);
  $('gachaNew').dataset.rarity=gachaReward.rarity;
  setText($('gachaNew'),gachaReward.rarity+' · '+(gachaReward.isNew?gachaCopy('新服装！','NEW!','New item!'):gachaCopy('已拥有的服装','持っているアイテム','Already collected')));
 }
}
function drawGacha(){
 if(gachaStage!=='machine'||!$('gachaDialog').open)return;
 normalizeGacha();
 if(wardrobeWallet().coins<GACHA_PRICE||!gachaPool.length){renderGacha();return}
 const item=gachaPool[Math.floor(Math.random()*gachaPool.length)];
 // Commit payment and reward together before allowing another input.
 wardrobeWallet().coins-=GACHA_PRICE;state.draws++;state.gachaPending=item.key;state.gachaColor=Math.floor(Math.random()*8);
 gachaReward=item;stopCapsuleOpenSound();playGachaMechanicalSound();
 const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
 gachaStage=reduced?'capsule':'spinning';save();render();renderWardrobeWallet();renderGacha();
 clearTimeout(gachaSpinTimer);
 if(!reduced){
  const pending=state.gachaPending;
  gachaSpinTimer=setTimeout(()=>{
   if(gachaStage!=='spinning'||state.gachaPending!==pending)return;
   gachaStage='capsule';renderGacha();
  },GACHA_SPIN_DURATION);
 }
}
function revealGacha(){
 if(gachaStage!=='capsule'||!state.gachaPending)return;
 stopGachaMechanicalSound();
 const item=normalizeGacha();if(!item)return;
 playCapsuleOpenSound();
 const isNew=!isWardrobeItemUnlocked(item.category,item.id);
 unlockWardrobeItem(item.category,item.id);
 gachaReward={...item,isNew};state.gachaPending=null;gachaStage=matchMedia('(prefers-reduced-motion: reduce)').matches?'result':'opening';
 wardrobeSelected=item.key;save();renderWardrobe();renderGacha();
 clearTimeout(gachaRevealTimer);
 if(gachaStage==='opening')gachaRevealTimer=setTimeout(()=>{
  if(gachaStage!=='opening')return;gachaStage='result';renderGacha();
 },GACHA_OPEN_DURATION);
}
function wearGacha(){
 if(gachaStage!=='result'||!gachaReward||!isWardrobeItemUnlocked(gachaReward.category,gachaReward.id))return;
 const fish=document.querySelector('.fish-character')?.contentWindow;
 if(!fish?.characterWardrobeReady?.())return;
 // Restore the exact garment, rather than toggling an already worn item off.
 rememberWardrobeOutfit();
 if(gachaReward.category==='suit'){
  state.outfit=fish.restoreCharacterOutfit({skin:gachaReward.defaultSkin?null:fish.getCharacterOutfit().skin,suit:gachaReward.id,...gachaReward.pieces});
 }else{
  const current=fish.getCharacterOutfit();
  state.outfit=current[gachaReward.category]===gachaReward.id?current:fish.toggleCharacterGarment(gachaReward.category,gachaReward.id);
 }
 wardrobeRarity='all';wardrobeMode=gachaReward.category==='suit'?'suit':'single';wardrobeCategory=gachaReward.category;wardrobeSelected=gachaReward.key;save();renderWardrobe();closeGacha();
 $('wardrobeSlots').querySelector(`[data-wardrobe-item="${gachaReward.key}"]`)?.scrollIntoView({block:'nearest'});
}
$('wardrobeGacha').onclick=openGacha;$('gachaClose').onclick=closeGacha;
$('gachaDraw').onclick=drawGacha;$('gachaCapsuleButton').onclick=revealGacha;$('gachaWear').onclick=wearGacha;
$('gachaAgain').onclick=()=>{gachaStage='machine';gachaReward=null;renderGacha()};
$('gachaDialog').addEventListener('close',()=>{stopGachaMechanicalSound();stopCapsuleOpenSound()});
$('gachaDialog').addEventListener('cancel',event=>{event.preventDefault();closeGacha()});
normalizeGacha();
