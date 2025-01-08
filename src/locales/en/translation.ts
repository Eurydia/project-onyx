export const en = {
  translation: {
    component: {
      playground: {
        config: {
          true: "True",
          false: "False",
          editTruthValue: "Modify Truth Values",
        },
      },
      common: {
        editor: {
          run: {
            label: "Run",
            tooltip: "Or (CTRL + ENTER)",
          },
        },
      },
    },
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
          title: "Step-by-step Evaluation",
        },
        feedback: {
          noExpression:
            "No expression to display. Evaluate one to see how it's interpreted!",
        },
        howToUse: {
          title: "Not sure where to begin?",
          link: "Read the Manual",
        },
      },
    },
    common: {
      truthTable: {
        confirm: "I understand",
        warning:
          "The truth table for this expression is automatically hidden due to its size. You can press the button below to show the table, but this process can take a long time to complete or even crash the application. For expressions with many propositions, truth table is not the recommemnded way to visualize them.",
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
