import {
  Button,
  ButtonGroup,
  Tooltip,
  Typography,
} from "@mui/material";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { StyledLatex } from "./StyledLatex";

const OPERATOR = [
  {
    name: "negation",
    label: "\\lnot",
    insertChar: "\u{00AC}",
  },
  {
    name: "conjunction",
    label: "\\land",
    insertChar: "\u{2227}",
  },
  {
    name: "disjunction",
    label: "\\lor",
    insertChar: "\u{2228}",
  },
  {
    name: "implication",
    label: "\\implies",
    insertChar: "\u{21D2}",
  },
  {
    name: "equivalence",
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
  const { t } = useTranslation("translation", {
    keyPrefix: "editor.toolbar.connectives",
  });

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
              {t(btn.name)}
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
