import { LanguageSwitcher } from "$components/LanguageSwitcher";
import { StyledCard } from "$components/StyledCard";
import {
  FunctionsRounded,
  MenuBookRounded,
} from "@mui/icons-material";
import {
  alpha,
  Box,
  Divider,
  Grid2,
  Stack,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";
import { FC, Fragment } from "react";
import { useTranslation } from "react-i18next";

const CARDS: {
  title: string;
  desc: string;
  href: string;
}[] = [
  {
    title: "view.home.card.solver.title",
    desc: "view.home.card.solver.desc",
    href: "/solver",
  },
  {
    title: "view.home.card.evaluator.title",
    desc: "view.home.card.evaluator.desc",
    href: "/evaluator",
  },
  {
    title: "view.home.card.simplifier.title",
    desc: "view.home.card.simplifier.desc",
    href: "/simplifier",
  },
  {
    title: "view.home.card.checker.title",
    desc: "view.home.card.checker.desc",
    href: "/checker",
  },
];

export const HomeView: FC = () => {
  const { t } = useTranslation();
  const { palette } = useTheme();

  const leftCol = CARDS.filter(
    (_, index) => index % 2 === 0
  );
  const rightCol = CARDS.filter(
    (_, index) => index % 2 === 1
  );

  return (
    <Fragment>
      <Toolbar
        disableGutters
        sx={{
          alignItems: "flex-end",
          flexDirection: "column",
        }}
      >
        <Box
          paddingX={2}
          paddingY={1}
          width="100%"
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
          }}
        >
          <LanguageSwitcher />
        </Box>
        <Divider flexItem />
      </Toolbar>
      <Box padding={4}>
        <Grid2
          maxWidth="lg"
          margin="auto"
          container
          spacing={2}
        >
          <Grid2 size={12}>
            <Typography
              sx={{
                fontWeight: 800,
                fontSize: "xx-large",
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                gap: 2,
                alignItems: "center",
                justifyContent: "flex-start",
              }}
            >
              <FunctionsRounded fontSize="inherit" />
              {t("view.home.calculators")}
            </Typography>
          </Grid2>
          <Grid2 size={{ xs: 12, md: 6 }}>
            <Stack spacing={2}>
              {leftCol.map(
                ({ desc, href, title }, index) => {
                  return (
                    <StyledCard
                      key={"card" + index}
                      title={t(title)}
                      href={href}
                      desc={t(desc)}
                      hrefLabel={t("view.home.launch")}
                    />
                  );
                }
              )}
            </Stack>
          </Grid2>
          <Grid2 size={{ xs: 12, md: 6 }}>
            <Stack spacing={2}>
              {rightCol.map(
                ({ desc, href, title }, index) => {
                  return (
                    <StyledCard
                      key={"card" + index}
                      title={t(title)}
                      href={href}
                      desc={t(desc)}
                      hrefLabel={t("view.home.launch")}
                    />
                  );
                }
              )}
            </Stack>
          </Grid2>
        </Grid2>
      </Box>
      <Box
        padding={4}
        sx={{
          backgroundColor: alpha(
            palette.secondary.light,
            0.5
          ),
        }}
      >
        <Grid2
          margin="auto"
          maxWidth="lg"
          container
          spacing={2}
        >
          <Grid2 size={12}>
            <Typography
              sx={{
                fontSize: "xx-large",
                fontWeight: 800,
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                alignItems: "center",
                justifyContent: "flex-start",
                gap: 2,
              }}
            >
              <MenuBookRounded fontSize="inherit" />
              {t("view.home.resources")}
            </Typography>
          </Grid2>
          <Grid2 size={{ xs: 12, md: 6 }}>
            <StyledCard
              title={t("view.home.card.theorem.title")}
              desc={t("view.home.card.theorem.desc")}
              href="theorem"
              hrefLabel={t("view.home.read")}
            />
          </Grid2>
          <Grid2 size={{ xs: 12, md: 6 }}>
            <StyledCard
              title={t("view.home.card.about.title")}
              desc={t("view.home.card.about.desc")}
              href="about"
              hrefLabel={t("view.home.read")}
            />
          </Grid2>
        </Grid2>
      </Box>
    </Fragment>
  );
};
