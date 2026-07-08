# Engine Notes

核心檔案：

- `index.html`: 畫面骨架。
- `style.css`: 介面樣式。
- `engine.js`: 規則版本、規則檔索引、案例庫儲存鍵。
- `app.js`: 排盤、鎖單宮、報告、案例庫、匯入匯出。
- `rules/*.json`: 規則版本與可維護資料。

主要函式：

- `solarToLunar(y,m,d)`: 西曆轉農曆。
- `yearGZ`, `monthInfo`, `dayIndex`, `hourGZ`: 四柱換算。
- `yinpanJu(meta)`: 陰盤九宮起局。
- `buildGround(ju,dun)`: 地盤干。
- `buildChart()`: 生成完整盤面。
- `scorePalace(p,qtype)`: 鎖單宮吉凶判斷；鎖宮轉換維持在底層，不在使用者介面說明。
- `makeSummary(p,s)`: 行動與風水建議。
- `saveCurrentCase()`, `renderCases()`, `restoreChartPayload(payload)`: 案例庫與 JSON 回看。

目前已套用的九宮鎖單宮規則：

- 大凶直接否定：白虎、天蓬、天芮、死門、庚、空亡。
- 無大凶時才計分：吉神 +20、吉星 +20、吉門 +40、天盤吉干 +10、地盤吉干 +10。
- 60 分以上主吉，低於 60 分主凶或成功率不足。

八門排法提供三種模式：

1. `九宮鎖單宮校準`：依樣本盤校準的預設模式。
2. `星門同轉`：八門與九星同轉。
3. `傳統值使門`：用常見值使門步進法。

V4.3 已完成：

- 單檔頁面已拆成 HTML / CSS / engine.js / app.js。
- 規則資料已拆成 JSON：`rules/lock-palace.json`、`rules/scoring.json`、`rules/qtype-rules.json`、`rules/fengshui-rules.json`。
- 增加案例庫、盤面 JSON 匯入、案例 JSON 匯出、PWA manifest 與 service worker。
- 增加 `tests/run-tests.js` 靜態校驗。

後續待確認：

- 用途差異權重仍缺來源，`qtype-rules.json` 保持待確認且目前不套用。
- 若要與特定規則體系完全一致，需取得正式規則表與更多校準樣本。
- 若要更進一步商品化，可再把 `app.js` 裡的排盤函式、儲存函式與 UI 渲染函式細拆成 `engine-core.js`、`storage.js`、`ui.js`。
