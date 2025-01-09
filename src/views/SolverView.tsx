import {
  default as userManualEN,
  default as userManualTH,
} from "$assets/manual/solver-manual/en.txt";
import { Editor } from "$components/common/Editor/Editor";
import { Playground } from "$components/common/Playground/Playground";
import { TruthTable } from "$components/common/TruthTable/TruthTable";
import { StyledLatex } from "$components/styled/StyledLatex";
import { StyledMarkdown } from "$components/styled/StyledMarkdown";
import { parse } from "$core/interpreter/parser";
import {
  syntaxTreetoExprTree,
  syntaxTreeToLatex,
} from "$core/tree/conversion";
import { useFetchMarkdown } from "$hooks/useFetchMarkdown";
import { SyntaxTree } from "$types/ast";
import { Maybe } from "$types/common";
import { Paper, Stack, Typography } from "@mui/material";
import { FC, ReactNode, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

export const SolverView: FC = () => {
  const { t, i18n } = useTranslation("translation");
  const [maybeTree, setTree] = useState<Maybe<
    SyntaxTree,
    string
  > | null>(null);

  const userManual = useFetchMarkdown(
    i18n.language === "th" ? userManualTH : userManualEN
  );

  const handleExecute = (value: string) => {
    if (value.trim().length === 0) {
      setTree(null);
      return;
    }
    const maybeTree = parse(value);
    setTree(maybeTree);
  };

  let text: ReactNode = t(
    "view.solver.feedback.noExpression"
  );
  if (maybeTree !== null) {
    if (maybeTree.ok) {
      text = (
        <StyledLatex
          tex={syntaxTreeToLatex(maybeTree.data)}
        />
      );
    } else {
      text = maybeTree.other;
    }
  }

  const exprTree = useMemo(() => {
    if (maybeTree !== null && maybeTree.ok) {
      return syntaxTreetoExprTree(maybeTree.data);
    }
    return null;
  }, [maybeTree]);

  return (
    <Stack
      useFlexGap
      maxWidth="lg"
      margin="auto"
      spacing={1}
    >
      <Editor onExecute={handleExecute} />
      <Paper
        variant="outlined"
        sx={{
          padding: 4,
          display: "flex",
          flexDirection: "column",
          gap: 1,
        }}
      >
        <Typography
          fontWeight="bold"
          variant="h6"
          component="span"
        >
          Input
        </Typography>
        <Typography>{text}</Typography>
      </Paper>
      {exprTree !== null && (
        <>
          <Paper
            variant="outlined"
            sx={{
              padding: 4,
            }}
          >
            <Typography
              fontWeight="bold"
              variant="h6"
              component="div"
            >
              Visualize
            </Typography>
            <Playground exprTree={exprTree} />
          </Paper>
          <Paper
            variant="outlined"
            sx={{
              padding: 4,
            }}
          >
            <Typography
              fontWeight="bold"
              variant="h6"
              component="div"
            >
              Evaluation
            </Typography>
          </Paper>
          <Paper
            variant="outlined"
            sx={{
              padding: 4,
            }}
          >
            <Typography
              fontWeight="bold"
              variant="h6"
              component="div"
            >
              Truth table
            </Typography>
            <TruthTable exprTree={exprTree} />
          </Paper>
        </>
      )}
      <StyledMarkdown children={userManual} />
    </Stack>
  );
};
