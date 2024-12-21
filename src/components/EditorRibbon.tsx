import { Toolbar } from "@mui/material";
import { FC } from "react";
import { EditorRibbonInsert } from "./EditorRibbonInsert";

type EditorRibbonProps = {
  onInsertChar: (value: string) => void;
};
export const EditorRibbon: FC<EditorRibbonProps> = (
  props
) => {
  const { onInsertChar } = props;

  return (
    <Toolbar
      variant="dense"
      disableGutters
      sx={{
        gap: 1,
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <EditorRibbonInsert onInsertChar={onInsertChar} />
    </Toolbar>
  );
};
