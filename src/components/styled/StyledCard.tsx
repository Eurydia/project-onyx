import {
  Card,
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
  const { desc, href, title } = props;
  return (
    <Card
      variant="elevation"
      elevation={0}
      sx={{
        "borderStyle": "solid",
        "borderRadius": ({ shape }) => shape.borderRadius,
        "borderColor": ({ palette }) =>
          palette.background.paper,
        "transition": "all 0.1s ease",
        "&:hover": {
          borderColor: ({ palette }) =>
            palette.primary.main,
        },
        "display": "block",
        "textDecoration": "none",
      }}
      component={Link}
      to={href}
    >
      <CardHeader
        title={title}
        titleTypographyProps={{
          sx: {
            fontWeight: 700,
            whiteSpace: "break-spaces",
            wordBreak: "break-all",
            wordWrap: "break-word",
          },
        }}
      />
      <CardContent>
        <Typography>{t(desc)}</Typography>
      </CardContent>
    </Card>
  );
};
