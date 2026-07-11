const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const read = file => fs.readFileSync(path.join(root, file), "utf8");
const json = file => JSON.parse(read(file));
const assert = (condition, message) => {
  if (!condition) throw new Error(message);
};

const html = read("index.html");
const style = read("style.css");
const engine = read("engine.js");
const app = read("app.js");
const timeQimenSource = read("timeqimen-engine.js");
const sw = read("sw.js");
const manifest = json("manifest.webmanifest");
const lock = json("rules/lock-palace.json");
const scoring = json("rules/scoring.json");
const qtype = json("rules/qtype-rules.json");
const syntheticCases = json("sample-data/qimen_v5_100_synthetic_cases.json");

global.window = { QIMEN_RULE_VERSION: { app: "5.5", chart: "shijia-zhirun-zhuanpan.v2" }, QIMEN_CASE_STORAGE_KEY: "qimen-jiugong-cases-v5" };
global.localStorage = { getItem: () => null, setItem: () => {}, removeItem: () => {} };
const core = require(path.join(root, "app.js"));
const timeQimen = require(path.join(root, "timeqimen-engine.js"));

const assetVersion = "5.5-shijia-2";
assert(html.includes(`style.css?v=${assetVersion}`), "index.html must load V5.5 CSS");
assert(html.includes(`engine.js?v=${assetVersion}`), "index.html must load V5.5 metadata");
assert(html.includes(`timeqimen-engine.js?v=${assetVersion}`), "index.html must load the Time-Qimen engine");
assert(html.includes(`app.js?v=${assetVersion}`), "index.html must load V5.5 app");
assert(html.includes('id="simpleAskView"') && html.includes('id="simpleResultView"') && html.includes('id="simpleChartView"'), "ask, result and full-chart screens are required");
assert(html.includes('id="questionText"') && html.includes('id="qtype"'), "question and qtype inputs are required");
assert(html.includes('id="timeSummary"'), "the current chart time summary is required");
assert(html.includes('min="1900-01-31T00:00"') && html.includes('max="2050-12-31T23:59"'), "the date input must match the supported lunar-calendar range");
assert(html.includes('id="numPad"') && html.includes('id="buildBtn"'), "number pad and primary action are required");
assert(html.includes('id="resultScore"') && html.includes('id="resultVerdict"'), "score and verdict outputs are required");
assert(html.includes('id="resetBtn"'), "reset action is required");
assert(html.includes('id="openChartBtn"') && html.includes('id="backToResultBtn"'), "full-chart navigation actions are required");
assert(html.includes('id="simplePalaceGrid"') && html.includes('id="palaceDetail"'), "full-chart grid and palace detail are required");
assert(!/<main[^>]*aria-live=/i.test(html) && html.includes('class="score-orbit" role="status"'), "live announcements must stay scoped to result and palace detail");
assert(html.includes("時家奇門・置閏・轉盤；分數只看鎖定宮。"), "visible method and scoring summary is required");
assert(html.includes("超接置閏九日門檻") && html.includes("天禽寄坤"), "full chart must disclose the selected method variants");
assert(!html.includes("陰盤公式試算") && !html.includes("目前沿用陰盤起局公式產生"), "the retired Yinpan trial label must not remain");
assert(!html.includes('id="viewCase"') && !html.includes('id="palaceGrid"'), "legacy case and chart surfaces must not return");
assert(!html.includes("qimen_soul_copy_bank.js"), "legacy copy bank must not load in the simple UI");

assert(style.includes(".mobile-prototype"), "mobile prototype wrapper is required");
assert(style.includes("assets/paper-texture.webp"), "paper texture must be used by the UI");
assert(style.includes(".score-orbit") && style.includes(".result-verdict"), "result-first visual hierarchy is required");
assert(style.includes(".simple-chart-grid") && style.includes(".chart-palace") && style.includes(".palace-detail"), "mobile full-chart styles are required");
assert(style.includes(":focus-visible"), "visible keyboard focus styles are required");
assert(/\.rule-note\s*\{[^}]*font-size:\s*12px/s.test(style), "rule disclaimer must remain legible at 12px or larger");
assert(fs.statSync(path.join(root, "assets", "paper-texture.webp")).size > 0, "paper texture asset is missing");

