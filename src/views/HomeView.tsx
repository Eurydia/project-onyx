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
              variant="elevation"
              elevation={0}
              sx={{
                "borderStyle": "solid",
                "borderRadius": ({ shape }) =>
                  shape.borderRadius,
                "borderColor": ({ palette }) =>
                  palette.background.paper,
                "transition": "all 0.1s ease",
                "&:hover": {
                  borderColor: ({ palette }) =>
                    palette.primary.main,
                },
              }}
            >
              <CardHeader
                title={t(title)}
                titleTypographyProps={{
                  sx: {
                    fontWeight: 700,
                    whiteSpace: "break-spaces",
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

// {/* <Grid2
//       container
//       maxWidth="lg"
//       spacing={2}
//       sx={{
//         margin: "auto",
//         padding: 4,
//         backgroundColor: "white",
//         borderRadius: 8,
//       }}
//     >
//       <Grid2 size={12}>
//         <Typography variant="h3">
//           {t("view.home.calculators")}
//         </Typography>
//       </Grid2>
//       <Grid2 size={{ xs: 12, md: 6 }}>
//         <Stack spacing={2}>
//           {leftCol.map(({ desc, href, title }, index) => {
//             return (
//               <StyledCard
//                 key={"card" + index}
//                 title={t(title)}
//                 href={href}
//                 desc={t(desc)}
//                 hrefLabel={t("view.home.launch")}
//               />
//             );
//           })}
//         </Stack>
//       </Grid2>
//       <Grid2 size={{ xs: 12, md: 6 }}>
//         <Stack spacing={2}>
//           {rightCol.map(({ desc, href, title }, index) => {
//             return (
//               <StyledCard
//                 key={"card" + index}
//                 title={t(title)}
//                 href={href}
//                 desc={t(desc)}
//                 hrefLabel={t("view.home.launch")}
//               />
//             );
//           })}
//         </Stack>
//       </Grid2>
//       <Grid2 size={12}>
//         <Typography variant="h3">
//           {t("view.home.resources")}
//         </Typography>
//       </Grid2>
//       <Grid2 size={{ xs: 12, md: 6 }}>
//         <StyledCard
//           title={t("view.home.card.theorem.title")}
//           desc={t("view.home.card.theorem.desc")}
//           href="theorem"
//           hrefLabel={t("view.home.read")}
//         />
//       </Grid2>
//       <Grid2 size={{ xs: 12, md: 6 }}>
//         <StyledCard
//           title={t("view.home.card.about.title")}
//           desc={t("view.home.card.about.desc")}
//           href="about"
//           hrefLabel={t("view.home.read")}
//         />
//       </Grid2>
//     </Grid2> */}
