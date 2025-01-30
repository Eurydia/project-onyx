import { StyledLatex } from "$components/Styled/StyledLatex";
import { StyledOutputCard } from "$components/Styled/StyledOutputCard";
import { syntaxTreeCollectSymbols } from "$core/syntax-tree/collect-symbols";
import {
  SyntaxTree,
  SyntaxTreeNodeType,
} from "$types/syntax-tree";
import { Typography } from "@mui/material";
import { FC } from "react";
import { useTranslation } from "react-i18next";

type CheckerOutputGroupProps = {
  tree: SyntaxTree;
};
export const CheckerOutputGroup: FC<
  CheckerOutputGroupProps
> = (props) => {
  const { tree } = props;

  const { t } = useTranslation();

  const dependencies = syntaxTreeCollectSymbols(tree)
    .toSorted((a, b) => a.localeCompare(b))
    .join(",");

  return (
    <StyledOutputCard title="Verdict">
      {tree.nodeType === SyntaxTreeNodeType.CONST && (
        <Typography>
          {tree.value
            ? `The expression is a tautology.`
            : `The expression is a contradiction.`}
        </Typography>
      )}
      {tree.nodeType !== SyntaxTreeNodeType.CONST && (
        <StyledLatex>
          {`The expression is not a tautology. Its truth value depends on $${dependencies}$.`}
        </StyledLatex>
      )}
    </StyledOutputCard>
  );
};
