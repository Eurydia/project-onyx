import MonacoEditor from "@monaco-editor/react";
import CheckRounded from "@mui/icons-material/CheckRounded";
import ContentCopyRounded from "@mui/icons-material/ContentCopyRounded";
import PlayArrowRounded from "@mui/icons-material/PlayArrowRounded";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { useTheme } from "@mui/material/styles";
import type { editor } from "monaco-editor";
import { type FC, memo, useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { EditorRibbon } from "./EditorRibbon";

export const CopyButton: FC<{
  onClick: () => void;
}> = (props) => {
  const { onClick } = props;
  const [hasCopied, setHasCopied] = useState(false);
  const { palette } = useTheme();
  const { t } = useTranslation("components", {
    keyPrefix: "editor",
  });

  return (
    <Button
      startIcon={
        hasCopied ? <CheckRounded /> : <ContentCopyRounded />
      }
      onClick={() => {
        onClick();
        setHasCopied(true);
        setTimeout(() => {
          setHasCopied(false);
        }, 1000);
      }}
      sx={{
        "&:hover": {
          color: palette.getContrastText(palette.primary.main),
          backgroundColor: palette.primary.main,
        },
        color: palette.primary.dark,
        backgroundColor: palette.primary.light,
      }}
    >
      {hasCopied ? t("copied") : t("copy")}
    </Button>
  );
};

const ActionRibbon: FC<{
  onSubmit: () => void;
  onCopy: () => void;
}> = (props) => {
  const { onSubmit, onCopy } = props;
  const { palette } = useTheme();
  const { t } = useTranslation("components", {
    keyPrefix: "editor",
  });

  return (
    <Stack
      direction="row"
      spacing={1}
      sx={{ flexWrap: "wrap" }}
    >
      <Button
        startIcon={<PlayArrowRounded />}
        onClick={onSubmit}
        sx={{
          "&:hover": {
            color: palette.getContrastText(palette.primary.main),
            backgroundColor: palette.primary.main,
          },
          color: palette.primary.dark,
          backgroundColor: palette.primary.light,
        }}
      >
        {t("run")}
      </Button>
      <CopyButton onClick={onCopy} />
    </Stack>
  );
};

export const Editor: FC<{
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
}> = memo((props) => {
  const { placeholder, value, onChange, onSubmit } = props;
  const [monacoInstance, setMonacoInstance] =
    useState<editor.IStandaloneCodeEditor | null>(null);

  const handleInsertChar = (text: string) => {
    if (monacoInstance === null) {
      return;
    }

    const selections = monacoInstance.getSelections();
    if (selections === null) {
      return;
    }

    const edits: editor.IIdentifiedSingleEditOperation[] =
      selections.map((selection) => ({
        range: selection,
        text,
      }));
    monacoInstance.executeEdits("insert", edits);
    monacoInstance.focus();
  };

  const handleOnMount = useCallback(
    (instance: editor.IStandaloneCodeEditor) => {
      setMonacoInstance(instance);
    },
    [],
  );

  return (
    <Stack spacing={1}>
      <EditorRibbon onClick={handleInsertChar} />
      <Box
        sx={{
          borderStyle: "solid",
          borderWidth: 1,
          borderColor: "grey.500",
        }}
      >
        <MonacoEditor
          onMount={handleOnMount}
          value={value}
          onChange={(event) => onChange(event ?? "")}
          height="200px"
          options={{
            placeholder,
            scrollBeyondLastLine: false,
            minimap: { enabled: false },
            bracketPairColorization: { enabled: true },
            matchBrackets: "always",
            wordWrap: "on",
            fontFamily: "monospace",
            autoClosingBrackets: "always",
            quickSuggestions: false,
            fontSize: 18,
          }}
        />
      </Box>
      <ActionRibbon
        onSubmit={onSubmit}
        onCopy={() => {
          void navigator.clipboard.writeText(value);
        }}
      />
    </Stack>
  );
});
