import {
  Box,
  IconButton,
  Typography,
  useTheme,
} from "@mui/material";
import { FC, ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";

const NAV_ITEMS = [
  "evaluator",
  "comparator",
  "checker",
  "rewriter",
];

type AppNavGroupProps = {
  homeIcon: ReactNode;
};
export const AppNavGroup: FC<AppNavGroupProps> = (
  props
) => {
  const { homeIcon } = props;
  const { t } = useTranslation("nav");
  const { palette } = useTheme();
  return (
    <Box
      width="100%"
      maxWidth="lg"
      marginX={{ xs: 0, md: "auto" }}
      paddingX={{ xs: 2, md: 0 }}
      paddingY={4}
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        gap: 2,
        flexWrap: "wrap",
        alignItems: "center",
      }}
    >
      <IconButton
        component={Link}
        to="/"
        disableRipple
        sx={{ color: palette.primary.dark }}
      >
        {homeIcon}
      </IconButton>
      {NAV_ITEMS.map((id, index) => {
        return (
          <Typography
            key={"item" + index}
            textTransform="capitalize"
            component={Link}
            to={`/${id}`}
            sx={{
              "textDecorationLine": "none",
              "&:hover": {
                textDecorationLine: "underline",
              },
              "color": palette.primary.dark,
            }}
          >
            {t(id)}
          </Typography>
        );
      })}
    </Box>
  );
};
