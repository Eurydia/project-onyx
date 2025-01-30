import {
  CheckRounded,
  ContentCopyRounded,
  PlayArrowRounded,
} from "@mui/icons-material";
import { Button, Stack, TextField } from "@mui/material";
import {
  Dispatch,
  FC,
  memo,
  SyntheticEvent,
  useRef,
  useState,
} from "react";
import { useTranslation } from "react-i18next";
import { EditorRibbon } from "./EditorRibbon";

type EditorProps = {
  placeholder: string;
  value: string;
  onChange: Dispatch<string>;
  onSubmit: () => void;
};
const Editor_: FC<EditorProps> = (props) => {
  const { placeholder, value, onChange, onSubmit } = props;

  const { t } = useTranslation("component", {
    keyPrefix: "editor",
  });
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [hasCopied, setHasCopied] = useState(false);
  const [cursorStartPos, setCusorStartPos] = useState(0);
  const [cursorEndPos, setCusorEndPos] = useState(0);

  const handleInsertChar = (text: string) => {
    if (inputRef.current === null) {
      return;
    }
    const left = value.slice(0, cursorStartPos);
    const right = value.slice(cursorEndPos);

    onChange(`${left}${text}${right}`);
    setCusorStartPos(`${left}${text}`.length);
    setCusorEndPos(`${left}${text}`.length);
    setHasCopied(false);
  };

  const handleSelect = (
    e: SyntheticEvent<HTMLDivElement, Event>
  ) => {
    const target = e.target as HTMLInputElement;
    setCusorStartPos(target.selectionStart ?? 0);
    setCusorEndPos(target.selectionEnd ?? 0);
  };

  return (
    <Stack spacing={1}>
      <EditorRibbon onClick={handleInsertChar} />
      <TextField
        inputRef={inputRef}
        fullWidth
        multiline
        rows={5}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        slotProps={{
          input: {
            sx: {
              fontFamily: "monospace",
            },
          },
          htmlInput: {
            autoCapitalize: "off",
            spellCheck: "false",
            onSelect: handleSelect,
          },
        }}
      />
      <Stack
        spacing={1}
        useFlexGap
        flexWrap="wrap"
        direction="row"
      >
        <Button
          disabled={value.trim().length === 0}
          variant="contained"
          startIcon={<PlayArrowRounded />}
          onClick={() => {
            setHasCopied(false);
            onSubmit();
          }}
        >
          {t("run")}
        </Button>
        <Button
          startIcon={
            !hasCopied ? (
              <ContentCopyRounded />
            ) : (
              <CheckRounded />
            )
          }
          variant="outlined"
          onClick={() => {
            navigator.clipboard.writeText(value);
            setHasCopied(true);
          }}
        >
          {!hasCopied ? t("copy") : t("copied")}
        </Button>
      </Stack>
    </Stack>
  );
};

export const Editor = memo(
  Editor_,
  (prev, next) => prev.value === next.value
);
