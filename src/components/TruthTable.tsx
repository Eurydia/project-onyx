import { syntaxTreetoExprTree } from "$core/tree/conversion";
import { exprTreeCollectSymbols } from "$core/tree/expr/evaluate";
import { syntaxTreeToPostOrder } from "$core/tree/flatten";
import { SymbolTable, SyntaxTree } from "$types/ast";
import {
  alpha,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useTheme,
} from "@mui/material";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { StyledLatex } from "./StyledLatex";

const getPermutation = (
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

type TruthTableProps = {
  tree: SyntaxTree;
};
export const TruthTable: FC<TruthTableProps> = (props) => {
  const { tree } = props;
  const { t } = useTranslation();
  const { palette } = useTheme();

  const expr = syntaxTreetoExprTree(tree);
  const columns = syntaxTreeToPostOrder(expr);
  const symbols = [...exprTreeCollectSymbols(expr)];
  symbols.sort();

  const perm = getPermutation(symbols.length, symbols);

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            {symbols.map((sym, index) => (
              <TableCell
                key={"sym" + index}
                align="center"
              >
                <StyledLatex tex={sym} />
              </TableCell>
            ))}
            {columns.map((col, index) => (
              <TableCell
                key={"subexpr" + index}
                align="center"
              >
                <StyledLatex tex={col.repr} />
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {perm.map((p, index) => (
            <TableRow key={"perm" + index}>
              {symbols.map((sym, index) => (
                <TableCell
                  key={"sym" + index}
                  align="center"
                  sx={{
                    backgroundColor: p.get(sym)
                      ? alpha(palette.secondary.light, 0.2)
                      : alpha(palette.secondary.main, 0.2),
                  }}
                >
                  <Typography>
                    {p.get(sym)
                      ? t("common.true")
                      : t("common.false")}
                  </Typography>
                </TableCell>
              ))}
              {columns.map((subExpr, colIndex) => (
                <TableCell
                  key={"col" + colIndex}
                  align="center"
                  sx={{
                    backgroundColor: subExpr.eval(p)
                      ? alpha(palette.secondary.light, 0.2)
                      : alpha(palette.secondary.main, 0.2),
                  }}
                >
                  <Typography>
                    {subExpr.eval(p)
                      ? t("common.true")
                      : t("common.false")}
                  </Typography>
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
