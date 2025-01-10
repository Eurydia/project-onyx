import {
  default as userManualEN,
  default as userManualTH,
} from "$assets/manual/solver-manual/en.txt";
import { Editor } from "$components/common/Editor/Editor";
import { Playground } from "$components/common/Playground/Playground";
import { PlaygroundSymbolConfig } from "$components/common/Playground/PlaygroundSymbolConfig";
import { TruthTable } from "$components/common/TruthTable/TruthTable";
import { StyledAlert } from "$components/styled/StyledAlert";
import { StyledLatex } from "$components/styled/StyledLatex";
import { StyledMarkdown } from "$components/styled/StyledMarkdown";
import { parse } from "$core/interpreter/parser";
import {
  syntaxTreetoExprTree,
  syntaxTreeToLatex,
} from "$core/tree/conversion";
import { exprTreeCollectSymbols } from "$core/tree/expr/evaluate";
import { exprTreeToLatex } from "$core/tree/expr/latex";
import { useFetchMarkdown } from "$hooks/useFetchMarkdown";
import { SyntaxTree } from "$types/ast";
import { Maybe } from "$types/common";
import {
  Box,
  Divider,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import {
  FC,
  ReactNode,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useTranslation } from "react-i18next";

export const SolverView: FC = () => {
  const { t, i18n } = useTranslation("translation");
  const [maybeTree, setTree] = useState<Maybe<
    SyntaxTree,
    string
  > | null>(null);

  const userManual = useFetchMarkdown(
    i18n.language === "th" ? userManualTH : userManualEN
  );

  const handleExecute = (value: string) => {
    if (value.trim().length === 0) {
      setTree(null);
      return;
    }
    const maybeTree = parse(value);
    setTree(maybeTree);
  };

  let text: ReactNode = (
    <Typography>
      {t("view.solver.feedback.noExpression")}
    </Typography>
  );
  if (maybeTree !== null) {
    if (maybeTree.ok) {
      text = (
        <StyledLatex
          tex={syntaxTreeToLatex(maybeTree.data)}
        />
      );
    } else {
      text = <Typography>{maybeTree.other}</Typography>;
    }
  }

  const exprTree = useMemo(() => {
    if (maybeTree !== null && maybeTree.ok) {
      return syntaxTreetoExprTree(maybeTree.data);
    }
    return null;
  }, [maybeTree]);

  useEffect(() => {
    if (exprTree === null) {
      return;
    }
    setSymbolTable(() => {
      const next = new Map<string, boolean>();
      for (const symbol of exprTreeCollectSymbols(
        exprTree
      )) {
        next.set(symbol, true);
      }
      return next;
    });
  }, [exprTree]);

  const [symbolTable, setSymbolTable] = useState(
    new Map<string, boolean>()
  );

  const handleSymbolChange = (k: string, v: boolean) => {
    setSymbolTable((prev) => {
      const next = new Map(prev);
      next.set(k, v);
      return next;
    });
  };

  return (
    <Stack
      useFlexGap
      maxWidth="lg"
      margin="auto"
      spacing={1}
    >
      <Editor onExecute={handleExecute} />
      <Paper
        variant="outlined"
        sx={{
          padding: 4,
          display: "flex",
          flexDirection: "column",
          gap: 1,
        }}
      >
        <Typography
          fontWeight="bold"
          variant="h6"
          component="span"
        >
          Input
        </Typography>
        {text}
      </Paper>
      {exprTree !== null && (
        <>
          <Paper
            variant="outlined"
            sx={{
              padding: 4,
            }}
          >
            <Typography
              fontWeight="bold"
              variant="h6"
              component="div"
            >
              Output
            </Typography>
            <Divider flexItem />
            <Typography
              fontWeight="bold"
              variant="h6"
              component="div"
            >
              Modify propositions
            </Typography>
            <PlaygroundSymbolConfig
              symbolTable={symbolTable}
              onChange={handleSymbolChange}
            />
            <Divider flexItem />
            <Typography
              fontWeight="bold"
              variant="h6"
              component="div"
            >
              Solution
            </Typography>
            <StyledLatex
              options={{
                displayMode: true,
              }}
              tex={
                exprTreeToLatex(exprTree) +
                `\\text{ $\\equiv$ True}`
              }
            />
            <Typography
              fontWeight="bold"
              component="div"
              variant="h6"
            >
              Step-by-step
            </Typography>
            <Stack
              spacing={1}
              divider={<Divider />}
            >
              <Box>
                <Typography fontWeight="bold">
                  Step 1
                </Typography>
                <StyledLatex
                  tex="p\land q"
                  options={{ displayMode: true }}
                />
                <Typography>Evaluate normally,</Typography>
                <StyledLatex
                  tex="\begin{align*}p\land q&\equiv\text{True}\land\text{True}\\&\equiv\text{True}.\end{align*}"
                  options={{
                    displayMode: true,
                    leqno: false,
                    fleqn: false,
                  }}
                />
              </Box>
              <Box>
                <Typography fontWeight="bold">
                  Step 2
                </Typography>
                <StyledLatex
                  tex="\lnot(p \land q)"
                  options={{ displayMode: true }}
                />
                <Typography>
                  From step (1),{" "}
                  <StyledLatex tex="\text{$p\land q\equiv$ True}" />{" "}
                  then
                </Typography>
                <StyledLatex
                  tex="\begin{align*}\lnot(p \land q)&\equiv \lnot(\text{True})\\&\equiv\text{False}.\end{align*}"
                  options={{ displayMode: true }}
                />
              </Box>
              <Box>
                <Typography fontWeight="bold">
                  Step 3
                </Typography>
                <StyledLatex
                  tex="\lnot p"
                  options={{ displayMode: true }}
                />
                <Typography>Evaluate normally,</Typography>
                <StyledLatex
                  tex="\begin{align*}\lnot p&\equiv \lnot\text{True}\\&\equiv\text{False}.\end{align*}"
                  options={{ displayMode: true }}
                />
              </Box>
              <Box>
                <Typography fontWeight="bold">
                  Step 4
                </Typography>
                <StyledLatex
                  tex="\lnot q"
                  options={{ displayMode: true }}
                />
                <Typography>Evaluate normally,</Typography>
                <StyledLatex
                  tex="\begin{align*}\lnot q&\equiv \lnot\text{True}\\&\equiv\text{False}.\end{align*}"
                  options={{ displayMode: true }}
                />
              </Box>
              <Box>
                <Typography fontWeight="bold">
                  Step 5
                </Typography>
                <StyledLatex
                  tex="\lnot p\lor \lnot q"
                  options={{ displayMode: true }}
                />
                <ul>
                  <li>
                    <Typography>
                      From step (3),{" "}
                      <StyledLatex tex="\lnot p \equiv \text{False}." />
                    </Typography>
                  </li>
                  <li>
                    <Typography>
                      From step (4),{" "}
                      <StyledLatex tex="\lnot q \equiv \text{False}." />
                    </Typography>
                  </li>
                </ul>
                Substitute into expression
                <StyledLatex
                  tex="\begin{align*}\lnot p\lor \lnot q&\equiv \text{False}\lor\text{False}\\&\equiv\text{False}.\end{align*}"
                  options={{ displayMode: true }}
                />
              </Box>
              <Box>
                <Typography fontWeight="bold">
                  Step 6
                </Typography>
                <StyledLatex
                  tex="\lnot(p\land q)\iff(\lnot p\lor \lnot q)"
                  options={{ displayMode: true }}
                />
                <ul>
                  <li>
                    <Typography>
                      From step (2),{" "}
                      <StyledLatex tex="\lnot (p\land q) \equiv \text{False}." />
                    </Typography>
                  </li>
                  <li>
                    <Typography>
                      From step (5),{" "}
                      <StyledLatex tex="\lnot p\lor\lnot q \equiv \text{False}." />
                    </Typography>
                  </li>
                </ul>
                Substitute into expression
                <StyledLatex
                  tex="\begin{align*}\lnot(p\land q)\iff(\lnot p\lor \lnot q)&\equiv\text{False}\iff\text{False}\\&\equiv\text{True}.\end{align*}"
                  options={{ displayMode: true }}
                />
              </Box>
            </Stack>
          </Paper>
          <Paper
            variant="outlined"
            sx={{
              padding: 4,
            }}
          >
            <Typography
              fontWeight="bold"
              variant="h6"
              component="div"
            >
              Graph
            </Typography>
            <StyledAlert severity="info">
              <Typography>
                Use re-center button in case you cannot find
                the graph
              </Typography>
            </StyledAlert>
            <Playground exprTree={exprTree} />
          </Paper>

          <Paper
            variant="outlined"
            sx={{
              padding: 4,
            }}
          >
            <Typography
              fontWeight="bold"
              variant="h6"
              component="div"
            >
              Truth table
            </Typography>
            <TruthTable exprTree={exprTree} />
          </Paper>
        </>
      )}
      <Box marginY={32}>
        <StyledMarkdown children={userManual} />
      </Box>
    </Stack>
  );
};
