import { PlayArrowRounded } from "@mui/icons-material";
import { Stack, TextField } from "@mui/material";
import { FC, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { StyledTooltipButton } from "../../styled/StyledTooltipButton";
import { EditorRibbon } from "./EditorRibbon";

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
      <TextField
        inputRef={inputRef}
        fullWidth
        multiline
        rows={5}
        value={value}
        placeholder="not (p and q) iff (not p) or (not q)"
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        slotProps={{
          input: {
            autoComplete: "off",
            autoCorrect: "off",
            autoCapitalize: "none",
            spellCheck: false,
            sx: {
              fontFamily: "monospace",
            },
          },
        }}
      />
      <StyledTooltipButton
        variant="contained"
        startIcon={<PlayArrowRounded />}
        onClick={handleExecute}
        title={t("component.common.editor.run.tooltip")}
      >
        {t("component.common.editor.run.label")}
      </StyledTooltipButton>
    </Stack>
  );
};
