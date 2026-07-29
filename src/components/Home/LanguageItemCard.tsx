import Typography from "@mui/material/Typography";
import { type FC, memo } from "react";
import { type Locale, setLocale } from "$/paraglide/runtime.js";

export const LanguageItemCard: FC<{
  locale: Locale;
  label: string;
}> = memo(
  (props) => {
    const { locale, label } = props;
    return (
      <Typography
        onClick={() => {
          void setLocale(locale);
        }}
        sx={{
          cursor: "pointer",
          textTransform: "capitalize",
        }}
      >
        {label}
      </Typography>
    );
  },
  () => true,
);
