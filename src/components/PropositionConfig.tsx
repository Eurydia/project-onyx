import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Grid from "@mui/material/Grid";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Typography from "@mui/material/Typography";
import { type FC, useMemo } from "react";
import { useTranslation } from "react-i18next";
import type { SymbolTable } from "$/types/syntax-tree";
import { StyledLatex } from "./Styled/StyledLatex";

type CustomRadioGroupProps = {
  symbol: string;
  value: SymbolTable;
  onChange: (k: string, v: boolean) => void;
};
const CustomRadioGroup: FC<CustomRadioGroupProps> = (props) => {
  const { symbol, value, onChange } = props;
  const { t } = useTranslation("components", {
    keyPrefix: "symbol-config",
  });

  return (
    <RadioGroup
      row
      value={value.get(symbol) ? "1" : "0"}
      onChange={(_, value) => onChange(symbol, value === "1")}
    >
      <FormControlLabel
        disableTypography
        control={<Radio disableFocusRipple disableRipple disableTouchRipple />}
        value="1"
        label={<Typography>{t("true")}</Typography>}
      />
      <FormControlLabel
        control={<Radio disableFocusRipple disableRipple disableTouchRipple />}
        value="0"
        disableTypography
        label={<Typography>{t("false")}</Typography>}
      />
    </RadioGroup>
  );
};

type PropositionConfigProps = {
  value: SymbolTable;
  onChange: (k: string, v: boolean) => void;
};
export const PropositionConfig: FC<PropositionConfigProps> = (props) => {
  const { value, onChange } = props;

  const symbols = useMemo(() => {
    return [...value.keys()].toSorted((a, b) => a.localeCompare(b));
  }, [value]);

  if (symbols.length === 0) {
    return null;
  }

  return (
    <Grid
      container
      sx={{
        width: "100%",
        maxHeight: 400,
        overflowY: "auto",
      }}
    >
      {symbols.map((symbol) => (
        <Grid key={`symbol-${symbol}`} size={{ xs: 12, md: 4 }}>
          <FormControl fullWidth>
            <FormLabel>
              <StyledLatex>{`$${symbol}$`}</StyledLatex>
            </FormLabel>
            <CustomRadioGroup
              symbol={symbol}
              value={value}
              onChange={onChange}
            />
          </FormControl>
        </Grid>
      ))}
    </Grid>
  );
};
