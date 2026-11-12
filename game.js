'use strict';
// Data reference: Cookie Clicker live web main.js, retrieved 2026-10-18.
// Ten buildings, ordinary tiers, employee mentoring, finger and click upgrades.
const BUILDINGS=[
 {
  "name": "兼职鱼人",
  "original": "Cursor",
  "icon": "img/svg/fisher-parttime.svg",
  "price": 30,
  "cps": 0.02,
  "desc": "自动生产苹果。"
 },
 {
  "name": "农民鱼人",
  "original": "Grandma",
  "icon": "img/svg/fisher-staff.svg",
  "price": 50,
  "cps": 0,
  "desc": "每次点击多生产1个苹果。",
  "workerLook": "farmer"
 },
 {
  "name": "料理鱼人",
  "original": "Farm",
  "icon": "img/svg/fisher-influencer.svg",
  "price": 100,
  "cps": 0,
  "desc": "每卖出一箱苹果，额外获得5金币。"
 },
 {
  "name": "国王鱼人",
  "workerLook": "ivory-king",
  "original": "Mine",
  "icon": "img/svg/fisher-mutant.svg",
  "price": 1000,
  "cps": 0,
  "desc": "每次升级农场，额外获得10金币。"
 },
 {
  "name": "鱼人社员",
  "workerLook": "navy-suit",
  "original": "Factory",
  "icon": "img/svg/fisher-sponge.svg",
  "price": 500,
  "cps": 0,
  "desc": "每2分钟自动卖出苹果箱。"
 },
 {
  "name": "小丑鱼人",
  "workerLook": "clown-suit",
  "original": "Bank",
  "icon": "img/svg/fisher-clown.svg",
  "price": 1400000,
  "cps": 1400,
  "desc": "用杂耍接住每颗苹果，把果园变成欢乐舞台。"
 },
 {
  "name": "变异鱼人",
  "original": "Temple",
  "icon": "img/svg/fisher-king.svg",
  "price": 20000000,
  "cps": 7800,
  "desc": "多长出来的触手，各自负责一条苹果生产线。",
  "workerLook": "milk-frog"
 },
 {
  "name": "外星鱼人",
  "workerLook": "alien",
  "original": "Wizard tower",
  "icon": "img/svg/fisher-alien.svg",
  "price": 330000000,
  "cps": 44000,
  "desc": "从遥远星系赶来，用外星科技培育苹果。"
 },
 {
  "name": "海绵鱼人",
  "original": "Shipment",
  "icon": "img/svg/fisher-hero.svg",
  "price": 5100000000,
  "cps": 260000,
  "desc": "吸收海里的养分，把苹果种得饱满又多汁。"
 },
 {
  "name": "鱼神",
  "original": "Alchemy lab",
  "icon": "img/svg/fisher-god.svg",
  "price": 75000000000,
  "cps": 1600000,
  "desc": "不必多言。"
 }
];
const UPGRADES=createItemUpgrades(BUILDINGS);
const t=value=>GameI18n.translate(value);
const KEY='apple-works-demo-v1',$=id=>document.getElementById(id);
const RETIRED_ITEM_IDS={"tier-2-0": "tier-farmer-0", "tier-2-1": "tier-farmer-1", "tier-2-2": "tier-farmer-2", "tier-2-3": "tier-farmer-3", "tier-2-4": "tier-farmer-4", "tier-2-5": "tier-farmer-5", "tier-2-6": "tier-farmer-6", "tier-2-7": "tier-farmer-7", "tier-2-8": "tier-farmer-8", "tier-2-9": "tier-farmer-9", "tier-2-10": "tier-farmer-10", "tier-2-11": "tier-farmer-11", "tier-2-12": "tier-farmer-12", "tier-2-13": "tier-farmer-13", "tier-2-14": "tier-farmer-14", "tier-8-0": "tier-shark-0", "tier-8-1": "tier-shark-1", "tier-8-2": "tier-shark-2", "tier-8-3": "tier-shark-3", "tier-8-4": "tier-shark-4", "tier-8-5": "tier-shark-5", "tier-8-6": "tier-shark-6", "tier-8-7": "tier-shark-7", "tier-8-8": "tier-shark-8", "tier-8-9": "tier-shark-9", "tier-8-10": "tier-shark-10", "tier-8-11": "tier-shark-11", "tier-8-12": "tier-shark-12", "tier-8-13": "tier-shark-13", "tier-8-14": "tier-shark-14", "mentor-2": "mentor-staff", "mentor-8": "mentor-shark", "supply-gingerbread-trees": "supply-farmer-0", "supply-pure-black-chocolate-cookies": "supply-farmer-1", "supply-pure-white-chocolate-cookies": "supply-farmer-2", "supply-ladyfingers": "supply-farmer-3", "supply-tuiles": "supply-farmer-4", "supply-chocolate-stuffed-biscuits": "supply-farmer-5", "supply-checker-cookies": "supply-farmer-6", "supply-butter-cookies": "supply-farmer-7", "supply-cream-cookies": "supply-farmer-8", "supply-gingersnaps": "supply-farmer-9", "supply-cinnamon-cookies": "supply-farmer-10", "supply-vanity-cookies": "supply-farmer-11", "supply-cigars": "supply-farmer-12", "supply-pinwheel-cookies": "supply-farmer-13", "supply-vanillekipferl": "supply-shark-0", "supply-battenberg-biscuits": "supply-shark-1", "supply-rosette-cookies": "supply-shark-2", "supply-gangmakers": "supply-shark-3", "supply-welsh-cookies": "supply-shark-4", "supply-raspberry-cheesecake-cookies": "supply-shark-5", "supply-bokkenpootjes": "supply-shark-6", "supply-fat-rascals": "supply-shark-7", "supply-ischler-cookies": "supply-shark-8", "supply-matcha-cookies": "supply-shark-9", "supply-dalgona-cookies": "supply-shark-10", "supply-spicy-cookies": "supply-shark-11", "supply-smile-cookies": "supply-shark-12", "supply-kolachy-cookies": "supply-shark-13"};
const BUILD_CLICKS_REQUIRED=10;
const LEGACY_BUILD_MILESTONES=[4,12,16,20,24,28,32,36,40,44];
function migrateBuildClicks(clicks,schema,phase){
 const value=Math.max(0,Math.floor(Number.isFinite(clicks)?clicks:0));
 if(phase==='operation')return BUILD_CLICKS_REQUIRED;
 if(schema>=104)return Math.min(BUILD_CLICKS_REQUIRED,value);
 return LEGACY_BUILD_MILESTONES.filter(milestone=>value>=milestone).length;
}
const FIRST_APPLE_CRATE_SIZE=30,APPLE_CRATE_SIZE=50,COINS_PER_CRATE=50,PRODUCTION_SPEED_MULTIPLIER=10;
const JUICE_CRATE_SIZE=40,COINS_PER_JUICE_CRATE=100;
const FACTORY_STARTUP_TAPS=5,JUICE_STARTUP_FLIGHT_MS=680,COMPUTER_STARTUP_DURATION_MS=6000;
const CHEF_COIN_BONUS=5;
const AUTO_SELL_INTERVAL=120;
const KING_UPGRADE_COIN_BONUS=10;
const GOLDEN_FRENZY_DURATION=20;
const FEVER_ANIMATION_RATE=1.5;
const GOLDEN_APPLES_PER_TAP=7;
const GOLDEN_PLAY_MILESTONE=120;
const GUARANTEED_GOLD_WINDOWS=[60,240];
const TUTORIAL_SPEECH_DURATION=3500;
const FARM_LEVEL_UP_PRICES={1:200,2:450};
const LEGACY_INITIAL_UPGRADE_PRICES=[25,50,100];
const fresh=()=>({schema:105,juiceStartupTaps:0,juiceStartupAt:null,juiceFirstOutput:false,computerStartupTaps:0,computerStartupAt:null,computerFirstOutput:false,firstUpgradeAcknowledged:false,farmUpgradeGuide:'done',farmUpgradeGuideTime:0,recruitGoalChoice:null,recruitGoalGuide:'pending',recruitGoalGuideTime:0,newFarmPromptShown:false,phase:'construction',tutorial:'build',tutorialTime:0,introRecruit:false,buildClicks:0,apples:0,coins:0,earnedCoins:0,autoSellTime:0,total:0,soldApples:0,handmade:0,playSeconds:0,milestoneTimes:{construction:null,fiveEmployees:null,firstFarmUpgrade:null},operationSeconds:0,guaranteedGold:freshGuaranteedGold(),goldenClicks:0,owned:BUILDINGS.map(()=>0),upgrades:[],outfit:null,prizes:[0,0,0],draws:0,events:freshEvents()});
let state=fresh(),displayed=0,last=null,saveClock=0,toastTimer,returnFocus;
try{
 const data=JSON.parse(localStorage.getItem(KEY)),v=data?.state;
 if(data?.version===1&&v&&Number.isFinite(v.apples)&&v.apples>=0&&Array.isArray(v.owned)&&v.owned.every(n=>Number.isInteger(n)&&n>=0)){
  const hasCoinBalance=Number.isFinite(v.coins)&&v.coins>=0;
  const legacy=![101,102,103,104,105].includes(v.schema);
  state={...fresh(),...v,schema:105,apples:hasCoinBalance?v.apples:0,coins:hasCoinBalance?v.coins:v.apples,soldApples:Number.isFinite(v.soldApples)&&v.soldApples>=0?v.soldApples:Math.max(0,(v.total||0)-(v.apples||0)),firstUpgradeAcknowledged:typeof v.firstUpgradeAcknowledged==='boolean'?v.firstUpgradeAcknowledged:null,
   tutorial:v.tutorial||(v.phase==='operation'?'done':'build'),tutorialTime:Number.isFinite(v.tutorialTime)?v.tutorialTime:0,introRecruit:typeof v.introRecruit==='boolean'?v.introRecruit:(v.phase==='operation'?null:false),
   phase:legacy?'construction':['construction','ready','operation'].includes(v.phase)?v.phase:'construction',
   buildClicks:legacy?0:migrateBuildClicks(v.buildClicks,v.schema,v.phase),
   owned:BUILDINGS.map((_,i)=>Math.max(0,(v.owned[i]||0)-(legacy?(v.gifted?.[i]||0):0))),
   upgrades:[...new Set((v.upgrades||[]).map(id=>RETIRED_ITEM_IDS[id]||id))].filter(id=>UPGRADES.some(u=>u.id===id)),
   operationSeconds:legacy?0:Math.max(0,Number.isFinite(v.operationSeconds)?v.operationSeconds:0),
   guaranteedGold:legacy?freshGuaranteedGold():v.guaranteedGold,
   events:legacy?freshEvents():{...freshEvents(),...v.events}
  };
  if(!legacy)state.events.frenzy=Number.isFinite(data.frenzyExpiresAt)?Math.max(0,Math.min(GOLDEN_FRENZY_DURATION,(data.frenzyExpiresAt-Date.now())/1000)):0;
 }
}catch{}
for(const key of ['juiceStartupTaps','computerStartupTaps']){
 state[key]=Number.isInteger(state[key])?Math.max(0,Math.min(FACTORY_STARTUP_TAPS,state[key])):0;
}
state.juiceStartupAt=Number.isFinite(state.juiceStartupAt)?state.juiceStartupAt:null;
state.computerStartupAt=Number.isFinite(state.computerStartupAt)?state.computerStartupAt:null;
state.juiceFirstOutput=state.juiceFirstOutput===true&&state.juiceStartupTaps===FACTORY_STARTUP_TAPS;
state.computerFirstOutput=state.computerFirstOutput===true&&state.computerStartupTaps===FACTORY_STARTUP_TAPS;
state.playSeconds=Number.isFinite(state.playSeconds)&&state.playSeconds>=0?state.playSeconds:0;
// Older saves can recover at least the standard proceeds from previous sales.
const previousCrates=state.soldApples<FIRST_APPLE_CRATE_SIZE?0:1+Math.floor((state.soldApples-FIRST_APPLE_CRATE_SIZE)/APPLE_CRATE_SIZE);
state.earnedCoins=Math.max(state.coins,previousCrates*COINS_PER_CRATE,Number.isFinite(state.earnedCoins)?state.earnedCoins:0);
state.autoSellTime=Number.isFinite(state.autoSellTime)?Math.max(0,Math.min(AUTO_SELL_INTERVAL,state.autoSellTime)):0;
delete state.cityContribution;
state.milestoneTimes=Object.fromEntries(['construction','fiveEmployees','firstFarmUpgrade'].map(key=>[key,Number.isFinite(state.milestoneTimes?.[key])&&state.milestoneTimes[key]>=0?state.milestoneTimes[key]:null]));
state.recruitGoalChoice=state.recruitGoalChoice==='continue'?'continue':null;
if(!['pending','complete','workers','choice','upgrade','done'].includes(state.recruitGoalGuide))state.recruitGoalGuide='pending';
state.recruitGoalGuideTime=Number.isFinite(state.recruitGoalGuideTime)?Math.max(0,state.recruitGoalGuideTime):0;
state.newFarmPromptShown=state.newFarmPromptShown===true;
if(state.tutorial==='newFactory')state.tutorial='factory';
if(state.recruitGoalChoice!=='continue'&&['done','closing'].includes(state.tutorial))state.tutorial='waitRecruit';
state.recruitGoalGuide=state.recruitGoalChoice==='continue'?'done':'pending';
state.goldenClicks=Number.isSafeInteger(state.goldenClicks)&&state.goldenClicks>=0?state.goldenClicks:0;
state.events.frenzyDuration=GOLDEN_FRENZY_DURATION;
const savedGold=state.guaranteedGold;
state.guaranteedGold=freshGuaranteedGold();
for(const [i,gift] of state.guaranteedGold.entries()){
 const old=savedGold?.[i];
 if(!old)continue;
 if(gift.clock==='play'){
  if(old.clock==='play')Object.assign(gift,{spawned:old.spawned===true,active:old.active||null});
 }else if(Number.isFinite(old.at)&&(old.spawned||(old.at>=GUARANTEED_GOLD_WINDOWS[i]&&old.at<=GUARANTEED_GOLD_WINDOWS[i]+60))){
  Object.assign(gift,old);
 }
}
if(state.phase==='construction'&&state.buildClicks>=BUILD_CLICKS_REQUIRED)state.phase='ready';
if(state.phase!=='operation')state.events=freshEvents();
for(const key of ['factorySteps','factoryPlan','gifted','legacyClickUpgrades','levelTimes'])delete state[key];
displayed=state.apples;
// Keep the existing count-up curve, but sample fast growth at a readable
// cadence. Skipped intermediate integers never affect the actual balance.
let balancePaintClock=0,lastPaintedBalance=null;
function paintBalance(){
 const settled=Math.abs(state.apples-displayed)<.05;
 if(lastPaintedBalance===null||displayed<lastPaintedBalance||settled||balancePaintClock>=.075){
  const label=totalNumber(displayed);
  if($('balance').textContent!==label)$('balance').textContent=label;
  lastPaintedBalance=displayed;balancePaintClock%=.075;
 }
}
// Like the reference, abbreviate from one million; keep smaller balances whole.
function formatNumber(n,decimals=0){
 if(!Number.isFinite(n))return '∞';
 const magnitude=Math.abs(n),units=['M','B','T','Qa','Qi','Sx','Sp','Oc','No','Dc','UDc','DDc','TDc','QaDc','QiDc','SxDc','SpDc','OcDc','NoDc','Vg','UVg','DVg','TVg'];
 if(magnitude<1e6)return (decimals?Number(n.toFixed(decimals)):Math.floor(n)).toLocaleString('en-US');
 let tier=Math.min(Math.floor(Math.log10(magnitude)/3)-2,units.length-1),value=n/10**(6+tier*3);
 if(Math.abs(Number(value.toFixed(2)))>=1000&&tier<units.length-1){tier++;value/=1000}
 return Number(value.toFixed(2)).toLocaleString('en-US')+' '+units[tier];
}
// Top counter keeps up to nine integer digits before promoting its unit.
function totalNumber(n){
 if(!Number.isFinite(n))return '∞';
 const units=['','K','M','B','T','Qa','Qi','Sx','Sp','Oc','No','Dc','UDc','DDc','TDc','QaDc','QiDc','SxDc','SpDc','OcDc','NoDc','Vg','UVg','DVg','TVg'];let value=Math.max(0,n),unit=0;
 while(value>=1e9&&unit<units.length-1){value/=1000;unit++}
 return Math.floor(value).toLocaleString('en-US')+(unit?' '+units[unit]:'');
}
const number=n=>formatNumber(n),precise=n=>formatNumber(n,1);
const crateNumber=new Intl.NumberFormat('en-US',{notation:'compact',maximumFractionDigits:1});
// Rebuild purchased effects only when the inventory changes, not for every
// fish and every animation frame. Counts still feed live mentoring bonuses.
let effectSource=null,effectCount=-1,effectCache;
function upgradeEffects(){
 if(effectSource===state.upgrades&&effectCount===state.upgrades.length)return effectCache;
 effectSource=state.upgrades;effectCount=state.upgrades.length;
 const owned=new Set(state.upgrades),effects={doubles:BUILDINGS.map(()=>1),mentors:new Set(),fingers:0,mouse:0,global:1};
 let fingerFactor=1;
 for(const u of UPGRADES){if(!owned.has(u.id))continue;
  if(u.kind==='double')effects.doubles[u.building]*=2;
  else if(u.kind==='mentor')effects.mentors.add(u.building);
  else if(u.kind==='fingers')fingerFactor*=u.factor;
  else if(u.kind==='mouse')effects.mouse++;
  else if(u.kind==='global')effects.global*=1+u.power/100;
 }
 effects.fingers=owned.has('fingers-0')?.1*fingerFactor:0;
 return effectCache=effects;
}
const multiplier=i=>{
 const e=upgradeEffects();let value=e.doubles[i];
 if(i===1)value*=2**e.mentors.size;
 if(i>=2&&e.mentors.has(i))value*=1+state.owned[1]*.01/(i-1);
 return value;
};
const fingerBonus=()=>upgradeEffects().fingers*state.owned.slice(1).reduce((a,b)=>a+b,0);
// One unit's output, upgrades and finger bonuses included.
const unitCps=i=>(BUILDINGS[i].cps*multiplier(i)+(i===0?fingerBonus():0))*upgradeEffects().global*PRODUCTION_SPEED_MULTIPLIER;
const baseCps=()=>BUILDINGS.reduce((sum,b,i)=>sum+unitCps(i)*state.owned[i],0);
const clickPower=()=>state.events.frenzy>0
 ?GOLDEN_APPLES_PER_TAP
 :multiplier(0)+fingerBonus()+state.owned[1]*farmerTapBonus()+baseCps()*.01*upgradeEffects().mouse;
