import aboutBlog from "$assets/blogs/about.txt";
import { useFetchMarkdown } from "$hooks/useFetchMarkdown";
import { Container } from "@mui/material";
import { FC } from "react";
import Markdown from "react-markdown";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";

export const BlogView: FC = () => {
  const content = useFetchMarkdown(aboutBlog);
  return (
    <Container maxWidth="md">
      <Markdown
        rehypePlugins={[rehypeKatex]}
        remarkPlugins={[remarkMath]}
      >
        {content}
      </Markdown>
    </Container>
  );
};
