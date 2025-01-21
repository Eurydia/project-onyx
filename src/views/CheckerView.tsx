import { Editor } from "$components/math/Editor/Editor";
import { StyledLatex } from "$components/styled/StyledLatex";
import { CheckerRouteLoaderData } from "$types/loader-data";
import {
  SyntaxTreeNodeIden,
  SyntaxTreeNodeType,
} from "$types/syntax-tree";
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
  const str: string[] = [];
  if (data.ok) {
    for (const q of data.data.qq) {
      const curr: string[] = [];

      for (const t of q) {
        switch (t.nodeType) {
          case SyntaxTreeNodeType.CONST:
            curr.push(String(t.value));
            break;
          case SyntaxTreeNodeType.IDEN:
            curr.push(String(t.symbol));
            break;
          case SyntaxTreeNodeType.UNARY:
            curr.push(
              `\\lnot ${
                (t.operand as SyntaxTreeNodeIden).symbol
              }`
            );
        }
      }
      str.push(`\\{${curr.join(", ")}\\}`);
    }
  }

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
        {/* {data.ok && (
          <Playground
            exprTree={data.data.exprTree}
            symbolTable={new Map()}
          />
        )} */}
        {data.ok && <StyledLatex tex={str.join(" ")} />}
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
