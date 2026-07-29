import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Grid from "@mui/material/Grid";
import { type FC, useMemo } from "react";
import type { SymbolTable } from "$/types/syntax-tree";
import { PropositionRadioGroup } from "./PropositionRadioGroup";
import { StyledLatex } from "./styled/StyledLatex";

export const PropositionConfig: FC<{
  value: SymbolTable;
  onChange: (k: string, v: boolean) => void;
}> = (props) => {
  const { value, onChange } = props;

  const symbols = useMemo(() => {
    return [...value.keys()].toSorted((a, b) => a.localeCompare(b));
  }, [value]);

  return symbols.length === 0 ? null : (
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
            <PropositionRadioGroup
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
