import { StyledAlert } from "$components/styled/StyledAlert";
import { StyledLatex } from "$components/styled/StyledLatex";
import { getPermutation } from "$core/eval";
import { exprTreeCollectSymbols } from "$core/tree/expr/evaluate";
import { exprTreeToLatex } from "$core/tree/expr/latex";
import { exprTreeFlattenPostOrder } from "$core/tree/flatten";
import { ExprTree } from "$types/expression-tree";
import {
  Button,
  Stack,
  SxProps,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Theme,
  Typography,
} from "@mui/material";
import { FC, memo, useState } from "react";
import { useTranslation } from "react-i18next";
import { WidgetStyledTableCell } from "./WidgetTruthTableCell";

type WidgetTruthTableProps = {
  exprTree: ExprTree;
  slotProps: { container: SxProps<Theme> };
};
const WidgetTruthTable_: FC<WidgetTruthTableProps> = (
  props
) => {
  const { exprTree, slotProps } = props;
  const { t } = useTranslation();
  const [userConfirmed, setUserConfirmed] = useState(false);

  const columns = exprTreeFlattenPostOrder(exprTree);
  const symbols = [...exprTreeCollectSymbols(exprTree)];
  symbols.sort();

  const perm =
    symbols.length > 3 && !userConfirmed
      ? []
      : getPermutation(symbols.length, symbols);

  if (symbols.length > 3 && !userConfirmed) {
    return (
      <Stack spacing={1}>
        <StyledAlert
          severity="warning"
          variant="standard"
        >
          <Typography>
            {t("component:math.truthTable.warning")}
          </Typography>
        </StyledAlert>
        <Button
          variant="contained"
          onClick={() => setUserConfirmed(true)}
        >
          {t("component:math.truthTable.confirm")}
        </Button>
      </Stack>
    );
  }

  return (
    <TableContainer sx={slotProps.container}>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            {symbols.map((symbol, index) => (
              <TableCell
                key={"sym" + index}
                align="center"
              >
                <StyledLatex tex={symbol} />
              </TableCell>
            ))}
            {columns.map((col, index) => (
              <TableCell
                key={"subexpr" + index}
                align="center"
              >
                <StyledLatex tex={col.label} />
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {perm.map((p, index) => (
            <TableRow key={"perm" + index}>
              {symbols.map((sym, index) => (
                <WidgetStyledTableCell
                  key={"sym" + index}
                  value={p.get(sym) || false}
                />
              ))}
              {columns.map((column, colIndex) => (
                <WidgetStyledTableCell
                  key={"col" + colIndex}
                  value={column.eval(p)}
                />
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export const WidgetTruthTable = memo(
  WidgetTruthTable_,
  (prev, next) => {
    return (
      exprTreeToLatex(prev.exprTree) ===
      exprTreeToLatex(next.exprTree)
    );
  }
);
