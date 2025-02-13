import { StyledTooltipIconButton } from "$components/styled/StyledIconButton";
import {
  KeyboardArrowLeftRounded,
  KeyboardArrowRightRounded,
  PauseRounded,
  PlayArrowRounded,
  ReplayRounded,
} from "@mui/icons-material";
import { Slider, Stack, Typography } from "@mui/material";
import { FC, memo } from "react";
import { useTranslation } from "react-i18next";

type GraphControlProps = {
  maxValue: number;
  minValue: number;
  value: number;
  onChange: (v: number) => void;
  isAnimationPlaying: boolean;
  onAnimationPlay: () => void;
  onAnimationPause: () => void;
  onAnimationReplay: () => void;
};
const GraphControl_: FC<GraphControlProps> = (props) => {
  const {
    value,
    maxValue,
    minValue,
    onChange,
    isAnimationPlaying,
    onAnimationPause,
    onAnimationPlay,
    onAnimationReplay,
  } = props;

  const { t } = useTranslation("components", {
    keyPrefix: "graph.playback",
  });

  const handleForward = () => {
    if (value >= maxValue) {
      return;
    }
    onChange(value + 1);
  };

  const handleRewind = () => {
    if (value <= minValue) {
      return;
    }
    onChange(value - 1);
  };

  return (
    <Stack>
      <Slider
        valueLabelDisplay="auto"
        onChange={(_, v) => onChange(v as number)}
        value={value}
        max={maxValue}
        min={minValue}
        step={1}
      />
      <Stack
        direction="row"
        spacing={1}
        alignItems="center"
      >
        <StyledTooltipIconButton
          disabled={value <= minValue}
          title={t("previous")}
          onClick={handleRewind}
        >
          <KeyboardArrowLeftRounded />
        </StyledTooltipIconButton>
        {value === maxValue && (
          <StyledTooltipIconButton
            title={t("replay")}
            onClick={onAnimationReplay}
          >
            <ReplayRounded />
          </StyledTooltipIconButton>
        )}
        {value !== maxValue && isAnimationPlaying && (
          <StyledTooltipIconButton
            title={t("pause")}
            onClick={onAnimationPause}
          >
            <PauseRounded />
          </StyledTooltipIconButton>
        )}
        {value !== maxValue && !isAnimationPlaying && (
          <StyledTooltipIconButton
            title={t("play")}
            onClick={onAnimationPlay}
          >
            <PlayArrowRounded />
          </StyledTooltipIconButton>
        )}
        <StyledTooltipIconButton
          disabled={value >= maxValue}
          title={t("forward")}
          onClick={handleForward}
        >
          <KeyboardArrowRightRounded />
        </StyledTooltipIconButton>
        <Typography>{`${value}/${maxValue}`}</Typography>
      </Stack>
    </Stack>
  );
};

export const GraphControl = memo(
  GraphControl_,
  (prev, next) => {
    const keys = [
      "value",
      "maxValue",
      "minValue",
      "isAnimationPlaying",
    ] as (keyof GraphControlProps)[];
    return keys.every((key) => prev[key] === next[key]);
  }
);
