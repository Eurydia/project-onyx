import { ButtonGroup, Toolbar } from "@mui/material";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { StyledLatex } from "./StyledLatex";
import { StyledTooltipButton } from "./StyledTooltipButton";

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

type EditorRibbonProps = {
  onInsertChar: (value: string) => void;
};
export const EditorRibbon: FC<EditorRibbonProps> = (
  props
) => {
  const { onInsertChar } = props;
  const { t } = useTranslation("translation", {
    keyPrefix: "common.connectives",
  });

  return (
    <Toolbar
      variant="dense"
      disableGutters
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
          <StyledTooltipButton
            variant="outlined"
            key={"insert-btn-" + index}
            title={t(btn.name)}
            onClick={() => onInsertChar(btn.insertChar)}
          >
            <StyledLatex tex={btn.label} />
          </StyledTooltipButton>
        ))}
      </ButtonGroup>
    </Toolbar>
  );
};
