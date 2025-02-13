import { StyledLatex } from "$components/styled/StyledLatex";
import { EvaluationStep } from "$core/exprTreeFlattenStepByStep";
import { FC } from "react";
import { useTranslation } from "react-i18next";

type EvaluationDisplayStepMiniProps = {
  references: EvaluationStep[];
  subStep: EvaluationStep["substitutions"][number];
  stepIndex: number;
  subStepIndex: number;
};
export const EvaluationDisplayStepMini: FC<
  EvaluationDisplayStepMiniProps
> = (props) => {
  const { subStep, references, subStepIndex, stepIndex } =
    props;
  const prevMarker = String.fromCharCode(subStepIndex + 97);
  const currMarker = String.fromCharCode(
    subStepIndex + 97 + 1
  );
  const { t } = useTranslation("views", {
    keyPrefix: "evaluator-view.cards.step-by-step",
  });

  const { substituted, evaluated, repr, stepRef } = subStep;

  if (stepRef === false) {
    return (
      <StyledLatex>
        {t("given-variable-is-value", {
          variable: `$${repr}$`,
          formula: `$$${substituted}.\\tag{${stepIndex}.${currMarker}}$$`,
          value: t(evaluated ? "true" : "false"),
        })}
      </StyledLatex>
    );
  }

  const refRepr = references[stepRef - 1].repr;

  return (
    <StyledLatex>
      {t("from-previous-step-substitute-into-formula", {
        step: `$\\text{(${stepRef}.a)}$`,
        formula: `$$${refRepr}$$`,
        value: t(evaluated ? "true" : "false"),
        current: `$\\text{(${stepIndex}.${prevMarker})}$`,
        result: `$$${substituted}.\\tag{${stepIndex}.${currMarker}}$$`,
      })}
    </StyledLatex>
  );
};
