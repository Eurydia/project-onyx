import { Divider, Typography } from "@mui/material";
import { FC } from "react";
import Markdown, { Components } from "react-markdown";
import rehypeKatex, {
  Options as KatexOptions,
} from "rehype-katex";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";

const COMPONENTS_OVERRIDE: Partial<Components> = {
  h1: ({ children, id }) => (
    <Typography
      id={id}
      variant="h3"
    >
      {children}
    </Typography>
  ),
  h2: ({ children, id }) => (
    <Typography
      id={id}
      variant="h4"
    >
      {children}
    </Typography>
  ),
  h3: ({ children, id }) => (
    <Typography
      id={id}
      variant="h5"
    >
      {children}
    </Typography>
  ),
  p: ({ children }) => (
    <Typography gutterBottom>{children}</Typography>
  ),
  hr: () => (
    <Divider
      flexItem
      sx={{ marginY: 4 }}
      variant="middle"
    />
  ),
  a: ({ href, hrefLang, referrerPolicy, children }) => (
    <Typography
      component="a"
      target="_blank"
      href={href}
      hrefLang={hrefLang}
      referrerPolicy={referrerPolicy}
    >
      {children}
    </Typography>
  ),
};

const KATEX_OPTION: KatexOptions = {
  output: "html",
};

type StyledMarkdownProps = {
  children: string;
};
export const StyledMarkdown: FC<StyledMarkdownProps> = (
  props
) => {
  const { children } = props;

  return (
    <Markdown
      components={COMPONENTS_OVERRIDE}
      rehypePlugins={[
        [rehypeKatex, KATEX_OPTION],
        rehypeSlug,
      ]}
      remarkPlugins={[remarkMath, remarkGfm]}
    >
      {children}
    </Markdown>
  );
};
