import { exprTreeCollectSymbols } from "$core/tree/expr/evaluate";
import { exprTreeToLatex } from "$core/tree/expr/latex";
import { ExprTree } from "$types/graph";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  useTheme,
} from "@mui/material";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { PlaygroundDialogConfig } from "./PlaygroundDialogConfig";
import { StyledLatex } from "./StyledLatex";

type PlaygroundDialogProps = {
  node: ExprTree;
  open: boolean;
  value: Map<string, boolean>;
  onChange: (k: string, v: boolean) => void;
  onClose: () => void;
};
export const PlaygroundDialog: FC<PlaygroundDialogProps> = (
  props
) => {
  const { node, open, onClose, onChange, value } = props;

  const { t } = useTranslation();
  const { palette, shape } = useTheme();

  const selected = exprTreeCollectSymbols(node);

  const evalValue = node.eval(value)
    ? t("common.true")
    : t("common.false");
  const evalText = t("common.truthValue");
  const text = `${evalText}: ${evalValue}`;
  return (
    <Dialog
      maxWidth="md"
      fullWidth
      open={open}
      scroll="body"
      onClose={onClose}
      PaperProps={{
        elevation: 0,
        sx: {
          borderRadius: shape.borderRadius,
          borderStyle: "solid",
          borderWidth: 4,
          borderColor: palette.primary.main,
        },
      }}
    >
      <DialogTitle>
        <StyledLatex
          tex={exprTreeToLatex(node)}
          options={{
            displayMode: true,
            output: "htmlAndMathml",
          }}
        />
        <Typography fontStyle="italic">{text}</Typography>
      </DialogTitle>
      <DialogContent dividers>
        <PlaygroundDialogConfig
          selected={selected}
          table={value}
          onChange={onChange}
        />
      </DialogContent>
      <DialogActions>
        <Button
          disableElevation
          disableRipple
          variant="text"
          onClick={onClose}
        >
          {t("playground.dialog.close")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
