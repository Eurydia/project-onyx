import { Playground } from "$components/math/Playground/Playground";
import { TruthTable } from "$components/math/TruthTable/TruthTable";
import { StyledAlert } from "$components/styled/StyledAlert";
import { StyledLatex } from "$components/styled/StyledLatex";
import {
  EvaluationStep,
  exprTreeFlattenStepByStep,
} from "$core/exprTreeFlattenStepByStep";
import { ExprTree } from "$types/expression-tree";
import {
  Card,
  CardContent,
  CardHeader,
  Stack,
  Typography,
} from "@mui/material";
import { FC, ReactNode, useEffect, useState } from "react";
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
      elevation={0}
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

type SolverSolvedViewProps = {
  exprTree: ExprTree;
  symbolSet: Set<string>;
};
export const SolverSolvedView: FC<SolverSolvedViewProps> = (
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
    <Stack spacing={4}>
      <StyledCard title="Input">
        <StyledLatex
          tex={steps.at(-1)!.expr}
          options={{ displayMode: true }}
        />
      </StyledCard>
      <StyledCard title="Output">
        <StyledLatex
          tex={`\\textbf{${steps.at(-1)!.evaluated}}`}
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
        <StyledAlert severity="info">
          <Typography>
            Use re-center button in case you cannot find the
            graph
          </Typography>
        </StyledAlert>
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
