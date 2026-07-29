import type { FC } from "react";
import type { EvaluationStep } from "$/core/expr-tree/collect-steps";
import { m } from "$/paraglide/messages";
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

  const { substituted, evaluated, repr, stepRef } = subStep;

  return stepRef === false ? (
    <StyledLatex>
      {m["views.evaluator-view.cards.step-by-step.given-variable-is-value"]({
        variable: `$${repr}$`,
        formula: `$$${substituted}.\\tag{${stepIndex}.${currMarker}}$$`,
        value: evaluated
          ? m["views.evaluator-view.cards.step-by-step.true"]()
          : m["views.evaluator-view.cards.step-by-step.false"](),
      })}
    </StyledLatex>
  ) : (
    <StyledLatex>
      {m[
        "views.evaluator-view.cards.step-by-step.from-previous-step-substitute-into-formula"
      ]({
        step: `$\\text{(${stepRef}.a)}$`,
        formula: `$$${references[stepRef - 1].repr}$$`,
        value: evaluated
          ? m["views.evaluator-view.cards.step-by-step.true"]()
          : m["views.evaluator-view.cards.step-by-step.false"](),
        current: `$\\text{(${stepIndex}.${prevMarker})}$`,
        result: `$$${substituted}.\\tag{${stepIndex}.${currMarker}}$$`,
      })}
    </StyledLatex>
  );
};
