export const en = {
  translation: {
    nav: {
      home: "Home",
      solver: "Solver",
      evaluator: "Evaluator",
      simplifier: "Simplifier",
      checker: "Tautology checker",
    },
    view: {
      home: {
        launch: "Open",
        read: "Read",
        calculators: "Tools",
        resources: "Resources",
        card: {
          solver: {
            title: "Solver",
            desc: "Solve an expression with truth table, expression tree, and step-by-step calculation.",
          },
          evaluator: {
            title: "Evaluator",
            desc: "Evaluate expressions according to given truth values.",
          },
          simplifier: {
            title: "Simplifier",
            desc: "Transform an expression into an equivalent, reduced form.",
          },
          checker: {
            title: "Tautology checker",
            desc: "Check if an expression is a tautology.",
          },
          theorem: {
            title: "Useful theorems",
            desc: "A collection of theorems on zeroth-order logic.",
          },
          about: {
            title: "Documentation",
            desc: "Learn more about the project's implementation and design.",
          },
        },
      },
      solver: {
        truthTable: {
          title: "Truth Table",
        },
        stepByStep: {
          title: "Step-by-step Evaluation",
        },
        graph: {
          title: "Interactive Graph",
        },
        tab: {
          graph: "Graph",
          truthTable: "Truth table",
          stepByStep: "Step-by-step",
        },
        feedback: {
          noExpression:
            "No expression to display. Evaluate one to see how it's interpreted!",
        },
      },
    },

    common: {
      truthTable: {
        empty: "Nothing to see here!",
        error:
          "Something has gone wrong. Unable to display truth table for current expression.",
      },
      proposition: "Proposition",
      truthValue: "Truth value",
      true: "True",
      false: "False",
      close: "Close",
      connectives: {
        negation: "Negation",
        conjunction: "Conjunction",
        disjunction: "Disjunction",
        implication: "Implication",
        equivalence: "Equivalence",
      },
    },
    editor: {
      originalPanel: "Original",
      simplifiedPanel: "Simplified",
      howToUse: "How to use?",
      run: "Run",
      allowedOperatorLabel: "Connectives to keep",
    },
    playground: {
      feedback: {
        dialogInfo:
          "Tap on a circle to modify the truth value of the expression.",
      },
      graph: {
        noEvaluationToDisplay:
          "No evaluation step to display. Evaluate an expression to see steps here.",
        cannotDisplayEvaluation:
          "Cannot display evaluation step. Please check the expression and try again.",
        center: "Center Graph",
      },

      playback: {
        forward: "Forward",
        rewind: "Rewind",
        // start: "Start",
        // end: "End",
      },
    },
  },
};
