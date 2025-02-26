import MonacoEditor from "@monaco-editor/react";
import {
  CheckRounded,
  ContentCopyRounded,
  PlayArrowRounded,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Stack,
  useTheme,
} from "@mui/material";
import { editor } from "monaco-editor";
import {
  Dispatch,
  FC,
  memo,
  useCallback,
  useState,
} from "react";
import { useTranslation } from "react-i18next";
import { EditorRibbon } from "./EditorRibbon";

type CopyButtonProps = {
  onClick: () => void;
};
export const CopyButton: FC<CopyButtonProps> = (props) => {
  const { onClick } = props;
  const [hasCopied, setHasCopied] = useState(false);
  const { palette } = useTheme();
  const { t } = useTranslation("components", {
    keyPrefix: "editor",
  });
  return (
    <Button
      disableElevation
      disableRipple
      startIcon={
        !hasCopied ? (
          <ContentCopyRounded />
        ) : (
          <CheckRounded />
        )
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
          color: palette.getContrastText(
            palette.primary.main
          ),
          backgroundColor: palette.primary.main,
        },
        "color": palette.primary.dark,
        "backgroundColor": palette.primary.light,
      }}
    >
      {!hasCopied ? t("copy") : t("copied")}
    </Button>
  );
};

type ActionRibbonProps = {
  onSubmit: () => void;
  onCopy: () => void;
  onClear: () => void;
};
const ActionRibbon: FC<ActionRibbonProps> = (props) => {
  const { onSubmit, onCopy, onClear } = props;
  const { palette } = useTheme();
  const { t } = useTranslation("components", {
    keyPrefix: "editor",
  });
  return (
    <Stack
      spacing={1}
      useFlexGap
      flexWrap="wrap"
      direction="row"
    >
      <Button
        disableElevation
        disableRipple
        startIcon={<PlayArrowRounded />}
        onClick={onSubmit}
        sx={{
          "&:hover": {
            color: palette.getContrastText(
              palette.primary.main
            ),
            backgroundColor: palette.primary.main,
          },
          "color": palette.primary.dark,
          "backgroundColor": palette.primary.light,
        }}
      >
        {t("run")}
      </Button>
      <CopyButton onClick={onCopy} />
    </Stack>
  );
};

type EditorProps = {
  placeholder: string;
  value: string;
  onChange: Dispatch<string>;
  onSubmit: () => void;
};
const Editor_: FC<EditorProps> = (props) => {
  const { placeholder, value, onChange, onSubmit } = props;
  // const [cursorStartPos, setCusorStartPos] = useState(0);
  // const [cursorEndPos, setCusorEndPos] = useState(0);

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
      selections.map((s) => ({
        range: s,
        text,
      }));
    monacoInstance.executeEdits("insert", edits);
    monacoInstance.focus();
  };

  const handleOnMount = useCallback(
    (instance: editor.IStandaloneCodeEditor) => {
      setMonacoInstance(instance);
    },
    []
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
          onChange={(event) => onChange(event || "")}
          height="200px"
          options={{
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
          navigator.clipboard.writeText(value);
        }}
        onClear={() => {
          onChange("");
        }}
      />
    </Stack>
  );
};

export const Editor = memo(
  Editor_,
  (prev, next) =>
    prev.value === next.value &&
    prev.onSubmit === next.onSubmit
);
