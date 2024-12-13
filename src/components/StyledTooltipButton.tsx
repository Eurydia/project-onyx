import { PlayArrowRounded } from "@mui/icons-material";
import {
  Button,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { FC, Fragment } from "react";
import { useTranslation } from "react-i18next";

type StyledTooltipButtonProps = {
  onExecute: () => void;
  keyCombinationHint: string[];
};
export const StyledTooltipButton: FC<
  StyledTooltipButtonProps
> = (props) => {
  const { onExecute, keyCombinationHint } = props;

  const { t } = useTranslation();

  const keyCombination = keyCombinationHint.map(
    (key, index) => (
      <Fragment key={"key-hint" + index}>
        <Typography>{key}</Typography>
        {index + 1 < keyCombinationHint.length && (
          <Typography>+</Typography>
        )}
      </Fragment>
    )
  );

  return (
    <Tooltip
      arrow
      title={
        <Stack
          useFlexGap
          gap={0.5}
          spacing={0.5}
          direction="row"
          alignItems="center"
        >
          {keyCombination}
        </Stack>
      }
    >
      <Button
        disableElevation
        variant="contained"
        startIcon={<PlayArrowRounded />}
        onClick={onExecute}
      >
        {t("editor.toolbar.run")}
      </Button>
    </Tooltip>
  );
};