const cps=()=>baseCps()*(state.events.frenzy>0?7:1);
const currentUnitCps=i=>unitCps(i)*(state.events.frenzy>0?7:1);
const specialAbilityMultiplier=i=>upgradeEffects().doubles[i];
const farmerTapBonus=()=>multiplier(1);
const chefCrateBonus=()=>CHEF_COIN_BONUS*specialAbilityMultiplier(2);
const kingUpgradeBonus=()=>KING_UPGRADE_COIN_BONUS*specialAbilityMultiplier(3);
const autoSellInterval=()=>AUTO_SELL_INTERVAL/specialAbilityMultiplier(4);
const autoSellLabel=seconds=>seconds===AUTO_SELL_INTERVAL?t('每2分钟自动售卖'):constructionCopy('每{seconds}秒自动售卖',{seconds:precise(seconds)});
function roleAbility(i){
 if(i===0)return `+${productionNumber(currentUnitCps(0))}/s`;
 if(i===1)return `+${number(farmerTapBonus())}${t('个/点击')}`;
 if(i===2)return `+$${number(chefCrateBonus())}/箱`;
 if(i===4)return autoSellLabel(autoSellInterval());
 return '';
}
function recruitNotice(i,count){
 const name=t(BUILDINGS[i].name),quantity=number(count);
 const ability=roleAbility(i);
 return ability?`${name}+${quantity}・${ability}`:`${name}+${quantity}`;
}
function firstRecruitSpeech(i){
 const greeting=constructionCopy('雇用了{name}！',{name:t(BUILDINGS[i].name)});
 return i===3?greeting:greeting+(i===4?roleAbility(i):t(BUILDINGS[i].desc));
}
function productionNumber(n){
 if(!Number.isFinite(n))return '∞';
 const units=['','K','M','B','T','Qa','Qi','Sx','Sp','Oc','No','Dc','UDc','DDc','TDc','QaDc','QiDc','SxDc','SpDc','OcDc','NoDc','Vg','UVg','DVg','TVg'];
 let value=Math.abs(n),tier=0;
 while(value>=1000&&tier<units.length-1){value/=1000;tier++}
 for(;;){
  const suffix=units[tier],limit=4-suffix.length;
  let label=Number(value.toFixed(1)).toString();
  if(label.length>limit)label=Math.round(value).toString();
  if((label.length>4-suffix.length||Number(label)>=1000)&&tier<units.length-1){value/=1000;tier++;continue}
  return (n<0?'-':'')+label+suffix;
 }
}
function buildingCost(i){return Math.ceil(BUILDINGS[i].price*1.15**state.owned[i])}
function sellingJuice(){return state.phase==='operation'&&farmStage()===2}
function currentCrateSize(){
 return sellingJuice()?JUICE_CRATE_SIZE:state.soldApples===0?FIRST_APPLE_CRATE_SIZE:APPLE_CRATE_SIZE;
}
function factorySaleReady(){
 const stage=farmStage();
 return stage===1||(stage===2?state.juiceFirstOutput:state.computerFirstOutput);
}
function readyCrateCount(){
 if(!factorySaleReady())return 0;
 const firstSize=currentCrateSize();
 if(state.apples<firstSize)return 0;
 const nextSize=sellingJuice()?JUICE_CRATE_SIZE:APPLE_CRATE_SIZE;
 return 1+Math.floor((state.apples-firstSize)/nextSize);
}
function unitsInCrates(crates){
 return crates>0?currentCrateSize()+(crates-1)*(sellingJuice()?JUICE_CRATE_SIZE:APPLE_CRATE_SIZE):0;
}
function crateBasePrice(){return sellingJuice()?COINS_PER_JUICE_CRATE:COINS_PER_CRATE}
const RECRUIT_UNLOCKS={
 1:{target:150,value:()=>state.soldApples,label:'售出150个苹果'},
 2:{target:2,value:()=>farmStage(),label:'农场达到Lv.2'},
 4:{target:10000,value:()=>state.earnedCoins,label:'取得10,000金币'},
 3:{target:3,value:()=>farmStage(),label:'农场达到Lv.3'}
};
const farmStage=()=>!state.firstUpgradeAcknowledged?1:state.upgrades.length>initialFarmItems.length?3:2;
const visible=i=>state.phase==='operation'&&(i===0||state.owned[i]>0||RECRUIT_UNLOCKS[i]?.value()>=RECRUIT_UNLOCKS[i]?.target);
// All upgrades are available by price alone; employee/production thresholds are retired.
const offers=()=>UPGRADES.filter(u=>!state.upgrades.includes(u.id)).sort((a,b)=>a.price-b.price);
const factoryItems=[...UPGRADES].sort((a,b)=>a.price-b.price);
const initialFarmItems=factoryItems.slice(0,3);
function initialFarmCount(){return initialFarmItems.filter(u=>state.upgrades.includes(u.id)).length}
if(initialFarmCount()===initialFarmItems.length)state.firstUpgradeAcknowledged=true;
else if(state.firstUpgradeAcknowledged===null)state.firstUpgradeAcknowledged=false;
if(farmStage()===3||!['growth','facilities','done'].includes(state.farmUpgradeGuide))state.farmUpgradeGuide='done';
state.farmUpgradeGuideTime=Number.isFinite(state.farmUpgradeGuideTime)?state.farmUpgradeGuideTime:0;
const constructionStepMilestones=[...new Set(FACTORY_BUILD_ART.parts.filter(part=>part.step>0).map(part=>part.threshold))].sort((a,b)=>a-b);
function constructionProgress(){const partsDone=constructionStepMilestones.filter(milestone=>milestone<=state.buildClicks).length;return {done:state.buildClicks,total:BUILD_CLICKS_REQUIRED,complete:state.buildClicks>=BUILD_CLICKS_REQUIRED,partsDone,partsTotal:constructionStepMilestones.length}}
function factoryProgress(){
 const done=state.upgrades.length;
 return state.phase==='operation'?{done,total:factoryItems.length,complete:done===factoryItems.length,enhancing:true}:{...constructionProgress(),enhancing:false};
}
const nextFactoryItem=()=>factoryItems.find(u=>!state.upgrades.includes(u.id))||null;
function nextFarmPurchase(){
 const stage=farmStage();
 if(stage===1){
  const items=initialFarmItems.filter(item=>!state.upgrades.includes(item.id));
  const credit=initialFarmItems.reduce((sum,item,index)=>sum+
   (state.upgrades.includes(item.id)?LEGACY_INITIAL_UPGRADE_PRICES[index]:0),0);
  return {level:2,price:FARM_LEVEL_UP_PRICES[1]-credit,items};
 }
 if(stage>=3)return null;
 const item=nextFactoryItem();
 if(!item)return null;
 return {level:3,price:FARM_LEVEL_UP_PRICES[2],items:[item]};
}

function save(){try{localStorage.setItem(KEY,JSON.stringify({version:1,state,frenzyExpiresAt:state.events.frenzy>0?Date.now()+state.events.frenzy*1000:0}))}catch{}}
function notify(text,alreadyTranslated=false){$('toast').textContent=alreadyTranslated?text:t(text);$('toast').classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>$('toast').classList.remove('show'),2000)}
function earn(amount){state.apples+=amount;state.total+=amount}
function spendCoins(amount){if(state.coins+1e-9<amount)return false;state.coins=Math.max(0,state.coins-amount);return true}
// Consecutive successful purchases belong to one batch until 2s of silence.
let purchaseSpeechLast=-Infinity,purchaseSpeechTimer,purchaseSpeechFrame=0;
const PURCHASE_SPEECHES=['哦，又来新人了。','干活去吧','欢迎新员工','活是干不完的','鱼人也得上班','你上家公司福利咋样','如果不种苹果，鱼身还有意义吗？','谁是世界上第一个吃苹果的鱼？'];
let lastPurchaseSpeech='';
function drawSpeechOutline(progress){
 const left=30.5,right=78+331.5*progress,r=Math.min(20,(right-left)/2),bottom=84.5;
 $('speechPath').setAttribute('d',`M${left+r} .5H${right-r}Q${right} .5 ${right} ${r+.5}V${bottom-r}Q${right} ${bottom} ${right-r} ${bottom}H${left+r}Q${left} ${bottom} ${left} ${bottom-r}V39L.5 26L${left} 25V${r+.5}Q${left} .5 ${left+r} .5Z`);
}
function animatePurchaseSpeech(message,translateMessage=true){
 if(translateMessage)message=t(message);
 cancelAnimationFrame(purchaseSpeechFrame);purchaseSpeechFrame=0;
 const text=$('speechText');$('speechMeasure').textContent=message;
 if(matchMedia('(prefers-reduced-motion: reduce)').matches){drawSpeechOutline(1);text.textContent=message;return}
 text.textContent='';drawSpeechOutline(0);
 const start=performance.now();
 const step=now=>{
  const elapsed=Math.max(0,now-start),progress=Math.min(1,elapsed/360);
  drawSpeechOutline(1-(1-progress)**3);
  text.textContent=message.slice(0,Math.max(0,Math.floor((elapsed-100)/60)));
  if(elapsed<100+message.length*60)purchaseSpeechFrame=requestAnimationFrame(step);else purchaseSpeechFrame=0;
 };
 purchaseSpeechFrame=requestAnimationFrame(step);
}
function greetPurchase(){
 const now=performance.now(),newBatch=now-purchaseSpeechLast>=2000;purchaseSpeechLast=now;
 if(!newBatch)return;
 const choices=PURCHASE_SPEECHES.filter(line=>line!==lastPurchaseSpeech),message=choices[Math.floor(Math.random()*choices.length)];lastPurchaseSpeech=message;
 const speech=$('purchaseSpeech');speech.hidden=false;animatePurchaseSpeech(message);talkOnce();
 clearTimeout(purchaseSpeechTimer);purchaseSpeechTimer=setTimeout(()=>speech.hidden=true,Math.max(2700,2100+message.length*60));
}
function resetPurchaseSpeech(){talkPending=false;clearTimeout(purchaseSpeechTimer);cancelAnimationFrame(purchaseSpeechFrame);purchaseSpeechFrame=0;purchaseSpeechLast=-Infinity;lastPurchaseSpeech='';$('purchaseSpeech').hidden=true}
const TUTORIAL_ORDER=['start','click','appleFlight','balance','sellGoal','sell','saleReward','shop','employee','rateFlying','rate','factory','newFactory','waitRecruit','closing','done'];
const TUTORIAL_LINES={
 start:'农场建好了（10/10）！开始生产苹果吧！',click:'点击这个按钮，就能生产苹果。',
 balance:'这里会显示你当前拥有的苹果数量。',sellGoal:'继续点击按钮，生产30个苹果，就能卖出第一箱！',sell:'辛苦了！第一箱苹果可以卖出了，快去领取第一笔报酬吧！',saleReward:'辛勤劳动有回报了！继续努力，把农场经营得更大吧！',shop:'如果不想一直手动点击，可以在这里雇鱼人帮忙生产苹果！',
 employee:'雇满5名鱼人后，就能腾出手来经营新农场了！',rate:'左上角显示着农场当前的生产速度。',
 factory:'右上角可以查看招募进度，先雇满5名鱼人吧！',newFactory:'右上角可以查看招募进度，先雇满5名鱼人吧！',closing:'开始工作吧！'
};
const tutorialAppleFlights=new Set();
function tutorialActive(){return state.phase==='operation'&&state.tutorial!=='done'}
function speakTutorial(message,alreadyTranslated=false){
 resetPurchaseSpeech();const speech=$('purchaseSpeech');speech.hidden=false;animatePurchaseSpeech(message,!alreadyTranslated);talkOnce();
 purchaseSpeechTimer=setTimeout(()=>{speech.hidden=true},TUTORIAL_SPEECH_DURATION);
}
function speakTutorialSequence(messages,index=0){
 if(!messages[index])return;
 speakTutorial(messages[index],true);
 if(index+1<messages.length){clearTimeout(purchaseSpeechTimer);purchaseSpeechTimer=setTimeout(()=>speakTutorialSequence(messages,index+1),TUTORIAL_SPEECH_DURATION)}
}
// Measure layout before entry transforms, so flying rewards target the settled HUD.
function restingRect(element){
 const phone=document.querySelector('.phone'),box=phone.getBoundingClientRect();
 let left=0,top=0,node=element;
 while(node&&node!==phone){left+=node.offsetLeft;top+=node.offsetTop;node=node.offsetParent}
 return {left:box.left+left,top:box.top+top,width:element.offsetWidth,height:element.offsetHeight};
}
function setTutorialStep(step,messageOverride=null,messageIsTranslated=false){
 state.tutorial=step;state.tutorialTime=0;render();
 const reveal={appleFlight:'.balance',shop:'.building-shop',rateFlying:'.rate',factory:'.factory-hud'}[step];
 if(reveal&&!matchMedia('(prefers-reduced-motion: reduce)').matches){const el=document.querySelector(reveal);const from=step==='shop'?'translateY(100%)':step==='factory'?'translateX(110%)':'translateX(-110%)';el.animate([{transform:from,opacity:0},{transform:'translate(0)',opacity:1}],{duration:520,easing:'cubic-bezier(.2,.8,.3,1)'})}
 if(Array.isArray(messageOverride))speakTutorialSequence(messageOverride);
 else if(messageOverride||TUTORIAL_LINES[step])speakTutorial(messageOverride||TUTORIAL_LINES[step],messageIsTranslated);
 if(step==='done')resetPurchaseSpeech();
 save();
}
function renderTutorial(){
 const active=tutorialActive(),at=TUTORIAL_ORDER.indexOf(state.tutorial),phone=document.querySelector('.phone');
 phone.classList.toggle('operation-tutorial',active);
 const visibility={'.balance':at>=2,'.building-shop':at>=TUTORIAL_ORDER.indexOf('shop'),'.rate':at>=TUTORIAL_ORDER.indexOf('rateFlying'),'.factory-hud':at>=TUTORIAL_ORDER.indexOf('factory')};
 for(const [selector,shown]of Object.entries(visibility))document.querySelector(selector).classList.toggle('tutorial-hidden',active&&!shown);
 const start=active&&state.tutorial==='start';
 $('produce').classList.toggle('tutorial-hidden',start);
 $('produce').classList.toggle('tutorial-pulse',active&&state.tutorial==='click');
 document.querySelector('.balance strong').classList.toggle('tutorial-wallet-flash',active&&state.tutorial==='balance');
 document.querySelector('.coin-balance').classList.toggle('tutorial-wallet-flash',active&&state.tutorial==='saleReward');
}
function updateTutorial(dt){
 if(!tutorialActive())return;state.tutorialTime+=dt;
 if(state.tutorial==='sellGoal'&&state.apples>=currentCrateSize()){setTutorialStep('sell');return}
 const next={start:[TUTORIAL_SPEECH_DURATION/1000,'click'],balance:[TUTORIAL_SPEECH_DURATION/1000,'sellGoal'],saleReward:[TUTORIAL_SPEECH_DURATION/1000,'shop'],rate:[4.5,'factory'],factory:[4,'waitRecruit'],newFactory:[4,'waitRecruit'],closing:[3,'done']}[state.tutorial];
 if(next&&state.tutorialTime>=next[0])setTutorialStep(next[1]);
 // Resume safely if a worker or flight was interrupted by a reload.
 if(state.tutorial==='employee'&&state.tutorialTime>18&&!workers.length&&!workerQueue.length)flyRateGain(unitCps(0),0);
 if(state.tutorial==='rateFlying'&&state.tutorialTime>3)setTutorialStep('rate');
 if(state.tutorial==='employee'){
  const text=$('speechText');if(/5个|5人/.test(text.textContent))text.innerHTML=text.textContent.replace(/5个|5人/,value=>`<strong class="tutorial-five">${value}</strong>`);
 }
}
function clearTutorialFlights(){for(const flight of tutorialAppleFlights){flight.cancelled=true;flight.animation?.cancel();flight.image.remove()}tutorialAppleFlights.clear()}
function flyTutorialApple(event){
 if(state.tutorial==='click')setTutorialStep('appleFlight');
 const golden=state.events.frenzy>0;
 const amount=golden?GOLDEN_APPLES_PER_TAP:1+state.owned[1]*farmerTapBonus();
 if(golden){animateProductionPress();clickEffects(event,amount)}
 const session=state,source=$('produce').getBoundingClientRect(),target=restingRect(document.querySelector('.balance'));
 const size=document.querySelector('.phone').clientWidth*.075,startX=source.left+source.width*.35,startY=source.top+source.height*.4;
 const endX=target.left+target.width*.55,endY=target.top+target.height*.5;
 const image=document.createElement('img');image.src=golden?'img/svg/apple-gold.svg?v=frenzy16':'img/svg/apple.svg';image.alt='';image.className='construction-gear-flight';image.style.cssText=`left:${startX-size/2}px;top:${startY-size/2}px;width:${size}px;height:${size}px`;document.body.append(image);
 const flight={image,cancelled:false,animation:null};tutorialAppleFlights.add(flight);playHarvestSound();
 const arrive=()=>{image.remove();tutorialAppleFlights.delete(flight);if(flight.cancelled||state!==session)return;state.handmade+=amount;earn(amount);displayed=state.apples;lastPaintedBalance=null;if(state.tutorial==='appleFlight')setTutorialStep('balance');save();render();};
 if(matchMedia('(prefers-reduced-motion: reduce)').matches){arrive();return}
 flight.animation=image.animate([{transform:'translate(0,0) scale(1) rotate(0deg)'},{transform:`translate(${(endX-startX)*.35-18}px,${(endY-startY)*.5}px) scale(.85) rotate(90deg)`,offset:.5},{transform:`translate(${endX-startX}px,${endY-startY}px) scale(.4) rotate(180deg)`}],{duration:500,easing:'cubic-bezier(.3,.1,.5,1)',fill:'forwards'});
 flight.animation.finished.then(arrive,()=>{});
}
function resumeTutorial(){
 if(!tutorialActive())return;
 if(state.tutorial==='appleFlight')state.tutorial='click';
 if(state.tutorial==='employee'){state.tutorialTime=0;queueWorkers(1,unitCps(0),0)}
 if(state.tutorial==='rateFlying')state.tutorial='rate';
 render();if(TUTORIAL_LINES[state.tutorial])speakTutorial(TUTORIAL_LINES[state.tutorial]);
}
// Construction guidance tracks each one-click build step as it appears.
let constructionGuideClicks=null,constructionGuideElapsed=0,constructionGuideIntroSecond=false;
const CONSTRUCTION_TASKS=['建造输送带','在输送带末端安装苹果篮','安装月历','安装吊臂','种下第1棵苹果树','种下第2棵苹果树','种下第3棵苹果树','种下第4棵苹果树','种下第5棵苹果树','种下第6棵苹果树'];
function constructionCopy(template,values={}){
 let message=t(template);
 for(const [key,value] of Object.entries(values))message=message.replaceAll(`{${key}}`,value);
 return message;
}
function constructionProgressCopy(clicks){
 if(clicks>=BUILD_CLICKS_REQUIRED)return t('农场已建成！');
 const next=t(CONSTRUCTION_TASKS[clicks]);
 return constructionCopy('已完成 {done}/10。下一步：{next}',{done:clicks,next});
}
function constructionMilestoneCopy(clicks){
 if(clicks<=0||clicks>=BUILD_CLICKS_REQUIRED)return constructionProgressCopy(clicks);
 if(clicks<=4){
  const parts=['输送带','苹果篮','月历','吊臂'];
  if(clicks===4)return constructionCopy('{part}已完成！最后一步：种下6棵苹果树，让农场热闹起来吧（{done}/10）',{part:t(parts[clicks-1]),done:clicks});
  return constructionCopy('{part}已建成！下一步：{next}（{done}/10）',{part:t(parts[clicks-1]),next:t(CONSTRUCTION_TASKS[clicks]),done:clicks});
 }
 const tree=clicks-4;
 return constructionCopy('苹果树 {tree}/6！再种下一棵吧（{done}/10）',{tree,done:clicks});
}
function showConstructionProgress(message){
 clearTimeout(purchaseSpeechTimer);cancelAnimationFrame(purchaseSpeechFrame);purchaseSpeechFrame=0;
 const speech=$('purchaseSpeech');speech.hidden=false;
 $('speechMeasure').textContent=message;$('speechText').textContent=message;drawSpeechOutline(1);
}
function sayConstructionGuide(message){
 const speech=$('purchaseSpeech');clearTimeout(purchaseSpeechTimer);speech.hidden=false;animatePurchaseSpeech(message,false);talkOnce();
}
function resetConstructionGuide(){constructionGuideClicks=null;constructionGuideElapsed=0;constructionGuideIntroSecond=false}
function updateConstructionGuide(dt){
 if(state.phase!=='construction')return;
 if(constructionGuideClicks===null){
  constructionGuideClicks=state.buildClicks;constructionGuideElapsed=0;
  if(state.buildClicks===0)sayConstructionGuide(t('让我们一起建造农场吧！'));
  else showConstructionProgress(constructionProgressCopy(state.buildClicks));
  return;
 }
 if(state.buildClicks!==constructionGuideClicks){
  constructionGuideClicks=state.buildClicks;constructionGuideElapsed=0;
  if(state.buildClicks>0&&state.buildClicks<BUILD_CLICKS_REQUIRED)sayConstructionGuide(constructionMilestoneCopy(state.buildClicks));
  else showConstructionProgress(constructionProgressCopy(state.buildClicks));
  return;
 }
 constructionGuideElapsed+=dt;
 if(state.buildClicks===0&&!constructionGuideIntroSecond&&constructionGuideElapsed>=2.4){
  constructionGuideIntroSecond=true;constructionGuideElapsed=0;
  showConstructionProgress(constructionCopy('建造进度 0/10。第一步：建造输送带'));
 }
}
function swingRecruitTag(i){
 const motion=document.querySelector(`[data-building="${i}"] .tag-motion`);
 if(!motion||matchMedia('(prefers-reduced-motion: reduce)').matches)return;
 motion.getAnimations().forEach(a=>a.cancel());
 motion.animate([{transform:'rotate(0deg)'},{transform:'rotate(-12deg)',offset:.16},{transform:'rotate(9deg)',offset:.38},{transform:'rotate(-5deg)',offset:.6},{transform:'rotate(2deg)',offset:.8},{transform:'rotate(0deg)'}],{duration:700,easing:'ease-in-out'});
}
function buyBuilding(i){
 if(state.phase!=='operation'||!visible(i)||(tutorialActive()&&TUTORIAL_ORDER.indexOf(state.tutorial)<TUTORIAL_ORDER.indexOf('shop'))||!spendCoins(buildingCost(i)))return false;
 playRecruitSound();
 const intro=i===0&&state.introRecruit===false;
 const firstOfType=state.owned[i]===0;
 state.owned[i]++;
 if(state.milestoneTimes.fiveEmployees===null&&employeeCount()===5)state.milestoneTimes.fiveEmployees=state.playSeconds;
 if(intro)state.introRecruit=true;
 syncRecruitGains();
 if(intro&&tutorialActive())setTutorialStep('employee',[firstRecruitSpeech(i),t(TUTORIAL_LINES.employee)],true);
 else if(firstOfType){
  const nextTutorialLine=tutorialActive()?TUTORIAL_LINES[state.tutorial]:null;
  if(nextTutorialLine)speakTutorialSequence([firstRecruitSpeech(i),t(nextTutorialLine)]);
  else speakTutorial(firstRecruitSpeech(i),true);
 }
 else if(!tutorialActive()&&!['complete','workers','choice','upgrade'].includes(state.recruitGoalGuide)&&state.farmUpgradeGuide==='done')greetPurchase();
 queueWorkers(1,unitCps(i),i);save();render();
 swingRecruitTag(i);notify(recruitNotice(i,1),true);return true
}
function buyUpgrade(id){
 const item=UPGRADES.find(upgrade=>upgrade.id===id);
 if(state.phase!=='operation'||farmStage()<3||!item||state.upgrades.includes(id)||!spendCoins(item.price))return false;
 state.upgrades.push(id);
 syncRecruitGains();save();render();notify('强化成功');
 return true;
}

