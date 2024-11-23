import { DisplayInputFeedback } from "$components/DisplayInputFeedback";
import { DisplayPlayground } from "$components/DisplayPlayground";
import { EditorInputExecuteToolbarGroup } from "$components/EditorInputExecuteToolbaGroup";
import { EditorInputExpressionTextField } from "$components/EditorInputExpressionTextField";
import { EditorInputOperatorButtonToolbarGroup } from "$components/EditorInputOperatorButtonToolbarGroup";
import { EditorInputPropositionGroup } from "$components/EditorInputPropositionGroup";
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
  GlobalStyles,
  Stack,
  Tab,
  Tabs,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { brown } from "@mui/material/colors";
import { FC, useState } from "react";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: brown,
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
        arrow: {
          color: alpha(brown["800"], 0.9),
        },
        tooltip: {
          backgroundColor: alpha(brown["800"], 0.9),
        },
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
  const [tab, setTab] = useState<number>(0);

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

  const isTreeInvalid =
    tree === null || tree.nodeType === ASTNodeType.ERROR;

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
          <Tabs
            variant="scrollable"
            value={tab}
            onChange={(_, value) => setTab(value)}
          >
            <Tab
              value={1}
              disabled={isTreeInvalid}
              label={
                <Typography
                  sx={{
                    textDecoration: isTreeInvalid
                      ? "line-through"
                      : undefined,
                  }}
                >
                  Evaluate
                </Typography>
              }
            />
            <Tab
              value={2}
              disabled={isTreeInvalid}
              label={
                <Typography
                  sx={{
                    textDecoration: isTreeInvalid
                      ? "line-through"
                      : undefined,
                  }}
                >
                  Visualize
                </Typography>
              }
            />
          </Tabs>
          {tab === 1 && (
            <Stack flexDirection="row">
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
              <Box
                flexGrow={1}
                sx={{
                  borderWidth: 1,
                  borderStyle: "solid",
                  borderColor: "primary.main",
                  overflowX: "auto",
                }}
              >
                <DisplayPlayground
                  identifierTable={idenTable!}
                  tree={tree!}
                />
              </Box>
            </Stack>
          )}

          {/* <Box>
            <Tabs
              variant="scrollable"
              value={tab}
              onChange={(_, value) => setTab(value)}
            >
              <Tab
                disableRipple
                label="Evaluator"
                value={0}
              />
              <Tab
                disableRipple
                label="Visualizer"
                value={1}
              />
            </Tabs>
            {tab === 0 && (
              <Stack
                flexDirection="row"
                maxHeight="100vh"
              >
                <Stack
                  flexGrow={0}
                  width="fit-content"
                >
                  <Typography>Propositions</Typography>
                  <BooleanSwicher />
                </Stack>
                <Box
                  sx={{
                    borderWidth: 1,
                    borderStyle: "solid",
                    borderColor: "primary.main",
                  }}
                  flexGrow={1}
                >
                  <Typography>Output</Typography>
                </Box>
              </Stack>
            )}
            {tab === 1 && (
              <Box
                sx={{
                  padding: 2,
                  borderWidth: 1,
                  borderStyle: "solid",
                  borderColor: "black",
                }}
              >
                <Tree tree={tree} />
              </Box>
            )}
          </Box> */}
        </Stack>
      </Container>
    </ThemeProvider>
  );
};
