import MonacoEditor from "@monaco-editor/react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import type { editor } from "monaco-editor";
import { type FC, memo, useCallback, useState } from "react";
import { ActionRibbon } from "./ActionRibbon";
import { EditorRibbon } from "./EditorRibbon";

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

    const edits: editor.IIdentifiedSingleEditOperation[] = selections.map(
      (selection) => ({
        range: selection,
        text,
      }),
    );
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
