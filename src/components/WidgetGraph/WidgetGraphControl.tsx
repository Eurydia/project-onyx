import { StyledTooltipIconButton } from "$components/Styled/StyledIconButton";
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

type WidgetGraphControlProps = {
  maxValue: number;
  minValue: number;
  value: number;
  onChange: (v: number) => void;
  isAnimationPlaying: boolean;
  onAnimationPlay: () => void;
  onAnimationPause: () => void;
  onAnimationReplay: () => void;
};
const WidgetGraphControl_: FC<WidgetGraphControlProps> = (
  props
) => {
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

  const { t } = useTranslation("translation", {
    keyPrefix: "playground.playback",
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
          title="Previous"
          onClick={handleRewind}
        >
          <KeyboardArrowLeftRounded />
        </StyledTooltipIconButton>
        {value === maxValue && (
          <StyledTooltipIconButton
            title="Replay"
            onClick={onAnimationReplay}
          >
            <ReplayRounded />
          </StyledTooltipIconButton>
        )}
        {value !== maxValue && isAnimationPlaying && (
          <StyledTooltipIconButton
            title="Pause"
            onClick={onAnimationPause}
          >
            <PauseRounded />
          </StyledTooltipIconButton>
        )}
        {value !== maxValue && !isAnimationPlaying && (
          <StyledTooltipIconButton
            title="Play"
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

export const WidgetGraphControl = memo(
  WidgetGraphControl_,
  (prev, next) => {
    const keys = [
      "value",
      "maxValue",
      "minValue",
      "isAnimationPlaying",
    ] as (keyof WidgetGraphControlProps)[];
    return keys.every((key) => prev[key] === next[key]);
  }
);
