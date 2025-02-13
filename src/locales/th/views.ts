export default {
  "error-view": {
    "title": "เกิดข้อผิดพลาดขึ้น",
    "return-home": "กลับหน้าหลัก",
  },
  "evaluator-view": {
    cards: {
      "input-interpretation": {
        title: "ผลการอ่านประโยค",
      },
      "output": {
        "true": "เป็นจริง",
        "false": "เป็นเท็จ",
        "title": "ผลลัพท์",
        "formula-evaluates-to-value":
          "{{formula}} {{value}}",
        "infos": {
          "no-valid-formula-to-display":
            "ไม่มีประพจน์ที่เขียนถูกต้องให้แสดง",
        },
      },
      "step-by-step": {
        "true": "จริง",
        "false": "เท็จ",
        "title": "ลำดับขั้นตอนในการคำนวณ",
        "tab-item": "ประพจน์ ({{num}})",
        "no-evaluation-step-to-display":
          "ไม่มีลำดับการคำนวณให้แสดง",
        "therefore-formula-is-value":
          "ดังนั้น ประพจน์ {{formula}} เป็น{{value}}",
        "step-x-of-y":
          "ลำดับการคำนวณขั้นที่ {{current}} จาก {{total}}",
        "by-truth-table-formula-is-value": `อ้างจากตารางค่าความจริงของตัวเชื่อม {{operator}} สรุปได้ว่า {{formula}} เป็น{{value}}`,
        "consider-the-formula": "คำนวณประพจน์ {{formula}}",
        "given-variable-is-value":
          "จากที่กำหนดไว้ว่า {{variable}} เป็น{{value}} แทนที่ {{variable}} ด้วย{{value}}ลงในประพจน์ {{formula}}",
        "from-previous-step-substitute-into-formula":
          "จากลำดับการคำนวณขั้นที่ {{step}} ประพจน์ {{formula}} เป็น{{value}} แทนที่ {{current}} ลงในประพจน์จึงได้ {{result}}",
        "infos": {
          "no-valid-formula-to-display":
            "ไม่มีประพจน์ที่เขียนถูกต้องให้แสดง",
        },
      },
    },
  },
  "rewriter-view": {
    cards: {
      "input-interpretation": {
        title: "ผลการอ่านประโยค",
      },
      "output": {
        title: "ผลลัพท์การเปลี่ยนฐาน",
        text: {
          "formula-cannot-be-expressed-in-the-desired-basis":
            "ไม่สามารถเปลี่ยนประพจน์ {{formula}} ไปสู่ฐานที่ต้องการได้",
          "formula-is-expressed-as-in-the-desired-basis":
            "{{formula}} {{result}} ",
        },
        infos: {
          "no-valid-formula-to-display":
            "ไม่มีประพจน์ที่ถูกต้องให้แสดง",
          "truth-table-is-not-available":
            "ตารางค่าความจริงของประพจน์ที่ไม่พร้อมที่จะแสดง",
        },
      },
    },
  },
  "checker-view": {
    cards: {
      "input-interpretation": {
        title: "ผลการอ่านประโยค",
      },
      "output": {
        title: "ผลการตรวจสอบ",
        text: {
          "formula-is-value": "{{formula}} {{value}}",
          "contingent":
            "ค่าความจริงขึ้นอยู่กับ {{variables}}",
          "tautology": "เป็นสัจนิรันด์",
          "contradiction": "เป็นเท็จเสมอ",
        },
        infos: {
          "no-formula-to-display":
            "ไม่มีประพจน์ที่ถูกต้องให้แสดง",
        },
      },
    },
  },
  "home-view": {
    "lang": {
      en: "อังกฤษ",
      th: "ไทย",
    },
    "cards": {
      comparator: {
        desc: "เปรียบเทียบประพจน์เพื่อให้ว่าประพจน์ไหนบ้างที่สมมูลกัน",
      },
      evaluator: {
        desc: "คำนวณหาค่าความจริงของประพจน์ด้วยการแทนที่ค่าความจริงของนิพจน์ลงไปในประพจน์",
      },
      rewriter: {
        desc: "เปลี่ยนฐานประพจน์ไปสู่อีกฐานแต่รักษาค่าความจริงไว้",
      },
      checker: {
        desc: "ตรวจสอบว่าประพจน์เป็นสัจนิรันด์ เป็นเท็จเสมอ หรือไม่ใช่ทั้งสัจนิรันด์และไม่ใช่ทั้งเท็จเสมอ",
      },
    },
    "boolean-algebra-interpreter": "ตัวช่วยคำนวณตรรกศาสตร์",
  },
  "comparator-view": {
    cards: {
      "output": {
        title: "ผลลัพท์การเปรียบเทียบ",
        text: {
          "equivalent": "สมมูลกัน",
          "not-equivalent": "ไม่สมมูลกัน",
          "formulas-are-value":
            "{{first}} {{second}} {{value}}",
        },
        infos: {
          "not-enough-formula-for-comparison":
            "จำนวณประพจน์ไม่เพียงพอที่จะเปรียบเทียบ ต้องการอย่างน้อยสองประพจน์ที่ถูกต้องก่อนที่จะเริ่มเปรียบเทียบได้",
        },
      },
      "input-interpretation": {
        title: "ผลการอ่านประโยค",
      },
    },
  },
};
