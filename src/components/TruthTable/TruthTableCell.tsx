import TableCell from "@mui/material/TableCell";
import Typography from "@mui/material/Typography";
import { type FC, memo } from "react";
import { useTranslation } from "react-i18next";

export const TruthTableCell: FC<{
  value: boolean;
}> = memo(
  (props) => {
    const { value } = props;
    const { t } = useTranslation("components", {
      keyPrefix: "truth-table.text",
    });

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
        <Typography>{value ? t("true") : t("false")}</Typography>
      </TableCell>
    );
  },
  (prev, next) => {
    return prev.value === next.value;
  },
);
