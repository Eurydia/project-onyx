import { type SxProps, type Theme, Typography } from "@mui/material";
import type { KatexOptions } from "katex";
import { type FC, type ReactNode, useEffect, useRef } from "react";

type StyledLatexProps = {
  children: ReactNode;
  sx?: SxProps<Theme>;
  options?: KatexOptions;
};
export const StyledLatex: FC<StyledLatexProps> = (props) => {
  const { sx, children, options } = props;
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (ref.current !== null) {
      window.renderMathInElement(ref.current, {
        strict: false,
        output: "html",
        delimiters: [
          { left: "$$", right: "$$", display: true },
          { left: "$", right: "$", display: false },
        ],
        ...options,
      });
    }
  }, [options]);

  return (
    <Typography
      ref={ref}
      sx={{
        ...sx,
        "& .katex-display > .katex": {
          whiteSpace: "normal",
        },
      }}
    >
      {children}
    </Typography>
  );
};
