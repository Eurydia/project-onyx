import { EvaluationDisplayMany } from "$components/EvaluationDisplay";
import { ExpressionCard } from "$components/ExpressionCard";
import { StyledLatex } from "$components/Styled/StyledLatex";
import { TruthTable } from "$components/TruthTable";
import { exprTreeToLatex } from "$core/tree/expr/latex";
import { ExprTree } from "$types/expression-tree";
import { Maybe } from "$types/generic";
import { SymbolTable } from "$types/syntax-tree";
import { InfoRounded } from "@mui/icons-material";
import {
  Alert,
  AlertTitle,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { FC, Fragment, useEffect, useState } from "react";
import { PropositionConfig } from "./PropositionConfig";

type EvaluatorOutputGroupProps = {
  symbolSet: Set<string>;
  expressions: Maybe<{ tree: ExprTree }>[];
};
export const EvaluatorOutputGroup: FC<
  EvaluatorOutputGroupProps
> = (props) => {
  const { symbolSet, expressions } = props;

  const { typography, palette } = useTheme();
  const [symbolTable, setSymbolTable] = useState(() => {
    const next: SymbolTable = new Map();
    for (const symbol of symbolSet) {
      next.set(symbol, true);
    }
    return next;
  });

  useEffect(() => {
    const next: SymbolTable = new Map();
    for (const symbol of symbolSet) {
      next.set(symbol, true);
    }
    setSymbolTable(next);
  }, [symbolSet]);

  const validExpressions = expressions.filter(
    (expr) => expr.ok
  );

  return (
    <Fragment>
      <Typography
        fontWeight={900}
        fontSize={typography.h3.fontSize}
        sx={{ color: palette.primary.dark }}
      >
        {"Evaluation Result"}
      </Typography>
      <PropositionConfig
        value={symbolTable}
        onChange={(k, v) =>
          setSymbolTable((prev) => {
            const next = new Map(prev);
            next.set(k, v);
            return next;
          })
        }
      />
      {validExpressions.length === 0 && (
        <Alert
          icon={false}
          severity="info"
        >
          <AlertTitle>
            <Stack
              direction="row"
              flexWrap="wrap"
              alignItems="flex-end"
              spacing={2}
              useFlexGap
            >
              <InfoRounded />
              <Typography fontWeight={900}>
                {`Notice`}
              </Typography>
            </Stack>
          </AlertTitle>
          <Typography>{`No evaluation result to display.`}</Typography>
        </Alert>
      )}
      {validExpressions.length > 0 &&
        expressions.map((expr, index) => {
          if (!expr.ok) {
            return <Fragment key={"eval" + index} />;
          }
          const result = expr.tree.eval(symbolTable);
          const exprLatex = exprTreeToLatex(expr.tree);
          const itemNum = index + 1;
          return (
            <ExpressionCard
              primary={
                <>
                  <StyledLatex>
                    {`$$${exprLatex} \\tag{${itemNum}}$$`}
                  </StyledLatex>
                  <StyledLatex>
                    {`$$\\equiv\\textbf{${result}}$$`}
                  </StyledLatex>
                </>
              }
              secondary={
                <TruthTable
                  exprTree={expr.tree}
                  slotProps={{
                    container: { maxHeight: "40vh" },
                  }}
                />
              }
            />
          );
        })}
      <Typography
        fontWeight={900}
        fontSize={typography.h3.fontSize}
        sx={{ color: palette.primary.dark }}
      >
        {"Step-by-step Evaluation"}
      </Typography>
      <EvaluationDisplayMany
        symbolTable={symbolTable}
        items={expressions}
      />
    </Fragment>
  );
};