function clickEffects(event,n,showApples=true){
 const r=$('produce').getBoundingClientRect(),scale=document.querySelector('.phone').clientWidth/400;
 const pointer=event&&event.detail>0&&Number.isFinite(event.clientX);
 const x=pointer?event.clientX:r.left+r.width/2,y=pointer?event.clientY:r.top+r.height/2;
 const golden=state.events.frenzy>0;
 const f=document.createElement('span');f.className='click-number';if(golden){f.classList.add('frenzy-number');const glyph=document.createElement('span');glyph.className='reward-impact';glyph.textContent='+'+number(n);f.append(glyph)}else f.textContent='+'+number(n);
 f.style.left=x+(Math.random()-.5)*6+'px';f.style.top=y-22*scale+'px';f.style.fontSize=Math.max(16,26*scale)+'px';const duration=(1550+Math.random()*180)/1.2;const startSpeed=90/1.05*1.2,time=duration/1000,distance=startSpeed*time+55*scale;f.style.setProperty('--rise-distance',distance+'px');const slope=startSpeed*time/distance;f.style.setProperty('--rise-ease',`cubic-bezier(.333333,${slope/3},.666667,${(1+slope)/3})`);f.style.animationDuration=duration+'ms';
 // The frenzy halo travels as its own copy underneath the glyph: as a direct
 // child of the effects layer it can blend additively with the other halos.
 if(f.classList.contains('frenzy-number')){const glow=f.cloneNode(true);glow.classList.add('frenzy-glow');glow.setAttribute('aria-hidden','true');$('frenzyGlowLayer').append(glow);while($('frenzyGlowLayer').children.length>60)$('frenzyGlowLayer').firstElementChild.remove();setTimeout(()=>glow.remove(),duration+60)}
 $('fx').append(f);setTimeout(()=>f.remove(),duration+60);
 if(!showApples)return;
 const appleCount=golden?4:1;
 for(let i=0;i<appleCount;i++){
  const apple=document.createElement('span'),img=document.createElement('img');
  apple.className='click-apple';
  img.src=golden?'img/svg/apple-gold.svg?v=frenzy16':'img/svg/apple.svg';
  img.alt='';img.draggable=false;apple.append(img);
  apple.style.left=x+'px';apple.style.top=y+'px';apple.style.width=36*scale+'px';
  const direction=golden?(i%2===0?-1:1):(Math.random()<.5?-1:1);
  const travel=golden?60+i*19+Math.random()*26:45+Math.random()*90;
  apple.style.setProperty('--travel',direction*travel*scale+'px');
  apple.style.setProperty('--fall',(golden?185+i*20:220)*scale+'px');
  apple.style.setProperty('--spin',direction*(220+Math.random()*240)+'deg');
  $('fx').append(apple);setTimeout(()=>apple.remove(),1050);
 }
 while($('fx').children.length>120)$('fx').firstElementChild.remove();
}
// Short synthesized cues use the browser's audio engine; no external sound files.
let clickAudio=null;
function getClickAudio(){
 const AudioEngine=window.AudioContext||window.webkitAudioContext;if(!AudioEngine)return null;
 if(!clickAudio)clickAudio=new AudioEngine();
 if(clickAudio.state==='suspended')clickAudio.resume().catch(()=>{});
 return clickAudio;
}
function playPopSound(){
 try{
  const audio=getClickAudio();if(!audio)return;
  const now=audio.currentTime,duration=.045;
  const noise=audio.createBuffer(1,Math.ceil(audio.sampleRate*duration),audio.sampleRate);
  const samples=noise.getChannelData(0);for(let i=0;i<samples.length;i++)samples[i]=(Math.random()*2-1)*Math.exp(-i/(audio.sampleRate*.008));
  const source=audio.createBufferSource();source.buffer=noise;
  const filter=audio.createBiquadFilter();filter.type='bandpass';filter.frequency.value=1800+Math.random()*350;filter.Q.value=.7;
  const gain=audio.createGain();gain.gain.setValueAtTime(.2,now);gain.gain.exponentialRampToValueAtTime(.001,now+duration);
  source.connect(filter);filter.connect(gain);gain.connect(audio.destination);source.start(now);source.stop(now+duration);
  const body=audio.createOscillator(),bodyGain=audio.createGain();body.frequency.setValueAtTime(260,now);body.frequency.exponentialRampToValueAtTime(120,now+.035);bodyGain.gain.setValueAtTime(.045,now);bodyGain.gain.exponentialRampToValueAtTime(.001,now+.04);body.connect(bodyGain);bodyGain.connect(audio.destination);body.start(now);body.stop(now+.045);
  source.onended=()=>{source.disconnect();filter.disconnect();gain.disconnect()};body.onended=()=>{body.disconnect();bodyGain.disconnect()};
 }catch{}
}
function playHarvestSound(){
 try{
  const audio=getClickAudio();if(!audio)return;
  const now=audio.currentTime,root=480+Math.random()*100;
  const note=audio.createOscillator(),gain=audio.createGain();note.type='sine';
  note.frequency.setValueAtTime(root*1.55,now);note.frequency.exponentialRampToValueAtTime(root,now+.075);
  gain.gain.setValueAtTime(.065,now);gain.gain.exponentialRampToValueAtTime(.001,now+.095);
  note.connect(gain);gain.connect(audio.destination);note.start(now);note.stop(now+.1);
  note.onended=()=>{note.disconnect();gain.disconnect()};
 }catch{}
}
const recruitSound=new Audio('audio/yahoooo-mario.mp3?v=1.0.160');
recruitSound.preload='auto';
function playRecruitSound(){
 recruitSound.currentTime=0;
 recruitSound.play().catch(()=>{});
}
const cashRegisterSound=new Audio('audio/cha-ching-money.mp3?v=1.0.160');
cashRegisterSound.preload='auto';
function playCashRegisterSound(){
 cashRegisterSound.currentTime=0;
 cashRegisterSound.play().catch(()=>{});
}
let productionTap=null;
function animateProductionPress(){
 if(state.events.frenzy<=0||matchMedia('(prefers-reduced-motion: reduce)').matches)return;
 productionTap?.cancel();productionTap=$('produce').animate([{transform:'scale(.86)'},{transform:'scale(1.13)',offset:.42},{transform:'scale(1)'}],{duration:240,easing:'cubic-bezier(.18,.8,.3,1)'});productionTap.id='golden-click-impact';
}
function produce(event){
 if(state.phase!=='operation')return;
 if(tutorialActive()&&farmStage()===1){if(state.tutorial!=='start')flyTutorialApple(event);return;}
 animateProductionPress();playHarvestSound();
 const n=clickPower();
 state.handmade=(state.handmade||0)+n;
 const juice=sellingJuice(),golden=state.events.frenzy>0;
 const loadingJuice=juice&&state.juiceStartupTaps<FACTORY_STARTUP_TAPS;
 earn(n);clickEffects(event,n,!juice);
 if(juice)animateJuiceIntakeApple(golden);
 if(loadingJuice){
  state.juiceStartupTaps++;
  if(state.juiceStartupTaps===FACTORY_STARTUP_TAPS){
   state.juiceStartupAt=Date.now()+(reduceJuiceMotion.matches?0:JUICE_STARTUP_FLIGHT_MS);
  }
  save();
 }
 if(farmStage()===3){
  animateComputerProductionTap();
  if(state.computerStartupTaps<FACTORY_STARTUP_TAPS){
   state.computerStartupTaps++;
   if(computerFactoryRunning())state.computerStartupAt=Date.now();
   save();
  }
 }
 render();
}
function sellAppleCrates(){
 const crates=readyCrateCount();if(crates<1)return;
 const juice=sellingJuice(),sold=unitsInCrates(crates);
 const saleBonus=crates*(state.owned[2]*chefCrateBonus());
 const earnedCoins=crates*crateBasePrice()+saleBonus;
 if(juice){
  juiceCratePacked=0;
  juiceCrateArrivalAnimation?.cancel();
 }
 state.apples-=sold;state.soldApples+=sold;state.coins+=earnedCoins;state.earnedCoins+=earnedCoins;playCashRegisterSound();
 save();render();
 const saleNotice=farmStage()===3?'苹果电脑已售出':juice?'苹果汁箱已售出':'苹果箱已售出';
 const notice=[`${t(saleNotice)} +${number(earnedCoins)} ${t('金币')}`];
 if(saleBonus)notice.push(`${t('鱼人售货奖励')} +${number(saleBonus)} ${t('金币')}`);
 notify(notice.join(' · '));
 if(state.tutorial==='sell')setTutorialStep('saleReward');
}

const RECRUITABLE_BUILDING_IDS=[0,1,2,4,3];
const RECRUIT_CARDS=[
 {art:'part-time',english:'part timer fishman'},
 {art:'farmer',english:'farmer fishman'},
 {art:'chef',english:'chef fishman'},
 {art:'king',english:'FISH KING'},
 {art:'businessman',english:'businessman fishman'}
];
$('buildings').innerHTML=RECRUITABLE_BUILDING_IDS.map(i=>{
 const card=RECRUIT_CARDS[i],unlock=RECRUIT_UNLOCKS[i];
 return `<div class="recruit-card" data-building="${i}" role="group">
  <button class="recruit-hit" type="button"></button>
  <div class="tag-motion" aria-hidden="true">
   <img class="recruit-art" alt="" draggable="false">
   <span class="recruit-count"></span>
   <b class="recruit-name"></b>
   <span class="recruit-english" lang="en">${card.english}</span>
   ${i===3?'':'<span class="recruit-ability"></span>'}
   ${unlock?`<span class="recruit-condition">${unlock.label}</span>`:''}
  </div>
  <span class="recruit-price" aria-hidden="true"><img src="img/svg/level-one-coin.svg?v=1.0.160" alt=""><span></span></span>
 </div>`;
}).join('');
const recruitCards=[...$('buildings').children];
// Reference base Golden Cookie timing: 30 trials/sec, hazard ((t-300)/600)^5.
// This demo restricts outcomes to Lucky and Frenzy; Frenzy duration is customized to 60s.
function freshEvents(){return {elapsed:0,carry:0,active:null,lastKind:null,frenzy:0,frenzyDuration:GOLDEN_FRENZY_DURATION}}
// Original event mix was 50/50: weights 10 and 4 with total frequency ×7
// give Lucky ×10 and Golden ×4 relative to their original individual rates.
const RANDOM_APPLE_FREQUENCY=7;
function freshGuaranteedGold(){
 const gifts=GUARANTEED_GOLD_WINDOWS.map(min=>({at:min+Math.random()*60,spawned:false,active:null}));
 gifts.push({at:GOLDEN_PLAY_MILESTONE,clock:'play',spawned:false,active:null});
 return gifts;
}
function updateGuaranteedGold(dt){
 for(const gift of state.guaranteedGold){
  const playMilestone=gift.clock==='play';
  if(playMilestone?wardrobeOpen:tutorialActive())continue;
  if(gift.active){
   gift.active.remaining=Math.max(0,gift.active.remaining-dt);
   if(gift.active.remaining<=1e-8)gift.active=null;
  }
  const clock=playMilestone?state.playSeconds:state.operationSeconds;
  if(!gift.spawned&&clock+1e-8>=gift.at){
   gift.spawned=true;
   const normal=state.events.active;
   const x=playMilestone?.5:normal&&normal.x<.5?.75:.18;
   gift.active={kind:'golden',x,y:playMilestone?.36:.34+Math.random()*.08,remaining:13};
   save();
  }
 }
}
function chooseEventKind(){return Math.random()<10/14?'lucky':'golden'}
function spawnSpecial(kind=chooseEventKind()){
 if(state.phase!=='operation')return null;
 const e=state.events;let x,y;
 for(let i=0;i<30;i++){x=.10+Math.random()*.79;y=.24+Math.random()*.32;if(!(x<.30&&y>.38)&&!(x>.73&&y>.49)&&!(x>.66&&y<.36))break}
 e.active={kind,x,y,remaining:13};e.elapsed=0;e.carry=0;save();render();return e.active;
}
function updateFrenzy(dt){
 const e=state.events;e.frenzy=Math.max(0,e.frenzy-dt);if(e.frenzy<1e-8)e.frenzy=0;
}
function updateEvents(dt){
 if(state.phase!=='operation')return;
 const e=state.events;
 if(e.active){e.active.remaining=Math.max(0,e.active.remaining-dt);if(e.active.remaining<1e-8){e.active=null;e.elapsed=0;e.carry=0}return}
 e.carry+=dt;
 while(e.carry+1e-9>=1/30){e.carry=Math.max(0,e.carry-1/30);e.elapsed+=1/30;
  const min=300/RANDOM_APPLE_FREQUENCY,max=900/RANDOM_APPLE_FREQUENCY;
  if(e.elapsed>=max||(e.elapsed>min&&Math.random()<((e.elapsed-min)/(max-min))**5)){spawnSpecial();break}
 }
}
function specialBurst(kind,amount,x,y){
 const rect=document.querySelector('.phone').getBoundingClientRect(),px=rect.left+x*rect.width,py=rect.top+y*rect.height;
 const label=document.createElement('div');label.className='special-reward';label.dataset.kind=kind;label.textContent=kind==='lucky'?'幸运！ +'+number(amount)+' 苹果':'黄金狂热！ 产量 ×7';label.style.left=px+'px';label.style.top=py+'px';$('fx').append(label);setTimeout(()=>label.remove(),1900);
 const ring=document.createElement('i');ring.className='special-ring';ring.style.left=px+'px';ring.style.top=py+'px';$('fx').append(ring);setTimeout(()=>ring.remove(),900);
 for(let i=0;i<26;i++){const part=document.createElement('img');part.className='special-spark';part.src=kind==='lucky'?'img/svg/apple-lucky.svg':'img/svg/apple-gold.svg?v=frenzy16';part.alt='';part.draggable=false;part.style.left=px+'px';part.style.top=py+'px';const angle=Math.PI*2*i/26;part.style.setProperty('--dx',Math.cos(angle)*(45+Math.random()*110)+'px');part.style.setProperty('--dy',Math.sin(angle)*(45+Math.random()*110)+'px');part.style.setProperty('--spin',Math.random()*360+'deg');$('fx').append(part);setTimeout(()=>part.remove(),1200)}
}
function collectSpecial(giftIndex=null){
 const e=state.events,gift=Number.isInteger(giftIndex)?state.guaranteedGold[giftIndex]:null,apple=gift?gift.active:e.active;if(!apple)return false;
 if(gift)gift.active=null;
 else {e.active=null;e.elapsed=0;e.carry=0;e.lastKind=apple.kind}
 state.goldenClicks++;let amount=0;
 if(apple.kind==='lucky'){amount=Math.min(state.apples*.15,cps()*900)+13;earn(amount)}else {e.frenzyDuration=GOLDEN_FRENZY_DURATION;e.frenzy=e.frenzyDuration;}
 specialBurst(apple.kind,amount,apple.x,apple.y);playPopSound();save();render();return true;
}
let rainCarry=0;
function updateGoldRain(dt){
 if(state.events.frenzy<=0)return;rainCarry+=dt;
 while(rainCarry>=.085){rainCarry-=.085;const drop=document.createElement('img');drop.className='rain-apple';drop.src='img/svg/apple-gold.svg?v=frenzy16';drop.alt='';drop.draggable=false;drop.style.left=(Math.random()*95)+'%';drop.style.width=(3+Math.random()*4)+'cqw';drop.style.setProperty('--rain-drift',(Math.random()-.5)*100+'px');drop.style.setProperty('--rain-turn',(Math.random()-.5)*500+'deg');drop.style.animationDuration=(2.5+Math.random()*1.3)+'s';$('goldRain').append(drop);drop.onanimationend=()=>drop.remove();setTimeout(()=>drop.remove(),4000);while($('goldRain').children.length>44)$('goldRain').firstElementChild.remove()}
}
let sentGoldenDance=null;
function syncGoldenDance(active){
 const frame=document.querySelector('.fish-character');if(sentGoldenDance===active||!frame?.contentWindow)return;
 try{if(typeof frame.contentWindow.setGoldenDance==='function')frame.contentWindow.setGoldenDance(active);else frame.contentWindow.postMessage({type:'apple-works:golden-dance',active},location.protocol==='file:'?'*':location.origin);sentGoldenDance=active}catch{sentGoldenDance=null}
}
document.querySelector('.fish-character').addEventListener('load',()=>{sentGoldenDance=null;initializeCharacterWardrobe();syncGoldenDance(state.events.frenzy>0)});
// The resident fishman speaks: one of the three talking motions, picked at random.
// The fishman talks while its speech bubble is up. A request made before the
// character document has finished loading is kept until it can be played.
let talkPending=false;
function talkOnce(){talkPending=true}
function driveTalk(dt){
 const fish=document.querySelector('.fish-character')?.contentWindow;if(!fish)return;
 try{
  if(talkPending&&typeof fish.playTalk==='function'&&fish.playTalk())talkPending=false;
  fish.advanceTalk?.(dt);
 }catch{}
}
function driveGoldenDance(dt){
 try{const advance=document.querySelector('.fish-character')?.contentWindow?.advanceGoldenDance;if(typeof advance==='function')advance(dt,state.events.frenzy>0)}catch{}
}
function renderEvents(){
 const e=state.events,active=e.active,layer=$('specialLayer'),glow=$('specialGlow');
 glow.hidden=!active||active.kind==='lucky';if(active){glow.dataset.kind=active.kind;glow.style.left=active.x*100+'%';glow.style.top=active.y*100+'%';glow.style.opacity=String(Math.min(1,active.remaining/1.2))}
 if(active){let button=$('specialApple');if(!button){button=document.createElement('button');button.id='specialApple';button.className='special-apple';button.innerHTML='<img draggable="false" alt="">';button.onclick=collectSpecial;layer.append(button)}
  button.dataset.kind=active.kind;button.style.left=active.x*100+'%';button.style.top=active.y*100+'%';button.style.opacity=String(Math.min(1,active.remaining/1.2));button.setAttribute('aria-label',(active.kind==='lucky'?t('幸运苹果，领取即时奖励'):t('金苹果，20秒内每次点击加7个苹果，自动产量乘以七')));
  const src=active.kind==='golden'?'img/svg/apple-gold.svg?v=frenzy16':'img/svg/apple-lucky.svg';if(button.querySelector('img').getAttribute('src')!==src)button.querySelector('img').src=src;
 }else $('specialApple')?.remove();
 state.guaranteedGold.forEach((gift,i)=>{
  let button=$('guaranteedGold'+i);const apple=gift.active;
  if(!apple){button?.remove();return}
  if(!button){button=document.createElement('button');button.id='guaranteedGold'+i;button.className='special-apple';button.innerHTML='<img draggable="false" alt="金苹果" src="img/svg/apple-gold.svg?v=frenzy16">';button.onclick=()=>collectSpecial(i);layer.append(button)}
  button.dataset.kind='golden';button.style.left=apple.x*100+'%';button.style.top=apple.y*100+'%';button.style.opacity=String(Math.min(1,apple.remaining/1.2));button.setAttribute('aria-label',t('金苹果，20秒内每次点击加7个苹果，自动产量乘以七'));
 });
 const boosted=e.frenzy>0,phone=document.querySelector('.phone');
 const timer=$('frenzyTimer');
 timer.hidden=!boosted;
 if(boosted){
  setText($('frenzyCountdown'),`剩余 ${Math.ceil(e.frenzy)}s`);
  const progress=$('frenzyProgress');
  progress.max=e.frenzyDuration;
  progress.value=e.frenzy;
 }
 syncGoldenDance(boosted);
 phone.classList.toggle('golden-frenzy',boosted);
 const phoneBox=phone.getBoundingClientRect(),buttonBox=$('produce').getBoundingClientRect();
 phone.style.setProperty('--aura-x',(buttonBox.left+buttonBox.width/2-phoneBox.left)+'px');
 phone.style.setProperty('--aura-y',(buttonBox.top+buttonBox.height/2-phoneBox.top)+'px');
 if(!boosted){$('goldRain').replaceChildren();rainCarry=0;productionTap?.cancel();productionTap=null}
}

