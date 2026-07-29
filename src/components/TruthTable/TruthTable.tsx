import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import type { SxProps, Theme } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { type FC, memo, useMemo, useState } from "react";
import { exprTreeCollectSymbols } from "$/core/expr-tree/collect-symbols";
import { getInterpretations } from "$/core/expr-tree/interpretations";
import { exprTreeToLatex } from "$/core/expr-tree/to-latex";
import * as m from "$/paraglide/messages.js";
import type { ExprTree } from "$/types/expression-tree";
import { StyledAlert } from "../styled/StyledAlert";
import { StyledLatex } from "../styled/StyledLatex";
import { TruthTableCell } from "./TruthTableCell";

export const TruthTable: FC<{
  exprTree: ExprTree;
  slotProps: { container: SxProps<Theme> };
}> = memo((props) => {
  const { exprTree, slotProps } = props;
  const [userConfirmed, setUserConfirmed] = useState(false);

  const symbols = useMemo(() => {
    const _symbols = [...exprTreeCollectSymbols(exprTree)];
    _symbols.sort();
    return _symbols;
  }, [exprTree]);

  const exprLatex = useMemo(() => {
    return exprTreeToLatex(exprTree);
  }, [exprTree]);

  const interpretations = useMemo(() => {
    return symbols.length > 3 && !userConfirmed
      ? []
      : getInterpretations(symbols.length, symbols);
  }, [userConfirmed, symbols]);

  if (symbols.length > 3 && !userConfirmed) {
    return (
      <Stack spacing={1} sx={{ p: 1 }}>
        <StyledAlert severity="warning">
          {m[
            "components.truth-table.warnings.large-truth-table-can-slow-application-down"
          ]()}
        </StyledAlert>
        <Button
          onClick={() => setUserConfirmed(true)}
          sx={(theme) => ({
            "&:hover": {
              color: theme.palette.getContrastText(theme.palette.primary.main),
              backgroundColor: theme.palette.primary.main,
            },
            color: theme.palette.primary.dark,
            backgroundColor: theme.palette.primary.light,
            width: "fit-content",
          })}
        >
          {m["components.truth-table.warnings.confirm"]()}
        </Button>
      </Stack>
    );
  }

  return (
    <TableContainer sx={slotProps.container}>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            {symbols.map((col, index) => (
              <TableCell
                key={`sym${index}`}
                align="center"
                sx={{ whiteSpace: "nowrap" }}
              >
                <StyledLatex>{`$${col}$`}</StyledLatex>
              </TableCell>
            ))}
            <TableCell align="center" sx={{ whiteSpace: "nowrap" }}>
              <StyledLatex>{`$${exprLatex}$`}</StyledLatex>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {interpretations.map((interpretations, index) => (
            <TableRow key={`perm${index}`}>
              {symbols.map((sym, index) => (
                <TruthTableCell
                  key={`sym${index}`}
                  value={interpretations.get(sym) || false}
                />
              ))}
              <TruthTableCell value={exprTree.eval(interpretations)} />
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}, (prev, next) => {
  return exprTreeToLatex(prev.exprTree) === exprTreeToLatex(next.exprTree);
});
