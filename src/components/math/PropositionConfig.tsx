import { SymbolTable } from "$types/syntax-tree";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid2,
  Radio,
  RadioGroup,
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