// DEMO: summon a worker fishman. It enters from off-stage right, walks left to a
// random spot in the open floor, waves, then keeps walking left off-screen
// without turning round. Up to WORKER_LIMIT at once; further clicks do nothing.
// Each one gets its own entry delay, pace and spot so a burst of clicks does not
// send out a single column of identical fishmen.
// Ordinary visitors share a cached sprite atlas.
const workers=[];
// WORKER_START puts the frame just far enough right that the fishman drawn
// inside it is off the phone's edge, so a click shows a step almost at once.
const WORKER_LIMIT=10,WORKER_START=92,WORKER_EXIT=-40,WORKER_LEAVE=-24,WORKER_MIN=34,WORKER_MAX=62,WORKER_GAP=7;
// Both rigs share the same ground baseline; positive depth is nearer the viewer.
const characterDepthLayer=depth=>3+Math.round((depth+2)*10);
document.querySelector('.fish-character').style.zIndex=String(characterDepthLayer(0));
function workerTarget(){
 // Reserve upcoming stops too, so a batch cannot all choose the same empty spot.
 // Departing visitors only occupy their current position, not their old stop.
 const occupied=workers.map(worker=>({
  x:worker.phase==='out'?worker.x:worker.target,depth:worker.depth
 })).filter(spot=>spot.x>=WORKER_MIN-WORKER_GAP&&spot.x<=WORKER_MAX+WORKER_GAP);
 let best=null,bestScore=-Infinity;
 // Sample the whole floor rather than falling back to a fully random position
 // when crowded. Depth separation lets nearby fish overlap without stacking.
 for(let column=0;column<15;column++)for(let row=0;row<5;row++){
  const x=WORKER_MIN+(column+Math.random())/15*(WORKER_MAX-WORKER_MIN);
  const depth=-2+(row+Math.random());
  let nearest=Infinity,crowding=0;
  for(const spot of occupied){
   const distance=((x-spot.x)/WORKER_GAP)**2+((depth-spot.depth)/2.5)**2;
   nearest=Math.min(nearest,distance);crowding+=Math.exp(-distance);
  }
  const score=occupied.length?nearest-.15*crowding:Math.random();
  if(score>bestScore){bestScore=score;best={x,depth}}
 }
 return best;
}
// All ordinary visitors share the same pre-rendered poses. The resident keeps
// its live deformation engine; visitors no longer need a full editor iframe each.
const workerAtlas=new Image();workerAtlas.src='img/worker-atlas.webp?v=floor73';
const suitAtlas=new Image();suitAtlas.src='img/worker-suit-atlas.webp?v=floor73';
const kingAtlas=new Image();kingAtlas.src='img/worker-king-atlas.webp?v=1';
const mutantAtlas=new Image();mutantAtlas.src='img/worker-mutant-atlas.webp?v=1';
const sharkAtlas=new Image();sharkAtlas.src='img/worker-shark-atlas.webp?v=look109';
const clownAtlas=new Image();clownAtlas.src='img/worker-clown-atlas.webp?v=look109';
const alienAtlas=new Image();alienAtlas.src='img/worker-alien-atlas.webp?v=look109';
const farmerAtlas=new Image();farmerAtlas.src='img/worker-farmer-atlas.webp?v=1';
let spareWorkerFrame=null;
function makeWorkerFrame(){
 const wrap=document.createElement('div');
 wrap.className='fish-worker';wrap.setAttribute('aria-hidden','true');
 const shadow=document.createElement('div');shadow.className='fish-worker-shadow';
 const canvas=document.createElement('canvas');canvas.className='worker-sprite';
 canvas.width=256;canvas.height=376;wrap.append(shadow,canvas);
 wrap.workerContext=canvas.getContext('2d');wrap.workerPose=-1;
 wrap.style.visibility='hidden';wrap.dataset.ready='1';
 document.querySelector('.phone').append(wrap);
 return wrap;
}
function prepareWorkerFrame(){
 if(!spareWorkerFrame)spareWorkerFrame=makeWorkerFrame();
}
function paintWorkerPose(wrap,index){
 const atlas=wrap.workerAtlas||workerAtlas;
 if(!atlas.complete||!atlas.naturalWidth||wrap.workerPose===index)return;
 const ctx=wrap.workerContext;ctx.clearRect(0,0,256,376);
 ctx.drawImage(atlas,(index%8)*256,Math.floor(index/8)*376,256,376,0,0,256,376);
 wrap.workerPose=index;
}
function positionWorker(wrap,x){
 // Percent transform is relative to the 40%-wide visitor, avoiding layout per step.
 wrap.style.transform=`translate3d(${x*2.5}%,0,0)`;
}
// Every building purchase sends that many ordinary fishmen on stage. Only WORKER_LIMIT fit at once,
// so the rest wait here and walk on as earlier ones leave.
let workerQueue=[];
function queueWorkers(count,gain=0,building=null){for(let i=0;i<count;i++)workerQueue.push({gain,building});if(gain>0)rateDeferred+=gain*count}
// Reprice recruits still waiting or walking when permanent production changes.
// Labels already in flight finish with the amount displayed when they departed.
function syncRecruitGains(){
 for(const recruit of [...workerQueue,...workers]){
  if(!Number.isInteger(recruit.building)||recruit.gain<=0)continue;
  const latest=unitCps(recruit.building);
  rateDeferred+=latest-recruit.gain;recruit.gain=latest;
 }
}
// Stagger arrivals for readability; excess recruits remain queued.
let workerReleaseWait=0;
function drainWorkerQueue(dt){
 workerReleaseWait-=dt;
 if(!workerQueue.length||workerReleaseWait>0||workers.length>=WORKER_LIMIT)return;
 if(summonWorker(workerQueue[0].gain,workerQueue[0].building)){workerQueue.shift();workerReleaseWait=.7}
}
function summonWorker(gain=0,building=null){
 if(!Number.isFinite(gain))gain=0;
 const look=BUILDINGS[building]?.workerLook||'ordinary';
 const atlas=({'shark-suit':sharkAtlas,'clown-suit':clownAtlas,alien:alienAtlas,'ivory-king':kingAtlas,'navy-suit':suitAtlas,'milk-frog':mutantAtlas,farmer:farmerAtlas})[look]||workerAtlas;
 if(!atlas.complete||!atlas.naturalWidth||workers.length>=WORKER_LIMIT)return false;
 const frame=workerPool.pop()||spareWorkerFrame||makeWorkerFrame();
 if(frame===spareWorkerFrame)spareWorkerFrame=null;
 frame.workerAtlas=atlas;frame.workerPose=-1;frame.dataset.look=look;
 frame.style.visibility='visible';
 const waiting=workers.filter(worker=>worker.phase==='wait'||worker.phase==='in').length;
 const stop=workerTarget(),depth=stop.depth;
 const entry={frame,depth,gain,building,x:WORKER_START,target:stop.x,phase:'wait',clock:0,
  // The first one off the mark leaves at once; the queue's own release gap
  // spaces the rest out, so each only needs a small random extra.
  delay:waiting?Math.random()*.3:0,
  speed:23+Math.random()*8,hold:.2+Math.random()*.7};
 positionWorker(frame,WORKER_START);paintWorkerPose(frame,0);
 // A little depth offset so two fishmen standing near each other do not overlap
 // exactly. The lower one stands nearer the camera, so it is drawn in front.
 frame.style.setProperty('--worker-y',depth.toFixed(2)+'%');
 frame.style.zIndex=String(characterDepthLayer(depth));
 workers.push(entry);
 prepareWorkerFrame();
 return true;
}
// A recruit that has walked off stage sends its production up to the rate
// ticket; the number only starts climbing once the label lands there.
let rateDeferred=0,rateRoll=0,rateRollSpeed=0,rateFlights=0;
function flyRateGain(gain,depth,workerX=-10){
 if(state.tutorial==='employee')setTutorialStep('rateFlying');
 const phone=document.querySelector('.phone'),rateEl=document.querySelector('.rate');
 if(!phone||!rateEl){rateDeferred=Math.max(0,rateDeferred-gain);return}
 const box=phone.getBoundingClientRect(),target=restingRect(rateEl);
 const tag=document.createElement('div');
 tag.className='rate-gain';tag.setAttribute('aria-hidden','true');
 tag.innerHTML='<img src="img/svg/apple.svg" alt=""><span>+'+productionNumber(gain*(state.events.frenzy>0?7:1))+'/s</span>';
 phone.append(tag);rateFlights++;
 // Start on the fishman's own body, which by now is just off the left edge,
 // so the label drifts in from off-screen rather than popping at the border.
 const startX=Math.max(box.width*.08,box.width*(workerX+20)/100),startY=box.height*(.39+(depth+12)/100);
 const endX=target.left-box.left+target.width*.5,endY=target.top-box.top+target.height*.5;
 tag.style.left=startX+'px';tag.style.top=startY+'px';
 // A quadratic curve with its control point under the ticket: the label drifts
 // inward almost flat at first, then bends upward and runs straighter the
 // higher it climbs.
 const ctrlX=endX,ctrlY=startY;
 const frames=[];
 for(let i=0;i<=16;i++){
  const t=i/16,inv=1-t;
  const x=inv*inv*startX+2*inv*t*ctrlX+t*t*endX;
  const y=inv*inv*startY+2*inv*t*ctrlY+t*t*endY;
  const scale=(t<.12?.85+t/.12*.15:1-(t-.12)/.88*.25).toFixed(3);
  frames.push({offset:t,transform:`translate(calc(-50% + ${(x-startX).toFixed(1)}px),calc(-50% + ${(y-startY).toFixed(1)}px)) scale(${scale})`});
 }
 const move=tag.animate(frames,{duration:1250,easing:'cubic-bezier(.33,0,.5,1)',fill:'forwards'});
 move.onfinish=()=>{
  tag.remove();rateFlights--;if(state.tutorial==='rateFlying')setTutorialStep('rate');
  // Hand the amount to the ticket and let it roll up over a short beat.
  rateRoll+=gain;rateRollSpeed=rateRoll/.45;
  document.querySelector('.rate')?.classList.add('rate-bump');
  setTimeout(()=>document.querySelector('.rate')?.classList.remove('rate-bump'),260);
 };
}
function driveRateRoll(dt){
 if(rateRoll<=0)return;
 const step=Math.min(rateRoll,rateRollSpeed*dt);
 rateRoll-=step;rateDeferred=Math.max(0,rateDeferred-step);
 // Only settle the remainder once nothing is still queued, walking or in flight,
 // so a label still on its way keeps its own share held back.
 if(rateRoll<=1e-6){rateRoll=0;if(!rateFlights&&!workers.some(g=>g.gain>0)&&!workerQueue.some(g=>g.gain>0))rateDeferred=0}
}
// The ticket shows everything that has already arrived.
function shownRate(){return Math.max(0,baseCps()-rateDeferred)}
// Reuse the small canvas wrappers instead of allocating them for every purchase.
const workerPool=[];
function retireWorkerFrame(wrap){
 wrap.style.visibility='hidden';
 positionWorker(wrap,WORKER_START);
 if(workerPool.length<WORKER_LIMIT)workerPool.push(wrap);else wrap.remove();
}
function driveWorkers(dt){
 drainWorkerQueue(dt);
 for(let i=workers.length-1;i>=0;i--){
  const worker=workers[i];
  if(worker.phase==='wait'){
   worker.clock+=dt;if(worker.clock<worker.delay)continue;
   worker.phase='in';worker.clock=0;
  }else if(worker.phase==='in'){
   worker.x=Math.max(worker.target,worker.x-worker.speed*dt);
   if(worker.x<=worker.target){worker.phase='wave';worker.clock=0}
  }else if(worker.phase==='wave'){
   worker.clock+=dt;
   const span=1.5+worker.hold;
   if(worker.clock>=span){worker.phase='out';worker.clock=0}
  }else{
   worker.x-=worker.speed*dt;
   // The gain pops the moment the fishman clears the left edge, not when its
   // frame is finally retired further out.
   if(worker.gain>0&&worker.x<=WORKER_LEAVE){flyRateGain(worker.gain,worker.depth,worker.x);worker.gain=0}
   if(worker.x<=WORKER_EXIT){retireWorkerFrame(worker.frame);workers.splice(i,1);continue}
  }
  positionWorker(worker.frame,worker.x);
  const mode=worker.phase==='wave'?'wave':worker.phase==='in'||worker.phase==='out'?'walk':'idle';
  if(mode!==worker.poseMode){worker.poseMode=mode;worker.poseTime=0}
  else worker.poseTime+=dt;
  const index=mode==='walk'?1+Math.floor((worker.poseTime%.9)*30):mode==='wave'?28+Math.min(45,Math.floor(worker.poseTime*30)):0;
  paintWorkerPose(worker.frame,index);
 }
}
function addTestApples(){
 if(state.phase!=='operation')return;
 const limit=1e75;
 if(state.apples>=limit){notify('已达到测试苹果上限');return}
 const target=Math.min(limit,Math.max(1e6,state.apples*10));
 earn(target-state.apples);displayed=state.apples;lastPaintedBalance=null;
 save();render();notify('测试苹果已增加');
}
function fastForwardBuild(){
 if(state.phase==='operation')return;
 clearConstructionFlights();clearTutorialFlights();state.buildClicks=BUILD_CLICKS_REQUIRED;state.phase='ready';startOperation();
}
function fastForwardFive(){
 fastForwardBuild();
 if(employeeCount()>=5)return;
 clearTutorialFlights();resetPurchaseSpeech();
 state.owned[0]+=Math.max(0,5-employeeCount());state.introRecruit=true;
 if(state.milestoneTimes.fiveEmployees===null)state.milestoneTimes.fiveEmployees=state.playSeconds;
 state.tutorial='waitRecruit';state.tutorialTime=0;save();render();
}
function fastForwardFarmLevel(level){
 fastForwardFive();
 if(farmStage()>=level)return;
 resetPurchaseSpeech();clearTutorialFlights();state.recruitGoalChoice='continue';state.recruitGoalGuide='done';state.tutorial='done';
 document.querySelectorAll('dialog[open]').forEach(d=>d.close());
 for(let stage=farmStage();stage<level;stage++){
  const purchase=nextFarmPurchase();
  if(!purchase)break;
  state.coins=Math.max(state.coins,purchase.price);
  if(!performFactoryUpgrade())break;
 }
}
function fastForwardAllRecruits(){
 fastForwardFarmLevel(3);
 state.soldApples=Math.max(state.soldApples,RECRUIT_UNLOCKS[1].target);
 state.earnedCoins=Math.max(state.earnedCoins,RECRUIT_UNLOCKS[4].target);
 save();render();
}
$('testBuildComplete').onclick=fastForwardBuild;
$('testFiveEmployees').onclick=fastForwardFive;
$('testFarmLevelTwo').onclick=()=>fastForwardFarmLevel(2);
$('testFarmLevelThree').onclick=()=>fastForwardFarmLevel(3);
$('testUnlockAllRecruits').onclick=fastForwardAllRecruits;
$('testApples').onclick=addTestApples;
$('testLucky').onclick=()=>spawnSpecial('lucky');$('testGolden').onclick=()=>spawnSpecial('golden');
// DEMO: one row per fishman, ×1 and ×10. These only play the arrival
// animation and the greeting - no apples are spent and no production changes.
$('spawnGrid').replaceChildren(...RECRUITABLE_BUILDING_IDS.flatMap(i=>{const b=BUILDINGS[i];return [1,10].map(count=>{
 const button=document.createElement('button');
 button.textContent=count===1?b.name:'×10';
 button.setAttribute('aria-label',`${b.name} 进场 ${count} 个`);
 button.onclick=()=>{if(state.phase!=='operation')return;greetPurchase();queueWorkers(count,0,i)};
 return button;
});}));
prepareWorkerFrame();
// Keep the green unit and notches fixed while the white value bay grows.
function drawRateTicket(){
 const ticket=document.querySelector('.rate'),svg=ticket.querySelector('.rate-ticket');
 const {width:w,height:h}=ticket.getBoundingClientRect(),unit=ticket.querySelector('.rate-unit').getBoundingClientRect().width;
 if(!w||!h)return;
 const shadow=2,top=.5,bottom=h-shadow-.5,split=unit,r=h*.16;
 const outline=`M.5 ${top}H${split-r}Q${split} ${top+r*2} ${split+r} ${top}H${w-.5}V${bottom}H${split+r}Q${split} ${bottom-r*2} ${split-r} ${bottom}H.5Z`;
 svg.setAttribute('viewBox',`0 0 ${w} ${h}`);
 svg.querySelector('clipPath path').setAttribute('d',outline);
 const edges=svg.querySelectorAll(':scope > path');
 edges[0].setAttribute('d',outline);edges[0].setAttribute('transform',`translate(0 ${shadow})`);
 edges[1].setAttribute('d',outline);
 const fills=svg.querySelectorAll('g > path');
 fills[0].setAttribute('d',`M0 0H${w}V${h}H0Z`);
 fills[1].setAttribute('d',`M0 0H${split}V${h}H0Z`);
}
new ResizeObserver(drawRateTicket).observe(document.querySelector('.rate'));
function setText(el,value){value=t(value);if(el.textContent!==value)el.textContent=value}
function setSellLabel(el,value){
 if(el.textContent===value)return;
 el.textContent=value;
 el.style.setProperty('--sell-label-length',value.length);
}
function formatMilestoneTime(seconds){if(seconds===null)return '—';const n=Math.floor(seconds);return [Math.floor(n/3600),Math.floor(n/60)%60,n%60].map(v=>String(v).padStart(2,'0')).join(':')}
const juiceScene=$('juiceFactoryScene'),reduceJuiceMotion=matchMedia('(prefers-reduced-motion: reduce)');
let juiceCrateArrival=null,juiceCrateArrivalAnimation=null,juiceCrateSlots=[],juiceCratePacked=0,visibleJuiceCrateStock=-1;
// Each phase starts after the previous part has had time to show its motion.
const JUICE_PIPE_START_MS=2000,JUICE_PROCESSOR_START_MS=3000,JUICE_OUTPUT_START_MS=4000;
const juiceStartupElapsed=()=>state.juiceStartupTaps<FACTORY_STARTUP_TAPS
 ?-1:Date.now()-(state.juiceStartupAt??0);
