import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { type FC, Fragment, useMemo } from "react";
import { InputDisplayMany } from "$/components/InputDisplay";
import { exprTreeFromSyntaxTree } from "$/App/core/expr-tree/from-syntax-tree";
import { operatorToLatex } from "$/App/core/operator";
import { syntaxTreeRewrite } from "$/App/core/syntax-tree/rewrite";
import { syntaxTreeToLatex } from "$/App/core/syntax-tree/to-latex";
import { m } from "$/libs/paraglide/messages";
import type { Maybe } from "$/types/generic";
import { Operator } from "$/types/operators";
import type { SyntaxTree } from "$/types/syntax-tree";
import { StyledAlert } from "../styled/StyledAlert";
import { StyledLatex } from "../styled/StyledLatex";
import { RewriterOutputItem } from "./RewriterOutputItem";

export const RewriterViewLayout: FC<{
  items: ({ inputRaw: string } & Maybe<{
    inputInterpretationLatex: string;
    originalTree: SyntaxTree;
  }>)[];
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
