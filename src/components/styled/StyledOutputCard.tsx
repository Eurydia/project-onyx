import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import type { FC, PropsWithChildren } from "react";

export const StyledOutputCard: FC<PropsWithChildren<{
  title: string;
}>> = (props) => {
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
