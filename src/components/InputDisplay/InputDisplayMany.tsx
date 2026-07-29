import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import type { FC } from "react";
import { m } from "$/libs/paraglide/messages";
import type { Maybe } from "$/types/generic";
import { StyledAlert } from "../styled/StyledAlert";
import { StyledLatex } from "../styled/StyledLatex";

export const InputDisplayMany: FC<{
  items: ({ inputRaw: string } & Maybe<{
    inputInterpretationLatex: string;
  }>)[];
}> = (props) => {
  const { items } = props;

  return (
    <Stack spacing={1}>
      {items.map((item, index) => {
        const inputNum = index + 1;

        if (!item.ok) {
          return (
            <StyledLatex
              key={`expr${index}`}
              sx={{
                color: (theme) => theme.palette.error.main,
              }}
            >
              {`$$\\varnothing \\tag{${inputNum}}$$`}
            </StyledLatex>
          );
        }

        return (
          <StyledLatex key={`expr${index}`}>
            {`$$${item.inputInterpretationLatex} \\tag{${inputNum}}$$`}
          </StyledLatex>
        );
      })}
      {items.some((expr) => !expr.ok) && (
        <StyledAlert severity="warning">
          <Typography>
            {m[
              "components.input-display.warnings.the-following-input-are-invalid"
            ]()}
          </Typography>
          <List>
            {items.map((item, index) => {
              if (item.ok) {
                return null;
              }
              const inputNum = index + 1;
              return (
                <ListItem key={`invalid-input${index}`}>
                  <ListItemIcon>
                    <Typography>{`(${inputNum})`}</Typography>
                  </ListItemIcon>
                  <ListItemText disableTypography>
                    {item.inputRaw.length === 0 ? (
                      <Typography sx={{ fontStyle: "italic" }}>
                        {m["components.input-display.empty-string"]()}
                      </Typography>
                    ) : (
                      <Typography sx={{ fontFamily: "monospace" }}>
                        {item.inputRaw}
                      </Typography>
                    )}
                  </ListItemText>
                </ListItem>
              );
            })}
          </List>
        </StyledAlert>
      )}
    </Stack>
  );
};
