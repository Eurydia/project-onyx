import { Editor } from "$components/math/Editor/Editor";
import { EvaluatorOutputGroup } from "$components/math/EvaluatorOutputGroup";
import { StyledLatex } from "$components/styled/StyledLatex";
import { StyledOutputCard } from "$components/styled/StyledOutputCard";
import { exprTreeToLatex } from "$core/tree/expr/latex";
import { EvaluatorRouteLoaderData } from "$types/loader-data";
import { PlayArrowRounded } from "@mui/icons-material";
import { Box, Button, Stack } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { useLoaderData, useSubmit } from "react-router";

export const EvaluatorView: FC = () => {
  const {
    symbols,
    data,
    userInput: prevUserInput,
  } = useLoaderData() as EvaluatorRouteLoaderData;

  const submit = useSubmit();
  const [userInput, setUserInput] = useState(prevUserInput);

  useEffect(() => {
    setUserInput(prevUserInput);
  }, [prevUserInput]);

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
          variant="contained"
          startIcon={<PlayArrowRounded />}
          onClick={handleSubmit}
        >
          RUN
        </Button>
        {data.length > 0 && data.some(({ ok }) => ok) && (
          <>
            <StyledOutputCard title="Input Interpretation">
              <Stack spacing={2}>
                {data.map((expr, index) => (
                  <Stack
                    key={"expr" + index}
                    spacing={0.5}
                  >
                    <StyledLatex
                      tex={`\\textbf{Equation ${
                        index + 1
                      }:} `}
                    />
                    <StyledLatex
                      displayMode
                      tex={
                        expr.ok
                          ? exprTreeToLatex(expr.data)
                          : "\\text{The evaluator could not understand this expression.}"
                      }
                    />
                  </Stack>
                ))}
              </Stack>
            </StyledOutputCard>
            <EvaluatorOutputGroup
              symbolSet={symbols}
              items={data}
            />
          </>
        )}
      </Stack>
    </Box>
  );
};
