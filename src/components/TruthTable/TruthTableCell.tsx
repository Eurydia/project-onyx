import {
  lighten,
  TableCell,
  Typography,
  useTheme,
} from "@mui/material";
import { FC, memo } from "react";
import { useTranslation } from "react-i18next";

type TruthTableCellProps = { value: boolean };
const TruthTableCell_: FC<TruthTableCellProps> = (
  props
) => {
  const { value } = props;
  const { t } = useTranslation("components", {
    keyPrefix: "truth-table.text",
  });
  const { palette } = useTheme();

  const bgColor = value
    ? palette.primary.light
    : lighten(palette.primary.light, 0.6);

  return (
    <TableCell
      align="center"
      sx={{
        backgroundColor: bgColor,
        color: palette.primary.dark,
      }}
    >
      <Typography>
        {value ? t("true") : t("false")}
      </Typography>
    </TableCell>
  );
};

export const TruthTableCell = memo(
  TruthTableCell_,
  (prev, next) => {
    return prev.value === next.value;
  }
);
