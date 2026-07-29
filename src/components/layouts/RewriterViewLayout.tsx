import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { type FC, Fragment, useMemo } from "react";
import { ExpressionCard } from "$/components/ExpressionCard";
import { InputDisplayMany } from "$/components/InputDisplay";
import { TruthTable } from "$/components/TruthTable";
import { exprTreeFromSyntaxTree } from "$/core/expr-tree/from-syntax-tree";
import { operatorToLatex } from "$/core/operator";
import { syntaxTreeRewrite } from "$/core/syntax-tree/rewrite";
import { syntaxTreeToLatex } from "$/core/syntax-tree/to-latex";
import * as m from "$/paraglide/messages.js";
import type { ExprTree } from "$/types/expression-tree";
import type { Maybe } from "$/types/generic";
import type { RewriterRouteLoaderData } from "$/types/loader-data";
import { Operator } from "$/types/operators";
import { StyledAlert } from "../styled/StyledAlert";
import { StyledLatex } from "../styled/StyledLatex";

const RewriterOutputItem: FC<{
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

export const RewriterViewLayout: FC<{
  items: RewriterRouteLoaderData["items"];
  basis: Set<Operator>;
  onBasisChange: (k: Operator, v: boolean) => void;
}> = (props) => {
  const { items, basis, onBasisChange } = props;
  const validItems = useMemo(() => {
    return items.filter((item) => item.ok);
  }, [items]);

  return (
    <Stack spacing={2}>
      <Typography
        sx={(theme) => ({
          fontWeight: 900,
          fontSize: theme.typography.h3.fontSize,
        })}
      >
        {m["views.rewriter-view.cards.input-interpretation.title"]()}
      </Typography>
      <InputDisplayMany items={items} />
      <Typography
        sx={(theme) => ({
          fontWeight: 900,
          fontSize: theme.typography.h3.fontSize,
        })}
      >
        {m["views.rewriter-view.cards.output.title"]()}
      </Typography>
      {validItems.length === 0 && (
        <StyledAlert severity="info">
          <Typography>
            {m[
              "views.rewriter-view.cards.output.infos.no-valid-formula-to-display"
            ]()}
          </Typography>
        </StyledAlert>
      )}
      {validItems.length > 0 && (
        <Fragment>
          <FormGroup row>
            {Object.values(Operator).map((operator, index) => (
              <FormControlLabel
                key={`operator${index}`}
                checked={basis.has(operator)}
                onChange={(_, value) => onBasisChange(operator, value)}
                control={<Checkbox />}
                label={
                  <StyledLatex>{`$${operatorToLatex(operator)}$`}</StyledLatex>
                }
              />
            ))}
          </FormGroup>
          {items.map((item, index) => {
            if (!item.ok) {
              return null;
            }
            const result = syntaxTreeRewrite(item.originalTree, basis);
            const itemNum = index + 1;
            return (
              <RewriterOutputItem
                key={`result${index}`}
                itemNum={itemNum}
                originalLatex={item.inputInterpretationLatex}
                result={
                  result.ok
                    ? {
                        ok: true,
                        tree: exprTreeFromSyntaxTree(result.tree),
                        latex: syntaxTreeToLatex(result.tree),
                      }
                    : { ok: false }
                }
              />
            );
          })}
        </Fragment>
      )}
    </Stack>
  );
};