const juiceFactoryRunning=()=>juiceStartupElapsed()>=0;
function syncJuiceFactoryArt(scene){
 const elapsed=juiceStartupElapsed(),art=scene.documentElement;
 art.classList.toggle('juice-factory-running',elapsed>=0);
 const pipeRunning=elapsed>=JUICE_PIPE_START_MS;
 if(pipeRunning&&!art.classList.contains('juice-pipe-running')){
  scene.querySelectorAll('.juice-pipe-motion animate').forEach(animation=>animation.beginElement());
 }
 art.classList.toggle('juice-pipe-running',pipeRunning);
 art.classList.toggle('juice-processor-running',elapsed>=JUICE_PROCESSOR_START_MS);
 art.classList.toggle('juice-output-running',elapsed>=JUICE_OUTPUT_START_MS);
 return elapsed>=JUICE_OUTPUT_START_MS;
}
function markJuiceFirstOutput(){
 if(state.juiceFirstOutput)return;
 state.juiceFirstOutput=true;
 save();
}
function animateJuiceIntakeApple(golden){
 if(reduceJuiceMotion.matches)return;
 const scene=juiceScene.contentDocument,layer=scene?.getElementById('juice-startup-apples');
 if(!layer)return;
 const apple=scene.createElementNS(layer.namespaceURI,golden?'image':'use');
 if(golden){
  apple.setAttribute('href',new URL('img/svg/apple-gold.svg?v=frenzy16',document.baseURI).href);
  apple.setAttribute('x','-9');apple.setAttribute('y','-7.5');
  apple.setAttribute('width','18');apple.setAttribute('height','15');
 }else apple.setAttribute('href','#juice-belt-apple');
 layer.append(apple);
 const sceneBox=juiceScene.getBoundingClientRect(),button=$('produce').getBoundingClientRect();
 const x=(button.left+button.width*.28-sceneBox.left)*402/sceneBox.width;
 const y=(button.top+button.height*.5-sceneBox.top)*874/sceneBox.height;
 const flight=apple.animate([
  {transform:`translate(${x}px,${y}px)`,easing:'ease-out'},
  {transform:'translate(150px,250px) rotate(-40deg)',offset:.55},
  {transform:'translate(240px,226px) rotate(-70deg)',offset:.77,easing:'ease-in'},
  {transform:'translate(240px,282px) rotate(-105deg)'}
 ],{duration:JUICE_STARTUP_FLIGHT_MS});
 const session=state;
 flight.finished.then(()=>{
  apple.remove();
  if(state!==session||!sellingJuice()||juiceFactoryRunning())return;
  scene.querySelectorAll('.juice-machine-shake').forEach(part=>part.animate([
   {transform:'translateX(0)'},{transform:'translateX(-2.5px)',offset:.25},
   {transform:'translateX(1.7px)',offset:.55},{transform:'translateX(0)'}
  ],{duration:210,easing:'ease-out',composite:'add'}));
 },()=>apple.remove());
}
function juiceCrateTarget(){return Math.min(juiceCrateSlots.length,Math.floor(state.apples))}
function renderJuiceCrate(){
 if(!sellingJuice()){
  juiceCratePacked=0;
  juiceCrateArrivalAnimation?.cancel();
  return;
 }
 if(!juiceScene.data)juiceScene.data=juiceScene.dataset.src;
 if(!juiceCrateArrival)return;
 const outputRunning=syncJuiceFactoryArt(juiceCrateArrival.ownerDocument);
 const target=outputRunning?juiceCrateTarget():0;
 if(outputRunning&&target>0&&reduceJuiceMotion.matches)markJuiceFirstOutput();
 if(reduceJuiceMotion.matches)juiceCrateArrivalAnimation?.cancel();
 juiceCratePacked=reduceJuiceMotion.matches?target:Math.min(juiceCratePacked,target);
 if(visibleJuiceCrateStock===juiceCratePacked)return;
 visibleJuiceCrateStock=juiceCratePacked;
 juiceCrateSlots.forEach((slot,index)=>slot.setAttribute('visibility',index<juiceCratePacked?'visible':'hidden'));
}
function animateJuiceCrateArrival(){
 if(juiceCrateArrivalAnimation||reduceJuiceMotion.matches)return;
 const start={x:312,y:475}; // The bottle is still above the box at the conveyor handoff.
 const slot=juiceCratePacked<juiceCrateTarget()?juiceCrateSlots[juiceCratePacked]:null;
 // Animate the actual slot so bottles in closer rows occlude it throughout the fall.
 const frames=slot?[
  {transform:`translate(${start.x-Number(slot.dataset.x)}px,${start.y-Number(slot.dataset.y)}px)`,visibility:'visible'},
  {transform:'translate(0,0)',visibility:'visible'}
 ]:[
  {transform:`translate(${start.x}px,${start.y}px)`,opacity:1,visibility:'visible'},
  {transform:'translate(329px,518px)',opacity:0,visibility:'visible'}
 ];
 const animation=(slot||juiceCrateArrival).animate(frames,{duration:slot?420:220,easing:'ease-in',fill:'forwards'});
 juiceCrateArrivalAnimation=animation;
 animation.onfinish=()=>{
  if(juiceCrateArrivalAnimation!==animation)return;
  if(slot&&sellingJuice()&&juiceFactoryRunning()&&juiceCratePacked<juiceCrateTarget()){
   juiceCratePacked++;
   markJuiceFirstOutput();
  }
  animation.cancel();
  juiceCrateArrivalAnimation=null;
  renderJuiceCrate();
 };
 animation.oncancel=()=>{
  if(juiceCrateArrivalAnimation===animation)juiceCrateArrivalAnimation=null;
 };
}
juiceScene.addEventListener('load',()=>{
 const sceneDocument=juiceScene.contentDocument;
 if(!sceneDocument?.getElementById('juice-crate-arrival'))return;
 juiceCrateArrival=sceneDocument.getElementById('juice-crate-arrival');
 // Keep SVG paint order back-to-front so near bottles cover far bottles.
 juiceCrateSlots=[...sceneDocument.querySelectorAll('.juice-crate-bottle')]
  .sort((a,b)=>Number(a.dataset.packOrder)-Number(b.dataset.packOrder));
 visibleJuiceCrateStock=-1;
 juiceScene.dataset.ready='';
 sceneDocument.addEventListener('animationiteration',event=>{
  if(event.animationName==='juice-bottle-travel'&&sellingJuice()&&juiceStartupElapsed()>=JUICE_OUTPUT_START_MS)animateJuiceCrateArrival();
 });
 renderJuiceCrate();
});
const computerFactoryArt=[...document.querySelectorAll('.computer-factory-art')];
const computerFactoryRunning=()=>state.computerStartupTaps>=FACTORY_STARTUP_TAPS;
let computerAppleTap,computerLampTap;
function animateComputerProductionTap(){
 const scene=computerFactoryArt[0].contentDocument;
 if(!scene)return;
 computerAppleTap?.cancel();
 computerLampTap?.cancel();
 if(!matchMedia('(prefers-reduced-motion: reduce)').matches){
  computerAppleTap=scene.querySelector('.computer-apple-tap')?.animate([
   {transform:'translateY(0)'},{transform:'translateY(-7px)',offset:.36},{transform:'translateY(0)'}
  ],{duration:250,easing:'ease-out'});
 }
 computerLampTap=scene.querySelector('.computer-lamp-tap')?.animate([
  {opacity:1},{opacity:1,offset:.24},{opacity:0}
 ],{duration:250,easing:'ease-out'});
}
function syncComputerFactoryArt(art){
 const scene=art.contentDocument?.documentElement;
 if(!scene)return;
 const running=computerFactoryRunning();
 if(running&&!scene.classList.contains('computer-factory-running')){
  const elapsed=state.computerStartupAt===null?COMPUTER_STARTUP_DURATION_MS:
   Math.min(COMPUTER_STARTUP_DURATION_MS,Math.max(0,Date.now()-state.computerStartupAt));
  scene.style.setProperty('--computer-startup-offset',`${-elapsed}ms`);
 }
 scene.classList.toggle('computer-factory-running',running);
}
for(const art of computerFactoryArt)art.addEventListener('load',()=>{
 const scene=art.contentDocument;
 if(scene?.documentElement.localName!=='svg')return;
 if(art.classList.contains('computer-factory-conveyor')){
  scene.addEventListener('animationend',event=>{
   if(event.animationName!=='computer-first-output'||state.computerFirstOutput||
      state.phase!=='operation'||farmStage()!==3||!computerFactoryRunning())return;
   state.computerFirstOutput=true;
   save();
  });
 }
 syncComputerFactoryArt(art);
 art.dataset.ready='';
});
function renderComputerFactory(stage){
 if(stage!==3)return;
 for(const art of computerFactoryArt){
  if(!art.data)art.data=art.dataset.src;
  else if(art.hasAttribute('data-ready'))syncComputerFactoryArt(art);
 }
}
function renderFactoryStartupPrompt(phone,stage){
 const waiting=stage>1&&!factorySaleReady();
 phone.classList.toggle('factory-awaiting-output',waiting);
 $('factoryStartupPrompt').hidden=!waiting||wardrobeOpen;
 if(!waiting)return;
 const juice=stage===2,taps=juice?state.juiceStartupTaps:state.computerStartupTaps;
 const starting=taps<FACTORY_STARTUP_TAPS;
 const hint=juice
  ?(starting?'手动点击 5 次，把苹果投入机器！':'正在制作第一瓶苹果汁…')
  :(starting?'手动点击生产按钮 5 次，启动机器！':'正在制作第一台苹果电脑…');
 setText($('factoryStartupHint'),hint);
 $('factoryStartupProgress').hidden=!starting;
 setText($('factoryStartupProgress'),taps+'/'+FACTORY_STARTUP_TAPS);
}
const recruitAffordability=BUILDINGS.map(()=>({wasAffordable:false,pulseUntil:0}));
const sellActionArt=document.querySelectorAll('#sellCrate .sell-crate-visual,#sellCrate .sell-crate-cta');
const actionArtCache=new Map();
function setActionArt(container,source){
 if(container.dataset.activeSrc===source)return;
 container.dataset.activeSrc=source;

 // Keep a visible image while the inline vector is loading or if it fails.
 if(container.firstElementChild?.getAttribute('src')!==source){
  const fallback=new Image();
  fallback.src=source;
  fallback.alt='';
  fallback.draggable=false;
  container.replaceChildren(fallback);
 }
 if(!actionArtCache.has(source)){
  const loading=fetch(source).then(response=>{
   if(!response.ok)throw Error('Unable to load action artwork');
   return response.text();
  }).then(markup=>{
   const svg=new DOMParser().parseFromString(markup,'image/svg+xml').documentElement;
   if(svg.localName!=='svg')throw Error('Invalid action artwork');
   return svg;
  });
  actionArtCache.set(source,loading);
 }
 actionArtCache.get(source).then(svg=>{
  if(container.dataset.activeSrc===source)container.replaceChildren(document.importNode(svg,true));
 }).catch(()=>actionArtCache.delete(source));
}
function render(){
 renderConstruction();renderTutorial();
 const phone=document.querySelector('.phone');
 const stage=state.phase==='operation'?farmStage():1;
 phone.classList.toggle('farm-level-two',stage>=2);
 phone.classList.toggle('farm-level-three',stage===3);
 renderComputerFactory(stage);
 renderFactoryStartupPrompt(phone,stage);
 const recruitShop=document.querySelector('.building-shop'),recruitShopVisible=state.phase==='operation'&&!recruitShop.classList.contains('tutorial-hidden'),now=performance.now();
 setText($('coinBalance'),number(state.coins));
 const crateSize=currentCrateSize(),crateCount=readyCrateCount(),juice=sellingJuice();
 const basketFill=state.soldApples===0?Math.min(2,crateCount):crateCount>0?2:state.apples>=Math.ceil(crateSize/2)?1:0;
 const laptop=stage===3;
 const sellCrate=$('sellCrate'),sellLabel=t(laptop?'卖出苹果电脑':juice?'卖出苹果汁箱':'卖出苹果箱');
 sellCrate.disabled=crateCount===0;
 sellCrate.classList.toggle('crate-ready',crateCount>0);
 if(sellCrate.getAttribute('aria-label')!==sellLabel)sellCrate.setAttribute('aria-label',sellLabel);
 sellCrate.classList.toggle('juice-sale',juice);
 sellCrate.classList.toggle('laptop-sale',laptop);
 for(const art of sellActionArt){
  setActionArt(art,art.dataset[laptop?'laptopSrc':juice?'juiceSrc':'appleSrc']);
 }
 $('basketCue').classList.toggle('is-ready',crateCount>0);
 const basketArtSource=basketFill===2?'fullSrc':basketFill===1?'oneBasketSrc':'emptySrc';
 for(const art of [$('operatingFactoryArt'),$('goldenFactoryArt')]){
  const source=art.dataset[basketArtSource];
  if(art.getAttribute('src')!==source)art.setAttribute('src',source);
 }
 const saleUnits=unitsInCrates(crateCount),sellableTarget=saleUnits||crateSize;
 const shownUnits=crateCount>0?saleUnits:Math.min(crateSize,Math.floor(state.apples));
 const unit=juice?t('瓶'):'';
 const saleCountUnit=laptop?t('台'):t('箱');
 setSellLabel($('crateProgress'),`${crateNumber.format(crateCount)}${saleCountUnit}＝${crateNumber.format(shownUnits)}/${crateNumber.format(sellableTarget)}${unit}`);
 setSellLabel($('crateReward'),`+${number(crateCount*(crateBasePrice()+state.owned[2]*chefCrateBonus()))}`);
 renderJuiceCrate();
 const played=Math.floor(state.playSeconds),hours=Math.floor(played/3600),minutes=Math.floor(played/60)%60,seconds=played%60;
 setText($('playTime'),[hours,minutes,seconds].map(n=>String(n).padStart(2,'0')).join(':'));
 $('milestoneTimes').hidden=state.milestoneTimes.construction===null&&state.milestoneTimes.fiveEmployees===null&&state.milestoneTimes.firstFarmUpgrade===null;
 $('constructionTimeRow').hidden=state.milestoneTimes.construction===null;$('fiveEmployeesTimeRow').hidden=state.milestoneTimes.fiveEmployees===null;
 $('firstFarmUpgradeTimeRow').hidden=state.milestoneTimes.firstFarmUpgrade===null;setText($('firstFarmUpgradeTime'),formatMilestoneTime(state.milestoneTimes.firstFarmUpgrade));
 setText($('constructionTime'),formatMilestoneTime(state.milestoneTimes.construction));setText($('fiveEmployeesTime'),formatMilestoneTime(state.milestoneTimes.fiveEmployees));
 if(typeof renderCatalog==="function")renderCatalog();
 renderEvents();
 paintBalance();$('rate').textContent='+'+precise(shownRate()*(state.events.frenzy>0?7:1))+'/s';$('rateMultiplier').hidden=true;$('clickValue').textContent='每次 +'+number(clickPower());document.querySelector('.phone').classList.toggle('running',cps()>0);
 for(const el of recruitCards){
  const i=+el.dataset.building,b=BUILDINGS[i],show=i===0||visible(i),price=buildingCost(i);
  const affordable=visible(i)&&state.coins+1e-9>=price,affordance=recruitAffordability[i];
  if(recruitShopVisible&&affordable&&!affordance.wasAffordable)affordance.pulseUntil=now+3000;
  affordance.wasAffordable=recruitShopVisible&&affordable;
  el.classList.toggle('locked',!show);
  el.classList.toggle('unaffordable',show&&!affordable);
  el.classList.toggle('recruit-pulse',affordance.wasAffordable&&now<affordance.pulseUntil);
  const art=el.querySelector('.recruit-art');
  const source=`img/svg/hiring/${RECRUIT_CARDS[i].art}${show?'':'-locked'}.svg?v=1.0.160`;
  if(art.getAttribute('src')!==source)art.setAttribute('src',source);
  const ability=el.querySelector('.recruit-ability'),recruit=el.querySelector('.recruit-hit');
  const priceLabel=price<1e9?price.toLocaleString('en-US'):number(price);
  const name=i===3?t('鱼人王'):t(b.name);
  const label=show?`招募 1 个${name}，${priceLabel} 金币${affordable?'':'，金币不够'}${i===3?'':`；${t(b.desc)}`}`:`？？？ · ${t(RECRUIT_UNLOCKS[i].label)}`;
  const localizedLabel=t(label);
  recruit.disabled=!affordable;
  if(recruit.getAttribute('aria-label')!==localizedLabel)recruit.setAttribute('aria-label',localizedLabel);
  if(el.getAttribute('aria-label')!==localizedLabel)el.setAttribute('aria-label',localizedLabel);
  setText(el.querySelector('.recruit-count'),show&&state.owned[i]>0?number(state.owned[i]):'');
  setText(el.querySelector('.recruit-name'),show?name:'？？？');
  setText(el.querySelector('.recruit-price span'),priceLabel);
  if(ability&&show)setText(ability,roleAbility(i));
 }
 renderFactoryUpgrade();
 const hasItems=offers().length>0;$('vendingDot').hidden=!hasItems;$('openShop').setAttribute('aria-label','外出，暂未开放');
 if($('shopDialog').open)renderVending();
}
// Hand-drawn art for the cheapest items; everything else still uses the
// placeholder until it is drawn.
const ITEM_ICONS={
 // Farmer and shark fishmen, drawn to match the earlier icon set.
 'supply-farmer-0':'img/items/item-supply-farmer-0.svg',
 'supply-farmer-1':'img/items/item-supply-farmer-1.svg',
 'supply-farmer-2':'img/items/item-supply-farmer-2.svg',
 'supply-farmer-3':'img/items/item-supply-farmer-3.svg',
 'supply-farmer-4':'img/items/item-supply-farmer-4.svg',
 'supply-farmer-5':'img/items/item-supply-farmer-5.svg',
 'supply-farmer-6':'img/items/item-supply-farmer-6.svg',
 'supply-farmer-7':'img/items/item-supply-farmer-7.svg',
 'supply-farmer-8':'img/items/item-supply-farmer-8.svg',
 'supply-farmer-9':'img/items/item-supply-farmer-9.svg',
 'supply-farmer-10':'img/items/item-supply-farmer-10.svg',
 'supply-farmer-11':'img/items/item-supply-farmer-11.svg',
 'supply-farmer-12':'img/items/item-supply-farmer-12.svg',
 'supply-farmer-13':'img/items/item-supply-farmer-13.svg',
 'supply-shark-0':'img/items/item-supply-shark-0.svg',
 'supply-shark-1':'img/items/item-supply-shark-1.svg',
 'supply-shark-2':'img/items/item-supply-shark-2.svg',
 'supply-shark-3':'img/items/item-supply-shark-3.svg',
 'supply-shark-4':'img/items/item-supply-shark-4.svg',
 'supply-shark-5':'img/items/item-supply-shark-5.svg',
 'supply-shark-6':'img/items/item-supply-shark-6.svg',
 'supply-shark-7':'img/items/item-supply-shark-7.svg',
 'supply-shark-8':'img/items/item-supply-shark-8.svg',
 'supply-shark-9':'img/items/item-supply-shark-9.svg',
 'supply-shark-10':'img/items/item-supply-shark-10.svg',
 'supply-shark-11':'img/items/item-supply-shark-11.svg',
 'supply-shark-12':'img/items/item-supply-shark-12.svg',
 'supply-shark-13':'img/items/item-supply-shark-13.svg',
 'tier-farmer-0':'img/items/item-farmer-straw-hat.svg',
 'tier-farmer-1':'img/items/item-farmer-hoe.svg',
 'tier-farmer-2':'img/items/item-farmer-seed-tray.svg',
 'tier-farmer-3':'img/items/item-farmer-drip-hose.svg',
 'tier-farmer-4':'img/items/item-farmer-compost.svg',
 'tier-farmer-5':'img/items/item-farmer-manual.svg',
 'tier-farmer-6':'img/items/item-farmer-rotation-cal.svg',
 'tier-farmer-7':'img/items/item-farmer-greenhouse.svg',
 'tier-farmer-8':'img/items/item-farmer-harvester.svg',
 'tier-farmer-9':'img/items/item-farmer-root-pod.svg',
 'tier-farmer-10':'img/items/item-farmer-four-season.svg',
 'tier-farmer-11':'img/items/item-farmer-cloud-net.svg',
 'tier-farmer-12':'img/items/item-farmer-time-seeder.svg',
 'tier-farmer-13':'img/items/item-farmer-infinite-soil.svg',
 'tier-farmer-14':'img/items/item-farmer-origin-orchard.svg',
 'tier-shark-0':'img/items/item-shark-whetstone.svg',
 'tier-shark-1':'img/items/item-shark-bite-basket.svg',
 'tier-shark-2':'img/items/item-shark-goggles.svg',
 'tier-shark-3':'img/items/item-shark-saw-picker.svg',
 'tier-shark-4':'img/items/item-shark-nose-radar.svg',
 'tier-shark-5':'img/items/item-shark-tail-fin.svg',
 'tier-shark-6':'img/items/item-shark-hunt-squad.svg',
 'tier-shark-7':'img/items/item-shark-current-harvest.svg',
 'tier-shark-8':'img/items/item-shark-tooth-cutter.svg',
 'tier-shark-9':'img/items/item-shark-stealth-pod.svg',
 'tier-shark-10':'img/items/item-shark-sonic-cruiser.svg',
 'tier-shark-11':'img/items/item-shark-star-fleet.svg',
 'tier-shark-12':'img/items/item-shark-time-tracker.svg',
 'tier-shark-13':'img/items/item-shark-infinite-hunt.svg',
 'tier-shark-14':'img/items/item-shark-abyss-king.svg',
 'mentor-shark':'img/items/item-mentor-shark.svg',
 'mentor-staff':'img/items/item-badge.svg',
 'finger':'img/items/item-finger.svg',
 'cream':'img/items/item-cream.svg',
 'tier-1-0':'img/items/item-badge.svg',
 'tier-1-1':'img/items/item-grip-glove.svg',
 'hands':'img/items/item-two-fins.svg',
 'tier-1-2':'img/items/item-lunch.svg',
 'mouse-0':'img/items/item-clicker.svg',
 'fingers-0':'img/items/item-all-hands.svg',
 'tier-3-0':'img/items/item-juggling.svg',
 'tier-3-1':'img/items/item-clown-nose.svg',
 'mentor-3':'img/items/item-mentor-clown.svg',
 'supply-plain-cookies':'img/items/item-bento.svg',
 'tier-4-0':'img/items/item-crown.svg',
 'supply-sugar-cookies':'img/items/item-apple-chips.svg',
 'tier-1-3':'img/items/item-double-pay.svg',
 'mouse-1':'img/items/item-clicker-steel.svg',
 'tier-3-2':'img/items/item-stripe-suit.svg',
 'tier-4-1':'img/items/item-cape.svg',
 'mentor-4':'img/items/item-mentor-king.svg',
 'supply-oatmeal-raisin-cookies':'img/items/item-juice.svg',
 'fingers-1':'img/items/item-all-hands-2.svg',
 'tier-5-0':'img/items/item-sponge.svg',
 'supply-peanut-butter-cookies':'img/items/item-grilled-skewer.svg',
 'tier-4-2':'img/items/item-royal-basket.svg',
 'tier-5-1':'img/items/item-nutrient-bucket.svg',
 'mentor-5':'img/items/item-mentor-sponge.svg',
 'supply-almond-cookies':'img/items/item-onigiri.svg',
 'supply-cashew-cookies':'img/items/item-breakfast.svg',
 'supply-coconut-cookies':'img/items/item-buns.svg',
 'supply-hazelnut-cookies':'img/items/item-orchard-box.svg',
 'supply-macadamia-nut-cookies':'img/items/item-hot-soup.svg',
 'supply-walnut-cookies':'img/items/item-fruit-cup.svg',
 'fingers-2':'img/items/item-all-hands-3.svg',
 'tier-6-0':'img/items/item-reagent.svg',
 'supply-milk-chocolate-cookies':'img/items/item-apple-pie.svg',
 'supply-white-chocolate-cookies':'img/items/item-share-pack.svg',
 'tier-1-4':'img/items/item-certificate.svg',
 'mouse-2':'img/items/item-clicker-titanium.svg',
 'tier-3-3':'img/items/item-unicycle.svg',
 'tier-5-2':'img/items/item-airy-sponge.svg',
 'gold-lucky-day':'img/items/item-seaweed-charm.svg',
 'tier-6-1':'img/items/item-fast-cell.svg',
 'mentor-6':'img/items/item-mentor-mutant.svg',
 'fingers-3':'img/items/item-all-hands-4.svg',
 'tier-7-0':'img/items/item-antenna.svg',
 'supply-double-chip-cookies':'img/items/item-kelp-meal.svg',
 'tier-4-3':'img/items/item-decree.svg',
 'supply-white-chocolate-macadamia-nut-cookies':'img/items/item-attendance-snack.svg',
 'tier-6-2':'img/items/item-tentacles.svg',
 'fingers-4':'img/items/item-all-hands-5.svg',
 'tier-7-1':'img/items/item-antigrav-glove.svg',
 'mentor-7':'img/items/item-mentor-alien.svg',
 'supply-all-chocolate-cookies':'img/items/item-coffee.svg',
 'tier-1-5':'img/items/item-training.svg',
 'mouse-3':'img/items/item-clicker-mythril.svg',
 'tier-3-4':'img/items/item-flower-hat.svg',
 'tier-5-3':'img/items/item-press.svg',
 'gold-serendipity':'img/items/item-fortune-slip.svg',
 'supply-dark-chocolate-coated-cookies':'img/items/item-apple-tea.svg',
 'supply-white-chocolate-coated-cookies':'img/items/item-fruit-platter.svg',
 'tier-7-2':'img/items/item-ufo-licence.svg',
 'supply-eclipse-cookies':'img/items/item-canteen-pie.svg',
 'tier-4-4':'img/items/item-royal-guard.svg',
 'tier-9-0':'img/items/item-prayer-bell.svg',
 'supply-zebra-cookies':'img/items/item-afternoon-tea.svg',
 'tier-6-3':'img/items/item-spores.svg',
 'tier-9-1':'img/items/item-altar.svg',
 'mentor-9':'img/items/item-mentor-god.svg',
 'supply-snickerdoodles':'img/items/item-jam-bun.svg',
 'mouse-4':'img/items/item-clicker-mystic.svg',
 'tier-3-5':'img/items/item-flying-fish.svg',
 'tier-5-4':'img/items/item-coral-filter.svg',
 'supply-stroopwafels':'img/items/item-cheese-roll.svg',
 'fingers-5':'img/items/item-all-hands-6.svg',
 'tier-7-3':'img/items/item-plasma-scythe.svg',
 'tier-9-2':'img/items/item-holy-branch.svg',
 'supply-macaroons':'img/items/item-snack-box.svg',
 'tier-1-6':'img/items/item-flex-shift.svg',
 'tier-4-5':'img/items/item-palace-orchard.svg',
 'gold-get-lucky':'img/items/item-golden-hourglass.svg',
 'supply-empire-biscuits':'img/items/item-celebration-tower.svg',
 'tier-6-4':'img/items/item-regeneration.svg',
 'supply-madeleines':'img/items/item-staff-meal.svg',
 'supply-palmiers':'img/items/item-friday-dessert.svg',
 'mouse-5':'img/items/item-clicker-phantom.svg',
 'tier-5-5':'img/items/item-deep-nutrient.svg',
 'supply-palets':'img/items/item-night-porridge.svg',
 'supply-sabl-eacute-s':'img/items/item-banquet-ticket.svg',
 'tier-7-4':'img/items/item-wormhole-basket.svg',
 'tier-9-3':'img/items/item-oracle-book.svg',
 'tier-3-6':'img/items/item-touring-troupe.svg',
 'supply-gingerbread-men':'img/items/item-harvest-feast.svg',
 'tier-6-5':'img/items/item-gene-upgrade.svg',
 'fingers-6':'img/items/item-all-hands-7.svg',
 'tier-1-7':'img/items/item-year-bonus.svg',
 'mouse-6':'img/items/item-clicker-wish.svg',
 'tier-4-6':'img/items/item-tribute.svg',
 'tier-7-5':'img/items/item-quantum-nursery.svg',
 'tier-9-4':'img/items/item-grail.svg',
 'tier-5-6':'img/items/item-giant-straw.svg',
 'mouse-7':'img/items/item-clicker-fantasy.svg',
 'tier-3-7':'img/items/item-applause.svg',
 'tier-6-6':'img/items/item-split-culture.svg',
 'fingers-7':'img/items/item-all-hands-8.svg',
 'tier-9-5':'img/items/item-tide-scepter.svg',
 'tier-1-8':'img/items/item-efficiency-manual.svg',
 'tier-4-7':'img/items/item-sea-rule.svg',
 'tier-7-6':'img/items/item-star-transport.svg',
 'mouse-8':'img/items/item-clicker-unbreakable.svg',
 'tier-5-7':'img/items/item-tide-pump.svg',
 'tier-3-8':'img/items/item-sea-show.svg',
 'tier-6-7':'img/items/item-hive-mind.svg',
 'fingers-8':'img/items/item-all-hands-9.svg',
 'tier-9-6':'img/items/item-dew.svg',
 'supply-fudge-squares':'img/items/item-rainbow-candy.svg',
 'tier-1-9':'img/items/item-expert-cert.svg',
 'mouse-9':'img/items/item-clicker-mithril.svg',
 'tier-4-8':'img/items/item-golden-throne.svg',
 'supply-shortbread-biscuits':'img/items/item-juggle-apples.svg',
 'tier-7-7':'img/items/item-warp-planting.svg',
 'supply-millionaires-shortbreads':'img/items/item-smile-muffin.svg',
 'tier-5-8':'img/items/item-current-loop.svg',
 'supply-caramel-cookies':'img/items/item-popcorn.svg',
 'supply-pecan-sandies':'img/items/item-cream-cup.svg',
 'mouse-10':'img/items/item-clicker-obsidian.svg',
 'tier-3-9':'img/items/item-masks.svg',
 'supply-moravian-spice-cookies':'img/items/item-spiral-roll.svg',
 'tier-6-8':'img/items/item-adaptation.svg',
 'fingers-9':'img/items/item-all-hands-10.svg',
 'tier-9-7':'img/items/item-divine-orchard.svg',
 'supply-anzac-biscuits':'img/items/item-unicycle-lunch.svg',
 'tier-4-9':'img/items/item-sea-palace.svg',
 'supply-buttercakes':'img/items/item-cheer-soda.svg',
 'tier-7-8':'img/items/item-gravity-control.svg',
 'supply-ice-cream-sandwiches':'img/items/item-tour-bucket.svg',
 'mouse-11':'img/items/item-clicker-plasma.svg',
 'tier-1-10':'img/items/item-remote-clone.svg',
 'tier-5-9':'img/items/item-irrigation.svg',
 'supply-pink-biscuits':'img/items/item-flying-fish-cookie.svg',
 'supply-whole-grain-cookies':'img/items/item-stage-candy.svg',
 'supply-candy-cookies':'img/items/item-circus-feast.svg',
 'tier-6-9':'img/items/item-super-cell.svg',
 'fingers-10':'img/items/item-all-hands-11.svg',
 'tier-9-8':'img/items/item-blessing.svg',
 'supply-big-chip-cookies':'img/items/item-ovation-pie.svg',
 'mouse-12':'img/items/item-clicker-miracle.svg',
 'tier-3-10':'img/items/item-gravity-juggle.svg',
 'supply-one-chip-cookies':'img/items/item-ocean-tower.svg',
 'tier-7-9':'img/items/item-mothership.svg',
 'supply-sprinkles-cookies':'img/items/item-royal-juice.svg',
 'tier-4-10':'img/items/item-star-kingdom.svg',
 'supply-peanut-butter-blossoms':'img/items/item-royal-pastry.svg',
 'mouse-13':'img/items/item-clicker-aether.svg',
 'supply-no-bake-cookies':'img/items/item-crown-cookie.svg',
 'tier-1-11':'img/items/item-global-teamwork.svg',
 'tier-5-10':'img/items/item-cloud-reservoir.svg',
 'supply-florentines':'img/items/item-court-tea.svg',
 'fingers-11':'img/items/item-all-hands-12.svg',
 'tier-9-9':'img/items/item-star-temple.svg',
 'supply-chocolate-crinkles':'img/items/item-gold-cup-drink.svg',
 'supply-maple-cookies':'img/items/item-imperial-bowl.svg',
 'tier-6-10':'img/items/item-cross-mutation.svg',
 'mouse-14':'img/items/item-clicker-omni.svg',
 'supply-persian-rice-cookies':'img/items/item-ceremony-cookie.svg',
 'tier-3-11':'img/items/item-time-circus.svg',
 'supply-norwegian-cookies':'img/items/item-royal-lunch.svg',
 'tier-7-10':'img/items/item-galaxy-net.svg',
 'supply-crispy-rice-cookies':'img/items/item-tribute-box.svg',
 'tier-4-11':'img/items/item-time-domain.svg',
 'supply-ube-cookies':'img/items/item-coronation-pie.svg',
 'supply-butterscotch-cookies':'img/items/item-ocean-banquet.svg',
 'tier-1-12':'img/items/item-time-attendance.svg',
 'tier-5-11':'img/items/item-nebula-filter.svg',
 'supply-speculaas':'img/items/item-honey-apple.svg',
 'tier-9-10':'img/items/item-karma-fruit.svg',
 'supply-chocolate-oatmeal-cookies':'img/items/item-people-meal.svg',
 'tier-6-11':'img/items/item-dimension-tendrils.svg',
 'supply-molasses-cookies':'img/items/item-sea-festival.svg',
 'supply-biscotti':'img/items/item-sponge-milk.svg',
 'tier-3-12':'img/items/item-dream-stage.svg',
 'supply-waffle-cookies':'img/items/item-airy-cake.svg',
 'tier-7-11':'img/items/item-dimension-fold.svg',
 'supply-custard-creams':'img/items/item-coral-jelly.svg',
 'tier-4-12':'img/items/item-crown-all.svg',
 'supply-bourbon-biscuits':'img/items/item-sea-souffle.svg',
 'supply-mini-cookies':'img/items/item-tide-soda.svg',
 'tier-1-13':'img/items/item-infinite-desk.svg',
 'tier-5-12':'img/items/item-time-reservoir.svg',
 'supply-whoopie-pies':'img/items/item-mineral-soup.svg',
 'supply-caramel-wafer-biscuits':'img/items/item-cloud-candy.svg',
 'tier-9-11':'img/items/item-genesis-seed.svg',
 'supply-chocolate-chip-mocha-cookies':'img/items/item-sponge-roll.svg',
 'tier-6-12':'img/items/item-life-rebuild.svg',
 'supply-chai-tea-cookies':'img/items/item-deep-nutrient-dew.svg',
 'supply-earl-grey-cookies':'img/items/item-current-supply.svg',
 'tier-3-13':'img/items/item-endless-curtain.svg',
 'supply-corn-syrup-cookies':'img/items/item-rain-juice.svg',
 'tier-7-12':'img/items/item-time-farm.svg',
 'supply-icebox-cookies':'img/items/item-nebula-meal.svg',
 'tier-4-13':'img/items/item-eternal-reign.svg',
 'supply-graham-crackers':'img/items/item-tide-pie.svg',
 'supply-hardtack':'img/items/item-sea-of-life.svg',
 'tier-1-14':'img/items/item-lifetime-honor.svg',
 'tier-5-13':'img/items/item-infinite-absorb.svg',
 'supply-cornflake-cookies':'img/items/item-mutant-vitamin.svg',
 'supply-gluten-free-cookies':'img/items/item-dual-candy.svg',
 'supply-tofu-cookies':'img/items/item-glow-jelly.svg',
 'tier-9-12':'img/items/item-heavens-harvest.svg',
 'supply-russian-bread-cookies':'img/items/item-tentacle-meal.svg',
 'tier-6-13':'img/items/item-infinite-evolution.svg',
 'supply-lebkuchen':'img/items/item-regen-puree.svg',
 'tier-3-14':'img/items/item-cosmic-comedy.svg',
 'supply-aachener-printen':'img/items/item-cell-vitality.svg',
 'tier-7-13':'img/items/item-infinite-colony.svg',
 'supply-canistrelli':'img/items/item-gene-soup.svg',
 'tier-4-14':'img/items/item-lord-of-seas.svg',
 'supply-nice-biscuits':'img/items/item-spiral-biscuit.svg',
 'supply-french-pure-butter-cookies':'img/items/item-adapt-pack.svg',
 'supply-petit-beurre':'img/items/item-super-jelly-cup.svg',
 'tier-5-14':'img/items/item-living-sea.svg',
 'supply-nanaimo-bars':'img/items/item-split-pie.svg',
 'supply-berger-cookies':'img/items/item-evolution-crate.svg',
 'tier-9-13':'img/items/item-eternal-kingdom.svg',
 'supply-chinsuko':'img/items/item-rebuild-meal.svg',
 'supply-panda-koala-biscuits':'img/items/item-ultimate-banquet.svg',
 'tier-6-14':'img/items/item-ultimate-fish.svg',
 'supply-putri-salju':'img/items/item-freeze-dried.svg',
 'supply-milk-cookies':'img/items/item-ufo-bento.svg',
 'tier-7-14':'img/items/item-cosmic-farm.svg',
 'supply-kruidnoten':'img/items/item-zerog-juice.svg',
 'supply-marie-biscuits':'img/items/item-plasma-jelly.svg',
 'supply-meringue-cookies':'img/items/item-quantum-jam.svg',
 'supply-yogurt-cookies':'img/items/item-space-travel-meal.svg',
 'supply-thumbprint-cookies':'img/items/item-wormhole-ring.svg',
 'tier-9-14':'img/items/item-all-fruit-one.svg',
 'supply-pizzelle':'img/items/item-moon-bar.svg',
 'supply-granola-cookies':'img/items/item-warp-fluid.svg',
 'supply-ricotta-cookies':'img/items/item-galaxy-platter.svg',
 'supply-roze-koeken':'img/items/item-mothership-meal.svg',
 'supply-peanut-butter-cup-cookies':'img/items/item-gravity-pie.svg',
 'supply-sesame-cookies':'img/items/item-parallel-meal.svg',
 'supply-taiyaki':'img/items/item-star-banquet.svg',
 'supply-gomma-cookies':'img/items/item-god-dew.svg',
 'supply-vegan-cookies':'img/items/item-holy-candy.svg',
 'supply-coyotas':'img/items/item-oracle-meal.svg',
 'supply-frosted-sugar-cookies':'img/items/item-dew-drink.svg',
 'supply-marshmallow-sandwich-cookies':'img/items/item-grail-soup.svg',
 'supply-web-cookies':'img/items/item-divine-honey.svg',
 'supply-havreflarn':'img/items/item-star-offering.svg',
 'supply-alfajores':'img/items/item-blessing-meal.svg',
 'supply-gaufrettes':'img/items/item-karma-jam.svg',
 'supply-cookie-bars':'img/items/item-genesis-pie.svg',
 'supply-snowball-cookies':'img/items/item-heaven-feast.svg',
 'supply-sequilhos':'img/items/item-eternal-dew.svg',
 'supply-hazelnut-swirlies':'img/items/item-all-one-meal.svg',
 'supply-spritz-cookies':'img/items/item-infinite-grace.svg',
 'supply-mbatata-cookies':'img/items/item-origin-fruit.svg',
 'supply-springerles':'img/items/item-universe-end-feast.svg',
};
const itemIcon=id=>ITEM_ICONS[id]||'img/items/item-placeholder.svg';
let selectedItem=null,vendingSignature='';
const recruitUpgradeEffect={
 1:{title:'点击苹果加成 ×2',label:'每名农民鱼人的点击加成',value:farmerTapBonus,unit:'个苹果/次',factor:2},
 2:{title:'每箱售货奖励 ×2',label:'每名料理鱼人的售货加成',value:chefCrateBonus,unit:'金币/箱',factor:2},
 3:{title:'农场升级奖励 ×2',label:'每名国王鱼人的升级加成',value:kingUpgradeBonus,unit:'金币/次',factor:2},
 4:{title:'自动售卖间隔减半',label:'自动售卖间隔',value:autoSellInterval,unit:'秒',factor:.5}
};
function itemDescription(u){
 if(u.kind==='global')return `全体产量 +${u.power}%`;
 if(u.kind==='mentor')return `点击苹果加成 ×2；每 ${u.building-1} 名农民鱼人使${BUILDINGS[u.building].name}产量 +1%`;
 if(u.kind==='double'&&recruitUpgradeEffect[u.building])return recruitUpgradeEffect[u.building].title;
 if(u.kind==='double')return u.building===0?'点击基础收益 ×2；兼职鱼人基础产量 ×2':`${BUILDINGS[u.building].name}产量 ×2`;
 if(u.kind==='mouse')return `点击收益 +秒产的 1%（约 ${number(Math.round(cps()*.01))} 个苹果/次）`;
 const before=upgradeEffects().fingers,after=u.id==='fingers-0'?.1:before*u.factor;
 return `每名其他鱼人提供的协作加成：${precise(before)} → ${precise(after)}`;
}
function animateItemPurchase(id){
 const dialog=$('shopDialog');if(!dialog.open)return;
 const source=$('upgrades').querySelector(`[data-item="${id}"] .item-icon img`);
 if(!source)return;
 const target=$('viewItems'),from=source.getBoundingClientRect(),to=target.getBoundingClientRect(),area=dialog.getBoundingClientRect();
 const arrive=()=>{if(dialog.open)target.animate([{transform:'scale(1)'},{transform:'scale(1.12)'},{transform:'scale(1)'}],{duration:280,easing:'ease-out'})};
 if(matchMedia('(prefers-reduced-motion: reduce)').matches){arrive();return}
 const item=document.createElement('img');item.src=source.src;item.alt='';item.className='purchased-item-flight';
 item.style.cssText=`left:${from.left-area.left}px;top:${from.top-area.top}px;width:${from.width}px;height:${from.height}px`;
 dialog.append(item);
 const dx=to.left+to.width/2-from.left-from.width/2,dy=to.top+to.height/2-from.top-from.height/2;
 const flight=item.animate([
  {transform:'translate(0,0) scale(1)',opacity:1,offset:0},
  {transform:`translate(${dx*.2}px,${dy*.3-25}px) scale(1.12) rotate(-12deg)`,opacity:1,offset:.28},
  {transform:`translate(${dx}px,${dy}px) scale(.12) rotate(8deg)`,opacity:0,offset:1}
 ],{duration:700,easing:'cubic-bezier(.3,0,.65,1)',fill:'forwards'});
 flight.onfinish=()=>{item.remove();arrive()};flight.oncancel=()=>item.remove();
}
function renderVending(){
 const items=offers().slice(0,9),signature=items.map(u=>u.id).join('|');
 if(signature!==vendingSignature){
  vendingSignature=signature;
  const nodes=items.map(u=>{
   const slot=document.createElement('article');slot.className='vending-item';slot.dataset.item=u.id;
   const icon=document.createElement('button');icon.className='item-icon';icon.dataset.inspect=u.id;icon.setAttribute('aria-label',u.name+'，查看介绍');icon.setAttribute('aria-controls','itemDetail');
   const img=document.createElement('img');img.src=itemIcon(u.id);img.alt='';img.draggable=false;icon.append(img);
   const price=document.createElement('button');price.className='item-price';price.dataset.upgrade=u.id;price.setAttribute('aria-label',`购买${u.name}，${number(u.price)}金币`);
   price.innerHTML='<svg viewBox="0 0 150 50" preserveAspectRatio="none" aria-hidden="true"><path d="M.5 .5H65Q75 12 85 .5H149.5V49.5H85Q75 38 65 49.5H.5Z" vector-effect="non-scaling-stroke"/></svg><span><img src="img/svg/coin.svg" alt=""><b></b></span>';
   price.querySelector('b').textContent=number(u.price);slot.append(icon,price);return slot;
  });
  $('upgrades').replaceChildren(...nodes);
 }
 if(selectedItem&&!items.some(u=>u.id===selectedItem))selectedItem=null;
 for(const u of items){const node=$('upgrades').querySelector(`[data-item="${u.id}"]`);node.querySelector('.item-price').disabled=state.coins+1e-9<u.price;node.querySelector('.item-icon').setAttribute('aria-expanded',String(selectedItem===u.id))}
 setText($('itemCount'),String(state.upgrades.length));$('emptyShop').hidden=items.length>0;
 const u=items.find(u=>u.id===selectedItem);$('itemDetail').hidden=!u;
 if(u){setText($('itemName'),u.name);setText($('itemPrice'),number(u.price));setText($('itemDescription'),itemDescription(u));$('buyItem').disabled=state.coins+1e-9<u.price}
}
function updateShopClearArea(){const r=document.querySelector('.rate').getBoundingClientRect();$('shopDialog').style.setProperty('--shop-clear-top',`${r.bottom+10}px`)}
window.addEventListener('resize',updateShopClearArea);
function openShop(){return;updateShopClearArea();$('shopShade').hidden=false;document.querySelector('.phone').classList.add('shop-open');returnFocus=document.activeElement;selectedItem=null;$('shopDialog').showModal();render();$('closeShop').focus()}
function closeShop(){$('shopDialog').querySelectorAll('.purchased-item-flight').forEach(el=>{el.getAnimations().forEach(a=>a.cancel());el.remove()});$('shopDialog').close();$('shopShade').hidden=true;document.querySelector('.phone').classList.remove('shop-open');returnFocus?.focus()}
$('produce').addEventListener('click',produce);$('openShop').onclick=()=>notify('未开放');$('closeShop').onclick=closeShop;$('shopDialog').addEventListener('click',e=>{if(e.target===$('shopDialog')){const r=e.target.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)closeShop()}});
$('shopDialog').addEventListener('cancel',()=>returnFocus?.focus());
$('shopDialog').addEventListener('close',()=>{$('shopShade').hidden=true;document.querySelector('.phone').classList.remove('shop-open')});
$('sellCrate').addEventListener('click',sellAppleCrates);
$('buildings').addEventListener('click',e=>{const button=e.target.closest('.recruit-hit');if(!button||button.disabled)return;
 const el=button.closest('[data-building]');
 const i=+el.dataset.building;
 if(!buyBuilding(i))notify('金币不够');
});
function sizeUpgradeDialogs(){
 const box=document.querySelector('.phone').getBoundingClientRect();
 document.documentElement.style.setProperty('--upgrade-game-width',box.width+'px');
}
window.addEventListener('resize',sizeUpgradeDialogs);
function sizeUpgradeDialogs(){
 const box=document.querySelector('.phone').getBoundingClientRect();
 document.documentElement.style.setProperty('--upgrade-game-width',box.width+'px');
}
window.addEventListener('resize',sizeUpgradeDialogs);
const FARM_GOAL_LINES={};
function employeeCount(){return state.owned.reduce((sum,n)=>sum+n,0)}
const FARM_UPGRADE_LINES={growth:'农场发展壮大了！',facilities:'想继续强化农场，可以点击右上角，完善农场设施。'};
function updateFarmGoalGuide(dt){
 if(state.phase!=='operation'||state.farmUpgradeGuide==='done')return;
 state.farmUpgradeGuideTime+=dt;
 if(state.farmUpgradeGuideTime>=4){
  state.farmUpgradeGuide=state.farmUpgradeGuide==='growth'?'facilities':'done';state.farmUpgradeGuideTime=0;
  if(FARM_UPGRADE_LINES[state.farmUpgradeGuide])speakTutorial(FARM_UPGRADE_LINES[state.farmUpgradeGuide]);else resetPurchaseSpeech();save();
 }
}
function renderNewFarmDialog(){
 if(!$('newFarmDialog').open)return;
 const current=baseCps();
 const format=n=>n>=1000?productionNumber(n):Number(n.toPrecision(6)).toString();
 $('farmCurrentCps').textContent=format(current)+' /s';
 $('farmInheritedCps').textContent=format(current*.1)+' /s';
}
let choosingAfterRecruitGoal=false;
function openNewFarmDialog(fromRecruitGoal=false){
 if(employeeCount()<5)return;
 if($('factoryUpgradeDialog').open)$('factoryUpgradeDialog').close();
 choosingAfterRecruitGoal=fromRecruitGoal;
 setText($('newFarmTitle'),fromRecruitGoal?'达成目标了！':'开设新农场');
 setText($('goalContinue'),fromRecruitGoal?'升级这座农场':'继续经营');
 $('recruitGoalIntro').hidden=!fromRecruitGoal;
 $('newFarmContinueHint').hidden=fromRecruitGoal;
 $('newFarmEntryHint').hidden=fromRecruitGoal;
 $('goalUnavailable').hidden=true;
 if(!$('newFarmDialog').open)$('newFarmDialog').showModal();
 renderNewFarmDialog();
}
$('closeNewFarm').onclick=()=> $('newFarmDialog').close();
$('confirmNewFarm').onclick=()=>{$('goalUnavailable').hidden=false};
let recruitGoalWasComplete=false,recruitGoalPulseUntil=0;
function renderRecruitGoal(){
 const continuing=state.recruitGoalChoice==='continue',count=Math.min(5,employeeCount());
 const complete=count>=5,now=performance.now();
 if(complete&&!recruitGoalWasComplete){
  recruitGoalPulseUntil=now+3000;
  if(!continuing&&!state.newFarmPromptShown){state.newFarmPromptShown=true;save();speakTutorial('5名鱼人已到岗！点击「达成目标了！」选择接下来要做的事。')}
 }
 recruitGoalWasComplete=complete;
 $('recruitGoal').hidden=continuing;$('factoryEntry').disabled=!continuing;
 $('recruitGoalActions').hidden=count<5;
 $('goalNewFarm').classList.toggle('goal-next-pulse',complete&&!continuing&&now<recruitGoalPulseUntil);
 $('recruitGoalFill').style.width=count/5*100+'%';setText($('recruitGoalLabel'),`${count}/5`);
 $('recruitGoalTrack').setAttribute('aria-valuenow',String(count));
}
$('goalNewFarm').onclick=()=>openNewFarmDialog(true);
$('goalContinue').onclick=()=>{
 if(employeeCount()<5)return;
 $('newFarmDialog').close();
 if(state.recruitGoalChoice==='continue')return;
 const session=state,goal=$('recruitGoal'),clone=goal.cloneNode(true),hud=goal.parentNode;
 state.recruitGoalChoice='continue';$('goalUnavailable').hidden=true;save();render();
 if(!matchMedia('(prefers-reduced-motion: reduce)').matches){
  clone.removeAttribute('id');clone.querySelectorAll('[id]').forEach(el=>el.removeAttribute('id'));clone.setAttribute('aria-hidden','true');clone.inert=true;clone.style.cssText='position:absolute;inset:0 auto auto 0;width:100%;pointer-events:none';hud.append(clone);
  const exit=clone.animate([{transform:'translateX(0)',opacity:1},{transform:'translateX(115%)',opacity:0}],{duration:260,easing:'ease-in',fill:'forwards'});exit.finished.then(()=>clone.remove(),()=>clone.remove());
 }
 if(state===session){state.recruitGoalGuide='done';setTutorialStep('closing')}
 if(choosingAfterRecruitGoal)openFactoryUpgradeDialog();
};
function renderFactoryLevelEffect(purchase,target){
 const signature=purchase.level+':'+purchase.items.map(item=>item.id).join(',');
 if(target.dataset.effectSignature===signature)return;
 target.dataset.effectSignature=signature;
 const effect=document.createElement('span');
 effect.className='upgrade-key-effect';
 effect.textContent=t(purchase.level===2?'解锁苹果汁生产线':'解锁苹果电脑生产线');
 const descriptions=purchase.items.map(item=>itemDescription(item).split('；'));
 const counts=new Map();
 for(const lines of descriptions)for(const line of lines)counts.set(line,(counts.get(line)||0)+1);
 for(const [line,count] of counts){
  const detail=document.createElement('span');
  detail.className='upgrade-click-effect';
  detail.textContent=t(line).replace(/ ×2$/, ' ×'+2**count);
  effect.append(detail);
 }
 target.replaceChildren(effect);
}
function renderFactoryUpgrade(){
 renderRecruitGoal();renderNewFarmDialog();
 const stage=farmStage(),levelingUp=stage<3;
 const next=state.phase==='operation'?nextFarmPurchase():null;
 const title=levelingUp?'升级农场':'农场等级';
 const entry=$('factoryEntry'),quick=$('quickFactoryUpgrade');
 entry.setAttribute('aria-label',t(title));
 setText($('factoryProgressLabel'),`Lv.${stage}`);
 entry.querySelector('.level-plus').hidden=!levelingUp;
 entry.style.setProperty('--level-progress','0%');
 const canAfford=!!next&&state.coins+1e-9>=next.price;
 quick.hidden=!next||employeeCount()<5;
 quick.disabled=entry.disabled||quick.hidden||!canAfford;
 entry.classList.toggle('level-up-ready',levelingUp&&!quick.disabled);
 setText($('quickFactoryPrice'),next?number(next.price):'已完成');quick.querySelector('img').hidden=!next;
 quick.setAttribute('aria-label',next?t(`${title}，${number(next.price)}金币`):t('全部升级已完成'));
 if(!$('factoryUpgradeDialog').open)return;
 $('openNewFactory').hidden=false;
 setText($('factoryStageTitle'),title);
 setText($('factoryStageProgress'),next?`Lv.${stage} → Lv.${next.level}`:`Lv.${stage}`);
 $('factoryNext').hidden=!next;$('factoryComplete').hidden=!!next;
 if(!next)return;
 renderFactoryLevelEffect(next,$('factoryNextEffect'));
 setText($('factoryNextPrice'),number(next.price));
 $('confirmFactoryUpgrade').disabled=!canAfford;setText($('confirmFactoryUpgrade'),canAfford?'升级':'金币不足');
}
function openFactoryUpgradeDialog(){
 if(state.phase!=='operation')return;
 sizeUpgradeDialogs();
 $('newFactoryNotice').hidden=true;
 $('factoryUpgradeDialog').showModal();
 renderFactoryUpgrade();
}
$('factoryEntry').onclick=openFactoryUpgradeDialog;
$('openNewFactory').onclick=()=>openNewFarmDialog();
$('closeFactoryUpgrade').onclick=()=> $('factoryUpgradeDialog').close();
function performFactoryUpgrade(){
 if(state.phase!=='operation'||state.recruitGoalChoice!=='continue')return false;
 const next=nextFarmPurchase();
 if(!next||!spendCoins(next.price))return false;
 state.upgrades.push(...next.items.map(item=>item.id));
 if(next.level===2){
  state.firstUpgradeAcknowledged=true;
  state.farmUpgradeGuide='growth';state.farmUpgradeGuideTime=0;
  if(state.milestoneTimes.firstFarmUpgrade===null)state.milestoneTimes.firstFarmUpgrade=state.playSeconds;
 }else{
  state.farmUpgradeGuide='done';
 }
 $('factoryUpgradeDialog').close();
 if($('shopDialog').open)closeShop();
 const kingBonus=state.owned[3]*kingUpgradeBonus();
 if(kingBonus){state.coins+=kingBonus;state.earnedCoins+=kingBonus;playCashRegisterSound()}
 syncRecruitGains();save();render();
 const message=t('升级成功');
 notify(kingBonus?`${message} · ${t('国王鱼人奖励')} +${number(kingBonus)} ${t('金币')}`:message,true);
 if(state.tutorial==='closing'){
  clearTutorialFlights();
  setTutorialStep('done');
 }
 showFarmRebuildDust(next.level);
 if(next.level===2)speakTutorial(FARM_UPGRADE_LINES.growth);
 else{resetPurchaseSpeech();talkOnce()}
 return true;
}
$('quickFactoryUpgrade').onclick=performFactoryUpgrade;
$('confirmFactoryUpgrade').onclick=performFactoryUpgrade;
$('upgrades').addEventListener('click',e=>{const icon=e.target.closest('[data-inspect]');if(icon){selectedItem=selectedItem===icon.dataset.inspect?null:icon.dataset.inspect;renderVending();return}const b=e.target.closest('[data-upgrade]');if(b&&!b.disabled)buyUpgrade(b.dataset.upgrade)});
$('buyItem').onclick=()=>{if(selectedItem)buyUpgrade(selectedItem)};
let wardrobeOpen=false,wardrobeMode='single',wardrobeSelected=null,wardrobeGridCategory=null,wardrobeInitTimer;
const wardrobeItemKey=(category,id)=>category+':'+(id??'default');
function initializeCharacterWardrobe(attempt=0){
 clearTimeout(wardrobeInitTimer);
 const fish=document.querySelector('.fish-character')?.contentWindow;
 if(!fish?.characterWardrobeReady?.()){
  if(attempt<100)wardrobeInitTimer=setTimeout(()=>initializeCharacterWardrobe(attempt+1),50);
  return;
 }
 fish.document.body.classList.toggle('wardrobe-preview',wardrobeOpen);
 state.outfit=fish.restoreCharacterOutfit(state.outfit||{skin:'milk-frog',helmet:null});renderWardrobe();
}
function renderWardrobe(){
 const category=wardrobeMode,groups=WARDROBE_CATEGORIES.filter(g=>category==='suit'?g.id==='suit':g.id!=='suit');
 document.querySelectorAll('[data-wardrobe-mode]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.wardrobeMode===wardrobeMode)));
 if(wardrobeGridCategory!==category){
  wardrobeGridCategory=category;
  const sections=groups.map(group=>{
   const section=document.createElement('section');section.className='wardrobe-group';section.dataset.clothingCategory=group.id;
   const title=document.createElement('h3');title.textContent=group.name;section.append(title);
   const grid=document.createElement('div');grid.className='wardrobe-group-grid';
   for(const item of group.items){
    const button=document.createElement('button');button.type='button';button.className='wardrobe-item';button.dataset.wardrobeItem=wardrobeItemKey(group.id,item.id);button.dataset.garmentCategory=group.id;button.dataset.garmentId=item.id??'';
    button.setAttribute('aria-label',item.name);button.setAttribute('aria-pressed','false');
    const img=document.createElement('img');img.src=item.icon;img.alt='';img.draggable=false;button.append(img);grid.append(button);
   }
   section.append(grid);return section;
  });
  $('wardrobeSlots').replaceChildren(...sections);
 }
 const outfit=state.outfit||{skin:'milk-frog',helmet:null};
 $('wardrobeSlots').querySelectorAll('[data-wardrobe-item]').forEach(button=>{
  const id=button.dataset.garmentId||null,wearing=(outfit[button.dataset.garmentCategory]??null)===id;
  button.classList.toggle('wearing',wearing);button.classList.toggle('selected',button.dataset.wardrobeItem===wardrobeSelected);
  button.setAttribute('aria-pressed',String(wearing));
 });
}
$('wardrobeSlots').addEventListener('click',e=>{
 const button=e.target.closest('[data-wardrobe-item]');if(!button)return;
 const fish=document.querySelector('.fish-character')?.contentWindow;if(!fish?.characterWardrobeReady?.())return;
 wardrobeSelected=button.dataset.wardrobeItem;
 state.outfit=fish.toggleCharacterGarment(button.dataset.garmentCategory,button.dataset.garmentId||null);
 save();renderWardrobe();
});
$('clearWardrobe').onclick=()=>{
 const fish=document.querySelector('.fish-character')?.contentWindow;if(!fish?.characterWardrobeReady?.())return;
 const skin=fish.getCharacterOutfit().skin;
 state.outfit=fish.restoreCharacterOutfit({skin});wardrobeSelected=null;save();renderWardrobe();
};
document.querySelectorAll('[data-wardrobe-mode]').forEach(button=>button.onclick=()=>{
 wardrobeMode=button.dataset.wardrobeMode;$('wardrobeScroll').scrollTop=0;renderWardrobe();
});
renderWardrobe();initializeCharacterWardrobe();
function showWardrobe(open){
 wardrobeOpen=open;document.querySelector('.phone').classList.toggle('wardrobe-open',open);
 $('wardrobeView').hidden=!open;$('wardrobeView').setAttribute('aria-hidden',String(!open));
 const fish=document.querySelector('.fish-character')?.contentWindow;if(fish?.document?.body)fish.document.body.classList.toggle('wardrobe-preview',open);
 if(open)renderWardrobe();
 if(open)$('wardrobeBack').focus({preventScroll:true});else $('openGacha').focus({preventScroll:true});
}
$('openGacha').onclick=()=>showWardrobe(true);
$('wardrobeBack').onclick=()=>showWardrobe(false);
$('wardrobeGacha').onclick=()=>notify('扭蛋机 · 功能准备中');
$('wardrobeOutdoor').onclick=()=>notify('未开放');
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&wardrobeOpen&&!document.querySelector('dialog[open]'))showWardrobe(false)});
document.querySelectorAll('.placeholder').forEach(b=>b.onclick=()=>notify('这个功能稍后开放'));

