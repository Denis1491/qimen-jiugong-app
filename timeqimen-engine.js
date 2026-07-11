(function (root, factory) {
  const api = factory();
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  if (root) root.TimeQimen = api;
})(typeof window !== "undefined" ? window : globalThis, function () {
  "use strict";

  const VERSION = "shijia-zhirun-zhuanpan.v2";
  const TIME_ZONE = "Asia/Taipei";
  const STEMS = "甲乙丙丁戊己庚辛壬癸".split("");
  const BRANCHES = "子丑寅卯辰巳午未申酉戌亥".split("");
  const JIAZI = Array.from({ length: 60 }, (_, index) => STEMS[index % 10] + BRANCHES[index % 12]);
  const EARTH_STEMS = ["戊", "己", "庚", "辛", "壬", "癸", "丁", "丙", "乙"];
  const HIDDEN_JIA = ["戊", "己", "庚", "辛", "壬", "癸"];
  const KONG_WANG = ["戌亥", "申酉", "午未", "辰巳", "寅卯", "子丑"];
  const PALACE_NAMES = { 1: "坎", 2: "坤", 3: "震", 4: "巽", 5: "中", 6: "乾", 7: "兌", 8: "艮", 9: "離" };
  const DISPLAY_ORDER = [4, 9, 2, 3, 5, 7, 8, 1, 6];
  const TURN_RING = [2, 7, 6, 1, 8, 3, 4, 9];
  const STAR_RING = ["天芮", "天柱", "天心", "天蓬", "天任", "天沖", "天輔", "天英"];
  const STAR_ORIGIN = { 1: "天蓬", 2: "天芮", 3: "天沖", 4: "天輔", 5: "天禽", 6: "天心", 7: "天柱", 8: "天任", 9: "天英" };
  const STAR_ORIGIN_PALACE = Object.fromEntries(Object.entries(STAR_ORIGIN).map(([palace, star]) => [star, Number(palace)]));
  const DOOR_RING = ["死門", "驚門", "開門", "休門", "生門", "傷門", "杜門", "景門"];
  const DOOR_ORIGIN = { 1: "休門", 2: "死門", 3: "傷門", 4: "杜門", 6: "開門", 7: "驚門", 8: "生門", 9: "景門" };
  const GODS = ["值符", "螣蛇", "太陰", "六合", "白虎", "玄武", "九地", "九天"];
  const BRANCH_TO_PALACE = { 子: 1, 丑: 8, 寅: 8, 卯: 3, 辰: 4, 巳: 4, 午: 9, 未: 2, 申: 2, 酉: 7, 戌: 6, 亥: 6 };
  const HORSE_BRANCH = { 申: "寅", 子: "寅", 辰: "寅", 寅: "申", 午: "申", 戌: "申", 亥: "巳", 卯: "巳", 未: "巳", 巳: "亥", 酉: "亥", 丑: "亥" };
  const PALACE_ELEMENT = { 1: "水", 2: "土", 3: "木", 4: "木", 5: "土", 6: "金", 7: "金", 8: "土", 9: "火" };
  const DOOR_ELEMENT = { 休門: "水", 生門: "土", 傷門: "木", 杜門: "木", 景門: "火", 死門: "土", 驚門: "金", 開門: "金" };
  const ELEMENT_OVERCOMES = { 木: "土", 土: "水", 水: "火", 火: "金", 金: "木" };
  const STEM_TOMB = { 甲: 2, 乙: 6, 丙: 6, 丁: 8, 戊: 6, 己: 8, 庚: 8, 辛: 4, 壬: 4, 癸: 2 };
  const STEM_PUNISH = { 戊: 3, 己: 2, 庚: 8, 辛: 9, 壬: 4, 癸: 4 };
  const MONTH_START_STEM = { 甲: "丙", 己: "丙", 乙: "戊", 庚: "戊", 丙: "庚", 辛: "庚", 丁: "壬", 壬: "壬", 戊: "甲", 癸: "甲" };
  const HOUR_START_STEM = { 甲: "甲", 己: "甲", 乙: "丙", 庚: "丙", 丙: "戊", 辛: "戊", 丁: "庚", 壬: "庚", 戊: "壬", 癸: "壬" };

  /*
   * The compact VSOP87 longitude series and solver below are adapted from
   * ShouXingUtil in lunar-javascript:
   * https://github.com/6tail/lunar-javascript
   *
   * MIT License, Copyright (c) 2018 6tail. Permission is hereby granted,
   * free of charge, to any person obtaining a copy of this software and
   * associated documentation files (the "Software"), to deal in the Software
   * without restriction, including without limitation the rights to use,
   * copy, modify, merge, publish, distribute, sublicense, and/or sell copies,
   * subject to inclusion of this notice. THE SOFTWARE IS PROVIDED "AS IS",
   * WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED.
   *
   * Terms are solved from apparent geocentric solar longitude (VSOP87 Earth
   * longitude + nutation + aberration), converted from TT to UTC with Delta-T,
   * then represented as UTC+8 civil milliseconds. The public API has minute
   * precision, so the final instant is rounded to the nearest minute.
   */
  const DAY_MS = 86400000;
  const MINUTE_MS = 60000;
  const J2000_JD = 2451545;
  const UNIX_EPOCH_JD = 2440587.5;
  const ARCSECONDS_PER_RADIAN = 648000 / Math.PI;
  const EARTH_LONGITUDE_SERIES = [
    [
      17534704567, 0, 0, 334165646, 4.669256804, 6283.075849991, 3489428, 4.6261024, 12566.1517,
      349706, 2.744118, 5753.384885, 341757, 2.828866, 3.523118, 313590, 3.62767, 77713.771468,
      267622, 4.418084, 7860.419392, 234269, 6.135162, 3930.209696, 132429, 0.742464, 11506.76977,
      127317, 2.037097, 529.690965, 119917, 1.109629, 1577.343542, 99025, 5.23268, 5884.92685,
      90186, 2.04505, 26.29832, 85722, 3.50849, 398.149, 77979, 1.17883, 5223.69392,
      75314, 2.53339, 5507.55324, 50526, 4.58293, 18849.22755, 49238, 4.20507, 775.52261,
      35666, 2.91954, 0.06731, 31709, 5.84902, 11790.62909, 28413, 1.89869, 796.29801,
      27104, 0.31489, 10977.0788, 24281, 0.34481, 5486.77784, 20616, 4.80647, 2544.31442,
      20539, 1.86948, 5573.1428, 20226, 2.45768, 6069.77675, 15552, 0.83306, 213.2991,
      13221, 3.41118, 2942.46342, 12618, 1.08303, 20.7754, 11513, 0.64545, 0.98032,
      10285, 0.636, 4694.00295, 10190, 0.97569, 15720.83878, 10172, 4.2668, 7.11355,
      9921, 6.2099, 2146.1654, 9761, 0.681, 155.4204, 8580, 5.9832, 161000.6857,
      8513, 1.2987, 6275.9623, 8471, 3.6708, 71430.6956, 7964, 1.8079, 17260.1547,
      7876, 3.037, 12036.4607, 7465, 1.7551, 5088.6288, 7387, 3.5032, 3154.6871,
      7355, 4.6793, 801.8209, 6963, 0.833, 9437.7629, 6245, 3.9776, 8827.3903,
      6115, 1.8184, 7084.8968, 5696, 2.7843, 6286.599, 5612, 4.3869, 14143.4952,
      5558, 3.4701, 6279.5527, 5199, 0.1891, 12139.5535, 5161, 1.3328, 1748.0164,
      5115, 0.2831, 5856.4777, 4900, 0.4874, 1194.447, 4104, 5.3682, 8429.2413,
      4094, 2.3985, 19651.0485, 3920, 6.1683, 10447.3878, 3677, 6.0413, 10213.2855,
      3660, 2.5696, 1059.3819, 3595, 1.7088, 2352.8662, 3557, 1.776, 6812.7668
    ],
    [
      62833196674749, 0, 0, 20605886, 2.67823456, 6283.07584999, 430343, 2.635127, 12566.1517,
      42526, 1.59047, 3.52312, 11926, 5.79557, 26.29832, 10898, 2.96618, 1577.34354,
      9348, 2.5921, 18849.2275, 7212, 1.1385, 529.691, 6777, 1.8747, 398.149,
      6733, 4.4092, 5507.5532, 5903, 2.888, 5223.6939, 5598, 2.1747, 155.4204,
      4541, 0.398, 796.298, 3637, 0.4662, 775.5226, 2896, 2.6471, 7.1135,
      2084, 5.3414, 0.9803, 1910, 1.8463, 5486.7778, 1851, 4.9686, 213.2991,
      1729, 2.9912, 6275.9623, 1623, 0.0322, 2544.3144, 1583, 1.4305, 2146.1654,
      1462, 1.2053, 10977.0788, 1246, 2.8343, 1748.0164, 1188, 3.258, 5088.6288,
      1181, 5.2738, 1194.447, 1151, 2.075, 4694.003, 1064, 0.7661, 553.5694,
      997, 1.303, 6286.599, 972, 4.239, 1349.867, 945, 2.7, 242.729,
      858, 5.645, 951.718, 758, 5.301, 2352.866, 639, 2.65, 9437.763,
      610, 4.666, 4690.48, 583, 1.766, 1059.382, 531, 0.909, 3154.687,
      522, 5.661, 71430.696, 520, 1.854, 801.821
    ],
    [
      5291887, 0, 0, 871984, 1.072097, 6283.07585, 30913, 0.86729, 12566.1517,
      2734, 0.053, 3.5231, 1633, 5.1883, 26.2983, 1575, 3.6846, 155.4204,
      954, 0.757, 18849.228, 894, 2.057, 77713.771, 695, 0.827, 775.523,
      506, 4.663, 1577.344, 406, 1.031, 7.114, 381, 3.441, 5573.143,
      346, 5.141, 796.298, 317, 6.053, 5507.553, 302, 1.192, 242.729,
      289, 6.117, 529.691, 271, 0.306, 398.149, 254, 2.28, 553.569,
      237, 4.381, 5223.694, 208, 3.754, 0.98, 168, 0.902, 951.718
    ],
    [28923, 5.84384, 6283.07585, 3496, 0, 0, 1682, 5.4877, 12566.1517, 296, 5.196, 155.42],
    [11408, 3.14159, 0, 772, 4.134, 6283.076, 77, 3.84, 12566.15],
    [88, 3.14, 0, 17, 2.77, 6283.08, 5, 2.01, 155.42]
  ];
  const NUTATION_LONGITUDE_TERMS = [
    [2.1824, -33.75705, 0.000036, -1720],
    [3.5069, 1256.66393, 0.000011, -132],
    [1.3375, 16799.4182, -0.000051, -23],
    [4.3649, -67.5141, 0.000072, 21],
    [0.04, -628.302, 0, -14],
    [2.36, 8328.691, 0, 7],
    [3.46, 1884.966, 0, -5],
    [5.44, 16833.175, 0, -4],
    [3.69, 25128.11, 0, -3],
    [3.55, 628.362, 0, 2]
  ];
  const DELTA_T_TABLE = [
    [1880, -5.4, 0.32, -0.183, 0.0173],
    [1900, -2.3, 2.06, 0.169, -0.0135],
    [1920, 21.2, 1.69, -0.304, 0.0167],
    [1940, 24.2, 1.22, -0.064, 0.0031],
    [1960, 33.2, 0.51, 0.231, -0.0109],
    [1980, 51, 1.29, -0.026, 0.0032],
    [2000, 63.87, 0.1, 0, 0],
    [2005, 64.7, 0.21, 0, 0],
    [2012, 66.8, 0.22, 0, 0],
    [2016, 68.1024, 0.5456, -0.0542, -0.001172],
    [2020, 69.3612, 0.0422, -0.0502, 0.006216],
    [2024, 69.1752, -0.0335, -0.0048, 0.000811],
    [2028, 69.0206, -0.0275, 0.0055, -0.000014],
    [2032, 68.9981, 0.0163, 0.0054, 0.000006],
    [2036, 69.1498, 0.0599, 0.0053, 0.000026],
    [2040, 69.4751, 0.1035, 0.0051, 0.000046],
    [2044, 69.9737, 0.1469, 0.005, 0.000066],
    [2048, 70.6451, 0.1903, 0.0049, 0.000085],
    [2050, 71.0457, 0, 0, 0]
  ];
  const SOLAR_TERM_NAMES = [
    "小寒", "大寒", "立春", "雨水", "驚蟄", "春分", "清明", "穀雨",
    "立夏", "小滿", "芒種", "夏至", "小暑", "大暑", "立秋", "處暑",
    "白露", "秋分", "寒露", "霜降", "立冬", "小雪", "大雪", "冬至"
  ];
  const MONTH_JIE_INDEX = { 立春: 0, 驚蟄: 1, 清明: 2, 立夏: 3, 芒種: 4, 小暑: 5, 立秋: 6, 白露: 7, 寒露: 8, 立冬: 9, 大雪: 10, 小寒: 11 };
  const MONTH_BRANCHES = "寅卯辰巳午未申酉戌亥子丑".split("");
  const YANG_TERMS = new Set(["冬至", "小寒", "大寒", "立春", "雨水", "驚蟄", "春分", "清明", "穀雨", "立夏", "小滿", "芒種"]);
  const JU_TABLE = {
    冬至: [1, 7, 4], 小寒: [2, 8, 5], 大寒: [3, 9, 6], 立春: [8, 5, 2], 雨水: [9, 6, 3], 驚蟄: [1, 7, 4],
    春分: [3, 9, 6], 清明: [4, 1, 7], 穀雨: [5, 2, 8], 立夏: [4, 1, 7], 小滿: [5, 2, 8], 芒種: [6, 3, 9],
    夏至: [9, 3, 6], 小暑: [8, 2, 5], 大暑: [7, 1, 4], 立秋: [2, 5, 8], 處暑: [1, 4, 7], 白露: [9, 3, 6],
    秋分: [7, 1, 4], 寒露: [6, 9, 3], 霜降: [5, 8, 2], 立冬: [6, 9, 3], 小雪: [5, 8, 2], 大雪: [4, 7, 1]
  };
  const YUAN_NAMES = ["上", "中", "下"];

  function mod(value, divisor) {
    return ((value % divisor) + divisor) % divisor;
  }

  function pad(value) {
    return String(value).padStart(2, "0");
  }

  function jdn(year, month, day) {
    const a = Math.floor((14 - month) / 12);
    const y = year + 4800 - a;
    const m = month + 12 * a - 3;
    return day + Math.floor((153 * m + 2) / 5) + 365 * y + Math.floor(y / 4) - Math.floor(y / 100) + Math.floor(y / 400) - 32045;
  }

  function dateFromJdn(dayNumber) {
    let a = dayNumber + 32044;
    const b = Math.floor((4 * a + 3) / 146097);
    a -= Math.floor((146097 * b) / 4);
    const c = Math.floor((4 * a + 3) / 1461);
    a -= Math.floor((1461 * c) / 4);
    const d = Math.floor((5 * a + 2) / 153);
    const day = a - Math.floor((153 * d + 2) / 5) + 1;
    const month = d + 3 - 12 * Math.floor(d / 10);
    const year = 100 * b + c - 4800 + Math.floor(d / 10);
    return { y: year, m: month, d: day };
  }

  function localMs(parts) {
    return Date.UTC(parts.y, parts.m - 1, parts.d, parts.hh || 0, parts.mm || 0);
  }

  function earthLongitude(julianCenturies) {
    const t = julianCenturies / 10;
    let power = 1;
    let longitude = 0;
    for (const series of EARTH_LONGITUDE_SERIES) {
      let sum = 0;
      for (let index = 0; index < series.length; index += 3) {
        sum += series[index] * Math.cos(series[index + 1] + t * series[index + 2]);
      }
      longitude += sum * power;
      power *= t;
    }
    longitude /= 1e10;
    const t2 = t * t;
    longitude += (-0.0728 - 2.7702 * t - 1.1019 * t2 - 0.0996 * t2 * t) / ARCSECONDS_PER_RADIAN;
    return longitude;
  }

  function nutationLongitude(julianCenturies) {
    const t2 = julianCenturies * julianCenturies;
    let longitude = 0;
    NUTATION_LONGITUDE_TERMS.forEach((term, index) => {
      const amplitude = term[3] + (index === 0 ? -1.742 * julianCenturies : 0);
      longitude += amplitude * Math.sin(term[0] + term[1] * julianCenturies + term[2] * t2);
    });
    return longitude / 100 / ARCSECONDS_PER_RADIAN;
  }

  function solarAberration(julianCenturies) {
    const t2 = julianCenturies * julianCenturies;
    const anomaly = -0.043126 + 628.301955 * julianCenturies - 0.000002732 * t2;
    const eccentricity = 0.016708634 - 0.000042037 * julianCenturies - 0.0000001267 * t2;
    return -20.49552 * (1 + eccentricity * Math.cos(anomaly)) / ARCSECONDS_PER_RADIAN;
  }

  function apparentSolarLongitude(julianCenturies) {
    return earthLongitude(julianCenturies) + nutationLongitude(julianCenturies) + solarAberration(julianCenturies) + Math.PI;
  }

  function earthLongitudeSpeed(julianCenturies) {
    const anomaly = 628.307585 * julianCenturies;
    return 628.332
      + 21 * Math.sin(1.527 + anomaly)
      + 0.44 * Math.sin(1.48 + 2 * anomaly)
      + 0.129 * Math.sin(5.82 + anomaly) * julianCenturies
      + 0.00055 * Math.sin(4.21 + anomaly) * julianCenturies * julianCenturies;
  }

  function deltaTExtension(year) {
    const centuries = (year - 1820) / 100;
    return -20 + 31 * centuries * centuries;
  }

  function deltaTSeconds(year) {
    const last = DELTA_T_TABLE[DELTA_T_TABLE.length - 1];
    if (year >= last[0]) {
      const extensionAtLast = deltaTExtension(last[0]);
      return deltaTExtension(year) - (extensionAtLast - last[1]) * (last[0] + 100 - year) / 100;
    }
    for (let index = 0; index < DELTA_T_TABLE.length - 1; index += 1) {
      const row = DELTA_T_TABLE[index];
      const next = DELTA_T_TABLE[index + 1];
      if (year < next[0]) {
        const t = (year - row[0]) / (next[0] - row[0]) * 10;
        return row[1] + row[2] * t + row[3] * t * t + row[4] * t * t * t;
      }
    }
    return last[1];
  }

  function solveSolarLongitude(targetLongitude) {
    let speed = 628.3319653318;
    let julianCenturies = (targetLongitude - 1.75347 - Math.PI) / speed;
    for (let iteration = 0; iteration < 3; iteration += 1) {
      speed = earthLongitudeSpeed(julianCenturies);
      julianCenturies += (targetLongitude - apparentSolarLongitude(julianCenturies)) / speed;
    }
    const terrestrialDays = julianCenturies * 36525;
    const year = terrestrialDays / 365.2425 + 2000;
    const taipeiCivilDays = terrestrialDays - deltaTSeconds(year) / 86400 + 1 / 3;
    return (J2000_JD + taipeiCivilDays - UNIX_EPOCH_JD) * DAY_MS;
  }

  function termForYear(year, index) {
    // 小寒 is 285 degrees; adding 15 degrees per index keeps the angle unwrapped
    // across the calendar year and makes the Newton solve stable.
    const targetDegrees = (year - 2000) * 360 + 285 + index * 15;
    const exactMs = solveSolarLongitude(targetDegrees * Math.PI / 180);
    const ms = Math.round(exactMs / MINUTE_MS) * MINUTE_MS;
    const date = new Date(ms);
    return {
      name: SOLAR_TERM_NAMES[index],
      year,
      index,
      localMs: ms,
      y: date.getUTCFullYear(),
      m: date.getUTCMonth() + 1,
      d: date.getUTCDate(),
      hh: date.getUTCHours(),
      mm: date.getUTCMinutes()
    };
  }

  const termCache = new Map();
  function solarTerms(fromYear, toYear) {
    const key = `${fromYear}:${toYear}`;
    if (termCache.has(key)) return termCache.get(key);
    const terms = [];
    for (let year = fromYear; year <= toYear; year += 1) {
      SOLAR_TERM_NAMES.forEach((_, index) => terms.push(termForYear(year, index)));
    }
    terms.sort((a, b) => a.localMs - b.localMs);
    terms.forEach((term, index) => { term.sequenceIndex = index; });
    termCache.set(key, terms);
    return terms;
  }

  function findTerm(terms, year, name) {
    return terms.find(term => term.year === year && term.name === name);
  }

  function closestTermState(parts) {
    const terms = solarTerms(parts.y - 2, parts.y + 2);
    const at = localMs(parts);
    let previous = terms[0];
    let next = terms[terms.length - 1];
    for (const term of terms) {
      if (term.localMs <= at) previous = term;
      if (term.localMs > at) { next = term; break; }
    }
    return { terms, previous, next };
  }

  function dayGanzhiIndex(parts) {
    // The selected MVP convention changes day at civil midnight, not at 23:00.
    return mod(jdn(parts.y, parts.m, parts.d) + 49, 60);
  }

  function fourPillars(parts) {
    const at = localMs(parts);
    const terms = solarTerms(parts.y - 1, parts.y + 1);
    const liChun = findTerm(terms, parts.y, "立春");
    const pillarYear = at < liChun.localMs ? parts.y - 1 : parts.y;
    const yearGZ = JIAZI[mod(pillarYear - 4, 60)];

    const monthJie = terms.filter(term => Object.hasOwn(MONTH_JIE_INDEX, term.name) && term.localMs <= at).at(-1);
    const monthIndex = MONTH_JIE_INDEX[monthJie.name];
    const startStem = MONTH_START_STEM[yearGZ[0]];
    const monthStem = STEMS[mod(STEMS.indexOf(startStem) + monthIndex, 10)];
    const monthGZ = monthStem + MONTH_BRANCHES[monthIndex];

    const dayIndex = dayGanzhiIndex(parts);
    const dayGZ = JIAZI[dayIndex];
    let hourBranchIndex = Math.floor(((parts.hh || 0) + 1) / 2) % 12;
    if ((parts.hh || 0) === 23) hourBranchIndex = 0;
    const hourStartStem = HOUR_START_STEM[dayGZ[0]];
    const hourStem = STEMS[mod(STEMS.indexOf(hourStartStem) + hourBranchIndex, 10)];
    const hourGZ = hourStem + BRANCHES[hourBranchIndex];
    return { yearGZ, monthGZ, dayGZ, hourGZ, dayIndex };
  }

  function previousUpperFuHead(dayIndex, dayNumber) {
    const offset = mod(dayIndex, 15);
    return { jdn: dayNumber - offset, offset };
  }

  function qimenCycle(parts, dayIndex) {
    const targetDay = jdn(parts.y, parts.m, parts.d);
    const targetFuHead = previousUpperFuHead(dayIndex, targetDay).jdn;
    const terms = solarTerms(1898, 2053);
    // 1899-12-07 is both an upper-yuan fu-head and the civil date of 大雪.
    // Starting before the supported range lets every 1900-2050 chart advance in
    // one direction and preserves whether each 15-day block was truly repeated.
    const anchorFuHead = jdn(1899, 12, 7);
    let currentFuHead = anchorFuHead;
    let currentTerm = findTerm(terms, 1899, "大雪");
    let currentIsRepeated = false;
    const stepCount = Math.round((targetFuHead - anchorFuHead) / 15);

    if (stepCount < 0) throw new Error("置閏循環超出支援範圍");
    for (let step = 0; step < stepCount; step += 1) {
      const nextFuHead = currentFuHead + 15;
      const candidate = terms[currentTerm.sequenceIndex + 1];
      const nextFuHeadDate = dateFromJdn(nextFuHead);
      const leadMs = candidate.localMs - localMs({ ...nextFuHeadDate, hh: 0, mm: 0 });
      currentIsRepeated = (candidate.name === "夏至" || candidate.name === "冬至") && leadMs > 9 * DAY_MS;
      if (!currentIsRepeated) currentTerm = candidate;
      currentFuHead = nextFuHead;
    }

    const cycleDay = targetDay - targetFuHead;
    const yuanIndex = Math.min(2, Math.floor(cycleDay / 5));
    const yuanDay = mod(cycleDay, 5) + 1;
    const termDay = jdn(currentTerm.y, currentTerm.m, currentTerm.d);
    const isRepeated = currentIsRepeated;
    const status = isRepeated ? "置閏" : targetFuHead < termDay ? "超神" : targetFuHead > termDay ? "接氣" : "正授";
    const dun = YANG_TERMS.has(currentTerm.name) ? "陽" : "陰";
    const juNumber = JU_TABLE[currentTerm.name][yuanIndex];
    const fuHeadDate = dateFromJdn(targetFuHead);
    return {
      effectiveTerm: currentTerm,
      status,
      isZhiRun: isRepeated,
      dun,
      juNumber,
      yuan: YUAN_NAMES[yuanIndex],
      yuanIndex,
      yuanDay,
      fuHeadDate,
      label: `${currentTerm.name}（${status}）${YUAN_NAMES[yuanIndex]}元第${yuanDay}天`
    };
  }

  function earthPlate(juNumber, dun) {
    const plate = {};
    EARTH_STEMS.forEach((stem, index) => {
      const palace = dun === "陽" ? mod(juNumber - 1 + index, 9) + 1 : mod(juNumber - 1 - index, 9) + 1;
      plate[palace] = stem;
    });
    return plate;
  }

  function palaceOfStem(plate, stem) {
    return Number(Object.keys(plate).find(palace => plate[palace] === stem));
  }

  function ringPlace(targetPalace, sourceIndex, offset) {
    const targetIndex = TURN_RING.indexOf(targetPalace === 5 ? 2 : targetPalace);
    return TURN_RING[mod(targetIndex + offset - sourceIndex, 8)];
  }

  function placeStars(plate, valueStar, targetPalace) {
    const stars = {};
    const heaven = {};
    const effectiveValueStar = valueStar === "天禽" ? "天芮" : valueStar;
    const sourceIndex = STAR_RING.indexOf(effectiveValueStar);
    STAR_RING.forEach((star, index) => {
      const palace = ringPlace(targetPalace, sourceIndex, index);
      const origin = STAR_ORIGIN_PALACE[star];
      stars[palace] = star === "天芮" ? ["天芮", "天禽"] : [star];
      heaven[palace] = star === "天芮" ? [plate[2], plate[5]] : [plate[origin]];
    });
    return { stars, heaven };
  }

  function valueDoorTarget(valueOriginPalace, hourGZ, xunIndex, dun) {
    const xunBranchIndex = BRANCHES.indexOf(JIAZI[xunIndex * 10][1]);
    const hourBranchIndex = BRANCHES.indexOf(hourGZ[1]);
    const steps = mod(hourBranchIndex - xunBranchIndex, 12);
    let palace = valueOriginPalace;
    for (let index = 0; index < steps; index += 1) {
      palace = dun === "陽" ? (palace === 9 ? 1 : palace + 1) : (palace === 1 ? 9 : palace - 1);
    }
    return palace === 5 ? 2 : palace;
  }

  function placeDoors(valueDoor, targetPalace) {
    const doors = {};
    const sourceIndex = DOOR_RING.indexOf(valueDoor);
    const targetIndex = TURN_RING.indexOf(targetPalace);
    DOOR_RING.forEach((door, index) => {
      doors[TURN_RING[mod(targetIndex + index - sourceIndex, 8)]] = door;
    });
    return doors;
  }

  function placeGods(targetPalace, dun) {
    const gods = {};
    const ring = dun === "陽" ? TURN_RING : [2, 9, 4, 3, 8, 1, 6, 7];
    const startIndex = ring.indexOf(targetPalace);
    GODS.forEach((god, index) => { gods[ring[mod(startIndex + index, 8)]] = god; });
    return gods;
  }

  function palaceFlags(palace, top, door, kongBranches, horsePalace) {
    const flags = [];
    if (kongBranches.some(branch => BRANCH_TO_PALACE[branch] === palace)) flags.push("空");
    if (horsePalace === palace) flags.push("馬");
    if (top.some(stem => STEM_TOMB[stem] === palace)) flags.push("墓");
    if (top.some(stem => STEM_PUNISH[stem] === palace)) flags.push("刑");
    if (door) {
      const doorElement = DOOR_ELEMENT[door];
      const palaceElement = PALACE_ELEMENT[palace];
      if (ELEMENT_OVERCOMES[doorElement] === palaceElement) flags.push("迫");
      else if (ELEMENT_OVERCOMES[palaceElement] === doorElement) flags.push("制");
    }
    return [...new Set(flags)];
  }

  function generate(input) {
    const parts = { y: Number(input.y), m: Number(input.m), d: Number(input.d), hh: Number(input.hh || 0), mm: Number(input.mm || 0) };
    if (!Number.isInteger(parts.y) || parts.y < 1900 || parts.y > 2050) throw new Error("時家奇門目前支援 1900–2050 年。");
    const pillars = fourPillars(parts);
    const cycle = qimenCycle(parts, pillars.dayIndex);
    const actualTerms = closestTermState(parts);
    const plate = earthPlate(cycle.juNumber, cycle.dun);
    const hourIndex = JIAZI.indexOf(pillars.hourGZ);
    const xunIndex = Math.floor(hourIndex / 10);
    const hiddenStem = HIDDEN_JIA[xunIndex];
    const valueOriginRaw = palaceOfStem(plate, hiddenStem);
    const valueStar = STAR_ORIGIN[valueOriginRaw];
    const valueDoor = DOOR_ORIGIN[valueOriginRaw === 5 ? 2 : valueOriginRaw];
    const actualHourStem = pillars.hourGZ[0] === "甲" ? hiddenStem : pillars.hourGZ[0];
    const valueTargetRaw = palaceOfStem(plate, actualHourStem);
    const valueTarget = valueTargetRaw === 5 ? 2 : valueTargetRaw;
    const starPlate = placeStars(plate, valueStar, valueTarget);
    const doorTarget = valueDoorTarget(valueOriginRaw, pillars.hourGZ, xunIndex, cycle.dun);
    const doors = placeDoors(valueDoor, doorTarget);
    const gods = placeGods(valueTarget, cycle.dun);
    const kongBranches = KONG_WANG[xunIndex].split("");
    const horseBranch = HORSE_BRANCH[pillars.hourGZ[1]];
    const horsePalace = BRANCH_TO_PALACE[horseBranch];
    const tianruiPalace = Number(Object.keys(starPlate.stars).find(palace => starPlate.stars[palace].includes("天芮")));

    const palaces = DISPLAY_ORDER.map(number => {
      if (number === 5) {
        return {
          key: "中",
          number: 5,
          isCenter: true,
          god: "",
          star: "",
          stars: [],
          door: "",
          top: [],
          bottom: [plate[5]],
          bottomMeta: [{ name: plate[5], role: "lodged", originPalace: 5, lodgedAt: 2 }],
          flags: ["寄坤"],
          sourcePalace: 5
        };
      }
      const stars = starPlate.stars[number] || [];
      const top = starPlate.heaven[number] || [];
      const door = doors[number] || "";
      // 轉盤以八宮承載九干；中五地盤干作為獨立符號寄入坤二。
      // 保留陣列與來源資料，讓顯示、查詢與直接否決計分都能看見寄干。
      const bottom = number === 2 ? [plate[2], plate[5]] : [plate[number]];
      const bottomMeta = bottom.map((stem, index) => ({
        name: stem,
        role: number === 2 && index === 1 ? "lodged" : "primary",
        originPalace: number === 2 && index === 1 ? 5 : number,
        lodgedAt: number === 2 && index === 1 ? 2 : null
      }));
      return {
        key: PALACE_NAMES[number],
        number,
        isCenter: false,
        god: gods[number] || "",
        star: stars[0] || "",
        stars,
        door,
        top,
        bottom,
        bottomMeta,
        flags: palaceFlags(number, top, door, kongBranches, horsePalace),
        sourcePalace: number
      };
    });

    return {
      engineVersion: VERSION,
      method: {
        system: "陽盤時家奇門",
        juMethod: "超接置閏（九日門檻）",
        plateMethod: "轉盤",
        timeZone: TIME_ZONE,
        dayBoundary: "子正換日（00:00）",
        centerPolicy: "天禽與中宮干寄坤，隨天芮轉",
        godNames: "值符、螣蛇、太陰、六合、白虎、玄武、九地、九天"
      },
      input: parts,
      pillars,
      cycle,
      actualSolarTerm: actualTerms.previous,
      nextSolarTerm: actualTerms.next,
      xun: {
        start: JIAZI[xunIndex * 10],
        hiddenStem,
        kongWang: KONG_WANG[xunIndex],
        horseBranch
      },
      values: {
        zhiFuStar: valueStar,
        zhiFuPalace: valueTarget,
        zhiShiDoor: valueDoor,
        zhiShiPalace: doorTarget,
        originPalace: valueOriginRaw,
        tianruiPalace
      },
      earthPlate: plate,
      palaces,
      formatted: {
        solar: `${parts.y}-${pad(parts.m)}-${pad(parts.d)} ${pad(parts.hh)}:${pad(parts.mm)}`,
        fourPillars: `${pillars.yearGZ}　${pillars.monthGZ}　${pillars.dayGZ}　${pillars.hourGZ}`,
        ju: `${cycle.dun}遁${"一二三四五六七八九"[cycle.juNumber - 1]}局`,
        cycle: cycle.label,
        fuHead: `${cycle.fuHeadDate.y}-${pad(cycle.fuHeadDate.m)}-${pad(cycle.fuHeadDate.d)}`
      }
    };
  }

  return {
    VERSION,
    TIME_ZONE,
    generate,
    dayGanzhiIndex,
    fourPillars,
    qimenCycle,
    solarTerms,
    constants: { JIAZI, JU_TABLE, DISPLAY_ORDER, TURN_RING }
  };
});
