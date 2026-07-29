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
import type { Theme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { type FC, memo, type ReactElement } from "react";
import { Link } from "react-router";
import {
  THEME_CHECKER_ROUTE,
  THEME_COMPARATOR_ROUTE,
  THEME_EVALUATOR_ROUTE,
  THEME_REWRITER_ROUTE,
} from "$/App/theme";
import { BaseLayout } from "$/components/layouts/BaseLayout";
import { m } from "$/paraglide/messages";
import { setLocale, type Locale } from "$/paraglide/runtime.js";

const TOOLS = [
  {
    id: "evaluator",
    icon: <CalculateRounded fontSize="inherit" />,
    palette: THEME_EVALUATOR_ROUTE.palette,
    title: m["views.home-view.cards.evaluator.title"],
    description: m["views.home-view.cards.evaluator.desc"],
  },
  {
    id: "comparator",
    icon: <BalanceRounded fontSize="inherit" />,
    palette: THEME_COMPARATOR_ROUTE.palette,
    title: m["views.home-view.cards.comparator.title"],
    description: m["views.home-view.cards.comparator.desc"],
  },
  {
    id: "checker",
    icon: <RuleRounded fontSize="inherit" />,
    palette: THEME_CHECKER_ROUTE.palette,
    title: m["views.home-view.cards.checker.title"],
    description: m["views.home-view.cards.checker.desc"],
  },
  {
    id: "rewriter",
    icon: <BorderColorRounded fontSize="inherit" />,
    palette: THEME_REWRITER_ROUTE.palette,
    title: m["views.home-view.cards.rewriter.title"],
    description: m["views.home-view.cards.rewriter.desc"],
  },
  // {
  //   id: "reasoner",
  //   icon: <EmojiObjectsRounded fontSize="inherit" />,
  //   palette: PALETTE_REWRITER_ROUTE,
  // },
] as const;

const LANGUAGES = [
  {
    locale: "en",
    label: m["views.home-view.lang.en"],
  },
  {
    locale: "th",
    label: m["views.home-view.lang.th"],
  },
] as const satisfies readonly {
  locale: Locale;
  label: () => string;
}[];

const LanguageItemCard: FC<{
  locale: Locale;
  label: string;
}> = memo(
  (props) => {
    const { locale, label } = props;
    return (
      <Typography
        onClick={() => {
          void setLocale(locale);
        }}
        sx={{
          cursor: "pointer",
          textTransform: "capitalize",
        }}
      >
        {label}
      </Typography>
    );
  },
  () => true,
);

const ToolCard: FC<{
  palette: Theme["palette"];
  id: string;
  icon: ReactElement;
  title: string;
  description: string;
}> = memo(
  (props) => {
    const { palette, id, icon, title, description } = props;
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
              sx={(theme) => ({
                fontSize: theme.typography.h1.fontSize,
              })}
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
            <Typography>{description}</Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    );
  },
  () => true,
);

export const HomeView: FC = () => {
  return (
    <BaseLayout
      title={m["views.home-view.boolean-algebra-interpreter"]()}
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
          {LANGUAGES.map(({ locale, label }) => (
            <LanguageItemCard locale={locale} label={label()} key={locale} />
          ))}
        </Stack>
      }
    >
      <Grid container columns={{ xs: 1, md: 2 }} spacing={4}>
        {TOOLS.map(({ id, icon, palette, title, description }, index) => (
          <Grid key={`card${index}`} size={1}>
            <ToolCard
              id={id}
              icon={icon}
              palette={palette}
              title={title()}
              description={description()}
            />
          </Grid>
        ))}
      </Grid>
    </BaseLayout>
  );
};
