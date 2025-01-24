import { Editor } from "$components/math/Editor/Editor";
import { StyledLatex } from "$components/styled/StyledLatex";
import { RewriterRouteLoaderData } from "$types/loader-data";
import { Operator } from "$types/operators";
import { PlayArrowRounded } from "@mui/icons-material";
import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Stack,
  Typography,
} from "@mui/material";
import { FC, useEffect, useState } from "react";
import { useLoaderData, useSubmit } from "react-router";

export const RewriteView: FC = () => {
  const { data, userInput: defaultUserInput } =
    useLoaderData() as RewriterRouteLoaderData;
  const [basis, setBasis] = useState(() => {
    const next = new Map<Operator, boolean>();
    for (const operator of Object.values(Operator)) {
      next.set(operator, true);
    }
    return next;
  });
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
        basis: [...basis.entries()]
          .filter(([, v]) => v)
          .map(([k]) => k),
      },
      {
        method: "GET",
        action: "/rewriter",
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

        <FormGroup>
          {Object.values(Operator).map(
            (operator, index) => (
              <FormControlLabel
                key={"operator" + index}
                checked={basis.get(operator)}
                onChange={(_, value) =>
                  setBasis((prev) => {
                    const next = new Map(prev);
                    next.set(operator, value);
                    return next;
                  })
                }
                control={<Checkbox />}
                label={
                  <StyledLatex
                    tex={`\\text{${operator}}`}
                  />
                }
              />
            )
          )}
        </FormGroup>

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
        {data.ok && <StyledLatex tex={data.data} />}
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
