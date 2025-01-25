import { Masonry } from "@mui/lab";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
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
    title: "view.home.card.rewriter.title",
    desc: "view.home.card.rewriter.desc",
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
    <Box
      maxWidth="lg"
      marginX={{
        md: "auto",
        xs: 4,
      }}
    >
      <Masonry columns={{ xs: 1, md: 2 }}>
        {CARDS.map(({ title, href, desc }, index) => (
          <Link
            key={"card" + index}
            to={href}
            style={{
              textDecoration: "none",
            }}
          >
            <Card
              variant="outlined"
              sx={{
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
    </Box>
  );
};
