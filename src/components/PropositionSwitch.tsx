import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { FC } from "react";
import { Latex } from "./Latex";

type PropositionSwitchProps = {
  onChange: (value: boolean) => void;
  value: boolean;
  label: string;
};
export const BooleanSwicher: FC<PropositionSwitchProps> = (
  props
) => {
  const { onChange, value, label } = props;
  return (
    <FormControl
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        flexWrap: "wrap",
        gap: 4,
      }}
    >
      <FormLabel>
        <Latex tex={label} />
      </FormLabel>
      <RadioGroup
        row
        value={value.toString()}
        onChange={(e) =>
          onChange(e.target.value === "true")
        }
      >
        <FormControlLabel
          control={<Radio disableRipple />}
          value="true"
          label={<Latex tex="\\top" />}
        />
        <FormControlLabel
          control={<Radio disableRipple />}
          value="false"
          label={<Latex tex="\\bot" />}
        />
      </RadioGroup>
    </FormControl>
  );
};
