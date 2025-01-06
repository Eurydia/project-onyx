import { SymbolTable } from "$types/ast";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from "@mui/material";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { StyledLatex } from "./StyledLatex";

type PlaygroundDialogConfigProps = {
  symbolTable: SymbolTable;
  onChange: (k: string, v: boolean) => void;
};
export const PlaygroundDialogConfig: FC<
  PlaygroundDialogConfigProps
> = (props) => {
  const { symbolTable: table, onChange } = props;

  const { t } = useTranslation("translation", {
    keyPrefix: "common",
  });

  const symbols = [...table.keys()];
  symbols.sort();

  return (
    <Stack spacing={1}>
      {symbols.map((sym) => (
        <FormControl
          fullWidth
          key={"symbol-" + sym}
        >
          <FormLabel
            sx={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              gap: 1,
            }}
          >
            <Typography>{t("proposition")}</Typography>
            <StyledLatex tex={`\\text{\`\`$${sym}$''}`} />
          </FormLabel>
          <RadioGroup
            row
            value={table.get(sym) ? "1" : "0"}
            onChange={(e) =>
              onChange(sym, e.target.value === "1")
            }
          >
            <FormControlLabel
              control={<Radio disableRipple />}
              value="1"
              label={t("true")}
            />
            <FormControlLabel
              control={<Radio disableRipple />}
              value="0"
              label={t("false")}
            />
          </RadioGroup>
        </FormControl>
      ))}
    </Stack>
  );
};
