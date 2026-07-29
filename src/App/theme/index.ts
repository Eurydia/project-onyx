import {
  createTheme,
  responsiveFontSizes,
} from "@mui/material/styles";
import { PALETTE_BASE } from "./palette-base";
import { PALETTE_CHECKER_ROUTE } from "./palette-checker-route";
import { PALETTE_COMPARATOR_ROUTE } from "./palette-comparator-route";
import { PALETTE_EVALUATOR_ROUTE } from "./palette-evaluator-route";
import { PALETTE_REWRITER_ROUTE } from "./palette-rewriter-route";

const createAppTheme = (palette: typeof PALETTE_BASE) =>
  responsiveFontSizes(
    createTheme({
      palette,
      components: {
        MuiButtonBase: {
          defaultProps: {
            disableRipple: true,
            disableTouchRipple: true,
          },
        },
        MuiButton: {
          defaultProps: {
            disableElevation: true,
          },
        },
        MuiButtonGroup: {
          defaultProps: {
            disableElevation: true,
            disableRipple: true,
          },
        },
        MuiRadio: {
          defaultProps: {
            disableFocusRipple: true,
          },
        },
        MuiCheckbox: {
          defaultProps: {
            disableFocusRipple: true,
          },
        },
        MuiStack: {
          defaultProps: {
            useFlexGap: true,
          },
        },
        MuiTabs: {
          defaultProps: {
            variant: "scrollable",
            scrollButtons: "auto",
          },
        },
      },
    }),
  );

export const THEME_GLOBAL = createAppTheme(PALETTE_BASE);

export const THEME_EVALUATOR_ROUTE = createAppTheme(
  PALETTE_EVALUATOR_ROUTE,
);
export const THEME_CHECKER_ROUTE = createAppTheme(PALETTE_CHECKER_ROUTE);
export const THEME_COMPARATOR_ROUTE = createAppTheme(
  PALETTE_COMPARATOR_ROUTE,
);
export const THEME_REWRITER_ROUTE = createAppTheme(PALETTE_REWRITER_ROUTE);
