import { ExpressionCard } from "$components/ExpressionCard";
import { InputDisplayMany } from "$components/InputDisplay";
import { StyledAlert } from "$components/Styled/StyledAlert";
import { StyledLatex } from "$components/Styled/StyledLatex";
import { TruthTable } from "$components/TruthTable";
import { exprTreeFromSyntaxTree } from "$core/expr-tree/from-syntax-tree";
import { operatorToLatex } from "$core/operator";
import { syntaxTreeRewrite } from "$core/syntax-tree/rewrite";
import { syntaxTreeToLatex } from "$core/syntax-tree/to-latex";
import { ExprTree } from "$types/expression-tree";
import { Maybe } from "$types/generic";
import { RewriterRouteLoaderData } from "$types/loader-data";
import { Operator } from "$types/operators";
import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { FC, Fragment, useMemo } from "react";
import { useTranslation } from "react-i18next";

type RewriterOutputItemProps = {
  itemNum: number;
  originalLatex: string;
  result: Maybe<{ tree: ExprTree; latex: string }>;
};
const RewriterOutputItem: FC<RewriterOutputItemProps> = (
  props
) => {
  const { result, originalLatex, itemNum } = props;
  const { t } = useTranslation("views", {
    keyPrefix: "rewriter-view.cards.output",
  });

  if (!result.ok) {
    return (
      <ExpressionCard
        primary={
          <StyledLatex>
            {t(
              "text.formula-cannot-be-expressed-in-the-desired-basis",
              {
                formula: `$$${originalLatex} \\tag{${itemNum}}$$`,
              }
            )}
          </StyledLatex>
        }
        secondary={
          <StyledAlert severity="info">
            <Typography>
              {t("infos.truth-table-is-not-available")}
            </Typography>
          </StyledAlert>
        }
      />
    );
  }

  return (
    <ExpressionCard
      primary={
        <StyledLatex>
          {t(
            "text.formula-is-expressed-as-in-the-desired-basis",
            {
              formula: `$$${originalLatex}\\tag{${itemNum}}$$`,
              result: `$$\\boxed{${result.latex}}$$`,
            }
          )}
        </StyledLatex>
      }
      secondary={
        <TruthTable
          exprTree={result.tree}
          slotProps={{
            container: {
              maxHeight: "40vh",
            },
          }}
        />
      }
    />
  );
};

type RewriterViewLayoutProps = {
  items: RewriterRouteLoaderData["items"];
  basis: Set<Operator>;
  onBasisChange: (k: Operator, v: boolean) => void;
};
export const RewriterViewLayout: FC<
  RewriterViewLayoutProps
> = (props) => {
  const { items, basis, onBasisChange } = props;
  const { t } = useTranslation("views", {
    keyPrefix: "rewriter-view.cards",
  });
  const { typography } = useTheme();
  const validItems = useMemo(() => {
    return items.filter((item) => item.ok);
  }, [items]);

  return (
    <Stack spacing={2}>
      <Typography
        fontWeight={900}
        fontSize={typography.h3.fontSize}
      >
        {t("input-interpretation.title")}
      </Typography>
      <InputDisplayMany items={items} />
      <Typography
        fontWeight={900}
        fontSize={typography.h3.fontSize}
      >
        {t("output.title")}
      </Typography>
      {validItems.length === 0 && (
        <StyledAlert severity="info">
          <Typography>
            {t("output.infos.no-valid-formula-to-display")}
          </Typography>
        </StyledAlert>
      )}
      {validItems.length > 0 && (
        <Fragment>
          <FormGroup row>
            {Object.values(Operator).map(
              (operator, index) => (
                <FormControlLabel
                  key={"operator" + index}
                  checked={basis.has(operator)}
                  onChange={(_, value) =>
                    onBasisChange(operator, value)
                  }
                  control={
                    <Checkbox
                      disableRipple
                      disableFocusRipple
                      disableTouchRipple
                    />
                  }
                  label={
                    <StyledLatex>
                      {`$${operatorToLatex(operator)}$`}
                    </StyledLatex>
                  }
                />
              )
            )}
          </FormGroup>
          {items.map((item, index) => {
            if (!item.ok) {
              return null;
            }
            const result = syntaxTreeRewrite(
              item.originalTree,
              basis
            );
            const itemNum = index + 1;
            return (
              <RewriterOutputItem
                key={"result" + index}
                itemNum={itemNum}
                originalLatex={
                  item.inputInterpretationLatex
                }
                result={
                  result.ok
                    ? {
                        ok: true,
                        tree: exprTreeFromSyntaxTree(
                          result.tree
                        ),
                        latex: syntaxTreeToLatex(
                          result.tree
                        ),
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
