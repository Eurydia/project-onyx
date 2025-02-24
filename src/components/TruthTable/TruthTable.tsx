import { StyledAlert } from "$components/styled/StyledAlert";
import { StyledLatex } from "$components/styled/StyledLatex";
import { exprTreeCollectSymbols } from "$core/expr-tree/collect-symbols";
import { getInterpretations } from "$core/expr-tree/interpretations";
import { exprTreeToLatex } from "$core/expr-tree/to-latex";
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
  useTheme,
} from "@mui/material";
import { FC, memo, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { TruthTableCell } from "./TruthTableCell";

type TruthTableProps = {
  exprTree: ExprTree;
  slotProps: { container: SxProps<Theme> };
};
const TruthTable_: FC<TruthTableProps> = (props) => {
  const { exprTree, slotProps } = props;
  const { t } = useTranslation("components", {
    keyPrefix: "truth-table",
  });
  const { palette } = useTheme();
  const [userConfirmed, setUserConfirmed] = useState(false);

  const symbols = useMemo(() => {
    return [...exprTreeCollectSymbols(exprTree)].toSorted();
  }, [exprTree]);
  const exprLatex = useMemo(() => {
    return exprTreeToLatex(exprTree);
  }, [exprTree]);

  const interpretations =
    symbols.length > 3 && !userConfirmed
      ? []
      : getInterpretations(symbols.length, symbols);

  if (symbols.length > 3 && !userConfirmed) {
    return (
      <Stack
        spacing={1}
        padding={1}
      >
        <StyledAlert severity="warning">
          {t(
            "warnings.large-truth-table-can-slow-application-down"
          )}
        </StyledAlert>
        <Button
          disableElevation
          disableRipple
          onClick={() => setUserConfirmed(true)}
          sx={{
            "&:hover": {
              color: palette.getContrastText(
                palette.primary.main
              ),
              backgroundColor: palette.primary.main,
            },
            "color": palette.primary.dark,
            "backgroundColor": palette.primary.light,
            "width": "fit-content",
          }}
        >
          {t("warnings.confirm")}
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
                sx={{ whiteSpace: "nowrap" }}
              >
                <StyledLatex>{`$${symbol}$`}</StyledLatex>
              </TableCell>
            ))}
            <TableCell
              align="center"
              sx={{ whiteSpace: "nowrap" }}
            >
              <StyledLatex>{`$${exprLatex}$`}</StyledLatex>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {interpretations.map((interpretations, index) => (
            <TableRow key={"perm" + index}>
              {symbols.map((sym, index) => (
                <TruthTableCell
                  key={"sym" + index}
                  value={interpretations.get(sym) || false}
                />
              ))}
              <TruthTableCell
                value={exprTree.eval(interpretations)}
              />
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
