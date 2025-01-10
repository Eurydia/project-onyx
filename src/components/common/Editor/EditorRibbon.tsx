import { StyledLatex } from "$components/styled/StyledLatex";
import {
  Button,
  ButtonGroup,
  Toolbar,
} from "@mui/material";
import { FC } from "react";

const OPERATOR: {
  name: string;
  label: string;
  shiftChar: string;
  char: string;
}[] = [
  {
    name: "negation",
    label: "\\text{not, $\\lnot$}",
    shiftChar: "\u{00AC}",
    char: "not",
  },
  {
    name: "conjunction",
    label: "\\text{and, $\\land$}",
    shiftChar: "\u{2227}",
    char: "and",
  },
  {
    name: "disjunction",
    label: "\\text{or, $\\lor$}",
    shiftChar: "\u{2228}",
    char: "or",
  },
  {
    name: "implication",
    label: "\\text{implies, $\\implies$}",
    shiftChar: "\u{21D2}",
    char: "implies",
  },
  {
    name: "equivalence",
    label: "\\text{iff, $\\iff$}",
    shiftChar: "\u{21D4}",
    char: "iff",
  },
];

type EditorRibbonProps = {
  onInsertChar: (value: string) => void;
};
export const EditorRibbon: FC<EditorRibbonProps> = (
  props
) => {
  const { onInsertChar } = props;
  return (
    <Toolbar
      disableGutters
      variant="dense"
      sx={{
        gap: 1,
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <ButtonGroup
        disableElevation
        variant="outlined"
      >
        {OPERATOR.map((btn, index) => (
          <Button
            key={"insert-btn-" + index}
            sx={{
              maxWidth: "fit-content",
              textTransform: "none",
            }}
            onClick={(e) => {
              onInsertChar(
                e.shiftKey ? btn.shiftChar : btn.char
              );
            }}
          >
            <StyledLatex tex={btn.label} />
          </Button>
        ))}
      </ButtonGroup>
    </Toolbar>
  );
};
