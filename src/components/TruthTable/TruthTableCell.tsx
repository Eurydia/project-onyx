import {
  TableCell,
  Typography,
  alpha,
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

  return (
    <TableCell
      align="center"
      sx={{
        backgroundColor: value
          ? alpha(palette.primary.main, 0.4)
          : alpha(palette.primary.main, 0.2),
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
