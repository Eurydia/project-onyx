import { PlayArrowRounded } from "@mui/icons-material";
import { Stack } from "@mui/material";
import { FC, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { EditorRibbon } from "./EditorRibbon";
import { EditorTextField } from "./EditorTextField";
import { StyledTooltipButton } from "./StyledTooltipButton";

type EditorProps = {
  onExecute: (value: string) => void;
};
export const Editor: FC<EditorProps> = (props) => {
  const { onExecute } = props;
  const { t } = useTranslation();

  const inputRef = useRef<HTMLInputElement | null>(null);
  const [value, setValue] = useState(
    "not (p and q) iff (not p) or (not q)"
  );

  const handleExecute = () => {
    onExecute(value);
  };

  const handleInsertChar = (char: string) => {
    setValue((prev) => `${prev} ${char}`);
    if (inputRef !== null && inputRef.current !== null) {
      inputRef.current.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && e.ctrlKey) {
      handleExecute();
    }
  };

  return (
    <Stack spacing={1}>
      <EditorRibbon onInsertChar={handleInsertChar} />
      <EditorTextField
        ref={inputRef}
        placeholder="not (p and q) iff (not p) or (not q)"
        value={value}
        onChange={setValue}
        onKeyDown={handleKeyDown}
        rows={5}
      />
      <StyledTooltipButton
        variant="contained"
        startIcon={<PlayArrowRounded />}
        onClick={handleExecute}
        title={"CTRL + ENTER"}
      >
        {t("editor.run")}
      </StyledTooltipButton>
    </Stack>
  );
};
