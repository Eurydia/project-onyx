import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import type { Theme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { Link } from "@tanstack/react-router";
import { type FC, memo, type ReactElement } from "react";

export const ToolCard: FC<{
  palette: Theme["palette"];
  to: "/evaluator" | "/comparator" | "/checker" | "/rewriter";
  icon: ReactElement;
  title: string;
  description: string;
}> = memo(
  (props) => {
    const { palette, to, icon, title, description } = props;
    const { light, dark } = palette.primary;
    return (
      <Card
        elevation={0}
        sx={{
          height: "100%",
          backgroundColor: light,
          color: dark,
          transition: "all 0.2s ease-out",
          "&:hover": {
            boxShadow: 20,
          },
        }}
      >
        <CardActionArea
          component={Link}
          to={to}
          sx={{ padding: 2, height: "100%" }}
        >
          <CardContent
            sx={{
              padding: { xs: 2, md: 4 },
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography
              sx={(theme) => ({
                fontSize: theme.typography.h1.fontSize,
              })}
            >
              {icon}
            </Typography>
          </CardContent>
          <CardHeader
            title={title}
            slotProps={{
              title: {
                sx: {
                  fontWeight: 900,
                  textTransform: "capitalize",
                },
              },
            }}
          />
          <CardContent>
            <Typography>{description}</Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    );
  },
  () => true,
);
