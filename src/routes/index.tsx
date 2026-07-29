import BalanceRounded from "@mui/icons-material/BalanceRounded";
import BorderColorRounded from "@mui/icons-material/BorderColorRounded";
import CalculateRounded from "@mui/icons-material/CalculateRounded";
import RuleRounded from "@mui/icons-material/RuleRounded";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import { createFileRoute } from "@tanstack/react-router";
import {
  THEME_CHECKER_ROUTE,
  THEME_COMPARATOR_ROUTE,
  THEME_EVALUATOR_ROUTE,
  THEME_REWRITER_ROUTE,
} from "$/App/theme";
import { LanguageItemCard } from "$/components/Home/LanguageItemCard";
import { ToolCard } from "$/components/Home/ToolCard";
import { BaseLayout } from "$/components/layouts/BaseLayout";
import { m } from "$/libs/paraglide/messages";
import type { Locale } from "$/libs/paraglide/runtime.js";

export const Route = createFileRoute("/")({
  component: HomeRouteComponent,
});

const TOOLS = [
  {
    to: "/evaluator",
    icon: <CalculateRounded fontSize="inherit" />,
    palette: THEME_EVALUATOR_ROUTE.palette,
    title: m["views.home-view.cards.evaluator.title"],
    description: m["views.home-view.cards.evaluator.desc"],
  },
  {
    to: "/comparator",
    icon: <BalanceRounded fontSize="inherit" />,
    palette: THEME_COMPARATOR_ROUTE.palette,
    title: m["views.home-view.cards.comparator.title"],
    description: m["views.home-view.cards.comparator.desc"],
  },
  {
    to: "/checker",
    icon: <RuleRounded fontSize="inherit" />,
    palette: THEME_CHECKER_ROUTE.palette,
    title: m["views.home-view.cards.checker.title"],
    description: m["views.home-view.cards.checker.desc"],
  },
  {
    to: "/rewriter",
    icon: <BorderColorRounded fontSize="inherit" />,
    palette: THEME_REWRITER_ROUTE.palette,
    title: m["views.home-view.cards.rewriter.title"],
    description: m["views.home-view.cards.rewriter.desc"],
  },
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

function HomeRouteComponent() {
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
        {TOOLS.map(({ to, icon, palette, title, description }, index) => (
          <Grid key={`card${index}`} size={1}>
            <ToolCard
              to={to}
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
}
