import { Divider, Typography } from "@mui/material";
import { FC } from "react";
import Markdown, { Components } from "react-markdown";
import rehypeKatex, {
  Options as KatexOptions,
} from "rehype-katex";
import rehypeSlug from "rehype-slug";
import remarkMath from "remark-math";

const COMPONENTS_OVERRIDE: Partial<Components> = {
  h1: ({ children, id }) => (
    <Typography
      variant="h1"
      id={id}
    >
      {children}
    </Typography>
  ),
  h2: ({ children, id }) => (
    <Typography
      variant="h2"
      id={id}
    >
      {children}
    </Typography>
  ),
  h3: ({ children, id }) => (
    <Typography
      id={id}
      variant="h3"
    >
      {children}
    </Typography>
  ),
  h4: ({ id, children }) => (
    <Typography
      id={id}
      variant="h4"
    >
      {children}
    </Typography>
  ),
  p: ({ children }) => (
    <Typography
      component="p"
      gutterBottom
    >
      {children}
    </Typography>
  ),
  // code: ({ children }) => <StyledKBD>{children}</StyledKBD>,
  em: ({ children }) => (
    <Typography
      fontWeight="bold"
      component="em"
      fontStyle="normal"
    >
      {children}
    </Typography>
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
      remarkPlugins={[remarkMath]}
    >
      {children}
    </Markdown>
  );
};
