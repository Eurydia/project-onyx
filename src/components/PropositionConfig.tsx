import { SymbolTable } from "$types/syntax-tree";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid2,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { FC, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { StyledLatex } from "./Styled/StyledLatex";

type CustomRadioGroupProps = {
  symbol: string;
  value: SymbolTable;
  onChange: (k: string, v: boolean) => void;
};
const CustomRadioGroup: FC<CustomRadioGroupProps> = (
  props
) => {
  const { symbol, value, onChange } = props;
  const { t } = useTranslation("components", {
    keyPrefix: "symbol-config",
  });

  return (
    <RadioGroup
      row
      value={value.get(symbol) ? "1" : "0"}
      onChange={(_, value) =>
        onChange(symbol, value === "1")
      }
    >
      <FormControlLabel
        disableTypography
        control={
          <Radio
            disableFocusRipple
            disableRipple
            disableTouchRipple
          />
        }
        value="1"
        label={<Typography>{t("true")}</Typography>}
      />
      <FormControlLabel
        control={
          <Radio
            disableFocusRipple
            disableRipple
            disableTouchRipple
          />
        }
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
export const PropositionConfig: FC<
  PropositionConfigProps
> = (props) => {
  const { value, onChange } = props;

  const symbols = useMemo(() => {
    return [...value.keys()].toSorted((a, b) =>
      a.localeCompare(b)
    );
  }, [value]);

  if (symbols.length === 0) {
    return null;
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
      {symbols.map((symbol) => (
        <Grid2
          key={"symbol-" + symbol}
          size={{ xs: 12, md: 4 }}
        >
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
        </Grid2>
      ))}
    </Grid2>
  );
};
