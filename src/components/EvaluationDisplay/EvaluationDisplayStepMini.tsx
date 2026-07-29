import type { FC } from "react";
import { useTranslation } from "react-i18next";
import type { EvaluationStep } from "$/core/expr-tree/collect-steps";
import { StyledLatex } from "../styled/StyledLatex";

export const EvaluationDisplayStepMini: FC<{
  references: EvaluationStep[];
  subStep: EvaluationStep["substitutions"][number];
  stepIndex: number;
  subStepIndex: number;
}> = (props) => {
  const { subStep, references, subStepIndex, stepIndex } = props;
  const prevMarker = String.fromCharCode(subStepIndex + 97);
  const currMarker = String.fromCharCode(subStepIndex + 97 + 1);
  const { t } = useTranslation("views", {
    keyPrefix: "evaluator-view.cards.step-by-step",
  });

  const { substituted, evaluated, repr, stepRef } = subStep;

  return stepRef === false ? (
    <StyledLatex>
      {t("given-variable-is-value", {
        variable: `$${repr}$`,
        formula: `$$${substituted}.\\tag{${stepIndex}.${currMarker}}$$`,
        value: t(evaluated ? "true" : "false"),
      })}
    </StyledLatex>
  ) : (
    <StyledLatex>
      {t("from-previous-step-substitute-into-formula", {
        step: `$\\text{(${stepRef}.a)}$`,
        formula: `$$${references[stepRef - 1].repr}$$`,
        value: t(evaluated ? "true" : "false"),
        current: `$\\text{(${stepIndex}.${prevMarker})}$`,
        result: `$$${substituted}.\\tag{${stepIndex}.${currMarker}}$$`,
      })}
    </StyledLatex>
  );
};
