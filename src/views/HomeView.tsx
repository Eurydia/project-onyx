import { BaseLayout } from "$layouts/BaseLayout";
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
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  Grid2,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { FC } from "react";
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
  // {
  //   id: "reasoner",
  //   icon: <EmojiObjectsRounded fontSize="inherit" />,
  //   palette: PALETTE_REWRITER_ROUTE,
  // },
];

const LANGUAGES = ["en", "th"];

export const HomeView: FC = () => {
  const { t, i18n } = useTranslation(["views", "nav"]);
  const theme = useTheme();

  return (
    <BaseLayout
      title={t(`home-view.boolean-algebra-interpreter`, {
        ns: "views",
      })}
      appHeader={
        <Stack
          useFlexGap
          flexDirection="row"
          flexWrap="wrap"
          spacing={2}
          justifyContent="flex-end"
          width="100%"
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
                  textTransform: "capitalize",
                }}
              >
                {t(`home-view.lang.${lang}`, {
                  ns: "views",
                })}
              </Typography>
            );
          })}
        </Stack>
      }
    >
      <Grid2
        container
        columns={{ xs: 1, md: 2 }}
        spacing={4}
      >
        {CARDS.map(({ id, icon, palette }, index) => {
          const href = `/${id}`;
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
                    title={t(id, { ns: "nav" })}
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
                    <Typography>
                      {t(`home-view.cards.${id}.desc`, {
                        ns: "views",
                      })}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid2>
          );
        })}
      </Grid2>
    </BaseLayout>
  );
};
