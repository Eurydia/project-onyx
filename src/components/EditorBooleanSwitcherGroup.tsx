import {
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
} from "@mui/material";
import { FC } from "react";
import { StyledLatex } from "./StyledLatex";

type EditorBooleanSwitcherProps = {
  table: Map<string, boolean>;
  selected: Set<string>;
  onChange: (k: string, v: boolean) => void;
};
export const EditorBooleanSwitcher: FC<
  EditorBooleanSwitcherProps
> = (props) => {
  const { table, selected, onChange: onSymChange } = props;
  return (
    <Stack
      useFlexGap
      spacing={1}
      width="100%"
      divider={
        <Divider
          flexItem
          variant="middle"
        />
      }
    >
      {[...selected].map((k) => (
        <FormControl
          key={"synbol-" + k}
          fullWidth
        >
          <FormLabel
            sx={{
              width: "100%",
              overflow: "auto",
            }}
          >
            <StyledLatex tex={k} />
          </FormLabel>
          <RadioGroup
            row
            value={table.get(k) ? "T" : "F"}
            onChange={(e) =>
              onSymChange(k, e.target.value === "T")
            }
          >
            <FormControlLabel
              control={<Radio disableRipple />}
              value="T"
              label="True"
            />
            <FormControlLabel
              control={<Radio disableRipple />}
              value="F"
              label="False"
            />
          </RadioGroup>
        </FormControl>
      ))}
    </Stack>
  );
};
