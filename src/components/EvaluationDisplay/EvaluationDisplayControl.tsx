import { StyledTooltipIconButton } from "$components/Styled/StyledIconButton";
import {
  FirstPageRounded,
  KeyboardArrowLeftRounded,
  KeyboardArrowRightRounded,
  LastPageRounded,
} from "@mui/icons-material";
import { Stack } from "@mui/material";
import { FC, memo } from "react";

type EvaluationDisplayControlProps = {
  value: number;
  maxValue: number;
  onChange: (value: number) => void;
};
const EvaluationDisplayControl_: FC<
  EvaluationDisplayControlProps
> = (props) => {
  const { maxValue, onChange, value } = props;
  return (
    <Stack
      useFlexGap
      alignItems="center"
      spacing={0.5}
      direction="row"
      flexWrap="wrap"
    >
      <StyledTooltipIconButton
        title="First step"
        disabled={value <= 0}
        onClick={() => onChange(0)}
      >
        <FirstPageRounded />
      </StyledTooltipIconButton>
      <StyledTooltipIconButton
        title="Previous step"
        disabled={value <= 0}
        onClick={() => onChange(Math.max(value - 1, 0))}
      >
        <KeyboardArrowLeftRounded />
      </StyledTooltipIconButton>
      <StyledTooltipIconButton
        title="Next step"
        disabled={value >= maxValue - 1}
        onClick={() =>
          onChange(Math.min(value + 1, maxValue - 1))
        }
      >
        <KeyboardArrowRightRounded />
      </StyledTooltipIconButton>
      <StyledTooltipIconButton
        title="Final step"
        disabled={value >= maxValue - 1}
        onClick={() => onChange(maxValue - 1)}
      >
        <LastPageRounded />
      </StyledTooltipIconButton>
    </Stack>
  );
};
export const EvaluationDisplayControl = memo(
  EvaluationDisplayControl_,
  (prev, next) => {
    const keys = [
      "value",
      "maxValue",
    ] as (keyof EvaluationDisplayControlProps)[];
    return keys.every((key) => prev[key] === next[key]);
  }
);
