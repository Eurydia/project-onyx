import TableCell from "@mui/material/TableCell";
import Typography from "@mui/material/Typography";
import { type FC, memo } from "react";
import { m } from "$/libs/paraglide/messages";

export const TruthTableCell: FC<{
  value: boolean;
}> = memo(
  (props) => {
    const { value } = props;

    return (
      <TableCell
        align="center"
        sx={{
          color: (theme) => theme.palette.primary.dark,
          backgroundColor: (theme) =>
            value
              ? theme.palette.primary.light
              : theme.lighten(theme.palette.primary.light, 0.6),
        }}
      >
        <Typography>
          {value
            ? m["components.truth-table.text.true"]()
            : m["components.truth-table.text.false"]()}
        </Typography>
      </TableCell>
    );
  },
  (prev, next) => {
    return prev.value === next.value;
  },
);
