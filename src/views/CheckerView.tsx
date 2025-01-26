import { Editor } from "$components/math/Editor/Editor";
import { StyledLatex } from "$components/styled/StyledLatex";
import { StyledOutputCard } from "$components/styled/StyledOutputCard";
import { CheckerRouteLoaderData } from "$types/loader-data";
import { PlayArrowRounded } from "@mui/icons-material";
import {
  Alert,
  Box,
  Button,
  Stack,
  Typography,
} from "@mui/material";
import { FC, useEffect, useState } from "react";
import { useLoaderData, useSubmit } from "react-router";

export const CheckerView: FC = () => {
  const { data, userInput: defaultUserInput } =
    useLoaderData() as CheckerRouteLoaderData;
  const submit = useSubmit();
  const [userInput, setUserInput] = useState(
    defaultUserInput
  );

  useEffect(() => {
    setUserInput(defaultUserInput);
  }, [defaultUserInput]);

  const handleSubmit = () => {
    submit(
      {
        input: userInput,
      },
      {
        method: "GET",
        action: "/checker",
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
          placeholder="not (p and q) iff (not p or not q)"
        />
        <Button
          disabled={userInput.trim().length === 0}
          variant="contained"
          startIcon={<PlayArrowRounded />}
          onClick={handleSubmit}
        >
          RUN
        </Button>
        {data.ok && (
          <>
            <StyledOutputCard title="Input Intepretation">
              <StyledLatex
                displayMode
                tex={data.data.input}
              />
            </StyledOutputCard>
            <StyledOutputCard title="Verdict">
              {data.data.verdict.constant && (
                <StyledLatex
                  tex={
                    data.data.verdict.value
                      ? `\\text{The expression is a tautology.}`
                      : `\\text{The expression is a contradiction.}`
                  }
                />
              )}
              {!data.data.verdict.constant && (
                <StyledLatex
                  tex={`\\text{The expression is not a tautology. Its truth value depends on $${[
                    ...data.data.verdict.dependencies,
                  ]
                    .toSorted()
                    .join(",")}$.}`}
                />
              )}
            </StyledOutputCard>
          </>
        )}
        {!data.ok && defaultUserInput.trim().length > 0 && (
          <Alert
            severity="warning"
            variant="outlined"
          >
            <Typography>
              The checker cannot understand your input.
              Please make sure that it is correct and try
              again.
            </Typography>
          </Alert>
        )}
      </Stack>
    </Box>
  );
};
