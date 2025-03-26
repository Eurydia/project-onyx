import {
  SyntaxTree,
  SyntaxTreeNodeType,
} from "$types/syntax-tree";
import { AND, CONST, NOT, OR } from "../node";
import { syntaxTreeToString } from "../to-string";

const findComplementPairs = (
  a: Set<SyntaxTree>,
  b: Set<SyntaxTree>
) => {
  const bStringSet = new Set(
    [...b].map((item) => syntaxTreeToString(item))
  );
  const pairs = new Set<SyntaxTree>();
  for (const item of a) {
    if (
      item.nodeType === SyntaxTreeNodeType.UNARY &&
      bStringSet.has(syntaxTreeToString(item.operand))
    ) {
      pairs.add(item);
    } else if (
      item.nodeType === SyntaxTreeNodeType.IDEN &&
      bStringSet.has(syntaxTreeToString(NOT(item)))
    ) {
      pairs.add(item);
    }
  }
  return pairs;
};

const toSyntaxTree = (clause: Set<SyntaxTree>) => {
  const queue = [...clause];
  if (clause.size === 0) {
    return CONST(false);
  }
  let tree = queue.shift()!;
  while (queue.length > 0) {
    tree = OR(tree, queue.shift()!);
  }
  return tree;
};

export const resolve = (clauses: Set<Set<SyntaxTree>>) => {
  let resolutions = [...clauses];
  let pairResolved = true;
  while (pairResolved) {
    pairResolved = false;
    for (let i = 0; i < resolutions.length; i++) {
      for (let j = 0; j < resolutions.length; j++) {
        if (j === i) {
          continue;
        }
        const a = resolutions[i];
        const b = resolutions[j];

        const pairs = findComplementPairs(a, b);
        if (pairs.size === 0) {
          continue;
        }

        pairResolved = true;
        resolutions = resolutions.filter(
          (_, index) => index !== i && index !== j
        );

        if (pairs.size === 1) {
          const seen = new Set<string>(
            [...a].map((item) => syntaxTreeToString(item))
          );
          const newResolution = new Set<SyntaxTree>(
            [...a].filter((item) => !pairs.has(item))
          );
          const pairString = new Set(
            [...pairs].map((item) =>
              syntaxTreeToString(item)
            )
          );
          for (const item of b) {
            if (
              item.nodeType === SyntaxTreeNodeType.IDEN &&
              pairString.has(syntaxTreeToString(NOT(item)))
            ) {
              continue;
            }
            if (
              item.nodeType === SyntaxTreeNodeType.UNARY &&
              pairString.has(
                syntaxTreeToString(item.operand)
              )
            ) {
              continue;
            }

            if (!seen.has(syntaxTreeToString(item))) {
              newResolution.add(item);
              seen.add(syntaxTreeToString(item));
            }
          }
          resolutions.push(newResolution);
        }
      }
      if (pairResolved) {
        break;
      }
    }
  }

  if (resolutions.length === 0) {
    return CONST(true);
  }

  if (resolutions.some((clause) => clause.size === 0)) {
    return CONST(false);
  }

  let tree = toSyntaxTree(resolutions.shift()!);
  while (resolutions.length > 0) {
    tree = AND(tree, toSyntaxTree(resolutions.shift()!));
  }
  return tree;
};