$('restart').onclick=()=>{if(!confirm(t('确定重新开始？当前苹果、金币、鱼人和升级进度将被清空。')))return;clearConstructionFlights();clearTutorialFlights();state=fresh();if(wardrobeOpen)showWardrobe(false);document.querySelectorAll('dialog[open]').forEach(d=>d.close());initializeCharacterWardrobe();displayed=0;workerQueue=[];rateDeferred=0;rateRoll=0;rateFlights=0;resetPurchaseSpeech();resetConstructionGuide();save();$('fx').replaceChildren();$('frenzyGlowLayer').replaceChildren();selectedItem=null;render();notify('新农场已开工')};
// Reuse each exported Figma asset for both the scene and its stage bubble.
const constructionBaseMarkup=$('constructionScene').querySelector('[data-build-step="0"]')?.innerHTML;
function constructionImages(part){
 if(part.step===0&&constructionBaseMarkup)return constructionBaseMarkup;
 return part.images.map(img=>`<image href="${img.src}" x="${img.mirror?0:img.x}" y="${img.mirror?0:img.y}" width="${img.width}" height="${img.height}"${img.mirror?` transform="translate(${img.x} ${img.y}) scale(-1 1)"`:''}/>`).join('');
}
function setupConstructionArtwork(){
 const art=FACTORY_BUILD_ART,scene=$('constructionScene');
 scene.setAttribute('width',art.width);scene.setAttribute('height',art.height);scene.setAttribute('viewBox',`0 0 ${art.width} ${art.height}`);
 scene.innerHTML=art.paintOrder.map(step=>{const part=art.parts.find(p=>p.step===step);return `<g data-build-step="${step}" data-figma-node="${part.node}" class="${step?'build-part':'build-base'}">${constructionImages(part)}</g>`}).join('');
}
function renderConstruction(){
 const construction=state.phase!=='operation';
 document.querySelector('.phone').classList.toggle('construction-phase',construction);
 $('constructionPanel').hidden=!construction;
 document.querySelectorAll('#testLucky,#testGolden,#testApples,#spawnGrid button').forEach(button=>button.disabled=construction);
 if(!construction)return;
 FACTORY_BUILD_ART.parts.forEach(part=>{if(part.step)$('constructionScene').querySelector(`[data-build-step="${part.step}"]`).classList.toggle('is-built',state.buildClicks>=part.threshold)});
 setText($('buildFactoryLabel'),state.buildClicks===0?'开始建造农场！':'建造农场');
 $('buildFactory').disabled=state.phase==='ready'||state.buildClicks+constructionFlights.size>=BUILD_CLICKS_REQUIRED;
}
const constructionFlights=new Set();
const constructionDust=new Set();
let constructionDustId=0;
function showConstructionDust(x,y,kind='normal',sizeOverride=null){
 if(matchMedia('(prefers-reduced-motion: reduce)').matches)return
 const scale=document.querySelector('.phone').clientWidth/390;
 const outer=kind==='renovationOuter',renovating=kind==='renovation'||outer,completed=kind==='final',partDone=kind==='part',size=sizeOverride??(outer?2.1:renovating?1.4:completed?1.5:partDone?1.2:.9);
 const dust=document.createElement('div');dust.className='construction-dust';dust.setAttribute('aria-hidden','true');dust.style.cssText=`left:${x}px;top:${y}px;--smoke-size:${112*scale*size}px;--smoke-drift:${(Math.random()-.5)*12*scale}px`;
 const id='construction-cloud-'+(++constructionDustId);
 // Each independently drifting cloud is a connected cluster of round lobes.
 const count=outer?4+Math.floor(Math.random()*3):renovating?3+Math.floor(Math.random()*2):completed?10+Math.floor(Math.random()*6):partDone?6+Math.floor(Math.random()*5):2+Math.floor(Math.random()*4),rotation=Math.random()*Math.PI*2;
 const nearby=Math.min(count,2+Math.floor(Math.random()*2));
 dust.dataset.kind=kind;dust.dataset.clouds=String(count);
 const cluster=(x,y,dx,dy,small=false)=>{
  const duration=.85+Math.random()*.65,delay=Math.random()*.12,lobes=small?2:3+Math.floor(Math.random()*3);
  const body=Array.from({length:lobes},(_,i)=>{
   const a=i/lobes*Math.PI*2,r=small?2+Math.random()*1.5:6+Math.random()*3,offset=small?1.5:4+Math.random()*2;
   return `<circle cx="${Math.cos(a)*offset}" cy="${Math.sin(a)*offset*.8}" r="${r}"><animate attributeName="r" from="${r*.8}" to="${r*1.2}" begin="${delay}s" dur="${duration}s" fill="freeze"/></circle>`;
  }).join('');
  return `<g class="construction-smoke-cluster" transform="translate(${x} ${y})" opacity="0"><animateTransform attributeName="transform" type="translate" from="${x} ${y}" to="${x+dx} ${y+dy}" begin="${delay}s" dur="${duration}s" calcMode="spline" keyTimes="0;1" keySplines=".15 .4 .55 1" fill="freeze"/><animate attributeName="opacity" values="0;.9;.7;0" keyTimes="0;.12;.55;1" begin="${delay}s" dur="${duration}s" fill="freeze"/>${body}</g>`;
 };
 let circles=Array.from({length:count},(_,i)=>{
  const angle=i<nearby?rotation+(i-(nearby-1)/2)*(.2+Math.random()*.2):Math.random()*Math.PI*2,spread=renovating?10+Math.random()*8:i<nearby?21+Math.random()*6:18+Math.random()*20,distance=renovating?12+Math.random()*8:12+Math.random()*27;
  return cluster(Math.cos(angle)*spread,Math.sin(angle)*spread*.7,Math.cos(angle)*distance,Math.sin(angle)*distance*.7-3-Math.random()*6);
 }).join('');
 for(let i=0,n=renovating?0:Math.floor(Math.random()*3);i<n;i++)circles+=cluster((Math.random()-.5)*8,(Math.random()-.5)*5,(Math.random()-.5)*12,-6-Math.random()*8,true);

 dust.innerHTML=`<svg class="construction-smoke" viewBox="-65 -65 130 130" overflow="visible"><defs><filter id="${id}" x="-50%" y="-50%" width="200%" height="200%" color-interpolation-filters="sRGB"><feMorphology in="SourceAlpha" operator="dilate" radius="${.65*.9/size}" result="edge"/><feFlood flood-color="#a5a5a5"/><feComposite in2="edge" operator="in"/><feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs><g fill="#fafafa" filter="url(#${id})">${circles}</g></svg>`;
 document.body.append(dust);const effect={element:dust,timer:null};constructionDust.add(effect);
 effect.timer=setTimeout(()=>{dust.remove();constructionDust.delete(effect)},1750);
}

