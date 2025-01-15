import {
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  Typography,
  useTheme,
} from "@mui/material";
import { t } from "i18next";
import { FC, ReactNode } from "react";
import { NavLink } from "react-router";

type StyledCardProps = {
  title: ReactNode;
  desc: string;
  href: string;
  hrefLabel: string;
};
export const StyledCard: FC<StyledCardProps> = (props) => {
  const { desc, href, title, hrefLabel } = props;
  const { palette, shape } = useTheme();
  return (
    <Card
      variant="elevation"
      elevation={0}
      sx={{
        borderRadius: ({ shape }) => shape.borderRadius,
      }}
    >
      <CardActionArea
        disableRipple
        component={NavLink}
        to={href}
      >
        <CardHeader
          title={title}
          titleTypographyProps={{
            sx: {
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
      </CardActionArea>
    </Card>
  );
};
