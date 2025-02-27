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
  Theme,
  Typography,
  useTheme,
} from "@mui/material";
import { FC, memo, ReactElement, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";

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

type LanguageItemCardProps = {
  lang: string;
};
const LanguageItemCard: FC<LanguageItemCardProps> = memo(
  (props) => {
    const { lang } = props;
    const { t, i18n } = useTranslation("views", {
      keyPrefix: "home-view.lang",
    });
    const handleClick = useCallback(
      () => i18n.changeLanguage(lang),
      [lang]
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
  () => true
);

type ToolCardProps = {
  palette: Theme["palette"];
  id: string;
  icon: ReactElement;
};
const ToolCard: FC<ToolCardProps> = memo(
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
  () => true
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
          useFlexGap
          flexDirection="row"
          flexWrap="wrap"
          spacing={2}
          justifyContent="flex-end"
          width="100%"
        >
          {LANGUAGES.map((lang, index) => (
            <LanguageItemCard
              lang={lang}
              key={"lang" + index}
            />
          ))}
        </Stack>
      }
    >
      <Grid2
        container
        columns={{ xs: 1, md: 2 }}
        spacing={4}
      >
        {TOOLS.map(({ id, icon, palette }, index) => (
          <Grid2
            key={"card" + index}
            size={1}
          >
            <ToolCard
              id={id}
              icon={icon}
              palette={palette}
            />
          </Grid2>
        ))}
      </Grid2>
    </BaseLayout>
  );
};
