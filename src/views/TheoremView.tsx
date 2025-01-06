import UserManualBlogEN from "$assets/blogs/UserManual/en.txt";
import UserManualBlogTH from "$assets/blogs/UserManual/th.txt";
import { StyledMarkdown } from "$components/StyledMarkdown";
import { Container } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export const TheoremView: FC = () => {
  const { i18n } = useTranslation();
  const [content, setContent] = useState("");

  useEffect(() => {
    fetch(
      i18n.language === "th"
        ? UserManualBlogTH
        : UserManualBlogEN
    )
      .then((response) => response.text())
      .then((text) => setContent(text));
  }, [i18n.language]);

  return (
    <Container maxWidth="md">
      <StyledMarkdown>{content}</StyledMarkdown>
    </Container>
  );
};
