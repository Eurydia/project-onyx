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
      "expression-is-tautology":
        "The expression {{eq}} is a tautology.",
      "expression-is-contradiction":
        "The expression {{eq}} is a contradiction.",
      "expression-is-satisfiable": `The expression {{eq}} is not a tautology. Its truth value depends on {{dependencies}}.`,
      "expression-is-invalid": `The expression is invalid.`,
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
};
