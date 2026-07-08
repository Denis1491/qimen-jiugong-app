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
  god:new Set([]),
  star:new Set([]),
  door:new Set([]),
  stem:new Set([]),
  flag:new Set([])
};
const SCORE = {
  door:{"開門":40,"休門":40,"生門":40,"死門":-100},
  star:{"天輔":20,"天心":20,"天任":20,"天蓬":-100,"天芮":-100},
  god:{"值符":20,"太陰":20,"六合":20,"九天":20,"白虎":-100},
  stem:{"乙":10,"丙":10,"丁":10,"戊":10,"庚":-100},
  flag:{"空":-100}
};
const RULE_VERSION = window.QIMEN_RULE_VERSION || {
  app:"5.0",
  lock:"lock-palace.v5.0",
  scoring:"scoring.v5.0",
  qtype:"qtype-rules.v5.0 待校準",
  fengshui:"fengshui.v5.0"
};
const CASE_STORAGE_KEY = window.QIMEN_CASE_STORAGE_KEY || "qimen-jiugong-cases-v5";
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
const QTYPE_WEIGHTS = {
  "今日運勢": {focus:["日干","時干","值符","值使","生門","開門"],bonus:{"生門":18,"開門":15,"休門":12,"六合":10,"值符":10},penalty:{"驚門":-12,"傷門":-12,"死門":-18,"白虎":-18,"空":-10}},
  "工作": {focus:["開門","時干","值使","景門","日干"],bonus:{"開門":28,"生門":14,"景門":10,"天心":10,"值符":12},penalty:{"死門":-25,"杜門":-16,"驚門":-14,"白虎":-20,"玄武":-12}},
  "財運": {focus:["生門","戊","六合","太陰","日干"],bonus:{"生門":30,"戊":12,"六合":16,"太陰":14,"開門":10},penalty:{"空":-18,"玄武":-14,"驚門":-12,"死門":-22,"白虎":-18}},
  "感情": {focus:["六合","乙","庚","兌宮","日干","時干"],bonus:{"六合":26,"太陰":16,"休門":12,"乙":10},penalty:{"白虎":-24,"玄武":-18,"螣蛇":-14,"驚門":-14,"傷門":-18,"庚":-12}},
  "合作": {focus:["六合","生門","開門","時干","日干"],bonus:{"六合":24,"生門":18,"開門":16,"太陰":12,"值符":10},penalty:{"玄武":-18,"白虎":-18,"杜門":-12,"空":-14,"死門":-20}},
  "健康": {focus:["天芮","死門","傷門","白虎","日干"],bonus:{"休門":18,"天心":12,"九地":8},penalty:{"天芮":-28,"死門":-24,"傷門":-20,"白虎":-24,"驚門":-10}},
  "風水": {focus:["生門","開門","休門","死門","驚門","白虎","空"],bonus:{"生門":24,"開門":20,"休門":16,"六合":10,"太陰":8},penalty:{"死門":-24,"白虎":-24,"天芮":-18,"驚門":-12,"空":-14,"迫":-12,"刑":-12}},
  "決策": {focus:["日干","時干","開門","生門","值符","值使"],bonus:{"開門":20,"生門":18,"值符":12,"天心":12,"六合":10},penalty:{"空":-16,"死門":-20,"玄武":-14,"白虎":-18,"杜門":-12}}
};

let chart = null;
let selectedNum = null;
let reportMode = "simple";
let currentView = "ask";
let inquiryLocked = false;
let activeCaseId = null;
let activeCompareSide = "A";
const COMPARE_SIDES = ["A","B","C","D"];
let compareSelections = {A:null,B:null,C:null,D:null};

