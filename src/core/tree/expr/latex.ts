import { ExprTree } from "$types/ast";

const _exprTreeToLatex = (exprTree: ExprTree): string => {
  if (exprTree.isError) {
    return exprTree.label;
  }
  if (exprTree.children.length === 0) {
    return exprTree.label;
  }

  if (exprTree.children.length === 1) {
    if (exprTree.label !== "\\lnot") {
      return _exprTreeToLatex(exprTree.children[0]);
    }
    const child = exprTree.children[0];
    let childLatex = _exprTreeToLatex(child);
    if (child.children.length > 1) {
      childLatex = `(${childLatex})`;
    }
    return `${exprTree.label} ${childLatex}`;
  }
  const left = exprTree.children[0];
  const right = exprTree.children[1];
  let leftLatex = _exprTreeToLatex(left);
  if (left.children.length > 1) {
    leftLatex = `(${leftLatex})`;
  }
  let rightLatex = _exprTreeToLatex(right);
  if (right.children.length > 1) {
    rightLatex = `(${rightLatex})`;
  }
  return `${leftLatex} ${exprTree.label} ${rightLatex}`;
};
export const exprTreeToLatex = (
  exprTree: ExprTree | null
) => {
  if (exprTree === null) {
    return "";
  }
  return _exprTreeToLatex(exprTree);
};
