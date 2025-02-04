import { ExpressionCard } from "$components/ExpressionCard";
import { TruthTable } from "$components/TruthTable";
import { syntaxTreeToLatex } from "$core/syntax-tree/to-latex";
import { exprTreeFromSyntaxTree } from "$core/tree/conversion";
import { CheckerRouteLoaderData } from "$types/loader-data";
import { InfoRounded } from "@mui/icons-material";
import {
  Alert,
  AlertTitle,
  Stack,
  Typography,
} from "@mui/material";
import { FC, Fragment } from "react";
import { VerdictDisplay } from "./VerdictDisplay";

type VerdictDisplayManyProps = {
  formulas: CheckerRouteLoaderData["expressions"];
};
export const VerdictDisplayMany: FC<
  VerdictDisplayManyProps
> = (props) => {
  const { formulas: expressions } = props;
  if (expressions.length === 0) {
    return (
      <Alert
        icon={false}
        variant="standard"
        severity="info"
      >
        <AlertTitle>
          <Stack
            direction="row"
            flexWrap="wrap"
            alignItems="flex-end"
            spacing={2}
            useFlexGap
          >
            <InfoRounded />
            <Typography fontWeight={900}>
              {`Notice`}
            </Typography>
          </Stack>
        </AlertTitle>
        <Typography>{`No verdict to display. Enter an expression to see its result.`}</Typography>
      </Alert>
    );
  }

  return (
    <Fragment>
      {expressions.map((expr, index) => {
        if (!expr.ok) {
          return null;
        }
        const exprTree = exprTreeFromSyntaxTree(
          expr.originalTree
        );
        const originalLatex = syntaxTreeToLatex(
          expr.originalTree
        );

        return (
          <ExpressionCard
            key={"verdict" + index}
            primary={
              <VerdictDisplay
                result={expr.normalizedTree}
                originalLatex={originalLatex}
              />
            }
            secondary={
              <TruthTable
                exprTree={exprTree}
                slotProps={{
                  container: { maxHeight: "40vh" },
                }}
              />
            }
          />
        );
      })}
    </Fragment>
  );
};
