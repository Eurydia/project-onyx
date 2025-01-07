import { SymbolTable } from "$types/ast";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid2,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { StyledLatex } from "../../styled/StyledLatex";

type PlaygroundSymbolConfig = {
  symbolTable: SymbolTable;
  onChange: (k: string, v: boolean) => void;
};
export const PlaygroundSymbolConfig: FC<
  PlaygroundSymbolConfig
> = (props) => {
  const { symbolTable, onChange } = props;

  const { t } = useTranslation("translation");

  const symbols = [...symbolTable.keys()];
  symbols.sort();

  return (
    <Grid2
      width="100%"
      container
      spacing={2}
      margin={4}
      maxHeight={400}
      overflow="auto"
    >
      <Grid2 size={12}>
        <Typography
          fontSize="large"
          fontWeight={500}
        >
          {t("component.playground.config.editTruthValue")}
        </Typography>
      </Grid2>
      {symbols.map((sym) => (
        <Grid2
          key={"symbol-" + sym}
          size={{ xs: 12, md: 6 }}
        >
          <FormControl fullWidth>
            <FormLabel>
              <StyledLatex tex={`\\text{\`\`$${sym}$''}`} />
            </FormLabel>
            <RadioGroup
              row
              value={symbolTable.get(sym) ? "1" : "0"}
              onChange={(e) =>
                onChange(sym, e.target.value === "1")
              }
            >
              <FormControlLabel
                control={<Radio disableRipple />}
                value="1"
                label={t(
                  "component.playground.config.true"
                )}
              />
              <FormControlLabel
                control={<Radio disableRipple />}
                value="0"
                label={t(
                  "component.playground.config.false"
                )}
              />
            </RadioGroup>
          </FormControl>
        </Grid2>
      ))}
    </Grid2>
  );
};
