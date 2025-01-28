import { Editor } from "$components/Editor/Editor";
import { StyledLatex } from "$components/Styled/StyledLatex";
import { StyledOutputCard } from "$components/Styled/StyledOutputCard";
import { exprTreeToLatex } from "$core/tree/expr/latex";
import { RewriterRouteLoaderData } from "$types/loader-data";
import { Operator } from "$types/operators";
import { PlayArrowRounded } from "@mui/icons-material";
import {
  Alert,
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

        <FormGroup row>
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
                control={<Checkbox disableRipple />}
                label={
                  <StyledLatex>{`${operator} `}</StyledLatex>
                }
                slotProps={{
                  typography: {
                    textTransform: "lowercase",
                  },
                }}
              />
            )
          )}
        </FormGroup>

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
              <StyledLatex>
                {`$$${data.data.inputLatex}$$`}
              </StyledLatex>
            </StyledOutputCard>
            <StyledOutputCard title="Output">
              {!data.data.rewritten.ok && (
                <Typography>
                  {`The application could not rewrite the expression into the desired basis.`}
                </Typography>
              )}
              {data.data.rewritten.ok && (
                <StyledLatex>
                  {`The expression is rewritten to`}
                  {`$$${exprTreeToLatex(
                    data.data.rewritten.data
                  )}$$`}
                  {`\\text{in the \\{${[
                    ...data.data.basis,
                  ].join(",")}\\} basis.}`}
                </StyledLatex>
              )}
            </StyledOutputCard>
          </>
        )}
        {!data.ok && defaultUserInput.trim().length > 0 && (
          <Alert
            severity="warning"
            variant="outlined"
          >
            <Typography>Something went wrong</Typography>
          </Alert>
        )}
      </Stack>
    </Box>
  );
};
