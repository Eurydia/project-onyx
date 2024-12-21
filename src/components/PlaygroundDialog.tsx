import { exprTreeCollectSymbols } from "$core/tree/expr/evaluate";
import { exprTreeToLatex } from "$core/tree/expr/latex";
import { SymbolTable } from "$types/ast";
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
  tree: ExprTree;
  open: boolean;
  value: SymbolTable;
  onChange: (k: string, v: boolean) => void;
  onClose: () => void;
};
export const PlaygroundDialog: FC<PlaygroundDialogProps> = (
  props
) => {
  const { tree, open, onClose, onChange, value } = props;

  const { t } = useTranslation("translation", {
    keyPrefix: "common",
  });
  const { palette, shape } = useTheme();

  const active = exprTreeCollectSymbols(tree);

  const evalValue = tree.eval(value)
    ? t("true")
    : t("false");
  const evalText = t("truthValue");
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
          tex={exprTreeToLatex(tree)}
          options={{
            displayMode: true,
            output: "htmlAndMathml",
          }}
        />
        <Typography fontStyle="italic">{text}</Typography>
      </DialogTitle>
      <DialogContent dividers>
        <PlaygroundDialogConfig
          active={active}
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
          {t("close")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
