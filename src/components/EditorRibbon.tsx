import { PlayArrowRounded } from "@mui/icons-material";
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
        alignItems: "flex-start",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <Stack
        sx={{ width: "100%" }}
        gap={1}
        useFlexGap
        flexWrap="wrap"
        direction="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <EditorRibbonInsert onInsertChar={onInsertChar} />
        <StyledTooltipButton
          variant="contained"
          startIcon={<PlayArrowRounded />}
          onClick={onExecute}
          title={"CTRL + ENTER"}
        >
          {t("editor.run")}
        </StyledTooltipButton>
      </Stack>
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
    </Toolbar>
  );
};
