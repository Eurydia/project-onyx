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
import { FC } from "react";
import { StyledLatex } from "./StyledLatex";

type EditorBooleanSwitcherProps = {
  symTable: SymbolTable;
  onSymChange: (k: string, v: boolean) => void;
};
export const EditorBooleanSwitcher: FC<
  EditorBooleanSwitcherProps
> = (props) => {
  const { symTable, onSymChange } = props;

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
      {Object.entries(symTable).map(([iden, value]) => (
        <FormControl
          key={iden}
          fullWidth
        >
          <FormLabel
            sx={{
              width: "100%",
              overflow: "auto",
              scrollbarWidth: "thin",
            }}
          >
            <StyledLatex tex={iden} />
          </FormLabel>
          <RadioGroup
            row
            value={value.toString()}
            onChange={(e) =>
              onSymChange(iden, e.target.value === "true")
            }
          >
            <FormControlLabel
              control={<Radio disableRipple />}
              value="true"
              label="True"
            />
            <FormControlLabel
              control={<Radio disableRipple />}
              value="false"
              label="False"
            />
          </RadioGroup>
        </FormControl>
      ))}
    </Stack>
  );
};
