import { Stack, Toolbar, Typography } from "@mui/material";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { EditorRibbonInsert } from "./EditorRibbonInsert";
import { StyledTooltipButton } from "./StyledTooltipButton";

type EditorRibbonProps = {
  onExecute: () => void;
  onInsertChar: (value: string) => void;
};
export const EditorRibbon: FC<EditorRibbonProps> = (
  props
) => {
  const { onExecute, onInsertChar } = props;
  const { t } = useTranslation();

  return (
    <Toolbar
      variant="dense"
      disableGutters
      sx={{
        gap: 1,
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between",
      }}
    >
      <Stack
        direction="row"
        alignItems="end"
        spacing={4}
        useFlexGap
      >
        <EditorRibbonInsert onInsertChar={onInsertChar} />
        <Typography
          color="primary"
          component="a"
          href="#user-manual"
          sx={{
            textDecorationLine: "underline",
          }}
        >
          {t("editor.howToUse")}
        </Typography>
      </Stack>
      <StyledTooltipButton
        onExecute={onExecute}
        shortcutHint={"CTRL + ENTER"}
      >
        {t("editor.run")}
      </StyledTooltipButton>
    </Toolbar>
  );
};
