import {
  FirstPageRounded,
  KeyboardArrowLeftRounded,
  KeyboardArrowRightRounded,
  LastPageRounded,
} from "@mui/icons-material";
import {
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { FC } from "react";

type StepByStepEvaluationControlProps = {
  value: number;
  maxValue: number;
  onChange: (value: number) => void;
};
export const StepByStepEvaluationControl: FC<
  StepByStepEvaluationControlProps
> = (props) => {
  const { maxValue, onChange, value } = props;
  return (
    <Stack
      alignItems="center"
      spacing={0.5}
      direction="row"
    >
      <Tooltip title={<Typography>First step</Typography>}>
        <span>
          <IconButton
            disabled={value <= 0}
            onClick={() => onChange(0)}
          >
            <FirstPageRounded />
          </IconButton>
        </span>
      </Tooltip>
      <Tooltip
        title={<Typography>Previous step</Typography>}
      >
        <span>
          <IconButton
            disabled={value <= 0}
            onClick={() => onChange(Math.max(value - 1, 0))}
          >
            <KeyboardArrowLeftRounded />
          </IconButton>
        </span>
      </Tooltip>
      <Tooltip title={<Typography>Next step</Typography>}>
        <span>
          <IconButton
            disabled={value >= maxValue - 1}
            onClick={() =>
              onChange(Math.min(value + 1, maxValue - 1))
            }
          >
            <KeyboardArrowRightRounded />
          </IconButton>
        </span>
      </Tooltip>
      <Tooltip title={<Typography>Final step</Typography>}>
        <span>
          <IconButton
            disabled={value >= maxValue - 1}
            onClick={() => onChange(maxValue - 1)}
          >
            <LastPageRounded />
          </IconButton>
        </span>
      </Tooltip>
    </Stack>
  );
};
