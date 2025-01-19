import { TruthTable } from "$components/math/TruthTable/TruthTable";
import { StyledLatex } from "$components/styled/StyledLatex";
import { exprTreeToLatex } from "$core/tree/expr/latex";
import { ExprTree } from "$types/expression-tree";
import {
  Card,
  CardContent,
  CardHeader,
  Stack,
} from "@mui/material";
import {
  FC,
  memo,
  ReactNode,
  useEffect,
  useState,
} from "react";
import { Playground } from "./Playground/Playground";
import { PlaygroundSymbolConfig } from "./Playground/PlaygroundSymbolConfig";
import { StepByStepEvaluation } from "./StepByStepEvaluation";

type StyledCardProps = {
  title: string;
  children: ReactNode;
};
const StyledCard: FC<StyledCardProps> = (props) => {
  const { children, title } = props;
  return (
    <Card
      variant="outlined"
      sx={{
        padding: 2,
        borderRadius: ({ shape }) => shape.borderRadius,
      }}
    >
      <CardHeader
        title={title}
        titleTypographyProps={{
          fontWeight: 900,
        }}
      />
      <CardContent>{children}</CardContent>
    </Card>
  );
};

type SolverOutputGroupProps = {
  exprTree: ExprTree;
  symbolSet: Set<string>;
};
const SolverOutputGroup_: FC<SolverOutputGroupProps> = (
  props
) => {
  const { exprTree, symbolSet } = props;

  const [symbolTable, setSymbolTable] = useState(() => {
    const next = new Map<string, boolean>();
    for (const symbol of symbolSet) {
      next.set(symbol, true);
    }
    return next;
  });
  // const [steps, setSteps] = useState<EvaluationStep[]>(
  //   exprTreeFlattenStepByStep(exprTree, symbolTable)
  // );

  const handleSymbolChange = (k: string, v: boolean) => {
    setSymbolTable((prev) => {
      const next = new Map(prev);
      next.set(k, v);
      return next;
    });
  };

  useEffect(() => {
    const next = new Map<string, boolean>();
    for (const symbol of symbolSet) {
      next.set(symbol, true);
    }
    setSymbolTable(next);
  }, [symbolSet]);

  return (
    <Stack spacing={2}>
      <StyledCard title="Input">
        <StyledLatex
          tex={exprTreeToLatex(exprTree)}
          sx={{
            scrollbarWidth: "thin",
            scrollbarGutter: "stable",
            textAlign: "center",
            whiteSpace: "nowrap",
            overflow: "auto",
            width: "100%",
            display: "inline-block",
          }}
        />
      </StyledCard>
      <StyledCard title="Output">
        <StyledLatex
          tex={`
            \\textbf{${
              exprTree.eval(symbolTable) ? "True" : "False"
            }}`}
          sx={{
            scrollbarWidth: "thin",
            scrollbarGutter: "stable",
            textAlign: "center",
            whiteSpace: "nowrap",
            overflow: "auto",
            width: "100%",
            display: "inline-block",
          }}
        />
        <PlaygroundSymbolConfig
          symbolTable={symbolTable}
          onChange={handleSymbolChange}
        />
      </StyledCard>
      <StyledCard title="Step-by-step Evaluation">
        <StepByStepEvaluation
          exprTree={exprTree}
          symbolTable={symbolTable}
        />
      </StyledCard>
      <StyledCard title="Graph">
        <Playground
          exprTree={exprTree}
          symbolTable={symbolTable}
        />
      </StyledCard>
      <StyledCard title="Truth Table">
        <TruthTable exprTree={exprTree} />
      </StyledCard>
    </Stack>
  );
};

export const SolverOutputGroup = memo(
  SolverOutputGroup_,
  (prev, next) => {
    const p = exprTreeToLatex(prev.exprTree);
    const n = exprTreeToLatex(next.exprTree);
    return n === p;
  }
);
