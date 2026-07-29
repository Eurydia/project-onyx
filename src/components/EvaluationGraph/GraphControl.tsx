import KeyboardArrowLeftRounded from "@mui/icons-material/KeyboardArrowLeftRounded";
import KeyboardArrowRightRounded from "@mui/icons-material/KeyboardArrowRightRounded";
import PauseRounded from "@mui/icons-material/PauseRounded";
import PlayArrowRounded from "@mui/icons-material/PlayArrowRounded";
import ReplayRounded from "@mui/icons-material/ReplayRounded";
import Slider from "@mui/material/Slider";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { type FC, memo } from "react";
import * as m from "$/paraglide/messages.js";
import { StyledTooltipIconButton } from "../styled/StyledIconButton";

export const GraphControl: FC<{
  maxValue: number;
  minValue: number;
  value: number;
  onChange: (v: number) => void;
  isAnimationPlaying: boolean;
  onAnimationPlay: () => void;
  onAnimationPause: () => void;
  onAnimationReplay: () => void;
}> = memo((props) => {
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
      <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
        <StyledTooltipIconButton
          disabled={value <= minValue}
          title={m["components.graph.playback.previous"]()}
          onClick={handleRewind}
        >
          <KeyboardArrowLeftRounded />
        </StyledTooltipIconButton>
        {value === maxValue && (
          <StyledTooltipIconButton
            title={m["components.graph.playback.replay"]()}
            onClick={onAnimationReplay}
          >
            <ReplayRounded />
          </StyledTooltipIconButton>
        )}
        {value !== maxValue && isAnimationPlaying && (
          <StyledTooltipIconButton
            title={m["components.graph.playback.pause"]()}
            onClick={onAnimationPause}
          >
            <PauseRounded />
          </StyledTooltipIconButton>
        )}
        {value !== maxValue && !isAnimationPlaying && (
          <StyledTooltipIconButton
            title={m["components.graph.playback.play"]()}
            onClick={onAnimationPlay}
          >
            <PlayArrowRounded />
          </StyledTooltipIconButton>
        )}
        <StyledTooltipIconButton
          disabled={value >= maxValue}
          title={m["components.graph.playback.forward"]()}
          onClick={handleForward}
        >
          <KeyboardArrowRightRounded />
        </StyledTooltipIconButton>
        <Typography>{`${value}/${maxValue}`}</Typography>
      </Stack>
    </Stack>
  );
}, (prev, next) => {
  const keys = [
    "value",
    "maxValue",
    "minValue",
    "isAnimationPlaying",
  ] as const;
  return keys.every((key) => prev[key] === next[key]);
});
