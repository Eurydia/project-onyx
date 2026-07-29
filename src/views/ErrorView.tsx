import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardHeader from "@mui/material/CardHeader";
import Typography from "@mui/material/Typography";
import type { FC } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";

export const ErrorView: FC = () => {
  const { t } = useTranslation("views", {
    keyPrefix: "error-view",
  });

  return (
    <Box
      sx={{
        maxWidth: "md",
        mx: { xs: 2, md: "auto" },
        py: 2,
      }}
    >
      <Card variant="outlined">
        <CardHeader
          title={t("title")}
          slotProps={{
            title: { sx: { fontWeight: 900 } },
          }}
        />
        <CardActions disableSpacing>
          <Typography
            component={Link}
            to="/"
            sx={{
              "color": "primary.main",
              "textDecorationLine": "none",
              "&:hover": {
                textDecorationLine: "underline",
              },
            }}
          >
            {t("return-home")}
          </Typography>
        </CardActions>
      </Card>
    </Box>
  );
};
