import { Editor } from "$components/Editor/Editor";
import { StyledLatex } from "$components/Styled/StyledLatex";
import { StyledOutputCard } from "$components/Styled/StyledOutputCard";
import { operatorToLatex } from "$core/operator";
import { syntaxTreeToLatex } from "$core/syntax-tree/to-latex";
import { RewriterRouteLoaderData } from "$types/loader-data";
import { Operator } from "$types/operators";
import {
  Alert,
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Stack,
  Typography,
} from "@mui/material";
import { FC, useEffect, useState } from "react";
import { useLoaderData, useSubmit } from "react-router";

export const RewriteView: FC = () => {
  const loaderData =
    useLoaderData() as RewriterRouteLoaderData;
  const { ok, userInput: prevUserInput } = loaderData;
  const [basis, setBasis] = useState(() => {
    const next = new Map<Operator, boolean>();
    for (const operator of Object.values(Operator)) {
      next.set(operator, true);
    }
    return next;
  });
  const submit = useSubmit();
  const [userInput, setUserInput] = useState(prevUserInput);

  useEffect(() => {
    setUserInput(prevUserInput);
  }, [prevUserInput]);

  const handleSubmit = () => {
    console.debug(
      [...basis.entries()]
        .filter(([, isIncluded]) => isIncluded)
        .map(([k]) => k)
    );
    submit(
      {
        input: userInput,
        basis: [...basis.entries()]
          .filter(([, isIncluded]) => isIncluded)
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
          onSubmit={handleSubmit}
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
                  <StyledLatex>
                    {`$${operatorToLatex(operator)}$`}
                  </StyledLatex>
                }
              />
            )
          )}
        </FormGroup>
        {ok && (
          <>
            <StyledOutputCard title="Input Intepretation">
              <StyledLatex>
                {`$$${loaderData.inputLatex}$$`}
              </StyledLatex>
            </StyledOutputCard>
            <StyledOutputCard title="Output">
              {!loaderData.rewritten.ok && (
                <Typography>
                  {`The application could not rewrite the expression into the desired basis.`}
                </Typography>
              )}
              {loaderData.rewritten.ok && (
                <StyledLatex>
                  {`The expression is rewritten to $$${syntaxTreeToLatex(
                    loaderData.rewritten.tree
                  )}$$ in the $\\{${[...loaderData.basis]
                    .map(operatorToLatex)
                    .join(",")}\\}$ basis.`}
                </StyledLatex>
              )}
            </StyledOutputCard>
          </>
        )}
        {!ok && prevUserInput.trim().length > 0 && (
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
