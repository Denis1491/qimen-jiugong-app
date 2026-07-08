const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const outPath = path.join(root, "sample-data", "qimen_v5_100_synthetic_cases.json");

const qtypes = ["工作", "合作", "感情", "財務", "健康", "今日運勢", "風水", "其他"];
const intents = ["是否推進", "二選一", "風險評估", "等待觀察", "溝通修正"];
const palaces = [
  ["坎", 1], ["坤", 2], ["震", 3], ["巽", 4], ["中", 5],
  ["乾", 6], ["兌", 7], ["艮", 8], ["離", 9]
];
const symbols = ["驚門", "休門", "生門", "傷門", "杜門", "景門", "死門", "開門", "玄武", "六合", "白虎", "空亡"];
const hitAreas = ["財", "工作", "感情", "口舌", "健康", "風水", "其他"];
const calibrations = ["accurate", "delayed", "wrong-area", "too-strong", "downgrade", "unclear"];
const risks = ["yes", "partial", "no", "unknown"];
const accuracyCycle = [5, 4, 4, 3, 2, 5, 3, 1, 4, 2];

function iso(day, hour) {
  return `2026-06-${String(day).padStart(2, "0")}T${String(hour).padStart(2, "0")}:30:00.000Z`;
}

function palaceAt(i) {
  const item = palaces[i % palaces.length];
  return { key: item[0], number: item[1] };
}

function feedbackFor(i, complete) {
  if (i % 10 === 0) return {};
  const accuracy = accuracyCycle[i % accuracyCycle.length];
  const fb = {
    outcome: `示範結果 ${i + 1}：後續已觀察到部分發展。`,
    accuracy: String(accuracy),
    hitArea: hitAreas[i % hitAreas.length],
    notes: "示範資料，僅用於測試 100 筆案例流程，不代表真實應驗。",
    afterAction: i % 3 === 0 ? "沒有完全照建議做" : "有照做，先小步驗證",
    verifiedSymbol: symbols[i % symbols.length],
    riskReduced: risks[i % risks.length],
    deviationResult: i % 4 === 0 ? "偏離建議後，問題有放大跡象。" : "照建議降低了推進幅度。",
    calibration: calibrations[i % calibrations.length]
  };
  if (!complete) {
    delete fb.verifiedSymbol;
    if (i % 2 === 0) delete fb.riskReduced;
    if (i % 3 === 0) delete fb.calibration;
  }
  return fb;
}

function singleCase(i) {
  const qtype = qtypes[i % qtypes.length];
  const palace = palaceAt(i);
  const complete = i % 6 !== 0;
  const fb = feedbackFor(i, complete);
  const selectedNum = palace.number;
  return {
    id: `synthetic-case-${String(i + 1).padStart(3, "0")}`,
    savedAt: iso((i % 28) + 1, 8 + (i % 10)),
    updatedAt: iso((i % 28) + 1, 9 + (i % 8)),
    dataSource: "synthetic",
    synthetic: true,
    reportVersion: "soul-report.v5",
    ruleVersion: { app: "5.0", rule: "V4.3｜用途待確認" },
    qtypeApplied: true,
    title: `示範資料 ${String(i + 1).padStart(3, "0")}｜${qtype}`,
    outcome: fb.outcome || "",
    userOutcome: fb.outcome || "",
    afterAction: fb.afterAction || "",
    problemDiagnosis: {
      suggestedQtype: qtype,
      decisionIntent: intents[i % intents.length],
      cautions: ["示範資料，不作真實規則結論"]
    },
    qtype,
    question: `示範問題 ${i + 1}：這件${qtype}相關事項是否適合推進？`,
    selectedNum,
    lockedPalace: `${palace.key}${palace.number}`,
    selfPalace: palaceAt(i + 2).key,
    matterPalace: palaceAt(i + 4).key,
    result: `${45 + (i % 45)}/100 ${i % 5 === 0 ? "有風險" : "可用"}`,
    summary: i % 5 === 0 ? "先保守觀察，不要一次押太重。" : "可以小步推進，但需要設定驗證點。",
    threePalaceSnapshot: {
      selfPalace: palaceAt(i + 2),
      matterPalace: palaceAt(i + 4),
      resultPalace: palace
    },
    scoreBreakdown: {
      ruleTrace: [`${qtype}示範規則`, symbols[i % symbols.length], "風險降級測試"]
    },
    userFeedback: fb,
    feedback: fb,
    report: "示範報告：本資料只用於測試案例庫與匯出流程。"
  };
}

