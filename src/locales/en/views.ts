export default {
  "error-view": {
    "title": "Uh oh, that's not good...",
    "return-home": "Return to home page",
  },
  "evaluator-view": {
    banner: "Evaluator",
    cards: {
      "input-interpretation": {
        title: "Input interpretation",
      },
      "output": {
        "title": "Result",
        "formula-evalutes-to-true":
          "The formula {{formula}} evaluates to true.",
        "formula-evalutes-to-false":
          "The formula {{formula}} evaluates to false.",
        "infos": {
          "no-valid-formula-to-display":
            "There is no valid formula to display.",
        },
      },
      "step-by-step": {
        "true": "true",
        "false": "false",
        "title": "Step-by-step Evaluation",
        "tab-item": "Expression ({{num}})",
        "no-evaluation-step-to-display":
          "No evaluation step to display.",
        "therefore-formula-is-true":
          "Therefore, the formula {{formula}} is true.",
        "therefore-formula-is-false":
          "Therefore, the formula {{formula}} is false.",
        "step-x-of-y": "Step {{current}} of {{total}}",
        "by-truth-table-formula-is-true": `By the truth table of {{operator}}, {{formula}} is true.`,
        "by-truth-table-formula-is-false": `By the truth table of {{operator}}, {{formula}} is false.`,
        "consider-the-formula":
          "Consider the formula {{formula}}",
        "given-variable-is-value":
          "Given {{variable}} is true, substitute {{variable}} with true in {{formula}}",
        "from-previous-step-substitute-into-formula":
          "From {{step}}, {{formula}} is {{value}}. Substitute into {{current}} to obtain {{result}}",
        "infos": {
          "no-valid-formula-to-display":
            "There is no valid formula to display step-by-step evaluation.",
        },
      },
    },
  },
  "rewriter-view": {
    banner: "Rewriter",
    cards: {
      "input-interpretation": {
        title: "Input interpretation",
      },
      "output": {
        "title": "Result",
        "formula-cannot-be-expressed-in-the-desired-basis":
          "The formula {{formula}} cannot be expressed in the desired basis.",
        "formula-is-expressed-as-in-the-desired-basis":
          "The formula {{formula}} can be expressed as {{result}} in the desired basis.",
        "warnings": {
          "no-valid-formula-to-display":
            "There is no valid formula to display.",
        },
        "infos": {
          "truth-table-is-not-available":
            "The truth table for this formula is not available",
        },
      },
    },
  },
  "checker-view": {
    banner: "Tautology checker",
    cards: {
      "input-interpretation": {
        title: "Input Interpretation",
      },
      "output": {
        "title": "Result",
        "formula-is-tautology":
          "The formula {{formula}} is a tautology.",
        "formula-is-contradiction":
          "The formula {{formula}} is a contradiction.",
        "formula-is-satisfiable": `The formula {{formula}} is neither a tautology or a contradiction.`,
        "warnings": {
          "no-formula-to-display":
            "There is no valid formula to display.",
        },
      },
    },
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
            "There is not enough valid formula to perform comparisons.",
        },
      },
      "input-interpretation": {
        title: "Input Interpretation",
      },
    },
  },
};
