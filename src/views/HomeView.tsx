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
    title: "views:home-view.card.evaluator.title",
    desc: "views:home-view.card.evaluator.desc",
    href: "/evaluator",
  },
  {
    title: "views:home-view.card.comparator.title",
    desc: "views:home-view.card.comparator.desc",
    href: "/comparator",
  },
  {
    title: "views:home-view.card.rewriter.title",
    desc: "views:home-view.card.rewriter.desc",
    href: "/rewriter",
  },
  {
    title: "views:home-view.card.checker.title",
    desc: "views:home-view.card.checker.desc",
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
                    palette.primary.light,
                },
              }}
            >
              <CardHeader
                title={t(title)}
                slotProps={{
                  title: {
                    sx: {
                      fontWeight: 900,
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
