import { Editor } from "$components/Editor/Editor";
import { InputDisplayMany } from "$components/InputTable";
import { EvaluatorOutputGroup } from "$components/math/EvaluatorOutputGroup";
import { StyledOutputCard } from "$components/Styled/StyledOutputCard";
import { exprTreeFromSyntaxTree } from "$core/tree/conversion";
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
      <Stack spacing={4}>
        <Editor
          value={userInput}
          onChange={setUserInput}
          placeholder="p and q, p or q, p implies q, p iff q"
          onSubmit={handleSubmit}
        />
        {prevUserInput.trim().length > 0 && (
          <>
            <StyledOutputCard title="Input Interpretation">
              <InputDisplayMany expressions={expressions} />
            </StyledOutputCard>
            <EvaluatorOutputGroup
              symbolSet={symbols}
              expressions={expressions.map((expr) =>
                expr.ok
                  ? {
                      ok: true,
                      tree: exprTreeFromSyntaxTree(
                        expr.tree
                      ),
                    }
                  : { ok: false }
              )}
            />
          </>
        )}
      </Stack>
    </Box>
  );
};
