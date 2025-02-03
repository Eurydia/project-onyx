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
import { FC, useMemo } from "react";
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

  const symbols = useMemo(() => {
    return [...value.keys()].toSorted((a, b) =>
      a.localeCompare(b)
    );
  }, [value]);

  if (symbols.length === 0) {
    return (
      <Alert
        icon={false}
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
    );
  }

  return (
    <Grid2
      container
      width="100%"
      sx={{
        maxHeight: 400,
        overflowY: "auto",
      }}
    >
      {symbols.map((sym) => (
        <Grid2
          key={"symbol-" + sym}
          size={{ xs: 12, md: 4 }}
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
                control={<Radio />}
                value="1"
                label={
                  <Typography>
                    {t("component.playground.config.true")}
                  </Typography>
                }
              />
              <FormControlLabel
                control={<Radio />}
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