function showFarmRebuildDust(stage=2){
 if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;
 const computer=stage===3;
 const art=(computer?document.querySelector('.phone'):$('factoryArt')).getBoundingClientRect();
 const scaleX=art.width/(computer?402:FACTORY_BUILD_ART.width);
 const scaleY=computer?art.height/874:scaleX;
 // The computer factory points follow the machinery and assembly line in the scene SVG.
 const targets=computer?[[45,245],[200,225],[356,245],[200,305],[200,350],[200,413],[200,485]]:
  [[104,86],...FACTORY_BUILD_ART.parts.filter(p=>p.step>0).map(p=>{const [x,y,w,h]=p.bounds;return [x+w/2,y+h/2]})];
 const perimeter=computer?[[49,205],[128,222],[260,222],[355,270],[143,369],[265,417],[265,500]]:
  [[60,55],[100,35],[140,60],[55,115],[90,145],[145,155],[195,140]];
 targets.forEach(([x,y],i)=>showConstructionDust(art.left+x*scaleX,art.top+y*scaleY,'renovation',[.75,1.1,1.35][i%3]*(.9+Math.random()*.2)));
 perimeter.forEach(([x,y],i)=>showConstructionDust(art.left+x*scaleX,art.top+y*scaleY,'renovationOuter',[2,.9,1.65,.75,1.9,1,1.55][i]*(.9+Math.random()*.2)));
}
function clearConstructionFlights(){for(const effect of constructionDust){clearTimeout(effect.timer);effect.element.remove()}constructionDust.clear();for(const flight of constructionFlights){flight.cancelled=true;flight.animation?.cancel();flight.image.remove()}constructionFlights.clear()}
function buildFactory(){
 if(state.phase!=='construction')return;
 if(state.buildClicks+constructionFlights.size>=BUILD_CLICKS_REQUIRED)return;
 const session=state,button=$('buildFactory'),source=button.querySelector('img').getBoundingClientRect();
 const targetClick=state.buildClicks+constructionFlights.size+1;
 const parts=FACTORY_BUILD_ART.parts.filter(part=>part.step>0&&part.threshold===targetClick);
 if(!parts.length)return;
 const scene=$('constructionScene').getBoundingClientRect(),scale=scene.width/FACTORY_BUILD_ART.width;
 const bounds=parts.map(part=>part.bounds),left=Math.min(...bounds.map(([x])=>x)),top=Math.min(...bounds.map(([,y])=>y)),right=Math.max(...bounds.map(([x,,w])=>x+w)),bottom=Math.max(...bounds.map(([,y,,h])=>y+h));
 const image=document.createElement('img');image.src='img/svg/setting.svg';image.className='construction-gear-flight';image.alt='';image.setAttribute('aria-hidden','true');
 const size=source.width,startX=source.left+source.width/2,startY=source.top+source.height/2;
 const endX=scene.left+(left+right)/2*scale,endY=scene.top+(top+bottom)/2*scale;
 image.style.cssText=`left:${startX-size/2}px;top:${startY-size/2}px;width:${size}px;height:${size}px`;
 document.body.append(image);const flight={image,animation:null,cancelled:false};constructionFlights.add(flight);
 const arrive=()=>{
  image.remove();constructionFlights.delete(flight);
  if(flight.cancelled||state!==session||state.phase!=='construction')return;
  state.buildClicks=Math.min(BUILD_CLICKS_REQUIRED,state.buildClicks+1);
  for(const [x,y,w,h] of bounds)showConstructionDust(scene.left+(x+w/2)*scale,scene.top+(y+h/2)*scale,'part');
  playPopSound();
  if(state.buildClicks>=BUILD_CLICKS_REQUIRED){
   showConstructionDust(scene.left+112*scale,scene.top+80*scale,'final');state.phase='ready';
  }
  save();render();updateConstructionGuide(0);
  if(!matchMedia('(prefers-reduced-motion: reduce)').matches){
   for(const part of parts)$('constructionScene').querySelector(`[data-build-step="${part.step}"]`).animate([{transform:'scale(1)'},{transform:'scale(1.025)'},{transform:'scale(1)'}],{duration:180});
  }
  if(state.phase==='ready')showConstructionComplete();
 };
 if(matchMedia('(prefers-reduced-motion: reduce)').matches){arrive();return}
 button.animate([{transform:'scale(.97)'},{transform:'scale(1)'}],{duration:130});
 flight.animation=image.animate([
  {transform:'translate(0,0) scale(1) rotate(0deg)',opacity:1},
  {transform:`translate(${(endX-startX)*.35-18}px,${(endY-startY)*.55}px) scale(.85) rotate(100deg)`,opacity:1,offset:.5},
  {transform:`translate(${endX-startX}px,${endY-startY}px) scale(.3) rotate(220deg)`,opacity:.3}
 ],{duration:430,easing:'cubic-bezier(.3,.1,.5,1)',fill:'forwards'});
 flight.animation.finished.then(arrive,()=>{});
 renderConstruction();
}
function startOperation(){
 if(state.phase!=='ready')return;
 const artwork=$('factoryArt'),previous=artwork.getBoundingClientRect();
 clearTimeout(toastTimer);$('toast').classList.remove('show');
 if(state.milestoneTimes.construction===null)state.milestoneTimes.construction=state.playSeconds;
 resetPurchaseSpeech();state.tutorial='start';state.tutorialTime=0;state.phase='operation';state.buildClicks=BUILD_CLICKS_REQUIRED;state.operationSeconds=0;state.guaranteedGold=freshGuaranteedGold();state.events=freshEvents();
 save();render();
 if(!matchMedia('(prefers-reduced-motion: reduce)').matches){
  const current=artwork.getBoundingClientRect();artwork.getAnimations().forEach(a=>a.cancel());
  const move=artwork.animate([{transform:`translate(${previous.left-current.left}px,${previous.top-current.top}px)`},{transform:'translate(0,0)'}],{duration:650,easing:'cubic-bezier(.2,.8,.3,1)'});move.id='factory-phase-transition';
 }
 speakTutorial(TUTORIAL_LINES.start);
}
function showConstructionComplete(){startOperation()}
$('constructionCompleteDialog').addEventListener('cancel',e=>e.preventDefault());
$('beginOperation').onclick=()=>{$('constructionCompleteDialog').close();startOperation()};
$('buildFactory').onclick=buildFactory;
// Preserve each animation's position when Fever starts or ends.
const feverAnimations=new Map();
const feverSvgRoots=new Set();
function syncFeverAnimationSpeed(dt){
 if(state.events.frenzy<=0){
  for(const [animation,rate] of feverAnimations)animation.updatePlaybackRate(rate);
  feverAnimations.clear();
  for(const root of feverSvgRoots)root.unpauseAnimations();
  feverSvgRoots.clear();
  return;
 }

 const juiceDocument=juiceScene.contentDocument;
 const documents=[document,juiceDocument,
  ...computerFactoryArt.map(art=>art.contentDocument),
  document.querySelector('.fish-character').contentDocument];
 for(const scene of documents){
  for(const animation of scene?.getAnimations?.()||[]){
   if(feverAnimations.has(animation)||animation.playState==='finished')continue;
   const rate=animation.playbackRate;
   feverAnimations.set(animation,rate);
   animation.updatePlaybackRate(rate*FEVER_ANIMATION_RATE);
  }
 }

 // The juice pipe and rebuild smoke use native SVG animation timelines.
 const roots=[juiceDocument?.documentElement,
  ...Array.from(constructionDust,({element})=>element.firstElementChild)];
 for(const root of roots){
  if(typeof root?.pauseAnimations!=='function')continue;
  if(!feverSvgRoots.has(root)){
   root.pauseAnimations();
   feverSvgRoots.add(root);
  }else if(dt>0){
   root.setCurrentTime(root.getCurrentTime()+dt*FEVER_ANIMATION_RATE);
  }
 }
}
function update(dt){
 const feverTime=Math.min(dt,state.events.frenzy);
 const animationDt=dt+(FEVER_ANIMATION_RATE-1)*feverTime;
 state.playSeconds+=dt;
 updateConstructionGuide(dt);updateTutorial(dt);updateFarmGoalGuide(dt);driveTalk(animationDt);
 if(state.phase==='operation'){
  if(state.owned[4]>0){
   state.autoSellTime+=dt;
   const interval=autoSellInterval();
   if(state.autoSellTime>=interval){state.autoSellTime%=interval;sellAppleCrates()}
  }
  state.operationSeconds+=dt;balancePaintClock+=dt;const span=dt+6*feverTime;
  earn(baseCps()*span);updateFrenzy(dt);updateGuaranteedGold(dt);if(!tutorialActive())updateEvents(dt);updateGoldRain(animationDt);driveGoldenDance(animationDt);driveWorkers(animationDt);driveRateRoll(animationDt);
  displayed+=(state.apples-displayed)*(1-Math.exp(-animationDt*14));if(Math.abs(state.apples-displayed)<.05)displayed=state.apples;
 }
 saveClock+=dt;if(saveClock>=2){saveClock=0;save()}render();
 syncFeverAnimationSpeed(dt);
}
// A first rAF timestamp can precede script initialization. Never advance backwards.
function frame(now){const dt=last===null?0:Math.max(0,Math.min((now-last)/1000,.25));last=now;if(!document.hidden)update(dt);requestAnimationFrame(frame)}
document.addEventListener('visibilitychange',()=>{last=null;save()});window.addEventListener('pagehide',save);
window.advanceTime=ms=>{for(let left=ms;left>0;left-=50)update(Math.min(left,50)/1000)};
window.render_game_to_text=()=>JSON.stringify({version:'1.0.160',language:GameI18n.language,phase:state.phase,construction:constructionProgress(),tutorial:state.tutorial,introRecruit:state.introRecruit,apples:state.apples,coins:state.coins,earnedCoins:state.earnedCoins,farmStage:farmStage(),juiceStartupTaps:state.juiceStartupTaps,computerStartupTaps:state.computerStartupTaps,factorySaleReady:factorySaleReady(),crateSize:currentCrateSize(),juiceBottles:sellingJuice()?Math.floor(state.apples):0,juiceCratePacked,firstCrateSize:FIRST_APPLE_CRATE_SIZE,total:state.total,soldApples:state.soldApples,playSeconds:state.playSeconds,milestoneTimes:state.milestoneTimes,operationSeconds:state.operationSeconds,guaranteedGold:state.guaranteedGold,factory:{...factoryProgress(),initialUpgradeCount:initialFarmCount(),firstUpgradeAcknowledged:state.firstUpgradeAcknowledged,enhancementLevel:Math.max(1,state.upgrades.length-2)},recruitGoal:{count:employeeCount(),choice:state.recruitGoalChoice,guide:state.recruitGoalGuide},events:state.events,globalMultiplier:upgradeEffects().global,roleEffects:{farmerApplesPerTap:state.owned[1]*farmerTapBonus(),chefCoinsPerCrate:state.owned[2]*chefCrateBonus(),autoSellInterval:state.owned[4]>0?autoSellInterval():null,kingCoinsPerUpgrade:state.owned[3]*kingUpgradeBonus()},cps:cps(),clickPower:clickPower(),buildings:RECRUITABLE_BUILDING_IDS.map(i=>{const b=BUILDINGS[i],unlock=RECRUIT_UNLOCKS[i];return {name:b.name,owned:state.owned[i],price:buildingCost(i),visible:visible(i),unlockConditionRevealed:!!unlock,unlockProgress:unlock?Math.min(unlock.value(),unlock.target):null,unlockTarget:unlock?.target??null}}),upgrades:state.upgrades,nextUpgrade:nextFarmPurchase()?.items[0]?.id||null,wardrobeOpen,outfit:state.outfit,constructionGuide:$('purchaseSpeech').hidden?null:$('speechMeasure').textContent,constructionCompleteOpen:$('constructionCompleteDialog').open,factoryUpgradeOpen:$('factoryUpgradeDialog').open});
const produceArt=document.querySelector('.produce-visual');
setActionArt(produceArt,produceArt.firstElementChild.getAttribute('src'));
setupConstructionArtwork();render();if(state.phase==='ready')showConstructionComplete();else resumeTutorial();if(FARM_UPGRADE_LINES[state.farmUpgradeGuide])speakTutorial(FARM_UPGRADE_LINES[state.farmUpgradeGuide]);if(!tutorialActive()&&FARM_GOAL_LINES[state.recruitGoalGuide])speakTutorial(FARM_GOAL_LINES[state.recruitGoalGuide]);requestAnimationFrame(frame);
// Commit the initial normal/buffed state before enabling color transitions.
requestAnimationFrame(()=>requestAnimationFrame(()=>document.documentElement.classList.remove('game-booting')));

