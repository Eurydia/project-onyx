import {
  Button,
  List,
  ListItem,
  ListItemText,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { FC, ReactNode } from "react";
import { Latex } from "./Latex";

type OperatorButtonProps = {
  name: string;
  label: string;
  alias: string;
  truthTable: ReactNode;
};

export const OperatorButton: FC<OperatorButtonProps> = (
  props
) => {
  const { alias, name, label, truthTable } = props;
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
              <ListItemText>Alias: {alias}</ListItemText>
            </ListItem>
            {/* <ListItem
              dense
              disableGutters
              disablePadding
            >
              <List
                disablePadding
                dense
              >
                {example.map((ex, i) => (
                  <ListItem
                    key={i}
                    disablePadding
                    disableGutters
                    dense
                  >
                    <ListItemText>
                      Example {i + 1}: {ex}
                    </ListItemText>
                  </ListItem>
                ))}
              </List>
            </ListItem> */}
          </List>
          {/* {truthTable} */}
        </Stack>
      }
    >
      <Button
        sx={{
          textTransform: "none",
        }}
      >
        <Latex
          tex={label}
          options={{
            output: "htmlAndMathml",
          }}
        />
      </Button>
    </Tooltip>
  );
};
