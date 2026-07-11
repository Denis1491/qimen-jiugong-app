const assert = require("assert");
const qimen = require("../timeqimen-engine.js");

const chart = input => qimen.generate(input);
const palace = (result, number) => result.palaces.find(item => item.number === number);

// 香港天文台 2026 年二十四節氣（UTC+8，公布至分鐘）。
// https://www.hko.gov.hk/tc/gts/astronomy/data/files/24SolarTerms_2026.xml
const hko2026 = [
  ["小寒", 1, 5, 16, 23], ["大寒", 1, 20, 9, 45],
  ["立春", 2, 4, 4, 2], ["雨水", 2, 18, 23, 52],
  ["驚蟄", 3, 5, 21, 59], ["春分", 3, 20, 22, 46],
  ["清明", 4, 5, 2, 40], ["穀雨", 4, 20, 9, 39],
  ["立夏", 5, 5, 19, 49], ["小滿", 5, 21, 8, 37],
  ["芒種", 6, 5, 23, 48], ["夏至", 6, 21, 16, 25],
  ["小暑", 7, 7, 9, 57], ["大暑", 7, 23, 3, 13],
  ["立秋", 8, 7, 19, 43], ["處暑", 8, 23, 10, 19],
  ["白露", 9, 7, 22, 41], ["秋分", 9, 23, 8, 5],
  ["寒露", 10, 8, 14, 29], ["霜降", 10, 23, 17, 38],
  ["立冬", 11, 7, 17, 52], ["小雪", 11, 22, 15, 23],
  ["大雪", 12, 7, 10, 53], ["冬至", 12, 22, 4, 50]
];
const calculatedTerms2026 = qimen.solarTerms(2026, 2026);
hko2026.forEach(([name, month, day, hour, minute], index) => {
  const term = calculatedTerms2026[index];
  const officialMinute = Date.UTC(2026, month - 1, day, hour, minute);
  assert.strictEqual(term.name, name);
  assert.ok(
    Math.abs(term.localMs - officialMinute) <= 60000,
    `${name} 與香港天文台資料誤差超過一分鐘`
  );
});

// 子奇老師書中操作示例時間；公開置閏轉盤工具可逐宮交叉核對。
const bookExample = chart({ y: 2020, m: 10, d: 7, hh: 14, mm: 23 });
assert.strictEqual(bookExample.formatted.fourPillars, "庚子　乙酉　癸未　己未");
assert.strictEqual(bookExample.formatted.cycle, "寒露（超神）上元第5天");
assert.strictEqual(bookExample.formatted.ju, "陰遁六局");
assert.deepStrictEqual(
  bookExample.palaces.map(item => [item.number, item.god, item.stars.join("、"), item.door, item.top.join("、"), item.bottom.join("、")]),
  [
    [4, "太陰", "天柱", "驚門", "乙", "庚"],
    [9, "螣蛇", "天心", "開門", "戊", "丁"],
    [2, "值符", "天蓬", "休門", "癸", "壬、己"],
    [3, "六合", "天芮、天禽", "死門", "壬、己", "辛"],
    [5, "", "", "", "", "己"],
    [7, "九天", "天任", "生門", "丙", "乙"],
    [8, "白虎", "天英", "景門", "丁", "丙"],
    [1, "玄武", "天輔", "杜門", "庚", "癸"],
    [6, "九地", "天沖", "傷門", "辛", "戊"]
  ]
);

// 兩個公開完整盤，驗證超神、接氣與置閏狀態沒有漂移。
const public2013 = chart({ y: 2013, m: 9, d: 7, hh: 12, mm: 58 });
assert.strictEqual(public2013.formatted.cycle, "處暑（接氣）下元第3天");
assert.strictEqual(public2013.formatted.ju, "陰遁七局");
assert.deepStrictEqual(public2013.values, {
  zhiFuStar: "天輔", zhiFuPalace: 4, zhiShiDoor: "杜門", zhiShiPalace: 4, originPalace: 4, tianruiPalace: 2
});

