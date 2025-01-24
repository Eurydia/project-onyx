import { Editor } from "$components/math/Editor/Editor";
import { SolverOutputGroup } from "$components/math/SolverOutputGroup";
import { SolverRouteLoaderData } from "$types/loader-data";
import {
  PlayArrowRounded,
  WarningRounded,
} from "@mui/icons-material";
import {
  Alert,
  Box,
  Button,
  Stack,
  Typography,
} from "@mui/material";
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
          <SolverOutputGroup
            exprTree={data.data.exprTree}
            symbolSet={data.data.symbols}
          />
        )}
        {!data.ok && prevUserInput.trim().length > 0 && (
          <Alert
            icon={<WarningRounded />}
            severity="warning"
            variant="outlined"
          >
            <Typography>
              The solver cannot understand your input.
              Please make sure the expression is correct and
              try again.
            </Typography>
          </Alert>
        )}
      </Stack>
    </Box>
  );
};
