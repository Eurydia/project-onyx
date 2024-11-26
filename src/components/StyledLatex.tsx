import { Typography } from "@mui/material";
import katex, { KatexOptions } from "katex";
import { FC, useEffect, useRef } from "react";

type StyledLatexProps = {
  tex: string;
  options?: KatexOptions;
};
export const StyledLatex: FC<StyledLatexProps> = (
  props
) => {
  const { tex, options } = props;
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (ref.current !== null) {
      katex.render(tex, ref.current, options);
    }
  }, [ref, tex, options]);

  return (
    <Typography
      component="span"
      width="100%"
      overflow="auto"
      sx={{
        scrollbarWidth: "thin",
      }}
      ref={ref}
    />
  );
};
