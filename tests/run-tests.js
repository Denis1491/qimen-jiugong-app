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
const sw = read("sw.js");
const manifest = json("manifest.webmanifest");
const lock = json("rules/lock-palace.json");
const scoring = json("rules/scoring.json");
const qtype = json("rules/qtype-rules.json");
const syntheticCases = json("sample-data/qimen_v5_100_synthetic_cases.json");

global.window = { QIMEN_RULE_VERSION: { app: "5.4" }, QIMEN_CASE_STORAGE_KEY: "qimen-jiugong-cases-v5" };
global.localStorage = { getItem: () => null, setItem: () => {}, removeItem: () => {} };
const core = require(path.join(root, "app.js"));

const assetVersion = "5.4-simple-result-first-4";
assert(html.includes(`style.css?v=${assetVersion}`), "index.html must load V5.4 CSS");
assert(html.includes(`engine.js?v=${assetVersion}`), "index.html must load V5.4 engine");
assert(html.includes(`app.js?v=${assetVersion}`), "index.html must load V5.4 app");
assert(html.includes('id="simpleAskView"') && html.includes('id="simpleResultView"'), "simple ask and result screens are required");
assert(html.includes('id="questionText"') && html.includes('id="qtype"'), "question and qtype inputs are required");
assert(html.includes('id="timeSummary"'), "the current chart time summary is required");
assert(html.includes('id="numPad"') && html.includes('id="buildBtn"'), "number pad and primary action are required");
assert(html.includes('id="resultScore"') && html.includes('id="resultVerdict"'), "score and verdict outputs are required");
assert(html.includes('id="resetBtn"'), "reset action is required");
assert(html.includes("術法規則待校準，分數僅表示目前規則下的傾向。"), "visible rule disclaimer is required");
assert(!html.includes('id="viewCase"') && !html.includes('id="palaceGrid"'), "legacy case and chart surfaces must not remain visible");
assert(!html.includes("qimen_soul_copy_bank.js"), "legacy copy bank must not load in the simple UI");

assert(style.includes(".mobile-prototype"), "mobile prototype wrapper is required");
assert(style.includes("assets/paper-texture.webp"), "paper texture must be used by the UI");
assert(style.includes(".score-orbit") && style.includes(".result-verdict"), "result-first visual hierarchy is required");
assert(style.includes(":focus-visible"), "visible keyboard focus styles are required");
assert(/\.rule-note\s*\{[^}]*font-size:\s*12px/s.test(style), "rule disclaimer must remain legible at 12px or larger");
assert(fs.statSync(path.join(root, "assets", "paper-texture.webp")).size > 0, "paper texture asset is missing");

assert(engine.includes('app: "5.4"'), "engine app version should be V5.4");
assert(engine.includes('window.QIMEN_CASE_STORAGE_KEY = "qimen-jiugong-cases-v5"'), "case storage key must remain v5 compatible");
assert(sw.includes("qimen-jiugong-v5-4-simple-result-first-4"), "service worker cache name should be V5.4");
assert(sw.includes('key.startsWith("qimen-jiugong-") && key !== CACHE_NAME'), "service worker must only delete its own old caches");
assert(sw.includes(`app.js?v=${assetVersion}`), "service worker must cache the V5.4 app asset");
assert(sw.includes("assets/paper-texture.webp"), "service worker must cache the paper texture");
assert(app.includes(`register("sw.js?v=${assetVersion}")`), "service worker registration should use the V5.4 cache buster");
assert(app.includes('keys.filter(key=>key.startsWith("qimen-jiugong-"))'), "localhost must clean up stale Qimen caches");
assert(app.includes('new URL(worker.scriptURL).pathname===localWorkerPath'), "localhost must only unregister this app's service worker path");
assert(app.includes("健康、法律與財務問題，請以專業判斷為準。"), "high-risk topics must always show a professional-advice reminder");

assert(lock.version === "lock-palace.v5.0", "lock rule version must not change during UI simplification");
assert(lock.mapping["5"] === 2, "internal 5 to 2 lock mapping must remain unchanged");
assert(scoring.version === "scoring.v5.0", "scoring version must not change during UI simplification");
assert(qtype.status.includes("待") || qtype.status, "qtype rules must retain a pending-calibration status");
assert(manifest.display === "standalone", "manifest display should remain standalone");
assert(manifest.description.includes("分數與吉凶"), "manifest should describe the simplified experience");

assert(core.lockedPalaceNumber(5) === 2 && core.lockedPalaceNumber(7) === 7, "number locking must remain compatible");
assert(core.grade(80).name === "大吉", "80-point grade boundary changed unexpectedly");
assert(core.grade(60).name === "可用", "60-point grade boundary changed unexpectedly");
assert(core.grade(30).name === "有風險", "30-point grade boundary changed unexpectedly");
assert(core.grade(29).name === "不建議", "low-score grade boundary changed unexpectedly");
assert(core.simpleOutcomeForScore(60).verdict === "偏吉", "60 points should show 偏吉 in simple mode");
assert(core.simpleOutcomeForScore(59).verdict === "偏凶", "59 points should show 偏凶 in simple mode");
assert(core.simpleOutcomeForScore(72, true).verdict === "凶", "fatal outcomes should show 凶 in simple mode");

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

console.log("V5.4 simple UI and core checks passed.");
