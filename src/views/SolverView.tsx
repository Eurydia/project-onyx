import { SolverOutputGroup } from "$components/math/SolverOutputGroup";
import { StyledLatex } from "$components/Styled/StyledLatex";
import { StyledOutputCard } from "$components/Styled/StyledOutputCard";
import { exprTreeToLatex } from "$core/tree/expr/latex";
import { SolverRouteLoaderData } from "$types/loader-data";
import { Box, Stack } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { useLoaderData, useSubmit } from "react-router";

export const SolverView: FC = () => {
  const { data, userInput: prevUserInput } =
    useLoaderData() as SolverRouteLoaderData;

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
        action: "/solver",
      }
    );
  };

  return (
    <Box
      maxWidth="lg"
      marginX={{ xs: 4, md: "auto" }}
      paddingY={2}
    >
      <Stack spacing={2}>
        {data.ok && (
          <>
            <StyledOutputCard title="Input Interpretation">
              <StyledLatex>
                {`$$
                ${exprTreeToLatex(data.data.exprTree)}
                $$`}
              </StyledLatex>
            </StyledOutputCard>
            <SolverOutputGroup
              exprTree={data.data.exprTree}
              symbolSet={data.data.symbols}
            />
          </>
        )}
      </Stack>
    </Box>
  );
};
