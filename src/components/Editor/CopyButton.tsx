import CheckRounded from "@mui/icons-material/CheckRounded";
import ContentCopyRounded from "@mui/icons-material/ContentCopyRounded";
import Button from "@mui/material/Button";
import { type FC, useState } from "react";
import { m } from "$/libs/paraglide/messages";

export const CopyButton: FC<{
  onClick: () => void;
}> = (props) => {
  const { onClick } = props;
  const [hasCopied, setHasCopied] = useState(false);

  return (
    <Button
      startIcon={hasCopied ? <CheckRounded /> : <ContentCopyRounded />}
      onClick={() => {
        onClick();
        setHasCopied(true);
        setTimeout(() => {
          setHasCopied(false);
        }, 1000);
      }}
      sx={(theme) => ({
        "&:hover": {
          color: theme.palette.getContrastText(theme.palette.primary.main),
          backgroundColor: theme.palette.primary.main,
        },
        color: theme.palette.primary.dark,
        backgroundColor: theme.palette.primary.light,
      })}
    >
      {hasCopied
        ? m["components.editor.copied"]()
        : m["components.editor.copy"]()}
    </Button>
  );
};
