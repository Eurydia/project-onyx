import {
  Button,
  ButtonGroup,
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

type EditorOperatorGroupProps = {
  onInsertChar: (char: string) => void;
};
export const EditorOperatorGroup: FC<
  EditorOperatorGroupProps
> = (props) => {
  const { onInsertChar } = props;

  return (
    <ButtonGroup
      disableElevation
      variant="outlined"
    >
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
  );
};
