import { SymbolTable } from "$types/syntax-tree";

export const getPermutation = (
  size: number,
  symbols: string[]
) => {
  const perm: SymbolTable[] = [];
  const permSize = 1 << size;
  for (let i = 0; i < permSize; i++) {
    const repr = i.toString(2).padStart(size, "0");
    const p = new Map<string, boolean>();
    for (let j = 0; j < size; j++) {
      p.set(symbols[j], repr[j] === "1");
    }
    perm.push(p);
  }
  return perm;
};
