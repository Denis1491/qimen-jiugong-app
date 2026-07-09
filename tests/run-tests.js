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
const copyBank = read("qimen_soul_copy_bank.js");
const manifest = json("manifest.webmanifest");
const syntheticCases = json("sample-data/qimen_v5_100_synthetic_cases.json");
const lock = json("rules/lock-palace.json");
const scoring = json("rules/scoring.json");
const qtype = json("rules/qtype-rules.json");
const index = json("rules/rules.json");

global.window = { QIMEN_RULE_VERSION: { app: "5.3" }, QIMEN_CASE_STORAGE_KEY: "qimen-jiugong-cases-v5" };
global.localStorage = { getItem: () => null, setItem: () => {}, removeItem: () => {} };
const calibration = require(path.join(root, "app.js"));

assert(html.includes("style.css?v=5.3-personal-calibration-1"), "index.html must load V5.3 CSS");
assert(html.includes("engine.js?v=5.3-personal-calibration-1"), "index.html must load V5.3 engine");
assert(html.includes("app.js?v=5.3-personal-calibration-1"), "index.html must load V5.3 app");
assert(html.includes("shareReviewPanel"), "V5.2 share/review panel container is missing");
assert(html.includes("personalCalibrationReminder"), "V5.3 personal calibration reminder container is missing");
assert(html.includes("pendingReviewBannerAsk"), "V5.2 ask pending review banner is missing");
assert(html.includes("pendingReviewBannerCase"), "V5.2 case pending review banner is missing");
assert(html.includes("onboardingMount"), "V5.2 onboarding mount is missing");
assert(html.includes("caseList"), "case library UI is missing");
assert(html.includes("caseStats"), "case stats panel is missing");
assert(html.includes("decisionBrief"), "decision brief card container is missing");
assert(html.includes("actionChecklist"), "action checklist container is missing");
assert(html.includes("comparePanel"), "compare mode panel is missing");
assert(html.includes("optionAName") && html.includes("optionDName"), "A-D compare option fields are missing");
assert(html.includes("caseCompareChosen"), "compare chosen feedback field is missing");
assert(html.includes("caseCompareHit"), "compare hit feedback field is missing");
assert(html.includes("App V5.3｜術法規則 V5.0 待校準"), "rule display should separate app version from uncalibrated rule version");
assert(html.includes("copyPersonalCalibrationReport"), "V5.3 personal calibration report copy button is missing");
assert(html.includes("qimen_v5_100_synthetic_cases.json?v=5.3-personal-calibration-1"), "synthetic case link must use V5.3 cache buster");

[
  "buildShareCardText",
  "copyShareCardText",
  "downloadShareCardImage",
  "drawWrappedText",
  "downloadCanvasAsPng",
  "scheduleCaseReview",
  "loadPendingReviews",
  "savePendingReviews",
  "duePendingReviews",
  "renderPendingReviewBanner",
  "markReviewDone",
  "caseReviewCompletion",
  "caseMissingFields",
  "caseReviewPriorityLevel",
  "focusFirstMissingCaseField",
  "renderCaseCoachHint",
  "buildCalibrationStats",
  "renderCalibrationDashboard",
  "showOnboardingIfNeeded",
  "renderOnboarding",
  "dismissOnboarding",
  "briefFromCompareV52",
  "compareOptionOneLineRisk",
  "minimumReversibleStep",
  "calibrationCompletenessScore",
  "isFullyReviewedCase",
  "buildCalibrationMaturity",
  "renderCalibrationMaturity",
  "buildQtypePatternStats",
  "buildHitAreaPatternStats",
  "extractVerifiedSymbols",
  "normalizeVerifiedSymbol",
  "buildSymbolOutcomeStats",
  "buildRiskReductionStats",
  "buildPersonalCalibrationModel",
  "buildPersonalCalibrationReminder",
  "renderPersonalCalibrationReminder",
  "buildPersonalCalibrationReportText",
  "copyPersonalCalibrationReport"
].forEach(name => assert(app.includes(`function ${name}`), `${name} is missing`));

assert(app.includes("九宮奇門決策卡"), "share card text should identify the decision card");
assert(app.includes("今天先做") && app.includes("今天先避"), "share card text should include do/avoid sections");
assert(app.includes("PENDING_REVIEW_KEY") && app.includes("qimen-pending-reviews-v5"), "pending review storage key is missing");
assert(app.includes("ONBOARDING_KEY") && app.includes("qimen-onboarding-v52-seen"), "onboarding storage key is missing");
assert(app.includes("dueAt:due.toISOString()"), "scheduleCaseReview should create dueAt");
assert(app.includes("caseAccuracyValue(c)!==null"), "caseReviewCompletion should include accuracy");
assert(app.includes("實際結果") && app.includes("應驗象") && app.includes("校準結論"), "case missing fields should include V5.2 review fields");
assert(app.includes("averageAccuracy") && app.includes("riskReductionRate"), "buildCalibrationStats should compute core metrics");
assert(app.includes("compareAdoptionRate"), "buildCalibrationStats should compute compare adoption");
assert(app.includes("briefFromCompareV52(ctx)"), "renderResult should use V5.2 compare brief");
assert(app.includes("register(\"sw.js?v=5.3-personal-calibration-1\")"), "service worker registration should use V5.3 cache buster");