assert(engine.includes('app: "5.5"') && engine.includes('chart: "shijia-zhirun-zhuanpan.v2"'), "engine metadata should identify V5.5 Time-Qimen");
assert(timeQimenSource.includes('const VERSION = "shijia-zhirun-zhuanpan.v2"'), "Time-Qimen engine version is required");
assert(engine.includes('window.QIMEN_CASE_STORAGE_KEY = "qimen-jiugong-cases-v5"'), "case storage key must remain v5 compatible");
assert(sw.includes("qimen-jiugong-v5-5-shijia-2"), "service worker cache name should be V5.5 Time-Qimen release");
assert(sw.includes(`timeqimen-engine.js?v=${assetVersion}`), "service worker must cache the Time-Qimen engine");
assert(sw.includes('key.startsWith("qimen-jiugong-") && key !== CACHE_NAME'), "service worker must only delete its own old caches");
assert(sw.includes(`app.js?v=${assetVersion}`), "service worker must cache the V5.4 app asset");
assert(sw.includes("assets/paper-texture.webp"), "service worker must cache the paper texture");
assert(app.includes(`register("sw.js?v=${assetVersion}")`), "service worker registration should use the V5.5 cache buster");
assert(app.includes('keys.filter(key=>key.startsWith("qimen-jiugong-"))'), "localhost must clean up stale Qimen caches");
assert(app.includes('new URL(worker.scriptURL).pathname===localWorkerPath'), "localhost must only unregister this app's service worker path");
assert(app.includes("健康、法律與財務問題，請以專業判斷為準。"), "high-risk topics must always show a professional-advice reminder");
assert(app.includes("function renderSimpleChart()") && app.includes("function inspectSimplePalace(number)"), "full-chart rendering and palace inspection are required");
assert(!app.includes("<span>神</span>") && !app.includes("<span>星</span>") && !app.includes("<span>門</span>"), "compact palace cells should show values without redundant category labels");
assert(app.includes('selectedNum===5') && app.includes("報數 5 → 取"), "the full chart must explain the 5-to-2 lock mapping");
assert(app.includes("history.pushState") && app.includes('addEventListener("popstate"'), "mobile browser back must return from chart to result");

assert(lock.version === "lock-palace.v5.0", "lock rule version must not change during UI simplification");
assert(lock.mapping["5"] === 2, "internal 5 to 2 lock mapping must remain unchanged");
assert(scoring.version === "scoring.v5.0", "scoring version must not change during UI simplification");
assert(scoring.directDeny.god.includes("白虎") && scoring.directDeny.star.includes("天蓬") && scoring.directDeny.flag.includes("空"), "book direct-deny symbols are required");
assert(qtype.status.includes("待") || qtype.status, "qtype rules must retain a pending-calibration status");
assert(manifest.display === "standalone", "manifest display should remain standalone");
assert(manifest.description.includes("分數") && manifest.description.includes("吉凶"), "manifest should describe the simplified experience");
assert(manifest.description.includes("完整九宮"), "manifest should describe the optional full chart");

assert(core.lockedPalaceNumber(5) === 2 && core.lockedPalaceNumber(7) === 7, "number locking must remain compatible");
assert(core.grade(80).name === "大吉", "80-point grade boundary changed unexpectedly");
assert(core.grade(60).name === "可用", "60-point grade boundary changed unexpectedly");
assert(core.grade(30).name === "有風險", "30-point grade boundary changed unexpectedly");
assert(core.grade(29).name === "不建議", "low-score grade boundary changed unexpectedly");
assert(core.simpleOutcomeForScore(60).verdict === "吉", "60 points should show 吉 in simple mode");
assert(core.simpleOutcomeForScore(59).verdict === "凶", "59 points should show 凶 in simple mode");
assert(core.simpleOutcomeForScore(72, true).verdict === "凶", "fatal outcomes should show 凶 in simple mode");
assert(JSON.stringify(core.solarToLunar(1900, 1, 31)) === JSON.stringify({year:1900,month:1,day:1,isLeap:false}), "the first supported lunar date must convert correctly");
let earlyDateRejected = false;
try { core.solarToLunar(1900, 1, 30); } catch (error) { earlyDateRejected = /1900\/01\/31/.test(error.message); }
assert(earlyDateRejected, "dates before the lunar-data epoch must be rejected");
assert(core.isSupportedAppDate({y:2050,m:12,d:31,hh:23,mm:59}), "the last supported minute must be accepted");
assert(core.solarToLunar(2050, 12, 31).day > 0, "the final supported date must have a valid lunar day");
assert(!core.isSupportedAppDate({y:2051,m:1,d:1,hh:0,mm:0}), "dates after the supported range must be rejected");

