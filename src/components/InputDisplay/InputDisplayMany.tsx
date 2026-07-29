import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import type { FC } from "react";
import { useTranslation } from "react-i18next";
import type { Maybe } from "$/types/generic";
import { StyledAlert } from "../styled/StyledAlert";
import { StyledLatex } from "../styled/StyledLatex";

type InputDisplayManyProps = {
  items: ({ inputRaw: string } & Maybe<{
    inputInterpretationLatex: string;
  }>)[];
};
export const InputDisplayMany: FC<InputDisplayManyProps> = (props) => {
  const { items } = props;
  const { t } = useTranslation("components", {
    keyPrefix: "input-display",
  });

  return (
    <Stack spacing={1}>
      {items.map((item, index) => {
        const inputNum = index + 1;

        if (!item.ok) {
          return (
            <StyledLatex
              key={`expr${index}`}
              sx={{
                color: ({ palette }) => palette.error.main,
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
            {t("warnings.the-following-input-are-invalid")}
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
                        {t("empty-string")}
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
