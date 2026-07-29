import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { type FC, Fragment, type ReactNode } from "react";

type BaseLayoutProps = {
  title: string;
  appHeader: ReactNode;
  children: ReactNode;
};
export const BaseLayout: FC<BaseLayoutProps> = (props) => {
  const { appHeader, title: banner, children } = props;
  const { palette } = useTheme();
  return (
    <Fragment>
      <Box
        sx={{
          width: "100%",
          maxWidth: "lg",
          mx: { xs: 0, md: "auto" },
          px: { xs: 2, md: 0 },
          py: 4,
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
        sx={{
          px: { xs: 2, md: 0 },
          py: 4,
          backgroundColor: palette.primary.light,
          color: palette.primary.dark,
          alignItems: "center",
        }}
      >
        <Typography
          variant="h1"
          sx={{
            fontWeight: 900,
            fontFamily: "monospace",
            textTransform: "capitalize",
            maxWidth: "lg",
            mx: { xs: 0, md: "auto" },
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
        sx={{
          width: "100%",
          maxWidth: "lg",
          mx: { xs: 0, md: "auto" },
          px: { xs: 2, md: 0 },
          py: 8,
        }}
      >
        {children}
      </Box>
    </Fragment>
  );
};