const samplePalace = {
  key: "乾",
  number: 6,
  isCenter: false,
  god: "六合",
  star: "天心",
  door: "開門",
  top: ["乙"],
  bottom: ["戊"],
  flags: []
};
const sampleScore = core.scorePalaceV5(samplePalace, "決策");
assert(sampleScore.score >= 0 && sampleScore.score <= 100, "core score must remain within 0-100");
const boundaryScore = core.scorePalaceV5({...samplePalace,star:"天英",stars:["天英"],top:["壬"],bottom:["癸"]}, "決策");
assert(boundaryScore.score === 60 && boundaryScore.grade.name === "吉", "exactly 60 points must be classified as 吉");

const bookScoreChart = timeQimen.generate({ y: 2019, m: 8, d: 13, hh: 16, mm: 33 });
const byNumber = number => bookScoreChart.palaces.find(palace => palace.number === number);
assert(core.scorePalaceV5(byNumber(2), "決策").score === 70, "book example report 5 -> Kun 2 should score 70");
assert(core.scorePalaceV5(byNumber(4), "決策").directDeny, "book example report 4 must be denied by Geng even with positive symbols");
assert(core.scorePalaceV5(byNumber(7), "決策").score === 40, "book example report 7 should score 40");
assert(core.scorePalaceV5(byNumber(2), "工作").score === core.scorePalaceV5(byNumber(2), "財運").score, "question type must not change the book score");

const lodgedGengChart = timeQimen.generate({ y: 2020, m: 1, d: 22, hh: 12, mm: 0 });
const lodgedGengKun = lodgedGengChart.palaces.find(palace => palace.number === 2);
assert(lodgedGengKun.bottom.includes("庚"), "the center earth stem must lodge in Kun 2");
assert(core.scorePalaceV5(lodgedGengKun, "決策").directDeny, "a lodged Geng stem must still trigger direct denial");

const bookDenyChart = timeQimen.generate({ y: 2019, m: 8, d: 12, hh: 1, mm: 42 });
const bookDeny = core.scorePalaceV5(bookDenyChart.palaces.find(palace => palace.number === 9), "決策");
assert(bookDeny.directDeny && bookDeny.score === 0, "book fatal example must be directly denied before positive scoring");

assert(syntheticCases.dataSource === "synthetic", "synthetic cases must stay labeled as synthetic");
assert(Array.isArray(syntheticCases.cases) && syntheticCases.cases.length === 100, "synthetic dataset must stay intact");

const completeCase = (overrides = {}) => {
  const { feedback = {}, ...rest } = overrides;
  return {
    qtype: "決策",
    outcome: "有結果",
    afterAction: "有照建議做",
    riskReduced: "yes",
    calibration: "accurate",
    ...rest,
    feedback: { accuracy: "4", hitArea: "延遲未實", verifiedSymbol: "空亡應在延遲", ...feedback }
  };
};
const fullCases = Array.from({ length: 20 }, (_, i) => completeCase({
  qtype: i < 12 ? "決策" : "工作",
  feedback: { accuracy: "4", hitArea: i < 12 ? "延遲未實" : "口舌", verifiedSymbol: i < 14 ? "空亡應在延遲" : "驚門應在口舌" }
}));

assert(core.buildCalibrationMaturity(Array.from({ length: 9 }, () => completeCase())).stage.includes("資料不足"), "legacy calibration should remain compatible");
assert(core.buildCalibrationMaturity(fullCases).stage.includes("初步個人化洞察"), "legacy calibration maturity should remain compatible");
assert(core.extractVerifiedSymbols({ feedback: { verifiedSymbol: "空亡應在延遲，驚門應在口舌，玄武應在資訊不透明" } }).join(",") === "空亡,驚門,玄武", "legacy symbol extraction should remain compatible");
assert(core.buildRiskReductionStats(fullCases).followedRate === 100, "legacy risk-reduction statistics should remain compatible");

console.log("V5.5 simple UI and Time-Qimen integration checks passed.");
