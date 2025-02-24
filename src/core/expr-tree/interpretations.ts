import { SymbolTable } from "$types/syntax-tree";

export const getInterpretations = (
  size: number,
  symbols: string[]
) => {
  const interpretations: SymbolTable[] = [];
  const intepretationCount = 1 << size;
  for (let i = 0; i < intepretationCount; i++) {
    const curr = i.toString(2).padStart(size, "0");
    const interpretation = new Map<string, boolean>();
    for (let j = 0; j < size; j++) {
      interpretation.set(symbols[j], curr[j] === "0");
    }
    interpretations.push(interpretation);
  }
  return interpretations;
};
