export const en = {
  translation: {
    core: {
      lexer: {
        errors: {
          foundUnsupportedCharacter:
            "Found unsupport character at position",
        },
      },
      parser: {
        errors: {
          inputEndedUnexpectedly: "Incomplete expression",
          unexpectedParenthesis:
            "Found unexpected parenthesis at position",
          unpairedRightParenthesis:
            "Found unpaired right parenthesis at position",
          unclosedLeftParenthesis:
            "Found unpaired left parenthesis at position",
        },
      },
    },
    common: {
      true: "True",
      false: "False",
      connectives: {
        negation: "Negation",
        conjunction: "Conjunction",
        disjunction: "Disjunction",
        implication: "Implication",
        equivalence: "Equivalence",
      },
      emptyText: "Nothing to see here",
    },
    editor: {
      howToUse: "How to use?",
      run: " Run",
      allowedOperatorLabel: "Connectives to keep",
    },
    playground: {
      graph: {
        center: "Center Graph",
      },
      dialog: {
        close: "Close",
      },
      playback: {
        start: "Start",
        forward: "Forward",
        rewind: "Rewind",
        end: "End",
      },
    },
  },
} as const;
