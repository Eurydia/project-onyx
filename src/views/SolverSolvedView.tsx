import { Playground } from "$components/math/Playground/Playground";
import { PlaygroundSymbolConfig } from "$components/math/Playground/PlaygroundSymbolConfig";
import { TruthTable } from "$components/math/TruthTable/TruthTable";
import { StyledAlert } from "$components/styled/StyledAlert";
import { StyledLatex } from "$components/styled/StyledLatex";
import {
  EvaluationStep,
  exprTreeFlattenStepByStep,
} from "$core/exprTreeFlattenStepByStep";
import { exprTreeToLatex } from "$core/tree/expr/latex";
import { SolverRouteLoaderData } from "$types/loader-data";
import {
  Box,
  Divider,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLoaderData } from "react-router";

export const SolverSolvedView: FC = () => {
  const { data } = useLoaderData() as SolverRouteLoaderData;
  const { t } = useTranslation();

  const [symbolTable, setSymbolTable] = useState(() => {
    const next = new Map<string, boolean>();
    if (data.ok) {
      for (const symbol of data.data.symbols) {
        next.set(symbol, true);
      }
    }
    return next;
  });
  const [steps, setSteps] = useState<EvaluationStep[]>([]);

  const handleSymbolChange = (k: string, v: boolean) => {
    setSymbolTable((prev) => {
      const next = new Map(prev);
      next.set(k, v);
      return next;
    });
    setSteps(
      data.ok
        ? exprTreeFlattenStepByStep(
            data.data.exprTree,
            symbolTable
          )
        : []
    );
  };

  const feedback = data.ok ? (
    <StyledLatex
      tex={exprTreeToLatex(data.data.exprTree)}
    />
  ) : (
    <Typography>
      {t("view.solver.feedback.noExpression")}
    </Typography>
  );

  return (
    <Box
      maxWidth="lg"
      marginX="auto"
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <Paper
        elevation={0}
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
        {feedback}
      </Paper>
      {data.ok && (
        <>
          <Paper
            elevation={0}
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
            <StyledLatex
              options={{
                displayMode: true,
              }}
              tex={`\\text{${
                data.data.exprTree.eval(symbolTable)
                  ? "True"
                  : "False"
              }}`}
            />
            <Divider flexItem />
            <PlaygroundSymbolConfig
              symbolTable={symbolTable}
              onChange={handleSymbolChange}
            />
          </Paper>
          <Paper
            elevation={0}
            sx={{ padding: 4 }}
          >
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
              {steps.map((step, index) => (
                <Box key={"step" + index}>
                  <Typography fontWeight="bold">
                    Step {index + 1}
                  </Typography>
                  <StyledLatex
                    tex={step.expr}
                    options={{ displayMode: true }}
                  />
                  {step.relatedSteps.length >= 1 && (
                    <>
                      <Typography>
                        Substitute into expression
                      </Typography>
                      <ul>
                        {step.relatedSteps.map(
                          (relatedStep, index) => (
                            <li key={"substep" + index}>
                              <Typography
                                sx={{
                                  display: "flex",
                                  flexDirection: "row",
                                  gap: 1,
                                }}
                              >
                                From step {relatedStep + 1}:
                                <StyledLatex
                                  tex={`${steps[relatedStep].expr}\\equiv${steps[relatedStep].evaluated}`}
                                />
                              </Typography>
                            </li>
                          )
                        )}
                      </ul>
                    </>
                  )}
                  <StyledLatex
                    tex={`\\begin{align*}${step.expr}&\\equiv${step.substituted}\\\\ &\\equiv${step.evaluated}.\\end{align*}`}
                    options={{
                      displayMode: true,
                      leqno: false,
                      fleqn: false,
                    }}
                  />
                </Box>
              ))}
            </Stack>
          </Paper>
          <Paper
            elevation={0}
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
            <Playground
              exprTree={data.data.exprTree}
              symbolTable={symbolTable}
            />
          </Paper>
          <Paper
            elevation={0}
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
            <TruthTable exprTree={data.data.exprTree} />
          </Paper>
        </>
      )}
    </Box>
  );
};
