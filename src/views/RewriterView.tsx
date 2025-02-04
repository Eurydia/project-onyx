import { AppNavGroup } from "$components/common/AppNavMenu";
import { Editor } from "$components/Editor/Editor";
import { ExpressionCard } from "$components/ExpressionCard";
import { InputDisplayMany } from "$components/InputTable";
import { StyledLatex } from "$components/Styled/StyledLatex";
import { TruthTable } from "$components/TruthTable";
import { operatorToLatex } from "$core/operator";
import { syntaxTreeRewrite } from "$core/syntax-tree/rewrite";
import { syntaxTreeToLatex } from "$core/syntax-tree/to-latex";
import { exprTreeFromSyntaxTree } from "$core/tree/conversion";
import { BaseLayout } from "$layouts/BaseLayout";
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
import {
  FC,
  Fragment,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useTranslation } from "react-i18next";
import { useLoaderData, useSubmit } from "react-router";

export const RewriterView: FC = () => {
  const { userInput: prevUserInput, expressions } =
    useLoaderData() as RewriterRouteLoaderData;

  const submit = useSubmit();
  const { typography, palette } = useTheme();
  const { t } = useTranslation();
  const [userInput, setUserInput] = useState(prevUserInput);
  const [basis, setBasis] = useState(() => {
    const next = new Map<Operator, boolean>();
    for (const op of Object.values(Operator)) {
      next.set(op, true);
    }
    return next;
  });

  const basisSet = useMemo(() => {
    return new Set(
      [...basis.entries()]
        .filter(([, isIncluded]) => isIncluded)
        .map(([k]) => k)
    );
  }, [basis]);

  useEffect(() => {
    setUserInput(prevUserInput);
  }, [prevUserInput]);

  const handleSubmit = () => {
    submit(
      {
        input: userInput,
      },
      {
        method: "GET",
        action: "/rewriter",
      }
    );
  };

  return (
    <BaseLayout
      banner={t("rewriter")}
      appHeader={<AppNavGroup />}
    >
      <Stack spacing={8}>
        <Editor
          value={userInput}
          onChange={setUserInput}
          placeholder="not (p and q) iff (not p or not q)"
          onSubmit={handleSubmit}
        />

        {expressions.length > 0 && (
          <Fragment>
            <Stack>
              <Typography
                fontWeight={900}
                fontSize={typography.h3.fontSize}
              >
                {"Input Interpretation"}
              </Typography>
              <InputDisplayMany expressions={expressions} />
            </Stack>
            <Stack spacing={2}>
              <Typography
                fontWeight={900}
                fontSize={typography.h3.fontSize}
              >
                {`Result`}
              </Typography>
              <FormGroup row>
                {Object.values(Operator).map(
                  (operator, index) => (
                    <FormControlLabel
                      key={"operator" + index}
                      checked={basis.get(operator)}
                      onChange={(_, value) =>
                        setBasis((prev) => {
                          const next = new Map(prev);
                          next.set(operator, value);
                          return next;
                        })
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
              {expressions.map((expr, index) => {
                if (!expr.ok) {
                  return null;
                }
                const rewrittenResult = syntaxTreeRewrite(
                  expr.originalTree,
                  basisSet
                );
                const rewrittenLatex = rewrittenResult.ok
                  ? syntaxTreeToLatex(rewrittenResult.tree)
                  : "\\varnothing";

                const itemNum = index + 1;

                return (
                  <ExpressionCard
                    key={"result" + index}
                    primary={
                      rewrittenResult.ok ? (
                        <StyledLatex>
                          {`The formula $$${expr.inputInterpretationLatex}\\tag{${itemNum}}$$ can be rewritten to $$${rewrittenLatex}.$$`}
                        </StyledLatex>
                      ) : (
                        <StyledLatex>
                          {`The formula $$${expr.inputInterpretationLatex}\\tag{${itemNum}}$$ cannot be expressed in the desired basis.`}
                        </StyledLatex>
                      )
                    }
                    secondary={
                      rewrittenResult.ok ? (
                        <TruthTable
                          exprTree={exprTreeFromSyntaxTree(
                            rewrittenResult.tree
                          )}
                          slotProps={{
                            container: {
                              maxHeight: "40vh",
                            },
                          }}
                        />
                      ) : (
                        <StyledLatex
                          sx={{ color: palette.error.main }}
                        >{`$$\\varnothing$$`}</StyledLatex>
                      )
                    }
                  />
                );
              })}
            </Stack>
          </Fragment>
        )}
      </Stack>
    </BaseLayout>
  );
};
