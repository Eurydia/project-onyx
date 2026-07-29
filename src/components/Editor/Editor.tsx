import MonacoEditor from "@monaco-editor/react";
import CheckRounded from "@mui/icons-material/CheckRounded";
import ContentCopyRounded from "@mui/icons-material/ContentCopyRounded";
import PlayArrowRounded from "@mui/icons-material/PlayArrowRounded";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import type { editor } from "monaco-editor";
import { type FC, memo, useCallback, useState } from "react";
import * as m from "$/paraglide/messages.js";
import { EditorRibbon } from "./EditorRibbon";

export const CopyButton: FC<{
  onClick: () => void;
}> = (props) => {
  const { onClick } = props;
  const [hasCopied, setHasCopied] = useState(false);

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
      sx={(theme) => ({
        "&:hover": {
          color: theme.palette.getContrastText(theme.palette.primary.main),
          backgroundColor: theme.palette.primary.main,
        },
        color: theme.palette.primary.dark,
        backgroundColor: theme.palette.primary.light,
      })}
    >
      {hasCopied
        ? m["components.editor.copied"]()
        : m["components.editor.copy"]()}
    </Button>
  );
};

const ActionRibbon: FC<{
  onSubmit: () => void;
  onCopy: () => void;
}> = (props) => {
  const { onSubmit, onCopy } = props;

  return (
    <Stack
      direction="row"
      spacing={1}
      sx={{ flexWrap: "wrap" }}
    >
      <Button
        startIcon={<PlayArrowRounded />}
        onClick={onSubmit}
        sx={(theme) => ({
          "&:hover": {
            color: theme.palette.getContrastText(theme.palette.primary.main),
            backgroundColor: theme.palette.primary.main,
          },
          color: theme.palette.primary.dark,
          backgroundColor: theme.palette.primary.light,
        })}
      >
        {m["components.editor.run"]()}
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
