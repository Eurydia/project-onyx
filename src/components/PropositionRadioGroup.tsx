import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Typography from "@mui/material/Typography";
import type { FC } from "react";
import { m } from "$/paraglide/messages";
import type { SymbolTable } from "$/types/syntax-tree";

export const PropositionRadioGroup: FC<{
  symbol: string;
  value: SymbolTable;
  onChange: (k: string, v: boolean) => void;
}> = (props) => {
  const { symbol, value, onChange } = props;

  return (
    <RadioGroup
      row
      value={value.get(symbol) ? "1" : "0"}
      onChange={(_, value) => onChange(symbol, value === "1")}
    >
      <FormControlLabel
        disableTypography
        control={<Radio />}
        value="1"
        label={<Typography>{m["components.symbol-config.true"]()}</Typography>}
      />
      <FormControlLabel
        control={<Radio />}
        value="0"
        disableTypography
        label={<Typography>{m["components.symbol-config.false"]()}</Typography>}
      />
    </RadioGroup>
  );
};
