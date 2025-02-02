import {
  BalanceRounded,
  BorderColorRounded,
  CalculateRounded,
  RuleRounded,
} from "@mui/icons-material";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  createTheme,
  Grid2,
  responsiveFontSizes,
  ThemeProvider,
  Typography,
} from "@mui/material";
import {
  amber,
  deepOrange,
  indigo,
  lightBlue,
  pink,
} from "@mui/material/colors";
import createPalette from "@mui/material/styles/createPalette";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";
const CARDS = [
  {
    id: "evaluator",
    palette: createPalette({
      primary: { main: deepOrange[200] },
      contrastThreshold: 9,
      tonalOffset: 0.47,
    }),
    icon: <CalculateRounded fontSize="inherit" />,
  },
  {
    id: "comparator",
    palette: createPalette({
      primary: { main: amber[200] },
      contrastThreshold: 9,
      tonalOffset: 0.47,
    }),
    icon: <BalanceRounded fontSize="inherit" />,
  },
  {
    id: "rewriter",
    palette: createPalette({
      primary: { main: pink[200] },
      contrastThreshold: 9,
      tonalOffset: 0.47,
    }),
    icon: <BorderColorRounded fontSize="inherit" />,
  },
  {
    id: "checker",
    palette: createPalette({
      primary: { main: indigo[200] },
      contrastThreshold: 9,
      tonalOffset: 0.47,
    }),
    icon: <RuleRounded fontSize="inherit" />,
  },
];

const LANGUAGES = ["en", "th"];

const HOME_THEME_PALETTE = responsiveFontSizes(
  createTheme({
    palette: {
      primary: { main: lightBlue[300] },
      contrastThreshold: 9,
      tonalOffset: 0.5,
    },
  })
);

export const HomeView: FC = () => {
  const { t, i18n } = useTranslation("views", {
    keyPrefix: "home-view",
  });

  return (
    <ThemeProvider theme={HOME_THEME_PALETTE}>
      <Box
        width="100%"
        maxWidth="lg"
        marginX={{ xs: 0, md: "auto" }}
        paddingX={{ xs: 2, md: 0 }}
        paddingY={4}
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "baseline",
          justifyContent: "flex-start",
          gap: 2,
          flexWrap: "wrap",
        }}
      >
        {LANGUAGES.map((lang, index) => {
          const selected =
            lang.localeCompare(i18n.language) === 0
              ? 900
              : undefined;
          return (
            <Typography
              key={"lang" + index}
              fontWeight={selected}
              onClick={() => i18n.changeLanguage(lang)}
              sx={{
                cursor: "pointer",
                textTransform: "uppercase",
              }}
            >
              {t(`lang.${lang}`)}
            </Typography>
          );
        })}
      </Box>
      <Box
        height={{ xs: "100vh", md: "80vh" }}
        paddingX={{ xs: 2, md: 0 }}
        sx={{
          backgroundColor: ({ palette }) =>
            palette.primary.light,
          color: ({ palette }) => palette.primary.dark,
          display: "flex",
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
            whiteSpace: "break-spaces",
          }}
        >
          {`Boolean algebra interpreter`}
        </Typography>
      </Box>

      <Box
        width="100%"
        maxWidth="lg"
        marginX={{ xs: 0, md: "auto" }}
        paddingX={{ xs: 2, md: 0 }}
        paddingY={8}
      >
        <Grid2
          container
          columns={{ xs: 1, md: 2 }}
          spacing={4}
        >
          {CARDS.map(({ id, palette, icon }, index) => {
            const href = `/${id}`;
            const title = t(`card.${id}.title`);
            const desc = t(`card.${id}.desc`);
            const { light, dark, main } = palette.primary;
            return (
              <Grid2
                key={"card" + index}
                size={1}
              >
                <Card
                  elevation={0}
                  sx={{
                    "height": "100%",
                    "backgroundColor": light,
                    "color": dark,
                    "transition": "all 0.2s ease-out",
                    "&:hover": {
                      boxShadow: 20,
                    },
                  }}
                >
                  <CardActionArea
                    disableRipple
                    component={Link}
                    to={href}
                    sx={{ padding: 2, height: "100%" }}
                  >
                    <CardContent
                      sx={{
                        padding: { xs: 2, md: 4 },
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: ({ typography }) =>
                            typography.h1.fontSize,
                        }}
                      >
                        {icon}
                      </Typography>
                    </CardContent>
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
                    <CardContent>
                      <Typography>{desc}</Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid2>
            );
          })}
        </Grid2>
      </Box>
    </ThemeProvider>
  );
};
