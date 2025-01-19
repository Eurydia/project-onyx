import { Playground } from "$components/math/Playground/Playground";
import { TruthTable } from "$components/math/TruthTable/TruthTable";
import { StyledLatex } from "$components/styled/StyledLatex";
import {
  EvaluationStep,
  exprTreeFlattenStepByStep,
} from "$core/exprTreeFlattenStepByStep";
import { exprTreeToLatex } from "$core/tree/expr/latex";
import { ExprTree } from "$types/expression-tree";
import {
  Box,
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
  const [steps, setSteps] = useState<EvaluationStep[]>(
    exprTreeFlattenStepByStep(exprTree, symbolTable)
  );

  const handleSymbolChange = (k: string, v: boolean) => {
    setSymbolTable((prev) => {
      const next = new Map(prev);
      next.set(k, v);
      return next;
    });
    setSteps(
      exprTreeFlattenStepByStep(exprTree, symbolTable)
    );
  };

  useEffect(() => {
    const next = new Map<string, boolean>();
    for (const symbol of symbolSet) {
      next.set(symbol, true);
    }
    setSymbolTable(next);
  }, [symbolSet]);

  useEffect(() => {
    setSteps(
      exprTreeFlattenStepByStep(exprTree, symbolTable)
    );
  }, [exprTree, symbolTable]);

  return (
    <Stack spacing={2}>
      <StyledCard title="Input">
        <Box
          sx={{
            scrollbarWidth: "thin",
            scrollbarGutter: "stable",
            textAlign: "center",
            whiteSpace: "nowrap",
            overflow: "auto",
          }}
        >
          <StyledLatex
            tex={steps.at(-1)!.repr}
            options={{ displayMode: true }}
          />
        </Box>
      </StyledCard>
      <StyledCard title="Output">
        <StyledLatex
          tex={`
            \\textbf{${
              steps.at(-1)!.evaluated ? "True" : "False"
            }}`}
          options={{ displayMode: true }}
        />
        <PlaygroundSymbolConfig
          symbolTable={symbolTable}
          onChange={handleSymbolChange}
        />
      </StyledCard>
      <StyledCard title="Step-by-step Evaluation">
        <StepByStepEvaluation steps={steps} />
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
  (prev, next) =>
    exprTreeToLatex(prev.exprTree) ===
    exprTreeToLatex(next.exprTree)
);
