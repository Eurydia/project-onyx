import AboutBlog from "$assets/blogs/BooleanAlgebraSummary/en.txt";
import UserManualBlog from "$assets/blogs/UserManual/en.txt";
import { StyledMarkdown } from "$components/StyledMarkdown";
import { useFetchMarkdown } from "$hooks/useFetchMarkdown";
import { Box, Container, Typography } from "@mui/material";
import { FC, Fragment } from "react";
export const BlogView: FC = () => {
  const userManualContent =
    useFetchMarkdown(UserManualBlog);
  const content = useFetchMarkdown(AboutBlog);
  return (
    <Fragment>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "110vh",
          backgroundColor: (t) => t.palette.secondary.light,
          paddingY: 2,
          marginY: 8,
        }}
      >
        <Container maxWidth="md">
          <Typography
            variant="h1"
            component="h1"
          >
            Hi there! 👋
          </Typography>
          <StyledMarkdown>
            {userManualContent ?? ""}
          </StyledMarkdown>
        </Container>
      </Box>
      <Box marginBottom={4}>
        <Container maxWidth="md">
          <StyledMarkdown>{content ?? ""}</StyledMarkdown>
        </Container>
      </Box>
    </Fragment>
  );
};
