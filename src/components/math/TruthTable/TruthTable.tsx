import { StyledAlert } from "$components/styled/StyledAlert";
import { StyledLatex } from "$components/styled/StyledLatex";
import { getPermutation } from "$core/eval";
import { exprTreeCollectSymbols } from "$core/tree/expr/evaluate";
import { exprTreeToLatex } from "$core/tree/expr/latex";
import { exprTreeFlattenPostOrder } from "$core/tree/flatten";
import { ExprTree } from "$types/expression-tree";
import {
  alpha,
  Button,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useTheme,
} from "@mui/material";
import { FC, memo, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

type StyledTableCellProps = { value: boolean };
const StyledTableCell: FC<StyledTableCellProps> = (
  props
) => {
  const { value } = props;
  const { t } = useTranslation();
  const { palette } = useTheme();

  return (
    <TableCell
      align="center"
      sx={{
        backgroundColor: value
          ? alpha(palette.secondary.light, 0.8)
          : alpha(palette.secondary.main, 0.2),
        whiteSpace: "nowrap",
      }}
    >
      {value ? t("common.true") : t("common.false")}
    </TableCell>
  );
};

type TruthTableProps = {
  exprTree: ExprTree;
};
const TruthTable_: FC<TruthTableProps> = (props) => {
  const { exprTree } = props;
  const { t } = useTranslation();
  const [userConfirmed, setUserConfirmed] = useState(false);

  const { columns, symbols } = useMemo(() => {
    const _columns = exprTreeFlattenPostOrder(exprTree);
    const _symbols = [...exprTreeCollectSymbols(exprTree)];
    _symbols.sort();
    return { columns: _columns, symbols: _symbols };
  }, [exprTree]);

  const perm = useMemo(() => {
    if (symbols.length > 3 && !userConfirmed) {
      return [];
    }
    return getPermutation(symbols.length, symbols);
  }, [symbols, userConfirmed]);

  if (symbols.length > 3 && !userConfirmed) {
    return (
      <Stack spacing={1}>
        <StyledAlert severity="warning">
          <Typography>
            {t("common.truthTable.warning")}
          </Typography>
        </StyledAlert>
        <Button
          disableElevation
          disableRipple
          variant="contained"
          onClick={() => setUserConfirmed(true)}
          sx={{
            width: "fit-content",
          }}
        >
          {t("common.truthTable.confirm")}
        </Button>
      </Stack>
    );
  }

  return (
    <TableContainer
      sx={{
        maxHeight: 600,
        overflowY: "auto",
      }}
    >
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            {symbols.map((symbol, index) => (
              <TableCell
                key={"sym" + index}
                align="center"
                sx={{
                  backgroundColor: ({ palette }) =>
                    palette.background.paper,
                  whiteSpace: "nowrap",
                }}
              >
                <StyledLatex tex={symbol} />
              </TableCell>
            ))}
            {columns.map((col, index) => (
              <TableCell
                key={"subexpr" + index}
                align="center"
                sx={{
                  backgroundColor: ({ palette }) =>
                    palette.background.paper,
                  whiteSpace: "nowrap",
                }}
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
                <StyledTableCell
                  key={"sym" + index}
                  value={p.get(sym) || false}
                />
              ))}
              {columns.map((column, colIndex) => (
                <StyledTableCell
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

export const TruthTable = memo(
  TruthTable_,
  (prev, next) => {
    return (
      exprTreeToLatex(prev.exprTree) ===
      exprTreeToLatex(next.exprTree)
    );
  }
);
