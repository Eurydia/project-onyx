import { Box, Typography, useTheme } from "@mui/material";
import { FC, Fragment, ReactNode } from "react";

type BaseLayoutProps = {
  banner: string;
  appHeader: ReactNode;
  children: ReactNode;
};
export const BaseLayout: FC<BaseLayoutProps> = (props) => {
  const { appHeader, banner, children } = props;
  const { palette } = useTheme();
  return (
    <Fragment>
      <Box
        width="100%"
        maxWidth="lg"
        marginX={{ xs: 0, md: "auto" }}
        paddingX={{ xs: 2, md: 0 }}
        paddingY={4}
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-start",
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        {appHeader}
      </Box>
      <Box
        paddingX={{ xs: 2, md: 0 }}
        paddingY={4}
        sx={{
          backgroundColor: palette.primary.light,
          color: palette.primary.dark,
          alignItems: "center",
        }}
      >
        <Typography
          variant="h1"
          fontWeight={900}
          fontFamily="monospace"
          textTransform="capitalize"
          maxWidth="lg"
          marginX={{ xs: 0, md: "auto" }}
          sx={{
            textWrap: "balance",
            whiteSpace: "normal",
            overflowWrap: "break-word",
            hyphens: "auto",
          }}
        >
          {banner}
        </Typography>
      </Box>
      <Box
        width="100%"
        maxWidth="lg"
        marginX={{ xs: 0, md: "auto" }}
        paddingX={{ xs: 2, md: 0 }}
        paddingY={8}
      >
        {children}
      </Box>
    </Fragment>
  );
};
