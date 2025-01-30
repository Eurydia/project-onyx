import { Editor } from "$components/Editor/Editor";
import { CheckerOutputGroup } from "$components/math/CheckerOutputGroup";
import { StyledLatex } from "$components/Styled/StyledLatex";
import { StyledOutputCard } from "$components/Styled/StyledOutputCard";
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
  const loaderData =
    useLoaderData() as CheckerRouteLoaderData;

  const { success, userInput: prevUserInput } = loaderData;
  const submit = useSubmit();

  const [userInput, setUserInput] = useState(prevUserInput);

  useEffect(() => {
    setUserInput(userInput);
  }, [userInput]);

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
        {success && (
          <>
            <StyledOutputCard title="Input Intepretation">
              <StyledLatex>
                {`$$${loaderData.inputLatex}$$`}
              </StyledLatex>
            </StyledOutputCard>
            <CheckerOutputGroup tree={loaderData.result} />
          </>
        )}
        {!success && prevUserInput.trim().length > 0 && (
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
