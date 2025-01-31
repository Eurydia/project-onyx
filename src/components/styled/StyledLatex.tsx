import { SxProps, Theme, Typography } from "@mui/material";
import { KatexOptions } from "katex";
import { FC, ReactNode, useEffect, useRef } from "react";

type StyledLatexProps = {
  children: ReactNode;
  sx?: SxProps<Theme>;
  options?: KatexOptions;
};
export const StyledLatex: FC<StyledLatexProps> = (
  props
) => {
  const { sx, children, options } = props;
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (ref.current !== null) {
      window.renderMathInElement(ref.current, {
        output: "html",
        delimiters: [
          { left: "$$", right: "$$", display: true },
          { left: "$", right: "$", display: false },
        ],
        ...options,
      });
    }
  }, [children, ref, options]);

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
