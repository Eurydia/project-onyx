import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardHeader from "@mui/material/CardHeader";
import { m } from "$/libs/paraglide/messages";
import { RouterLink } from "./router/router-link";

export function ErrorRouteComponent() {
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
