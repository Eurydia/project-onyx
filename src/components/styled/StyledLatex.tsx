import type { SxProps, Theme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import type { KatexOptions } from "katex";
import { type FC, type PropsWithChildren, useEffect, useRef } from "react";

export const StyledLatex: FC<PropsWithChildren<{
  sx?: SxProps<Theme>;
  options?: KatexOptions;
}>> = (props) => {
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
