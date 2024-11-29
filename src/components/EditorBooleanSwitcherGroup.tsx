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
  idenTable: SymbolTable;
  onIdenChange: (iden: string, value: boolean) => void;
};
export const EditorBooleanSwitcher: FC<
  EditorBooleanSwitcherProps
> = (props) => {
  const { idenTable, onIdenChange } = props;

  return (
    <Stack
      useFlexGap
      spacing={1}
      divider={
        <Divider
          flexItem
          variant="middle"
        />
      }
      sx={{
        overflow: "auto",
        height: "100%",
        scrollbarWidth: "thin",
      }}
    >
      {Object.entries(idenTable).map(([iden, value]) => (
        <FormControl
          key={iden}
          sx={{
            paddingX: 2,
            rowGap: 0,
          }}
        >
          <FormLabel>
            <StyledLatex tex={iden} />
          </FormLabel>
          <RadioGroup
            row
            value={value.toString()}
            onChange={(e) =>
              onIdenChange(iden, e.target.value === "true")
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
