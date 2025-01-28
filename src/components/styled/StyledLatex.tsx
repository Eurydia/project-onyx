import { SxProps, Typography } from "@mui/material";
import { FC, ReactNode, useEffect, useRef } from "react";

type StyledLatexProps = {
  children: ReactNode;
  sx?: SxProps;
};
export const StyledLatex: FC<StyledLatexProps> = (
  props
) => {
  const { sx, children } = props;
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (ref.current !== null) {
      window.renderMathInElement(ref.current, {
        output: "html",
        delimiters: [
          { left: "$$", right: "$$", display: true },
          { left: "$", right: "$", display: false },
        ],
      });
    }
  }, [children, ref]);

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
