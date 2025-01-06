import { Divider, Stack, Typography } from "@mui/material";
import { FC } from "react";
import { useTranslation } from "react-i18next";

export const LanguageSwitcher: FC = () => {
  const { i18n } = useTranslation();
  return (
    <Stack
      spacing={2}
      direction="row"
      alignItems="center"
      justifyContent="flex-start"
      divider={
        <Divider
          flexItem
          orientation="vertical"
        />
      }
    >
      <Typography
        onClick={() => i18n.changeLanguage("en")}
        sx={{
          cursor: "pointer",
          textDecorationLine: "underline",
        }}
      >
        EN
      </Typography>
      <Typography
        onClick={() => i18n.changeLanguage("th")}
        sx={{
          cursor: "pointer",
          textDecorationLine: "underline",
        }}
      >
        TH
      </Typography>
    </Stack>
  );
};