function compareCase(i) {
  const qtype = qtypes[i % qtypes.length];
  const a = palaceAt(i);
  const b = palaceAt(i + 3);
  const c = palaceAt(i + 5);
  const winner = ["A", "B", "C"][i % 3];
  const chosen = i % 4 === 0 ? "A" : winner;
  const hit = i % 5 === 0 ? "mixed" : (i % 7 === 0 ? "none" : winner);
  const fb = feedbackFor(i, i % 5 !== 0);
  fb.compareChosen = chosen;
  fb.compareHit = hit;
  fb.compareNote = "示範比較題回驗，用來測試推薦採用與推薦應驗統計。";
  return {
    id: `synthetic-case-${String(i + 1).padStart(3, "0")}`,
    savedAt: iso((i % 28) + 1, 10 + (i % 8)),
    updatedAt: iso((i % 28) + 1, 11 + (i % 7)),
    dataSource: "synthetic",
    synthetic: true,
    reportVersion: "soul-report.v5",
    ruleVersion: { app: "5.0", rule: "V4.3｜用途待確認" },
    qtypeApplied: true,
    title: `示範資料 ${String(i + 1).padStart(3, "0")}｜比較題`,
    outcome: fb.outcome || "",
    userOutcome: fb.outcome || "",
    afterAction: fb.afterAction || "",
    compareChosen: fb.compareChosen,
    compareHit: fb.compareHit,
    compareNote: fb.compareNote,
    problemDiagnosis: {
      suggestedQtype: qtype,
      decisionIntent: "多選項比較",
      cautions: ["示範資料，不作真實規則結論"]
    },
    qtype,
    question: `示範問題 ${i + 1}：A、B、C 三個方案哪個比較適合？`,
    selectedNum: null,
    lockedPalace: `A 方案A:${a.key}${a.number}｜B 方案B:${b.key}${b.number}｜C 方案C:${c.key}${c.number}`,
    selfPalace: `A ${a.key}｜B ${b.key}｜C ${c.key}`,
    matterPalace: `A ${palaceAt(i + 1).key}｜B ${palaceAt(i + 4).key}｜C ${palaceAt(i + 6).key}`,
    result: `推薦 ${winner}｜方案${winner}`,
    summary: `示範比較結論：方案 ${winner} 較適合先做小規模驗證。`,
    threePalaceSnapshot: {
      A: { selfPalace: a, matterPalace: palaceAt(i + 1) },
      B: { selfPalace: b, matterPalace: palaceAt(i + 4) },
      C: { selfPalace: c, matterPalace: palaceAt(i + 6) }
    },
    scoreBreakdown: {
      A: { ruleTrace: ["方案A示範評分", symbols[i % symbols.length]] },
      B: { ruleTrace: ["方案B示範評分", symbols[(i + 2) % symbols.length]] },
      C: { ruleTrace: ["方案C示範評分", symbols[(i + 4) % symbols.length]] }
    },
    decisionOptions: [
      { side: "A", name: "方案A", num: a.number, palace: `${a.key}${a.number}`, score: 50 + (i % 30) },
      { side: "B", name: "方案B", num: b.number, palace: `${b.key}${b.number}`, score: 55 + (i % 25) },
      { side: "C", name: "方案C", num: c.number, palace: `${c.key}${c.number}`, score: 45 + (i % 35) }
    ],
    compare: {
      winner,
      ranking: [winner, ...["A", "B", "C"].filter(x => x !== winner)]
    },
    userFeedback: fb,
    feedback: fb,
    report: "示範比較報告：本資料只用於測試多選項比較與回驗統計。"
  };
}

const cases = Array.from({ length: 100 }, (_, i) => i % 4 === 3 ? compareCase(i) : singleCase(i));

const payload = {
  version: "5.0",
  dataset: "qimen-v5-100-synthetic-cases",
  generatedAt: "2026-07-08T00:00:00.000Z",
  dataSource: "synthetic",
  notice: "這 100 筆是示範/模擬資料，只能測試 App 流程、篩選、CSV 與校準摘要，不可當成真實案例或規則校準結論。",
  cases
};

fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, `${JSON.stringify(payload, null, 2)}\n`, "utf8");
console.log(`Wrote ${cases.length} synthetic cases to ${path.relative(root, outPath)}`);
