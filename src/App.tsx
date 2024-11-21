import { PlayArrowRounded } from "@mui/icons-material";
import {
  Box,
  Button,
  ButtonGroup,
  Container,
  CssBaseline,
  FormControl,
  FormControlLabel,
  FormLabel,
  GlobalStyles,
  Radio,
  RadioGroup,
  Stack,
  Tab,
  Tabs,
  TextField,
  ThemeProvider,
  Toolbar,
  Typography,
} from "@mui/material";
import createThemeNoVars from "@mui/material/styles/createThemeNoVars";
import { FC, useState } from "react";
import { AboutBlog } from "./blogs/AboutBlog/AboutBlog";
import { BinaryTruthTable } from "./components/BinaryTruthTable";
import { Latex } from "./components/Latex";
import { OperatorButton } from "./components/OperatorButton";
import { UnaryTruthTable } from "./components/UnaryTruthTable";

const theme = createThemeNoVars({
  typography: {
    fontFamily: "monospace",
  },
});

const BINARY_OP_REPR: {
  symbol: string;
  op: (x: boolean, y: boolean) => boolean;
  name: string;
  alias: string;
}[] = [
  {
    symbol: "\\land",
    op: (x, y) => x && y,
    name: "Conjunction",
    alias: "and",
  },
  {
    symbol: "\\lor",
    op: (x, y) => x || y,
    name: "Disjunction",
    alias: "or",
  },
  {
    symbol: "\\implies",
    op: (x, y) => (x && !y ? false : true),
    name: "Implication",
    alias: "implies",
  },
  {
    symbol: "\\iff",
    op: (x, y) => x === y,
    name: "Equivalence",
    alias: "iff",
  },
];

const BooleanSwicher: FC = () => {
  return (
    <FormControl
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        flexWrap: "wrap",
        gap: 4,
      }}
    >
      <FormLabel>
        <Latex tex="p" />
      </FormLabel>
      <RadioGroup
        row
        defaultValue="true"
      >
        <FormControlLabel
          value="true"
          control={<Radio disableRipple />}
          label="true"
        />
        <FormControlLabel
          value="false"
          control={<Radio disableRipple />}
          label="false"
        />
      </RadioGroup>
    </FormControl>
  );
};

export const App: FC = () => {
  const [tab, setTab] = useState(0);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles
        styles={{
          tableLayout: "auto",
          borderCollapse: "collapse",
        }}
      />
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
            <ButtonGroup>
              <OperatorButton
                alias="not"
                name="Negation"
                label={"\u{00AC}"}
                truthTable={
                  <UnaryTruthTable
                    operator={(x) => !x}
                    symbol={"\u{00AC}"}
                  />
                }
              />
            </ButtonGroup>
            <ButtonGroup disableElevation>
              {BINARY_OP_REPR.map((repr, index) => (
                <OperatorButton
                  key={"binary" + index}
                  alias={repr.alias}
                  name={repr.name}
                  label={repr.symbol}
                  truthTable={
                    <BinaryTruthTable
                      operator={repr.op}
                      symbol={repr.symbol}
                    />
                  }
                />
              ))}
            </ButtonGroup>
          </Toolbar>
          <TextField
            multiline
            rows={5}
            fullWidth
          />
          <Toolbar
            variant="dense"
            disableGutters
            sx={{
              justifyContent: "space-between",
              display: "flex",
              flexDirection: "row",
              gap: 2,
              flexWrap: "wrap",
            }}
          >
            <Button
              disableElevation
              variant="contained"
              startIcon={<PlayArrowRounded />}
            >
              Run
            </Button>
          </Toolbar>
          <Box>
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
                  <BooleanSwicher />
                  <BooleanSwicher />
                  <BooleanSwicher />
                  <BooleanSwicher />
                  <BooleanSwicher />
                  <BooleanSwicher />
                  <BooleanSwicher />
                  <BooleanSwicher />
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
                Visualizer
              </Box>
            )}
          </Box>
        </Stack>
      </Container>
      <Box
        sx={{
          height: "100vh",
          padding: 4,
          backgroundColor: "primary.light",
        }}
      >
        <AboutBlog />
      </Box>
    </ThemeProvider>
  );
};

