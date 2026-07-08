// ===== 基本常數 =====
const STEMS = "甲乙丙丁戊己庚辛壬癸".split("");
const BRANCHES = "子丑寅卯辰巳午未申酉戌亥".split("");
const GZ60 = Array.from({length:60}, (_,i)=>STEMS[i%10]+BRANCHES[i%12]);
const PALACE_ORDER = ["巽","離","坤","震","中","兌","艮","坎","乾"];
const RING = ["坎","艮","震","巽","離","坤","兌","乾"];
const PALACE_NUM = {"坎":1,"坤":2,"震":3,"巽":4,"中":5,"乾":6,"兌":7,"艮":8,"離":9};
const NUM_PALACE = {1:"坎",2:"坤",3:"震",4:"巽",5:"中",6:"乾",7:"兌",8:"艮",9:"離"};
const PALACE_DIR = {"坎":"北方","坤":"西南方","震":"東方","巽":"東南方","中":"中央","乾":"西北方","兌":"西方","艮":"東北方","離":"南方"};
const PALACE_ELEM = {"坎":"水","坤":"土","震":"木","巽":"木","中":"土","乾":"金","兌":"金","艮":"土","離":"火"};
const STAR_ORIGIN = {"坎":"天蓬","艮":"天任","震":"天沖","巽":"天輔","離":"天英","坤":"天芮","兌":"天柱","乾":"天心"};
const DOOR_ORIGIN = {"坎":"休門","艮":"生門","震":"傷門","巽":"杜門","離":"景門","坤":"死門","兌":"驚門","乾":"開門"};
const GROUND_STEMS = ["戊","己","庚","辛","壬","癸","丁","丙","乙"];
const GOD_ORDER = ["值符","螣蛇","太陰","六合","白虎","玄武","九地","九天"];
const HOUR_START_STEM = {"甲":"甲","己":"甲","乙":"丙","庚":"丙","丙":"戊","辛":"戊","丁":"庚","壬":"庚","戊":"壬","癸":"壬"};
const MONTH_START_STEM = {"甲":"丙","己":"丙","乙":"戊","庚":"戊","丙":"庚","辛":"庚","丁":"壬","壬":"壬","戊":"甲","癸":"甲"};
const MONTH_JIE = [
  {name:"立春",m:2,d:4,branch:"寅",idx:0},{name:"驚蟄",m:3,d:6,branch:"卯",idx:1},{name:"清明",m:4,d:5,branch:"辰",idx:2},
  {name:"立夏",m:5,d:6,branch:"巳",idx:3},{name:"芒種",m:6,d:6,branch:"午",idx:4},{name:"小暑",m:7,d:7,branch:"未",idx:5},
  {name:"立秋",m:8,d:8,branch:"申",idx:6},{name:"白露",m:9,d:8,branch:"酉",idx:7},{name:"寒露",m:10,d:8,branch:"戌",idx:8},
  {name:"立冬",m:11,d:7,branch:"亥",idx:9},{name:"大雪",m:12,d:7,branch:"子",idx:10},{name:"小寒",m:1,d:6,branch:"丑",idx:11}
];
const XUNS = [
  {start:"甲子",hidden:"戊",kong:"戌亥",from:0},{start:"甲戌",hidden:"己",kong:"申酉",from:10},{start:"甲申",hidden:"庚",kong:"午未",from:20},
  {start:"甲午",hidden:"辛",kong:"辰巳",from:30},{start:"甲辰",hidden:"壬",kong:"寅卯",from:40},{start:"甲寅",hidden:"癸",kong:"子丑",from:50}
];
const BRANCH_PALACE = {"子":"坎","丑":"艮","寅":"艮","卯":"震","辰":"巽","巳":"巽","午":"離","未":"坤","申":"坤","酉":"兌","戌":"乾","亥":"乾"};
const STEM_TOMB = {"甲":"坤","乙":"乾","丙":"乾","丁":"艮","戊":"乾","己":"艮","庚":"艮","辛":"巽","壬":"巽","癸":"坤"};
const STEM_PUNISH = {"壬":"巽","癸":"巽","戊":"震","己":"坤"};
const DOOR_ELEM = {"休門":"水","生門":"土","傷門":"木","杜門":"木","景門":"火","死門":"土","驚門":"金","開門":"金"};
const ELEM_KE = {"木":"土","土":"水","水":"火","火":"金","金":"木"};
const ELEM_SHENG = {"木":"火","火":"土","土":"金","金":"水","水":"木"};
const BRANCH_NO = {"子":1,"丑":2,"寅":3,"卯":4,"辰":5,"巳":6,"午":7,"未":8,"申":9,"酉":10,"戌":11,"亥":12};
const CN_MONTH = ["","正月","二月","三月","四月","五月","六月","七月","八月","九月","十月","冬月","臘月"];
const CN_DAY_PREFIX = ["初","十","廿","卅"];
const CN_NUM = ["","一","二","三","四","五","六","七","八","九","十"];

// 1900-2050 農曆資料，常見萬年曆編碼。1900-01-31 為農曆庚子年正月初一。
const LUNAR_INFO = [
0x04bd8,0x04ae0,0x0a570,0x054d5,0x0d260,0x0d950,0x16554,0x056a0,0x09ad0,0x055d2,
0x04ae0,0x0a5b6,0x0a4d0,0x0d250,0x1d255,0x0b540,0x0d6a0,0x0ada2,0x095b0,0x14977,
0x04970,0x0a4b0,0x0b4b5,0x06a50,0x06d40,0x1ab54,0x02b60,0x09570,0x052f2,0x04970,
0x06566,0x0d4a0,0x0ea50,0x06e95,0x05ad0,0x02b60,0x186e3,0x092e0,0x1c8d7,0x0c950,
0x0d4a0,0x1d8a6,0x0b550,0x056a0,0x1a5b4,0x025d0,0x092d0,0x0d2b2,0x0a950,0x0b557,
0x06ca0,0x0b550,0x15355,0x04da0,0x0a5d0,0x14573,0x052d0,0x0a9a8,0x0e950,0x06aa0,
0x0aea6,0x0ab50,0x04b60,0x0aae4,0x0a570,0x05260,0x0f263,0x0d950,0x05b57,0x056a0,
0x096d0,0x04dd5,0x04ad0,0x0a4d0,0x0d4d4,0x0d250,0x0d558,0x0b540,0x0b6a0,0x195a6,
0x095b0,0x049b0,0x0a974,0x0a4b0,0x0b27a,0x06a50,0x06d40,0x0af46,0x0ab60,0x09570,
0x04af5,0x04970,0x064b0,0x074a3,0x0ea50,0x06b58,0x055c0,0x0ab60,0x096d5,0x092e0,
0x0c960,0x0d954,0x0d4a0,0x0da50,0x07552,0x056a0,0x0abb7,0x025d0,0x092d0,0x0cab5,
0x0a950,0x0b4a0,0x0baa4,0x0ad50,0x055d9,0x04ba0,0x0a5b0,0x15176,0x052b0,0x0a930,
0x07954,0x06aa0,0x0ad50,0x05b52,0x04b60,0x0a6e6,0x0a4e0,0x0d260,0x0ea65,0x0d530,
0x05aa0,0x076a3,0x096d0,0x04bd7,0x04ad0,0x0a4d0,0x1d0b6,0x0d250,0x0d520,0x0dd45,
0x0b5a0,0x056d0,0x055b2,0x049b0,0x0a577,0x0a4b0,0x0aa50,0x1b255,0x06d20,0x0ada0,
0x14b63
];

// ===== 報數鎖單宮與紅綠規則：依使用者提供規則校準 =====
const LOCK_NUM_TO_PALACE_NUM = {1:1,2:2,3:3,4:4,5:2,6:6,7:7,8:8,9:9};
const DIRECT_DENY = {
  god:new Set(["白虎"]),
  star:new Set(["天蓬","天芮"]),
  door:new Set(["死門"]),
  stem:new Set(["庚"]),
  flag:new Set(["空"])
};
const SCORE = {
  door:{"開門":40,"休門":40,"生門":40,"死門":-100},
  star:{"天輔":20,"天心":20,"天任":20,"天蓬":-100,"天芮":-100},
  god:{"值符":20,"太陰":20,"六合":20,"九天":20,"白虎":-100},
  stem:{"乙":10,"丙":10,"丁":10,"戊":10,"庚":-100},
  flag:{"空":-100}
};
const RULE_VERSION = window.QIMEN_RULE_VERSION || {
  app:"4.3",
  lock:"lock-palace.v4.3",
  scoring:"scoring.v4.3",
  qtype:"qtype-rules.v4.3 待確認",
  fengshui:"fengshui.v4.3"
};
const CASE_STORAGE_KEY = window.QIMEN_CASE_STORAGE_KEY || "qimen-jiugong-cases-v4";
const DOOR_ADVICE = {
  "開門":"適合開啟、見客、工作面試、談機會、做公開行動。",
  "休門":"適合休整、談和、修復關係、養精蓄銳、低調處理。",
  "生門":"適合求財、合作、報價、收款、增加資源與人脈。",
  "景門":"適合文書、曝光、說明、簡報，但話要準、資料要留底。",
  "杜門":"適合保密、整理、內部規劃，不宜硬推或逼對方表態。",
  "傷門":"防衝突、急躁、受傷、破財；今天宜慢，不宜硬碰硬。",
  "驚門":"防口舌、驚擾、訊息反覆；先查證再回覆。",
  "死門":"適合收尾、結束、封存舊事，不宜開新局或重押。"
};
const GOD_ADVICE = {
  "值符":"有主導力，可當主場使用，但要承擔責任。","六合":"利合作、人緣、和解、談條件。","太陰":"利暗中準備、文書細節、女性貴人。","九天":"利遠方、高目標、曝光與提升格局。","九地":"利穩守、存錢、打基礎、處理土地房屋。","螣蛇":"防糾纏、猜疑、虛驚與想太多。","玄武":"防隱瞞、口頭承諾、資訊不透明。","白虎":"防衝突、刀火金屬、受傷與強硬對抗。"
};
const QTYPE_RULES = {
  "今日運勢": {tone:"今日行動",description:"看今日整體氣勢、行動方向、口舌財務與可用方位。",speech:"先講事實，再講立場；訊息要短、準、留紀錄。",finance:"今日財務以收斂與確認為主，能收款先收款，投資與大額支出不急。",work:"先推最有把握的一件事，把交付、時間、責任寫清楚。",health:"留意睡眠、飲食與壓力反應；若有明顯症狀，請以正式醫療檢查為準。"},
  "工作": {tone:"職場與任務",description:"看工作機會、職責壓力、主管客戶、流程與表現。",speech:"回覆主管、客戶或同事時，少用情緒詞，多用進度、期限、下一步。",finance:"涉及報價、預算或請款，要留下文字與版本，不用口頭帶過。",work:"先處理能被看見的交付，再處理內部整理；不要同時開太多戰線。",health:"工作壓力若已影響睡眠或身體，先調整節奏，必要時找專業協助。"},
  "財運": {tone:"財務與資源",description:"看收入、合作財、帳款、投資風險與現金流。",speech:"談錢要講條件、期限、交付與違約處理，不要只談感覺。",finance:"能確認的款項先確認，能白紙黑字的先白紙黑字；不做保證收益判斷。",work:"財務相關工作先核對數字、合約、收付款節點，再談擴張。",health:"財務壓力容易影響作息，先把支出與風險列出來，不在焦慮時做大決策。"},
  "感情": {tone:"關係與溝通",description:"看關係互動、誤會、承諾、口舌與情緒距離。",speech:"先描述自己的感受與需求，不逼問、不定罪、不用一句話判生死緣分。",finance:"關係中的金錢往來要講清楚，不因情緒承諾超出能力的事。",work:"若感情影響工作，今天先把必要任務完成，不在情緒最高點做決定。",health:"情緒壓力先回到睡眠、飲食、呼吸與支持系統；嚴重不適請找專業協助。"},
  "合作": {tone:"合作與契約",description:"看合作能否成、條件是否清楚、分工分錢是否有風險。",speech:"合作先談邊界、分工、驗收、分潤與退出方式，越清楚越不傷感情。",finance:"錢、資源、責任要分清楚；先小量試合作，不先重押。",work:"從最小可交付開始驗證默契，不急著把長約一次簽滿。",health:"合作壓力來自不清楚的期待，先降噪、列清單，再討論。"},
  "健康": {tone:"身心狀態",description:"只做壓力、作息、風險提醒，不做醫療診斷。",speech:"健康議題少硬撐，多清楚說明不舒服、需求與可配合的範圍。",finance:"健康支出以必要檢查、休息與照護為先，不聽信誇大療效。",work:"今天工作量宜降載，先做必要項目，避免硬撐到失誤。",health:"本工具不做醫療診斷；若有明顯症狀，請以正式醫療檢查為準。"},
  "風水": {tone:"方位調整",description:"找今日可啟動方、宜靜方、避動方。",speech:"在不穩方位少講電話、少爭辯；重要訊息可面向可用方整理後再發。",finance:"財務文件、報價、合約可在啟動方整理，不在避動方拍板。",work:"工作空間先清潔、降噪、補光；不要做誇張擺設。",health:"風水只作環境調整建議，不取代健康與安全判斷。"},
  "決策": {tone:"做不做與何時做",description:"看是否適合立刻行動、延後、保守、談判或放棄。",speech:"決策溝通先講目標、限制、可逆性與最壞情境，不被一時氣氛推著走。",finance:"涉及錢的決策先算損失上限，保留退路，不一次賭到底。",work:"先做最小可逆的一步，用結果驗證，再決定要不要放大。",health:"身心狀態不穩時避免重大決策，先休息或延後。"}
};

