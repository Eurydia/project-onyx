import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
} from "@mui/material";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { StyledLatex } from "./StyledLatex";

type EditorBooleanSwitcherProps = {
  table: Map<string, boolean>;
  selected: Set<string>;
  onChange: (k: string, v: boolean) => void;
};
export const EditorBooleanSwitcher: FC<
  EditorBooleanSwitcherProps
> = (props) => {
  const { table, selected, onChange } = props;

  const { t } = useTranslation("translation", {
    keyPrefix: "common",
  });

  return (
    <Stack
      useFlexGap
      spacing={1}
      width="100%"
    >
      {[...selected].map((symbol) => (
        <FormControl
          key={"symbol-" + symbol}
          fullWidth
        >
          <FormLabel
            sx={{
              width: "100%",
              overflowX: "auto",
            }}
          >
            <StyledLatex
              tex={`\\text{\`\`$${symbol}$''}`}
            />
          </FormLabel>
          <RadioGroup
            row
            value={table.get(symbol) ? "T" : "F"}
            onChange={(e) =>
              onChange(symbol, e.target.value === "T")
            }
          >
            <FormControlLabel
              control={<Radio disableRipple />}
              value="T"
              label={t("true")}
            />
            <FormControlLabel
              control={<Radio disableRipple />}
              value="F"
              label={t("false")}
            />
          </RadioGroup>
        </FormControl>
      ))}
    </Stack>
  );
};
