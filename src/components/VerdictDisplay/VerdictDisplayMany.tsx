import Typography from "@mui/material/Typography";
import { type FC, Fragment } from "react";
import { ExpressionCard } from "$/components/ExpressionCard";
import { TruthTable } from "$/components/TruthTable";
import { exprTreeFromSyntaxTree } from "$/core/expr-tree/from-syntax-tree";
import { m } from "$/paraglide/messages";
import type { CheckerRouteLoaderData } from "$/types/loader-data";
import { StyledAlert } from "../styled/StyledAlert";
import { VerdictDisplay } from "./VerdictDisplay";

export const VerdictDisplayMany: FC<{
  items: CheckerRouteLoaderData["items"];
}> = (props) => {
  const { items } = props;

  return (
    <Fragment>
      {items.filter((f) => f.ok).length === 0 ? (
        <StyledAlert severity="info">
          <Typography>
            {m["views.checker-view.cards.output.infos.no-formula-to-display"]()}
          </Typography>
        </StyledAlert>
      ) : (
        items.map((item, index) => {
          if (!item.ok) {
            return null;
          }
          const exprTree = exprTreeFromSyntaxTree(item.originalTree);
          const itemNum = index + 1;
          return (
            <ExpressionCard
              key={`verdict${index}`}
              primary={
                <VerdictDisplay
                  itemNum={itemNum}
                  result={item.normalizedTree}
                  originalLatex={item.inputInterpretationLatex}
                />
              }
              secondary={
                <TruthTable
                  exprTree={exprTree}
                  slotProps={{
                    container: { maxHeight: "40vh" },
                  }}
                />
              }
            />
          );
        })
      )}
    </Fragment>
  );
};
