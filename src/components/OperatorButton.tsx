import {
  Button,
  List,
  ListItem,
  ListItemText,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { FC } from "react";
import { Latex } from "./Latex";

type OperatorButtonProps = {
  name: string;
  label: string;
  alias: string[];
  onClick: () => void;
};

export const OperatorButton: FC<OperatorButtonProps> = (
  props
) => {
  const { alias, name, label, onClick } = props;
  return (
    <Tooltip
      arrow
      title={
        <Stack
          useFlexGap
          spacing={1}
        >
          <Typography>{name}</Typography>
          <List
            dense
            disablePadding
          >
            <ListItem
              disablePadding
              disableGutters
              dense
            >
              <ListItemText>
                Aliases: {alias.join(", ")}
              </ListItemText>
            </ListItem>
          </List>
        </Stack>
      }
    >
      <Button onClick={onClick}>
        <Latex
          tex={label}
          options={{
            displayMode: false,
            output: "html",
          }}
        />
      </Button>
    </Tooltip>
  );
};
