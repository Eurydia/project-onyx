import {
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
  const { t } = useTranslation();
  const { palette } = useTheme();

  const bgColor = value
    ? palette.primary.light
    : palette.primary.main;
  return (
    <TableCell
      align="center"
      sx={{
        backgroundColor: bgColor,
        color: palette.getContrastText(bgColor),
      }}
    >
      <Typography>
        {value ? t("common.true") : t("common.false")}
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
