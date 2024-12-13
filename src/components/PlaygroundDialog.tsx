import { collectSymbols } from "$core/tree/expr/evaluate";
import { exprTreeToLatex } from "$core/tree/expr/latex";
import { ExprTree } from "$types/ast";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  useTheme,
} from "@mui/material";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { PlaygroundDialogConfig } from "./PlaygroundDialogConfig";
import { StyledLatex } from "./StyledLatex";

type PlaygroundDialogProps = {
  node: ExprTree | null;
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

  const selected = collectSymbols(node);

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
      </DialogTitle>
      <DialogContent dividers>
        <PlaygroundDialogConfig
          selected={selected}
          table={value}
          onChange={onChange}
        />
      </DialogContent>
      <DialogActions>
        <Button variant="text">
          {t("playground.dialog.close")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
