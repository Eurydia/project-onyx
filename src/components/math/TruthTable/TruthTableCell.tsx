import {
  TableCell,
  Typography,
  alpha,
  useTheme,
} from "@mui/material";
import { FC } from "react";
import { useTranslation } from "react-i18next";

type StyledTableCellProps = { value: boolean };
export const StyledTableCell: FC<StyledTableCellProps> = (
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
          ? alpha(palette.secondary.light, 0.8)
          : alpha(palette.secondary.main, 0.2),
      }}
    >
      <Typography>
        {value ? t("common.true") : t("common.false")}
      </Typography>
    </TableCell>
  );
};
