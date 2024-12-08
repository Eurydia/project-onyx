import { syntaxTreeToLatex } from "$core/tree/conversion";
import {
  collectSymbols,
  evaluateSyntaxTree,
  permuteSymbols,
} from "$core/tree/syntax/evaluate";
import { SyntaxTree } from "$types/parser";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { FC } from "react";
import { StyledLatex } from "./StyledLatex";

type SimulatedTableProps = {
  tree: SyntaxTree | null;
};
export const SimulatedTable: FC<SimulatedTableProps> = (
  props
) => {
  const { tree } = props;

  let sortedSymbols: string[] = [];
  let expr: string = "";
  let permutation: Map<string, boolean>[] = [];
  if (tree !== null) {
    const collected = collectSymbols(tree);
    sortedSymbols = [...collected].sort();
    expr = syntaxTreeToLatex(tree);
    permutation = permuteSymbols(collected);
  }

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            {sortedSymbols.map((sym, index) => (
              <TableCell key={"sym" + index}>
                <StyledLatex tex={sym} />
              </TableCell>
            ))}
            <TableCell>
              <StyledLatex tex={expr} />
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {permutation.map((perm, index) => (
            <TableRow key={"perm" + index}>
              {sortedSymbols.map((sym, symIndex) => (
                <TableCell key={"cell" + symIndex}>
                  {perm.get(sym) ? "T" : "F"}
                </TableCell>
              ))}
              <TableCell>
                {evaluateSyntaxTree(tree, perm) ? "T" : "F"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
