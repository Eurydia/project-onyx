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

  const { t } = useTranslation();

  const handleForwardOrder = () => {
    if (value >= maxValue) {
      return;
    }
    onChange(value + 1);
  };

  const handleRewindOrder = () => {
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
      handleForwardOrder();
    } else if (key === "ArrowLeft" || key === "ArrowDown") {
      e.preventDefault();
      handleRewindOrder();
    }
  };

  const maxLabel = disabled ? "0" : maxValue.toString();
  const valueLabel = disabled
    ? "0"
    : value.toString().padStart(maxLabel.length, "0");
  const label = `${valueLabel}/${maxLabel}`;

  return (
    <Stack
      spacing={1.5}
      useFlexGap
      direction="row"
      alignItems="center"
      paddingX={2}
      paddingY={1}
    >
      <StyledIconButton
        disabled={disabled}
        title={t("playground.rewind")}
        onClick={handleRewindOrder}
        onKeyPress={handleKeyPress}
      >
        <KeyboardArrowLeftRounded />
      </StyledIconButton>
      <Typography fontFamily="monospace">
        {label}
      </Typography>
      <StyledIconButton
        disabled={disabled}
        title={t("playground.forward")}
        onKeyPress={handleKeyPress}
        onClick={handleForwardOrder}
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
