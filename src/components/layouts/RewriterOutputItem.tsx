import Typography from "@mui/material/Typography";
import type { FC } from "react";
import { ExpressionCard } from "$/components/ExpressionCard";
import { TruthTable } from "$/components/TruthTable";
import { m } from "$/paraglide/messages";
import type { ExprTree } from "$/types/expression-tree";
import type { Maybe } from "$/types/generic";
import { StyledAlert } from "../styled/StyledAlert";
import { StyledLatex } from "../styled/StyledLatex";

export const RewriterOutputItem: FC<{
  itemNum: number;
  originalLatex: string;
  result: Maybe<{ tree: ExprTree; latex: string }>;
}> = (props) => {
  const { result, originalLatex, itemNum } = props;

  const primary = result.ok ? (
    <StyledLatex>
      {m[
        "views.rewriter-view.cards.output.text.formula-is-expressed-as-in-the-desired-basis"
      ]({
        formula: `$$${originalLatex}\\tag{${itemNum}}$$`,
        result: `$$\\boxed{${result.latex}}$$`,
      })}
    </StyledLatex>
  ) : (
    <StyledLatex>
      {m[
        "views.rewriter-view.cards.output.text.formula-cannot-be-expressed-in-the-desired-basis"
      ]({
        formula: `$$${originalLatex} \\tag{${itemNum}}$$`,
      })}
    </StyledLatex>
  );
  const secondary = result.ok ? (
    <TruthTable
      exprTree={result.tree}
      slotProps={{
        container: {
          maxHeight: "40vh",
        },
      }}
    />
  ) : (
    <StyledAlert severity="info">
      <Typography>
        {m[
          "views.rewriter-view.cards.output.infos.truth-table-is-not-available"
        ]()}
      </Typography>
    </StyledAlert>
  );

  return <ExpressionCard primary={primary} secondary={secondary} />;
};
