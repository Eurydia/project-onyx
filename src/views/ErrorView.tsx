import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Typography,
} from "@mui/material";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import {
  isRouteErrorResponse,
  Link,
  useRouteError,
} from "react-router";

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
          <Typography
            component={Link}
            to="/"
            color="primary"
            sx={{
              "textDecorationLine": "none",
              "&:hover": {
                textDecorationLine: "underline",
              },
            }}
          >
            {t("return-home")}
          </Typography>
        </CardActions>
        {isRouteErrorResponse(error) && (
          <CardContent>
            <Typography
              fontFamily="monospace"
              color="error"
              component="pre"
            >
              {JSON.stringify(error, null, 4)}
            </Typography>
          </CardContent>
        )}
      </Card>
    </Box>
  );
};
