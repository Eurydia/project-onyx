import { Editor } from "$components/math/Editor/Editor";
import { Playground } from "$components/math/Playground/Playground";
import { CheckerRouteLoaderData } from "$types/loader-data";
import { PlayArrowRounded } from "@mui/icons-material";
import {
  Alert,
  AlertTitle,
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
      paddingY={4}
    >
      <Stack spacing={2}>
        <Editor
          value={userInput}
          onChange={setUserInput}
          placeholder="not (p and q) iff (not p or not q)"
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
          <Playground
            exprTree={data.data.exprTree}
            symbolTable={new Map()}
          />
        )}
        {!data.ok && defaultUserInput.trim().length > 0 && (
          <Alert
            severity="warning"
            variant="outlined"
          >
            <AlertTitle>
              <Typography>
                The solver cannot understand your input.
              </Typography>
            </AlertTitle>
            <Typography>
              It seems like something is wrong with the
              expression.
            </Typography>
          </Alert>
        )}
      </Stack>
    </Box>
  );
};
