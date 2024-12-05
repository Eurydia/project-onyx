import { PlayArrowRounded } from "@mui/icons-material";
import {
  Button,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { FC, Fragment, ReactNode } from "react";

type EditorExecuteButtonProps = {
  onExecute: () => void;
  keyCombinationHint: string[];
};
export const EditorExecuteButton: FC<
  EditorExecuteButtonProps
> = (props) => {
  const { onExecute, keyCombinationHint } = props;

  const keyCombination = keyCombinationHint.map(
    (key, index) => {
      let plusElem: ReactNode = <Typography>+</Typography>;
      if (index >= keyCombinationHint.length - 1) {
        plusElem = null;
      }
      return (
        <Fragment key={"key-hint" + index}>
          {key}
          {plusElem}
        </Fragment>
      );
    }
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
        Run
      </Button>
    </Tooltip>
  );
};
