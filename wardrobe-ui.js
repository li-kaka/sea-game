// Live wardrobe controls over the room and category artwork supplied in Closet.svg.
const wardrobeCategoryOrder=['suit','skin','helmet','neck','shirt','outerwear','pants','gloves','cape','shoes'];
function renderWardrobeCategoryTabs(category){
 const nav=$('wardrobeCategoryTabs');if(!nav)return;
 nav.querySelectorAll('button').forEach(button=>{
  const selected=button.dataset.category===category;
  button.setAttribute('aria-pressed',String(selected));
 });
 $('wardrobeUndo').disabled=wardrobeHistory.length===0;
 const unlockedFilter=$('wardrobeUnlockedOnly');if(unlockedFilter)unlockedFilter.setAttribute('aria-pressed',String(wardrobeUnlockedOnly));
 const status=$('wardrobeUnlockStatus');if(status)setText(status,`${t('已解锁')} ${unlockedWardrobeCount()}/${wardrobeCatalogByKey.size} · ${t('扭蛋解锁新服装')}`);
 document.querySelectorAll('[data-rarity-filter]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.rarityFilter===wardrobeRarity)));
}
function chooseWardrobeCategory(category){
 wardrobeMode=category==='suit'?'suit':'single';
 if(category!=='suit')wardrobeCategory=category;
 $('wardrobeScroll').scrollTop=0;renderWardrobe();
}
const wardrobeNav=document.createElement('nav');wardrobeNav.id='wardrobeCategoryTabs';wardrobeNav.className='closet-category-tabs';wardrobeNav.setAttribute('aria-label',t('服装类型'));
for(const id of wardrobeCategoryOrder){
 const group=WARDROBE_CATEGORIES.find(group=>group.id===id);if(!group)continue;
 const button=document.createElement('button');button.type='button';button.dataset.category=id;button.setAttribute('aria-label',t(group.name));button.title=t(group.name);button.setAttribute('aria-pressed','false');
 const img=document.createElement('img');img.alt='';img.src=`img/closet/tab-${id}.svg?v=1.0.243`;img.draggable=false;
 button.append(img);button.onclick=()=>chooseWardrobeCategory(id);wardrobeNav.append(button);
}
$('wardrobeScroll').before(wardrobeNav);
const rarityFilters=document.createElement('div');rarityFilters.className='wardrobe-rarity-filters';rarityFilters.setAttribute('role','group');rarityFilters.setAttribute('aria-label',t('服装等级'));
for(const [id,label] of [['all','全部'],...Object.entries(WARDROBE_RARITIES)]){
 const button=document.createElement('button');button.type='button';button.dataset.rarityFilter=id;
 button.textContent=id==='all'?t(label):id+' '+t(label);
 button.onclick=()=>{wardrobeRarity=id;$('wardrobeScroll').scrollTop=0;renderWardrobe()};rarityFilters.append(button);
}
$('wardrobeScroll').before(rarityFilters);
const unlockStatus=document.createElement('p');unlockStatus.id='wardrobeUnlockStatus';unlockStatus.className='wardrobe-unlock-status';unlockStatus.setAttribute('role','status');const unlockRow=document.createElement('div');unlockRow.className='wardrobe-unlock-row';
const unlockedToggle=document.createElement('button');unlockedToggle.id='wardrobeUnlockedOnly';unlockedToggle.type='button';
unlockedToggle.textContent=GameI18n.language==='ja'?'解放済みのみ':GameI18n.language==='en'?'Unlocked only':'只看已解锁';
unlockedToggle.setAttribute('aria-pressed','false');
unlockedToggle.onclick=()=>{wardrobeUnlockedOnly=!wardrobeUnlockedOnly;$('wardrobeScroll').scrollTop=0;renderWardrobe()};
unlockRow.append(unlockStatus,unlockedToggle);$('wardrobeScroll').before(unlockRow);
const quick=document.createElement('div');quick.className='closet-quick-actions';
function quickButton(id,label,path){
 const button=document.createElement('button');button.id=id;button.type='button';button.setAttribute('aria-label',t(label));button.title=t(label);
 button.innerHTML=`<svg viewBox="0 0 32 32" aria-hidden="true"><path d="${path}" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
 quick.append(button);return button;
}
const shuffle=quickButton('wardrobeShuffle','随机搭配','M4 8h4c8 0 8 16 16 16h4m-5-5 5 5-5 5M4 24h4c3 0 5-3 7-7m3-5c2-3 4-4 6-4h4m-5-5 5 5-5 5');
const clear=$('clearWardrobe');clear.textContent='';clear.setAttribute('aria-label',t('清除所有服装'));clear.title=t('清除所有服装');clear.innerHTML='<svg viewBox="0 0 32 32" aria-hidden="true"><path d="m10 5 6 3 6-3 7 7-5 5-3-2v12H11V15l-3 2-5-5 7-7Z" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="m12 12 8 8m0-8-8 8" stroke="currentColor" stroke-width="2"/></svg>';quick.append(clear);
const undo=quickButton('wardrobeUndo','撤销换装','M12 8 4 15l8 7M5 15h14c7 0 9 5 9 9');
$('wardrobeView').append(quick);
shuffle.onclick=()=>{
 const fish=document.querySelector('.fish-character')?.contentWindow;if(!fish?.characterWardrobeReady?.())return;
 const suits=WARDROBE_CATEGORIES.find(group=>group.id==='suit').items.filter(item=>item.pieces&&isWardrobeItemUnlocked('suit',item.id));
 rememberWardrobeOutfit();
 if(suits.length&&Math.random()<.5){
  const suit=suits[Math.floor(Math.random()*suits.length)];
  state.outfit=fish.restoreCharacterOutfit({skin:suit.defaultSkin?null:fish.getCharacterOutfit().skin,suit:suit.id,...suit.pieces});
  wardrobeSelected=wardrobeItemKey('suit',suit.id);
 }else{
  const outfit={skin:fish.getCharacterOutfit().skin};
  for(const group of WARDROBE_CATEGORIES){
   if(group.id==='suit')continue;
   const items=group.items.filter(item=>isWardrobeItemUnlocked(group.id,item.id));
   if(items.length)outfit[group.id]=items[Math.floor(Math.random()*items.length)].id;
  }
  state.outfit=fish.restoreCharacterOutfit(sanitizeWardrobeOutfit(outfit));wardrobeSelected=null;
 }
 save();renderWardrobe();
};
undo.onclick=()=>{
 const fish=document.querySelector('.fish-character')?.contentWindow;if(!fish?.characterWardrobeReady?.()||!wardrobeHistory.length)return;
 state.outfit=fish.restoreCharacterOutfit(sanitizeWardrobeOutfit(wardrobeHistory.pop()));wardrobeSelected=null;save();renderWardrobe();
};
$('wardrobeGacha').querySelector('img').src='img/gacha/machine.svg?v=1.0.243';
renderWardrobe();

// Keep touch swiping native; add the same left/right dragging for a mouse.
let categoryDrag=null,suppressCategoryClick=false;
wardrobeNav.addEventListener('pointerdown',event=>{
 if(event.pointerType==='touch'||event.button!==0)return;
 categoryDrag={id:event.pointerId,x:event.clientX,scroll:wardrobeNav.scrollLeft,moved:false};
 suppressCategoryClick=false;
});
wardrobeNav.addEventListener('pointermove',event=>{
 if(!categoryDrag||categoryDrag.id!==event.pointerId)return;
 const distance=event.clientX-categoryDrag.x;
 if(!categoryDrag.moved&&Math.abs(distance)<6)return;
 categoryDrag.moved=true;wardrobeNav.setPointerCapture(event.pointerId);
 wardrobeNav.classList.add('is-dragging');wardrobeNav.scrollLeft=categoryDrag.scroll-distance;
});
function endCategoryDrag(event){
 if(!categoryDrag||categoryDrag.id!==event.pointerId)return;
 suppressCategoryClick=categoryDrag.moved;categoryDrag=null;wardrobeNav.classList.remove('is-dragging');
 if(wardrobeNav.hasPointerCapture(event.pointerId))wardrobeNav.releasePointerCapture(event.pointerId);
}
wardrobeNav.addEventListener('pointerup',endCategoryDrag);
wardrobeNav.addEventListener('pointercancel',endCategoryDrag);
wardrobeNav.addEventListener('click',event=>{if(suppressCategoryClick){event.preventDefault();event.stopImmediatePropagation();suppressCategoryClick=false}},true);
wardrobeNav.addEventListener('keydown',event=>{
 if(!['ArrowLeft','ArrowRight'].includes(event.key))return;
 event.preventDefault();
 const buttons=[...wardrobeNav.querySelectorAll('button')],current=buttons.indexOf(document.activeElement);
 const button=buttons[Math.max(0,Math.min(buttons.length-1,current+(event.key==='ArrowRight'?1:-1)))];
 button.focus();button.scrollIntoView({block:'nearest',inline:'nearest'});
});
for(const [id,asset]of [['wardrobeBack','back'],['wardrobeShuffle','shuffle'],['clearWardrobe','clear'],['wardrobeUndo','undo'],['wardrobeGacha','gacha']]){
 setActionArt($(id),`img/closet/${asset}-button.svg?v=1.0.243`,false);
}
