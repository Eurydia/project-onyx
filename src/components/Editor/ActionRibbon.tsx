import PlayArrowRounded from "@mui/icons-material/PlayArrowRounded";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import type { FC } from "react";
import { m } from "$/libs/paraglide/messages";
import { CopyButton } from "./CopyButton";

export const ActionRibbon: FC<{
  onSubmit: () => void;
  onCopy: () => void;
}> = (props) => {
  const { onSubmit, onCopy } = props;

  return (
    <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap" }}>
      <Button
        startIcon={<PlayArrowRounded />}
        onClick={onSubmit}
        sx={(theme) => ({
          "&:hover": {
            color: theme.palette.getContrastText(theme.palette.primary.main),
            backgroundColor: theme.palette.primary.main,
          },
          color: theme.palette.primary.dark,
          backgroundColor: theme.palette.primary.light,
        })}
      >
        {m["components.editor.run"]()}
      </Button>
      <CopyButton onClick={onCopy} />
    </Stack>
  );
};
