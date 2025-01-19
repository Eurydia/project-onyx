import {
  Card,
  CardContent,
  CardHeader,
} from "@mui/material";
import { FC, ReactNode } from "react";

type StyledOutputCardProps = {
  title: string;
  children: ReactNode;
};
export const StyledOutputCard: FC<StyledOutputCardProps> = (
  props
) => {
  const { children, title } = props;
  return (
    <Card
      variant="outlined"
      sx={{
        padding: 2,
        borderRadius: ({ shape }) => shape.borderRadius,
      }}
    >
      <CardHeader
        title={title}
        titleTypographyProps={{
          fontWeight: 900,
        }}
      />
      <CardContent>{children}</CardContent>
    </Card>
  );
};
