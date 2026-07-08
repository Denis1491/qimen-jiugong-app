const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const read = file => fs.readFileSync(path.join(root, file), "utf8");
const json = file => JSON.parse(read(file));
const assert = (condition, message) => {
  if (!condition) throw new Error(message);
};

const html = read("index.html");
const engine = read("engine.js");
const app = read("app.js");
const copyBank = read("qimen_soul_copy_bank.js");
const manifest = json("manifest.webmanifest");
const lock = json("rules/lock-palace.json");
const scoring = json("rules/scoring.json");
const qtype = json("rules/qtype-rules.json");
const index = json("rules/rules.json");

assert(html.includes("style.css"), "index.html must load style.css");
assert(html.includes("engine.js"), "index.html must load engine.js");
assert(html.includes("app.js"), "index.html must load app.js");
assert(html.includes("qimen_soul_copy_bank.js"), "index.html must load the soul copy bank");
assert(html.includes("manifest.webmanifest"), "index.html must load the manifest");
assert(html.includes("caseList"), "case library UI is missing");
assert(html.includes("metricRules"), "rule version display is missing");
assert(!html.includes("5 改取 2"), "user-facing 5-to-2 wording should stay hidden");

assert(app.includes("CASE_STORAGE_KEY"), "case storage logic is missing");
assert(app.includes("importJsonFile"), "JSON import logic is missing");
assert(app.includes("registerServiceWorker"), "service worker registration is missing");
assert(app.includes("RULE_VERSION"), "rule version constant is missing");
assert(app.includes("generateSoulReport"), "copy-bank report generator is missing");
assert(copyBank.includes("window.QIMEN_COPY_BANK"), "copy bank must expose window.QIMEN_COPY_BANK");
assert(engine.includes("QIMEN_RULE_VERSION"), "engine.js must expose rule version");
assert(engine.includes("QIMEN_RULE_FILES"), "engine.js must expose rule file index");

assert(lock.version === "lock-palace.v4.3", "lock rule version mismatch");
assert(lock.mapping["5"] === 2, "lock mapping for 5 should remain internal 2");
assert(scoring.directDeny.door.includes("死門"), "direct deny door rule missing");
assert(scoring.score.door["開門"] === 40, "score rule for 開門 changed unexpectedly");
assert(qtype.status === "待確認", "qtype rules must remain marked pending confirmation");
assert(index.files.includes("scoring.json"), "rules index must include scoring.json");
assert(manifest.display === "standalone", "manifest display should be standalone");

console.log("V4.3 static checks passed.");
