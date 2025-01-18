import { Editor } from "$components/math/Editor/Editor";
import { SolverSolvedView } from "$components/math/SolverSolvedView";
import { SolverRouteLoaderData } from "$types/loader-data";
import { PlayArrowRounded } from "@mui/icons-material";
import { Box, Button, Divider, Stack } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { useLoaderData, useSubmit } from "react-router";

export const SolverView: FC = () => {
  const { data, userInput: defaultUserInput } =
    useLoaderData() as SolverRouteLoaderData;
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
        action: "/solver",
      }
    );
  };

  return (
    <Box
      maxWidth="lg"
      marginX="auto"
    >
      <Stack spacing={2}>
        <Editor
          value={userInput}
          onChange={setUserInput}
          placeholder="not (p and q) iff (not p or not q)"
          name="content"
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
        {data.ok && (
          <>
            <Divider flexItem />
            <SolverSolvedView
              exprTree={data.data.exprTree}
              symbolSet={data.data.symbols}
            />
          </>
        )}
      </Stack>
    </Box>
  );
};
