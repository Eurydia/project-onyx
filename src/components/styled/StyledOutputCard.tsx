import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import type { FC, ReactNode } from "react";

type StyledOutputCardProps = {
  title: string;
  children: ReactNode;
};
export const StyledOutputCard: FC<StyledOutputCardProps> = (
  props
) => {
  const { children, title } = props;
  return (
    <Card elevation={4}>
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
      <CardContent>{children}</CardContent>
    </Card>
  );
};
