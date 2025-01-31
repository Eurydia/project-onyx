import { SymbolTable } from "$types/syntax-tree";
import { InfoRounded } from "@mui/icons-material";
import {
  Alert,
  AlertTitle,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid2,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from "@mui/material";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { StyledLatex } from "../Styled/StyledLatex";

type PropositionConfigProps = {
  value: SymbolTable;
  onChange: (k: string, v: boolean) => void;
};
export const PropositionConfig: FC<
  PropositionConfigProps
> = (props) => {
  const { value, onChange } = props;

  const { t } = useTranslation("translation");

  const symbols = [...value.keys()];
  symbols.sort();

  return (
    <Grid2
      container
      width="100%"
      spacing={2}
      sx={{
        maxHeight: 400,
        overflowY: "auto",
      }}
    >
      {symbols.length === 0 && (
        <Grid2 size="grow">
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
            <Typography>{`No proposition to display.`}</Typography>
          </Alert>
        </Grid2>
      )}
      {symbols.map((sym) => (
        <Grid2
          key={"symbol-" + sym}
          size={{ xs: 12, md: 6 }}
        >
          <FormControl fullWidth>
            <FormLabel>
              <StyledLatex>{`$${sym}$`}</StyledLatex>
            </FormLabel>
            <RadioGroup
              row
              value={value.get(sym) ? "1" : "0"}
              onChange={(_, value) =>
                onChange(sym, value === "1")
              }
            >
              <FormControlLabel
                disableTypography
                control={<Radio disableRipple />}
                value="1"
                label={
                  <Typography>
                    {t("component.playground.config.true")}
                  </Typography>
                }
              />
              <FormControlLabel
                control={<Radio disableRipple />}
                value="0"
                disableTypography
                label={
                  <Typography>
                    {t("component.playground.config.false")}
                  </Typography>
                }
              />
            </RadioGroup>
          </FormControl>
        </Grid2>
      ))}
    </Grid2>
  );
};
