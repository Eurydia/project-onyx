import { SxProps, Typography } from "@mui/material";
import katex from "katex";
import { FC, useEffect, useRef } from "react";

type StyledLatexProps = {
  tex: string;
  displayMode?: boolean;
  sx?: SxProps;
};
export const StyledLatex: FC<StyledLatexProps> = (
  props
) => {
  const { sx, tex, displayMode } = props;
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (ref.current !== null) {
      katex.render(tex, ref.current, {
        displayMode,
        output: "html",
      });
    }
  }, [ref, tex, displayMode]);

  return (
    <Typography
      ref={ref}
      component="span"
      sx={{
        ...sx,
        "& .katex-html .base": !displayMode
          ? {
              "display": "inline-block",
              "width": "100%",
              " & .mord.text": {
                display: "inline-block",
                width: "100%",
                wordWrap: "break-word",
                textWrap: "balance",
              },
            }
          : {},
      }}
    />
  );
};
