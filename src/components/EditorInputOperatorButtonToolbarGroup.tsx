import {
  Button,
  ButtonGroup,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { FC } from "react";
import { StyledLatex } from "./StyledLatex";

const OPERATOR = [
  {
    name: "Negation",
    label: "\\lnot",
    insertChar: "\u{00AC}",
  },
  {
    name: "Conjunction",
    label: "\\land",
    insertChar: "\u{2227}",
  },
  {
    name: "Disjunction",
    label: "\\lor",
    insertChar: "\u{2228}",
  },
  {
    name: "Implication",
    label: "\\implies",
    insertChar: "\u{21D2}",
  },
  {
    name: "Equivalence",
    label: "\\iff",
    insertChar: "\u{21D4}",
  },
];

type EditorInputOperatorButtonToolbarGroupProps = {
  onInsertChar: (char: string) => void;
};
export const EditorInputOperatorButtonToolbarGroup: FC<
  EditorInputOperatorButtonToolbarGroupProps
> = (props) => {
  const { onInsertChar } = props;

  return (
    <Toolbar
      disableGutters
      variant="dense"
    >
      <ButtonGroup disableElevation>
        {OPERATOR.map((btn, btnIndex) => (
          <Tooltip
            key={`btn` + btnIndex}
            title={
              <Typography sx={{ userSelect: "none" }}>
                {btn.name}
              </Typography>
            }
            arrow
          >
            <Button
              onClick={() => onInsertChar(btn.insertChar)}
            >
              <StyledLatex
                tex={btn.label}
                options={{
                  displayMode: false,
                  output: "htmlAndMathml",
                }}
              />
            </Button>
          </Tooltip>
        ))}
      </ButtonGroup>
    </Toolbar>
  );
};
