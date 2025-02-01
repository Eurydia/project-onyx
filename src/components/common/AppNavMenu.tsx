import { Stack, Typography } from "@mui/material";
import { FC } from "react";
import { Link } from "react-router";

type AppNavMenuProps = {
  selected: string;
  items: { label: string; href: string }[];
};
export const AppNavManu: FC<AppNavMenuProps> = (props) => {
  const { items, selected } = props;

  return (
    <Stack
      direction="row"
      spacing={2}
      flexWrap="wrap"
      useFlexGap
    >
      {items.map(({ href, label }, index) => {
        const isSelected =
          href.localeCompare(selected) === 0;
        return (
          <Typography
            key={"item" + index}
            textTransform="capitalize"
            component={Link}
            color="primary"
            to={href}
            sx={{
              "textDecorationLine": "none",
              "&:hover": {
                textDecorationLine: "underline",
              },
              "fontWeight": isSelected ? 900 : undefined,
            }}
          >
            {label}
          </Typography>
        );
      })}
    </Stack>
  );
};
