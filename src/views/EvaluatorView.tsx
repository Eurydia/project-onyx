import { Editor } from "$components/Editor/Editor";
import { EvaluatorOutputGroup } from "$components/math/EvaluatorOutputGroup";
import { StyledLatex } from "$components/Styled/StyledLatex";
import { StyledOutputCard } from "$components/Styled/StyledOutputCard";
import { exprTreeToLatex } from "$core/tree/expr/latex";
import { EvaluatorRouteLoaderData } from "$types/loader-data";
import { Box, Stack, Typography } from "@mui/material";
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
          onSubmit={handleSubmit}
        />
        {data.length > 0 && data.some(({ ok }) => ok) && (
          <>
            <StyledOutputCard title="Input Interpretation">
              <Stack spacing={2}>
                {data.map((expr, index) => {
                  if (!expr.ok) {
                    return (
                      <Typography>{`The evaluator could not understand this expression.`}</Typography>
                    );
                  }
                  const latexRepr = exprTreeToLatex(
                    expr.data
                  );
                  const marker = index + 1;
                  return (
                    <StyledLatex key={"expr" + index}>
                      {`$$${latexRepr} \\tag{${marker}}$$`}
                    </StyledLatex>
                  );
                })}
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
