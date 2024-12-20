import {
  KeyboardArrowLeftRounded,
  KeyboardArrowRightRounded,
} from "@mui/icons-material";
import { Slider, Stack, Typography } from "@mui/material";
import { FC, KeyboardEvent } from "react";
import { useTranslation } from "react-i18next";
import { StyledIconButton } from "./StyledIconButton";

type PlaygroundPlaybackControlProps = {
  maxValue: number;
  minValue: number;
  disabled: boolean;
  value: number;
  onChange: (v: number) => void;
};
export const PlaygroundPlaybackControl: FC<
  PlaygroundPlaybackControlProps
> = (props) => {
  const { disabled, maxValue, minValue, onChange, value } =
    props;

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

  // There is a possibility for the ui to fall apart due to overflow
  // **IF** the order is large enough eg 20 digits long
  // in such a case, the label would over and pushes the forward arrow
  // and the slider out of view
  // but let's be real, we run into other problem any way
  // if the evaluation of a tree that large
  const maxLabel = disabled ? "0" : maxValue.toString();
  const valueLabel = disabled
    ? "0"
    : value.toString().padStart(maxLabel.length, "0");
  const label = `${valueLabel}/${maxLabel}`;

  return (
    <Stack
      spacing={1}
      useFlexGap
      direction="row"
      alignItems="center"
      paddingX={2}
      paddingY={1}
    >
      <StyledIconButton
        disabled={value <= minValue}
        title={t("rewind")}
        onClick={handleRewind}
        onKeyPress={handleKeyPress}
      >
        <KeyboardArrowLeftRounded />
      </StyledIconButton>
      <Typography fontFamily="monospace">
        {label}
      </Typography>
      <StyledIconButton
        disabled={value >= maxValue}
        title={t("forward")}
        onKeyPress={handleKeyPress}
        onClick={handleForward}
      >
        <KeyboardArrowRightRounded />
      </StyledIconButton>
      <Slider
        disabled={disabled}
        valueLabelDisplay="auto"
        onChange={(_, v) => onChange(v as number)}
        value={value}
        max={maxValue}
        min={minValue}
        step={1}
      />
    </Stack>
  );
};
