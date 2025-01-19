import { Editor } from "$components/math/Editor/Editor";
import { PlaygroundSymbolConfig } from "$components/math/Playground/PlaygroundSymbolConfig";
import { StyledLatex } from "$components/styled/StyledLatex";
import { StyledOutputCard } from "$components/styled/StyledOutputCard";
import {
  exprTreeToLatex,
  exprTreeToLatexSubstitute,
} from "$core/tree/expr/latex";
import { EvaluatorRouteLoaderData } from "$types/loader-data";
import { PlayArrowRounded } from "@mui/icons-material";
import {
  Box,
  Button,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import { FC, useEffect, useState } from "react";
import { useLoaderData, useSubmit } from "react-router";

export const EvaluatorView: FC = () => {
  const {
    symbols,
    data,
    userInput: defaultUserInput,
  } = useLoaderData() as EvaluatorRouteLoaderData;

  const submit = useSubmit();

  const [symbolTable, setSymbolTable] = useState(
    new Map<string, boolean>()
  );
  const [userInput, setUserInput] = useState("");

  useEffect(() => {
    setUserInput(defaultUserInput);
  }, [defaultUserInput]);

  useEffect(() => {
    const table = new Map<string, boolean>();
    for (const symbol of symbols) {
      table.set(symbol, true);
    }
    setSymbolTable(table);
  }, [symbols]);

  const handleSubmit = () => {
    submit(
      {
        input: userInput,
      },
      {
        method: "GET",
        action: "/evaluator",
      }
    );
  };

  return (
    <Box
      maxWidth="lg"
      marginX={{ xs: 2, md: "auto" }}
      paddingY={2}
    >
      <Stack spacing={2}>
        <Editor
          value={userInput}
          onChange={setUserInput}
          placeholder="p and q; p or q; p implies q; p iff q"
        />
        <Button
          disabled={userInput.trim().length === 0}
          disableElevation
          disableRipple
          variant="contained"
          startIcon={<PlayArrowRounded />}
          sx={{
            maxWidth: "fit-content",
          }}
          onClick={handleSubmit}
        >
          RUN
        </Button>

        <StyledOutputCard title="Propositions">
          {symbolTable.size === 0 && (
            <Typography fontStyle="italic">
              No proposition to display.
            </Typography>
          )}
          {symbolTable.size > 0 && (
            <PlaygroundSymbolConfig
              symbolTable={symbolTable}
              onChange={(k, v) =>
                setSymbolTable((prev) => {
                  const next = new Map(prev);
                  next.set(k, v);
                  return next;
                })
              }
            />
          )}
        </StyledOutputCard>
        <StyledOutputCard title="Evaluation">
          {data.length === 0 && (
            <Typography fontStyle="italic">
              No expression to display. Enter an expression
              to evaluate its result.
            </Typography>
          )}
          {data.length > 0 && (
            <Stack
              spacing={2}
              divider={<Divider flexItem />}
            >
              {data.map((expr, index) => (
                <Stack key={"expr" + index}>
                  <StyledLatex
                    tex={`\\text{\\textbf{Equation} 
                        $\\mathbf{${index + 1}}$:
                        }`}
                  />
                  {!expr.ok && (
                    <StyledLatex
                      tex="\text{The evaluator cannot understand this expression.}"
                      sx={{
                        textAlign: "center",
                      }}
                    />
                  )}
                  {expr.ok && (
                    <>
                      <StyledLatex
                        tex={exprTreeToLatex(expr.data)}
                        sx={{
                          textAlign: "center",
                        }}
                      />
                      <StyledLatex
                        tex={exprTreeToLatexSubstitute(
                          expr.data,
                          symbolTable
                        )}
                        sx={{
                          textAlign: "center",
                        }}
                      />
                      <StyledLatex
                        tex={`\\textbf{${expr.data.eval(
                          symbolTable
                        )}}`}
                        sx={{
                          textAlign: "center",
                        }}
                      />
                      <StyledLatex
                        tex={`\\text{$\\therefore 
                          ${exprTreeToLatex(expr.data)}$ is 
                        ${expr.data.eval(symbolTable)}.}`}
                      />
                    </>
                  )}
                </Stack>
              ))}
            </Stack>
          )}
        </StyledOutputCard>
      </Stack>
    </Box>
  );
};
