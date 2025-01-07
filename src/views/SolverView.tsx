import { Editor } from "$components/Editor";
import { Playground } from "$components/Playground";
import { StyledLatex } from "$components/StyledLatex";
import { LatexDisplay } from "$components/StyledLatexDisplay";
import { TruthTable } from "$components/TruthTable";
import { parse } from "$core/interpreter/parser";
import {
  syntaxTreetoExprTree,
  syntaxTreeToLatex,
} from "$core/tree/conversion";
import { SyntaxTree } from "$types/ast";
import { Maybe } from "$types/common";
import {
  Alert,
  AlertTitle,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { FC, ReactNode, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

export const SolverView: FC = () => {
  const { t } = useTranslation("translation");
  const { shape } = useTheme();
  const [maybeTree, setTree] = useState<Maybe<
    SyntaxTree,
    string
  > | null>(null);

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
      padding={2}
    >
      <Alert
        severity="info"
        icon={false}
        sx={{
          padding: 2,
          borderRadius: shape.borderRadius,
        }}
      >
        <AlertTitle>How to use?</AlertTitle>
        TMP
      </Alert>
      <Editor onExecute={handleExecute} />
      <LatexDisplay
        text={text}
        error={maybeTree !== null && !maybeTree.ok}
      />
      {exprTree !== null && (
        <Stack
          spacing={2}
          paddingY={4}
        >
          <Typography
            fontSize="x-large"
            fontWeight={800}
          >
            {t("view.solver.graph.title")}
          </Typography>
          <Playground exprTree={exprTree} />
          <Typography
            fontSize="x-large"
            fontWeight={800}
          >
            {t("view.solver.truthTable.title")}
          </Typography>
          <TruthTable exprTree={exprTree} />
        </Stack>
      )}
    </Stack>
  );
};
