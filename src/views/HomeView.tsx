import BalanceRounded from "@mui/icons-material/BalanceRounded";
import BorderColorRounded from "@mui/icons-material/BorderColorRounded";
import CalculateRounded from "@mui/icons-material/CalculateRounded";
import RuleRounded from "@mui/icons-material/RuleRounded";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import { type Theme, useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { type FC, memo, type ReactElement, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import { BaseLayout } from "$/components/layouts/BaseLayout";
import { PALETTE_CHECKER_ROUTE } from "$/App/theme/palette-checker-route";
import { PALETTE_COMPARATOR_ROUTE } from "$/App/theme/palette-comparator-route";
import { PALETTE_EVALUATOR_ROUTE } from "$/App/theme/palette-evaluator-route";
import { PALETTE_REWRITER_ROUTE } from "$/App/theme/palette-rewriter-route";

const TOOLS = [
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
] as const;

const LANGUAGES = ["en", "th"] as const;

const LanguageItemCard: FC<{
  lang: string;
}> = memo(
  (props) => {
    const { lang } = props;
    const { t, i18n } = useTranslation("views", {
      keyPrefix: "home-view.lang",
    });
    const handleClick = useCallback(
      () => i18n.changeLanguage(lang),
      [lang, i18n.changeLanguage],
    );
    return (
      <Typography
        onClick={handleClick}
        sx={{
          cursor: "pointer",
          textTransform: "capitalize",
        }}
      >
        {t(lang)}
      </Typography>
    );
  },
  () => true,
);

const ToolCard: FC<{
  palette: Theme["palette"];
  id: string;
  icon: ReactElement;
}> = memo(
  (props) => {
    const { palette, id, icon } = props;
    const theme = useTheme();
    const { t } = useTranslation("views", {
      keyPrefix: "home-view.cards",
    });
    const href = `/${id}`;
    const { light, dark } = palette.primary;
    return (
      <Card
        elevation={0}
        sx={{
          height: "100%",
          backgroundColor: light,
          color: dark,
          transition: "all 0.2s ease-out",
          "&:hover": {
            boxShadow: 20,
          },
        }}
      >
        <CardActionArea
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
                fontSize: theme.typography.h1.fontSize,
              }}
            >
              {icon}
            </Typography>
          </CardContent>
          <CardHeader
            title={t(`${id}.title`)}
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
            <Typography>{t(`${id}.desc`)}</Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    );
  },
  () => true,
);

export const HomeView: FC = () => {
  const { t } = useTranslation("views", {
    keyPrefix: "home-view",
  });

  return (
    <BaseLayout
      title={t(`boolean-algebra-interpreter`)}
      appHeader={
        <Stack
          direction="row"
          spacing={2}
          sx={{
            flexWrap: "wrap",
            justifyContent: "flex-end",
            width: "100%",
          }}
        >
          {LANGUAGES.map((lang, index) => (
            <LanguageItemCard lang={lang} key={`lang${index}`} />
          ))}
        </Stack>
      }
    >
      <Grid container columns={{ xs: 1, md: 2 }} spacing={4}>
        {TOOLS.map(({ id, icon, palette }, index) => (
          <Grid key={`card${index}`} size={1}>
            <ToolCard id={id} icon={icon} palette={palette} />
          </Grid>
        ))}
      </Grid>
    </BaseLayout>
  );
};
