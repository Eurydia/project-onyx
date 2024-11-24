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
  idenTable: IdentifierTable | null;
  onIdenChange: (iden: string, value: boolean) => void;
};
export const EditorBooleanSwitcher: FC<
  EditorBooleanSwitcherProps
> = (props) => {
  const { idenTable, onIdenChange } = props;

  if (idenTable === null) {
    return (
      <Typography>The playground is not ready</Typography>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 1,
      }}
    >
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
