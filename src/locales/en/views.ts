export default {
  "error-view": {
    "title": "Uh oh, that's not good...",
    "return-home": "Return to home page",
  },
  "evaluator-view": {
    cards: {
      "input-interpretation": {
        title: "Input interpretation",
      },
      "output": {
        "true": "true",
        "false": "false",
        "title": "Result",
        "formula-evaluates-to-value":
          "The formula {{formula}} evaluates to {{value}} as answer.",
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
        "therefore-formula-is-value":
          "Therefore, the formula {{formula}} is {{value}} as answer.",
        "step-x-of-y": "Step {{current}} of {{total}}",
        "by-truth-table-formula-is-value": `By the truth table of {{operator}}, {{formula}} is {{value}} as answer for this step.`,
        "consider-the-formula":
          "Consider the formula {{formula}} in this step.",
        "given-variable-is-value":
          "Given {{variable}} is true, substitute {{variable}} with true in {{formula}} as simplified formula.",
        "from-previous-step-substitute-into-formula":
          "From {{step}}, {{formula}} is {{value}}. Substitute into {{current}} to obtain {{result}} as simplified formula.",
        "infos": {
          "no-valid-formula-to-display":
            "There is no valid formula to display step-by-step evaluation.",
        },
      },
    },
  },
  "rewriter-view": {
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
        "infos": {
          "no-valid-formula-to-display":
            "There is no valid formula to display.",
          "truth-table-is-not-available":
            "The truth table for this formula is not available.",
        },
      },
    },
  },
  "checker-view": {
    tautology: "tautology",
    contradiction: "contradiction",
    contingent: "contingent",
    cards: {
      "input-interpretation": {
        title: "Input Interpretation",
      },
      "output": {
        title: "Result",

        text: {
          "formula-is-value":
            "The formula {{formula}} is {{value}}",
        },
        warnings: {
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
    "cards": {
      comparator: {
        desc: "Compare expressions to see which one of them are equivalent.",
      },
      evaluator: {
        desc: "Evaluate expressions according to given truth values.",
      },
      rewriter: {
        desc: "Transform an expression into a different basis.",
      },
      checker: {
        desc: "Check if an expression is always true, always false, or in-between.",
      },
    },
    "boolean-algebra-interpreter":
      "Boolean algebra interpreter",
  },
  "comparator-view": {
    "equivalent": "Equivalent",
    "not-equivalent": "Not equivalent",
    "cards": {
      "output": {
        title: "Result",
        text: {
          "formulas-are-value":
            "The formula {{first}} and the formula {{second}} are {{value}}",
        },
        warnings: {
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
