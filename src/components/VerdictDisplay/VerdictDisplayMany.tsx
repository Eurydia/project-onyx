import { TruthTable } from "$components/TruthTable";
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
  verdicts: CheckerRouteLoaderData["expressions"];
};
export const VerdictDisplayMany: FC<
  VerdictDisplayManyProps
> = (props) => {
  const { verdicts: expressions } = props;

  return (
    <Fragment>
      {expressions.length === 0 && (
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
      )}
      {expressions.map((expr, index) => (
        <Fragment key={"verdict" + index}>
          <VerdictDisplay verdict={expr} />
          {expr.ok && (
            <TruthTable
              slotProps={{
                container: { maxHeight: "40vh" },
              }}
              exprTree={exprTreeFromSyntaxTree(
                expr.originalTree
              )}
            />
          )}
        </Fragment>
      ))}
    </Fragment>
  );
};
