import { EditorAcceptedInputFeedback } from "$components/EditorAcceptedInputFeedback";
import { EditorExecuteToolbaGroup } from "$components/EditorExecuteToolbaGroup";
import { EditorExpressionInput } from "$components/EditorExpressionInput";
import { EditorOperatorButtonGroup } from "$components/EditorOperatorButtonToolbarGroup";
import { lexer } from "$core/interpreter/lexer";
import { ASTNode, parser } from "$core/interpreter/parser";
import {
  alpha,
  Container,
  createTheme,
  CssBaseline,
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
  },
  components: {
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
  const [tab, setTab] = useState(0);

  const [inputValue, setInputVlue] = useState(
    "not (p and q) iff (not p) or (not q)"
  );
  const [inputCursorPos, setInputCursorPos] = useState<
    number | null
  >(null);
  const [tree, setTree] = useState<ASTNode | null>(null);

  const handleExecute = () => {
    const tokens = lexer(inputValue);
    if (tokens.length === 0) {
      setTree(null);
      return;
    }
    const tree = parser(tokens);
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
          <EditorOperatorButtonGroup
            onInsertChar={handleInsertChar}
          />
          <EditorExpressionInput
            value={inputValue}
            onChange={setInputVlue}
            onKeyDown={handleKeyDown}
            onCursorMove={setInputCursorPos}
            rows={5}
          />
          <EditorExecuteToolbaGroup
            onExecute={handleExecute}
            keyCombinationHint={["CTRL", "ENTER"]}
          />
          <EditorAcceptedInputFeedback
            tree={tree}
            emptyMessage="Evaluate an expression to see how it is interpreted."
          />

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
