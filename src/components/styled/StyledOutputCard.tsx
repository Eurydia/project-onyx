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
    <Card elevation={0}>
      <CardHeader
        title={title}
        slotProps={{
          title: {
            fontWeight: 900,
            textTransform: "capitalize",
          },
        }}
      />
      <CardContent>{children}</CardContent>
    </Card>
  );
};
