import { PALETTE_CHECKER_ROUTE } from "$theme/palette-checker-route";
import { PALETTE_COMPARATOR_ROUTE } from "$theme/palette-comparator-route";
import { PALETTE_EVALUATOR_ROUTE } from "$theme/palette-evaluator-route";
import { PALETTE_REWRITER_ROUTE } from "$theme/palette-rewriter-route";
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
  Grid2,
  Typography,
  useTheme,
} from "@mui/material";
import { FC, Fragment } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";

const CARDS = [
  {
    id: "evaluator",
    icon: <CalculateRounded fontSize="inherit" />,
    palette: PALETTE_EVALUATOR_ROUTE,
  },
  {
    id: "comparator",
    icon: <BalanceRounded fontSize="inherit" />,
    palette: PALETTE_COMPARATOR_ROUTE,
  },
  {
    id: "checker",
    icon: <RuleRounded fontSize="inherit" />,
    palette: PALETTE_CHECKER_ROUTE,
  },
  {
    id: "rewriter",
    icon: <BorderColorRounded fontSize="inherit" />,
    palette: PALETTE_REWRITER_ROUTE,
  },
];

const LANGUAGES = ["en", "th"];

export const HomeView: FC = () => {
  const { t, i18n } = useTranslation("views", {
    keyPrefix: "home-view",
  });
  const theme = useTheme();

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
          backgroundColor: theme.palette.secondary.light,
          color: theme.palette.secondary.dark,
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
          {t(`boolean-algebra-interpreter`)}
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
          {CARDS.map(({ id, icon, palette }, index) => {
            const href = `/${id}`;
            const title = t(`card.${id}.title`);
            const desc = t(`card.${id}.desc`);
            const { light, dark } = palette.primary;
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
                          fontSize:
                            theme.typography.h1.fontSize,
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
    </Fragment>
  );
};
