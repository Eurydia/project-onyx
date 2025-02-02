import {
  createTheme,
  responsiveFontSizes,
} from "@mui/material";
import { PALETTE_BASE } from "./palette-base";
import { PALETTE_CHECKER_ROUTE } from "./palette-checker-route";
import { PALETTE_COMPARATOR_ROUTE } from "./palette-comparator-route";
import { PALETTE_EVALUATOR_ROUTE } from "./palette-evaluator-route";
import { PALETTE_REWRITER_ROUTE } from "./palette-rewriter-route";

let _THEME_GLOBAL = createTheme({
  palette: PALETTE_BASE,
});
_THEME_GLOBAL = responsiveFontSizes(_THEME_GLOBAL);

export const THEME_GLOBAL = _THEME_GLOBAL;

export const THEME_EVALUATOR_ROUTE = responsiveFontSizes(
  createTheme({
    palette: PALETTE_EVALUATOR_ROUTE,
  })
);
export const THEME_CHECKER_ROUTE = responsiveFontSizes(
  createTheme({
    palette: PALETTE_CHECKER_ROUTE,
  })
);
export const THEME_COMPARATOR_ROUTE = responsiveFontSizes(
  createTheme({
    palette: PALETTE_COMPARATOR_ROUTE,
  })
);
export const THEME_REWRITER_ROUTE = responsiveFontSizes(
  createTheme({
    palette: PALETTE_REWRITER_ROUTE,
  })
);
