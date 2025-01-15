import { TranslateRounded } from "@mui/icons-material";
import {
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from "@mui/material";
import { FC, Fragment, useState } from "react";
import { useTranslation } from "react-i18next";

export const LanguageSwitcher: FC = () => {
  const { i18n, t } = useTranslation();
  const [anchor, setAnchor] =
    useState<HTMLButtonElement | null>(null);

  return (
    <Fragment>
      <Tooltip
        title={<Typography>{t("language")}</Typography>}
      >
        <IconButton
          size="large"
          onClick={(e) => setAnchor(e.currentTarget)}
        >
          <TranslateRounded />
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchor}
        open={anchor !== null}
        onClose={() => setAnchor(null)}
      >
        <MenuItem
          selected={i18n.language === "en"}
          onClick={() => i18n.changeLanguage("en")}
        >
          EN
        </MenuItem>
        <MenuItem
          selected={i18n.language === "th"}
          onClick={() => i18n.changeLanguage("th")}
        >
          TH
        </MenuItem>
      </Menu>
    </Fragment>
  );
};

// {/* <Stack
//   spacing={2}
//   direction="row"
//   alignItems="center"
//   justifyContent="flex-start"
//   divider={
//     <Divider
//       flexItem
//       orientation="vertical"
//     />
//   }
// >
//   <Typography
//     onClick={() => i18n.changeLanguage("en")}
//     sx={{
//       cursor: "pointer",
//       textDecorationLine: "underline",
//     }}
//   >
//     EN
//   </Typography>
//   <Typography
//     onClick={() => i18n.changeLanguage("th")}
//     sx={{
//       cursor: "pointer",
//       textDecorationLine: "underline",
//     }}
//   >
//     TH
//   </Typography>
// </Stack> */}
