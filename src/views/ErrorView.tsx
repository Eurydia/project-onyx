import { HomeRounded } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Typography,
} from "@mui/material";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { Link, useRouteError } from "react-router";

export const ErrorView: FC = () => {
  const error = useRouteError();
  const { t } = useTranslation("views", {
    keyPrefix: "error-view",
  });

  return (
    <Box
      maxWidth="md"
      marginX={{ xs: 2, md: "auto" }}
      paddingY={2}
    >
      <Card variant="outlined">
        <CardHeader
          title={t("title")}
          slotProps={{
            title: { fontWeight: 900 },
          }}
        />
        <CardActions disableSpacing>
          <Button
            variant="text"
            startIcon={<HomeRounded />}
            component={Link}
            to="/"
          >
            {t("return-home")}
          </Button>
        </CardActions>
        <CardContent>
          <Typography
            fontFamily="monospace"
            color="error"
            component="pre"
          >
            {JSON.stringify(error, null, 4)}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};
