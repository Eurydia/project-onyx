import { LaunchRounded } from "@mui/icons-material";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Typography,
} from "@mui/material";
import { t } from "i18next";
import { FC, ReactNode } from "react";
import { Link } from "react-router";

type StyledCardProps = {
  title: ReactNode;
  desc: string;
  href: string;
  hrefLabel: string;
};
export const StyledCard: FC<StyledCardProps> = (props) => {
  const { desc, href, title, hrefLabel } = props;
  return (
    <Card variant="outlined">
      <CardHeader
        title={title}
        titleTypographyProps={{
          sx: {
            fontSize: "medium",
            fontWeight: "bold",
            whiteSpace: "break-spaces",
            wordBreak: "break-all",
            wordWrap: "break-word",
          },
        }}
      />
      <CardContent>
        <Typography>{t(desc)}</Typography>
      </CardContent>
      <CardActions>
        <Button
          startIcon={<LaunchRounded />}
          component={Link}
          to={href}
          disableElevation
          disableRipple
          variant="outlined"
        >
          {hrefLabel}
        </Button>
      </CardActions>
    </Card>
  );
};
