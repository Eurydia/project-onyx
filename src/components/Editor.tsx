import { PlayArrowRounded } from "@mui/icons-material";
import { Stack, Toolbar, Typography } from "@mui/material";
import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { EditorRibbon } from "./EditorRibbon";
import { EditorTextField } from "./EditorTextField";
import { StyledTooltipButton } from "./StyledTooltipButton";

type EditorProps = {
  // operators: Map<Operator, boolean>;
  onExecute: (value: string) => void;
  // onOperatorChange: (k: Operator, v: boolean) => void;
};
export const Editor: FC<EditorProps> = (props) => {
  const {
    onExecute,
    // onOperatorChange,
    // operators,
  } = props;
  const { t } = useTranslation();

  const [value, setValue] = useState(
    "not (p and q) iff (not p) or (not q)"
  );

  const handleExecute = () => {
    onExecute(value);
  };

  const handleInsertChar = (char: string) => {
    setValue((prev) => `${prev} ${char}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && e.ctrlKey) {
      handleExecute();
    }
  };

  return (
    <Stack spacing={1}>
      <EditorRibbon
        // onExecute={handleExecute}
        onInsertChar={handleInsertChar}
      />
      <EditorTextField
        placeholder="ex. not (p and q) iff (not p) or (not q)"
        value={value}
        onChange={setValue}
        onKeyDown={handleKeyDown}
        rows={5}
      />
      <Toolbar
        variant="dense"
        disableGutters
        sx={{
          display: "flex",
          flexWrap: "wrap",
          direction: "row",
          gap: 4,
        }}
      >
        <StyledTooltipButton
          variant="contained"
          startIcon={<PlayArrowRounded />}
          onClick={handleExecute}
          title={"CTRL + ENTER"}
        >
          {t("editor.run")}
        </StyledTooltipButton>
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
      {/* <EditorSimplConfigGroup
        values={operators}
        onChange={onOperatorChange}
      /> */}
    </Stack>
  );
};
