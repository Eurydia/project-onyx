import UserManualBlogEN from "$assets/blogs/UserManual/en.txt";
import UserManualBlogTH from "$assets/blogs/UserManual/th.txt";
import { StyledMarkdown } from "$components/StyledMarkdown";
import { Box, Container } from "@mui/material";
import { FC, Fragment, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export const BlogView: FC = () => {
  const { i18n } = useTranslation();
  const [content, setContent] = useState("");

  useEffect(() => {
    let isWorking = true;

    fetch(
      i18n.language === "th"
        ? UserManualBlogTH
        : UserManualBlogEN
    )
      .then((res) => res.text())
      .then((text) => {
        if (!isWorking) {
          return;
        }
        setContent(text);
      });
    return () => {
      isWorking = false;
    };
  }, [i18n.language]);

  return (
    <Fragment>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: (t) => t.palette.secondary.light,
          paddingY: 8,
        }}
      >
        <Container maxWidth="md">
          <StyledMarkdown>{content}</StyledMarkdown>
        </Container>
      </Box>
      {/* {i18n.language === "en" && (
        <Box marginBottom={4}>
          <Container maxWidth="md">
            <StyledMarkdown>{content ?? ""}</StyledMarkdown>
          </Container>
        </Box>
      )} */}
    </Fragment>
  );
};
