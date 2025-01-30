import { Editor } from "$components/Editor/Editor";
import { StyledLatex } from "$components/Styled/StyledLatex";
import { StyledOutputCard } from "$components/Styled/StyledOutputCard";
import { EvaluatorRouteLoaderData } from "$types/loader-data";
import { Box, Stack } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { useLoaderData, useSubmit } from "react-router";

export const EvaluatorView: FC = () => {
  const {
    symbols,
    expressions,
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
        {expressions.some((expr) => expr.success) && (
          <>
            <StyledOutputCard title="Input Interpretation">
              <Stack spacing={2}>
                {expressions.map((expr, index) => {
                  return (
                    <StyledLatex key={"expr" + index}>
                      {`$$\\text{qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq}$$`}
                    </StyledLatex>
                  );
                })}
              </Stack>
            </StyledOutputCard>
            {/* <EvaluatorOutputGroup
              symbolSet={symbols}
              items={data}
            /> */}
          </>
        )}
      </Stack>
    </Box>
  );
};
