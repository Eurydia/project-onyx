export default {
  "error-view": {
    "title": "Uh oh, that's not good...",
    "return-home": "Return to home page",
  },
  "checker-view": {
    "input-interpretation": {
      "title": "Input Interpretation",
      "interpretation-is-unsuccessful":
        "The checker cannot understand this expression.",
    },
    "verdict": {
      "title": "Verdict",
      "formula-is-tautology":
        "The formula {{eq}} is a tautology.",
      "formula-is-contradiction":
        "The formula {{eq}} is a contradiction.",
      "formula-is-satisfiable": `The formula {{eq}} is neither a tautology or a contradiction.`,
    },
    "user-manual": [],
  },
  "home-view": {
    "lang": {
      en: "ENGLISH",
      th: "THAI",
    },
    "card": {
      comparator: {
        title: "Comparator",
        desc: "Compare expressions to see which one of them are equivalent.",
      },
      evaluator: {
        title: "Evaluator",
        desc: "Evaluate expressions according to given truth values.",
      },
      rewriter: {
        title: "Rewriter",
        desc: "Transform an expression into a different basis.",
      },
      checker: {
        title: "Tautology checker",
        desc: "Check if an expression is always true, always false, or in-between.",
      },
    },
    "boolean-algebra-interpreter":
      "Boolean algebra interpreter",
  },
  "comparator-view": {
    "banner": "Comparator",
    "warning-notice": "Notice",
    "cards": {
      "output": {
        "title": "Result",
        "formulas-are-equivalent":
          "The formula {{first}} and the formula {{second}} are equivalent.",
        "formulas-are-not-equivalent":
          "The formula {{first}} and the formula {{second}} are not equivalent.",
        "warnings": {
          "not-enough-formula-for-comparison":
            "There is not enough valid formulas to perform comparisons.",
        },
      },
      "input-interpretation": {
        title: "Input Interpretation",
      },
    },
  },
};