// ===== 工具函數 =====
function pad(n){return String(n).padStart(2,"0")}
function clamp(n,min,max){return Math.max(min,Math.min(max,n))}
function unique(arr){return [...new Set(arr.filter(Boolean))]}
function escapeHTML(s){return String(s??"").replace(/[&<>'"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;","\"":"&quot;"}[c]))}
function parseDT(){const v=document.getElementById("dt").value;if(!v)return null;const [date,time]=v.split("T");const [y,m,d]=date.split("-").map(Number);const [hh,mm]=time.split(":").map(Number);return {y,m,d,hh,mm}}
function questionText(){return (document.getElementById("questionText")?.value||"").trim()}
function keywordHit(text,words){return words.some(w=>text.includes(w))}
function formatNumber(value,digits=0){
  const num=Number(value);
  return Number.isFinite(num)?num.toFixed(digits):"0";
}
function diagnoseQuestion(text){
  const q=String(text||"").trim();
  const normalized=q.replace(/\s+/g,"");
  if(!normalized)return {suggestedQtype:"今日運勢",confidence:"低",decisionIntent:"尚未輸入問題",riskTypes:[],followUps:["先把問題寫成一件具體事情。"],reason:"尚未輸入問題，先不做題型判斷。"};
  const rules=[
    {qtype:"感情",words:["他","她","對方","感情","曖昧","復合","分手","聯絡","找他","找她","道歉","求和","喜歡","關係"],risk:["口舌刺激","情緒升高","承諾未明"]},
    {qtype:"工作",words:["工作","面試","主管","同事","客戶","履歷","職場","離職","加薪","專案","任務","簡報"],risk:["流程卡點","溝通成本","責任邊界"]},
    {qtype:"財運",words:["錢","財","投資","收款","付款","價格","報價","合約","借錢","貸款","成交","收入"],risk:["條件未實","損失上限","口頭承諾"]},
    {qtype:"合作",words:["合作","合夥","簽約","分潤","夥伴","一起做","共同","代理"],risk:["分工不清","退出機制","資訊不透明"]},
    {qtype:"健康",words:["健康","生病","不舒服","睡眠","壓力","醫院","檢查","症狀","身體"],risk:["身心負荷","延誤檢查","過度解讀"]},
    {qtype:"風水",words:["方位","風水","房間","辦公室","座位","搬家","修繕","擺設","家裡"],risk:["環境干擾","大動作風險","安全判斷"]},
    {qtype:"決策",words:["要不要","是否","可不可以","該不該","選哪個","怎麼選","決定","方案","A","B"],risk:["可逆性不足","資訊不完整","成本未估"]}
  ];
  const scored=rules.map(rule=>({rule,score:rule.words.filter(w=>normalized.includes(w)).length})).sort((a,b)=>b.score-a.score);
  const top=scored[0];
  const suggestedQtype=top.score>0?top.rule.qtype:"今日運勢";
  const riskTypes=unique((top.score>0?top.rule.risk:[]).concat(
    keywordHit(normalized,["空","沒回","未定","還沒","不知道","等"]) ? ["條件未實"] : [],
    keywordHit(normalized,["騙","隱瞞","不透明","怪怪","口頭"]) ? ["資訊不透明"] : [],
    keywordHit(normalized,["吵","生氣","急","衝突","罵"]) ? ["口舌衝突"] : [],
    keywordHit(normalized,["錢","投資","借","貸","付"]) ? ["財務風險"] : []
  ));
  const followUps=[];
  if(!keywordHit(normalized,["今天","明天","這週","現在","何時","時間"]))followUps.push("時間窗是今天、這週，還是等對方回覆後？");
  if(!keywordHit(normalized,["A","B","選項","方案","要不要","是否","可不可以"]))followUps.push("能不能拆成至少兩個可選行動？例如主動聯絡 / 等明天 / 先傳短訊息。");
  if(["財運","合作","工作"].includes(suggestedQtype))followUps.push("現實條件有沒有文件、金額、期限、責任邊界？");
  if(suggestedQtype==="感情")followUps.push("你想達成的是求和、確認態度、道歉，還是談條件？");
  if(suggestedQtype==="健康")followUps.push("若有明顯症狀，請先以正式醫療檢查為準。");
  const decisionIntent=keywordHit(normalized,["要不要","是否","可不可以","該不該"]) ? "是/否決策" : keywordHit(normalized,["選","A","B","方案"]) ? "選項比較" : "狀態判斷";
  return {suggestedQtype,confidence:top.score>=2?"中高":top.score===1?"中":"低",decisionIntent,riskTypes,followUps:unique(followUps).slice(0,4),reason:top.score>0?`命中關鍵詞：${top.rule.words.filter(w=>normalized.includes(w)).join("、")}`:"問題較泛，暫以今日運勢承接。"};
}
function buildQuestionRewrite(text,diagnosis=diagnoseQuestion(text)){
  const raw=String(text||"").trim();
  if(!raw)return "今天我想判斷一件具體事情：我是否要採取一個可回驗的小行動？";
  if(/最小可行行動|收斂成一件可行動的事|下一個最小行動|哪個風險最低/.test(raw))return raw;
  const hasTime=keywordHit(raw,["今天","明天","這週","本週","現在","月底","下週"]);
  const time=hasTime?"":"在今天到這週內，";
  if(diagnosis.decisionIntent==="選項比較")return `${time}我想比較幾個選項：A、B、C 哪個風險最低、成本最小、最可回驗？原問題：${raw}`;
  if(diagnosis.decisionIntent==="是/否決策")return `${time}${raw}如果要做，最小可行行動是什麼？如果不做，主要風險是什麼？`;
  if(diagnosis.suggestedQtype==="今日運勢")return `${time}我想把「${raw}」收斂成一件可行動的事：今天最該先做哪一步、先避開哪個風險？`;
  return `${time}針對「${raw}」，我想知道目前風險在哪裡、可用點在哪裡，以及下一個最小行動是什麼？`;
}
function renderQuestionDiagnosis(){
  const box=document.getElementById("questionDiagnosis"); if(!box)return;
  const d=diagnoseQuestion(questionText());
  const rewrite=buildQuestionRewrite(questionText(),d);
  box.innerHTML=`<div><strong>問題診斷</strong><span>建議用途：${escapeHTML(d.suggestedQtype)}｜信心：${escapeHTML(d.confidence)}｜問題型態：${escapeHTML(d.decisionIntent)}</span></div>
  <div class="diagnosis-tags">${[d.reason].concat(d.riskTypes.map(x=>`風險：${x}`)).map(x=>`<span class="tab">${escapeHTML(x)}</span>`).join("")}</div>
  <div><span>建議追問：${escapeHTML(d.followUps.join("；")||"問題已足夠明確，可以排盤。")}</span></div>
  <div><strong>建議問法</strong><span>${escapeHTML(rewrite)}</span></div>`;
}
function applyDiagnosisQtype(){
  const q=document.getElementById("qtype"); if(!q||inquiryLocked)return;
  q.value=diagnoseQuestion(questionText()).suggestedQtype;
  renderQuestionDiagnosis();
  if(chart&&!inquiryLocked){chart.settings.qtype=q.value; chart.problemDiagnosis=diagnoseQuestion(questionText()); renderAll();}
}
function applyQuestionRewrite(){
  const input=document.getElementById("questionText"); if(!input||inquiryLocked)return;
  input.value=buildQuestionRewrite(questionText());
  renderQuestionDiagnosis();
}
function suggestDecisionOptions(text,diagnosis=diagnoseQuestion(text)){
  const qtype=diagnosis.suggestedQtype;
  if(qtype==="感情")return ["今天主動聯絡","明天再說","先發簡短訊息","暫時不動"];
  if(qtype==="合作")return ["直接談合作","先短約測試","只交換資料","暫時不合作"];
  if(qtype==="財運")return ["照原計畫投入","先小額測試","先查證條件","暫時不動用資金"];
  if(qtype==="工作")return ["今天主動推進","先補資料再談","先做小交付","暫時觀察"];
  if(qtype==="健康")return ["先安排檢查","先休息觀察","先記錄症狀","暫不做大調整"];
  if(qtype==="風水")return ["今天小整理","先不大動","只調整光線與動線","暫時觀察"];
  return ["今天主動做","明天再說","先做小測試","暫時不動"];
}
function applyDecisionOptionDrafts(){
  if(inquiryLocked)return;
  const d=diagnoseQuestion(questionText());
  const opts=suggestDecisionOptions(questionText(),d);
  setSelectionMode("compare");
  compareSides().forEach((side,i)=>{
    const input=document.getElementById(`option${side}Name`);
    if(input)input.value=opts[i]||`選項 ${side}`;
  });
  renderQuestionDiagnosis();
  renderAll();
}
function inquiryMode(){return document.getElementById("inquiryMode")?.value||"formal"}
function isFormalInquiry(){return inquiryMode()==="formal"}
function selectionMode(){return document.getElementById("selectionMode")?.value||"single"}
function isCompareMode(){return selectionMode()==="compare"}
function isCompareChart(){return chart?.settings?.selectionMode==="compare"}
function compareOptionName(side){return (document.getElementById(`option${side}Name`)?.value||`選項 ${side}`).trim()||`選項 ${side}`}
function compareNumber(side){return Number(compareSelections[side]||0)||null}
function blankCompareSelections(){return Object.fromEntries(COMPARE_SIDES.map(side=>[side,null]))}
function compareSides(){return COMPARE_SIDES}
function compareOptionFromState(side,opts={}){
  return {name:opts[side]?.name||compareOptionName(side),num:Number(opts[side]?.num||compareSelections[side]||0)||null};
}
function filledCompareOptions(source){
  const opts=source||compareOptions();
  return compareSides().map(side=>({side,...opts[side]})).filter(opt=>opt.num);
}
function advanceCompareSide(){
  const next=compareSides().find(side=>!compareSelections[side]);
  if(next)activeCompareSide=next;
}
function setSelectionMode(mode){const el=document.getElementById("selectionMode"); if(el)el.value=mode||"single"}
function updateInquiryHint(){
  const hint=document.getElementById("inquiryHint"); if(!hint)return;
  if(isCompareMode()){
    hint.textContent=isFormalInquiry()
      ? "決策比較：先寫同一個問題與 A-D 選項，至少替兩個選項憑直覺選數。排盤後會比較可逆性、成本、風險與驗證點。"
      : "決策比較學習模式：可替 A-D 選項選數，至少兩個選項即可比較宮位、成本與風險。";
    return;
  }
  hint.textContent=isFormalInquiry()
    ? "正式問事：請先默念問題，憑直覺選 1-9。鎖定後再揭盤，避免被盤面吉凶影響選擇。"
    : "學習模式：可以先排盤、看盤面，再點選不同宮位做研究與比較。";
}
function updateInquiryControls(){
  const locked=!!inquiryLocked;
  ["questionText","qtype","inquiryMode","selectionMode"].concat(compareSides().map(side=>`option${side}Name`)).forEach(id=>{const el=document.getElementById(id); if(el)el.disabled=locked;});
  const resetAsk=document.getElementById("resetInquiryAsk"); if(resetAsk)resetAsk.disabled=false;
  const resetChart=document.getElementById("resetInquiryChart"); if(resetChart)resetChart.disabled=false;
  updateCompareUI();
}
function updateCompareUI(){
  const panel=document.getElementById("comparePanel"); if(panel)panel.hidden=!isCompareMode();
  compareSides().forEach(side=>{
    const el=document.getElementById(`compare${side}Num`);
    if(el)el.textContent=compareSelections[side]||"未選";
  });
  document.querySelectorAll(".compare-side").forEach(btn=>{
    btn.classList.toggle("active",btn.dataset.side===activeCompareSide);
    btn.disabled=!!inquiryLocked;
  });
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
    const compareMode=isCompareMode();
    if(compareMode){
      const filled=filledCompareOptions();
      const distinctPalaces=unique(filled.map(opt=>lockedPalaceNumber(opt.num)));
      if(filled.length<2){alert("決策比較請至少替兩個選項選數字。");return false}
      if(distinctPalaces.length<2){alert("比較選項請至少鎖到兩個不同宮位，才有比較意義。");return false}
      selectedNum=filled[0].num;
    }else if(!selectedNum){alert("請先選 1-9 一個數字");return false}
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
      version:RULE_VERSION.app, ruleVersion:RULE_VERSION, question:questionText(), problemDiagnosis:diagnoseQuestion(questionText()), settings:{qtype:document.getElementById("qtype").value,doorMode,ziChange,inquiryMode:inquiryMode(),selectionMode:compareMode?"compare":"single",compareOptions:compareMode?compareOptions():null,lockedFormal:isFormalInquiry()},
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
function renderAll(){updateInquiryHint(); updateInquiryControls(); renderQuestionDiagnosis(); renderRuleVersion(); renderNums(); renderMeta(); renderGrid(); renderLockedPanel(); renderResult(); renderReport(); renderCases();}
function renderRuleVersion(){const el=document.getElementById("metricRules"); if(el)el.textContent=`V${RULE_VERSION.app}｜用途生效・待校準`}
function setNote(t){document.getElementById("autoNote").textContent=t}
function showView(view){
  currentView=view||"ask";
  document.querySelectorAll("[data-view-panel]").forEach(panel=>panel.classList.toggle("active",panel.dataset.viewPanel===currentView));
  document.querySelectorAll(".nav-btn").forEach(btn=>btn.classList.toggle("active",btn.dataset.view===currentView));
  if(currentView==="chart" && !chart)toast("尚未排盤，請先完成問事。");
  window.scrollTo({top:0,behavior:"smooth"});
}
function chooseNumber(n){
  if(inquiryLocked){toast("正式問事已鎖定，請按「重新問事」再重選。");return}
  if(isCompareMode()){
    compareSelections[activeCompareSide]=n;
    selectedNum=n;
    advanceCompareSide();
    renderAll();
    return;
  }
  selectedNum=n; renderAll();
}
function renderNums(){
  const pad=document.getElementById("numPad");
  if(!pad.dataset.ready){
    pad.innerHTML="";
    [1,2,3,4,5,6,7,8,9].forEach(n=>{
      const b=document.createElement("button");
      b.className="num-btn";
      b.onclick=()=>chooseNumber(n);
      pad.appendChild(b);
    });
    pad.dataset.ready="1";
  }
  Array.from(pad.children).forEach((b,i)=>{
    const n=i+1; const marks=[];
    if(isCompareMode()){
      compareSides().forEach(side=>{if(compareSelections[side]===n)marks.push(side)});
      b.innerHTML=`<span>${n}</span>${marks.length?`<em>${marks.join("/")}</em>`:""}`;
      b.classList.toggle("active",marks.length>0);
      b.classList.toggle("compare-a",compareSelections.A===n);
      b.classList.toggle("compare-b",compareSelections.B===n);
      b.disabled=!!inquiryLocked;
      b.title=inquiryLocked?"正式問事已鎖定":`替 ${activeCompareSide} 選 ${n}`;
    }else{
      b.textContent=String(n);
      b.classList.toggle("active",selectedNum===n);
      b.classList.remove("compare-a","compare-b");
      b.disabled=inquiryLocked&&selectedNum!==n;
      b.title=inquiryLocked?"正式問事已鎖定":"";
    }
  });
}
function renderMeta(){const box=document.getElementById("metaGrid"); if(!chart){box.innerHTML="";return} const m=chart.meta; const pairs=[["西元",m.solar],["農曆",m.lunar],["四柱",`${m.yearGZ}　${m.monthGZ}　${m.dayGZ}　${m.hourGZ}`],["起局",`${m.ju}｜陰盤`],["旬首",m.xunshou],["符頭",m.futou],["空亡",m.kongwang],["驛馬",m.yima],["值符",m.zhifu],["值使",m.zhishi],["局數公式",m.juFormula],["門法",document.getElementById("doorMode").selectedOptions[0].textContent]]; box.innerHTML=pairs.map(([a,b])=>`<div class="meta"><span>${a}</span><strong>${escapeHTML(b)}</strong></div>`).join(""); document.getElementById("chartBadge").textContent=`${m.ju}・${m.zhifu}・${m.zhishi}`; const ov=overallScore(); document.getElementById("metricOverall").textContent=`${ov}/100`;}
function stemSpan(st,pal){const tags=[tagFor("stem",st)]; if(STEM_TOMB[st]===pal)tags.push(`<span class="small-tag tag-risk">墓</span>`); if(STEM_PUNISH[st]===pal)tags.push(`<span class="small-tag tag-risk">刑</span>`); const cls=classByScore("stem",st); return `<span class="${cls}">${st}</span>${tags.join("")}`}
function stemGroup(stems,pal){return stems.length?stems.map(st=>stemSpan(st,pal)).join(""):`<span class="muted-text">無</span>`}
function flagGroup(flags){return flags.length?flags.map(f=>`<span class="flag ${flagClass(f)}">${f}</span>`).join(""):`<span class="muted-text">無</span>`}
function selectPalaceNumber(n){
  if(inquiryLocked){toast("正式問事已鎖定，請按「重新問事」再重選。");return}
  if(isCompareMode()){
    const raw=Number(n);
    compareSelections[activeCompareSide]=raw;
    selectedNum=raw;
    advanceCompareSide();
    renderAll();
    return;
  }
  selectedNum=Number(n); renderAll();
}
function renderGrid(){const grid=document.getElementById("palaceGrid"); if(!chart){grid.innerHTML="<div class='palace center' style='grid-column:1/4'>請先輸入時間並開始排盤</div>"; return} const q=chart.settings.qtype; grid.innerHTML=chart.palaces.map(p=>{
  const cmp=isCompareChart()?chart.settings.compareOptions:null;
  const hitSides=cmp?filledCompareOptions(cmp).filter(opt=>lockedPalaceNumber(opt.num)===p.number).map(opt=>opt.side):[];
  const sel=lockedPalaceNumber(selectedNum)===p.number||hitSides.length>0; if(p.isCenter){return `<div class="palace center" data-num="5"><div><strong>中宮</strong><br><span class="score-pill score-mid">5</span></div></div>`}
  const s=scorePalaceRaw(p,q); const sc=s.score; const bg=s.denied||sc<60?"bad-bg":"good-bg"; const scoreText=s.denied?"否":sc;
  return `<button type="button" class="palace ${bg} ${sel?"selected":""}" data-num="${p.number}" onclick="selectPalaceNumber(${p.number})" aria-label="鎖定${p.key}${p.number}宮">
    ${hitSides.length?`<span class="compare-palace-tag">${hitSides.join("/")}</span>`:""}
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
  if(isCompareChart()){
    const ctx=buildCompareContext();
    box.innerHTML=comparePanelHTML(ctx);
    return;
  }
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
function isReportHeading(line){
  const text=String(line||"").trim();
  if(!text)return false;
  if(/^[一二三四五六七八九十]+、/.test(text))return true;
  if(/^第[一二三四五六七八九十]+步/.test(text))return true;
  return [
    "結論","傾向","現在最重要的事","今天先做","今天先避開","風水微調","驗證","主要依據",
    "比較結論","推薦理由","另一選項風險","今天怎麼做","起盤資料","鎖定宮位","盤面骨架",
    "老師總斷","這盤怎麼讀","取用方法","避險方法","逐條依據","回驗方式","提醒"
  ].some(title=>text===title||text.startsWith(title+"："));
}
function reportSectionClass(title){
  const t=String(title||"");
  const cls=["report-section"];
  if(/結論|總斷|推薦/.test(t))cls.push("report-highlight");
  if(/避|阻礙|風險|不宜|提醒/.test(t))cls.push("report-caution");
  if(/依據|證|回驗/.test(t))cls.push("report-evidence");
  return cls.join(" ");
}
function reportLineHTML(line){
  const text=String(line||"").trim();
  if(!text)return "";
  const meta=text.match(/^([^：]{2,8})：(.*)$/);
  if(meta&&/問事|時間|農曆|四柱|起局|推薦|備選|分數|傾向|避開|取用|避險|特殊象/.test(meta[1])){
    return `<p class="report-meta"><strong>${escapeHTML(meta[1])}</strong><span>${escapeHTML(meta[2].trim())}</span></p>`;
  }
  return `<p>${escapeHTML(text)}</p>`;
}
function reportLinesHTML(lines){
  const out=[]; let list=null;
  const closeList=()=>{if(list){out.push(`${list.type==="ol"?"</ol>":"</ul>"}`); list=null;}};
  lines.forEach(raw=>{
    const text=String(raw||"").trim(); if(!text)return;
    const bullet=text.match(/^[-•]\s*(.+)$/);
    const ordered=text.match(/^(\d+)[.、]\s*(.+)$/);
    if(bullet||ordered){
      const type=ordered?"ol":"ul";
      if(!list||list.type!==type){closeList(); list={type}; out.push(type==="ol"?`<ol class="report-list numbered">`:`<ul class="report-list">`);}
      out.push(`<li>${escapeHTML((bullet||ordered)[ordered?2:1])}</li>`);
      return;
    }
    closeList();
    out.push(reportLineHTML(text));
  });
  closeList();
  return out.join("");
}
function reportBlockHTML(block,index){
  const lines=String(block||"").split(/\n+/).map(line=>line.trim()).filter(Boolean);
  if(!lines.length)return "";
  if(lines.length===1){
    const line=lines[0];
    if(/^\d+[.、]\s*/.test(line))return `<section class="${reportSectionClass("解盤依據")}"><div class="report-body">${reportLinesHTML([line])}</div></section>`;
    if(isReportHeading(line))return `<section class="${reportSectionClass(line)}"><h4>${escapeHTML(line)}</h4></section>`;
    const cls=index<2?"report-intro":"report-paragraph";
    return `<div class="${cls}">${reportLineHTML(line)}</div>`;
  }
  const first=lines[0];
  const title=isReportHeading(first)||lines.length>1?first:"";
  const body=title?lines.slice(1):lines;
  return `<section class="${reportSectionClass(title)}">${title?`<h4>${escapeHTML(title)}</h4>`:""}<div class="report-body">${reportLinesHTML(body)}</div></section>`;
}
function reportHTML(text){
  const raw=String(text||"").trim();
  if(!raw)return `<div class="report-empty">尚未產生報告。</div>`;
  const blocks=raw.split(/\n{2,}/).map(block=>block.trim()).filter(Boolean);
  const title=blocks.shift()||"九宮奇門報告";
  return `<article class="report-article"><h3 class="report-title">${escapeHTML(title)}</h3>${blocks.map(reportBlockHTML).join("")}</article>`;
}
function renderReport(){document.getElementById("reportBox").innerHTML=reportHTML(makeReport(reportMode))}
// ===== 匯入、匯出與案例庫 =====
function download(name,text,type="text/plain;charset=utf-8"){const blob=new Blob([text],{type}); const a=document.createElement("a"); a.href=URL.createObjectURL(blob); a.download=name; document.body.appendChild(a); a.click(); a.remove(); setTimeout(()=>URL.revokeObjectURL(a.href),1000)}
function csvCell(value){
  const text=String(value??"").replace(/\r?\n/g," ");
  return /[",\n]/.test(text)?`"${text.replace(/"/g,'""')}"`:text;
}
function casesToReviewCsv(cases){
  const headers=["priorityRank","priorityLabel","priorityReason","savedAt","title","qtype","decisionIntent","question","selectedNum","lockedPalace","result","compareChosen","compareHit","compareNote","accuracy","hitArea","afterAction","verifiedSymbol","riskReduced","deviationResult","calibration","completion","missing","summary"];
  const rows=(cases||[]).map(c=>{
    const fb=c.feedback||{};
    const completion=caseCompletion(c);
    const priority=caseReviewPriority(c);
    return [
      priority.rank,
      priority.label,
      priority.reason,
      c.savedAt||"",
      c.title||"",
      c.qtype||"",
      c.problemDiagnosis?.decisionIntent||"",
      c.question||"",
      c.selectedNum||"",
      c.lockedPalace||"",
      c.result||"",
      compareOptionLabel(fb.compareChosen||c.compareChosen),
      compareOptionLabel(fb.compareHit||c.compareHit),
      fb.compareNote||c.compareNote||"",
      fb.accuracy||"",
      fb.hitArea||"",
      fb.afterAction||c.afterAction||"",
      fb.verifiedSymbol||c.verifiedSymbol||"",
      riskReducedLabel(fb.riskReduced||c.riskReduced),
      fb.deviationResult||c.deviationResult||"",
      calibrationLabel(fb.calibration||c.calibration),
      `${completion.done}/${completion.total}`,
      completion.missing.join("、"),
      c.summary||""
    ];
  });
  return [headers,...rows].map(row=>row.map(csvCell).join(",")).join("\n");
}
function exportFilteredCasesCsv(){
  const cases=filteredReviewCases();
  if(!cases.length){toast("目前篩選沒有案例可匯出。"); return}
  const filter=document.getElementById("caseReviewFilter")?.value||"all";
  const suffix=String(filter||"all").replace(/[^a-z0-9-]+/gi,"-").toLowerCase();
  download(`qimen_jiugong_case_reviews_${suffix}.csv`,casesToReviewCsv(cases),"text/csv;charset=utf-8");
}
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
function restoreChartPayload(payload){
  if(!payload||!payload.chart||!Array.isArray(payload.chart.palaces))throw new Error("JSON 不是可匯入的盤面。");
  chart=payload.chart; selectedNum=payload.selectedNum?Number(payload.selectedNum):null;
  chart.problemDiagnosis=chart.problemDiagnosis||payload.problemDiagnosis||diagnoseQuestion(payload.question||chart.question||"");
  if(payload.question||chart.question)document.getElementById("questionText").value=payload.question||chart.question;
  if(chart.settings){
    if(chart.settings.qtype)document.getElementById("qtype").value=chart.settings.qtype;
    if(chart.settings.doorMode)document.getElementById("doorMode").value=chart.settings.doorMode;
    if(typeof chart.settings.ziChange==="boolean")document.getElementById("ziChange").value=String(chart.settings.ziChange);
    if(chart.settings.inquiryMode)document.getElementById("inquiryMode").value=chart.settings.inquiryMode;
    if(chart.settings.selectionMode)setSelectionMode(chart.settings.selectionMode);
    if(chart.settings.compareOptions){
      compareSelections=blankCompareSelections();
      compareSides().forEach(side=>{
        compareSelections[side]=Number(chart.settings.compareOptions[side]?.num||0)||null;
        const input=document.getElementById(`option${side}Name`);
        if(input)input.value=chart.settings.compareOptions[side]?.name||"";
      });
    }else{
      compareSelections=blankCompareSelections();
    }
    inquiryLocked=!!chart.settings.lockedFormal;
  }
  if(chart.meta&&chart.meta.solar){
    const m=chart.meta.solar.match(/^(\d{4})-(\d{2})-(\d{2})\s(\d{2}):(\d{2})/);
    if(m)setDateInput({y:+m[1],m:+m[2],d:+m[3],hh:+m[4],mm:+m[5]});
  }
  renderAll(); showView("chart"); toast("已匯入盤面。");
}
function resetInquiry(){
  chart=null; selectedNum=null; inquiryLocked=false; activeCaseId=null; activeCompareSide="A"; compareSelections=blankCompareSelections(); setSelectionMode("single");
  compareSides().forEach(side=>{const input=document.getElementById(`option${side}Name`); if(input)input.value="";});
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
    navigator.serviceWorker.register("sw.js?v=5.0-decision-30").then(reg=>{
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
function palaceSymbols(p){
  if(!p)return [];
  return unique([p.key,`${p.key}宮`,p.door,p.star,p.god].concat(p.top||[],p.bottom||[],p.flags||[]));
}
function qtypeWeightRule(qtype){return QTYPE_WEIGHTS[qtype]||QTYPE_WEIGHTS["今日運勢"]}
function isSymbolInPalace(p,sym){
  if(!p||!sym)return false;
  if(sym==="日干")return chart?.meta?.dayStem && (p.top.includes(chart.meta.dayStem)||p.bottom.includes(chart.meta.dayStem));
  if(sym==="時干")return chart?.meta?.hourStem && (p.top.includes(chart.meta.hourStem)||p.bottom.includes(chart.meta.hourStem));
  if(sym==="值符")return p.god==="值符"||p.star===chart?.meta?.zhifu;
  if(sym==="值使")return p.door===chart?.meta?.zhishi;
  return palaceSymbols(p).includes(sym);
}
function severityForPalace(p,qtype){
  const has=(sym)=>isSymbolInPalace(p,sym);
  const fatal=[];
  if(has("白虎")&&(has("傷門")||has("刑")||has("迫")))fatal.push("白虎與傷門/刑迫同宮，衝突與損傷象集中。");
  if(has("死門")&&has("天芮"))fatal.push("死門與天芮同宮，停滯與病符象集中。");
  if(fatal.length)return {level:"fatal",reasons:fatal};
  if(has("死門")||has("杜門")||has("墓"))return {level:"block",reasons:["此宮有卡住、收尾、封閉或入墓象，宜降速整理。"]};
  if(has("空"))return {level:"pending",reasons:["空亡代表事情未實、條件待確認，不宜把口頭訊號當成定案。"]};
  if(has("玄武")||has("螣蛇")||has("驚門")||has("傷門"))return {level:"risk",reasons:["此宮有資訊不透明、驚擾、糾纏或衝動風險。"]};
  if(has("生門")||has("開門")||has("休門")||has("六合")||has("太陰")||has("值符")||has("九天"))return {level:"usable",reasons:["此宮有可用象，但仍需依題型小步取用。"]};
  return {level:"neutral",reasons:["此宮沒有明顯極端象，需回到題型與三宮關係判斷。"]};
}
function directDenyForSeverity(severity){return severity.level==="fatal"}
function scorePalaceV5(p,qtype,context={}){
  const rawEvidence=[];
  if(!p||p.isCenter){
    const empty={score:0,baseScore:0,qtypeScore:0,level:grade(0),directDeny:false,severity:{level:"neutral",reasons:["中宮不用。"]},evidence:rawEvidence,rawEvidence,reasons:[{label:"中宮不用",value:0,text:"中宮不直接作鎖單宮判斷。"}],ruleTrace:[]};
    return {...empty,denied:false,deniers:[],grade:empty.level};
  }
  const qRule=qtypeWeightRule(qtype);
  const reasons=[]; const ruleTrace=[];
  const addTrace=(source,sym,value,kind,extra="")=>{
    if(!sym||!isSymbolInPalace(p,sym))return 0;
    const ev=makeEvidence(source,sym,value,qtype,false);
    ev.ruleKind=kind; ev.extra=extra;
    rawEvidence.push(ev);
    ruleTrace.push({symbol:sym,source:evidenceSource(source),value,kind,reason:extra||ev.reason});
    reasons.push({label:sym,value,text:`${sym}：${ev.reason} ${ev.action}`,evidence:ev});
    return value;
  };
  let baseScore=35;
  rawEvidence.push(makeEvidence("palace",p.key,0,qtype,false));
  [["god",p.god],["star",p.star],["door",p.door]].forEach(([type,sym])=>{
    const value=contribution(type,sym);
    if(value){
      const adjusted=value<=-100?-24:value;
      baseScore+=adjusted;
      addTrace(type,sym,adjusted,"base",`基礎象分：${adjusted>0?"+":""}${adjusted}`);
    }
  });
  p.top.concat(p.bottom).forEach(st=>{
    const value=contribution("stem",st);
    if(value){
      const adjusted=value<=-100?-18:value;
      baseScore+=adjusted;
      addTrace("stem",st,adjusted,"base",`天干基礎分：${adjusted>0?"+":""}${adjusted}`);
    }
  });
  p.flags.forEach(flag=>{
    let value=flag==="空"?-8:["刑","迫","墓"].includes(flag)?-10:flag==="馬"?4:0;
    if(value){
      baseScore+=value;
      addTrace("flag",flag,value,"base",`特殊象修正：${value>0?"+":""}${value}`);
    }else{
      rawEvidence.push(makeEvidence("flag",flag,0,qtype,false));
    }
  });
  let qtypeScore=0;
  Object.entries(qRule.bonus||{}).forEach(([sym,value])=>{qtypeScore+=addTrace("qtype",sym,value,"qtype-bonus",`${qtype}用途加權：${value>0?"+":""}${value}`);});
  Object.entries(qRule.penalty||{}).forEach(([sym,value])=>{
    let adjusted=value;
    if(sym==="空"&&["健康"].includes(qtype))adjusted=-4;
    if(sym==="空"&&["風水"].includes(qtype))adjusted=Math.min(-6,value);
    qtypeScore+=addTrace("qtype",sym,adjusted,"qtype-penalty",`${qtype}用途扣分：${adjusted}`);
  });
  const focusHits=(qRule.focus||[]).filter(sym=>isSymbolInPalace(p,sym));
  if(focusHits.length){
    const focusScore=Math.min(12,focusHits.length*3);
    baseScore+=focusScore;
    ruleTrace.push({symbol:focusHits.join("、"),source:"題型焦點",value:focusScore,kind:"focus",reason:`命中${qtype}焦點：${focusHits.join("、")}`});
  }
  const severity=severityForPalace(p,qtype);
  if(severity.level==="fatal")baseScore-=25;
  if(severity.level==="pending"&&["財運","合作","決策"].includes(qtype))qtypeScore-=4;
  if(severity.level==="usable")baseScore+=5;
  const directDeny=directDenyForSeverity(severity);
  const finalScore=directDeny?clamp(Math.round(baseScore+qtypeScore),0,42):clamp(Math.round(baseScore+qtypeScore),0,100);
  const level=directDeny?{name:"強烈不建議",cls:"score-bad",level:"強烈不建議，先降速避險"}:grade(finalScore);
  return {score:finalScore,baseScore:Math.round(baseScore),qtypeScore:Math.round(qtypeScore),level,grade:level,directDeny,denied:directDeny,severity,evidence:rawEvidence,rawEvidence,reasons,deniers:directDeny?severity.reasons.map(text=>({label:"嚴重度 fatal",value:0,text})):[],ruleTrace};
}
function scorePalaceRaw(p,qtype){return scorePalaceV5(p,qtype,{chart})}
function scorePalace(p,qtype){return scorePalaceV5(p,qtype,{chart})}
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
function fengShuiChoice(p,type){
  const dir=PALACE_DIR[p.key]||"中央";
  const base={palace:p.key,direction:dir,reason:"",do:[],avoid:[]};
  if(type==="activate")return {...base,reason:`${p.key}宮見${[p.door,p.god,p.star].filter(Boolean).join("、")}，較適合輕度啟動。`,do:["清掉雜物","補柔和光線","整理合約、報價或計畫","面向此方傳重要訊息"],avoid:["不要誇張擺設","不要一次重押"]};
  if(type==="quiet")return {...base,reason:`${p.key}宮有需安靜處理的訊號，適合降噪與整理。`,do:["保持乾淨","降低音量","收納帳單與電線"],avoid:["不要大聲講電話","不要在此方爭辯","不要堆放雜亂物"]};
  return {...base,reason:`${p.key}宮風險象較集中，今日不宜大動。`,do:["保持安全","只做必要清潔"],avoid:["不敲打","不修繕","不搬重物","不在此方做重大決定"]};
}
function buildFengShuiPlan(locked){
  const activate=bestFengShui("activate",locked), quiet=bestFengShui("quiet",locked), avoid=bestFengShui("avoid",locked);
  const activateChoice=fengShuiChoice(activate,"activate"), quietChoice=fengShuiChoice(quiet,"quiet"), avoidChoice=fengShuiChoice(avoid,"avoid");
  return {
    activate:`啟動方：${activateChoice.direction}（${activateChoice.palace}宮）。${activateChoice.reason} 可做：${activateChoice.do.join("、")}。`,
    quiet:`安靜方：${quietChoice.direction}（${quietChoice.palace}宮）。${quietChoice.reason} 避免：${quietChoice.avoid.join("、")}。`,
    avoid:`避動方：${avoidChoice.direction}（${avoidChoice.palace}宮）。${avoidChoice.reason} 避免：${avoidChoice.avoid.join("、")}。`,
    activateChoice,
    quietChoice,
    avoidChoice,
    activatePalace:activate.key,
    quietPalace:quiet.key,
    avoidPalace:avoid.key
  };
}
function findPalacesBySymbol(sourceChart,symbol){
  if(!sourceChart||!symbol)return [];
  const palaces=sourceChart.palaces||[];
  const target=String(symbol);
  return palaces.filter(p=>{
    if(!p||p.isCenter)return false;
    if(p.key===target||`${p.key}宮`===target||PALACE_DIR[p.key]===target)return true;
    if(p.door===target||p.star===target||p.god===target)return true;
    if((p.top||[]).includes(target)||(p.bottom||[]).includes(target)||(p.flags||[]).includes(target))return true;
    if(target==="日干")return sourceChart.meta?.dayStem && ((p.top||[]).includes(sourceChart.meta.dayStem)||(p.bottom||[]).includes(sourceChart.meta.dayStem));
    if(target==="時干")return sourceChart.meta?.hourStem && ((p.top||[]).includes(sourceChart.meta.hourStem)||(p.bottom||[]).includes(sourceChart.meta.hourStem));
    if(target==="值符")return p.god==="值符"||p.star===sourceChart.meta?.zhifu;
    if(target==="值使")return p.door===sourceChart.meta?.zhishi;
    return false;
  });
}
function firstPalaceBySymbols(sourceChart,symbols,fallback){
  for(const sym of symbols){
    const found=findPalacesBySymbol(sourceChart,sym);
    if(found.length)return found[0];
  }
  return fallback||null;
}
function palaceRelation(a,b){
  if(!a||!b)return {type:"待確認",text:"缺少宮位，暫不能判斷三宮生剋。"};
  const ae=PALACE_ELEM[a.key], be=PALACE_ELEM[b.key];
  if(a.key===b.key||ae===be)return {type:"比和",text:`${a.key}與${b.key}同氣或同宮，代表同類相助，也可能同類消耗。`};
  if(ELEM_SHENG[ae]===be)return {type:"a生b",text:`${a.key}${ae}生${b.key}${be}：本人助事情，能推動，但會耗力。`};
  if(ELEM_SHENG[be]===ae)return {type:"b生a",text:`${b.key}${be}生${a.key}${ae}：事情助本人，較順，但仍要看風險象。`};
  if(ELEM_KE[ae]===be)return {type:"a克b",text:`${a.key}${ae}克${b.key}${be}：本人能控制事情，但容易硬碰硬。`};
  if(ELEM_KE[be]===ae)return {type:"b克a",text:`${b.key}${be}克${a.key}${ae}：事情壓人，壓力較大，宜降級處理。`};
  return {type:"待確認",text:`${a.key}與${b.key}關係不明顯，需回到門、星、神與特殊象判斷。`};
}
function matterSymbolsForQtype(qtype){
  return {
    "今日運勢":["時干","值使","值符"],
    "工作":["開門","時干","值使"],
    "財運":["生門","戊","六合"],
    "感情":["六合","乙","庚","日干","時干"],
    "合作":["六合","開門","生門","時干"],
    "健康":["天芮","死門","傷門","白虎","日干"],
    "風水":["生門","開門","休門","死門","驚門","白虎"],
    "決策":["時干","開門","生門","值符","值使"]
  }[qtype]||["時干","開門","生門"];
}
function palaceSnapshot(p){
  if(!p)return null;
  return {key:p.key,number:p.number,direction:PALACE_DIR[p.key]||"中央",element:PALACE_ELEM[p.key]||"",door:p.door,star:p.star,god:p.god,top:p.top,bottom:p.bottom,flags:p.flags};
}
function analyzeThreePalaces(sourceChart, num, qtype){
  const lockNumber=lockedPalaceNumber(num);
  const lockPalace=(sourceChart?.palaces||[]).find(p=>p.number===lockNumber)||getPalaceByNum(num);
  const selfPalace=firstPalaceBySymbols(sourceChart,["日干"],lockPalace);
  const matterPalace=firstPalaceBySymbols(sourceChart,matterSymbolsForQtype(qtype),lockPalace);
  const relationSelfMatter=palaceRelation(selfPalace,matterPalace);
  const relationLockMatter=palaceRelation(lockPalace,matterPalace);
  const narrative=[
    `鎖定宮是${lockPalace?.key||"待確認"}宮，代表你憑直覺選到的入口。`,
    `本人宮是${selfPalace?.key||"待確認"}宮，用日干看你當下狀態。`,
    `事情宮是${matterPalace?.key||"待確認"}宮，依「${qtype}」取${matterSymbolsForQtype(qtype).join("、")}作為題型用神。`,
    relationSelfMatter.text,
    relationLockMatter.text
  ].filter(Boolean).join(" ");
  return {
    lockPalace:palaceSnapshot(lockPalace),
    selfPalace:palaceSnapshot(selfPalace),
    matterPalace:palaceSnapshot(matterPalace),
    relationSelfMatter,
    relationLockMatter,
    focusPalaces:unique([lockPalace?.key,selfPalace?.key,matterPalace?.key]),
    narrative
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
  return "不說廢話，正式開始。奇門不是用來製造恐懼，而是把盤面拆成可觀察、可驗證、可調整的系統：先看平衡有沒有失衡，流通有沒有受阻，再把風險降級。";
}
function riskProfileRule(symbol){
  const map={
    "空":{type:"未落實",source:"空亡",action:"先等條件填實，不把口頭訊號當成交或承諾。"},
    "空亡":{type:"未落實",source:"空亡",action:"先等條件填實，不把口頭訊號當成交或承諾。"},
    "玄武":{type:"資訊不透明",source:"玄武",action:"查證來源，錢、時間、責任與條件都留文字。"},
    "驚門":{type:"口舌刺激",source:"驚門",action:"先核對訊息，不急回、不連續追問、不被一句話帶走。"},
    "杜門":{type:"流程卡點",source:"杜門",action:"先整理資料、等審核、補文件，不硬闖流程。"},
    "白虎":{type:"衝突壓力",source:"白虎",action:"避免硬碰硬，危險操作與情緒對抗先降速。"},
    "傷門":{type:"衝突壓力",source:"傷門",action:"先談事實與界線，不用刺激性語氣放大衝突。"},
    "迫":{type:"行動受迫",source:"門迫",action:"縮小動作，先做最低成本驗證，不一次壓到底。"},
    "門迫":{type:"行動受迫",source:"門迫",action:"縮小動作，先做最低成本驗證，不一次壓到底。"},
    "刑":{type:"內耗卡住",source:"擊刑",action:"先釐清內部矛盾與責任邊界，再談推進。"},
    "擊刑":{type:"內耗卡住",source:"擊刑",action:"先釐清內部矛盾與責任邊界，再談推進。"},
    "墓":{type:"進展收住",source:"入墓",action:"先整理、歸檔、收尾，等條件打開再放大。"},
    "入墓":{type:"進展收住",source:"入墓",action:"先整理、歸檔、收尾，等條件打開再放大。"}
  };
  return map[symbol]||null;
}
function buildRiskProfile(p,evidence,diagnosis){
  const symbols=[p?.door,p?.god,p?.star,...(p?.flags||[]),...(evidence||[]).map(ev=>ev.name)].filter(Boolean);
  const rows=[]; const used=new Set();
  symbols.forEach(sym=>{
    const rule=riskProfileRule(sym);
    if(rule&&!used.has(rule.type)){rows.push(rule); used.add(rule.type)}
  });
  (diagnosis?.riskTypes||[]).forEach(type=>{
    if(!used.has(type)){rows.push({type,source:"問題診斷",action:"把問題問窄，先驗證一個最小行動。"}); used.add(type)}
  });
  if(!rows.length)rows.push({type:"待觀察",source:"盤面未見集中風險",action:"仍以小步驗證為主，不把順象當保證。"});
  return rows.slice(0,6);
}
function riskProfileText(profile){
  return (profile||[]).map(item=>`${item.type}｜${item.source}：${item.action}`).join("\n");
}
function generateSoulReport(sourceChart, selectedPalace, qtype){
  const p=selectedPalace; const s=scorePalace(p,qtype); const bank=copyBank(); const evidence=buildCopyBankEvidence(sourceChart,p,qtype,s);
  const today=buildTodayAdvice(p,s,qtype); const feng=buildFengShuiPlan(p); const threePalace=analyzeThreePalaces(sourceChart,selectedNum,qtype);
  const positives=evidence.filter(ev=>ev.type==="good"); const risks=evidence.filter(ev=>ev.type==="risk"||ev.type==="warning");
  const level=s.directDeny?"強烈不建議":s.grade.name; const seed=[sourceChart?.meta?.solar,p.key,qtype,level].join("|");
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
  const problemDiagnosis=sourceChart?.problemDiagnosis||diagnoseQuestion(sourceChart?.question||questionText());
  const riskProfile=buildRiskProfile(p,evidence,problemDiagnosis);
  return {
    headline, score:s.score, level,
    problemDiagnosis,
    riskProfile,
    palaceSummary:`報數 ${selectedNum} 鎖 ${p.key}${p.number}宮，方位在${PALACE_DIR[p.key]}，五行屬${PALACE_ELEM[p.key]}。本次以「${qtype}」解讀，依鎖定宮、本人宮、事情宮、宮、門、星、神、干、特殊象與題型組合判斷。`,
    threePalace,
    scoreBreakdown:{baseScore:s.baseScore,qtypeScore:s.qtypeScore,finalScore:s.score,ruleTrace:s.ruleTrace,severity:s.severity,directDeny:s.directDeny},
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
    confidence:s.directDeny?"中高，因為有 fatal 嚴重度組合":positives.length&&risks.length?"中等，吉凶並見，需要照建議取用":positives.length?"中高，主要依據集中在可用象":"中低，正向依據不足",
    evidence,
    rawEvidence:evidence,
    ruleTrace:s.ruleTrace,
    severity:s.severity,
    todayAdvice:today
  };
}
function makeSoulReport(p,s){return generateSoulReport(chart,p,chart?.settings?.qtype||"今日運勢")}
window.generateSoulReport = generateSoulReport;
function makeSoulReportForNumber(num,p){
  const old=selectedNum;
  selectedNum=num;
  const report=generateSoulReport(chart,p,chart?.settings?.qtype||"今日運勢");
  selectedNum=old;
  return report;
}
function compareOptions(){
  const opts=chart?.settings?.compareOptions||{};
  return Object.fromEntries(compareSides().map(side=>[side,compareOptionFromState(side,opts)]));
}
function decisionMetricsForChoice(opt,scoreInfo){
  const name=String(opt.name||"");
  const lowCost=/先|短|小|試|等|不動|暫|觀察|確認|訊息|整理/.test(name);
  const highCost=/簽|投|借|付|辭|離職|搬|買|長約|重押|大/.test(name);
  const reversible=lowCost&&!highCost;
  const riskPenalty={fatal:35,block:22,pending:12,risk:16,usable:3,neutral:8}[scoreInfo.severity?.level||"neutral"]||8;
  const reversibility=reversible?85:highCost?35:60;
  const cost=lowCost?25:highCost?80:50;
  const risk=clamp(100-scoreInfo.score+riskPenalty,0,100);
  const decisionScore=clamp(Math.round(scoreInfo.score + reversibility*0.18 - cost*0.12 - risk*0.1),0,100);
  return {reversibility,cost,risk,decisionScore,notes:[reversible?"可逆性較高":"可逆性待確認",lowCost?"成本較小":highCost?"成本偏高":"成本中等",`風險 ${risk}/100`],verifyPoint:`先驗證「${opt.name}」是否能用最小行動取得明確回覆或條件。`};
}
function compareChoice(side,opt){
  const p=getPalaceByNum(opt.num);
  const s=scorePalace(p,chart.settings.qtype);
  const report=makeSoulReportForNumber(opt.num,p);
  const decision=decisionMetricsForChoice(opt,s);
  return {side,name:opt.name,num:opt.num,palace:p,score:s.score,denied:!!s.denied,grade:s.denied?"強烈不建議":s.grade.name,report,decision};
}
function compareRankValue(choice){return choice.denied?-20:choice.decision.decisionScore}
function buildCompareContext(){
  const opts=compareOptions();
  const choices=filledCompareOptions(opts).map(opt=>compareChoice(opt.side,opt));
  const ranked=[...choices].sort((a,b)=>compareRankValue(b)-compareRankValue(a));
  const winner=ranked[0], weaker=ranked[ranked.length-1], diff=Math.abs(compareRankValue(winner)-compareRankValue(weaker));
  let verdict="";
  if(ranked.every(c=>c.denied))verdict="所有選項都有強壓力，不適合重押；只能選風險最低、成本最小、最可逆的一步。";
  else if(diff<10)verdict="選項差距不大，重點不是硬分輸贏，而是哪個條件最清楚、可逆性最高、風險最容易降級。";
  else verdict=`${winner.name}目前較可用，因為決策分、可逆性、成本與風險整體優於其他選項。`;
  const bySide=Object.fromEntries(choices.map(choice=>[choice.side,choice]));
  return {...bySide,choices,ranked,winner,weaker,diff,verdict,qtype:chart.settings.qtype,question:chart.question||questionText()};
}
function compareCardHTML(choice,winnerSide){
  const tp=choice.report.threePalace;
  return `<div class="compare-card ${choice.side===winnerSide?"winner":""}">
    <div class="compare-card-head"><strong>${escapeHTML(choice.side)}｜${escapeHTML(choice.name)}</strong><span>${choice.denied?"×":choice.score+"/100"}｜${escapeHTML(choice.grade)}</span></div>
    <div>${escapeHTML(choice.num)} 號鎖 ${escapeHTML(choice.palace.key)}${choice.palace.number}宮｜${escapeHTML(PALACE_DIR[choice.palace.key])}</div>
    <div class="compare-card-copy">本人 ${escapeHTML(tp.selfPalace.key)}宮｜事情 ${escapeHTML(tp.matterPalace.key)}宮｜${escapeHTML(tp.relationSelfMatter.type)}</div>
    <div class="compare-card-copy">決策分 ${choice.decision.decisionScore}/100｜可逆 ${choice.decision.reversibility}｜成本 ${choice.decision.cost}｜風險 ${choice.decision.risk}</div>
    <div class="compare-card-copy">${escapeHTML(compactText(compareActionText(choice),180))}</div>
  </div>`;
}
function comparePanelHTML(ctx){
  return `<div class="compare-result">
    <div class="compare-verdict"><strong>比較結論</strong>${escapeHTML(ctx.verdict)}</div>
    <div class="compare-cards">${ctx.ranked.map(choice=>compareCardHTML(choice,ctx.winner.side)).join("")}</div>
    ${compareDecisionCardsHTML(ctx)}
    <div class="locked-summary"><strong>推薦取用</strong>${escapeHTML(ctx.winner.name)}較可用；若選${escapeHTML(ctx.weaker.name)}，請先照它的避險方法降級，不要一次重押。</div>
  </div>`;
}
function compareSummaryText(ctx){
  return `${ctx.verdict}\n\n推薦：${ctx.winner.side}｜${ctx.winner.name}（盤面 ${ctx.winner.score}/100｜決策 ${ctx.winner.decision.decisionScore}/100｜${ctx.winner.grade}）\n最低排序：${ctx.weaker.side}｜${ctx.weaker.name}（盤面 ${ctx.weaker.score}/100｜決策 ${ctx.weaker.decision.decisionScore}/100｜${ctx.weaker.grade}）`;
}
function compareLeadAction(choice){
  const name=String(choice?.name||"");
  if(/不動|暫停|先停|觀察/.test(name))return `先以${choice.name}為主線暫停出手。`;
  if(/明天|再說|等等|延後/.test(name))return `先以${choice.name}為主線延後決策。`;
  if(/短訊息|簡短|先發|試探/.test(name))return `先以${choice.name}為主線小步試探。`;
  return `先以${choice.name}為主線小步推進。`;
}
function decisionOptionStyle(name){
  const text=String(name||"");
  if(/不動|暫停|先停|觀察|暫不|不要|放棄/.test(text))return "hold";
  if(/明天|再說|等等|延後|晚點|改天/.test(text))return "delay";
  if(/短訊息|簡短|先發|試探|小測試|小額|短約|小交付|交換資料|補資料|查證|確認|記錄|整理|問清楚/.test(text))return "probe";
  if(/直接|主動|照原|投入|簽|合作|推進|安排|告白|購買|付款|承諾/.test(text))return "commit";
  return "neutral";
}
function compareChoiceRiskHint(choice){
  const profile=(choice?.report?.riskProfile||[])[0];
  if(profile)return `${profile.type}：${profile.action}`;
  const obstacle=compactText(choice?.report?.obstacle,120);
  return obstacle||"主要看條件是否清楚、是否能保留退路。";
}
function compareDecisionLine(choice){
  const d=choice.decision||{};
  return `決策分 ${d.decisionScore}/100，可逆 ${d.reversibility}、成本 ${d.cost}、風險 ${d.risk}；鎖 ${choice.palace.key}${choice.palace.number}宮。`;
}
function compareDecisionCard(choice){
  const name=String(choice?.name||"這個選項");
  const style=decisionOptionStyle(name);
  const d=choice.decision||{};
  const riskHint=compareChoiceRiskHint(choice);
  const stylePros={
    hold:"成本最低，能保留觀察空間，不急著把局面推到不可逆。",
    delay:"能讓情緒降溫，也能把條件、話術與停損點想清楚。",
    probe:"可逆性最高，適合用小訊號、小金額或小承諾先測真實反應。",
    commit:"速度最快，適合條件已清楚、窗口有限、需要主動取得進展時使用。",
    neutral:"彈性較高，可以先用一個最小條件判斷要不要放大。"
  };
  const styleConditions={
    hold:"適合在資訊不足、情緒未穩、承諾成本偏高時使用；但要設定回看時間。",
    delay:"適合今天狀態不穩、對方條件未明、需要隔天再確認時使用。",
    probe:"適合還看得到機會，但不確定對方態度、文件、金錢或承諾是否落地時使用。",
    commit:"適合已掌握基本條件，且能把投入範圍、期限與停損點講清楚時使用。",
    neutral:"適合選項本身還不夠具體，先把它縮成一個可驗證動作時使用。"
  };
  return {
    side:choice.side,
    name,
    style,
    advantage:`${stylePros[style]}盤面 ${choice.score}/100，決策 ${d.decisionScore}/100；${(d.notes||[]).join("、")}。`,
    risk:compareRiskText(choice),
    condition:styleConditions[style],
    verify:`${d.verifyPoint||`先驗證「${name}」是否能取得明確回覆。`} 回驗時記錄：是否有明確回覆、條件是否落地、風險是否被降級。`,
    evidence:`${choice.palace.key}${choice.palace.number}宮｜${choice.grade}｜${riskHint}`
  };
}
function compareDecisionCardText(choice){
  const card=compareDecisionCard(choice);
  return [
    `${card.side}｜${card.name}`,
    `優點：${card.advantage}`,
    `風險：${card.risk}`,
    `適合條件：${card.condition}`,
    `驗證點：${card.verify}`,
    `盤面依據：${card.evidence}`
  ].join("\n");
}
function compareDecisionCardsHTML(ctx){
  return `<div class="decision-cards">${ctx.ranked.map(choice=>{
    const card=compareDecisionCard(choice);
    return `<div class="decision-card">
      <strong>${escapeHTML(card.side)}｜${escapeHTML(card.name)}</strong>
      <p><b>優點</b>${escapeHTML(card.advantage)}</p>
      <p><b>風險</b>${escapeHTML(compactText(card.risk,150))}</p>
      <p><b>適合條件</b>${escapeHTML(card.condition)}</p>
      <p><b>驗證點</b>${escapeHTML(card.verify)}</p>
    </div>`;
  }).join("")}</div>`;
}
function compareActionText(choice){
  const name=String(choice?.name||"這個選項");
  const style=decisionOptionStyle(name);
  const action={
    hold:`「${name}」的用法不是推進，而是把決策暫停成一段觀察期：先整理底線、等待對方或現實條件自己露出訊號。`,
    delay:`「${name}」的用法是延後承諾：先把要說的話、要付出的成本與可撤回條件寫清楚，隔天再確認情緒是否降下來。`,
    probe:`「${name}」的用法是低成本測試：只做一個可撤回的小動作，目的拿到明確回覆、資料或條件，不把局面一次推滿。`,
    commit:`「${name}」的用法是主動推進：可以開口或安排下一步，但要先限定範圍、期限與停損點，避免直接重押。`,
    neutral:`「${name}」先當成中性方案處理：先確認一個最小條件，再決定要不要放大投入。`
  }[style];
  return `${action}${compareDecisionLine(choice)}此選項先看${compareChoiceRiskHint(choice)}`;
}
function compareRiskText(choice){
  const name=String(choice?.name||"這個選項");
  const style=decisionOptionStyle(name);
  const risk={
    hold:`「${name}」的風險是把觀察變成逃避，或拖過可處理窗口；要先設定回看時間。`,
    delay:`「${name}」的風險是冷處理後問題變模糊；延後可以，但明天要驗證哪一件事要先寫下來。`,
    probe:`「${name}」的風險是小測試變成逼問或連續追問；訊息、金額、承諾都要保持短、小、可退。`,
    commit:`「${name}」的風險是推得太快，現實條件還沒落地就先承諾；先避開長約、大額、不可逆決定。`,
    neutral:`「${name}」的風險在於條件不明卻被當成已確定；先避開一次定案。`
  }[style];
  return `${risk}${compareDecisionLine(choice)}避險重點：${compareChoiceRiskHint(choice)}`;
}
function makeSummary(p,s){const r=makeSoulReport(p,s); return {short:r.level,total:r.headline,action:String(r.actionPlan).replace(/\n/g," "),avoid:String(r.avoidPlan).replace(/\n/g," "),fengshui:r.fengShui.replace(/\n/g," ")}}
function renderResult(){
  const metricLock=document.getElementById("metricLock"), metricScore=document.getElementById("metricScore");
  if(!chart||!selectedNum){document.getElementById("resultSub").textContent="尚未選數"; document.getElementById("resultHeadline").textContent="先起盤並選數。"; document.getElementById("scoreNum").textContent="—"; document.getElementById("gradeText").textContent="未鎖定"; document.getElementById("scoreBar").style.width="0%"; document.getElementById("resultList").innerHTML=""; document.getElementById("reasonTabs").innerHTML=""; metricLock.textContent="未選數"; metricScore.textContent="—"; return}
  if(isCompareChart()){
    const ctx=buildCompareContext();
    metricLock.textContent=ctx.choices.map(c=>`${c.side}:${c.num}`).join("｜");
    metricScore.textContent=`推薦 ${ctx.winner.side}`;
    document.getElementById("resultSub").textContent=ctx.choices.map(c=>`${c.side}.${c.name}`).join(" vs ");
    document.getElementById("scoreNum").textContent=ctx.winner.denied?"×":ctx.winner.decision.decisionScore;
    document.getElementById("gradeText").innerHTML=`<span class="score-pill ${ctx.winner.denied?"score-bad":"score-good"}">推薦 ${escapeHTML(ctx.winner.side)}</span>`;
    document.getElementById("scoreBar").style.width=(ctx.winner.denied?100:ctx.winner.decision.decisionScore)+"%";
    document.getElementById("reasonTabs").innerHTML=ctx.choices.map((c,i)=>`<span class="tab ${i===0?"active":""}">${escapeHTML(c.side)} ${escapeHTML(c.name)}</span>`).concat(`<span class="tab">${escapeHTML(ctx.qtype)}</span>`).join("");
    document.getElementById("resultHeadline").textContent=ctx.verdict;
    document.getElementById("resultList").innerHTML=`${comparePanelHTML(ctx)}
      ${ctx.ranked.map(choice=>`<div class="item action"><strong>${escapeHTML(choice.side)}｜${escapeHTML(choice.name)}怎麼用</strong>${escapeHTML(compareActionText(choice))}</div><div class="item action"><strong>${escapeHTML(choice.side)}｜${escapeHTML(choice.name)}先避開</strong>${escapeHTML(compareRiskText(choice))}</div>`).join("")}`;
    return;
  }
  const p=getPalaceByNum(selectedNum); const s=scorePalace(p,chart.settings.qtype); const report=makeSoulReport(p,s);
  metricLock.textContent=`${selectedNum}｜${p.key}${PALACE_DIR[p.key]?"・"+PALACE_DIR[p.key]:""}`; metricScore.textContent=`${s.denied?"強烈不建議":s.score+"/100 "+s.grade.name}`;
  document.getElementById("resultSub").textContent=`${selectedNum} 號鎖 ${p.key}宮｜${PALACE_DIR[p.key]||"中央"}`; document.getElementById("scoreNum").textContent=s.denied?"×":s.score; document.getElementById("gradeText").innerHTML=`<span class="score-pill ${s.grade.cls}">${escapeHTML(report.level)}</span>`; document.getElementById("scoreBar").style.width=(s.denied?100:s.score)+"%";
  document.getElementById("reasonTabs").innerHTML=[`<span class="tab active">鎖定 ${p.key}${p.number}</span>`,`<span class="tab">本人 ${report.threePalace.selfPalace.key}</span>`,`<span class="tab">事情 ${report.threePalace.matterPalace.key}</span>`,`<span class="tab">用途已套用</span>`].join("");
  document.getElementById("resultHeadline").textContent=report.headline;
  const evidence=resultEvidenceItems(report.evidence).map(ev=>`<div class="item"><strong>${escapeHTML(ev.source)}｜${escapeHTML(ev.name)}</strong>${escapeHTML(taixuEvidenceSentence(ev))}</div>`).join("");
  const riskProfileCards=(report.riskProfile||[]).map(item=>`<div class="item action"><strong>${escapeHTML(item.type)}｜${escapeHTML(item.source)}</strong>${escapeHTML(item.action)}</div>`).join("");
  const today=report.todayAdvice;
  const todayCards=chart.settings.qtype==="今日運勢"?`<div class="item action"><strong>今日總運</strong>${escapeHTML(today.total)}｜主題：${escapeHTML(today.topic)}</div><div class="item action"><strong>今日說話</strong>${escapeHTML(today.speech)}</div><div class="item action"><strong>今日財務</strong>${escapeHTML(today.finance)}</div><div class="item action"><strong>今日工作</strong>${escapeHTML(today.work)}</div><div class="item action"><strong>健康提醒</strong>${escapeHTML(today.health)}</div>`:"";
  const tp=report.threePalace, fs=report.fengShuiPlan;
  document.getElementById("resultList").innerHTML=`<div class="item"><strong>三宮摘要</strong>鎖定 ${escapeHTML(tp.lockPalace.key)}宮｜本人 ${escapeHTML(tp.selfPalace.key)}宮｜事情 ${escapeHTML(tp.matterPalace.key)}宮。${escapeHTML(tp.relationSelfMatter.text)}</div>${riskProfileCards}<div class="item action"><strong>今天先做 3 條</strong>${escapeHTML(compactBulletBlock(report.actionPlan,3)).replace(/\n/g,"<br>")}</div><div class="item action"><strong>今天先避 3 條</strong>${escapeHTML(compactBulletBlock(report.avoidPlan,3)).replace(/\n/g,"<br>")}</div><div class="item action"><strong>風水三方位</strong>啟動方：${escapeHTML(fs.activateChoice.direction)}｜安靜方：${escapeHTML(fs.quietChoice.direction)}｜避動方：${escapeHTML(fs.avoidChoice.direction)}</div>${todayCards}<div class="item"><strong>用途權重</strong>基礎分 ${report.scoreBreakdown.baseScore}｜用途加權 ${report.scoreBreakdown.qtypeScore>=0?"+":""}${report.scoreBreakdown.qtypeScore}｜嚴重度 ${escapeHTML(report.severity.level)}</div>${evidence}`;
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
  const parts=String(text||"").split(/\n|。/).map(x=>cleanSentence(String(x).replace(/^[-•]\s*/,""))).filter(Boolean);
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
function palaceLine(label,p){
  if(!p)return `${label}：待確認`;
  return `${label}：${p.key}${p.number}宮｜${p.direction}｜${p.element}｜${[p.door,p.star,p.god].filter(Boolean).join("、")}`;
}
function threePalaceText(report){
  const t=report.threePalace||{};
  return [
    palaceLine("鎖定宮",t.lockPalace),
    palaceLine("本人宮",t.selfPalace),
    palaceLine("事情宮",t.matterPalace),
    `本人與事情：${t.relationSelfMatter?.text||"待確認"}`,
    `鎖定與事情：${t.relationLockMatter?.text||"待確認"}`
  ].join("\n");
}
function fengShuiStructuredText(report){
  const f=report.fengShuiPlan||{};
  const row=(label,item)=>item?`${label}：${item.direction}（${item.palace}宮）\n原因：${item.reason}\n可做：${(item.do||[]).join("、")||"保持乾淨"}\n避免：${(item.avoid||[]).join("、")||"不要重押"}`:"";
  return [row("啟動方",f.activateChoice),row("安靜方",f.quietChoice),row("避動方",f.avoidChoice)].filter(Boolean).join("\n\n")||report.fengShui;
}
function ruleTraceText(report,limit=8){
  const trace=report.ruleTrace||report.scoreBreakdown?.ruleTrace||[];
  if(!trace.length)return shortEvidenceBlock(report,limit);
  return trace.slice(0,limit).map((r,i)=>`${i+1}. ${r.source}｜${r.symbol}｜${r.value>0?"+":""}${r.value}：${r.reason}`).join("\n");
}
function formatNinePartReport(report,question,mode="detail"){
  const title="詳細報告";
  return [
    title,
    taixuReportIntro("detail"),
    question?`問事：${question}`:"",
    `零、問題診斷\n建議用途：${report.problemDiagnosis.suggestedQtype}｜信心：${report.problemDiagnosis.confidence}｜問題型態：${report.problemDiagnosis.decisionIntent}\n風險類型：${(report.problemDiagnosis.riskTypes||[]).join("、")||"待觀察"}\n建議追問：${(report.problemDiagnosis.followUps||[]).join("；")||"問題已足夠明確。"}`,
    `零之一、風險類型\n${riskProfileText(report.riskProfile)}`,
    `一、一句話總斷\n${report.headline}\n分數與傾向：${report.score}/100｜${report.level}\n基礎分：${report.scoreBreakdown.baseScore}｜用途加權：${report.scoreBreakdown.qtypeScore}｜嚴重度：${report.severity.level}`,
    `二、此事主題\n${report.todayAdvice.topic}。本題以「${chart.settings.qtype}」看，重點是${qtypeRule(chart.settings.qtype).tone}。`,
    `三、本人狀態（日干宮）\n${palaceLine("本人宮",report.threePalace.selfPalace)}\n${report.threePalace.relationSelfMatter.text}`,
    `四、事情本體（時干/題型用神宮）\n${palaceLine("事情宮",report.threePalace.matterPalace)}\n${matterSymbolsForQtype(chart.settings.qtype).join("、")}為本題暫定用神，仍待案例校準。`,
    `五、直覺鎖定宮\n${palaceLine("鎖定宮",report.threePalace.lockPalace)}\n${report.palaceSummary}`,
    `六、三宮關係\n${threePalaceText(report)}`,
    `七、可用機會\n${report.opportunity}`,
    `八、主要風險\n${report.obstacle}\n${(report.severity.reasons||[]).join(" ")}`,
    `九、今日行動\n${report.actionPlan}`,
    `十、今日避忌\n${report.avoidPlan}`,
    `十一、風水三方位\n${fengShuiStructuredText(report)}`,
    `十二、驗證點\n${listText(report.verifyPoints)}`,
    `十三、解盤依據\n${reportEvidenceBlock(report,mode)}\n\n用途權重軌跡：\n${ruleTraceText(report,12)}`
  ].filter(Boolean).join("\n\n");
}
function formatSimpleReport(report,question){
  return [
    "簡略報告",
    question?`問事：${question}`:"",
    `問題診斷\n建議用途：${report.problemDiagnosis.suggestedQtype}｜${report.problemDiagnosis.decisionIntent}｜風險：${(report.problemDiagnosis.riskTypes||[]).slice(0,3).join("、")||"待觀察"}`,
    `風險類型\n${riskProfileText(report.riskProfile)}`,
    `一句話總斷\n${report.headline}`,
    `傾向\n${report.score}/100｜${report.level}｜用途加權 ${report.scoreBreakdown.qtypeScore>=0?"+":""}${report.scoreBreakdown.qtypeScore}`,
    `三宮\n鎖定：${report.threePalace.lockPalace.key}宮｜本人：${report.threePalace.selfPalace.key}宮｜事情：${report.threePalace.matterPalace.key}宮\n${compactText(report.threePalace.relationSelfMatter.text,120)}`,
    `今天先做\n${compactBulletBlock(report.actionPlan,3)}`,
    `今天先避開\n${compactBulletBlock(report.avoidPlan,3)}`,
    `風水三方位\n啟動：${report.fengShuiPlan.activateChoice.direction}｜安靜：${report.fengShuiPlan.quietChoice.direction}｜避動：${report.fengShuiPlan.avoidChoice.direction}`,
    `驗證\n${listText(report.verifyPoints.slice(0,2))}`,
    `主要依據\n${ruleTraceText(report,3)}`
  ].filter(Boolean).join("\n\n");
}
function formatDetailReport(report,question,m){return formatNinePartReport(report,question,"detail")}
function formatTeacherReport(report,question,m,p){
  const stems=`天盤干：${p.top.join("、")||"無"}；地盤干：${p.bottom.join("、")||"無"}`;
  return [
    "老師教學",
    taixuReportIntro("teacher"),
    question?`問事：${question}`:"",
    `起盤資料\n${m.solar}｜${m.yearGZ}年 ${m.monthGZ}月 ${m.dayGZ}日 ${m.hourGZ}時｜${m.ju}｜空亡${m.kongwang}｜驛馬${m.yima}`,
    `鎖定宮位\n${report.palaceSummary}`,
    `盤面骨架\n${p.key}宮、${p.door||"無門"}、${p.star||"無星"}、${p.god||"無神"}、${stems}\n特殊象：${p.flags.length?p.flags.map(flagText).join("；"):"無明顯空亡、入墓、門迫、擊刑、驛馬標記。"}`,
    `老師總斷\n${report.headline}\n分數不是命令，只是目前能量天平的傾向：${report.score}/100｜${report.level}`,
    `太極三宮\n${threePalaceText(report)}`,
    `風險類型\n${riskProfileText(report.riskProfile)}`,
    `這盤怎麼讀\n${teacherLayerArticle(report,p,chart.settings.qtype)}`,
    `取用方法\n${report.actionPlan}`,
    `避險方法\n${report.avoidPlan}`,
    `逐條依據\n${teacherEvidenceBlock(report)}`,
    `回驗方式\n${listText(report.verifyPoints)}`,
    `提醒\n本工具為奇門遁甲學習、決策輔助與風險降級用途，不取代醫療、法律、投資或專業意見。重大決策請結合現實資料判斷；風水只處理地利的一部分，不能代替人的努力與選擇。`
  ].filter(Boolean).join("\n\n");
}
function compareEvidenceText(ctx){
  return ctx.ranked.map(choice=>`${choice.side}｜${choice.name}\n決策分：${choice.decision.decisionScore}/100｜可逆：${choice.decision.reversibility}｜成本：${choice.decision.cost}｜風險：${choice.decision.risk}\n${shortEvidenceBlock(choice.report,4)}`).join("\n\n");
}
function compareChoiceUseBlock(choice){
  return `${compareDecisionCardText(choice)}\n\n取用：${compareActionText(choice)}\n避開：${compareRiskText(choice)}`;
}
function formatCompareSimpleReport(ctx){
  return [
    "簡略比較報告",
    ctx.question?`問事：${ctx.question}`:"",
    `比較結論\n${compareSummaryText(ctx)}`,
    `推薦理由\n${ctx.winner.name}目前較可用；${ctx.winner.report.headline}`,
    `另一選項風險\n${ctx.weaker.name}不是完全不能選，但要先處理：${compareRiskText(ctx.weaker)}`,
    `今天怎麼做\n- ${compareLeadAction(ctx.winner)}\n- ${compareActionText(ctx.winner)}\n- 若仍想選${ctx.weaker.name}，先縮小投入、延後承諾、補齊條件。`,
    `決策卡\n${ctx.ranked.map(compareDecisionCardText).join("\n\n")}`,
    `選項排序\n${ctx.ranked.map((choice,i)=>`${i+1}. ${choice.side}｜${choice.name}｜決策 ${choice.decision.decisionScore}/100｜盤面 ${choice.score}/100｜${choice.decision.notes.join("、")}`).join("\n")}`,
    `主要依據\n${compareEvidenceText(ctx)}`
  ].filter(Boolean).join("\n\n");
}
function formatCompareDetailReport(ctx){
  const stateBlocks=ctx.ranked.map((choice,i)=>`${i+2}、${choice.side}｜${choice.name}目前狀態\n${choice.report.present}\n決策指標：決策 ${choice.decision.decisionScore}/100｜可逆 ${choice.decision.reversibility}｜成本 ${choice.decision.cost}｜風險 ${choice.decision.risk}`).join("\n\n");
  const useBlocks=ctx.ranked.map((choice,i)=>`${i+1}. ${compareChoiceUseBlock(choice)}`).join("\n\n");
  return [
    "詳細比較報告",
    taixuReportIntro("detail"),
    ctx.question?`問事：${ctx.question}`:"",
    `一、比較總斷\n${compareSummaryText(ctx)}`,
    stateBlocks,
    `四、為什麼推薦${ctx.winner.name}\n${ctx.verdict}\n${ctx.winner.report.opportunity}`,
    `五、主要風險排序\n${ctx.ranked.map(choice=>`${choice.side}｜${choice.name}：${choice.report.obstacle}`).join("\n")}`,
    `六、各選項決策卡\n${useBlocks}`,
    `九、回驗方式\n- 看哪個選項先出現明確回覆、文件、款項或可執行條件。\n- 看哪個選項的阻礙先被降級。\n- 事後回填結果，記錄實際應在哪個選項。`,
    `十、比較依據\n${compareEvidenceText(ctx)}`
  ].filter(Boolean).join("\n\n");
}
function formatCompareTeacherReport(ctx){
  return [
    "老師教學比較",
    "這是同一件事的多個選項，所以不能分開起多張盤亂比。正確讀法是：同一張盤、同一個時間、同一個題型，分別看每個選項的鎖定宮位，再比較可逆性、成本、風險與驗證點。",
    ctx.question?`問事：${ctx.question}`:"",
    `第一步，先看各選項宮位\n${ctx.ranked.map(choice=>`${choice.side} 是 ${choice.name}：${choice.num} 號，鎖 ${choice.palace.key}${choice.palace.number}宮，盤面 ${choice.score}/100｜決策 ${choice.decision.decisionScore}/100｜${choice.grade}。`).join("\n")}`,
    `第二步，看勝負不是只看盤面分數\n${ctx.verdict}\n決策分差距：${ctx.diff}。差距小於 10 時，不宜硬說誰一定贏；要看條件是否清楚、風險是否容易降級。`,
    `第三步，看每個選項的決策卡\n${ctx.ranked.map(compareChoiceUseBlock).join("\n\n")}`,
    `第五步，落到現實決策\n先選${ctx.winner.name}作主線，但不要把${ctx.weaker.name}完全丟掉；如果現實條件反而是${ctx.weaker.name}先落實，就用小步試做驗證，不要一次重押。`,
    `逐條依據\n${compareEvidenceText(ctx)}`
  ].filter(Boolean).join("\n\n");
}
function formatCompareReport(mode){
  const ctx=buildCompareContext();
  if(mode==="teacher")return formatCompareTeacherReport(ctx);
  if(mode==="detail")return formatCompareDetailReport(ctx);
  return formatCompareSimpleReport(ctx);
}
function makeReport(mode=reportMode){
  if(!chart)return "尚未產生報告。"; const m=chart.meta; const question=chart.question||questionText();
  if(isCompareChart())return formatCompareReport(mode);
  if(!selectedNum)return [`九宮奇門報告`,question?`問事：${question}`:"",`時間：${m.solar}`,`尚未選 1-9 鎖宮。`].filter(Boolean).join("\n");
  const p=getPalaceByNum(selectedNum); const s=scorePalace(p,chart.settings.qtype); const report=makeSoulReport(p,s);
  if(mode==="simple")return formatSimpleReport(report,question);
  if(mode==="teacher")return formatTeacherReport(report,question,m,p);
  return formatDetailReport(report,question,m);
}
function chartPayload(){return {version:RULE_VERSION.app, ruleVersion:RULE_VERSION, exportedAt:new Date().toISOString(), question:chart?.question||questionText(), problemDiagnosis:chart?.problemDiagnosis||diagnoseQuestion(questionText()), chart, selectedNum, compareSelections:isCompareChart()?compareOptions():null, report:chart?makeReport(reportMode):null}}
function currentCase(){
  if(!chart||(!selectedNum&&!isCompareChart()))throw new Error("請先起盤並選數字。");
  if(isCompareChart()){
    const ctx=buildCompareContext();
    const feedback=caseFeedbackFromForm();
    const compareRecord=Object.fromEntries(ctx.choices.map(choice=>[choice.side,{name:choice.name,num:choice.num,score:choice.score,decisionScore:choice.decision.decisionScore,palace:`${choice.palace.key}${choice.palace.number}`,decision:choice.decision}]));
    return {id:`case-${Date.now()}`,savedAt:new Date().toISOString(),updatedAt:new Date().toISOString(),reportVersion:"soul-report.v5",ruleVersion:RULE_VERSION,qtypeApplied:true,title:document.getElementById("caseTitle").value.trim()||`比較｜${chart.settings.qtype}｜${chart.meta.solar}`,outcome:feedback.outcome,userOutcome:feedback.outcome,afterAction:feedback.afterAction,compareChosen:feedback.compareChosen,compareHit:feedback.compareHit,compareNote:feedback.compareNote,problemDiagnosis:chart.problemDiagnosis||diagnoseQuestion(chart.question||questionText()),qtype:chart.settings.qtype,question:chart.question||questionText(),selectedNum:null,lockedPalace:ctx.choices.map(choice=>`${choice.side} ${choice.name}:${choice.palace.key}${choice.palace.number}`).join("｜"),selfPalace:ctx.choices.map(choice=>`${choice.side} ${choice.report.threePalace.selfPalace.key}`).join("｜"),matterPalace:ctx.choices.map(choice=>`${choice.side} ${choice.report.threePalace.matterPalace.key}`).join("｜"),result:`推薦 ${ctx.winner.side}｜${ctx.winner.name}`,summary:ctx.verdict,threePalaceSnapshot:Object.fromEntries(ctx.choices.map(choice=>[choice.side,choice.report.threePalace])),scoreBreakdown:Object.fromEntries(ctx.choices.map(choice=>[choice.side,choice.report.scoreBreakdown])),decisionCards:ctx.ranked.map(compareDecisionCard),decisionOptions:ctx.ranked.map(choice=>({side:choice.side,name:choice.name,num:choice.num,palace:`${choice.palace.key}${choice.palace.number}`,score:choice.score,decision:choice.decision,decisionCard:compareDecisionCard(choice)})),userFeedback:feedback,compare:{...compareRecord,winner:ctx.winner.side,ranking:ctx.ranked.map(choice=>choice.side)},report:formatCompareReport(reportMode),feedback,payload:chartPayload()};
  }
  const p=getPalaceByNum(selectedNum); const s=scorePalace(p,chart.settings.qtype); const report=makeSoulReport(p,s);
  const feedback=caseFeedbackFromForm();
  return {id:`case-${Date.now()}`,savedAt:new Date().toISOString(),updatedAt:new Date().toISOString(),reportVersion:"soul-report.v5",ruleVersion:RULE_VERSION,qtypeApplied:true,title:document.getElementById("caseTitle").value.trim()||`${chart.settings.qtype}｜${chart.meta.solar}`,outcome:feedback.outcome,userOutcome:feedback.outcome,afterAction:feedback.afterAction,problemDiagnosis:chart.problemDiagnosis||diagnoseQuestion(chart.question||questionText()),qtype:chart.settings.qtype,question:chart.question||questionText(),selectedNum,lockedPalace:p?`${p.key}${p.number}`:"",selfPalace:report.threePalace.selfPalace?`${report.threePalace.selfPalace.key}${report.threePalace.selfPalace.number}`:"",matterPalace:report.threePalace.matterPalace?`${report.threePalace.matterPalace.key}${report.threePalace.matterPalace.number}`:"",result:s.denied?"強烈不建議":`${s.score}/100 ${s.grade.name}`,summary:report.headline,threePalaceSnapshot:report.threePalace,scoreBreakdown:report.scoreBreakdown,userFeedback:feedback,report,feedback,payload:chartPayload()};
}
function caseFeedbackFromForm(){
  return {
    outcome:(document.getElementById("caseOutcome")?.value||"").trim(),
    accuracy:document.getElementById("caseAccuracy")?.value||"",
    hitArea:document.getElementById("caseHitArea")?.value||"",
    notes:(document.getElementById("caseNotes")?.value||"").trim(),
    compareChosen:document.getElementById("caseCompareChosen")?.value||"",
    compareHit:document.getElementById("caseCompareHit")?.value||"",
    compareNote:(document.getElementById("caseCompareNote")?.value||"").trim(),
    afterAction:(document.getElementById("caseAfterAction")?.value||"").trim(),
    verifiedSymbol:(document.getElementById("caseVerifiedSymbol")?.value||"").trim(),
    riskReduced:document.getElementById("caseRiskReduced")?.value||"",
    deviationResult:(document.getElementById("caseDeviationResult")?.value||"").trim(),
    calibration:document.getElementById("caseCalibration")?.value||""
  };
}
function fillCaseForm(c){
  document.getElementById("caseTitle").value=c?.title||"";
  document.getElementById("caseOutcome").value=c?.feedback?.outcome||c?.outcome||"";
  const acc=document.getElementById("caseAccuracy"); if(acc)acc.value=c?.feedback?.accuracy||"";
  const area=document.getElementById("caseHitArea"); if(area)area.value=c?.feedback?.hitArea||"";
  const notes=document.getElementById("caseNotes"); if(notes)notes.value=c?.feedback?.notes||"";
  const compareChosen=document.getElementById("caseCompareChosen"); if(compareChosen)compareChosen.value=c?.feedback?.compareChosen||c?.compareChosen||"";
  const compareHit=document.getElementById("caseCompareHit"); if(compareHit)compareHit.value=c?.feedback?.compareHit||c?.compareHit||"";
  const compareNote=document.getElementById("caseCompareNote"); if(compareNote)compareNote.value=c?.feedback?.compareNote||c?.compareNote||"";
  const after=document.getElementById("caseAfterAction"); if(after)after.value=c?.feedback?.afterAction||c?.afterAction||"";
  const symbol=document.getElementById("caseVerifiedSymbol"); if(symbol)symbol.value=c?.feedback?.verifiedSymbol||c?.verifiedSymbol||"";
  const risk=document.getElementById("caseRiskReduced"); if(risk)risk.value=c?.feedback?.riskReduced||c?.riskReduced||"";
  const deviation=document.getElementById("caseDeviationResult"); if(deviation)deviation.value=c?.feedback?.deviationResult||c?.deviationResult||"";
  const calibration=document.getElementById("caseCalibration"); if(calibration)calibration.value=c?.feedback?.calibration||c?.calibration||"";
}
function clearCaseFeedbackForm(){
  document.getElementById("caseTitle").value="";
  document.getElementById("caseOutcome").value="";
  const acc=document.getElementById("caseAccuracy"); if(acc)acc.value="";
  const area=document.getElementById("caseHitArea"); if(area)area.value="";
  const notes=document.getElementById("caseNotes"); if(notes)notes.value="";
  const compareChosen=document.getElementById("caseCompareChosen"); if(compareChosen)compareChosen.value="";
  const compareHit=document.getElementById("caseCompareHit"); if(compareHit)compareHit.value="";
  const compareNote=document.getElementById("caseCompareNote"); if(compareNote)compareNote.value="";
  const after=document.getElementById("caseAfterAction"); if(after)after.value="";
  const symbol=document.getElementById("caseVerifiedSymbol"); if(symbol)symbol.value="";
  const risk=document.getElementById("caseRiskReduced"); if(risk)risk.value="";
  const deviation=document.getElementById("caseDeviationResult"); if(deviation)deviation.value="";
  const calibration=document.getElementById("caseCalibration"); if(calibration)calibration.value="";
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
  cases[idx]={...cases[idx],title:document.getElementById("caseTitle").value.trim()||cases[idx].title,outcome:feedback.outcome,afterAction:feedback.afterAction,compareChosen:feedback.compareChosen,compareHit:feedback.compareHit,compareNote:feedback.compareNote,verifiedSymbol:feedback.verifiedSymbol,riskReduced:feedback.riskReduced,deviationResult:feedback.deviationResult,calibration:feedback.calibration,userFeedback:feedback,feedback,updatedAt:new Date().toISOString()};
  saveCases(cases); renderCases(); toast("回驗結果已更新。");
}
function buildCaseReviewChecklist(c){
  const completion=caseCompletion(c);
  const fb=c?.feedback||{};
  const lines=[
    "九宮奇門回驗清單",
    `案例：${c?.title||"未命名案例"}`,
    `題型：${c?.qtype||"待確認"}`,
    `問事：${c?.question||"未記錄"}`,
    `原判斷：${c?.summary||c?.result||"未記錄"}`,
    `回驗完整度：${completion.done}/${completion.total}`,
    "",
    "請補齊：",
    ...(completion.missing.length?completion.missing.map(x=>`- ${x}`):["- 已完整，下一步可觀察同類案例是否重複。"]),
    "",
    "回填欄位：",
    `實際結果：${fb.outcome||c?.outcome||""}`,
    `準確度：${fb.accuracy||""}`,
    `應事分類：${fb.hitArea||""}`,
    `比較題實際採用：${compareOptionLabel(fb.compareChosen||c?.compareChosen)}`,
    `比較題實際應驗：${compareOptionLabel(fb.compareHit||c?.compareHit)}`,
    `比較回驗備註：${fb.compareNote||c?.compareNote||""}`,
    `是否照建議做：${fb.afterAction||c?.afterAction||""}`,
    `哪個象應驗：${fb.verifiedSymbol||c?.verifiedSymbol||""}`,
    `風險是否降低：${riskReducedLabel(fb.riskReduced||c?.riskReduced)}`,
    `偏離建議後結果：${fb.deviationResult||c?.deviationResult||""}`,
    `校準結論：${calibrationLabel(fb.calibration||c?.calibration)}`,
    `備註：${fb.notes||""}`
  ];
  return lines.join("\n");
}
async function copyActiveCaseReviewChecklist(){
  if(!activeCaseId){toast("請先從案例庫按「回看」，再複製回驗清單。"); return}
  const item=loadCases().find(c=>c.id===activeCaseId);
  if(!item){toast("找不到目前回看的案例。"); return}
  const ok=await copyText(buildCaseReviewChecklist(item));
  toast(ok?"回驗清單已複製。":"瀏覽器限制複製，請改用匯出案例。");
}
function caseReviewFilterLabel(value){
  return {all:"全部案例",priority:"優先回驗",unreviewed:"待回填結果",incomplete:"待補完整",complete:"已完整","low-accuracy":"低分案例","compare-incomplete":"比較題待補","compare-chosen-mismatch":"推薦未採用","compare-hit-mismatch":"推薦未應驗"}[value]||"全部案例";
}
function caseReviewSearchText(c){
  return [c.title,c.outcome,c.afterAction,c.verifiedSymbol,c.feedback?.verifiedSymbol,c.riskReduced,c.feedback?.riskReduced,c.deviationResult,c.feedback?.deviationResult,c.calibration,c.feedback?.calibration,c.compareChosen,c.feedback?.compareChosen,c.compareHit,c.feedback?.compareHit,c.compareNote,c.feedback?.compareNote,c.feedback?.afterAction,c.feedback?.hitArea,c.feedback?.notes,c.problemDiagnosis?.suggestedQtype,c.problemDiagnosis?.decisionIntent,c.qtype,c.lockedPalace,c.result,c.summary].join(" ").toLowerCase();
}
function filteredReviewCases(allCases=loadCases()){
  const query=(document.getElementById("caseSearch")?.value||"").trim().toLowerCase();
  const reviewFilter=document.getElementById("caseReviewFilter")?.value||"all";
  return sortCasesForReview(allCases
    .filter(c=>!query||caseReviewSearchText(c).includes(query))
    .filter(c=>caseMatchesReviewFilter(c,reviewFilter)));
}
function caseReviewDigestLine(c,index){
  const completion=caseCompletion(c);
  const fb=c?.feedback||{};
  const accuracy=caseAccuracyValue(c);
  const priority=caseReviewPriority(c);
  const missing=completion.missing.length?completion.missing.join("、"):"已完整";
  const compareText=isCompareCase(c)?`｜採用 ${compareOptionLabel(fb.compareChosen||c?.compareChosen)}｜應驗 ${compareOptionLabel(fb.compareHit||c?.compareHit)}`:"";
  return [
    `${index+1}. ${priority.label}｜${c?.title||"未命名案例"}`,
    `   題型：${c?.qtype||"待確認"}｜鎖定：${c?.lockedPalace||"待確認"}｜結果：${c?.result||"未記錄"}`,
    `   問事：${c?.question||"未記錄"}`,
    `   原判斷：${c?.summary||"未記錄"}`,
    `   回驗：完整度 ${completion.done}/${completion.total}｜準確度 ${accuracy===null?"未回填":`${accuracy} 星`}｜應事 ${fb.hitArea||"未分類"}${compareText}`,
    `   優先原因：${priority.reason}`,
    `   待補：${missing}`,
    `   校準：${calibrationLabel(fb.calibration||c?.calibration)}｜備註：${fb.notes||fb.compareNote||c?.compareNote||""}`
  ].join("\n");
}
function buildFilteredCaseReviewChecklist(cases=filteredReviewCases(),options={}){
  const filter=options.filter||document.getElementById("caseReviewFilter")?.value||"all";
  const query=options.query??(document.getElementById("caseSearch")?.value||"").trim();
  const stats=caseStatsFromCases(cases);
  return [
    "九宮奇門 V5.0｜批次回驗清單",
    `產生時間：${new Date().toLocaleString("zh-TW")}`,
    `篩選：${caseReviewFilterLabel(filter)}`,
    `搜尋：${query||"無"}`,
    `案例數：${cases.length}`,
    `完整案例：${stats.completeCount}｜可校準率：${stats.readinessPercent}%`,
    "",
    cases.length?cases.map(caseReviewDigestLine).join("\n\n"):"目前篩選沒有案例。",
    "",
    "提醒：這份清單用來補回驗資料與找偏差，不把少量案例當作正式規則結論。"
  ].join("\n");
}
async function copyFilteredCaseReviewChecklist(){
  const cases=filteredReviewCases();
  if(!cases.length){toast("目前篩選沒有案例可複製。"); return}
  const ok=await copyText(buildFilteredCaseReviewChecklist(cases));
  toast(ok?"目前清單已複製。":"瀏覽器限制複製，請改用匯出 CSV。");
}
function caseAccuracyValue(c){
  const value=Number(c?.feedback?.accuracy||c?.userFeedback?.accuracy||c?.accuracy||"");
  return Number.isFinite(value)&&value>=1&&value<=5?value:null;
}
function incrementBucket(map,key,value){
  const name=key||"未分類";
  const item=map.get(name)||{name,count:0,sum:0,accuracyCount:0};
  item.count+=1;
  if(value!==null){item.sum+=value; item.accuracyCount+=1}
  map.set(name,item);
}
function scoreTraceFromCase(c){
  const raw=c?.scoreBreakdown;
  if(!raw)return [];
  if(Array.isArray(raw.ruleTrace))return raw.ruleTrace;
  return Object.values(raw).flatMap(item=>Array.isArray(item?.ruleTrace)?item.ruleTrace:[]);
}
function rankedBuckets(map,limit=4){
  return Array.from(map.values())
    .sort((a,b)=>(b.accuracyCount-a.accuracyCount)||(b.count-a.count)||a.name.localeCompare(b.name,"zh-Hant"))
    .slice(0,limit);
}
function bucketSummary(map,limit=5){
  const rows=rankedBuckets(map,limit);
  return rows.length?rows.map(item=>{
    const avg=item.accuracyCount?`，均 ${formatNumber(item.sum/item.accuracyCount,1)} 星`:"";
    return `- ${item.name}：${item.count} 筆${avg}`;
  }).join("\n"):"- 待累積";
}
function symbolHitKey(symbol,hitArea){
  return `${symbol||"未填應驗象"} → ${hitArea||"未分類"}`;
}
function actionFollowedLabel(text){
  const value=String(text||"").trim();
  if(!value)return "";
  if(/沒|未|不照|沒有|未做|沒做|未執行/.test(value))return "未照做";
  if(/有照做|照做|已做|有做|執行|採用|照建議/.test(value))return "有照做";
  return "已填行動";
}
function actionEffectKey(actionText,riskReduced){
  return `${actionFollowedLabel(actionText)||"未填行動"} → ${riskReducedLabel(riskReduced)}`;
}
function riskReducedLabel(value){
  return {yes:"有降低",partial:"部分降低",no:"沒有降低",unknown:"看不出來"}[value]||"未回填";
}
function compareOptionLabel(value){
  return {A:"選項 A",B:"選項 B",C:"選項 C",D:"選項 D",none:"沒有採用/都未應驗",mixed:"混合應驗",unclear:"看不出來/仍待觀察"}[value]||"未回填";
}
function compareMatchLabel(winner,value,type){
  if(!winner||!value)return "未回填";
  if(["unclear"].includes(value))return "仍待觀察";
  if(value==="mixed")return "混合應驗";
  if(value==="none")return type==="chosen"?"未採用任何選項":"都未應驗";
  return value===winner?"推薦命中":"推薦未命中";
}
function isCompareCase(c){
  return Boolean(c?.decisionOptions||c?.compare);
}
function compareWinnerFromCase(c){
  return c?.compare?.winner||"";
}
function compareChosenFromCase(c){
  return c?.feedback?.compareChosen||c?.compareChosen||"";
}
function compareHitFromCase(c){
  return c?.feedback?.compareHit||c?.compareHit||"";
}
function isSpecificCompareOption(value){
  return ["A","B","C","D"].includes(value);
}
function compareChosenMismatch(c){
  const winner=compareWinnerFromCase(c);
  const value=compareChosenFromCase(c);
  if(!winner||!value||value==="unclear")return false;
  return value==="none"||(isSpecificCompareOption(value)&&value!==winner);
}
function compareHitMismatch(c){
  const winner=compareWinnerFromCase(c);
  const value=compareHitFromCase(c);
  if(!winner||!value||value==="unclear")return false;
  return value==="none"||value==="mixed"||(isSpecificCompareOption(value)&&value!==winner);
}
function caseReviewPriority(c){
  const completion=caseCompletion(c);
  const accuracy=caseAccuracyValue(c);
  if(completion.done===0)return {rank:1,label:"P1 待回填",reason:"尚未回填實際結果，無法進入校準。"};
  if(accuracy!==null&&accuracy<=2)return {rank:1,label:"P1 低分待查",reason:"準確度 2 星以下，優先確認問法、鎖宮與文案是否需要修正。"};
  if(compareHitMismatch(c))return {rank:1,label:"P1 推薦未應驗",reason:"比較題實際應驗沒有對上推薦，需要回看條件變動或判斷依據。"};
  if(compareChosenMismatch(c))return {rank:2,label:"P2 推薦未採用",reason:"使用者未採用推薦，可回看成本、偏好或建議是否可執行。"};
  if(completion.done>0&&completion.done<completion.total)return {rank:2,label:"P2 待補完整",reason:"已有回驗但欄位未齊，補完整後才適合做校準。"};
  if(completion.done===completion.total)return {rank:4,label:"P4 已完整",reason:"資料完整，可作為後續校準樣本。"};
  return {rank:3,label:"P3 可觀察",reason:"已有部分資料，暫不屬於最高優先回看。"};
}
function caseReviewTime(c){
  const time=Date.parse(c?.updatedAt||c?.savedAt||"");
  return Number.isFinite(time)?time:0;
}
function sortCasesForReview(cases){
  return [...cases].sort((a,b)=>(caseReviewPriority(a).rank-caseReviewPriority(b).rank)||(caseReviewTime(b)-caseReviewTime(a)));
}
function calibrationLabel(value){
  return {accurate:"判斷準",delayed:"只是延遲","wrong-area":"應事不同","too-strong":"說得太死",downgrade:"需改成風險降級",unclear:"仍待觀察"}[value]||"未回填";
}
function caseMilestone(reviewed,total=reviewed){
  const milestones=[10,30,100];
  const next=milestones.find(n=>reviewed<n)||100;
  const done=Math.min(reviewed,100);
  const percent=Math.min(100,Math.round(done/100*100));
  const remaining=Math.max(0,next-reviewed);
  const label=reviewed>=100?"100 筆回驗完成，可開始做正式校準":reviewed>=30?"已過 30 筆回驗，可觀察題型穩定度":reviewed>=10?"已過 10 筆回驗，可開始看初步偏差":"先累積到 10 筆回驗，建立第一個校準樣本";
  return {next,done,percent,remaining,label,total};
}
function calibrationReadinessLabel(stats){
  if(!stats.feedbackCount)return "待回填";
  if(stats.completeCount>=100)return "可正式整理";
  if(stats.completeCount>=30)return "可看穩定度";
  if(stats.completeCount>=10)return "可看初步偏差";
  return "先補完整";
}
function caseStatsFromCases(cases){
  const stats={total:cases.length,feedbackCount:0,completeCount:0,incompleteReviewedCount:0,readinessPercent:0,accuracyCount:0,accuracySum:0,actionCount:0,actionEffectCount:0,deviationCount:0,calibrationCount:0,verifiedSymbolCount:0,riskReducedCount:0,riskReducedPositive:0,symbolHitPairCount:0,compareCaseCount:0,compareChosenCount:0,compareHitCount:0,compareChosenMatchCount:0,compareHitMatchCount:0,compareChosenMatchRate:null,compareHitMatchRate:null,lowAccuracy:0,highAccuracy:0,byQtype:new Map(),byHitArea:new Map(),byVerifiedSymbol:new Map(),byRiskReduced:new Map(),byCalibration:new Map(),bySymbolHitArea:new Map(),byActionEffect:new Map(),byCompareChosen:new Map(),byCompareHit:new Map(),byCompareChosenMatch:new Map(),byCompareHitMatch:new Map(),highTrace:new Map(),lowTrace:new Map()};
  cases.forEach(c=>{
    const completion=caseCompletion(c);
    const accuracy=caseAccuracyValue(c);
    const verifiedSymbol=(c?.feedback?.verifiedSymbol||c?.verifiedSymbol||"").trim();
    const hitArea=c?.feedback?.hitArea||"";
    const afterAction=(c?.afterAction||c?.feedback?.afterAction||"").trim();
    const riskReduced=c?.feedback?.riskReduced||c?.riskReduced||"";
    const deviationResult=(c?.feedback?.deviationResult||c?.deviationResult||"").trim();
    const calibration=c?.feedback?.calibration||c?.calibration||"";
    const compareChosen=c?.feedback?.compareChosen||c?.compareChosen||"";
    const compareHit=c?.feedback?.compareHit||c?.compareHit||"";
    const isCompare=Boolean(c?.decisionOptions||c?.compare);
    const compareWinner=c?.compare?.winner||"";
    const hasFeedback=Boolean((c?.outcome||c?.feedback?.outcome||"").trim())||accuracy!==null||Boolean(hitArea)||Boolean(verifiedSymbol)||Boolean(riskReduced)||Boolean(deviationResult)||Boolean(calibration)||Boolean(compareChosen)||Boolean(compareHit);
    if(hasFeedback)stats.feedbackCount+=1;
    if(completion.done===completion.total)stats.completeCount+=1;
    else if(hasFeedback)stats.incompleteReviewedCount+=1;
    if(isCompare)stats.compareCaseCount+=1;
    if(compareChosen){
      stats.compareChosenCount+=1;
      if(compareWinner&&compareChosen===compareWinner)stats.compareChosenMatchCount+=1;
      incrementBucket(stats.byCompareChosen,compareOptionLabel(compareChosen),accuracy);
      incrementBucket(stats.byCompareChosenMatch,compareMatchLabel(compareWinner,compareChosen,"chosen"),accuracy);
    }
    if(compareHit){
      stats.compareHitCount+=1;
      if(compareWinner&&compareHit===compareWinner)stats.compareHitMatchCount+=1;
      incrementBucket(stats.byCompareHit,compareOptionLabel(compareHit),accuracy);
      incrementBucket(stats.byCompareHitMatch,compareMatchLabel(compareWinner,compareHit,"hit"),accuracy);
    }
    if(afterAction)stats.actionCount+=1;
    if(deviationResult)stats.deviationCount+=1;
    if(calibration){stats.calibrationCount+=1; incrementBucket(stats.byCalibration,calibrationLabel(calibration),accuracy);}
    if(verifiedSymbol){stats.verifiedSymbolCount+=1; incrementBucket(stats.byVerifiedSymbol,verifiedSymbol,accuracy);}
    if(verifiedSymbol&&hitArea){stats.symbolHitPairCount+=1; incrementBucket(stats.bySymbolHitArea,symbolHitKey(verifiedSymbol,hitArea),accuracy);}
    if(riskReduced){stats.riskReducedCount+=1; if(["yes","partial"].includes(riskReduced))stats.riskReducedPositive+=1; incrementBucket(stats.byRiskReduced,riskReducedLabel(riskReduced),accuracy);}
    if(afterAction&&riskReduced){stats.actionEffectCount+=1; incrementBucket(stats.byActionEffect,actionEffectKey(afterAction,riskReduced),accuracy);}
    incrementBucket(stats.byQtype,c?.qtype||c?.problemDiagnosis?.suggestedQtype||"未分類",accuracy);
    incrementBucket(stats.byHitArea,hitArea||"未分類",accuracy);
    if(accuracy!==null){
      stats.accuracyCount+=1; stats.accuracySum+=accuracy;
      if(accuracy<=2)stats.lowAccuracy+=1;
      if(accuracy>=4)stats.highAccuracy+=1;
      const traceMap=accuracy>=4?stats.highTrace:accuracy<=2?stats.lowTrace:null;
      if(traceMap)scoreTraceFromCase(c).forEach(trace=>incrementBucket(traceMap,String(trace).slice(0,34),null));
    }
  });
  stats.averageAccuracy=stats.accuracyCount?stats.accuracySum/stats.accuracyCount:null;
  stats.readinessPercent=stats.feedbackCount?Math.round(stats.completeCount/stats.feedbackCount*100):0;
  stats.readinessLabel=calibrationReadinessLabel(stats);
  stats.compareChosenMatchRate=stats.compareChosenCount?Math.round(stats.compareChosenMatchCount/stats.compareChosenCount*100):null;
  stats.compareHitMatchRate=stats.compareHitCount?Math.round(stats.compareHitMatchCount/stats.compareHitCount*100):null;
  stats.milestone=caseMilestone(stats.feedbackCount,stats.total);
  return stats;
}
function calibrationHints(stats){
  const hints=[];
  hints.push(`${stats.milestone.label}；下一個里程碑還差 ${stats.milestone.remaining} 筆。`);
  if(stats.feedbackCount&&stats.completeCount<stats.feedbackCount)hints.push(`已有 ${stats.incompleteReviewedCount} 筆回驗未補完整；要做規則校準時，優先看完整案例，不只看已回填數。`);
  if(stats.completeCount>0)hints.push(`目前有 ${stats.completeCount} 筆完整案例可進入校準觀察，可校準率 ${stats.readinessPercent}%。`);
  if(stats.total<10)hints.push("案例少於 10 筆，只能當作個人校盤紀錄，暫不視為規則結論。");
  if(stats.feedbackCount<3)hints.push("回填結果仍少，先補實際結果與準確度，再看哪類題型穩定。");
  if(stats.lowAccuracy>0)hints.push(`已有 ${stats.lowAccuracy} 筆 2 星以下，建議回看題目是否問得太大、鎖宮是否選錯，或行動建議是否太積極。`);
  if(stats.actionCount>0)hints.push(`已有 ${stats.actionCount} 筆填了是否照建議做，可用來分辨「判斷不準」和「行動未照做」兩種情況。`);
  if(stats.actionEffectCount>0)hints.push(`已有 ${stats.actionEffectCount} 筆同時填了是否照做與風險降低，可開始觀察哪些行動建議真的有降風險。`);
  if(stats.verifiedSymbolCount>0)hints.push(`已有 ${stats.verifiedSymbolCount} 筆標註哪個象應驗，之後可用來校準「象落在哪個現實事件」。`);
  if(stats.symbolHitPairCount>0)hints.push(`已有 ${stats.symbolHitPairCount} 筆同時標註應驗象與應事分類，可開始觀察「哪個象常應在哪類事」。`);
  if(stats.riskReducedCount>0)hints.push(`已有 ${stats.riskReducedCount} 筆風險降級回饋，這會比單看吉凶更接近決策輔助。`);
  if(stats.deviationCount>0)hints.push(`已有 ${stats.deviationCount} 筆記錄偏離建議後結果，可分辨「沒照做」和「判斷本身需修正」。`);
  if(stats.calibrationCount>0)hints.push(`已有 ${stats.calibrationCount} 筆校準結論，能追蹤哪些地方要從吉凶改成風險降級。`);
  if(stats.compareHitCount>0)hints.push(`比較題已有 ${stats.compareHitCount} 筆填了實際應驗，推薦應驗率 ${stats.compareHitMatchRate}%；樣本少時只看趨勢，不急著改規則。`);
  if(!hints.length)hints.push("目前回驗走向穩定，但仍建議累積到 30 筆以上再調整權重。");
  return hints;
}
function calibrationAdvice(stats){
  const advice=[];
  const count=name=>stats.byCalibration.get(name)?.count||0;
  if(count("說得太死"))advice.push("把「一定、必然、不能」改成「目前條件下、先不要重押、先驗證」。");
  if(count("需改成風險降級"))advice.push("低分或凶象不要直接判死，改成風險類型、損失上限與下一個最小行動。");
  if(count("應事不同"))advice.push("回看題型與應驗象，標註這個象到底落在財、口舌、流程、感情或心理壓力。");
  if(count("只是延遲"))advice.push("把延遲象從「不成」改成「條件未實、等待補件或時間成熟」。");
  if(stats.lowAccuracy>0)advice.push("2 星以下案例先查問題是否太大、選宮是否不清、行動建議是否過度推進。");
  if(stats.actionEffectCount&&stats.riskReducedPositive<stats.riskReducedCount)advice.push("比較未降低風險的行動，找出哪些建議太抽象、太晚做或成本太高。");
  if(stats.feedbackCount&&stats.readinessPercent<60)advice.push("先補齊案例欄位再改規則；可校準率低於 60% 時，樣本容易被缺漏資料帶偏。");
  if(!advice.length)advice.push("目前先繼續累積案例，滿 30 筆後再調整權重與文案。");
  return uniqueText(advice);
}
function renderBucketList(items){
  if(!items.length)return "<span>待累積</span>";
  return items.map(item=>{
    const avg=item.accuracyCount?`｜均 ${formatNumber(item.sum/item.accuracyCount,1)} 星`:"";
    return `<span>${escapeHTML(item.name)} ${item.count} 筆${escapeHTML(avg)}</span>`;
  }).join("");
}
function caseCompletion(c){
  const fb=c?.feedback||{};
  const isCompare=isCompareCase(c);
  const checks=[
    ["實際結果",Boolean((c?.outcome||fb.outcome||"").trim())],
    ["準確度",caseAccuracyValue(c)!==null],
    ["應事分類",Boolean(fb.hitArea)],
    ["是否照做",Boolean((c?.afterAction||fb.afterAction||"").trim())],
    ["應驗象",Boolean((c?.verifiedSymbol||fb.verifiedSymbol||"").trim())],
    ["風險降低",Boolean(c?.riskReduced||fb.riskReduced)],
    ["偏離結果",Boolean((c?.deviationResult||fb.deviationResult||"").trim())],
    ["校準結論",Boolean(c?.calibration||fb.calibration)]
  ];
  if(isCompare){
    checks.push(["比較採用選項",Boolean(c?.compareChosen||fb.compareChosen)]);
    checks.push(["比較應驗選項",Boolean(c?.compareHit||fb.compareHit)]);
    checks.push(["比較回驗備註",Boolean((c?.compareNote||fb.compareNote||"").trim())]);
  }
  const done=checks.filter(([,ok])=>ok).length;
  const missing=checks.filter(([,ok])=>!ok).map(([name])=>name);
  return {done,total:checks.length,missing,percent:Math.round(done/checks.length*100)};
}
function caseMatchesReviewFilter(c,filter){
  if(!filter||filter==="all")return true;
  const completion=caseCompletion(c);
  if(filter==="unreviewed")return completion.done===0;
  if(filter==="priority")return caseReviewPriority(c).rank<=2;
  if(filter==="incomplete")return completion.done>0&&completion.done<completion.total;
  if(filter==="complete")return completion.done===completion.total;
  if(filter==="low-accuracy")return (caseAccuracyValue(c)??99)<=2;
  if(filter==="compare-incomplete")return isCompareCase(c)&&completion.done<completion.total;
  if(filter==="compare-chosen-mismatch")return compareChosenMismatch(c);
  if(filter==="compare-hit-mismatch")return compareHitMismatch(c);
  return true;
}
function caseProgressHTML(milestone){
  return `<div class="case-progress">
    <div><strong>100 回驗進度</strong><span>${milestone.done}/100｜已存 ${milestone.total} 筆｜${escapeHTML(milestone.label)}</span></div>
    <div class="case-progress-bar"><span style="width:${milestone.percent}%"></span></div>
  </div>`;
}
function caseTrainingTask(cases,stats=caseStatsFromCases(cases)){
  if(!stats.total)return {title:"先建立第一筆案例",detail:"問一個具體問題、起盤、選數並儲存，讓案例庫開始有可回看的素材。",filter:"all"};
  const annotated=cases.map(c=>({caseItem:c,completion:caseCompletion(c)}));
  const unreviewed=annotated.find(x=>x.completion.done===0);
  if(unreviewed)return {title:"先補實際結果",detail:"已有案例尚未回填結果。先補結果與準確度，比急著新增案例更能校準判斷。",filter:"unreviewed"};
  const incomplete=annotated.filter(x=>x.completion.done>0&&x.completion.done<x.completion.total).sort((a,b)=>a.completion.done-b.completion.done)[0];
  if(incomplete)return {title:"補齊回驗完整度",detail:`優先補「${incomplete.completion.missing.slice(0,3).join("、")}」，讓這筆案例能用來比較題型、應驗象與風險降級。`,filter:"incomplete"};
  if(stats.feedbackCount<10)return {title:"累積到 10 筆回驗",detail:`目前已有 ${stats.feedbackCount} 筆回驗，先做到 10 筆，只看初步偏差，不急著改規則。`,filter:"all"};
  if(stats.verifiedSymbolCount<stats.feedbackCount)return {title:"補哪個象應驗",detail:"有些回驗尚未標註應驗象。補上空亡、玄武、驚門等現實落點，才知道哪個象常應在哪類事件。",filter:"incomplete"};
  if(stats.riskReducedCount<stats.feedbackCount)return {title:"補風險是否降低",detail:"有些案例尚未標註風險是否降低。這會幫你分辨 App 是在算吉凶，還是真的有幫人把事情降風險。",filter:"incomplete"};
  if(stats.lowAccuracy>0&&stats.calibrationCount<stats.feedbackCount)return {title:"回看低分案例",detail:`已有 ${stats.lowAccuracy} 筆 2 星以下。優先判斷是問法太散、鎖宮不準、應事不同，還是文案說得太死。`,filter:"low-accuracy"};
  if(stats.compareChosenCount>=3&&stats.compareChosenMatchRate!==null&&stats.compareChosenMatchRate<60)return {title:"回看推薦未採用",detail:`比較題推薦採用率目前 ${stats.compareChosenMatchRate}%。先看是使用者偏好不同、成本不同，還是 App 推薦理由不夠可執行。`,filter:"compare-chosen-mismatch"};
  if(stats.compareHitCount>=3&&stats.compareHitMatchRate!==null&&stats.compareHitMatchRate<60)return {title:"回看推薦未應驗",detail:`比較題推薦應驗率目前 ${stats.compareHitMatchRate}%。優先檢查實際應驗選項、混合應驗與題目條件是否變動。`,filter:"compare-hit-mismatch"};
  if(stats.feedbackCount<30)return {title:"擴到 30 筆看題型穩定度",detail:"10 筆後可以看初步偏差；30 筆後再觀察哪些題型準、哪些題型常誤判。",filter:"all"};
  if(stats.feedbackCount<100)return {title:"穩定累積到 100 筆",detail:"現在重點是持續回驗，不用急著大改規則；每筆都補完整，100 筆後再做正式校準。",filter:"all"};
  return {title:"整理 100 筆校準結論",detail:"100 筆回驗已完成，可以開始整理哪些象最常應驗、哪些題型最難判、哪些地方要從吉凶改成風險降級。",filter:"complete"};
}
function caseTrainingTaskHTML(task){
  const action=task.filter?`<button class="case-mini" type="button" data-review-filter="${escapeHTML(task.filter)}">查看清單</button>`:"";
  return `<div class="case-next-task"><div><strong>下一步回驗任務：${escapeHTML(task.title)}</strong><span>${escapeHTML(task.detail)}</span></div>${action}</div>`;
}
function renderCaseStats(allCases=loadCases()){
  const box=document.getElementById("caseStats"); if(!box)return;
  const stats=caseStatsFromCases(allCases);
  const nextTask=caseTrainingTask(allCases,stats);
  if(!stats.total){
    box.innerHTML=`${caseProgressHTML(stats.milestone)}${caseTrainingTaskHTML(nextTask)}<div class="case-empty">尚無回驗資料。先儲存第一筆案例，開始累積題型、準確度與行動回饋。</div>`;
    return;
  }
  const avg=stats.averageAccuracy===null?"待回填":`${formatNumber(stats.averageAccuracy,1)} 星`;
  const riskRate=stats.riskReducedCount?`${Math.round(stats.riskReducedPositive/stats.riskReducedCount*100)}%`:"待回填";
  const chosenMatchRate=stats.compareChosenMatchRate===null?"待回填":`${stats.compareChosenMatchRate}%`;
  const hitMatchRate=stats.compareHitMatchRate===null?"待回填":`${stats.compareHitMatchRate}%`;
  const topHigh=rankedBuckets(stats.highTrace,3).map(x=>x.name).join("、")||"待累積";
  const topLow=rankedBuckets(stats.lowTrace,3).map(x=>x.name).join("、")||"待累積";
  const milestone=stats.milestone;
  box.innerHTML=`<div class="case-stats-head">
    <div><strong>回驗校準</strong><small>用案例慢慢修正判斷，不把少量資料當定論。</small></div>
    <div class="case-stats-score">${escapeHTML(avg)}</div>
  </div>
  ${caseProgressHTML(milestone)}
  ${caseTrainingTaskHTML(nextTask)}
  <div class="case-stats-grid">
    <div><span>案例總數</span><strong>${stats.total}</strong></div>
    <div><span>已回填</span><strong>${stats.feedbackCount}</strong></div>
    <div><span>完整案例</span><strong>${stats.completeCount}</strong></div>
    <div><span>可校準率</span><strong>${stats.readinessPercent}%</strong></div>
    <div><span>準確度</span><strong>${stats.accuracyCount}</strong></div>
    <div><span>風險降低</span><strong>${escapeHTML(riskRate)}</strong></div>
    <div><span>校準狀態</span><strong>${escapeHTML(stats.readinessLabel)}</strong></div>
    <div><span>待補完整</span><strong>${stats.incompleteReviewedCount}</strong></div>
    <div><span>推薦採用</span><strong>${escapeHTML(chosenMatchRate)}</strong></div>
    <div><span>推薦應驗</span><strong>${escapeHTML(hitMatchRate)}</strong></div>
  </div>
  <div class="case-stats-lines">
    <p><strong>題型分布</strong>${renderBucketList(rankedBuckets(stats.byQtype,5))}</p>
    <p><strong>應事分類</strong>${renderBucketList(rankedBuckets(stats.byHitArea,5))}</p>
    <p><strong>應驗符號</strong>${renderBucketList(rankedBuckets(stats.byVerifiedSymbol,5))}</p>
    <p><strong>符號落點</strong>${renderBucketList(rankedBuckets(stats.bySymbolHitArea,5))}</p>
    <p><strong>風險降級</strong>${renderBucketList(rankedBuckets(stats.byRiskReduced,5))}</p>
    <p><strong>行動成效</strong>${renderBucketList(rankedBuckets(stats.byActionEffect,5))}</p>
    <p><strong>比較採用</strong>${renderBucketList(rankedBuckets(stats.byCompareChosen,5))}</p>
    <p><strong>比較應驗</strong>${renderBucketList(rankedBuckets(stats.byCompareHit,5))}</p>
    <p><strong>採用命中</strong>${renderBucketList(rankedBuckets(stats.byCompareChosenMatch,5))}</p>
    <p><strong>應驗命中</strong>${renderBucketList(rankedBuckets(stats.byCompareHitMatch,5))}</p>
    <p><strong>校準結論</strong>${renderBucketList(rankedBuckets(stats.byCalibration,5))}</p>
    <p><strong>高分常見依據</strong><span>${escapeHTML(topHigh)}</span></p>
    <p><strong>低分待查依據</strong><span>${escapeHTML(topLow)}</span></p>
  </div>
  <ul class="case-hints">${calibrationAdvice(stats).map(h=>`<li>${escapeHTML(h)}</li>`).join("")}</ul>
  <ul class="case-hints">${calibrationHints(stats).map(h=>`<li>${escapeHTML(h)}</li>`).join("")}</ul>`;
}
function buildCaseCalibrationSummary(cases=loadCases()){
  const stats=caseStatsFromCases(cases);
  const task=caseTrainingTask(cases,stats);
  const avg=stats.averageAccuracy===null?"待回填":`${formatNumber(stats.averageAccuracy,1)} 星`;
  const riskRate=stats.riskReducedCount?`${Math.round(stats.riskReducedPositive/stats.riskReducedCount*100)}%`:"待回填";
  const chosenMatchRate=stats.compareChosenMatchRate===null?"待回填":`${stats.compareChosenMatchRate}%`;
  const hitMatchRate=stats.compareHitMatchRate===null?"待回填":`${stats.compareHitMatchRate}%`;
  return [
    "九宮奇門 V5.0｜案例校準摘要",
    `產生時間：${new Date().toLocaleString("zh-TW")}`,
    "",
    "一、進度",
    `案例總數：${stats.total}`,
    `已回填：${stats.feedbackCount}/100`,
    `完整案例：${stats.completeCount}`,
    `可校準率：${stats.readinessPercent}%`,
    `校準狀態：${stats.readinessLabel}`,
    `平均準確度：${avg}`,
    `風險降低率：${riskRate}`,
    `下一步：${task.title}｜${task.detail}`,
    "",
    "二、題型與應事",
    bucketSummary(stats.byQtype,5),
    "",
    "三、符號落點",
    bucketSummary(stats.bySymbolHitArea,5),
    "",
    "四、行動成效",
    bucketSummary(stats.byActionEffect,5),
    "",
    "五、校準結論",
    bucketSummary(stats.byCalibration,5),
    "",
    "五之一、比較題回驗",
    `比較案例：${stats.compareCaseCount}`,
    `已填採用選項：${stats.compareChosenCount}`,
    `已填應驗選項：${stats.compareHitCount}`,
    `推薦採用率：${chosenMatchRate}`,
    `推薦應驗率：${hitMatchRate}`,
    "採用分布：",
    bucketSummary(stats.byCompareChosen,5),
    "採用命中：",
    bucketSummary(stats.byCompareChosenMatch,5),
    "應驗分布：",
    bucketSummary(stats.byCompareHit,5),
    "應驗命中：",
    bucketSummary(stats.byCompareHitMatch,5),
    "",
    "六、回驗提醒",
    calibrationHints(stats).map(h=>`- ${h}`).join("\n"),
    "",
    "七、校準修正建議",
    calibrationAdvice(stats).map(h=>`- ${h}`).join("\n"),
    "",
    "提醒：少量案例只作為個人校準線索，不視為正式規則結論。"
  ].join("\n");
}
async function copyCaseCalibrationSummary(){
  const ok=await copyText(buildCaseCalibrationSummary(loadCases()));
  toast(ok?"校準摘要已複製。":"瀏覽器限制複製，請改用匯出 CSV。");
}
function renderCases(){
  const box=document.getElementById("caseList"); if(!box)return;
  const allCases=loadCases();
  renderCaseStats(allCases);
  const cases=filteredReviewCases(allCases);
  if(!cases.length){box.innerHTML=`<div class="case-empty">尚無案例。</div>`; return}
  box.innerHTML=cases.map(c=>{
    const fb=c.feedback||{}; const accuracy=fb.accuracy?`${fb.accuracy} 星`:"未回填"; const hit=fb.hitArea||"未分類";
    const compareTags=c.decisionOptions||c.compare?`<span class="tab">採用：${escapeHTML(compareOptionLabel(fb.compareChosen||c.compareChosen))}</span><span class="tab">應驗：${escapeHTML(compareOptionLabel(fb.compareHit||c.compareHit))}</span>`:"";
    const numLabel=c.decisionOptions?c.decisionOptions.map(opt=>`${opt.side}${opt.num}`).join("/"):c.compare?.A&&c.compare?.B?`A${c.compare.A.num}/B${c.compare.B.num}`:c.selectedNum;
    const completion=caseCompletion(c);
    const priority=caseReviewPriority(c);
    const missingText=completion.missing.length?`待補：${completion.missing.slice(0,4).join("、")}${completion.missing.length>4?"等":""}`:"回驗資料完整";
    return `<div class="case-card" data-case-id="${escapeHTML(c.id)}">
    <div>
      <h3>${escapeHTML(c.title)}</h3>
      <small>${escapeHTML(c.qtype)}｜鎖定 ${escapeHTML(c.lockedPalace)}｜本人 ${escapeHTML(c.selfPalace||"待確認")}｜事情 ${escapeHTML(c.matterPalace||"待確認")}｜${escapeHTML(c.result)}｜${new Date(c.savedAt).toLocaleString("zh-TW")}</small>
      ${c.question?`<small>問事：${escapeHTML(c.question)}</small>`:""}
      <div class="case-tags"><span class="tab">${escapeHTML(priority.label)}</span><span class="tab">${escapeHTML(numLabel)}</span><span class="tab">${escapeHTML(c.problemDiagnosis?.decisionIntent||"未診斷")}</span><span class="tab">${escapeHTML(c.outcome||"未填結果")}</span><span class="tab">${escapeHTML(accuracy)}</span><span class="tab">${escapeHTML(hit)}</span>${compareTags}<span class="tab">${escapeHTML(c.afterAction||c.feedback?.afterAction||"未填行動")}</span><span class="tab">${escapeHTML(c.verifiedSymbol||c.feedback?.verifiedSymbol||"未填應驗象")}</span><span class="tab">${escapeHTML(riskReducedLabel(c.riskReduced||c.feedback?.riskReduced))}</span><span class="tab">${escapeHTML(calibrationLabel(c.calibration||c.feedback?.calibration))}</span></div>
      <small>優先原因：${escapeHTML(priority.reason)}</small>
      <div class="case-completion"><strong>回驗完整度 ${completion.done}/${completion.total}</strong><span>${escapeHTML(missingText)}</span></div>
      ${c.compareNote||c.feedback?.compareNote?`<small>比較回驗：${escapeHTML(c.compareNote||c.feedback?.compareNote)}</small>`:""}
      ${c.deviationResult||c.feedback?.deviationResult?`<small>偏離建議後：${escapeHTML(c.deviationResult||c.feedback?.deviationResult)}</small>`:""}
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
function handleCaseStatsClick(event){
  const btn=event.target.closest("[data-review-filter]"); if(!btn)return;
  const filter=btn.dataset.reviewFilter||"all";
  const select=document.getElementById("caseReviewFilter");
  if(select){select.value=filter; renderCases(); toast("已切換回驗篩選。");}
}

// ===== 初始化 =====
function setDateInput(p){document.getElementById("dt").value=`${p.y}-${pad(p.m)}-${pad(p.d)}T${pad(p.hh)}:${pad(p.mm)}`}
function init(){
  const now=new Date(); setDateInput({y:now.getFullYear(),m:now.getMonth()+1,d:now.getDate(),hh:now.getHours(),mm:now.getMinutes()});
  renderAll();
  showView("ask");
  document.querySelectorAll(".nav-btn").forEach(btn=>btn.addEventListener("click",()=>showView(btn.dataset.view)));
  document.getElementById("quickExample").onclick=()=>{setSelectionMode("single"); compareSelections=blankCompareSelections(); activeCompareSide="A"; setDateInput({y:2026,m:7,d:8,hh:7,mm:44}); document.getElementById("qtype").value="今日運勢"; document.getElementById("questionText").value="今天這件事適不適合推進？"; selectedNum=7; buildChart(); renderAll(); showView("chart");};
  document.getElementById("quickNow").onclick=()=>{const n=new Date(); setDateInput({y:n.getFullYear(),m:n.getMonth()+1,d:n.getDate(),hh:n.getHours(),mm:n.getMinutes()});};
  document.getElementById("questionText").addEventListener("input",()=>{renderQuestionDiagnosis();});
  document.getElementById("applyDiagnosisQtype").onclick=applyDiagnosisQtype;
  document.getElementById("applyQuestionRewrite").onclick=applyQuestionRewrite;
  document.getElementById("applyDecisionOptions").onclick=applyDecisionOptionDrafts;
  document.getElementById("buildBtn").onclick=()=>{if(buildChart())showView("chart")};
  document.getElementById("resetInquiryAsk").onclick=resetInquiry;
  document.getElementById("resetInquiryChart").onclick=resetInquiry;
  ["printBtnAsk","printBtnChart"].forEach(id=>{const btn=document.getElementById(id); if(btn)btn.onclick=()=>window.print();});
  document.getElementById("copyReport").onclick=async()=>{const text=makeReport(); const ok=await copyText(text); if(ok){toast("報告已複製到剪貼簿。")}else{document.getElementById("reportBox").innerHTML=reportHTML(text); toast("瀏覽器限制複製，報告已放在下方可手動複製。")}};
  document.getElementById("downloadTxt").onclick=()=>download("九宮奇門報告.txt",makeReport());
  document.getElementById("exportJson").onclick=()=>download("qimen_jiugong_chart.json",JSON.stringify(chartPayload(),null,2),"application/json;charset=utf-8");
  document.getElementById("importJsonBtn").onclick=()=>document.getElementById("importJsonInput").click();
  document.getElementById("importJsonInput").onchange=e=>{importJsonFile(e.target.files[0]); e.target.value=""};
  document.getElementById("saveCase").onclick=saveCurrentCase;
  document.getElementById("updateCaseResult").onclick=updateCaseResult;
  document.getElementById("copyCaseReviewChecklist").onclick=copyActiveCaseReviewChecklist;
  document.getElementById("copyFilteredCaseReviewChecklist").onclick=copyFilteredCaseReviewChecklist;
  document.getElementById("copyCaseCalibrationSummary").onclick=copyCaseCalibrationSummary;
  document.getElementById("exportCases").onclick=()=>download("qimen_jiugong_cases.json",JSON.stringify({version:RULE_VERSION.app, exportedAt:new Date().toISOString(), cases:loadCases()},null,2),"application/json;charset=utf-8");
  document.getElementById("exportCasesCsv").onclick=()=>download("qimen_jiugong_case_reviews.csv",casesToReviewCsv(loadCases()),"text/csv;charset=utf-8");
  document.getElementById("exportFilteredCasesCsv").onclick=exportFilteredCasesCsv;
  document.getElementById("clearCases").onclick=()=>{if(confirm("確定清空案例庫？")){saveCases([]); renderCases(); toast("案例庫已清空。")}};
  document.getElementById("caseSearch").addEventListener("input",renderCases);
  document.getElementById("caseReviewFilter").addEventListener("change",renderCases);
  document.getElementById("caseStats").addEventListener("click",handleCaseStatsClick);
  document.getElementById("caseList").addEventListener("click",handleCaseClick);
  document.querySelectorAll(".report-mode").forEach(btn=>btn.addEventListener("click",()=>{
    reportMode=btn.dataset.reportMode||"simple";
    document.querySelectorAll(".report-mode").forEach(b=>b.classList.toggle("active",b===btn));
    renderReport();
  }));
  document.getElementById("qtype").addEventListener("change",()=>{if(chart&&!inquiryLocked){chart.settings.qtype=document.getElementById("qtype").value; renderAll();}});
  document.getElementById("inquiryMode").addEventListener("change",()=>{if(!inquiryLocked)renderAll();});
  document.getElementById("selectionMode").addEventListener("change",()=>{if(inquiryLocked)return; if(!isCompareMode()){compareSelections=blankCompareSelections(); activeCompareSide="A"} renderAll();});
  document.querySelectorAll(".compare-side").forEach(btn=>btn.addEventListener("click",()=>{if(inquiryLocked)return; activeCompareSide=btn.dataset.side||"A"; renderAll();}));
  compareSides().map(side=>`option${side}Name`).forEach(id=>document.getElementById(id).addEventListener("input",()=>{if(chart&&isCompareChart()){chart.settings.compareOptions=compareOptions(); renderAll();}}));
  ["doorMode","ziChange"].forEach(id=>document.getElementById(id).addEventListener("change",()=>{if(chart)buildChart()}));
  registerServiceWorker();
  runV5DevTests();
}
function testSamePalaceDifferentQtypeChangesScore(){
  if(!chart)return true;
  const p=(chart.palaces||[]).find(x=>!x.isCenter);
  if(!p)return true;
  const work=scorePalaceV5(p,"工作",{chart});
  const money=scorePalaceV5(p,"財運",{chart});
  console.assert(work.score!==money.score||work.qtypeScore!==money.qtypeScore,"V5: same palace should change when qtype changes.");
  return work.score!==money.score||work.qtypeScore!==money.qtypeScore;
}
function testEmptyNotAlwaysDirectDeny(){
  const p=(chart?.palaces||[]).find(x=>!x.isCenter) || {key:"坎",number:1,isCenter:false,god:"六合",star:"天心",door:"休門",top:["戊"],bottom:["乙"],flags:["空"]};
  const sample={...p,god:p.god==="白虎"?"六合":p.god,star:p.star==="天芮"?"天心":p.star,door:p.door==="死門"?"休門":p.door,flags:unique([...(p.flags||[]).filter(f=>!["刑","迫"].includes(f)),"空"])};
  const result=scorePalaceV5(sample,"風水",{chart});
  console.assert(!result.directDeny && result.severity.level==="pending","V5: empty palace should be pending, not always direct deny.");
  return !result.directDeny && result.severity.level==="pending";
}
function testThreePalaceFound(){
  if(!chart||!selectedNum)return true;
  const result=analyzeThreePalaces(chart,selectedNum,chart.settings.qtype);
  console.assert(!!result.lockPalace&&!!result.selfPalace&&!!result.matterPalace,"V5: three palaces should be found.");
  return !!result.lockPalace&&!!result.selfPalace&&!!result.matterPalace;
}
function testNoDuplicateIds(){
  const ids=[...document.querySelectorAll("[id]")].map(el=>el.id);
  const dupes=ids.filter((id,i)=>ids.indexOf(id)!==i);
  console.assert(!dupes.length,`V5: duplicate ids found: ${dupes.join(", ")}`);
  return !dupes.length;
}
function testReportContainsRequiredSections(){
  if(!chart||!selectedNum)return true;
  const text=makeReport("detail");
  const required=["問題診斷","風險類型","一句話總斷","此事主題","本人狀態","事情本體","直覺鎖定宮","三宮關係","可用機會","主要風險","今日行動","今日避忌","風水三方位","驗證點","解盤依據"];
  const missing=required.filter(x=>!text.includes(x));
  console.assert(!missing.length,`V5: report missing sections: ${missing.join(", ")}`);
  return !missing.length;
}
function testRiskProfileMapsSymbols(){
  const profile=buildRiskProfile({door:"驚門",god:"玄武",star:"天心",flags:["空"]},[],{riskTypes:["財務風險"]});
  const types=profile.map(x=>x.type);
  const ok=types.includes("口舌刺激")&&types.includes("資訊不透明")&&types.includes("未落實")&&types.includes("財務風險");
  console.assert(ok,"V5: risk profile should map symbols to real-world risk types.");
  return ok;
}
function testCaseSaveAndReload(){
  const payload={version:RULE_VERSION.app,cases:[{id:"v5-test",reportVersion:"soul-report.v5",threePalaceSnapshot:{},scoreBreakdown:{}}]};
  console.assert(payload.version==="5.0"&&payload.cases[0].reportVersion==="soul-report.v5","V5: case payload shape should include report version.");
  return payload.version==="5.0"&&payload.cases[0].reportVersion==="soul-report.v5";
}
function testCaseStatsAggregation(){
  const stats=caseStatsFromCases([
    {qtype:"感情",outcome:"有回覆",afterAction:"有照做",feedback:{accuracy:"4",hitArea:"感情",verifiedSymbol:"空亡應在延遲",riskReduced:"yes",calibration:"accurate"},scoreBreakdown:{ruleTrace:["生門 +10","六合 +8"]}},
    {qtype:"感情",outcome:"不準",feedback:{accuracy:"2",hitArea:"感情",verifiedSymbol:"驚門應在口舌",riskReduced:"no",deviationResult:"沒有照建議，口舌放大",calibration:"downgrade"},scoreBreakdown:{ruleTrace:["空亡 pending"]}}
  ]);
  const ok=stats.total===2&&stats.feedbackCount===2&&stats.completeCount===1&&stats.incompleteReviewedCount===1&&stats.readinessPercent===50&&stats.accuracyCount===2&&stats.actionCount===1&&stats.actionEffectCount===1&&stats.verifiedSymbolCount===2&&stats.symbolHitPairCount===2&&stats.riskReducedCount===2&&stats.riskReducedPositive===1&&stats.deviationCount===1&&stats.calibrationCount===2&&stats.byCalibration.get("需改成風險降級")?.count===1&&stats.milestone.next===10&&stats.milestone.remaining===8&&formatNumber(stats.averageAccuracy,1)==="3.0"&&stats.lowAccuracy===1&&stats.byQtype.get("感情")?.count===2&&stats.byVerifiedSymbol.get("空亡應在延遲")?.count===1&&stats.bySymbolHitArea.get("驚門應在口舌 → 感情")?.count===1&&stats.byActionEffect.get("有照做 → 有降低")?.count===1;
  console.assert(ok,"V5: case stats aggregation should count feedback, accuracy, actions and qtype buckets.");
  return ok;
}
function testCalibrationReadiness(){
  const complete={outcome:"有結果",afterAction:"有照做",verifiedSymbol:"驚門",riskReduced:"yes",deviationResult:"無",calibration:"accurate",feedback:{accuracy:"4",hitArea:"工作"}};
  const partial={outcome:"有結果",feedback:{accuracy:"4"}};
  const stats=caseStatsFromCases([complete,partial]);
  const ok=stats.completeCount===1&&stats.incompleteReviewedCount===1&&stats.readinessPercent===50&&stats.readinessLabel==="先補完整"&&buildCaseCalibrationSummary([complete,partial]).includes("可校準率：50%");
  console.assert(ok,"V5: calibration readiness should separate complete cases from merely reviewed cases.");
  return ok;
}
function testMilestoneUsesFeedbackCount(){
  const stats=caseStatsFromCases([
    {qtype:"工作",title:"只儲存，未回驗"},
    {qtype:"工作",outcome:"有結果",feedback:{accuracy:"4"}}
  ]);
  const ok=stats.total===2&&stats.feedbackCount===1&&stats.milestone.done===1&&stats.milestone.total===2&&stats.milestone.remaining===9;
  console.assert(ok,"V5: 100-case milestone should count reviewed feedback, not saved cases.");
  return ok;
}
function testCaseCompletionMissingFields(){
  const result=caseCompletion({outcome:"有結果",feedback:{accuracy:"4",hitArea:"工作",riskReduced:"yes"}});
  const ok=result.done===4&&result.total===8&&result.missing.includes("應驗象")&&result.missing.includes("校準結論");
  console.assert(ok,"V5: case completion should expose missing feedback fields.");
  return ok;
}
function testCompareCaseCompletionFields(){
  const result=caseCompletion({decisionOptions:[{side:"A"}],outcome:"有結果",feedback:{accuracy:"4",hitArea:"合作",compareChosen:"B"}});
  const ok=result.total===11&&result.done===4&&result.missing.includes("比較應驗選項")&&result.missing.includes("比較回驗備註");
  console.assert(ok,"V5: compare case completion should require chosen option, hit option and compare note.");
  return ok;
}
function testCompareRecommendationMatchStats(){
  const stats=caseStatsFromCases([
    {compare:{winner:"B"},decisionOptions:[{side:"A"},{side:"B"}],feedback:{accuracy:"4",compareChosen:"B",compareHit:"B"}},
    {compare:{winner:"B"},decisionOptions:[{side:"A"},{side:"B"}],feedback:{accuracy:"2",compareChosen:"A",compareHit:"mixed"}}
  ]);
  const ok=stats.compareChosenCount===2&&stats.compareHitCount===2&&stats.compareChosenMatchCount===1&&stats.compareHitMatchCount===1&&stats.compareChosenMatchRate===50&&stats.compareHitMatchRate===50&&stats.byCompareChosenMatch.get("推薦命中")?.count===1&&stats.byCompareHitMatch.get("混合應驗")?.count===1;
  console.assert(ok,"V5: compare recommendation match stats should track chosen and hit match rates.");
  return ok;
}
function testCaseReviewFilter(){
  const blank={title:"未回驗"};
  const partial={outcome:"有結果",feedback:{accuracy:"4"}};
  const low={outcome:"失準",feedback:{accuracy:"2",hitArea:"合作"}};
  const complete={outcome:"有結果",afterAction:"有照做",verifiedSymbol:"驚門",riskReduced:"yes",deviationResult:"無",calibration:"accurate",feedback:{accuracy:"4",hitArea:"口舌"}};
  const comparePartial={decisionOptions:[{side:"A"},{side:"B"}],outcome:"有結果",feedback:{accuracy:"4",compareChosen:"A"}};
  const compareChosenMiss={compare:{winner:"B"},decisionOptions:[{side:"A"},{side:"B"}],feedback:{compareChosen:"A"}};
  const compareHitMiss={compare:{winner:"B"},decisionOptions:[{side:"A"},{side:"B"}],feedback:{compareHit:"mixed"}};
  const ok=caseMatchesReviewFilter(blank,"unreviewed")&&caseMatchesReviewFilter(partial,"incomplete")&&caseMatchesReviewFilter(complete,"complete")&&!caseMatchesReviewFilter(partial,"complete")&&caseMatchesReviewFilter(low,"low-accuracy")&&caseMatchesReviewFilter(comparePartial,"compare-incomplete")&&caseMatchesReviewFilter(compareChosenMiss,"compare-chosen-mismatch")&&caseMatchesReviewFilter(compareHitMiss,"compare-hit-mismatch")&&caseMatchesReviewFilter(compareHitMiss,"priority")&&!caseMatchesReviewFilter(complete,"priority")&&!caseMatchesReviewFilter({feedback:{accuracy:"3"}},"low-accuracy");
  console.assert(ok,"V5: review filters should separate unreviewed, incomplete, low-score and compare mismatch cases.");
  return ok;
}
function testCaseReviewPriority(){
  const complete={savedAt:"2026-07-07T00:00:00Z",outcome:"有結果",afterAction:"有照做",verifiedSymbol:"驚門",riskReduced:"yes",deviationResult:"無",calibration:"accurate",feedback:{accuracy:"4",hitArea:"口舌"}};
  const low={savedAt:"2026-07-08T00:00:00Z",outcome:"失準",feedback:{accuracy:"2",hitArea:"合作"}};
  const chosenMiss={savedAt:"2026-07-06T00:00:00Z",compare:{winner:"B"},decisionOptions:[{side:"A"},{side:"B"}],feedback:{compareChosen:"A"}};
  const sorted=sortCasesForReview([complete,chosenMiss,low]);
  const ok=caseReviewPriority(low).label==="P1 低分待查"&&caseReviewPriority(chosenMiss).label==="P2 推薦未採用"&&caseReviewPriority(complete).label==="P4 已完整"&&sorted[0]===low&&sorted[2]===complete;
  console.assert(ok,"V5: case review priority should rank urgent calibration cases first.");
  return ok;
}
function testCaseReviewChecklist(){
  const text=buildCaseReviewChecklist({title:"測試案例",qtype:"工作",question:"要不要談合作",summary:"先小步驗證",feedback:{accuracy:"4",hitArea:"工作"}});
  const ok=text.includes("九宮奇門回驗清單")&&text.includes("回驗完整度")&&text.includes("請補齊")&&text.includes("哪個象應驗");
  console.assert(ok,"V5: review checklist should include missing fields and review prompts.");
  return ok;
}
function testFilteredCaseReviewChecklist(){
  const text=buildFilteredCaseReviewChecklist([
    {title:"比較案例",qtype:"合作",question:"選 A 或 B",lockedPalace:"A坎1｜B離9",result:"推薦 B",summary:"B 較穩",decisionOptions:[{side:"A"},{side:"B"}],compare:{winner:"B"},feedback:{accuracy:"2",hitArea:"合作",compareChosen:"A",compareHit:"mixed"}}
  ],{filter:"compare-hit-mismatch",query:"合作"});
  const ok=text.includes("批次回驗清單")&&text.includes("篩選：推薦未應驗")&&text.includes("案例數：1")&&text.includes("P1 低分待查")&&text.includes("採用 選項 A")&&text.includes("應驗 混合應驗")&&text.includes("優先原因：")&&text.includes("待補：");
  console.assert(ok,"V5: filtered review checklist should summarize the visible calibration queue.");
  return ok;
}
function testCaseReviewCsv(){
  const text=casesToReviewCsv([{savedAt:"2026-07-08",title:"測試,案例",qtype:"工作",outcome:"有結果",summary:"先小步驗證",feedback:{accuracy:"4",hitArea:"工作",verifiedSymbol:"驚門",riskReduced:"partial",calibration:"downgrade",compareChosen:"B",compareHit:"mixed",compareNote:"B 應驗，A 也有風險"}}]);
  const ok=text.includes("priorityRank")&&text.includes("priorityLabel")&&text.includes("priorityReason")&&text.includes("completion")&&text.includes("compareChosen")&&text.includes('"測試,案例"')&&text.includes("P2 待補完整")&&text.includes("需改成風險降級")&&text.includes("部分降低")&&text.includes("選項 B")&&text.includes("混合應驗");
  console.assert(ok,"V5: review CSV should export analysis-ready case fields and review priority.");
  return ok;
}
function testCaseTrainingTask(){
  const unreviewed=caseTrainingTask([{title:"未回驗"}]);
  const partial=caseTrainingTask([{outcome:"有結果",feedback:{accuracy:"4"}}]);
  const completeCases=Array.from({length:10},(_,i)=>({outcome:`結果${i}`,afterAction:"有照做",verifiedSymbol:"驚門",riskReduced:"yes",deviationResult:"無",calibration:"accurate",feedback:{accuracy:"4",hitArea:"工作"}}));
  const ten=caseTrainingTask(completeCases);
  const ok=unreviewed.filter==="unreviewed"&&partial.filter==="incomplete"&&ten.title.includes("30 筆");
  console.assert(ok,"V5: training task should guide the next case review action.");
  return ok;
}
function testCaseCalibrationSummary(){
  const text=buildCaseCalibrationSummary([
    {qtype:"合作",outcome:"有結果",afterAction:"有照做",verifiedSymbol:"玄武",riskReduced:"partial",calibration:"downgrade",feedback:{accuracy:"4",hitArea:"工作"}}
  ]);
  const ok=text.includes("案例校準摘要")&&text.includes("符號落點")&&text.includes("玄武 → 工作")&&text.includes("行動成效")&&text.includes("有照做 → 部分降低")&&text.includes("校準修正建議")&&text.includes("風險類型")&&text.includes("少量案例");
  console.assert(ok,"V5: calibration summary should include progress, symbol hit and action effect.");
  return ok;
}
function testQuestionRewrite(){
  const yesNo=buildQuestionRewrite("我要不要找他？",diagnoseQuestion("我要不要找他？"));
  const broad=buildQuestionRewrite("今天運勢如何",diagnoseQuestion("今天運勢如何"));
  const twice=buildQuestionRewrite(broad,diagnoseQuestion(broad));
  const ok=yesNo.includes("最小可行行動")&&broad.includes("收斂成一件可行動的事")&&twice===broad;
  console.assert(ok,"V5: question rewrite should turn broad questions into actionable questions.");
  return ok;
}
function testDecisionOptionDrafts(){
  const love=suggestDecisionOptions("我要不要找他？",diagnoseQuestion("我要不要找他？"));
  const money=suggestDecisionOptions("這筆錢要不要投入？",diagnoseQuestion("這筆錢要不要投入？"));
  const ok=love.includes("先發簡短訊息")&&money.includes("先小額測試")&&money.includes("暫時不動用資金");
  console.assert(ok,"V5: decision option drafts should create actionable compare options.");
  return ok;
}
function testCompareOptionTextsDiffer(){
  const base={palace:{key:"坎",number:1},decision:{decisionScore:61,reversibility:60,cost:50,risk:42},report:{riskProfile:[{type:"條件未明",action:"先確認一個條件。"}],obstacle:"條件未明。"}};
  const choices=[
    {...base,name:"今天主動推進",palace:{key:"乾",number:6},decision:{decisionScore:55,reversibility:45,cost:70,risk:58}},
    {...base,name:"先發簡短訊息",palace:{key:"巽",number:4},decision:{decisionScore:72,reversibility:85,cost:25,risk:30}},
    {...base,name:"暫時不動觀察",palace:{key:"艮",number:8},decision:{decisionScore:64,reversibility:85,cost:20,risk:38}}
  ];
  const texts=choices.map(choice=>`${compareActionText(choice)}｜${compareRiskText(choice)}`);
  const ok=new Set(texts).size===choices.length&&texts.every(text=>text.includes("決策分")&&text.includes("鎖 "));
  console.assert(ok,"V5: compare option guidance should differ by option style and decision metrics.");
  return ok;
}
function testCompareDecisionCardFields(){
  const choice={side:"A",name:"先發簡短訊息",score:72,grade:"可小用",palace:{key:"巽",number:4},decision:{decisionScore:80,reversibility:85,cost:25,risk:30,notes:["可逆性較高","成本較小"],verifyPoint:"先看對方是否明確回覆。"},report:{riskProfile:[{type:"口舌刺激",action:"避免逼問。"}],obstacle:"口舌刺激。"}};
  const card=compareDecisionCard(choice);
  const text=compareDecisionCardText(choice);
  const ok=["advantage","risk","condition","verify","evidence"].every(key=>String(card[key]||"").length>0)&&text.includes("優點：")&&text.includes("適合條件：")&&text.includes("驗證點：");
  console.assert(ok,"V5: compare decision card should expose advantage, risk, condition and verification fields.");
  return ok;
}
function runV5DevTests(){
  if(!new URLSearchParams(location.search).has("devtest"))return;
  testSamePalaceDifferentQtypeChangesScore();
  testEmptyNotAlwaysDirectDeny();
  testThreePalaceFound();
  testNoDuplicateIds();
  testReportContainsRequiredSections();
  testRiskProfileMapsSymbols();
  testCaseSaveAndReload();
  testCaseStatsAggregation();
  testCalibrationReadiness();
  testMilestoneUsesFeedbackCount();
  testCaseCompletionMissingFields();
  testCompareCaseCompletionFields();
  testCompareRecommendationMatchStats();
  testCaseReviewFilter();
  testCaseReviewPriority();
  testCaseReviewChecklist();
  testFilteredCaseReviewChecklist();
  testCaseReviewCsv();
  testCaseTrainingTask();
  testCaseCalibrationSummary();
  testQuestionRewrite();
  testDecisionOptionDrafts();
  testCompareOptionTextsDiffer();
  testCompareDecisionCardFields();
}
init();
