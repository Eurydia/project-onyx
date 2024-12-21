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

type PlaygroundDialogConfigProps = {
  active: Set<string>;
  table: Map<string, boolean>;
  onChange: (k: string, v: boolean) => void;
};
export const PlaygroundDialogConfig: FC<
  PlaygroundDialogConfigProps
> = (props) => {
  const { active, table, onChange } = props;

  const { t } = useTranslation("translation", {
    keyPrefix: "common",
  });
  const propositionText = t("proposition");

  const selected = [...active];
  selected.toSorted();
  return (
    <Stack
      useFlexGap
      spacing={1}
      width="100%"
    >
      {selected.map((sym) => (
        <FormControl
          key={"symbol-" + sym}
          fullWidth
        >
          <FormLabel
            sx={{
              width: "100%",
              overflowX: "auto",
            }}
          >
            <StyledLatex
              tex={`\\text{${propositionText}: \`\`$${sym}$''}`}
            />
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
              value="T"
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
