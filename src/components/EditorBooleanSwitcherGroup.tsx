import { SymbolTable } from "$types/parser";
import {
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
} from "@mui/material";
import { FC, ReactNode } from "react";
import { StyledLatex } from "./StyledLatex";

type EditorBooleanSwitcherProps = {
  symTable: SymbolTable;
  onSymChange: (k: string, v: boolean) => void;
};
export const EditorBooleanSwitcher: FC<
  EditorBooleanSwitcherProps
> = (props) => {
  const { symTable, onSymChange } = props;

  const switchers: ReactNode[] = [];
  symTable.forEach((v, k) => {
    switchers.push(
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
          value={v ? "T" : "F"}
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
    );
  });

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
      {switchers}
    </Stack>
  );
};