const public2009 = chart({ y: 2009, m: 1, d: 3, hh: 23, mm: 44 });
assert.strictEqual(public2009.formatted.cycle, "冬至（超神）下元第5天");
assert.strictEqual(public2009.formatted.ju, "陽遁四局");

// 置閏必須是相鄰兩個 15 日符頭區塊沿用同一節氣，不能只靠日期推測。
const ordinaryMangzhong = chart({ y: 2011, m: 6, d: 8, hh: 12, mm: 0 });
assert.strictEqual(ordinaryMangzhong.cycle.effectiveTerm.name, "芒種");
assert.strictEqual(ordinaryMangzhong.cycle.isZhiRun, false);
assert.strictEqual(ordinaryMangzhong.cycle.status, "接氣");

const firstMangzhongBlock = chart({ y: 2013, m: 5, d: 28, hh: 12, mm: 0 });
const repeatedMangzhongBlock = chart({ y: 2013, m: 6, d: 12, hh: 12, mm: 0 });
assert.strictEqual(firstMangzhongBlock.cycle.effectiveTerm.name, "芒種");
assert.strictEqual(firstMangzhongBlock.cycle.isZhiRun, false);
assert.strictEqual(repeatedMangzhongBlock.cycle.effectiveTerm.name, firstMangzhongBlock.cycle.effectiveTerm.name);
assert.strictEqual(repeatedMangzhongBlock.cycle.isZhiRun, true);
assert.strictEqual(repeatedMangzhongBlock.cycle.status, "置閏");

// 書中三個鎖宮案例。
const denyCase = chart({ y: 2019, m: 8, d: 12, hh: 1, mm: 42 });
const li9 = palace(denyCase, 9);
assert.strictEqual(li9.god, "白虎");
assert.ok(li9.stars.includes("天蓬"));
assert.strictEqual(li9.door, "死門");
assert.ok(li9.bottom.includes("庚"));
assert.ok(li9.flags.includes("空"));

const scoreCase = chart({ y: 2019, m: 8, d: 13, hh: 16, mm: 33 });
const kun2 = palace(scoreCase, 2);
assert.strictEqual(kun2.god, "值符");
assert.strictEqual(kun2.door, "生門");
assert.ok(kun2.bottom.includes("戊"));
const xun4 = palace(scoreCase, 4);
assert.strictEqual(xun4.god, "太陰");
assert.strictEqual(xun4.door, "開門");
assert.ok(xun4.top.concat(xun4.bottom).includes("丙"));
assert.ok(xun4.top.concat(xun4.bottom).includes("庚"));
const dui7 = palace(scoreCase, 7);
assert.strictEqual(dui7.god, "九天");
assert.ok(dui7.stars.includes("天心"));

const doorCase = chart({ y: 2020, m: 4, d: 18, hh: 14, mm: 0 });
assert.strictEqual(doorCase.pillars.dayGZ, "辛卯");
assert.strictEqual(doorCase.pillars.hourGZ, "乙未");
assert.strictEqual(palace(doorCase, 7).door, "生門");
assert.notStrictEqual(palace(doorCase, 7).god, "白虎");
assert.ok(!palace(doorCase, 7).flags.includes("空"));

// 中五地盤干必須以獨立符號寄入坤二，不能只留在不計分的中宮。
const lodgedStemCase = chart({ y: 2020, m: 1, d: 22, hh: 12, mm: 0 });
assert.deepStrictEqual(palace(lodgedStemCase, 2).bottom, ["乙", "庚"]);
assert.deepStrictEqual(
  palace(lodgedStemCase, 2).bottomMeta,
  [
    { name: "乙", role: "primary", originPalace: 2, lodgedAt: null },
    { name: "庚", role: "lodged", originPalace: 5, lodgedAt: 2 }
  ]
);

// Same input must be byte-for-byte deterministic.
assert.deepStrictEqual(
  chart({ y: 2020, m: 10, d: 7, hh: 14, mm: 23 }),
  chart({ y: 2020, m: 10, d: 7, hh: 14, mm: 23 })
);

console.log("Time-Qimen golden fixtures passed.");
