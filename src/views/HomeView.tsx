import { Masonry } from "@mui/lab";
import {
  Card,
  CardContent,
  CardHeader,
  Stack,
  Typography,
} from "@mui/material";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";

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
    href: "/rewriter",
  },
  {
    title: "view.home.card.checker.title",
    desc: "view.home.card.checker.desc",
    href: "/checker",
  },
];

export const HomeView: FC = () => {
  const { t } = useTranslation();

  return (
    <Stack
      spacing={2}
      maxWidth="lg"
      marginX={{
        md: "auto",
        xs: 4,
      }}
    >
      <Typography
        fontSize="large"
        fontWeight={700}
      >
        {t("view.home.calculators")}
      </Typography>
      <Masonry columns={{ xs: 1, md: 2 }}>
        {CARDS.map(({ title, href, desc }, index) => (
          <Link
            to={href}
            key={"card" + index}
            style={{
              textDecoration: "none",
            }}
          >
            <Card
              variant="outlined"
              sx={{
                "borderStyle": "solid",
                "borderRadius": ({ shape }) =>
                  shape.borderRadius,
                "transition": "all 0.1s ease",
                "&:hover": {
                  borderColor: ({ palette }) =>
                    palette.secondary.light,
                },
              }}
            >
              <CardHeader
                title={t(title)}
                slotProps={{
                  title: {
                    sx: {
                      fontWeight: 700,
                      whiteSpace: "break-spaces",
                    },
                  },
                }}
              />
              <CardContent>
                <Typography>{t(desc)}</Typography>
              </CardContent>
            </Card>
          </Link>
        ))}
      </Masonry>
    </Stack>
  );
};
