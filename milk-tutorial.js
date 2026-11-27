'use strict';

// Milk has its own progress, while dialogue and ordering come from the Apple tutorial.
window.MilkTutorial=(()=>{
 const host=$('milkFarmPreview');
 const ui=document.createElement('div');ui.className='milk-tutorial-ui';
 ui.innerHTML=`
  <div class="milk-live-hud">
   <img class="milk-header-art" src="img/svg/milk-header.svg?v=1.0.243" alt="">
   <button class="milk-level" data-milk-action="upgrade" aria-label="Lv.1 ＋"></button>
   <span class="milk-coins"><b>0</b></span>
   <span class="milk-stock"><b>0</b></span>
  </div>
  <div class="milk-guide-stock"><img src="img/svg/milk-guide-stock.svg?v=1.0.243" alt=""><b>0</b></div>
  <div class="milk-guide-coins"><img src="img/svg/milk-guide-coins.svg?v=1.0.243" alt=""><b>0</b></div>
  <div class="milk-live-rate"><img src="img/svg/milk-bottle.svg?v=1.0.243" alt=""><b>+0/s</b></div>
  <button class="milk-wardrobe-entry" data-milk-action="wardrobe" aria-label="着替え" hidden></button>
  <button class="milk-mission-entry" data-milk-action="mission"><img src="img/svg/mission-icon.svg" alt=""><i hidden></i></button>
  <button class="milk-live-produce" data-milk-action="produce"><span class="milk-produce-title"></span><small class="milk-produce-caption"></small></button>
  <button class="milk-live-sell" data-milk-action="sell"><span class="milk-sale-title"></span><span class="milk-sale-progress"></span><span class="milk-reward-title"></span><b class="milk-sale-reward"></b><strong></strong></button>
  <div class="milk-tutorial-shade" hidden></div>
  <button class="milk-dialogue-touch" aria-label="继续对话" hidden></button>
  <div class="milk-tutorial-dialogue build-guide-dialogue" hidden><img src="img/svg/build-guide-fish.svg" alt=""><span role="status" data-translated></span></div>
  <img class="milk-tutorial-finger" src="img/svg/build-guide-tap.svg" alt="" hidden>
  <div class="milk-mission-board" role="dialog" aria-label="Mission Board" hidden>
   <img class="mission-close-tap milk-mission-close-finger" src="img/svg/sell-guide-tap.svg?v=1.0.243" alt="" hidden>
   <div class="milk-mission-art" aria-hidden="true"></div>
   <button class="milk-panel-close" data-milk-action="closeMission" aria-label="关闭任务板">×</button>
   <div class="milk-mission-tasks"></div>
  </div>
  <div class="milk-upgrade-panel" role="dialog" hidden>
   <button class="milk-panel-close" data-milk-action="closeUpgrade" aria-label="关闭升级">×</button>
   <p></p><strong><img src="img/svg/level-one-coin.svg" alt="">400</strong>
   <button class="milk-level-ready" data-milk-action="levelUp">LEVEL UP!</button>
  </div>`;
 host.append(ui);
 const board=document.querySelector('.building-shop').cloneNode(true);
 board.className='building-shop milk-live-hiring';board.removeAttribute('style');board.inert=false;
 for(const element of board.querySelectorAll('[id]'))element.id='milk-'+element.id;
 ui.prepend(board);
 const labels={ja:{produce:'牛を育てる',sell:'牛乳を売る',sale:'売る',continue:'全文を表示／次のセリフへ'},en:{produce:'Feed the cows',sell:'Sell milk',sale:'Sell',continue:'Show full dialogue / Continue'},zh:{produce:'喂养乳牛',sell:'出售牛奶',sale:'出售',continue:'显示完整对话／继续'}};
 const label=key=>labels[GameI18n.language][key];
 const q=selector=>ui.querySelector(selector),dialogue=q('.milk-tutorial-dialogue'),text=dialogue.querySelector('span');
 const manualNext={start:'click',growComplete:'sellIntro',sellIntro:'sell',saleReward:'saleCoins',saleCoins:'shop',
  ...Object.fromEntries(Object.entries(HIRE_DELAYS).map(([key,value])=>[key,value[1]])),
  employee:'rateFlying',rateFlying:'rate'};
 const feedFlights=new Map(),hiredWorkers=new Map();
 let modal=milkBuild.tutorial?.panel||null,boardEntered=false;
 function progress(){
  if(!milkBuild.tutorial)milkBuild.tutorial={step:'opening0',stock:0,coins:0,earned:0,sold:0,owned:BUILDINGS.map(()=>0),reward:false,buildReward:false};
  const data=milkBuild.tutorial;
  data.deliveries??={milk:data.sold||0,butter:0,cheese:0};
  data.claimedMissions??=[];data.unlockedOutfits??=[];
  if(data.reward&&!data.claimedMissions.includes('hire'))data.claimedMissions.push('hire');
  if(data.buildReward&&!data.claimedMissions.includes('build'))data.claimedMissions.push('build');
  return data;
 }
 function step(){return progress().step}
 function count(){return progress().owned.reduce((sum,n)=>sum+n,0)}
 function crateSize(){return progress().sold===0?30:50}
 function packedBottleCount(){return Math.min(4,Math.floor((progress().stock+1e-9)/(crateSize()/4)))}
 function renderCrate(root){
  if(!root)return;
  const packed=packedBottleCount();root.dataset.crateBottles=String(packed);
  for(const bottle of root.querySelectorAll('[data-milk-crate-slot]')){
   const shown=Number(bottle.dataset.milkCrateSlot)<packed&&milkBuild.phase==='complete';
   const entering=shown&&bottle.style.visibility!=='visible';
   bottle.style.visibility=shown?'visible':'hidden';
   if(!shown)bottle.getAnimations().forEach(animation=>animation.cancel());
   else if(entering&&!matchMedia('(prefers-reduced-motion: reduce)').matches){
    bottle.animate([{opacity:0,transform:'translateY(-4px)'},{opacity:1,transform:'translateY(0)'}],{duration:240,easing:'ease-out'});
   }
  }
 }
 function milkCopy(source){
  const translated=/[ぁ-んァ-ン]/.test(source)?GameI18n.translateDialogue(source):t(source);
  return translated.replace(/りんご|リンゴ/g,'牛乳').replace(/苹果/g,'牛奶').replace(/个牛奶/g,'瓶牛奶').replace(/個の牛乳/g,'本の牛乳').replace(/apples/gi,'milk bottles').replace(/apple/gi,'milk');
 }
 function next(){
  const s=step();
  if(s==='opening0')return 'opening1';
  if(s==='opening1')return 'building';
  if(s==='mission13')return 'done';
  if(/^mission\d+$/.test(s)){
   const n=Number(s.slice(7));return [3,7,8,10,11,16].includes(n)?null:'mission'+(n+1);
  }
  return manualNext[s]||null;
 }
 function setStep(value){
  progress().step=value;guideTyping.delete(text);
  if(value==='shop'&&!boardEntered){
   boardEntered=true;
   if(!matchMedia('(prefers-reduced-motion: reduce)').matches){
    board.animate([{transform:'translateY(100%)'},{transform:'translateY(0)'}],{duration:400,easing:'ease-out'});
    [...board.querySelectorAll('.recruit-card')].forEach((card,index)=>card.animate([{transform:'translateX(105cqw) rotate(-3deg)'},{transform:'translateX(0) rotate(2deg)',offset:.8},{transform:'none'}],{duration:850,delay:400+index*105,fill:'backwards',easing:'ease-out'}));
   }
  }
  render();
 }
 const feedingLines={
  ja:{start:'よし！次は干し草をあげて、牛乳を作るのじゃ！',click:'上のボタンをタップして、牛に干し草をあげるのじゃ！',balance:'干し草を30回あげると、牛乳が1かご分できるぞ！',sellGoal:'その調子じゃ！続けて牛にエサをあげるのじゃ！',growComplete:'よし！30回エサをあげて、牛乳が1かご分できたぞ！',sellIntro:'牛乳が1かご分そろったぞ！',sell:'牛乳を売って、コインを手に入れるのじゃ！'},
  en:{start:"Now let's feed the cows and make some milk!",click:'Tap the button above to give the cows some hay!',balance:'Feed the cows 30 times to produce your first basket of milk!',sellGoal:'Keep going! Give the cows some more hay!',growComplete:'Well done! After 30 feeds, your first basket of milk is ready!',sellIntro:'You have a full basket of milk!',sell:'Sell the milk to earn some coins!'},
  zh:{start:'好！接下来给牛喂干草，生产牛奶吧！',click:'点击上面的按钮，给牛喂干草吧！',balance:'喂食30次，就能生产出第一篮牛奶！',sellGoal:'就是这样！继续给牛喂干草吧！',growComplete:'做得好！喂食30次，第一篮牛奶做好了！',sellIntro:'已经装好一篮牛奶了！',sell:'卖掉牛奶，赚取金币吧！'}
 };
 function line(){
  if(milkBuild.skipTutorial)return ''; 
  const s=step();
  if(feedingLines[GameI18n.language][s])return feedingLines[GameI18n.language][s];
  if(s.startsWith('opening'))return openingLines[Number(s.slice(-1))];
  if(s==='building')return milkBuild.clicks===10?'工厂完成！':buildGuideLines.find(([threshold])=>milkBuild.clicks>=threshold)[1];
  if(s==='mission16')return missionLines[16];
  if(/^mission\d+$/.test(s))return missionLines[Number(s.slice(7))];
  return growGuideLines[s]||sellGuideLines[s]||hireGuide[s]?.[0]||'';
 }
 function focus(){
  if(milkBuild.skipTutorial)return '';
  const s=step();
  if(s.startsWith('opening'))return 'intro';
  if(s==='building')return 'build';
  if(['click','appleFlight','balance','sellGoal'].includes(s))return 'produce';
  if(s==='growComplete'||s==='sellIntro'||s==='sell')return 'sell';
  if(s==='saleReward'||s==='saleCoins'||s==='hireCoins')return 'coins';
  if(hireGuide[s])return ['employee','rateFlying','rate'].includes(s)?'rate':'hire';
  if(['mission3','mission16'].includes(s))return 'mission';
  if(['mission10','mission12','mission13'].includes(s))return 'level';
  return '';
 }
 function canProduce(){return ['click','appleFlight','balance','sellGoal','waitRecruit','done'].includes(step())&&(!growGuideLines[step()]||progress().stock+feedFlights.size<30)}
 function canSell(){return ['growComplete','sell','sellIntro','waitRecruit','done'].includes(step())&&progress().stock>=crateSize()}
 function canHire(){return ['hireFirst','waitRecruit','done'].includes(step())}
 const missionCopy={
  ja:{build:'ミルク農場を完成させよう！',hire:'魚人を5人雇おう！',milk:'カフェに牛乳を累計150本届けよう！',butter:'パン屋にバターを累計120パック届けよう！',cheese:'ピザ屋にチーズを累計10ホール届けよう！',unlock:'すべての種類の魚人を解放しよう！',cafe:'カフェスタッフの服',baker:'パン職人の服',pizza:'ピザ職人の服'},
  en:{build:'Finish building the Dairy Farm!',hire:'Hire 5 Sakajin!',milk:'Deliver 150 bottles of milk to a café!',butter:'Deliver 120 packs of butter to a bakery!',cheese:'Deliver 10 wheels of cheese to a pizza shop!',unlock:'Unlock every type of Sakajin!',cafe:'Café Staff Outfit',baker:'Baker Outfit',pizza:'Pizza Chef Outfit'},
  zh:{build:'完成奶牛农场建设！',hire:'雇用5名鱼人！',milk:'向咖啡店累计配送150瓶牛奶！',butter:'向面包店累计配送120包牛油！',cheese:'向披萨店累计配送10轮芝士！',unlock:'解锁所有种类的鱼人！',cafe:'咖啡店店员服装',baker:'面包师服装',pizza:'披萨师傅服装'}
 };
 const missionTitleCopy={
  ja:{build:'ミルク農場を完成させる',hire:'魚人を5人雇う',milk:'カフェに牛乳を150本届ける',butter:'パン屋にバターを120パック届ける',cheese:'ピザ屋にチーズを10個届ける',unlock:'すべての魚人を解放する'},
  en:{build:'Build the Dairy Farm',hire:'Hire 5 Sakajin',milk:'Milk ×150 → Café',butter:'Butter ×120 → Bakery',cheese:'Cheese ×10 → Pizzeria',unlock:'Unlock all Sakajin'},
  zh:{build:'完成奶牛农场建设',hire:'雇用5名鱼人',milk:'向咖啡店配送150瓶牛奶',butter:'向面包店配送120包牛油',cheese:'向披萨店配送10轮芝士',unlock:'解锁全部种类鱼人'}
 };
 function recruitUnlocked(i){
  const data=progress();
  return data.owned[i]>0||i===0||i===1&&data.deliveries.milk>=150||i===2&&(data.level||1)>=2||i===4&&data.earned>=10000||i===3&&(data.level||1)>=3;
 }
 function dairyMissions(){
  const data=progress();
  return [
   {id:'build',value:milkBuild.phase==='complete'?1:0,target:1,coins:50},
   {id:'hire',value:count(),target:5,coins:100},
   {id:'milk',value:data.deliveries.milk,target:150,outfit:'cafe',outfitId:'cafe-staff'},
   {id:'butter',value:data.deliveries.butter,target:120,outfit:'baker',outfitId:'baker'},
   {id:'cheese',value:data.deliveries.cheese,target:10,outfit:'pizza',outfitId:'pizza-chef'},
   {id:'unlock',value:RECRUITABLE_BUILDING_IDS.filter(recruitUnlocked).length,target:5,coins:10000}
  ];
 }
 function fullMissionBoard(){return milkBuild.skipTutorial?progress().sold>0:step()==='done'&&count()>=5&&progress().reward}
 function claimDairyMission(id){
  const data=progress(),mission=dairyMissions().find(item=>item.id===id);
  if(!mission||data.claimedMissions.includes(id)||mission.value<mission.target||!(fullMissionBoard()||id==='hire'&&step()==='mission8'))return;
  data.claimedMissions.push(id);
  if(mission.coins){data.coins+=mission.coins;data.earned+=mission.coins;playCashRegisterSound()}
  if(mission.outfitId&&!data.unlockedOutfits.includes(mission.outfitId))data.unlockedOutfits.push(mission.outfitId);
  if(id==='build')data.buildReward=true;
  if(id==='hire'){
   data.reward=true;
   if(step()==='mission8'){modal=null;setStep('mission9')}
  }
 }
 function updateCards(){
  const data=progress();
  for(const card of board.querySelectorAll('.recruit-card')){
   const i=Number(card.dataset.building),unlocked=recruitUnlocked(i);
   const price=Math.ceil(BUILDINGS[i].price*Math.pow(1.15,data.owned[i]));
   const ready=unlocked&&data.coins>=price&&data.owned[i]<RECRUIT_LIMITS[i];
   card.classList.toggle('locked',!unlocked);card.classList.toggle('unaffordable',unlocked&&!ready);
   card.querySelector('.recruit-art').src=`img/svg/hiring/${RECRUIT_CARDS[i].art}${unlocked?'':'-locked'}.svg?v=1.0.243`;
   card.querySelector('.recruit-count').textContent=data.owned[i]||'';
   card.querySelector('.recruit-name').textContent=unlocked?t(BUILDINGS[i].name):'？？？';
   card.querySelector('.recruit-price span').textContent=data.owned[i]>=RECRUIT_LIMITS[i]?'MAX':number(price);
   const condition=card.querySelector('.recruit-condition');if(condition)condition.textContent=milkCopy(RECRUIT_UNLOCKS[i].label);
   const ability=card.querySelector('.recruit-ability');if(ability)ability.textContent=milkCopy(i===0?'+0.2/s':roleAbility(i));
   const button=card.querySelector('button');button.disabled=!ready||!canHire();
   button.setAttribute('aria-label',`${t(BUILDINGS[i].name)} · ${price}`);
  }
 }
 function renderMission(){
  const data=progress(),tasks=q('.milk-mission-tasks'),full=fullMissionBoard(),copy=missionCopy[GameI18n.language];
  q('.milk-mission-board').classList.toggle('milk-full-mission-board',full);
  setActionArt(q('.milk-mission-art'),'img/svg/'+(full?'mission-board-full':'mission-board')+'.svg?v=1.0.243',false);
  const definitions=full?dairyMissions():dairyMissions().filter(item=>item.id==='hire');
  tasks.replaceChildren(...definitions.map(mission=>{
   const {id,target}=mission,value=Math.min(target,Math.max(0,mission.value)),claimed=data.claimedMissions.includes(id);
   const row=document.createElement('article');row.className='mission-list-row milk-mission-task';row.dataset.mission=id;
   const ready=!claimed&&value>=target&&(step()==='mission8'||full);
   row.classList.toggle('task-ready',ready);row.classList.toggle('task-claimed',claimed);
   const fish=document.createElement('img');fish.className='mission-row-fish';fish.src=`img/svg/mission-task-${mission.coins?'fish':'cow'}.svg?v=1.0.243`;fish.alt='';
   const words=document.createElement('div');words.className='mission-row-copy';
   const name=document.createElement('b');const sharedMission=MISSIONS.find(item=>item.id===id);
   const title=['build','hire','unlock'].includes(id)?t(sharedMission.label):(full?missionTitleCopy[GameI18n.language][id]:milkCopy('雇用5名员工！'));
   name.textContent=title;name.title=title;name.setAttribute('aria-label',title);name.setAttribute('data-translated','');
   const track=document.createElement('div');track.className='mission-row-track';track.setAttribute('role','progressbar');
   track.setAttribute('aria-label',copy[id]);track.setAttribute('aria-valuemin','0');track.setAttribute('aria-valuemax',String(target));track.setAttribute('aria-valuenow',String(value));
   const fill=document.createElement('i');fill.style.width=value/target*100+'%';
   const amount=document.createElement('span');amount.textContent=value+'/'+target;track.append(fill,amount);words.append(name,track);
   const prize=document.createElement('button');prize.className='mission-row-reward';prize.dataset.milkAction='claim-'+id;prize.disabled=!ready;
   if(mission.coins){prize.classList.add('milk-money-prize');const coin=document.createElement('div');coin.className='milk-money-prize-art';coin.setAttribute('aria-hidden','true');setActionArt(coin,'img/svg/milk-money-prize.svg?v=1.0.243',false);prize.append(coin)}
   else{
    prize.classList.add('milk-outfit-reward');
    const icon=document.createElementNS('http://www.w3.org/2000/svg','svg');icon.setAttribute('viewBox','0 0 32 32');icon.setAttribute('aria-hidden','true');
    const path=document.createElementNS('http://www.w3.org/2000/svg','path');path.setAttribute('d','M11 5 3 9 6 16 10 14V28H22V14L26 16 29 9 21 5Q16 13 11 5Z');path.setAttribute('fill','#fff0a0');path.setAttribute('stroke','#555');path.setAttribute('stroke-width','1.5');icon.append(path);prize.append(icon);
   }
   const rewardLabel=document.createElement('span');rewardLabel.setAttribute('data-translated','');rewardLabel.textContent=claimed?t('已领取'):mission.coins?'+'+mission.coins.toLocaleString('en-US'):copy[mission.outfit];
   prize.setAttribute('aria-label',name.textContent+' '+rewardLabel.textContent);prize.append(rewardLabel);
   if(mission.outfit){
    row.classList.add('milk-outfit-task');
    const art=document.createElement('div');art.className='milk-outfit-task-art';art.setAttribute('aria-hidden','true');
    setActionArt(art,`img/svg/milk-outfit-mission-${claimed?'done':ready?'complete':'progress'}.svg?v=1.0.243`,false);
    row.append(art);
   }
   row.append(fish,words,prize);return row;
  }));
  for(const title of tasks.querySelectorAll('.mission-row-copy b')){
   if(title.clientWidth&&title.scrollWidth>title.clientWidth){
    const size=parseFloat(getComputedStyle(title).fontSize);
    title.style.fontSize=(size*title.clientWidth/title.scrollWidth*.98)+'px';
   }
  }
 }
 function renderMachineFocus(root,shown){
  // Keep one animated scene: dim its surroundings instead of repainting it.
  host.classList.toggle('milk-machine-focus',!!root&&shown);
  root?.classList.toggle('milk-scene-focus',shown);
 }
 function render(){
  if(previewFarm!=='milk'){ui.hidden=true;return}
  ui.hidden=false;
  host.classList.toggle('milk-no-tutorial',milkBuild.skipTutorial===true);
  const data=progress();
  if(milkBuild.skipTutorial){data.step=milkBuild.phase==='complete'?'done':'building';data.fullMissionListUnlocked=data.sold>0}
  const s=step(),complete=milkBuild.phase==='complete',root=$('milkBuildScene').querySelector('svg');
  root?.classList.add('milk-live-ui');
  renderCrate(root);
  root?.classList.toggle('milk-build-guiding',!complete);
  host.classList.toggle('milk-construction-active',!complete);
  root?.querySelectorAll('[data-milk-step]').forEach(group=>group.classList.toggle('milk-lit-part',Number(group.dataset.milkStep)===milkBuild.clicks||milkBuild.clicks===10&&group.dataset.milkStep==='11'));
  if(complete&&['building','opening0','opening1'].includes(s)){setStep('start');return}
  data.panel=modal;
  $('resetFromSettings').disabled=false;
  host.dataset.milkOutfitRewards=data.unlockedOutfits.join(',');
  host.dataset.milkTutorial=s;host.dataset.milkFeeds=String(data.feeds||0);host.dataset.milkFocus=focus();
  const opening=s.startsWith('opening');
  $('milkBuildControls').hidden=complete||opening;
  const buildGuide=$('milkBuildControls').querySelector('.milk-build-guide');buildGuide.hidden=true;
  const at=TUTORIAL_ORDER.indexOf(s),fullHeader=!complete||s==='done'||s==='waitRecruit'||/^mission\d+$/.test(s);
  q('.milk-live-hud').hidden=opening||!fullHeader;
  q('.milk-guide-stock').hidden=!complete||fullHeader;
  q('.milk-guide-coins').hidden=!complete||fullHeader||at<TUTORIAL_ORDER.indexOf('sell')||s==='sellIntro';
  q('.milk-live-rate').hidden=!complete||TUTORIAL_ORDER.indexOf(s)<TUTORIAL_ORDER.indexOf('rateFlying');
  board.hidden=!complete||milkBuild.skipTutorial&&data.sold===0;
  const missionVisible=complete&&(!milkBuild.skipTutorial||data.sold>0)&&(s==='waitRecruit'||s==='done'||/^mission\d+$/.test(s));
  q('.milk-mission-entry').hidden=!missionVisible;
  q('.milk-mission-entry').setAttribute('aria-label',t('查看任务'));
  const hasReward=dairyMissions().some(mission=>(fullMissionBoard()||mission.id==='hire')&&mission.value>=mission.target&&!data.claimedMissions.includes(mission.id));
  q('.milk-mission-entry i').hidden=!hasReward;
  q('.milk-mission-entry').classList.toggle('milk-mission-ready',hasReward);
  q('.milk-level').disabled=!complete||!['mission10','mission11','done'].includes(s);
  q('.milk-coins b').textContent=q('.milk-guide-coins b').textContent=number(data.coins);q('.milk-stock b').textContent=q('.milk-guide-stock b').textContent=number(Math.floor(data.stock));
  q('.milk-live-rate b').textContent='+'+precise(data.owned[0]*.2)+'/s';
  const produce=q('.milk-live-produce'),sell=q('.milk-live-sell');produce.hidden=sell.hidden=!complete;
  produce.disabled=!canProduce();sell.disabled=!canSell();
  sell.style.zIndex=canSell()&&['growComplete','sellIntro'].includes(s)?'8':'';
  produce.querySelector('.milk-produce-title').textContent=label('produce');
  produce.querySelector('small').textContent=({ja:'タップしてミルクを増やそう！',en:'Tap to feed the cows and make milk!',zh:'点击喂食，生产牛奶！'})[GameI18n.language];produce.setAttribute('aria-label',label('produce'));
  sell.querySelector('.milk-sale-title').textContent=label('sell');
  sell.querySelector('.milk-sale-progress').textContent=Math.floor(data.stock/crateSize())+({ja:'かご',en:' baskets',zh:'篮'})[GameI18n.language]+'='+Math.floor(data.stock)+'/'+crateSize();
  sell.querySelector('.milk-reward-title').textContent=({ja:'獲得コイン',en:'Coins earned',zh:'获得金币'})[GameI18n.language];
  sell.querySelector('.milk-sale-reward').textContent='+'+(data.stock>=crateSize()?50:0);
  sell.querySelector('strong').textContent=label('sale');
  sell.setAttribute('aria-label',label('sell')+' '+Math.floor(data.stock)+'/'+crateSize());
  const active=!milkBuild.skipTutorial&&!!line();
  q('.milk-wardrobe-entry').hidden=active||!complete;
  const kind=complete?(growGuideLines[s]?'grow':sellGuideLines[s]?'sell':hireGuide[s]?'hire':/^mission\d+$/.test(s)?'mission':''):'';
  host.dataset.milkGuideKind=kind;
  renderMachineFocus(root,kind==='grow'&&s!=='start'||kind==='sell');
  root?.classList.toggle('milk-operation-guiding',complete&&active);
  if(hireGuide[s]){
   const [,x,y,width]=hireGuide[s];
   dialogue.style.setProperty('--milk-hire-left',x/402*100+'%');dialogue.style.setProperty('--milk-hire-top',y/874*100+'%');dialogue.style.setProperty('--milk-hire-width',width/402*100+'%');
  }
  dialogue.hidden=!active||milkBuild.skipTutorial===true;
  q('.milk-tutorial-shade').hidden=!(modal!==null||active&&!['mission1','mission12','mission13'].includes(s));
  q('.milk-dialogue-touch').hidden=!active;
  q('.milk-dialogue-touch').style.pointerEvents=next()?'auto':'none';
  q('.milk-dialogue-touch').style.zIndex=next()?'7':'4';
  q('.milk-dialogue-touch').setAttribute('aria-label',label('continue'));
  if(active)setTypedGuide(text,milkCopy(line()),true);
  if(s==='building'){$('milkBuildControls').style.zIndex='5'}else $('milkBuildControls').style.zIndex='';
  q('.milk-mission-board').hidden=modal!=='mission';
  q('.milk-mission-close-finger').hidden=modal!=='mission'||s!=='mission7';q('.milk-upgrade-panel').hidden=modal!=='upgrade';
  const finger=q('.milk-tutorial-finger');
  const target=({produce:'.milk-live-produce',sell:'.milk-live-sell',hire:'.recruit-card[data-building="0"]',mission:'.milk-mission-entry',level:'.milk-level'})[focus()]||
   (s==='mission7'?'.milk-mission-board .milk-panel-close':s==='mission8'?'.milk-mission-task .mission-row-reward':s==='mission11'?'.milk-upgrade-panel .milk-panel-close':null);
  finger.hidden=s==='mission7'||!target||!['click','balance','sellGoal','growComplete','sell','hireFirst','mission3','mission7','mission8','mission10','mission11','mission16'].includes(s);
  if(!finger.hidden){
   const a=q(target)?.getBoundingClientRect(),b=host.getBoundingClientRect();
   if(a){finger.style.left=Math.min(80,Math.max(0,(a.right-b.left)/b.width*100-7))+'%';finger.style.top=Math.min(87,(a.top-b.top)/b.height*100+1)+'%'}
  }
  renderUpgradeArt(q('.milk-upgrade-panel'),q('.milk-level-ready'));
  q('.milk-upgrade-panel p').textContent=t('距离下一级');q('.milk-level-ready').disabled=data.coins<400;
  q('.milk-upgrade-panel').classList.toggle('milk-upgrade-ready',data.coins>=400);
  updateCards();if(modal==='mission')renderMission();
 }
 function update(dt){
  if(previewFarm!=='milk')return;
  const data=progress(),previousStock=Math.floor(data.stock),previousPacked=packedBottleCount();
  for(const [worker,entry] of hiredWorkers){entry.time+=dt;paintWorkerPose(worker,matchMedia('(prefers-reduced-motion: reduce)').matches?0:1+Math.floor((entry.time%.9)*30))}
  if(milkBuild.phase==='complete'){
   data.stock+=data.owned[0]*.2*dt;
   if(count()>=5&&step()==='waitRecruit')setStep('mission16');
  }
  const copy=milkBuild.skipTutorial?'':line();if(copy)setTypedGuide(text,milkCopy(copy),true);
  if(Math.floor(data.stock)!==previousStock||packedBottleCount()!==previousPacked)render();
  // Updating values does not replace an active dialogue or reset its typing clock.
  q('.milk-coins b').textContent=q('.milk-guide-coins b').textContent=number(data.coins);q('.milk-stock b').textContent=q('.milk-guide-stock b').textContent=number(Math.floor(data.stock));
 }
 function feedCow(){
  const data=progress(),session=milkBuild;
  data.feeds=(data.feeds||0)+1;
  const hay=document.createElement('img');hay.className='milk-feed-hay';hay.src='img/svg/cow-food.svg?v=1.0.243';hay.alt='';host.append(hay);
  const width=host.clientWidth,height=host.clientHeight;
  const button=q('.milk-live-produce').getBoundingClientRect();
  const counter=q('.milk-guide-stock').hidden?q('.milk-stock'):q('.milk-guide-stock');
  const target=counter.getBoundingClientRect(),bounds=host.getBoundingClientRect();
  const startX=button.left-bounds.left+button.width*.3,startY=button.top-bounds.top+button.height*.5;
  const endX=target.left-bounds.left+target.width*.5,endY=target.top-bounds.top+target.height*.5;
  let flight;
  const arrive=()=>{
   if(!feedFlights.has(hay))return;
   feedFlights.delete(hay);hay.remove();flight?.cancel();
   if(milkBuild!==session)return;
   data.stock+=1+data.owned[1];
   if(growGuideLines[step()]&&data.stock>=30)setStep('growComplete');
   else if(step()==='balance'&&data.stock>=10)setStep('sellGoal');
   render();
  };
  feedFlights.set(hay,arrive);
  if(matchMedia('(prefers-reduced-motion: reduce)').matches){arrive();return}
  flight=hay.animate([
   {transform:`translate(${startX}px,${startY}px) translate(-50%,-50%) scale(.6) rotate(-12deg)`,opacity:1},
   {transform:`translate(${(startX+endX)/2+20}px,${endY-height*.08}px) translate(-50%,-50%) scale(.85) rotate(8deg)`,opacity:1,offset:.55},
   {transform:`translate(${endX}px,${endY}px) translate(-50%,-50%) scale(.45) rotate(-8deg)`,opacity:0}
  ],{duration:720,easing:'ease-in-out',fill:'both'});
  flight.finished.then(arrive,()=>{feedFlights.delete(hay);hay.remove()});
 }
 function spawnHiredWorker(building){
  const worker=document.createElement('div');worker.className='milk-hired-worker';worker.setAttribute('aria-hidden','true');
  const canvas=document.createElement('canvas');canvas.width=256;canvas.height=376;worker.append(canvas);
  worker.workerContext=canvas.getContext('2d');worker.workerPose=-1;
  const look=BUILDINGS[building]?.workerLook;
  worker.workerAtlas=({farmer:farmerAtlas,'navy-suit':suitAtlas,'ivory-king':kingAtlas,'milk-frog':mutantAtlas})[look]||workerAtlas;
  host.append(worker);hiredWorkers.set(worker,{time:0});paintWorkerPose(worker,0);
  const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
  const motion=worker.animate(reduced?[{opacity:1},{opacity:0}]:[{transform:'translateX(105cqw)'},{transform:'translateX(-35cqw)'}],{duration:reduced?600:3200,easing:'linear'});
  const remove=()=>{hiredWorkers.delete(worker);worker.remove()};motion.finished.then(remove,remove);
 }
 function settleFeed(){for(const arrive of [...feedFlights.values()])arrive()}
 function act(action){
  const data=progress();
  if(action==='wardrobe'){showWardrobe(true);return}
  if(action==='produce'&&canProduce()){
   feedCow();playPopSound();
   if(step()==='click')setStep('balance');
  }
  if(action==='sell'&&canSell()){
   const amount=crateSize();data.stock-=amount;data.sold+=amount;data.deliveries.milk+=amount;data.coins+=50;data.earned+=50;playCashRegisterSound();
   if(['growComplete','sell','sellIntro'].includes(step()))setStep('saleReward');
  }
  if(action==='mission'){
   if(!['mission3','mission16','waitRecruit','done'].includes(step()))return;
   modal='mission';if(step()==='mission3')setStep('mission4');else if(step()==='mission16')setStep('mission8');
  }
  if(action==='closeMission'){
   if(!['mission7','waitRecruit','done'].includes(step()))return;
   modal=null;if(step()==='mission7')setStep(count()>=5?'mission16':'waitRecruit');
  }
  if(action.startsWith('claim-'))claimDairyMission(action.slice(6));
  if(action==='upgrade'&&['mission10','done'].includes(step())){modal='upgrade';if(step()==='mission10')setStep('mission11')}
  if(action==='closeUpgrade'){
   if(!['mission11','done'].includes(step()))return;
   modal=null;if(step()==='mission11')setStep('mission12');
  }
  // Milk Lv.2 artwork and rules are still a later step of this farm.
  if(action==='levelUp'&&data.coins>=400)notify('暂未开放');
  render();
 }
 host.addEventListener('click',event=>{
  if(previewFarm!=='milk'||event.target.closest('.settings'))return;
  const typing=guideTyping.get(text);
  if(!dialogue.hidden&&typing&&text.textContent!==typing.text){
   event.preventDefault();event.stopImmediatePropagation();typing.complete=true;text.textContent=typing.text;return;
  }
  const following=next();
  if(!dialogue.hidden&&following&&!(event.target.closest('[data-milk-action="sell"]')&&canSell())){event.preventDefault();event.stopImmediatePropagation();setStep(following);return}
 },true);
 ui.addEventListener('click',event=>{
  const action=event.target.closest('[data-milk-action]');
  if(action){act(action.dataset.milkAction);return}
  const card=event.target.closest('.recruit-card');
  if(card&&event.target.closest('.recruit-hit')&&canHire()){
   const i=Number(card.dataset.building),data=progress(),price=Math.ceil(BUILDINGS[i].price*Math.pow(1.15,data.owned[i]));
   if(card.querySelector('button').disabled||data.coins<price||data.owned[i]>=RECRUIT_LIMITS[i])return;
   data.coins-=price;data.owned[i]++;playRecruitSound();
   spawnHiredWorker(i);
   if(step()==='hireFirst')setStep('employee');render();
  }
 });
 function reset(){for(const worker of hiredWorkers.keys()){worker.getAnimations().forEach(animation=>animation.cancel());worker.remove()}hiredWorkers.clear();for(const hay of feedFlights.keys()){hay.getAnimations().forEach(a=>a.cancel());hay.remove()}feedFlights.clear();modal=null;boardEntered=false;guideTyping.delete(text);host.querySelectorAll('.milk-hired-worker').forEach(e=>e.remove())}
 render();
 function fastForward(id){
  settleFeed();
  if(['testFarmLevelTwo','testFarmLevelThree'].includes(id)){
   modal=null;milkBuild.previewLevel=id==='testFarmLevelTwo'?2:3;
   renderMilkBuild();return true;
  }

  if(!['testBuildComplete','testFiveEmployees','testTutorialComplete'].includes(id))return false;
  modal=null;milkBuild.previewLevel=1;
  const data=progress();milkBuild.clicks=10;milkBuild.phase='complete';
  if(id==='testBuildComplete')setStep('start');
  else{
   data.owned[0]=Math.max(5,data.owned[0]);data.stock=Math.max(50,data.stock);
   data.coins=Math.max(100,data.coins);
   if(id==='testFiveEmployees'){data.reward=false;data.claimedMissions=data.claimedMissions.filter(id=>id!=='hire');setStep('mission16')}
   else{data.reward=true;setStep('done')}
  }
  renderMilkBuild();return true;
 }
 return {render,update,reset,fastForward,settleFeed};
})();
