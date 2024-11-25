import { DisplayInputFeedback } from "$components/DisplayInputFeedback";
import { DisplayTreeGraph } from "$components/DisplayTreeGraph";
import { EditorBooleanSwitcher } from "$components/EditorBooleanSwitcherGroup";
import { EditorExecuteToolbarGroup } from "$components/EditorExecuteToolbaGroup";
import { EditorExpressionTextField } from "$components/EditorExpressionTextField";
import { EditorOperatorToolbarGroup } from "$components/EditorOperatorToolbarGroup";
import { lexer } from "$core/interpreter/lexer";
import { parser } from "$core/interpreter/parser";
import {
  ASTNode,
  ASTNodeType,
  IdentifierTable,
} from "$types/parser";
import {
  alpha,
  Box,
  Container,
  createTheme,
  CssBaseline,
  Divider,
  GlobalStyles,
  Stack,
  ThemeProvider,
} from "@mui/material";
import { brown } from "@mui/material/colors";
import { FC, useState } from "react";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: brown,
    background: {
      paper: alpha(brown["800"], 0.9),
    },
  },
  components: {
    MuiList: {
      defaultProps: {
        disablePadding: true,
        dense: true,
      },
    },
    MuiListItem: {
      defaultProps: {
        dense: true,
      },
    },
    MuiTooltip: {
      styleOverrides: {
        arrow: ({ theme: t }) => ({
          color: t.palette.background.paper,
        }),
        tooltip: ({ theme: t }) => ({
          backgroundColor: t.palette.background.paper,
        }),
      },
    },
  },
});

const globalStyles = (
  <GlobalStyles
    styles={{
      tableLayout: "auto",
      borderCollapse: "collapse",
    }}
  />
);

export const App: FC = () => {
  const [inputValue, setInputVlue] = useState(
    "not (p and q) iff (not p) or (not q)"
  );
  const [inputCursorPos, setInputCursorPos] = useState<
    number | null
  >(null);
  const [tree, setTree] = useState<ASTNode | null>(null);
  const [idenTable, setIdentifierTable] =
    useState<IdentifierTable | null>(null);

  const handleExecute = () => {
    const tokens = lexer(inputValue);
    if (tokens.length === 0) {
      setTree(null);
      setIdentifierTable({});
      return;
    }
    const { tree, identifierTable } = parser(tokens);
    if (tree.nodeType === ASTNodeType.ERROR) {
      setTree(null);
      setIdentifierTable(null);
      return;
    }
    setIdentifierTable(identifierTable);
    setTree(tree);
  };

  const handleInsertChar = (char: string) => {
    if (inputCursorPos === null) {
      return;
    }
    setInputVlue((prev) => {
      let before = prev.slice(0, inputCursorPos);
      if (before.length > 0) {
        before = `${before} `;
      }

      let after = prev.slice(inputCursorPos);
      if (after.length > 0) {
        after = ` ${after}`;
      }
      return `${before}${char}${after}`;
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && e.ctrlKey) {
      handleExecute();
    }
  };

  const handleIdenChange = (k: string, v: boolean) =>
    setIdentifierTable((prev) => {
      if (prev === null) {
        return null;
      }
      const next = { ...prev };
      next[k] = v;
      return next;
    });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {globalStyles}
      <Container maxWidth="lg">
        <Stack
          useFlexGap
          spacing={1}
          padding={2}
        >
          <EditorOperatorToolbarGroup
            onInsertChar={handleInsertChar}
          />
          <EditorExpressionTextField
            value={inputValue}
            onChange={setInputVlue}
            onKeyDown={handleKeyDown}
            onCursorMove={setInputCursorPos}
            rows={5}
          />
          <EditorExecuteToolbarGroup
            onExecute={handleExecute}
            keyCombinationHint={["CTRL", "ENTER"]}
          />
          <DisplayInputFeedback
            tree={tree}
            emptyMessage="Evaluate an expression to see how it is interpreted."
          />

          <Stack
            height="75vh"
            maxHeight={800}
            useFlexGap
            flexDirection="row"
            divider={
              <Divider
                flexItem
                variant="middle"
                orientation="vertical"
              />
            }
            borderRadius={2}
            borderColor={(t) =>
              alpha(t.palette.primary.main, 0.2)
            }
            sx={{
              borderStyle: "solid",
              borderWidth: 4,
            }}
          >
            {idenTable !== null && (
              <Box
                minWidth="fit-content"
                overflow="auto"
                sx={{
                  scrollbarGutter: "stable",
                }}
              >
                <EditorBooleanSwitcher
                  idenTable={idenTable}
                  onIdenChange={handleIdenChange}
                />
              </Box>
            )}
            <Box
              flexGrow={1}
              height="100%"
            >
              <DisplayTreeGraph
                idenTable={idenTable}
                tree={tree}
              />
            </Box>
          </Stack>
        </Stack>
      </Container>
    </ThemeProvider>
  );
};
