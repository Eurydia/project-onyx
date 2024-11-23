import { PlayArrowRounded } from "@mui/icons-material";
import {
  Button,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import { FC, Fragment, ReactNode } from "react";
import { StyledKBD } from "./StyledKBD";

type EditorExecuteToolbaGroupProps = {
  onExecute: () => void;
  keyCombinationHint: string[];
};
export const EditorExecuteToolbaGroup: FC<
  EditorExecuteToolbaGroupProps
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
          <StyledKBD>{key}</StyledKBD>
          {plusElem}
        </Fragment>
      );
    }
  );

  return (
    <Toolbar
      variant="dense"
      disableGutters
      sx={{
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "center",
        gap: 2,
      }}
    >
      <Button
        disableElevation
        variant="contained"
        startIcon={<PlayArrowRounded />}
        onClick={onExecute}
      >
        Run
      </Button>
      <Typography>or</Typography>
      <Stack
        useFlexGap
        gap={0.5}
        spacing={0.5}
        direction="row"
        alignItems="center"
      >
        {keyCombination}
      </Stack>
    </Toolbar>
  );
};
