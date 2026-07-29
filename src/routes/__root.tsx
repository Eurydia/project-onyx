import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { THEME_GLOBAL } from "$/App/theme";
import { RouterLink } from "$/components/router/router-link";
import { m } from "$/libs/paraglide/messages";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardHeader from "@mui/material/CardHeader";

export const Route = createRootRoute({
  component: RootRouteComponent,
  errorComponent: ErrorRouteComponent,
  notFoundComponent: ErrorRouteComponent,
});

function RootRouteComponent() {
  return (
    <ThemeProvider theme={THEME_GLOBAL}>
      <CssBaseline />
      <Outlet />
    </ThemeProvider>
  );
}

function ErrorRouteComponent() {
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
          title={m["views.error-view.title"]()}
          slotProps={{
            title: { sx: { fontWeight: 900 } },
          }}
        />
        <CardActions disableSpacing>
          <RouterLink
            to="/"
            sx={{
              color: "primary.main",
              textDecorationLine: "none",
              "&:hover": {
                textDecorationLine: "underline",
              },
            }}
          >
            {m["views.error-view.return-home"]()}
          </RouterLink>
        </CardActions>
      </Card>
    </Box>
  );
}
