import { AcceptedInputFeedback } from "$components/AcceptedInputFeedback";
import { ExpressionInput } from "$components/ExpressionInput";
import { OperatorButton } from "$components/OperatorButton";
import { StyledKBD } from "$components/StyledKBD";
import { Lexer } from "$core/interpreter/lexer";
import { ASTNode, parse } from "$core/interpreter/parser";
import { PlayArrowRounded } from "@mui/icons-material";
import {
  Button,
  ButtonGroup,
  Container,
  createTheme,
  CssBaseline,
  GlobalStyles,
  Stack,
  ThemeProvider,
  Toolbar,
  Typography,
} from "@mui/material";
import { brown } from "@mui/material/colors";
import { FC, useState } from "react";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: brown,
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

const BINARY_OP_REPR: {
  name: string;
  alias: string[];
  label: string;
  insertChar: string;
}[] = [
  {
    name: "Negation",
    label: "\\lnot",
    alias: ["not"],
    insertChar: "\u{00AC}",
  },
  {
    name: "Conjunction",
    alias: ["and"],
    label: "\\land",
    insertChar: "\u{2227}",
  },
  {
    name: "Disjunction",
    alias: ["or"],
    label: "\\lor",
    insertChar: "\u{2228}",
  },
  {
    name: "Implication",
    alias: ["implies"],
    label: "\\implies",
    insertChar: "\u{21D2}",
  },
  {
    name: "Equivalence",
    alias: ["iff"],
    label: "\\iff",
    insertChar: "\u{21D4}",
  },
];

export const App: FC = () => {
  const [tab, setTab] = useState(0);

  const [inputValue, setInputVlue] = useState("");
  const [inputCursorPos, setInputCursorPos] = useState<
    number | null
  >(null);
  const [tree, setTree] = useState<ASTNode | null>(null);

  const handleExecute = () => {
    const l = new Lexer(inputValue);
    const tokens = l.lex();
    if (tokens.length === 0) {
      setTree(null);
      return;
    }
    const tree = parse(tokens);
    setTree(tree);
  };

  const handleInsertChar = (char: string) => {
    if (inputCursorPos === null) {
      return;
    }
    setInputVlue((prev) => {
      const before = prev.slice(0, inputCursorPos);
      const after = prev.slice(inputCursorPos);
      return `${before}${char}${after}`;
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {globalStyles}
      <Container maxWidth="lg">
        <Stack
          spacing={1}
          useFlexGap
          padding={2}
          minHeight="100vh"
        >
          <Toolbar
            disableGutters
            variant="dense"
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: 2,
              flexWrap: "wrap",
            }}
          >
            <ButtonGroup disableElevation>
              {BINARY_OP_REPR.map((repr, index) => (
                <OperatorButton
                  key={"op-btn" + index}
                  alias={repr.alias}
                  name={repr.name}
                  label={repr.label}
                  onClick={() =>
                    handleInsertChar(repr.insertChar)
                  }
                />
              ))}
            </ButtonGroup>
          </Toolbar>

          <ExpressionInput
            value={inputValue}
            onChange={setInputVlue}
            onExecute={handleExecute}
            onCursorMove={setInputCursorPos}
            rows={5}
          />

          <Toolbar
            variant="dense"
            disableGutters
            sx={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              gap: 2,
            }}
          >
            <Button
              disableElevation
              variant="contained"
              startIcon={<PlayArrowRounded />}
              onClick={handleExecute}
            >
              Run
            </Button>

            <Typography>or</Typography>
            <Stack
              useFlexGap
              gap={(t) => t.spacing(0.5)}
              spacing={0.5}
              direction="row"
              alignItems="center"
            >
              <StyledKBD>CTRL</StyledKBD>
              <Typography>+</Typography>
              <StyledKBD>ENTER</StyledKBD>
            </Stack>
          </Toolbar>

          <AcceptedInputFeedback
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