let chart = null;
let selectedNum = null;
let reportMode = "simple";
let currentView = "ask";
let inquiryLocked = false;
let activeCaseId = null;

// ===== 工具函數 =====
function pad(n){return String(n).padStart(2,"0")}
function clamp(n,min,max){return Math.max(min,Math.min(max,n))}
function unique(arr){return [...new Set(arr.filter(Boolean))]}
function escapeHTML(s){return String(s??"").replace(/[&<>'"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;","\"":"&quot;"}[c]))}
function parseDT(){const v=document.getElementById("dt").value;if(!v)return null;const [date,time]=v.split("T");const [y,m,d]=date.split("-").map(Number);const [hh,mm]=time.split(":").map(Number);return {y,m,d,hh,mm}}
function questionText(){return (document.getElementById("questionText")?.value||"").trim()}
function inquiryMode(){return document.getElementById("inquiryMode")?.value||"formal"}
function isFormalInquiry(){return inquiryMode()==="formal"}
function updateInquiryHint(){
  const hint=document.getElementById("inquiryHint"); if(!hint)return;
  hint.textContent=isFormalInquiry()
    ? "正式問事：請先默念問題，憑直覺選 1-9。鎖定後再揭盤，避免被盤面吉凶影響選擇。"
    : "學習模式：可以先排盤、看盤面，再點選不同宮位做研究與比較。";
}
function updateInquiryControls(){
  const locked=!!inquiryLocked;
  ["questionText","qtype","inquiryMode"].forEach(id=>{const el=document.getElementById(id); if(el)el.disabled=locked;});
  const resetAsk=document.getElementById("resetInquiryAsk"); if(resetAsk)resetAsk.disabled=false;
  const resetChart=document.getElementById("resetInquiryChart"); if(resetChart)resetChart.disabled=false;
}
function fmtDT(p){return `${p.y}-${pad(p.m)}-${pad(p.d)} ${pad(p.hh)}:${pad(p.mm)}`}
function jdn(y,m,d){let a=Math.floor((14-m)/12);let y2=y+4800-a;let m2=m+12*a-3;return d+Math.floor((153*m2+2)/5)+365*y2+Math.floor(y2/4)-Math.floor(y2/100)+Math.floor(y2/400)-32045}
function dateAddDays(p,delta){const dt=new Date(p.y,p.m-1,p.d+delta,p.hh||0,p.mm||0);return {y:dt.getFullYear(),m:dt.getMonth()+1,d:dt.getDate(),hh:dt.getHours(),mm:dt.getMinutes()}}
function gzFromIndex(i){return GZ60[(i%60+60)%60]}
function stemOf(gz){return gz?.[0]||""} function branchOf(gz){return gz?.[1]||""}
function dayIndex(p,ziChange){const pp=(ziChange&&p.hh>=23)?dateAddDays(p,1):p;return (jdn(pp.y,pp.m,pp.d)+49)%60}
function yearGZ(p){const useY=(p.m<2||(p.m===2&&p.d<4))?p.y-1:p.y;return gzFromIndex((useY-4)%60)}
function monthInfo(p,yearStem){let info=MONTH_JIE[10]; for(const j of MONTH_JIE){ if(j.m===1) continue; if(p.m>j.m||(p.m===j.m&&p.d>=j.d)) info=j; } if(p.m===1&&p.d>=6) info=MONTH_JIE[11]; const start=MONTH_START_STEM[yearStem]||"丙"; const stem=STEMS[(STEMS.indexOf(start)+info.idx)%10]; return {stem,branch:info.branch,jie:info.name}}
function hourGZ(p,dayStem){let bi=Math.floor((p.hh+1)/2)%12; if(p.hh===23)bi=0; const start=HOUR_START_STEM[dayStem]||"甲"; const stem=STEMS[(STEMS.indexOf(start)+bi)%10]; return stem+BRANCHES[bi]}
function xunForGZ(gz){const idx=GZ60.indexOf(gz);return XUNS[Math.floor(idx/10)]||XUNS[0]}
function normalizePalace(p){return p==="中"?"坤":p}
function ringIndex(p){return RING.indexOf(normalizePalace(p))}
function shiftPalace(p,delta){const i=ringIndex(p); if(i<0)return p; return RING[(i+delta+800)%8]}
function palaceByNumber(n){return NUM_PALACE[Number(n)]||"中"}
function numberSeq(ju,dun){let n=ju,seq=[]; for(let i=0;i<9;i++){seq.push(n); n=dun==="陽" ? (n%9)+1 : (n===1?9:n-1)} return seq}
function addStem(map,p,stem){if(!stem)return; p=normalizePalace(p); if(!map[p])map[p]=[]; map[p].push(stem)}
function buildGround(ju,dun){const nums=numberSeq(ju,dun); const g={}; nums.forEach((num,i)=>addStem(g,palaceByNumber(num),GROUND_STEMS[i])); return g}
function findStemPalace(stem,map){for(const p of Object.keys(map)){ if((map[p]||[]).includes(stem))return p } return ""}
function rotateMap(source,offset){const out={}; for(const p of RING){(source[p]||[]).forEach(st=>addStem(out,shiftPalace(p,offset),st))} return out}
function doorOffsetFor(mode,xunPalace,xun,hgz,ju,dun,starOffset){
  if(mode==="star") return starOffset;
  if(mode==="classic"){
    const step=(GZ60.indexOf(hgz)-xun.from+800)%8;
    const target=shiftPalace(xunPalace,dun==="陽"?step:-step);
    return ringIndex(target)-ringIndex(xunPalace);
  }
  // 九宮鎖單宮校準：依六甲遁干序數定八門偏移。此模式可對上使用者提供的兩張樣本盤。
  return (STEMS.indexOf(xun.hidden)+1)%8;
}
function yimaByBranch(br){if(["申","子","辰"].includes(br))return "寅"; if(["寅","午","戌"].includes(br))return "申"; if(["亥","卯","未"].includes(br))return "巳"; if(["巳","酉","丑"].includes(br))return "亥"; return ""}

// ===== 農曆 =====
function leapMonth(y){return LUNAR_INFO[y-1900]&0xf}
function leapDays(y){return leapMonth(y)?((LUNAR_INFO[y-1900]&0x10000)?30:29):0}
function monthDays(y,m){return (LUNAR_INFO[y-1900]&(0x10000>>m))?30:29}
function lunarYearDays(y){let sum=348; for(let i=0x8000;i>0x8;i>>=1){ if(LUNAR_INFO[y-1900]&i)sum++ } return sum+leapDays(y)}
function solarToLunar(y,m,d){
  if(y<1900||y>2050) throw new Error("農曆資料目前支援 1900-2050。")
  const base=new Date(1900,0,31); const cur=new Date(y,m-1,d); let offset=Math.floor((cur-base)/86400000);
  let ly=1900; while(ly<2051 && offset>=lunarYearDays(ly)){offset-=lunarYearDays(ly); ly++}
  const leap=leapMonth(ly); let isLeap=false; let lm=1;
  while(lm<=12){const md=isLeap?leapDays(ly):monthDays(ly,lm); if(offset<md)break; offset-=md; if(leap===lm&&!isLeap){isLeap=true}else{if(isLeap)isLeap=false; lm++}}
  return {year:ly,month:lm,day:offset+1,isLeap};
}
function cnDay(d){if(d===10)return "初十"; if(d===20)return "二十"; if(d===30)return "三十"; return CN_DAY_PREFIX[Math.floor(d/10)] + CN_NUM[d%10]}
function lunarText(l){return `${l.year}年 ${l.isLeap?"閏":""}${CN_MONTH[l.month]} ${cnDay(l.day)}`}
function yinpanJu(meta){const yNo=BRANCH_NO[meta.yearBranch], mNo=meta.lunar.month, dNo=meta.lunar.day, hNo=BRANCH_NO[meta.hourBranch]; let r=(yNo+mNo+dNo+hNo)%9; if(r===0)r=9; return {num:r, formula:`${meta.yearBranch}${yNo}＋農${mNo}月＋農${dNo}日＋${meta.hourBranch}${hNo}＝${yNo+mNo+dNo+hNo}，除9餘${r}`}}

// ===== 排盤 =====
function buildChart(){
  try{
    const p=parseDT(); if(!p){alert("請輸入起盤時間");return}
    if(isFormalInquiry()&&!questionText()){alert("正式問事請先輸入問題。");return false}
    if(!selectedNum){alert("請先選 1-9 一個數字");return false}
    const ziChange=document.getElementById("ziChange").value==="true";
    const yGZ=yearGZ(p); const yStem=stemOf(yGZ), yBranch=branchOf(yGZ);
    const mInfo=monthInfo(p,yStem); const dIdx=dayIndex(p,ziChange); const dGZ=gzFromIndex(dIdx); const hGZ=hourGZ(p,stemOf(dGZ));
    const lunar=solarToLunar(p.y,p.m,p.d); const metaBase={yearBranch:yBranch,lunar,hourBranch:branchOf(hGZ)}; const ju=yinpanJu(metaBase);
    const dun="陰"; const xun=xunForGZ(hGZ); const ground=buildGround(ju.num,dun);
    const xunPalace=normalizePalace(findStemPalace(xun.hidden,ground)||"坤");
    const timeStem=stemOf(hGZ); const timeGroundStem=timeStem==="甲"?xun.hidden:timeStem; const timePalace=normalizePalace(findStemPalace(timeGroundStem,ground)||xunPalace);
    const starOffset=ringIndex(timePalace)-ringIndex(xunPalace); const heaven=rotateMap(ground,starOffset);
    const doorMode=document.getElementById("doorMode").value; const dOff=doorOffsetFor(doorMode,xunPalace,xun,hGZ,ju.num,dun,starOffset);
    const starMap={},doorMap={},godMap={}; Object.entries(STAR_ORIGIN).forEach(([pal,s])=>starMap[shiftPalace(pal,starOffset)]=s); Object.entries(DOOR_ORIGIN).forEach(([pal,d])=>doorMap[shiftPalace(pal,dOff)]=d);
    GOD_ORDER.forEach((g,i)=>godMap[shiftPalace(timePalace,dun==="陽"?i:-i)]=g);
    const emptyBranches=xun.kong.split(""); const emptyPalaces=unique(emptyBranches.map(b=>BRANCH_PALACE[b])); const yima=yimaByBranch(branchOf(hGZ)); const yimaPalace=BRANCH_PALACE[yima];
    const zhifu=STAR_ORIGIN[xunPalace]||""; const zhishi=DOOR_ORIGIN[xunPalace]||"";
    const palaces=PALACE_ORDER.map(key=>{
      if(key==="中") return {key,number:5,isCenter:true,flags:[],top:[],bottom:[],god:"",star:"",door:""};
      const top=heaven[key]||[]; const bottom=ground[key]||[]; const door=doorMap[key]||""; const flags=[];
      if(emptyPalaces.includes(key))flags.push("空"); if(yimaPalace===key)flags.push("馬");
      const all=top.concat(bottom); if(all.some(st=>STEM_TOMB[st]===key))flags.push("墓"); if(all.some(st=>STEM_PUNISH[st]===key))flags.push("刑");
      if(door){const de=DOOR_ELEM[door], pe=PALACE_ELEM[key]; if(ELEM_KE[de]===pe)flags.push("迫"); else if(ELEM_KE[pe]===de)flags.push("制")}
      return {key,number:PALACE_NUM[key],god:godMap[key]||"",star:starMap[key]||"",door,top,bottom,flags:unique(flags)};
    });
    chart={
      version:RULE_VERSION.app, ruleVersion:RULE_VERSION, question:questionText(), settings:{qtype:document.getElementById("qtype").value,doorMode,ziChange,inquiryMode:inquiryMode(),lockedFormal:isFormalInquiry()},
      meta:{solar:fmtDT(p),lunar:lunarText(lunar),yearGZ:yGZ,yearStem:yStem,yearBranch:yBranch,monthStem:mInfo.stem,monthBranch:mInfo.branch,dayStem:stemOf(dGZ),dayBranch:branchOf(dGZ),hourStem:stemOf(hGZ),hourBranch:branchOf(hGZ),monthGZ:mInfo.stem+mInfo.branch,dayGZ:dGZ,hourGZ:hGZ,ju:`陰${CN_NUM[ju.num]}局`,juNum:ju.num,juFormula:ju.formula,xunshou:`${xun.start}旬`,futou:xun.hidden,kongwang:xun.kong,yima,zhifu,zhishi,xunPalace,timePalace,starOffset,doorOffset:dOff},
      palaces
    };
    inquiryLocked=isFormalInquiry();
    renderAll(); setNote(`已排：${yGZ}年 ${mInfo.stem+mInfo.branch}月 ${dGZ}日 ${hGZ}時；農曆${lunarText(lunar)}；${chart.meta.ju}；旬首${xun.start}、符頭${xun.hidden}、空亡${xun.kong}、驛馬${yima}。局數公式：${ju.formula}。`);
    return true;
  }catch(err){alert(err.message||err); return false;}
}

// ===== 分數 =====
function contribution(type,sym){return (SCORE[type]&&SCORE[type][sym])||0}
function lockedPalaceNumber(n){return LOCK_NUM_TO_PALACE_NUM[Number(n)]||Number(n)}
function denyReason(type,sym){return {"god":"大凶八神","star":"大凶九星","door":"大凶八門","stem":"大凶天干","flag":"大凶特殊象"}[type] + `：${sym}`}
function scorePalace(p,qtype){
  if(!p||p.isCenter)return {score:0,reasons:[{label:"中宮不用",value:0,text:"中宮不直接作鎖單宮判斷。"}],grade:grade(0)};
  return scorePalaceRaw(p,qtype);
}
function scorePalaceRaw(p,qtype){
  let score=0; const reasons=[]; const deniers=[];
  function deny(type,sym,text){if(sym&&DIRECT_DENY[type]&&DIRECT_DENY[type].has(sym)){deniers.push({label:denyReason(type,sym),value:0,text})}}
  function add(type,label,sym,text){const value=contribution(type,sym); if(value>0){score+=value; reasons.push({label,value,text})}}
  deny("god",p.god,`${p.god}：今天這股氣比較硬，容易起衝突，不適合硬推。`);
  deny("star",p.star,`${p.star}：事情暗藏麻煩，先查清楚再說。`);
  deny("door",p.door,`${p.door}：這件事現在像卡住或收尾，不適合開新局。`);
  p.top.concat(p.bottom).forEach(st=>deny("stem",st,`${st}：遇到阻力與壓力，先不要重押。`));
  p.flags.forEach(f=>deny("flag",f,flagText(f)));
  if(deniers.length)return {score:0,reasons:deniers,denied:true,deniers,grade:{name:"直接否定",cls:"score-bad"}};
  add("god",p.god,p.god,`${p.god}：有人事助力，可以借力使力。`);
  add("star",p.star,p.star,`${p.star}：事情有可用的條件，值得整理後推進。`);
  add("door",p.door,p.door,`${p.door}：路徑打得開，可以採取行動。`);
  p.top.concat(p.bottom).forEach(st=>add("stem",st,st,`${st}：有機會、有資源，適合把條件談清楚。`));
  score=clamp(Math.round(score),0,100); return {score,reasons,denied:false,deniers:[],grade:grade(score)};
}
function grade(score){if(score>=80)return {name:"大吉",cls:"score-good"}; if(score>=60)return {name:"主吉",cls:"score-good"}; if(score>0)return {name:"未達 60",cls:"score-bad"}; return {name:"不採用",cls:"score-bad"}}
function doorMeaning(d){return {"開門":"開啟、事業、門路、機會。","休門":"休整、和解、貴人、修復。","生門":"財源、資源、生機、合作利益。","景門":"文書、曝光、名聲、說明。","杜門":"閉塞、保密、內部、卡點。","傷門":"衝突、損傷、急躁、破耗。","驚門":"口舌、驚擾、消息反覆。","死門":"停滯、結束、舊事、僵局。"}[d]||""}
function starMeaning(s){return {"天心":"理性、醫藥、管理、方案。","天輔":"文教、輔助、貴人、專業。","天任":"穩定、承擔、慢成。","天英":"表現、名聲、靈感、火氣。","天沖":"行動、突發、衝勁。","天蓬":"風險、欲望、暗流。","天芮":"病符、問題、瑕疵。","天柱":"口舌、壓力、阻隔。"}[s]||""}
function flagText(f){return {"空":"空亡：事情未實、等待填實，不宜重押。","馬":"驛馬：有移動、變化、外出與轉換象。","墓":"入墓：氣被收住，進展慢，宜先整理。","刑":"擊刑：內部衝突、卡住或自我糾結。","迫":"門迫：門克宮，行動方式壓迫環境，易出問題。","制":"門制：宮克門，環境壓住行動，進展受限。"}[f]||f}
function classByScore(type,sym){const v=(SCORE[type]&&SCORE[type][sym])||0; return v>0?"good-text":v<0?"bad-text":"neutral-text"}
function flagClass(f){return DIRECT_DENY.flag.has(f)||["刑","迫","墓"].includes(f)?"bad":["馬"].includes(f)?"good":"warn"}
function statusFor(type,sym){
  if(!sym)return {label:"中",cls:"tag-neutral"};
  if(type==="flag"){
    if(DIRECT_DENY.flag.has(sym)||["刑","迫","墓"].includes(sym))return {label:sym,cls:"tag-risk"};
    if(sym==="馬")return {label:sym,cls:"tag-good"};
    return {label:sym,cls:"tag-warn"};
  }
  const v=contribution(type,sym);
  if(v>0)return {label:"吉",cls:"tag-good"};
  if(v<0)return {label:"凶",cls:"tag-risk"};
  return {label:"中",cls:"tag-neutral"};
}
function tagFor(type,sym){const st=statusFor(type,sym); return `<span class="tag ${st.cls}">${st.label}</span>`}
function symbolText(type,sym){return `${escapeHTML(sym||"無")}${tagFor(type,sym)}`}
function symbolBox(label,type,sym){return `<div class="symbol-box"><span>${label}</span><div class="symbol-value"><strong class="${classByScore(type,sym)}">${escapeHTML(sym||"無")}</strong>${tagFor(type,sym)}</div></div>`}
function overallScore(){if(!chart)return 0; return Math.round(chart.palaces.filter(p=>!p.isCenter).reduce((s,p)=>s+scorePalaceRaw(p,chart.settings.qtype).score,0)/8)}

// ===== 渲染 =====
function renderAll(){updateInquiryHint(); updateInquiryControls(); renderRuleVersion(); renderNums(); renderMeta(); renderGrid(); renderLockedPanel(); renderResult(); renderReport(); renderCases();}
function renderRuleVersion(){const el=document.getElementById("metricRules"); if(el)el.textContent=`V${RULE_VERSION.app}｜用途待確認`}
function setNote(t){document.getElementById("autoNote").textContent=t}
function showView(view){
  currentView=view||"ask";
  document.querySelectorAll("[data-view-panel]").forEach(panel=>panel.classList.toggle("active",panel.dataset.viewPanel===currentView));
  document.querySelectorAll(".nav-btn").forEach(btn=>btn.classList.toggle("active",btn.dataset.view===currentView));
  if(currentView==="chart" && !chart)toast("尚未排盤，請先完成問事。");
  window.scrollTo({top:0,behavior:"smooth"});
}
function renderNums(){const pad=document.getElementById("numPad"); if(!pad.dataset.ready){pad.innerHTML=""; [1,2,3,4,5,6,7,8,9].forEach(n=>{const b=document.createElement("button"); b.className="num-btn"; b.textContent=String(n); b.onclick=()=>{if(inquiryLocked){toast("正式問事已鎖定，請按「重新問事」再重選。");return} selectedNum=n; renderAll()}; pad.appendChild(b)}); pad.dataset.ready="1"} Array.from(pad.children).forEach((b,i)=>{const n=i+1; b.classList.toggle("active",selectedNum===n); b.disabled=inquiryLocked&&selectedNum!==n; b.title=inquiryLocked?"正式問事已鎖定":""})}
function renderMeta(){const box=document.getElementById("metaGrid"); if(!chart){box.innerHTML="";return} const m=chart.meta; const pairs=[["西元",m.solar],["農曆",m.lunar],["四柱",`${m.yearGZ}　${m.monthGZ}　${m.dayGZ}　${m.hourGZ}`],["起局",`${m.ju}｜陰盤`],["旬首",m.xunshou],["符頭",m.futou],["空亡",m.kongwang],["驛馬",m.yima],["值符",m.zhifu],["值使",m.zhishi],["局數公式",m.juFormula],["門法",document.getElementById("doorMode").selectedOptions[0].textContent]]; box.innerHTML=pairs.map(([a,b])=>`<div class="meta"><span>${a}</span><strong>${escapeHTML(b)}</strong></div>`).join(""); document.getElementById("chartBadge").textContent=`${m.ju}・${m.zhifu}・${m.zhishi}`; const ov=overallScore(); document.getElementById("metricOverall").textContent=`${ov}/100`;}
function stemSpan(st,pal){const tags=[tagFor("stem",st)]; if(STEM_TOMB[st]===pal)tags.push(`<span class="small-tag tag-risk">墓</span>`); if(STEM_PUNISH[st]===pal)tags.push(`<span class="small-tag tag-risk">刑</span>`); const cls=classByScore("stem",st); return `<span class="${cls}">${st}</span>${tags.join("")}`}
function stemGroup(stems,pal){return stems.length?stems.map(st=>stemSpan(st,pal)).join(""):`<span class="muted-text">無</span>`}
function flagGroup(flags){return flags.length?flags.map(f=>`<span class="flag ${flagClass(f)}">${f}</span>`).join(""):`<span class="muted-text">無</span>`}
function selectPalaceNumber(n){if(inquiryLocked){toast("正式問事已鎖定，請按「重新問事」再重選。");return} selectedNum=Number(n); renderAll();}
function renderGrid(){const grid=document.getElementById("palaceGrid"); if(!chart){grid.innerHTML="<div class='palace center' style='grid-column:1/4'>請先輸入時間並開始排盤</div>"; return} const q=chart.settings.qtype; grid.innerHTML=chart.palaces.map(p=>{
  const sel=lockedPalaceNumber(selectedNum)===p.number; if(p.isCenter){return `<div class="palace center" data-num="5"><div><strong>中宮</strong><br><span class="score-pill score-mid">5</span></div></div>`}
  const s=scorePalaceRaw(p,q); const sc=s.score; const bg=s.denied||sc<60?"bad-bg":"good-bg"; const scoreText=s.denied?"否":sc;
  return `<button type="button" class="palace ${bg} ${sel?"selected":""}" data-num="${p.number}" onclick="selectPalaceNumber(${p.number})" aria-label="鎖定${p.key}${p.number}宮">
    <div class="palace-top"><span class="palace-id">${p.key}<small>${p.number}</small></span><span class="god ${classByScore("god",p.god)}">${symbolText("god",p.god)}</span></div>
    <div class="palace-mid"><span class="sym ${classByScore("star",p.star)}">${symbolText("star",p.star)}</span><span class="stems">${stemGroup(p.top,p.key)}</span></div>
    <div class="palace-bottom"><span class="sym ${classByScore("door",p.door)}">${symbolText("door",p.door)}</span><span class="stems muted-text">${stemGroup(p.bottom,p.key)}</span></div>
    <div class="palace-top"><span class="flagrow">${flagGroup(p.flags)}</span><span class="palace-score">${scoreText}</span></div>
  </button>`}).join("");
}
function getPalaceByNum(n){return chart?.palaces.find(p=>p.number===lockedPalaceNumber(n))||null}
function renderLockedPanel(){
  const box=document.getElementById("lockedPalacePanel"); if(!box)return;
  if(!chart){box.innerHTML=`<div class="locked-empty">請先起盤，再選一個數字。</div>`; return}
  if(!selectedNum){box.innerHTML=`<div class="locked-empty">請選 1-9。</div>`; return}
  const p=getPalaceByNum(selectedNum); const s=scorePalace(p,chart.settings.qtype); const summary=makeSummary(p,s);
  const statusClass=s.denied?"lock-denied":s.score>=60?"lock-good":"lock-bad";
  const statusText=s.denied?"直接否定":`${s.score}/100｜${s.grade.name}`;
  const reason=s.reasons.length?s.reasons.slice(0,3).map(r=>`<div class="symbol-box"><span>${escapeHTML(r.label)}</span><strong>${r.value>0?"+":""}${r.value}</strong></div>`).join(""):"";
  box.innerHTML=`<div class="locked-card ${statusClass}">
    <div class="locked-head">
      <div class="locked-title"><div class="locked-num">${selectedNum}</div><div><h3>鎖 ${p.key}${p.number}宮</h3><small>${PALACE_DIR[p.key]}｜${PALACE_ELEM[p.key]}｜${chart.settings.qtype}</small></div></div>
      <div class="locked-status">${statusText}</div>
    </div>
    <div class="locked-symbols">
      ${symbolBox("八神","god",p.god)}
      ${symbolBox("九星","star",p.star)}
      ${symbolBox("八門","door",p.door)}
      <div class="symbol-box"><span>天盤干</span><strong>${stemGroup(p.top,p.key)}</strong></div>
      <div class="symbol-box"><span>地盤干</span><strong>${stemGroup(p.bottom,p.key)}</strong></div>
      <div class="symbol-box"><span>特殊象</span><strong>${flagGroup(p.flags)}</strong></div>
      ${reason}
    </div>
    <div class="locked-summary"><strong>總斷</strong>${escapeHTML(summary.total)}</div>
  </div>`;
}
function renderResult(){
  const metricLock=document.getElementById("metricLock"), metricScore=document.getElementById("metricScore");
  if(!chart||!selectedNum){document.getElementById("resultSub").textContent="尚未選數"; document.getElementById("resultHeadline").textContent="先起盤並選數。"; document.getElementById("scoreNum").textContent="—"; document.getElementById("gradeText").textContent="未鎖定"; document.getElementById("scoreBar").style.width="0%"; document.getElementById("resultList").innerHTML=""; document.getElementById("reasonTabs").innerHTML=""; metricLock.textContent="未選數"; metricScore.textContent="—"; return}
  const p=getPalaceByNum(selectedNum); const s=scorePalace(p,chart.settings.qtype); metricLock.textContent=`${selectedNum}｜${p.key}${PALACE_DIR[p.key]?"・"+PALACE_DIR[p.key]:""}`; metricScore.textContent=`${s.denied?"直接否定":s.score+"/100 "+s.grade.name}`;
  document.getElementById("resultSub").textContent=`${selectedNum} 號鎖 ${p.key}宮｜${PALACE_DIR[p.key]||"中央"}`; document.getElementById("scoreNum").textContent=s.denied?"×":s.score; document.getElementById("gradeText").innerHTML=`<span class="score-pill ${s.grade.cls}">${s.grade.name}</span>`; document.getElementById("scoreBar").style.width=(s.denied?100:s.score)+"%";
  document.getElementById("reasonTabs").innerHTML=[`<span class="tab active">${p.key}${p.number}</span>`,`<span class="tab">${chart.settings.qtype}</span>`,`<span class="tab">${chart.meta.ju}</span>`].join("");
  const summary = makeSummary(p,s);
  document.getElementById("resultHeadline").textContent=`${s.denied?"先停一下":s.score>=60?"可以推進":"先保守"}｜${p.key}宮｜${summary.short}`;
  document.getElementById("resultList").innerHTML=`<div class="item"><strong>大師斷語</strong>${escapeHTML(summary.total)}</div><div class="item action"><strong>今天怎麼做</strong>${escapeHTML(summary.action)}</div><div class="item action"><strong>先避開</strong>${escapeHTML(summary.avoid)}</div><div class="item action"><strong>補運方法</strong>${escapeHTML(summary.fengshui)}</div>`;
}
function makeSummary(p,s){
  const dir=PALACE_DIR[p.key]; const topic=chart?.settings?.qtype||"這件事"; const topicLine=qtypeAdvice(topic);
  if(s.denied){return {short:"不宜硬推", total:"這件事現在不順，先不要急著定案。不是完全沒機會，而是眼前阻力比較重，越急越容易做錯。", action:`先停、先查、先問清楚。今天適合把資料補齊、把風險列出來、等對方明確回覆；重要決定不要當場答應。${topicLine}`, avoid:"避免催促、爭辯、簽急件、付大錢、承諾做不到的事。若對方一直模糊，就先保留。", fengshui:`${dir}今天先安靜處理：整理乾淨、不要敲打修繕、不要在這個方位吵架或談重大決定。把雜物收起來，就是補運。`}}
  const good=s.score>=60;
  let total=good?`這件事可以推進，但要用穩的方式做。先抓一個小步驟開始，不要一次押太大。`:`這件事目前力道不足，先當作觀察局。可以準備，但不適合把所有籌碼都放進去。`;
  let action=good?`${DOOR_ADVICE[p.door]||"先用最容易成功的小步驟切入。"} ${GOD_ADVICE[p.god]||""} ${topicLine}`:`先整理條件，等訊號更清楚再行動。可以先試水溫、問細節、做備案，不要急著拍板。${topicLine}`;
  let avoid=good?"不要貪快、不要一次講太滿。能簽字的先寫清楚，能留紀錄的不要只靠口頭。":"避免重押、避免借錢或先墊、避免為了面子硬撐。今天重點是守住基本盤。";
  if(p.flags.includes("空")) { action += " 承諾要等白紙黑字，不要只聽口頭。"; avoid += " 空口承諾先不要信滿。"; }
  if(p.flags.includes("迫")||p.flags.includes("刑")) { action += " 說話放慢，條件一條一條確認。"; avoid += " 不要硬碰硬，也不要帶情緒回覆。"; }
  if(p.flags.includes("馬")) action += " 若需要移動、拜訪、換方向，可以動，但行程要先排好。";
  let fengshui = good ? `${dir}可以輕度啟動：整理乾淨、開燈 15-30 分鐘，把正在推進的文件或計畫放整齊；發訊息或談事情前，先讓這個方位明亮乾淨。` : `${dir}今天先收斂：收雜物、關櫃門、移開尖銳物，不在這個方位爭吵、敲打或做大額決定。`;
  const elem=PALACE_ELEM[p.key]; if(good){ if(elem==="木")fengshui += " 可放健康綠植或木質物。"; if(elem==="火")fengshui += " 可用溫和燈光，不用強光。"; if(elem==="土")fengshui += " 可放陶瓷、石材或穩重物件。"; if(elem==="金")fengshui += " 可用白色、金屬或圓形物件。"; if(elem==="水")fengshui += " 可放一杯乾淨清水，但不可髒水或漏水。"}
  return {short:good?"小步可行":"先觀望",total,action,avoid,fengshui}
}
function qtypeAdvice(topic){
  return {
    "工作":"工作上先把責任、時間、交付內容寫清楚，少講感覺，多講結果。",
    "財運":"錢的事情先保守，能收就先收，該省就先省，不做看不懂的投資。",
    "感情":"感情上先穩住情緒，不逼問、不冷戰，重點是把話講清楚。",
    "合作":"合作要先談邊界、分工與退出方式，合約比口頭承諾重要。",
    "健康":"健康問題以休息和就醫為先，這裡只看提醒，不取代專業醫療。",
    "風水":"風水先從乾淨、明亮、安靜開始，不用做誇張擺設。",
    "決策":"決策先做最小可逆的一步，保留退路，不要一次賭到底。",
    "今日運勢":"今天先抓一件最重要的事處理，其餘不要分心。"
  }[topic]||"先小步試，不要一次賭到底。"
}
function renderReport(){document.getElementById("reportBox").textContent=makeReport(reportMode)}
function makeReport(mode=reportMode){
  if(!chart)return "尚未產生報告。"; const m=chart.meta; const question=chart.question||questionText(); let out=[]; out.push(`九宮奇門鎖單宮報告`); if(question)out.push(`問事：${question}`); out.push(`時間：${m.solar}`); out.push(`農曆：${m.lunar}`); out.push(`四柱：${m.yearGZ}年　${m.monthGZ}月　${m.dayGZ}日　${m.hourGZ}時`); out.push(`起局：${m.ju}｜排盤：陰盤｜旬首：${m.xunshou}｜符頭：${m.futou}｜空亡：${m.kongwang}｜驛馬：${m.yima}`); out.push(`值符：${m.zhifu}｜值使：${m.zhishi}`); out.push(`局數：${m.juFormula}`); out.push(`全盤平均：${overallScore()}/100`);
  if(selectedNum){const p=getPalaceByNum(selectedNum); const s=scorePalace(p,chart.settings.qtype); const summary=makeSummary(p,s); if(mode==="simple"){return [`九宮奇門鎖單宮報告`,question?`問事：${question}`:"",`結論：${summary.short}`,`大師斷語：${summary.total}`,`今天怎麼做：${summary.action}`,`先避開：${summary.avoid}`,`補運方法：${summary.fengshui}`].filter(Boolean).join("\n\n")} out.push(""); out.push(`鎖定數字：${selectedNum}｜${p.key}宮｜${PALACE_DIR[p.key]||"中央"}`); out.push(s.denied?`判斷：直接否定｜${s.grade.name}`:`運勢總分：${s.score}/100｜${s.grade.name}`); out.push(`大師斷語：${summary.total}`); out.push(`今天怎麼做：${summary.action}`); out.push(`先避開：${summary.avoid}`); out.push(`補運方法：${summary.fengshui}`); out.push(""); out.push(`提醒：`); s.reasons.forEach(r=>out.push(`- ${r.text}`));}
  else out.push("\n尚未選 1-9 鎖單宮。");
  return out.join("\n")
}

// ===== 匯入、匯出與案例庫 =====
function download(name,text,type="text/plain;charset=utf-8"){const blob=new Blob([text],{type}); const a=document.createElement("a"); a.href=URL.createObjectURL(blob); a.download=name; document.body.appendChild(a); a.click(); a.remove(); setTimeout(()=>URL.revokeObjectURL(a.href),1000)}
async function copyText(text){
  if(navigator.clipboard&&navigator.clipboard.writeText){
    try{await navigator.clipboard.writeText(text); return true}catch(e){}
  }
  try{
    const ta=document.createElement("textarea");
    ta.value=text; ta.setAttribute("readonly",""); ta.style.position="fixed"; ta.style.left="-9999px"; ta.style.top="0"; ta.style.opacity="0";
    document.body.appendChild(ta); ta.focus(); ta.select();
    if(ta.setSelectionRange)ta.setSelectionRange(0,ta.value.length);
    return document.execCommand("copy");
  }catch(e){return false}
  finally{document.querySelectorAll("textarea[readonly][style*='-9999px']").forEach(el=>el.remove())}
}
function toast(msg){setNote(msg)}
function chartPayload(){return {version:RULE_VERSION.app, ruleVersion:RULE_VERSION, exportedAt:new Date().toISOString(), question:chart?.question||questionText(), chart, selectedNum}}
function restoreChartPayload(payload){
  if(!payload||!payload.chart||!Array.isArray(payload.chart.palaces))throw new Error("JSON 不是可匯入的盤面。");
  chart=payload.chart; selectedNum=payload.selectedNum?Number(payload.selectedNum):null;
  if(payload.question||chart.question)document.getElementById("questionText").value=payload.question||chart.question;
  if(chart.settings){
    if(chart.settings.qtype)document.getElementById("qtype").value=chart.settings.qtype;
    if(chart.settings.doorMode)document.getElementById("doorMode").value=chart.settings.doorMode;
    if(typeof chart.settings.ziChange==="boolean")document.getElementById("ziChange").value=String(chart.settings.ziChange);
    if(chart.settings.inquiryMode)document.getElementById("inquiryMode").value=chart.settings.inquiryMode;
    inquiryLocked=!!chart.settings.lockedFormal;
  }
  if(chart.meta&&chart.meta.solar){
    const m=chart.meta.solar.match(/^(\d{4})-(\d{2})-(\d{2})\s(\d{2}):(\d{2})/);
    if(m)setDateInput({y:+m[1],m:+m[2],d:+m[3],hh:+m[4],mm:+m[5]});
  }
  renderAll(); showView("chart"); toast("已匯入盤面。");
}
function resetInquiry(){
  chart=null; selectedNum=null; inquiryLocked=false; activeCaseId=null;
  document.getElementById("caseTitle").value="";
  document.getElementById("caseOutcome").value="";
  const acc=document.getElementById("caseAccuracy"); if(acc)acc.value="";
  const area=document.getElementById("caseHitArea"); if(area)area.value="";
  const notes=document.getElementById("caseNotes"); if(notes)notes.value="";
  renderAll(); showView("ask"); toast("已重新問事，可以重新選數。");
}
function loadCases(){
  try{const raw=localStorage.getItem(CASE_STORAGE_KEY); return raw?JSON.parse(raw):[]}catch(e){return []}
}
function saveCases(cases){localStorage.setItem(CASE_STORAGE_KEY,JSON.stringify(cases))}
function currentCase(){
  if(!chart||!selectedNum)throw new Error("請先起盤並選數字。");
  const p=getPalaceByNum(selectedNum); const s=scorePalace(p,chart.settings.qtype); const summary=makeSummary(p,s);
  return {
    id:`case-${Date.now()}`,
    savedAt:new Date().toISOString(),
    title:document.getElementById("caseTitle").value.trim()||`${chart.settings.qtype}｜${chart.meta.solar}`,
    outcome:document.getElementById("caseOutcome").value.trim(),
    qtype:chart.settings.qtype,
    question:chart.question||questionText(),
    selectedNum,
    lockedPalace:p?`${p.key}${p.number}`:"",
    result:s.denied?"直接否定":`${s.score}/100 ${s.grade.name}`,
    summary:summary.total,
    payload:chartPayload()
  };
}
function saveCurrentCase(){
  try{
    const cases=loadCases(); cases.unshift(currentCase()); saveCases(cases.slice(0,100));
    document.getElementById("caseTitle").value=""; document.getElementById("caseOutcome").value="";
    renderCases(); toast("案例已儲存。");
  }catch(err){toast(err.message||"案例儲存失敗。")}
}
function renderCases(){
  const box=document.getElementById("caseList"); if(!box)return;
  const query=(document.getElementById("caseSearch")?.value||"").trim().toLowerCase();
  const cases=loadCases().filter(c=>!query||[c.title,c.outcome,c.qtype,c.lockedPalace,c.result,c.summary].join(" ").toLowerCase().includes(query));
  if(!cases.length){box.innerHTML=`<div class="case-empty">尚無案例。</div>`; return}
  box.innerHTML=cases.map(c=>`<div class="case-card" data-case-id="${escapeHTML(c.id)}">
    <div>
      <h3>${escapeHTML(c.title)}</h3>
      <small>${escapeHTML(c.qtype)}｜${escapeHTML(c.lockedPalace)}｜${escapeHTML(c.result)}｜${new Date(c.savedAt).toLocaleString("zh-TW")}</small>
      ${c.question?`<small>問事：${escapeHTML(c.question)}</small>`:""}
      <div class="case-tags"><span class="tab">${escapeHTML(c.selectedNum)}</span><span class="tab">${escapeHTML(c.outcome||"未填結果")}</span></div>
    </div>
    <div class="case-actions">
      <button class="case-mini" type="button" data-action="load">回看</button>
      <button class="case-mini danger" type="button" data-action="delete">刪除</button>
    </div>
  </div>`).join("");
}
function handleCaseClick(event){
  const btn=event.target.closest("button[data-action]"); if(!btn)return;
  const card=btn.closest("[data-case-id]"); const id=card?.dataset.caseId; const cases=loadCases(); const item=cases.find(c=>c.id===id); if(!item)return;
  if(btn.dataset.action==="load"){restoreChartPayload(item.payload); toast("已載入案例。"); return}
  if(btn.dataset.action==="delete"){saveCases(cases.filter(c=>c.id!==id)); renderCases(); toast("案例已刪除。");}
}
async function importJsonFile(file){
  if(!file)return;
  try{
    const payload=JSON.parse(await file.text());
    if(Array.isArray(payload.cases)){saveCases(payload.cases); renderCases(); toast("已匯入案例庫。"); return}
    restoreChartPayload(payload);
  }catch(err){toast(err.message||"JSON 匯入失敗。")}
}
function registerServiceWorker(){
  if("serviceWorker" in navigator && location.protocol.startsWith("http")){
    navigator.serviceWorker.register("sw.js?v=copy-bank-11").then(reg=>{
      if(reg.waiting)reg.waiting.postMessage({type:"SKIP_WAITING"});
      reg.update().catch(()=>{});
    }).catch(()=>{});
  }
}

// ===== Soul Engine：可解釋分數與老師式報告 =====
function grade(score){
  if(score>=80)return {name:"大吉",cls:"score-good",level:"大吉，可主動行動"};
  if(score>=60)return {name:"可用",cls:"score-good",level:"可用，但要照建議做"};
  if(score>=30)return {name:"有風險",cls:"score-mid",level:"有風險，只能小做、試做、保守做"};
  return {name:"不建議",cls:"score-bad",level:"不建議，宜靜不宜動"};
}
function qtypeRule(qtype){return QTYPE_RULES[qtype]||QTYPE_RULES["今日運勢"]}
function evidenceSource(type){return {door:"門",star:"星",god:"神",stem:"干",flag:"墓迫刑馬",palace:"宮",qtype:"題型"}[type]||"題型"}
function evidenceKind(value,isDeny,type,sym){if(isDeny)return "warning"; if(value>0)return "good"; if(value<0)return type==="flag"&&sym==="空"?"neutral":"risk"; return "neutral"}
function evidenceReason(type,sym,qtype){
  const q=qtypeRule(qtype);
  if(type==="door")return DOOR_ADVICE[sym]||doorMeaning(sym)||`${sym}代表此事的行動入口與推進方式。`;
  if(type==="star")return `${sym}主${starMeaning(sym)||"此事的內在狀態"}，會影響事情能不能穩定落地。`;
  if(type==="god")return GOD_ADVICE[sym]||`${sym}代表人事氣氛與外在助力。`;
  if(type==="stem")return `${sym}落在本宮，代表此事帶著資源、條件或壓力，需要看它是助力還是阻力。`;
  if(type==="flag")return flagText(sym);
  if(type==="palace")return `鎖在${sym}，以${PALACE_DIR[sym]}、五行${PALACE_ELEM[sym]}作為今日主要觀察點。`;
  return q.description;
}
function evidenceAction(type,sym,qtype,value,isDeny){
  const q=qtypeRule(qtype);
  if(sym==="空")return "先查證、暫緩承諾、不要重押，等條件填實再放大。";
  if(sym==="死門")return "不開新案，可做結案、整理、停損、封存與斷捨離。";
  if(sym==="白虎")return "避爭執、避危險操作、不要硬碰硬，重要話先緩一拍。";
  if(sym==="驚門")return "先核對訊息，不因一句話或一則通知立刻行動。";
  if(sym==="杜門")return "適合整理資料、等待審核、保密內修，不適合硬闖。";
  if(sym==="玄武")return "查證、留文字，不只信口頭承諾，錢與條件要寫清楚。";
  if(sym==="傷門")return "放慢速度，避免衝突、受傷、破財或情緒性回覆。";
  if(sym==="墓")return "先整理舊資料與卡點，讓事情從混亂中收束。";
  if(sym==="刑"||sym==="迫"||sym==="制")return "條件一條一條確認，少用壓迫方式推進。";
  if(sym==="馬")return "可動、可拜訪、可換方向，但行程與備案要先排好。";
  if(value>0)return `${q.tone}上可以採取小步行動，但要留下紀錄與退路。`;
  if(isDeny||value<0)return "今天先守，不急著定案，避免把風險放大。";
  return "作為輔助觀察，不單獨決定吉凶。";
}
function makeEvidence(type,sym,value,qtype,isDeny=false){
  return {type:evidenceKind(value,isDeny,type,sym),source:evidenceSource(type),name:sym,score:isDeny?0:value,reason:evidenceReason(type,sym,qtype),action:evidenceAction(type,sym,qtype,value,isDeny)};
}
function scorePalaceRaw(p,qtype){
  let score=0; const reasons=[]; const deniers=[]; const rawEvidence=[];
  if(!p||p.isCenter)return {score:0,reasons:[{label:"中宮不用",value:0,text:"中宮不直接作鎖單宮判斷。"}],rawEvidence,denied:false,deniers:[],grade:grade(0)};
  function deny(type,sym){
    if(sym&&DIRECT_DENY[type]&&DIRECT_DENY[type].has(sym)){
      const ev=makeEvidence(type,sym,contribution(type,sym),qtype,true);
      deniers.push({label:denyReason(type,sym),value:0,text:`${sym}：${ev.reason} ${ev.action}`,evidence:ev});
      rawEvidence.push(ev);
    }
  }
  function add(type,label,sym){
    if(!sym)return;
    const value=contribution(type,sym);
    if(value>0){score+=value; const ev=makeEvidence(type,sym,value,qtype,false); reasons.push({label,value,text:`${sym}：${ev.reason} ${ev.action}`,evidence:ev}); rawEvidence.push(ev);}
    else if(value<0){rawEvidence.push(makeEvidence(type,sym,value,qtype,false));}
  }
  rawEvidence.push(makeEvidence("palace",p.key,0,qtype,false));
  deny("god",p.god); deny("star",p.star); deny("door",p.door);
  p.top.concat(p.bottom).forEach(st=>deny("stem",st));
  p.flags.forEach(f=>deny("flag",f));
  if(deniers.length)return {score:0,reasons:deniers,denied:true,directDeny:true,deniers,rawEvidence,grade:{name:"強烈不建議",cls:"score-bad",level:"強烈不建議，但要說清楚是哪一種否定"}};
  add("god","八神",p.god); add("star","九星",p.star); add("door","八門",p.door);
  p.top.concat(p.bottom).forEach(st=>add("stem","天干",st));
  p.flags.forEach(f=>rawEvidence.push(makeEvidence("flag",f,0,qtype,false)));
  score=clamp(Math.round(score),0,100);
  return {score,reasons,denied:false,directDeny:false,deniers:[],rawEvidence,grade:grade(score)};
}
function scorePalace(p,qtype){
  if(!p||p.isCenter)return {score:0,reasons:[{label:"中宮不用",value:0,text:"中宮不直接作鎖單宮判斷。"}],rawEvidence:[],grade:grade(0)};
  return scorePalaceRaw(p,qtype);
}
function evidenceText(ev){const mark=ev.score>0?`+${ev.score}`:ev.score<0?String(ev.score):"0"; return `${ev.source}｜${ev.name}｜${mark}：${ev.reason} 建議：${ev.action}`}
function listText(items){return items&&items.length?items.map(x=>`- ${x}`).join("\n"):""}
function samePalaceHas(p,names){return names.some(n=>p.door===n||p.star===n||p.god===n||p.top.includes(n)||p.bottom.includes(n)||p.flags.includes(n)||p.key===n)}
function uniqueText(items){return unique(items.map(x=>String(x||"").trim()).filter(Boolean))}
function sentenceList(items){return uniqueText(items).slice(0,6).join(" ")}
function buildTodayAdvice(p,s,qtype){
  const q=qtypeRule(qtype);
  const speechRisk=samePalaceHas(p,["兌","景門","驚門","白虎","天柱","玄武"]);
  const financeMark=samePalaceHas(p,["生門","戊","六合","太陰","玄武","空"]);
  const workMark=samePalaceHas(p,["開門","景門","杜門","驚門","死門"]);
  const healthMark=samePalaceHas(p,["天芮","死門","傷門","白虎"]);
  const suitable=["先完成最重要的一件事，不分散火力。",`善用${PALACE_DIR[p.key]}，把文件、訊息或計畫整理清楚。`,"可先試探、確認、約時間，不急著一次定生死。","重要承諾保留文字紀錄。","把能收尾、能補資料、能確認的人事物先處理。"];
  const avoid=["不在情緒高點回覆訊息。","不為了面子硬答應。","不做看不懂的大額投入。","不把模糊條件當成已經成交。","不在口舌或壓力升高時拍板。"];
  if(["開門","生門","休門"].includes(p.door))suitable.push(`可用${p.door}的方向小步推進：先開口、先整理、先談可確認的條件。`);
  if(p.door==="景門")suitable.push("適合做說明、簡報、文案、公開資訊，但資料要準。");
  if(p.door==="杜門")suitable.push("適合內部整理、保密規劃、補文件，不急著公開。");
  if(p.door==="死門")suitable.push("適合收尾、清理、封存舊事，不適合開新局。");
  if(p.door==="驚門")avoid.push("不要因通知、傳聞或一句話立刻反應，先核對來源。");
  if(p.door==="傷門")avoid.push("避免硬碰硬、急躁操作、危險工具或容易破財的衝動。");
  if(p.god==="六合")suitable.push("可以借人脈、介紹、合作關係推一小步。");
  if(p.god==="太陰")suitable.push("適合暗中準備、修文字、查細節，不必急著表態。");
  if(p.god==="玄武")avoid.push("不要只信口頭承諾，錢、條件、時間要留文字。");
  if(p.god==="白虎")avoid.push("避免爭執、刀火金屬、強硬對抗與危險操作。");
  if(p.flags.includes("空"))avoid.push("空亡代表未落實，今天不要把未確認的話當成已成交。");
  if(p.flags.includes("馬"))suitable.push("若要拜訪、移動、換方向，可以動，但先排好備案。");
  return {
    total:s.denied?"宜守不宜動":s.score>=80?"偏吉，宜主動":s.score>=60?"可用，宜小步推進":s.score>=30?"偏壓力，宜保守試做":"宜靜，先觀察",
    topic:[p.door,p.star,p.god].filter(Boolean).join("、")||q.tone,
    suitable:uniqueText(suitable).slice(0,6),
    avoid:uniqueText(avoid).slice(0,6),
    speech:speechRisk?q.speech:"說話保持簡短、具體、有紀錄，少用刺激字眼。",
    finance:financeMark?q.finance:"財務先守住基本盤，不急著放大支出。",
    work:workMark?q.work:"工作先做可驗收的小交付，少開新戰線。",
    health:healthMark?q.health:"今日仍要留意休息與壓力；若有明顯症狀，請以正式醫療檢查為準。"
  };
}
function classifyFengShuiPalace(p){
  const s=scorePalaceRaw(p,chart?.settings?.qtype||"今日運勢");
  if(p.door==="死門"||p.god==="白虎"||p.star==="天芮"||p.flags.includes("迫")||p.flags.includes("刑"))return "avoid";
  if(p.door==="驚門"||p.door==="杜門"||p.god==="玄武"||p.god==="螣蛇"||p.flags.includes("空"))return "quiet";
  if(["生門","開門","休門"].includes(p.door)&&!s.denied)return "activate";
  return s.score>=60?"activate":s.score>=30?"quiet":"avoid";
}
function bestFengShui(type,locked){
  const matched=(chart?.palaces||[]).filter(p=>!p.isCenter&&classifyFengShuiPalace(p)===type).sort((a,b)=>scorePalaceRaw(b,chart.settings.qtype).score-scorePalaceRaw(a,chart.settings.qtype).score);
  return matched[0]||locked;
}
function buildFengShuiPlan(locked){
  const activate=bestFengShui("activate",locked), quiet=bestFengShui("quiet",locked), avoid=bestFengShui("avoid",locked);
  return {
    activate:`啟動方：${PALACE_DIR[activate.key]}（${activate.key}宮）。清掉雜物、放柔和小燈或健康綠植，可在此方整理合約、報價、計畫，或面向此方傳重要訊息。`,
    quiet:`安靜方：${PALACE_DIR[quiet.key]}（${quiet.key}宮）。保持乾淨，不大聲講電話，不放音響，不堆帳單與雜亂電線。`,
    avoid:`避動方：${PALACE_DIR[avoid.key]}（${avoid.key}宮）。不敲打、不修繕、不搬重物、不在此方爭吵，也不在此方做重大決定。`,
    activatePalace:activate.key,
    quietPalace:quiet.key,
    avoidPalace:avoid.key
  };
}
function copyBank(){return window.QIMEN_COPY_BANK||{}}
function stableHash(text){let h=2166136261; for(let i=0;i<String(text).length;i++){h^=String(text).charCodeAt(i); h=Math.imul(h,16777619)} return Math.abs(h>>>0)}
function pickCopy(pool,seed){const arr=Array.isArray(pool)?pool.filter(Boolean):pool?[pool]:[]; if(!arr.length)return ""; return arr[stableHash(seed)%arr.length]}
function qtypeCopyKey(qtype){return {"工作":"work","財運":"money","感情":"relationship","合作":"work","風水":"fengshui"}[qtype]||"general"}
function modifierName(flag){return {"空":"空亡","墓":"入墓","迫":"門迫","刑":"擊刑","馬":"驛馬","制":"門迫"}[flag]||flag}
function evidenceTypeByScore(score,source,name){
  if(score>0)return "good";
  if(score<0)return name==="空亡"?"neutral":"risk";
  if(["空亡","入墓","門迫","擊刑","驛馬"].includes(name))return name==="驛馬"?"neutral":"risk";
  return "neutral";
}
function pushEvidence(list,used,ev){
  if(!ev||!ev.name)return;
  const key=[ev.source,ev.name,ev.reason,ev.action].join("|");
  if(used.has(key))return;
  used.add(key); list.push(ev);
}
function buildCopyBankEvidence(sourceChart,p,qtype,scoreInfo){
  const bank=copyBank(); const used=new Set(); const evidence=[]; const seedBase=[sourceChart?.meta?.solar,p?.key,p?.door,p?.star,p?.god,qtype].join("|");
  const typeKey=qtypeCopyKey(qtype);
  const add=(source,name,type,reason,action,score=0)=>{
    const cleanReason=reason||`${name}提供本次判斷依據。`;
    const cleanAction=action&&action!==cleanReason?action:"先小步確認，保留紀錄與退路。";
    pushEvidence(evidence,used,{source,name,type:evidenceTypeByScore(score,source,name)||type,score,reason:cleanReason,action:cleanAction});
  };
  const palace=bank.palace?.[p.key];
  add("宮",p.key,"neutral",pickCopy(palace?.general,seedBase+"palace")||evidenceReason("palace",p.key,qtype),pickCopy(palace?.action,seedBase+"palaceAction")||`以${PALACE_DIR[p.key]}作為主要觀察場域。`);
  const door=bank.door?.[p.door]; const doorReason=pickCopy(door?.[typeKey],seedBase+"doorQ")||pickCopy(door?.general,seedBase+"door")||evidenceReason("door",p.door,qtype);
  add("門",p.door,"neutral",doorReason,pickCopy(door?.action,seedBase+"doorAction")||evidenceAction("door",p.door,qtype,contribution("door",p.door),false),contribution("door",p.door));
  const star=bank.star?.[p.star]; const starScore=contribution("star",p.star); const starReason=pickCopy(starScore<0?star?.risk:star?.good,seedBase+"star")||star?.logic||evidenceReason("star",p.star,qtype);
  add("星",p.star,"neutral",starReason,pickCopy(star?.action,seedBase+"starAction")||evidenceAction("star",p.star,qtype,starScore,false),starScore);
  const god=bank.god?.[p.god]; const godScore=contribution("god",p.god); const godReason=pickCopy(godScore<0?god?.risk:god?.good,seedBase+"god")||god?.logic||evidenceReason("god",p.god,qtype);
  add("神",p.god,"neutral",godReason,pickCopy(god?.action,seedBase+"godAction")||evidenceAction("god",p.god,qtype,godScore,false),godScore);
  p.top.forEach((st,i)=>{const stem=bank.stem?.[st]; add("天盤干",st,"neutral",stem?.sky||evidenceReason("stem",st,qtype),stem?.logic?`外在先看${stem.logic}，把它落成可確認的紀錄。`:"把外在變化寫清楚，不只憑感覺。",contribution("stem",st));});
  p.bottom.forEach((st,i)=>{const stem=bank.stem?.[st]; add("地盤干",st,"neutral",stem?.earth||evidenceReason("stem",st,qtype),stem?.logic?`底層原因多與${stem.logic}有關，先處理根因再推進。`:"先處理底層原因，再看外在結果。",contribution("stem",st));});
  p.flags.forEach(flag=>{const name=modifierName(flag); const mod=bank.modifier?.[name]; add("特殊象",name,"risk",mod?.general||flagText(flag),mod?.action||evidenceAction("flag",flag,qtype,0,false),contribution("flag",flag));});
  const symbols=[p.key,p.door,p.star,p.god].concat(p.top,p.bottom,p.flags.map(modifierName));
  (bank.combo||[]).forEach((combo,idx)=>{if(comboMatches(combo,p,qtype,symbols)){add("組合",combo.logic||combo.match.join("+"),"neutral",combo.text,"把這個組合當成主要取用方向，先小步驗證，不一次重押。",0)}});
  const qt=bank.qtype?.[qtype]; add("題型",qtype,"neutral",qt?.tone?`本題型重點是${qt.tone}。`:(qtypeRule(qtype).description||"依題型調整語氣與重點。"),qt?.mustOutput?.length?`報告需落到：${qt.mustOutput.join("、")}。`:qtypeAdvice(qtype),0);
  if(!evidence.length && scoreInfo?.rawEvidence)evidence.push(...scoreInfo.rawEvidence);
  return evidence;
}
function comboMatches(combo,p,qtype,symbols){
  if(combo.palace&&combo.palace!==p.key)return false;
  if(combo.qtype&&combo.qtype!==qtype)return false;
  if(combo.match&&!combo.match.every(x=>symbols.includes(x)))return false;
  if(combo.any&&!combo.any.some(x=>symbols.includes(x)))return false;
  return true;
}
function joinEvidence(evidence,filter,fallback){
  const rows=evidence.filter(filter).map(ev=>`${ev.name}：${ev.reason} ${ev.action}`);
  return sentenceList(rows)||fallback;
}
function resultEvidenceItems(evidence){
  const order=["宮","門","星","神","天盤干","地盤干","特殊象","組合","題型"];
  const picked=[]; const used=new Set();
  order.forEach(source=>{
    const item=evidence.find(ev=>ev.source===source&&!used.has(`${ev.source}|${ev.name}`));
    if(item){picked.push(item); used.add(`${item.source}|${item.name}`);}
  });
  evidence.forEach(ev=>{if(picked.length<9&&!used.has(`${ev.source}|${ev.name}`)){picked.push(ev); used.add(`${ev.source}|${ev.name}`);}});
  return picked;
}
function levelPhrase(level,seed){
  const phrases=copyBank().levelPhrases?.[level]||[];
  return pickCopy(phrases,seed)||level;
}
function cleanSentence(text){
  return String(text||"").replace(/\s+/g," ").replace(/[。；，]+$/,"").trim();
}
function symbolLogic(source,name){
  const bank=copyBank();
  if(source==="宮")return bank.palace?.[name]?.logic||`${PALACE_DIR[name]||"此方"}的場域`;
  if(source==="門")return bank.door?.[name]?.logic||"事情的行動入口";
  if(source==="星")return bank.star?.[name]?.logic||"事情的品質與底色";
  if(source==="神")return bank.god?.[name]?.logic||"人心與暗面";
  if(source==="天盤干"||source==="地盤干")return bank.stem?.[name]?.logic||"條件與壓力";
  if(source==="特殊象")return bank.modifier?.[name]?.logic||"吉凶修正";
  if(source==="題型")return bank.qtype?.[name]?.tone||qtypeRule(name).tone;
  return "盤面訊號";
}
function taixuLevelPhrase(level,seed){
  const map={
    "大吉":["這不是躺著等好事，而是盤面有可用的順勢點；趁它順，把能確認的事往前推。","能量天平目前偏向可用，但吉象也要靠行動承接；先抓重點，不要浪費火力。"],
    "可用":["這不是大開綠燈，而是條件有路；先小步驗證，再決定要不要放大。","此局可用，但不是無條件可衝；把流程、話術與退路先設好。"],
    "有風險":["這不是不能做，而是能量天平有點偏斜；先把風險降級，再談推進。","眼前有路，但路面不平；先降速、查證、縮小投入。"],
    "不建議":["這不是宣判失敗，而是現在硬推成本偏高；先收斂、整理、等訊號。","此局阻力較重，今天的重點不是硬闖，而是少犯錯、少消耗。"],
    "強烈不建議":["不是嚇你，是盤面壓力集中；今天先降速，避免把小問題放大。","此象不適合硬推，先把火降下來、把條件查清楚，再決定下一步。"]
  };
  return pickCopy(map[level]||[],seed)||levelPhrase(level,seed);
}
function taixuFrame(phenomenon,logic,solution){
  return `現象：${cleanSentence(phenomenon)}。邏輯：${cleanSentence(logic)}。降級方案：${cleanSentence(solution)}。`;
}
function taixuEvidenceSentence(ev){
  const reason=cleanSentence(ev.reason);
  const action=cleanSentence(ev.action);
  const logic=symbolLogic(ev.source,ev.name);
  if(ev.source==="宮")return taixuFrame(`${ev.name}宮把事情拉到${PALACE_DIR[ev.name]||"此方"}這個場域`,`${ev.name}宮主${logic}，先決定這件事會在哪裡發生`,action||`先整理${PALACE_DIR[ev.name]||"此方"}相關的人、事、物`);
  if(ev.source==="門")return taixuFrame(`${ev.name}讓事情以「${logic}」的方式冒出來`,`${ev.name}不是單純吉凶，而是告訴你該用哪種行動方式`,action);
  if(ev.source==="星")return taixuFrame(`${ev.name}決定這件事的品質與速度`,`${logic}會影響事情是穩、亂、快、慢，不能只看表面分數`,action);
  if(ev.source==="神")return taixuFrame(`${ev.name}顯示人心與暗面的氣氛`,`${logic}說明背後可能有貴人、暗助、合作、衝突或隱情`,action);
  if(ev.source==="天盤干")return taixuFrame(`天盤${ev.name}顯示外在正在發生的變化`,reason||logic,action||"把外在變化落成可確認的紀錄");
  if(ev.source==="地盤干")return taixuFrame(`地盤${ev.name}顯示底層原因`,reason||logic,action||"先處理根因，再看外在結果");
  if(ev.source==="特殊象")return taixuFrame(`${ev.name}是在修正吉凶，不是拿來嚇人`,reason||logic,action);
  if(ev.source==="組合")return taixuFrame(`${ev.name}形成組合象`,reason||logic,action||"先小步驗證，不一次重押");
  if(ev.source==="題型")return taixuFrame(`本題型是「${ev.name}」`,reason||logic,action||qtypeAdvice(ev.name));
  return taixuFrame(ev.name,reason,action);
}
function taixuJoinEvidence(evidence,filter,fallback){
  const rows=evidence.filter(filter).map(taixuEvidenceSentence);
  return sentenceList(rows)||fallback;
}
function taixuBullet(items){
  return uniqueText(items).slice(0,6).map(x=>`- ${cleanSentence(x)}。`).join("\n");
}
function taixuReportIntro(mode){
  if(mode==="simple")return "不說廢話，先看結論：這份報告不把吉凶講死，只看哪裡可用、哪裡受阻，以及今天怎麼把風險降級。";
  return "大家好，我是太虛，不說廢話，正式開始。奇門不是用來製造恐懼，而是把盤面拆成可觀察、可驗證、可調整的系統：先看平衡有沒有失衡，流通有沒有受阻，再把風險降級。";
}
function generateSoulReport(sourceChart, selectedPalace, qtype){
  const p=selectedPalace; const s=scorePalace(p,qtype); const bank=copyBank(); const evidence=buildCopyBankEvidence(sourceChart,p,qtype,s);
  const today=buildTodayAdvice(p,s,qtype); const feng=buildFengShuiPlan(p);
  const positives=evidence.filter(ev=>ev.type==="good"); const risks=evidence.filter(ev=>ev.type==="risk"||ev.type==="warning");
  const level=s.denied?"強烈不建議":s.grade.name; const seed=[sourceChart?.meta?.solar,p.key,qtype,level].join("|");
  const firstRisk=risks[0]; const firstGood=positives[0]; const symbols=[p.door,p.star,p.god].filter(Boolean).join("、");
  const headline=s.denied
    ? `${p.key}宮${firstRisk?`見${firstRisk.name}`:"阻力偏重"}：${taixuLevelPhrase(level,seed)}`
    : `${p.key}宮${symbols?`見${symbols}`:"成象"}：${taixuLevelPhrase(level,seed)}`;
  const presentParts=[
    taixuJoinEvidence(evidence,ev=>ev.source==="宮","現象：此事先看鎖定宮位的場域。邏輯：宮位決定事件發生的位置與人事場域。降級方案：先把這個場域的人、事、物整理清楚。"),
    taixuJoinEvidence(evidence,ev=>ev.source==="門","現象：八門說明事情如何發生。邏輯：門不是單純吉凶，而是行動方式。降級方案：用對方法，小步推進。"),
    taixuJoinEvidence(evidence,ev=>ev.source==="星","現象：九星說明事情品質。邏輯：星看事情是穩、亂、快、慢。降級方案：按事情品質調整節奏。"),
    taixuJoinEvidence(evidence,ev=>ev.source==="神","現象：八神說明人心與暗面。邏輯：人心不穩，事情就不穩。降級方案：留紀錄、降情緒、看證據。")
  ];
  const obstacle=taixuJoinEvidence(evidence,ev=>ev.type==="risk"||ev.type==="warning","現象：主要阻礙不明顯。邏輯：沒有明顯凶象不等於可以亂衝，仍要看現實條件是否流通。降級方案：避免講太滿、做太快，先把關鍵條件確認。");
  const opportunity=taixuJoinEvidence(evidence,ev=>ev.type==="good"||ev.source==="組合","現象：機會尚未成形。邏輯：沒有明顯吉象時，重點是等待能量流通的訊號。降級方案：先確認、整理、等待正式回覆，不急著定案。");
  const actionPlan=qtype==="今日運勢"?taixuBullet(today.suitable):taixuJoinEvidence(evidence,ev=>["門","神","組合","題型"].includes(ev.source),`現象：本題重點是${qtypeRule(qtype).tone}。邏輯：題型會改變同一個象的用法。降級方案：${qtypeAdvice(qtype)}`);
  const avoidPlan=qtype==="今日運勢"?taixuBullet(today.avoid):taixuJoinEvidence(evidence,ev=>ev.type==="risk"||ev.source==="特殊象","現象：目前不適合重押。邏輯：風險象代表能量流動受阻或條件未實。降級方案：不要急著定案，先查證條件，保留退路。");
  const fengShui=[feng.activate,feng.quiet,feng.avoid].map(line=>`環境調整：${line} 這不是改命，而是把地利整理到比較不干擾人的狀態。`).join("\n");
  return {
    headline, score:s.score, level,
    palaceSummary:`報數 ${selectedNum} 鎖 ${p.key}${p.number}宮，方位在${PALACE_DIR[p.key]}，五行屬${PALACE_ELEM[p.key]}。本次以「${qtype}」解讀，依宮、門、星、神、干、特殊象與題型組合判斷；文字採現象、邏輯、降級方案三段式。`,
    why:evidence.map(evidenceText),
    present:sentenceList(presentParts),
    obstacle,
    opportunity,
    actionPlan,
    avoidPlan,
    fengShui,
    fengShuiPlan:feng,
    timing:"先以今日到明日為觀察窗；若有空亡或條件未落實，等對方回覆、文件確認、款項入帳後再放大行動。",
    verifyPoints:["今天是否真的出現盤面提示的主題，而不是只停在感覺。","採取建議後，事情是否被降級：衝突變少、成本變小、風險變可控。","阻礙是出現在溝通、金錢、工作、健康、風水或其他面向。","明日回填準確度 1-5 星，記錄應在哪一件事上。"],
    confidence:s.denied?"中高，因為有直接否定象":positives.length&&risks.length?"中等，吉凶並見，需要照建議取用":positives.length?"中高，主要依據集中在可用象":"中低，正向依據不足",
    evidence,
    rawEvidence:evidence,
    todayAdvice:today
  };
}
function makeSoulReport(p,s){return generateSoulReport(chart,p,chart?.settings?.qtype||"今日運勢")}
window.generateSoulReport = generateSoulReport;
function makeSummary(p,s){const r=makeSoulReport(p,s); return {short:r.level,total:r.headline,action:String(r.actionPlan).replace(/\n/g," "),avoid:String(r.avoidPlan).replace(/\n/g," "),fengshui:r.fengShui.replace(/\n/g," ")}}
function renderResult(){
  const metricLock=document.getElementById("metricLock"), metricScore=document.getElementById("metricScore");
  if(!chart||!selectedNum){document.getElementById("resultSub").textContent="尚未選數"; document.getElementById("resultHeadline").textContent="先起盤並選數。"; document.getElementById("scoreNum").textContent="—"; document.getElementById("gradeText").textContent="未鎖定"; document.getElementById("scoreBar").style.width="0%"; document.getElementById("resultList").innerHTML=""; document.getElementById("reasonTabs").innerHTML=""; metricLock.textContent="未選數"; metricScore.textContent="—"; return}
  const p=getPalaceByNum(selectedNum); const s=scorePalace(p,chart.settings.qtype); const report=makeSoulReport(p,s);
  metricLock.textContent=`${selectedNum}｜${p.key}${PALACE_DIR[p.key]?"・"+PALACE_DIR[p.key]:""}`; metricScore.textContent=`${s.denied?"強烈不建議":s.score+"/100 "+s.grade.name}`;
  document.getElementById("resultSub").textContent=`${selectedNum} 號鎖 ${p.key}宮｜${PALACE_DIR[p.key]||"中央"}`; document.getElementById("scoreNum").textContent=s.denied?"×":s.score; document.getElementById("gradeText").innerHTML=`<span class="score-pill ${s.grade.cls}">${escapeHTML(report.level)}</span>`; document.getElementById("scoreBar").style.width=(s.denied?100:s.score)+"%";
  document.getElementById("reasonTabs").innerHTML=[`<span class="tab active">${p.key}${p.number}</span>`,`<span class="tab">${chart.settings.qtype}</span>`,`<span class="tab">用途權重待確認</span>`].join("");
  document.getElementById("resultHeadline").textContent=report.headline;
  const evidence=resultEvidenceItems(report.evidence).map(ev=>`<div class="item"><strong>${escapeHTML(ev.source)}｜${escapeHTML(ev.name)}</strong>${escapeHTML(taixuEvidenceSentence(ev))}</div>`).join("");
  const today=report.todayAdvice;
  const todayCards=chart.settings.qtype==="今日運勢"?`<div class="item action"><strong>今日總運</strong>${escapeHTML(today.total)}｜主題：${escapeHTML(today.topic)}</div><div class="item action"><strong>今日說話</strong>${escapeHTML(today.speech)}</div><div class="item action"><strong>今日財務</strong>${escapeHTML(today.finance)}</div><div class="item action"><strong>今日工作</strong>${escapeHTML(today.work)}</div><div class="item action"><strong>健康提醒</strong>${escapeHTML(today.health)}</div>`:"";
  document.getElementById("resultList").innerHTML=`<div class="item"><strong>目前狀態</strong>${escapeHTML(report.present)}</div><div class="item action"><strong>今天怎麼做</strong>${escapeHTML(String(report.actionPlan).replace(/\n/g," "))}</div><div class="item action"><strong>先避開</strong>${escapeHTML(String(report.avoidPlan).replace(/\n/g," "))}</div>${todayCards}<div class="item action"><strong>風水三方位</strong>${escapeHTML(report.fengShui).replace(/\n/g,"<br>")}</div>${evidence}`;
}
function todayReportBlock(report){
  const t=report.todayAdvice;
  return [`今日總運：${t.total}`,`今日主題：${t.topic}`,`今日適合：\n${listText(t.suitable)}`,`今日不適合：\n${listText(t.avoid)}`,`今日說話建議：${t.speech}`,`今日財務建議：${t.finance}`,`今日工作建議：${t.work}`,`今日健康提醒：${t.health}`].join("\n\n");
}
function reportEvidenceBlock(report,mode){
  const items=mode==="simple" ? resultEvidenceItems(report.evidence).slice(0,6) : resultEvidenceItems(report.evidence);
  const lines=items.map(evidenceNarrative).filter(Boolean);
  const evidenceText=lines.length?lines.map((line,i)=>`${i+1}. ${line}`).join("\n"):"尚無解盤依據。";
  if(mode==="simple")return evidenceText;
  return `${sevenLayerMethodBlock()}\n\n盤面依據：\n${evidenceText}`;
}
function sevenLayerMethodBlock(){
  return [
    "解盤順序：",
    "先說人話：不把吉凶講死，只看哪裡失衡、哪裡堵住、哪裡可以補償。",
    "第一層：宮位。判斷事情在哪個場域發生。",
    "第二層：八門。判斷事情以什麼方式出現，適合怎麼行動。",
    "第三層：九星。判斷事情的品質，是穩、亂、快、慢、病、口舌、表現、決策。",
    "第四層：八神。判斷背後人心，是有貴人、有暗助、有合作、有衝突、有隱瞞。",
    "第五層：天盤干、地盤干。天盤看外在發生什麼，地盤看底層原因。",
    "第六層：空、墓、迫、刑、馬。修正吉凶，判斷事情是未實、被壓、受迫、內耗、要動。",
    "第七層：題型。同一個象，依今日、財運、工作、感情、風水改寫。"
  ].join("\n");
}
function evidenceNarrative(ev){
  return taixuEvidenceSentence(ev);
}
function compactText(text,max=260){
  const clean=String(text||"").replace(/\s+/g," ").trim();
  if(clean.length<=max)return clean;
  const cut=clean.slice(0,max);
  const last=Math.max(cut.lastIndexOf("。"),cut.lastIndexOf("；"),cut.lastIndexOf("，"));
  return (last>80?cut.slice(0,last):cut).replace(/[。；，]+$/,"")+"。";
}
function compactBulletBlock(text,count=3){
  const parts=String(text||"").split(/\n|。/).map(cleanSentence).filter(Boolean);
  return uniqueText(parts).slice(0,count).map(x=>`- ${x}。`).join("\n");
}
function shortEvidenceBlock(report,count=3){
  const items=resultEvidenceItems(report.evidence).slice(0,count);
  return items.map((ev,i)=>`${i+1}. ${ev.source}｜${ev.name}：${compactText(taixuEvidenceSentence(ev),150)}`).join("\n");
}
function teacherEvidenceBlock(report){
  const items=resultEvidenceItems(report.evidence);
  return items.map((ev,i)=>`${i+1}. ${ev.source}看${ev.name}\n${taixuEvidenceSentence(ev)}`).join("\n\n");
}
function teacherLayerArticle(report,p,qtype){
  const dir=PALACE_DIR[p.key]||"中央";
  const flags=p.flags.length?p.flags.map(modifierName).join("、"):"沒有明顯空、墓、迫、刑、馬";
  return [
    `第一步，先定場域。\n這次鎖在${p.key}宮，方位是${dir}。宮位不是拿來裝飾的，它先告訴我們：這件事主要會在哪個場域發生。`,
    `第二步，看行動入口。\n門是${p.door||"無門"}。同一件事，如果門不同，用法就不同；能不能推，不只看分數，也要看方法對不對。`,
    `第三步，看事情品質。\n星是${p.star||"無星"}。星負責判斷事情是穩、亂、快、慢、病、口舌、表現，這會決定你該加速還是降速。`,
    `第四步，看人心暗面。\n神是${p.god||"無神"}。神看的是背後的人心、助力、隱情與情緒，很多局不是事情難，是人心沒有流通。`,
    `第五步，看外在與底層。\n天盤干是${p.top.join("、")||"無"}，看外面正在發生什麼；地盤干是${p.bottom.join("、")||"無"}，看底層原因在哪裡。`,
    `第六步，修正吉凶。\n特殊象是${flags}。這一層不負責恐嚇，而是告訴你：事情是未實、被壓、受迫、內耗，還是需要移動。`,
    `第七步，套回題型。\n本題問「${qtype}」。所以同一個景門，問工作要看簡報、報告、主管回覆；問感情才看面子、聊天紀錄與說法。`
  ].join("\n\n");
}
function formatNinePartReport(report,question,mode="detail"){
  const title="九宮奇門鎖單宮詳細報告";
  return [
    title,
    taixuReportIntro("detail"),
    question?`問事：${question}`:"",
    `一、一句話總斷\n${report.headline}\n分數與傾向：${report.score}/100｜${report.level}`,
    `二、目前狀態\n${report.present}`,
    `三、主要阻礙\n${report.obstacle}`,
    `四、可用機會\n${report.opportunity}`,
    `五、今日行動建議\n${report.actionPlan}`,
    `六、今日不宜\n${report.avoidPlan}`,
    `七、風水改善\n${report.fengShui}`,
    `八、驗證點\n${listText(report.verifyPoints)}`,
    `九、解盤依據\n${reportEvidenceBlock(report,mode)}`
  ].filter(Boolean).join("\n\n");
}
function formatSimpleReport(report,question){
  return [
    "太虛快讀版",
    taixuReportIntro("simple"),
    question?`問事：${question}`:"",
    `結論\n${report.headline}`,
    `傾向\n${report.score}/100｜${report.level}`,
    `現在最重要的事\n${compactText(report.present,220)}`,
    `今天先做\n${compactBulletBlock(report.actionPlan,3)}`,
    `今天先避開\n${compactBulletBlock(report.avoidPlan,3)}`,
    `風水微調\n${compactText(report.fengShui,220)}`,
    `驗證\n${listText(report.verifyPoints.slice(0,2))}`,
    `主要依據\n${shortEvidenceBlock(report,3)}`
  ].filter(Boolean).join("\n\n");
}
function formatDetailReport(report,question,m){return formatNinePartReport(report,question,"detail")}
function formatTeacherReport(report,question,m,p){
  const stems=`天盤干：${p.top.join("、")||"無"}；地盤干：${p.bottom.join("、")||"無"}`;
  return [
    "太虛老師拆盤版",
    taixuReportIntro("teacher"),
    question?`問事：${question}`:"",
    `起盤資料\n${m.solar}｜${m.yearGZ}年 ${m.monthGZ}月 ${m.dayGZ}日 ${m.hourGZ}時｜${m.ju}｜空亡${m.kongwang}｜驛馬${m.yima}`,
    `鎖定宮位\n${report.palaceSummary}`,
    `盤面骨架\n${p.key}宮、${p.door||"無門"}、${p.star||"無星"}、${p.god||"無神"}、${stems}\n特殊象：${p.flags.length?p.flags.map(flagText).join("；"):"無明顯空亡、入墓、門迫、擊刑、驛馬標記。"}`,
    `老師總斷\n${report.headline}\n分數不是命令，只是目前能量天平的傾向：${report.score}/100｜${report.level}`,
    `這盤怎麼讀\n${teacherLayerArticle(report,p,chart.settings.qtype)}`,
    `取用方法\n${report.actionPlan}`,
    `避險方法\n${report.avoidPlan}`,
    `逐條依據\n${teacherEvidenceBlock(report)}`,
    `回驗方式\n${listText(report.verifyPoints)}`,
    `提醒\n本工具為奇門遁甲學習、決策輔助與風險降級用途，不取代醫療、法律、投資或專業意見。重大決策請結合現實資料判斷；風水只處理地利的一部分，不能代替人的努力與選擇。`
  ].filter(Boolean).join("\n\n");
}
function makeReport(mode=reportMode){
  if(!chart)return "尚未產生報告。"; const m=chart.meta; const question=chart.question||questionText();
  if(!selectedNum)return [`九宮奇門鎖單宮報告`,question?`問事：${question}`:"",`時間：${m.solar}`,`尚未選 1-9 鎖單宮。`].filter(Boolean).join("\n");
  const p=getPalaceByNum(selectedNum); const s=scorePalace(p,chart.settings.qtype); const report=makeSoulReport(p,s);
  if(mode==="simple")return formatSimpleReport(report,question);
  if(mode==="teacher")return formatTeacherReport(report,question,m,p);
  return formatDetailReport(report,question,m);
}
function chartPayload(){return {version:RULE_VERSION.app, ruleVersion:RULE_VERSION, exportedAt:new Date().toISOString(), question:chart?.question||questionText(), chart, selectedNum, report:selectedNum&&chart?makeSoulReport(getPalaceByNum(selectedNum),scorePalace(getPalaceByNum(selectedNum),chart.settings.qtype)):null}}
function currentCase(){
  if(!chart||!selectedNum)throw new Error("請先起盤並選數字。");
  const p=getPalaceByNum(selectedNum); const s=scorePalace(p,chart.settings.qtype); const report=makeSoulReport(p,s);
  const feedback=caseFeedbackFromForm();
  return {id:`case-${Date.now()}`,savedAt:new Date().toISOString(),updatedAt:new Date().toISOString(),title:document.getElementById("caseTitle").value.trim()||`${chart.settings.qtype}｜${chart.meta.solar}`,outcome:feedback.outcome,qtype:chart.settings.qtype,question:chart.question||questionText(),selectedNum,lockedPalace:p?`${p.key}${p.number}`:"",result:s.denied?"強烈不建議":`${s.score}/100 ${s.grade.name}`,summary:report.headline,report,feedback,payload:chartPayload()};
}
function caseFeedbackFromForm(){
  return {
    outcome:(document.getElementById("caseOutcome")?.value||"").trim(),
    accuracy:document.getElementById("caseAccuracy")?.value||"",
    hitArea:document.getElementById("caseHitArea")?.value||"",
    notes:(document.getElementById("caseNotes")?.value||"").trim()
  };
}
function fillCaseForm(c){
  document.getElementById("caseTitle").value=c?.title||"";
  document.getElementById("caseOutcome").value=c?.feedback?.outcome||c?.outcome||"";
  const acc=document.getElementById("caseAccuracy"); if(acc)acc.value=c?.feedback?.accuracy||"";
  const area=document.getElementById("caseHitArea"); if(area)area.value=c?.feedback?.hitArea||"";
  const notes=document.getElementById("caseNotes"); if(notes)notes.value=c?.feedback?.notes||"";
}
function clearCaseFeedbackForm(){
  document.getElementById("caseTitle").value="";
  document.getElementById("caseOutcome").value="";
  const acc=document.getElementById("caseAccuracy"); if(acc)acc.value="";
  const area=document.getElementById("caseHitArea"); if(area)area.value="";
  const notes=document.getElementById("caseNotes"); if(notes)notes.value="";
}
function saveCurrentCase(){
  try{
    const cases=loadCases(); cases.unshift(currentCase()); saveCases(cases.slice(0,100));
    activeCaseId=null; clearCaseFeedbackForm(); renderCases(); toast("案例已儲存。");
  }catch(err){toast(err.message||"案例儲存失敗。")}
}
function updateCaseResult(){
  if(!activeCaseId){toast("請先從案例庫按「回看」，再回填結果。"); return}
  const cases=loadCases(); const idx=cases.findIndex(c=>c.id===activeCaseId);
  if(idx<0){toast("找不到目前回看的案例。"); return}
  const feedback=caseFeedbackFromForm();
  cases[idx]={...cases[idx],title:document.getElementById("caseTitle").value.trim()||cases[idx].title,outcome:feedback.outcome,feedback,updatedAt:new Date().toISOString()};
  saveCases(cases); renderCases(); toast("回驗結果已更新。");
}
function renderCases(){
  const box=document.getElementById("caseList"); if(!box)return;
  const query=(document.getElementById("caseSearch")?.value||"").trim().toLowerCase();
  const cases=loadCases().filter(c=>!query||[c.title,c.outcome,c.feedback?.hitArea,c.feedback?.notes,c.qtype,c.lockedPalace,c.result,c.summary].join(" ").toLowerCase().includes(query));
  if(!cases.length){box.innerHTML=`<div class="case-empty">尚無案例。</div>`; return}
  box.innerHTML=cases.map(c=>{
    const fb=c.feedback||{}; const accuracy=fb.accuracy?`${fb.accuracy} 星`:"未回填"; const hit=fb.hitArea||"未分類";
    return `<div class="case-card" data-case-id="${escapeHTML(c.id)}">
    <div>
      <h3>${escapeHTML(c.title)}</h3>
      <small>${escapeHTML(c.qtype)}｜${escapeHTML(c.lockedPalace)}｜${escapeHTML(c.result)}｜${new Date(c.savedAt).toLocaleString("zh-TW")}</small>
      ${c.question?`<small>問事：${escapeHTML(c.question)}</small>`:""}
      <div class="case-tags"><span class="tab">${escapeHTML(c.selectedNum)}</span><span class="tab">${escapeHTML(c.outcome||"未填結果")}</span><span class="tab">${escapeHTML(accuracy)}</span><span class="tab">${escapeHTML(hit)}</span></div>
      ${fb.notes?`<small>備註：${escapeHTML(fb.notes)}</small>`:""}
    </div>
    <div class="case-actions">
      <button class="case-mini" type="button" data-action="load">回看</button>
      <button class="case-mini danger" type="button" data-action="delete">刪除</button>
    </div>
  </div>`}).join("");
}
function handleCaseClick(event){
  const btn=event.target.closest("button[data-action]"); if(!btn)return;
  const card=btn.closest("[data-case-id]"); const id=card?.dataset.caseId; const cases=loadCases(); const item=cases.find(c=>c.id===id); if(!item)return;
  if(btn.dataset.action==="load"){activeCaseId=item.id; restoreChartPayload(item.payload); fillCaseForm(item); showView("case"); toast("已載入案例，可回填結果。"); return}
  if(btn.dataset.action==="delete"){saveCases(cases.filter(c=>c.id!==id)); if(activeCaseId===id)activeCaseId=null; renderCases(); toast("案例已刪除。");}
}

// ===== 初始化 =====
function setDateInput(p){document.getElementById("dt").value=`${p.y}-${pad(p.m)}-${pad(p.d)}T${pad(p.hh)}:${pad(p.mm)}`}
function init(){
  const now=new Date(); setDateInput({y:now.getFullYear(),m:now.getMonth()+1,d:now.getDate(),hh:now.getHours(),mm:now.getMinutes()});
  renderAll();
  showView("ask");
  document.querySelectorAll(".nav-btn").forEach(btn=>btn.addEventListener("click",()=>showView(btn.dataset.view)));
  document.getElementById("quickExample").onclick=()=>{setDateInput({y:2026,m:7,d:8,hh:7,mm:44}); document.getElementById("qtype").value="今日運勢"; document.getElementById("questionText").value="今天這件事適不適合推進？"; selectedNum=7; buildChart(); renderAll(); showView("chart");};
  document.getElementById("quickNow").onclick=()=>{const n=new Date(); setDateInput({y:n.getFullYear(),m:n.getMonth()+1,d:n.getDate(),hh:n.getHours(),mm:n.getMinutes()});};
  document.getElementById("buildBtn").onclick=()=>{if(buildChart())showView("chart")};
  document.getElementById("resetInquiryAsk").onclick=resetInquiry;
  document.getElementById("resetInquiryChart").onclick=resetInquiry;
  document.getElementById("printBtn").onclick=()=>window.print();
  document.getElementById("copyReport").onclick=async()=>{const text=makeReport(); const ok=await copyText(text); if(ok){toast("報告已複製到剪貼簿。")}else{document.getElementById("reportBox").textContent=text; toast("瀏覽器限制複製，報告已放在下方可手動複製。")}};
  document.getElementById("downloadTxt").onclick=()=>download("九宮奇門鎖單宮報告.txt",makeReport());
  document.getElementById("exportJson").onclick=()=>download("qimen_jiugong_chart.json",JSON.stringify(chartPayload(),null,2),"application/json;charset=utf-8");
  document.getElementById("importJsonBtn").onclick=()=>document.getElementById("importJsonInput").click();
  document.getElementById("importJsonInput").onchange=e=>{importJsonFile(e.target.files[0]); e.target.value=""};
  document.getElementById("saveCase").onclick=saveCurrentCase;
  document.getElementById("updateCaseResult").onclick=updateCaseResult;
  document.getElementById("exportCases").onclick=()=>download("qimen_jiugong_cases.json",JSON.stringify({version:RULE_VERSION.app, exportedAt:new Date().toISOString(), cases:loadCases()},null,2),"application/json;charset=utf-8");
  document.getElementById("clearCases").onclick=()=>{if(confirm("確定清空案例庫？")){saveCases([]); renderCases(); toast("案例庫已清空。")}};
  document.getElementById("caseSearch").addEventListener("input",renderCases);
  document.getElementById("caseList").addEventListener("click",handleCaseClick);
  document.querySelectorAll(".report-mode").forEach(btn=>btn.addEventListener("click",()=>{
    reportMode=btn.dataset.reportMode||"simple";
    document.querySelectorAll(".report-mode").forEach(b=>b.classList.toggle("active",b===btn));
    renderReport();
  }));
  document.getElementById("qtype").addEventListener("change",()=>{if(chart&&!inquiryLocked){chart.settings.qtype=document.getElementById("qtype").value; renderAll();}});
  document.getElementById("inquiryMode").addEventListener("change",()=>{if(!inquiryLocked)renderAll();});
  ["doorMode","ziChange"].forEach(id=>document.getElementById(id).addEventListener("change",()=>{if(chart)buildChart()}));
  registerServiceWorker();
}
init();
