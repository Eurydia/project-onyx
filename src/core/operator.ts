import { Operator } from "$types/operators";

const OPERATOR_REPR = new Map<Operator, string>([
  [Operator.NOT, "\\lnot"],
  [Operator.AND, "\\land"],
  [Operator.OR, "\\lor"],
  [Operator.IMPL, "\\implies"],
  [Operator.IFF, "\\iff"],
]);

export const operatorToLatex = (op: Operator) => {
  return OPERATOR_REPR.get(op) ?? "";
};
