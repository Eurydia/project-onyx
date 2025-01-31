import { StyledLatex } from "$components/Styled/StyledLatex";
import { Maybe } from "$types/generic";
import { WarningRounded } from "@mui/icons-material";
import {
  Alert,
  AlertTitle,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import { FC } from "react";

type InputDisplayManyProps = {
  expressions: ({ inputRaw: string } & Maybe<{
    inputInterpretationLatex: string;
  }>)[];
};
export const InputDisplayMany: FC<InputDisplayManyProps> = (
  props
) => {
  const { expressions } = props;

  return (
    <Stack spacing={1}>
      {expressions.map((expr, index) => {
        const inputNum = index + 1;
        return (
          <Stack key={"expr" + index}>
            {expr.ok && (
              <StyledLatex>
                {`$$${expr.inputInterpretationLatex} \\tag{${inputNum}}$$`}
              </StyledLatex>
            )}
            {!expr.ok && (
              <StyledLatex
                sx={{
                  color: ({ palette }) =>
                    palette.error.main,
                }}
              >
                {`$$\\varnothing\\tag{${inputNum}}$$`}
              </StyledLatex>
            )}
          </Stack>
        );
      })}
      {expressions.some((expr) => !expr.ok) && (
        <Alert
          icon={false}
          variant="standard"
          severity="warning"
        >
          <AlertTitle>
            <Stack
              direction="row"
              flexWrap="wrap"
              alignItems="flex-end"
              spacing={2}
              useFlexGap
            >
              <WarningRounded />
              <Typography fontWeight={900}>
                {`Notice`}
              </Typography>
            </Stack>
          </AlertTitle>
          <Typography>{`The evaluator could not understand the following input. Please make sure that they are correct.`}</Typography>
          <List>
            {expressions.map((expr, index) => {
              if (expr.ok) {
                return null;
              }
              const inputNum = index + 1;
              return (
                <ListItem key={"invalid-input" + index}>
                  <ListItemIcon>
                    <Typography>
                      {`(${inputNum})`}
                    </Typography>
                  </ListItemIcon>
                  <ListItemText disableTypography>
                    <Typography fontFamily="monospace">
                      {`${expr.inputRaw}`}
                    </Typography>
                  </ListItemText>
                </ListItem>
              );
            })}
          </List>
        </Alert>
      )}
    </Stack>
  );
};
