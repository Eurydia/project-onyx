import {
  default as userManualEN,
  default as userManualTH,
} from "$assets/manual/solver-manual/en.txt";
import { Editor } from "$components/common/Editor/Editor";
import { Playground } from "$components/common/Playground/Playground";
import { TruthTable } from "$components/common/TruthTable/TruthTable";
import { StyledAlert } from "$components/styled/StyledAlert";
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
import {
  alpha,
  Box,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { FC, ReactNode, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

export const SolverView: FC = () => {
  const { t, i18n } = useTranslation("translation");
  const { shape, palette } = useTheme();
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
      padding={2}
    >
      <Editor onExecute={handleExecute} />
      <StyledAlert
        variant="outlined"
        severity={
          maybeTree !== null && !maybeTree.ok
            ? "error"
            : "success"
        }
      >
        <Typography>{text}</Typography>
      </StyledAlert>
      {exprTree !== null && (
        <Stack
          spacing={2}
          sx={{
            marginRight: {
              xs: 8,
              md: 0,
            },
          }}
        >
          <Typography
            fontSize="larger"
            fontWeight={900}
            sx={{
              padding: 4,
              borderRadius: shape.borderRadius,
              backgroundColor: alpha(
                palette.secondary.light,
                0.5
              ),
            }}
          >
            {t("view.solver.graph.title")}
          </Typography>
          <Playground exprTree={exprTree} />
          <Typography
            fontSize="larger"
            fontWeight={900}
            sx={{
              padding: 4,
              borderRadius: shape.borderRadius,
              backgroundColor: alpha(
                palette.secondary.light,
                0.5
              ),
            }}
          >
            {t("view.solver.truthTable.title")}
          </Typography>
          <TruthTable exprTree={exprTree} />
        </Stack>
      )}
      <Typography
        id="user-manual"
        fontSize="larger"
        fontWeight={900}
        sx={{
          padding: 4,
          borderRadius: shape.borderRadius,
          backgroundColor: alpha(
            palette.secondary.light,
            0.5
          ),
        }}
      >
        User Manual
      </Typography>
      <Box>
        <StyledMarkdown children={userManual} />
      </Box>
    </Stack>
  );
};
