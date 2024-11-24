import { DisplayInputFeedback } from "$components/DisplayInputFeedback";
import { DisplayPlayground } from "$components/DisplayPlayground";
import { EditorInputExecuteToolbarGroup } from "$components/EditorInputExecuteToolbaGroup";
import { EditorInputExpressionTextField } from "$components/EditorInputExpressionTextField";
import { EditorInputOperatorButtonToolbarGroup } from "$components/EditorInputOperatorButtonToolbarGroup";
import { EditorInputPropositionGroup } from "$components/EditorInputPropositionGroup";
import { lexer } from "$core/interpreter/lexer";
import { parser } from "$core/interpreter/parser";
import { ASTNode, IdentifierTable } from "$types/parser";
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

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {globalStyles}
      <Container maxWidth="lg">
        <Stack
          useFlexGap
          spacing={1}
          padding={2}
          minHeight="100vh"
        >
          <EditorInputOperatorButtonToolbarGroup
            onInsertChar={handleInsertChar}
          />
          <EditorInputExpressionTextField
            value={inputValue}
            onChange={setInputVlue}
            onKeyDown={handleKeyDown}
            onCursorMove={setInputCursorPos}
            rows={5}
          />
          <EditorInputExecuteToolbarGroup
            onExecute={handleExecute}
            keyCombinationHint={["CTRL", "ENTER"]}
          />
          <DisplayInputFeedback
            tree={tree}
            emptyMessage="Evaluate an expression to see how it is interpreted."
          />
          {tree !== null && idenTable !== null && (
            <Stack
              flexDirection="row"
              spacing={1}
              useFlexGap
              divider={
                <Divider
                  orientation="vertical"
                  flexItem
                  variant="middle"
                />
              }
            >
              <Box width="fit-content">
                <EditorInputPropositionGroup
                  idenTable={idenTable}
                  onIdenChange={(k, v) =>
                    setIdentifierTable((prev) => {
                      if (prev === null) {
                        return null;
                      }
                      const next = { ...prev };
                      next[k] = v;
                      return next;
                    })
                  }
                />
              </Box>
              <DisplayPlayground
                identifierTable={idenTable!}
                tree={tree!}
              />
            </Stack>
          )}
        </Stack>
      </Container>
    </ThemeProvider>
  );
};
