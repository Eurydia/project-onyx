import { IdentifierTable } from "$types/parser";
import {
  Box,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { FC } from "react";
import { StyledLatex } from "./StyledLatex";

type EditorBooleanSwitcherProps = {
  idenTable: IdentifierTable;
  onIdenChange: (iden: string, value: boolean) => void;
};
export const EditorBooleanSwitcher: FC<
  EditorBooleanSwitcherProps
> = (props) => {
  const { idenTable, onIdenChange } = props;

  return (
    <Box
      padding={2}
      display="flex"
      flexDirection="column"
      flexWrap="nowrap"
      gap={1}
      width="100%"
    >
      <Typography>Truth values</Typography>
      {Object.entries(idenTable).map(([iden, value]) => (
        <FormControl
          key={iden}
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 4,
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
    </Box>
  );
};
