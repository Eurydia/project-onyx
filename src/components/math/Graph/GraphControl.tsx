import { StyledIconButton } from "$components/styled/StyledIconButton";
import {
  KeyboardArrowLeftRounded,
  KeyboardArrowRightRounded,
  PauseRounded,
  PlayArrowRounded,
  ReplayRounded,
} from "@mui/icons-material";
import { Slider, Stack, Typography } from "@mui/material";
import { FC, KeyboardEvent } from "react";
import { useTranslation } from "react-i18next";

type GraphControlProps = {
  maxValue: number;
  minValue: number;
  value: number;
  onChange: (v: number) => void;
  onAnimationPlay: () => void;
  onAnimationPause: () => void;
  onAnimationReplay: () => void;
  isAnimationPlaying: boolean;
};
export const GraphControl: FC<GraphControlProps> = (
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

  // const [animationId, setAnimationId] = useState<
  //   number | null
  // >(null);

  // const handleAnimationStart = () => {
  //   const id = setInterval(() => {
  //     onChange(value + 1);
  //     if (value >= maxValue) {
  //       handleAnimationStop();
  //     }
  //   }, 1500);
  //   setAnimationId(id);
  // };

  // const handleAnimationStop = () => {
  //   if (animationId !== null) {
  //     clearInterval(animationId);
  //   }
  // };

  const handleKeyPress = (
    e: KeyboardEvent<HTMLButtonElement>
  ) => {
    const { key } = e;
    if (key === "ArrowUp" || key === "ArrowRight") {
      e.preventDefault();
      handleForward();
    } else if (key === "ArrowLeft" || key === "ArrowDown") {
      e.preventDefault();
      handleRewind();
    }
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
        <StyledIconButton
          disabled={value <= minValue}
          title="Previous"
          onClick={handleRewind}
          onKeyPress={handleKeyPress}
        >
          <KeyboardArrowLeftRounded />
        </StyledIconButton>
        {value === maxValue && (
          <StyledIconButton
            title="Replay"
            onClick={onAnimationReplay}
          >
            <ReplayRounded />
          </StyledIconButton>
        )}
        {value !== maxValue && isAnimationPlaying && (
          <StyledIconButton
            title="Pause"
            onClick={onAnimationPause}
          >
            <PauseRounded />
          </StyledIconButton>
        )}
        {value !== maxValue && !isAnimationPlaying && (
          <StyledIconButton
            title="Play"
            onClick={onAnimationPlay}
          >
            <PlayArrowRounded />
          </StyledIconButton>
        )}
        <StyledIconButton
          disabled={value >= maxValue}
          title={t("forward")}
          onKeyPress={handleKeyPress}
          onClick={handleForward}
        >
          <KeyboardArrowRightRounded />
        </StyledIconButton>
        <Typography>{`${value}/${maxValue}`}</Typography>
      </Stack>
    </Stack>
  );
};
