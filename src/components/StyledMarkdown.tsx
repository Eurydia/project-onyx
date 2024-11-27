import { Divider, Typography } from "@mui/material";
import { JsxRuntimeComponents } from "node_modules/react-markdown/lib";
import { FC } from "react";
import Markdown from "react-markdown";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";
import { StyledKBD } from "./StyledKBD";

const COMPONENTS_OVERRIDE: Partial<JsxRuntimeComponents> = {
  h2: ({ children }) => (
    <Typography
      variant="h2"
      component="h2"
    >
      {children}
    </Typography>
  ),
  h3: ({ children }) => (
    <Typography
      variant="h3"
      component="h3"
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
  code: ({ children }) => <StyledKBD>{children}</StyledKBD>,
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
      rehypePlugins={[rehypeKatex]}
      remarkPlugins={[remarkMath]}
    >
      {children}
    </Markdown>
  );
};