assert(style.includes(".share-review-panel"), "share/review styles are missing");
assert(style.includes(".pending-review-banner"), "pending review banner styles are missing");
assert(style.includes(".onboarding-backdrop"), "onboarding styles are missing");
assert(style.includes(".calibration-summary"), "calibration dashboard summary style is missing");
assert(style.includes(".personal-calibration-reminder"), "personal calibration reminder style is missing");
assert(style.includes(".personal-insights"), "personal insight styles are missing");
assert(style.includes("@media(max-width:680px)"), "mobile styles are missing");

assert(copyBank.includes("window.QIMEN_COPY_BANK"), "copy bank must expose window.QIMEN_COPY_BANK");
assert(engine.includes("QIMEN_RULE_VERSION"), "engine.js must expose rule version");
assert(engine.includes('app: "5.3"'), "engine app version should be V5.3");
assert(engine.includes('window.QIMEN_CASE_STORAGE_KEY = "qimen-jiugong-cases-v5"'), "case storage key should remain v5 compatible");
assert(sw.includes("qimen-jiugong-v5-3-personal-calibration-1"), "service worker cache name should be V5.3");
assert(sw.includes("app.js?v=5.3-personal-calibration-1"), "service worker app asset version should be V5.3");
assert(sw.includes("sample-data/qimen_v5_100_synthetic_cases.json?v=5.3-personal-calibration-1"), "service worker should cache synthetic sample data with V5.3 version");

assert(lock.version === "lock-palace.v5.0", "lock rule version should not change in V5.2");
assert(lock.mapping["5"] === 2, "lock mapping for 5 should remain internal 2");
assert(scoring.version === "scoring.v5.0", "scoring version should not change in V5.2");
assert(qtype.status.includes("待") || qtype.status, "qtype rules should keep a status marker");
assert(index.files.includes("scoring.json"), "rules index must include scoring.json");
assert(manifest.display === "standalone", "manifest display should be standalone");
assert(syntheticCases.dataSource === "synthetic", "synthetic case payload should be labeled synthetic");
assert(Array.isArray(syntheticCases.cases) && syntheticCases.cases.length === 100, "synthetic case payload should contain 100 cases");
assert(syntheticCases.cases.every(c => c.synthetic === true && c.dataSource === "synthetic"), "every synthetic case should be labeled synthetic");
assert(syntheticCases.cases.some(c => c.decisionOptions && c.compare), "synthetic cases should include comparison cases");

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

assert(calibration.buildCalibrationMaturity(Array.from({ length: 9 }, () => completeCase())).stage.includes("資料不足"), "maturity should label 0-9 full reviews as insufficient");
assert(calibration.buildCalibrationMaturity(Array.from({ length: 10 }, () => completeCase())).stage.includes("初步觀察"), "maturity should label 10-19 full reviews as initial observation");
assert(calibration.buildCalibrationMaturity(fullCases).stage.includes("初步個人化洞察"), "maturity should label 20+ full reviews as personal insight ready");
assert(calibration.extractVerifiedSymbols({ feedback: { verifiedSymbol: "空亡應在延遲，驚門應在口舌，玄武應在資訊不透明" } }).join(",") === "空亡,驚門,玄武", "extractVerifiedSymbols should normalize core symbols");
assert(calibration.buildSymbolOutcomeStats(fullCases).items[0].symbol === "空亡" && calibration.buildSymbolOutcomeStats(fullCases).items[0].count === 14, "buildSymbolOutcomeStats should count symbol hits");
assert(calibration.buildRiskReductionStats(fullCases).followedRate === 100, "buildRiskReductionStats should compute followed risk reduction rate");
assert(calibration.buildPersonalCalibrationReminder({}, fullCases.slice(0, 9))[0].includes("案例還不夠多"), "personal reminder should avoid strong conclusions under 10 full reviews");
assert(calibration.buildPersonalCalibrationReminder({ evidence: ["空亡"] }, fullCases)[0].includes("空亡"), "personal reminder should mention matched symbol after enough cases");
assert(calibration.buildPersonalCalibrationReportText(fullCases).includes("九宮奇門個人校準報告") && calibration.buildPersonalCalibrationReportText(fullCases).includes("這份報告只根據本機案例庫產生"), "personal calibration report should include required report sections and disclaimer");

console.log("V5.3 static and calibration checks passed.");