// Decorative assets must never initiate the browser's native image drag.
document.addEventListener('dragstart',event=>{if(event.target instanceof HTMLImageElement)event.preventDefault()});
document.querySelectorAll('img').forEach(img=>img.draggable=false);

document.addEventListener('selectstart',event=>event.preventDefault());
document.addEventListener('contextmenu',event=>event.preventDefault());

// Item catalogue (DEMO): every upgrade in the game, cheapest first, with the
// same effect definitions as the factory reinforcement window. Display only — nothing is for sale
// here, and owning one only changes how its tile reads.
const CATALOG=[...UPGRADES].sort((a,b)=>a.price-b.price);
let catalogItem=null;
function renderCatalog(){
 if(!$('catalogDialog').open)return;
 setText($('catalogTotal'),number(CATALOG.length));
 setText($('catalogOwned'),number(state.upgrades.length));
 for(const node of $('catalogGrid').children){
  node.classList.toggle('owned',state.upgrades.includes(node.dataset.item));
  node.setAttribute('aria-expanded',String(catalogItem===node.dataset.item));
 }
 const u=CATALOG.find(u=>u.id===catalogItem);
 $('catalogDetail').hidden=!u;
 if(u){setText($('catalogName'),u.name);setText($('catalogPrice'),number(u.price));
  setText($('catalogDescription'),itemDescription(u));
  const owned=state.upgrades.includes(u.id);
  setText($('catalogUnlock'),'按价格顺序升级，无需解锁');
  $('catalogUnlock').classList.add('met');
  const status=$('catalogStatus');
  setText(status,owned?'已拥有':'在农场升级');
  status.dataset.state=owned?'owned':'open'}
}
function buildCatalog(){
 if($('catalogGrid').children.length)return;
 $('catalogGrid').replaceChildren(...CATALOG.map(u=>{
  const entry=document.createElement('button');
  entry.type='button';entry.className='catalog-item';entry.dataset.item=u.id;
  entry.setAttribute('aria-label',`${u.name}，${number(u.price)}金币，查看介绍`);
  entry.setAttribute('aria-controls','catalogDetail');
  const img=document.createElement('img');img.src=itemIcon(u.id);img.alt='';img.draggable=false;
  const price=document.createElement('span');price.className='catalog-item-price';
  price.innerHTML='<img src="img/svg/apple.svg" alt=""><b></b>';
  price.querySelector('b').textContent=number(u.price);
  entry.append(img,price);
  return entry;
 }));
}
function openCatalog(){buildCatalog();catalogItem=null;returnFocus=document.activeElement;$('catalogDialog').showModal();renderCatalog();$('closeCatalog').focus()}
function closeCatalog(){$('catalogDialog').close();returnFocus?.focus()}

$('closeCatalog').onclick=closeCatalog;
$('catalogDialog').addEventListener('cancel',()=>returnFocus?.focus());
$('catalogGrid').addEventListener('click',event=>{
 const entry=event.target.closest('[data-item]');if(!entry)return;
 catalogItem=catalogItem===entry.dataset.item?null:entry.dataset.item;
 renderCatalog();
});

$('languageSwitch').onclick=()=>{save();GameI18n.switchLanguage()};
