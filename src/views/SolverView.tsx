import { Editor } from "$components/Editor";
import { Playground } from "$components/Playground";
import { StyledLatex } from "$components/StyledLatex";
import { LatexDisplay } from "$components/StyledLatexDisplay";
import { TruthTable } from "$components/TruthTable";
import { parse } from "$core/interpreter/parser";
import { syntaxTreeToLatex } from "$core/tree/conversion";
import { SyntaxTree } from "$types/ast";
import { Maybe } from "$types/common";
import {
  Alert,
  AlertTitle,
  Stack,
  useTheme,
} from "@mui/material";
import { FC, ReactNode, useState } from "react";
import { useTranslation } from "react-i18next";

export const SolverView: FC = () => {
  const { t } = useTranslation("translation");
  const { shape } = useTheme();
  const [activeTab, setActiveTab] = useState(0);
  const [tree, setTree] = useState<Maybe<
    SyntaxTree,
    string
  > | null>(null);

  const handleExecute = (value: string) => {
    if (value.trim().length === 0) {
      setActiveTab(0);
      setTree(null);
      return;
    }
    const maybeTree = parse(value);
    setTree(maybeTree);
    if (!maybeTree.ok) {
      setActiveTab(0);
    }
  };

  let text: ReactNode = t(
    "view.solver.feedback.noExpression"
  );
  if (tree !== null) {
    if (tree.ok) {
      text = (
        <StyledLatex tex={syntaxTreeToLatex(tree.data)} />
      );
    } else {
      text = tree.other;
    }
  }

  const isTreeReady = tree !== null && tree.ok;

  return (
    <Stack
      maxWidth="lg"
      margin="auto"
      useFlexGap
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
        error={tree !== null && !tree.ok}
      />

      <Playground maybeTree={tree} />
      <TruthTable maybeTree={tree} />
    </Stack>
  );
};
